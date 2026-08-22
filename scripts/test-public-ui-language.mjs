#!/usr/bin/env node
import { checkPublicUiLanguage, findVisiblePlayHtml, findVisiblePlayJs } from './check-public-ui-language.mjs';

const htmlBad = findVisiblePlayHtml('<button aria-label="Play the song">Play now</button>');
if (htmlBad.length !== 2) throw new Error(`static calibration failed: ${JSON.stringify(htmlBad)}`);
const htmlTechnical = findVisiblePlayHtml('<button id="play" class="play-icon"><svg aria-hidden="true"></svg></button>');
if (htmlTechnical.length) throw new Error(`technical HTML was rejected: ${JSON.stringify(htmlTechnical)}`);
const jsBad = findVisiblePlayJs("announce('Press Play when ready');");
if (jsBad.length !== 1) throw new Error(`dynamic calibration failed: ${JSON.stringify(jsBad)}`);
const jsTechnical = findVisiblePlayJs("audio.play(); audio.addEventListener('play', tick); const playBtn = getElementById('mp-play');");
if (jsTechnical.length) throw new Error(`technical JS was rejected: ${JSON.stringify(jsTechnical)}`);

const failures = checkPublicUiLanguage();
if (failures.length) throw new Error(`current public UI failed:\n${failures.join('\n')}`);
console.log('PUBLIC UI LANGUAGE TEST PASS — static_bad=REJECT dynamic_bad=REJECT technical_media=ALLOW baseline=PASS');
