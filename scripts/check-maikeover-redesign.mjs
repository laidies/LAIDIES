#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'maikeover.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'content/maikeover-v2.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'content/site/maikeover-v2.js'), 'utf8');

function inspect(candidate) {
  const failures = [];
  const required = [
    'class="mo-masthead"',
    'M<span class="mo-ai">Ai</span>KEOVER',
    'SUNNYV<span class="mo-card-ai">Ai</span>LE Resident',
    'class="mo-card-explainer"',
    'Get your Resident Card.',
    'class="mo-maker-intro"',
    'Make your <span>Resident Card.</span>',
    'assets/town-characters/scenes/paulette-maikeover-masthead-comic-candidate-v1.png',
    'Your Resident Card is how LAiDIES knows you around town.',
    'Your Closet keeps your saved things and progress available across devices',
    'Connect your Card. Open your Closet.',
    '/resident-card.html#rcAccountTitle',
    'maikeover-vanity-resident-card-candidate-v6.png',
    'id="moResidentNo" style="font-family:monospace;">No. NEW</span>'
  ];
  for (const phrase of required) if (!candidate.includes(phrase)) failures.push(`missing: ${phrase}`);
  const tools = [...candidate.matchAll(/data-mo-tool="([^"]+)"/g)].map(match => match[1]);
  if (tools.join(',') !== 'portrait,backdrop,era,soundtrack,saint,carrying,finish') failures.push(`step order: ${tools.join(',')}`);
  if (!candidate.includes('Seven steps. Your portrait and choices appear on the Card as you go.')) failures.push('seven-step maker explanation missing');
  if (!candidate.includes('id="moMake"') || !candidate.includes('maikeover-portraits-v1.js')) failures.push('working portrait creator missing');
  if (candidate.includes('mo-card-placeholder')) failures.push('CSS-era Card placeholder returned');
  if (/type="email"/i.test(candidate)) failures.push('email collection returned');
  if (/lil(?:y|ies)|flower vase|bouquet/i.test(candidate)) failures.push('retired flower motif returned');
  return failures;
}

function inspectCss(candidate) {
  const failures = [];
  if (!candidate.includes('.mo-masthead { display:grid; grid-template-columns:1fr;')) failures.push('masthead is not a full-width stack');
  if (!candidate.includes('.mo-maker-intro { position:absolute; width:1px; height:1px;')) failures.push('maker text returned as an artwork overlay');
  if (!candidate.includes('.mo-tool-tray { position:relative;')) failures.push('step navigation is still overlaid on the vanity artwork');
  if (!candidate.includes('#mo-chair { position:relative;')) failures.push('working controls are not in document flow');
  if (!candidate.includes('--mo-workbench: linear-gradient(145deg,#ef4d9c 0%,#b75cc4 58%,#6c7cd1 100%);')) failures.push('working area is not using the current LIBRAiRY gradient');
  if (!candidate.includes('--mo-control-surface: linear-gradient(120deg,#f2c6e5 0%,#c7d7f5 100%);')) failures.push('control surface is not using the current LIBRAiRY reading palette');
  if (!candidate.includes('background:var(--mo-workbench); border:0; border-bottom:8px solid var(--mo-ink);')) failures.push('working surface styling missing');
  if (!candidate.includes('background:var(--mo-control-surface); border:4px solid var(--mo-ink); border-radius:20px; box-shadow:9px 9px 0 var(--mo-yellow);')) failures.push('working controls lack the current bold LAiDIES panel treatment');
  if (!candidate.includes('.mo-chips .chip.on { color:var(--mo-ink); background:var(--mo-yellow);')) failures.push('selected choices are not using the current yellow state treatment');
  if (!candidate.includes('.mo-room__canvas { position:relative; width:min(100%,1120px);')) failures.push('wide-screen vanity scale cap missing');
  if (!candidate.includes('aspect-ratio:1672/941')) failures.push('physical vanity artwork ratio missing');
  if (!candidate.includes('border:0!important; border-radius:0!important; background:transparent!important; box-shadow:none!important;')) failures.push('Card is still drawn as a CSS panel');
  if (!candidate.includes('.mo-card-explainer { padding:clamp(38px,4.5vw,66px) max(6%,calc((100% - 1320px)/2)); color:#07102b; background:linear-gradient(145deg,#ef4d9c 0%,#b75cc4 58%,#6c7cd1 100%);')) failures.push('current LIBRAiRY explainer palette missing');
  if (!candidate.includes('.mo-card-explainer__intro .mo-section-kicker { grid-area:kicker; color:#07102b; }')) failures.push('explainer kicker can inherit retired global plum');
  if (!candidate.includes('.mo-card-explainer__intro h2 { grid-area:title; color:#fffdfb;')) failures.push('explainer headline can inherit retired global plum');
  if (!candidate.includes('.mo-card-explainer__intro>p:last-child { grid-area:lead; color:#07102b; }')) failures.push('explainer lead can inherit retired global plum');
  if (!candidate.includes('.mo-mirror-mount #moName') || !candidate.includes('text-overflow:ellipsis; white-space:nowrap;')) failures.push('long Card identity text can overlap adjacent fields');
  if (!candidate.includes('.mo-mirror-mount #moHandle+div>div { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }')) failures.push('long Card favourites can overlap adjacent rows');
  if (candidate.includes('background:#cfeaff')) failures.push('washed-out explainer blue returned');
  return failures;
}

