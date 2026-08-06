const requiredAssets = [
  'assets/building-interiors/delivery-20260722-library-interior-reroll-v1/library-interior-from-credits-dechromed-v4-no-baked-text.png',
  'assets/building-interiors/library-shelf/room/wall-neutral-light-v1.png',
  'assets/building-interiors/library-shelf/room/floor-geometric-v1.png',
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
  if (source.includes('library-interior-purple-sign-wall-v5.png')) {
    errors.push('rejected lumpy Miss Jeeves v5 masthead remains');
  }
  if (source.includes('library-interior-purple-sign-wall-v7-clean-metal-stacks.png')) {
    errors.push('rejected mottled Miss Jeeves v7 masthead remains');
  }
  if (source.includes('library-interior-style-b-hand-inked-animation.png')) {
    errors.push('rejected replacement hand-inked masthead remains');
  }
  if (source.includes('library-interior-purple-sign-wall-v8-clean-jeeves.png')) {
    errors.push('rejected over-rendered floppy-sign masthead remains');
  }
  if (/arrival-prop|arrival-printer-sign|library-printer-sign-v1\.png/.test(source)) {
    errors.push('rejected sticker-like masthead overlay remains');
  }
  if (/arrival-scanner|library-flatbed-scanner-v1\.png/.test(source)) {
    errors.push('rejected floating scanner overlay remains');
  }
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
  if (!/Not sure where to start\? Ask Miss Jeeves\. Looking for a specific topic\? Browse the shelves\./.test(source)) {
    errors.push('plain-language ask-or-browse orientation is missing');
  }
  if (!/<p class=["']visitor-state["'] id=["']puffyVisitorState["'][^>]*\shidden(?:\s|>)/i.test(source)) {
    errors.push('generic Resident Card setup copy can still appear in the Library masthead');
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
  if (!/\/\*\s*BOOK_VISIBLE_SIZE_CONTRACT\b/.test(source) || !/data-visible-scale/.test(source)) {
    errors.push('visible-alpha book normalization contract is missing');
  }
  const mobileRules = source;
  const normalMobileRowIsReadable = /(?:^|})\s*\.brow\{[^}]*min-height\s*:\s*120px/i.test(mobileRules);
  const compactMobileRowIsReadable = /\.shelf-unit\.is-compact\s+\.brow\{[^}]*min-height\s*:\s*120px/i.test(mobileRules);
  if (!/MOBILE_BOOK_VISIBLE_SIZE_CONTRACT/.test(source) || !normalMobileRowIsReadable || !compactMobileRowIsReadable) {
    errors.push('mobile shelf rows do not preserve a 120px visible-book dimension');
  }
  if (!/LIBRARY_CASE_ANCHOR_CONTRACT/.test(source)) {
    errors.push('wall/case anchor contract is missing');
  }
  if (!/LIBRARY_WALL_CROP_CONTRACT/.test(source) || !/wall-neutral-light-v1\.png/.test(source)) {
    errors.push('collection room wall layer is missing');
  }
  if (!/floor-geometric-v1\.png/.test(source) || !/background-size\s*:\s*100%\s+100%\s*,\s*100%\s+100%\s*,\s*auto\s+6%/i.test(source) || !/background-repeat\s*:\s*no-repeat\s*,\s*no-repeat\s*,\s*repeat-x/i.test(source)) {
    errors.push('correct geometric Library carpet is missing or rises behind the shelves');
  }
  if (/floor-clean-v1\.png/.test(source)) {
    errors.push('retired dark-arrow carpet remains in a Library room rule');
  }
  if (!/@media\(max-width:700px\)[\s\S]*?background-size\s*:\s*100%\s+100%\s*,\s*100%\s+100%\s*,\s*auto\s+6%/is.test(source)) {
    errors.push('mobile carpet rises behind the lower shelf row');
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
  if (!/\.shelf-unit:not\(\.is-compact\)[^}]*bottom\s*:\s*-5%/is.test(source) || !/\.shelf-unit\.is-compact[^}]*bottom\s*:\s*0(?:[;}])/.test(source) || !/\.brow--1\{bottom:65\.3%\}\.brow--2\{bottom:38\.7%\}\.brow--3\{bottom:12\.2%\}/.test(source) || !/\.shelf-unit\.is-compact \.brow--1\{bottom:51\.2%\}\.shelf-unit\.is-compact \.brow--2\{bottom:13\.7%\}/.test(source) || !/\.bk img\{[^}]*translateY\(-3%\)/.test(source)) {
    errors.push('visible shelf/rail seating geometry is missing');
  }
  if (!/\.mobile-shelf-caption\{display:none\}/.test(source) || !/@media\(max-width:700px\)[\s\S]*?\.department\{z-index:6\}[\s\S]*?\.brow\{[^}]*height:27%[^}]*z-index:6[^}]*\}\.brow--1\{bottom:65\.5%\}\.brow--2\{bottom:37%\}\.brow--3\{bottom:8\.5%\}[\s\S]*?\.shelf-unit\.is-compact \.brow\{[^}]*height:35%[^}]*\}\.shelf-unit\.is-compact \.brow--1\{bottom:65%\}\.shelf-unit\.is-compact \.brow--2\{bottom:5%\}[\s\S]*?\.bk img\{transform:translateY\(-4%\)\}/.test(source)) {
    errors.push('mobile shelf books remain behind the rails or stray copy overlaps the case');
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
  if (!/class=["'][^"']*catalogue-closet[^"']*["'][^>]*\shidden(?:\s|>)/i.test(source) || !/\.catalogue-closet\[hidden\]\s*\{[^}]*display\s*:\s*none/is.test(source) || !/closet\.hidden\s*=\s*!count/.test(source) || /No Library places are saved on this device yet\./.test(source)) {
    errors.push('empty My Closet control remains visible in the catalogue');
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
