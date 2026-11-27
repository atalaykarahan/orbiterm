'use strict';

// Deck view (Settings › Appearance › dashboard layout; off unless turned on, kept in this page's storage): the same
// dashboard as a longer page to scroll. The top bar, the sessions, the map, the right column, the bottom row and the
// ticker stay what they are (deck.css only gives them other rows); four panels of its own come in between, drawn from
// what the page already gets:
//   agents.deck   a card per live session: its AI and model, status, the tool at work, calls a minute, context, cost
//   burn.tape     today's spend (api-eq) and tokens: the last 30 minutes a minute at a time, how they split, by model
//   tool.flow     each kind of tool call: the last 15 minutes, today's count, how many run now
//   tool.trace    the last two minutes of tool calls, a bar each from its start to its result, a row per session
// What it costs: nothing while it's off (render and event return at once). On, a panel is drawn only while it can be
// seen, on the app's state pushes (once a second at most), never on a timer of its own; and the map stops drawing while
// it's scrolled out of sight (its box stays, #space goes: orbit.js's ResizeObserver then holds its frames, ACT.shown).
window.Deck = (() => {
  const KEY = 'radar.deck';
  const WIN = 120_000; // tool.trace's window
  const MAX = 300; // tool calls kept for it
  const STALE = 15 * 60_000; // a call with no result after this is left out (the log's markResult: 15 minutes)
  const R = window.RADAR || {};
  const app = document.getElementById('app');
  let on = false;
  try {
    on = localStorage.getItem(KEY) === '1';
  } catch {}

  // ---------- the tool calls, from the events (pure, so they can be tested alone: _test) ----------
  // A call's span runs from its `tool` event to its `result` (d: how long, ok). Past `max` the oldest goes first.
  function track(T, ev, now = Date.now()) {
    if (!ev || !ev.id) return;
    if (ev.k === 'tool') {
      const sp = { id: ev.id, s: ev.s, a: !!ev.a, c: ev.c, n: ev.n || '', t: ev.t || now, d: null, ok: null };
      T.list.push(sp);
      T.open.set(ev.id, sp);
      while (T.list.length > T.max) T.open.delete(T.list.shift().id);
    } else if (ev.k === 'result') {
      const sp = T.open.get(ev.id);
      if (!sp) return;
      T.open.delete(ev.id);
      sp.ok = !!ev.ok;
      sp.d = ev.d != null ? Math.max(0, ev.d) : Math.max(0, now - sp.t);
    }
  }
  // tool.trace's rows: a session each with a call in the window (or one still running), the latest first. A bar's place
  // is in fractions of the window (x, w); a running one reaches now. keep: the sessions the state still has, or null; a
  // call of one that's gone (party mode turned off, a session killed mid-call) never gets its result, so it's left out.
  function lanes(T, now, win = WIN, rows = 8, keep = null) {
    const from = now - win;
    const by = new Map();
    for (const sp of T.list) {
      if (keep && !keep.has(sp.s)) continue;
      const run = sp.d == null;
      const end = run ? now : sp.t + sp.d;
      if (end < from || (run && now - sp.t > STALE)) continue;
      let L = by.get(sp.s);
      if (!L) by.set(sp.s, (L = { s: sp.s, last: 0, n: 0, err: 0, bars: [] }));
      const x0 = Math.max(sp.t, from);
      L.bars.push({ x: (x0 - from) / win, w: Math.max(0, Math.min(end, now) - x0) / win, c: sp.c, n: sp.n, a: sp.a, run, bad: sp.ok === false });
      L.n++;
      if (sp.ok === false) L.err++;
      L.last = Math.max(L.last, sp.t);
    }
    return [...by.values()].sort((a, b) => b.last - a.last).slice(0, rows);
  }
  const T = { list: [], open: new Map(), max: MAX };

  // ---------- the panels ----------
  const P = {};
  const byEl = new Map();
  let built = false;
  let last = null;
  function panel(key, tag, title) {
    const el = document.createElement('section');
    el.className = `panel dk-panel deck-only dk-${key}`;
    el.id = 'dk-' + key;
    el.innerHTML = `<header${title ? ` title="${R.esc(title)}"` : ''}><span class="tag">${tag}</span><span class="meta"></span></header><div class="body"></div>`;
    const p = { key, el, meta: el.querySelector('.meta'), body: el.querySelector('.body'), seen: false };
    P[key] = p;
    byEl.set(el, p);
    return el;
  }
  function build() {
    built = true;
    const $ = (id) => document.getElementById(id);
    $('top').after(panel('agents', 'agents.deck'));
    $('right').after(panel('burn', 'burn.tape', 'Claude Code at API list prices (api-eq): what the same tokens would cost on the API, not a subscription’s bill'), panel('flow', 'tool.flow'));
    $('bottom').after(panel('trace', 'tool.trace'));
    P.trace.el.insertAdjacentHTML('beforeend', '<div class="dk-axis"><span>−2m</span><span>−90s</span><span>−60s</span><span>−30s</span><span>now</span></div>');
    // Drawn while on the screen (a little before it scrolls in: the margin is #app's, the scroller); the header's sweep
    // waits while it's away.
    const io = new IntersectionObserver(
      (list) => {
        for (const e of list) {
          const p = byEl.get(e.target);
          p.seen = e.isIntersecting;
          p.el.classList.toggle('dk-off', !p.seen);
          if (p.seen && on && last) draw(p, last);
          if (p.key === 'trace') tick();
        }
      },
      { root: app, rootMargin: '80px' },
    );
    for (const p of Object.values(P)) io.observe(p.el);
    new IntersectionObserver(([e]) => app.classList.toggle('deck-mapoff', on && !e.isIntersecting)).observe($('mapwrap'));
    // Over the map the wheel zooms it (OrbitControls, which keeps the page from scrolling there), and in this view the
    // map is most of the first screen: here the wheel scrolls the page (its own default, once the map doesn't get it)
    // and zooms with ⌘ or ctrl held, as maps on scrolling pages do. The map's + and − zoom as before.
    $('mapwrap').addEventListener('wheel', (e) => {
      if (on && !e.ctrlKey && !e.metaKey) e.stopPropagation();
    }, { capture: true, passive: true });
  }
  // The map's hint line says so while Deck view is on.
  const hint = document.querySelector('#mapwrap .legend .hint');
  const HINT = hint?.textContent || '';
  const ZOOM = `${window.__platform === 'win32' ? 'ctrl' : '⌘'} + scroll = zoom`;

  function draw(p, st) {
    if (p.key === 'agents') drawAgents(p, st);
    else if (p.key === 'burn') drawBurn(p, st);
    else if (p.key === 'flow') drawFlow(p, st);
    else drawTrace(p);
  }

  // agents.deck
  function createAgent() {
    const el = document.createElement('div');
    el.className = 'dk-ag';
    el.innerHTML =
      '<div class="l1"><b class="nm"></b><span class="pill"></span></div><div class="l2"></div><div class="act"></div>' +
      '<svg class="spark" viewBox="0 0 120 20" preserveAspectRatio="none"></svg><div class="ld"><span>ctx</span><div class="bar"><i></i></div><span class="cv"></span><span class="cost"></span></div>';
    el.addEventListener('click', () => R.focusSession(el.dataset.key));
    // Its entrance once: a card moved to another place (keyed() re-inserts it) would play it again.
    el.addEventListener('animationend', () => el.classList.remove('enter'), { once: true });
    return el;
  }
  function updateAgent(el, s) {
    const q = (sel) => el.querySelector(sel);
    const col = R.sessCss(s.id);
    el.style.setProperty('--c', col);
    R.setText(q('.nm'), s.name);
    const pill = q('.pill');
    pill.className = `pill ${s.status}`;
    R.setText(pill, `${R.STATUS[s.status]?.label || s.status} ${R.clock(Date.now() - (s.statusSince || s.lastTs))}`);
    R.setText(q('.l2'), [s.tool, s.model, s.effort].filter(Boolean).join(' · ') + (s.agentsRunning ? ` · ⤷ ${s.agentsRunning}` : ''));
    R.setHTML(q('.act'), R.actionHTML(s));
    R.setHTML(q('.spark'), R.sparkBars(s.spark || [], col));
    const pct = s.ctxMax ? Math.min(1, s.ctx / s.ctxMax) : 0;
    const bar = q('.bar > i');
    bar.style.width = (pct * 100).toFixed(1) + '%';
    bar.style.background = R.ctxCss(pct);
    R.setText(q('.cv'), s.ctxMax ? Math.round(pct * 100) + '%' : R.fmtTok(s.ctx));
    R.setText(q('.cost'), s.tool && s.tool !== 'Claude Code' ? '' : R.fmtUsd(s.cost)); // the others have no price list
  }
  // The cards' order: needs you, your turn, working (the sessions list's), then the order they came in, so a card
  // moves only when its status changes, not on every call as the list's latest-first does.
  const RANK = { waiting: 0, idle: 1, busy: 2 };
  function drawAgents(p, st) {
    const live = st.sessions.filter((s) => s.status !== 'ended').sort((a, b) => (RANK[a.status] ?? 3) - (RANK[b.status] ?? 3) || R.colorIndex(a.id) - R.colorIndex(b.id));
    R.setText(p.meta, `${live.length} live · ${st.totals.runningAgents} subagents running · click a card to open it`);
    if (!live.length) return R.placeholder(p.body, 'no live sessions · the + in the top bar opens a terminal');
    R.keyed(p.body, live.slice(0, 16), (s) => s.id, createAgent, updateAgent);
  }

  // burn.tape
  const TOK = [['in', 'in', 'var(--sky)'], ['out', 'out', 'var(--accent)'], ['cr', 'cache read', 'var(--green)'], ['cw', 'cache write', 'var(--amber)']];
  function drawBurn(p, st) {
    const t = st.totals;
    const tok = t.tok || {};
    const all = TOK.reduce((a, [k]) => a + (tok[k] || 0), 0);
    const cost = st.costSpark || [];
    const toks = st.tokSpark || [];
    R.setText(p.meta, `api-eq · ${R.fmtUsd(t.costPerHour)}/h burn · last 30 min`);
    // By model: their cost's share, or their calls' while nothing has a price (another AI's only).
    const models = [...(st.byModel || [])].sort((a, b) => b.cost - a.cost || b.calls - a.calls).slice(0, 4);
    const priced = models.some((m) => m.cost > 0);
    const top = Math.max(1e-9, ...models.map((m) => (priced ? m.cost : m.calls)));
    R.setHTML(
      p.body,
      `<div class="dk-big"><small>today · api-eq</small><b>${R.fmtUsd(t.cost)}</b><span>saved ${R.fmtUsd(t.saved)} by cache · ${((t.cacheHit || 0) * 100).toFixed(1)}% hit</span>` +
        `<div class="dk-kv"><span>tokens <b>${R.fmtTok(all)}</b></span><span>turns <b>${t.turns || 0}</b></span><span>avg turn <b>${t.avgTurn ? R.fmtDur(t.avgTurn) : '—'}</b></span><span>tool ok <b>${((t.okRate || 0) * 100).toFixed(1)}%</b></span></div></div>` +
        `<div class="dk-charts"><div class="dk-ch"><label>cost / min <b>${R.fmtUsd(Math.max(0, ...cost))} max</b></label><svg viewBox="0 0 300 60" preserveAspectRatio="none">${R.areaChart(cost.length ? cost : [0], 'var(--accent)', 300, 60)}</svg></div>` +
        `<div class="dk-ch"><label>tokens / min <b>${R.fmtTok(Math.max(0, ...toks))} max</b></label><svg viewBox="0 0 300 60" preserveAspectRatio="none">${R.areaChart(toks.length ? toks : [0], 'var(--cyan)', 300, 60)}</svg></div>` +
        '<div class="dk-axis"><span>−30m</span><span>−15m</span><span>now</span></div></div>' +
        `<div class="dk-split"><label>tokens today</label><div class="mixbar">${TOK.map(([k, , c]) => `<i style="width:${all ? (((tok[k] || 0) / all) * 100).toFixed(2) : 0}%;background:${c}"></i>`).join('')}</div>` +
        `<div class="mixlegend">${TOK.map(([k, l, c]) => `<span><i style="background:${c}"></i>${l} <b>${R.fmtTok(tok[k] || 0)}</b></span>`).join('')}</div>` +
        `<label>by model</label>${models.length ? models.map((m) => `<div class="dk-mod"><span>${R.esc(m.model)}${m.tool && m.tool !== 'Claude Code' ? ` <i>${R.esc(m.tool)}</i>` : ''}</span><div class="bar"><i style="width:${(((priced ? m.cost : m.calls) / top) * 100).toFixed(1)}%"></i></div><b>${priced ? R.fmtUsd(m.cost) : m.calls + ' calls'}</b></div>`).join('') : '<div class="empty">no model calls today</div>'}</div>`,
    );
  }

  // tool.flow
  function drawFlow(p, st) {
    R.setText(p.meta, `${(st.totals.toolsPerMin || 0).toFixed(1)} calls/min · last 15 min · today`);
    R.setHTML(
      p.body,
      R.CATS.map((c) => {
        const run = st.pendingByCat?.[c] || 0;
        return `<div class="dk-cat"><span class="nm"><i style="background:${R.CAT[c].css}"></i>${R.CAT[c].label}</span><svg viewBox="0 0 120 20" preserveAspectRatio="none">${R.sparkBars(st.catSpark?.[c] || [], R.CAT[c].css)}</svg><b>${st.byCat?.[c] || 0}</b><em${run ? ' class="on"' : ''}>${run ? `${run} now` : ''}</em></div>`;
      }).join(''),
    );
  }

  // tool.trace
  // tool.trace's window slides with the clock: while it can be seen it's drawn again every second even when nothing new
  // comes (the app sends its state only when something changed, so it froze while the sessions were quiet).
  let timer = 0;
  function tick() {
    const want = on && P.trace?.seen;
    if (want && !timer) timer = setInterval(() => !document.hidden && drawTrace(P.trace), 1000);
    else if (!want && timer) timer = clearInterval(timer) || 0;
  }
  function drawTrace(p) {
    const rows = lanes(T, Date.now(), WIN, 8, last ? new Set(last.sessions.map((s) => s.id)) : null);
    const calls = rows.reduce((a, l) => a + l.n, 0);
    const errs = rows.reduce((a, l) => a + l.err, 0);
    R.setText(p.meta, calls ? `${calls} calls · ${errs} failed · last 2 min · thin bars: subagents` : 'last 2 min');
    if (!rows.length) return R.setHTML(p.body, '<div class="empty">no tool calls in the last 2 minutes</div>');
    const bar = (b) =>
      `<i class="${b.a ? 'sub' : ''}${b.run ? ' run' : ''}${b.bad ? ' bad' : ''}" style="left:${(b.x * 100).toFixed(2)}%;width:max(2px, ${(b.w * 100).toFixed(2)}%);background:${R.CAT[b.c]?.css || 'var(--lavender)'}" title="${R.esc(b.n)}"></i>`;
    R.setHTML(
      p.body,
      rows.map((l) => `<div class="dk-lane"><span class="nm" style="color:${R.sessCss(l.s)}">${R.esc(R.sessName(l.s))}</span><div class="tr">${l.bars.map(bar).join('')}</div><span class="n">${l.n}${l.err ? ` <b class="red">${l.err}✗</b>` : ''}</span></div>`).join(''),
    );
  }

  // ---------- on, off, and the app's pushes ----------
  function apply() {
    if (on && !built) build();
    app.classList.toggle('deck', on);
    if (hint) hint.textContent = on ? HINT.replace('scroll = zoom', ZOOM) : HINT;
    if (on) {
      if (last) render(last);
      return;
    }
    app.classList.remove('deck-mapoff');
    app.scrollTop = 0;
    tick();
    T.list.length = 0;
    T.open.clear();
  }
  function set(v) {
    on = !!v;
    try {
      localStorage.setItem(KEY, on ? '1' : '0');
    } catch {}
    apply();
  }
  // Every state push (app.js renderAll); kept while off, so turning it on draws at once.
  function render(st) {
    last = st;
    if (!on) return;
    for (const p of Object.values(P)) if (p.seen) draw(p, st);
  }
  // Every event the map gets (app.js map()), real or party mode's: tool.trace's calls.
  function event(ev) {
    if (on) track(T, ev);
  }

  if (on && app) apply();
  return { on: () => on, set, render, event, _test: { track, lanes } };
})();
