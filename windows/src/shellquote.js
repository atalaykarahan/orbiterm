'use strict';
// One quoting function for every path and argument the app puts on a shell's line: the main process requires it
// (terminals.js, and through it claudeaccounts.js's account prefix), the terminal page loads it as a plain script
// (window.ShellQuote). The terminals run PowerShell on Windows (shellFor) and the login shell elsewhere, so a word is
// quoted the way that shell reads it.

// Every character PowerShell takes as a single quote, not only the ASCII one: a word holding ’ ‘ ‚ or ‛ would otherwise
// close the string we built and let the rest of it run as code. Doubled, each one is a character of the word again.
const PS_QUOTE = /['\u2018\u2019\u201A\u201B]/g;
const psQuote = (s) => `'${String(s).replace(PS_QUOTE, (c) => c + c)}'`;
const shQuote = (s) => `'${String(s).replace(/'/g, "'\\''")}'`;

/** `s` as one word for the shell the terminals run: nothing in it can be read as code. */
const quoteFor = (s, win) => (win ? psQuote(s) : shQuote(s));

/** Letters, digits and the parts of a path, and nothing either shell reads: such a word can stay as it is. */
const BARE = /^[A-Za-z0-9_.:\\/-]+$/;

/** A file path for a shell's line: as it is when nothing in it can be read as code, else quoted. */
const quotePath = (s, win) => (BARE.test(String(s)) ? String(s) : quoteFor(s, win));

if (typeof module === 'object' && module.exports) module.exports = { quoteFor, quotePath };
else if (typeof window === 'object') window.ShellQuote = { quoteFor, quotePath };
