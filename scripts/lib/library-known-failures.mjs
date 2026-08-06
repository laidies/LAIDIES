const requiredAssets = [
  'assets/building-interiors/library-interior-purple-sign-wall-v7-clean-metal-stacks.png',
  'assets/building-interiors/delivery-20260722-library-interior-no-desk-v1/library-interior-no-desk-v1.png',
  'assets/building-interiors/library-shelf/delivery-20260722-3bay-wall-case-v2-even-spacing/library-wall-case-3bay-v1.png',
  'assets/building-interiors/library-shelf/library-wall-case-2bay-two-row-v2.png',
  'assets/building-interiors/library-shelf/delivery-20260722-3-shelf-upright-v1/library-shelf-unit-3-shelf-upright-v1.png',
  'assets/library/episode-01-pop-comic-bg-v1.png'
];

function cssBodies(source, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return [...source.matchAll(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, 'gi'))].map(match => match[1]);
}

export function validateLibraryKnownFailures(source) {
  const errors = [];
  const majorSelectors = ['body', '.library-hero', '.jv', '.shelf-guide'];
  const majorCss = majorSelectors.flatMap(selector => cssBodies(source, selector));
  const majorText = majorCss.join('\n').toLowerCase();
  const jeevesText = cssBodies(source, '.jv').join('\n').toLowerCase();
  const shelfGuideText = cssBodies(source, '.shelf-guide').join('\n').toLowerCase();
  const worldText = cssBodies(source, '.library-world').join('\n').toLowerCase();
  if (!['239,77,156','113,55,214','101,209,227'].every(token => jeevesText.includes(token)) || !jeevesText.includes('assets/library/episode-01-pop-comic-bg-v1.png')) {
    errors.push('pink-purple-blue comic Miss Jeeves background is missing');
  }
  const jeevesSuggestions = [
    ['how do I write a better prompt?', 'prompt-brief', 'ep-02'],
    ["what's a hallucination?", 'hallucination-basics', 'ep-03'],
    ['who built AI?', 'women-built-ai', 'ep-04'],
    ['what is generative AI?', 'generative-ai-basics', 'concept-generative']
  ];
  const chipBlock = source.match(/<div class=["']jv-chips["'][^>]*>([\s\S]*?)<\/div>/i)?.[1] || '';
  if (!/MISS_JEEVES_SUGGESTION_CONTRACT/.test(source)) {
    errors.push('Miss Jeeves bounded suggestion contract marker is missing');
  }
  if (/which AI do I use\?|how does AI work\?/i.test(chipBlock)) {
    errors.push('rejected broad Miss Jeeves suggestion remains visible');
  }
  for (const [question, answerId, sourceId] of jeevesSuggestions) {
    if (!chipBlock.includes(`>${question}</button>`)) {
      errors.push(`required bounded Miss Jeeves suggestion is missing: ${question}`);
    }
    if (!source.includes(`id:'${answerId}'`) || !source.includes(`sourceId:'${sourceId}'`)) {
      errors.push(`Miss Jeeves suggestion lacks its deterministic answer/source route: ${question}`);
    }
  }
  if (!/data-answer-id=/.test(source) || !/data-source-id=/.test(source)) {
    errors.push('Miss Jeeves answer/source evidence attributes are missing');
  }
  if (!shelfGuideText.includes('assets/library/episode-01-pop-comic-bg-v1.png')) {
    errors.push('approved Episode 01 pop-comic catalogue background is missing');
  }
  if (!/id=["']library-title["']>The LIBR<span class=["']ai["']>Ai<\/span>RY<\/h1>/i.test(source) || /The Town LIBR/i.test(source)) {
    errors.push('locked Library title is missing or the retired Town title remains');
  }
  if (!/class=["']shelf-guide-heading["']/.test(source) || !/class=["']shelf-captions["']/.test(source) || !/class=\\?['"]shelf-caption-art/.test(source) || !/section\.books\.filter\(book=>book\.listed!==false&&book\.img\)\.slice\(0,3\)/.test(source)) {
    errors.push('three-part comic collection guide is missing');
  }
  if (!/data-shelf-jump/.test(source) || !/href=\\?["']#library-shelf-\$\{sectionIndex\}/.test(source) || !/id=\\?["']library-shelf-\$\{sectionIndex\}/.test(source)) {
    errors.push('collection guides do not link to their exact physical shelves');
  }
  if (!['#f2c6e5','#c7d7f5'].every(token => worldText.includes(token))) {
    errors.push('locked Episode 01 light Library world gradient is missing');
  }
  if (cssBodies(source, '.shelf-guide').some(body => /background\s*:\s*(?:#fff(?:fff)?|white)\b/i.test(body))) {
    errors.push('shelf guide is a flat white major surface');
  }
  if (/\blibrary-handback\b/i.test(source)) {
    errors.push('rejected generic library-handback slab remains');
  }
  if (/\bbk-status\b/i.test(source)) {
    errors.push('rejected shelf status slab remains');
  }
  if (/\bshelf-pages\b|changeShelfPage\s*\(|Page\s+\d+\s+of\s+\d+/i.test(source)) {
    errors.push('shelf pagination surface or implementation remains');
  }
  if (/compactShelfLayout\s*\?\s*['"]\.department['"]\s*:\s*['"]\.library-room-unit['"]/i.test(source)) {
    errors.push('desktop preview is still allowed to detach from the selected physical collection');
  }
  if (!/BOOK_VISIBLE_SIZE_CONTRACT/.test(source) || !/data-visible-scale/.test(source)) {
    errors.push('visible-alpha book normalization contract is missing');
  }
  if (!/LIBRARY_CASE_ANCHOR_CONTRACT/.test(source)) {
    errors.push('wall/case anchor contract is missing');
  }
  if (!/LIBRARY_WALL_CROP_CONTRACT/.test(source) || !/background-size\s*:\s*cover\s*,\s*152%\s+auto/i.test(source)) {
    errors.push('collection room is not cropped into the central wall');
  }
  if (![0,1,2].every(index => new RegExp(`data-collection-room=["']${index}["'][^}]*--room-tint`, 'i').test(source))) {
    errors.push('distinct collection wall colours are missing');
  }
  if (!/LIBRARY_SHELF_DEPTH_CONTRACT/.test(source) || !/\.shelf-unit::after\s*\{[^}]*z-index\s*:\s*5[^}]*library-wall-case-3bay-v1\.png/is.test(source) || !/data-book-count/i.test(source)) {
    errors.push('foreground metal frame / shelf depth contract is missing');
  }
  if (!/shelf-unit\.is-compact[^}]*library-wall-case-2bay-two-row-v2\.png/is.test(source) || !/is-compact-room/.test(source) || !/visible\.length\s*>\s*0\s*&&\s*visible\.length\s*<=\s*4/.test(source)) {
    errors.push('four-book collections do not use the compact two-bay case');
  }
  if (!/\.shelf-unit:not\(\.is-compact\)[^}]*bottom\s*:\s*-5%/is.test(source) || !/\.shelf-unit\.is-compact[^}]*bottom\s*:\s*0(?:[;}])/.test(source) || !/\.shelf-unit\.is-compact \.brow--1\{bottom:49\.4%\}\.shelf-unit\.is-compact \.brow--2\{bottom:13\.7%\}/.test(source) || !/\.bk img\{[^}]*translateY\(2\.5%\)/.test(source)) {
    errors.push('visible shelf/rail seating geometry is missing');
  }
  const previewShelfMarkers = [
    'BOOK_PREVIEW_CHOICE_CONTRACT',
    'data-preview-book',
    'class="library-room-unit',
    'class="shelf-unit',
    'class="brow brow--'
  ];
  const missingPreviewShelf = previewShelfMarkers.filter(marker => !source.includes(marker));
  if (missingPreviewShelf.length) {
    errors.push(`physical one-click shelf contract is missing: ${missingPreviewShelf.join(', ')}`);
  }
  if (/shelf-book-record|shelf-book-copy|shelf-book-facts|data-book-synopsis/i.test(source)) {
    errors.push('retired inline full-preview shelf treatment remains');
  }
  if (/class=["'][^"']*\bshelf-instruction\b/i.test(source)) {
    errors.push('rejected catalogue instruction paragraph remains visible');
  }
  if (/Choose one cover to preview one book|Held books explain the hold/i.test(source)) {
    errors.push('rejected catalogue instruction or held-book warning copy remains');
  }
  if (!/CATALOGUE_ROUNDED_GRAMMAR_CONTRACT/.test(source) || !/\.shelf-guide \.eyebrow\s*\{[^}]*border-radius\s*:\s*999px/is.test(source) || !/\.shelf-caption\s*\{[^}]*border-radius\s*:\s*24px/is.test(source) || !/\.catalogue-controls\s*\{[^}]*border-radius\s*:\s*24px/is.test(source)) {
    errors.push('rounded catalogue grammar or highlighted eyebrow is missing');
  }
  if (!/\.catalogue-closet\s*\{[^}]*justify-content\s*:\s*center[^}]*min-height\s*:\s*76px/is.test(source) || !/\.catalogue-closet strong\s*\{[^}]*display\s*:\s*block/is.test(source)) {
    errors.push('Closet copy is not vertically aligned inside its control');
  }
  if (!/CATALOGUE_QUIET_DEFAULT_CONTRACT/.test(source) || !/!catalogueHasActiveFilter\s*\?\s*['"]['"]/i.test(source)) {
    errors.push('quiet default catalogue result contract is missing');
  }
  if (!/id=["']library-status["'][^>]*>\s*<\/p>/i.test(source) || !/class=["'][^"']*\blibrary-status\b[^"']*\bsr-only\b/i.test(source)) {
    errors.push('catalogue live status is not initially empty and screen-reader-only');
  }
  const previewChoiceMarkers = [
    'id="book-preview-back"',
    'Back to the shelf',
    'Open this book',
    "resetBookPreview(true)",
    "returnTarget.focus({preventScroll:true})"
  ];
  const missingPreviewChoice = previewChoiceMarkers.filter(marker => !source.includes(marker));
  if (missingPreviewChoice.length) {
    errors.push(`one-click preview choice contract is missing: ${missingPreviewChoice.join(', ')}`);
  }
  for (const asset of requiredAssets) {
    if (!source.includes(asset)) errors.push(`required admitted Library asset is missing: ${asset}`);
  }
  return errors;
}