const failures = inspect(html);
failures.push(...inspectCss(css));
if (!html.includes('content/maikeover-v2.css?v=20260904-palette-align-1')) failures.push('palette-alignment stylesheet cache key missing');
if (!html.includes('content/site/maikeover-v2.js?v=20260904-portrait-restore-1')) failures.push('portrait-restoration script cache key missing');
if (!html.includes('Card saved on this device. Sign in at the Resident Card desk')) failures.push('save handoff copy missing');
if (!js.includes('Connect your account before you leave if you want your Card and Closet available on another device.')) failures.push('signed-out Card/Closet handoff copy missing');
if (!js.includes('var toolOrder = ["portrait", "backdrop", "era", "soundtrack", "saint", "carrying", "finish"]')) failures.push('step behavior order missing');
if (!css.includes('--mo-hot: #ef4d9c') || !css.includes('--mo-purple: #7137d6') || !css.includes('--mo-teal: #18c6d8')) failures.push('current LIBRAiRY palette tokens missing');
if (html.includes('MAiN Street · SUNNYVAiLE') || html.includes('Come in as a visitor.')) failures.push('masthead still contains supporting copy beyond the building title');
if (!css.includes('max-height:none; overflow:visible')) failures.push('open drawer is still trapped in a small internal scroller');
if (!css.includes('.mo-chair-grid { display:grid!important; grid-template-columns:1fr!important;')) failures.push('working control layout missing');
if (!fs.existsSync(path.join(root, 'assets/building-interiors/maikeover/maikeover-vanity-resident-card-candidate-v6.png'))) failures.push('line-free bold Resident Card vanity asset missing');
if (html.includes('maikeover-vanity-resident-card-shell-candidate-v2.png')) failures.push('rejected drawer vanity asset returned');
if (html.includes('maikeover-vanity-straight-on-card-candidate-v3.png')) failures.push('rejected passport-like Card asset returned');
if (html.includes('maikeover-vanity-collectible-card-candidate-v4.png')) failures.push('rejected whiteboard-like Card asset returned');
if (!css.includes('font-size:clamp(12px,1.05vw,14px)!important')) failures.push('Card details legibility floor missing');
if (!css.includes('font-size:clamp(12px,1.02vw,14px)!important')) failures.push('Card header legibility floor missing');
if (!css.includes('.mo-card-ai { display:inline;') || !css.includes('font-size:1em; font-weight:900;')) failures.push('SUNNYVAiLE Ai size guard missing');
if (!css.includes('color:var(--mo-ink)!important; font-size:clamp(12px,1.02vw,14px)!important')) failures.push('Card header lacks deep-ink text');
if (!js.includes('? "No. " + String(number).padStart(4, "0")') || !js.includes(': "No. NEW";')) failures.push('Resident number does not distinguish account-issued and new Card states');
if (!js.includes('profile && profile.resident_number')) failures.push('account-issued resident number is not painted on MAiKEOVER');
if (!css.includes('font-size:5.8px!important; line-height:1.18!important')) failures.push('mobile Card details legibility floor missing');
if (css.includes('#4b2148') || css.includes('#3f1737')) failures.push('retired structural plum token present');
if (html.includes('MAiN Street · No. 6')) failures.push('unresolved street number returned');
if (html.includes('paulette-maikeover-wide-v')) failures.push('rejected glossy Paulette candidate returned');
if (js.includes('<strong>Not ready to sign in?</strong> You can save a local Card on this device.')) failures.push('device-local fallback returned as the primary promise');

