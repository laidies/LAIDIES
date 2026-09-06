#!/usr/bin/env node
// Derived reference views. Approval stays in the existing manifest/asset registry.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { compileActiveAssetRegistry, assertActiveAsset } from './lib/active-asset-admission.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = 'operations/reference';
const manifestPath = `${outputDir}/episode-approved/manifest.json`;
const registryPath = 'operations/assets/active-asset-registry.json';
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const relative = p => path.posix.relative(outputDir, p);
const link = (p, label) => `[${label}](${relative(p)})`;
const thumb = (p, name) => `<a href="${relative(p)}"><img src="${relative(p)}" width="180" alt="${escape(name)}"></a>`;
const sourceLink = e => link(e.authority, 'Approval source');

export function verifyReference(e, manifest, registry, base = root) {
  if (!e.path || path.posix.isAbsolute(e.path) || e.path.includes('\\') || path.posix.normalize(e.path).startsWith('../')) throw Error(`Unsafe reference path: ${e.id}`);
  if (!/^[a-f0-9]{64}$/.test(e.sha256 || '')) throw Error(`Missing exact hash: ${e.id}`);
  if (manifest.rejected_references.some(r => r.path === e.path || r.sha256 === e.sha256)) throw Error(`Rejected reference: ${e.id}`);
  if (registry.blocked.has(e.path)) throw Error(`Revoked reference: ${e.id}`);
  if (!['LOCKED','IDENTITY_REFERENCE_ONLY','APPROVED_IDENTITY_REFERENCE','APPROVED_STYLE_REFERENCE','APPROVED_PAGE_PLACEMENT_NOT_RELEASED','GOVERNING_README'].includes(e.approval)) throw Error(`Unapproved reference: ${e.id}`);
  if (e.approval==='GOVERNING_README' && !['category_grammar','wardrobe_grammar'].includes(e.role)) throw Error(`Wrong grammar role: ${e.id}`);
  if (sha(fs.readFileSync(path.join(base,e.path))) !== e.sha256) throw Error(`Reference checksum mismatch: ${e.id}`);
  if (!e.authority || !fs.existsSync(path.join(base,e.authority.split('#')[0]))) throw Error(`Missing approval source: ${e.id}`);
  if (sha(fs.readFileSync(path.join(base,e.authority.split('#')[0]))) !== e.authority_sha256) throw Error(`Approval source changed: ${e.id}; reconcile the decision before selecting this reference`);
  return e;
}

function header(title, summary) {
  return `# ${title}\n\n${summary}\n\n[Back to the reference collection](README.md)\n\n<!-- Generated from existing authority by scripts/build-current-reference-index.mjs. Do not edit this view; update the source and regenerate. -->\n\n`;
}
function referenceRow(e) {
  return `| **${e.display_name}**<br>${thumb(e.path,e.display_name)} | ${e.scope}<br>Destination: ${(e.allowed_destinations || []).join(', ')} | ${sourceLink(e)}<br>Reference ID: \`${e.id}\` |`;
}
function table() { return '| Reference | What it is for | Authority |\n|---|---|---|\n'; }
function registryBlock(registryJson, compiled, role, title) {
  const e = registryJson.entries.find(e=>e.role===role);
  if (!e || e.status !== 'ACTIVE' || compiled.blocked.has(e.path)) return `### ${title}\n\nNO CURRENT APPROVED SOURCE in the selected reuse role. Do not choose an older file.\n\n`;
  assertActiveAsset({relativePath:e.path,absolutePath:path.join(root,e.path),registry:compiled});
  return `### ${title}\n\n${thumb(e.path,title)}\n\n${e.admitted_scope || e.authority}\n\n${link(e.path,'Open original')} · ${link(registryPath,'Exact reuse approval')} · Role \`${role}\`\n\n`;
}

