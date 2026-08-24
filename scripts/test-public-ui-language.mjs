#!/usr/bin/env node
import { checkPublicUiLanguage, findVisiblePlayHtml, findVisiblePlayJs, findVisiblePlayJson } from './check-public-ui-language.mjs';

const htmlBad = findVisiblePlayHtml('<button aria-label="Play the song">Play now</button>');
if (htmlBad.length !== 2) throw new Error(`static calibration failed: ${JSON.stringify(htmlBad)}`);
const htmlTechnical = findVisiblePlayHtml('<button id="play" class="play-icon"><svg aria-hidden="true"></svg></button>');
if (htmlTechnical.length) throw new Error(`technical HTML was rejected: ${JSON.stringify(htmlTechnical)}`);
const jsBad = findVisiblePlayJs("announce('Press Play when ready');");
if (jsBad.length !== 1) throw new Error(`dynamic calibration failed: ${JSON.stringify(jsBad)}`);
const jsTechnical = findVisiblePlayJs("audio.play(); audio.addEventListener('play', tick); const playBtn = getElementById('mp-play');");
if (jsTechnical.length) throw new Error(`technical JS was rejected: ${JSON.stringify(jsTechnical)}`);
for (const variant of ['Play', 'plays', 'played', 'playing']) {
  const htmlVariant = findVisiblePlayHtml(`<p>The station ${variant} here.</p>`);
  if (htmlVariant.length !== 1) throw new Error(`HTML variant calibration failed for ${variant}: ${JSON.stringify(htmlVariant)}`);
  const jsonVariant = findVisiblePlayJson({ label: `The station ${variant} here.` });
  if (jsonVariant.length !== 1) throw new Error(`JSON variant calibration failed for ${variant}: ${JSON.stringify(jsonVariant)}`);
}

const failures = checkPublicUiLanguage();
if (failures.length) throw new Error(`current public UI failed:\n${failures.join('\n')}`);
console.log('PUBLIC UI LANGUAGE TEST PASS — Play variants in HTML/JS/JSON=REJECT technical_media=ALLOW baseline=PASS');
