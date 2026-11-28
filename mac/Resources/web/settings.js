'use strict';

// Settings (the window cloud.js openMenu opens: the gear, the app menu and the account menu): a few categories on the left, the picked one on the right,
// as macOS System Settings, Discord, Linear, Slack and VS Code lay theirs out. Each category's settings sit in small
// groups, the most used first; a setting rarely changed waits under "advanced" (NN/g, progressive disclosure: two levels
// at most, the way in named for what's behind it). The window opens on the category used last (Apple HIG, Settings).
//
// Only the page's layout and words are here. Every setting keeps the classes cloud.js, account.js, profile.js and
// fonts.js look for, and they keep reading, setting and drawing them as before: cloud.js builds the page with html(),
// then mount() makes the categories work. The sound (app.js's window.__sound, the top bar's button) and the theme (the
// themes view) show here too, so everything set for the app can be found in Settings.
window.Settings = (() => {
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const stored = (k) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  };
  const store = (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch {}
  };
  // The computer as this platform names it (the Windows app sets __platform, preload.js).
  const WIN = window.__platform === 'win32';
  const MACHINE = WIN ? 'PC' : 'Mac';

  // Line icons, drawn like the top bar's gear (16×16, stroked in the text's colour).
  const svg = (d) => `<svg class="st-ico" viewBox="0 0 16 16" aria-hidden="true">${d}</svg>`;
  // Her on/off switch: native keeps it and sets window.__mascotEnabled (then fires 'mascotchange').
  const mascotOn = () => window.__mascotEnabled === true && (window.MascotUI ? window.MascotUI.ready() : true);
  const MISCHIEF_NAMES = ['Calm', 'Playful', 'Naughty', 'Crazy'];
  const mischiefLevel = () => {
    const n = Number(window.__mascotMischief);
    return Number.isInteger(n) && n >= 0 && n <= 3 ? n : 3;
  };
  const PANES = [
    { id: 'account', name: 'Account', icon: svg('<circle cx="8" cy="5.4" r="2.7"/><path d="M2.6 14c.6-2.8 2.8-4.3 5.4-4.3s4.8 1.5 5.4 4.3"/>') },
    { id: 'appearance', name: 'Appearance', icon: svg('<path d="M8 1.8a6.2 6.2 0 1 0 0 12.4c.9 0 1.3-.6 1.3-1.2 0-.9-.8-1.2-.8-2 0-.7.6-1.2 1.3-1.2h1.6c1.7 0 2.8-1.1 2.8-2.7C14.2 4.1 11.4 1.8 8 1.8z"/><circle cx="4.9" cy="7.4" r=".9"/><circle cx="6.9" cy="4.6" r=".9"/><circle cx="10.2" cy="4.8" r=".9"/>') },
    { id: 'chats', name: 'Chats', icon: svg('<path d="M3 3h10a1.5 1.5 0 0 1 1.5 1.5v5.5A1.5 1.5 0 0 1 13 11.5H8.2L5 14v-2.5H3A1.5 1.5 0 0 1 1.5 10V4.5A1.5 1.5 0 0 1 3 3z"/><path d="M4.6 6.2 6.2 7.4 4.6 8.6M7.6 8.6h3"/>') },
    { id: 'claude', name: 'Claude', icon: svg('<circle cx="4.2" cy="8" r="2.1"/><circle cx="11.8" cy="8" r="2.1"/><path d="M6.3 8h3.4"/>') },
    // Right after Chats: both are about working in the terminals (Arc's word: the wheel opens with the mouse too).
    { id: 'shortcuts', name: 'Shortcuts', icon: svg('<rect x="1.5" y="4" width="13" height="8.5" rx="1.5"/><path d="M4.2 6.7h.01M6.4 6.7h.01M8.6 6.7h.01M10.8 6.7h.01M4.8 9.8h6.4"/>') },
    { id: 'privacy', name: 'Privacy', icon: svg('<rect x="3" y="7" width="10" height="7.2" rx="1.4"/><path d="M5.2 7V5a2.8 2.8 0 0 1 5.6 0v2"/><path d="M8 10v1.6"/>') },
    { id: 'general', name: 'General', icon: svg('<circle cx="8" cy="8" r="2.2"/><circle cx="8" cy="8" r="4.6"/><path d="M8 1.4v2M8 12.6v2M1.4 8h2M12.6 8h2M3.3 3.3l1.4 1.4M11.3 11.3l1.4 1.4M3.3 12.7l1.4-1.4M11.3 4.7l1.4-1.4"/>') },
  ];
  // The categories this page has: Shortcuts only where the app keeps the keys (the Mac app's keys handler, html()).
  let panes = PANES;
  const last = () => (panes.some((p) => p.id === stored('settings.pane')) ? stored('settings.pane') : 'account');
  let current = last();
  let page = null;
  let ndgOff = null; // the "let friends nudge me" switch's Social listener (the same)
  let hitOff = null; // the "show who fired at me" switch's Social listener, one at a time (mount() runs at every opening)

  // ---------- the pieces: a group, a row, a switch, the advanced fold ----------
  const group = (title, body, cls = '') => `<section class="st-group${cls ? ` ${cls}` : ''}">${title ? `<h3 class="st-h">${title}</h3>` : ''}<div class="st-box">${body}</div></section>`;
  const row = (label, hint, control, cls = '') =>
    `<div class="hk-row st-row${cls ? ` ${cls}` : ''}"><span class="st-l"><b>${label}</b>${hint == null ? '' : `<small${typeof hint === 'object' ? ` class="${hint.cls}"${hint.attr || ''}` : ''}>${typeof hint === 'object' ? hint.text : hint}</small>`}</span>${control}</div>`;
  const sw = (cls, title, on, attr = '') => `<button type="button" class="hk-sw ${cls}" role="switch" aria-checked="${on}" title="${esc(title)}"${attr}><i></i></button>`;
  const more = (what, body) => `<details class="st-more"><summary><span>advanced</span><small>${what}</small></summary><div class="st-box">${body}</div></details>`;
  const pane = (id, title, lead, body) =>
    `<div class="st-pane" id="st-pane-${id}" data-pane="${id}" role="tabpanel" aria-labelledby="st-tab-${id}" tabindex="0"${id === current ? '' : ' hidden'}><h2 class="st-title">${title}</h2>${lead ? `<p class="st-lead">${lead}</p>` : ''}${body}</div>`;

  // The page cloud.js puts in the Settings window. c: { max, tag, ui, savers, archive, trash, keys }, what only cloud.js knows.
  function html(c) {
    panes = PANES.filter((p) => p.id !== 'shortcuts' || c.keys);
    current = last(); // the gear opens the one used last; openSettings picks its own after (show(pane, false))
    const pw = window.__powerSave, dc = window.__discord;
    const nav =
      '<nav class="st-nav" role="tablist" aria-label="Settings" aria-orientation="vertical">' +
      panes.map((p) =>
        `<button type="button" role="tab" id="st-tab-${p.id}" aria-controls="st-pane-${p.id}" data-pane="${p.id}" aria-label="${p.name}" title="${p.name}" aria-selected="${p.id === current}" tabindex="${p.id === current ? 0 : -1}" class="${p.id === current ? 'on' : ''}">${p.icon}<span>${p.name}</span></button>`).join('') +
      '</nav>';

    const account =
      // Your name, picture and links are changed on your profile page, where they show: a row that opens it with "Edit
      // profile" open (profile.js).
      (window.Profile
        ? group('profile', `<div class="prof-host">${row('name, picture and links', 'what friends and the leaderboard see on your card', '<button type="button" class="st-btn prof-edit">edit profile…</button>')}</div>`, 'st-pf')
        : '') +
      (window.Account ? group('account', '<div class="acct-host"></div>', 'st-acct') : '') +
      (window.Account ? '<div class="danger-host"></div>' : '');

    const appearance =
      group('colours', row('theme', 'the colours of the whole app', '<span class="st-val"><b class="st-theme-name">…</b><button type="button" class="st-btn st-theme">change…</button></span>')) +
      // Viktoria has her own switch (any theme; the app keeps it, Mascot.swift). Mischief (mascot.js MISCHIEF table; the app
      // keeps the level) and the credits show only while she is on.
      group('mascot',
        row('Viktoria', 'An anime companion who walks around your screen',
          (window.MascotUI?.slot() ?? '') + sw('st-mascot mas-when-ready' + (mascotOn() ? ' on' : ''), 'Show Viktoria', mascotOn(), window.MascotUI?.ready() === false ? ' hidden' : '')) +
        `<div class="st-mascot-more"${mascotOn() ? '' : ' hidden'}>` +
        row('Mischief', 'How often Viktoria clicks around and wanders',
          `<span class="lb-seg ui-seg st-mischief">${MISCHIEF_NAMES.map((n, i) => `<button type="button" data-level="${i}" class="${i === mischiefLevel() ? 'on' : ''}">${n}</button>`).join('')}</span>`) +
        '</div>' +
        // The downloaded files can go again (a quiet button, only while she is downloaded: cloud.js MascotUI).
        `<div class="mas-rm-wrap" hidden><button type="button" class="mas-remove">Remove download (<span class="mas-mb">34</span> MB)</button></div>`) +
      // Credits the licences ask for (VRoid: that exact phrase; WalkLoop: its readme's credit format), and the model's.
      `<p class="st-note st-mascot-more"${mascotOn() ? '' : ' hidden'}>Model: Mei Sakuraniwa © ProjectCorelinjp<br>Character animation credits to pixiv Inc.'s VRoid Project<br>モーション：WalkLoop_v1_MotionDa／AirisuAsbel（だらてん） https://daraten.booth.pm/<br>Motions: Sachi (sachi2222, CC0), rerofumi (CC0), Maron Yatsuhashi, miracorabo</p>` +
      (c.ui
        ? group('dashboard text',
            row('size', 'the dashboard and messages, for text too small to read', '<span class="lb-seg ui-seg ui-scale"></span>') +
            row('font', 'the dashboard and messages', '<span class="lb-seg ui-seg ui-font"></span>'))
        : '') +
      (c.ui && window.Fonts
        ? group('terminal text',
            row('font', { cls: 'tf-note', text: 'the text in every terminal' }, '<select class="tf-font" title="The terminals\' font" disabled></select>') +
            row('size', { cls: 'tf-keys', text: '' }, '<span class="tf-size"></span>') +
            '<div class="tf-demo" aria-hidden="true"><b>❯</b> claude <i>"make the login page faster"</i><em>0O 1lI {}</em></div>')
        : '') +
      (c.ui
        ? more('AI tool colours',
            row("AI tools use the theme's colours", "Claude Code, Codex and Antigravity text follows the theme · from their next chat", sw('ui-ai', "AI tools in the theme's colours", true)))
        : '');

    const chats =
      (window.__sound
        ? group('sound', row('play a sound when a chat needs you', "a short ping · the top bar's sound button does the same", sw('st-sound', 'Play a sound when a chat needs you', !!window.__sound.on())))
        : '') +
      // Only where the app answers the switch (the Mac app sets window.__worktreeNudge): Windows has no worktrees yet.
      (typeof window.__worktreeNudge === 'boolean'
        ? group('worktrees', row('suggest a worktree for a second AI',
            'when an AI starts in a folder where another one is working · a note in its window until you send it something',
            sw('st-wtnudge' + (window.__worktreeNudge !== false ? ' on' : ''), 'Suggest a worktree for a second AI', window.__worktreeNudge !== false)))
        : '') +
      // Only where the app answers the switch (the Mac app sets window.__chatWindowsFree, ChatWindows.swift).
      (typeof window.__chatWindowsFree === 'boolean'
        ? group('windows', row('chat windows on their own',
            'off: they stay above the dashboard and hide with it · on: ordinary windows, the dashboard can come in front of them, and Split View places them like any other',
            sw('st-cwfree' + (window.__chatWindowsFree ? ' on' : ''), 'Chat windows on their own', window.__chatWindowsFree === true)))
        : '') +
      (c.savers
        ? group('save tokens',
            row('shorter command output <em class="st-tag">rtk</em>', { cls: 'ts-note', attr: ' data-which="rtk"', text: '…' }, sw('ts', 'Turn rtk on or off', false, ' data-which="rtk"'), 'ts-row') +
            row('shorter answers <em class="st-tag">caveman</em>', { cls: 'ts-note', attr: ' data-which="caveman"', text: '…' }, sw('ts', 'Turn caveman on or off', false, ' data-which="caveman"'), 'ts-row'))
        : '') +
      (c.archive || c.trash
        ? group('archived and deleted',
            (c.archive ? row('archived chats', 'out of the chats list until you bring them back', '<button type="button" class="st-btn arc-open">show…</button>') : '') +
            (c.trash ? row('deleted chats', 'kept 30 days, then gone for good · put one back from here', '<button type="button" class="st-btn trash-open">show…</button>') : ''))
        : '');

    // The keys of the app's actions, to change: a search on top for the 40-odd rows (VS Code's and Warp's keyboard
    // settings have one), then the list cloud.js draws (renderKeys) in .mn-keys. Looking them up is Help › Keyboard Shortcuts' list
    // (cheatsheet.js), apart from Settings.
    const shortcuts =
      '<label class="st-find"><svg class="st-ico" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.5"/><path d="m10.3 10.3 3.6 3.6"/></svg>' +
      '<input type="search" class="ks-find" placeholder="search shortcuts" aria-label="Search shortcuts" spellcheck="false" autocomplete="off" autocapitalize="off"></label>' +
      '<div class="mn-keys"></div>';

    // Claude Desktop and Claude Code on this computer reaching the chats (Mcp.swift, the Windows app's mcp.js, the "mcp" handler):
    // off until turned on, and the app asks in its own window when it is, so this page can only ask. The sign that it's on is
    // in the Mac's menu bar, in Windows' system tray.
    const MCP_MODES = [['off', 'Off'], ['watch', 'Watch only'], ['write', 'Watch and type']];
    const claude =
      // The accounts group (claude-accounts.js fills it, in the Mac app: the accounts bridge).
      (window.ClaudeAcct && window.webkit?.messageHandlers?.claudeAccounts ? '<div class="ca-mount"></div>' : '') +
      group('claude can use orbiterm',
        row('let Claude use my chats', { cls: 'mcp-note', text: '…' },
          `<span class="lb-seg ui-seg st-mcp-mode">${MCP_MODES.map(([m, n]) => `<button type="button" data-mode="${m}">${n}</button>`).join('')}</span>`)) +
      `<div class="st-mcp-more" hidden>` +
      group('connect',
        row('Claude Desktop', { cls: 'mcp-desktop-note', text: '…' }, '<button type="button" class="st-btn mcp-desktop"></button>') +
        row('Claude Code', { cls: 'mcp-code-note', text: '…' }, '<button type="button" class="st-btn mcp-code"></button>') +
        row('as a Claude extension', "if Claude Desktop, or Dispatch on your phone, doesn't show Orbiterm · Claude asks you to confirm", '<button type="button" class="st-btn mcp-ext">install…</button>')) +
      '</div>' +
      '<p class="st-note mcp-error" hidden></p>' +
      // Only where the notes' AI switch is (Settings > Privacy, the "notesai" handler).
      (c.notesai ? '<p class="st-note">Notes follow your Notes setting, not this one. Set it in <button type="button" class="st-ln st-nai-open">Notes \u203a AI</button>.</p>' : '') +
      `<p class="st-note">Watch and type lets Claude type into your terminals. Notes follow your Notes setting.</p>` +
      `<p class="st-note">Claude only sees Claude Code, Codex, Antigravity and Cursor chats, never a plain terminal. Passwords, keys and tokens are masked before anything leaves Orbiterm. It can't answer approvals, and can't type into a chat started with permissions bypassed. While it's on, ${WIN ? 'an icon shows in the system tray' : 'a sign shows in the menu bar'} with a way to turn it off.</p>`;

    const privacy =
      group('your profile',
        row('show my profile to everyone', { cls: 'wp-pub-hint', text: 'anyone can open your page on orbiterm.dev and find you by name \u00b7 off: only friends see it' }, sw('pub', 'Show my profile to everyone', true)) +
        row('your page', { cls: 'st-url wp-url', text: '\u2026' }, '<span class="st-two"><button type="button" class="st-btn wp-copy">copy link</button><a class="st-btn wp-open" href="https://orbiterm.dev" target="_blank" rel="noopener noreferrer">open \u2197</a></span>') +
        row('show my hours', 'how long you work, your calendar and your flame \u00b7 friends see them too', sw('act', 'Show my hours', true), 'st-sub') +
        row('show when I work', 'the hours of the day and the days of the week you work', sw('whn', 'Show when I work', true), 'st-sub') +
        row('show which AI tools and models I use', 'your time with each AI, your models and tokens \u00b7 on the Tokens board too', sw('tkd', 'Show which AI tools and models I use', true), 'st-sub') +
        row('show all my badges', 'off: only the badge beside your name', sw('bdg', 'Show all my badges', true), 'st-sub')) +
      '<p class="st-note wp-note"></p>' +
      group('friends and leaderboard',
        row('show my name on the leaderboard', 'off: you show as Anonymous, and nobody can add you from there', sw('brd', 'Show my name on the leaderboard', true)) +
        // Kept by the app on this computer, not by the API (Cloud.swift, the Windows app's cloud.js): off, no token counts
        // leave it at all. The two under it are about how the counts it sent show on the board.
        row('share my token counts for the Tokens board', `how many tokens each AI, model and effort used a day, never what was in them · off: none leave this ${MACHINE}, not even later · what was sent stays`, sw('tks', 'Share my token counts for the Tokens board', true)) +
        row('show my name on the Tokens board', 'off: Anonymous on the Tokens board only · your total still counts', sw('tkn', 'Show my name on the Tokens board', true)) +
        // A friend's spaceship attack (attack.js): the switch's clicks and its state are attack.js's; its words too.
        (window.Attack?.on
          ? row(window.Attack.text.setting.title, window.Attack.text.setting.hint, sw(`atk-on${window.Attack.on() ? ' on' : ''}`, window.Attack.text.setting.aria, window.Attack.on()))
          : '') +
        // A friend's nudge (messages.js, nudge.ts): `social.nudges`, kept with the account like the others; mutual, so off stops you sending too.
        row('let friends nudge me', "a friend's nudge shakes your chat with them for half a second and buzzes once \u00b7 off: nobody can nudge you, and you can't nudge them either", sw('ndg-on on', 'Let friends nudge me', true))) +
      '<p class="st-note">Do not disturb stops nudges too: friends see the button greyed out until it\u2019s off.</p>' +
      (c.notesai
        ? group('notes and AI',
            row('what AI can do with my notes', { cls: 'na-note', text: '…' },
              '<span class="lb-seg ui-seg st-notesai"><button type="button" data-mode="off">Off</button><button type="button" data-mode="read">Read</button><button type="button" data-mode="write">Read and edit</button></span>')) +
          '<p class="st-note">Shared notes are stored on Orbiterm\u2019s server, encrypted.</p>' +
          '<p class="st-note">Hide a note from AI or connect Claude Desktop from <button type="button" class="st-ln st-nai-open">Notes \u203a AI</button></p>'
        : '') +
      (dc
        ? group('discord',
            row("show what I'm doing on Discord", { cls: 'dc-note', text: '…' }, sw('dc-on', "Show what I'm doing on Discord", false)) +
            row("show the project's name", "the folder you're working in, like my-app · off: only how many chats are open", sw('dc-proj', "Show the project's name on Discord", false), 'st-sub') +
            row('show my active time today', 'like 4h 12m today', sw('dc-act', 'Show my active time on Discord', true), 'st-sub'))
        : '') +
      // What Orbiterm stores and the rules, in writing (orbiterm.dev; the Privacy Notice and the Terms), and where to ask.
      '<p class="st-note"><a class="st-ln" href="https://orbiterm.dev/privacy/" target="_blank" rel="noopener noreferrer">Privacy Notice</a> \u00b7 ' +
      '<a class="st-ln" href="https://orbiterm.dev/terms/" target="_blank" rel="noopener noreferrer">Terms of Use</a> \u00b7 ' +
      'Data requests: <a class="st-ln" href="mailto:privacy@orbiterm.dev">privacy@orbiterm.dev</a></p>';

    const general =
      // The fun layer's announcements (community.js): one switch for what you hear of others, where people look to turn
      // notices off (Atalay, 2026-11-15; it used to sit in Privacy as "community feed").
      (window.Community
        ? group('notifications',
            row('announcements', "a friend on fire, a friend's rare badge, a new #1 this week, the weekly goal · short lines at the top left of the screen and in the bell", sw('cf-feed', 'Show announcements', true)) +
            // Who fired at me (messages.js, attack.js): the card in the corner that waits until it's seen.
            row('show who fired at me', "when a friend's spaceship hits you, a card in the corner says who, until you close it \u00b7 off: only the alarm and the line in your chat with them", sw('cf-hit', 'Show who fired at me', true)) +
            '<p class="st-note">Attacks themselves are in <button type="button" class="st-ln st-atk-priv">Privacy \u203a let friends fire spaceships at me</button>.</p>')
        : '') +
      group('updates', '<div class="hk-info"></div>') +
      (pw
        ? group('battery', row('power save at low battery', `below ${esc(pw.threshold)}% battery or in ${esc(pw.saver || 'Low Power Mode')}, the map moves less to save battery · the switch on the map turns it off`, sw('pwr-auto', 'Power save on by itself at low battery', true)))
        : '') +
      // Clean Up (cleanup.js, Cleanup.swift): what the line on the map does when the Mac runs low on memory, and when a chat counts as idle.
      // Only where the app answers (it sends its settings first). The Windows app lists no worktrees (yet).
      (!window.__cleanupPrefs ? '' : group('memory',
        row('suggest a clean up', `when your ${MACHINE} runs low on memory, a line on the map offers to close what you aren't using · nothing closes by itself`, sw('cu-sug', 'Suggest a clean up', true)) +
        row('when the disk holds more than', `memory your ${MACHINE} had to move onto the disk`, '<span class="lb-seg ui-seg cu-swap">' + [2, 4, 8].map((g) => `<button type="button" data-v="${g}">${g} GB</button>`).join('') + '</span>', 'st-sub cu-swaprow') +
        row('tick idle chats after', 'in Clean Up, chats left alone this long are ticked for you', '<span class="lb-seg ui-seg cu-idle">' + [[1, '1 hour'], [12, '12 hours'], [24, '1 day'], [72, '3 days']].map(([h, n]) => `<button type="button" data-v="${h}">${n}</button>`).join('') + '</span>') +
        row('clean up now', WIN ? 'end idle chats, stop leftover programs' : 'end idle chats, stop leftover programs, remove finished worktrees', '<button type="button" class="st-btn cu-now">Open Clean Up…</button>')));


    return (
      nav +
      '<div class="st-main">' +
      pane('account', 'Account', '', account) +
      pane('appearance', 'Appearance', '', appearance) +
      pane('chats', 'Chats', '', chats) +
      pane('claude', 'Claude', window.ClaudeAcct && window.webkit?.messageHandlers?.claudeAccounts ? 'your Claude accounts, and what Claude can do with your chats' : `let Claude on this ${MACHINE} see your AI chats, and type into them`, claude) +
      (c.keys ? pane('shortcuts', 'Shortcuts', 'click a shortcut, then press the new keys · esc cancels, delete takes them off', shortcuts) : '') +
      pane('privacy', 'Privacy', 'who can see your profile, and what friends, the leaderboard and Discord see', privacy) +
      pane('general', 'General', '', general) +
      '</div>'
    );
  }

  // ---------- the categories ----------
  // keep: remembered for the next time Settings opens (the gear, the app menu). Opened for a purpose (the account menu's
  // "Settings…" and "Sign in with e-mail…", a badge's sign in, the shortcut list's "Change shortcuts…") it shows its
  // category without forgetting the last one.
  function show(id, keep = true) {
    if (!page || !page.isConnected || !panes.some((p) => p.id === id)) return;
    current = id;
    if (keep) store('settings.pane', id);
    page.querySelectorAll('.st-nav button').forEach((b) => {
      const on = b.dataset.pane === id;
      b.classList.toggle('on', on);
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    page.querySelectorAll('.st-pane').forEach((p) => (p.hidden = p.dataset.pane !== id));
    const main = page.querySelector('.st-main');
    if (main) main.scrollTop = 0;
  }

  // Her switch, and the blocks that only make sense while she is on (Mischief, credits).
  function paintMascot() {
    if (!page) return;
    const on = mascotOn();
    const b = page.querySelector('.st-mascot');
    if (b) {
      b.classList.toggle('on', on);
      b.setAttribute('aria-checked', String(on));
    }
    page.querySelectorAll('.st-mascot-more').forEach((el) => (el.hidden = !on));
    page.querySelectorAll('.st-mischief button').forEach((x) => x.classList.toggle('on', Number(x.dataset.level) === mischiefLevel()));
    window.MascotUI?.paint();
  }
  window.addEventListener('mascotchange', paintMascot);
  window.addEventListener('mascotasset', paintMascot);

  // Claude access: what the app says (window.__mcp), and the buttons that ask it to change.
  const mcpHandler = () => window.webkit?.messageHandlers?.mcp;
  function paintMcp() {
    if (!page) return;
    const s = window.__mcp;
    const mode = s ? s.mode : 'off';
    page.querySelectorAll('.st-mcp-mode button').forEach((b) => {
      b.classList.toggle('on', b.dataset.mode === mode);
      b.disabled = !s;
    });
    const note = page.querySelector('.mcp-note');
    if (note) note.textContent = { off: "Claude can't see Orbiterm · off until you turn it on", watch: 'Claude can see your chats and read their answers · it can\'t type', write: "Claude can also send a prompt to a chat that's waiting for one · it can't answer approvals" }[mode];
    const more = page.querySelector('.st-mcp-more');
    if (more) more.hidden = mode === 'off';
    if (!s) return;
    const d = page.querySelector('.mcp-desktop'), c = page.querySelector('.mcp-code');
    d.textContent = s.desktop ? 'remove' : 'connect';
    d.disabled = !s.desktopFound && !s.desktop;
    d.dataset.on = s.desktop ? '1' : '';
    c.textContent = s.code ? 'connected' : 'connect';
    c.disabled = !!s.code;
    // Windows' Claude Desktop goes on in the tray when its window closes: it reads its settings again only once quit from there.
    page.querySelector('.mcp-desktop-note').textContent = !s.desktopFound && !s.desktop ? `Claude Desktop isn't on this ${MACHINE}`
      : s.desktop ? (WIN ? 'connected · quit Claude Desktop from its tray icon and reopen it once if it was open' : 'connected · quit and reopen Claude Desktop once if it was open')
      : WIN ? 'adds Orbiterm to Claude Desktop · then quit it from its tray icon and reopen it' : 'adds Orbiterm to Claude Desktop · then quit and reopen it';
    page.querySelector('.mcp-code-note').textContent = s.code ? 'connected · new Claude Code chats can use it' : 'adds Orbiterm to Claude Code in your terminal';
  }
  async function mcpAsk(msg) {
    const err = page && page.querySelector('.mcp-error');
    if (err) err.hidden = true;
    const r = await mcpHandler()?.postMessage(msg).catch(() => null);
    if (!r) return;
    const state = r.state || r;
    if (state.mode) window.__mcp = state;
    if (r.error && err) {
      err.textContent = r.error;
      err.hidden = false;
    }
    paintMcp();
    return r;
  }
  window.addEventListener('mcpchange', paintMcp);

  function paintSound() {
    const b = page && page.querySelector('.st-sound');
    if (!b || !window.__sound) return;
    const on = !!window.__sound.on();
    b.classList.toggle('on', on);
    b.setAttribute('aria-checked', String(on));
  }

  async function paintTheme() {
    const name = page && page.querySelector('.st-theme-name');
    const h = window.webkit && window.webkit.messageHandlers;
    if (!name || !h || !h.theme) return name && (name.closest('.st-group').hidden = true);
    const list = await h.theme.postMessage({ type: 'list' }).catch(() => null);
    const t = list && list.themes && list.themes.find((x) => x.id === list.chosen);
    name.textContent = t ? t.name : '—';
  }

  // cloud.js calls it once the page is in the menu, before the other parts fill it.
  function mount(el) {
    page = el;
    if (!page) return;
    const nav = page.querySelector('.st-nav');
    nav.onclick = (e) => {
      const b = e.target.closest('button[data-pane]');
      if (b) show(b.dataset.pane);
    };
    // ↑ ↓ move between the categories, as in a list; Home and End to the first and the last.
    nav.onkeydown = (e) => {
      const i = panes.findIndex((p) => p.id === current);
      const to = { ArrowDown: i + 1, ArrowUp: i - 1 + panes.length, Home: 0, End: panes.length - 1 }[e.key];
      if (to == null) return;
      e.preventDefault();
      const next = panes[to % panes.length].id;
      show(next);
      nav.querySelector(`button[data-pane="${next}"]`)?.focus();
    };
    const wtn = page.querySelector('.st-wtnudge');
    if (wtn) wtn.onclick = () => {
      const on = wtn.getAttribute('aria-checked') !== 'true';
      window.__worktreeNudge = on;
      wtn.classList.toggle('on', on);
      wtn.setAttribute('aria-checked', String(on));
      window.webkit?.messageHandlers?.radar?.postMessage({ type: 'worktreeNudge', on });
    };
    const cwf = page.querySelector('.st-cwfree');
    if (cwf) cwf.onclick = () => {
      const on = cwf.getAttribute('aria-checked') !== 'true';
      window.__chatWindowsFree = on;
      cwf.classList.toggle('on', on);
      cwf.setAttribute('aria-checked', String(on));
      window.webkit?.messageHandlers?.radar?.postMessage({ type: 'chatWindowsFree', on });
    };
    const snd = page.querySelector('.st-sound');
    if (snd) snd.onclick = () => {
      window.__sound.set(!window.__sound.on());
      paintSound();
    };
    const th = page.querySelector('.st-theme');
    if (th) th.onclick = () => {
      window.Cloud?.close();
      window.GitView?.view('themes');
    };
    const mas = page.querySelector('.st-mascot');
    if (mas) mas.onclick = () => {
      const on = !mascotOn();
      window.__mascotEnabled = on;
      window.dispatchEvent(new Event('mascotchange')); // repaints this page and the Themes view's copy
      window.webkit?.messageHandlers?.radar?.postMessage({ type: 'mascotEnabled', on });
    };
    const mis = page.querySelector('.st-mischief');
    if (mis) mis.onclick = (e) => {
      const b = e.target.closest('button[data-level]');
      if (!b) return;
      const level = Number(b.dataset.level);
      window.__mascotMischief = level;
      window.dispatchEvent(new Event('mascotchange'));
      window.webkit?.messageHandlers?.radar?.postMessage({ type: 'mascotMischief', level });
    };
    // Who fired at me: its switch, kept with the account (`social.hitCard`) and synced like the others.
    const hit = page.querySelector('.hk-sw.cf-hit');
    const paintHit = () => {
      if (!hit || !hit.isConnected) return;
      const v = Social.prefs().hitCard !== false;
      hit.classList.toggle('on', v);
      hit.setAttribute('aria-checked', String(v));
      hit.disabled = !Social.state();
    };
    if (hit) {
      hit.onclick = async () => {
        const v = Social.prefs().hitCard === false;
        hit.disabled = true;
        const r = await Social.setPref('hitCard', v);
        hit.disabled = false;
        if (r.error) return typeof window.toast === 'function' && window.toast(r.error === 'offline' ? "can't reach the server" : "couldn't change it");
        paintHit();
        if (typeof window.toast === 'function') window.toast(v ? 'the card for who fired at you is on' : 'the card for who fired at you is off');
      };
      if (hitOff) hitOff();
      hitOff = Social.on((ev) => ['prefs', 'settings', 'snapshot'].includes(ev.type) && paintHit());
      paintHit();
    }
    // Let friends nudge me: its switch, kept with the account (`social.nudges`) and synced like the others.
    const ndg = page.querySelector('.hk-sw.ndg-on');
    const paintNdg = () => {
      if (!ndg || !ndg.isConnected) return;
      const v = Social.nudgeOn();
      ndg.classList.toggle('on', v);
      ndg.setAttribute('aria-checked', String(v));
      ndg.disabled = !Social.state();
    };
    if (ndg) {
      ndg.onclick = async () => {
        const v = !Social.nudgeOn();
        ndg.disabled = true;
        const r = await Social.setNudges(v);
        ndg.disabled = false;
        if (r.error) return typeof window.toast === 'function' && window.toast(r.error === 'offline' ? "can't reach the server" : "couldn't change it");
        paintNdg();
        if (typeof window.toast === 'function') window.toast(v ? 'friends can nudge you' : 'nudges are off · nobody can nudge you, and you can\u2019t nudge them');
      };
      if (ndgOff) ndgOff();
      ndgOff = Social.on((ev) => ['prefs', 'settings', 'snapshot'].includes(ev.type) && paintNdg());
      paintNdg();
    }
    const toPriv = page.querySelector('.st-atk-priv');
    if (toPriv) toPriv.onclick = () => show('privacy');
    const mcpMode = page.querySelector('.st-mcp-mode');
    if (mcpMode) mcpMode.onclick = (e) => {
      const b = e.target.closest('button[data-mode]');
      if (b && !b.classList.contains('on')) mcpAsk({ type: 'mode', mode: b.dataset.mode });
    };
    const mcpD = page.querySelector('.mcp-desktop');
    if (mcpD) mcpD.onclick = () => mcpAsk(mcpD.dataset.on ? { type: 'disconnect' } : { type: 'connect', target: 'desktop' });
    const mcpC = page.querySelector('.mcp-code');
    if (mcpC) mcpC.onclick = () => mcpAsk({ type: 'connect', target: 'code' });
    const mcpE = page.querySelector('.mcp-ext');
    if (mcpE) mcpE.onclick = () => mcpAsk({ type: 'connect', target: 'extension' });
    mcpAsk({ type: 'state' });
    show(current);
    paintSound();
    paintTheme();
    paintMascot();
    window.WebPriv?.mountSettings(page);
  }

  // What takes the keys when Settings shows (cloud.js showTab): in Account the e-mail sign-in's field if it's open,
  // the hacker name otherwise; in Shortcuts its search, to type what you look for; elsewhere the picked category, never
  // a field out of sight.
  function focusTarget() {
    if (!page || !page.isConnected) return null;
    if (current === 'account') return page.querySelector('.acct-email, .acct-code') || page.querySelector('.st-nav button.on');
    if (current === 'shortcuts') return page.querySelector('.ks-find');
    return page.querySelector('.st-nav button.on');
  }

  return { html, mount, show, focusTarget, mcpAsk, current: () => current };
})();