export function buildViews() {
  const manifest = JSON.parse(fs.readFileSync(path.join(root,manifestPath)));
  if (manifest.schema !== 'laidies.episode-approved-reference-manifest.v1') throw Error('Unexpected reference manifest');
  const registryJson = JSON.parse(fs.readFileSync(path.join(root,registryPath)));
  const registry = compileActiveAssetRegistry(registryJson);
  const selected = manifest.references.filter(e=>e.collection_kind);
  const displayedGrammar = manifest.references.filter(e=>['category_grammar','wardrobe_grammar'].includes(e.role));
  for (const e of [...selected,...displayedGrammar]) verifyReference(e,manifest,registry);
  const map = registryJson.entries.find(e=>e.role==='town.canonical-map');
  if (!map) throw Error('Missing canonical map role');
  assertActiveAsset({relativePath:map.path,absolutePath:path.join(root,map.path),registry});
  const outputs = new Map();
  let characters = header('Current character references', 'Use these exact references to preserve identity. An identity reference helps make matching artwork; it is not automatic permission to paste those pixels into a page. The episode references below do not select a new sitewide rendering style.');
  characters += table()+selected.filter(e=>e.collection_kind==='character').map(referenceRow).join('\n')+'\n\n';
  characters += '## Existing images with separate reuse approval\n\nThese are the two narrowly approved Resident Card avatars; they do not replace the identity/style references above.\n\n';
  characters += registryBlock(registryJson,registry,'town-character.mme-claio.avatar','Mme CLAi-O — Resident Card avatar');
  characters += registryBlock(registryJson,registry,'town-character.fairy-godmother.avatar','FAiRY Godmother — Resident Card avatar');
  characters += '## Characters outside this small keeper set\n\nHistorical women and Patron Saints require their own exact likeness and destination approval. This collection does not invent a current portrait for an unlisted person. Consult the current owner rather than browsing old renders.\n';
  outputs.set('current-characters.md',characters);

  let buildings = header('Current building and place references', 'This is a small selection of exact room/place sources and their allowed uses, not a library of interchangeable building pictures. Exterior identity, interior design and page placement are separate. Where approval binds an exact page checksum, a changed page needs a fresh placement check.');
  buildings += table()+selected.filter(e=>e.collection_kind==='building').map(referenceRow).join('\n')+'\n\n';
  buildings += '## Existing scoped sources\n\nThe approval text below is read directly from the receiving asset registry. These images do not become general references for other rooms, characters, episodes or new artwork merely by appearing here. The cyan Library room is the later selected room base; use the current Miss Jeeves identity separately when making a masthead candidate.\n\n';
  for (const [role,title] of [
    ['library.arrival.reference-desk.owner-corrected-blue','LIBRAiRY — cyan room base'],
    ['newsstand.arrival.paige-source-check','NewsStand — Paige source-checking crop'],
    ['ksvl.arrival.booth','KSVL 99.9 — studio'],
    ['mme-claio.reading-room','Mme CLAi-O — reading room'],
    ['homepage.activity.dream-phone-booth','Dream Phone — Homepage booth image'],
    ['closet.arrival-room','Closet — Resident Card room'],
    ['homepage.masthead.background','MAiN Street — Homepage masthead']
  ]) buildings+=registryBlock(registryJson,registry,role,title);
  buildings += '## Where no general current building reference is selected\n\n| Place | Current boundary / next source |\n|---|---|\n| Blend & Snap | NO CURRENT APPROVED SOURCE for its replacement storefront. The cottage-core family is rejected; do not restore it. |\n| MAiKEOVER | The later room-colour decision rejects mauve cabinetry. The older salon ACTIVE entry alone does not establish a current matching room; resolve the exact room with its owner. Card finishes have separate colour freedom. |\n| Visitor’s Centre, Town Hall, Post Office, Chick Flicks, BRONZE AiGE, The Mall, SUNNYVAiLE High, FAiRY Godmother’s house, Delta LAi Nu | No general building-identity source has been verified into this small collection. This is an approval/reconciliation gap, not a claim that no artwork exists. Do not infer a building reference from an old hero folder, district crop or map. Use the current product owner’s exact decision. |\n\nThe exact '+link('assets/final_map/sunnyvaile-town-map-final-v5.webp','town map')+' governs geography, not a replacement rendering style or automatic approval of each pictured building.\n';
  outputs.set('current-buildings.md',buildings);

  let styles=header('Art styles by purpose','Select the visual job first. Rendering, character identity, lettering, composition and colour references answer different questions. The provisional whole-site style discussion does not override a specific current approval.');
  styles += table()+selected.filter(e=>e.collection_kind==='style' || e.id==='PEOPLE_STYLE_MASTER').map(referenceRow).join('\n')+'\n\n';
  styles += '| Job | Existing curated reference set | Boundary |\n|---|---|---|\n| Trading cards | [Card examples](trading-cards/README.md) | Ben-Day halftone and card composition; do not substitute these faces for a named character. |\n| Comic pages and panels | [Page](comic-book-page-style/README.md), [strip](comic-strip-layout/README.md), [storytelling](comic-storytelling/README.md) | Composition and printed surfaces; the people master still governs episode faces. |\n| Lettering | [Text emphasis](comic-text-emphasis/README.md), [font examples](font-and-text-emphasis/README.md) | Lettering treatment; functional text stays editable and deterministic. |\n| Collage and graphic backgrounds | [Cover collage](comic-cover-collage/README.md), [ident backgrounds](comic-ident-background/README.md) | Composition and graphic energy; no automatic character or place authority. |\n| Episode environments | [Scene references](episode-style-popart/README.md) | Depth/composition only; no approved current town daytime palette or Welcome sign is supplied by these examples. |\n| Supplemental rendering and wardrobe | [Style-only references](style-only-refs/README.md), [wardrobe](heroine-wardrobe/README.md) | Supplemental references only; never replace the exact identity, people master or episode outfit. |\n\nFor room/page artwork use [the current place and its limits](current-buildings.md). Full episode people rules: '+link('operations/episode-visual-system-lock.md','episode visual lock')+'.\n';
  outputs.set('current-art-styles.md',styles);

  const bar=fs.readFileSync(path.join(root,'operations/page-design-bar.md'),'utf8');
  const accentLine=bar.split('\n').find(line=>line.startsWith('| electric accents |'));
  const hexes=[...accentLine.matchAll(/#[0-9a-fA-F]{6}/g)].map(m=>m[0]);
  if (hexes.length!==5) throw Error('Page colour source changed: reconcile swatch labels');
  const names=['Hot pink','Electric teal','Saturated purple','Periwinkle','Coral'];
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="180" viewBox="0 0 900 180" role="img" aria-label="Scoped page UI accent swatches">${hexes.map((hex,i)=>`<rect x="${i*180}" width="180" height="110" fill="${hex}"/><text x="${i*180+12}" y="138" font-family="sans-serif" font-size="15" fill="#111">${names[i]}</text><text x="${i*180+12}" y="162" font-family="monospace" font-size="16" fill="#111">${hex}</text>`).join('')}</svg>\n`;
  outputs.set('current-colour-swatches.svg',svg);
  let colours=header('Colours and where they apply','These are scoped colour references, not one mandatory palette for every building or image. Match the current destination’s approved environment and decisions.');
  colours += '![Page UI accent swatches](current-colour-swatches.svg)\n\n| Page UI accent | Exact code |\n|---|---|\n'+hexes.map((h,i)=>`| ${names[i]} | \`${h}\` |`).join('\n')+'\n\nSource: '+link('operations/page-design-bar.md','current page design bar')+'. Near-black navy is the shared ink direction; this source does not specify one universal navy hex. Do not invent one here.\n\n- **Buildings:** the approved environment supplies dominant colour, lighting and material; check [current building references](current-buildings.md).\n- **Resident Card:** pink/lilac are permitted bounded finishes; they do not permit dusty mauve cabinetry or a plum room. '+link('operations/resident-card-design-decisions.md','Exact Card/MAiKEOVER colour decision')+'.\n- **LUMINAiRY:** the approved plant-free hero binds ink navy, raspberry, violet, cyan and teal visually; preserve its actual artwork rather than imposing the old shared burgundy.\n- **Background inspiration:** source palettes are inspiration, not automatic locked colours. Adapt to the destination when making new artwork.\n- **Retired page UI:** gold `#c9a227`, plum `#4b2148`, white/plum themes and pastel candy bands are not the current page system. A permitted card finish or stained-glass object is a different scope.\n\nThe '+link('operations/site-visual-system-lock-2026-07-23.md','older provisional site direction')+' remains subordinate to later destination decisions. Its existence does not settle the sitewide art-family question.\n';
  outputs.set('current-colours.md',colours);
  return outputs;
}

if (process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const write=process.argv.includes('--write');
  if (process.argv.slice(2).some(a=>!['--write','--check'].includes(a))) throw Error('Use --check (default) or --write');
  let stale=[];
  for (const [name,content] of buildViews()) {
    const target=path.join(root,outputDir,name);
    if (write) fs.writeFileSync(target,content);
    else if (!fs.existsSync(target) || fs.readFileSync(target,'utf8')!==content) stale.push(name);
  }
  if (stale.length) throw Error(`Reference views are stale: ${stale.join(', ')}. Reconcile authority, then run with --write.`);
  console.log(`Current reference views ${write?'written':'verified'}; selected exact bytes, revocations and source-derived views checked. This is not art approval or public deployment proof.`);
}
