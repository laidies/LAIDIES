/* ============================================================================
 * current-models.js — LAiDIES single source of truth for volatile AI-model facts
 * ----------------------------------------------------------------------------
 * WHY THIS FILE EXISTS: model names / cutoffs / context windows change every few
 * months. Nothing else on the site should hardcode them. Update THIS file (and
 * bump `lastVerified`) and every "Current AI models" callout refreshes at once.
 *
 * TO UPDATE (the whole job):
 *   1. Re-read each maker's authoritative page (links in `sources` below).
 *   2. Edit `flagships` / `cutoffExamples` to match.
 *   3. Set `lastVerified` to today (YYYY-MM-DD). Bump the ?v= on the <script> tag.
 * That's it — Chapter 1, The Decoder, and anywhere else with a
 * <div data-laidies-models></div> anchor all update from here.
 *
 * DESIGN NOTE: we name the current FLAGSHIPS (the thing the lesson needs and the
 * thing that visibly changes) but DEFER exact cutoffs + context-window sizes to
 * the makers' own pages via the source links — fewer hardcoded numbers = fewer
 * things to rot. A couple of cutoff examples stay, only to teach "models have a
 * cutoff." Verify those too when you re-stamp.
 *
 * LOCKED RULE: never teach out-of-date AI. This file is how we keep that promise.
 * ==========================================================================*/
(function () {
  'use strict';

  var MODELS = {
    // Last time a human re-verified every fact below against the source pages.
    // 2026-07-09: full board re-checked on the day OpenAI shipped GPT-5.6
    // (Sol/Terra/Luna). Anthropic Claude Fable 5 + Google Gemini 3.5 Flash unchanged.
    lastVerified: '2026-07-09',

    // Authoritative pages to re-check against. These are the sources of truth.
    sources: {
      Anthropic: 'https://www.anthropic.com/transparency',
      OpenAI: 'https://developers.openai.com/api/docs/models',
      Google: 'https://ai.google.dev/gemini-api/docs/models'
    },

    // One current flagship per lab — what the lesson actually names.
    // `note` is an optional caveat shown in small type after the name.
    flagships: [
      { maker: 'Anthropic', name: 'Claude Fable 5' },
      { maker: 'OpenAI',    name: 'GPT-5.6 Sol', note: 'Terra + Luna = cheaper tiers' },
      { maker: 'Google',    name: 'Gemini 3.5 Flash', note: '3.5 Pro in preview' }
    ],

    // Cutoff examples the concepts chapter uses to teach "every model has a cutoff."
    // Verified 2026-07-09 against anthropic.com/transparency.
    cutoffExamples: [
      { name: 'Claude Opus 4.8', cutoff: 'January 2026' },
      { name: 'Claude Haiku 4.5', cutoff: 'February 2025' }
    ]
  };

  // Expose for any other script that needs the raw data.
  window.LAIDIES_MODELS = MODELS;

  function fmtVerified(iso) {
    var months = ['January','February','March','April','May','June','July',
                  'August','September','October','November','December'];
    var p = iso.split('-');
    return months[parseInt(p[1], 10) - 1] + ' ' + p[0];
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c];
    });
  }

  function render() {
    var srcLinks = Object.keys(MODELS.sources).map(function (maker) {
      return '<a href="' + esc(MODELS.sources[maker]) + '" target="_blank" rel="noopener">' +
             esc(maker) + '</a>';
    }).join(' · ');

    var rows = MODELS.flagships.map(function (m) {
      var note = m.note
        ? '<span class="lm-note">' + esc(m.note) + '</span>'
        : '';
      return '<li class="lm-row">' +
        '<span class="lm-maker">' + esc(m.maker) + '</span>' +
        '<span class="lm-name">' + esc(m.name) + note + '</span>' +
        '</li>';
    }).join('');

    var cutoffs = MODELS.cutoffExamples.map(function (c) {
      return esc(c.name) + ' → ' + esc(c.cutoff);
    }).join('; ');

    return '' +
      '<aside class="laidies-models" role="note" aria-label="Current AI models, verified ' +
        esc(MODELS.lastVerified) + '">' +
        '<div class="lm-head">' +
          '<span class="lm-title">Current AI models</span>' +
          '<span class="lm-stamp" title="Last re-verified ' + esc(MODELS.lastVerified) + '">' +
            '✦ verified ' + esc(fmtVerified(MODELS.lastVerified)) + '</span>' +
        '</div>' +
        '<p class="lm-lede">The frontier moves every few months. Today’s flagship from each lab:</p>' +
        '<ul class="lm-list">' + rows + '</ul>' +
        '<p class="lm-foot">Every model has a knowledge cutoff (e.g. ' + cutoffs + ') and a ' +
          'context-window limit — both change with each release. For the exact figures and full ' +
          'line-ups, go straight to the makers: ' + srcLinks + '.</p>' +
      '</aside>';
  }

  function injectStyles() {
    if (document.getElementById('laidies-models-css')) return;
    var css =
      '.laidies-models{border:1px solid var(--gold,#c9a24a);border-radius:14px;' +
        'background:var(--cream,#fbf3ea);color:var(--plum,#43213c);padding:18px 20px;' +
        'margin:22px 0;font-family:inherit;box-shadow:0 2px 0 rgba(67,33,60,.06);}' +
      '.laidies-models .lm-head{display:flex;align-items:baseline;justify-content:space-between;' +
        'gap:10px;flex-wrap:wrap;border-bottom:1px solid rgba(201,162,74,.4);padding-bottom:8px;margin-bottom:12px;}' +
      '.laidies-models .lm-title{font-weight:800;letter-spacing:.02em;font-size:15px;text-transform:uppercase;}' +
      '.laidies-models .lm-stamp{font-size:12px;color:var(--rose,#b95d78);font-weight:700;white-space:nowrap;}' +
      '.laidies-models .lm-lede{margin:0 0 10px;font-size:14px;opacity:.9;}' +
      '.laidies-models .lm-list{list-style:none;margin:0 0 12px;padding:0;display:grid;gap:7px;}' +
      '.laidies-models .lm-row{display:grid;grid-template-columns:minmax(84px,auto) 1fr;' +
        'align-items:baseline;gap:14px;font-size:14px;}' +
      '.laidies-models .lm-maker{color:var(--rose,#b95d78);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.03em;}' +
      '.laidies-models .lm-name{font-weight:800;}' +
      '.laidies-models .lm-note{font-weight:600;font-size:12px;opacity:.6;margin-left:8px;}' +
      '.laidies-models .lm-foot{margin:0;font-size:12.5px;opacity:.8;line-height:1.5;}' +
      '.laidies-models .lm-foot a{color:var(--rose,#b95d78);font-weight:700;text-decoration:none;}' +
      '.laidies-models .lm-foot a:hover{text-decoration:underline;}' +
      '@media(max-width:520px){.laidies-models .lm-row{grid-template-columns:1fr;gap:1px;}' +
        '.laidies-models .lm-note{display:block;margin-left:0;}}';
    var el = document.createElement('style');
    el.id = 'laidies-models-css';
    el.textContent = css;
    document.head.appendChild(el);
  }

  function mount() {
    var anchors = document.querySelectorAll('[data-laidies-models]');
    if (!anchors.length) return;
    injectStyles();
    var html = render();
    anchors.forEach(function (a) { a.innerHTML = html; });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
