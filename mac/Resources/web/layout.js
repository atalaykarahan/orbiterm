'use strict';

// Visual Dashboard Customization System:
//   - Zero-clutter default view: no extra toolbars, grips, or overlays while working.
//   - Edit Mode (#panels button or Option+E / Alt+E): reveals cyberpunk blueprint grid, panel drag
//     handles, hide buttons, resize sash guides, map mode switchers, presets, and 4 custom slots.
//   - Modular engine: sessTall, 3 session density levels (standard/compact/minimal),
//     5 orbit.map modes (center/bottom/right/pip/hidden), panel drag across areas, sash resizing.
//   - Persistence: localStorage['radar.layout'] and localStorage['radar.layout.slots'] (Ctrl+Option+1..4 / Ctrl+Alt+1..4).
window.PanelLayout = (() => {
  const KEY = 'radar.layout';
  const SLOTS_KEY = 'radar.layout.slots';
  const SLOT_COUNT = 4;
  const SNAP_DIST = 28;
  const MIN_PANEL = 60;
  const MIN_PIP_W = 220;
  const MIN_PIP_H = 160;
  const WIN = window.__platform === 'win32';
  const MAC = !WIN;
  const OPT = WIN ? 'Alt+' : '⌥';
  const CTRL_OPT = WIN ? 'Ctrl+Alt+' : '⌃⌥';

  const AREAS = {
    right: { el: () => document.getElementById('right'), axis: 'y', ids: ['p-research', 'p-notes', 'p-files', 'p-mix'] },
    bottom: { el: () => document.getElementById('bottom'), axis: 'x', ids: ['p-log', 'p-workers', 'p-spend', 'p-call'] },
  };
  const DEFAULT_GROW = { 'p-research': 1.35, 'p-notes': 1.2, 'p-files': 1, 'p-mix': 0, 'p-log': 1.6, 'p-workers': 1, 'p-spend': 0.95, 'p-call': 1 };
  const ALL = [...AREAS.right.ids, ...AREAS.bottom.ids];
  const DENSITIES = [
    { id: 'standard', label: 'Std', title: 'Standard cards' },
    { id: 'compact', label: 'Compact', title: 'Compact cards (~2x rows)' },
    { id: 'minimal', label: 'Minimal', title: 'Minimal 1-line rows (~6x agents)' },
  ];
  const MAP_MODES = [
    { id: 'center', label: 'Center', title: 'Map in center workspace' },
    { id: 'pip', label: 'PiP', title: 'Floating picture-in-picture map (draggable, 4-corner snap, resizable)' },
    { id: 'bottom', label: 'Bottom', title: 'Map docked in bottom row' },
    { id: 'right', label: 'Right', title: 'Map docked in right column' },
    { id: 'hidden', label: 'Hide', title: 'Hide map (pauses 3D GPU work)' },
  ];
  const VALID_DENSITIES = new Set(DENSITIES.map((d) => d.id));
  const VALID_MAP_MODES = new Set(MAP_MODES.map((m) => m.id));
  const VALID_CORNERS = new Set(['tl', 'tr', 'bl', 'br']);

  const app = document.getElementById('app');
  const panel = (id) => document.getElementById(id);
  const nameOf = (id) => panel(id)?.querySelector(':scope > header .tag')?.textContent.trim() || id;
  const narrow = () => matchMedia('(max-width: 920px)').matches;
  const inAltView = () => app.classList.contains('git-mode') || app.classList.contains('cloud-mode');

  // ---------- schema & normalization ----------
  const freshPip = () => ({ corner: 'br', x: null, y: null, w: 340, h: 230 });
  const fresh = () => ({
    v: 1,
    right: [...AREAS.right.ids],
    bottom: [...AREAS.bottom.ids],
    hidden: [],
    grow: {},
    rightW: null,
    bottomH: null,
    sessW: null,
    sessTall: false,
    sessDensity: 'standard',
    mapMode: 'center',
    pip: freshPip(),
  });

  function normalizeLayout(s) {
    const L = fresh();
    if (!s || typeof s !== 'object') return L;
    if (s.v != null && s.v !== 1) return L;
    const seen = new Set();
    for (const a of ['right', 'bottom']) {
      L[a] = (Array.isArray(s[a]) ? s[a] : []).filter((id) => ALL.includes(id) && !seen.has(id) && seen.add(id));
    }
    for (const a of ['right', 'bottom']) {
      AREAS[a].ids.forEach((id, i) => {
        if (seen.has(id)) return;
        const before = AREAS[a].ids.slice(0, i).reverse().find((p) => L[a].includes(p));
        L[a].splice(before ? L[a].indexOf(before) + 1 : 0, 0, id);
        seen.add(id);
      });
    }
    L.hidden = (Array.isArray(s.hidden) ? s.hidden : []).filter((id, i, arr) => ALL.includes(id) && arr.indexOf(id) === i);
    if (s.grow && typeof s.grow === 'object') {
      for (const [id, g] of Object.entries(s.grow)) if (ALL.includes(id) && Number(g) > 0) L.grow[id] = Number(g);
    }
    for (const k of ['rightW', 'bottomH', 'sessW']) {
      const n = Number(s[k]);
      L[k] = Number.isFinite(n) && n > 0 ? Math.round(n) : null;
    }
    L.sessTall = Boolean(s.sessTall);
    L.sessDensity = VALID_DENSITIES.has(s.sessDensity) ? s.sessDensity : 'standard';
    L.mapMode = VALID_MAP_MODES.has(s.mapMode) ? s.mapMode : 'center';
    if (s.pip && typeof s.pip === 'object') {
      const p = s.pip;
      const coord = (v) => (v != null && v !== '' && typeof v !== 'boolean' && Number.isFinite(Number(v)) ? Math.round(Number(v)) : null);
      L.pip = {
        corner: VALID_CORNERS.has(p.corner) ? p.corner : null,
        x: coord(p.x),
        y: coord(p.y),
        w: Math.max(MIN_PIP_W, Math.round(Number(p.w) || 340)),
        h: Math.max(MIN_PIP_H, Math.round(Number(p.h) || 230)),
      };
      if (!L.pip.corner && (L.pip.x === null || L.pip.y === null)) L.pip.corner = 'br';
    }
    return L;
  }

  function cloneLayout(src) {
    return normalizeLayout(JSON.parse(JSON.stringify(src)));
  }

  function load() {
    try {
      return normalizeLayout(JSON.parse(localStorage.getItem(KEY) || 'null'));
    } catch {
      return fresh();
    }
  }

  function loadSlots() {
    const out = Array(SLOT_COUNT).fill(null);
    try {
      const raw = JSON.parse(localStorage.getItem(SLOTS_KEY) || 'null');
      if (!Array.isArray(raw)) return out;
      for (let i = 0; i < SLOT_COUNT; i++) {
        const entry = raw[i];
        if (!entry || typeof entry !== 'object') continue;
        const layout = normalizeLayout(entry.layout || entry);
        out[i] = {
          name: typeof entry.name === 'string' && entry.name.trim() ? entry.name.trim() : `Slot ${i + 1}`,
          savedAt: Number(entry.savedAt) || Date.now(),
          layout,
        };
      }
    } catch {}
    return out;
  }

  let L = load();
  let SLOTS = loadSlots();
  let saveTimer = 0;
  let lastNonHiddenMap = L.mapMode !== 'hidden' ? L.mapMode : 'center';

  function save(immediate) {
    clearTimeout(saveTimer);
    const write = () => {
      try {
        localStorage.setItem(KEY, JSON.stringify(L));
      } catch {}
    };
    if (immediate) write();
    else saveTimer = setTimeout(write, 150);
  }

  function persistSlots() {
    try {
      localStorage.setItem(SLOTS_KEY, JSON.stringify(SLOTS));
    } catch {}
  }

  const areaOf = (id) => (L.right.includes(id) ? 'right' : 'bottom');
  const isHidden = (id) => L.hidden.includes(id);
  const layoutSig = (layout) => JSON.stringify(normalizeLayout(layout));
  const activeSlotIndex = () => {
    const cur = layoutSig(L);
    return SLOTS.findIndex((s) => s && layoutSig(s.layout) === cur);
  };
  const notify = (msg) => {
    if (typeof toast === 'function') toast(msg);
  };

  // ---------- presets ----------
  const PRESETS = [
    { id: 'default', name: 'Default', hotkey: `${OPT}1`, desc: 'Center map · standard cards · all panels', build: () => fresh() },
    {
      id: 'focus',
      name: 'Focus',
      hotkey: `${OPT}2`,
      desc: 'PiP map · tall compact sessions · log, call & notes',
      build: () => normalizeLayout({
        ...fresh(),
        sessTall: true,
        sessDensity: 'compact',
        mapMode: 'pip',
        pip: { corner: 'br', x: null, y: null, w: 320, h: 210 },
        right: ['p-notes', 'p-research', 'p-files', 'p-mix'],
        bottom: ['p-log', 'p-call', 'p-workers', 'p-spend'],
        hidden: ['p-research', 'p-files', 'p-mix', 'p-workers', 'p-spend'],
      }),
    },
    {
      id: 'swarm',
      name: 'Agent Swarm (6×)',
      hotkey: `${OPT}3`,
      desc: 'Minimal 1-line cards · tall list · center map',
      build: () => normalizeLayout({ ...fresh(), sessTall: true, sessDensity: 'minimal', mapMode: 'center' }),
    },
    {
      id: 'ops',
      name: 'Ops Grid',
      hotkey: `${OPT}4`,
      desc: 'Map hidden · tall compact sessions · maximum workspace',
      build: () => normalizeLayout({ ...fresh(), sessTall: true, sessDensity: 'compact', mapMode: 'hidden' }),
    },
    {
      id: 'wide',
      name: 'Wide Panels',
      hotkey: '',
      desc: 'Bottom map · wide upper panels · compact cards',
      build: () => normalizeLayout({ ...fresh(), sessDensity: 'compact', mapMode: 'bottom' }),
    },
    {
      id: 'rightmap',
      name: 'Map Right',
      hotkey: '',
      desc: 'Right-docked map · center panels · tall sessions',
      build: () => normalizeLayout({ ...fresh(), sessTall: true, sessDensity: 'compact', mapMode: 'right' }),
    },
  ];

  // ---------- applying layout ----------
  function flexOf(id, area) {
    const g = L.grow[id];
    if (g > 0) return `${g} 1 0px`;
    const d = DEFAULT_GROW[id];
    if (!d) return area === 'right' ? '0 0 auto' : '1 1 0px';
    return `${d} 1 0px`;
  }

  function apply() {
    for (const a of ['right', 'bottom']) {
      const box = AREAS[a].el();
      if (!box) continue;
      box.querySelectorAll(':scope > .pl-sash').forEach((s) => s.remove());
      let cursor = box.firstElementChild;
      for (const id of L[a]) {
        const p = panel(id);
        if (!p) continue;
        if (p === cursor) cursor = cursor.nextElementSibling;
        else box.insertBefore(p, cursor);
      }
      let prev = null;
      for (const id of L[a]) {
        const p = panel(id);
        if (!p) continue;
        p.classList.add('pl-panel');
        const hide = isHidden(id);
        p.classList.toggle('pl-hidden', hide);
        p.style.flex = flexOf(id, a);
        if (hide) continue;
        if (prev) {
          const s = document.createElement('div');
          s.className = `pl-sash ${AREAS[a].axis}`;
          s.dataset.a = prev;
          s.dataset.b = id;
          s.title = 'Drag to size · double-click: reset shares';
          box.insertBefore(s, p);
        }
        prev = id;
      }
      app.classList.toggle(`no-${a}`, !prev);
    }

    app.classList.toggle('sess-tall', !!L.sessTall);
    app.classList.toggle('sess-compact', L.sessDensity === 'compact');
    app.classList.toggle('sess-minimal', L.sessDensity === 'minimal');
    for (const m of MAP_MODES) app.classList.toggle(`map-${m.id}`, L.mapMode === m.id);
    if (L.mapMode !== 'hidden') lastNonHiddenMap = L.mapMode;

    applyGrid();
    placePip();
    syncMapHud();
    paintEditUI();
  }

  function applyGrid() {
    app.classList.toggle('lay-w', !!(L.rightW || L.sessW));
    app.classList.toggle('lay-h', !!L.bottomH);
    if (L.rightW) app.style.setProperty('--lay-right', `${Math.round(L.rightW)}px`);
    else app.style.removeProperty('--lay-right');
    if (L.sessW) app.style.setProperty('--lay-sess', `${Math.round(L.sessW)}px`);
    else app.style.removeProperty('--lay-sess');
    if (L.bottomH) app.style.setProperty('--lay-bottom', `${Math.round(L.bottomH)}px`);
    else app.style.removeProperty('--lay-bottom');
    placeGridSashes();
  }

  // ---------- PiP geometry, magnetic 4-corner snap & resize ----------
  const mapwrap = document.getElementById('mapwrap');
  const topEl = document.getElementById('top');
  const activityEl = document.getElementById('activity');
  const tickerEl = document.getElementById('ticker');
  let editMode = false;
  let editBar = null;
  let pop = null;
  let popAnchor = null;

  function safeBox() {
    const pad = 8;
    const vw = document.documentElement.clientWidth || innerWidth;
    const vh = document.documentElement.clientHeight || innerHeight;
    const topR = topEl ? topEl.getBoundingClientRect() : { bottom: 48 };
    const actR = activityEl ? activityEl.getBoundingClientRect() : null;
    const tickR = tickerEl ? tickerEl.getBoundingClientRect() : null;
    const barR = editMode && editBar && !editBar.hidden ? editBar.getBoundingClientRect() : null;
    const left = actR && actR.width > 0 ? Math.round(actR.right + pad) : pad;
    const top = Math.round((barR ? barR.bottom : topR.bottom) + pad);
    const right = Math.round(vw - pad);
    const bottom = Math.round((tickR && tickR.height > 0 ? tickR.top : vh) - pad);
    return { left, top, right, bottom, w: Math.max(MIN_PIP_W, right - left), h: Math.max(MIN_PIP_H, bottom - top) };
  }

  function cornerPos(corner, w, h, s) {
    return {
      x: Math.round(corner === 'tl' || corner === 'bl' ? s.left : s.right - w),
      y: Math.round(corner === 'tl' || corner === 'tr' ? s.top : s.bottom - h),
    };
  }

  function placePip() {
    if (!mapwrap) return;
    if (L.mapMode !== 'pip' || narrow() || inAltView()) {
      for (const k of ['left', 'top', 'width', 'height']) mapwrap.style.removeProperty(k);
      return;
    }
    const s = safeBox();
    const w = Math.round(Math.min(s.w, Math.max(MIN_PIP_W, L.pip.w)));
    const h = Math.round(Math.min(s.h, Math.max(MIN_PIP_H, L.pip.h)));
    let x, y;
    if (L.pip.corner) {
      ({ x, y } = cornerPos(L.pip.corner, w, h, s));
    } else {
      x = Math.round(Math.max(s.left, Math.min(L.pip.x ?? s.right - w, s.right - w)));
      y = Math.round(Math.max(s.top, Math.min(L.pip.y ?? s.bottom - h, s.bottom - h)));
    }
    Object.assign(mapwrap.style, {
      left: `${x}px`,
      top: `${y}px`,
      width: `${w}px`,
      height: `${h}px`,
    });
  }

  function syncMapHud() {
    if (!mapwrap) return;
    const r = mapwrap.getBoundingClientRect();
    const w = r.width, h = r.height;
    mapwrap.classList.toggle('pl-compact-map', w > 0 && (w < 430 || h < 270));
    mapwrap.classList.toggle('pl-tiny-map', w > 0 && (w < 300 || h < 200));
  }

  // ---------- inject panel grips, hide buttons, grid layer & map HUD controls ----------
  const GRIP_SVG = '<svg viewBox="0 0 10 12" aria-hidden="true"><circle cx="3" cy="2.5" r="1"/><circle cx="7" cy="2.5" r="1"/><circle cx="3" cy="6" r="1"/><circle cx="7" cy="6" r="1"/><circle cx="3" cy="9.5" r="1"/><circle cx="7" cy="9.5" r="1"/></svg>';
  for (const id of ALL) {
    const h = panel(id)?.querySelector(':scope > header');
    if (!h) continue;
    if (!h.dataset.origTitle && h.title) h.dataset.origTitle = h.title;
    if (!h.querySelector('.pl-grip')) {
      const g = document.createElement('span');
      g.className = 'pl-grip';
      g.setAttribute('aria-hidden', 'true');
      g.innerHTML = GRIP_SVG;
      h.prepend(g);
    }
    if (!h.querySelector('.pl-btn')) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pl-btn';
      b.title = 'Hide this panel';
      b.textContent = '–';
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        setHidden(id, true);
      });
      h.appendChild(b);
    }
  }

  const gridLayer = document.createElement('div');
  gridLayer.className = 'pl-grid';
  gridLayer.setAttribute('aria-hidden', 'true');
  app.prepend(gridLayer);

  let mapCtl = null;
  if (mapwrap) {
    mapCtl = document.createElement('div');
    mapCtl.className = 'pl-mapctl';
    mapCtl.innerHTML =
      MAP_MODES.map((m) => `<button type="button" data-map="${m.id}" title="${m.title}">${m.label}</button>`).join('') +
      '<span class="pl-pip-snaps">' +
      [['tl', '↖', 'Snap top-left'], ['tr', '↗', 'Snap top-right'], ['bl', '↙', 'Snap bottom-left'], ['br', '↘', 'Snap bottom-right']]
        .map(([c, g, t]) => `<button type="button" data-corner="${c}" title="${t}">${g}</button>`)
        .join('') +
      '</span>';
    mapCtl.addEventListener('click', (e) => {
      const mb = e.target.closest('[data-map]');
      if (mb) return setMapMode(mb.dataset.map);
      const cb = e.target.closest('[data-corner]');
      if (cb) return snapPipCorner(cb.dataset.corner);
    });
    mapwrap.appendChild(mapCtl);

    for (const dir of ['n', 's', 'e', 'w', 'nw', 'ne', 'sw', 'se']) {
      const rh = document.createElement('div');
      rh.className = `pl-pip-res ${dir}`;
      rh.dataset.dir = dir;
      rh.title = 'Drag to resize map';
      mapwrap.appendChild(rh);
    }
  }

  function setHidden(id, hide) {
    L.hidden = L.hidden.filter((x) => x !== id);
    if (hide) L.hidden.push(id);
    apply();
    save();
    if (!hide && typeof renderAll === 'function') renderAll();
  }

  function setMapMode(mode) {
    if (!VALID_MAP_MODES.has(mode) || L.mapMode === mode) return;
    if (mode !== 'hidden') lastNonHiddenMap = mode;
    L.mapMode = mode;
    apply();
    save();
  }

  function snapPipCorner(corner) {
    if (!VALID_CORNERS.has(corner)) return;
    if (L.mapMode !== 'pip') L.mapMode = 'pip';
    L.pip.corner = corner;
    L.pip.x = null;
    L.pip.y = null;
    apply();
    save();
  }

  function setSessTall(tall) {
    L.sessTall = !!tall;
    apply();
    save();
  }

  function setSessDensity(density) {
    if (!VALID_DENSITIES.has(density) || L.sessDensity === density) return;
    L.sessDensity = density;
    apply();
    save();
  }

  function applyLayoutSnapshot(next, msg) {
    const hadHidden = new Set(L.hidden);
    L = cloneLayout(next);
    apply();
    save(true);
    if (typeof renderAll === 'function' && L.hidden.length < hadHidden.size) renderAll();
    else if (typeof renderAll === 'function' && [...hadHidden].some((id) => !L.hidden.includes(id))) renderAll();
    if (msg) notify(msg);
  }

  function saveToSlot(index) {
    if (index < 0 || index >= SLOT_COUNT) return;
    SLOTS[index] = {
      name: `Slot ${index + 1}`,
      savedAt: Date.now(),
      layout: cloneLayout(L),
    };
    persistSlots();
    paintEditUI();
    notify(`Saved layout to Slot ${index + 1}`);
  }

  function loadSlot(index) {
    if (index < 0 || index >= SLOT_COUNT) return false;
    const entry = SLOTS[index];
    if (!entry) return false;
    applyLayoutSnapshot(entry.layout, `Loaded ${entry.name}`);
    return true;
  }

  function clearSlot(index) {
    if (index < 0 || index >= SLOT_COUNT || !SLOTS[index]) return;
    SLOTS[index] = null;
    persistSlots();
    paintEditUI();
    notify(`Cleared Slot ${index + 1}`);
  }

  // ---------- drag & sizing engine ----------
  let drag = null;
  let pipZones = null;
  const capture = (el, id) => {
    try {
      if (id != null) el?.setPointerCapture?.(id);
    } catch {}
  };
  const clearSel = () => {
    try {
      window.getSelection?.()?.removeAllRanges?.();
    } catch {}
  };

  function showPipZones(hotCorner) {
    if (!pipZones) {
      pipZones = document.createElement('div');
      pipZones.className = 'pl-pip-zones';
      for (const c of ['tl', 'tr', 'bl', 'br']) {
        const z = document.createElement('div');
        z.className = 'pl-pip-zone';
        z.dataset.c = c;
        pipZones.appendChild(z);
      }
      document.body.appendChild(pipZones);
    }
    const s = safeBox();
    for (const z of pipZones.children) {
      const c = z.dataset.c;
      const p = cornerPos(c, 68, 46, s);
      z.style.left = `${Math.round(p.x)}px`;
      z.style.top = `${Math.round(p.y)}px`;
      z.classList.toggle('hot', c === hotCorner);
    }
  }

  function hidePipZones() {
    if (!pipZones) return;
    pipZones.remove();
    pipZones = null;
  }

  function onSashDown(e) {
    const s = e.target.closest('.pl-sash');
    if (!s || e.button !== 0 || (MAC && e.ctrlKey)) return;
    e.preventDefault();
    clearSel();
    const box = s.parentElement;
    const a = box.id === 'right' ? 'right' : 'bottom';
    const axis = AREAS[a].axis;
    const size = (el) => Math.round(axis === 'y' ? el.getBoundingClientRect().height : el.getBoundingClientRect().width);
    const shown = L[a].filter((id) => !isHidden(id) && panel(id));
    for (const id of shown) L.grow[id] = Math.max(1, size(panel(id)));
    for (const id of shown) panel(id).style.flex = flexOf(id, a);
    drag = { kind: 'sash', pointerId: e.pointerId, axis, A: s.dataset.a, B: s.dataset.b, start: axis === 'y' ? e.clientY : e.clientX, a0: L.grow[s.dataset.a], b0: L.grow[s.dataset.b], a };
    capture(s, e.pointerId);
    s.classList.add('on');
    app.classList.add('pl-sizing', axis === 'y' ? 'pl-rows' : 'pl-cols');
  }

  function onSashMove(e) {
    const now = drag.axis === 'y' ? e.clientY : e.clientX;
    const total = drag.a0 + drag.b0;
    const a = Math.max(MIN_PANEL, Math.min(total - MIN_PANEL, Math.round(drag.a0 + (now - drag.start))));
    L.grow[drag.A] = a;
    L.grow[drag.B] = total - a;
    panel(drag.A).style.flex = flexOf(drag.A, drag.a);
    panel(drag.B).style.flex = flexOf(drag.B, drag.a);
  }

  // ---------- PiP move & resize pointer handlers ----------
  if (mapwrap) {
    mapwrap.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || (MAC && e.ctrlKey) || L.mapMode !== 'pip' || narrow() || inAltView()) return;
      const res = e.target.closest('.pl-pip-res');
      if (res) {
        e.preventDefault();
        e.stopPropagation();
        clearSel();
        const r = mapwrap.getBoundingClientRect();
        const left = Math.round(r.left);
        const top = Math.round(r.top);
        const width = Math.round(r.width);
        const height = Math.round(r.height);
        drag = {
          kind: 'pip-res',
          pointerId: e.pointerId,
          dir: res.dataset.dir,
          sx: e.clientX,
          sy: e.clientY,
          origPip: { ...L.pip },
          r0: { left, top, right: left + width, bottom: top + height, width, height },
        };
        capture(res, e.pointerId);
        mapwrap.classList.add('pl-pip-moving');
        app.classList.add('pl-sizing');
        return;
      }
      const tag = e.target.closest('.maptag');
      if (tag && !e.target.closest('button')) {
        e.preventDefault();
        e.stopPropagation();
        clearSel();
        const r = mapwrap.getBoundingClientRect();
        drag = {
          kind: 'pip-move',
          pointerId: e.pointerId,
          dx: e.clientX - Math.round(r.left),
          dy: e.clientY - Math.round(r.top),
          w: Math.round(r.width),
          h: Math.round(r.height),
          origPip: { ...L.pip },
        };
        capture(tag, e.pointerId);
        mapwrap.classList.add('pl-pip-moving');
        app.classList.add('pl-sizing');
        showPipZones(L.pip.corner);
      }
    });

    mapwrap.addEventListener('dblclick', (e) => {
      if (L.mapMode !== 'pip' || e.target.closest('button') || !e.target.closest('.maptag')) return;
      // Double-click PiP title bar snaps cleanly to nearest corner
      const r = mapwrap.getBoundingClientRect();
      const s = safeBox();
      const cx = r.left + r.width / 2 < (s.left + s.right) / 2 ? 'l' : 'r';
      const cy = r.top + r.height / 2 < (s.top + s.bottom) / 2 ? 't' : 'b';
      snapPipCorner(cy + cx);
    });
  }

  function onPipMove(e) {
    const s = safeBox();
    const w = drag.w, h = drag.h;
    let nx = Math.round(Math.max(s.left, Math.min(e.clientX - drag.dx, s.right - w)));
    let ny = Math.round(Math.max(s.top, Math.min(e.clientY - drag.dy, s.bottom - h)));

    const nearL = Math.abs(nx - s.left) <= SNAP_DIST;
    const nearR = Math.abs(nx + w - s.right) <= SNAP_DIST;
    const nearT = Math.abs(ny - s.top) <= SNAP_DIST;
    const nearB = Math.abs(ny + h - s.bottom) <= SNAP_DIST;

    if (nearL) nx = s.left;
    else if (nearR) nx = s.right - w;
    if (nearT) ny = s.top;
    else if (nearB) ny = s.bottom - h;

    const corner = (nearT || nearB) && (nearL || nearR) ? `${nearT ? 't' : 'b'}${nearL ? 'l' : 'r'}` : null;
    L.pip.corner = corner;
    L.pip.x = corner ? null : Math.round(nx);
    L.pip.y = corner ? null : Math.round(ny);
    showPipZones(corner);
    placePip();
  }

  function onPipResize(e) {
    const s = safeBox();
    const d = drag.dir;
    const dx = Math.round(e.clientX - drag.sx);
    const dy = Math.round(e.clientY - drag.sy);
    let { left, top, right, bottom } = drag.r0;

    if (d.includes('w')) left = Math.round(Math.max(s.left, Math.min(drag.r0.left + dx, right - MIN_PIP_W)));
    if (d.includes('e')) right = Math.round(Math.min(s.right, Math.max(drag.r0.right + dx, left + MIN_PIP_W)));
    if (d.includes('n')) top = Math.round(Math.max(s.top, Math.min(drag.r0.top + dy, bottom - MIN_PIP_H)));
    if (d.includes('s')) bottom = Math.round(Math.min(s.bottom, Math.max(drag.r0.bottom + dy, top + MIN_PIP_H)));

    const w = Math.max(MIN_PIP_W, Math.round(right - left));
    const h = Math.max(MIN_PIP_H, Math.round(bottom - top));
    L.pip.w = w;
    L.pip.h = h;
    const atL = Math.abs(left - s.left) <= 2;
    const atR = Math.abs(right - s.right) <= 2;
    const atT = Math.abs(top - s.top) <= 2;
    const atB = Math.abs(bottom - s.bottom) <= 2;
    L.pip.corner = (atT || atB) && (atL || atR) ? `${atT ? 't' : 'b'}${atL ? 'l' : 'r'}` : null;
    L.pip.x = L.pip.corner ? null : Math.round(left);
    L.pip.y = L.pip.corner ? null : Math.round(top);
    placePip();
    syncMapHud();
  }

  function endDrag() {
    if (!drag) return;
    document.querySelectorAll('.pl-sash.on, .pl-gsash.on').forEach((s) => s.classList.remove('on'));
    if (mapwrap) mapwrap.classList.remove('pl-pip-moving');
    hidePipZones();
    app.classList.remove('pl-sizing', 'pl-rows', 'pl-cols');
    drag = null;
    placeGridSashes();
    paintEditUI();
    save();
  }

  app.addEventListener('pointerdown', onSashDown);
  addEventListener('pointermove', (e) => {
    if (!drag || (drag.pointerId != null && e.pointerId != null && e.pointerId !== drag.pointerId)) return;
    if (drag.kind === 'sash') onSashMove(e);
    else if (drag.kind === 'grid') onGridMove(e);
    else if (drag.kind === 'move') onMoveMove(e);
    else if (drag.kind === 'pip-move') onPipMove(e);
    else if (drag.kind === 'pip-res') onPipResize(e);
  });
  addEventListener('pointerup', (e) => {
    if (!drag || (drag.pointerId != null && e.pointerId != null && e.pointerId !== drag.pointerId)) return;
    if (drag.kind === 'move') return onMoveEnd(e, false);
    endDrag();
  });
  addEventListener('pointercancel', (e) => {
    if (pending && (e.pointerId == null || e.pointerId === pending.pointer)) pending = null;
    if (!drag || (drag.pointerId != null && e.pointerId != null && e.pointerId !== drag.pointerId)) return;
    drag.kind === 'move' ? onMoveEnd(null, true) : endDrag();
  });
  addEventListener('blur', () => {
    pending = null;
    if (drag) drag.kind === 'move' ? onMoveEnd(null, true) : endDrag();
  });
  app.addEventListener('dblclick', (e) => {
    const s = e.target.closest('.pl-sash');
    if (!s) return;
    const a = s.parentElement.id === 'right' ? 'right' : 'bottom';
    for (const id of L[a]) delete L.grow[id];
    apply();
    save();
  });

  // ---------- grid sashes (sessions width, right column / map width, bottom row height) ----------
  const grid = {};
  for (const [k, title] of [['right', 'Drag: right column width'], ['bottom', 'Drag: bottom row height'], ['sess', 'Drag: sessions width']]) {
    const g = document.createElement('div');
    g.className = `pl-gsash ${k === 'bottom' ? 'y' : 'x'}`;
    g.dataset.k = k;
    g.title = `${title} · double-click: reset`;
    document.body.appendChild(g);
    grid[k] = g;
    g.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || (MAC && e.ctrlKey)) return;
      e.preventDefault();
      clearSel();
      capture(g, e.pointerId);
      g.classList.add('on');
      drag = { kind: 'grid', pointerId: e.pointerId, k };
      app.classList.add('pl-sizing', k === 'bottom' ? 'pl-rows' : 'pl-cols');
    });
    g.addEventListener('dblclick', () => {
      L[k === 'right' ? 'rightW' : k === 'bottom' ? 'bottomH' : 'sessW'] = null;
      apply();
      save();
    });
  }

  function onGridMove(e) {
    const r = app.getBoundingClientRect();
    const pad = 8;
    const topR = topEl ? topEl.getBoundingClientRect() : { bottom: r.top + 48 };
    if (drag.k === 'right') {
      const left = document.getElementById('sessions').getBoundingClientRect();
      L.rightW = Math.round(Math.max(200, Math.min(r.right - pad - e.clientX - 4, r.right - left.right - 320)));
    } else if (drag.k === 'bottom') {
      const topLimit = (editMode && editBar ? editBar.getBoundingClientRect().bottom : topR.bottom) + 8;
      L.bottomH = Math.round(Math.max(90, Math.min(r.bottom - pad - 22 - 8 - e.clientY - 4, r.bottom - topLimit - 22 - 8 - 160)));
    } else {
      const s = document.getElementById('sessions').getBoundingClientRect();
      L.sessW = Math.round(Math.max(180, Math.min(e.clientX - s.left - 4, r.width * 0.45)));
    }
    applyGrid();
  }

  function placeGridSashes() {
    const off = narrow() || inAltView();
    const rect = (id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 ? r : null;
    };
    const ses = rect('sessions');
    const map = L.mapMode === 'pip' || L.mapMode === 'hidden' ? null : rect('mapwrap');
    const right = rect('right');
    const bottom = rect('bottom');
    const put = (g, box) => {
      const x = box ? Math.round(box.x) : 0;
      const y = box ? Math.round(box.y) : 0;
      const w = box ? Math.round(box.w) : 0;
      const h = box ? Math.round(box.h) : 0;
      g.hidden = off || !box || w <= 0 || h <= 0;
      if (g.hidden) return;
      Object.assign(g.style, { left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` });
    };

    // Sessions vertical sash: between col 2 and col 3 whenever col 3 has content
    const appR = app.getBoundingClientRect();
    const hasCol3 = ses && ses.right < appR.right - 40;
    put(grid.sess, ses && hasCol3 ? { x: ses.right, y: ses.top, w: 8, h: ses.height } : null);

    // Right column vertical sash: between col 3 and col 4 (center/right/bottom modes when split)
    let rightBox = null;
    if (L.mapMode === 'center' && map && right) rightBox = { x: map.right, y: right.top, w: right.left - map.right, h: right.height };
    else if (L.mapMode === 'right' && right && map) rightBox = { x: right.right, y: map.top, w: map.left - right.right, h: map.height };
    else if (L.mapMode === 'bottom' && bottom && map) rightBox = { x: bottom.right, y: map.top, w: map.left - bottom.right, h: map.height };
    put(grid.right, rightBox);

    // Bottom row horizontal sash: only where row 2 and row 3 meet
    let botBox = null;
    const noRight = app.classList.contains('no-right');
    const noBottom = app.classList.contains('no-bottom');
    if (L.mapMode === 'bottom') {
      if (map && !(noRight && noBottom && L.sessTall)) {
        const left = !noRight && bottom ? bottom.left : map.left;
        const top = !noRight && bottom ? Math.min(bottom.top, map.top) : map.top;
        botBox = { x: left, y: top - 8, w: map.right - left, h: 8 };
      }
    } else if (bottom && !noBottom && !((L.mapMode === 'pip' || L.mapMode === 'hidden') && noRight)) {
      const hasRow2 = !noRight || L.mapMode === 'center' || L.mapMode === 'right';
      if (hasRow2) botBox = { x: bottom.left, y: bottom.top - 8, w: bottom.width, h: 8 };
    }
    put(grid.bottom, botBox);
  }

  // ---------- moving panels between right column and bottom row ----------
  let pending = null;
  app.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || (MAC && e.ctrlKey) || narrow()) return;
    const h = e.target.closest('.pl-panel > header');
    if (!h || e.target.closest('button, a, input, select, .pl-btn, [role="button"]')) return;
    pending = { id: h.parentElement.id, x: e.clientX, y: e.clientY, pointer: e.pointerId };
  });
  addEventListener('pointermove', (e) => {
    if (!pending || drag || (pending.pointer != null && e.pointerId != null && e.pointerId !== pending.pointer)) return;
    if (Math.hypot(e.clientX - pending.x, e.clientY - pending.y) < 6) return;
    startMove(pending.id, e);
    pending = null;
  });
  addEventListener('pointerup', (e) => {
    if (pending && (e.pointerId == null || e.pointerId === pending.pointer)) pending = null;
  });

  function startMove(id, e) {
    clearSel();
    const p = panel(id);
    const r = p.getBoundingClientRect();
    const w = Math.round(Math.min(r.width, 320));
    const h = Math.round(Math.min(r.height, 160));
    const ghost = document.createElement('div');
    ghost.className = 'pl-ghost';
    ghost.innerHTML = `<span class="tag"></span>`;
    ghost.querySelector('.tag').textContent = nameOf(id);
    Object.assign(ghost.style, { width: `${w}px`, height: `${h}px` });
    document.body.appendChild(ghost);
    const ph = document.createElement('div');
    ph.className = 'pl-ph';
    ph.style.flex = p.style.flex;
    p.parentElement.insertBefore(ph, p);
    p.classList.add('pl-dragging');
    drag = {
      kind: 'move',
      pointerId: e.pointerId,
      id,
      ghost,
      ph,
      dx: Math.round(Math.max(0, Math.min(e.clientX - r.left, Math.max(0, w - 20)))),
      dy: Math.round(Math.max(0, Math.min(e.clientY - r.top, 12))),
    };
    app.classList.add('pl-moving');
    app.classList.remove('no-right', 'no-bottom');
    onMoveMove(e);
  }

  function onMoveMove(e) {
    const { ghost, ph } = drag;
    ghost.style.transform = `translate3d(${Math.round(e.clientX - drag.dx)}px, ${Math.round(e.clientY - drag.dy)}px, 0)`;
    let best = null, dist = Infinity;
    for (const a of ['right', 'bottom']) {
      const box = AREAS[a].el();
      const r = box.getBoundingClientRect();
      const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
      const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
      const d = Math.hypot(dx, dy);
      if (d < dist) (dist = d), (best = a);
    }
    const box = AREAS[best].el();
    const axis = AREAS[best].axis;
    const others = [...box.children].filter((c) => c.classList.contains('pl-panel') && !c.classList.contains('pl-hidden') && !c.classList.contains('pl-dragging'));
    let before = null;
    for (const c of others) {
      const r = c.getBoundingClientRect();
      if (axis === 'y' ? e.clientY < r.top + r.height / 2 : e.clientX < r.left + r.width / 2) {
        before = c;
        break;
      }
    }
    if (before) {
      if (ph.nextSibling !== before || ph.parentElement !== box) box.insertBefore(ph, before);
    } else if (ph.parentElement !== box || ph !== box.lastElementChild) box.appendChild(ph);
    ph.style.flex = '1 1 0px';
    document.querySelectorAll('.pl-drop').forEach((x) => x.classList.toggle('pl-drop', x === box));
    box.classList.add('pl-drop');
  }

  function onMoveEnd(_e, cancel) {
    const { id, ghost, ph } = drag;
    const p = panel(id);
    ghost.remove();
    if (!cancel) {
      const box = ph.parentElement;
      const to = box.id === 'right' ? 'right' : 'bottom';
      const from = areaOf(id);
      box.insertBefore(p, ph);
      for (const a of ['right', 'bottom']) {
        L[a] = [...AREAS[a].el().children].filter((c) => c.classList.contains('pl-panel')).map((c) => c.id);
      }
      if (from !== to) {
        delete L.grow[id];
        const gs = L[to].filter((x) => x !== id && L.grow[x] > 0).map((x) => L.grow[x]);
        if (gs.length) L.grow[id] = gs.reduce((t, g) => t + g, 0) / gs.length;
      }
    }
    ph.remove();
    p.classList.remove('pl-dragging');
    document.querySelectorAll('.pl-drop').forEach((x) => x.classList.remove('pl-drop'));
    app.classList.remove('pl-moving');
    drag = null;
    apply();
    if (!cancel) save();
  }

  // ---------- top bar #panels button & visual Edit Mode bar ----------
  const btn = document.createElement('button');
  btn.id = 'panels';
  btn.type = 'button';
  btn.className = 'topbtn icon';
  btn.title = `Customize dashboard layout (${OPT}E)`;
  btn.innerHTML = '<svg viewBox="0 0 16 16"><rect x="1.8" y="2.2" width="12.4" height="11.6" rx="1.2"/><path d="M1.8 10h12.4M10 2.2V10M6 10v3.8"/></svg>';
  const settingsBtn = document.getElementById('settings');
  settingsBtn?.parentElement.insertBefore(btn, settingsBtn);
  btn.addEventListener('click', () => setEditMode(!editMode));

  let popModalSent = false;
  function syncPopModal(open) {
    if (open === popModalSent) return;
    if (!open && hasBlockingModal()) {
      popModalSent = false;
      return;
    }
    popModalSent = open;
    try {
      window.webkit?.messageHandlers?.radar?.postMessage({ type: 'modal', open });
    } catch {}
  }

  function positionEditBar() {
    if (!editBar || !topEl) return;
    const r = topEl.getBoundingClientRect();
    Object.assign(editBar.style, {
      left: `${Math.round(r.left)}px`,
      top: `${Math.round(r.bottom + 6)}px`,
      width: `${Math.round(r.width)}px`,
    });
    const h = editBar.getBoundingClientRect().height;
    if (h > 0) app.style.setProperty('--editbar-h', `${Math.round(h)}px`);
  }

  function closePop(keepModal = false) {
    if (!pop) return;
    pop.remove();
    pop = null;
    popAnchor?.classList.remove('on');
    popAnchor = null;
    removeEventListener('mousedown', popOutside, true);
    if (!keepModal) syncPopModal(false);
  }

  function popOutside(e) {
    if (pop && !pop.contains(e.target) && !popAnchor?.contains(e.target)) closePop();
  }

  function openPop(anchor, kind) {
    if (pop && popAnchor === anchor) return closePop();
    closePop(true);
    popAnchor = anchor;
    anchor.classList.add('on');
    pop = document.createElement('div');
    pop.className = 'pl-pop panel';
    pop.dataset.kind = kind;
    document.body.appendChild(pop);
    paintPop();
    const vw = document.documentElement.clientWidth || innerWidth;
    const vh = document.documentElement.clientHeight || innerHeight;
    const r = anchor.getBoundingClientRect();
    const top = Math.round(Math.min(r.bottom + 5, Math.max(8, vh - pop.offsetHeight - 8)));
    pop.style.top = `${top}px`;
    const left = Math.min(r.left, vw - pop.offsetWidth - 8);
    pop.style.left = `${Math.max(8, Math.round(left))}px`;

    pop.addEventListener('click', (e) => {
      const del = e.target.closest('.pl-del-slot');
      if (del) {
        e.stopPropagation();
        clearSlot(Number(del.dataset.slot));
        return paintPop();
      }
      const row = e.target.closest('[data-act]');
      if (!row) return;
      const act = row.dataset.act;
      if (act === 'panel') {
        setHidden(row.dataset.id, !isHidden(row.dataset.id));
        paintPop();
      } else if (act === 'map') {
        setMapMode(L.mapMode === 'hidden' ? lastNonHiddenMap : 'hidden');
        paintPop();
      } else if (act === 'preset') {
        const p = PRESETS.find((x) => x.id === row.dataset.id);
        if (p) applyLayoutSnapshot(p.build(), `Layout: ${p.name}`);
        closePop();
      } else if (act === 'save-slot') {
        saveToSlot(Number(row.dataset.slot));
        closePop();
      }
    });

    addEventListener('mousedown', popOutside, true);
    syncPopModal(true);
  }

  function paintPop() {
    if (!pop) return;
    const kind = pop.dataset.kind;
    if (kind === 'panels') {
      const row = (id) =>
        `<button type="button" class="pl-row${isHidden(id) ? '' : ' on'}" data-act="panel" data-id="${id}"><i class="pl-sw"><i></i></i><span>${nameOf(id)}</span></button>`;
      pop.innerHTML =
        `<div class="pl-h">MAP</div>` +
        `<button type="button" class="pl-row${L.mapMode !== 'hidden' ? ' on' : ''}" data-act="map"><i class="pl-sw"><i></i></i><span>orbit.map</span><small>${L.mapMode}</small></button>` +
        '<div class="pl-h">RIGHT COLUMN</div>' + L.right.map(row).join('') +
        '<div class="pl-h">BOTTOM ROW</div>' + L.bottom.map(row).join('') +
        '<div class="pl-tip">drag panel grips to move · drag lines to resize</div>';
    } else if (kind === 'presets') {
      pop.innerHTML =
        '<div class="pl-h">LAYOUT PRESETS</div>' +
        PRESETS.map((p) =>
          `<button type="button" class="pl-row pl-preset" data-act="preset" data-id="${p.id}">` +
            `<b>${p.name}${p.hotkey ? ` <kbd style="font-size:9px;opacity:0.7;padding:1px 4px;border:1px solid currentColor;border-radius:3px;">${p.hotkey}</kbd>` : ''}</b>` +
            `<span>${p.desc}</span>` +
          `</button>`
        ).join('') +
        `<div class="pl-tip">instant switch: ${OPT}1..4</div>`;
    } else if (kind === 'save') {
      pop.innerHTML =
        '<div class="pl-h">SAVE CURRENT LAYOUT TO SLOT</div>' +
        SLOTS.map((s, i) =>
          `<button type="button" class="pl-row${s ? ' on' : ''}" data-act="save-slot" data-slot="${i}">` +
          `<span>Slot ${i + 1}</span>` +
          `<small>${s ? 'overwrite' : 'empty'}</small>` +
          (s ? `<span class="pl-del-slot" data-slot="${i}" title="Clear Slot ${i + 1}">×</span>` : '') +
          `</button>`
        ).join('') +
        `<div class="pl-tip">switch anytime with ${CTRL_OPT}1..4</div>`;
    }
  }

  function createEditBar() {
    if (editBar) return;
    editBar = document.createElement('div');
    editBar.className = 'pl-editbar';
    editBar.setAttribute('role', 'toolbar');
    editBar.setAttribute('aria-label', 'Dashboard layout editor');
    editBar.innerHTML = `
      <span class="pl-eb-tag">EDIT LAYOUT</span>
      <span class="pl-eb-grp">
        <span class="pl-eb-lbl">Sessions</span>
        <button type="button" class="pl-eb-btn" data-eb="tall" title="Extend sessions list to the bottom row">Tall</button>
        <span class="pl-seg" data-seg="density">${DENSITIES.map((d) => `<button type="button" data-density="${d.id}" title="${d.title}">${d.label}</button>`).join('')}</span>
      </span>
      <span class="pl-eb-sep"></span>
      <span class="pl-eb-grp">
        <span class="pl-eb-lbl">Map</span>
        <span class="pl-seg" data-seg="map">${MAP_MODES.map((m) => `<button type="button" data-map="${m.id}" title="${m.title}">${m.label}</button>`).join('')}</span>
      </span>
      <span class="pl-eb-sep"></span>
      <span class="pl-eb-grp">
        <span class="pl-eb-lbl">Slots</span>
        <span class="pl-slots">${[0, 1, 2, 3].map((i) => `<button type="button" class="pl-slot-btn" data-slot="${i}"><i class="pl-slot-dot"></i><span>${i + 1}</span></button>`).join('')}</span>
        <button type="button" class="pl-eb-btn" data-eb="save" title="Save current layout into Slot 1–4">Save ▾</button>
      </span>
      <span class="pl-eb-sep"></span>
      <span class="pl-eb-grp">
        <button type="button" class="pl-eb-btn" data-eb="presets" title="Apply a ready-made layout preset">Presets ▾</button>
        <button type="button" class="pl-eb-btn" data-eb="panels" title="Show or hide individual panels">Panels ▾</button>
      </span>
      <span class="pl-eb-right">
        <button type="button" class="pl-eb-btn danger" data-eb="reset" title="Reset active layout to default">Reset</button>
        <button type="button" class="pl-eb-btn primary" data-eb="done" title="Finish editing (${OPT}E or Esc)">Done</button>
      </span>`;

    editBar.addEventListener('click', (e) => {
      const d = e.target.closest('[data-density]');
      if (d) return setSessDensity(d.dataset.density);
      const m = e.target.closest('[data-map]');
      if (m) return setMapMode(m.dataset.map);
      const slot = e.target.closest('[data-slot]');
      if (slot) {
        const idx = Number(slot.dataset.slot);
        if (SLOTS[idx]) loadSlot(idx);
        else saveToSlot(idx);
        return;
      }
      const act = e.target.closest('[data-eb]');
      if (!act) return;
      const k = act.dataset.eb;
      if (k === 'tall') setSessTall(!L.sessTall);
      else if (k === 'save') openPop(act, 'save');
      else if (k === 'presets') openPop(act, 'presets');
      else if (k === 'panels') openPop(act, 'panels');
      else if (k === 'reset') {
        closePop();
        applyLayoutSnapshot(fresh(), 'Layout reset to default');
      } else if (k === 'done') {
        setEditMode(false);
      }
    });

    editBar.addEventListener('contextmenu', (e) => {
      const slot = e.target.closest('[data-slot]');
      if (!slot) return;
      e.preventDefault();
      saveToSlot(Number(slot.dataset.slot));
    });

    document.body.appendChild(editBar);
    ro.observe(editBar);
    positionEditBar();
  }

  function destroyEditBar() {
    closePop();
    if (!editBar) return;
    ro.unobserve(editBar);
    editBar.remove();
    editBar = null;
    app.style.removeProperty('--editbar-h');
  }

  function paintEditUI() {
    btn.classList.toggle('on', editMode);
    if (mapCtl) {
      mapCtl.querySelectorAll('[data-map]').forEach((b) => b.classList.toggle('on', b.dataset.map === L.mapMode));
      mapCtl.querySelectorAll('[data-corner]').forEach((b) => b.classList.toggle('on', L.mapMode === 'pip' && b.dataset.corner === L.pip.corner));
    }
    if (pop) paintPop();
    if (!editBar) return;

    editBar.querySelector('[data-eb="tall"]')?.classList.toggle('on', !!L.sessTall);
    editBar.querySelectorAll('[data-density]').forEach((b) => b.classList.toggle('on', b.dataset.density === L.sessDensity));
    editBar.querySelectorAll('[data-map]').forEach((b) => b.classList.toggle('on', b.dataset.map === L.mapMode));

    const matchIdx = activeSlotIndex();
    editBar.querySelectorAll('[data-slot]').forEach((b) => {
      const i = Number(b.dataset.slot);
      const s = SLOTS[i];
      b.classList.toggle('filled', !!s);
      b.classList.toggle('on', i === matchIdx);
      b.title = s
        ? `${s.name} (${CTRL_OPT}${i + 1}) · click to load · right-click to overwrite`
        : `Slot ${i + 1} (empty) · click to save current layout`;
    });

    const pBtn = editBar.querySelector('[data-eb="panels"]');
    if (pBtn) {
      const hiddenCount = L.hidden.length + (L.mapMode === 'hidden' ? 1 : 0);
      pBtn.textContent = hiddenCount ? `Panels (${hiddenCount} off) ▾` : 'Panels ▾';
    }
  }

  function setEditMode(on) {
    const next = !!on;
    if (next && inAltView()) window.GitView?.view?.('dash');
    if (next === editMode) return;
    editMode = next;
    if (!editMode) {
      pending = null;
      if (drag) drag.kind === 'move' ? onMoveEnd(null, true) : endDrag();
    }
    app.classList.toggle('edit-mode', editMode);
    for (const id of ALL) {
      const h = panel(id)?.querySelector(':scope > header');
      if (!h) continue;
      if (editMode) {
        if (!h.dataset.origTitle) h.title = 'Drag to move this panel';
      } else {
        if (h.dataset.origTitle) h.title = h.dataset.origTitle;
        else h.removeAttribute('title');
      }
    }
    if (editMode) {
      createEditBar();
      requestAnimationFrame(() => {
        positionEditBar();
        placeGridSashes();
        placePip();
      });
    } else {
      destroyEditBar();
      save(true);
      requestAnimationFrame(() => {
        placeGridSashes();
        placePip();
      });
    }
    paintEditUI();
  }

  // ---------- keyboard shortcuts (never steal input from terminals, code editors, notes, or modals) ----------
  const TYPING_SEL = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), .np-ed, .monaco-editor, .xterm, .cm-editor';

  function isTypingTarget(t) {
    const check = (el) => !!(el && el instanceof Element && (el.isContentEditable || el.closest(TYPING_SEL)));
    return check(t) || check(document.activeElement);
  }

  function hasBlockingModal() {
    return !!document.querySelector('#cloudui.on, .askbox, #shortcuts.on, #cheatsheet, #picker.on, #danger-panel, .pk-veil, #arcmodal, .mn-confirm, .acct-confirm, .pe-crop-wrap, .pic-zoom');
  }

  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      if (drag && drag.kind === 'move') {
        e.stopImmediatePropagation();
        return onMoveEnd(null, true);
      }
      if (drag && (drag.kind === 'pip-move' || drag.kind === 'pip-res')) {
        e.stopImmediatePropagation();
        if (drag.origPip) L.pip = { ...drag.origPip };
        placePip();
        syncMapHud();
        return endDrag();
      }
      if (pop) {
        e.stopImmediatePropagation();
        return closePop();
      }
      if (editMode && !hasBlockingModal() && !document.querySelector('.pn-ctx, .mn-ctx, .bdg-ctx, .pk-ctx, .acct-menu')) {
        e.stopImmediatePropagation();
        return setEditMode(false);
      }
      return;
    }

    if (e.isComposing || e.repeat || e.metaKey || e.shiftKey || hasBlockingModal() || isTypingTarget(e.target)) return;

    // Option+E (macOS) / Alt+E (Windows) toggles visual Edit Mode.
    // Match e.code strictly because macOS Option+E produces a dead key in e.key.
    if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && e.code === 'KeyE') {
      e.preventDefault();
      e.stopPropagation();
      return setEditMode(!editMode);
    }

    // Option+1..4 (macOS) / Alt+1..4 (Windows) switches layout themes / presets.
    // Match e.code ('Digit1'..'Digit4') because macOS Option+1..4 produces '¡', '™', '£', '¢' in e.key.
    const digitMatch = /^Digit([1-4])$/.exec(e.code || '');
    if (!digitMatch) return;

    if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      const idx = Number(digitMatch[1]) - 1;
      e.preventDefault();
      e.stopPropagation();
      if (PRESETS[idx]) {
        const p = PRESETS[idx];
        applyLayoutSnapshot(p.build(), `Theme: ${p.name} (${OPT}${idx + 1})`);
      }
      return;
    }

    // Ctrl+Option+1..4 (macOS) / Ctrl+Alt+1..4 (Windows) switches custom layout slot (skip AltGraph on Windows international keyboards).
    if (e.ctrlKey && e.altKey && !e.metaKey && !e.shiftKey && (!WIN || !e.getModifierState?.('AltGraph'))) {
      const idx = Number(digitMatch[1]) - 1;
      e.preventDefault();
      e.stopPropagation();
      if (!loadSlot(idx)) notify(`Slot ${idx + 1} is empty · open Edit Mode (${OPT}E) to save`);
    }
  }, true);

  // ---------- observers & initialization ----------
  const syncViewport = () => {
    if (editMode) positionEditBar();
    placeGridSashes();
    placePip();
    syncMapHud();
  };
  const ro = new ResizeObserver(syncViewport);
  for (const id of ['top', 'sessions', 'mapwrap', 'right', 'bottom']) {
    const el = document.getElementById(id);
    if (el) ro.observe(el);
  }
  addEventListener('resize', syncViewport);
  addEventListener('scroll', syncViewport, { passive: true });
  new MutationObserver(() => {
    if (editMode && inAltView()) setEditMode(false);
    placeGridSashes();
    placePip();
  }).observe(app, { attributes: true, attributeFilter: ['class'] });

  apply();
  requestAnimationFrame(() => {
    placeGridSashes();
    placePip();
    syncMapHud();
  });

  return {
    visible: (id) => !isHidden(id),
    hide: (id) => ALL.includes(id) && setHidden(id, true),
    reset() {
      applyLayoutSnapshot(fresh(), 'Layout reset to default');
    },
    editMode: () => editMode,
    setEditMode,
    setMapMode,
    setSessTall,
    setSessDensity,
    snapPipCorner,
    saveSlot: saveToSlot,
    loadSlot,
    clearSlot,
    slots: () => SLOTS.map((s) => (s ? { ...s, layout: cloneLayout(s.layout) } : null)),
    state: () => cloneLayout(L),
  };
})();
