'use strict';
// Orbiterm for Windows: the Mac app's dashboard (app/Resources/web, unchanged) in Electron. This file is the
// Mac app's MainWindowController and AppDelegate: the windows, the line between the pages and the parts that feed them
// (engine.js, cloud.js, git.js, themes.js, terminals.js), the keys and the updates.
const {
  app, BaseWindow, BrowserWindow, WebContentsView, webContents, ipcMain, dialog, Menu, shell, screen, powerMonitor, nativeTheme, net,
  clipboard, nativeImage, safeStorage, protocol, session,
} = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const { execFile } = require('child_process');
const { fileURLToPath } = require('url');

// ---------- the release's guard ----------
// A released app (packaged) signs its API calls only through resources\guard.node (native/guard.c), which signs nothing
// outside that release's own Orbiterm.exe and app.asar. It also stops for good (lock) when something could make this
// app speak in someone else's name: a debugging switch (another program reaching into its pages), node-pty's files
// changed (they load into this process) or the pages changed (resources\web, checked before each loads). What the files
// should be comes from the guard, which scripts/guard.js builds over the finished app. Development features (DevTools,
// ATL_PROBE, ATALAY_API_URL, a key file) are never on in a released app; a run from the sources has no guard.
const RELEASE = app.isPackaged;
// A staging package (npm run staging -- --packaged): a released build in every way, guard included, but it speaks to the
// local API and never updates. Its own package.json says so; a release's can't be changed (asar integrity).
const STAGING = RELEASE && require('../package.json').orbitermStaging === true;
const guard = (() => {
  if (!RELEASE) return null;
  try {
    return require(path.join(process.resourcesPath, 'guard.node'));
  } catch {
    return null;
  }
})();
const builtFiles = (() => {
  try {
    return guard ? JSON.parse(guard.files()) : null;
  } catch {
    return null;
  }
})();
// Every file under `dir` and its SHA-256 the same as `want` (path under `dir`, with forward slashes). Viktoria's model and
// motions are not in the install any more (one pak, downloaded on demand: mascotasset.js), so every file is code or small.
function sameFiles(dir, want) {
  if (!want) return false;
  const got = {};
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name !== '.DS_Store') {
        const rel = path.relative(dir, p).split(path.sep).join('/');
        if (!e.isFile()) {
          got[rel] = '?';
        } else {
          got[rel] = crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
        }
      }
    }
  };
  try {
    walk(dir);
  } catch {
    return false;
  }
  const names = Object.keys(want);
  return Object.keys(got).length === names.length && names.every((n) => got[n] === want[n]);
}
if (guard) {
  const debugging = ['remote-debugging-port', 'remote-debugging-pipe', 'inspect', 'inspect-brk', 'inspect-port', 'js-flags']
    .some((s) => app.commandLine.hasSwitch(s)) || process.argv.some((a) => /^--(inspect|remote-debugging|js-flags)/.test(a));
  const pty = path.join(process.resourcesPath, 'app.asar.unpacked', 'node_modules', 'node-pty');
  const ptyOwn = !!builtFiles && sameFiles(pty, builtFiles.pty);
  // Changed node-pty files never load: the terminals run in the session host instead (terminals.js).
  if (!ptyOwn) process.env.ORBITERM_NO_PTY = '1';
  if (debugging || !ptyOwn) guard.lock();
}

const { createEngine } = require('./engine');
const { createGit } = require('./git');
const { createCloud } = require('./cloud');
const { createTokenLedger } = require('./tokenledger');
const { createThemes } = require('./themes');
const { createAIColors } = require('./aicolors');
const { createTerminals, which } = require('./terminals');
const { createOverlay } = require('./overlay');
const { createRunaways } = require('./runaways');
const { createPowerSaver } = require('./power');
const { createDiscord } = require('./discord');
const { createFiles, linkTarget, fileFromURL } = require('./files');
const { createSavers } = require('./savers');
const { createChatList } = require('./chatlist');
const { createLimits } = require('./limits');
const { createCodexHooks } = require('./codexhooks');
const { createNotesStore } = require('./notesstore');
const { createStreamer } = require('./streamer');
const { createNoteWindows } = require('./notewindow');
const { createFeedPanel } = require('./feedpanel');
const { createChatTrash } = require('./chattrash');
const { createTermFont } = require('./termfont');
const { createMascot } = require('./mascot');
const { createMascotAsset } = require('./mascotasset');
const vendor = require('./vendor');

let autoUpdater = null;
try {
  ({ autoUpdater } = require('electron-updater'));
} catch {}

// Where the dashboard's web files are: next to the app when it's installed (electron-builder copies them), the Mac
// app's folder in the repository when it runs from the sources.
const WEB = app.isPackaged ? path.join(process.resourcesPath, 'web') : path.join(__dirname, '..', '..', 'mac', 'Resources', 'web');
const PRELOAD = path.join(__dirname, 'preload.js');
// ATL_PROBE=<folder>: a check without windows on screen — the pages render out of sight, pictures of them land in the
// folder, and the app quits (development only: a released app never runs it).
const PROBE = RELEASE ? '' : process.env.ATL_PROBE || '';
// ORBITERM_DEMO=1 (staging, development only): the dashboard shows four made-up projects at work and nothing real
// (web/app.js's DEMO), without the chats list. With ORBITERM_DEMO_SHOT=<folder>, pictures of it land there (demoShots).
const DEMO = !RELEASE && process.env.ORBITERM_DEMO === '1';
// The pages still the release's own, checked before one loads: once they aren't, the guard signs nothing more.
function checkPages() {
  if (guard && !sameFiles(WEB, builtFiles && builtFiles.web)) guard.lock();
}

// Run from the sources on a Mac (development), its data must not land in the Mac app's own folder.
if (process.platform !== 'win32') app.setPath('userData', path.join(app.getPath('appData'), 'atalay-terminal-windows-dev'));
// The data folder keeps the name the app had before it was Orbiterm (Atalay's Terminal; Atalay's Terminal Staging for a
// staging build): under the new name the app would start without its settings, its sign-in and its chats. A folder
// given with --user-data-dir (npm run staging's, a check's) stays as it is.
const DATA = path.join(app.getPath('appData'), app.getName().replace(/^Orbiterm/, "Atalay's Terminal"));
if (process.platform === 'win32' && !app.commandLine.hasSwitch('user-data-dir')) app.setPath('userData', DATA);
if (!app.requestSingleInstanceLock()) return app.quit();
// viktoria:// (her downloaded pak, served to her overlay's own session only: mascotasset.js). Before the app is ready.
protocol.registerSchemesAsPrivileged([{ scheme: 'viktoria', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true } }]);
// Sounds (the turn-finished chime when sound is on, the notices' pings) play without a click on the page first, as on the Mac.
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
nativeTheme.themeSource = 'dark';
// The installer's shortcuts carry the app's id (build.appId in package.json) as their AppUserModelID; the windows must
// too, or a pinned shortcut and the running app sit apart on the taskbar.
if (process.platform === 'win32' && app.isPackaged) app.setAppUserModelId('com.atalaykarahan.atalay-terminal');

// ---------- settings: a small JSON file in the app's data folder ----------
const SETTINGS = path.join(app.getPath('userData'), 'settings.json');
const settings = (() => {
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(SETTINGS, 'utf8'));
  } catch {}
  return {
    get: (k) => data[k],
    set(k, v) {
      data[k] = v;
      try {
        fs.mkdirSync(path.dirname(SETTINGS), { recursive: true });
        fs.writeFileSync(SETTINGS, JSON.stringify(data, null, 2));
      } catch (e) {
        console.error('settings:', e.message);
      }
    },
  };
})();

// ---------- the parts ----------
// The dashboard window: the chats list beside the dashboard's page, as the Mac's split view has them (two views, so
// each page is as wide as its part of the window).
let dash = null, dashView = null, chatsView = null;
const boots = new Map(); // webContents id -> what its preload asks for before the page loads
const chats = new Map(); // terminal window id -> { win, sessionId, cwd, claude, title, startedAt, steppedAside }
let activeTerminalId = null;
const panels = { notices: null, chats: new Map(), showing: new Set() }; // the messages panels: the corner's notices, friends' chats
// The dashboard's streamer mode: made-up names in the chats list, the chat windows and the notices too (streamer.js).
const streamer = createStreamer(WEB);

// The AI tools in the theme's colours (Settings · INTERFACE): Claude Code, Codex and Antigravity on their themes that use
// the terminal's 16 colours.
const aiColors = createAIColors({
  settings,
  claudeDir: process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude'),
  codexDir: process.env.CODEX_HOME || path.join(os.homedir(), '.codex'),
  home: os.homedir(),
});

const themes = createThemes({
  ai: aiColors,
  webDir: WEB,
  settings,
  onChange(css) {
    for (const id of boots.keys()) {
      const wc = webContents.fromId(id);
      if (wc && !wc.isDestroyed()) wc.send('atl:theme', css);
    }
    if (dash) { for (const w of [dash, dashView, chatsView]) w.setBackgroundColor(themes.color('--bg')); noteWindows.setBackground(themes.color('--bg')); }
  },
  // Settings' text size: the dashboard zooms, as a browser does.
  onScale(factor) {
    if (dashView && !dashView.webContents.isDestroyed()) dashView.webContents.setZoomFactor(factor);
    // The list's width in the page's px changes with its zoom (the menus centre on the whole window by it).
    pushSide();
  },
});

// The token savers (rtk, caveman), shipped next to the dashboard's files; run from the sources, rtk is the one
// scripts/fetch-rtk.js put in vendor/ and caveman the Mac app's.
const savers = createSavers({
  settings,
  ownDir: path.join(process.env.LOCALAPPDATA || app.getPath('appData'), 'atalay-terminal'),
  bundled: app.isPackaged
    ? { rtk: path.join(process.resourcesPath, 'bin', 'rtk.exe'), caveman: path.join(process.resourcesPath, 'caveman') }
    : { rtk: path.join(__dirname, '..', 'vendor', 'rtk', 'rtk.exe'), caveman: path.join(__dirname, '..', '..', 'mac', 'Resources', 'caveman') },
  claudeDir: process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude'),
  codexDir: process.env.CODEX_HOME || path.join(os.homedir(), '.codex'),
  home: os.homedir(),
  which,
  usable: process.platform === 'win32' && !PROBE,
});

const terminals = createTerminals({
  extraPath: savers.binDir,
  onData: (id, data) => send(chats.get(id)?.win, 'term:data', data),
  onExit(id) {
    const c = chats.get(id);
    if (c) {
      send(c.win, 'term:exit');
      // A plain terminal closes with its shell; a chat's window stays to show how it ended until it's closed.
      if (!c.claude && c.win && !c.win.isDestroyed()) c.win.destroy();
      chats.delete(id);
      toDash(`terminalGone(${JSON.stringify(id)})`);
      pushWinOpen();
      pushChats();
    }
    quitIfIdle();
  },
  // The session host keeps chats and terminals going without the app, as screen does on the Mac. Each build has its
  // own, as there (the installed app's, a development run's), and so does a profile of its own (npm run staging's): a
  // launch only ever brings back its own app's chats.
  host:
    process.platform === 'win32' && !PROBE
      ? {
          name: `atalay-terminal-host-v1-${os.userInfo().username.replace(/[^\w.-]/g, '_')}${app.isPackaged ? '' : '-dev'}${profileSuffix()}`,
          dir: path.join(process.env.LOCALAPPDATA || app.getPath('temp'), 'atalay-terminal-host'),
          source: path.join(__dirname, 'host.cs'),
        }
      : null,
});

// "" for the app's usual profile, else a short mark of the one it was given (--user-data-dir).
function profileSuffix() {
  const own = app.getPath('userData').toLowerCase();
  if (path.resolve(own) === path.resolve(DATA).toLowerCase()) return '';
  return '-' + crypto.createHash('sha256').update(own).digest('hex').slice(0, 8);
}

// Closing the dashboard keeps the app and its chats going, as on the Mac, where the Dock brings it back (here, starting
// the app again). With no chat or terminal left there's nothing to keep it for: it quits rather than stay on out of
// sight (the hidden notices panel would keep it alive, and the uninstaller would find it running).
function quitIfIdle() {
  if (!quitting && !dash && !terminals.list().length) app.quit();
}

// Claude's 5-hour and weekly limits: Claude Code's status line hands its JSON to a script of ours (src/limits.js).
const limits = createLimits({
  dir: path.join(app.getPath('userData')),
  claudeDir: process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude'),
});

// Codex's approval requests (src/codexhooks.js): its hooks keep them in the app's own folder, the same for every build and
// profile.
const codexHooks = createCodexHooks({
  ownDir: path.join(process.env.LOCALAPPDATA || app.getPath('appData'), 'atalay-terminal'),
  codexDir: process.env.CODEX_HOME || path.join(os.homedir(), '.codex'),
});

// Discord presence (discord.js, the Mac's DiscordPresence): your Discord profile shows what you're doing, on unless
// Settings · DISCORD turns it off. Made before the engine and Cloud, whose changes it hears.
const discord = createDiscord({ settings, xp: () => cloud.json().xp, onChange: () => pushDiscord() });

const engine = createEngine({
  claudeDir: path.join(os.homedir(), '.claude'),
  limitsFile: limits.file,
  codexHooks,
  // A Claude process under one of the app's terminals belongs to that window (its id becomes the session's `tab`).
  isAppPid: (pid) => (terminals.list().find((t) => t.pid === pid) || {}).id || false,
  onInit(json) {
    toDash(`init(${json})`);
    pushSide(true);
    pushWinOpen(true);
    pushActiveSession(true);
  },
  onState(json) {
    toDash(`state(${json})`);
    matchChats();
    pushActiveSession();
    for (const [id, c] of chats) send(c.win, 'term:info', chatInfo(id, c));
    badge();
    updateWaits();
    pushWinOpen();
    pushChats();
    discord.update(engine.live());
    mascot.updateSessions(engine.live());
  },
  onEvents(json) {
    toDash(`events(${json})`);
    mascot.onEvents(json);
  },
  // The saved conversations, for the chats list.
  onHistory(items) {
    chatlist.setItems(items);
    pushChats();
  },
});

// The chats list beside the dashboard: what it lists, with the stars, the archive and the deleted chats (src/chatlist.js;
// chattrash.js deletes a conversation's files once its 30 days are over).
const chatlist = createChatList({
  settings,
  trashOps: createChatTrash({
    claudeDir: path.join(os.homedir(), '.claude'),
    codexDir: process.env.CODEX_HOME || path.join(os.homedir(), '.codex'),
    agyDir: path.join(os.homedir(), '.gemini', 'antigravity-cli'),
    // npm's Codex is codex.cmd here (where.exe names its extensionless shell script first).
    codexExe: () => which('codex.exe') || which('codex.cmd'),
    home: os.homedir(),
  }),
  onErased: () => engine.refreshHistory(),
});

const git = createGit({
  folders: () => [...engine.gitSessions(), ...engine.gitSources(), ...terminals.cwds()],
  written: () => engine.written(),
  async confirm({ message, detail, buttons, destructive }) {
    const r = await dialog.showMessageBox(dash || undefined, {
      type: destructive ? 'warning' : 'question', message, detail, buttons: buttons || ['OK', 'Cancel'], defaultId: 0, cancelId: (buttons || []).length - 1, noLink: true,
    });
    return r.response;
  },
  // Under the button that asked (`at`: the page's pixels), as Source Control's menus open on the Mac.
  menu: (items, at) => popupMenu(items, at, dashView),
  trash: (p) => shell.trashItem(p),
});

/**
 * A native menu of `items` ({ id, title } or { separator: true }, `items` for a submenu) at `at`, a point in the page of
 * `view` (one of the dashboard window's two), resolving to the id of the item picked, or null.
 */
function popupMenu(items, at, view) {
  return new Promise((resolve) => {
    let picked = null;
    const build = (list) =>
      (Array.isArray(list) ? list : []).map((i) => (i.separator || i.type === 'separator' ? { type: 'separator' } : {
        label: String(i.title || i.label || ''), enabled: i.enabled !== false, submenu: i.items ? build(i.items) : undefined,
        click: i.items ? undefined : () => (picked = i.id),
      }));
    const off = view ? view.getBounds() : { x: 0, y: 0 };
    const z = (view && !view.webContents.isDestroyed() && view.webContents.getZoomFactor()) || 1;
    const pos = at && Number.isFinite(at.x) && Number.isFinite(at.y) ? { x: Math.round(at.x * z + off.x), y: Math.round(at.y * z + off.y) } : {};
    Menu.buildFromTemplate(build(items)).popup({
      window: dash || undefined, ...pos,
      callback: () => {
        // An item picked: a click like any other, though it went to the menu and not to the page (Source Control's ⋯,
        // with its Open File).
        if (picked != null) userInput.press = userInput.any = Date.now();
        resolve(picked);
      },
    });
  });
}