const deliberatelyBad = html.replace('Your Resident Card is how LAiDIES knows you around town.', 'This card stays on this device.');
if (!inspect(deliberatelyBad).some(item => item.includes('Your Resident Card is how LAiDIES knows you around town.'))) {
  failures.push('calibration failed: validator accepted missing account promise');
}
const deliberatelyBadCss = css.replace('grid-template-columns:1fr;', 'grid-template-columns:.6fr 1.4fr;');
if (!inspectCss(deliberatelyBadCss).some(item => item.includes('full-width stack'))) {
  failures.push('calibration failed: validator accepted a split-screen masthead');
}
const deliberatelyWashedOutCss = css.replace('--mo-workbench: linear-gradient(145deg,#ef4d9c 0%,#b75cc4 58%,#6c7cd1 100%);', '--mo-workbench: #9fb5f2;');
if (!inspectCss(deliberatelyWashedOutCss).some(item => item.includes('current LIBRAiRY gradient'))) {
  failures.push('calibration failed: validator accepted the washed-out working-area colour');
}
const deliberatelyBadCardCss = css.replace('background:transparent!important; box-shadow:none!important;', 'background:linear-gradient(#ffc0d4,#ff8fb3)!important; box-shadow:8px 8px cyan!important;');
if (!inspectCss(deliberatelyBadCardCss).some(item => item.includes('CSS panel'))) {
  failures.push('calibration failed: validator accepted a CSS-drawn Card shell');
}
const deliberatelyBadTextFitCss = css.replaceAll('text-overflow:ellipsis; white-space:nowrap;', 'white-space:normal;');
const textFitFailures = inspectCss(deliberatelyBadTextFitCss);
if (!textFitFailures.some(item => item.includes('identity text')) ||
    !textFitFailures.some(item => item.includes('favourites'))) {
  failures.push('calibration failed: validator accepted overlapping long Card text');
}
const deliberatelyBadExplainerCss = css
  .replace('.mo-card-explainer { padding:clamp(38px,4.5vw,66px) max(6%,calc((100% - 1320px)/2)); color:#07102b; background:linear-gradient(145deg,#ef4d9c 0%,#b75cc4 58%,#6c7cd1 100%);', '.mo-card-explainer { padding:clamp(38px,4.5vw,66px) max(6%,calc((100% - 1320px)/2)); color:#07102b; background:#cfeaff;')
  .replace('.mo-card-explainer__intro h2 { grid-area:title; color:#fffdfb;', '.mo-card-explainer__intro h2 { grid-area:title;');
const explainerPaletteFailures = inspectCss(deliberatelyBadExplainerCss);
if (!explainerPaletteFailures.some(item => item.includes('current LIBRAiRY explainer palette')) ||
    !explainerPaletteFailures.some(item => item.includes('washed-out explainer blue')) ||
    !explainerPaletteFailures.some(item => item.includes('headline can inherit retired global plum'))) {
  failures.push('calibration failed: validator accepted the washed-out inherited explainer palette');
}
const deliberatelyBadFlow = html.replace('data-mo-tool="portrait"', 'data-mo-tool="look"');
if (!inspect(deliberatelyBadFlow).some(item => item.includes('step order'))) {
  failures.push('calibration failed: validator accepted a missing portrait step');
}

if (failures.length) {
  console.error('MAiKEOVER redesign contract: FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('MAiKEOVER redesign contract: PASS');
console.log('- calibrated against a missing account promise, a split-screen masthead, a CSS-drawn Card shell, a washed-out inherited explainer palette and a missing portrait step');
console.log('- comic Paulette masthead, physical Resident Card vanity, clear Card/Closet handoff and seven visible working steps in normal flow');
