'use strict';

// The welcome (first launch: sign in, or a hacker name), Settings, your profile, friends and messages,
// the leaderboard, the themes and the notifications (views of the activity bar, git.js), feedback and app updates. Your level and rank (xp.js) show in the top bar and on your profile. Names can repeat: the API gives every Mac a
// tag (#0427) and name + tag is unique, like Discord. Swift's Cloud talks to the API, pushes its state through
// window.__radar.cloud and answers the page through the "cloud" handler (with replies).
window.Cloud = (() => {
  // The computer and the command key, as this platform names them (the Windows app sets __platform, preload.js).
  const MACHINE = window.__platform === 'win32' ? 'PC' : 'Mac';
  const MOD = window.__platform === 'win32' ? 'Ctrl+' : '⌘';
  const call = (type, payload) => window.webkit.messageHandlers.cloud.postMessage(Object.assign({ type }, payload || {}));
  const MAX = 16;
  const ERRORS = {
    name_full: 'too many hackers use this name · try another',
    offline: "can't reach the server · try again",
    unauthorized: `this ${MACHINE} lost its sign-in · restart the app`,
  };
  const errorText = (code) => ERRORS[code] || `didn't work (${code})`;
  // The app moves the chat windows pinned above the dashboard out of the way while a menu is open.
  const tellModal = (open) => {
    try {
      window.webkit.messageHandlers.radar.postMessage({ type: 'modal', open });
    } catch {}
  };
  const tagText = (t) => (t ? `#${String(t).padStart(4, '0')}` : '');
  // A download arrow over a tray; while an update downloads, the arrow keeps dropping into the tray.
  // A speech bubble: the feedback window's title.
  const BUBBLE = '<svg viewBox="0 0 24 24"><path d="M5 4.5h14a2 2 0 0 1 2 2V15a2 2 0 0 1-2 2h-7.5L6.5 21v-4H5a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2z"/><circle cx="8.2" cy="10.8" r="1.1"/><circle cx="12" cy="10.8" r="1.1"/><circle cx="15.8" cy="10.8" r="1.1"/></svg>';
  const ARROW = '<svg viewBox="0 0 16 16"><path class="ar" d="M8 2.5v7.5M4.6 6.8 8 10.2l3.4-3.4"/><path d="M3 13.5h10"/></svg>';

  let S = null; // latest state
  let modal = null; // 'first' | 'menu' | 'update' | 'feedback'
  let shownError = null;
  let shownNameError = null;
  let waitFor = null; // { test, then, until }: runs once a state shows the name just sent
  let feedbackDraft = ''; // the feedback window's text, kept until it's sent

  const root = document.createElement('div');
  root.id = 'cloudui';
  document.body.appendChild(root);
  const q = (sel) => root.querySelector(sel);
  const brand = document.querySelector('.brand');
  const stack = brand.querySelector('.stack');
  // The logo shows your status. Unread messages and friend requests count on the friends icon on the left edge.
  brand.insertAdjacentHTML('afterbegin', '<i class="pdot bme" hidden></i>');

  function render(s) {
    if (!s) return;
    S = s;
    // Long names get tighter letters so the top bar still fits. Over the name: your rank and level once the API told
    // them; under it, how far into the level you are.
    const long = s.hackerName && s.hackerName.length > 11 ? ' class="long"' : '';
    const x = s.xp, r = x && Xp.rank(x.level);
    const title = r ? `<small class="rk" style="--rc:${r.color}">${esc(r.name.toUpperCase())} · LV ${x.level}</small>` : '<small>HACKER</small>';
    const bar = r ? `<i class="xpb" style="--rc:${r.color}"><i style="width:${Xp.pct(x).toFixed(1)}%"></i></i>` : '';
    setHTML(stack, s.hackerName ? `${title}<b${long}>${esc(s.hackerName)}<i class="htag">${tagText(s.tag)}</i></b>${bar}` : '<b>ORBITERM</b>');
    // The badge you display, beside your name (badges.js).
    window.Badges?.paintTop();
    brand.title = r
      ? `Your profile · level ${x.level} · ${r.name} · ${x.to ? `${Xp.num(x.xp - x.from)} / ${Xp.num(x.to - x.from)} XP` : `${Xp.num(x.xp)} XP`} · today ${Xp.dur(x.today)}`
      : 'Your profile';
    if (waitFor && (Date.now() > waitFor.until || waitFor.test(s))) {
      const w = waitFor;
      waitFor = null;
      if (w.test(s)) w.then(s);
    }
    renderUpdate();
    renderUpdateModal();
    if (s.updateError && s.updateError !== shownError) {
      toast(s.updateError === 'not_writable' ? "can't replace the app where it is · move it to Applications" : 'update failed · try again later');
    }
    shownError = s.updateError;
    // A name picked offline that the API refused once it was back.
    if (s.nameError && s.nameError !== shownNameError) {
      toast(s.nameError === 'name_full' ? "couldn't save your new name · too many hackers use it" : "couldn't save your new name");
    }
    shownNameError = s.nameError;
    // The welcome until there's a name: a token taken to sign in with (the welcome's "begin") has none yet.
    if (s.reachable && (s.registered === false || (s.registered && !s.hackerName))) openFirst();
    else if (modal === 'first' && s.registered && s.hackerName) close();
    if (modal === 'menu') {
      renderInfo();
      renderActivity();
    }
    else if (shown === 'friends') meCard();
    // Friends and messages need a signed-in Mac, with its name.
    if (s.registered && s.hackerName && s.reachable && !Social.state()) Social.load();
    badges();
  }

  // How much of the update has downloaded, " 42%" (nothing when it isn't downloading).
  const pct = () => (S.updateProgress == null ? '' : ` ${Math.round(S.updateProgress * 100)}%`);
  function renderUpdate() {
    const b = $('update');
    const busy = !!S.updating;
    b.hidden = !(S.update || busy);
    b.disabled = busy;
    b.classList.toggle('busy', busy);
    // A day after a newer version came out, an older one earns no XP (the API): the button says so.
    b.classList.toggle('paused', !busy && !!S.xpPaused);
    // Short label so the top bar fits; the version and progress are in the tooltip and in settings.
    setHTML(b, `${ARROW}<span>${busy ? `updating${pct() || '…'}` : S.xpPaused ? 'update · XP paused' : 'update'}</span>`);
    b.title = busy
      ? S.updating + pct()
      : S.update
        ? S.xpPaused
          ? `Version ${S.update.version} is out · XP is paused until you update · click to see what's new`
          : S.updateReady
            ? `Version ${S.update.version} is ready · it installs when you step away, your chats keep running · click to see what's new`
            : `Version ${S.update.version} is out · click to see what's new`
        : '';
  }

  async function update() {
    if (!S || !S.update || S.updating) return;
    const r = await call('update').catch(() => ({ error: 'offline' }));
    if (r && r.error) toast(errorText(r.error));
  }

  // ---------- what's new, then install ----------
  // The top bar's update button, the settings row and the "update available" notice open this first: the new version
  // and what changed in it (the release notes, a line each), so nobody restarts the app without knowing why.
  // On the Mac, only its own lines (whatsnew.js).
  const noteLines = (notes) =>
    window.WhatsNew?.on ? WhatsNew.lines(notes) : String(notes || '')
      .split(/\n+/)
      .map((l) => l.replace(/^\s*[-•*]\s*/, '').trim())
      .filter(Boolean);
  // Release notes and the developer's notifications, escaped, with their links and GitHub names marked: a link opens in
  // the browser (the app sends every web link the page follows there, Mac and Windows), @name is that GitHub user and
  // opens their profile.
  function richText(text) {
    const s = String(text ?? '');
    const re = /(https?:\/\/[^\s<>"'`]+)|(^|[^\w@./-])@([A-Za-z0-9](?:-?[A-Za-z0-9]){0,38})(?![\w-])/g;
    let out = '', last = 0, m;
    while ((m = re.exec(s))) {
      if (m[1]) {
        // The sentence's punctuation isn't part of the link, nor a ")" opened before it.
        let url = m[1];
        for (;;) {
          if (/[.,;:!?'"\]]$/.test(url)) url = url.slice(0, -1);
          else if (url.endsWith(')') && url.split('(').length < url.split(')').length) url = url.slice(0, -1);
          else break;
        }
        try { new URL(url); } catch { continue; }
        out += esc(s.slice(last, m.index)) + `<a class="rt-link" href="${esc(url)}" title="${esc(url)}">${esc(url)}</a>`;
        last = re.lastIndex = m.index + url.length;
      } else {
        const name = m[3];
        out += esc(s.slice(last, m.index) + m[2]) +
          `<a class="rt-user" href="https://github.com/${name}" title="github.com/${name}">@${name}</a>`;
        last = re.lastIndex;
      }
    }
    return out + esc(s.slice(last));
  }
  function openUpdate() {
    if (!S || !S.update || modal === 'first' || modal === 'update') return;
    const u = S.update, lines = noteLines(u.notes);
    modal = 'update';
    tellModal(true);
    root.className = 'on';
    root.innerHTML = `
      <div class="pk hk upd crt-on">
        <div class="pk-border"></div>
        <div class="pk-title"><img class="hk-logo" src="logo.png" alt=""><b>UPDATE AVAILABLE</b><span class="for">${esc(S.version || '?')} → ${esc(u.version)}</span></div>
        <div class="hk-body">
          <div class="hk-h">WHAT'S NEW IN ${esc(u.version)}</div>
          <ul class="up-notes">${(lines.length ? lines : ['fixes and improvements']).map((l) => `<li>${richText(l)}</li>`).join('')}</ul>
          <div class="up-bar" hidden><i></i></div>
          <p class="hk-status up-status"></p>
        </div>
        <div class="pk-foot"><span class="pk-sel note">restarts the app · chats keep running</span><button class="pk-cancel">later</button><button class="pk-ok up-go">update now</button></div>
      </div>`;
    q('.pk-cancel').onclick = close;
    q('.up-go').onclick = update;
    root.onmousedown = (e) => {
      if (e.target === root && !S.updating) close();
    };
    renderUpdateModal();
  }
  // While it downloads and installs: the progress, and no way out (the app restarts at the end).
  function renderUpdateModal() {
    if (modal !== 'update') return;
    const busy = !!S.updating;
    if (!busy && !S.update) return close();
    const go = q('.up-go'), st = q('.up-status');
    go.disabled = q('.pk-cancel').disabled = busy;
    go.textContent = busy ? 'updating…' : 'update now';
    st.className = `hk-status up-status${busy ? ' ok' : ''}`;
    st.textContent = busy ? S.updating + pct() : '';
    // The download as a bar, so a long one never looks frozen.
    const bar = q('.up-bar');
    bar.hidden = !(busy && S.updateProgress != null);
    bar.firstElementChild.style.width = `${Math.round((S.updateProgress || 0) * 100)}%`;
  }

  // ---------- what's new, after the update; tips (whatsnew.js) ----------
  // The same window read back, with one button: the notes of the version you're on (Help → What's New, the "updated"
  // note in the corner, Settings' version row) or of an older one (the notifications). What you voted for on the
  // Roadmap comes first and is marked, then the highlights; the rest behind "all changes". Opened from Settings, ok goes
  // back there.
  let wnUnread = false; // the notes of the version that came by itself, not opened yet (the app keeps it, until then)
  let wnBack = null; // the Settings category it came from
  const current = (list) => WhatsNew.find(list, S && S.version, S && S.build);
  async function openWhatsNew(version) {
    if (!S || !window.WhatsNew?.on || modal === 'first' || modal === 'update') return;
    // The version you're on even when it's older than the newest few (asked for by its build).
    const r = version ? WhatsNew.find(await WhatsNew.releases(), version) : await WhatsNew.release(S.version, S.build);
    const list = await WhatsNew.releases();
    wnList = list || wnList;
    if (!r) return toast(list ? 'no notes for this version yet' : errorText('offline'));
    const items = await WhatsNew.voted(r.version).catch(() => []);
    if (modal === 'first' || modal === 'update') return;
    const { top, more } = WhatsNew.arrange(r, items);
    const li = (l, rest) =>
      `<li${rest ? ' class="wn-rest" hidden' : ''}>${richText(l.text)}${l.voted ? ' <em class="wn-voted">YOU VOTED FOR THIS</em>' : ''}</li>`;
    wnBack = modal === 'menu' ? window.Settings?.current() || 'settings' : modal === 'whatsnew' || modal === 'tips' ? wnBack : null;
    modal = 'whatsnew';
    tellModal(true);
    root.className = 'on';
    root.innerHTML = `
      <div class="pk hk upd crt-on">
        <div class="pk-border"></div>
        <div class="pk-title"><img class="hk-logo" src="logo.png" alt=""><b>ORBITERM</b><span class="for">${esc(r.version)}</span></div>
        <div class="hk-body">
          <div class="hk-h">WHAT'S NEW IN ${esc(r.version)}</div>
          <ul class="up-notes">${(top.length ? top : [{ text: 'fixes and improvements' }]).map((l) => li(l)).join('')}${more.map((l) => li(l, true)).join('')}</ul>
          ${more.length ? `<button type="button" class="wn-more">all changes (${top.length + more.length}) ›</button>` : ''}
        </div>
        <div class="pk-foot"><span class="pk-sel note" title="${esc(new Date(r.publishedAt).toLocaleString())}">came out ${ago(r.publishedAt)}</span><button class="pk-ok wn-ok">ok</button></div>
      </div>`;
    const all = q('.wn-more');
    if (all) {
      all.onclick = () => {
        root.querySelectorAll('.wn-rest').forEach((el) => (el.hidden = false));
        all.remove();
      };
    }
    q('.wn-ok').onclick = closeWhatsNew;
    root.onmousedown = (e) => {
      if (e.target === root) closeWhatsNew();
    };
    // Opened: the version that came by itself stops counting in the notifications.
    if (wnUnread && (!version || r === current(list))) {
      wnUnread = false;
      window.webkit.messageHandlers.radar.postMessage({ type: 'whatsNewRead' });
      badges();
      if (shown === 'notifications') renderNotes();
    }
  }
  // Help → Tips: the features few people find, a sentence each, with the keys as they're set now.
  async function openTips() {
    if (!S || !window.WhatsNew?.on || modal === 'first' || modal === 'update') return;
    const keyOf = await WhatsNew.keys();
    if (modal === 'first' || modal === 'update') return;
    wnBack = modal === 'menu' ? window.Settings?.current() || 'settings' : modal === 'whatsnew' || modal === 'tips' ? wnBack : null;
    modal = 'tips';
    tellModal(true);
    root.className = 'on';
    root.innerHTML = `
      <div class="pk hk upd crt-on">
        <div class="pk-border"></div>
        <div class="pk-title"><img class="hk-logo" src="logo.png" alt=""><b>TIPS</b></div>
        <div class="hk-body">
          <div class="hk-h">THINGS YOU MIGHT NOT KNOW</div>
          <ul class="up-notes">${WhatsNew.tips(keyOf).map((t) => `<li><b>${esc(t.title)}</b> · ${esc(t.text)}</li>`).join('')}</ul>
        </div>
        <div class="pk-foot"><span class="pk-sel note">Help → Tips, any time</span><button class="pk-ok wn-ok">ok</button></div>
      </div>`;
    q('.wn-ok').onclick = closeWhatsNew;
    root.onmousedown = (e) => {
      if (e.target === root) closeWhatsNew();
    };
  }
  function closeWhatsNew() {
    const back = wnBack;
    wnBack = null;
    close();
    if (back) openMenu(back);
  }

  // The name's state reaches the page as a push from the app, before or after the call's reply.
  function whenState(test, then) {
    if (S && test(S)) then(S);
    else waitFor = { test, then, until: Date.now() + 10_000 };
  }

  // ---------- name field: live counter, allowed characters ----------
  function nameField(box, own, onReady) {
    const $$ = (sel) => box.querySelector(sel);
    const input = $$('.hk-input'), count = $$('.hk-count'), status = $$('.hk-status'), field = $$('.hk-field'), hint = $$('.hk-hint');
    const set = (cls, msg) => {
      status.className = `hk-status ${cls}`;
      status.textContent = msg;
    };
    const nudge = () => {
      field.classList.remove('shake');
      void field.offsetWidth;
      field.classList.add('shake');
      if (hint) {
        hint.classList.add('flash');
        setTimeout(() => hint.classList.remove('flash'), 900);
      }
    };
    function check() {
      const v = input.value, name = v.trim();
      count.textContent = `${v.length}/${MAX}`;
      count.classList.toggle('full', v.length >= MAX);
      // Settings: the input is as wide as the name, so the tag sits right after it.
      input.style.setProperty('--n', v.length || input.placeholder.length);
      set('', '');
      onReady(name.length >= 2 && name !== own);
    }
    // Letters, digits, _ . - and single spaces between words (a trailing one is fine while typing; it's trimmed).
    input.addEventListener('input', () => {
      const v = input.value;
      const clean = v.replace(/[^A-Za-z0-9_. -]/g, '').replace(/ {2,}/g, ' ').replace(/^ /, '').slice(0, MAX);
      if (clean !== v) {
        const at = Math.max(0, (input.selectionStart || 0) - (v.length - clean.length));
        input.value = clean;
        input.setSelectionRange(at, at);
        nudge();
      }
      check();
    });
    check();
    setTimeout(() => {
      input.focus();
      input.select();
    }, 80);
    return { input, set, nudge };
  }

  // Sends the name; on success the new state arrives (pushed by the app) and closes the dialog.
  // Offline, the app keeps the name and sends it when the API answers again ("queued").
  function submitter(type, f, ok, done) {
    return async () => {
      if (ok.disabled) return f.nudge();
      const name = f.input.value.trim();
      ok.disabled = true;
      f.set('wait', type === 'register' ? 'registering' : 'saving');
      const r = await call(type, { name }).catch(() => ({ error: 'offline' }));
      if (r.error) {
        f.set('bad', errorText(r.error));
        ok.disabled = r.error !== 'offline';
        return f.nudge();
      }
      if (r.queued) {
        toast(`saved on this ${MACHINE} · syncs when you're back online`);
        return close();
      }
      done(name);
    };
  }

  // ---------- first launch: the welcome ----------
  // One screen, three ways in, alike and none pushed: sign in with GitHub, sign in with a code sent by e-mail, or just
  // pick a hacker name and go on as a guest (this computer only; the account menu signs in later). Signing in to an
  // account you have brings back its name, XP and friends at once (a reinstall, another computer), with nothing asked.
  // A new account picks its name next, its GitHub login or its address's first half offered (editable before it's
  // saved). Signing in needs a token first: the app takes one without a name ("begin",
  // Cloud.swift), which the API keeps out of sight until there's a name. The window stays until the app has a name; a
  // restart halfway comes back to it, and to the name for an account signed in to already.
  let wel = null; // { step, email, timer, busy }: the step shown, the address a code went to, the wait for GitHub
  const welErr = (code) => (window.Account?.errText ? Account.errText(code) : errorText(code));
  const nameInput = () =>
    `<label class="hk-field"><span class="hk-prompt">$</span><input class="hk-input" maxlength="${MAX}" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="hacker name"><span class="hk-count"></span></label>`;
  const nameHint = `<p class="hk-hint">2–${MAX} characters · letters, digits, spaces, _ . - · plus a #tag</p>`;

  function openFirst() {
    if (modal === 'first') return;
    modal = 'first';
    tellModal(true);
    root.className = 'on first';
    root.innerHTML = `
      <div class="pk hk wel crt-on">
        <div class="pk-border"></div>
        <div class="pk-title"><img class="hk-logo" src="logo.png" alt=""><b>ORBITERM</b><span class="for">welcome</span></div>
        <div class="wel-step"></div>
      </div>`;
    const box = q('.wel');
    box.addEventListener('click', welClick);
    box.addEventListener('keydown', welKey);
    // `resume`: opened with a token already (a restart halfway): the account says which step (a new account without its
    // name: the name).
    wel = { step: '', email: '', timer: 0, busy: false, resume: !!(S && S.registered) };
    welcome('pick');
    if (wel.resume) window.Account?.load();
  }

  function welSay(msg, cls = '') {
    const st = q('.wel .hk-status');
    if (!st) return;
    st.className = `hk-status ${cls}`;
    st.textContent = msg;
  }

  function welcome(step, msg = '', cls = '') {
    if (modal !== 'first' || !wel) return;
    clearInterval(wel.timer);
    wel.step = step;
    const A = window.Account?.state();
    const GH = window.Account?.GH || '';
    const back = '<button type="button" class="pk-cancel" data-w="pick">‹ back</button>';
    let body = '', foot = '';
    if (step === 'pick') {
      body =
        '<p class="hk-line dim" style="--n:18;--d:0.25s"><span>&gt; link established</span></p>' +
        '<p class="hk-line" style="--n:29;--d:0.95s"><span>&gt; identify yourself, hacker_</span></p>' +
        '<div class="wel-ways">' +
        `<button type="button" class="wel-way" data-w="github">${GH}<span><b>Sign in with GitHub</b><small>in your browser</small></span></button>` +
        '<button type="button" class="wel-way" data-w="email"><i>@</i><span><b>Sign in with e-mail</b><small>we send you a 6-digit code · no password</small></span></button>' +
        `<button type="button" class="wel-way" data-w="name"><i>$</i><span><b>Pick a hacker name</b><small>no account · this ${MACHINE} only</small></span></button>` +
        '</div><p class="hk-status"></p>' +
        '<p class="hk-hint">Have an account? Sign in: your name, XP and friends come back.</p>';
      foot = '<span class="pk-sel note">just a name for now? sign in later from the account menu</span>';
    } else if (step === 'name') {
      body = `<div class="hk-h">PICK A HACKER NAME</div>${nameInput()}<p class="hk-status"></p>${nameHint}`;
      foot = `${back}<span class="pk-sel note">no account · tied to this ${MACHINE}</span><button type="button" class="pk-ok" disabled>enter ⏎</button>`;
    } else if (step === 'email') {
      body =
        '<div class="hk-h">SIGN IN WITH E-MAIL</div>' +
        '<label class="hk-field"><span class="hk-prompt">@</span><input class="hk-input wel-email" type="email" maxlength="254" spellcheck="false" autocomplete="email" autocapitalize="off" placeholder="you@example.com"></label>' +
        '<p class="hk-status"></p><p class="hk-hint">We e-mail you a 6-digit code to sign in with. No password.</p>';
      foot = `${back}<span class="pk-sel note"></span><button type="button" class="pk-ok" data-w="send">send code</button>`;
    } else if (step === 'code') {
      body =
        '<div class="hk-h">TYPE THE CODE</div>' +
        `<p class="wel-p">We sent a 6-digit code to <b>${esc(wel.email)}</b>. It works for 10 minutes.</p>` +
        '<label class="hk-field"><span class="hk-prompt">#</span><input class="hk-input wel-code" inputmode="numeric" maxlength="6" spellcheck="false" autocomplete="one-time-code" placeholder="6 digits"></label>' +
        '<p class="hk-status"></p>' +
        '<p class="hk-hint">Nothing came? <button type="button" class="wel-link" data-w="send">send a new code</button> · <button type="button" class="wel-link" data-w="email">use another address</button></p>';
      foot = `${back}<span class="pk-sel note"></span><button type="button" class="pk-ok" data-w="verify">sign in</button>`;
    } else if (step === 'github') {
      body =
        '<div class="hk-h">SIGN IN WITH GITHUB</div>' +
        '<p class="wel-p">Finish signing in in your browser. This window goes on by itself.</p>' +
        '<p class="hk-status"></p>' +
        '<p class="hk-hint">No GitHub tab? <button type="button" class="wel-link" data-w="github">open it again</button></p>';
      foot = `${back}<span class="pk-sel note"></span>`;
    } else if (step === 'newname') {
      // Signed in to a new account: its name, the last step. GitHub's login offered; an address's other account offered
      // instead (GitHub said that address is theirs; a code to it proves it, then the two are one, account.js's hint).
      const who = A && A.github ? `${GH}<b>${esc(A.github)}</b>` : `@ <b>${esc(A && A.email)}</b>`;
      body =
        `<div class="hk-h">NEW ACCOUNT</div><p class="wel-p"><span class="acct-ok">✓ signed in</span> ${who}</p>` +
        '<p class="wel-p">Last step: your hacker name, the one friends and the leaderboard see.</p>' +
        `${nameInput()}<p class="hk-status"></p>${nameHint}` +
        (A && A.emailHint
          ? `<div class="wel-other"><span><b>${esc(A.emailHint)}</b> already has an account of yours.</span><button type="button" class="mn-btn go" data-w="hint">sign in to that one</button></div>`
          : '');
      // Back: another way in (the address of an account you already have, or just a name).
      foot = `${back}<span class="pk-sel note">you can change it any time in Settings</span><button type="button" class="pk-ok" disabled>enter ⏎</button>`;
    }
    const host = q('.wel-step');
    host.innerHTML = `<div class="hk-body">${body}</div><div class="pk-foot">${foot}</div>`;
    if (msg) welSay(msg, cls);
    if (step === 'name' || step === 'newname') {
      const ok = host.querySelector('.pk-ok');
      const input = host.querySelector('.hk-input');
      // GitHub's login, or else the address's first half (the owner chose to offer it, 2026-11-14), as it fits a hacker
      // name (letters, digits, _ . - stay; 16 at most). Only offered: the field stays editable before anything is saved.
      const from = step === 'newname' && A ? A.github || String(A.email || wel.email || '').split('@')[0] : '';
      const login = from.replace(/[^A-Za-z0-9_.-]/g, '').slice(0, MAX);
      if (login.length >= 2) input.value = login;
      const f = nameField(host, null, (ready) => (ok.disabled = !ready));
      const submit = submitter('register', f, ok, (name) =>
        whenState((s) => s.registered && s.hackerName === name, (s) => toast(`welcome, ${s.hackerName}${tagText(s.tag)}`)),
      );
      ok.onclick = submit;
      f.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submit();
      });
    } else {
      const input = host.querySelector('.wel-email, .wel-code');
      // (Nothing focused on the three ways: none of them is the one to take.)
      if (input) {
        if (step === 'email') input.value = wel.email;
        // The sixth digit signs in (a pasted code too).
        if (step === 'code') input.addEventListener('input', () => input.value.replace(/\D/g, '').length === 6 && welVerify());
        setTimeout(() => input.focus(), 80);
      }
    }
  }

  function welClick(e) {
    const b = e.target.closest('[data-w]');
    if (!b || b.disabled || !wel) return;
    const w = b.dataset.w;
    if (w === 'pick' || w === 'name' || w === 'email') return welcome(w);
    if (w === 'github') return welGithub();
    if (w === 'send') return welSend();
    if (w === 'verify') return welVerify();
    if (w === 'hint') {
      wel.email = window.Account?.state()?.emailHint || '';
      return welSend();
    }
  }

  function welKey(e) {
    if (!wel) return;
    if (e.key === 'Escape' && ['name', 'email', 'code', 'github', 'newname'].includes(wel.step)) return welcome('pick');
    if (e.key !== 'Enter') return;
    if (e.target.closest('.wel-email')) welSend();
    if (e.target.closest('.wel-code')) welVerify();
  }

  // A token to sign in with (Cloud.begin), taken the first time a sign-in starts. Nil when it can't be had.
  async function welBegin() {
    if (S && S.registered) return true;
    const r = await call('begin').catch(() => ({ error: 'offline' }));
    if (r && r.error) {
      welSay(welErr(r.error), 'bad');
      return false;
    }
    return true;
  }

  async function welGithub() {
    welcome('github', 'opening GitHub in your browser', 'wait');
    if (!(await welBegin())) return;
    const r = await call('social', { method: 'POST', path: 'v1/auth/github', body: {} }).catch(() => ({ error: 'offline' }));
    if (!wel || wel.step !== 'github') return;
    if (!r || r.error) return welSay(welErr(r?.error), 'bad');
    await call('openSignIn', { url: r.url }).catch(() => {});
    welSay('waiting for GitHub', 'wait');
    // The browser comes back to the API, not here: ask the account every 2 s (and when the app comes to the front).
    const until = Date.now() + 10 * 60_000;
    clearInterval(wel.timer);
    wel.timer = setInterval(() => {
      if (modal !== 'first' || !wel || wel.step !== 'github') return clearInterval(wel?.timer);
      if (Date.now() > until) {
        clearInterval(wel.timer);
        return welSay('that took too long · try again', 'bad');
      }
      window.Account?.load();
    }, 2000);
  }

  async function welSend() {
    const input = q('.wel-email');
    if (input) wel.email = input.value.trim();
    if (!wel.email) return welcome('email');
    if (wel.busy) return;
    wel.busy = true;
    welSay('sending the code', 'wait');
    const ok = await welBegin();
    const r = ok ? await call('social', { method: 'POST', path: 'v1/auth/email', body: { email: wel.email } }).catch(() => ({ error: 'offline' })) : null;
    wel.busy = false;
    if (!ok) return;
    if (!r || r.error) return welSay(welErr(r?.error), 'bad');
    welcome('code', `a code is on its way to ${wel.email}`, 'ok');
  }

  async function welVerify() {
    const input = q('.wel-code');
    const code = (input ? input.value : '').replace(/\D/g, '');
    if (code.length !== 6) return input?.focus();
    if (wel.busy) return;
    wel.busy = true;
    welSay('checking', 'wait');
    const r = await call('social', { method: 'POST', path: 'v1/auth/email/verify', body: { email: wel.email, code } }).catch(() => ({ error: 'offline' }));
    wel.busy = false;
    if (!r || r.error) {
      welSay(welErr(r?.error), 'bad');
      return input?.select();
    }
    // The account says what's next (welAccount): its name and XP, or a name for a new one; a merge question if this
    // computer had its own (account.js).
    welSay('signed in', 'ok');
    window.Account?.load();
  }

  // The account as account.js loaded it: a sign-in finished (in the browser, with a code, or before a restart).
  function welAccount() {
    if (modal !== 'first' || !wel || wel.step === 'done') return;
    const A = window.Account?.state();
    if (!A) return;
    const resume = wel.resume;
    wel.resume = false;
    // This computer had something of its own: account.js asks which name to keep (or to bring back a deleted account).
    if (A.pending) return welSay('one more step · answer the question in front', 'wait');
    // GitHub came back without signing in (turned down, cut short, refused): why, at once, not after 10 minutes.
    if (wel.step === 'github' && A.githubFailed) {
      clearInterval(wel.timer);
      return welSay(welErr(A.githubFailed), 'bad');
    }
    if (!A.signedIn) return;
    // A new account without its name: the name, right after signing in or on coming back to it; not again after "back"
    // (another way in was asked for) until another sign-in.
    if (!A.name) return resume || wel.step === 'github' || wel.step === 'code' ? welcome('newname') : undefined;
    // An account with its name: it's back. The app takes it in (name, XP), and the window closes once it has.
    clearInterval(wel.timer);
    wel.step = 'done';
    welSay(`signed in · welcome back, ${A.name}${tagText(A.tag)}`, 'ok');
    whenState((s) => s.registered && !!s.hackerName, (s) => toast(`welcome back, ${s.hackerName}${tagText(s.tag)}`));
    call('refresh').then((s) => s && render(s)).catch(() => {});
  }
  window.addEventListener('account', welAccount);
  // Back from the browser: a GitHub sign-in may be done.
  window.addEventListener('focus', () => modal === 'first' && wel && S && S.registered && window.Account?.load());

  // ---------- Settings ----------
  // One window, Settings only, as macOS System Settings: its categories down the left are the only way around it
  // (settings.js). Opened by the gear, the app menu's Settings… and the account menu. Your name#tag and status are
  // in the account menu (account.js), your profile is a page of its own (openProfile).
  // which: 'settings' or nothing (the category used last), 'keys' (Shortcuts), a category's id (that one), or
  // 'profile' (the profile page, for what still asks the menu for it).
  function openMenu(which) {
    if (!S) return;
    if (which === 'profile') {
      if (modal === 'menu') close();
      return openProfile();
    }
    const pane = which === 'keys' ? 'shortcuts' : which === 'settings' ? null : which || null;
    if (modal === 'menu') return showTab(pane);
    if (modal) return;
    modal = 'menu';
    tellModal(true);
    root.className = 'on';
    // The yellow and green lights do nothing here, so they're drawn dim (Apple HIG, Settings).
    root.innerHTML = `
      <div class="mn-wrap"><div class="pk hk menu crt-on">
        <div class="pk-border"></div>
        <div class="pk-title"><span class="lights"><i class="l-close" title="Close"></i><i class="l-min off" aria-hidden="true"></i><i class="l-max off" aria-hidden="true"></i></span><img class="hk-logo" src="logo.png" alt=""><b>SETTINGS</b></div>
        <div class="mn-body">
          <section class="mn-page mn-settings" data-page="settings">${window.Settings.html({ max: MAX, tag: tagText(S.tag), ui: UI, savers: SAVERS, notesai: NOTESAI, archive: ARCHIVE(), trash: TRASH(), keys: KEYS })}</section>
        </div>
        <div class="pk-foot"><span class="pk-sel note">esc to close</span></div>
      </div></div>`;

    // settings: its categories (settings.js). The hacker name is changed on your profile ("Edit profile", rename below).
    const settings = q('.mn-settings');
    window.Settings.mount(settings);
    settings.querySelector('.arc-open')?.addEventListener('click', openArchive);
    settings.querySelector('.trash-open')?.addEventListener('click', openTrash);

    q('.hk-sw.act').onclick = toggleActivity;
    q('.hk-sw.brd').onclick = toggleBoard;
    q('.hk-sw.tkn').onclick = () => toggleTokens('tokensName');
    q('.hk-sw.tkd').onclick = () => toggleTokens('tokensDetail');
    window.Community?.mountSettings(q('.mn-settings'));
    window.Account?.mount(q('.acct-host'));
    window.Account?.mountDanger?.(q('.danger-host'));
    window.Profile?.mount(q('.prof-host'));
    const pwr = q('.hk-sw.pwr-auto');
    if (pwr) pwr.onclick = () => window.webkit.messageHandlers.radar.postMessage({ type: 'powerSaveAuto', on: !window.__powerSave?.auto });
    const dcOn = q('.hk-sw.dc-on'), dcProj = q('.hk-sw.dc-proj'), dcAct = q('.hk-sw.dc-act');
    if (dcOn) dcOn.onclick = () => window.webkit.messageHandlers.radar.postMessage({ type: 'discordPresence', on: !window.__discord?.on });
    if (dcProj) dcProj.onclick = () => window.webkit.messageHandlers.radar.postMessage({ type: 'discordProject', on: !window.__discord?.project });
    if (dcAct) dcAct.onclick = () => window.webkit.messageHandlers.radar.postMessage({ type: 'discordActive', on: !window.__discord?.active });
    // Shortcuts: the list (renderKeys) and its search
    const find = q('.ks-find');
    if (find) {
      find.addEventListener('input', filterKeys);
      // Esc in a search with something typed empties it first, as macOS's search fields; then it closes Settings.
      find.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape' || !find.value) return;
        e.stopPropagation();
        find.value = '';
        filterKeys();
      });
      renderKeys();
    }
    q('.l-close').onclick = close;
    root.onmousedown = (e) => {
      if (e.target === root) close();
    };
    showTab(pane);
    renderInfo();
    renderActivity();
    renderPower();
    renderDiscord();
    renderSocial();
    // Whatever changed while you weren't looking (a missed live event, another device) shows when the menu opens.
    Social.load();
  }

  // ---------- feedback: its own window over the main menu, opened by the speech bubble beside it ----------
  // Goes straight to the developer with who sent it and when, no e-mail; ⌘↩ sends, esc goes back to the menu. Up to
  // 4000 characters (the API and the database hold the same limit); the count shows once it's close.
  const FEEDBACK_MAX = 4000;
  // Feedback (the activity bar's foot): a window of its own that sends straight to the developer.
  function openFeedback() {
    if (modal) return;
    modal = 'feedback';
    tellModal(true);
    root.className = 'on';
    root.innerHTML = `
      <div class="pk hk fbk crt-on">
        <div class="pk-border"></div>
        <div class="pk-title"><span class="lights"><i class="l-close" title="Close"></i><i class="l-min"></i><i class="l-max"></i></span>${BUBBLE}<b>FEEDBACK</b></div>
        <div class="hk-body">
          <label class="hk-field fbk-field"><textarea class="fbk-in" maxlength="${FEEDBACK_MAX}" placeholder="A bug, an idea, something that bothers you…&#10;It goes straight to the developer with your name#tag, no e-mail needed."></textarea></label>
        </div>
        <div class="pk-foot"><span class="pk-sel hk-status fbk-status"></span><button class="pk-ok fbk-send" title="${MOD}↩" disabled>send</button></div>
      </div>`;
    const $ = (sel) => root.querySelector(sel);
    const box = $('.fbk-in'), send = $('.fbk-send'), status = $('.fbk-status');
    const say = (cls, msg) => {
      status.className = `pk-sel hk-status fbk-status ${cls}`;
      status.textContent = msg;
    };
    const update = () => {
      const n = box.value.length;
      send.disabled = !box.value.trim();
      say(n >= FEEDBACK_MAX ? 'full' : '', n > FEEDBACK_MAX - 400 ? `${n} / ${FEEDBACK_MAX}` : '');
    };
    box.value = feedbackDraft;
    update();
    box.addEventListener('input', () => {
      feedbackDraft = box.value;
      update();
    });
    const submit = async () => {
      const text = box.value.trim();
      if (!text || send.disabled) return;
      send.disabled = true;
      say('wait', 'sending');
      const r = await Social.feedback(text);
      if (r.error) {
        send.disabled = false;
        return say('bad', errorText(r.error));
      }
      feedbackDraft = '';
      close();
      toast('feedback sent · thank you, every one is read');
    };
    send.onclick = submit;
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        submit();
      }
    });
    $('.l-close').onclick = close;
    root.onmousedown = (e) => {
      if (e.target === root) close();
    };
    setTimeout(() => box.focus(), 60);
  }

  const REQUEST_ERRORS = {
    not_found: 'no hacker with that name#tag',
    self: "that's you",
    already_friends: 'you are friends already',
    already_requested: 'request already sent',
    bad_handle: 'write it as name#0427',
    too_many_requests: 'too many requests waiting · cancel some first',
    signed_out: 'pick a hacker name first',
  };

  // Settings in front: on `pane` when it's opened for one (not remembered: the gear and the app menu keep the one used last),
  // then the field or the category settings.js picks, once nameField has had its turn (never a hidden field).
  function showTab(pane) {
    if (pane) window.Settings?.show(pane, false);
    setTimeout(() => window.Settings?.focusTarget()?.focus(), 100);
    renderSaver();
    renderNotesAI();
    renderUI();
    window.Fonts?.mount(q('.mn-settings'));
  }

  // ---------- archived chats ----------
  // The chats archived from the chats list (the Mac app's Sidebar.swift keeps them) are out of it, and out of Settings
  // too: as in Claude's and ChatGPT's settings, a button there opens them in a window of their own, by folder, where a
  // chat, a whole folder or all of them come back with a click. Settings itself shows nothing of them.
  const ARCHIVE = () => !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.archive);
  const archiveCall = (msg) => window.webkit.messageHandlers.archive.postMessage(msg);
  function openArchive() {
    if (!ARCHIVE()) return;
    chatsWindow('ARCHIVED CHATS');
    renderArchive();
  }
  // The window the archived chats and the deleted ones (below) open in, one at a time.
  function chatsWindow(title) {
    let layer = document.getElementById('arcmodal');
    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'arcmodal';
      document.body.appendChild(layer);
      addEventListener('keydown', archiveKey, true);
    }
    layer.innerHTML =
      '<div class="pk hk arc-pk crt-on"><div class="pk-border"></div>' +
      `<div class="pk-title"><img class="hk-logo" src="logo.png" alt=""><b>${title}</b></div>` +
      '<div class="hk-body"><div class="arc"></div></div>' +
      '<div class="pk-foot"><span class="pk-sel note">esc to close</span><button type="button" class="pk-cancel arc-close">close</button></div></div>';
    layer.onmousedown = (e) => e.target === layer && closeArchive();
    layer.querySelector('.arc-close').onclick = closeArchive;
  }
  function closeArchive() {
    document.getElementById('arcmodal')?.remove();
    removeEventListener('keydown', archiveKey, true);
  }
  // Esc closes this window only, Settings stays under it.
  function archiveKey(e) {
    if (e.key !== 'Escape') return;
    e.preventDefault();
    e.stopPropagation();
    closeArchive();
  }
  async function renderArchive(r) {
    const box = document.querySelector('#arcmodal .arc');
    if (!box) return;
    if (!r) r = await archiveCall({ type: 'list' }).catch(() => null);
    const folders = (r && r.folders) || [];
    const total = folders.reduce((n, f) => n + f.chats.length, 0);
    box.innerHTML = !total
      ? '<p class="arc-none">nothing archived · right-click a chat or a folder in the chats list to archive it</p>'
      : `<div class="arc-head"><span>${total} archived chat${total === 1 ? '' : 's'}</span><button type="button" class="arc-btn" data-act="all">unarchive all</button></div>` +
        '<div class="arc-list">' +
        folders.map((f) =>
          `<div class="arc-folder"><div class="arc-f"><span title="${esc(f.cwd)}">${esc(f.label)}<i>${f.chats.length}</i></span>` +
          `<button type="button" class="arc-btn" data-act="folder" data-cwd="${esc(f.cwd)}">unarchive folder</button></div>` +
          f.chats.map((c) => `<div class="arc-c"><span title="${esc(c.title || '')}">${esc(c.title || 'untitled')}</span>` +
            `<button type="button" class="arc-btn" data-act="chat" data-id="${esc(c.id)}">unarchive</button></div>`).join('') +
          '</div>').join('') +
        '</div>';
    box.onclick = async (e) => {
      const b = e.target.closest('.arc-btn');
      if (!b) return;
      const act = b.dataset.act;
      const msg = act === 'all' ? { type: 'restoreAll' } : act === 'folder' ? { type: 'restoreFolder', cwd: b.dataset.cwd } : { type: 'restore', id: b.dataset.id };
      renderArchive(await archiveCall(msg).catch(() => null));
    };
  }

  // ---------- deleted chats ----------
  // A chat deleted from the chats list leaves it at once, and the Mac app (Sidebar.swift, ChatTrash.swift) keeps it 30
  // days before its files go. Until then it's here, in the same window as the archived ones: by folder, each with the
  // days it has left, to put back in the list (one or all) or to delete now (the app asks first: that can't be undone).
  const TRASH = () => !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.trash);
  const trashCall = (msg) => window.webkit.messageHandlers.trash.postMessage(msg);
  function openTrash() {
    if (!TRASH()) return;
    chatsWindow('DELETED CHATS');
    renderTrash();
  }
  async function renderTrash(r) {
    const box = document.querySelector('#arcmodal .arc');
    if (!box) return;
    if (!r) r = await trashCall({ type: 'list' }).catch(() => null);
    const folders = (r && r.folders) || [];
    const keep = (r && r.days) || 30;
    const total = folders.reduce((n, f) => n + f.chats.length, 0);
    const left = (d) => (d <= 1 ? 'last day' : `${d} days left`);
    box.innerHTML = !total
      ? `<p class="arc-none">nothing deleted · right-click a chat in the chats list to delete it: it stays here ${keep} days</p>`
      : `<div class="arc-head"><span>${total} deleted chat${total === 1 ? '' : 's'}</span><span class="arc-acts">` +
        '<button type="button" class="arc-btn" data-act="backAll">put all back</button>' +
        '<button type="button" class="arc-btn arc-del" data-act="eraseAll">delete all now</button></span></div>' +
        '<div class="arc-list arc-trash">' +
        folders.map((f) =>
          `<div class="arc-folder"><div class="arc-f"><span title="${esc(f.cwd)}">${esc(f.label)}<i>${f.chats.length}</i></span></div>` +
          f.chats.map((c) => `<div class="arc-c"><span title="${esc(c.title || '')}">${esc(c.title || 'untitled')}</span>` +
            (c.tool === 'codex' || c.tool === 'antigravity' ? `<i class="arc-tool">${c.tool === 'codex' ? 'codex' : 'agy'}</i>` : '') +
            `<i class="arc-left">${left(c.days)}</i>` +
            `<button type="button" class="arc-btn" data-act="back" data-id="${esc(c.id)}">put back</button>` +
            `<button type="button" class="arc-btn arc-del" data-act="erase" data-id="${esc(c.id)}">delete now</button></div>`).join('') +
          '</div>').join('') +
        '</div>';
    box.onclick = async (e) => {
      const b = e.target.closest('.arc-btn');
      if (!b) return;
      const act = b.dataset.act;
      const msg = act === 'backAll' ? { type: 'putBackAll' } : act === 'eraseAll' ? { type: 'eraseAll' }
        : { type: act === 'back' ? 'putBack' : 'erase', id: b.dataset.id };
      renderTrash(await trashCall(msg).catch(() => null));
    };
  }

  // ---------- the interface's font and text size ----------
  // Kept by the app (Themes.swift's ThemeStore on the Mac, themes.js on Windows) and set through the theme bridge: the
  // font goes on every page, the size is the dashboard's zoom.
  const UI = !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.theme);
  const uiCall = (msg) => window.webkit.messageHandlers.theme.postMessage(msg);
  function showUI(ui) {
    const font = q('.ui-font'), scale = q('.ui-scale');
    if (!ui || !ui.fonts || !font || !scale) return;
    setHTML(font, ui.fonts.map((f) => `<button type="button" data-font="${esc(f.id)}" class="${f.id === ui.font ? 'on' : ''}">${esc(f.name)}</button>`).join(''));
    setHTML(scale, ui.scales.map((x) => `<button type="button" data-scale="${x}" class="${x === ui.scale ? 'on' : ''}">${Math.round(x * 100)}%</button>`).join(''));
    const ai = q('.ui-ai');
    if (ai) {
      ai.setAttribute('aria-checked', ui.aiColors === false ? 'false' : 'true');
      ai.disabled = false;
    }
  }
  async function renderUI() {
    if (!UI || !q('.ui-font')) return;
    showUI(await uiCall({ type: 'ui' }).catch(() => null));
    q('.ui-font').onclick = async (e) => {
      const b = e.target.closest('button[data-font]');
      if (b) showUI(await uiCall({ type: 'setUI', font: b.dataset.font }).catch(() => null));
    };
    q('.ui-scale').onclick = async (e) => {
      const b = e.target.closest('button[data-scale]');
      if (b) showUI(await uiCall({ type: 'setUI', scale: Number(b.dataset.scale) }).catch(() => null));
    };
    const ai = q('.ui-ai');
    if (ai) {
      ai.onclick = async () => {
        ai.disabled = true;
        showUI(await uiCall({ type: 'setUI', aiColors: ai.getAttribute('aria-checked') !== 'true' }).catch(() => null));
        ai.disabled = false;
      };
    }
  }

  // ---------- the token savers ----------
  // rtk and caveman, which the app ships and turns on for Claude Code, Codex and Antigravity (TokenSavers.swift / savers.js):
  // a switch each, and what rtk saved. One the user set up themselves switches the same way.
  const SAVERS = !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.savers);
  const saversCall = (msg) => window.webkit.messageHandlers.savers.postMessage(msg);
  const compact = (n) => new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n);
  const SAVER_OFF = { rtk: "off · Claude Code, Codex and Antigravity read commands' output in full", caveman: 'off · full-length answers' };
  function showSavers(all) {
    if (!all) return;
    for (const which of ['rtk', 'caveman']) {
      const st = all[which], sw = q(`.hk-sw.ts[data-which="${which}"]`), note = q(`.ts-note[data-which="${which}"]`);
      if (!st || !sw || !note) continue;
      sw.setAttribute('aria-checked', st.on ? 'true' : 'false');
      sw.disabled = !st.available;
      sw.title = `Turn ${which} on or off`;
      note.textContent = !st.available ? 'not in this build'
        : st.saved != null ? `saved ${compact(st.saved)} tokens so far, ${Math.round(st.pct)}% of what ${compact(st.commands)} commands printed`
        : st.on ? (which === 'caveman' ? 'on · about two thirds fewer output tokens, from the next chat' : 'on · nothing saved yet') : SAVER_OFF[which];
    }
  }
  async function renderSaver() {
    if (!SAVERS || !q('.hk-sw.ts')) return;
    showSavers(await saversCall({ type: 'state' }).catch(() => null));
    root.querySelectorAll('.hk-sw.ts').forEach((sw) => {
      sw.onclick = async () => {
        const which = sw.dataset.which, on = sw.getAttribute('aria-checked') !== 'true';
        sw.disabled = true;
        q(`.ts-note[data-which="${which}"]`).textContent = on ? `turning ${which} on…` : `turning ${which} off…`;
        showSavers(await saversCall({ type: 'set', which, on }).catch(() => null));
      };
    });
  }

  // ---------- AI tools and the notes ----------
  // Whether Claude Code, Codex and Antigravity in Orbiterm's terminals may read and edit the notes (NotesAI.swift). Off until the
  // user turns it on, and the app asks natively before it does.
  const NOTESAI = !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.notesai);
  const notesAiCall = (msg) => window.webkit.messageHandlers.notesai.postMessage(msg);
  const NA_NOTE = {
    off: "off · AI tools can't see your notes",
    read: 'on · AI tools can read your notes, never change them · passwords and keys are masked',
    write: 'on · AI tools can read your notes and add to or edit them, every change can be undone · passwords and keys are masked',
  };
  function showNotesAI(st) {
    const note = q('.na-note');
    if (!st || !note) return;
    root.querySelectorAll('.st-notesai button').forEach((b) => b.classList.toggle('on', b.dataset.mode === st.mode));
    // Claude Desktop, outside Orbiterm, also needs Settings > Claude: on to read, Watch and type to change a note (NotesTools).
    const desk = { read: ' · Claude Desktop can read them too while Settings > Claude is on', write: ' · Claude Desktop can read them while Settings > Claude is on, and change them only when it is Watch and type' };
    note.textContent = NA_NOTE[st.mode] + (desk[st.mode] || '') + ' · hide a note from AI with the eye on it, or right-click it on the board' + (st.mode !== 'off' && !st.ready ? ' · starts with the next build that has the MCP server' : '');
  }
  async function renderNotesAI() {
    if (!NOTESAI || !q('.st-notesai')) return;
    showNotesAI(await notesAiCall({ type: 'state' }).catch(() => null));
    root.querySelectorAll('.st-notesai button').forEach((b) => {
      b.onclick = async () => showNotesAI(await notesAiCall({ type: 'mode', mode: b.dataset.mode }).catch(() => null));
    });
  }

  // ---------- shortcuts ----------
  // The keys of the app's actions, as the user wants them (the Mac app's Shortcuts.swift keeps them and sets the menus):
  // click one, press the new keys. Esc cancels, Delete takes them off; ↺ brings one back to how it came.
  const KEYS = !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.keys);
  const keysCall = (msg) => window.webkit.messageHandlers.keys.postMessage(msg);
  let keysMsg = null; // { id, text }: why the keys pressed for that action weren't taken
  // The shortcut wheel, as small as a settings icon: its five slices around the middle, the first one lit.
  const WHEEL_ICON = (() => {
    const C = 32, R0 = 10, R1 = 28, N = 5, GAP = 7;
    const pt = (r, deg) => `${(C + r * Math.cos((deg * Math.PI) / 180)).toFixed(2)} ${(C + r * Math.sin((deg * Math.PI) / 180)).toFixed(2)}`;
    let slices = '';
    for (let i = 0; i < N; i++) {
      const mid = -90 + (i * 360) / N, a = mid - 180 / N + GAP / 2, b = mid + 180 / N - GAP / 2;
      slices += `<path${i ? '' : ' class="on"'} d="M${pt(R0, a)} L${pt(R1, a)} A${R1} ${R1} 0 0 1 ${pt(R1, b)} L${pt(R0, b)} A${R0} ${R0} 0 0 0 ${pt(R0, a)}Z"/>`;
    }
    return `<svg class="ksw-ico" viewBox="0 0 64 64" aria-hidden="true"><circle class="ring" cx="32" cy="32" r="31"/>${slices}<circle class="dot" cx="32" cy="32" r="3"/></svg>`;
  })();
  // How the shortcut wheel opens, on top of the page, as VS Code shows a command's keys: the primary way, the trackpad's
  // four-finger click, and a secondary one you set: keys, or a mouse button with modifiers held (⌃ and the middle
  // button to begin with, as on Windows).
  function wheelCard(k) {
    const label = k?.label || '';
    return (
      `<div class="ks-wheel">${WHEEL_ICON}<div class="ksw-txt"><b>Ring</b><span>Your folders around the pointer: pick one and a chat opens there.</span></div>` +
      '<div class="ksw-how">' +
      '<div><small>primary</small><span class="ks-key fixed">4-finger click</span></div>' +
      '<div><small>secondary</small>' +
      (k?.changed ? '<button type="button" class="ks-undo" data-id="shortcutsWheel" title="Back to how it came">↺</button>' : '') +
      `<button type="button" class="ks-key${label ? '' : ' none'}" data-id="shortcutsWheel" data-mouse="1" title="Click, then press keys or a mouse button (hold ⌃ ⌥ ⇧ ⌘ with it if you like). Delete: none">${label ? esc(label) : '—'}</button></div>` +
      '</div></div>'
    );
  }
  // What a search finds a shortcut by (Settings › Shortcuts here, the list of them all in cheatsheet.js): `find`, its
  // name, group and keys as written; `keys`, the keys' parts one by one (⇧⌘t, t, shift, cmd, command). A word that names
  // a modifier (cmd, shift…) or has its sign matches the keys only, and so does a single letter typed with one: "cmd t"
  // finds ⌘T, not every row with a t in it. A single letter alone finds a name's word starting with it too.
  const MODS = { '⌘': ['cmd', 'command'], '⇧': ['shift'], '⌥': ['opt', 'option', 'alt'], '⌃': ['ctrl', 'control'] };
  const MOD_WORDS = Object.values(MODS).flat();
  const keyFind = {
    keys: (labels) =>
      labels.filter(Boolean).flatMap((l) => {
        const t = l.toLowerCase();
        return [t, t.replace(/[⌘⇧⌥⌃]/g, '').trim(), ...[...t].flatMap((c) => MODS[c] || [])];
      }).join(' '),
    words: (typed) => typed.trim().toLowerCase().split(/\s+/).filter(Boolean),
    match(words, find, keys) {
      const parts = keys.split(' ');
      const byKeys = words.some((w) => MOD_WORDS.includes(w) || /[⌘⇧⌥⌃]/.test(w));
      return words.every((w) =>
        MOD_WORDS.includes(w) ? parts.includes(w)
          : /[⌘⇧⌥⌃]/.test(w) ? keys.includes(w)
            : w.length === 1 ? parts.includes(w) || (!byKeys && find.split(/[^a-z0-9]+/).some((x) => x.startsWith(w)))
              : find.includes(w) || keys.includes(w));
    },
  };
  // Settings › Shortcuts (settings.js gives the page and its search, filterKeys): the shortcut wheel's card, then an
  // action per row in the groups Shortcuts.swift names, its keys on a key cap to click; why a change didn't take shows
  // under the row it was for (keysMsg), not out of sight at the top of the list.
  async function renderKeys(st) {
    const page = q('.mn-keys');
    if (!page) return;
    if (!st) st = (await keysCall({ type: 'list' }).catch(() => null)) || {};
    if (!page.isConnected) return;
    const all = st.shortcuts || [];
    const list = all.filter((k) => k.id !== 'shortcutsWheel');
    const groups = [];
    for (const k of list) (groups.find((g) => g.name === k.group) || (groups.push({ name: k.group, items: [] }), groups[groups.length - 1])).items.push(k);
    const msg = (id) => (keysMsg && keysMsg.id === id ? `<p class="ks-msg on" role="alert">${esc(keysMsg.text)}</p>` : '');
    const wheel = all.find((k) => k.id === 'shortcutsWheel');
    // The list of them all (cheatsheet.js), with the keys that open it now; Help's menu when they were taken off.
    const sheet = all.find((k) => k.id === 'keyboardShortcuts')?.label;
    page.innerHTML =
      wheelCard(wheel) + msg('shortcutsWheel') +
      groups.map((g) => `<section class="st-group ks-group"><h3 class="st-h">${esc(g.name)}</h3><div class="st-box">` + g.items.map((k) =>
        `<div class="ks-row" data-find="${esc(`${k.title} ${g.name} ${k.label || ''}`.toLowerCase())}" data-keys="${esc(keyFind.keys([k.label]))}"><span>${esc(k.title)}</span>` +
        (k.changed ? `<button type="button" class="ks-undo" data-id="${esc(k.id)}" title="Back to how it came" aria-label="${esc(k.title)}: back to how it came">↺</button>` : '') +
        `<button type="button" class="ks-key${k.label ? '' : ' none'}" data-id="${esc(k.id)}" title="Click, then press the new keys · Delete: none" aria-label="${esc(k.title)}: ${k.label ? esc(k.label) : 'no keys'}">${k.label ? esc(k.label) : '—'}</button></div>` +
        msg(k.id)).join('') + '</div></section>').join('') +
      '<p class="ks-none" hidden></p>' +
      '<div class="ks-foot">' +
      `<p class="st-note">${sheet ? `see them all any time with <kbd>${esc(sheet)}</kbd>` : 'see them all any time in Help › Keyboard Shortcuts'}</p>` +
      (all.some((k) => k.changed) ? '<button type="button" class="st-btn ks-all" title="Every shortcut back to how it came">reset all</button>' : '') +
      '</div>';
    const card = page.querySelector('.ks-wheel');
    if (card) {
      card.dataset.find = `ring shortcut wheel chats 4-finger click ${wheel?.label || ''}`.toLowerCase();
      card.dataset.keys = keyFind.keys([wheel?.label]);
    }
    page.onclick = onKeysClick;
    filterKeys();
  }
  // The search over Settings › Shortcuts: the rows with every word typed (keyFind); a group left without any goes, and
  // a line says when nothing has them.
  function filterKeys() {
    const page = q('.mn-keys'), find = q('.ks-find');
    if (!page || !find) return;
    const words = keyFind.words(find.value);
    let n = 0;
    page.querySelectorAll('[data-find]').forEach((el) => {
      const on = keyFind.match(words, el.dataset.find, el.dataset.keys || '');
      el.hidden = !on;
      if (on) n++;
    });
    page.querySelectorAll('.ks-group').forEach((g) => (g.hidden = !g.querySelector('.ks-row:not([hidden])')));
    page.querySelectorAll('.ks-msg').forEach((m) => (m.hidden = !!words.length));
    const none = page.querySelector('.ks-none');
    if (none) {
      none.hidden = n > 0;
      none.textContent = n ? '' : `no shortcut has “${find.value.trim()}”`;
    }
  }
  async function onKeysClick(e) {
    const undo = e.target.closest('.ks-undo'), all = e.target.closest('.ks-all'), key = e.target.closest('.ks-key');
    if (!undo && !all && !key) return;
    keysMsg = null;
    if (undo || all) return renderKeys(await keysCall({ type: 'reset', id: undo ? undo.dataset.id : '' }));
    if (key.classList.contains('rec') || key.classList.contains('fixed')) return;
    key.classList.add('rec');
    const mouse = !!key.dataset.mouse;
    key.textContent = mouse ? 'keys or a mouse button…' : 'press keys…';
    const r = await keysCall({ type: 'record', mouse }).catch(() => ({ cancel: true }));
    if (r.cancel) return renderKeys();
    const done = await keysCall({ type: 'set', id: key.dataset.id, combo: r.combo });
    if (done.error) keysMsg = { id: key.dataset.id, text: done.error };
    renderKeys(done.error ? null : done);
  }

  async function copyHandle() {
    const text = S.hackerName ? `${S.hackerName}${tagText(S.tag)}` : '';
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast(`copied ${text} · send it to a friend`);
    } catch {
      toast(text);
    }
  }

  // Your status, like Discord's: online, away, do not disturb, invisible. A small menu put in `host` (the account menu's
  // status row, account.js); called again it closes. `picked`: once one was picked, before the server answers.
  function statusMenu(host, picked) {
    if (!host) return null;
    const open = host.querySelector('.mn-pick');
    if (open) return open.remove(), null;
    const me = Social.state()?.me;
    const pick = document.createElement('div');
    pick.className = 'mn-pick';
    pick.setAttribute('role', 'menu');
    pick.setAttribute('aria-label', 'Your status');
    pick.innerHTML = ['online', 'idle', 'dnd', 'invisible']
      .map((st) => `<button type="button" role="menuitemradio" aria-checked="${!!me && me.status === st}" data-status="${st}" class="${me && me.status === st ? 'on' : ''}">${Social.dot(st)}<span><b>${Social.PRESENCE[st].label}</b><small>${Social.PRESENCE[st].hint}</small></span></button>`)
      .join('');
    pick.onclick = async (e) => {
      const b = e.target.closest('[data-status]');
      if (!b) return;
      pick.remove();
      picked?.(b.dataset.status);
      const r = await Social.setStatus(b.dataset.status);
      if (r.error) return toast(errorText(r.error));
    };
    host.appendChild(pick);
    return pick;
  }

  const ago = (at) => {
    const s = Math.max(0, (Date.now() - new Date(at)) / 1000);
    return s < 60 ? 'now' : s < 3600 ? `${Math.floor(s / 60)}m ago` : s < 86400 ? `${Math.floor(s / 3600)}h ago` : `${Math.floor(s / 86400)}d ago`;
  };
  const tagged = (p) => `<b>${esc(p.name)}<i>#${String(p.tag).padStart(4, '0')}</i></b>`;

  // Friends and requests (their view), from Social's snapshot. Your status is in the account menu (account.js).
  function renderSocial() {
    badges();
    const s = Social.state();
    // Your status (the dot on your picture, its word) is shown on your profile.
    if (shown !== 'friends') return;
    meCard();
    const unread = Social.unread(), requests = Social.requests();
    const online = s ? s.friends.filter((f) => f.presence && f.presence !== 'offline').length : 0;
    setText(fq('.cv-friends .meta'), s ? `${s.friends.length} friends · ${online} online${unread ? ` · ${unread} unread` : ''}` : '');
    setText(fq('.cv-requests .meta'), requests ? `${requests} waiting for you` : '');
    if (!s) {
      const why = S.reachable ? 'loading…' : "can't reach the server · friends come back with the connection";
      setHTML(fq('.mn-friends'), `<div class="mn-empty">${why}</div>`);
      return;
    }
    // A friend's row, as Discord's and Steam's: their picture (GitHub's once they signed in with it, their initial in
    // their rank's colour until then) with their presence on its corner; their name (a nickname you gave them first,
    // their own name#tag beside it, quieter) and the badge they display; under it what they're up to (your last
    // message, or their presence and level); their last 24 hours on the right; the buttons on hover. Online first.
    const friendRow = (f, i) => {
      const x = f.xp;
      const r = Xp.rank(x ? x.level : 1);
      const line = f.last ? `${f.last.mine ? 'you: ' : ''}${esc(Social.preview(f.last))}` : `${esc(Social.PRESENCE[f.presence].label)}${x ? ` · Lv ${x.level} · ${esc(r.name)}` : ''}`;
      // Their last 24 hours, not their today: that ends at their own midnight, wherever they live.
      const last24 = x && x.last24;
      const today = last24 ? `<span class="mn-today" title="Active in the last 24 hours"><b>${Xp.dur(last24)}</b><small>24h</small></span>` : '';
      // The flames, though, are a daily stat as in games: their card's flame today (fireBits).
      const fire = fireBits(fireTier(x && x.fire, i), i);
      const tag = `#${String(f.tag).padStart(4, '0')}`;
      const name = f.nick
        ? `<b class="lb-name">${esc(f.nick)}</b><i class="lb-tag">${esc(f.name)}${tag}</i>`
        : `<b class="lb-name">${esc(f.name)}</b><i class="lb-tag">${tag}</i>`;
      const pic = f.avatar ? `<img alt="" src="${esc(f.avatar)}">` : `<b>${esc((f.nick || f.name || '?').trim().charAt(0).toUpperCase())}</b>`;
      const hover = f.nick ? `${f.name}${tag} · ` : '';
      return `<div class="mn-row fr-row${fire.cls}" data-id="${esc(f.id)}"${fire.tip}>` +
        `${fire.canvas}<span class="fr-av st-${esc(f.presence || 'offline')}" style="--rc:${r.color}" data-act="profile" title="View profile">${pic}${Social.dot(f.presence)}</span>` +
        `<div class="mn-main" title="${esc(hover)}Click to chat"><span class="lb-l1">${name}` +
        `${window.Badges && f.badge ? window.Badges.small(f.badge, 24, f.id) : ''}${fire.mark}</span><small${f.last && f.unread ? ' class="fr-new"' : ''}>${line}</small></div>` +
        `${today}${f.unread ? `<i class="cnt hot">${f.unread}</i>` : ''}<span class="fr-btns"><button class="mn-btn" type="button" data-act="profile" title="Profile: level and hours">◎</button>` +
        '<button class="mn-btn" type="button" data-act="chat" title="Message (right-click for more)">✉</button></span></div>';
    };
    const on = s.friends.filter((f) => f.presence && f.presence !== 'offline');
    const off = s.friends.filter((f) => !f.presence || f.presence === 'offline');
    const section = (label, list) => (list.length ? `<div class="fr-sec">${label} — ${list.length}</div>${list.map(friendRow).join('')}` : '');
    setHTML(
      fq('.mn-friends'),
      s.friends.length
        ? section('ONLINE', on) + section('OFFLINE', off)
        : `<div class="mn-empty">no friends yet · send them your tag: <b>${esc(S.hackerName || '')}${tagText(S.tag)}</b></div>`,
    );
    lightFires(fq('.mn-friends'));
    setHTML(
      fq('.mn-in'),
      s.incoming.length
        ? s.incoming
            .map((r) => `<div class="mn-row" data-id="${esc(r.id)}">${Social.dot(r.from.presence)}<div class="mn-main">${tagged(r.from)}<small>wants to be your friend · ${ago(r.at)}</small></div>` +
              `<button class="mn-btn go" type="button" data-act="accept" title="Accept">✓</button><button class="mn-btn mn-del" type="button" data-act="decline" title="Decline">✕</button></div>`)
            .join('')
        : '<div class="mn-empty">no requests</div>',
    );
    setHTML(
      fq('.mn-out'),
      s.outgoing.length
        ? s.outgoing
            .map((r) => `<div class="mn-row" data-id="${esc(r.id)}"><i class="pdot p-offline"></i><div class="mn-main">${tagged(r.to)}<small>waiting · ${ago(r.at)}</small></div>` +
              `<button class="mn-btn mn-del" type="button" data-act="cancel" title="Take back">✕</button></div>`)
            .join('')
        : '<div class="mn-empty">nothing sent</div>',
    );
  }

  // A click on a friend opens the chat; their profile is on the profile button.
  async function listAction(e) {
    const row = e.target.closest('.mn-row');
    if (!row) return;
    const id = row.dataset.id;
    const el = e.target.closest('[data-act]');
    if (!el) return row.closest('.mn-friends') && Social.openChat(id);
    switch (el.dataset.act) {
      case 'chat':
        return Social.openChat(id);
      case 'profile':
        return openProfile({ id, from: 'friends', picEl: row.querySelector('.fr-av img, .fr-av') });
      case 'accept':
        el.disabled = true;
        return done(await Social.accept(id));
      case 'decline':
      case 'cancel':
        el.disabled = true;
        return done(await Social.dismiss(id));
    }
    function done(r) {
      if (r.error) {
        el.disabled = false;
        toast(errorText(r.error));
      } else Sfx.play(el.dataset.act === 'accept' ? 'accept' : 'decline');
    }
  }

  // Right-click on a friend: message, copy their name#tag, or remove them (after a yes).
  function friendMenu(e) {
    const row = e.target.closest('.mn-friends .mn-row');
    fq('.mn-ctx')?.remove();
    if (!row) return;
    e.preventDefault();
    const f = Social.friend(row.dataset.id);
    if (!f) return;
    const box = views.friends.getBoundingClientRect();
    const menu = document.createElement('div');
    menu.className = 'mn-ctx';
    menu.innerHTML =
      '<button type="button" data-ctx="chat">✉ message</button><button type="button" data-ctx="profile">◎ view profile</button>' +
      `<button type="button" data-ctx="nick">✎ ${f.nick ? 'change nickname' : 'add nickname'}</button>` +
      (f.nick ? '<button type="button" data-ctx="unnick">⌫ remove nickname</button>' : '') +
      '<button type="button" data-ctx="copy">⧉ copy name#tag</button><hr><button type="button" class="danger" data-ctx="remove">✕ remove friend</button>';
    menu.style.left = `${Math.min(e.clientX - box.left, box.width - 190)}px`;
    menu.style.top = `${Math.min(e.clientY - box.top, box.height - 150)}px`;
    menu.onclick = async (ev) => {
      const b = ev.target.closest('[data-ctx]');
      if (!b) return;
      menu.remove();
      if (b.dataset.ctx === 'chat') return Social.openChat(f.id);
      if (b.dataset.ctx === 'profile') return openProfile({ id: f.id, from: 'friends', picEl: row.querySelector('.fr-av img, .fr-av') });
      if (b.dataset.ctx === 'nick') return nickBox(f);
      if (b.dataset.ctx === 'unnick') {
        const r = await Social.setNick(f.id, '');
        return r.error ? toast(errorText(r.error)) : toast(`nickname removed · ${Social.handle(f)} again`);
      }
      if (b.dataset.ctx === 'copy') {
        try {
          await navigator.clipboard.writeText(Social.handle(f));
          toast(`copied ${Social.handle(f)}`);
        } catch {}
        return;
      }
      confirmRemove(f);
    };
    views.friends.appendChild(menu);
  }

  function confirmRemove(f) {
    const ask = document.createElement('div');
    ask.className = 'mn-confirm';
    ask.innerHTML =
      `<div class="mn-ask"><b>remove ${esc(Social.handle(f))}?</b>` +
      "<p>you'll stop seeing each other's status and can't message each other, until one of you sends a new request.</p>" +
      '<div class="mn-ask-btns"><button type="button" class="mn-btn" data-ans="no">cancel</button><button type="button" class="mn-btn danger" data-ans="yes">remove</button></div></div>';
    ask.onclick = async (e) => {
      const b = e.target.closest('[data-ans]');
      if (e.target === ask || (b && b.dataset.ans === 'no')) return ask.remove();
      if (!b) return;
      b.disabled = true;
      const r = await Social.unfriend(f.id);
      ask.remove();
      if (r.error) return toast(errorText(r.error));
      Sfx.play('decline');
      toast(`removed ${Social.handle(f)}`);
    };
    views.friends.appendChild(ask);
    ask.querySelector('[data-ans="no"]').focus();
  }

  // ---------- levels: your profile, a friend's card, sharing your active time ----------
  const stat = (label, value, note) => `<div><label>${label}</label><b>${value}</b>${note ? `<small>${note}</small>` : ''}</div>`;

  // A nickname for a friend, as on Steam: what you call them on your screens only (the friends list, the chat window),
  // on all your computers. Their own name#tag stays on their card and on hover.
  function nickBox(f) {
    fq('.mn-confirm')?.remove();
    const box = document.createElement('div');
    box.className = 'mn-confirm';
    box.innerHTML =
      `<div class="mn-ask nick-ask"><b>${f.nick ? 'Change the nickname' : 'Add a nickname'} for ${tagged(f)}</b>` +
      '<p>What you call them on your screens. Only you see it, on all your computers; their own name stays beside it.</p>' +
      `<label class="hk-field"><span class="hk-prompt">✎</span><input class="hk-input nick-in" maxlength="32" spellcheck="false" autocomplete="off" placeholder="yunus emre öztürk"><span class="hk-count nick-count"></span></label>` +
      '<div class="mn-ask-btns"><button type="button" class="mn-btn" data-ans="close">cancel</button><button type="button" class="mn-btn go" data-ans="save">save</button></div></div>';
    const input = box.querySelector('.nick-in');
    input.value = f.nick || '';
    // As many as 32 characters: a full name fits ("Yunus Emre Öztürk" is 17), the list still does.
    const count = () => (box.querySelector('.nick-count').textContent = `${input.value.length}/32`);
    input.addEventListener('input', count);
    count();
    const save = async () => {
      const nick = input.value.trim();
      box.remove();
      if (nick === (f.nick || '')) return;
      const r = await Social.setNick(f.id, nick);
      if (r.error) return toast(errorText(r.error));
      toast(nick ? `${Social.handle(f)} is ${nick} to you now` : `nickname removed · ${Social.handle(f)} again`);
    };
    box.onclick = (e) => {
      const b = e.target.closest('[data-ans]');
      if (e.target === box || (b && b.dataset.ans === 'close')) return box.remove();
      if (b && b.dataset.ans === 'save') save();
    };
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') save();
      if (e.key === 'Escape') box.remove();
    });
    views.friends.appendChild(box);
    input.focus();
    input.select();
  }

  // ---------- profile page: delegated to window.Profile (profile.js) ----------
  // opts.id: 'me' or a person's UUID; opts.edit: with the "Edit profile" panel open (Settings' "Edit profile…").
  function openProfile(opts) {
    const id = opts?.id || 'me';
    const from = opts?.from || (shown && shown !== 'profile' ? shown : 'dash');
    if (window.Profile?.openPerson) {
      window.Profile.openPerson(id, {
        ...opts,
        from,
        list: opts?.list || (from === 'board' ? boardAll() : undefined),
        seed: opts?.seed || (id !== 'me' ? boardUser(id) : undefined),
      });
    } else {
      window.GitView?.view('profile');
    }
    if (opts && opts.edit) window.ProfileEdit?.open();
  }

  // You at the top of your friends, as on Steam: a wide card (your picture, name, status, rank, today's time, the badge
  // you display); a click opens your profile.
  function meCard() {
    const el = fq('.me-card-host');
    if (!el || !S || !S.hackerName) return el && setHTML(el, '');
    const x = S.xp;
    const r = x ? Xp.rank(x.level) : null;
    const A = window.Account?.state();
    const me = Social.state()?.me;
    const status = me ? me.status : 'offline';
    const B = window.Badges?.mine();
    const shownBadge = B && B.featured && B.badges.find((b) => b.id === B.featured && b.tier);
    const earned = B ? B.badges.filter((b) => b.tier).length : null;
    setHTML(el,
      `<div class="me-card" role="button" tabindex="0" data-me="open" title="Your profile and your badges" style="--rc:${r ? r.color : 'var(--accent-rgb)'}">` +
      (A && A.signedIn && A.avatar ? `<img class="me-card-pic st-${esc(status)}" alt="" src="${esc(A.avatar)}">` : x ? Xp.headband(x.level, 'me-card-band') : '') +
      `<div class="me-card-who"><span class="mn-name"><b>${esc(S.hackerName)}</b><i class="htag">${tagText(S.tag)}</i>` +
      `${shownBadge ? window.Badges.small(shownBadge, 20) : ''}${x ? Xp.badge(x.level) : ''}<em class="lb-you">you</em></span>` +
      `<small>${Social.dot(status)} ${esc(Social.PRESENCE[status]?.label || status)}${r ? ` · ${esc(r.name)}` : ''}</small>` +
      (x ? `<i class="me-card-xp"><i style="width:${Xp.pct(x).toFixed(1)}%"></i></i>` : '') + '</div>' +
      (x ? `<div class="me-card-stat"><b>${Xp.dur(x.today)}</b><small>today</small></div><div class="me-card-stat"><b>${Xp.hours(x.total)}</b><small>total</small></div>` : '') +
      (B && B.prestige && B.prestige.can ? '<span class="me-card-medal" title="Level 60: this year\'s Service Medal is yours to take">★ SERVICE MEDAL</span>' : '') +
      (earned !== null && B.signedIn ? `<div class="me-card-stat"><b>${earned}</b><small>badges</small></div>` : '') +
      '<span class="me-card-go">profile ›</span></div>');
  }

  // A friend's picture or name clicked in the chat window (messages.js, through Swift): opens their profile page.
  function openFriend(id) {
    if (typeof id !== 'string' || !id) return;
    openProfile({ id, from: 'friends' });
  }

  function renderActivity() {
    const pf = window.Social ? Social.prefs() : { tokensName: true, tokensDetail: true };
    for (const [cls, on] of [['act', S.xp ? S.xp.show !== false : true], ['brd', S.xp ? S.xp.board !== false : true],
      ['tkn', pf.tokensName !== false], ['tkd', pf.tokensDetail !== false]]) {
      const sw = q(`.hk-sw.${cls}`);
      if (!sw) continue;
      sw.classList.toggle('on', on);
      sw.setAttribute('aria-checked', String(on));
      sw.disabled = !S.xp;
    }
  }

  // Settings · POWER: power save on by itself at low battery, as the Mac app keeps it (app.js setPowerSave).
  function renderPower() {
    const sw = modal === 'menu' && q('.hk-sw.pwr-auto');
    const s = window.__powerSave;
    if (!sw || !s) return;
    sw.classList.toggle('on', s.auto);
    sw.setAttribute('aria-checked', String(s.auto));
  }

  // Settings · DISCORD: your Discord profile shows what you're doing, as the app keeps it (DiscordPresence.swift, the
  // Windows app's discord.js).
  function renderDiscord() {
    const on = modal === 'menu' && q('.hk-sw.dc-on');
    const s = window.__discord;
    if (!on || !s) return;
    const proj = q('.hk-sw.dc-proj'), act = q('.hk-sw.dc-act');
    for (const [sw, value] of [[on, s.on], [proj, s.project], [act, s.active !== false]]) {
      sw.classList.toggle('on', value);
      sw.setAttribute('aria-checked', String(value));
    }
    on.disabled = !s.available;
    proj.disabled = act.disabled = !s.available || !s.on;
    q('.dc-note').textContent = !s.available
      ? "this version can't show it on Discord"
      : !s.on
        ? 'on your Discord profile, like a game: how many chats are open and which AI tools · never your prompts, code or file names'
        : s.connected
          ? 'on your Discord profile now · how many chats are open and which AI tools, never your prompts, code or file names'
          : 'waiting for Discord · open the Discord app on this Mac';
  }

  async function toggleBoard() {
    if (!S.xp) return;
    const show = S.xp.board === false;
    const r = await Social.setBoard(show);
    if (r.error) return toast(errorText(r.error));
    S.xp = { ...S.xp, board: show };
    renderActivity();
    board = null;
    boardCache.clear();
    if (shown === 'board') loadBoard();
    toast(show ? 'your name shows on the leaderboard again' : "you're Anonymous on the leaderboard · only you see your name there");
  }

  // Settings · the Tokens board: your name on it, and whether friends see which AI and model your tokens went to
  // (synced settings, the API's feed.ts and usage.ts).
  async function toggleTokens(key) {
    const show = Social.prefs()[key] === false;
    const r = await Social.setPref(key, show);
    if (r.error) return toast(errorText(r.error));
    renderActivity();
    board = null;
    boardCache.clear();
    if (shown === 'board') loadBoard();
    toast(key === 'tokensName'
      ? (show ? 'your name shows on the Tokens board again' : "you're Anonymous on the Tokens board · only you see your name there")
      : (show ? 'friends can see which AI and model you use again' : 'only your total shows now · nobody sees which AI or model'));
  }

  // ---------- the leaderboard: two panes under one floating glass bar (ranking + the week day by day) ----------
  let boardBy = 'week'; // 'week' | 'all'
  let friendsPref = false; // what the Everyone/Friends control was set to
  let boardWhole = false; // "Show all" pressed, until the view opens again
  let boardWeek = null; // Monday YYYY-MM-DD for a past week, or null for this week (never remembered)
  let boardLastWeek = null; // remembered within the session when toggling to All time and back
  let boardWeekOpen = false; // one-column mode: whether the week strip is expanded
  try {
    boardBy = localStorage.getItem('lb-by') === 'all' ? 'all' : 'week';
    friendsPref = localStorage.getItem('lb-who') === 'friends';
  } catch {}
  // Their active time this week, as the board counts its XP: from their Monday (the last of their 7 days is their today).
  const weekActive = (u) => {
    if (!u.days) return null;
    if (boardWeek && !isCurrentWeek()) return u.days.reduce((a, s) => a + (s || 0), 0);
    const sinceMonday = u.daysEnd ? new Date(u.daysEnd + 'T00:00:00Z').getUTCDay() || 7 : 7;
    return u.days.slice(-sinceMonday).reduce((a, s) => a + (s || 0), 0);
  };
  let board = null; // { by, rows, around, me, working, community, circle?, weeks? }
  let boardWeeks = null; // { first, current, metric, friends, weeks }
  let boardSeq = 0;
  let boardTimer = null;
  let boardLoadTimer = null;
  let boardLoading = false;
  let boardEnter = false;
  let counted = false; // everyone's hours count up once when the board opens
  let fetched = false;
  const BOARD_STALE_MS = 30_000;
  const boardCache = new Map(); // viewKey -> { data, at }
  const weeksCache = new Map(); // `${metric}|${friends}` -> weeks payload, cleared per board visit
  const prefetching = new Set();
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  let boardMetric = 'xp';
  try {
    boardMetric = localStorage.getItem('lb-metric') === 'tokens' ? 'tokens' : 'xp';
  } catch {}
  const tokPick = { tool: '', model: '', effort: '' };
  const tokens = () => boardMetric === 'tokens';
  // A picked model or effort: the server then shows only you and your friends (picking one by one would give away a
  // stranger's per-model numbers), so the board is the friends one whatever the control was left on. One AI picked
  // stays everyone's.
  const picked = () => tokens() && !!(tokPick.model || tokPick.effort);
  const boardFriends = () => friendsPref || picked();
  const tok = (n) => {
    n = Math.max(0, Math.floor(n || 0));
    const [d, unit] = n >= 1e9 ? [1e9, 'B'] : n >= 1e6 ? [1e6, 'M'] : n >= 1e3 ? [1e3, 'K'] : [1, ''];
    if (!unit) return String(n);
    const v = n / d;
    return `${v >= 100 ? Math.round(v) : v.toFixed(v >= 10 ? 1 : 2).replace(/\.?0+$/, '')}${unit}`;
  };
  const AI_NAMES = { claude: 'Claude', codex: 'Codex', antigravity: 'Antigravity' };
  const AI_ORDER = ['claude', 'codex', 'antigravity'];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const score = (u) => (tokens() ? u.tokens : boardBy === 'all' ? u.xp : u.week) || 0;
  const scoreText = (u) => (tokens() ? tok(u.tokens) : boardBy === 'all' ? Xp.num(u.xp) : `+${Xp.num(u.week)}`);
  const unit = () => (tokens() ? 'tokens' : 'XP');
  const gapText = (n) => (tokens() ? `${tok(n)} tokens` : `${Xp.num(n)} XP`);
  const shortH = (s) => (s >= 3600 ? `${(s / 3600).toFixed(s >= 36000 ? 0 : 1).replace(/\.0$/, '')}h` : s ? `${Math.max(1, Math.round(s / 60))}m` : '');
  const dayOf = (start, i) => new Date(Date.parse(start + 'T00:00:00Z') + i * 864e5);
  const addDays = (start, n) => dayOf(start, n).toISOString().slice(0, 10);
  const localMonday = () => {
    const d = new Date();
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return d.toLocaleDateString('sv');
  };
  const weekBounds = () => board?.weeks || (boardWeeks ? { first: boardWeeks.first, current: boardWeeks.current } : { first: '2026-10-26', current: localMonday() });
  const activeWeekStart = () => boardWeek || weekBounds().current;
  const isCurrentWeek = () => {
    const cur = weekBounds().current;
    return !boardWeek || boardWeek >= cur;
  };
  const isLiveWeek = () => boardBy === 'week' && isCurrentWeek();
  const rangeText = (start) => {
    const a = dayOf(start, 0), b = dayOf(start, 6);
    return a.getUTCMonth() === b.getUTCMonth()
      ? `${a.getUTCDate()}–${b.getUTCDate()} ${MONTHS[b.getUTCMonth()]}`
      : `${a.getUTCDate()} ${MONTHS[a.getUTCMonth()]} – ${b.getUTCDate()} ${MONTHS[b.getUTCMonth()]}`;
  };
  const weekName = (start, cur) => (start === cur ? 'This week' : start === addDays(cur, -7) ? 'Last week' : rangeText(start));
  const weekSub = (start, cur) => (start === cur || start === addDays(cur, -7) ? rangeText(start) : '');

  const boardCacheKey = (metric, friends, by, wk, pick) =>
    `${metric}|${friends ? 1 : 0}|${by}|${by === 'all' ? '' : wk || 'cur'}|${metric === 'tokens' && pick ? `${pick.tool || ''}|${pick.model || ''}|${pick.effort || ''}` : ''}`;
  const weeksCacheKey = (metric, friends) => `${metric}|${friends ? 1 : 0}`;

  // Warm the previous week's cache once the current view is on screen so stepping back feels instant.
  function schedulePrefetch() {
    if (shown !== 'board' || boardBy !== 'week') return;
    const bounds = weekBounds();
    const prevWk = addDays(activeWeekStart(), -7);
    if (bounds.first && prevWk < bounds.first) return;
    const metric = boardMetric;
    const friends = boardFriends();
    const pick = { ...tokPick };
    const key = boardCacheKey(metric, friends, 'week', prevWk, pick);
    if (boardCache.has(key) || prefetching.has(key)) return;
    const run = () => {
      if (shown !== 'board' || boardCache.has(key) || prefetching.has(key)) return;
      prefetching.add(key);
      (metric === 'tokens' ? Social.tokens('week', pick, friends, prevWk) : Social.leaderboard('week', friends, prevWk))
        .then((res) => {
          if (res && !res.error) boardCache.set(key, { data: res, at: Date.now() });
        })
        .finally(() => prefetching.delete(key));
    };
    if (typeof requestIdleCallback === 'function') requestIdleCallback(run, { timeout: 1500 });
    else setTimeout(run, 200);
  }

  // `live`: the minute's refresh while this week's board shows. Keeps what's shown if it fails, and whoever moved slides.
  async function loadBoard(live, enter) {
    if (live && (shown !== 'board' || !isLiveWeek())) return;
    const seq = ++boardSeq;
    clearTimeout(boardTimer);
    clearTimeout(boardLoadTimer);
    const wk = boardBy === 'week' ? boardWeek : null;
    const key = boardCacheKey(boardMetric, boardFriends(), boardBy, wk, tokPick);
    const wKey = weeksCacheKey(boardMetric, boardFriends());
    if (weeksCache.has(wKey)) boardWeeks = weeksCache.get(wKey);

    let quiet = !!live;
    if (!live) {
      const cached = boardCache.get(key);
      if (cached) {
        boardLoading = false;
        board = cached.data;
        fetched = true;
        boardEnter = !!enter;
        renderBoard();
        boardEnter = false;
        schedulePrefetch();
        const isFinalPast = boardBy === 'week' && !isCurrentWeek();
        const fresh = isFinalPast || Date.now() - cached.at < BOARD_STALE_MS;
        if (fresh && weeksCache.has(wKey)) {
          if (shown === 'board' && isLiveWeek()) boardTimer = setTimeout(() => loadBoard(true), 60_000);
          return;
        }
        // Live week (or all-time) older than 30s: show cached view now and refresh quietly in the background.
        quiet = true;
      } else {
        board = null;
        boardLoading = true;
        boardEnter = false;
        renderBoard();
      }
    }

    const needWeeks = !weeksCache.has(wKey);
    const [r, w] = await Promise.all([
      tokens() ? Social.tokens(boardBy, tokPick, boardFriends(), wk) : Social.leaderboard(boardBy, boardFriends(), wk),
      needWeeks ? Social.weeks(boardMetric, boardFriends()) : Promise.resolve(null),
    ]);
    if (seq !== boardSeq) return;
    clearTimeout(boardLoadTimer);
    boardLoading = false;
    if (w && !w.error) {
      weeksCache.set(wKey, w);
      boardWeeks = w;
    }
    if (r && !r.error) boardCache.set(key, { data: r, at: Date.now() });
    if (!(quiet && r.error)) {
      const before = quiet ? rowTops() : null;
      board = r;
      fetched = true;
      boardEnter = !!enter && !quiet;
      renderBoard();
      boardEnter = false;
      if (!r.error && isLiveWeek()) announceMove(r.me);
      if (before) slide(before);
    } else if (w && !w.error && shown === 'board') {
      renderBoard();
    }
    if (!r.error) schedulePrefetch();
    if (shown === 'board' && isLiveWeek()) boardTimer = setTimeout(() => loadBoard(true), 60_000);
  }

  // Everyone on the board as it came: the top 100, the ones around you further down, and you.
  const boardAll = () => {
    if (!board || board.error) return [];
    const seen = new Map();
    for (const u of [...(board.rows || []), ...(board.around || []), board.me]) if (u && !seen.has(u.pos)) seen.set(u.pos, u);
    return [...seen.values()].sort((x, y) => x.pos - y.pos);
  };
  const boardUser = (id) => (id && boardAll().find((u) => u.id === id)) || null;

  // Open a person's profile from a leaderboard row or champion.
  function openPerson(id, picEl) {
    if (!id) return;
    openProfile({ id, from: 'board', list: boardAll(), seed: boardUser(id), picEl });
  }

  // Since yesterday, only on your own row during this week.
  const weeklyReset = () => boardBy !== 'all' && new Date().getDay() === 1;
  const seenPos = {};
  function announceMove(me) {
    if (!me || !me.pos) return;
    if (tokens() && (tokPick.tool || tokPick.model || tokPick.effort)) return;
    const which = `${tokens() ? 'tokens-' : ''}${boardBy}${boardFriends() ? '-friends' : ''}`;
    const where = (boardFriends() ? 'among your friends ' : '') + (boardBy === 'all' ? 'of all time' : 'this week') + (tokens() ? ' in tokens' : '');
    const was = seenPos[which];
    seenPos[which] = me.pos;
    if (was && was !== me.pos) {
      const msg = me.pos < was ? `you climbed to #${me.pos} ${where}` : `you dropped to #${me.pos} ${where}`;
      const liveEl = views.board.querySelector('#bd-live');
      if (liveEl) liveEl.textContent = msg;
      return toast(msg);
    }
    if (was || me.prev == null || me.prev === me.pos || weeklyReset()) return;
    const key = `lb-told-${which}-${new Date().toLocaleDateString('sv')}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, '1');
    } catch {}
    const d = me.prev - me.pos;
    toast(`${d > 0 ? 'up' : 'down'} ${Math.abs(d)} ${Math.abs(d) === 1 ? 'place' : 'places'} since yesterday · #${me.pos} ${where}`);
  }

  function gapLine(u, all) {
    const above = all.find((x) => x.pos === u.pos - 1);
    if (above) {
      const g = score(above) - score(u);
      return `<b>${g > 0 ? `${gapText(g)} behind #${above.pos}` : `level with #${above.pos}`}</b>`;
    }
    const below = all.find((x) => x.pos === u.pos + 1);
    return u.pos === 1 && below ? `<b>${gapText(score(u) - score(below))} ahead of #2</b>` : '';
  }

  // Staging only (fire-test.js) and real fire tiers.
  function test() {
    return window.FireTest && S && FireTest.on(S.version) && window.SocialTest?.shown() ? FireTest : null;
  }
  function fireTier(real, i) {
    return test() ? test().tier(real | 0, i) : real | 0;
  }
  function fireBits(tier) {
    if (!tier) return { cls: '', tip: '', canvas: '', mark: '', look: '' };
    const look = tier === 2 ? 'blue' : 'orange';
    return {
      look,
      cls: ` fire${tier === 2 ? ' f2' : ''}`,
      tip: ` title="${tier === 2 ? 'The hottest flame: 5+ hours today and 5 days on fire this week' : 'On fire: 5+ hours today, among the top 20% of the day'}"`,
      canvas: `<canvas class="fire-card" data-look="${look}"></canvas>`,
      mark: tier === 2 ? '<i class="fire-mark" title="5 days on fire this week">5🔥</i>' : '',
    };
  }

  const lit = new WeakSet();
  function lightFires(el) {
    if (!el || reduced()) return;
    el.querySelectorAll('.fire-card, canvas.bd-fire').forEach((c) => {
      if (lit.has(c)) return;
      lit.add(c);
      const reach = Number(c.dataset.reach) || 13;
      Fire.burn(c, { reach: [reach, 0, 0], scale: reach > 15 ? 8 : 7, look: c.dataset.look });
    });
  }

  const BD_I = {
    prev: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg>',
    next: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg>',
    up: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 10 8 5.5l4.5 4.5"/></svg>',
    down: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 6 8 10.5 12.5 6"/></svg>',
    chev: '<svg class="bd-chev" viewBox="0 0 8 14" aria-hidden="true"><path d="m1.5 1.5 5 5.5-5 5.5"/></svg>',
    friend: '<svg class="bd-friend" viewBox="0 0 16 16" role="img" aria-label="Friend"><title>Friend</title><circle cx="6" cy="5.5" r="2.5"/><path d="M1.5 13.5c.4-2.6 2.2-4 4.5-4s4.1 1.4 4.5 4"/><path d="M10.5 3.4a2.3 2.3 0 0 1 0 4.4M12.2 9.9c1.3.6 2.1 1.8 2.3 3.6"/></svg>',
    flame: '<svg viewBox="0 0 10 12" aria-hidden="true"><path d="M5 0c.4 2.2 3.8 3.6 3.8 7.2A3.8 3.8 0 0 1 1.2 7.2c0-1.6.8-2.6 1.6-3.2-.1 1.2.4 2 1.1 2.4C3.6 4.2 4.2 2 5 0z"/></svg>',
    crown: '<svg class="bd-crown" viewBox="0 0 24 18" aria-hidden="true"><path d="M2 16h20l1.2-11-5.6 4.6L12 1 6.4 9.6.8 5z"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 18a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 9.2 4.4 4.4 0 0 1 17.5 18M3 3l18 18"/></svg>',
  };
  const FIRE_TEXT = ['', 'On fire today: 5+ hours, among the top 20% of the day', 'The hottest flame: 5 days on fire this week'];
  const flameMark = (t) => (t ? `<span class="bd-flame${t === 2 ? ' f2' : ''}" role="img" aria-label="${FIRE_TEXT[t]}" title="${FIRE_TEXT[t]}">${BD_I.flame}${t === 2 ? '5' : ''}</span>` : '');

  const bdAvatar = (u, cls = '') => {
    const r = Xp.rank(u.level);
    const live = isLiveWeek() && u.working && u.id;
    return `<span class="bd-av ${cls}" style="--rc:${r.color}">${u.avatar ? `<img alt="" src="${esc(u.avatar)}">` : `<b>${u.id ? esc((u.name || '?').trim().charAt(0).toUpperCase()) : '?'}</b>`}${live ? '<i class="bd-live" title="Working now"></i>' : ''}</span>`;
  };

  // Convert API's rolling 7-day array (`days`, ending on `daysEnd`) into Monday..Sunday with `null` for days to come.
  function weekDaysArray(days, daysEnd, live) {
    if (!days) return null;
    if (!live) return days.slice(0, 7);
    const sinceMonday = daysEnd ? new Date(daysEnd + 'T00:00:00Z').getUTCDay() || 7 : 7;
    const active = days.slice(-sinceMonday);
    while (active.length < 7) active.push(null);
    return active;
  }

  function boardBarHTML() {
    const bounds = weekBounds();
    const wStart = activeWeekStart();
    const isWeek = boardBy === 'week';
    const atFirst = !bounds.first || wStart <= bounds.first;
    const atLast = !boardWeek || wStart >= bounds.current;
    const wkLabel = `${weekName(wStart, bounds.current)}${weekSub(wStart, bounds.current) ? `<small>${weekSub(wStart, bounds.current)}</small>` : ''}`;
    const seg = (name, label, opts, on) =>
      `<div class="bd-seg" role="radiogroup" aria-label="${label}" style="--n:${opts.length};--i:${opts.findIndex((o) => o[0] === on)}"><i class="bd-seg-thumb"></i>` +
      opts.map(([id, text, tip]) => `<button type="button" role="radio" aria-checked="${id === on}" data-set="${name}" data-v="${id}" title="${tip}">${text}</button>`).join('') + '</div>';
    return (
      '<div class="bd-bar">' +
      seg('tab', 'Rank by', [['xp', 'XP', 'XP: earned by time at work'], ['tokens', 'Tokens', 'Tokens: what your AIs burned']], boardMetric) +
      '<div class="bd-bar-mid"><div class="bd-when" role="group" aria-label="When">' +
      `<span class="bd-wk" data-on="${isWeek}"><button type="button" class="bd-step" data-step="-1" aria-label="Previous week"${isWeek && atFirst ? ' disabled title="Orbiterm\'s first week"' : ' title="Previous week"'}>${BD_I.prev}</button>` +
      `<button type="button" class="bd-wklabel" data-set="when" data-v="week" aria-pressed="${isWeek}">${wkLabel}</button>` +
      `<button type="button" class="bd-step" data-step="1" aria-label="Next week"${isWeek && atLast ? ' disabled title="This is the newest week"' : ' title="Next week"'}>${BD_I.next}</button></span>` +
      `<button type="button" class="bd-all" data-set="when" data-v="all" aria-pressed="${!isWeek}" title="Everything since 26 Oct 2026">All time</button></div>` +
      (isWeek && !atLast ? '<button type="button" class="bd-glassbtn bd-now" data-now>Back to this week</button>' : '') +
      '</div>' +
      seg('who', 'Who', [['everyone', 'Everyone', picked() ? 'A picked model shows you and your friends only' : 'Everyone on Orbiterm'], ['friends', 'Friends', 'You and your friends']], boardFriends() ? 'friends' : 'everyone') +
      '</div>'
    );
  }

  function boardSparkHTML(u) {
    if (boardBy === 'all') return '';
    if (!u.days) return '<span class="bd-spark off" title="Keeps their hours to themselves">—</span>';
    const live = isLiveWeek();
    const vals = weekDaysArray(u.days, u.daysEnd, live);
    const todayIdx = live ? (u.daysEnd ? new Date(u.daysEnd + 'T00:00:00Z').getUTCDay() || 7 : 7) - 1 : -1;
    const top = tokens() ? Math.max(1, ...vals.filter((v) => v != null)) : 28_800;
    const fmtDay = (v) => (v == null ? 'still to come' : tokens() ? `${tok(v)} tokens` : Xp.dur(v));
    return `<span class="bd-spark" role="img" aria-label="${DOW.map((d, i) => `${d} ${fmtDay(vals[i])}`).join(', ')}">` +
      vals.map((v, i) => (v === null ? '<i class="later"></i>' : `<i class="${v ? (i === todayIdx ? 'now' : '') : 'z'}" style="height:${v ? Math.max(14, Math.min(100, (100 * v) / top)).toFixed(0) : 9}%"></i>`)).join('') + '</span>';
  }

  function boardChampHTML(u, place) {
    if (!u) return '<span></span>';
    const r = Xp.rank(u.level);
    const anon = !u.id;
    const live = isLiveWeek();
    const fire = live && !tokens() && !anon ? fireTier(u.fire, place - 1) : 0;
    const burn = fire && !reduced() ? `<canvas class="bd-fire" data-look="${fire === 2 ? 'blue' : 'orange'}" data-reach="20" aria-hidden="true"></canvas>` : '';
    const who = anon ? '<b>Anonymous</b>' : `<b>${esc(u.name)}</b><i class="bd-tag">${tagText(u.tag)}</i>`;
    const badge = window.Badges && u.badge ? `<span class="bd-cbadge">${window.Badges.small(u.badge, place === 1 ? 38 : 30, u.me ? null : u.id)}</span>` : '';
    const active = tokens() ? null : weekActive(u);
    const what = tokens()
      ? (u.top ? `mostly ${esc(AI_NAMES[u.top.tool] || u.top.tool)} ${esc(u.top.model)}` : '')
      : boardBy === 'all'
        ? (u.active != null ? `${Xp.num(Math.round(u.active / 3600))}h in all` : '')
        : (active != null ? `${Xp.dur(active)}` : '');
    const label = `${place === 1 ? 'First' : place === 2 ? 'Second' : 'Third'}: ${esc(anon ? 'Anonymous' : u.name)}${u.me ? ', you' : ''}, level ${u.level} ${r.name}, ${scoreText(u)} ${unit()}${live && u.working ? ', working now' : ''}${fire ? `. ${FIRE_TEXT[fire]}` : ''}${anon ? '' : '. Opens their profile'}`;
    return (
      `<button type="button" class="bd-champ p${place}${u.me ? ' me' : ''}"${anon ? ' disabled' : ` data-open="${esc(u.id)}"`} style="--rc:${r.color}" aria-label="${label}">` +
      `${burn}<span class="bd-champ-top">${place === 1 ? BD_I.crown : ''}<span class="bd-cav">${bdAvatar(u)}${badge}</span>` +
      `<span class="bd-cname">${who}${u.friend ? BD_I.friend : ''}${flameMark(fire)}</span>` +
      `<span class="bd-clv">Lv ${u.level} · ${esc(r.name)}${u.me ? '<em class="bd-you">YOU</em>' : ''}${what ? ` · <span class="bd-cwhat">${what}</span>` : ''}</span>` +
      `<span class="bd-cscore"><span${tokens() ? ` title="${Xp.num(u.tokens)} tokens"` : ''}>${scoreText(u)}</span><i>${unit().toUpperCase()}</i></span></span>` +
      `<span class="bd-podstep" aria-hidden="true">${place}</span></button>`
    );
  }

  function boardRowHTML(u, all, k) {
    const r = Xp.rank(u.level);
    if (!u.id) {
      return `<div class="bd-row anon" style="--k:${k};--rc:${r.color}" aria-label="${u.pos}, Anonymous, level ${u.level}, ${scoreText(u)} ${unit()}"><span class="bd-pos">${u.pos}</span>${bdAvatar(u)}` +
        `<span class="bd-who"><span class="bd-l1"><span class="bd-name">Anonymous</span></span><span class="bd-l2">Lv ${u.level} · ${esc(r.name)} · keeps their name off the board</span></span>` +
        `<span class="bd-spark off"></span><span class="bd-score">${scoreText(u)}<i>${unit().toUpperCase()}</i></span><span></span></div>`;
    }
    const live = isLiveWeek();
    const fire = live && !tokens() ? fireTier(u.fire, u.pos - 1) : 0;
    const burn = fire && !reduced() ? `<canvas class="bd-fire" data-look="${fire === 2 ? 'blue' : 'orange'}" data-reach="13" aria-hidden="true"></canvas>` : '';
    const gap = u.me ? gapLine(u, all) : '';
    const active = tokens() ? null : weekActive(u);
    const what = tokens()
      ? (u.top ? `mostly ${esc(AI_NAMES[u.top.tool] || u.top.tool)} ${esc(u.top.model)}` : '')
      : boardBy === 'all'
        ? (u.active != null ? `${Xp.num(Math.round(u.active / 3600))}h in all` : '')
        : (active != null ? `${Xp.dur(active)} ${live ? 'this week' : 'that week'}` : '');
    let move = '';
    if (u.me && live && u.pos > 3 && u.prev != null && !weeklyReset()) {
      const d = u.prev - u.pos;
      if (d) move = `<span class="bd-move${d < 0 ? ' down' : ''}" title="${d > 0 ? 'Up' : 'Down'} ${Math.abs(d)} ${Math.abs(d) === 1 ? 'place' : 'places'} since yesterday">${d > 0 ? '▲' : '▼'} ${Math.abs(d)}</span>`;
    }
    const badge = window.Badges && u.badge ? window.Badges.small(u.badge, 22, u.me ? null : u.id) : '';
    const label = `${u.pos}, ${esc(u.name)}${u.me ? ', you' : u.friend ? ', friend' : ''}, level ${u.level} ${r.name}, ${scoreText(u)} ${unit()}${live && u.working ? ', working now' : ''}${fire ? `. ${FIRE_TEXT[fire]}` : ''}. Opens their profile`;
    return (
      `<button type="button" class="bd-row${u.me ? ' me' : ''}${u.pos <= 10 ? ' top' : ''}${fire ? ' fire' : ''}" data-open="${esc(u.id)}" style="--k:${k};--rc:${r.color}" aria-label="${label}">` +
      `${burn}<span class="bd-pos">${u.pos}${move}</span>${bdAvatar(u)}` +
      `<span class="bd-who"><span class="bd-l1"><span class="bd-name">${esc(u.name)}</span><i class="bd-tag">${tagText(u.tag)}</i>${u.me ? '<em class="bd-you">YOU</em>' : ''}${u.friend ? BD_I.friend : ''}${badge}${flameMark(fire)}${u.me && u.anon ? '<em class="lb-hid" title="Others see you as Anonymous">hidden</em>' : ''}</span>` +
      `<span class="bd-l2">${gap ? `${gap} · ` : ''}Lv ${u.level} · <span class="rk">${esc(r.name)}</span>${what ? ` · ${what}` : ''}</span></span>` +
      `${boardSparkHTML(u) || '<span></span>'}<span class="bd-score"${tokens() ? ` title="${Xp.num(u.tokens)} tokens"` : ''}>${scoreText(u)}<i>${unit().toUpperCase()}</i></span>${BD_I.chev}</button>`
    );
  }

  function tokensPickerHTML(c) {
    const opts = board && !board.error ? board.options || [] : [];
    const tools = (c && c.tools) || {};
    const all = Object.values(tools).reduce((a, t) => a + (t || 0), 0);
    const of = (k, pred) => [...new Set(opts.filter(pred).map((o) => o[k]))];
    const models = of('model', (o) => !tokPick.tool || o.tool === tokPick.tool);
    const efforts = of('effort', (o) => (!tokPick.tool || o.tool === tokPick.tool) && (!tokPick.model || o.model === tokPick.model)).filter(Boolean);
    if (tokPick.model && !models.includes(tokPick.model)) models.unshift(tokPick.model);
    if (tokPick.effort && !efforts.includes(tokPick.effort)) efforts.unshift(tokPick.effort);
    const chip = (id, label) => {
      const t = id && all ? tools[id] || 0 : 0;
      const pct = t ? (Math.round((100 * t) / all) || '<1') : null;
      return `<button type="button" class="bd-ai" role="radio" aria-checked="${tokPick.tool === id}" data-set="ai" data-v="${id}"${id ? ` style="--c:var(--ai-${id})"` : ''}${pct ? ` title="${AI_NAMES[id]}: ${pct}% of everyone's tokens"` : ''}>${id ? '<i></i>' : ''}${label}${pct !== null ? `<em>${pct}%</em>` : ''}</button>`;
    };
    const sel = (k, any, list) =>
      `<select class="bd-pick" data-pick="${k}" aria-label="${k === 'model' ? 'Model' : 'Effort'}"><option value="">${any}</option>${list.map((v) => `<option value="${esc(v)}"${tokPick[k] === v ? ' selected' : ''}>${esc(v)}</option>`).join('')}</select>`;
    return `<div class="bd-ais" role="radiogroup" aria-label="Which AI">${chip('', 'All AIs')}${chip('claude', 'Claude')}${chip('codex', 'Codex')}${chip('antigravity', 'Antigravity')}` +
      (tokPick.tool ? sel('model', `Any ${AI_NAMES[tokPick.tool] || tokPick.tool} model`, models) : '') +
      (tokPick.tool && (tokPick.model || tokPick.effort) && efforts.length ? sel('effort', 'Any effort', efforts) : '') +
      (picked() ? '<span class="bd-pick-note">Picked model: you and your friends only</span>' : '') + '</div>';
  }

  function rankHTML(all, c) {
    const me = board && !board.error ? board.me : all.find((p) => p.me);
    const top = all.length > 3 ? all.slice(0, 3) : [];
    let rest = all.slice(top.length);
    const far = !!(me && me.pos > 10 && top.length);
    const fold = far && !boardWhole;
    if (fold) rest = rest.filter((p) => p.pos <= 5 || Math.abs(p.pos - me.pos) <= 2);
    let list = '', last = top.length, k = 0;
    for (const p of rest) {
      if (p.pos !== last + 1) list += `<div class="bd-gap" role="separator">${p.pos - last - 1} more</div>`;
      list += boardRowHTML(p, all, k++);
      last = p.pos;
    }
    const live = isLiveWeek();
    const total = (board && !board.error && board.total) || all.length;
    const span = tokens() ? (boardBy === 'all' ? 'Tokens ever' : 'Tokens') : boardBy === 'all' ? 'XP ever' : 'XP';
    const note = tokens() ? 'what your AIs burned' : 'earned by time at work';
    const cols = `<div class="bd-cols" aria-hidden="true"><span>#</span><span></span><span>Hacker</span><span>${boardBy === 'all' ? '' : 'Mon–Sun'}</span><span>${span}</span><span></span></div>`;
    const more = fold
      ? `<div class="bd-more"><button type="button" class="bd-glassbtn" data-all="1">${total > 100 ? 'Show the top 100' : `Show all ${Xp.num(total)} hackers`}</button></div>`
      : far ? '<div class="bd-more"><button type="button" class="bd-glassbtn" data-all="0">Show the top 5 and you</button></div>' : '';
    const absent = me ? '' : tokens()
      ? `<p class="bd-foot">You'll show up here once your tokens${tokPick.tool || tokPick.model || tokPick.effort ? ' of this pick' : ''} are in. Orbiterm sends them every few minutes.</p>`
      : '<p class="bd-foot">You\'ll show up here once you have some XP.</p>';
    const foot = boardFriends() && all.length < 2
      ? '<p class="bd-foot">Add friends to race them here.</p>'
      : `${absent}<p class="bd-foot">${tokens() ? 'Tokens' : 'XP'}: ${note}${live ? ' · the week starts over on Monday' : boardBy === 'week' ? ' · final' : ''}</p>`;
    const aboveMe = me && me.pos > 1 ? all.find((x) => x.pos === me.pos - 1) : null;
    const dockGap = aboveMe ? (score(aboveMe) > score(me) ? ` · ${gapText(score(aboveMe) - score(me))} behind #${aboveMe.pos}` : ` · level with #${aboveMe.pos}`) : '';
    const listLabel = `${boardFriends() ? 'You and your friends' : 'Everyone'}, ${boardBy === 'all' ? 'all time' : weekName(activeWeekStart(), weekBounds().current)}`;
    return (
      '<div class="bd-rank"><div class="bd-scroll"><div class="bd-track">' +
      (tokens() ? tokensPickerHTML(c) : '') +
      (top.length ? `<div class="bd-stage" role="group" aria-label="The first three">${boardChampHTML(top[1], 2)}${boardChampHTML(top[0], 1)}${boardChampHTML(top[2], 3)}</div>` : '') +
      `<div class="bd-list" role="list" aria-label="${esc(listLabel)}">${cols}${list}</div>${more}${foot}` +
      '</div></div>' +
      (me ? `<div class="bd-dock" hidden><button type="button" data-tome>${bdAvatar(me)}<b>#${me.pos}</b>You<span>${scoreText(me)} ${unit()}${dockGap}</span>${BD_I.up}</button></div>` : '') +
      '</div>'
    );
  }

  function chartHTML(vals, { fmt, cls = '', labels, today = -1, top, flames, h = '4.75rem', jump }) {
    const max = top || Math.max(1, ...vals.map((v) => v || 0));
    return `<div class="bd-chart" style="--n:${vals.length};--h:${h}">` + vals.map((v, i) => {
      const later = v === null;
      const tag = jump ? 'button type="button"' : 'div';
      return `<${tag} class="bd-d ${cls}${i === today ? ' today' : ''}${later ? ' later' : ''}"${jump ? ` data-week="${esc(jump[i])}" title="Open this week"` : ''} aria-label="${esc(labels[i].long)}: ${later ? 'still to come' : esc(fmt(v, true))}">` +
        `<em>${flames && v >= 5 * 3600 ? `<svg class="bd-fl" viewBox="0 0 10 12" role="img" aria-label="5 hours or more">${BD_I.flame.replace(/<\/?svg[^>]*>/g, '')}</svg>` : ''}${later || !v ? '' : fmt(v)}</em><span class="bd-col">` +
        `${later || !v ? '' : `<i class="bd-bar-in" style="height:${Math.max(4, (100 * v) / max).toFixed(1)}%;--k:${i}"></i>`}</span>` +
        `<span><b>${esc(labels[i].a)}</b>${esc(labels[i].b)}</span></${tag.split(' ')[0]}>`;
    }).join('') + '</div>';
  }

  function stackHTML(days, toolsByDay, totals, { today = -1, labels, h = '4.75rem' }) {
    const max = Math.max(1, ...days.map((v) => v || 0));
    const order = AI_ORDER.filter((a) => (totals[a] || 0) > 0).sort((a, b) => (totals[b] || 0) - (totals[a] || 0));
    return `<div class="bd-chart" style="--n:${days.length};--h:${h}">` + days.map((v, i) => {
      const later = v === null;
      const segs = order.map((a) => {
        const amt = toolsByDay && toolsByDay[a] ? toolsByDay[a][i] || 0 : totals[a] || 0;
        return amt > 0 ? `<i style="--c:var(--ai-${a});flex:${amt}"></i>` : '';
      }).join('');
      return `<div class="bd-d${i === today ? ' today' : ''}${later ? ' later' : ''}" aria-label="${esc(labels[i].long)}: ${later ? 'still to come' : `${tok(v)} tokens`}"><em>${later || !v ? '' : tok(v)}</em><span class="bd-col">` +
        (later || !v ? '' : `<span class="bd-stack" style="height:${Math.max(4, (100 * v) / max).toFixed(1)}%;--k:${i}">${segs || `<i style="--c:var(--accent);flex:1"></i>`}</span>`) +
        `</span><span><b>${esc(labels[i].a)}</b>${esc(labels[i].b)}</span></div>`;
    }).join('') + '</div>';
  }

  function legendHTML(totals) {
    const sum = Object.values(totals || {}).reduce((a, b) => a + (b || 0), 0);
    if (!sum) return '';
    const order = AI_ORDER.filter((a) => (totals[a] || 0) > 0).sort((a, b) => (totals[b] || 0) - (totals[a] || 0));
    return `<div class="bd-legend">${order.map((a) => `<span><i style="--c:var(--ai-${a})"></i><b>${AI_NAMES[a]}</b>${Math.round(((totals[a] || 0) * 100) / sum)}%</span>`).join('')}</div>`;
  }

  function limitsCardHTML(live) {
    if (!live) {
      return '<section class="bd-wc"><div class="bd-wc-h"><span>Your weekly limits</span></div>' +
        '<p class="bd-note">Limits are kept for the week under way only: each AI reports what is left now, not what was left then.</p></section>';
    }
    const list = (typeof limitsByAI === 'function' ? limitsByAI() : []).filter((a) => !a.windows || a.windows.includes('week'));
    if (!list.length) return '';
    const rows = list.map((a) => {
      const w = a.week;
      const valid = w && Number.isFinite(w.pct) && (!w.resetsAt || w.resetsAt > Date.now());
      const name = `${esc(a.tool || AI_NAMES[a.id] || a.name)}${a.group ? ` · ${esc(a.group)}` : ''}`;
      if (!valid) return `<div class="bd-lim"><b>${name}</b><span>no number yet</span></div>`;
      const used = Math.round(Math.max(0, Math.min(100, w.pct)));
      const cls = used >= 80 ? 'hot' : used >= 50 ? 'warn' : '';
      const resets = w.resetsAt && typeof resetAt === 'function' ? `fills again ${resetAt(w.resetsAt, true)}` : '';
      return `<div class="bd-lim"><b>${name}</b><i class="${cls}" role="img" aria-label="${used}% used"><i style="width:${used}%"></i></i><span>${used}% used</span>${resets ? `<small>${esc(resets)}</small>` : ''}</div>`;
    }).join('');
    return `<section class="bd-wc"><div class="bd-wc-h"><span>Your weekly limits</span><small>as each AI reports it now</small></div>${rows}</section>`;
  }

  function weekPaneHTML(all, c) {
    const me = board && !board.error ? board.me : all.find((p) => p.me);
    const bounds = weekBounds();
    const wStart = activeWeekStart();
    const live = isLiveWeek();
    const totalPeople = (board && !board.error && board.total) || all.length;
    const place = me ? `<span class="bd-chip${me.pos <= 3 ? ' gold' : ''}">#${me.pos} of ${Xp.num(totalPeople)}</span>` : '';
    const friendsCount = Math.max(0, (board?.circle?.people ?? totalPeople) - 1);
    const whoLabel = boardFriends() ? `You and ${friendsCount} ${friendsCount === 1 ? 'friend' : 'friends'}` : 'Everyone';
    const wkList = (boardWeeks?.weeks || []).slice().sort((a, b) => a.week.localeCompare(b.week));

    let head = '', cards = '', strip = '';
    if (boardBy === 'all') {
      const chartWeeks = wkList.slice(-12);
      const dm = (d) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
      const labels = chartWeeks.map((w) => ({
        a: w.week === bounds.current ? 'This week' : dm(dayOf(w.week, 0)),
        b: w.week === bounds.current ? rangeText(w.week) : `to ${dm(dayOf(w.week, 6))}`,
        long: `${weekName(w.week, bounds.current)}${weekSub(w.week, bounds.current) ? `, ${weekSub(w.week, bounds.current)}` : ''}`,
      }));
      const jump = chartWeeks.map((w) => w.week);
      const todayIdx = chartWeeks.findIndex((w) => w.week === bounds.current);
      const com = chartWeeks.map((w) => w.everyone || 0);
      const mine = chartWeeks.map((w) => (tokens() ? w.score || 0 : w.seconds || 0));
      const sum = (a) => a.reduce((x, y) => x + y, 0);
      const comTotal = sum(com);
      const mineTotal = sum(mine);
      head = `<div class="bd-eyebrow"><span>All time</span><small>since 26 Oct 2026 · ${wkList.length} ${wkList.length === 1 ? 'week' : 'weeks'}</small></div>`;
      cards =
        `<section class="bd-wc"><div class="bd-wc-h"><span>${whoLabel}</span><small>${boardFriends() ? '' : `${Xp.num(totalPeople)} hackers`}</small></div>` +
        `<div class="bd-big"><b>${tokens() ? tok(comTotal) : Xp.num(Math.round(comTotal / 3600))}</b><span>${tokens() ? 'tokens burned together' : 'h coded together'}</span></div>` +
        (chartWeeks.length ? chartHTML(com, { fmt: (v, long) => (tokens() ? `${tok(v)}${long ? ' tokens' : ''}` : `${Math.round(v / 3600)}h`), labels, today: todayIdx, jump }) : '') +
        '<p class="bd-note">A bar a week. Click one to open that week.</p></section>' +
        `<section class="bd-wc"><div class="bd-wc-h"><span>You</span></div><div class="bd-big you"><b>${tokens() ? tok(mineTotal) : Xp.hours(mineTotal)}</b>` +
        `<span>${tokens() ? 'tokens' : `${Xp.num(me?.xp || S?.xp?.total || 0)} XP`}</span><span class="bd-chips">${place}</span></div>` +
        (chartWeeks.length ? chartHTML(mine, { fmt: (v, long) => (tokens() ? `${tok(v)}${long ? ' tokens' : ''}` : long ? Xp.dur(v) : shortH(v)), cls: 'you', labels, today: todayIdx, jump, h: '3.75rem' }) : '') + '</section>';
      strip = `<b>${tokens() ? tok(comTotal) : `${Xp.num(Math.round(comTotal / 3600))} h`}</b><span>${tokens() ? 'burned' : 'coded'} together since 26 Oct · you ${tokens() ? tok(mineTotal) : Xp.hours(mineTotal)}</span>`;
    } else {
      const refDays = c?.days || me?.days || [];
      const sinceMonday = live ? (refDays.filter((v) => v !== null).length || (me?.daysEnd ? new Date(me.daysEnd + 'T00:00:00Z').getUTCDay() || 7 : new Date().getDay() || 7)) : 7;
      const todayIdx = live ? sinceMonday - 1 : -1;
      const labels = DOW.map((d, i) => ({
        a: live && i === todayIdx ? 'Today' : d,
        b: String(dayOf(wStart, i).getUTCDate()),
        long: `${WEEKDAYS[i]} ${dayOf(wStart, i).getUTCDate()} ${MONTHS[dayOf(wStart, i).getUTCMonth()]}`,
      }));
      const leftText = live ? (sinceMonday === 7 ? 'starts over tonight at 00:00' : `${7 - sinceMonday} ${7 - sinceMonday === 1 ? 'day' : 'days'} left`) : wStart === bounds.first ? "final · Orbiterm's first week" : 'final';
      head = `<div class="bd-eyebrow"><span>${weekName(wStart, bounds.current)}${weekSub(wStart, bounds.current) ? ` · ${weekSub(wStart, bounds.current)}` : ''}</span><small>${leftText}</small></div>`;
      if (tokens()) {
        const src = boardFriends() && board?.circle ? board.circle : c;
        const comDays = (src?.days || Array(7).fill(0)).slice(0, 7).map((v, i) => (live && i >= sinceMonday ? null : v));
        const comTotal = src?.tokens ?? comDays.reduce((a, b) => a + (b || 0), 0);
        const comTools = src?.tools || {};
        const myTotal = me ? me.tokens : 0;
        const myByTool = board?.mine?.tools || null;
        const myTotals = {};
        if (myByTool) for (const [k, arr] of Object.entries(myByTool)) myTotals[k] = (arr || []).reduce((a, b) => a + (b || 0), 0);
        const myDays = weekDaysArray(me?.days || Array(7).fill(0), me?.daysEnd, live);
        const comHeadRight = boardFriends() ? '' : `${Xp.num(src?.people || 0)} burned`;
        cards =
          `<section class="bd-wc"><div class="bd-wc-h"><span>${whoLabel}</span><small>${comHeadRight}</small></div>` +
          `<div class="bd-big"><b>${tok(comTotal)}</b><span>tokens burned together</span></div>${stackHTML(comDays, src?.byTool, comTools, { today: todayIdx, labels })}${legendHTML(comTools)}</section>` +
          `<section class="bd-wc"><div class="bd-wc-h"><span>You</span></div><div class="bd-big you"><b>${tok(myTotal)}</b><span>tokens</span><span class="bd-chips">${place}</span></div>` +
          `${stackHTML(myDays, myByTool, myTotals, { today: todayIdx, labels, h: '3.75rem' })}${legendHTML(myTotals)}</section>` +
          limitsCardHTML(live);
        strip = `<b>${tok(comTotal)}</b><span>burned together · you ${tok(myTotal)}</span>`;
      } else {
        let src = c;
        let fallbackPeople = null;
        if (boardFriends()) {
          if (board?.circle) src = board.circle;
          else {
            const sums = Array(7).fill(0);
            let shownCount = 0;
            for (const u of all) {
              const wd = weekDaysArray(u.days, u.daysEnd, live);
              if (!wd) continue;
              shownCount++;
              wd.forEach((v, i) => { if (v) sums[i] += v; });
            }
            src = { seconds: sums.reduce((a, b) => a + b, 0), days: sums.map((v, i) => (live && i >= sinceMonday ? null : v)), people: shownCount };
            fallbackPeople = `${shownCount} showed hours`;
          }
        }
        const comDays = (src?.days || Array(7).fill(0)).slice(0, 7).map((v, i) => (live && i >= sinceMonday ? null : v));
        const comTotal = src?.seconds ?? comDays.reduce((a, b) => a + (b || 0), 0);
        const goal = !boardFriends() && c?.goal ? c.goal : 0;
        const done = goal > 0 && comTotal >= goal;
        const trend = !boardFriends() && live && c?.lastWeekSoFar >= 3600 ? Math.round((100 * (comTotal - c.lastWeekSoFar)) / c.lastWeekSoFar) : null;
        const mineDays = weekDaysArray(me?.days || Array(7).fill(0), me?.daysEnd, live);
        const mineSum = mineDays.reduce((a, b) => a + (b || 0), 0);
        let best = 0;
        mineDays.forEach((v, i) => { if ((v || 0) > (mineDays[best] || 0)) best = i; });
        const active = mineDays.filter((v) => v >= 1800).length;
        const xp = me ? me.week : 0;
        const comHeadRight = boardFriends() ? (fallbackPeople || '') : `${Xp.num(c?.people || 0)} worked${live && board?.working ? ` · ${board.working} working now` : ''}`;
        cards =
          `<section class="bd-wc"><div class="bd-wc-h"><span>${whoLabel}</span><small>${comHeadRight}</small></div>` +
          `<div class="bd-big"><b data-count="${Math.round(comTotal / 3600)}">${Xp.num(Math.round(comTotal / 3600))}</b><span>h coded together</span></div>` +
          (goal ? `<div class="bd-goal${done ? ' done' : ''}"><i role="progressbar" aria-label="This week's goal for everyone" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.min(100, Math.round((100 * comTotal) / goal))}"><i style="width:${Math.min(100, (100 * comTotal) / goal).toFixed(1)}%"></i></i>` +
            `<span>${done ? `✓ Goal reached · ${Xp.num(Math.round(goal / 3600))} h` : `<b>${Math.round((100 * comTotal) / goal)}%</b> of the ${Xp.num(Math.round(goal / 3600))} h goal`}</span></div>` : '') +
          (trend === null ? '' : `<p class="bd-facts">${trend >= 0 ? `<b>${trend}% more</b>` : `<b>${-trend}% less</b>`} than last week at this point</p>`) +
          chartHTML(comDays, { fmt: (v, long) => (long ? `${Math.round(v / 3600)} hours` : `${Math.round(v / 3600)}h`), labels, today: todayIdx }) + '</section>' +
          `<section class="bd-wc"><div class="bd-wc-h"><span>You</span></div><div class="bd-big you"><b>${Xp.dur(mineSum)}</b><span>+${Xp.num(xp)} XP</span><span class="bd-chips">${place}</span></div>` +
          chartHTML(mineDays, { fmt: (v, long) => (long ? Xp.dur(v) : shortH(v)), cls: 'you', labels, today: todayIdx, flames: true, h: '3.75rem', top: Math.max(8 * 3600, ...mineDays.map((v) => v || 0)) }) +
          `<p class="bd-facts"><b>${active}</b> active ${active === 1 ? 'day' : 'days'}${mineSum ? ` · best day <b>${labels[best].long.split(' ')[0]}</b>, ${Xp.dur(mineDays[best])}` : ''}</p></section>`;
        strip = `<b>${Xp.num(Math.round(comTotal / 3600))} h</b><span>coded together · you ${Xp.dur(mineSum)}</span>`;
      }
    }

    if (wkList.length) {
      const recent = wkList.slice(-8).reverse();
      cards += `<section class="bd-wc"><div class="bd-wc-h"><span>Your weeks</span><small>${boardFriends() ? 'among friends' : ''}</small></div>` +
        recent.map((wk) => {
          const sel = boardBy === 'week' && wStart === wk.week;
          const wn = weekName(wk.week, bounds.current);
          const ws = weekSub(wk.week, bounds.current);
          const val = tokens() ? tok(wk.score || 0) : `+${Xp.num(wk.score || 0)} XP`;
          return `<button type="button" class="bd-past" data-week="${esc(wk.week)}" aria-current="${sel}" aria-label="${esc(wn)}${ws ? `, ${esc(ws)}` : ''}: ${wk.place ? `number ${wk.place}` : 'not on the board'}, ${tokens() ? `${tok(wk.score || 0)} tokens` : `${Xp.num(wk.score || 0)} XP`}. Opens that week">` +
            `<i class="bd-medal${wk.place && wk.place <= 3 ? ` m${wk.place}` : ''}">${wk.place ? `#${wk.place}` : '—'}</i><b>${esc(wn)}${ws ? `<small>${esc(ws)}</small>` : ''}</b>` +
            `<span>${val}</span><em>${wk.final ? 'final' : 'so far'}</em></button>`;
        }).join('') + '</section>';
    }

    return `<aside class="bd-week${boardWeekOpen ? ' open' : ''}" aria-label="The week, day by day"><div class="bd-wscroll">` +
      `<button type="button" class="bd-strip" aria-expanded="${boardWeekOpen}" data-strip>${strip}${BD_I.down}</button><div class="bd-wfull">${head}${cards}</div></div></aside>`;
  }

  function emptyBoardHTML(mode) {
    if (mode === 'loading') {
      const pod = [
        { cls: 'p2', av: '3.75rem', r: '.9375rem', step: '2.5rem' },
        { cls: 'p1', av: '5rem', r: '1.1875rem', step: '3.5rem' },
        { cls: 'p3', av: '3.75rem', r: '.9375rem', step: '1.75rem' },
      ];
      const cols = `<div class="bd-cols" aria-hidden="true"><span>#</span><span></span><span>Hacker</span><span>${boardBy === 'all' ? '' : 'Mon–Sun'}</span><span>${tokens() ? 'Tokens' : 'XP'}</span><span></span></div>`;
      const skRow = () =>
        '<div class="bd-skrow"><i class="bd-skel" style="width:1.5rem;justify-self:end"></i><i class="bd-skel bd-sk-av"></i>' +
        '<span class="bd-sk-who"><i class="bd-skel" style="width:48%;height:.875rem"></i><i class="bd-skel" style="width:32%;height:.6875rem"></i></span>' +
        `${boardBy === 'all' ? '<span></span>' : '<i class="bd-skel bd-sk-spark"></i>'}<i class="bd-skel" style="width:4.5rem;justify-self:end"></i><span></span></div>`;
      const skBars = (heights) =>
        `<div class="bd-sk-bars">${heights.map((h) => `<i class="bd-skel" style="height:${h}%"></i>`).join('')}</div>`;
      return (
        '<div class="bd-rank"><div class="bd-scroll"><div class="bd-track" aria-busy="true" aria-label="Loading the leaderboard">' +
        (tokens() ? tokensPickerHTML(null) : '') +
        '<div class="bd-stage">' +
        pod.map((p) => `<div class="bd-champ ${p.cls}"><span class="bd-champ-top"><i class="bd-skel" style="width:${p.av};height:${p.av};border-radius:${p.r}"></i><i class="bd-skel" style="width:6rem;height:.8125rem;margin-top:.625rem"></i><i class="bd-skel" style="width:4.25rem;height:.6875rem;margin-top:.375rem"></i><i class="bd-skel" style="width:4.75rem;height:1rem;margin-top:.375rem"></i></span><i class="bd-skel" style="width:100%;height:${p.step};border-radius:.75rem .75rem 0 0"></i></div>`).join('') +
        '</div>' +
        `<div class="bd-list">${cols}${Array.from({ length: 7 }, skRow).join('')}</div>` +
        '</div></div></div>' +
        '<aside class="bd-week" aria-label="The week, day by day"><div class="bd-wscroll">' +
        '<div class="bd-strip"><i class="bd-skel" style="width:4rem;height:1.125rem"></i><i class="bd-skel" style="width:10rem;height:.8125rem"></i></div>' +
        '<div class="bd-wfull">' +
        '<div class="bd-eyebrow"><i class="bd-skel" style="width:7rem;height:.75rem"></i><i class="bd-skel" style="width:5rem;height:.75rem"></i></div>' +
        `<section class="bd-wc"><i class="bd-skel" style="display:block;width:5.5rem;height:.6875rem"></i><i class="bd-skel" style="display:block;width:9rem;height:2.25rem;margin-top:.5rem"></i>${skBars([45, 72, 58, 92, 66, 38, 80])}</section>` +
        `<section class="bd-wc"><i class="bd-skel" style="display:block;width:3rem;height:.6875rem"></i><i class="bd-skel" style="display:block;width:7rem;height:1.625rem;margin-top:.5rem"></i>${skBars([35, 62, 48, 84, 52, 24, 68])}</section>` +
        '<section class="bd-wc"><i class="bd-skel" style="display:block;width:5.5rem;height:.6875rem;margin-bottom:.75rem"></i><i class="bd-skel" style="display:block;height:1.875rem;margin-bottom:.375rem"></i><i class="bd-skel" style="display:block;height:1.875rem;margin-bottom:.375rem"></i><i class="bd-skel" style="display:block;height:1.875rem"></i></section>' +
        '</div></div></aside>'
      );
    }
    if (mode === 'offline') {
      return `<div class="bd-empty"><div class="bd-ghost off"><i>2</i><i>1</i><i>3</i>${BD_I.cloud}</div><h2>Can't reach the server</h2><p>The leaderboard comes back with the connection.</p></div>`;
    }
    if (mode === 'error') {
      return `<div class="bd-empty"><h2>Couldn't load the leaderboard</h2><p>${esc(errorText(board.error))}</p></div>`;
    }
    if (boardFriends()) {
      return '<div class="bd-empty"><div class="bd-ghost"><i>2</i><i>1</i><i>3</i><span class="bd-ember"></span></div>' +
        '<h2>Race your friends here</h2><p>Add a friend and the two of you show up on this board, week after week.</p>' +
        '<button type="button" class="bd-primary" data-empty-act="friends">Add friends</button></div>';
    }
    return '<div class="bd-empty"><div class="bd-ghost"><i>2</i><i>1</i><i>3</i><span class="bd-ember"></span></div>' +
      '<h2>The week is wide open</h2><p>No one has XP this week yet. Your first minute of work puts you on top.</p>' +
      '<button type="button" class="bd-primary" data-empty-act="new">New terminal</button></div>';
  }

  function updateDock() {
    const d = views.board.querySelector('.bd-dock');
    const sc = views.board.querySelector('.bd-scroll');
    const mine = views.board.querySelector('.bd-row.me, .bd-champ.me');
    if (!d || !sc || !mine) return;
    const a = mine.getBoundingClientRect(), b = sc.getBoundingClientRect();
    d.hidden = a.bottom > b.top + 60 && a.top < b.bottom - 8;
  }

  function fitBoard() {
    const host = views.board.querySelector('.bd-in');
    const body = views.board.querySelector('.bd-body');
    if (!host || !body || !host.offsetParent) return;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    body.classList.toggle('bd-one', host.clientWidth / rem < 56);
    const rank = host.querySelector('.bd-rank');
    body.classList.toggle('bd-tight', !!rank && rank.clientWidth / rem < 44);
    updateDock();
  }

  function countUp(el, to) {
    if (!el || counted) return;
    counted = true;
    if (reduced()) return;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 700);
      el.textContent = Xp.num(Math.round(to * (1 - (1 - k) ** 3)));
      if (k < 1 && el.isConnected) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function renderBoard() {
    const body = views.board.querySelector('.bd-body');
    const host = views.board.querySelector('.bd-in');
    const meta = views.board.querySelector('.cv-board > header .meta');
    if (!body || !host) return;
    const tests = window.SocialTest && S && SocialTest.on(S.version) && SocialTest.shown();
    setHTML(views.board.querySelector('.lb-tests'), tests ? (test() ? test().strip() : '') + SocialTest.strip() : '');

    const all = boardAll();
    const raw = board && !board.error ? board.community : null;
    const c = raw && window.Community ? Community.goalView(raw) : raw;
    const emptyFriends = !!(board && !board.error && boardFriends() && (all.length === 0 || (all.length === 1 && all[0].me)) && isLiveWeek());
    const emptyAll = !!(board && !board.error && all.length === 0);

    let content = '';
    let metaText = '';
    if (!board) {
      content = boardLoading ? emptyBoardHTML('loading') : '';
      metaText = 'loading…';
    } else if (board.error) {
      const off = board.error === 'offline' || (S && S.reachable === false);
      content = emptyBoardHTML(off ? 'offline' : 'error');
      metaText = off ? 'offline' : 'error';
    } else if (emptyFriends || emptyAll) {
      content = emptyBoardHTML('empty');
      metaText = 'no one yet';
    } else {
      content = rankHTML(all, c) + weekPaneHTML(all, c);
      const total = board.total || all.length;
      metaText = `${Xp.num(total)} ${boardFriends() ? 'of you' : 'hackers'} on the board`;
    }

    body.classList.toggle('bd-enter', boardEnter && !reduced());
    setHTML(host, boardBarHTML() + content);
    if (meta) meta.textContent = metaText;
    fitBoard();
    lightFires(host);
    host.querySelector('.bd-scroll')?.addEventListener('scroll', updateDock, { passive: true });
    if (fetched && !tokens() && c && isLiveWeek()) {
      countUp(host.querySelector('[data-count]'), Math.round((c.seconds || 0) / 3600));
      window.Community?.goalMoment(host.querySelector('.bd-goal.done'), c);
    }
  }

  function rowTops() {
    const m = new Map();
    views.board.querySelectorAll('.bd-row[data-open]').forEach((r) => m.set(r.dataset.open, r.getBoundingClientRect().top));
    return m;
  }
  function slide(before) {
    if (reduced()) return;
    views.board.querySelectorAll('.bd-row[data-open]').forEach((r) => {
      const was = before.get(r.dataset.open);
      if (was == null) return;
      const dy = was - r.getBoundingClientRect().top;
      if (Math.abs(dy) < 2) return;
      r.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: 320, easing: 'cubic-bezier(0.2, 0, 0, 1)' });
    });
  }

  async function boardAction(e) {
    if (test()?.click(e.target)) return renderBoard();
    if (window.SocialTest?.click(e.target)) return renderBoard();
    const t = e.target.closest('[data-set], [data-step], [data-now], [data-all], [data-tome], [data-strip], [data-week], [data-open], [data-empty-act]');
    if (!t) return;
    if (t.dataset.set) {
      const key = t.dataset.set, val = t.dataset.v;
      if (key === 'tab') {
        if (val === boardMetric) return;
        boardMetric = val === 'tokens' ? 'tokens' : 'xp';
        try { localStorage.setItem('lb-metric', boardMetric); } catch {}
        Object.assign(tokPick, { tool: '', model: '', effort: '' });
        boardWhole = false;
        await loadBoard(false, true);
      } else if (key === 'when') {
        const nextBy = val === 'all' ? 'all' : 'week';
        if (nextBy === boardBy) return;
        boardBy = nextBy;
        if (boardBy === 'week') boardWeek = boardLastWeek;
        try { localStorage.setItem('lb-by', boardBy); } catch {}
        boardWhole = false;
        await loadBoard(false, true);
      } else if (key === 'who') {
        const friends = val === 'friends';
        if (picked() || friends === friendsPref) return;
        friendsPref = friends;
        try { localStorage.setItem('lb-who', friends ? 'friends' : 'everyone'); } catch {}
        boardWhole = false;
        await loadBoard(false, true);
      } else if (key === 'ai') {
        if (val === tokPick.tool) return;
        Object.assign(tokPick, { tool: val, model: '', effort: '' });
        boardWhole = false;
        await loadBoard(false, false);
      }
      views.board.querySelector(`[data-set="${key}"][data-v="${val}"]`)?.focus();
      return;
    }
    if (t.dataset.step) {
      const bounds = weekBounds();
      const step = Number(t.dataset.step) * 7;
      let next = addDays(activeWeekStart(), step);
      if (next < bounds.first) next = bounds.first;
      if (next >= bounds.current) next = null;
      boardBy = 'week';
      boardWeek = next;
      boardLastWeek = next;
      boardWhole = false;
      try { localStorage.setItem('lb-by', 'week'); } catch {}
      await loadBoard(false, true);
      const b = views.board.querySelector(`.bd-step[data-step="${t.dataset.step}"]`);
      (b && !b.disabled ? b : views.board.querySelector('.bd-wklabel'))?.focus();
      return;
    }
    if (t.hasAttribute('data-now')) {
      boardBy = 'week';
      boardWeek = null;
      boardLastWeek = null;
      boardWhole = false;
      try { localStorage.setItem('lb-by', 'week'); } catch {}
      await loadBoard(false, true);
      views.board.querySelector('.bd-wklabel')?.focus();
      return;
    }
    if (t.dataset.week) {
      const bounds = weekBounds();
      const wk = t.dataset.week;
      boardBy = 'week';
      boardWeek = wk >= bounds.current ? null : wk;
      boardLastWeek = boardWeek;
      boardWhole = false;
      try { localStorage.setItem('lb-by', 'week'); } catch {}
      await loadBoard(false, true);
      return;
    }
    if (t.hasAttribute('data-all')) {
      boardWhole = t.dataset.all === '1';
      renderBoard();
      views.board.querySelector('.bd-more button')?.focus();
      return;
    }
    if (t.hasAttribute('data-tome')) {
      views.board.querySelector('.bd-row.me, .bd-champ.me')?.scrollIntoView({ block: 'center', behavior: reduced() ? 'instant' : 'smooth' });
      return;
    }
    if (t.hasAttribute('data-strip')) {
      boardWeekOpen = !boardWeekOpen;
      views.board.querySelector('.bd-week')?.classList.toggle('open', boardWeekOpen);
      t.setAttribute('aria-expanded', String(boardWeekOpen));
      return;
    }
    if (t.dataset.emptyAct === 'new') return $('newchat')?.click();
    if (t.dataset.emptyAct === 'friends') return window.GitView?.view('friends');
    if (t.dataset.open) return openPerson(t.dataset.open, t.querySelector('.bd-av'));
  }

  async function addFromBoard(u, button) {
    if (button) button.disabled = true;
    const r = await Social.request(Social.handle(u));
    if (r.error && r.error !== 'already_requested' && r.error !== 'already_friends') {
      if (button) button.disabled = false;
      return toast(REQUEST_ERRORS[r.error] || errorText(r.error));
    }
    Sfx.play('accept');
    if (r.friend || r.error === 'already_friends') u.friend = true;
    else u.requested = true;
    boardCache.clear();
    toast(u.friend ? `you and ${Social.handle(u)} are friends now` : `request sent to ${Social.handle(u)}`);
    if (shown === 'board') renderBoard();
  }

  async function toggleActivity() {
    if (!S.xp) return;
    const show = S.xp.show === false;
    const r = await Social.setActivity(show);
    if (r.error) return toast(errorText(r.error));
    S.xp = { ...S.xp, show };
    renderActivity();
    toast(show ? 'friends see your active time again' : 'your active time is hidden from friends · your level still shows');
  }

  // Your XP changed (the daily bonus, a new level): show it now rather than at the next heartbeat.
  Social.on((ev) => {
    if (ev.type === 'xp' && ev.xp && S) {
      // A new level goes in the bell (inbox.js keeps them: there's no history of them).
      window.Inbox?.leveled(S.xp && S.xp.level, ev.xp.level);
      render({ ...S, xp: ev.xp });
    }
  });

  function badges() {
    // The bell counts the notes of the version that came by itself too, until they're opened, and your new badges and
    // levels (inbox.js).
    const n = Social.unread() + Social.requests(), notes = Social.unreadNotes() + (wnUnread ? 1 : 0) + (window.Inbox ? Inbox.unseen() : 0);
    const show = (b, k) => {
      if (!b) return;
      b.textContent = k > 99 ? '99+' : k;
      b.hidden = !k;
    };
    show(document.querySelector('#activity [data-view=friends] .vs-badge'), n);
    show(document.querySelector('#activity [data-view=notifications] .vs-badge'), notes);
    const me = brand.querySelector('.bme');
    const st = Social.state()?.me?.status;
    me.hidden = !st;
    if (st) me.className = `pdot bme p-${st}`;
  }
  Social.on(() => renderSocial());

  // Settings: the version and its updates. They download by themselves and go in when you step away (or at once, with
  // the switch); "check for updates" asks now, "update now" shows what's new and restarts into it.
  function renderInfo() {
    const el = q('.hk-info');
    if (!el) return;
    const status = S.updating
      ? `<em>${esc(S.updating + pct())}</em>`
      : S.update
        ? `<em class="${S.xpPaused ? 'bad' : ''}">${esc(S.update.version)} ${S.updateReady ? 'ready · installs when you step away' : `is out · downloading${pct()}`}${S.xpPaused ? ' · XP paused until then' : ''}</em>`
        : S.checking
          ? '<em class="dim">checking…</em>'
          : S.checkedAt
            ? `<em class="dim">up to date · checked ${ago(S.checkedAt)}</em>`
            : '';
    setHTML(
      el,
      `<div class="hk-row"><span>version</span><div class="hk-val"><b>${esc(S.version || '?')}</b>${status}` +
        `${window.WhatsNew?.on ? '<button type="button" class="hk-upd hk-wn" title="What changed in the version you\'re on">what\'s new</button>' : ''}</div></div>` +
        '<div class="hk-row"><span>updates<small>they download by themselves and install when you step away · your chats keep running</small></span><div class="hk-val">' +
        `<button type="button" class="hk-upd hk-check"${S.checking || S.updating ? ' disabled' : ''}>check for updates</button>` +
        `${S.update && !S.updating ? '<button type="button" class="hk-upd hk-now">update now</button>' : ''}</div></div>` +
        `<div class="hk-row"><span>install updates right away<small>off: an update waits until you're away for 10 minutes</small></span>` +
        `<button type="button" class="hk-sw upd${S.updateRightAway ? ' on' : ''}" role="switch" aria-checked="${!!S.updateRightAway}" title="Install updates as soon as they're downloaded"><i></i></button></div>`,
    );
    el.querySelector('.hk-check').onclick = () => call('checkUpdate').then((s) => s && render(s)).catch(() => toast(errorText('offline')));
    const now = el.querySelector('.hk-now');
    if (now) now.onclick = openUpdate;
    const wn = el.querySelector('.hk-wn');
    if (wn) wn.onclick = () => openWhatsNew();
    el.querySelector('.hk-sw.upd').onclick = () => call('updateRightAway', { on: !S.updateRightAway }).then((s) => s && render(s));
  }


  // ---------- themes ----------
  // Swift makes and applies the colours (Themes.swift, the "theme" handler); the list comes once, with every theme's
  // colours, for the theme view's pictures and for someone's card in their theme.
  const theme = (type, payload) => window.webkit.messageHandlers.theme.postMessage(Object.assign({ type }, payload || {}));
  let themes = null;
  const themeList = async () => themes || (themes = await theme('list').catch(() => null));
  // A theme's colours on one element and what's in it: its tokens, those made from them again (style.css makes them on
  // the root, from the root's), and its text colour.
  const themeStyle = (tokens) =>
    Object.entries(tokens).map(([k, v]) => `${k}:${v}`).join(';') +
    ';--panel:rgba(var(--panel-rgb),var(--glass-a));--line:rgba(var(--accent-rgb),0.32);--line-soft:rgba(var(--accent-rgb),0.13);color:var(--txt)';
  let themeAt = -1; // the card the arrow keys are on

  // Viktoria's own switch and Mischief level, above the theme cards (any theme). Native keeps both (Mascot.swift) and sets
  // window.__mascotEnabled / __mascotMischief, then fires 'mascotchange'; Settings > Appearance shows the same two.
  const MISCHIEF_NAMES = ['Calm', 'Playful', 'Naughty', 'Crazy'];
  // Viktoria is downloaded on demand (Mascot.swift, MascotAsset): native sets window.__mascotAsset = {state, got, total,
  // reason}, state none | downloading | failed | ready, and fires 'mascotasset'. Without it (Windows, for now) she
  // counts as ready and nothing below shows. The same states paint the Themes row and Settings > Appearance (.mas-slot).
  const MAS_MB = 34;
  let masTotalSeen = 0;
  const masAsset = () => window.__mascotAsset || { state: 'ready' };
  const masReady = () => masAsset().state === 'ready';
  const masMB = (b) => Math.round(b / 1048576);
  const masSize = () => (masTotalSeen > 0 ? masMB(masTotalSeen) : MAS_MB);
  function masProg() {
    const s = masAsset();
    const total = Number(s.total) > 0 ? Number(s.total) : 0;
    if (total) masTotalSeen = total;
    const got = Math.max(0, Number(s.got) || 0);
    const pct = total ? Math.min(100, (got / total) * 100) : 0;
    return { pct, text: `${Math.floor(got / 1048576)} / ${masSize()} MB` };
  }
  const MAS_MARKUP = {
    none: () => `<button type="button" class="mas-btn mas-go">Get Viktoria \u00b7 ${masSize()} MB</button>`,
    downloading: () => {
      const p = masProg();
      return (
        `<span class="mas-prog"><span class="mas-bar" role="progressbar" aria-label="Downloading Viktoria" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(p.pct)}"><i style="width:${p.pct}%"></i></span>` +
        `<span class="mas-num">${p.text}</span><button type="button" class="mas-x" aria-label="Cancel download">\u2715</button></span>`
      );
    },
    failed: () => `<span class="mas-fail"><span>Couldn't download. Check your connection.</span><button type="button" class="mas-btn mas-go">Try again</button></span>`,
  };
  const masStateOf = () => masAsset().state;
  const masSlotHTML = () => {
    const st = masStateOf();
    return `<span class="mas-slot" data-st="${st}">${MAS_MARKUP[st] ? MAS_MARKUP[st]() : ''}</span>`;
  };
  let masLast = null;
  function masAnnounce(st) {
    if (masLast === null || st === masLast) { masLast = st; return; }
    masLast = st;
    const text = { downloading: 'Downloading Viktoria', ready: 'Viktoria is ready', failed: "Couldn't download Viktoria" }[st];
    if (!text) return;
    const live = masLiveEl();
    if (live) live.textContent = text;
  }
  // The live region is in the page from load, empty, so a screen reader is watching it when its text changes.
  function masLiveEl() {
    let live = document.getElementById('mas-live');
    if (!live && document.body) {
      live = document.createElement('div');
      live.id = 'mas-live';
      live.className = 'sr-only';
      live.setAttribute('aria-live', 'polite');
      document.body.appendChild(live);
    }
    return live;
  }
  masLiveEl();
  document.addEventListener('DOMContentLoaded', masLiveEl);
  let masFocusRoot = null; // after Remove: the Settings group whose Get button takes the focus
  // Repaints every slot: its markup only when the state changes (so focus stays put), its numbers on every tick.
  function masPaint() {
    const st = masStateOf();
    let refocus = null;
    document.querySelectorAll('.mas-slot').forEach((slot) => {
      if (slot.dataset.st !== st) {
        const had = slot.contains(document.activeElement);
        slot.dataset.st = st;
        slot.innerHTML = MAS_MARKUP[st] ? MAS_MARKUP[st]() : '';
        if (had) refocus = slot;
      } else if (st === 'downloading') {
        const p = masProg();
        const bar = slot.querySelector('.mas-bar');
        if (bar) {
          bar.setAttribute('aria-valuenow', String(Math.round(p.pct)));
          bar.firstElementChild.style.width = `${p.pct}%`;
        }
        const num = slot.querySelector('.mas-num');
        if (num) num.textContent = p.text;
      }
    });
    document.querySelectorAll('.mas-when-ready').forEach((el) => (el.hidden = !masReady()));
    document.querySelectorAll('.mas-rm-wrap').forEach((el) => {
      el.hidden = !(window.__mascotAsset && masReady());
      const mb = el.querySelector('.mas-mb');
      if (mb) mb.textContent = String(masSize());
    });
    // Focus follows the control that stood where the pressed one was: Get/Cancel to the next button, or to the ready
    // switch once she is downloaded; after Remove, to the Get button.
    if (refocus) {
      const root = refocus.closest('.th-mascot, .st-group') || document;
      (refocus.querySelector('button') || (st === 'ready' ? root.querySelector('.th-mas-sw, .st-mascot') : null))?.focus();
    }
    if (masFocusRoot && st === 'none') {
      masFocusRoot.querySelector('.mas-go')?.focus();
      masFocusRoot = null;
    }
    masAnnounce(st);
  }
  window.MascotUI = { slot: masSlotHTML, ready: masReady, paint: masPaint };
  const mascotIsOn = () => window.__mascotEnabled === true && masReady();
  const mascotLevel = () => {
    const n = Number(window.__mascotMischief);
    return Number.isInteger(n) && n >= 0 && n <= 3 ? n : 3;
  };
  const mascotPost = (msg) => window.webkit?.messageHandlers?.radar?.postMessage(msg);
  function mascotRow() {
    const on = mascotIsOn();
    return (
      '<div class="th-mascot"><div class="th-mas-main"><span class="th-mas-l"><b>Viktoria</b><small>An anime companion who walks around your screen</small></span>' +
      `${masSlotHTML()}<button type="button" class="hk-sw th-mas-sw mas-when-ready${on ? ' on' : ''}" role="switch" aria-checked="${on}" title="Show Viktoria"${masReady() ? '' : ' hidden'}><i></i></button></div>` +
      `<div class="th-mas-more"${on ? '' : ' hidden'}><span class="th-mas-l"><b>Mischief</b><small>How often Viktoria clicks around and wanders</small></span>` +
      `<span class="lb-seg ui-seg th-mischief">${MISCHIEF_NAMES.map((n, i) => `<button type="button" data-level="${i}" class="${i === mascotLevel() ? 'on' : ''}">${n}</button>`).join('')}</span>` +
      `<small class="th-mas-credit">Model: Mei Sakuraniwa © ProjectCorelinjp</small></div></div>`
    );
  }
  function mascotPaint() {
    const on = mascotIsOn();
    document.querySelectorAll('.th-mas-sw').forEach((b) => {
      b.classList.toggle('on', on);
      b.setAttribute('aria-checked', String(on));
    });
    document.querySelectorAll('.th-mas-more').forEach((el) => (el.hidden = !on));
    document.querySelectorAll('.th-mischief button').forEach((b) => b.classList.toggle('on', Number(b.dataset.level) === mascotLevel()));
    masPaint();
  }
  window.addEventListener('mascotchange', mascotPaint);
  window.addEventListener('mascotasset', mascotPaint);
  document.addEventListener('click', (e) => {
    // The download's buttons (here and in Settings > Appearance): native does the work and reports back; the page
    // shows the next state at once.
    const asset = (state, msg) => {
      window.__mascotAsset = { state, got: 0, total: 0 };
      window.dispatchEvent(new Event('mascotasset'));
      mascotPost({ type: msg });
    };
    if (e.target.closest?.('.mas-go')) return asset('downloading', 'mascotGet');
    if (e.target.closest?.('.mas-x')) return asset('none', 'mascotCancel');
    if (e.target.closest?.('.mas-remove')) {
      window.__mascotEnabled = false;
      masFocusRoot = e.target.closest('.st-group');
      asset('none', 'mascotRemove');
      window.dispatchEvent(new Event('mascotchange'));
      return;
    }
    if (e.target.closest?.('.th-mas-sw')) {
      const on = !mascotIsOn();
      window.__mascotEnabled = on;
      window.dispatchEvent(new Event('mascotchange'));
      mascotPost({ type: 'mascotEnabled', on });
      return;
    }
    const b = e.target.closest?.('.th-mischief button[data-level]');
    if (!b) return;
    const level = Number(b.dataset.level);
    window.__mascotMischief = level;
    window.dispatchEvent(new Event('mascotchange'));
    mascotPost({ type: 'mascotMischief', level });
  });

  function themeCard(t, kept) {
    const k = t.tokens, a = (i) => k[`--a${i}`];
    const vars = {
      '--t-bg': k['--bg'], '--t-panel': `rgb(${k['--panel-rgb']})`, '--t-acc': k['--accent'], '--t-soft': k['--accent-soft'], '--t-txt': k['--txt'],
      '--t-dim': k['--dim'], '--t-cyan': k['--cyan'], '--t-warn': k['--warn'], '--t-code': k['--code-bg'], '--t-fg': k['--code-fg'], '--t-cur': k['--code-cursor'],
    };
    const style = Object.entries(vars).map(([n, v]) => `${n}:${v}`).join(';');
    return (
      `<button type="button" class="th-card${t.id === kept ? ' on' : ''}" data-id="${esc(t.id)}" style="${esc(style)}">` +
      '<span class="th-shot"><span class="th-top"><i></i><b>ORBITERM</b><em></em></span>' +
      '<span class="th-side"><i class="busy"></i><i class="idle"></i><i class="wait"></i></span>' +
      `<span class="th-term"><span><b style="color:${a(2)}">❯</b> git status</span><span style="color:${a(1)}">  modified: app.js</span>` +
      `<span style="color:${a(2)}">  new file: themes.json</span><span><b style="color:${a(4)}">~/repo</b> <b style="color:${a(5)}">main</b> <i class="cur"></i></span></span>` +
      `<span class="th-pal">${Array.from({ length: 16 }, (_, i) => `<i style="background:${a(i)}"></i>`).join('')}</span></span>` +
      `<span class="th-name">${esc(t.name)}<em>${t.id === kept ? 'ACTIVE' : ''}</em></span>` +
      '</button>'
    );
  }

  // The themes view: each theme as a small picture of the app in its own colours. Pointing at one, or moving to it with
  // the arrow keys, shows the whole app in it at once; a click (or ↩) keeps it; leaving the cards or the view goes back
  // to the kept one.
  async function openThemes() {
    const el = views.themes;
    const list = await themeList();
    if (shown !== 'themes') return;
    if (!list || !list.themes) return setHTML(el, `<section class="panel cv-themes"><header><span class="tag">themes</span></header><div class="mn-empty">themes didn't load</div></section>`);
    el.innerHTML =
      `<section class="panel cv-themes"><header><span class="tag">themes</span><span class="meta">${list.themes.length} themes · point to try · click to keep${MACHINE === 'PC' ? ' · the orbit map keeps its colours' : ''}</span></header>` +
      mascotRow() +
      `<div class="body th-grid">${list.themes.map((t) => themeCard(t, list.chosen)).join('')}</div></section>`;
    const cards = [...el.querySelectorAll('.th-card')];
    let timer = 0;
    themeAt = -1;
    const show = (id) => {
      clearTimeout(timer);
      timer = setTimeout(() => theme(id === list.chosen ? 'revert' : 'preview', { id }), 90);
    };
    const mark = (i) => {
      themeAt = i;
      cards.forEach((c, j) => c.classList.toggle('hot', j === i));
    };
    const keep = (card) => {
      list.chosen = card.dataset.id;
      clearTimeout(timer);
      // Kept, not only pointed at (themechange comes with every preview, and not at all for the one already showing): a
      // theme can play its intro now.
      theme('choose', { id: list.chosen }).then(() => {
        Hooks.pulse('theme-kept', { value: card.dataset.id }, { ms: 1500 });
        Sfx.play('theme-kept');
      });
      cards.forEach((c) => {
        c.classList.toggle('on', c === card);
        c.querySelector('.th-name em').textContent = c === card ? 'ACTIVE' : '';
      });
    };
    cards.forEach((card, i) => {
      card.onmouseenter = () => {
        mark(i);
        show(card.dataset.id);
      };
      card.onclick = () => keep(card);
    });
    el.querySelector('.th-grid').onmouseleave = () => {
      mark(-1);
      show(list.chosen);
    };
    el.__keys = (e) => {
      const cols = getComputedStyle(el.querySelector('.th-grid')).gridTemplateColumns.split(' ').length;
      const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key];
      if (step) {
        e.preventDefault();
        const i = Math.max(0, Math.min(cards.length - 1, themeAt < 0 ? cards.findIndex((c) => c.dataset.id === list.chosen) : themeAt + step));
        mark(i);
        cards[i].scrollIntoView({ block: 'nearest' });
        show(cards[i].dataset.id);
      } else if (e.key === 'Enter' && themeAt >= 0) {
        e.preventDefault();
        keep(cards[themeAt]);
      }
    };
  }

  // ---------- the activity bar's views (git.js): the leaderboard and the themes, where the dashboard's middle is ----------
  const views = {};
  for (const v of [...(window.Notes ? ['notes'] : []), 'friends', 'profile', 'board', 'themes', 'notifications', ...(window.Roadmap ? ['roadmap'] : [])]) {
    const el = document.createElement('section');
    el.id = `${v}-view`;
    el.className = 'cv';
    document.getElementById('app').appendChild(el);
    views[v] = el;
  }
  views.board.innerHTML =
    '<section class="panel cv-board"><header><span class="tag">leaderboard</span><span class="meta"></span></header>' +
    '<div class="body bd-body"><div class="lb-tests"></div><div class="bd-in"></div><div id="bd-live" class="sr-only" aria-live="polite"></div></div></section>';
  {
    const bdBody = views.board.querySelector('.bd-body');
    bdBody.addEventListener('click', boardAction);
    bdBody.addEventListener('change', (e) => {
      const k = e.target.closest('[data-pick]')?.dataset.pick;
      if (!k || !(k in tokPick)) return;
      tokPick[k] = e.target.value;
      if (k === 'model') tokPick.effort = '';
      loadBoard(false, false).then(() => {
        bdBody.querySelector(`[data-pick="${CSS.escape(k)}"]`)?.focus({ preventScroll: true });
      });
    });
    bdBody.addEventListener('keydown', (e) => {
      if (e.target.closest?.('select, input, textarea')) return;
      if (e.target.closest?.('.bd-wklabel') && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        const b = bdBody.querySelector(`.bd-step[data-step="${e.key === 'ArrowLeft' ? -1 : 1}"]`);
        if (b && !b.disabled) {
          e.preventDefault();
          b.click();
          setTimeout(() => bdBody.querySelector('.bd-wklabel')?.focus(), 30);
        }
        return;
      }
      const radio = e.target.closest?.('[role="radio"]');
      if (radio && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        const sib = [...radio.parentElement.querySelectorAll('[role="radio"]')];
        const next = sib[(sib.indexOf(radio) + (e.key === 'ArrowRight' ? 1 : sib.length - 1)) % sib.length];
        if (next) {
          e.preventDefault();
          next.click();
        }
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || ((e.key === 'Home' || e.key === 'End') && e.target.closest?.('.bd-rank'))) {
        const rows = ['.bd-champ.p1', '.bd-champ.p2', '.bd-champ.p3']
          .map((s) => bdBody.querySelector(`${s}:not(:disabled)`))
          .filter(Boolean)
          .concat([...bdBody.querySelectorAll('button.bd-row')]);
        if (!rows.length) return;
        const i = rows.indexOf(document.activeElement);
        e.preventDefault();
        const nextIdx = e.key === 'Home' ? 0 : e.key === 'End' ? rows.length - 1 : Math.max(0, Math.min(rows.length - 1, i < 0 ? 0 : i + (e.key === 'ArrowDown' ? 1 : -1)));
        rows[nextIdx].focus();
      }
    });
    if (window.ResizeObserver) new ResizeObserver(fitBoard).observe(bdBody.querySelector('.bd-in'));
    addEventListener('staging-tests', () => shown === 'board' && renderBoard());
  }
  // The Roadmap: what comes next, and the users' votes on it (roadmap.js).
  if (views.roadmap) window.Roadmap.mount(views.roadmap);
  // Every note as a small panel on a board (notes.js).
  if (views.notes) window.Notes.mountBoard(views.notes);
  const fq = (sel) => views.friends.querySelector(sel);
  views.friends.innerHTML =
    '<section class="panel cv-friends"><header><span class="tag">friends</span><span class="meta"></span></header><div class="body">' +
    '<div class="me-card-host"></div>' +
    '<label class="hk-field mn-add"><span class="hk-prompt">+</span><input class="mn-handle-in" maxlength="21" spellcheck="false" autocomplete="off" placeholder="add a friend · name#0427"><button class="mn-send" type="button" disabled>send request</button></label>' +
    '<p class="hk-status mn-add-status"></p><div class="mn-list mn-friends"></div></div></section>' +
    '<div class="cv-col">' +
    '<section class="panel cv-requests"><header><span class="tag">requests</span><span class="meta"></span></header><div class="body">' +
    '<div class="hk-h">INCOMING</div><div class="mn-list mn-in"></div><div class="hk-h">SENT</div><div class="mn-list mn-out"></div></div></section></div>';
  views.friends.addEventListener('click', listAction);
  views.friends.addEventListener('click', (e) => {
    if (e.target.closest('[data-me=open]')) openProfile({ id: 'me', from: 'friends' });
  });
  views.friends.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest?.('.me-card')) {
      e.preventDefault();
      openProfile({ id: 'me', from: 'friends' });
    }
  });
  // Profile page (profile.js): the page, and the "Edit profile" panel on its right while it's open (profile-edit.js).
  views.profile.innerHTML =
    '<section class="panel cv-me"><header><span class="tag">profile</span><span class="meta"></span></header><div class="body me-host"></div></section>' +
    '<aside class="pe" aria-labelledby="pe-title" hidden></aside>';
  views.profile.addEventListener('click', (e) => {
    const b = e.target.closest('[data-me]');
    if (b && b.dataset.me === 'edit') window.ProfileEdit?.open();
  });
  // Your badges came in or changed: your card on Friends shows the one you display and how many you have.
  window.Badges?.on(() => shown === 'friends' && meCard());
  // A double click on a friend (not on their buttons) opens the chat.
  views.friends.addEventListener('dblclick', (e) => {
    const row = e.target.closest('.mn-friends .mn-row');
    if (row && !e.target.closest('button')) Social.openChat(row.dataset.id);
  });
  views.friends.addEventListener('contextmenu', friendMenu);
  views.friends.addEventListener('mousedown', (e) => {
    if (!e.target.closest('.mn-ctx')) fq('.mn-ctx')?.remove();
  });
  // Friends: add one by name#tag.
  {
    const add = fq('.mn-handle-in'), send = fq('.mn-send'), addStatus = fq('.mn-add-status');
    const valid = () => /^[A-Za-z0-9_.-]+( [A-Za-z0-9_.-]+)*#\d{1,4}$/.test(add.value.trim());
    const say = (cls, msg) => {
      addStatus.className = `hk-status mn-add-status ${cls}`;
      addStatus.textContent = msg;
    };
    add.addEventListener('input', () => {
      send.disabled = !valid();
      say('', '');
    });
    const request = async () => {
      if (!valid()) return;
      send.disabled = true;
      const r = await Social.request(add.value.trim());
      if (r.error) {
        send.disabled = false;
        return say('bad', REQUEST_ERRORS[r.error] || errorText(r.error));
      }
      add.value = '';
      say('ok', r.friend ? `you and ${Social.handle(r.friend)} are friends now` : `request sent to ${Social.handle(r.request.to)}`);
    };
    send.onclick = request;
    add.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') request();
    });
  }
  // The bell: an inbox in two panes (inbox.js; its look: notifications.css). Left, the developer's notes, what's new in
  // each release you have, your new badges and levels and your friends' big moments, newest first under their day; right,
  // the one picked, in full. Opening it reads them all, as YouTube's bell does (the ones unread then keep their dot while
  // it stays open): news to read, not a to-do list, so no "mark all read". Picking the release that came by itself reads
  // it, as Help → What's New does; the bell no longer opens that window.
  views.notifications.innerHTML =
    '<section class="panel cv-notes"><header><span class="tag">notifications</span><span class="meta"></span></header><div class="body nf-body"><div class="nf-in"></div></div></section>';
  let fresh = new Set();
  // Each release you have is one too (whatsnew.js). The version that came by itself is unread until it's picked.
  let wnList = null;
  // The newest releases, and the version you're on with them even when it's older (asked for by its build).
  const loadReleases = () =>
    WhatsNew.release(S && S.version, S && S.build).then(() => WhatsNew.releases()).then((list) => {
      wnList = list || wnList;
      if (list && shown === 'notifications') renderNotes();
    });
  const inbox = window.Inbox
    ? window.Inbox.mount(views.notifications.querySelector('.nf-in'), {
      S: () => S,
      fresh: () => fresh,
      releases: () => wnList,
      current,
      wnUnread: () => wnUnread,
      readRelease() {
        wnUnread = false;
        window.webkit.messageHandlers.radar.postMessage({ type: 'whatsNewRead' });
        badges();
      },
      count: () => badges(),
      richText,
      update,
      openFeedback,
      openWhatsNew: () => openWhatsNew(),
    })
    : { open() {}, render() {} };
  function renderNotes() {
    inbox.render();
  }
  function openNotes() {
    const N = Social.notes();
    fresh = new Set(N ? N.list.filter((n) => !n.read).map((n) => n.id) : []);
    inbox.open();
    // The releases didn't load with the page (offline then), or the version you're on is older than them: once more.
    if (window.WhatsNew?.on && (!wnList || (S && S.build && !current(wnList)))) loadReleases();
    if (!N) Social.loadNotes();
    else if (N.unread) Social.readNotes();
  }
  Social.on((ev) => {
    if (ev.type === 'notification' && shown === 'notifications') {
      fresh.add(ev.notification.id);
      Social.readNotes();
    }
    if (shown === 'notifications' && (ev.type === 'notes' || ev.type === 'notification' || ev.type === 'notification_gone')) {
      // Loaded while the view was open: whatever was unread is new now.
      if (ev.type === 'notes' && !fresh.size && Social.unreadNotes()) return openNotes();
      renderNotes();
    }
  });

  let shown = null;
  function showView(v) {
    if (v === shown) return;
    const prev = shown;
    if (shown === 'themes') theme('revert').catch(() => {});
    if (shown === 'profile' && v !== 'profile') window.Profile?.reset?.();
    shown = v;
    document.getElementById('app').classList.toggle('cloud-mode', !!v);
    for (const [k, el] of Object.entries(views)) el.classList.toggle('on', k === v);
    if (v === 'friends') {
      renderSocial();
      // Whatever changed while you weren't looking (a missed live event, another device) shows when it opens.
      Social.load();
    }
    if (v === 'board') {
      counted = fetched = false;
      // Back from a profile the board stays as it was (past week, "Show all"); any other way in starts fresh.
      if (prev !== 'profile') {
        boardWhole = false;
        boardWeek = null;
        boardLastWeek = null;
      }
      weeksCache.clear();
      loadBoard(false, true);
    } else {
      clearTimeout(boardTimer);
      clearTimeout(boardLoadTimer);
    }
    if (v === 'profile' && !window.Profile?.currentId?.()) window.Profile?.openPerson('me');
    if (v === 'themes') openThemes();
    if (v === 'notifications') openNotes();
    if (v === 'roadmap') window.Roadmap.show();
    else window.Roadmap?.hide();
    if (v === 'notes') window.Notes.showBoard();
    else window.Notes?.hideBoard();
  }

  function close() {
    if (!modal) return;
    modal = null;
    tellModal(false);
    root.onmousedown = null;
    const pk = q('.pk');
    if (pk) pk.classList.replace('crt-on', 'crt-off');
    setTimeout(() => {
      if (modal) return;
      root.className = '';
      root.innerHTML = '';
    }, 450);
  }

  const refresh = () => call('state').then(render).catch(() => {});

  $('update').addEventListener('click', openUpdate);
  $('settings').addEventListener('click', () => openMenu('settings'));
  brand.addEventListener('click', () => openProfile());
  addEventListener('keydown', (e) => {
    if (!modal && shown === 'themes' && e.key !== 'Escape' && !e.target.closest('input, textarea')) return views.themes.__keys?.(e);
    if (e.key !== 'Escape') return;
    // Esc on a view of the activity bar closes what's on top of it first (a card, a small menu), then goes back to the
    // dashboard; your profile goes back where it was opened from.
    if (!modal && shown) {
      const top = views[shown].querySelector('.mn-confirm, .mn-ctx') || document.querySelector('.bdg-ctx');
      if (top) return top.remove();
      return shown === 'profile' && window.Profile?.closePerson ? window.Profile.closePerson() : window.GitView?.view('dash');
    }
    if (modal === 'update') {
      if (!S.updating) close();
      return;
    }
    if (modal === 'feedback') return close();
    if (modal === 'whatsnew' || modal === 'tips') return closeWhatsNew();
    if (modal !== 'menu') return;
    // Esc closes what's on top first: the confirmation, a small menu, then the main menu.
    const top = q('.mn-confirm') || q('.mn-ctx') || q('.mn-pick');
    if (top) return top.remove();
    close();
  });
  refresh();
  Social.loadNotes();

  // What's new and tips, from the app (MainWindowController): what the page can't know (the notes of the version that
  // came by itself still unread, the shortcut wheel ever opened), and Help's two windows. The page asks once it's here.
  if (window.WhatsNew?.on && window.__radar) {
    window.__radar.whatsNew = (m) => {
      if (m && m.state) {
        wnUnread = !!m.state.unread;
        WhatsNew.state(m.state);
        badges();
        if (shown === 'notifications') renderNotes();
      }
      if (m && m.open === 'notes') openWhatsNew();
      if (m && m.open === 'tips') openTips();
    };
    window.webkit.messageHandlers.radar.postMessage({ type: 'whatsNew' });
    loadReleases();
  }

  // The app menu's Settings… (MainWindowController.openSettings): Settings on the category used last, as the gear.
  if (window.__radar) window.__radar.openSettings = () => openMenu('settings');

  // A new hacker name, from your profile's "Edit profile" (profile-edit.js): { ok } once sent, { error, text } if refused.
  // Offline the app keeps it and sends it once the API answers again.
  async function rename(name) {
    const r = await call('rename', { name }).catch(() => ({ error: 'offline' }));
    if (r.error) return { error: r.error, text: errorText(r.error) };
    if (r.queued) toast(`saved on this ${MACHINE} · syncs when you're back online`);
    else whenState((s) => s.hackerName === name, (s) => toast(`you are ${s.hackerName}${tagText(s.tag)} now`));
    return { ok: true };
  }

  return { rename, nameMax: MAX, render, state: () => S, openMenu, openSettings: (pane = 'account') => {
    // Opened for a purpose (the account menu's Settings…, a badge's sign in, the shortcut list's "Change shortcuts…"):
    // that category, Account unless another is named, whatever was open last time. The gear and the app menu open the last one.
    openMenu(pane);
  }, openProfile, openPerson, openFriend, openUpdate, openFeedback, openWhatsNew, openTips, showView, renderPower, renderDiscord, close, copyHandle, statusMenu, keyFind };
})();
