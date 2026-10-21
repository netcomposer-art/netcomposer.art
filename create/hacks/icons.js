// Shared icons for the hack stack. Petrus's own die drawing goes here: swap the DIE string (one line), or set
// DIE to '<img src="/create/hacks/die.svg" alt="" width="32" height="32">' and drop the file next to this one.
(function () {
  'use strict';
  var A = ' aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
  // Petrus's die (2026-10-21, die-icon.png), traced: outlined cube, 1 pip on top, 2 on the left face, 3 on the right.
  // Source: "die" by Hamed Mirhashemi, Noun Project (https://thenounproject.com/browse/icons/term/die/), CC BY 3.0.
  // Credited in the /create/ footer (#foot-die). Traced to SVG for currentColor; keep the credit if the art changes.
  // Same 32 x 32 box as the speaker and the ×.
  var DIE = '<svg viewBox="0 0 32 32" width="32" height="32"' + A + '><path d="M16 5.4 25.2 10.5V21.7L16 26.6 6.8 21.7V10.5Z"/><path d="M6.8 10.5 16 15.6 25.2 10.5M16 15.6V26.6"/><g fill="currentColor" stroke="none"><ellipse cx="16" cy="10" rx="1.6" ry="0.95"/><ellipse cx="9.3" cy="15.4" rx="1.05" ry="1.4" transform="rotate(-25 9.3 15.4)"/><ellipse cx="12.9" cy="21.3" rx="1.05" ry="1.4" transform="rotate(-25 12.9 21.3)"/><ellipse cx="23.1" cy="14.9" rx="1.05" ry="1.4" transform="rotate(25 23.1 14.9)"/><ellipse cx="20.9" cy="18.8" rx="1.05" ry="1.4" transform="rotate(25 20.9 18.8)"/><ellipse cx="18.8" cy="22.6" rx="1.05" ry="1.4" transform="rotate(25 18.8 22.6)"/></g></svg>';
  var UNDO = '<svg viewBox="0 0 32 32" width="28" height="28"' + A + '><path d="M10.5 12.5h9a5.5 5.5 0 0 1 0 11h-6"/><path d="M14 8.5 10 12.5l4 4"/></svg>';
  var REDO = '<svg viewBox="0 0 32 32" width="28" height="28"' + A + '><path d="M21.5 12.5h-9a5.5 5.5 0 0 0 0 11h6"/><path d="M18 8.5l4 4-4 4"/></svg>';
  window.NCIcons = { die: DIE, undo: UNDO, redo: REDO };
})();