const API_BASE = STAGING ? 'http://127.0.0.1:4800' : (!RELEASE && process.env.ATALAY_API_URL) || 'https://terminal-api.atalaykarahan.com';
const cloud = createCloud({
  apiBase: API_BASE,
  dataDir: app.getPath('userData'),
  version: app.getVersion(),
  clientKey: RELEASE ? null : loadClientKey(),
  guard,
  fetch: (url, init) => net.fetch(url, init),
  // The tokens burned, read from the AI tools' own records and sent after a heartbeat (tokenledger.js).
  // Any API but production keeps its own token book: a local or staging API never got the days the release sent.
  tokens: createTokenLedger({ dir: path.join(process.env.LOCALAPPDATA || path.join(app.getPath('appData'), '..', 'Local'), 'atalay-terminal'), staging: API_BASE !== 'https://terminal-api.atalaykarahan.com' }),
  // Working, for the XP: someone at the keyboard in the last five minutes, and a sign of work — a Claude session
  // busy, or a terminal printing or typed in.
  isActive: () => powerMonitor.getSystemIdleTime() < 300 && (terminals.busySince(300_000) || engine.live().some((s) => s.status === 'busy')),
  idleSeconds: () => powerMonitor.getSystemIdleTime(),
  theme: () => themes.chosenId(),
  // Viktoria: -1 when she is off, else her Mischief level (0..3). `mascot` is created further down, before any heartbeat runs.
  mascot: () => (mascot.enabled() ? mascot.mischief() : -1),
  tools: () => toolsAtWork(),
  // The keys the old end-to-end encrypted messages were sealed with (read by unseal.js) are kept sealed by Windows for this
  // user, as the notes' key is; the app only opens them now.
  protect: {
    async seal(text) {
      if (!(await safeStorage.isAsyncEncryptionAvailable())) throw new Error("Windows can't protect the message keys right now");
      return safeStorage.encryptStringAsync(text);
    },
    async open(sealed) {
      if (!(await safeStorage.isAsyncEncryptionAvailable())) throw new Error("Windows can't open the message keys right now");
      return (await safeStorage.decryptStringAsync(sealed)).result;
    },
  },
  onUpdateRequired: () => updates?.on426?.(),
  onChange(state) {
    pushCloud();
    if (state && state.xp) toNotices(`xp(${JSON.stringify(state.xp)})`);
    discord.refresh();
  },
  onSocial(text) {
    toDash(`social(${text})`);
    toNotices(`event(${text})`);
    mascot.onSocial(text);
    for (const p of panels.chats.values()) runPanel(p, `window.__messages && __messages.event(${text})`);
  },
});

// The AI tools seen at work (a session busy), for their badges (the API's badges.ts), as the Mac's Activity.toolAtWork:
// Claude's chats, and the others by name (Codex, Gemini, Antigravity). The heartbeat sends those of the last minute and
// a half, a minute's slack.
const toolsAt = new Map();
function noteToolsAtWork() {
  const now = Date.now();
  for (const s of engine.live()) {
    if (s.status !== 'busy') continue;
    const key = s.ai ? String(s.name || '').toLowerCase() : 'claude';
    // Only when the process is the tool's own program (vendor.js): a program renamed after it earns its badge nothing.
    if (['claude', 'codex', 'gemini', 'antigravity'].includes(key) && vendor.genuine(key, s.pid)) toolsAt.set(key, now);
  }
}
const toolsAtWork = () => [...toolsAt].filter(([, at]) => Date.now() - at < 90_000).map(([key]) => key).sort();

// A run from the sources against the local API (npm run staging) signs with its own key file. A released app's key is
// in its guard (above), never in a file or in app.asar.
function loadClientKey() {
  try {
    if (!process.env.ATALAY_CLIENT_KEY_FILE) return null;
    const [id, secret] = fs.readFileSync(process.env.ATALAY_CLIENT_KEY_FILE, 'utf8').trim().split(':');
    return id && /^[0-9a-f]+$/i.test(secret || '') ? { id, secret } : null;
  } catch {
    return null;
  }
}

const overlay = createOverlay({ dataDir: app.getPath('userData'), claudeDir: path.join(os.homedir(), '.claude') });
// The dashboard's notes (web/notes.js), encrypted in the app's data folder (notesstore.js).
const notesStore = createNotesStore({
  dir: path.join(app.getPath('userData'), 'Notes'),
  keyFile: path.join(app.getPath('userData'), 'notes.key'),
  safeStorage,
});
// Source Control's files (files.js, the Mac's FileEditor.swift): the ones the dashboard's editor may read and write.
// When Windows last delivered a click (or Enter or Space) and any key or click to the dashboard's page (its input-event,
// in createDashboard), or the user picked an item in one of its native menus (popupMenu): the user's, since a page can't
// make these. files.js opens a file the page asks for (a Markdown link's, Source Control's Open File) only right after
// one, and asks before the first save of such a file only after one.
const userInput = { press: 0, any: 0 };
const files = createFiles({
  shell,
  saveDialog: (options) => dialog.showSaveDialog(dash || undefined, options),
  // A link in a Markdown preview to a text file beside it, or Source Control's Open File.
  onOpen: (p, line, cwd) => showFileInEditor(p, line, null, cwd),
  userActed: (ms, press) => Date.now() - (press ? userInput.press : userInput.any) < ms,
  confirmWrite: async (p, from) =>
    (await dialog.showMessageBox(dash || undefined, {
      type: 'question', message: `Save changes to ${path.basename(p)}?`, detail: `It was opened from ${from}, in ${path.dirname(p)}.`,
      buttons: ['Save', 'Cancel'], defaultId: 0, cancelId: 1, noLink: true,
    })).response === 0,
  repositories: () => git.listed(),
  home: os.homedir(),
});

// Power save (the Mac's PowerSaver): the map's switch, and on by itself at low battery or in Windows' Energy Saver.
const power = createPowerSaver({ settings, onBattery: () => powerMonitor.isOnBatteryPower(), onChange: () => pushPower() });

// Processes left burning a core where nobody sees them: the dashboard sounds the alarm (DANGER).
const runaways = createRunaways({
  // Each reading: the AI tools running besides Claude (Codex, Antigravity…), sessions on the orbit.
  onRead: () => engine.setOthers(runaways.ais()),
  // And the battery's charge and Energy Saver, which Electron doesn't tell.
  onPower: (r) => power.read(r),
  onChange: (json) => {
    toDash(`runaways(${json})`);
    // The alarm, in the middle of the screen (the notices panel can play its sound).
    toNotices(`runaways && __messages.runaways(${json})`);
    pushTerminals();
  },
});

// ---------- Viktoria, the roaming mascot (mascot.js, the Mac's Mascot.swift) ----------
// Her own switch is on at once in a staging build and in a run from the sources, off in a release until the user turns it
// on. Her mischief (0 Calm … 3 Crazy) starts at 3 in staging only, 1 otherwise, as on the Mac.
// Her model and motions: one pak, downloaded the first time the user asks for her (the Mac's MascotAsset). Plain http to
// this PC only in a staging build or a run from the sources.
const mascotAsset = createMascotAsset({
  app, net, cloud, settings, staging: STAGING,
  localOk: STAGING || !RELEASE,
  enable: (on) => settings.set('mascotEnabled', on),
  onChange: (readinessChanged) => mascot.assetChanged(readinessChanged),
});
const mascot = createMascot({
  BrowserWindow, screen, WEB, webPrefs, checkPages, settings, asset: mascotAsset,
  defaultEnabled: STAGING || (!RELEASE && !PROBE),
  defaultMischief: STAGING ? 3 : 1,
  run,
  dash: () => dash, dashView: () => dashView, chatsView: () => chatsView,
  terminals: mascotTerminals,
  inFront: () => appInFront(),
  openView: mascotOpenView,
  navTap: mascotNavTap,
  closeTerminal: mascotHideTerminal,
  hideTerminal: mascotHideTerminal,
  onSwitch: syncViktoriaMenu,
});

// The dashboard views she may open: the same list the Mac allows.
const MASCOT_VIEWS = ['dash', 'board', 'notes', 'friends', 'themes', 'notifications', 'roadmap', 'git'];
function mascotOpenView(view) {
  if (MASCOT_VIEWS.includes(view)) toDash(`openView(${JSON.stringify(view)})`);
}

// A tap of hers on a tab or the like (app.js's __mascotNav allows its own list); a folder's fold is the chats list's.
function mascotNavTap(id) {
  if (typeof id !== 'string' || !id || id.length > 400) return;
  if (id.startsWith('fold:')) run(chatsView, `window.__mascotFold && __mascotFold(${JSON.stringify(id.slice(5))})`);
  else run(dashView, `window.__mascotNav && __mascotNav(${JSON.stringify(id)})`);
}

// Before she hides a terminal the dashboard takes the keys (and no field), so keys still in flight go nowhere instead of
// landing in another terminal that Windows would make the one in front. Every key in the app's windows is dropped for the
// next 0.4 s as well. True only if the dashboard is visible, not minimized, and really has the keys now.
let keysShutUntil = 0;
function parkKeys() {
  if (!dash || dash.isDestroyed() || !dash.isVisible() || dash.isMinimized()) return false;
  keysShutUntil = Date.now() + 400;
  dash.focus();
  if (!dash.isFocused()) {
    keysShutUntil = 0;
    return false;
  }
  const blur = 'document.activeElement && document.activeElement.blur && document.activeElement.blur()';
  pageOf(dashView)?.focus();
  run(dashView, blur);
  run(chatsView, blur);
  return true;
}

// A terminal's status as she judges it: chatInfo calls a window with Codex or Antigravity in it a plain 'terminal', so
// the AI's own status counts then (a busy Codex is never idle).
function mascotStatus(id, c) {
  const status = chatInfo(id, c).status;
  const tool = status === 'terminal' ? engine.live().find((x) => x.ai && x.tab === id) : null;
  return tool ? tool.status : status;
}

// She walked to a terminal's close button and pressed it (or her page asked to hide it). The close only hides the window
// (openChatWindow's close handler): what runs in it goes on, a session is never ended and the typed text stays. Idle
// ones only: a shell or Claude waiting for the user. False only when the keys couldn't be parked (nothing was hidden then).
function mascotHideTerminal(id) {
  const c = chats.get(id);
  if (!c || !c.win || c.win.isDestroyed() || !c.win.isVisible() || c.win.isMinimized() || !terminals.has(id)) return true;
  const status = mascotStatus(id, c);
  if (status !== 'idle' && status !== 'terminal') return true;
  if (!parkKeys()) return false;
  c.win.close();
  return true;
}

// The terminal windows on screen, for her to walk on: only those whose close just hides them can be closed by her.
function mascotTerminals() {
  const out = [];
  for (const [id, c] of chats) {
    if (!c.win || c.win.isDestroyed() || !c.win.isVisible() || c.win.isMinimized()) continue;
    const live = terminals.has(id);
    const status = live ? mascotStatus(id, c) : 'ended';
    out.push({ id, sid: c.sessionId || '', canClose: live, status: status === 'idle' || status === 'busy' || status === 'waiting' ? status : 'idle', win: c.win });
  }
  return out;
}

// View > Show Viktoria follows her switch, whichever way it was flipped.
function syncViktoriaMenu() {
  const item = Menu.getApplicationMenu()?.getMenuItemById('viktoria');
  if (!item) return;
  // Not downloaded yet: "Get Viktoria…" (opens Themes, where the download is); downloaded: her switch.
  item.label = mascotAsset.isReady() ? 'Show Viktoria' : 'Get Viktoria…';
  item.checked = mascot.enabled();
}

// ---------- pushing to the pages ----------
// A window's page, or a view's (the dashboard window's two).
function pageOf(win) {
  if (!win || (typeof win.isDestroyed === 'function' && win.isDestroyed())) return null;
  const wc = win.webContents;
  return wc && !wc.isDestroyed() ? wc : null;
}
// executeJavaScript on a page that is still loading waits for it with a 'did-stop-loading' listener of its own, one per
// call: the burst of pushes at startup piled up past Node's limit of 10 (MaxListenersExceededWarning). So a loading page
// gets one listener, and the scripts wait in line behind it, in order.
const loadingQueue = new WeakMap();
function run(win, js) {
  const wc = pageOf(win);
  if (!wc) return;
  const queued = loadingQueue.get(wc);
  if (queued) return void queued.push(js);
  // Electron waits too before the first navigation (no URL yet), so that counts as loading.
  if (!wc.getURL() || wc.isLoadingMainFrame()) {
    const lines = [js];
    loadingQueue.set(wc, lines);
    wc.once('did-stop-loading', () => {
      loadingQueue.delete(wc);
      if (wc.isDestroyed()) return;
      for (const line of lines) wc.executeJavaScript(`${line}; true`).catch(() => {});
    });
    return;
  }
  wc.executeJavaScript(`${js}; true`).catch(() => {});
}
function send(win, channel, data) {
  const wc = pageOf(win);
  if (wc) wc.send(channel, data);
}
// What a messages panel is told before its page reports "ready" waits for it, as on the Mac: a friend's chat opened
// with a click would otherwise stay empty, and the notices would miss the XP and events of the app's first seconds.
const panelWaiting = new WeakMap();
function runPanel(win, js) {
  const waiting = win && panelWaiting.get(win);
  if (waiting) waiting.push(js);
  else run(win, js);
}
const toDash = (call) => run(dashView, `window.__radar && window.__radar.${call}`);
const toNotices = (call) => runPanel(panels.notices, `window.__messages && __messages.${call}`);
// A note out of the dashboard in a window of its own (notewindow.js), and the community feed's corner window (feedpanel.js).
const noteWindows = createNoteWindows({
  BrowserWindow, screen, dialog, WEB, settings, webPrefs, bootFor, checkPages, ownerView: () => dashView, getDash: () => dash,
  pin: pinToDash, uiScale: () => themes.uiScale(), streamerOn: () => streamer.on, quitting: () => quitting, bg: () => themes.color('--bg'),
  opacity: () => WINDOW_OPACITY,
});
const feedPanel = createFeedPanel({ BrowserWindow, WEB, webPrefs, bootFor, checkPages, home: () => chatHome() });

// The chat of the terminal window touched last is the one the chat list marks. Prefer a working/waiting nested AI (Codex,
// etc.) over the parent Claude process if both happen to be under the same shell. The dashboard's top bar shows every AI
// at once and follows no chat.
function touchTerminal(id) {
  // Every key typed comes here: only a change of terminal has anything to tell (a change of what runs in it comes with
  // the engine's state).
  if (id === activeTerminalId) return;
  activeTerminalId = id;
  pushActiveSession();
}
function pushActiveSession(force = false) {
  const rank = (s) => (s.status === 'waiting' ? 0 : s.status === 'busy' ? 1 : 2) + (s.ai ? 0 : 0.1);
  const active = activeTerminalId
    ? engine.live().filter((s) => s.tab === activeTerminalId).sort((a, b) => rank(a) - rank(b))[0]
    : null;
  const c = activeTerminalId ? chats.get(activeTerminalId) : null;
  const sid = (active && active.sessionId) || (c && c.sessionId) || null;
  const chatSid = (active && !active.ai && active.sessionId) || (c && c.sessionId) || sid;
  if (chatlist.setActive(chatSid) || force) {
    run(chatsView, `window.__chats && __chats.active(${JSON.stringify(chatSid)})`);
  }
}

// The page's Cloud state, with the Windows app's own updates in it (they come from GitHub releases, not the API).
function cloudState() {
  return { ...cloud.json(), ...updates.state() };
}
const pushCloud = () => toDash(`cloud(${JSON.stringify(cloudState())})`);

// In power save the map draws fewer and smaller frames (power.js); the switch on the map and Settings show it. The map
// hears only when power save comes on or goes off: it sets its quality anew each time.
let mapSaves = null;
function pushPower(force = false) {
  if (force || mapSaves !== power.on()) {
    mapSaves = power.on();
    toDash(`power(${mapSaves})`);
  }
  toDash(`powerSave(${power.json()})`);
}

// Settings · DISCORD shows its switches and whether Discord answers (discord.js). It starts here, after toDash, as it
// tells the page at once.
function pushDiscord() {
  toDash(`discord(${discord.json()})`);
}
discord.start();

// Signing in with GitHub happens in the browser (Settings → Account, account.js): only GitHub's sign-in page opens.
const SIGN_IN = 'https://github.com/login/oauth/authorize?';
function openSignIn(url) {
  if (typeof url !== 'string' || !url.startsWith(SIGN_IN)) return false;
  let u;
  try {
    u = new URL(url);
  } catch {
    return false;
  }
  if (u.origin !== 'https://github.com' || u.pathname !== '/login/oauth/authorize') return false;
  shell.openExternal(u.href).catch(() => {});
  return true;
}

// The terminals' text size, the same in all of them and kept, as the Mac's: View's bigger and smaller text change it
// with a terminal in front (zoom), and Settings sync (account.js) reads it or sets one from the user's other computers.
// Never picked: xterm.js's 14 px, and it doesn't count as chosen (the account's comes in instead).
const TERM_FONT = 14;
const termFontSize = () => {
  const n = Number(settings.get('terminalFontSize'));
  return n >= 9 && n <= 24 ? n : TERM_FONT;
};
function setTermFont(size) {
  const n = Math.min(24, Math.max(9, Math.round(Number(size) || TERM_FONT)));
  settings.set('terminalFontSize', n);
  for (const c of chats.values()) send(c.win, 'term:font', n);
}
// The terminals' font family (termfont.js, the Mac's TerminalFont.swift): the pick, or Windows' usual one. A pick (or ""
// for the usual one) is set and every open terminal changes at once; the answer is what Settings shows.
const termFont = createTermFont({ settings });
async function terminalFont(size, family) {
  if (typeof size === 'number' && Number.isFinite(size)) setTermFont(size);
  if ((typeof family === 'string' || family === null) && (await termFont.set(family))) {
    for (const c of chats.values()) send(c.win, 'term:family', termFont.chosen());
  }
  const n = Number(settings.get('terminalFontSize'));
  return {
    size: termFontSize(), chosen: n >= 9 && n <= 24,
    family: termFont.picked(), current: termFont.current(), usual: termFont.usual(), iterm: false,
  };
}
// View's Zoom In, Zoom Out and Actual Size: in a terminal window its text size (all the terminals', as ⌘+ and ⌘− on the
// Mac); in any other page that page's zoom, as the menu's own roles did.
function zoom(step) {
  const wc = webContents.getFocusedWebContents();
  if (!wc || wc.isDestroyed()) return;
  if ([...chats.values()].some((c) => pageOf(c.win) === wc)) return setTermFont(step ? termFontSize() + step : TERM_FONT);
  wc.setZoomLevel(step ? wc.getZoomLevel() + step * 0.5 : 0);
}

// ---------- windows ----------
function webPrefs() {
  // No DevTools in a released app: its console would reach the app's line to the API.
  return { preload: PRELOAD, contextIsolation: true, nodeIntegration: false, sandbox: true, backgroundThrottling: false, devTools: !RELEASE };
}

