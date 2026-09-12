import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../maikeover.html',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../content/maikeover-account.css',import.meta.url),'utf8');
function inspectPalette(text){
  assert.doesNotMatch(text,/#b51c68/i,'rejected reddish heading must not return');
  assert.match(text,/\.mo-drawer-heading,\.mo-tool-status,\.mo-drawer-help\s*\{[^}]*background:none/,'no individual text strips');
}
assert.throws(()=>inspectPalette(css.replace('background:none; }','background:#f8e6fa; }')));
inspectPalette(css);
function inspect(text) {
  assert.doesNotMatch(text,/src=["'][^"']*sv-back-nav/,'floating back navigation must not mount');
  const consent=text.match(/<input[^>]*id="moEpisodeConsent"[^>]*>/)?.[0];
  assert.ok(consent,'explicit consent control exists');
  assert.match(consent,/type="checkbox"/);
  assert.match(consent,/required/);
  assert.doesNotMatch(consent,/\schecked(?:\s|=|>)/,'no presumed consent');
  assert.match(text,/action="https:\/\/buttondown.com\/api\/emails\/embed-subscribe\/laidies"/);
  assert.match(text,/name="email" type="email"/);
  assert.match(text,/Buttondown opens in a new tab to confirm your request/);
  assert.equal((text.match(/class="mo-style-section"/g)||[]).length,4);
  assert.match(text,/maikeover-account.css\?v=20260912-purple-workspace-1/);
  assert.match(text,/maikeover-portraits-v1.js\?v=20260911-portrait-2/);
}
assert.throws(()=>inspect(html.replace('id="moEpisodeConsent"','checked id="moEpisodeConsent"')));
assert.throws(()=>inspect(html+'<script src="/content/site/sv-back-nav.js"></script>'));
inspect(html);
console.log('Follow-up guard passed; deliberately prechecked consent and restored arrow both rejected. Provider subscription/delivery are not simulated proof.');
