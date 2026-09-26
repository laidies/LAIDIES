(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.NEWSSTAND_CROSSWORD_CONTRACT = api;
}(typeof window !== 'undefined' ? window : this, function () {
  'use strict';
  function validateBank(bank) {
    if (!bank || bank.schemaVersion !== 1 || !Array.isArray(bank.puzzles) || !bank.puzzles.length) throw Error('Missing puzzle archive');
    var ids = new Set(), keys = new Set();
    bank.puzzles.forEach(function (p) {
      if (!p || !/^[a-z0-9-]+$/.test(p.id || '') || ids.has(p.id) || !p.number || !p.storageKey || keys.has(p.storageKey) || !Number.isFinite(Date.parse(p.publishedAt)) || !['published','hold'].includes(p.status)) throw Error('Invalid puzzle identity');
      ids.add(p.id); keys.add(p.storageKey);
      if (!Number.isInteger(p.size) || p.size < 3 || p.size > 25 || !Array.isArray(p.words) || !p.words.length || !p.help) throw Error('Invalid puzzle dimensions');
      var cells = {}, wordIds = new Set(), starts = {}, graph = {};
      p.words.forEach(function (w) {
        if (!w.id || wordIds.has(w.id) || !/^[A-Z]{2,}$/.test(w.answer || '') || !['across','down'].includes(w.dir) || !Number.isInteger(w.row) || !Number.isInteger(w.col) || !Number.isInteger(w.number) || w.number < 1 || !w.clue) throw Error('Invalid crossword word');
        wordIds.add(w.id); graph[w.id] = new Set();
        var help = p.help[w.id];
        if (!help || ['hint','explanation','href','label','learnLabel'].some(function (k) {return typeof help[k] !== 'string' || !help[k].trim();}) || !/^\/(?!\/)/.test(help.href)) throw Error('Missing crossword learning destination');
        var start = w.row+'-'+w.col;
        if (starts[start] && starts[start] !== w.number) throw Error('Inconsistent clue number');
        starts[start] = w.number;
        for (var i=0;i<w.answer.length;i++) {
          var r=w.row+(w.dir==='down'?i:0),c=w.col+(w.dir==='across'?i:0),key=r+'-'+c;
          if(r<0||c<0||r>=p.size||c>=p.size) throw Error('Word outside grid');
          if(cells[key]) {
            if(cells[key].letter!==w.answer[i]||cells[key].dir===w.dir) throw Error('Conflicting crossword intersection');
            graph[w.id].add(cells[key].id);graph[cells[key].id].add(w.id);
          } else cells[key]={letter:w.answer[i],dir:w.dir,id:w.id};
        }
      });
      // Every continuous run must be an intended clue, not an accidental
      // neighbour created while fitting another answer into the grid.
      Object.keys(cells).forEach(function (key) {
        var start=key.split('-').map(Number),r=start[0],c=start[1];
        ['across','down'].forEach(function (dir) {
          var dr=dir==='down'?1:0,dc=dir==='across'?1:0;
          if(cells[(r-dr)+'-'+(c-dc)])return;
          var answer='',i=0;
          while(cells[(r+dr*i)+'-'+(c+dc*i)]){answer+=cells[(r+dr*i)+'-'+(c+dc*i)].letter;i++;}
          if(i>1&&!p.words.some(function(w){return w.row===r&&w.col===c&&w.dir===dir&&w.answer===answer;}))throw Error('Unclued adjacent crossword letters');
        });
      });
      var seen=new Set(), pending=[p.words[0].id];
      while(pending.length){var id=pending.pop();if(seen.has(id))continue;seen.add(id);graph[id].forEach(function(other){pending.push(other);});}
      if(seen.size!==p.words.length)throw Error('Disconnected crossword words');
      var numbered=Object.entries(starts).sort(function(a,b){var aa=a[0].split('-').map(Number),bb=b[0].split('-').map(Number);return aa[0]-bb[0]||aa[1]-bb[1];});
      numbered.forEach(function(x,i){if(x[1]!==i+1)throw Error('Clue numbers must follow reading order');});
    });
    return bank;
  }
  function available(bank, now) {
    validateBank(bank);
    var time=now===undefined?Date.now():Date.parse(now);
    if(!Number.isFinite(time))throw Error('Invalid puzzle selection time');
    return bank.puzzles.filter(function(p){return p.status==='published'&&Date.parse(p.publishedAt)<=time;}).sort(function(a,b){return Date.parse(b.publishedAt)-Date.parse(a.publishedAt)||b.id.localeCompare(a.id);});
  }
  return {validateBank:validateBank, available:available};
}));