// A window shows the app's own pages and nothing else, as on the Mac (RadarView): a page from anywhere else, a file on
// this PC included, would get their line to the app (preload.js), which reaches the shells. A link out of a page opens
// where it belongs instead: a web page in the browser; a file in VS Code (Source Control's link where there's no editor)
// only once the user says so, as on the Mac (SafeOpen.swift): a vscode: link can do more than open a file. Other kinds
// go nowhere, since Windows has handlers for some that run things.
const PAGES = [WEB, path.join(__dirname, '..', 'pages')];
function ownPage(url) {
  let file;
  try {
    file = fileURLToPath(url);
  } catch {
    return false;
  }
  return PAGES.some((dir) => {
    const rel = path.relative(dir, file);
    return rel && !rel.startsWith('..') && !path.isAbsolute(rel);
  });
}

// Permissions. Electron grants every one a page asks for unless the app decides: a script that got into a page could take
// the camera, the microphone or the location without a word, or hand a link to another app's handler from a frame
// will-navigate never sees. The Mac's WKWebView refuses them all. Here too: only the clipboard (the copy buttons, the
// editor's Paste), only for the app's own pages; Viktoria's window gets nothing, and neither does anything without a page
// (a worker). USB, HID, serial and Bluetooth devices: never. Every session the app makes (hers too) gets this.
const PERMITTED = new Set(['clipboard-sanitized-write', 'clipboard-read']);
function permitted(wc, permission, url) {
  if (!PERMITTED.has(permission) || !wc || wc.isDestroyed() || mascot.has(wc)) return false;
  return ownPage(url || wc.getURL());
}
function guardSession(ses) {
  ses.setPermissionRequestHandler((wc, permission, callback, details) => callback(permitted(wc, permission, details && details.requestingUrl)));
  ses.setPermissionCheckHandler((wc, permission, _origin, details) => permitted(wc, permission, details && details.requestingUrl));
  ses.setDevicePermissionHandler(() => false);
}
app.on('session-created', guardSession);

app.on('web-contents-created', (_e, contents) => {
  // The keys Viktoria's hide of a terminal might still have in flight go nowhere (parkKeys).
  contents.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown' && Date.now() < keysShutUntil) e.preventDefault();
  });
  // A mouse button down in any of the app's pages (not Viktoria's own window): no cursor hold starts, and a running one
  // ends (mascot.appMouse), as the Mac's "never move a cursor that is dragging something".
  contents.on('input-event', (_e, input) => {
    if (mascot.has(contents)) return;
    if (input.type === 'mouseDown') mascot.appMouse(true);
    else if (input.type === 'mouseUp') mascot.appMouse(false);
  });
  contents.on('will-navigate', (e, url) => {
    // Her window never goes anywhere else (mascot.js stops it), and a link out of it opens nothing either.
    if (mascot.has(contents)) return;
    if (ownPage(url)) return;
    e.preventDefault();
    if (/^https?:/i.test(url)) shell.openExternal(url).catch(() => {});
    else if (/^vscode:/i.test(url)) askToOpen(url);
  });
});

// A window of the app being dragged by its title bar or resized by an edge holds a button down too (the pages see none of
// it): the same flag for Viktoria's cursor hold, until the move or resize ends.
function watchMoves(w) {
  for (const ev of ['will-move', 'will-resize']) w.on(ev, () => mascot.appMouse(true));
  for (const ev of ['moved', 'resized']) w.on(ev, () => mascot.appMouse(false));
}
app.on('browser-window-created', (_e, w) => watchMoves(w));

// Another app's link: that app opens it once the user says so. Nothing on this PC opens it: nothing happens.
async function askToOpen(url) {
  const name = app.getApplicationNameForProtocol(url);
  if (!name) return;
  const r = await dialog.showMessageBox(dash || undefined, {
    type: 'question', message: `Open this link in ${name}?`, detail: url.length > 300 ? `${url.slice(0, 300)}…` : url,
    buttons: ['Open', 'Cancel'], defaultId: 0, cancelId: 1, noLink: true,
  });
  if (r.response === 0) shell.openExternal(url).catch(() => {});
}

function bootFor(webContents, extra = {}) {
  const look = { font: termFont.current(), size: 13 };
  boots.set(webContents.id, { css: themes.css(), look, ...extra });
  webContents.once('destroyed', () => boots.delete(webContents.id));
}

function createDashboard() {
  const area = screen.getPrimaryDisplay().workArea;
  const bg = themes.color('--bg');
  dash = new BaseWindow({
    width: Math.min(1480, area.width), height: Math.min(900, area.height), minWidth: 980, minHeight: 600,
    title: 'Orbiterm', backgroundColor: bg, show: false, autoHideMenuBar: true,
    ...(PROBE ? { x: -32000, y: -32000, frame: false, width: 1480, height: 900 } : {}),
  });
  const win = dash;
  watchMoves(win);
  // The app's menu and its keys (Ctrl+N, Ctrl+K, Ctrl+Q…), as the other windows have them.
  if (process.platform !== 'darwin' && Menu.getApplicationMenu()) win.setMenu(Menu.getApplicationMenu());
  dashView = new WebContentsView({ webPreferences: webPrefs() });
  chatsView = new WebContentsView({ webPreferences: webPrefs() });
  const views = [dashView, chatsView];
  for (const v of views) {
    v.setBackgroundColor(bg);
    win.contentView.addChildView(v);
    bootFor(v.webContents, v === dashView ? { dashboard: true, demo: DEMO } : {});
    // Links in the pages open in the browser, never inside the app.
    v.webContents.setWindowOpenHandler(({ url }) => {
      if (/^https?:/.test(url)) shell.openExternal(url);
      return { action: 'deny' };
    });
    v.webContents.on('render-process-gone', () => setTimeout(() => !v.webContents.isDestroyed() && v.webContents.reload(), 500));
    // Ctrl+B, the Mac's ⌘B: the chats list slides open or shut (in the terminals it stays the shell's).
    v.webContents.on('before-input-event', (e, input) => {
      if (input.type === 'keyDown' && input.control && !input.alt && !input.shift && !input.meta && input.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleChats();
      }
    });
  }
  // The clicks and keys Windows delivers to the dashboard's page (userInput, for files.js).
  dashView.webContents.on('input-event', (_e, input) => {
    const now = Date.now();
    if (input.type === 'mouseUp' && (!input.button || input.button === 'left')) userInput.press = userInput.any = now;
    else if (input.type === 'keyDown' || input.type === 'rawKeyDown') {
      userInput.any = now;
      // A key comes with `code` and `key` (Electron 45 sends no keyCode here): Enter and Space activate a link.
      if (['Enter', 'NumpadEnter', 'Space'].includes(input.code) || ['Enter', ' '].includes(input.key)) userInput.press = now;
    }
  });
  chatsView.setVisible(chatsList.shown);
  layout();
  for (const ev of ['resize', 'maximize', 'unmaximize', 'restore', 'enter-full-screen', 'leave-full-screen']) win.on(ev, layout);
  checkPages();
  dashView.webContents.loadFile(path.join(WEB, 'index.html'));
  // The text size Settings keeps, on every load (a reload starts at 100% otherwise).
  dashView.webContents.on('did-finish-load', () => {
    dashView.webContents.setZoomFactor(themes.uiScale());
    pushSide(true);
  });
  chatsView.webContents.loadFile(path.join(__dirname, '..', 'pages', 'chats.html'));
  // A list (re)loaded while a menu is open is dimmed too.
  chatsView.webContents.on('did-finish-load', () => sidebarDim && run(chatsView, DIM_JS));
  // Shown once the dashboard's page is there (no empty window first), or a few seconds on whatever happens.
  let shown = false;
  const show = () => {
    if (shown || win.isDestroyed()) return;
    shown = true;
    if (PROBE) return win.showInactive();
    win.show();
    dashView.webContents.focus();
  };
  dashView.webContents.once('did-finish-load', show);
  setTimeout(show, 4000);
  const visibility = () => toDash(`visibility(${win.isVisible() && !win.isMinimized()}, ${!!BaseWindow.getFocusedWindow()})`);
  for (const ev of ['focus', 'blur', 'minimize', 'restore', 'show', 'hide']) win.on(ev, () => setImmediate(visibility));
  for (const ev of ['focus', 'restore', 'show']) win.on(ev, pinAllToDash);
  for (const ev of ['focus', 'restore', 'show']) win.on(ev, () => noteWindows.pinAll());
  // Viktoria walks on the dashboard's surfaces: where it is, how big and whether it shows are hers to know.
  for (const ev of ['move', 'resize', 'minimize', 'restore', 'maximize', 'unmaximize', 'show', 'hide', 'enter-full-screen', 'leave-full-screen']) {
    win.on(ev, () => mascot.dashboardChanged());
  }
  // The level-up waits for the app to be in front (the notices' "focus"): the app's focus events are BrowserWindows'.
  win.on('focus', tellFocus);
  win.on('blur', () => setImmediate(tellFocus));
  // Likewise Viktoria's: coming back to the dashboard greets her, leaving it lets go of the cursor.
  win.on('focus', () => setImmediate(() => mascot.focusChanged()));
  win.on('blur', () => setImmediate(() => mascot.focusChanged()));
  // Closing the dashboard leaves the chats and terminals open: let them go before it closes, or Windows closes its
  // child windows with it.
  win.on('close', () => {
    for (const c of win.getChildWindows()) if (!c.isDestroyed()) c.setParentWindow(null);
  });
  win.on('closed', () => {
    // A window's views don't go with it: their pages close here.
    for (const v of views) if (!v.webContents.isDestroyed()) v.webContents.close();
    if (dash === win) dash = dashView = chatsView = null;
    clearInterval(chatsList.timer);
    chatsList.timer = null;
    chatsList.slide = null;
    chatsJSON = '';
    winOpenJSON = '';
    badged = 0;
    stepAside(false);
    mascot.dashboardChanged();
    quitIfIdle();
  });
}

// ---------- the chats list beside the dashboard (the Mac's sidebar) ----------
// Open from the start, at the width it had when it was last closed (narrowest 210, widest 460); Ctrl+B or its × slides
// it open and shut, fading, while the dashboard gives it room and takes it back.
const CHATS_MIN = 210, CHATS_MAX = 460;
const chatsWidth = (w) => (Number.isFinite(w) ? Math.round(Math.min(CHATS_MAX, Math.max(CHATS_MIN, w))) : 280);
const chatsList = { shown: settings.get('sidebarHidden') !== true && !DEMO, width: chatsWidth(settings.get('sidebarWidth')), slide: null, timer: null };

function layout() {
  if (!dash || dash.isDestroyed() || dash.isMinimized()) return;
  const [w, h] = dash.getContentSize();
  if (w < 1 || h < 1) return;
  const side = Math.round(chatsList.slide != null ? chatsList.slide : chatsList.shown ? chatsList.width : 0);
  chatsView.setBounds({ x: 0, y: 0, width: side, height: h });
  dashView.setBounds({ x: side, y: 0, width: Math.max(0, w - side), height: h });
  pushSide();
}

// The page centres its menus on the whole window, so it needs how far right of the window's edge it starts (the chats
// list), in its own px: the text size zooms the page, so the same DIPs are fewer px. Sent when it changes (the list
// dragged, opened or shut, the window or the text size changed), and again after the page loads or reloads (force).
let sideSent = null;
function pushSide(force) {
  if (!dashView || !chatsView || dashView.webContents.isDestroyed()) return;
  // Each script run on a page still loading adds a listener to it; the load handler pushes this forced anyway.
  if (!force && dashView.webContents.isLoading()) return;
  if (force) sideSent = null;
  const wide = chatsView.getVisible() ? chatsView.getBounds().width : 0;
  const px = Math.round(wide / (dashView.webContents.getZoomFactor() || 1));
  if (px === sideSent) return;
  sideSent = px;
  run(dashView, `document.documentElement.style.setProperty('--side-x', '${px}px')`);
}

// Darkens the chats list as the page's backdrop darkens the dashboard, so the open menu is the one thing in front; the
// cover takes the list's clicks too, as a menu over the whole window would. It lives in the list's page, so it stays
// while the list is hidden and a list opened meanwhile comes up dimmed (and a reloaded list gets it again).
let sidebarDim = false;
const DIM_JS = `(() => {
  let d = document.getElementById('atl-side-dim');
  if (!d) {
    d = document.createElement('div');
    d.id = 'atl-side-dim';
    d.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.4)';
    document.documentElement.appendChild(d);
  }
})()`;
const UNDIM_JS = `document.getElementById('atl-side-dim')?.remove()`;
function dimSidebar(on) {
  sidebarDim = on;
  // A list still loading takes it from its load handler (sidebarDim).
  if (chatsView && !chatsView.webContents.isLoading()) run(chatsView, on ? DIM_JS : UNDIM_JS);
}

// CSS's cubic-bezier(0.65, 0, 0.35, 1), the Mac's slide: progress (0…1) -> how far along.
const slideCurve = (() => {
  const [x1, y1, x2, y2] = [0.65, 0, 0.35, 1];
  const at = (a, b, s) => 3 * a * s * (1 - s) ** 2 + 3 * b * s * s * (1 - s) + s ** 3;
  return (t) => {
    let lo = 0, hi = 1;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (at(x1, x2, mid) < t) lo = mid;
      else hi = mid;
    }
    return at(y1, y2, (lo + hi) / 2);
  };
})();

function toggleChats() {
  if (!dash || chatsList.timer) return;
  const opening = !chatsList.shown;
  const from = opening ? 0 : chatsList.width, to = opening ? chatsList.width : 0;
  if (opening) chatsView.setVisible(true);
  run(chatsView, `window.__chats && __chats.fade(${opening})`);
  const t0 = Date.now();
  chatsList.slide = from;
  layout();
  chatsList.timer = setInterval(() => {
    const t = Math.min(1, (Date.now() - t0) / 450);
    chatsList.slide = from + (to - from) * slideCurve(t);
    if (t >= 1) {
      clearInterval(chatsList.timer);
      chatsList.timer = null;
      chatsList.slide = null;
      chatsList.shown = opening;
      if (!opening && chatsView) chatsView.setVisible(false);
      settings.set('sidebarHidden', !opening);
    }
    layout();
  }, 16);
}

// Tells the dashboard which sessions have a visible chat window (cards light up), as on the Mac.
let winOpenJSON = '';
function pushWinOpen(force) {
  if (!dashView) return;
  const map = {};
  for (const c of chats.values()) {
    if (c.sessionId && (c.steppedAside || (c.win && !c.win.isDestroyed() && c.win.isVisible()))) map[c.sessionId] = true;
  }
  const json = JSON.stringify(map);
  if (json === winOpenJSON && !force) return;
  winOpenJSON = json;
  run(dashView, `window.__winOpen = ${json}`);
}

let chatsJSON = '', chatsVersion = -1;
function pushChats(force) {
  if (!chatsView) return;
  const live = chatlist.setLive(engine.live());
  // A chat with a window of the app, shown or not: "in a window".
  const open = chatlist.setOpen([...chats.values()].map((c) => c.sessionId).filter(Boolean));
  if (!force && !live && !open && chatlist.version() === chatsVersion) return;
  chatsVersion = chatlist.version();
  const snap = chatlist.snapshot();
  const json = JSON.stringify(streamer.on ? madeUpChats(snap) : snap);
  if (json === chatsJSON && !force) return;
  chatsJSON = json;
  run(chatsView, `window.__chats && __chats.update(${json})`);
}

// The chats list in streamer mode: every chat, folder and terminal under the made-up name the dashboard gives it. Their
// ids and folders stay as they are (a click still opens the right one); only what's shown changes.
function madeUpChats(snap) {
  return {
    ...snap,
    rows: snap.rows.map((r) => ({ ...r, title: streamer.fake('title', r.title || r.lastPrompt), lastPrompt: '' })),
    terms: snap.terms.map((t) => {
      const title = t.title ? streamer.project(t.title) : t.title;
      return { ...t, title, job: t.job ? streamer.fake('cmd', t.job) : t.job, tip: title || 'terminal' };
    }),
    folders: Object.fromEntries(
      Object.entries(snap.folders).map(([key, f]) => [key, { ...f, label: streamer.project(f.cwd), path: streamer.folder(f.cwd) }]),
    ),
  };
}

// The chats list's open folder button: a folder from the system's picker stays at the list's top, with a terminal opened
// in it.
async function openFolder() {
  const r = await dialog.showOpenDialog(dash || undefined, { title: 'Open a folder in the chats list', properties: ['openDirectory'] });
  const d = !r.canceled && r.filePaths && r.filePaths[0];
  if (!d || !fs.existsSync(d)) return null;
  chatlist.pin(d);
  pushChats(true);
  openChatWindow({ cwd: d, claudeArgs: null, title: path.basename(d) || d });
  return d;
}

