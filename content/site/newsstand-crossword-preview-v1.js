/* Keep the newspaper preview and solve link on the same admitted puzzle. */
(function () {
  'use strict';
  var root = document.querySelector('.ns-play-desk__puzzle');
  if (!root || !window.NEWSSTAND_CROSSWORD_CONTRACT || !window.NEWSSTAND_CROSSWORDS) return;
  var puzzles;
  try { puzzles = window.NEWSSTAND_CROSSWORD_CONTRACT.available(window.NEWSSTAND_CROSSWORDS); }
  catch (_) { return; }
  if (!puzzles.length) return;
  var puzzle = puzzles[0], ns = 'http://www.w3.org/2000/svg', cells = new Map(), starts = new Map();
  puzzle.words.forEach(function (word) {
    starts.set(word.row + ',' + word.col, word.number);
    for (var i = 0; i < word.answer.length; i++) cells.set((word.row + (word.dir === 'down' ? i : 0)) + ',' + (word.col + (word.dir === 'across' ? i : 0)), true);
  });
  var svg = document.createElementNS(ns, 'svg'), size = puzzle.size * 24 + 32;
  svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
  svg.setAttribute('width', '420'); svg.setAttribute('height', '420');
  svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'Puzzle ' + puzzle.number + ': the actual blank crossword grid, with numbered starting squares.');
  cells.forEach(function (_, key) {
    var position = key.split(',').map(Number), x = 16 + position[1] * 24, y = 16 + position[0] * 24;
    var square = document.createElementNS(ns, 'rect');
    square.setAttribute('x', x); square.setAttribute('y', y); square.setAttribute('width', '24'); square.setAttribute('height', '24');
    square.setAttribute('fill', '#fff'); square.setAttribute('stroke', '#10183b'); square.setAttribute('stroke-width', '1'); svg.appendChild(square);
    if (starts.has(key)) {
      var number = document.createElementNS(ns, 'text'); number.setAttribute('x', x + 3); number.setAttribute('y', y + 8);
      number.setAttribute('font-family', 'Jost, sans-serif'); number.setAttribute('font-size', '7'); number.setAttribute('fill', '#10183b'); number.textContent = starts.get(key); svg.appendChild(number);
    }
  });
  var preview = root.querySelector('.ns-crossword-preview'), link = '/newsstand-crossword.html?puzzle=' + encodeURIComponent(puzzle.id);
  preview.replaceChildren(svg); preview.href = link; preview.setAttribute('aria-label', 'Open Puzzle ' + puzzle.number + ' to solve the crossword');
  root.querySelector('.ns-play-action').href = link;
  root.querySelector('.ns-kicker').textContent = 'Pencils out · Puzzle ' + puzzle.number;
})();
