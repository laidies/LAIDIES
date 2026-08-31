/*!
 * Ai-accent autowrap — walks text nodes, wraps brand-word "Ai" letters in <span class="ai">.
 * Zero HTML edits required; ships accent color site-wide as an idempotent, DOM-safe post-load pass.
 */
(function () {
  // Inject accent CSS rule so it's guaranteed everywhere the wrapper runs.
  // Locked canon: rose accent by default, inherit inside links/buttons/cards.
  var ACCENT_STYLE_ID = 'laidies-ai-accent-style';
  if (!document.getElementById(ACCENT_STYLE_ID)) {
    // Palette lock 2026-07-12: rose is RETIRED. Default Ai accent = pink #e982ab, themeable per
    // page via --ai-accent, and NOT !important so contextual rules (.town .ai, logo spans) can win.
    // text-transform:none stays forced — parents with text-transform:uppercase (eyebrows, buttons,
    // nav) would otherwise uppercase "Ai" into "AI" and defeat the whole thing.
    // Canon: Ai accent colour on BIG BOLD HEADINGS + logo only (Ali, reaffirmed 2026-07-12 —
    // in paragraph text it distracts). Body Ai keeps the lowercase i but inherits colour.
    var css = '.ai{color:inherit;text-transform:none!important;font-variant-caps:normal!important}'
      + 'h1 .ai,h2 .ai,h3 .ai,.logo .ai{color:var(--ai-accent,#e982ab)}'
      + '.ai,.ai-run{display:inline!important}';
    var style = document.createElement('style');
    style.id = ACCENT_STYLE_ID;
    style.appendChild(document.createTextNode(css));
    (document.head || document.documentElement).appendChild(style);
  }

  var BRAND_RE = /(LAiDIES|SUNNYVAiLE|MAiKEOVER|LIBRAiRY|LUMINAiRY|SAiNTS?|MAiVENS?|TRAiLBLAZERS?|FAiRY|MAiYBE|FLAiR|CLAiRE|BRONZE AiGE|SLAiY[A-Za-z]*|CLAi-O|AiM)/g;
  var SKIP_TAGS = { SCRIPT:1, STYLE:1, NOSCRIPT:1, TEXTAREA:1, INPUT:1, SELECT:1, OPTION:1, OPTGROUP:1, CODE:1, PRE:1, SVG:1 };

  function wrap(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.parentNode) return NodeFilter.FILTER_REJECT;
        if (SKIP_TAGS[n.parentNode.nodeName]) return NodeFilter.FILTER_REJECT;
        if (n.parentElement && n.parentElement.closest && n.parentElement.closest('.ai, .ai-run, .brand-word-inline, [data-brand-ai]')) return NodeFilter.FILTER_REJECT;
        return BRAND_RE.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var targets = [];
    var node;
    while ((node = walker.nextNode())) targets.push(node);
    BRAND_RE.lastIndex = 0;

    for (var i = 0; i < targets.length; i++) {
      var t = targets[i];
      var text = t.nodeValue;
      var frag = document.createDocumentFragment();
      var lastIdx = 0;
      BRAND_RE.lastIndex = 0;
      var m;
      while ((m = BRAND_RE.exec(text))) {
        if (m.index > lastIdx) frag.appendChild(document.createTextNode(text.slice(lastIdx, m.index)));
        var word = m[0];
        var aiIdx = word.indexOf('Ai');
        if (aiIdx < 0) { lastIdx = m.index + word.length; continue; }
        frag.appendChild(document.createTextNode(word.slice(0, aiIdx)));
        var span = document.createElement('span');
        span.className = 'ai';
        span.textContent = 'Ai';
        frag.appendChild(span);
        frag.appendChild(document.createTextNode(word.slice(aiIdx + 2)));
        lastIdx = m.index + word.length;
      }
      if (lastIdx < text.length) frag.appendChild(document.createTextNode(text.slice(lastIdx)));
      // Wrap the whole rebuilt run in ONE inline span so flex/grid parents with gap
      // (chips, route stops, buttons) still see a single child - splitting a text node
      // into siblings turns each piece into its own flex item and gaps blow the word apart.
      var holder = document.createElement('span');
      holder.className = 'ai-run';
      holder.appendChild(frag);
      if (t.parentNode) t.parentNode.replaceChild(holder, t);
    }
  }

  function run() { wrap(document.body); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  // Expose for late-injected content (e.g., dynamic cards, quiz reveals)
  window.LAiDIESAccentRewrap = wrap;
})();
