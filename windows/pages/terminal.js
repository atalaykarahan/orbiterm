'use strict';
// A chat or terminal window (main.js opens it, terminals.js runs its shell): xterm.js on the theme's palette, the way
// VS Code draws its terminal; typing and resizing go to the app, its output comes back. The strip on top shows the
// session's name and status from the dashboard's data.
(() => {
  const css = () => getComputedStyle(document.documentElement);
  const token = (k, d) => css().getPropertyValue(k).trim() || d;
  const palette = () => {
    const a = (i) => token(`--a${i}`, undefined);
    return {
      background: token('--code-bg', '#251200'), foreground: token('--code-fg', '#f5ebe0'), cursor: token('--code-cursor', '#f88008'),
      cursorAccent: token('--caret-text', '#1a0d00'), selectionBackground: token('--selection', '#f88008'), selectionForeground: token('--selection-text', '#1a0d00'),
      black: a(0), red: a(1), green: a(2), yellow: a(3), blue: a(4), magenta: a(5), cyan: a(6), white: a(7),
      brightBlack: a(8), brightRed: a(9), brightGreen: a(10), brightYellow: a(11), brightBlue: a(12), brightMagenta: a(13), brightCyan: a(14), brightWhite: a(15),
    };
  };
  // The cursor: the theme's when it asks for one (--cursor-style block, bar or underline; --cursor-blink 1 or 0), else a
  // blinking block.
  const cursor = () => ({
    cursorStyle: ['block', 'bar', 'underline'].find((s) => s === token('--cursor-style')) || 'block',
    cursorBlink: token('--cursor-blink') !== '0',
  });
  // Electron 45.3's Chromium (156.0.8078.96) turns down a canvas font that starts with a space and goes on drawing in its
  // default 10px sans-serif. xterm.js's WebGL renderer names its glyphs' font that way (" normal 14px …" for all but
  // italic text), so the terminal's text came out small and spaced out in its cells: the font is handed on trimmed.
  for (const Ctx of [window.CanvasRenderingContext2D, window.OffscreenCanvasRenderingContext2D]) {
    const font = Ctx && Object.getOwnPropertyDescriptor(Ctx.prototype, 'font');
    if (!font || !font.set) continue;
    Object.defineProperty(Ctx.prototype, 'font', {
      ...font,
      set(v) {
        font.set.call(this, typeof v === 'string' ? v.trim() : v);
      },
    });
  }
  // The font stack: the family picked in Settings (if any) before the usual fallbacks.
  const stack = (family) => (family ? `"${String(family).replace(/["\\]/g, '')}", ` : '') +
    '"MesloLGS NF", "CaskaydiaCove Nerd Font", "Cascadia Mono", Consolas, monospace';
  const term = new Terminal({
    fontFamily: stack(window.__termFamily),
    fontSize: window.__termFont || 14, lineHeight: 1.1, ...cursor(), scrollback: 10000, allowProposedApi: true,
    // Text never fades into its background (Claude's diffs paint lines green and red), as the Mac app's terminals do.
    minimumContrastRatio: 4.5, theme: palette(),
  });
  const fit = new FitAddon.FitAddon();
  term.loadAddon(fit);
  term.loadAddon(new Unicode11Addon.Unicode11Addon());
  term.unicode.activeVersion = '11';
  term.loadAddon(new WebLinksAddon.WebLinksAddon((e, uri) => atl.send('term:open', uri)));
  // Find (the find bar below), as the Mac's find bar over its terminal (NSTextFinder).
  const search = new SearchAddon.SearchAddon();
  term.loadAddon(search);
  // Links a program prints itself (OSC 8): a web address in the browser; a file:// one, Ctrl-clicked, as a path is.
  term.options.linkHandler = {
    allowNonHttpProtocols: true,
    activate(e, uri) {
      if (/^https?:/i.test(uri)) atl.send('term:open', uri);
      else if (/^file:/i.test(uri) && e.ctrlKey) atl.send('term:openFile', { url: uri });
    },
  };
  term.open(document.getElementById('term'));
  try {
    const webgl = new WebglAddon.WebglAddon();
    webgl.onContextLoss(() => webgl.dispose());
    term.loadAddon(webgl);
  } catch {}
  // Paths: a text file Ctrl-clicked opens in Source Control's editor (the dashboard), at the line it names
  // ("main.js:12:4"); anything else in its app, as ⌘-click on the Mac. The app says which pieces of a line are files
  // (from the shell's folder when relative), joining one Claude wrapped onto the lines around it; only those underline.
  const termEl = document.getElementById('term');
  const PATHISH = /[\\/]|^~|\.[\w-]{1,16}(?::\d+){0,2}[.,;:!?)\]}'"`]*$/;
  const rowText = (y) => {
    const line = term.buffer.active.getLine(y);
    return line ? line.translateToString(true) : '';
  };
  term.registerLinkProvider({
    provideLinks(y, done) {
      const line = term.buffer.active.getLine(y - 1);
      if (!line) return done(undefined);
      // The line's text and the cell each of its characters starts at (a wide character takes two).
      let text = '';
      const cells = [];
      for (let x = 0; x < line.length; x++) {
        const c = line.getCell(x);
        if (!c || !c.getWidth()) continue;
        const ch = c.getChars() || ' ';
        for (let k = 0; k < ch.length; k++) cells.push(x + 1);
        text += ch;
      }
      text = text.replace(/\s+$/, '');
      const links = [];
      for (const m of text.matchAll(/\S+/g)) {
        let piece = m[0], start = m.index;
        while (piece && '([{<\'"`'.includes(piece[0])) piece = piece.slice(1), start++;
        if (!piece || /:\/\/|^(mailto|tel):/i.test(piece) || !PATHISH.test(piece)) continue;
        links.push({ text: piece, start });
        if (links.length >= 40) break;
      }
      if (!links.length) return done(undefined);
      const rows = [y - 3, y - 2, y - 1, y, y + 1].map(rowText);
      atl.ask('term:paths', { links, rows, at: 2 }).then((found) => {
        const out = [];
        links.forEach((l, i) => {
          if (!found || !found[i]) return;
          const q = { text: l.text, start: l.start, rows, at: 2 };
          out.push({
            range: { start: { x: cells[l.start], y }, end: { x: cells[l.start + l.text.length - 1], y } },
            text: l.text,
            activate: (e) => e.ctrlKey && atl.send('term:openFile', q),
            hover: () => (termEl.title = 'Ctrl+click to open'),
            leave: () => (termEl.title = ''),
          });
        });
        done(out.length ? out : undefined);
      }, () => done(undefined));
    },
  });
  const size = () => ({ cols: term.cols, rows: term.rows });
  const refit = () => {
    try {
      fit.fit();
    } catch {}
  };
  refit();
  new ResizeObserver(refit).observe(document.getElementById('term'));
  addEventListener('resize', refit);
  addEventListener('focus', () => {
    refit();
    term.focus();
  });
  document.addEventListener('visibilitychange', () => !document.hidden && refit());
  addEventListener('themechange', () => Object.assign(term.options, { theme: palette(), ...cursor() }));
  // The terminals' font family changed in Settings ("" is back to the usual stack).
  atl.on('term:family', (f) => {
    term.options.fontFamily = stack(f);
    refit();
  });
  // The terminals' text size changed (View's zoom with a terminal in front, or Settings sync): the grid follows.
  atl.on('term:font', (n) => {
    if (!(n >= 9 && n <= 24) || term.options.fontSize === n) return;
    term.options.fontSize = n;
    refit();
  });
  term.onResize(({ cols, rows }) => atl.send('term:resize', { cols, rows }));
  // When something was last typed (not an Esc, a focus report or a key's escape sequence; a paste counts): agy's rewind
  // waits for a prompt sent a moment ago to start its turn.
  let typedAt = 0;
  term.onData((data) => {
    if (data[0] !== '\x1b' || data.startsWith('\x1b[200~')) typedAt = performance.now();
    atl.send('term:input', data);
  });
  // The AI tool running in this window, as the app tells it (term:info), for the keys it needs, and its own status.
  let tool = null;
  let toolStatus = null;
  // The app's last word on this window (term:info). An AI runs in front here (the Mac's claudeInFront) when the app found
  // its session in it (Claude's, Codex's, Antigravity's), or while a chat's Claude is still starting (busy before its
  // session is found: a plain shell is never busy). A plain shell gets every key as xterm.js sends it.
  let info = {};
  const aiOn = () => info.status !== 'ended' && (!!info.chat || ['busy', 'idle', 'waiting'].includes(info.status));
  // Claude's full-screen view in front and following the mouse (the alternate screen, with mouse reports asked for): a
  // drag there selects in Claude rather than in the terminal, and the history is Claude's own (the alternate screen keeps
  // none).
  const claudeView = () => aiOn() && term.buffer.active.type === 'alternate' && term.modes.mouseTrackingMode !== 'none';
  // Antigravity's rewind (the Mac's AgyRewind.swift): agy has /rewind but no key for it, and its own Esc Esc only clears
  // the prompt. Esc Esc while it waits for you with an empty prompt types /rewind instead: the second Esc is swallowed,
  // a third never rewinds, and anything unclear lets Esc go to agy as usual. Swapped (Settings › Shortcuts), the Esc
  // the close keys send counts: Ctrl+W Ctrl+W.
  const PROMPT_BOX = ['│', '┃', '|'];
  const agyReady = () => {
    if (tool !== 'Antigravity' || toolStatus !== 'idle' || performance.now() - typedAt <= 1500) return false;
    const b = term.buffer.active;
    const bottom = b.baseY + term.rows - 1;
    for (let y = bottom; y >= Math.max(b.baseY, bottom - 29); y--) {
      const line = b.getLine(y);
      const chars = [...(line ? line.translateToString(true) : '')];
      let lead = 0;
      while (lead < chars.length && (chars[lead] === ' ' || PROMPT_BOX.includes(chars[lead]))) lead++;
      if (lead >= chars.length || !'>❯›!→'.includes(chars[lead])) continue;
      // The bottom-most prompt line decides; anything but ">" (bash mode ! …) is no.
      if (chars[lead] !== '>') return false;
      let rest = chars.slice(lead + 1).join('').trim();
      while (rest && PROMPT_BOX.includes(rest[rest.length - 1])) rest = rest.slice(0, -1).trim();
      // The cursor sits right after the mark, where the placeholder starts: typed text would have moved it.
      if (b.baseY + b.cursorY !== y || b.cursorX > lead + 2) return false;
      return !rest || /^[A-Za-z][A-Za-z0-9 -]* mode: .*\(shift\+tab to cycle\)$/.test(rest);
    }
    return false;
  };
  let lastEsc = -1;
  /** An Esc about to reach the terminal: true when it was the second and /rewind went instead (the Esc is dropped). */
  const agyRewind = () => {
    if (!agyReady()) {
      lastEsc = -1;
      return false;
    }
    const now = performance.now();
    const first = lastEsc;
    const second = first >= 0 && now - first <= 500;
    lastEsc = second ? -1 : now;
    if (!second) return false;
    // At least 150 ms after the Esc that went: closer, a console reads Esc and "/" as Alt+/.
    setTimeout(() => atl.send('term:input', '/rewind\r'), Math.max(0, 150 - (now - first)));
    return true;
  };
  // Copy-on-select, as on the Mac: dragging or double-clicking a selection copies it to the clipboard on mouse release,
  // shows the "COPIED N CHARS" badge in the HUD, and keeps the selection highlighted.
  let mouseDown = false, pendingCopy = false, copyTimer = 0, copyUntil = 0, selFrame = 0;
  const copiedEl = document.getElementById('copied');
  const findEl = document.getElementById('find');
  const lineCount = (t) => Math.max(1, t.split(/\r?\n/).length - (/\r?\n$/.test(t) ? 1 : 0));
  // The badge's text, and the strip fitted again when it comes, goes or changes length (fitHud, below).
  const setBadge = (text) => {
    const was = copiedEl.hidden ? 0 : copiedEl.textContent.length;
    copiedEl.hidden = !text;
    if (text) copiedEl.textContent = text;
    if ((text || '').length !== was) fitHud();
  };
  // While something is selected the same badge counts it, live as the drag goes on (the Mac's selection badge): its
  // lines, and a single line's characters. A copy's badge keeps its 2.2 seconds first, and the find bar's match (it's
  // the selection while the bar is open) isn't counted.
  const showSelection = () => {
    if (Date.now() < copyUntil) return;
    const text = term.hasSelection() && findEl.hidden ? term.getSelection() : '';
    const n = text ? lineCount(text) : 0;
    setBadge(!text ? '' : n === 1 ? `1 LINE SELECTED · ${text.length} CHAR${text.length === 1 ? '' : 'S'}` : `${n} LINES SELECTED`);
  };
  const showCopied = (n) => {
    if (!(n > 0)) return;
    setBadge(`COPIED ${n} CHAR${n === 1 ? '' : 'S'}`);
    copyUntil = Date.now() + 2200;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copyUntil = 0;
      showSelection();
    }, 2200);
  };
  const copySelection = () => {
    if (!term.hasSelection()) return false;
    const text = term.getSelection();
    if (!text) return false;
    atl.send('term:copy', text);
    showCopied(text.length);
    return true;
  };
  document.getElementById('term').addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      mouseDown = true;
      pendingCopy = false;
    }
  }, true);
  term.onSelectionChange(() => {
    if (!selFrame) {
      selFrame = requestAnimationFrame(() => {
        selFrame = 0;
        showSelection();
      });
    }
    if (!term.hasSelection()) {
      pendingCopy = false;
      return;
    }
    if (mouseDown) pendingCopy = true;
  });
  addEventListener('mouseup', () => {
    if (!mouseDown) return;
    mouseDown = false;
    if (pendingCopy && term.hasSelection()) {
      pendingCopy = false;
      copySelection();
    }
  });
  // Copy (Ctrl+C or Ctrl+Shift+C, the right-click menu's Copy): the selection. With nothing selected on the terminal while
  // Claude's full-screen view is in front, the selection is Claude's (a drag goes to Claude there): Claude is asked to
  // copy it with its own key for that, Ctrl+Shift+C in the keyboard protocol it reads, as the Mac's ⌘C does. Claude
  // answers with OSC 52 (below), which puts it on the clipboard and shows the badge.
  const copyAction = () => {
    if (copySelection()) return true;
    if (!claudeView()) return false;
    atl.send('term:input', '\x1b[99;6u');
    return true;
  };
  // OSC 52, a program's own copy (Claude's, of what's selected in its full-screen view; tmux's, vim's): onto the clipboard
  // through the app, up to 1 MB, with the badge. A request to read the clipboard ("?") gets no answer, as on the Mac
  // (ClipboardGuard): any text a program prints (a file cat'd, ssh, an AI's output) could otherwise read what was copied.
  const MB = 1 << 20;
  term.parser.registerOscHandler(52, (data) => {
    const semi = data.indexOf(';');
    const b64 = semi < 0 ? '' : data.slice(semi + 1).replace(/\s+/g, '');
    if (!b64 || b64 === '?' || b64.length > Math.ceil(MB / 3) * 4) return true;
    try {
      const text = new TextDecoder().decode(Uint8Array.from(atob(b64), (ch) => ch.charCodeAt(0)));
      if (text) {
        atl.send('term:clipboard', { text });
        showCopied(text.length);
      }
    } catch {}
    return true;
  });
  // Paths as they'd be typed at the prompt: one holding anything the shell reads (a space, & ( ) ; , $ ` or a quote) in
  // single quotes, which PowerShell reads as the characters themselves (double quotes would let $( ) in a file's name
  // run as code); several apart, with a space after the last for what's typed next, as the Mac's pastePaths (iTerm2's)
  // leaves one. The quoting itself is shellquote.js, the main process's own.
  const quoted = (p) => ShellQuote.quotePath(p, window.__platform === 'win32');
  const pastePaths = (paths) => {
    const list = (Array.isArray(paths) ? paths : []).filter((p) => typeof p === 'string' && p);
    if (!list.length) return false;
    term.paste(`${list.map(quoted).join(' ')} `);
    return true;
  };
  // A paste, the Mac's way (ChatTerminal's paste): files copied in Explorer as their paths (a picture's path becomes an
  // image in Claude); a picture with no text (a screenshot, an image copied in a browser) as Ctrl+V while an AI runs
  // here, Claude's (and Codex's) key for taking it off the clipboard; text as it is. `text` is the paste event's own; the
  // right-click menu's Paste has none and reads the clipboard. An app that doesn't answer term:pasteInfo pastes text.
  const pasteClipboard = async (text) => {
    let got = null;
    try {
      got = await atl.ask('term:pasteInfo');
    } catch {}
    if (got && pastePaths(got.files)) return;
    if (typeof text !== 'string') text = await navigator.clipboard.readText().catch(() => '');
    if (text) term.paste(text);
    else if (got && got.image && aiOn()) atl.send('term:input', '\x16');
  };
  // Ctrl+V, Ctrl+Shift+V, Shift+Insert and Edit › Paste all come as the page's paste event (the key handler below leaves
  // them to it): taken here, before xterm.js's own, so files and pictures paste as above.
  termEl.addEventListener('paste', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    pasteClipboard(e.clipboardData ? e.clipboardData.getData('text/plain') : undefined);
  }, true);
  // Files and folders dropped on the window paste their paths (the Mac's performDragOperation, iTerm2's). Nothing dropped
  // on it opens in it instead, which would take the window away from the terminal.
  const dragOver = (e) => {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = [...e.dataTransfer.types].includes('Files') ? 'copy' : 'none';
  };
  addEventListener('dragenter', dragOver);
  addEventListener('dragover', dragOver);
  addEventListener('drop', (e) => {
    e.preventDefault();
    const files = [...((e.dataTransfer && e.dataTransfer.files) || [])].map((f) => (atl.pathForFile ? atl.pathForFile(f) : ''));
    if (pastePaths(files)) term.focus();
  });
  // A right click: the app's menu (Copy, Paste, Select All, Find…, Clear Buffer), as the Mac's menu(for:), iTerm2's; its
  // items come back on term:do. The press itself never reaches the program in front, as on the Mac: a full-screen Claude
  // that asked for the mouse would take it as a click.
  for (const type of ['mousedown', 'mouseup']) {
    termEl.addEventListener(type, (e) => {
      if (e.button !== 2) return;
      e.stopPropagation();
      if (type === 'mousedown') term.focus();
    }, true);
  }
  termEl.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    // Not xterm.js's own handling either, which readies its text box for a menu of the page's that never opens.
    e.stopPropagation();
    atl.send('term:contextMenu', { hasSelection: term.hasSelection() });
  }, true);
  // Ctrl+C copies when something is selected (else it interrupts), Ctrl+V pastes: Windows Terminal's keys. The copy
  // goes through the app, as the page's clipboard API refuses a window without focus. Ctrl+V only keeps xterm.js from
  // sending ^V: the browser's own paste follows and the paste handler above takes it (pasting here as well put
  // everything in twice).
  // The keys the app takes in a terminal (Settings › Shortcuts, the app's shortcuts.js): every action's but the
  // dashboard's own (Ctrl+B, Ctrl+R stay the shell's). As it came: Ctrl+N (a new file in Source Control's editor),
  // Ctrl+Shift+N (a new terminal), Ctrl+K (the Ring), Ctrl+Shift+T (a new tab), Ctrl+Shift+D (a split), Ctrl+W and
  // Ctrl+Shift+W (close the tab or pane, the window: what runs in it goes on), as ⌘N, ⇧⌘N, ⌘K, ⌘T, ⌘D, ⌘W and ⇧⌘W are on
  // the Mac. Ctrl+T stays the shell's: Claude Code's task list, Codex's transcript. The
  // keys between tabs and panes aren't here: the app takes them before this page, and only in a window that has tabs or a
  // split (main.js's paneKeys). Changes come on term:keys, and whether Esc and the close keys are swapped (below).
  let keys = window.__keys || { app: ['ctrl+shift+n', 'ctrl+n', 'ctrl+k', 'ctrl+w', 'ctrl+shift+w'] };
  atl.on('term:keys', (k) => {
    if (k && Array.isArray(k.app)) keys = k;
  });
  // A key press as a combo, the app's way (shortcuts.js comboOf): the key where it is on the keyboard, whatever the
  // layout makes of it, or what it types when it comes without a place (SendKeys, Remote Desktop, the on-screen
  // keyboard give no scan code); null without Ctrl or Alt (but the F keys), or with the Windows key.
  const NAMED = {
    ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', PageUp: 'pageup', PageDown: 'pagedown',
    Home: 'home', End: 'end', Enter: 'return', NumpadEnter: 'return', Tab: 'tab', Space: 'space', Insert: 'insert', Delete: 'delete',
    Minus: '-', Equal: '=', BracketLeft: '[', BracketRight: ']', Backslash: '\\', Semicolon: ';', Quote: "'", Comma: ',',
    Period: '.', Slash: '/', Backquote: '`', NumpadAdd: 'plus', NumpadSubtract: 'numsub', Escape: 'esc',
  };
  const SHIFTED = { '+': '=', _: '-', '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/', '~': '`',
    '!': '1', '@': '2', '#': '3', $: '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0' };
  const typedKey = (k) => {
    if (!k) return null;
    if (k.length === 1) {
      const c = SHIFTED[k] || k.toLowerCase();
      return /^[a-z0-9]$/.test(c) || Object.values(NAMED).includes(c) ? c : null;
    }
    const m = /^F([1-9]|1[0-9]|2[0-4])$/.exec(k);
    return m ? `f${m[1]}` : k === ' ' ? 'space' : NAMED[k] || null;
  };
  const comboOf = (e) => {
    if (e.metaKey) return null;
    const c = e.code || '';
    let m;
    const key = (m = /^Key([A-Z])$/.exec(c)) ? m[1].toLowerCase()
      : (m = /^(?:Digit|Numpad)([0-9])$/.exec(c)) ? m[1]
        : (m = /^F([1-9]|1[0-9]|2[0-4])$/.exec(c)) ? `f${m[1]}` : NAMED[c] || typedKey(e.key);
    if (!key || (!e.ctrlKey && !e.altKey && !/^f\d+$/.test(key))) return null;
    return [e.ctrlKey && 'ctrl', e.altKey && 'alt', e.shiftKey && 'shift', key].filter(Boolean).join('+');
  };
  term.attachCustomKeyEventHandler((e) => {
    if (e.type !== 'keydown') return true;
    const k = e.key.toLowerCase();
    if (e.ctrlKey && !e.altKey && k === 'c' && term.hasSelection()) {
      e.preventDefault();
      copySelection();
      // Cleared, as in Windows Terminal: the next Ctrl+C interrupts again.
      term.clearSelection();
      return false;
    }
    const combo = comboOf(e);
    // Esc and the close keys swapped (Settings › Shortcuts, the Mac's EscClose.swift): this handler runs only while the
    // terminal itself has the keys, which is when the swap acts. A plain Esc hides the window as the close keys do,
    // whatever runs here (held, it only hides once); the close keys type a real Esc instead, as the Esc key would. An
    // IME's Esc comes as "Process", never as Escape.
    const plainEsc = e.key === 'Escape' && !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey;
    if (keys.escClose) {
      if (plainEsc) {
        e.preventDefault();
        lastEsc = -1;
        if (!e.repeat) atl.send('term:escClose');
        return false;
      }
      if (combo && combo === keys.closePane) {
        e.preventDefault();
        if (!agyRewind()) term.input('\x1b', true);
        return false;
      }
    } else if (plainEsc && !e.repeat && agyRewind()) {
      e.preventDefault();
      return false;
    }
    // Left unhandled, the app's keys reach its menu instead of the shell. Antigravity approves its subagents' steps with
    // Ctrl+K, so while it runs here that key is its own (the Ring is still the middle mouse button away).
    if (combo && keys.app.includes(combo)) return combo === 'ctrl+k' && tool === 'Antigravity';
    // Ctrl+Shift+C with nothing selected in Claude's full-screen view: Claude's own copy (copyAction). Anywhere else it
    // goes on as before, an interrupt, as Windows Terminal passes it on with nothing to copy.
    if (e.ctrlKey && e.shiftKey && !e.altKey && k === 'c' && claudeView()) {
      e.preventDefault();
      copyAction();
      return false;
    }
    // Editing keys for the AI's prompt, as the Mac sends them (AppDelegate's): Shift+Enter a new line (ESC CR, where
    // xterm.js sends a CR that submits), Ctrl+Backspace a word back (ESC DEL, the Mac's Option+Delete) and Ctrl+Delete a
    // word ahead (ESC d, its Option+fn+Delete). Only while an AI runs: ConPTY hands PowerShell and cmd an ESC CR as
    // Alt+Enter, which neither takes as a new line, and xterm.js's own Ctrl+Backspace (^H) and Ctrl+Delete already reach
    // them as those keys (ConPTY's), a word back and ahead in PSReadLine and in cmd.
    if (aiOn() && !e.altKey && !e.metaKey && !e.isComposing) {
      const seq = e.key === 'Enter' && e.shiftKey && !e.ctrlKey ? '\x1b\r'
        : e.ctrlKey && !e.shiftKey && e.key === 'Backspace' ? '\x1b\x7f'
          : e.ctrlKey && !e.shiftKey && e.key === 'Delete' ? '\x1bd' : '';
      if (seq) {
        e.preventDefault();
        term.input(seq, true);
        return false;
      }
    }
    if (!e.ctrlKey || e.altKey) return true;
    return k !== 'v';
  });
  atl.on('term:data', (data) => term.write(data));
  // Its end, said as the Mac's window says it (processTerminated): a chat's when an AI was what ran in it last, else a
  // terminal's.
  let wasAI = false;
  atl.on('term:exit', () => term.write(`\r\n\x1b[2m[${wasAI ? 'chat' : 'terminal'} ended · close it to remove it]\x1b[0m\r\n`));
  // The bell (BEL) to the app, which rings it; a program spilling bells (binary output) rings it a few times a second.
  let bellAt = 0;
  term.onBell(() => {
    const now = Date.now();
    if (now - bellAt < 250) return;
    bellAt = now;
    atl.send('term:bell');
  });
  // Through the history (the Mac's scrollBuffer, iTerm2's ⌘↑ ⌘↓ ⌘⇞ ⌘⇟ ⌘↖ ⌘↘). Claude's full-screen view keeps its own,
  // so there these go to Claude as its scroll keys: the wheel (a report at the middle of the window), Page Up and Down,
  // Ctrl+Home and Ctrl+End.
  const scrollBy = (step) => {
    if (claudeView()) {
      const mid = `${Math.max(1, term.cols >> 1)};${Math.max(1, term.rows >> 1)}`;
      const keysFor = { lineUp: `\x1b[<64;${mid}M`, lineDown: `\x1b[<65;${mid}M`, pageUp: '\x1b[5~', pageDown: '\x1b[6~', top: '\x1b[1;5H', bottom: '\x1b[1;5F' };
      atl.send('term:input', keysFor[step]);
      return;
    }
    if (step === 'lineUp' || step === 'lineDown') term.scrollLines(step === 'lineUp' ? -1 : 1);
    else if (step === 'pageUp' || step === 'pageDown') term.scrollPages(step === 'pageUp' ? -1 : 1);
    else if (step === 'top') term.scrollToTop();
    else term.scrollToBottom();
  };
  // Clear Buffer (the Mac's, iTerm2's ⌘K): the history goes and the screen clears, the program in front drawing itself
  // again (Ctrl+L: PowerShell's ClearScreen, Claude's redraw).
  const clearBuffer = () => {
    term.write('\x1b[3J');
    atl.send('term:input', '\x0c');
  };
  // The find bar (Ctrl+Shift+F, the right-click menu's Find…): every match lit as it's typed, Enter and F3 the next,
  // Shift with them the one before, the count when the search gives it, Esc closing it. F3 and Shift+F3 go on finding
  // with the bar's text from the terminal too, and Use Selection for Find puts the selection's first line in it.
  const findQ = document.getElementById('find-q');
  const findN = document.getElementById('find-n');
  // The matches in the theme's colours: each on a wash of the accent, the one in front on the accent. The search takes
  // #RRGGBB colours only, so the theme's are read through a canvas, which writes any CSS colour that way (or as rgba()).
  const paint = document.createElement('canvas').getContext('2d');
  const rgbOf = (c, d) => {
    paint.fillStyle = d;
    paint.fillStyle = c || d;
    const s = String(paint.fillStyle);
    const m = /^#([0-9a-f]{6})$/i.exec(s);
    const n = m ? [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)) : (s.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
    return n.length === 3 && n.every(Number.isFinite) ? n : [0, 2, 4].map((i) => parseInt(d.slice(1 + i, 3 + i), 16));
  };
  const hex = (rgb) => `#${rgb.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')}`;
  const findLook = () => {
    const bg = rgbOf(token('--code-bg'), '#251200');
    const accent = rgbOf(token('--accent'), '#f88008');
    const wash = (f) => hex(bg.map((v, i) => v + (accent[i] - v) * f));
    return {
      matchBackground: wash(0.35), matchBorder: wash(0.7), matchOverviewRuler: hex(accent),
      activeMatchBackground: hex(accent), activeMatchBorder: hex(rgbOf(token('--hi'), '#fff8f0')), activeMatchColorOverviewRuler: hex(accent),
    };
  };
  const runFind = (dir, incremental) => {
    const q = findQ.value;
    if (!q) {
      search.clearDecorations();
      findN.textContent = '';
      findEl.classList.remove('none');
      return;
    }
    const opts = { incremental, decorations: findLook() };
    findMissed = null;
    if (!(dir < 0 ? search.findPrevious(q, opts) : search.findNext(q, opts))) {
      findMissed = q;
      findN.textContent = 'no match';
      findEl.classList.add('none');
    }
  };
  // The query that found nothing: a count the search sends after that (the last query's, for a moment) isn't this one's.
  let findMissed = null;
  search.onDidChangeResults(({ resultIndex, resultCount }) => {
    if (!findQ.value || findMissed === findQ.value) return;
    // Past the search's limit of lit matches (1,000) it counts no further and says which one is in front no more.
    findN.textContent = !resultCount ? 'no match' : resultIndex < 0 ? `${resultCount}${resultCount >= 1000 ? '+' : ''}` : `${resultIndex + 1}/${resultCount}`;
    findEl.classList.toggle('none', !resultCount);
  });
  const showFind = () => {
    if (!findEl.hidden) return;
    findEl.hidden = false;
    showSelection();
  };
  const openFind = () => {
    showFind();
    findQ.focus();
    findQ.select();
    if (findQ.value) runFind(1, true);
  };
  const closeFind = () => {
    findEl.hidden = true;
    search.clearDecorations();
    findN.textContent = '';
    findEl.classList.remove('none');
    term.focus();
    showSelection();
  };
  const findStep = (dir) => {
    if (!findQ.value) return openFind();
    showFind();
    runFind(dir, false);
  };
  const useSelectionForFind = () => {
    const line = term.hasSelection() ? term.getSelection().split(/\r?\n/).find((l) => l.trim()) : '';
    if (!line) return;
    findQ.value = line.trim();
    openFind();
  };
  findQ.addEventListener('input', () => runFind(1, true));
  findQ.addEventListener('keydown', (e) => {
    if (e.isComposing) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeFind();
    } else if (e.key === 'Enter' || e.key === 'F3') {
      e.preventDefault();
      runFind(e.shiftKey ? -1 : 1, false);
    }
  });
  for (const [id, act] of [['find-prev', () => runFind(-1, false)], ['find-next', () => runFind(1, false)], ['find-close', closeFind]]) {
    const b = document.getElementById(id);
    b.addEventListener('mousedown', (e) => e.preventDefault());
    b.onclick = act;
  }
  // The last reply copied whole (the strip's button, Edit's Copy Last Reply), from the transcript: the badge counts it.
  const copyReply = () => atl.ask('term:copyReply').then((r) => r && r.ok && showCopied(r.chars), () => {});
  // The app's menus (the right-click one, the menu bar's items and their keys) act on the terminal through term:do.
  const ACTIONS = {
    copy: copyAction,
    paste: () => pasteClipboard(),
    selectAll: () => term.selectAll(),
    find: openFind,
    findNext: () => findStep(1),
    findPrevious: () => findStep(-1),
    useSelectionForFind,
    clearBuffer,
    scrollLineUp: () => scrollBy('lineUp'),
    scrollLineDown: () => scrollBy('lineDown'),
    scrollPageUp: () => scrollBy('pageUp'),
    scrollPageDown: () => scrollBy('pageDown'),
    scrollTop: () => scrollBy('top'),
    scrollBottom: () => scrollBy('bottom'),
    copyReply,
  };
  atl.on('term:do', (m) => {
    const action = typeof m === 'string' ? m : m && m.action;
    if (typeof action === 'string' && Object.hasOwn(ACTIONS, action)) ACTIONS[action]();
  });
  // The local MCP server (the app's mcp.js, the Mac's terminalText): what this terminal shows, as text, for Claude's
  // read_session and for the checks before it types a prompt. The screen in front (Claude's full-screen view is the
  // alternate one), row by row, the last 60,000 characters.
  atl.on('term:screen', (rid) => {
    const b = term.buffer.active;
    const rows = [];
    // Row by row as the screen shows them, wrapped rows not joined: Claude draws its box's top rule the full width of the
    // window, so xterm counts the input row under it as wrapped, and joined the two the input box (❯) was lost and an
    // older prompt above it was taken for typed text.
    for (let y = Math.max(0, b.length - 2000); y < b.length; y++) {
      const line = b.getLine(y);
      if (line) rows.push(line.translateToString(false));
    }
    atl.send('term:screen', { rid, text: rows.map((r) => r.replace(/\s+$/, '')).join('\n').slice(-60000) });
  });
  // Tokens as the Mac's strip writes them: 950, 9.5k, 95k, 1.2M.
  const fmtTok = (n) => {
    n = Math.max(0, Math.trunc(Number(n) || 0));
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e4) return `${Math.round(n / 1e3)}k`;
    if (n >= 1e3) return `${(n / 1e3).toFixed(1)}k`;
    return String(n);
  };
  // Money, durations and clocks as the Mac's HUD writes them: $0.42, $12; 45s, 3m07, 1h05; 0:42, 1:02:33.
  const fmtUsd = (n) => (n >= 100 ? `$${n.toFixed(0)}` : n >= 0.01 ? `$${n.toFixed(2)}` : n > 0 ? `$${n.toFixed(3)}` : '$0');
  const two = (n) => String(n).padStart(2, '0');
  const fmtDur = (ms) => {
    const s = Math.trunc(Math.max(0, ms) / 1000);
    if (s < 60) return `${s}s`;
    if (s < 3600) return `${Math.trunc(s / 60)}m${two(s % 60)}`;
    return `${Math.trunc(s / 3600)}h${two(Math.trunc((s % 3600) / 60))}`;
  };
  const clock = (ms) => {
    const s = Math.trunc(Math.max(0, ms) / 1000);
    const h = Math.trunc(s / 3600), m = Math.trunc((s % 3600) / 60);
    return h > 0 ? `${h}:${two(m)}:${two(s % 60)}` : `${m}:${two(s % 60)}`;
  };
  const STATUS = { busy: ['WORKING', '--accent'], idle: ['YOUR TURN', '--cyan'], waiting: ['⚠ NEEDS YOU', '--warn'], terminal: ['TERMINAL', '--cyan'], ended: ['ENDED', '--ended'] };
  // A tool call's colour by its kind (the Mac's Theme.catHex), a plan's for the rest.
  const CAT = { web: '--sky', browser: '--blue', read: '--green', search: '--lime', edit: '--amber', bash: '--orange', agent: '--violet', mcp: '--magenta', plan: '--lavender' };
  const hudEl = document.getElementById('hud');
  const titleEl = document.getElementById('title');
  const statusEl = document.getElementById('status');
  const actionEl = document.getElementById('action');
  const sparkEl = document.getElementById('spark');
  const pinEl = document.getElementById('pin');
  const acctEl = document.getElementById('acct');
  // A narrow window drops the strip's pieces one at a time, the least needed first, rather than wrapping it or cutting
  // off its buttons: the sparkline, model and effort, today's counts, the cost, why it waits, the tool call, the context.
  // The folder, the tool call's own words and the title give way on their own before that (the title slowest, and only
  // down to ten characters' worth).
  const DROPS = ['#spark', '#model', '#counts', '#cost', '#status .why', '#action', '#ctx'].map((s) => hudEl.querySelector(s));
  const fitHud = () => {
    for (const el of DROPS) el.classList.remove('dropped');
    // In a split the slim strip keeps 70 px for the name, as the Mac's pane title bar does (its counts go first, then the
    // context; the rest isn't on it).
    const keep = document.body.classList.contains('pane-split') ? 70 : 72;
    const cramped = () => hudEl.scrollWidth > hudEl.clientWidth || titleEl.clientWidth < Math.min(titleEl.scrollWidth, keep);
    acctEl.classList.remove('narrow');
    for (const el of DROPS) {
      if (!cramped()) break;
      el.classList.add('dropped');
    }
    // The account's chip keeps its initial and chevron (spec 10): its words go before the title's room does.
    if (!acctEl.hidden && cramped()) acctEl.classList.add('narrow');
  };
  new ResizeObserver(fitHud).observe(hudEl);
  // The status's and the tool call's clocks, every second (the Mac's header redraws as often).
  // A clock grown a digit fits the strip again.
  const tick = () => {
    const now = Date.now();
    const timed = ['busy', 'idle', 'waiting'].includes(info.status) && info.statusSince > 0;
    const a = info.action;
    const t = statusEl.querySelector('.t'), dur = actionEl.querySelector('.dur');
    const was = t.textContent.length + dur.textContent.length;
    t.textContent = timed ? ` ${clock(now - info.statusSince)}` : '';
    dur.textContent = a && a.since > 0 ? fmtDur(now - a.since) : '';
    if (t.textContent.length + dur.textContent.length !== was) fitHud();
  };
  setInterval(tick, 1000);
  // The activity sparkline: a bar for each slice of time, the busiest the full height (the Mac's SparkView).
  const drawSpark = (values) => {
    const max = Math.max(1, ...values);
    const bw = 96 / values.length;
    sparkEl.firstElementChild.innerHTML = values.map((v, x) => {
      const h = v > 0 ? Math.max(3, (v / max) * 16) : 2;
      return `<rect x="${(x * bw + 0.5).toFixed(2)}" y="${(18 - h).toFixed(2)}" width="${Math.max(0.5, bw - 1).toFixed(2)}" height="${h.toFixed(2)}" fill-opacity="${v > 0 ? 0.85 : 0.18}"/>`;
    }).join('');
  };
  const setPin = (on) => {
    pinEl.classList.toggle('on', on);
    pinEl.title = on ? 'Stop keeping this window above all other apps' : 'Keep this window above all other apps';
  };
  // The pin is the window's, once (the Mac's HUD pin): in a split the window's bar over the panes has it, and the slim
  // strips don't (terminal.css).
  const showPin = () => {
    pinEl.hidden = typeof info.pinned !== 'boolean';
  };
  // In a split the strip is the Mac's pane title bar: its dot only while the AI in it works or needs you, in that colour,
  // and saying so when the pointer rests on the strip. Its copy shows whenever an AI runs here, and its star says what the
  // Mac's does (each pane's own: they act for this pane, term:copyReply and term:favorite).
  const paintSlim = () => {
    const split = document.body.classList.contains('pane-split');
    const st = !info.chat ? '' : info.status === 'terminal' && info.tool ? info.toolStatus || '' : info.status || '';
    const dot = st === 'busy' || st === 'waiting' ? st : '';
    hudEl.dataset.dot = dot;
    hudEl.title = split && dot ? (dot === 'busy' ? 'Working' : 'Needs you') : '';
    document.getElementById('copyreply').hidden = split ? !info.chat : info.canCopyReply !== true;
    const star = document.getElementById('star');
    star.title = split ? (info.fav ? 'Remove this chat from your favorites' : 'Add this chat to your favorites in the sidebar')
      : info.fav ? "Starred. Click to take it out of the chats list's favourites." : "Star this chat in the chats list's favourites.";
    star.setAttribute('aria-label', star.title);
  };
  atl.on('term:info', (got) => {
    const i = (info = got || {});
    tool = i.tool || null;
    toolStatus = i.toolStatus || null;
    if (info.status !== 'ended') wasAI = aiOn();
    titleEl.textContent = i.title || 'terminal';
    document.title = `${i.title || 'terminal'} · Orbiterm`;
    const [label, color] = STATUS[i.status] || ['', '--dim'];
    // Why it waits (a permission, a question) after the label, as the Mac's footer has it, and as the status's tooltip.
    // Streamer mode leaves it out: it can name a file or a command.
    const why = i.status === 'waiting' && !i.streamer && typeof i.waitingFor === 'string' ? i.waitingFor : '';
    statusEl.querySelector('.lbl').textContent = label;
    statusEl.querySelector('.why').textContent = why ? ` · ${why}` : '';
    statusEl.title = why;
    statusEl.classList.toggle('waiting', i.status === 'waiting');
    document.getElementById('where').textContent = i.cwd || '';
    document.body.style.setProperty('--st', `var(${color})`);
    // Streamer mode: the names above are made up already; the terminal itself goes behind frosted glass.
    document.getElementById('veil').hidden = !i.streamer;
    // The AI session in it: the star (in the chats list's favourites or not), its context and today's counts.
    const star = document.getElementById('star');
    star.hidden = !i.chat;
    star.classList.toggle('on', !!i.fav);
    star.title = i.fav ? "Starred. Click to take it out of the chats list's favourites." : "Star this chat in the chats list's favourites.";
    const st = i.stats;
    const ctxEl = document.getElementById('ctx');
    const countsEl = document.getElementById('counts');
    ctxEl.hidden = countsEl.hidden = !st;
    if (st) {
      ctxEl.querySelector('.bar span').style.width = `${st.ctxMax > 0 ? Math.min(1, st.ctx / st.ctxMax) * 100 : 0}%`;
      ctxEl.querySelector('.n').textContent = fmtTok(st.ctx) + (st.ctxMax > 0 ? ` / ${fmtTok(st.ctxMax)}` : '');
      // The slim strip's (a split's) shows the size alone, as the Mac's pane title bar.
      ctxEl.querySelector('.s').textContent = fmtTok(st.ctx);
      // Its subagents at work after the counts, as the Mac's "⤷2".
      const agents = Math.trunc(Number(i.agentsRunning) || 0);
      countsEl.innerHTML = `<b>${st.tools}</b><i> tools · </i><b>${st.web}</b><i> web · </i><b${st.errors > 0 ? ' class="err"' : ''}>${st.errors}</b><i> err</i>` +
        (agents > 0 ? `<span class="ag"> · ⤷${agents}</span>` : '');
    }
    // The tool call the AI is on ("▸ Bash"), what it's doing and for how long, in its kind's colour. Streamer mode keeps
    // the name and the time only: what it's doing can name a file or a command.
    const a = i.action && i.action.name ? i.action : null;
    actionEl.hidden = !a;
    if (a) {
      actionEl.style.setProperty('--cat', `var(${CAT[a.cat] || '--lavender'})`);
      actionEl.querySelector('.name').textContent = `▸ ${a.name}`;
      actionEl.querySelector('.label').textContent = i.streamer ? '' : String(a.label || '');
      actionEl.title = i.streamer ? '' : [a.name, a.label].filter(Boolean).join(' ');
    }
    // Model and effort, and what the session has cost (Claude's only: another AI tool's would be a $0 it didn't cost).
    const modelEl = document.getElementById('model');
    const model = [i.model, i.effort].filter((x) => typeof x === 'string' && x).join(' · ');
    modelEl.hidden = !model;
    modelEl.textContent = model;
    const costEl = document.getElementById('cost');
    const priced = typeof i.cost === 'number' && Number.isFinite(i.cost) && !i.tool;
    costEl.hidden = !priced;
    if (priced) costEl.textContent = fmtUsd(i.cost);
    const spark = Array.isArray(i.spark) && i.status !== 'terminal' ? i.spark.map(Number).filter(Number.isFinite) : [];
    sparkEl.hidden = !spark.length;
    if (spark.length) drawSpark(spark);
    // Copy the last reply (once there's one to copy), and keep the window on top.
    document.getElementById('copyreply').hidden = i.canCopyReply !== true;
    if (typeof i.pinned === 'boolean') setPin(i.pinned);
    showPin();
    paintSlim();
    tick();
    drawAcct(i.acct, i.status);
    fitHud();
  });
  // ---------- the Claude account (spec 4 to 7; the Mac's AccountChip and AccountNoteBar) ----------
  // The app sends `acct` with the strip (term:info): null with one account only or when another AI runs here, else the chip
  // ({ mark, left, out, pending }) and the note under it. A click opens the app's menu; a note's buttons are the user's
  // clicks too: nothing here switches by itself.
  const acctNote = document.getElementById('acctnote');
  const escA = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const hueOf = (h) => (typeof h === 'string' && /^\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*$/.test(h) ? h : '255, 176, 87');
  const disc = (m) => `<i class="ac" style="--ah:${hueOf(m.hue)}">${escA(m.initial)}</i>`;
  const GAUGE = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 11.5a5.5 5.5 0 1 1 11 0M8 11.5 5.6 7.4"/></svg>';
  const TICK = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"/></svg>';
  const CLOCK = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.6"/><path d="M8 4.8V8l2.2 1.4"/></svg>';
  let acctWas = '';
  let noteSaid = '';
  function drawAcct(a, status) {
    const c = a && a.chip;
    acctEl.hidden = !c;
    if (!c) {
      acctNote.hidden = true;
      acctNote.innerHTML = '';
      acctWas = noteSaid = '';
      return;
    }
    const m = c.mark;
    const low = typeof c.left === 'number' && c.left < 20;
    let words = '';
    if (c.pending) words = `<span class="sep"></span><span class="next words">${CLOCK}<span>→</span>${disc(c.pending)}<span>after this reply</span></span>`;
    else if (c.out) words = '<span class="sep"></span><span class="pct">limit</span>';
    else if (low) words = `<span class="sep"></span><span class="pct">${Math.round(c.left)}%</span>`;
    const label = `Claude account: ${m.label}${c.out ? ', out of its limit' : low ? `, ${Math.round(c.left)}% left` : ''}${c.pending ? `, moves to ${c.pending.label} when this reply ends` : ''}`;
    const html = `${disc(m)}<span class="lab">${escA(m.label)}</span>${words}<svg class="chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 6l4.5 4.5L12.5 6"/></svg>`;
    acctEl.style.setProperty('--ah', hueOf(m.hue));
    if (c.pending) acctEl.style.setProperty('--ah2', hueOf(c.pending.hue));
    acctEl.classList.toggle('out', !!c.out);
    acctEl.classList.toggle('pending', !!c.pending);
    acctEl.title = label;
    acctEl.setAttribute('aria-label', label);
    if (html !== acctEl.__html) {
      // After a switch: one ring pulse in the new colour.
      if (acctEl.__mark && acctEl.__mark !== m.id) {
        acctEl.classList.remove('flash');
        void acctEl.offsetWidth;
        acctEl.classList.add('flash');
      }
      acctEl.innerHTML = html;
      acctEl.__html = html;
    }
    acctEl.__mark = m.id;
    drawNote(a.note);
  }
  const noteHTML = (n) => {
    const btn = (act, to, label, cls) => `<button type="button" class="${cls || ''}" data-act="${act}"${to ? ` data-to="${escA(to.id)}"` : ''}>${to ? disc(to) : ''}<span>${label}</span></button>`;
    if (n.kind === 'limit') {
      const text = n.to
        ? `<b>${escA(n.from.label)} is out of its ${n.what}.</b> <span class="more">It fills again ${escA(n.fills)}.</span>`
        : `<b>${escA(n.from.label)} is out of its ${n.what} until ${escA(n.fills.replace(/^(at|on) /, ''))}.</b> <span class="more">${escA(n.otherOut || '')}</span>`;
      return { cls: 'limit', say: `${n.from.label} is out of its ${n.what}.`, html: `${GAUGE}<span class="msg">${text}</span>${n.to ? btn('continue', n.to, `Continue with ${escA(n.to.label)}`) + btn('notNow', null, 'Not now', 'quiet') : btn('notNow', null, 'Not now', 'quiet')}` };
    }
    if (n.kind === 'low') {
      const week = n.what === 'week';
      const text = `<b>${escA(n.from.label)} has 5% ${week ? 'of its week ' : ''}left.</b> <span class="more">${n.idle ? `Continue with ${escA(n.to.label)}?` : `Switch to ${escA(n.to.label)} when this reply ends?`}</span>`;
      return { cls: 'low', say: `${n.from.label} has 5% left.`, html: `${GAUGE}<span class="msg">${text}</span>${btn('continue', n.to, n.idle ? `Continue with ${escA(n.to.label)}` : 'After this reply')}${btn('notNow', null, 'Not now', 'quiet')}` };
    }
    if (n.kind === 'switching') return { cls: 'switching', say: '', html: `${CLOCK}<span class="msg"><b>Switching to ${escA(n.to.label)}…</b></span>` };
    return { cls: 'went', say: `This chat went on with ${n.to.label}.`, html: `${TICK}<span class="msg"><b>This chat went on with ${escA(n.to.label)}.</b>${n.fromLabel ? ` <span class="more">${escA(n.fromLabel)} fills again ${escA(n.fills || 'later')}.</span>` : ''}</span><button type="button" class="quiet" data-act="dismiss">Dismiss</button>` };
  }
  function drawNote(n) {
    if (!n) {
      acctNote.hidden = true;
      acctNote.innerHTML = '';
      noteSaid = '';
      return;
    }
    const v = noteHTML(n);
    const key = v.cls + v.html;
    if (key === noteSaid) return;
    noteSaid = key;
    acctNote.className = v.cls;
    acctNote.innerHTML = v.html;
    acctNote.hidden = false;
    // Said once (WCAG 4.1.3), politely.
    if (v.say) announce.textContent = v.say;
    acctNote.querySelectorAll('button').forEach((b) => {
      b.onclick = () => {
        term.focus();
        atl.send('term:acctNote', { action: b.dataset.act, to: b.dataset.to || '' });
      };
    });
  }
  acctEl.onclick = () => {
    term.focus();
    const r = acctEl.getBoundingClientRect();
    acctEl.classList.add('open');
    atl.send('term:acctMenu', { x: Math.round(r.left), y: Math.round(r.bottom + 2) });
  };
  atl.on('term:acctMenu', (open) => acctEl.classList.toggle('open', !!open));
  // ---------- a linked worktree: the chip and the split button (the Mac's WorktreeChip.swift) ----------
  // The app sends what to show (term:ship, from its worktreeship.js; null: not in a worktree) and does what a click asks:
  // the chip shows the changes in Source Control, the main face opens the next step's sheet, ▾ a menu of everything.
  const wtEl = document.getElementById('wt');
  const shipEl = document.getElementById('ship');
  const shipMain = document.getElementById('shipMain');
  const shipMore = document.getElementById('shipMore');
  const announce = document.getElementById('announce');
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const sv = (body) => `<svg viewBox="0 0 16 16" aria-hidden="true">${body}</svg>`;
  const WT_ICON = {
    branch: sv('<circle cx="4.5" cy="3" r="1.6"/><circle cx="4.5" cy="13" r="1.6"/><circle cx="11.5" cy="5" r="1.6"/><path d="M4.5 4.6v6.8M11.5 6.6c0 3.2-7 2.4-7 4.8"/>'),
    pull: sv('<circle cx="4" cy="3.4" r="1.6"/><circle cx="4" cy="12.6" r="1.6"/><circle cx="12" cy="12.6" r="1.6"/><path d="M4 5v6M12 11V6.4a2 2 0 0 0-2-2H7.2M8.8 2.8 7.2 4.4 8.8 6"/>'),
    merge: sv('<circle cx="4" cy="3.4" r="1.6"/><circle cx="4" cy="12.6" r="1.6"/><circle cx="12" cy="9" r="1.6"/><path d="M4 5v6M4.6 4.9C5.6 8 7.8 9 10.4 9"/>'),
    trash: sv('<path d="M2.8 4.4h10.4M6.3 4.4V2.9h3.4v1.5M4.4 4.4l.7 8.6a1 1 0 0 0 1 .9h3.8a1 1 0 0 0 1-.9l.7-8.6M6.9 7v4.4M9.1 7v4.4"/>'),
    ext: sv('<path d="M9 2.5h4.5V7M13.5 2.5 7.6 8.4M11.5 9.6v2.9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h2.9"/>'),
    chev: sv('<path d="M3.5 6l4.5 4.5L12.5 6"/>'),
    ok: '<svg class="ok" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"/></svg>',
    bad: '<svg class="bad" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7"/></svg>',
  };
  shipMore.innerHTML = WT_ICON.chev;
  // The checks' mark: ✓ passed, ✕ failed, a turning ring while they run, nothing when there are none.
  const checksMark = (k) => (k === 'pass' ? WT_ICON.ok : k === 'fail' ? WT_ICON.bad : k === 'run' ? '<span class="ring"></span>' : '');
  let ship = null;
  function drawShip() {
    const v = ship;
    wtEl.hidden = !v;
    shipEl.hidden = !v || !v.face;
    if (!v) return;
    const t = v.tail;
    let tail = '';
    if (t) {
      const sep = '<span class="sep"></span>';
      if (t.type === 'deleted' || t.type === 'gone') tail = `<span class="tail">${sep}<span class="gone">${t.type === 'deleted' ? 'deleted' : 'folder gone'}</span></span>`;
      else if (t.type === 'nums') tail = `<span class="tail nums">${sep}<span>+${t.add}</span><span class="del">−${t.del}</span></span>`;
      else if (t.type === 'closed') tail = `<span class="tail">${sep}<span class="pr">#${t.number} closed</span></span>`;
      else if (t.type === 'pr') tail = `<span class="tail">${sep}<span class="pr">#${t.number}${t.draft ? ' draft' : ''}</span>${t.draft ? '' : checksMark(t.checks)}</span>`;
      else if (t.type === 'merged') tail = `<span class="tail">${sep}<span class="pr">merged</span>${WT_ICON.ok}</span>`;
    }
    wtEl.innerHTML = `${WT_ICON.branch}<span class="word">worktree ·</span><span class="br">${esc(v.branch)}</span>${tail}`;
    const dim = v.deleted || v.phase === 'gone';
    wtEl.classList.toggle('dim', dim);
    wtEl.classList.toggle('flat', !dim && !v.clickable);
    wtEl.title = v.tip || '';
    wtEl.setAttribute('aria-label', v.label || '');
    if (!v.face) return;
    // The next step, or what is under way here (from this window or another of the same worktree).
    shipMain.innerHTML = v.busy ? `<span class="ring"></span><span>${esc(v.busy)}</span>` : `${WT_ICON[v.face.icon] || WT_ICON.pull}<span>${esc(v.face.label)}</span>`;
    shipMain.classList.toggle('busy', !!v.busy);
    shipMain.classList.toggle('off', !v.busy && !v.face.enabled);
    shipMain.title = v.busy ? '' : v.face.tip || '';
    shipMain.setAttribute('aria-label', v.busy || `${v.face.label}. ${v.face.tip || ''}`);
    shipMain.setAttribute('aria-disabled', String(!!v.busy || !v.face.enabled));
    shipMore.setAttribute('aria-label', v.more || 'More actions for this worktree');
  }
  atl.on('term:ship', (v) => {
    const old = ship && ship.tail && ship.tail.type === 'pr' ? ship.tail : null;
    const now = v && v.tail && v.tail.type === 'pr' ? v.tail : null;
    ship = v || null;
    drawShip();
    // The chip and the button take room on the strip: it's fitted again (fitHud).
    fitHud();
    // Checks finishing is said once (WCAG 4.1.3): the colour isn't the only sign.
    if (old && now && old.number === now.number && old.checks !== now.checks && (now.checks === 'pass' || now.checks === 'fail')) {
      announce.textContent = `PR #${now.number}: ${now.checks === 'pass' ? 'checks passed' : 'a check failed'}.`;
    }
  });
  // While the ▾ menu is open its half looks pressed.
  atl.on('term:shipMenu', (open) => shipMore.classList.toggle('open', !!open));
  wtEl.onclick = () => {
    term.focus();
    if (ship && ship.clickable) atl.send('term:shipChip');
  };
  shipMain.onclick = () => {
    term.focus();
    if (ship && ship.face && ship.face.enabled && !ship.busy) atl.send('term:shipMain');
  };
  shipMore.onclick = () => {
    const r = shipMore.getBoundingClientRect();
    atl.send('term:shipMore', { x: Math.round(r.left), y: Math.round(r.bottom + 2) });
  };

  document.getElementById('hud').addEventListener('mousedown', (e) => e.preventDefault());
  document.getElementById('star').onclick = () => {
    term.focus();
    atl.send('term:favorite');
  };
  document.getElementById('copyreply').onclick = () => {
    term.focus();
    copyReply();
  };
  pinEl.onclick = () => {
    term.focus();
    atl.ask('term:pin').then((r) => r && typeof r.pinned === 'boolean' && setPin(r.pinned), () => {});
  };
  document.getElementById('end').onclick = () => atl.send('term:end');
  // ---------- one of several panes (the app's tabs and splits, the Mac's pane title bar) ----------
  // The strip is the pane's title bar: in a split, the panes without the keys dim a little, as in iTerm2, and the one
  // with them is marked. A double click on its name renames it in place (Enter keeps it, empty goes back to the one it's
  // given, Esc drops it); a right click on the strip has Rename and the moves to a tab or a window of its own.
  // The tab in front has several panes, even while one is zoomed to the whole area (only then is `panes` 1): its strip drags.
  // With several panes shown the strip is slim (terminal.css, the Mac's PaneTitleBar): its own copy, env, star and × (End
  // here), the window's bar over the panes (pages/tabs.js) the rest for the pane with the keys. The account's disc shows
  // when the window's panes use more than one account (`accounts`).
  let inSplit = false;
  const endEl = document.getElementById('end');
  atl.on('term:pane', (p) => {
    inSplit = !!p && (p.panes > 1 || !!p.split);
    const several = !!p && p.panes > 1;
    document.body.classList.toggle('pane-split', several);
    document.body.classList.toggle('pane-off', several && !p.focused);
    document.body.classList.toggle('pane-accts', several && !!p.accounts);
    endEl.textContent = several ? '×' : 'end';
    endEl.title = several ? 'End this chat and stop the AI (a terminal: close it)' : 'End this terminal';
    endEl.setAttribute('aria-label', endEl.title);
    paintSlim();
    fitHud();
  });
  let renaming = false;
  const renameTitle = () => {
    if (renaming) return;
    renaming = true;
    const input = document.createElement('input');
    input.id = 'rename';
    input.value = info.title || '';
    input.setAttribute('aria-label', 'Name');
    titleEl.hidden = true;
    titleEl.after(input);
    let done = false;
    const finish = (keep) => {
      if (done) return;
      done = true;
      renaming = false;
      if (keep) atl.send('term:rename', input.value);
      input.remove();
      titleEl.hidden = false;
      term.focus();
      fitHud();
    };
    input.addEventListener('keydown', (e) => {
      if (e.isComposing) return;
      if (e.key === 'Enter') finish(true);
      else if (e.key === 'Escape') finish(false);
      e.stopPropagation();
    });
    input.addEventListener('blur', () => finish(false));
    input.focus();
    input.select();
  };
  titleEl.addEventListener('dblclick', renameTitle);
  atl.on('term:renameStart', renameTitle);
  hudEl.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    atl.send('term:paneMenu');
  });
  // ---------- dragging the strip (the Mac's pane title bar drag) ----------
  // As with the app's tab chips: a press that moves more than a few pixels drags the pane, anything less stays a click.
  // The strip takes the pointer only then, so a double click on the name still reaches it; main reads the pointer itself and
  // this page says only which phase the drag is in.
  const DRAG_SLOP = 5;
  let pd = null; // { x0, y0, pointerId, started, cancelled, finished, seq, raf }
  let pdSeq = 0;
  let pdSwallow = false;
  let pdLastEnd = 0;
  const tellDrag = (m) => atl.send('term:drag', { kind: 'pane', ...m });
  hudEl.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || pd || renaming || !inSplit) return;
    if (e.target.closest('button, input')) return;
    pd = { x0: e.clientX, y0: e.clientY, pointerId: e.pointerId, started: false, cancelled: false, finished: false, seq: 0, raf: 0 };
    tellDrag({ phase: 'arm', seq: 0 });
  });
  window.addEventListener('pointermove', (e) => {
    if (!pd || e.pointerId !== pd.pointerId || pd.finished) return;
    // The button came up where no pointerup reached this page: the drag is over, or disarmed.
    if (!(e.buttons & 1)) return endPaneDrag(e, true);
    if (!pd.started) {
      if (Math.hypot(e.clientX - pd.x0, e.clientY - pd.y0) <= DRAG_SLOP) return;
      pd.started = true;
      pd.seq = ++pdSeq;
      try { hudEl.setPointerCapture(e.pointerId); } catch (_) { /* lostpointercapture cancels */ }
      document.body.classList.add('dragging');
      tellDrag({ phase: 'start', seq: pd.seq });
    }
    // One report for each frame is enough: main reads the pointer itself when it gets it.
    if (pd.cancelled || pd.raf) return;
    const d = pd;
    d.raf = requestAnimationFrame(() => {
      d.raf = 0;
      if (!d.cancelled && !d.finished) tellDrag({ phase: 'move', seq: d.seq });
    });
  });
  const endPaneDrag = (e, up) => {
    if (!pd || e.pointerId !== pd.pointerId || pd.finished) return;
    const d = pd;
    d.finished = true;
    if (d.started) {
      // A cancel always ends the drag: after a pointercancel the pointer never comes back, so the drop must not run.
      if (!d.cancelled) tellDrag({ phase: up ? 'end' : 'cancel', seq: d.seq });
      pdSwallow = true;
      pdLastEnd = performance.now();
    }
    if (hudEl.hasPointerCapture(d.pointerId)) hudEl.releasePointerCapture(d.pointerId);
    document.body.classList.remove('dragging');
    pd = null;
  };
  window.addEventListener('pointerup', (e) => endPaneDrag(e, true));
  window.addEventListener('pointercancel', (e) => endPaneDrag(e, false));
  // Capture lost while the button is still down is a drag that can't go on.
  window.addEventListener('lostpointercapture', (e) => {
    if (pd && pd.started && !pd.finished && e.pointerId === pd.pointerId) endPaneDrag(e, false);
  });
  // A drag that ended by pointercancel or lost capture gets no click: the flag must not eat the next, unrelated one.
  window.addEventListener('pointerdown', () => { pdSwallow = false; }, true);
  // The click that follows a drag must not press a button or start a rename.
  window.addEventListener('click', (e) => {
    if (!pdSwallow) return;
    pdSwallow = false;
    e.stopPropagation();
    e.preventDefault();
  }, true);
  window.addEventListener('dblclick', (e) => {
    if (performance.now() - pdLastEnd < 500) e.stopPropagation();
  }, true);
  const cancelPaneDrag = () => {
    pd.cancelled = true;
    document.body.classList.remove('dragging');
  };
  // Esc drops the drag: nothing moves, and the shell never sees that Esc.
  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !pd || !pd.started || pd.cancelled || pd.finished) return;
    e.preventDefault();
    e.stopPropagation();
    cancelPaneDrag();
    tellDrag({ phase: 'cancel', seq: pd.seq });
  }, true);
  // Main dropped the drag (Esc in another window, the source went away): stop reporting, and the click still gets swallowed.
  atl.on('term:dragCancel', (m) => {
    if (m && pd && pd.started && !pd.cancelled && m.seq === pd.seq) cancelPaneDrag();
  });
  term.focus();
  atl.send('term:ready', size());
})();