// The chats list's requests (pages/chats.js).
function handleChats(msg) {
  // A folder on this PC, whatever the page sends: never a file (opening it in Explorer would start a program) nor a
  // network share (merely looking one up hands its host the user's NTLM hash, as files.js keeps from its paths).
  const dir = () => {
    const d = String(msg.cwd || '');
    if (!d || /^[\\/]{2}/.test(d)) return null;
    try {
      return fs.statSync(d).isDirectory() ? d : null;
    } catch {
      return null;
    }
  };
  switch (msg.type) {
    case 'ready':
      pushChats(true);
      pushActiveSession(true);
      mascot.pushToPages();
      return true;
    // The rects in the list Viktoria walks on (pages/chats.js reports them while she is on).
    case 'mascotRects':
      return mascot.updateSidebarRects(msg.rects), true;
    case 'open':
      return openSession(String(msg.id || ''), false);
    case 'fork':
      return openSession(String(msg.id || ''), true);
    case 'newTerminal': {
      const d = dir();
      if (d) openChatWindow({ cwd: d, claudeArgs: null, title: path.basename(d) });
      return true;
    }
    case 'reveal': {
      const d = dir();
      if (d) shell.openPath(d);
      return true;
    }
    case 'copyId':
      if (typeof msg.id === 'string' && msg.id) clipboard.writeText(msg.id);
      return true;
    case 'openFolder':
      return openFolder();
    case 'unpin':
      chatlist.unpin(String(msg.cwd || ''));
      break;
    // One of the app's terminals in a folder: its window comes to the front, or it ends (as its End button does).
    case 'showTerminal':
      return chats.has(msg.id) && terminals.has(msg.id) && showChat(msg.id);
    case 'endTerminal':
      if (chats.has(msg.id)) endTerminal(msg.id);
      return true;
    case 'favorite':
      chatlist.toggleFavorite(String(msg.id || ''));
      // The star on its window's strip follows.
      pushChatInfos();
      break;
    case 'archive':
      chatlist.toggleArchived(String(msg.id || ''));
      break;
    case 'rename':
      chatlist.rename(String(msg.id || ''), String(msg.name ?? ''));
      break;
    case 'folders':
      for (const k of Array.isArray(msg.keys) ? msg.keys : []) chatlist.setFolder(String(k || ''), msg.on === true);
      break;
    // The chats picked in the list, into the archive.
    case 'archiveMany':
      chatlist.archiveMany((Array.isArray(msg.ids) ? msg.ids : []).map(String));
      break;
    // Delete…: these chats, or every chat these folders show. Asked first; true when they were deleted.
    case 'delete':
      return deleteChats((Array.isArray(msg.ids) ? msg.ids : []).map(String));
    case 'deleteFolders':
      return deleteChats(chatlist.chatsInFolders((Array.isArray(msg.keys) ? msg.keys : []).map(String)));
    case 'menu':
      return popupMenu(msg.items, msg.at, chatsView);
    case 'close':
      toggleChats();
      return true;
    // Dragged wider or narrower: kept for the next time it opens (and the next launch) once the drag is over.
    case 'width': {
      if (!chatsList.shown || chatsList.timer) return true;
      const z = (chatsView && !chatsView.webContents.isDestroyed() && chatsView.webContents.getZoomFactor()) || 1;
      chatsList.width = chatsWidth(Number(msg.w) * z);
      layout();
      if (msg.done) settings.set('sidebarWidth', chatsList.width);
      return true;
    }
    default:
      throw new Error('unknown request');
  }
  pushChats(true);
  return true;
}

// Delete in the chats list (a chat's menu, a folder's, or the bar over the list while some are picked): asks first, then
// the chats (Claude Code's, Codex's, Antigravity's) leave the list for Settings' deleted chats, where they stay 30 days
// before they're deleted from the PC. Running chats stay: they're ended first. True when chats were deleted.
async function deleteChats(ids) {
  const pick = chatlist.deletable(ids);
  const box = (o) => dialog.showMessageBox(dash || undefined, { noLink: true, ...o });
  const stay = [];
  if (pick.running > 0) stay.push(pick.running === 1 ? '1 running chat stays in the list: end it first.' : `${pick.running} running chats stay in the list: end them first.`);
  if (pick.others > 0) stay.push(pick.others === 1 ? "1 chat that isn't saved yet stays too." : `${pick.others} chats that aren't saved yet stay too.`);
  if (!pick.chats.length) {
    const n = pick.running + pick.others;
    if (!n) await box({ type: 'info', message: 'Nothing to delete', detail: 'There are no saved chats here.' });
    else {
      await box({
        type: 'info', message: n === 1 ? "This chat can't be deleted" : "These chats can't be deleted",
        detail: pick.others ? stay.join('\n') : n === 1 ? "It's running: end it first." : "They're running: end them first.",
      });
    }
    return false;
  }
  const one = pick.chats.length === 1;
  const title = one ? chatlist.shownTitle(pick.chats[0]) : '';
  const r = await box({
    type: 'warning',
    message: one ? `Delete “${clip(streamer.on ? streamer.fake('title', title) : title, 60)}”?` : `Delete ${pick.chats.length} chats?`,
    detail:
      (one
        ? "It stays in Settings › deleted chats for 30 days, where you can put it back. Then it's deleted from this PC for good."
        : "They stay in Settings › deleted chats for 30 days, where you can put them back. Then they're deleted from this PC for good.") +
      (stay.length ? '\n\n' + stay.join('\n') : ''),
    buttons: ['Delete', 'Cancel'], defaultId: 0, cancelId: 1,
  });
  if (r.response !== 0) return false;
  // One that began to run while the question stood stays (the list checks each again).
  chatlist.delete(pick.chats);
  pushChats(true);
  return true;
}

// Settings' deleted chats (web/cloud.js): the chats deleted from the chats list, by folder, with the days each has left
// of its 30; putting one or all back, and deleting one or all from the disk now (asked first: that can't be undone).
async function handleTrash(msg) {
  const sure = async (message, detail) =>
    (await dialog.showMessageBox(dash || undefined, { type: 'warning', message, detail, buttons: ['Delete', 'Cancel'], defaultId: 1, cancelId: 1, noLink: true })).response === 0;
  // The files go in the background; the list here shows them gone at once.
  const erase = (ids) => void chatlist.erase(ids).then(() => pushChats(), (e) => console.error('trash:', e));
  switch (msg.type) {
    case 'list':
      chatlist.emptyExpiredTrash().then(() => pushChats(), (e) => console.error('trash:', e));
      break;
    case 'putBack':
      chatlist.putBack(String(msg.id || ''));
      break;
    case 'putBackAll':
      chatlist.putBackAll();
      break;
    case 'erase': {
      const chat = chatlist.trashed(String(msg.id || ''));
      const title = chat && (streamer.on && chat.title ? streamer.fake('title', chat.title) : chat.title);
      if (chat && (await sure(`Delete “${clip(title || 'untitled', 60)}” now?`, "It's deleted from this PC for good. This can't be undone."))) erase([chat.id]);
      break;
    }
    case 'eraseAll': {
      const ids = chatlist.trashIds();
      const n = ids.length;
      if (n && (await sure(n === 1 ? 'Delete the chat now?' : `Delete all ${n} chats now?`, `${n === 1 ? "It's" : "They're"} deleted from this PC for good. This can't be undone.`))) erase(ids);
      break;
    }
    default:
      throw new Error('unknown request');
  }
  pushChats();
  const folders = chatlist.trashList();
  // Streamer mode: made-up folders and names here too.
  return {
    days: 30,
    folders: !streamer.on ? folders : folders.map((f) => ({
      ...f, cwd: streamer.folder(f.cwd), label: streamer.project(f.cwd),
      chats: f.chats.map((c) => ({ ...c, title: c.title ? streamer.fake('title', c.title) : c.title })),
    })),
  };
}

// Settings' archived chats (web/cloud.js's "archived chats · manage"): the list by folder, and taking a chat, a folder
// or all of them back out.
function handleArchive(msg) {
  switch (msg.type) {
    case 'list':
      break;
    case 'restore':
      chatlist.restore(String(msg.id || ''));
      break;
    case 'restoreFolder':
      chatlist.setFolder(String(msg.cwd || ''), false);
      break;
    case 'restoreAll':
      chatlist.restoreAll();
      break;
    default:
      throw new Error('unknown request');
  }
  pushChats();
  return { folders: chatlist.archivedList() };
}

// The Mac's Dock badge: how many chats need the user (a question, a permission), here as a number on the dashboard's
// taskbar button. Drawn by the dashboard's page: the main process has no canvas.
let badged = 0;
async function badge() {
  if (process.platform !== 'win32' || !dash || dash.isDestroyed()) return;
  const n = engine.live().filter((s) => s.status === 'waiting').length;
  if (n === badged) return;
  badged = n;
  if (!n) return dash.setOverlayIcon(null, '');
  const label = n > 9 ? '9+' : String(n);
  const url = await dashView.webContents
    .executeJavaScript(
      `(() => { const c = document.createElement('canvas'); c.width = c.height = 32; const g = c.getContext('2d');
        g.fillStyle = '#e5484d'; g.beginPath(); g.arc(16, 16, 16, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#fff'; g.font = 'bold ${label.length > 1 ? 15 : 21}px "Segoe UI", sans-serif'; g.textAlign = 'center';
        g.textBaseline = 'middle'; g.fillText(${JSON.stringify(label)}, 16, 17); return c.toDataURL(); })()`,
    )
    .catch(() => null);
  // The page not ready yet (the app just started): the next state tries again.
  if (!url) return void (badged = 0);
  if (badged === n && dash && !dash.isDestroyed()) dash.setOverlayIcon(nativeImage.createFromDataURL(url), `${n} waiting for you`);
}

function showDashboard() {
  if (!dash) createDashboard();
  if (dash.isMinimized()) dash.restore();
  dash.show();
  dash.focus();
  // The keys go to the dashboard's page unless the chats list has them (its search).
  if (!chatsView.webContents.isFocused()) dashView.webContents.focus();
}

// ---------- Source Control's editor: files from the terminals, new files ----------
// A file in Source Control's editor, in a tab of its own (or the one it has), at `line`; `cwd`: the folder its path is
// shown from (the terminal's).
function showFileInEditor(p, line, column, cwd) {
  const spec = { path: p, cwd: cwd || path.dirname(p), home: os.homedir() };
  if (line) spec.line = line;
  if (column) spec.column = column;
  showDashboard();
  pageOf(dashView)?.focus();
  run(dashView, `window.GitView && GitView.openFile(${JSON.stringify(spec)})`);
}

// A path Ctrl-clicked in a terminal: a text file in Source Control's editor, as VS Code opens one; anything else in its
// app (a program shown in its folder instead).
function openTerminalFile(target, cwd) {
  if (!target) return;
  if (!files.canOpen(target.path)) return files.openOutside(target.path);
  files.allow(target.path);
  showFileInEditor(target.path, target.line, target.column, cwd);
}

// Ctrl+N: a new file in Source Control's editor (VS Code's Untitled-1), from any window.
function newFile() {
  showDashboard();
  pageOf(dashView)?.focus();
  run(dashView, 'window.GitView && GitView.newFile()');
}

// ---------- the dashboard's requests (the "radar" handler) ----------
function handleRadar(msg) {
  switch (msg.type) {
    case 'ready':
      // A reloaded page has no menu open, and starts its feed over: lines from the old one would never dissolve.
      stepAside(false);
      dimSidebar(false);
      feedPanel.clearIfCreated();
      engine.requestInit();
      pushWinOpen(true);
      pushCloud();
      pushTerminals(true);
      toDash(`runaways(${runaways.json()})`);
      pushActiveSession(true);
      pushPower(true);
      pushDiscord();
      mascot.pushToPages();
      return true;
    // Viktoria (app.js, cloud.js, settings.js): her switch and mischief, the dashboard's surfaces she walks on, and a real
    // click on the theme chooser (she may sulk at the cursor).
    case 'mascotEnabled':
      return mascot.setEnabled(msg.on === true), true;
    // The pak's download (cloud.js, settings.js): start, stop, and remove it (her switch off, the file deleted).
    case 'mascotGet':
      return mascotAsset.get(), true;
    case 'mascotCancel':
      return mascotAsset.cancel(), true;
    case 'mascotRemove':
      return mascotAsset.remove(), true;
    case 'mascotMischief':
      return mascot.setMischief(typeof msg.level === 'number' && Number.isFinite(msg.level) ? msg.level : 3), true;
    case 'mascotThemeGuard':
      return mascot.onThemeChooserOpened(), true;
    case 'mascotPanels':
      return mascot.updateWebPanels(msg.panels, msg.nav), true;
    // Power save: the switch on the map, and Settings' "on by itself at low battery".
    case 'powerSave':
      return power.choose(msg.on === true), true;
    case 'powerSaveAuto':
      return power.setAuto(msg.on === true), true;
    // Settings · DISCORD: what you're doing on your Discord profile, the project's name and today's active time in it.
    case 'discordPresence':
      return discord.setEnabled(msg.on === true), true;
    case 'discordProject':
      return discord.setShowProject(msg.on === true), true;
    case 'discordActive':
      return discord.setShowActive(msg.on === true), true;
    case 'open':
      return openSession(msg.sid, false);
    case 'fork':
      return openSession(msg.sid, true);
    case 'newTerminal':
      return showOverlay('Overlay.newTerminal()');
    case 'openTerminal':
      // A car: its window comes up in front, a closed one too (its terminal ran on out of sight).
      return chats.get(msg.id) && showChat(msg.id);
    case 'endLeftover':
      return runaways.endLeft(msg.pid, msg.started);
    case 'endSession':
      return endSession(msg.sid);
    case 'endRunaway':
      return runaways.end(msg.pid, msg.started);
    // A menu (friends, settings, an update) opened or closed on the dashboard: the windows pinned above it step out of
    // the way meanwhile, as on the Mac.
    case 'modal':
      dimSidebar(msg.open === true);
      return stepAside(msg.open === true);
    // A note out of the dashboard in its own window, closed from the dashboard, the dashboard's notes loaded (the notes
    // left out at the last quit come back), and the community feed's lines (the corner window draws them).
    case 'noteWindow':
    case 'noteWindowClose':
    case 'notesReady':
      return noteWindows.radar(msg);
    case 'feedLine':
    case 'feedOut':
    case 'feedClear':
      return feedPanel.radar(msg);
    // The bell's "Replay animation" (inbox.js): a badge's reveal again, over whatever is in front.
    case 'badgeReveal':
      if (typeof msg.id === 'string' && msg.id && msg.id.length <= 64) {
        toNotices(`reveal && __messages.reveal(${JSON.stringify(msg.id)}, ${Math.min(Math.max(Math.trunc(Number(msg.tier)) || 1, 1), 99)})`);
      }
      return true;
    // What's new and the tips: the page asks for what it can't know, and says when the notes of the version that came by
    // itself were opened.
    case 'whatsNew':
      return pushWhatsNew(), true;
    case 'whatsNewRead':
      return settings.set('whatsNewUnread', null), true;
    // Streamer mode (the switch on the map): the chats list, the chat windows and the notices show made-up names too.
    case 'streamer':
      if (streamer.set(msg.on === true)) {
        noteWindows.setStreamer(streamer.on);
        pushChats(true);
        for (const [id, c] of chats) send(c.win, 'term:info', chatInfo(id, c));
      }
      return true;
    // Two chats began (or stopped) writing the same file (files.heat): the corner's notice, as a chat that needs you.
    case 'clash': {
      const key = typeof msg.key === 'string' ? msg.key : '';
      if (!key) return true;
      const str = (v) => (typeof v === 'string' ? v : '');
      const notice = { key, file: str(msg.file), path: str(msg.path), chats: Array.isArray(msg.chats) ? msg.chats.map(String) : [] };
      toNotices(`clash && __messages.clash(${JSON.stringify(notice)})`);
      return true;
    }
    case 'clashOver':
      if (typeof msg.key === 'string') toNotices(`clashOver && __messages.clashOver(${JSON.stringify(msg.key)})`);
      return true;
    case 'log':
      console.log('dashboard page:', msg.msg);
      return true;
    default:
      return true;
  }
}

// ---------- terminal and chat windows ----------
// Terminal and friend-chat windows ride above the dashboard as its children, so clicking the dashboard never buries
// them, while going behind other apps with it; when a menu opens on the dashboard they step out of its way.
let modalOpen = false;
function pinToDash(win) {
  if (PROBE || !win || win.isDestroyed() || win.isMinimized()) return;
  const parent = !modalOpen && dash && !dash.isDestroyed() && dash.isVisible() && !dash.isMinimized() ? dash : null;
  if (win.getParentWindow() !== parent) win.setParentWindow(parent);
}
function pinAllToDash() {
  if (modalOpen || !dash || dash.isDestroyed() || !dash.isVisible() || dash.isMinimized()) return;
  for (const c of chats.values()) if (!c.steppedAside && c.win && !c.win.isDestroyed() && c.win.isVisible() && !c.win.isMinimized()) pinToDash(c.win);
  for (const w of panels.chats.values()) if (!w.steppedAside && !w.isDestroyed() && w.isVisible()) pinToDash(w);
}
function stepAside(open) {
  modalOpen = open;
  noteWindows.stepAside(open);
  for (const c of chats.values()) {
    if (!c.win || c.win.isDestroyed()) continue;
    if (open && c.win.isVisible() && !c.win.isMinimized() && !c.steppedAside) {
      c.steppedAside = true;
      c.win.setParentWindow(null);
      c.win.hide();
    } else if (!open && c.steppedAside) {
      c.steppedAside = false;
      pinToDash(c.win);
      c.win.showInactive();
    }
  }
  for (const w of panels.chats.values()) {
    if (w.isDestroyed()) continue;
    if (open && w.isVisible() && !w.steppedAside) {
      w.steppedAside = true;
      w.setParentWindow(null);
      w.hide();
    } else if (!open && w.steppedAside) {
      w.steppedAside = false;
      pinToDash(w);
      w.showInactive();
    }
  }
  return true;
}

function chatInfo(id, c) {
  const s = engine.live().find((x) => !x.ai && (x.tab === id || (c.sessionId && x.sessionId === c.sessionId)));
  // A chat with no live Claude after its first seconds is a terminal: Claude exited, or never started (not installed).
  const starting = c.claude && Date.now() - c.startedAt < 15_000;
  const status = !terminals.has(id) ? 'ended' : s ? s.status : starting ? 'busy' : 'terminal';
  // Another AI tool running in it (Codex, Antigravity…): the page leaves it the keys it needs (terminal.js).
  const tool = engine.live().find((x) => x.ai && x.tab === id);
  const title = (s && s.name) || c.title;
  // Streamer mode: the made-up project and folder the dashboard shows, and frosted glass over the terminal (what it
  // prints can't be swapped for made-up text).
  const on = streamer.on;
  // The AI session running in it (Claude, else Codex or Antigravity): its star in the chats list, its context and today's
  // counts on the strip, as each tab's chip shows them on the Mac. A plain terminal has neither.
  const ai = s || tool;
  const fav = favoriteIds(s, tool).some((x) => chatlist.isFavorite(x));
  return {
    title: on ? streamer.name(title) : title, status: status === 'shell' ? 'idle' : status, cwd: on ? streamer.folder(c.cwd) : tildify(c.cwd),
    tool: tool ? tool.name : null, streamer: on, chat: !!ai, fav,
    stats: ai ? { ctx: ai.ctx || 0, ctxMax: ai.ctxMax || 0, tools: ai.tools || 0, web: ai.web || 0, errors: ai.errors || 0 } : null,
  };
}

