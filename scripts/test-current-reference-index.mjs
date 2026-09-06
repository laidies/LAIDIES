import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { verifyReference, buildViews } from './build-current-reference-index.mjs';
const hash = s=>crypto.createHash('sha256').update(s).digest('hex');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'laidies-reference-test-'));
try {
  fs.writeFileSync(path.join(root,'original.png'),'exact approved reference bytes');
  fs.writeFileSync(path.join(root,'decision.md'),'exact scoped approval');
  const e={id:'TEST_IDENTITY',path:'original.png',sha256:hash('exact approved reference bytes'),approval:'IDENTITY_REFERENCE_ONLY',authority:'decision.md',authority_sha256:hash('exact scoped approval')};
  const manifest={rejected_references:[]}; const registry={blocked:new Set()};
  assert.equal(verifyReference(e,manifest,registry,root),e);
  assert.throws(()=>verifyReference({...e,path:'../original.png'},manifest,registry,root),/Unsafe/);
  assert.throws(()=>verifyReference({...e,approval:'CANDIDATE'},manifest,registry,root),/Unapproved/);
  assert.throws(()=>verifyReference(e,{rejected_references:[{sha256:e.sha256}]},registry,root),/Rejected/);
  assert.throws(()=>verifyReference(e,manifest,{blocked:new Set(['original.png'])},root),/Revoked/);
  fs.writeFileSync(path.join(root,'original.png'),'changed old image');
  assert.throws(()=>verifyReference(e,manifest,registry,root),/checksum mismatch/);
  fs.writeFileSync(path.join(root,'original.png'),'exact approved reference bytes');
  fs.writeFileSync(path.join(root,'decision.md'),'approval superseded by rejection');
  assert.throws(()=>verifyReference(e,manifest,registry,root),/Approval source changed/);
  fs.writeFileSync(path.join(root,'decision.md'),'exact scoped approval');
  assert.equal(verifyReference(e,manifest,registry,root),e);
  const grammarPath = path.resolve('operations/reference/trading-cards/README.md');
  const grammarBytes=fs.readFileSync(grammarPath);
  try {
    fs.writeFileSync(grammarPath,Buffer.concat([grammarBytes,Buffer.from('\nChanged category authority fixture\n')]));
    assert.throws(()=>buildViews(),/Reference checksum mismatch: GRAMMAR_TRADING_CARDS/);
  } finally { fs.writeFileSync(grammarPath,grammarBytes); }
  const views=buildViews();
  assert.equal(views.size,6);
  const characters=views.get('current-characters.md');
  assert(characters.includes('miss-jeeves-geist-identity-selected-pencil-removed.png'));
  assert(characters.includes('matron-lumen-sunnyvaile-identity-pilot-v1.png'));
  assert(!characters.includes('src="../../assets/town-characters/scenes/matron-lumen-scene.png"'));
  assert(!characters.includes('jeeves-scene.webp'));
  assert(views.get('current-buildings.md').includes('library-interior-wide-jeeves-blue-walls-v3.png'));
  assert(!views.get('current-buildings.md').includes('library-interior-from-credits-dechromed-v4-no-baked-text.png'));
  console.log('Reference checks calibrated: valid input accepted; path escape, unapproved, rejected hash, revoked path, changed image, changed decision and changed category README rejected. Current successor selection regression checks passed. Integrity/selection only, not art-quality review.');
} finally { fs.rmSync(root,{recursive:true,force:true}); }
