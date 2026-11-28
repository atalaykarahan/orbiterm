// Several Claude accounts (the Mac app's ClaudeAccounts.swift / ClaudeAccountsBridge.swift; the plan and spec are in
// araştırma/claude-coklu-hesap/). Three places in the dashboard:
//  - the top bar's Claude columns: one per quota (accounts of one organization share it), the name cell a button;
//  - a plain click on one opens the limits popover (placed and closed like the ORB popover), where one-account users find
//    "Add another Claude account…";
//  - Settings > Claude's first group: the accounts, adding one (Claude's own sign-in in a terminal), renaming, removing.
// Rules it keeps: nothing here switches an account by itself; no usage endpoint is asked; no token is read.
(() => {
  const H = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.claudeAccounts;
  const call = (msg) => (H ? H.postMessage(msg) : Promise.reject(new Error('no bridge')));
  const E = (s) => (typeof esc === 'function' ? esc(s) : String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]));
  const HUES = ['255, 176, 87', '224, 132, 156', '255, 122, 69', '233, 196, 106'];

  let ACC = null; // the bridge's last answer: { multiple, accounts, signingIn }
  let popEl = null;
  let ringEl = null;
  let pendingAdd = false; // "Add Claude Account…" from the popover: Settings opens with the form
  let formOpen = false;
  let formError = '';
  let renaming = null;
  let menuFor = null;
  let watch = null;

  const claudePools = () => (typeof limitsByAI === 'function' ? limitsByAI() : []).filter((a) => a.tool === 'Claude Code');
  const left = (w) => (typeof limitLeft === 'function' ? limitLeft(w) : null);
  const cls = (l) => (typeof limitClass === 'function' ? limitClass(l) : 'na');
  const when = (at, full) => (typeof resetAt === 'function' ? resetAt(at, full) : '');
  const hhmm = (ms) => new Date(ms).toTimeString().slice(0, 5);

  async function load() {
    try {
      ACC = await call({ type: 'state' });
    } catch {
      ACC = ACC || null;
    }
    return ACC;
  }

  // ---------- the top bar's columns ----------
  // The name cell of a Claude column. One account: "claude", as before. Two or more: its initials and labels too.
  function nameCell(a, title, gap) {
    const accs = a.accounts && a.accounts.length ? a.accounts : null;
    const inner = accs
      ? `<span class="ai">claude</span>${accs.map((x) => `<i class="ac" style="--ah:${E(x.hue)}">${E(x.initial)}</i>`).join('')}<em>${E(accs.map((x) => String(x.label).toLowerCase()).join(' · '))}</em>`
      : 'claude';
    const tip = accs ? `${title}\n${accs.map((x) => [x.label, x.email, x.plan && `${x.plan} plan`].filter(Boolean).join(' · ')).join('\n')}` : title;
    // The accessible name says whose column it is (the initials alone read as letters).
    const name = accs ? `Claude limits: ${accs.map((x) => x.label).join(', ')}` : 'Claude limits';
    return `<button type="button" class="lim-n lim-claude${accs ? ' acct' : ''}${gap ? ' gap-after' : ''}" title="${E(tip)}" aria-haspopup="dialog" aria-expanded="${popEl ? 'true' : 'false'}" aria-label="${E(name)}">${inner}</button>`;
  }

  function wire() {
    const box = document.getElementById('limits');
    if (!box || box.dataset.ca) return;
    box.dataset.ca = '1';
    box.addEventListener('click', (e) => {
      // detail 0: Return or Space on the column's button; the popover then takes the focus (its first action).
      if (e.target.closest('.lim-claude')) pop(e.detail === 0);
    });
  }

  // Called at the end of every renderLimits: the open state, the ring, a popover that is open follows the data.
  function after() {
    wire();
    const open = !!popEl;
    document.querySelectorAll('#limits button.lim-claude').forEach((b) => b.setAttribute('aria-expanded', open ? 'true' : 'false'));
    if (open) {
      fill();
      ring();
    }
  }

  function ring() {
    const cells = [...document.querySelectorAll('#limits .lim-claude')];
    if (!popEl || !cells.length) return ringEl && ringEl.remove(), (ringEl = null);
    const rs = cells.map((c) => c.getBoundingClientRect());
    const l = Math.min(...rs.map((r) => r.left)) - 5, r = Math.max(...rs.map((x) => x.right)) + 5;
    const t = Math.min(...rs.map((x) => x.top)) - 3, b = Math.max(...rs.map((x) => x.bottom)) + 3;
    if (!ringEl) {
      ringEl = document.createElement('div');
      ringEl.className = 'lim-ring';
      document.body.appendChild(ringEl);
    }
    Object.assign(ringEl.style, { left: `${l}px`, top: `${t}px`, width: `${r - l}px`, height: `${b - t}px` });
  }

  // ---------- the limits popover ----------
  const windowRow = (label, w, aria) => {
    const l = left(w);
    if (!w) return '';
    const word = l === null ? '' : l === 0 ? `fills again ${when(w.resetsAt, true)}` : `resets ${when(w.resetsAt, true)}`;
    return `<div class="lp-w ${cls(l)}" aria-label="${E(aria)}"><span class="k">${label}</span><span class="bar">${l === null ? '' : `<i style="width:${l}%"></i>`}</span><b>${l === null ? '—' : `${Math.round(l)}%`}</b><small>${E(word)}</small></div>`;
  };

  function popHTML() {
    const pools = claudePools();
    const accounts = (ACC && ACC.accounts) || [];
    const byId = Object.fromEntries(accounts.map((a) => [a.id, a]));
    const at = Math.max(0, ...pools.map((p) => p.at || 0));
    let html = `<div class="lp-h">Claude limits${at ? `<small>as of ${E(hhmm(at))}</small>` : ''}</div>`;
    const multi = pools.some((p) => p.accounts);
    const blocks = [];
    if (!multi) {
      const a = accounts[0] || { label: 'Claude', initial: 'C', hue: HUES[0] };
      blocks.push({ accs: [a], pool: pools[0] });
    } else {
      for (const p of pools) blocks.push({ accs: (p.accounts || []).map((x) => ({ ...byId[x.id], ...x })), pool: p });
    }
    for (const { accs, pool } of blocks) {
      accs.forEach((a, i) => {
        const sub = [a.email, a.plan && `${a.plan} plan`, a.orgName].filter(Boolean).join(' · ');
        html += `<div class="lp-acct"><div class="lp-top"><i class="ac" style="--ah:${E(a.hue)}">${E(a.initial)}</i><b>${E(a.label)}</b>${multi && a.isDefault ? '<em class="st-tag">default</em>' : ''}</div>${sub ? `<div class="lp-sub">${E(sub)}</div>` : ''}`;
        if (i === accs.length - 1) {
          const five = pool && windowRow('5 hours', pool.fiveHour, '5-hour limit'), week = pool && windowRow('week', pool.week, 'weekly limit');
          html += five || week ? five + week : '<div class="lp-sub">no limits seen yet · they show after its first reply</div>';
          if (accs.length > 1) html += '<div class="lp-sub">shares one limit (same organization)</div>';
        }
        html += '</div>';
      });
    }
    const plus = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>';
    const gear = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="2.2"/><circle cx="8" cy="8" r="4.8"/></svg>';
    if (H) html += '<div class="lp-foot">' +
      (multi
        ? `<button type="button" class="lp-act" data-act="add">${plus}<span>Add Claude Account…</span></button>`
        : `<button type="button" class="lp-act" data-act="add">${plus}<span>Add another Claude account…<small>a second subscription, like work and personal</small></span></button>`) +
      `<button type="button" class="lp-act" data-act="manage">${gear}<span>Manage Claude Accounts…</span></button></div>`;
    return html;
  }

  function fill() {
    if (!popEl) return;
    // The page redraws the top bar on every state: the popover only when what it says changed, and a focused action keeps
    // the focus.
    const html = popHTML();
    if (html === popEl.__html) return;
    popEl.__html = html;
    const had = popEl.contains(document.activeElement) ? document.activeElement.dataset.act : null;
    popEl.innerHTML = html;
    if (had) popEl.querySelector(`.lp-act[data-act="${had}"]`)?.focus();
    popEl.querySelectorAll('.lp-act').forEach((b) => {
      b.onclick = () => {
        const add = b.dataset.act === 'add';
        close();
        openSettings(add);
      };
    });
  }

  function close(focus) {
    if (!popEl) return;
    popEl.remove();
    popEl = null;
    ringEl && ringEl.remove();
    ringEl = null;
    document.removeEventListener('pointerdown', outside, true);
    document.removeEventListener('keydown', key, true);
    document.querySelectorAll('#limits button.lim-claude').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    if (focus) document.querySelector('#limits button.lim-claude')?.focus();
  }
  const outside = (e) => {
    if (popEl && !popEl.contains(e.target) && !e.target.closest('.lim-claude')) close();
  };
  const key = (e) => {
    if (e.key === 'Escape' && popEl) {
      e.stopPropagation();
      close(true);
    }
  };

  async function pop(kb) {
    if (popEl) return close(kb);
    const first = document.querySelector('#limits .lim-claude');
    if (!first) return;
    popEl = document.createElement('div');
    popEl.className = 'lim-pop';
    popEl.setAttribute('role', 'dialog');
    popEl.setAttribute('aria-label', 'Claude limits');
    document.body.appendChild(popEl);
    fill();
    const place = () => {
      const box = document.getElementById('limits').getBoundingClientRect();
      const r = first.getBoundingClientRect();
      popEl.style.top = `${Math.round(box.bottom + 8)}px`;
      popEl.style.left = `${Math.max(8, Math.min(innerWidth - popEl.offsetWidth - 8, Math.round(r.left)))}px`;
    };
    place();
    ring();
    document.querySelectorAll('#limits button.lim-claude').forEach((b) => b.setAttribute('aria-expanded', 'true'));
    document.addEventListener('pointerdown', outside, true);
    document.addEventListener('keydown', key, true);
    if (kb) popEl.querySelector('.lp-act')?.focus();
    await load();
    if (popEl) {
      fill();
      place();
    }
  }

  function openSettings(add) {
    pendingAdd = !!add;
    const c = window.Cloud;
    if (c && c.openSettings) c.openSettings('claude');
    else if (window.__radar && window.__radar.openSettings) window.__radar.openSettings();
    // Settings was already open on this category: nothing re-mounts it, so the form is opened here.
    if (add) setTimeout(() => document.querySelector('.st-accts') && mountSettings(document.querySelector('.mn-settings')), 250);
  }

  // ---------- Settings > Claude ----------
  const mount = () => document.querySelector('.mn-settings .ca-mount, .mn-settings .st-accts');
  const lim = (p) => {
    const f = p && p.fiveHour ? left(p.fiveHour) : null, w = p && p.week ? left(p.week) : null;
    const part = (k, v) => (v === null ? `${k} <i>—</i>` : `${k} <i class="${v < 20 ? 'hot' : ''}">${Math.round(v)}%</i>`);
    return `${part('5h', f)} · ${part('week', w)}`;
  };
  const poolOf = (a) => claudePools().find((p) => (p.accounts || []).some((x) => x.id === a.id)) || (claudePools().length === 1 && !claudePools()[0].accounts ? claudePools()[0] : null);

  function groupHTML() {
    const accounts = (ACC && ACC.accounts) || [];
    const signing = new Set((ACC && ACC.signingIn) || []);
    const multi = accounts.length > 1;
    let body = '';
    for (const a of accounts) {
      if (renaming === a.id) {
        body += `<div class="hk-row st-row ac-row"><i class="ac lg" style="--ah:${E(a.hue)}">${E(a.initial)}</i><span class="st-l"><b><input class="ac-rn" value="${E(a.label)}" maxlength="24" aria-label="Name" spellcheck="false"></b></span><button type="button" class="st-btn ac-rn-ok">save</button><button type="button" class="st-btn ac-rn-no">cancel</button></div>`;
        continue;
      }
      if (signing.has(a.id)) {
        body += `<div class="hk-row st-row ac-row"><i class="ac lg" style="--ah:${E(a.hue)}">${E(a.initial)}</i><span class="st-l"><b>${E(a.label)}</b><span class="ac-wait"><i></i>sign in to Claude in your browser · a terminal opened for it</span></span><button type="button" class="st-btn ac-cancel" data-id="${E(a.id)}">cancel</button></div>`;
        continue;
      }
      const sub = [a.email, a.plan, a.orgName].filter(Boolean).join(' · ') || (a.isDefault ? 'Claude Code’s own account' : 'not signed in yet');
      // `note`: something the user should know about this account (Windows: its settings are a copy, no Developer Mode).
      body += `<div class="hk-row st-row ac-row" data-id="${E(a.id)}"><i class="ac lg" style="--ah:${E(a.hue)}">${E(a.initial)}</i><span class="st-l"><b>${E(a.label)}${a.isDefault && multi ? '<em class="st-tag">default</em>' : ''}</b><small>${E(sub)}</small>${a.note ? `<small class="ac-note">${E(a.note)}</small>` : ''}</span>` +
        (a.signedIn ? `<span class="ac-lim">${lim(poolOf(a))}</span>` : `<button type="button" class="st-btn ac-again" data-id="${E(a.id)}">Sign in…</button>`) +
        `<button type="button" class="st-btn ac-more" data-id="${E(a.id)}" aria-label="More for ${E(a.label)}" aria-haspopup="menu">•••</button></div>`;
    }
    if (formOpen) {
      const taken = new Set(accounts.map((a) => a.hue));
      const hues = HUES.filter((h) => !taken.has(h)).concat(HUES.filter((h) => taken.has(h)));
      body += `<div class="ac-new"><h4>Add a Claude account</h4><p>Use a second Claude subscription here, like a work one and a personal one. Each terminal uses one of them, and you switch with a click. Claude’s own sign-in opens in your browser: Orbiterm never sees your password.</p>` +
        `<label>name <input class="ac-name" value="${E(accounts.some((a) => a.label.toLowerCase() === 'work') ? 'Personal' : '')}" maxlength="24" aria-label="Name" spellcheck="false" autocomplete="off"><span class="sw" role="group" aria-label="Colour">${hues.map((h, i) => `<i class="${i ? '' : 'on'}" data-h="${E(h)}" style="--ah:${E(h)}" role="button" tabindex="0" aria-pressed="${i ? 'false' : 'true'}" aria-label="Colour ${HUES.indexOf(h) + 1}"></i>`).join('')}</span></label>` +
        `<div class="btns"><button type="button" class="st-btn primary ac-go">Sign in with Claude…</button><button type="button" class="st-btn ac-no">cancel</button></div>${formError ? `<p class="ac-err" role="alert">${E(formError)}</p>` : ''}</div>`;
    } else {
      body += `<button type="button" class="hk-row st-row ac-add ac-open"><span class="st-l"><b>+ ${multi ? 'add account…' : 'add another account…'}</b><small>a second Claude subscription, like work and personal</small></span></button>`;
      // A row's error (removing an account while one of its chats runs): there is no form for it to show in.
      if (formError) body += `<p class="ac-err" role="alert">${E(formError)}</p>`;
    }
    return `<section class="st-group st-accts"><h3 class="st-h">claude accounts</h3><div class="st-box">${body}</div>` +
      '<p class="st-note">Each terminal uses one account: you pick it from the button next to the project’s name. Orbiterm never switches by itself when a limit runs out.</p></section>';
  }

  function bind(el) {
    const q = (s) => el.querySelector(s);
    const act = async (msg) => {
      try {
        ACC = await call(msg);
        formError = '';
      } catch (e) {
        formError = (e && e.message) || 'That did not work.';
      }
      paint(el);
    };
    el.querySelectorAll('.ac-open').forEach((b) => (b.onclick = () => ((formOpen = true), (formError = ''), paint(el), el.querySelector('.ac-name')?.focus())));
    q('.ac-no') && (q('.ac-no').onclick = () => ((formOpen = false), (formError = ''), paint(el)));
    q('.ac-go') && (q('.ac-go').onclick = async () => {
      const label = q('.ac-name').value.trim();
      const hue = q('.sw i.on')?.dataset.h;
      if (!label) return ((formError = 'Give the account a name.'), paint(el), el.querySelector('.ac-name')?.focus());
      formOpen = false;
      await act({ type: 'add', label, hue });
      poll(el);
    });
    q('.ac-name') && (q('.ac-name').onkeydown = (e) => {
      // A block body: an on* handler that returns false cancels the key, and that would be every letter.
      if (e.key === 'Enter') q('.ac-go').click();
    });
    el.querySelectorAll('.sw i').forEach((i) => {
      const pick = () => {
        el.querySelectorAll('.sw i').forEach((x) => {
          x.classList.toggle('on', x === i);
          x.setAttribute('aria-pressed', String(x === i));
        });
      };
      i.onclick = pick;
      i.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') (e.preventDefault(), pick());
      };
    });
    el.querySelectorAll('.ac-cancel').forEach((b) => (b.onclick = () => act({ type: 'cancelSignIn', id: b.dataset.id })));
    el.querySelectorAll('.ac-again').forEach((b) => (b.onclick = async () => (await act({ type: 'signIn', id: b.dataset.id }), poll(el))));
    el.querySelectorAll('.ac-more').forEach((b) => (b.onclick = (e) => (e.stopPropagation(), moreMenu(el, b, act))));
    if (q('.ac-rn')) {
      q('.ac-rn').focus();
      q('.ac-rn').select();
      q('.ac-rn').onkeydown = (e) => {
        if (e.key === 'Enter') q('.ac-rn-ok').click();
        else if (e.key === 'Escape') q('.ac-rn-no').click();
      };
      q('.ac-rn-ok').onclick = async () => {
        const id = renaming;
        renaming = null;
        await act({ type: 'rename', id, label: q('.ac-rn').value });
      };
      q('.ac-rn-no').onclick = () => ((renaming = null), paint(el));
    }
  }

  /** A row's ••• menu. `act` is bind's: it sends a request and paints the answer, or its error. */
  function moreMenu(el, btn, act) {
    el.querySelector('.ac-menu')?.remove();
    const id = btn.dataset.id;
    const a = ACC.accounts.find((x) => x.id === id);
    if (!a) return;
    const m = document.createElement('div');
    m.className = 'ac-menu';
    m.setAttribute('role', 'menu');
    const items = [['rename', 'Rename…'], ...HUES.map((h, i) => ['hue:' + h, `Colour ${i + 1}${a.hue === h ? ' ✓' : ''}`])];
    if (!a.isDefault) items.push(['remove', 'Sign Out and Remove…']);
    m.innerHTML = items.map(([k, t]) => `<button type="button" role="menuitem" data-k="${E(k)}"${k === 'remove' ? ' class="bad"' : ''}>${k.startsWith('hue:') ? `<i class="ac" style="--ah:${E(k.slice(4))};margin-right:6px">${E(a.initial)}</i>` : ''}${E(t)}</button>`).join('');
    const row = btn.closest('.ac-row');
    row.appendChild(m);
    m.style.right = '0';
    m.style.top = `${btn.offsetTop + btn.offsetHeight + 2}px`;
    const away = (e) => {
      if (!m.contains(e.target)) (m.remove(), document.removeEventListener('pointerdown', away, true));
    };
    setTimeout(() => document.addEventListener('pointerdown', away, true), 0);
    // A menu's keys: up and down move, Esc closes it and gives the focus back to •••.
    m.addEventListener('keydown', (e) => {
      const items = [...m.querySelectorAll('button')];
      const i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        items[(i + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length]?.focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        m.remove();
        document.removeEventListener('pointerdown', away, true);
        btn.focus();
      }
    });
    m.querySelectorAll('button').forEach((b) => {
      b.onclick = async () => {
        const k = b.dataset.k;
        m.remove();
        document.removeEventListener('pointerdown', away, true);
        if (k === 'rename') return ((renaming = id), paint(el));
        if (k.startsWith('hue:')) return act({ type: 'hue', id, hue: k.slice(4) });
        if (k === 'remove') {
          const ok = typeof askBox === 'function' ? await askBox({ title: `Remove ${a.label}?`, text: `It is signed out and its folder is removed from this ${window.__platform === 'win32' ? 'PC' : 'Mac'}. Your chat history stays: it is shared with your other accounts.`, ok: 'Remove' }) : true;
          if (ok) act({ type: 'remove', id });
        }
      };
    });
    m.querySelector('button')?.focus();
  }

  function paint(el) {
    el.outerHTML = groupHTML();
    const fresh = document.querySelector('.mn-settings .st-accts');
    if (fresh) bind(fresh);
  }

  // While a sign-in runs, the page asks the app for its state every few seconds (a local answer; the app asks Claude Code
  // for the email, never a usage endpoint).
  function poll() {
    clearInterval(watch);
    watch = setInterval(async () => {
      const el = document.querySelector('.mn-settings .st-accts');
      if (!el) return clearInterval(watch);
      await load();
      if (!(ACC && ACC.signingIn && ACC.signingIn.length)) clearInterval(watch);
      if (!el.querySelector('.ac-rn, .ac-name')) paint(el);
    }, 3000);
  }

  async function mountSettings(root) {
    const slot = (root || document).querySelector('.ca-mount, .st-accts');
    if (!slot || !H) return;
    await load();
    if (pendingAdd) {
      formOpen = true;
      pendingAdd = false;
    }
    slot.outerHTML = groupHTML();
    const el = document.querySelector('.mn-settings .st-accts');
    if (el) {
      bind(el);
      if (formOpen) el.querySelector('.ac-name')?.focus();
      if (ACC && ACC.signingIn && ACC.signingIn.length) poll(el);
    }
  }

  window.ClaudeAcct = { on: !!H, nameCell, after, mountSettings, openSettings, pop, close, state: () => ACC, reload: load };
  if (H) {
    window.addEventListener('DOMContentLoaded', wire);
    wire();
  }
})();