// The ids a chat window's star can mean in the chats list: Claude's session, or another AI tool's conversation (listed
// by it once saved) or its live session.
const favoriteIds = (s, tool) => (s ? [s.sessionId] : tool ? [tool.convId, tool.sessionId].filter(Boolean) : []);
const pushChatInfos = () => {
  for (const [id, c] of chats) send(c.win, 'term:info', chatInfo(id, c));
};

const tildify = (p) => (p && p.startsWith(os.homedir()) ? '~' + p.slice(os.homedir().length) : p || '');

/**
 * Which conversation a chat window shows. The engine finds a chat's Claude under the window's shell (`tab`), and that
 * always wins, also over a guess made before it came; until then a new chat takes the first live session in its folder.
 * A chat that outlived the last launch waits for the engine: the guess could take another chat in the same folder.
 */
function matchChats() {
  const live = engine.live();
  for (const s of live) {
    const c = !s.ai && s.tab && chats.get(s.tab);
    if (!c || c.sessionId === s.sessionId) continue;
    // A session the engine places in this window too keeps it (a Claude started inside the chat's Claude doesn't take
    // its window); a guess gives way.
    if (!live.some((x) => x.sessionId === c.sessionId && x.tab === s.tab)) c.sessionId = s.sessionId;
  }
  for (const [id, c] of chats) {
    if (!c.claude && c.sessionId && !live.some((x) => x.sessionId === c.sessionId && x.tab === id)) c.sessionId = null;
  }
  const taken = new Set([...chats.values()].map((c) => c.sessionId).filter(Boolean));
  for (const c of chats.values()) {
    if (!c.claude || c.sessionId || !c.claudeArgs) continue;
    const s = live.find((x) => !x.ai && !taken.has(x.sessionId) && samePath(x.cwd, c.cwd));
    if (s) {
      c.sessionId = s.sessionId;
      taken.add(s.sessionId);
    }
  }
}
const samePath = (a, b) => !!a && !!b && path.resolve(a).toLowerCase() === path.resolve(b).toLowerCase();

/**
 * A chat or terminal window. A new one starts its shell (Claude in it with `claudeArgs`); one given the `id` of a session
 * that outlived the app attaches to it instead (`claude`: whether it was started as a chat), hidden unless `show`.
 */
let chatCascade = 0;
// How much of what's behind shows through a terminal or note window: 90% opaque, no frost, as the Mac's
// (ChatWindowController.windowOpacity). Windows can't make a framed window see-through pixel by pixel (Electron's
// `transparent` needs a frameless one, which can't be resized), so the whole window is 90% opaque, its text and title bar
// too, where the Mac keeps the text solid.
const WINDOW_OPACITY = 0.9;
function openChatWindow({ id = crypto.randomUUID(), cwd, claudeArgs, claude = !!claudeArgs, sessionId, title, show = true }) {
  const home = chatHome(), area = home.workArea;
  const cascade = (chatCascade++ % 6) * 28;
  const place = wholeOnDisplay({ x: area.x + 120 + cascade, y: area.y + 80 + cascade, width: 960, height: 640 }, home);
  const win = new BrowserWindow({
    ...place, minWidth: 560, minHeight: 360, opacity: WINDOW_OPACITY,
    title: title || 'Orbiterm', backgroundColor: themes.color('--code-bg'), show: false, autoHideMenuBar: true,
    ...(PROBE ? { x: -32000, y: -32000, frame: false } : {}),
    webPreferences: webPrefs(),
  });
  bootFor(win.webContents, { termFont: termFontSize(), termFamily: termFont.chosen() });
  const c = { win, sessionId, cwd, claude, claudeArgs, title: title || path.basename(cwd || os.homedir()), startedAt: Date.now(), steppedAside: false };
  chats.set(id, c);
  win.on('focus', () => touchTerminal(id));
  // Real keys only (a modifier alone isn't typing): Viktoria may notice, and may come to hide this terminal.
  const MODIFIER_KEYS = ['Control', 'Shift', 'Alt', 'AltGraph', 'Meta', 'CapsLock', 'NumLock', 'ScrollLock', 'OS'];
  win.webContents.on('before-input-event', (_e, input) => {
    if (input.type === 'keyDown' && !MODIFIER_KEYS.includes(input.key)) mascot.onTyping(id);
  });
  // Where this window is and whether it shows decide where she can stand on it.
  for (const ev of ['move', 'resize', 'show', 'hide', 'minimize', 'restore', 'closed']) win.on(ev, () => mascot.terminalsChanged());
  win.loadFile(path.join(__dirname, '..', 'pages', 'terminal.html'));
  win.once('ready-to-show', () => {
    if (!show) return;
    if (PROBE) return win.showInactive();
    if (modalOpen) {
      c.steppedAside = true;
      return void pushWinOpen();
    }
    pinToDash(win);
    win.show();
    win.focus();
    touchTerminal(id);
    pushWinOpen();
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url).catch(() => {});
    return { action: 'deny' };
  });
  // A window pinned above the dashboard is its child, and Windows minimizes an owned window to a bar on the desktop
  // rather than the taskbar: it lets go of the dashboard on its way to the taskbar and pins again when it comes back,
  // as on the Mac.
  if (process.platform === 'win32') {
    win.hookWindowMessage(0x0112, (wParam) => {
      if ((wParam.readUInt32LE(0) & 0xfff0) === 0xf020 && win.getParentWindow()) win.setParentWindow(null);
    });
  }
  win.on('minimize', () => win.getParentWindow() && win.setParentWindow(null));
  win.on('restore', () => !c.steppedAside && pinToDash(win));
  // Once its first seconds are over a chat says what it is even if nothing else changes (chatInfo).
  if (claude) setTimeout(() => chats.get(id) === c && send(win, 'term:info', chatInfo(id, c)), 15_500);
  // Closing a window (Ctrl+Shift+W, its ×) only hides it, as on the Mac: what runs in it goes on, Claude as a session on the
  // orbit and a terminal as the same car it was (no blast), and a click there brings the window back. End Session ends
  // it. Quitting closes them all: their sessions were seen to just before (the host's go on).
  win.on('close', (e) => {
    if (quitting || !terminals.has(id)) return;
    e.preventDefault();
    c.steppedAside = false;
    win.setParentWindow(null);
    win.hide();
    if (activeTerminalId === id) {
      activeTerminalId = null;
      pushActiveSession();
    }
    pushWinOpen();
    pushTerminals();
    pushChats();
  });
  win.on('closed', () => {
    if (chats.get(id)?.win === win) {
      chats.delete(id);
      if (activeTerminalId === id) {
        activeTerminalId = null;
        pushActiveSession();
      }
      pushWinOpen();
    }
  });
  return id;
}

function showChat(id) {
  const c = chats.get(id);
  if (!c || c.win.isDestroyed()) return false;
  c.steppedAside = false;
  if (!c.win.isVisible() && !PROBE) c.win.setBounds(wholeOnDisplay(c.win.getBounds(), chatHome()));
  if (c.win.isMinimized()) c.win.restore();
  pinToDash(c.win);
  c.win.show();
  c.win.focus();
  touchTerminal(id);
  pushWinOpen();
  // The chats list's terminal rows say which windows show.
  pushTerminals();
  pushChats();
  return true;
}

/** The window of a process running outside the app, to the front: its own or the first of its parents' that has one. */
/**
 * The window of a process running outside the app, to the front (restored when it's minimized): its own or the first of
 * its parents' on screen, Windows Terminal's, VS Code's or a console's. Only a visible window counts: a shell in Windows
 * Terminal also has a hidden console window, which would take the click and show nothing. Explorer ends the search (a
 * shell started from the Start menu and handed to Windows Terminal has it as its parent): it would bring the desktop.
 */
function revealOutside(pid) {
  if (process.platform !== 'win32' || !(pid > 0)) return;
  const own = runaways.ais().find((a) => a.pid === pid);
  const ids = [pid, ...((own && own.chain) || runaways.parents(pid))].filter((n) => Number.isInteger(n) && n > 0);
  const script = [
    "Add-Type -Namespace Atl -Name Win -MemberDefinition '",
    '  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);',
    '  [DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr h, int cmd);',
    `  [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr h);'`,
    `foreach ($id in @(${ids.join(',')})) {`,
    '  $p = Get-Process -Id $id -ErrorAction SilentlyContinue',
    '  if (-not $p) { continue }',
    "  if ($p.ProcessName -eq 'explorer') { break }",
    '  $h = $p.MainWindowHandle',
    '  if ($h -eq [IntPtr]::Zero) { continue }',
    '  if ([Atl.Win]::IsIconic($h)) { [void][Atl.Win]::ShowWindowAsync($h, 9) }',
    '  if (-not [Atl.Win]::SetForegroundWindow($h)) { [void](New-Object -ComObject WScript.Shell).AppActivate([int]$id) }',
    '  break',
    '}',
  ].join('\n');
  // Encoded, so no quote in it is lost on the way to PowerShell.
  const encoded = Buffer.from(script, 'utf16le').toString('base64');
  execFile('powershell.exe', ['-NoProfile', '-NonInteractive', '-EncodedCommand', encoded], { windowsHide: true, timeout: 15_000 }, () => {});
}

function openSession(sid, fork) {
  if (!sid) return false;
  const liveList = engine.live();
  const liveAgy = !fork && liveList.find((s) => s.convId === sid);
  if (liveAgy) return openSession(liveAgy.sessionId, false);
  const live = liveList.find((s) => s.sessionId === sid);
  // Another AI tool (Codex…) has no conversation to resume or copy: a click shows the window it runs in, ours, or else
  // the terminal's outside the app (Windows Terminal, VS Code…), the first of its parents with a window.
  if (sid.startsWith('ai:')) {
    if (fork || !live) return false;
    if (live.tab && chats.has(live.tab) && terminals.has(live.tab)) return showChat(live.tab);
    revealOutside(live.pid);
    return true;
  }
  if (!fork) {
    // Running in one of the app's windows (a terminal Claude was started in, a chat back from the last launch): its
    // live process decides first, then the window that opened the conversation.
    if (live && live.tab && chats.has(live.tab) && terminals.has(live.tab)) return showChat(live.tab);
    for (const [id, c] of chats) if (c.sessionId === sid && terminals.has(id)) return showChat(id);
  }
  const cwd = engine.sessionCwd(sid) || (live && live.cwd);
  if (!cwd || !fs.existsSync(cwd)) {
    dialog.showMessageBox(dash || undefined, { type: 'warning', message: 'Project folder not found', detail: cwd || "Couldn't tell which folder this chat started in." });
    return false;
  }
  if (engine.sessionTool(sid) === 'antigravity') {
    if (fork) return false;
    openChatWindow({ cwd, claudeArgs: ['agy', '--conversation', sid], sessionId: sid, title: (live && live.name) || sid.slice(0, 8) });
    return true;
  }
  // A Codex conversation that isn't running (a running one showed its window above): Codex resumes it.
  if (engine.sessionTool(sid) === 'codex') {
    if (fork) return false;
    openChatWindow({ cwd, claudeArgs: ['codex', 'resume', sid], sessionId: sid, title: chatlist.title(sid) || sid.slice(0, 8) });
    return true;
  }
  // A chat running in another terminal can't be resumed twice: it opens as a copy, as "Open a Copy" does on the Mac.
  const copy = fork || !!live;
  openChatWindow({ cwd, claudeArgs: ['--resume', sid, ...(copy ? ['--fork-session'] : [])], sessionId: copy ? null : sid, title: (copy ? '⑂ ' : '') + ((live && live.name) || sid.slice(0, 8)) });
  return true;
}

/**
 * End Session, as on the Mac: the window goes and everything that runs in it ends, gently first (the host hangs the
 * session up, then ends what's still there three seconds on, a dev server that shrugged it off included). The dashboard
 * drops its session now and its car blows up now, not when the processes are gone.
 */
function endTerminal(id) {
  const c = chats.get(id);
  const t = terminals.list().find((x) => x.id === id);
  const tree = t && t.pid ? runaways.tree(t.pid) : [];
  // What it ran is on its way out: one that outlives the shell by a second or two isn't a car left behind.
  for (const p of tree) ending.set(p.pid, Date.now() + 10_000);
  // Without the host's help (a terminal running in the app, an older host), what the shell started apart from its
  // console is ended here once the rest has had its time.
  if (!terminals.end(id) && tree.length) setTimeout(() => runaways.fresh().then(() => runaways.kill(tree)), 3000);
  if (c && c.sessionId) {
    const live = engine.live().find((s) => s.sessionId === c.sessionId);
    engine.dismiss(c.sessionId, live && live.pid);
  }
  toDash(`terminalGone(${JSON.stringify(id)})`);
  if (c) {
    if (c.win && !c.win.isDestroyed()) c.win.destroy();
    chats.delete(id);
    pushWinOpen();
    pushChats();
  }
  quitIfIdle();
}

function endSession(sid) {
  const live = engine.live().find((s) => s.sessionId === sid);
  for (const [id, c] of chats) {
    if (c.sessionId === sid || (live && live.tab === id)) {
      endTerminal(id);
      return true;
    }
  }
  // Running outside the app: its process ends.
  if (live && live.pid) {
    // Another AI tool ends with all it started: Codex's launcher alone would leave its codex.exe running.
    if (live.ai) runaways.endLeft(live.pid, Number(sid.split(':')[2]));
    else {
      try {
        process.kill(live.pid);
      } catch {}
    }
  }
  engine.dismiss(sid, live && live.pid);
  return true;
}

// ---------- the orbit's cars ----------
// Every terminal of the app with no Claude in it is a car of its own (a chat whose Claude exited too), a closed one
// included, until End Session: what runs in it (its first job and the CPU that job's processes use) decides how it
// flies. What a closed terminal left running is an amber car (runaways.left) that ends with a click.
let terminalsJSON = '';
const ending = new Map(); // pid -> until when it's an ended terminal's process, not a car left behind
function pushTerminals(force) {
  const live = engine.live(), list = [], jobs = [];
  // The chats list shows them too, each in the folder it was opened in, with what runs in it and whether its window shows.
  const rows = [];
  for (const [pid, until] of ending) if (until < Date.now()) ending.delete(pid);
  for (const t of terminals.list()) {
    const c = chats.get(t.id);
    // Claude in it is a session on the orbit, not a car.
    if (!c || !t.pid || live.some((s) => s.tab === t.id) || (c.claude && chatInfo(t.id, c).status !== 'terminal')) continue;
    const kids = runaways.children(t.pid);
    if (kids.some((k) => /^claude$/i.test(k.name))) continue;
    const job = kids[0];
    if (job) jobs.push(job.pid);
    // The folder the job runs in (PowerShell's cd doesn't move the shell's own), else the one the terminal opened in.
    const cwd = (job && job.cwd) || c.cwd || os.homedir();
    const cmd = job ? commandLabel(job.cmd || job.name) : '';
    list.push({
      id: t.id, cwd: tildify(cwd), dir: path.basename(cwd) || cwd, cmd, running: !!job,
      cpu: Math.round(runaways.busy(kids.map((k) => k.pid))),
    });
    const home = c.cwd || os.homedir();
    const shown = !!c.win && !c.win.isDestroyed() && c.win.isVisible() && !c.win.isMinimized();
    rows.push({ id: t.id, cwd: home, title: path.basename(home) || home, job: cmd, shown });
  }
  rows.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  chatlist.setTerms(rows);
  for (const l of runaways.left(live)) {
    if (ending.has(l.pid)) continue;
    list.push({
      id: `left:${l.pid}:${l.started}`, cwd: tildify(l.cwd), dir: l.cwd ? path.basename(l.cwd) || l.cwd : l.name, cmd: commandLabel(l.cmd),
      running: true, cpu: Math.round(l.cpu), left: true, pid: l.pid, started: l.started,
    });
  }
  // Their folders come with the next reading, and the AI tools' (the title of their session), and the terminals' shells'
  // own (a relative path Ctrl-clicked in a terminal is from there).
  runaways.want([...jobs, ...runaways.ais().map((a) => a.pid), ...terminals.pids()]);
  list.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  const json = JSON.stringify(list);
  if (json === terminalsJSON && !force) return;
  terminalsJSON = json;
  toDash(`terminals(${json})`);
}

