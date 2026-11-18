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
  term.onData((data) => atl.send('term:input', data));
  // The AI tool running in this window, as the app tells it (term:info), for the keys it needs.
  let tool = null;
  // Copy-on-select, as on the Mac: dragging or double-clicking a selection copies it to the clipboard on mouse release,
  // shows the "COPIED N CHARS" badge in the HUD, and keeps the selection highlighted.
  let mouseDown = false, pendingCopy = false, copyTimer = 0;
  const copiedEl = document.getElementById('copied');
  const showCopied = (n) => {
    if (!(n > 0)) return;
    copiedEl.textContent = `COPIED ${n} CHAR${n === 1 ? '' : 'S'}`;
    copiedEl.hidden = false;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => (copiedEl.hidden = true), 2200);
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
  // Ctrl+C copies when something is selected (else it interrupts), Ctrl+V pastes: Windows Terminal's keys. The copy
  // goes through the app, as the page's clipboard API refuses a window without focus. Ctrl+V only keeps xterm.js from
  // sending ^V: the browser's own paste follows and xterm.js takes it (pasting here as well put everything in twice).
  term.attachCustomKeyEventHandler((e) => {
    if (e.type !== 'keydown') return true;
    if (token('--theme-id') === 'farukiskender' && e.key === 'Escape' && !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey) {
      e.preventDefault();
      e.stopPropagation();
      atl.send('term:close');
      return false;
    }
    if (!e.ctrlKey || e.altKey) return true;
    const k = e.key.toLowerCase();
    if (k === 'c' && term.hasSelection()) {
      e.preventDefault();
      copySelection();
      // Cleared, as in Windows Terminal: the next Ctrl+C interrupts again.
      term.clearSelection();
      return false;
    }
    // Ctrl+N (a new file in Source Control's editor), Ctrl+Shift+N (a new terminal), Ctrl+K (the shortcut wheel), Ctrl+W
    // (end this terminal) and Ctrl+Shift+W (close the window: what runs in it goes on) are the app's, as ⌘N, ⇧⌘N, ⌘K,
    // ⌘W and ⇧⌘W are on the Mac: left unhandled, they reach its menu instead of the shell. Antigravity approves its
    // subagents' steps with Ctrl+K, so while it runs here the key is its own (the wheel is still Ctrl and the middle
    // mouse button away).
    if (k === 'k' && tool === 'Antigravity') return true;
    if (k === 'n' || k === 'w' || (!e.shiftKey && k === 'k')) return false;
    return k !== 'v';
  });
  atl.on('term:data', (data) => term.write(data));
  atl.on('term:exit', () => term.write('\r\n\x1b[2m[ended]\x1b[0m\r\n'));
  // Tokens as the Mac's strip writes them: 950, 9.5k, 95k, 1.2M.
  const fmtTok = (n) => {
    n = Math.max(0, Math.trunc(Number(n) || 0));
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e4) return `${Math.round(n / 1e3)}k`;
    if (n >= 1e3) return `${(n / 1e3).toFixed(1)}k`;
    return String(n);
  };
  const STATUS = { busy: ['WORKING', '--accent'], idle: ['YOUR TURN', '--cyan'], waiting: ['NEEDS YOU', '--warn'], terminal: ['TERMINAL', '--cyan'], ended: ['ENDED', '--ended'] };
  atl.on('term:info', (i) => {
    tool = i.tool || null;
    document.getElementById('title').textContent = i.title || 'terminal';
    document.title = `${i.title || 'terminal'} · Orbiterm`;
    const [label, color] = STATUS[i.status] || ['', '--dim'];
    document.getElementById('status').textContent = label;
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
      countsEl.innerHTML = `<b>${st.tools}</b><i> tools · </i><b>${st.web}</b><i> web · </i><b${st.errors > 0 ? ' class="err"' : ''}>${st.errors}</b><i> err</i>`;
    }
  });
  document.getElementById('hud').addEventListener('mousedown', (e) => e.preventDefault());
  document.getElementById('star').onclick = () => {
    term.focus();
    atl.send('term:favorite');
  };
  document.getElementById('end').onclick = () => atl.send('term:end');
  addEventListener('keydown', (e) => {
    if (token('--theme-id') === 'farukiskender' && e.key === 'Escape' && !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey) {
      e.preventDefault();
      atl.send('term:close');
    }
  });
  term.focus();
  atl.send('term:ready', size());
})();
