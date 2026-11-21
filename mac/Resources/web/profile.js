'use strict';

// Your profile beyond the name: a picture of your own in place of GitHub's, and links to your other pages (GitHub,
// LinkedIn, X, Instagram, YouTube, a website) on your card where friends and the leaderboard see it. And anyone's picture
// big: a click on the one on a card (a friend's, the leaderboard's, your own) opens it across the view, as Steam and
// Discord do.
//
// The picture and the links live on the server (src/profile.ts) once `GET v1/account` says it takes them
// (`methods.profile`); a card shows someone's links once the API sends them (`links` on a friend in v1/social and on a
// leaderboard row). They're changed on your profile page, in its "Edit profile" panel (profile-edit.js), with what's
// here: the sites and how a page of each looks, the picture cut square, the calls. Settings › Account has a row that
// opens it. The API it expects:
//   GET    v1/account   → { …, methods: { …, profile: true }, links: { github: url, … }, avatarCustom: bool }
//   PUT    v1/me/profile  { links: { github?, linkedin?, … }, sites: [the site ids here] } → { links }
//          (only the sites in `sites` change: a site an older app doesn't know keeps its link)
//   PUT    v1/me/avatar   { image: "data:image/jpeg;base64,…" }  (512×512, ≤ 300 KB)            → { avatar }
//   DELETE v1/me/avatar   → { avatar }  (GitHub's again once signed in with it, none otherwise)
// The links go as full https addresses, the ones normalize() makes; the server checks them the same way (only these
// sites, https, no user:password@) and serves its pictures with a new address each time one changes.
window.Profile = (() => {
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const say = (m) => (typeof window.toast === 'function' ? window.toast(m) : console.warn(m));
  const h = window.webkit && window.webkit.messageHandlers;
  const api = (method, path, body) =>
    h && h.cloud ? h.cloud.postMessage({ type: 'social', method, path, body }).catch(() => ({ error: 'offline' })) : Promise.resolve({ error: 'offline' });

  // ---------- links ----------
  // The sites' marks in one colour (currentColor): GitHub's, LinkedIn's, X's, Instagram's and YouTube's own (as Simple
  // Icons draws them), a globe for a website, a chain for an address that isn't one of them yet.
  const GH = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>';
  const fill = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
  const line = (body) => `<svg class="ln" viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
  const ICONS = {
    github: GH,
    linkedin: fill('M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0h.01z'),
    x: fill('M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z'),
    instagram: line('<rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5.25"/><circle cx="12" cy="12" r="4.3"/><circle class="dot" cx="17.4" cy="6.6" r="1.25"/>'),
    youtube: fill('M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z'),
    website: line('<circle cx="12" cy="12" r="9.25"/><path d="M2.75 12h18.5M12 2.75c2.45 2.55 3.7 5.63 3.7 9.25s-1.25 6.7-3.7 9.25c-2.45-2.55-3.7-5.63-3.7-9.25S9.55 5.3 12 2.75z"/>'),
    link: line('<path d="M10.3 13.7a4 4 0 0 0 5.65 0l3.2-3.2a4 4 0 0 0-5.65-5.65l-1.1 1.1"/><path d="M13.7 10.3a4 4 0 0 0-5.65 0l-3.2 3.2a4 4 0 0 0 5.65 5.65l1.1-1.1"/>'),
  };
  // Each site: the hosts it answers on, the page address it takes from a name (`handle`) and how a page of it looks,
  // and how to say what one looks like when an address isn't one (`what`, `fix`). Anything else isn't a link here: a
  // card never links somewhere these didn't make. In the order cards show them, GitHub first for developers.
  const SITES = [
    { id: 'github', label: 'GitHub', glyph: ICONS.github, hosts: ['github.com'], handle: /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/, page: (n) => `/${n}`, path: /^\/([A-Za-z0-9](?:[A-Za-z0-9-]{0,38}))\/?$/, what: 'a GitHub profile', fix: 'github.com/your-name' },
    { id: 'linkedin', label: 'LinkedIn', glyph: ICONS.linkedin, hosts: ['linkedin.com'], handle: /^[A-Za-z0-9_-]{3,100}$/, page: (n) => `/in/${n}`, path: /^\/in\/([A-Za-z0-9_-]{3,100})\/?$/, what: 'a LinkedIn profile', fix: 'linkedin.com/in/your-name' },
    { id: 'x', label: 'X', glyph: ICONS.x, hosts: ['x.com', 'twitter.com'], handle: /^[A-Za-z0-9_]{1,15}$/, page: (n) => `/${n}`, path: /^\/([A-Za-z0-9_]{1,15})\/?$/, what: 'an X profile', fix: 'x.com/your-name' },
    { id: 'instagram', label: 'Instagram', glyph: ICONS.instagram, hosts: ['instagram.com'], handle: /^[A-Za-z0-9._]{1,30}$/, page: (n) => `/${n}`, path: /^\/([A-Za-z0-9._]{1,30})\/?$/, what: 'an Instagram profile', fix: 'instagram.com/your-name' },
    { id: 'youtube', label: 'YouTube', glyph: ICONS.youtube, hosts: ['youtube.com'], handle: /^@?[A-Za-z0-9._-]{3,30}$/, page: (n) => `/@${n.replace(/^@/, '')}`, path: /^\/(@[A-Za-z0-9._-]{3,30})\/?$/, what: 'a YouTube channel', fix: 'youtube.com/@your-channel' },
    { id: 'website', label: 'Website', glyph: ICONS.website, what: 'a website', fix: 'https://your-site.com' },
  ];
  const site = (id) => SITES.find((s) => s.id === id);
  const MAX_URL = 200;
  // The site's own host, as a page of it shows it (www. and m. too, LinkedIn's country ones as tr.), x.com for
  // twitter.com.
  const canonHost = (s, host) => {
    const bare = host.toLowerCase().replace(s.id === 'linkedin' ? /^(www|m|mobile|[a-z]{2})\./ : /^(www|m|mobile)\./, '');
    return s.hosts.includes(bare) ? s.hosts[0] : null;
  };

  // What was typed (a name, @name, an address with or without https://) as the page's full https address, '' for
  // nothing, null for something that isn't a page of that site.
  function normalize(id, raw) {
    const s = site(id);
    const v = String(raw ?? '').trim();
    if (!s || !v) return s ? '' : null;
    if (v.length > MAX_URL) return null;
    if (s.id === 'website') {
      let u;
      try {
        u = new URL(/^[a-z][a-z0-9+.-]*:/i.test(v) ? v : `https://${v}`);
      } catch {
        return null;
      }
      if (u.protocol !== 'https:' || u.username || u.password || !/\.[a-z]{2,}$/i.test(u.hostname)) return null;
      return u.href.length <= MAX_URL ? u.href : null;
    }
    const name = v.replace(/^@(?=.)/, s.id === 'youtube' ? '@' : '');
    if (s.handle.test(name) && !name.includes('/')) return `https://${s.hosts[0]}${s.page(name)}`;
    let u;
    try {
      u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
    } catch {
      return null;
    }
    if (u.username || u.password || (u.port && u.port !== '443')) return null;
    const host = canonHost(s, u.hostname);
    const m = host && u.pathname.match(s.path);
    return m ? `https://${host}${s.page(m[1])}` : null;
  }

  // What's typed into "Add a link" (profile-edit.js): its site, told from the address's host (any other https address
  // is a website), and its link, or what's wrong with it said as how to fix it. A bare name (atalay, @atalay) has no
  // site: `names` lists the sites it could be a page of. null for nothing typed.
  function detect(raw) {
    const v = String(raw ?? '').trim();
    if (!v) return null;
    if (v.length > MAX_URL) return { id: null, error: `That address is too long · ${MAX_URL} characters at most` };
    if (!/[./:]/.test(v)) return { id: null, names: SITES.filter((s) => s.handle && normalize(s.id, v)).map((s) => s.id) };
    let u;
    try {
      u = new URL(/^[a-z][a-z0-9+.-]*:/i.test(v) ? v : `https://${v}`);
    } catch {
      return { id: null, error: `That isn't a web address · it looks like ${site('website').fix}` };
    }
    const s = SITES.find((x) => x.hosts && canonHost(x, u.hostname)) || site('website');
    const url = normalize(s.id, v);
    if (url) return { id: s.id, url };
    if (u.username || u.password) return { id: s.id, error: "An address with a user name or password in it can't go on your card" };
    if (s.id === 'website' && /^http:$/.test(u.protocol)) return { id: s.id, error: `Only https addresses work · try https://${u.host}${u.pathname === '/' ? '' : u.pathname}` };
    return { id: s.id, error: `That isn't ${s.what} address · it looks like ${s.fix}` };
  }

  // Someone's link as the card shows it: made again by normalize(), so a card only ever links to an address of these
  // sites as this page builds it, whatever the server sent.
  const safe = (id, url) => (typeof url === 'string' && site(id) ? normalize(id, url) || null : null);
  const shortText = (id, url) => {
    const u = new URL(url);
    return id === 'website' ? u.hostname.replace(/^www\./, '') : decodeURIComponent(u.pathname.replace(/^\/(in\/)?/, '').replace(/\/$/, ''));
  };

  // The row of links on a card: a plain link each with the site's mark and a short text (the full address on hover),
  // which the app opens in the browser (RadarView on the Mac, will-navigate in Electron), never in the app.
  function links(u) {
    const L = u && u.links;
    if (!L || typeof L !== 'object') return '';
    const chips = SITES.map((s) => {
      const url = safe(s.id, L[s.id]);
      if (!url) return '';
      const text = shortText(s.id, url);
      return `<a class="pf-link pf-link-${s.id}" href="${esc(url)}" rel="noopener noreferrer" title="${esc(url)}" aria-label="${esc(`${s.label}: ${text}`)}">` +
        `<i>${s.glyph}</i><span>${esc(text)}</span></a>`;
    }).join('');
    return chips ? `<div class="pf-links">${chips}</div>` : '';
  }

  // ---------- the big picture ----------
  // GitHub's pictures come in any size (?s=); ask for one the size it shows at. The server's own come as they are.
  function bigger(src) {
    try {
      const u = new URL(src);
      if (u.hostname === 'avatars.githubusercontent.com') {
        u.searchParams.set('s', '480');
        return u.href;
      }
    } catch {}
    return src;
  }

  let zoomEl = null;
  function zoom(img) {
    closeZoom();
    const card = img.closest('[style*="--rc"]');
    const rc = card ? getComputedStyle(card).getPropertyValue('--rc').trim() : '';
    zoomEl = document.createElement('div');
    zoomEl.className = 'pic-zoom';
    zoomEl.setAttribute('role', 'dialog');
    zoomEl.setAttribute('aria-label', 'Profile picture');
    if (rc) zoomEl.style.setProperty('--rc', rc);
    const big = document.createElement('img');
    big.alt = '';
    // The small one at once (it's in the cache), the big one over it once it's here.
    big.src = img.currentSrc || img.src;
    const want = bigger(big.src);
    if (want !== big.src) {
      const pre = new Image();
      pre.onload = () => zoomEl && (big.src = want);
      pre.src = want;
    }
    zoomEl.append(big);
    zoomEl.addEventListener('click', closeZoom);
    document.body.append(zoomEl);
    requestAnimationFrame(() => zoomEl && zoomEl.classList.add('on'));
  }
  function closeZoom() {
    if (!zoomEl) return;
    zoomEl.remove();
    zoomEl = null;
  }
  // The big pictures on cards and on your profile; the small ones in lists keep picking their row.
  const ZOOMS = 'img.pf-pic, img.me-pic';
  document.addEventListener('click', (e) => {
    const img = e.target.closest && e.target.closest(ZOOMS);
    if (!img || !img.src) return;
    e.preventDefault();
    e.stopPropagation();
    zoom(img);
  }, true);
  document.addEventListener('keydown', (e) => {
    if (zoomEl && e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      closeZoom();
    }
  }, true);

  // ---------- the calls, and what their failures say ----------
  const A = () => window.Account?.state();
  // Signed in to a server that keeps pictures and links.
  const takes = () => {
    const a = A();
    return !!(a && a.signedIn && a.methods && a.methods.profile);
  };
  const ERRORS = {
    bad_link: "One of the links isn't a page of its site",
    too_large: 'The picture must be smaller than 15 MB',
    FST_ERR_CTP_BODY_TOO_LARGE: "Couldn't upload the picture · try again",
    http_413: "Couldn't upload the picture · try again",
    bad_type: 'The file must be a PNG, JPEG, WebP or GIF',
    bad_image: 'This file is empty or damaged',
    rate_limited: 'Too many tries in a minute · wait a moment and try again',
    sign_in: 'Sign in first · Settings › Account',
    signed_out: 'Not signed in to the server yet',
    offline: "Can't reach the server · try again",
  };
  // An answer with no words of its own says its code, so a failure always says why.
  const errText = (e) => ERRORS[e] || (e ? `The server said no (${e})` : 'Something went wrong · try again');

  // ---------- the picture: opened, then cut square ----------
  // PNG, JPEG, WebP and GIF (a GIF's first frame: a picture moving on every card is too much), and on the Mac an
  // iPhone's HEIC too (WebKit opens it), at most 15 MB. Kept square, 512×512 at most and small enough for the API to
  // take as it is; the frame it's shown in is only a look, so another look later needs no new pictures.
  const SIZE = 512;
  const MAX_FILE = 15 * 1024 * 1024;
  const TYPES = /^image\/(png|jpeg|webp|gif|heic|heif)$/;
  const isPicture = (file) => TYPES.test(file.type) || (!file.type && /\.(heic|heif)$/i.test(file.name || ''));
  /** A file as a picture to cut: { img, url (revoke it when done), w, h }; throws bad_type, too_large or bad_image. */
  async function open(file) {
    if (!file || !isPicture(file)) throw new Error('bad_type');
    if (file.size > MAX_FILE) throw new Error('too_large');
    if (!file.size) throw new Error('bad_image');
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((ok, no) => {
        const i = new Image();
        i.onload = () => ok(i);
        i.onerror = () => no(new Error(/heic|heif/i.test(file.type || file.name) ? 'bad_type' : 'bad_image'));
        i.src = url;
      });
      if (!img.naturalWidth || !img.naturalHeight) throw new Error('bad_image');
      return { img, url, w: img.naturalWidth, h: img.naturalHeight };
    } catch (e) {
      URL.revokeObjectURL(url);
      throw e;
    }
  }
  /** The square `box` ({ x, y, side } in the picture's pixels; the middle square without one) as the JPEG the API
   *  takes: 512×512 (smaller when the square is), the quality stepped down until it's ≤ 300 KB. */
  function cut(img, box) {
    const w = img.naturalWidth, h = img.naturalHeight;
    const side = Math.min(w, h, box ? box.side : Infinity);
    const x = box ? Math.max(0, Math.min(w - side, box.x)) : (w - side) / 2;
    const y = box ? Math.max(0, Math.min(h - side, box.y)) : (h - side) / 2;
    const c = document.createElement('canvas');
    c.width = c.height = Math.max(1, Math.min(SIZE, Math.round(side)));
    const g = c.getContext('2d');
    g.imageSmoothingQuality = 'high';
    g.drawImage(img, x, y, side, side, 0, 0, c.width, c.height);
    for (const q of [0.88, 0.78, 0.65]) {
      const data = c.toDataURL('image/jpeg', q);
      if (data.length * 0.75 <= 300 * 1024) return data;
    }
    throw new Error('too_large');
  }
  /** A file cut square as the API takes it, at `box` (the middle square without one). */
  async function square(file, box) {
    const p = await open(file);
    try {
      return cut(p.img, box);
    } finally {
      URL.revokeObjectURL(p.url);
    }
  }

  // ---------- Settings › Account: the way to it ----------
  // Settings has one row for the picture and the links (settings.js): they're changed on the profile page, where they
  // show (Apple: an option sits where its task is done). The row shows once signed in to a server that keeps them.
  // cloud.js gives the row's place each time Settings opens (none: nothing to do).
  let host = null;
  function mount(el) {
    host = el || null;
    if (!host) return;
    host.addEventListener('click', (e) => {
      if (!e.target.closest('.prof-edit')) return;
      window.Cloud?.close();
      window.Cloud?.openProfile({ edit: true });
    });
    paintRow();
  }
  // Always there: the name is changed on the profile too, signed in or not (picture and links need the account).
  function paintRow() {
    if (!host || !host.isConnected) return;
    (host.closest('.st-group') || host).hidden = false;
  }
  window.addEventListener('account', paintRow);

  // ---------- unified profile page (self, friend, friend with hidden hours, stranger) ----------
  const BACK_LABELS = {
    board: 'Leaderboard',
    friends: 'Friends',
    dash: 'Dashboard',
    themes: 'Themes',
    notifications: 'Notifications',
    roadmap: 'Roadmap',
    notes: 'Notes',
  };
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const PV_ICONS = {
    prev: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3.5 5.5 8 10 12.5"/></svg>',
    up: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 10l4-4 4 4"/></svg>',
    down: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',
    pen: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.9 2.6a1.6 1.6 0 0 1 2.3 0l.2.2a1.6 1.6 0 0 1 0 2.3L6 12.5l-3.2.7.7-3.2z"/><path d="M9.6 3.9l2.5 2.5"/></svg>',
    msg: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 3.5h11a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1H6.5L3.5 14v-2h-1a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"/></svg>',
    add: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3.5v9M3.5 8h9"/></svg>',
    check: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-6.5"/></svg>',
    more: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="3.5" cy="8" r="1.2" fill="currentColor" stroke="none"/><circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none"/><circle cx="12.5" cy="8" r="1.2" fill="currentColor" stroke="none"/></svg>',
    flame: '<svg viewBox="0 0 12 14" aria-hidden="true"><path d="M6.3.5c.6 2.3 4.2 4.1 4.2 7.8a4.5 4.5 0 1 1-9 0c0-1.9.9-3.1 1.9-3.8-.1 1.4.5 2.4 1.3 2.8-.4-2.4.4-4.7 1.6-6.8z"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  };

  let currentId = null; // null when closed, 'me' or UUID when open
  let currentOpts = {};
  let scrollWas = 0;
  let themesCache = null;
  const profileCache = new Map(); // id -> { at, data }
  const tokensCache = new Map(); // id -> { at, data }
  const heroFires = new WeakSet();
  const CACHE_MS = 60_000;

  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tagText = (t) => (t ? `#${String(t).padStart(4, '0')}` : '');
  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
    if (Number.isNaN(d.getTime())) return '';
    return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  };
  const tok = (n) => {
    n = Math.max(0, Math.floor(n || 0));
    const [d, unit] = n >= 1e9 ? [1e9, 'B'] : n >= 1e6 ? [1e6, 'M'] : n >= 1e3 ? [1e3, 'K'] : [1, ''];
    if (!unit) return String(n);
    const v = n / d;
    return `${v >= 100 ? Math.round(v) : v.toFixed(v >= 10 ? 1 : 2).replace(/\.?0+$/, '')}${unit}`;
  };
  const TOOL_NAMES = { claude: 'Claude', codex: 'Codex', antigravity: 'Antigravity' };
  const toolLabel = (t) => TOOL_NAMES[t] || (t ? t.charAt(0).toUpperCase() + t.slice(1) : '');

  const themeList = async () => {
    if (themesCache) return themesCache;
    if (!h || !h.theme) return null;
    try {
      themesCache = await h.theme.postMessage({ type: 'list' });
    } catch {
      themesCache = null;
    }
    return themesCache;
  };
  const themeStyle = (tokens) => {
    const arc = tokens['--accent-rgb'] ? `--rc:${tokens['--accent-rgb']};` : '';
    return Object.entries(tokens).map(([k, v]) => `${k}:${v}`).join(';') +
      `;${arc}--panel:rgba(var(--panel-rgb),var(--glass-a));--line:rgba(var(--accent-rgb),0.32);--line-soft:rgba(var(--accent-rgb),0.13);color:var(--txt)`;
  };

  function applyOwnerTheme(themeId, isSelf) {
    const panel = document.querySelector('#profile-view .cv-me');
    const host = document.querySelector('#profile-view .me-host');
    if (!panel) return;
    const applyToRight = (accent) => {
      if (!host || !accent) return;
      host.style.setProperty('--rc', accent);
      for (const el of host.querySelectorAll('.pv-tok, .pv-lock, .me-inv')) el.style.setProperty('--rc', accent);
    };
    if (isSelf) {
      panel.removeAttribute('style');
      const myAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
      applyToRight(myAccent);
      return;
    }
    if (!themeId) {
      panel.removeAttribute('style');
      const myAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
      applyToRight(myAccent);
      return;
    }
    const expectedId = currentId;
    themeList().then((list) => {
      if (!list || !list.themes || currentId !== expectedId || !currentId || currentId === 'me') return;
      const t = list.themes.find((x) => x.id === themeId) || list.themes[0];
      if (t && t.tokens) {
        panel.setAttribute('style', themeStyle(t.tokens));
        applyToRight(t.tokens['--accent-rgb']);
      }
    });
  }

  function howXPHTML(level, goal) {
    const Xp = window.Xp;
    if (!Xp) return '';
    const ranks = Xp.RANKS.map((k) => {
      const state = level > k.to ? 'done' : level >= k.from ? 'now' : 'next';
      return `<div class="pf-rk ${state}" style="--rc:${k.color}"><i></i><b>${k.name}</b><span>level ${k.from}–${k.to}</span><em>${state === 'done' ? '✓' : state === 'now' ? 'you' : ''}</em></div>`;
    }).join('');
    return (
      '<details class="pp-how"><summary>How XP and ranks work</summary><div class="pp-how-in">' +
      `<div><h3 class="pp-h">RANKS</h3><div class="pf-ranks">${ranks}</div></div>` +
      '<div><h3 class="pp-h">XP</h3><ul class="pp-rules"><li>1 XP for every active minute</li><li>The first 2 hours a day count double, past 8 hours half</li>' +
      '<li>+50 XP for showing up</li>' +
      `<li>${goal || 3} days a week with 30+ minutes keep a streak · +10% XP for every week of it</li>` +
      '<li>16 hours a day and 70 hours in 7 days count at most</li></ul></div></div></details>'
    );
  }

  function tokensHTML(tokData, rc) {
    if (!tokData || tokData.error || tokData.hidden || !tokData.week) return '';
    const total = Math.max(1, tokData.week.tokens || 0);
    const stat = (label, value) => `<div><label>${label}</label><b>${value}</b></div>`;
    const tools = (tokData.tools || []).filter((t) => t.tokens > 0);
    const rows = tools.map((t) => {
      const tw = Math.max(1, Math.min(100, Math.round((t.tokens / total) * 100)));
      const models = (t.models || []).filter((m) => m.tokens > 0).map((m) => {
        const mw = Math.max(1, Math.min(100, Math.round((m.tokens / total) * 100)));
        const efforts = (m.efforts || []).filter((e) => e.tokens > 0 && e.effort && e.effort !== 'none');
        const effHTML = efforts.length > 1
          ? `<div class="tk-e">${efforts.map((e) => `<em>${esc(e.effort)} <b>${tok(e.tokens)}</b></em>`).join('')}</div>`
          : '';
        return `<div class="tk-m"><b>${esc(m.model)}</b><i><i style="width:${mw}%"></i></i><span>${tok(m.tokens)}</span></div>${effHTML}`;
      }).join('');
      return `<div class="tk-t"><b>${esc(toolLabel(t.tool))}</b><i><i style="width:${tw}%"></i></i><span>${tok(t.tokens)}</span></div>${models}`;
    }).join('');
    if (!tokData.week.tokens && !tokData.all?.tokens && !tools.length) return '';
    return (
      `<section class="pv-tok" style="--rc:${rc}"><h2>TOKENS<span>· input, output and cache writes · cache reads and reasoning apart</span></h2>` +
      `<div class="pf-stats">${stat('THIS WEEK', tok(tokData.week.tokens))}${stat('ALL TIME', tok(tokData.all?.tokens || 0))}${stat('CACHE READS', tok(tokData.week.cache_read || 0))}${stat('REASONING', tok(tokData.week.reasoning || 0))}</div>` +
      (rows ? `<div class="tk-ai">${rows}</div>` : '') +
      '</section>'
    );
  }

  function buildPersonData(id, opts) {
    const Social = window.Social;
    const S = Social?.state();
    const isSelf = id === 'me' || (S?.me?.id && id === S.me.id);
    const cached = profileCache.get(isSelf ? 'me' : id)?.data || null;
    const statsData = window.ProfileStats?.data?.(isSelf ? 'me' : id) || null;
    const prof = (cached && !cached.error ? cached : null) || (statsData && !statsData.error ? statsData : null);
    const seed = opts?.seed || null;
    const f = !isSelf ? Social?.friend(id) : null;
    const relation = isSelf ? 'self'
      : prof?.relation || (f ? 'friend' : S?.outgoing?.some((r) => r.to?.id === id) ? 'requested' : S?.incoming?.some((r) => r.from?.id === id) ? 'asked' : 'none');
    return { isSelf, prof, seed, f, relation };
  }

  function renderPerson(animate) {
    const view = document.getElementById('profile-view');
    if (!view || !currentId) return;
    hearBadges();
    const panel = view.querySelector('.cv-me');
    const host = view.querySelector('.me-host');
    const metaEl = view.querySelector('.cv-me > header .meta');
    if (!host) return;

    const targetKey = currentId === 'me' ? 'me' : currentId;
    const cachedEntry = profileCache.get(targetKey);
    // Your own page never says "isn't available": it draws from what is local, and the hours say they can't load.
    if (cachedEntry?.data?.error && !currentOpts.seed && currentId !== 'me') {
      applyOwnerTheme(null, true);
      host.classList.add('pv-body');
      host.classList.remove('pv-visit');
      document.body.classList.remove('pv-visiting');
      const backLabel = BACK_LABELS[currentOpts.from] || 'Leaderboard';
      host.innerHTML =
        `<div class="pv-top"><button type="button" class="bd-glassbtn" data-pv-back title="Back · Esc">${PV_ICONS.prev}${esc(backLabel)}</button></div>` +
        `<div class="pv-avail">This profile isn't available.</div>`;
      if (metaEl) metaEl.textContent = '';
      return;
    }

    const { isSelf, prof, seed, f, relation } = buildPersonData(currentId, currentOpts);
    const Xp = window.Xp;
    const Social = window.Social;
    const A = window.Account?.state();
    const look = isSelf ? (window.ProfileEdit?.look(A) || null) : null;
    const src = prof || seed || f || {};
    const name = (isSelf ? (src.name || A?.name) : (src.name || f?.name)) || 'hacker';
    const tag = src.tag ?? f?.tag;
    const level = src.level ?? f?.xp?.level ?? 1;
    const r = Xp ? Xp.rank(level) : { name: 'Hacker', color: '248, 128, 8' };
    const rc = r.color;
    const isFriend = relation === 'friend';
    const profLoading = !prof && !cachedEntry?.data?.error;
    const isHidden = !isSelf && (prof ? !!prof.hidden : !isFriend);
    // A friend who hides their hours still answers hidden:true, so the answer wins over the friendship once it is here.
    const showHours = isSelf || (prof ? !prof.hidden : isFriend);
    const hoursPending = !isSelf && !isFriend && profLoading;
    const avatar = isSelf ? (look ? look.avatar : (A?.signedIn ? A.avatar : src.avatar)) : (src.avatar ?? f?.avatar ?? null);
    const fire = !isSelf && isHidden ? 0 : (src.fire || 0);
    const nick = isFriend ? (prof?.nick ?? f?.nick ?? null) : null;
    const presence = isSelf ? (Social?.state()?.me?.status || 'offline') : (isFriend ? (prof?.presence || f?.presence || 'offline') : null);
    const themeId = prof?.theme ?? seed?.theme ?? f?.theme ?? null;
    let themeAccentRgb = null;
    if (themesCache?.themes) {
      const activeThemeId = isSelf ? (themesCache.chosen || 'atalay') : themeId;
      const th = themesCache.themes.find((t) => t.id === activeThemeId);
      if (th?.tokens?.['--accent-rgb']) themeAccentRgb = th.tokens['--accent-rgb'];
    }
    if (!themeAccentRgb && isSelf) {
      themeAccentRgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || null;
    }
    const colorRc = themeAccentRgb || rc;

    host.classList.add('pv-body');
    host.style.setProperty('--rc', colorRc);
    host.classList.toggle('pv-visit', !isSelf);
    document.body.classList.toggle('pv-visiting', !isSelf);
    applyOwnerTheme(themeId, isSelf);

    if (isSelf) window.ProfileEdit?.sync({ name, tag: tagText(tag), rc });

    const backLabel = BACK_LABELS[currentOpts.from] || 'Leaderboard';
    const list = Array.isArray(currentOpts.list) ? currentOpts.list : null;
    let stepper = '';
    if (list && list.length) {
      const idx = list.findIndex((x) => x.id === (prof?.id || currentId));
      let prevIdx = -1;
      for (let i = idx - 1; i >= 0; i--) { if (!list[i].anon && list[i].id) { prevIdx = i; break; } }
      let nextIdx = -1;
      for (let i = idx + 1; i < list.length; i++) { if (!list[i].anon && list[i].id) { nextIdx = i; break; } }
      stepper =
        `<div class="bd-glassbtn pv-step" role="group" aria-label="The board, one by one">` +
        `${idx >= 0 ? `<b>#${idx + 1}</b>&nbsp;of ${list.length}` : ''}&nbsp;` +
        `<button type="button" data-pv-go="${prevIdx >= 0 ? esc(list[prevIdx].id) : ''}" aria-label="Previous on the board" title="Previous on the board"${prevIdx >= 0 ? '' : ' disabled'}>${PV_ICONS.up}</button>` +
        `<button type="button" data-pv-go="${nextIdx >= 0 ? esc(list[nextIdx].id) : ''}" aria-label="Next on the board" title="Next on the board"${nextIdx >= 0 ? '' : ' disabled'}>${PV_ICONS.down}</button></div>`;
    }

    const acts = isSelf
      ? `<button type="button" class="pp-edit" data-me="edit" aria-expanded="${!!look}">${PV_ICONS.pen}<span>Edit profile</span></button>`
      : '<div class="pv-acts">' + (isFriend
        ? `<button type="button" class="bd-primary" data-pv-act="msg">${PV_ICONS.msg}Message</button>` +
          `<button type="button" class="bd-glassbtn pv-more" data-pv-act="more" aria-label="More: set a nickname, remove friend" title="More">${PV_ICONS.more}</button>`
        : relation === 'requested'
          ? '<span class="pv-state">Request sent</span>'
          : relation === 'asked'
            ? `<button type="button" class="bd-primary" data-pv-act="accept">${PV_ICONS.check}Accept request</button>`
            : `<button type="button" class="bd-primary" data-pv-act="add">${PV_ICONS.add}Add friend</button>`) + '</div>';

    const xpObj = prof?.xp || src.xp || null;
    const totalXp = prof?.totalXp ?? (typeof src.xp === 'number' ? src.xp : src.xp?.total) ?? 0;
    const pct = xpObj && Xp ? Xp.pct(xpObj) : 0;
    const xpLine = isSelf && xpObj
      ? `<p class="pp-xp">${xpObj.to ? `<span>${Xp.num(xpObj.xp - xpObj.from)} / ${Xp.num(xpObj.to - xpObj.from)} XP</span><b>${Xp.num(xpObj.to - xpObj.xp)} XP to level ${level + 1}</b>` : `<span>${Xp.num(xpObj.xp)} XP</span><b>top level</b>`}</p>`
      : `<p class="pp-xp"><span>${Math.round(pct)}% of level ${level}</span><b>${Xp ? Xp.num(totalXp) : totalXp} XP in all</b></p>`;

    const fireChip = fire
      ? `<span class="pv-fire${fire === 2 ? ' f2' : ''}">${PV_ICONS.flame}${fire === 2 ? 'The hottest flame · 5 fire days this week' : 'On fire today'}</span>`
      : '';
    const flameCanvas = fire && !reduced()
      ? `<canvas class="pp-fire" data-look="${fire === 2 ? 'blue' : 'orange'}" data-reach="26" aria-hidden="true"></canvas>`
      : '';

    const board = prof?.board;
    const standTile = (label, b, fmtScore) => b
      ? `<div class="pv-tile${b.pos <= 3 ? ' gold' : ''}"><label>${label}</label><b>#${b.pos}<small>of ${b.total}</small></b><span>${fmtScore(b.score)}</span></div>`
      : `<div class="pv-tile"><label>${label}</label><b>—</b><span>not ranked</span></div>`;
    const standSkel = (label) =>
      `<div class="pv-tile"><label>${label}</label><i class="bd-skel" style="width:4rem;height:1.25rem;margin:.1875rem 0"></i><i class="bd-skel" style="width:5.25rem;height:.75rem"></i></div>`;
    const standHTML = board
      ? `<div class="pv-stand">${standTile('THIS WEEK', board.week, (s) => `+${Xp.num(s)} XP`)}${standTile('ALL TIME', board.all, (s) => `${Xp.num(s)} XP`)}</div>`
      : profLoading
        ? `<div class="pv-stand">${standSkel('THIS WEEK')}${standSkel('ALL TIME')}</div>`
        : '';

    const picHTML = avatar
      ? `<img class="me-pic" alt="" src="${esc(avatar)}">`
      : `<span class="me-pic pp-mono" aria-hidden="true">${esc(name.trim().charAt(0).toUpperCase() || '?')}</span>`;
    const dotHTML = presence ? Social.dot(presence) : '';
    const nameHTML = `<h1 class="pp-name"><span>${esc(name)}</span><i class="pp-tag">${tagText(tag)}</i></h1>` +
      (nick ? `<span class="pv-nick">You call them <b>${esc(nick)}</b></span>` : '');
    const linksHTML = isSelf
      ? (look ? links({ links: look.links }) : (A?.signedIn ? links(A) : ''))
      : links({ links: prof?.links || src.links });

    // THEME and, when they have Viktoria switched on, VIKTORIA with her Mischief level (prof.mascot: null unknown,
    // -1 off, 0..3 on). Side by side; each is its own cell so a narrow window wraps them under each other.
    let themeCell = '';
    if (!isSelf && themeId && themesCache?.themes) {
      const t = themesCache.themes.find((x) => x.id === themeId) || themesCache.themes[0];
      if (t) {
        themeCell = `<div class="pv-cell"><span><label>THEME</label><b>${esc(t.name)}</b></span>${t.id === themesCache.chosen ? '<em>you use it too</em>' : ''}</div>`;
      }
    }
    let mascotCell = '';
    const mascotLevel = prof?.mascot;
    if (!isSelf && Number.isInteger(mascotLevel) && mascotLevel >= 0 && mascotLevel <= 3) {
      const lvlName = ['Calm', 'Playful', 'Naughty', 'Crazy'][mascotLevel];
      const dots = [0, 1, 2, 3].map((i) => `<i class="${i <= mascotLevel ? 'on' : ''}"></i>`).join('');
      const same = window.__mascotEnabled === true && window.__mascotMischief === mascotLevel;
      const label = `Mischief: ${lvlName} (${mascotLevel + 1} of 4)`;
      mascotCell = `<div class="pv-cell" title="${esc(label)}"><span><label>VIKTORIA</label><b>${esc(lvlName)}</b></span>` +
        `<span class="pv-dots" aria-hidden="true">${dots}</span><span class="pv-sr">Mischief ${mascotLevel + 1} of 4</span>${same ? '<em>same as you</em>' : ''}</div>`;
    }
    const themeRow = themeCell || mascotCell ? `<div class="pv-theme">${themeCell}${mascotCell}</div>` : '';

    const joinedStr = formatDate(prof?.joined);
    const sinceStr = formatDate(prof?.friendsSince);
    const statusHTML = isSelf
      ? `<p class="pp-status"><span class="pp-pres">${esc(Social?.PRESENCE[presence]?.label || presence)}</span>${joinedStr ? `<span class="pp-joined">joined ${esc(joinedStr)}</span>` : ''}` +
        `<span class="pp-acct">${A?.signedIn ? `✓ signed in${A.github ? ` · GitHub ${esc(A.github)}` : ''}` : 'not signed in · badges need an account'}</span></p>`
      : isFriend
        ? `<p class="pp-status">${presence ? `<span class="pp-pres">${esc(Social?.PRESENCE[presence]?.label || presence)}</span>` : ''}${joinedStr ? `<span class="pp-joined">joined ${esc(joinedStr)}</span>` : ''}${sinceStr ? `<span class="pp-acct">✓ friends since ${esc(sinceStr)}</span>` : ''}</p>`
        : '';

    const heroHTML =
      `<section class="pp-hero pv-hero" style="--rc:${rc}">${flameCanvas}` +
      `<div class="pp-pic">${picHTML}${dotHTML}${look ? '<span class="pe-over" aria-hidden="true">Drop to use this picture</span>' : ''}</div>` +
      `${acts}<div class="pp-who">${nameHTML}` +
      `<p class="pp-rank"><span class="pp-dl"><span>${esc(r.name.toUpperCase())}</span><span>LEVEL ${level}</span></span></p>` +
      `<div class="pf-bar pp-bar" role="progressbar" aria-label="XP in this level" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pct)}"><i style="width:${pct.toFixed(1)}%"></i></div>` +
      `${xpLine}${fireChip}</div>${standHTML}<div class="me-show"></div>` +
      (!isHidden ? (window.ProfileStats?.ai(targetKey) || '') : '') +
      (linksHTML ? `<div class="pp-links">${linksHTML}</div>` : '') +
      `${themeRow}${statusHTML}</section>`;

    const lockHTML = isFriend
      ? `<section class="pv-lock" style="--rc:${colorRc}"><div class="pv-lock-art">${[40, 70, 55, 90, 30, 62, 48].map((h) => `<i style="height:${h}%"></i>`).join('')}${PV_ICONS.lock}</div>` +
        `<h2>${esc(name)} keeps their hours to themselves</h2><p>Their level, their place on the board and their badges still show.</p></section>`
      : `<section class="pv-lock" style="--rc:${colorRc}"><div class="pv-lock-art">${[40, 70, 55, 90, 30, 62, 48].map((h) => `<i style="height:${h}%"></i>`).join('')}${PV_ICONS.lock}</div>` +
        `<h2>Hours are for friends</h2><p>${esc(name)}'s days, weeks and AIs show to their friends. Their level, their place on the board and their badges are here for everyone.</p></section>`;

    const tokEntry = tokensCache.get(targetKey);
    const tokData = !isHidden ? tokEntry?.data : null;
    const tokSkel = !isHidden && !tokEntry
      ? `<section class="pv-tok" style="--rc:${colorRc}"><h2>TOKENS</h2><div class="pf-stats">${Array.from({ length: 4 }, () => '<div><i class="bd-skel" style="display:block;width:4.5rem;height:.625rem;margin-bottom:.375rem"></i><i class="bd-skel" style="display:block;width:5.5rem;height:1.25rem"></i></div>').join('')}</div><div class="tk-ai"><i class="bd-skel" style="display:block;height:1.125rem;margin-bottom:.5rem"></i><i class="bd-skel" style="display:block;width:78%;height:.875rem"></i></div></section>`
      : '';
    const tokSection = !isHidden ? (tokensHTML(tokData, colorRc) || tokSkel) : '';
    const howSection = isSelf ? howXPHTML(level, prof?.strip?.goal || 3) : '';

    if (metaEl) {
      const pos = board?.week?.pos;
      metaEl.textContent = isSelf ? 'you' : `${isFriend ? 'friend' : 'not a friend yet'}${pos ? ` · #${pos} this week` : ''}`;
    }

    const prevGrid = host.querySelector('.me-grid');
    const samePerson = prevGrid && prevGrid.dataset.pid === targetKey;
    const showMainHours = showHours || hoursPending;
    const sameLayout = samePerson && prevGrid.dataset.hidden === String(!showMainHours) && prevGrid.dataset.friend === String(isFriend);
    if (!sameLayout) {
      host.innerHTML =
        `<div class="pv-top"><button type="button" class="bd-glassbtn" data-pv-back title="Back · Esc">${PV_ICONS.prev}${esc(backLabel)}</button>${stepper}</div>` +
        `<div class="me-grid${!samePerson && animate && !reduced() ? ' pv-in' : ''}" data-pid="${esc(targetKey)}" data-hidden="${!showMainHours}" data-friend="${isFriend}">` +
        `<div class="me-top">${heroHTML}</div>` +
        `<div class="me-main">${showMainHours ? '<div class="me-more"></div>' : lockHTML}` +
        `${isFriend ? `<div class="pv-h2h-host" data-id="${esc(currentId)}"></div>` : ''}` +
        `<div class="me-inv"></div><div class="pv-tok-host">${tokSection}</div>` +
        `${isSelf ? `<div class="me-how">${howSection}</div>` : ''}</div></div>`;
      window.Badges?.mountShowcase(host.querySelector('.me-show'), host.querySelector('.me-inv'), targetKey, { skipFetch: true });
    } else {
      const top = host.querySelector('.me-top');
      if (top && top.__h !== heroHTML) {
        top.__h = heroHTML;
        const showSlot = top.querySelector('.me-show');
        const tmp = document.createElement('div');
        tmp.innerHTML = heroHTML;
        if (showSlot) tmp.querySelector('.me-show')?.replaceWith(showSlot);
        top.replaceChildren(...tmp.childNodes);
      }
      const tokHost = host.querySelector('.pv-tok-host');
      if (tokHost && tokHost.__h !== tokSection) {
        tokHost.__h = tokSection;
        tokHost.innerHTML = tokSection;
      }
      if (isHidden) {
        const lockEl = host.querySelector('.me-main > .pv-lock');
        if (lockEl && lockEl.__h !== lockHTML) {
          const tmp = document.createElement('div');
          tmp.innerHTML = lockHTML;
          const nextLock = tmp.firstElementChild;
          if (nextLock) {
            nextLock.__h = lockHTML;
            lockEl.replaceWith(nextLock);
          }
        }
      }
      const howHost = host.querySelector('.me-how');
      if (howHost && howHost.__h !== howSection) {
        const wasOpen = !!howHost.querySelector('details[open]');
        howHost.__h = howSection;
        howHost.innerHTML = howSection;
        if (wasOpen) howHost.querySelector('details')?.setAttribute('open', '');
      }
    }

    if (showMainHours) {
      const moreEl = host.querySelector('.me-more');
      const stripData = isSelf ? (window.Cloud?.state?.()?.xp || prof?.strip || null) : (prof?.strip || null);
      if (moreEl) window.ProfileStats?.render(moreEl, stripData, targetKey, { skipFetch: true });
    }
    if (isFriend) {
      const h2hEl = host.querySelector('.pv-h2h-host');
      const meObj = { name: Social?.state()?.me?.name || 'You', avatar: A?.avatar || null, level: prof?.level || 1 };
      const themObj = { id: currentId, name, nick, avatar, level };
      if (h2hEl) window.Community?.mountRivalry(h2hEl, themObj, meObj, { skipFetch: true });
    }

    const c = host.querySelector('canvas.pp-fire');
    if (c && !heroFires.has(c) && window.Fire) {
      heroFires.add(c);
      window.Fire.burn(c, { reach: [26, 0, 0], scale: 8, look: c.dataset.look });
    }
  }

  const inFlight = new Set();
  function fetchPerson(id, targetKey, force) {
    const now = Date.now();
    const pCache = profileCache.get(targetKey);
    const needProf = force || !pCache || now - pCache.at >= CACHE_MS;
    const repaint = () => {
      if (currentId === id && document.querySelector('#profile-view.on')) renderPerson(false);
    };

    // One screen request brings identity, hours, badges, weekly tokens and rivalry together.
    if (needProf && !inFlight.has(targetKey)) {
      inFlight.add(targetKey);
      const req = window.Social?.profile
        ? window.Social.profile(targetKey)
        : api('GET', `v1/screens/profile/${encodeURIComponent(targetKey)}`);
      req.then((r) => {
        inFlight.delete(targetKey);
        const at = Date.now();
        // An error answer is not real data: it expires after ~5 s so the next look asks again, not after a minute.
        if (r) profileCache.set(targetKey, { at: r.error ? at - CACHE_MS + 5000 : at, data: r });
        if (!r || r.error) {
          // Nothing will arrive: the token and hours skeletons would pulse forever, so they say so instead.
          tokensCache.set(targetKey, { at, data: { error: true } });
          window.ProfileStats?.load?.(targetKey);
        }
        if (r && !r.error) {
          tokensCache.set(targetKey, { at, data: r.tokens || { hidden: true } });
          window.ProfileStats?.ingest?.(targetKey, r);
          if (targetKey !== 'me') window.Badges?.ingest?.(targetKey, r.badges);
          if (r.relation === 'friend' || r.rivalry !== undefined) window.Community?.ingestRivalry?.(targetKey, r.rivalry);
        }
        repaint();
      });
    }
    if (!themesCache) themeList().then(repaint);
  }

  function openPerson(id, opts = {}) {
    const S = window.Social?.state();
    const rawId = !id || id === 'me' || (S?.me?.id && id === S.me.id) ? 'me' : String(id);
    const prevFrom = currentId ? currentOpts.from : null;
    const from = opts.from || prevFrom || (document.querySelector('#board-view.on') ? 'board' : document.querySelector('#friends-view.on') ? 'friends' : 'dash');
    if (!currentId && from === 'board') {
      scrollWas = document.querySelector('#board-view .bd-scroll')?.scrollTop || 0;
    }
    currentId = rawId;
    currentOpts = { ...opts, from };

    const doOpen = () => {
      const view = document.getElementById('profile-view');
      if (view && !view.classList.contains('on')) window.GitView?.view('profile');
      renderPerson(!opts.instant);
      if (opts.edit && rawId === 'me') window.ProfileEdit?.open();
    };

    if (document.startViewTransition && !reduced() && !opts.instant && opts.picEl) {
      opts.picEl.style.viewTransitionName = 'pv-pic';
      const vt = document.startViewTransition(() => {
        doOpen();
        const big = document.querySelector('#profile-view .me-pic');
        if (big) big.style.viewTransitionName = 'pv-pic';
      });
      vt.finished.finally(() => {
        document.querySelectorAll('[style*="view-transition-name"]').forEach((el) => (el.style.viewTransitionName = ''));
      });
    } else {
      doOpen();
    }

    const live = document.getElementById('bd-live');
    if (live) {
      const { prof, seed, f } = buildPersonData(rawId, opts);
      const who = prof?.name || seed?.name || f?.name;
      if (who) live.textContent = `Profile: ${who}`;
    }

    fetchPerson(rawId, rawId);
  }

  function closePerson() {
    if (!currentId && !document.querySelector('#profile-view.on')) return;
    const closedId = currentId;
    const from = currentOpts.from || 'dash';
    const onBack = currentOpts.onBack;
    currentId = null;
    currentOpts = {};
    applyOwnerTheme(null, true);
    document.body.classList.remove('pv-visiting');
    if (window.ProfileEdit?.isOpen?.()) window.ProfileEdit.close();

    const doClose = () => {
      if (typeof onBack === 'function') {
        onBack();
      } else {
        const dest = BACK_LABELS[from] ? from : 'dash';
        window.GitView?.view(dest);
      }
      if (from === 'board') {
        const sc = document.querySelector('#board-view .bd-scroll');
        if (sc) sc.scrollTop = scrollWas;
        const row = closedId && closedId !== 'me' && document.querySelector(`#board-view [data-open="${CSS.escape(closedId)}"]`);
        if (row) {
          const av = row.querySelector('.bd-av');
          if (av) av.style.viewTransitionName = 'pv-pic';
          row.focus({ preventScroll: true });
        }
      }
    };

    const big = document.querySelector('#profile-view .me-pic');
    if (document.startViewTransition && !reduced() && big && from === 'board') {
      big.style.viewTransitionName = 'pv-pic';
      const vt = document.startViewTransition(doClose);
      vt.finished.finally(() => {
        document.querySelectorAll('[style*="view-transition-name"]').forEach((el) => (el.style.viewTransitionName = ''));
      });
    } else {
      doClose();
    }
  }

  async function handleAction(act, btn) {
    if (!currentId || currentId === 'me') return;
    // The person this click was for: the page can step to someone else while a request is on its way.
    const id = currentId;
    const { prof, seed, f } = buildPersonData(id, currentOpts);
    const person = prof || seed || f;
    if (!person) return;
    if (act === 'msg') return window.Social?.openChat(id);
    if (act === 'add' || act === 'accept') {
      if (btn) btn.disabled = true;
      const S = window.Social?.state();
      const inc = S?.incoming?.find((r) => r.from?.id === id);
      const r = act === 'accept' && inc
        ? await window.Social.accept(inc.id)
        : await window.Social.request(window.Social.handle(person));
      if (r && r.error && r.error !== 'already_requested' && r.error !== 'already_friends') {
        if (btn) btn.disabled = false;
        return say(r.error === 'offline' ? "can't reach the server · try again" : `couldn't do it (${r.error})`);
      }
      window.Sfx?.play('accept');
      const nowFriend = !!(r?.friend || r?.error === 'already_friends');
      const pEntry = profileCache.get(id);
      if (pEntry?.data && !pEntry.data.error) pEntry.data.relation = nowFriend ? 'friend' : 'requested';
      say(nowFriend ? `you and ${window.Social.handle(person)} are friends now` : `request sent to ${window.Social.handle(person)}`);
      if (currentId === id) renderPerson(false);
      fetchPerson(id, id, nowFriend);
    }
    if (act === 'more') openMoreMenu(btn, person);
  }

  function openMoreMenu(btn, person) {
    document.querySelector('.pv-more-menu')?.remove();
    const m = document.createElement('div');
    m.className = 'mn-ctx pv-more-menu';
    m.setAttribute('role', 'menu');
    m.style.position = 'fixed';
    const r = btn.getBoundingClientRect();
    m.style.left = `${Math.max(8, Math.min(r.right - 200, innerWidth - 220))}px`;
    m.style.top = `${Math.max(8, Math.min(r.bottom + 6, innerHeight - 100))}px`;
    const curNick = window.Social?.nick(currentId) || '';
    m.innerHTML =
      `<button type="button" role="menuitem" data-pvm="nick">${curNick ? 'Change nickname…' : 'Set a nickname…'}</button>` +
      '<button type="button" role="menuitem" class="danger" data-pvm="remove">Remove friend</button>';
    m.onclick = async (ev) => {
      const item = ev.target.closest('[data-pvm]');
      if (!item) return;
      if (item.dataset.pvm === 'nick') {
        m.innerHTML =
          `<form class="pv-nick-pop"><input type="text" maxlength="32" placeholder="Nickname for ${esc(person.name)}" value="${esc(curNick)}">` +
          '<div class="pv-nick-row">' +
          (curNick ? '<button type="button" class="pe-btn" data-pvn="clear">Clear</button>' : '') +
          '<button type="submit" class="pe-btn pe-primary">Save</button></div></form>';
        const input = m.querySelector('input');
        input.focus();
        input.select();
        m.querySelector('[data-pvn="clear"]')?.addEventListener('click', async () => {
          m.remove();
          await window.Social.setNick(currentId, '');
          renderPerson(false);
        });
        m.querySelector('form').onsubmit = async (fe) => {
          fe.preventDefault();
          const v = input.value.trim();
          m.remove();
          await window.Social.setNick(currentId, v);
          renderPerson(false);
        };
      } else if (item.dataset.pvm === 'remove') {
        m.remove();
        const id = currentId;
        const res = await window.Social.unfriend(id);
        if (res?.error) return say("couldn't remove friend · try again");
        const pEntry = profileCache.get(id);
        if (pEntry?.data && !pEntry.data.error) pEntry.data.relation = 'none';
        renderPerson(false);
      }
    };
    document.body.appendChild(m);
    m.querySelector('button')?.focus();
    setTimeout(() => document.addEventListener('mousedown', function off(ev) {
      if (!m.contains(ev.target) && ev.target !== btn) {
        m.remove();
        document.removeEventListener('mousedown', off, true);
      }
    }, true));
  }

  document.addEventListener('click', (e) => {
    const view = e.target.closest?.('#profile-view');
    if (!view || !currentId) return;
    if (e.target.closest('[data-pv-back]')) {
      e.preventDefault();
      e.stopPropagation();
      return closePerson();
    }
    const goBtn = e.target.closest('[data-pv-go]');
    if (goBtn && goBtn.dataset.pvGo && !goBtn.disabled) {
      e.preventDefault();
      // The next person gets their own seed from the list, not the one the last person had: a slow or failed load
      // would otherwise show (and "Add friend" would go to) the previous person.
      const seed = (Array.isArray(currentOpts.list) && currentOpts.list.find((x) => x.id === goBtn.dataset.pvGo)) || null;
      return openPerson(goBtn.dataset.pvGo, { ...currentOpts, seed, instant: true, picEl: null });
    }
    const actBtn = e.target.closest('[data-pv-act]');
    if (actBtn) {
      e.preventDefault();
      return handleAction(actBtn.dataset.pvAct, actBtn);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!currentId || !document.querySelector('#profile-view.on')) return;
    // A menu over the profile (Settings, feedback, the shortcut list) owns Esc, and typing in a field owns Option+Left / Cmd+[.
    if (document.querySelector('#cloudui.on, #cheatsheet')) return;
    if (e.key !== 'Escape' && e.target.closest?.('input, textarea, select, [contenteditable]')) return;
    if (e.key === 'Escape') {
      const moreMenu = document.querySelector('.pv-more-menu');
      if (moreMenu) {
        e.preventDefault();
        e.stopPropagation();
        moreMenu.remove();
        document.querySelector('#profile-view .pv-more')?.focus();
        return;
      }
      if (document.querySelector('.bdg-ctx, .pic-zoom, .pe.on, .mn-ctx')) return;
      e.preventDefault();
      e.stopPropagation();
      closePerson();
    } else if ((e.key === '[' && e.metaKey) || (e.key === 'ArrowLeft' && e.altKey)) {
      e.preventDefault();
      e.stopPropagation();
      closePerson();
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (e.button === 3 && currentId && document.querySelector('#profile-view.on')) {
      e.preventDefault();
      closePerson();
    }
  });

  window.addEventListener('profilestats', () => {
    if (currentId && document.querySelector('#profile-view.on')) renderPerson(false);
  });
  window.addEventListener('profiledraft', () => {
    if (currentId === 'me' && document.querySelector('#profile-view.on')) renderPerson(false);
  });
  window.addEventListener('account', () => {
    if (currentId === 'me' && document.querySelector('#profile-view.on')) renderPerson(false);
  });
  // badges.js loads after this file, so the subscription waits for the first drawing.
  let badgesHeard = false;
  function hearBadges() {
    if (badgesHeard || !window.Badges?.on) return;
    badgesHeard = true;
    window.Badges.on(() => {
      if (currentId && document.querySelector('#profile-view.on')) renderPerson(false);
    });
  }
  window.Social?.on((ev) => {
    if (!currentId || !document.querySelector('#profile-view.on')) return;
    if (['friend', 'unfriended', 'request_gone', 'nickname', 'presence', 'outgoing', 'snapshot'].includes(ev.type)) {
      // The cached answer's relation would win over this event for up to a minute, so these ask again.
      if (currentId !== 'me' && ['friend', 'unfriended', 'request_gone'].includes(ev.type)) fetchPerson(currentId, currentId, true);
      renderPerson(false);
    }
  });

  function reset() {
    currentId = null;
    currentOpts = {};
    applyOwnerTheme(null, true);
    document.body.classList.remove('pv-visiting');
    if (window.ProfileEdit?.isOpen?.()) window.ProfileEdit.close();
  }

  return {
    mount, links, normalize, detect, safe, shortText, zoom, open, cut, square, api, say, errText, takes,
    SITES, site, ICONS, MAX_URL, SIZE,
    openPerson, closePerson, reset, isVisiting: () => !!(currentId && currentId !== 'me'), currentId: () => currentId,
  };
})();