/** A process's command line as a car's label: `"C:\…\node.exe" "C:\…\npm-cli.js" run dev` -> "npm run dev". */
function commandLabel(cmd) {
  // A path is cut to its last part; a switch (/c) stays as it is.
  const words = (String(cmd).match(/"[^"]*"|\S+/g) || []).map((w) => w.replace(/^"|"$/g, '')).filter(Boolean)
    .map((w) => (/\\|.\//.test(w) ? path.win32.basename(w) : w));
  if (words.length) words[0] = words[0].replace(/\.(exe|cmd|bat)$/i, '');
  if (/^node(js)?$/i.test(words[0] || '') && words.length > 1) words.shift();
  if (/^np[mx]-cli\.js$/i.test(words[0] || '')) words[0] = words[0].slice(0, 3).toLowerCase();
  const label = words.join(' ');
  return label.length > 48 ? `${label.slice(0, 47)}…` : label;
}

// The terminal pages' lines to their shells.
// Viktoria's window has no line to any of these (the preload gives it none either, but it is refused here too).
const chatOf = (e) => !mascot.has(e.sender) && [...chats.entries()].find(([, c]) => c.win && !c.win.isDestroyed() && c.win.webContents === e.sender);
ipcMain.on('term:ready', (e, { cols, rows }) => {
  const found = chatOf(e);
  if (!found) return;
  const [id, c] = found;
  // A new window starts its shell; one for a session that's already running (it outlived the app, or the page
  // reloaded) attaches to it.
  if (terminals.has(id)) terminals.attach(id, cols, rows);
  else {
    terminals
      .spawn({ id, cwd: c.cwd, claudeArgs: c.claudeArgs, cols, rows, title: c.title })
      .catch((err) => send(c.win, 'term:data', `\r\n\x1b[31m${err.message}\x1b[0m\r\n`));
  }
  send(c.win, 'term:info', chatInfo(id, c));
});
ipcMain.on('term:input', (e, data) => {
  const found = chatOf(e);
  if (found) {
    // The shell's focus reports (ESC[I, ESC[O, which xterm.js sends as the window gains or loses focus) aren't the user
    // at it: a window losing focus, or closed, would take the chats list's "active window" back from the one in front.
    if (data !== '\x1b[I' && data !== '\x1b[O') touchTerminal(found[0]);
    terminals.write(found[0], data);
  }
});
ipcMain.on('term:resize', (e, { cols, rows }) => {
  const found = chatOf(e);
  if (found) terminals.resize(found[0], cols, rows);
});
ipcMain.on('term:end', (e) => {
  const found = chatOf(e);
  if (found) endTerminal(found[0]);
});
ipcMain.on('term:close', (e) => {
  const found = chatOf(e);
  if (found && found[1].win && !found[1].win.isDestroyed()) found[1].win.close();
});
// The strip's star: the AI session in this window in or out of the chats list's favourites, as its row's star does
// (the Mac's toggleFavorite). Nothing to star in a plain terminal.
ipcMain.on('term:favorite', (e) => {
  const found = chatOf(e);
  if (!found) return;
  const [id, c] = found;
  const live = engine.live();
  const s = live.find((x) => !x.ai && (x.tab === id || (c.sessionId && x.sessionId === c.sessionId)));
  const ids = favoriteIds(s, live.find((x) => x.ai && x.tab === id));
  const pick = ids.find((x) => chatlist.isFavorite(x)) || ids.find((x) => chatlist.listed(x));
  if (!pick) return;
  chatlist.toggleFavorite(pick);
  pushChats(true);
  pushChatInfos();
});
ipcMain.on('term:copy', (e, text) => {
  if (chatOf(e) && typeof text === 'string' && text) clipboard.writeText(text);
});
ipcMain.on('term:dashboard', (e) => {
  if (!mascot.has(e.sender)) showDashboard();
});
// The folder a terminal's relative paths are from: its shell's (or Claude's) own, else the one it started in.
function termCwd(id, c) {
  const pid = terminals.list().find((t) => t.id === id)?.pid;
  return (pid && runaways.cwd(pid)) || c.cwd || os.homedir();
}
// Which of a line's pieces name files, as the pointer goes over it (a Ctrl-click opens one): [{ path, line, column }
// or null], one for each of `q.links` ({ text, start }) in `q.rows[q.at]`.
ipcMain.handle('term:paths', (e, q) => {
  const found = chatOf(e);
  if (!found || !q || !Array.isArray(q.links)) return [];
  const cwd = termCwd(...found);
  return q.links.slice(0, 40).map((l) => linkTarget({ ...l, rows: q.rows, at: q.at }, cwd, os.homedir()));
});
// A path Ctrl-clicked (worked out again here), or a file:// link the program printed (OSC 8).
ipcMain.on('term:openFile', (e, q) => {
  const found = chatOf(e);
  if (!found || !q) return;
  const cwd = termCwd(...found);
  if (typeof q.url === 'string') {
    const p = fileFromURL(q.url);
    if (p) openTerminalFile({ path: p, line: null, column: null }, cwd);
    return;
  }
  openTerminalFile(linkTarget(q, cwd, os.homedir()), cwd);
});
ipcMain.on('term:open', (e, uri) => {
  if (mascot.has(e.sender) || typeof uri !== 'string') return;
  const clean = uri.trim().replace(/^['"<]+|['">.,;:!?)]+$/g, '');
  if (/^https?:\/\//i.test(clean)) shell.openExternal(clean).catch(() => {});
});

// ---------- the overlay: the shortcut wheel and the new-terminal folder picker, over the whole screen ----------
let over = null, overReady = false, overPending = null;
function showOverlay(js) {
  if (!over || over.isDestroyed()) {
    overReady = false;
    over = new BrowserWindow({
      frame: false, transparent: true, resizable: false, movable: false, show: false, skipTaskbar: true, hasShadow: false,
      alwaysOnTop: true, backgroundColor: '#00000000', webPreferences: webPrefs(),
    });
    bootFor(over.webContents);
    over.webContents.on('render-process-gone', () => {
      overReady = false;
      setTimeout(() => over && !over.isDestroyed() && over.webContents.reload(), 500);
    });
    checkPages();
    over.loadFile(path.join(WEB, 'overlay.html'));
    over.on('blur', hideOverlay);
  }
  const d = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
  over.setBounds(d.bounds);
  over.setAlwaysOnTop(true, 'pop-up-menu');
  over.show();
  over.focus();
  if (overReady) run(over, js);
  else overPending = js;
  return true;
}
function hideOverlay() {
  if (!over || over.isDestroyed() || !over.isVisible()) return;
  over.hide();
  if (overReady) run(over, 'window.Shortcuts && Shortcuts.close(true); document.querySelector("#picker .l-close")?.click()');
}
/** The wheel, centred where the pointer is (Ctrl and the middle mouse button, or Ctrl+K: Windows has no four-finger
 *  click). */
function showShortcuts() {
  wheelOpened();
  const p = screen.getCursorScreenPoint();
  const d = screen.getDisplayNearestPoint(p);
  const z = (over && !over.isDestroyed() && over.webContents.getZoomFactor()) || themes.uiScale() || 1;
  return showOverlay(`Overlay.shortcuts(${Math.round((p.x - d.bounds.x) / z)}, ${Math.round((p.y - d.bounds.y) / z)})`);
}
// Ctrl and the middle button in any of the app's windows (preload.js).
ipcMain.on('atl:wheel', (e) => {
  if (!mascot.has(e.sender)) showShortcuts();
});

// ---------- what's new and the tips ----------
// What's new is off on Windows (whatsnew.js), so the page never asks; kept as on the Mac for when it's turned on. Windows
// has no build number (cloud.js), so `whatsNewUnread` would hold the app's version.
function pushWhatsNew() {
  const state = { unread: settings.get('whatsNewUnread') === app.getVersion(), wheel: settings.get('tipUsedWheel') === true };
  toDash(`whatsNew(${JSON.stringify({ state })})`);
}
// The shortcut wheel opened at least once: its tip on the dashboard is only for someone who never did.
function wheelOpened() {
  if (settings.get('tipUsedWheel') === true) return;
  settings.set('tipUsedWheel', true);
  pushWhatsNew();
}
// Help > What's New ('notes') or Tips ('tips'), and the "updated" note's click: the dashboard in front, the window open.
function openWhatsNew(what) {
  showDashboard();
  toDash(`whatsNew(${JSON.stringify({ open: what === 'tips' ? 'tips' : 'notes' })})`);
}
// Settings…: the dashboard in front, Settings open on the category used last.
function openSettings() {
  showDashboard();
  toDash('openSettings(null)');
}

// ---------- the messages panels: the corner's notices and friends' chats ----------
// Each chat panel's intended bounds: on a scaled display (125%, 150%) Electron's getBounds() rounds up by a pixel, so
// reading it back on every drag step would grow the panel as it moves.
const panelBounds = new WeakMap();
// A level-up or a new badge takes the screen (the notices' takeover): keys do nothing while it plays (as long as the page
// asks, 4 s at most), then a key ends it (a badge's reveal jumps to its burst), as on the Mac (Messages.swift holds).
const takeover = { on: false, lockedUntil: 0 };
function panelWindow(role, friend) {
  const win = new BrowserWindow({
    width: 380, height: 140, frame: false, transparent: true, resizable: false, show: false, skipTaskbar: role === 'notices',
    alwaysOnTop: role === 'notices', hasShadow: false, backgroundColor: '#00000000', webPreferences: webPrefs(),
  });
  // The chat window's saved size (page px, without the glow's ring) goes in as __CHAT_SIZE__ (preload.js).
  const savedSize = settings.get('chatWindowSize');
  const chatSize = role === 'chat' && Array.isArray(savedSize) && savedSize.length === 2 && savedSize.every((v) => Number.isFinite(v) && v >= 1) ? savedSize : null;
  bootFor(win.webContents, { role, friend, chatSize });
  if (role === 'notices') {
    win.webContents.on('before-input-event', (e, input) => {
      if (input.type !== 'keyDown' || !(takeover.on || Date.now() < takeover.lockedUntil)) return;
      e.preventDefault();
      if (Date.now() >= takeover.lockedUntil) run(win, 'window.__messages && __messages.skip && __messages.skip()');
    });
  }
  panelWaiting.set(win, []);
  win.webContents.on('render-process-gone', () => {
    panelWaiting.set(win, []);
    if (role === 'notices' && !win.isDestroyed()) {
      win.setIgnoreMouseEvents(false);
      win.hide();
    }
    setTimeout(() => !win.isDestroyed() && win.webContents.reload(), 500);
  });
  checkPages();
  win.loadFile(path.join(WEB, 'messages.html'));
  return win;
}

// The level-up waits for the app to be in front (the notices' "focus"), as on the Mac.
function tellFocus() {
  const focused = !!BaseWindow.getFocusedWindow();
  toNotices(`focus(${focused})`);
  if (dash && !dash.isDestroyed()) toDash(`visibility(${dash.isVisible() && !dash.isMinimized()}, ${focused})`);
}
app.on('browser-window-focus', tellFocus);
// Going from one of the app's windows to another blurs the first before the second has focus.
app.on('browser-window-blur', () => setImmediate(tellFocus));
// Viktoria greets when the app comes to the front and lets go of the cursor when it leaves.
app.on('browser-window-focus', () => setImmediate(() => mascot.focusChanged()));
app.on('browser-window-blur', () => setImmediate(() => mascot.focusChanged()));

// ---------- a chat that needs you ----------
// A chat waiting for the user (an approval, a question) while the app is behind other windows: a notice in the corner
// (the notices' "NEEDS YOU") until the chat moves on or the app comes to the front, as on the Mac (WaitNotifier.swift).
// With the app in front nothing pops up: the chat itself shows that it waits.
const waitNotices = { waits: new Map(), shown: new Set(), primed: false }; // sid -> what it waits for; those in the corner

// One of the app's windows has the keys; the corner's notices don't count (a click on one is how it's answered).
function appInFront() {
  const w = BaseWindow.getFocusedWindow();
  return !!w && w !== panels.notices;
}

function updateWaits() {
  const now = new Map(), byId = new Map();
  for (const s of engine.live()) {
    if (s.status !== 'waiting') continue;
    now.set(s.sessionId, s.waitingFor || '');
    byId.set(s.sessionId, s);
  }
  for (const id of waitNotices.shown) {
    if (now.has(id)) continue;
    waitNotices.shown.delete(id);
    toNotices(`waitOver && __messages.waitOver(${JSON.stringify(id)})`);
  }
  // The first state only says what was already waiting at launch: no notices for that.
  if (waitNotices.primed && !appInFront()) {
    for (const [id, what] of now) {
      const before = waitNotices.waits.get(id);
      // Still the same wait: one notice is enough. Another question in the same chat is a new one.
      if (before !== undefined && (!before || !what || before === what)) continue;
      toNotices(`wait && __messages.wait(${JSON.stringify(waitNotice(byId.get(id)))})`);
      waitNotices.shown.add(id);
    }
  }
  waitNotices.waits = now;
  waitNotices.primed = true;
}

// The app came to the front: the user sees the chats themselves.
app.on('browser-window-focus', (e, w) => {
  if (w === panels.notices) return;
  for (const id of waitNotices.shown) toNotices(`waitOver && __messages.waitOver(${JSON.stringify(id)})`);
  waitNotices.shown.clear();
});

// Whitespace runs fold to one space; longer text ends in "…" (engine.js's clip).
function clip(s, n) {
  const t = String(s || '').split(/\s+/).filter(Boolean).join(' ');
  const chars = Array.from(t);
  return chars.length > n ? chars.slice(0, n - 1).join('') + '…' : t;
}

// Which chat, where (another AI tool's name first), what it waits for.
function waitNotice(s) {
  // Streamer mode: the made-up names the dashboard shows.
  const on = streamer.on;
  const folder = on ? streamer.project(s.cwd) : path.basename(s.cwd || '') || s.cwd || '';
  const real = (!s.ai && chatlist.title(s.sessionId)) || s.title || s.prompt || '';
  const name = on && real ? streamer.fake('title', real) : real;
  const what = s.waitingFor ? (on ? streamer.fake('wait', s.waitingFor) : s.waitingFor) : 'waiting for your approval';
  return { sid: s.sessionId, title: clip(name || folder, 80), folder: (s.ai ? `${s.name} · ` : '') + folder, what: clip(what, 200) };
}

// A click on one: that chat in front, or the terminal it runs in outside the app (Windows Terminal, VS Code…), as iTerm2
// or Terminal comes forward on the Mac; a copy of it would only ask again.
function openWait(sid) {
  if (typeof sid !== 'string' || !sid) return false;
  const live = engine.live().find((s) => s.sessionId === sid);
  if (live && !live.ai && live.host === 'term') {
    revealOutside(live.pid);
    return true;
  }
  return openSession(sid, false);
}

function tellShowing() {
  toNotices(`showing && __messages.showing(${JSON.stringify([...panels.showing])})`);
}

function notices() {
  if (PROBE) return null;
  if (!panels.notices || panels.notices.isDestroyed()) panels.notices = panelWindow('notices');
  return panels.notices;
}

// A friend's chat, all of it on one display (by default the one it's mostly on), moved in from the edges (cut to fit
// only where the display is smaller). With several displays a chat opened where it was left on one since unplugged or
// moved, or grew past the bottom, out of sight.
function wholeOnDisplay(r, display = screen.getDisplayMatching(r)) {
  const a = display.workArea;
  const width = Math.min(r.width, a.width), height = Math.min(r.height, a.height);
  return { x: Math.min(Math.max(r.x, a.x), a.x + a.width - width), y: Math.min(Math.max(r.y, a.y), a.y + a.height - height), width, height };
}

// The display a chat opens on, as on the Mac: the dashboard's while it's on screen, else the one in use (the pointer's).
// Opening where it was last left could put it on another display, out of sight of someone looking at the dashboard.
function chatHome() {
  if (dash && !dash.isDestroyed() && dash.isVisible() && !dash.isMinimized()) return screen.getDisplayMatching(dash.getBounds());
  return screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
}

// A display plugged in, unplugged or changed: the chats on screen come back into view, whole.
let watchingDisplays = false;
function watchDisplays() {
  if (watchingDisplays) return;
  watchingDisplays = true;
  for (const event of ['display-added', 'display-removed', 'display-metrics-changed']) {
    screen.on(event, () => {
      for (const w of panels.chats.values()) {
        if (w.isDestroyed() || !w.isVisible()) continue;
        const b = panelBounds.get(w) || w.getBounds();
        const next = wholeOnDisplay({ x: Math.round(b.x), y: Math.round(b.y), width: b.width, height: b.height });
        panelBounds.set(w, next);
        w.setBounds(next);
      }
    });
  }
}

// The one chat window, a tab for each conversation (panels.chats keeps it under one key). Closing it only hides it: its
// page, the friends list and the conversations stay, and live events keep them current.
function chatPanel() {
  watchDisplays();
  let win = panels.chats.get('chat');
  if (!win || win.isDestroyed()) {
    win = panelWindow('chat');
    panels.chats.set('chat', win);
    win.on('closed', () => {
      if (panels.chats.get('chat') === win) panels.chats.delete('chat');
      if (panels.showing.size) {
        panels.showing.clear();
        tellShowing();
      }
    });
  }
  return win;
}

// The chat window made ahead of time, hidden, so the first chat opened doesn't wait for its page and the friends list.
function warmChat() {
  if (PROBE || panels.chats.has('chat')) return;
  runPanel(chatPanel(), 'window.__messages && __messages.warm && __messages.warm()');
}

function openFriendChat(friend) {
  if (!friend) return false;
  // The conversation, loaded and in front (the window and its tab come forward).
  runPanel(chatPanel(), `window.__messages && __messages.open(${JSON.stringify(friend)})`);
  return true;
}

function handleMessages(win, body) {
  const role = win === panels.notices ? 'notices' : 'chat';
  switch (body.type) {
    case 'ready': {
      const waiting = panelWaiting.get(win) || [];
      panelWaiting.delete(win);
      for (const js of waiting) run(win, js);
      if (role === 'notices') {
        tellFocus();
        if (panels.showing.size) tellShowing();
        const xp = cloud.json().xp;
        if (xp) toNotices(`xp(${JSON.stringify(xp)})`);
      }
      return true;
    }
    case 'layout': {
      // The page measures in its own pixels: at a zoom other than 100% (the dashboard's text size, which Chromium gives
      // every page of the app's), the window is that many times larger.
      const z = win.webContents.getZoomFactor() || 1;
      const w = Math.round((body.w || 0) * z), h = Math.round((body.h || 0) * z);
      // The takeover's keys: held while it's on screen, free once the panel is a notice again (or gone).
      if (role === 'notices') {
        takeover.on = body.place === 'screen' && w >= 1 && h >= 1;
        if (!takeover.on) takeover.lockedUntil = 0;
      }
      if (w < 1 || h < 1) {
        if (role === 'notices') win.setIgnoreMouseEvents(false);
        win.steppedAside = false;
        win.setParentWindow(null);
        win.hide();
        // The chat window is only hidden (its page and tabs stay); nobody's tab is showing now.
        if (role === 'chat' && panels.showing.size) {
          panels.showing.clear();
          tellShowing();
        }
        return true;
      }
      // An edge being dragged (messages.js): one setBounds with the new size, the left/top edges moving the corner in
      // the same call, and nothing else.
      if (role === 'chat' && body.live === true && win.isVisible()) {
        const cur = panelBounds.get(win) || win.getBounds();
        const next = wholeOnDisplay({ x: Math.round(cur.x + (Number(body.dx) || 0) * z), y: Math.round(cur.y + (Number(body.dy) || 0) * z), width: w, height: h });
        panelBounds.set(win, next);
        win.setBounds(next);
        return true;
      }
      if (role === 'notices') {
        const d = chatHome();
        win.setIgnoreMouseEvents(body.place === 'fire', { forward: true });
        if (body.place === 'screen') {
          win.setAlwaysOnTop(true, 'screen-saver');
          win.setBounds(d.bounds);
          win.show();
          win.focus();
        } else {
          win.setAlwaysOnTop(true, 'floating');
          const a = d.workArea;
          const at = body.place === 'center' ? { x: a.x + Math.round((a.width - w) / 2), y: a.y + Math.round((a.height - h) / 2) } : { x: a.x + a.width - w - 12, y: a.y + a.height - h - 12 };
          win.setBounds(body.place === 'fire' ? a : { ...at, width: w, height: h });
          if (!win.isVisible()) win.showInactive();
        }
      } else {
        const cur = panelBounds.get(win) || win.getBounds();
        let next;
        if (!win.isVisible() && !win.steppedAside) {
          // Where it was left while that's on the display it opens on (give or take 40 px), else that display's middle;
          // a chat opened while others are on screen cascades from the last one, as on the Mac.
          const home = chatHome(), a = home.workArea;
          const other = [...panels.chats.values()].reverse().find((p) => p !== win && !p.isDestroyed() && p.isVisible());
          const ob = other && (panelBounds.get(other) || other.getBounds());
          const saved = settings.get('chatWindowTopLeft');
          const p = Array.isArray(saved) && saved.length === 2 && { x: saved[0] + 40, y: saved[1] + 20 };
          const left = p && p.x >= a.x - 40 && p.x < a.x + a.width + 40 && p.y >= a.y - 40 && p.y < a.y + a.height + 40;
          const [x, y] = ob ? [Math.round(ob.x) + 34, Math.round(ob.y) + 34] : left ? saved : [a.x + Math.round((a.width - w) / 2), a.y + Math.round((a.height - h) / 2)];
          next = wholeOnDisplay({ x, y, width: w, height: h }, home);
        } else {
          next = wholeOnDisplay({ x: Math.round(cur.x), y: Math.round(cur.y), width: w, height: h });
        }
        panelBounds.set(win, next);
        win.setBounds(next);
        if (modalOpen) {
          win.steppedAside = true;
          return true;
        }
        pinToDash(win);
        if (body.focus) {
          win.show();
          win.focus();
        } else if (!win.isVisible()) win.showInactive();
      }
      return true;
    }
    case 'drag': {
      if (role !== 'chat') return true;
      const b = panelBounds.get(win) || win.getBounds(), z = win.webContents.getZoomFactor() || 1;
      b.x += (body.dx || 0) * z;
      b.y += (body.dy || 0) * z;
      panelBounds.set(win, b);
      win.setBounds({ x: Math.round(b.x), y: Math.round(b.y), width: b.width, height: b.height });
      return true;
    }
    case 'dragEnd': {
      if (role !== 'chat') return true;
      const b = panelBounds.get(win) || win.getBounds();
      const next = wholeOnDisplay({ x: Math.round(b.x), y: Math.round(b.y), width: b.width, height: b.height });
      panelBounds.set(win, next);
      win.setBounds(next);
      settings.set('chatWindowTopLeft', [next.x, next.y]);
      // Its size too (the page's px, without the 8 px glow ring each side), after an edge made it larger or smaller.
      const z = win.webContents.getZoomFactor() || 1;
      settings.set('chatWindowSize', [Math.round(next.width / z) - 16, Math.round(next.height / z) - 16]);
      return true;
    }
    // A friend's picture or name in the chat: the dashboard in front, on the friends with their card.
    case 'openFriend':
      if (role !== 'chat' || typeof body.id !== 'string' || !body.id) return true;
      showDashboard();
      toDash(`openFriend(${JSON.stringify([body.id]).slice(1, -1)})`);
      return true;
    // The "updated" note was clicked: what's new in the version you're on.
    case 'openWhatsNew':
      openWhatsNew('notes');
      return true;
    case 'openUpdate':
      showDashboard();
      toDash('openUpdate()');
      return true;
    case 'openProfile':
      showDashboard();
      toDash('openProfile()');
      return true;
    case 'openNotifications':
      showDashboard();
      toDash('openView("notifications")');
      return true;
    case 'openDanger':
      showDashboard();
      toDash('openDanger()');
      return true;
    case 'endRunaway':
      return runaways.end(body.pid, body.started);
    case 'openWait':
      return openWait(body.sid);
    // The "same file" notice: the dashboard in front, on its panels (files.heat names the file).
    case 'openClash':
      showDashboard();
      toDash('openView("dash")');
      return true;
    case 'openChat':
      return openFriendChat(body.id);
    // A code block's Copy, or Copy text on a message (the page's own clipboard refuses a window without focus).
    case 'copyText':
      if (typeof body.text === 'string' && body.text) clipboard.writeText(body.text);
      return true;
    // The takeover's lock on the keys (ms; 0 frees them).
    case 'lock':
      if (role === 'notices') takeover.lockedUntil = Date.now() + Math.min(Math.max(Number(body.ms) || 0, 0), 4000);
      return true;
    case 'showing': {
      // The friends whose tabs are open in the chat window (or no one anymore): no pop-ups for them. `id`, the old
      // form, is the one in front.
      if (role !== 'chat') return true;
      panels.showing.clear();
      if (Array.isArray(body.ids)) {
        for (const id of body.ids) if (typeof id === 'string' && id) panels.showing.add(id);
      } else if (typeof body.id === 'string' && body.id) {
        panels.showing.add(body.id);
      }
      tellShowing();
      return true;
    }
    case 'log':
      console.log(`${role} page:`, body.msg);
      return true;
    default:
      return true;
  }
}

// ---------- updates: the releases repo's "windows" release (electron-updater; scripts/release.js) ----------
// A new version downloads by itself and goes in, as on the Mac, when the user has stepped away for 10 minutes (or wants
// updates right away) and the restart stops nothing: chats in the session host go on across it. One running in the app
// itself (no host) would end, so then it waits for the user's quit (or "update now").
const updates = (() => {
  let offer = null, ready = false, busy = null, checking = false, checkedAt = null, error = null;
  // How far the download has come (0…1, whole percents), as on the Mac: the page's bar and "updating 42%", so a long
  // download never looks frozen.
  let progress = null;
  // "Update now" pressed while the update was still downloading (the notice of a new version comes as its download
  // starts): it goes in the moment the download is done, as on the Mac, rather than waiting for the user to step away
  // while the page says "downloading…" with no way out.
  let whenReady = false;
  let forcedVersion = null, forcedAt = 0, last426At = 0;
  let downloading = false, downloadingAt = 0, downloadFailures = 0, nextRetryAt = 0;
  const RETRY_BACKOFF = [60_000, 300_000, 900_000, 1_800_000];
  const isDownloading = () => downloading && Date.now() - downloadingAt < 300_000;
  const shouldCheck = (v, ignoreBackoff = false) => {
    if (!v || !newerVersion(v, app.getVersion())) return false;
    if (!offer || newerVersion(v, offer.version)) return true;
    if (v === offer.version && !ready) {
      if (isDownloading()) return false;
      return ignoreBackoff || Date.now() >= nextRetryAt;
    }
    return false;
  };
  const usable = !!autoUpdater && app.isPackaged && !PROBE && !STAGING;
  const rightAway = () => !!settings.get('updateRightAway');
  const maybeRestart = () => {
    if (!ready || busy) return;
    const localRunning = terminals.list().some((t) => terminals.local(t.id));
    if (offer && forcedVersion === offer.version) {
      if (!localRunning || (forcedAt && Date.now() - forcedAt >= 3600_000)) install();
      return;
    }
    if (localRunning) return;
    if (rightAway() || powerMonitor.getSystemIdleTime() >= 600) install();
  };
  const install = () => {
    whenReady = false;
    busy = 'restarting…';
    pushCloud();
    setImmediate(() => autoUpdater.quitAndInstall(true, true));
  };
  if (usable) {
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;
    autoUpdater.on('update-available', (i) => {
      // A newer one than an update already downloaded: that one isn't what goes in any more.
      ready = false;
      const isNewOffer = !offer || offer.version !== i.version;
      if (isNewOffer) {
        downloadFailures = 0;
        nextRetryAt = 0;
      }
      downloading = true;
      downloadingAt = Date.now();
      offer = { version: i.version, build: 0, notes: notesOf(i.releaseNotes) };
      pushCloud();
      if (isNewOffer) toNotices(`update(${JSON.stringify({ version: i.version, build: 0 })})`);
    });
    autoUpdater.on('download-progress', (p) => {
      downloading = true;
      downloadingAt = Date.now();
      const f = Math.min(1, Math.floor(Number(p && p.percent) || 0) / 100);
      if (f === progress) return;
      progress = f;
      pushCloud();
    });
    autoUpdater.on('update-downloaded', () => {
      downloading = false;
      downloadFailures = 0;
      nextRetryAt = 0;
      ready = true;
      progress = null;
      pushCloud();
      if (whenReady) install();
      else maybeRestart();
    });
    autoUpdater.on('error', (e) => {
      console.error('updates:', e.message);
      downloading = false;
      progress = null;
      if (offer && !ready) {
        downloadFailures += 1;
        nextRetryAt = Date.now() + RETRY_BACKOFF[Math.min(downloadFailures - 1, RETRY_BACKOFF.length - 1)];
      }
      // The installer didn't start: this version stays, the page says the update failed, and "update now" can be
      // pressed again.
      if (busy === 'restarting…') {
        busy = null;
        error = 'failed';
        pushCloud();
      }
    });
    const look = () => {
      poll().catch(() => {});
      apiRelease().catch(() => {});
    };
    setTimeout(look, 10_000);
    setInterval(look, 60_000);
    // Back from sleep or the lock screen: at once, not at the next minute.
    powerMonitor.on('resume', look);
    powerMonitor.on('unlock-screen', look);
    setInterval(maybeRestart, 60_000);
  }

  // A new release shows within a minute of going out, as on the Mac (whose heartbeat asks the API every minute; it was
  // every 30 minutes here, so a release could wait half an hour to be seen): the feed's latest.yml, about 1 KB, is read
  // every minute with a time limit, and electron-updater only asked when it names a newer version than this one and the
  // one on offer, so its notice comes once.
  //
  // Where to look is in resources\app-update.yml, written by the release. When it's missing (0.22.0 and 0.22.1 went out
  // without it and never looked for an update) or the API names another feed (apiRelease), a copy of our own in the
  // profile is used instead, so the check never hangs on that one file.
  const OWN_FEED = 'https://github.com/atalaykarahan/orbiterm-releases/releases/download/windows';
  // The only feeds taken from the API: one release (a plain tag, no "/" or "%", so no "../" can lead elsewhere on GitHub)
  // of the app's own releases repo. The installer isn't code-signed: where it comes from is what keeps it the app's own.
  // The repo was atalay-terminal-releases until 0.22.3; GitHub still forwards that name, and the server may give it.
  const FEED_RE = /^https:\/\/github\.com\/atalaykarahan\/(?:orbiterm|atalay-terminal)-releases\/releases\/download\/[A-Za-z0-9_-][A-Za-z0-9._-]{0,63}$/;
  let feed = null;
  function useFeed(url) {
    const file = path.join(app.getPath('userData'), 'app-update.yml');
    fs.writeFileSync(file, `provider: generic\nurl: ${url}\nupdaterCacheDirName: ${require('../package.json').name}-updater\n`);
    autoUpdater.updateConfigPath = file;
    feed = url;
  }
  if (usable) {
    try {
      const m = /^url:\s*(.+)$/m.exec(fs.readFileSync(path.join(process.resourcesPath, 'app-update.yml'), 'utf8'));
      feed = m ? m[1].trim().replace(/^['"]|['"]$/g, '').replace(/\/+$/, '') : null;
    } catch {}
    try {
      if (!feed) useFeed(OWN_FEED);
    } catch (e) {
      console.error('updates:', e.message);
    }
  }
  // The server's word on the current Windows release (GET /v1/releases/windows, open: it needs no key, so it reaches an
  // app whose key has died too). When it names a version newer than this one and the one on offer, electron-updater is
  // asked at once, in the feed it names if that's a release of the app's own repo: the update can be offered from the
  // server even when this app's own look at the feed went wrong, and nothing from anywhere else is ever installed.
  async function apiRelease(ignoreBackoff = false) {
    const res = await net.fetch(`${API_BASE}/v1/releases/windows`, { cache: 'no-store', signal: AbortSignal.timeout(20_000) });
    if (!res.ok) return;
    const r = await res.json();
    const version = r && typeof r.version === 'string' ? r.version : '';
    const url = r && typeof r.feed === 'string' ? r.feed.replace(/\/+$/, '') : '';
    const validVersion = /^\d+\.\d+\.\d+$/.test(version) && newerVersion(version, app.getVersion());
    if (r && r.force && validVersion) {
      if (forcedVersion !== version) {
        forcedVersion = version;
        forcedAt = Date.now();
      }
      if (ready && offer && offer.version === version) maybeRestart();
    } else {
      forcedVersion = null;
      forcedAt = 0;
    }
    if (!validVersion || !shouldCheck(version, ignoreBackoff) || !FEED_RE.test(url)) return;
    if (url !== feed) {
      // A feed named by mistake mustn't take the place of one that works: taken only once it holds a newer version.
      if (!shouldCheck(await feedVersion(url), ignoreBackoff)) return;
      useFeed(url);
    }
    askUpdater();
  }
  async function feedVersion(base = feed) {
    const res = await net.fetch(`${base}/latest.yml?t=${Date.now()}`, { cache: 'no-store', signal: AbortSignal.timeout(20_000) });
    if (!res.ok) throw new Error(`latest.yml: HTTP ${res.status}`);
    const m = /^version:\s*['"]?(\d[^'"\s]*)/m.exec(await res.text());
    if (!m) throw new Error('latest.yml: no version');
    return m[1];
  }
  let polling = null;
  function poll(ignoreBackoff = false) {
    if (!feed) return Promise.resolve(null);
    if (!polling) {
      polling = feedVersion()
        .then((v) => {
          if (shouldCheck(v, ignoreBackoff)) askUpdater();
          return v;
        })
        .finally(() => (polling = null));
    }
    return polling;
  }
  // electron-updater's own check, which downloads what it finds. Its requests are to time out through their socket,
  // which Electron's requests don't have: one that stalls never ends, and every later check is handed that same one. So
  // one still out after two minutes is let go, and the next check starts afresh.
  let asking = null, askedAt = 0;
  function askUpdater() {
    if (asking && Date.now() - askedAt < 120_000) return;
    if (asking) autoUpdater.checkForUpdatesPromise = null;
    askedAt = Date.now();
    const p = autoUpdater
      .checkForUpdates()
      .catch(() => {})
      .finally(() => {
        if (asking === p) asking = null;
      });
    asking = p;
  }

  return {
    state: () => ({ update: offer, updateReady: ready, updating: busy, updateProgress: progress, updateError: error, updateRightAway: rightAway(), checking, checkedAt, xpPaused: false }),
    // Settings' "check for updates": answered within the feed's time limit, even with the network hanging.
    async check() {
      if (!usable) return;
      checking = true;
      pushCloud();
      try {
        await Promise.allSettled([poll(true), apiRelease(true)]);
        // What electron-updater found, when it was asked, comes before "up to date" would.
        if (asking) await Promise.race([asking, new Promise((r) => setTimeout(r, 20_000))]);
      } catch {}
      checking = false;
      checkedAt = Date.now();
      pushCloud();
    },
    now() {
      if (!usable || !offer || busy) return;
      error = null;
      if (ready) return install();
      busy = 'downloading…';
      whenReady = true;
      downloading = true;
      downloadingAt = Date.now();
      pushCloud();
      // The download already running is the one waited for. When it fails (offline), the page says so and "update now"
      // comes back for another try, instead of "downloading…" staying for ever.
      autoUpdater.downloadUpdate().catch(() => {
        downloading = false;
        if (busy !== 'downloading…') return;
        whenReady = false;
        busy = null;
        progress = null;
        error = 'failed';
        pushCloud();
      });
    },
    setRightAway(on) {
      settings.set('updateRightAway', !!on);
      pushCloud();
      maybeRestart();
    },
    on426() {
      if (!usable || Date.now() - last426At < 5000) return;
      last426At = Date.now();
      apiRelease().catch(() => {});
      poll().catch(() => {});
    },
  };
})();

/** Whether version `a` is newer than `b` ("0.15.1" than "0.15.0"): the numbers only, as the releases have them. */
function newerVersion(a, b) {
  const nums = (v) => String(v || '').split(/[-+]/)[0].split('.').map((n) => parseInt(n, 10) || 0);
  const [x, y] = [nums(a), nums(b)];
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0);
  }
  return false;
}

function notesOf(n) {
  if (!n) return '';
  const text = Array.isArray(n) ? n.map((x) => x.note || '').join('\n') : String(n);
  return text.replace(/<[^>]+>/g, '\n').split(/\n+/).map((s) => s.trim()).filter(Boolean).join('\n');
}

// ---------- the pages' calls ----------
ipcMain.on('atl:boot', (e) => {
  // Viktoria's window asks for nothing: no theme, no fonts.
  e.returnValue = mascot.has(e.sender) ? { mascot: true, pak: mascotAsset.isReady() } : boots.get(e.sender.id) || { css: themes.css() };
});

ipcMain.handle('atl:post', async (e, name, body) => {
  // Only the app's own pages, in their main frame, as on the Mac: nothing loaded into a frame of theirs reaches the app.
  if (!e.senderFrame || e.senderFrame !== e.sender.mainFrame || !ownPage(e.senderFrame.url)) throw new Error('refused');
  body = body || {};
  if (noteWindows.has(e.sender) && name !== 'noteWindow') throw new Error('refused');
  if (feedPanel.has(e.sender) && name !== 'feed') throw new Error('refused');
  // Viktoria's window speaks on her own line and no other, and no other page speaks on hers.
  if (mascot.has(e.sender) !== (name === 'mascot')) throw new Error('refused');
  const win = BrowserWindow.fromWebContents(e.sender);
  try {
    switch (name) {
      case 'radar':
        return handleRadar(body);
      // Her page's messages (checked above: only her window sends them); mascot.js checks every number.
      case 'mascot':
        return mascot.handle(body);
      // The spend panel's history tabs (web/app.js), from the engine's ledger (ledger.js).
      case 'spend':
        if (body.type !== 'history') throw new Error('unknown request');
        return engine.spendHistory(body.range);
      case 'git':
        return await git.handle(body);
      // Source Control's editor reads and writes files: the dashboard's page only, as on the Mac.
      case 'files':
        if (e.sender !== pageOf(dashView)) throw new Error('not this page');
        return await files.handle(body);
      // The notes (web/notes.js): the dashboard's page only, as on the Mac.
      case 'notes':
        if (e.sender !== pageOf(dashView)) throw new Error('not this page');
        return await notesStore.handle(body);
      // A note's own window and the feed's corner window: each only its own page (a note window never gets `notes` or
      // `cloud`: the dashboard writes the notes).
      case 'noteWindow':
        if (!noteWindows.has(e.sender)) throw new Error('not this page');
        return await noteWindows.handle(e.sender, body);
      case 'feed':
        return feedPanel.handle(e.sender, body);
      case 'theme':
        return themes.handle(body);
      case 'messages':
        return handleMessages(win, body);
      case 'overlay':
        if (body.type === 'ready') {
          overReady = true;
          if (overPending) run(over, overPending);
          overPending = null;
          return true;
        }
        if (body.type === 'done') return hideOverlay(), true;
        if (body.type === 'newTerminal') {
          const asked = overlay.expand(String(body.dir || ''));
          hideOverlay();
          if (!asked) return true;
          // A shortcut's folder renamed since the page read it: the slot follows it, and the terminal opens there.
          const dir = await overlay.locate(asked);
          if (dir) openChatWindow({ cwd: dir, claudeArgs: null, title: path.basename(dir) });
          // Gone (deleted, moved elsewhere): the user is told, as the Mac's "Folder not found" does, and the shortcut stays.
          // No parent window: the dashboard may be minimized while the wheel opened over a chat.
          else dialog.showMessageBox({ type: 'warning', message: 'Folder not found', detail: `${tildify(asked)}\n\nIt was moved or deleted. Right-click its shortcut to change or remove it.`, noLink: true });
          return true;
        }
        return await overlay.handle(body);
      case 'cloud':
        if (body.type === 'update') return updates.now(), true;
        if (body.type === 'checkUpdate') return await updates.check(), cloudState();
        if (body.type === 'updateRightAway') return updates.setRightAway(body.on), cloudState();
        if (body.type === 'openChat') return openFriendChat(body.id);
        if (body.type === 'state') return cloudState();
        if (body.type === 'openSignIn') return openSignIn(body.url);
        if (body.type === 'terminalFont') return await terminalFont(body.size, body.family);
        if (body.type === 'terminalFonts') return { families: await termFont.families() };
        if (body.type === 'refresh') return await cloud.handle(body), cloudState();
        if (body.type === 'signOut' || body.type === 'deleteAccount') {
          const r = await cloud.handle(body);
          return { error: r.error, state: cloudState() };
        }
        return await cloud.handle(body);
      case 'chats':
        return await handleChats(body);
      case 'archive':
        return handleArchive(body);
      // Settings' deleted chats: the dashboard's page only (it deletes files).
      case 'trash':
        if (e.sender !== pageOf(dashView)) throw new Error('not this page');
        return await handleTrash(body);
      // Settings' token savers: their state with what rtk saved, and the switches.
      case 'savers':
        if (body.type === 'state') return await savers.state();
        if (body.type === 'set' && savers.known(body.which)) {
          await savers.set(body.which, body.on === true);
          return await savers.state();
        }
        throw new Error('unknown request');
      default:
        return null;
    }
  } catch (err) {
    console.error(`${name}:`, err);
    return { error: String((err && err.message) || err) };
  }
});

// ---------- menu and keys ----------
function buildMenu() {
  const focusedChat = () => [...chats.entries()].find(([, c]) => c.win && !c.win.isDestroyed() && c.win.isFocused());
  // The window in front closes: a terminal's only hides (what runs in it goes on), the messages and the overlay theirs.
  const closeFocused = () => {
    const w = BrowserWindow.getFocusedWindow();
    if (!w || w === dash || w === panels.notices) return;
    if (w === over) return hideOverlay();
    if ([...panels.chats.values()].includes(w)) return runPanel(w, 'window.__messages && __messages.close && __messages.close()');
    w.close();
  };
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        // VS Code's: Ctrl+N a new file in Source Control's editor, Ctrl+Shift+N a new window (here a terminal), as the
        // Mac's ⌘N and ⇧⌘N.
        { label: 'New File', accelerator: 'CmdOrCtrl+N', click: () => newFile() },
        { label: 'New Terminal…', accelerator: 'CmdOrCtrl+Shift+N', click: () => showOverlay('Overlay.newTerminal()') },
        { label: 'Shortcut Wheel', accelerator: 'CmdOrCtrl+K', click: () => showShortcuts() },
        // No key of its own: Ctrl+0 is Actual Size's (the text size, ⌘0 on the Mac), and two items on one key leave only
        // one of them working.
        { label: 'Dashboard', click: () => showDashboard() },
        // The dashboard's Settings, on the category used last (the Mac keeps it in the app menu; no key, as there).
        { label: 'Settings…', click: () => openSettings() },
        { type: 'separator' },
        // Ctrl+W, as a tab closes in Chrome (the Mac's ⌘W): the terminal in front ends at once, whatever runs in it
        // (Claude, Codex, Antigravity, a shell); its planet or car leaves the orbit and its window goes, as End does.
        // Any other window closes as before.
        {
          label: 'Close the Terminal in Front', accelerator: 'CmdOrCtrl+W',
          click: () => {
            const found = focusedChat();
            if (found && terminals.has(found[0])) return endTerminal(found[0]);
            closeFocused();
          },
        },
        // Ctrl+Shift+W (the Mac's ⇧⌘W): the window only closes, what runs in it goes on, a click on the orbit brings it back.
        { label: 'Close Window', accelerator: 'CmdOrCtrl+Shift+W', click: () => closeFocused() },
        { role: 'quit', label: 'Quit', accelerator: 'CmdOrCtrl+Q' },
      ],
    },
    { label: 'Edit', submenu: [{ role: 'undo' }, { role: 'redo' }, { type: 'separator' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' }] },
    {
      label: 'View',
      submenu: [
        // Its key is caught by the dashboard window itself (createDashboard): in a terminal Ctrl+B stays the shell's.
        {
          label: 'Chats List', accelerator: 'CmdOrCtrl+B', registerAccelerator: false,
          click: () => {
            showDashboard();
            toggleChats();
          },
        },
        // Viktoria, the anime companion who walks around the screen (her switch is also in Settings > Appearance).
        {
          id: 'viktoria', label: mascotAsset.isReady() ? 'Show Viktoria' : 'Get Viktoria…', type: 'checkbox', checked: mascot.enabled(),
          click: () => {
            if (mascotAsset.isReady()) return mascot.setEnabled(!mascot.stored());
            showDashboard();
            mascotOpenView('themes');
            syncViktoriaMenu(); // a click flips a checkbox by itself
          },
        },
        { label: 'Reload Dashboard', accelerator: 'CmdOrCtrl+R', click: () => dashView && dashView.webContents.reload() },
        // The page that has the keys: the dashboard window's two are views, which the role doesn't reach. Development
        // only: a released app has no DevTools.
        ...(RELEASE ? [] : [{ label: 'Toggle Developer Tools', accelerator: 'CmdOrCtrl+Shift+I', click: (_i, _w, wc) => wc && wc.toggleDevTools() }]),
        { type: 'separator' },
        { label: 'Zoom In', accelerator: 'CmdOrCtrl+Plus', click: () => zoom(1) },
        { label: 'Zoom Out', accelerator: 'CmdOrCtrl+-', click: () => zoom(-1) },
        { label: 'Actual Size', accelerator: 'CmdOrCtrl+0', click: () => zoom(0) },
        { type: 'separator' }, { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize', accelerator: 'CmdOrCtrl+M',
          click: () => {
            const w = BaseWindow.getFocusedWindow();
            if (!w || w === over || w === panels.notices) return;
            if (w !== dash && typeof w.getParentWindow === 'function' && w.getParentWindow()) w.setParentWindow(null);
            w.minimize();
          },
        },
        { label: 'End This Terminal', click: () => { const f = focusedChat(); if (f) endTerminal(f[0]); } },
      ],
    },
  ]));
}

// ---------- start, quit ----------
let quitting = false;

app.on('second-instance', () => showDashboard());

app.whenReady().then(() => {
  guardSession(session.defaultSession); // again, should it have been made before 'session-created' was listened to
  if (PROBE && app.dock) app.dock.hide();
  mascotAsset.init(); // the pak from an earlier run is hashed (off the main thread) before she may come up
  buildMenu();
  createDashboard();
  // Only the app's usual profile hooks Claude Code's and Codex's settings: a profile of its own (npm run staging) leaves
  // them be.
  if (process.platform === 'win32' && !PROBE && !profileSuffix()) {
    limits.install();
    codexHooks.install();
  }
  engine.start();
  cloud.start();
  runaways.start();
  // The corner's notices can cover the screen (a level-up): never during a development check.
  if (!PROBE) {
    notices();
    // The chat window follows a little later, hidden, so opening a chat is instant.
    setTimeout(warmChat, 3000);
    // The PowerShell font scan (3-5 s) runs in the background, so Settings > Terminals opens with its list ready.
    setTimeout(() => termFont.warm(), 20_000);
    // No "updated" note in the corner, unlike the Mac: what's new is off on Windows (whatsnew.js), so its "see what's new"
    // would lead nowhere.
  }
  // The orbit's cinematic camera waits for minutes without input; the terminals ride the orbit as cars.
  setInterval(() => {
    toDash(`idle(${powerMonitor.getSystemIdleTime().toFixed(1)})`);
    mascot.updateIdle(powerMonitor.getSystemIdleTime());
    noteToolsAtWork();
    pushTerminals();
    // A chat window opened or ended between the engine's states: the list says "in a window" or stops saying it.
    pushWinOpen();
    pushChats();
  }, 2000);
  // The deleted chats whose 30 days are over go from the disk: a minute after the app starts, then every hour.
  if (!PROBE) {
    const emptyTrash = () => chatlist.emptyExpiredTrash().then(() => pushChats(), (e) => console.error('trash:', e));
    setTimeout(emptyTrash, 60_000);
    setInterval(emptyTrash, 3_600_000);
  }
  // The token savers this build ships go on by themselves the first time (Settings turns them off).
  savers.autoStart();
  if (!PROBE) aiColors.autoStart();
  powerMonitor.on('resume', () => cloud.kick());
  // Viktoria rests while the PC is locked or asleep (the Mac's display sleep), and lets go of the cursor at once.
  powerMonitor.on('lock-screen', () => mascot.setAsleep('lock', true));
  powerMonitor.on('unlock-screen', () => mascot.setAsleep('lock', false));
  powerMonitor.on('suspend', () => mascot.setAsleep('suspend', true));
  powerMonitor.on('resume', () => mascot.setAsleep('suspend', false));
  // A display plugged in, unplugged or changed: she moves to one that is there and learns its edges.
  for (const ev of ['display-added', 'display-removed', 'display-metrics-changed']) screen.on(ev, () => mascot.onDisplaysChanged());
  // Power save comes on by itself on a low battery (power.js), and goes off again on the adapter.
  powerMonitor.on('on-battery', () => power.update());
  powerMonitor.on('on-ac', () => power.update());
  // Chats and terminals that outlived the last launch come back hidden, as on the Mac, so a launch doesn't throw windows
  // on screen: a chat is on the orbit, a terminal a car, and a click opens its window.
  terminals.restore().then((found) => {
    for (const s of found) openChatWindow({ id: s.id, cwd: s.cwd, claude: s.claude, title: s.title, show: false });
  });
  if (PROBE) probe();
  if (DEMO && process.env.ORBITERM_DEMO_SHOT) demoShots(process.env.ORBITERM_DEMO_SHOT);
});

let savingFiles = false;
app.on('before-quit', (e) => {
  if (quitting) return;
  if (savingFiles) return e.preventDefault();
  // Only chats running in the app itself stop: the session host's go on, and come back at the next launch.
  const running = [...chats.entries()].filter(([id, c]) => c.claude && terminals.local(id)).length;
  if (running && !PROBE) {
    const r = dialog.showMessageBoxSync(dash || undefined, {
      type: 'warning', buttons: ['Quit', 'Cancel'], defaultId: 1, cancelId: 1, noLink: true,
      message: running === 1 ? '1 chat is still running' : `${running} chats are still running`,
      detail: 'Quitting stops Claude in those windows. The conversations stay saved and can be resumed.',
    });
    if (r !== 0) return e.preventDefault();
  }
  // A file edited in the last second is saved first (Source Control's editor saves a second after a change), and so is
  // a note just typed, as on the Mac: the quit goes on once the page says so, 2 s at most (a page that doesn't answer).
  const wc = !PROBE && pageOf(dashView);
  if (wc) {
    e.preventDefault();
    savingFiles = true;
    // The notes still out first: what they typed last goes to the dashboard's page, which keeps it.
    const saved = noteWindows.flushAll()
      .then(() => wc.executeJavaScript('Promise.all([window.FileEditor ? FileEditor.flush() : true, window.Notes && Notes.flush ? Notes.flush() : true])'))
      .catch(() => {});
    Promise.race([saved, new Promise((r) => setTimeout(r, 2000))]).then(() => {
      savingFiles = false;
      leave();
      app.quit();
    });
    return;
  }
  leave();
});

// Quitting for good: the chats running in the session host go on, the parts stop.
function leave() {
  quitting = true;
  mascot.stop();
  terminals.detachAll();
  engine.stop();
  runaways.stop();
  cloud.stop();
}

app.on('window-all-closed', () => {
  if (!quitting) app.quit();
});

// ---------- the demo's pictures (ORBITERM_DEMO_SHOT) ----------
// The dashboard on screen, once its four projects have been at work a while, then every few seconds: demo-1.png…
// ORBITERM_DEMO_JS runs in the page first (a zoom of the map, say).
async function demoShots(dir) {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const count = Number(process.env.ORBITERM_DEMO_SHOTS) || 4;
  const every = Number(process.env.ORBITERM_DEMO_EVERY) || 12000;
  await wait(Number(process.env.ORBITERM_DEMO_DELAY) || 45000);
  if (process.env.ORBITERM_DEMO_JS) {
    await dashView.webContents.executeJavaScript(process.env.ORBITERM_DEMO_JS).catch((e) => console.log('demo js:', e.message));
    await wait(1500);
  }
  for (let n = 1; n <= count; n++) {
    const wc = pageOf(dashView);
    const img = wc && (await Promise.race([wc.capturePage(), wait(5000).then(() => null)]));
    if (img) {
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, `demo-${n}.png`), img.toPNG());
      console.log(`demo: shot ${n} (${img.getSize().width}x${img.getSize().height})`);
    } else console.log(`demo: no picture ${n}`);
    if (n < count) await wait(every);
  }
}

// ---------- the development check (ATL_PROBE) ----------
async function probe() {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const shot = async (win, name) => {
    const wc = pageOf(win);
    if (!wc) return;
    const img = await Promise.race([wc.capturePage(), wait(5000).then(() => null)]);
    if (!img) return console.log('probe: no picture of', name);
    fs.mkdirSync(PROBE, { recursive: true });
    fs.writeFileSync(path.join(PROBE, `${name}.png`), img.toPNG());
    console.log('probe: shot', name);
  };
  await wait(9000);
  await run(dashView, "document.getElementById('boot')?.remove()");
  await shot(dashView, 'dashboard');
  await shot(chatsView, 'chats');
  for (const step of (process.env.ATL_PROBE_STEPS || '').split(';;').filter(Boolean)) {
    const [name, js] = step.split('|');
    console.log('probe: step', name);
    if (js) await Promise.race([dashView.webContents.executeJavaScript(js).catch((e) => console.log('probe step', name, e.message)), wait(3000)]);
    await wait(2500);
    await shot(dashView, name);
  }
  if (process.env.ATL_PROBE_TERMINAL) {
    const id = openChatWindow({ cwd: os.homedir(), claudeArgs: null, title: 'probe' });
    await wait(3000);
    terminals.write(id, process.platform === 'win32' ? 'echo hello from the probe\r' : 'echo hello from the probe\r');
    await wait(2000);
    await shot(chats.get(id)?.win, 'terminal');
  }
  quitting = true;
  app.quit();
}
