'use strict';
// shellquote.js's own test: `npm test` in this folder, or `node scripts/shellquote-test.js`.
// Each word the app puts on a shell's line is read back the way that shell would read it, and must come back as the
// word itself — a word that ends the string early would let the rest of a file's name run as code.
const assert = require('node:assert');
const path = require('node:path');
const { quoteFor, quotePath } = require('../src/shellquote');

// Every character PowerShell takes as a single quote.
const PS_Q = "'\u2018\u2019\u201A\u201B";
/** What PowerShell reads from one single-quoted token, or null when the token isn't one whole string. */
function psRead(tok) {
  if (!tok || !PS_Q.includes(tok[0])) return null;
  let out = '';
  for (let i = 1; i < tok.length; i++) {
    const c = tok[i];
    if (!PS_Q.includes(c)) { out += c; continue; }
    // Two quote characters in a row: one character of the word, and the string goes on.
    if (i + 1 < tok.length && PS_Q.includes(tok[i + 1])) { out += c; i++; continue; }
    // A quote that closes: anything after it is code, not the word.
    return i === tok.length - 1 ? out : null;
  }
  return null; // never closed
}
/** What a POSIX shell reads from one single-quoted word, or null when it isn't one whole word. */
function shRead(tok) {
  let out = '';
  let i = 0;
  while (i < tok.length) {
    if (tok[i] === '\\') {
      if (i + 1 >= tok.length) return null;
      out += tok[i + 1];
      i += 2;
    } else if (tok[i] === "'") {
      const end = tok.indexOf("'", i + 1);
      if (end < 0) return null;
      out += tok.slice(i + 1, end);
      i = end + 1;
    } else return null; // bare text: not one quoted word
  }
  return out;
}

const PATHS = [
  'C:\\Users\\emir\\notes.txt',
  'C:\\Users\\emir\\My Documents\\a file.txt',
  'C:\\tmp\\x$(ni PWNED.txt)',                    // the subexpression a double-quoted path would run
  'C:\\tmp\\report$(iex(gc p.txt)).txt',
  'C:\\tmp\\a`b',                                 // PowerShell's own escape character
  "C:\\tmp\\it's here",                           // the ASCII quote
  'C:\\tmp\\a\u2019; ni SMART.txt; \u2019b',      // ’ closes a single-quoted string too
  'C:\\tmp\\a\u2018b\u201Ac\u201Bd',              // ‘ ‚ ‛
  'C:\\tmp\\one & two; three',
  'C:\\tmp\\%PATH% $env:PATH',
  'C:\\tmp\\{a}[b](c)!d+e,f=g^h@i#j',
  'C:\\tmp\\Çalışma\\dosya.txt',
  'C:\\tmp\\"quoted"',
  "C:\\tmp\\''",
  '/home/emir/My Files/a$(touch pwned).txt',
];

let n = 0;
for (const p of PATHS) {
  for (const win of [true, false]) {
    const read = win ? psRead : shRead;
    const label = `${win ? 'pwsh' : 'sh'} ${JSON.stringify(p)}`;
    // quoteFor: always one quoted word, read back as the word itself.
    assert.strictEqual(read(quoteFor(p, win)), p, `quoteFor ${label} -> ${quoteFor(p, win)}`);
    // quotePath: either the path as it is (nothing in it to read) or the same safe word.
    const q = quotePath(p, win);
    if (q !== p) assert.strictEqual(read(q), p, `quotePath ${label} -> ${q}`);
    else assert.match(p, /^[A-Za-z0-9_.:\\/-]+$/, `quotePath left ${label} bare`);
    n += 2;
  }
}
// A plain path stays as it is, so what is typed next reads as it did before.
assert.strictEqual(quotePath('C:\\Users\\emir\\notes.txt', true), 'C:\\Users\\emir\\notes.txt');
// A path with a space is quoted, not left bare.
assert.notStrictEqual(quotePath('C:\\a b', true), 'C:\\a b');
// The old double-quote way is what this guards against: it would hand PowerShell a subexpression to run.
assert.ok(!quotePath('C:\\tmp\\x$(ni PWNED.txt)', true).includes('"'));

// The terminal page loads the same file as a plain script (no require there): it must put the functions on `window`,
// and terminal.html must still ask for it.
const fs = require('node:fs');
const vm = require('node:vm');
const file = path.join(__dirname, '..', 'src', 'shellquote.js');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
assert.strictEqual(typeof sandbox.window.ShellQuote.quotePath, 'function', 'the page branch sets window.ShellQuote');
assert.strictEqual(sandbox.window.ShellQuote.quotePath('C:\\a b\\x$(ni P.txt)', true), quotePath('C:\\a b\\x$(ni P.txt)', true));
const html = fs.readFileSync(path.join(__dirname, '..', 'pages', 'terminal.html'), 'utf8');
assert.ok(html.includes('../src/shellquote.js'), 'terminal.html loads shellquote.js');
assert.ok(fs.existsSync(file), 'the path terminal.html asks for is there');

console.log(`shellquote: ${n + 7} checks passed`);
