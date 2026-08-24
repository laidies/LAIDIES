function actionIconBlock(source) {
  const start = source.indexOf('function makeBtn(');
  const end = source.indexOf('var cssDone', start);
  return start >= 0 && end > start ? source.slice(start, end) : '';
}

export function validateLibraryPagePresentation(librarySource, puffySource) {
  const errors = [];
  if (/--yellow\s*:|var\(--yellow\)/i.test(librarySource)) {
    errors.push('yellow remains in the visitor-facing Library palette');
  }

  const semanticRoles = ['objective', 'question', 'practice', 'insight', 'note', 'key', 'big-picture', 'landmark'];
  if (!semanticRoles.every(role => librarySource.includes(`callout-${role}`))) {
    errors.push('semantic teaching callout roles are incomplete');
  }
  const panelFills = [...librarySource.matchAll(/--panel-bg\s*:\s*(#[a-f0-9]{6})/gi)].map(match => match[1].toLowerCase());
  if (new Set(panelFills).size < 5) {
    errors.push('teaching callouts have collapsed into too few colour families');
  }
  if (!/\.book \.txt \.callout>b:first-child\{[^}]*color:#101842/is.test(librarySource)) {
    errors.push('light semantic callout labels do not use readable dark ink');
  }

  const saveIcon = '60-teal-floppy-disk.png';
  const actionBlock = actionIconBlock(puffySource);
  if (!actionBlock.includes(saveIcon) || actionBlock.includes('75-pink-teal-magic-wand.png')) {
    errors.push('the shared Puffy save action does not use the floppy-disk icon exclusively');
  }
  if (!actionBlock.includes("kind === 'entry' ? 'Section'") || !actionBlock.includes("'Save ' + scopeLabel")) {
    errors.push('the shared Puffy action does not use Save Book, Save Chapter or Save Section scope language');
  }
  if (!librarySource.includes(saveIcon) || !/data-reader-save=["']book["'][^>]*>[\s\S]*?Save Book<\/span>/i.test(librarySource)) {
    errors.push('the reader is missing its compact Save Book floppy control');
  }
  if (!/scope:'chapter'/.test(librarySource) || !/scope:'section'/.test(librarySource)) {
    errors.push('Save Chapter or Save Section scope is missing');
  }
  if (!/\.book \.band #reader-report\{[^}]*min-width:0[^}]*background:transparent/is.test(librarySource)) {
    errors.push('Report an issue is not a small secondary reader action');
  }

  if (!/<header class=["']sv-header["']><\/header>/.test(librarySource)) {
    errors.push('the visible shared town header mount is missing');
  }
  if (!/>Browse the Library<\/div>/.test(librarySource) || />Browse the catalogue<\/div>/i.test(librarySource)) {
    errors.push('visitor-facing browse language does not use the Library shelves metaphor');
  }
  if (!/>Briefing &amp; context<\/button>/.test(librarySource)) {
    errors.push('prompting is not framed within briefing and context');
  }
  return errors;
}
