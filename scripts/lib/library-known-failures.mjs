const requiredAssets = [
  'assets/building-interiors/delivery-20260722-library-interior-reroll-v1/library-interior-from-credits-dechromed-v4-no-baked-text.png',
  'assets/building-interiors/delivery-20260722-library-interior-no-desk-v1/library-interior-no-desk-v1.png',
  'assets/building-interiors/library-shelf/delivery-20260722-3bay-wall-case-v2-even-spacing/library-wall-case-3bay-v1.png',
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
  if (!['#65d1e3','#9cb9ed'].every(token => jeevesText.includes(token))) {
    errors.push('locked Episode 01 blue Miss Jeeves gradient is missing');
  }
  if (!shelfGuideText.includes('assets/library/episode-01-pop-comic-bg-v1.png')) {
    errors.push('approved Episode 01 pop-comic catalogue background is missing');
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
  const previewShelfMarkers = [
    'BOOK_PREVIEW_CHOICE_CONTRACT',
    'data-preview-book',
    'class="library-room-unit"',
    'class="shelf-unit"',
    'class="brow brow--'
  ];
  const missingPreviewShelf = previewShelfMarkers.filter(marker => !source.includes(marker));
  if (missingPreviewShelf.length) {
    errors.push(`physical one-click shelf contract is missing: ${missingPreviewShelf.join(', ')}`);
  }
  if (/shelf-book-record|shelf-book-copy|shelf-book-facts|data-book-synopsis/i.test(source)) {
    errors.push('retired inline full-preview shelf treatment remains');
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
