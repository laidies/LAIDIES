#!/usr/bin/env node

import assert from "node:assert/strict";
import childProcess from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(process.env.NEWSSTAND_ROOT || path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."));
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const CALIBRATE = process.argv.includes("--calibrate");
const CALIBRATE_RETURNING = process.argv.includes("--calibrate-returning");
const ZOOM = process.argv.includes('--zoom-200');
const FIXTURE_ROOT = process.env.NEWSSTAND_TEST_FIXTURE_ROOT;
const inputFile = relative => FIXTURE_ROOT && fs.existsSync(path.join(FIXTURE_ROOT,relative)) ? path.join(FIXTURE_ROOT,relative) : path.join(ROOT,relative);
const dataContext = { window: {} };
vm.runInNewContext(fs.readFileSync(inputFile('content/newsstand-stories.js'), 'utf8'), dataContext);
const DATA = dataContext.window.NEWSSTAND_DATA;
const DATE = DATA.publications.daily.editionDate;
const FIXED_NOW = new Date(Math.max(Date.parse(`${DATE}T17:00:00Z`), Date.parse(DATA.lastCheckedAt) + 60000)).toISOString();
const ISSUE = JSON.parse(fs.readFileSync(inputFile('content/newsstand-daily-issues.json'), 'utf8')).issues.find(item => item.editionDate === DATE);
const FRONT = DATA.stories.find(item => item.id === DATA.publications.daily.issue.frontPaigeStoryId);
const BIG_PICTURE = DATA.stories.filter(item => item.edition==='big-picture'&&['published','corrected'].includes(item.status)&&item.sourceApproval?.status==='approved').sort((a,b)=>String(b.updatedAt).localeCompare(String(a.updatedAt)))[0];
const ARCHIVE = JSON.parse(fs.readFileSync(inputFile('content/newsstand-archive-index.json'), 'utf8'));
const readerContractContext = { module: { exports: {} } };
vm.runInNewContext(fs.readFileSync(inputFile('content/newsstand-reader-contract.js'), 'utf8'), readerContractContext);
const readerContract = readerContractContext.module.exports;
const EXPECTED_LATEST = DATA.stories.filter(story => story.edition === 'daily' && story.id !== DATA.publications.daily.issue.frontPaigeStoryId &&
  readerContract.accessDecision(DATA, story, { scope: 'search' }, FIXED_NOW).canExpose &&
  readerContract.withinRecentCalendarDays(story.publishedAt, FIXED_NOW, 5, DATA.publications.daily.editorialTimeZone || 'America/Vancouver')).length;
const HTML = fs.readFileSync(path.join(ROOT, 'newsstand.html'), 'utf8');
const CONTRACT_SRC = HTML.match(/src="([^"]*newsstand-reader-contract\.js[^"]*)"/)[1];
const READY = ISSUE.desks.filter(desk => desk.state === 'ready');
const FRONT_READY = READY.filter(desk => ['paige_tip','career_life','concept_week','mme_claio','behind_build','around_town'].includes(desk.type));
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

if (!fs.existsSync(CHROME)) {
  console.log("SKIP NEWSSTAND BROWSER: Google Chrome is unavailable.");
  process.exit(0);
}

function mime(file) {
  return ({
    ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
    ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".mp3": "audio/mpeg"
  })[path.extname(file)] || "application/octet-stream";
}

const fixedClock = `<script>(()=>{const NativeDate=Date;const fixed=${JSON.stringify(FIXED_NOW)};function FixedDate(...args){if(!(this instanceof FixedDate))return new NativeDate(fixed).toString();return new NativeDate(...(args.length?args:[fixed]));}FixedDate.prototype=NativeDate.prototype;Object.setPrototypeOf(FixedDate,NativeDate);FixedDate.now=()=>new NativeDate(fixed).getTime();window.Date=FixedDate;})();</script>`;
const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, "http://127.0.0.1");
  const relative = requestUrl.pathname === "/" ? "newsstand.html" : requestUrl.pathname.replace(/^\/+/, "");
  const file = path.resolve(inputFile(relative));
  if (!(file.startsWith(ROOT + path.sep) || FIXTURE_ROOT && file.startsWith(FIXTURE_ROOT + path.sep)) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404); response.end("Not found"); return;
  }
  if (requestUrl.pathname === "/newsstand.html") {
    let body = fs.readFileSync(file, "utf8").replace("<head>", "<head>" + fixedClock);
    if (CALIBRATE) body = body.replace('class="ns-one-paper"', 'class="ns-retired-four-paper"');
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" }); response.end(body); return;
  }
  if (CALIBRATE_RETURNING && requestUrl.pathname === "/content/site/newsstand-catchup-v1.js") {
    const body = fs.readFileSync(file, "utf8").replace(
      "state.lastPublication = {",
      "state.lastVisit = {"
    );
    response.writeHead(200, { "content-type": "text/javascript; charset=utf-8" }); response.end(body); return;
  }
  response.writeHead(200, { "content-type": mime(file) }); fs.createReadStream(file).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const siteOrigin = process.env.NEWSSTAND_PUBLIC_ORIGIN || `http://127.0.0.1:${server.address().port}`;
if (process.env.NEWSSTAND_PUBLIC_ORIGIN && !ZOOM) throw new Error('Public-origin mode is limited to the real-clock zoom branch');
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-newsstand-chrome-"));
if (ZOOM) {
  fs.mkdirSync(path.join(profile,'Default'));
  // Chromium ChromeZoomLevelPrefs: default storage partition key is "x".
  fs.writeFileSync(path.join(profile,'Default/Preferences'),JSON.stringify({partition:{default_zoom_level:{x:Math.log(2)/Math.log(1.2)}}}));
}
const chrome = childProcess.spawn(CHROME, [
  "--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`,
  "--no-first-run", "--disable-default-apps", "--disable-background-networking",
  "--disable-component-update", "--disable-sync", "--metrics-recording-only", "--force-device-scale-factor=1", "--window-size=1440,1000", "about:blank"
], { stdio: ["ignore", "ignore", "pipe"] });

let devtoolsResolve;
let devtoolsReject;
const devtoolsPromise = new Promise((resolve, reject) => { devtoolsResolve = resolve; devtoolsReject = reject; });
let stderr = "";
chrome.stderr.on("data", (chunk) => {
  stderr += chunk.toString();
  const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
  if (match) devtoolsResolve(match[1]);
});
chrome.once("error", devtoolsReject);
const timeout = setTimeout(() => devtoolsReject(new Error("Chrome DevTools did not start")), 10000);
let devtoolsEndpoint;

function connect(url) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(url);
    socket.addEventListener("open", () => resolve(socket), { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
}

function cdp(socket) {
  let id = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const handler = pending.get(message.id); pending.delete(message.id);
    if (message.error) handler.reject(new Error(message.error.message));
    else handler.resolve(message.result);
  });
  return {
    call(method, params = {}) {
      const callId = ++id;
      return new Promise((resolve, reject) => {
        pending.set(callId, { resolve, reject });
        socket.send(JSON.stringify({ id: callId, method, params }));
      });
    },
    close() { socket.close(); }
  };
}

async function openPage(pathname, { width = 1440, height = 1000, selector = "body" } = {}) {
  const target = await fetch(`${new URL(devtoolsEndpoint).origin.replace("ws:", "http:")}/json/new?${encodeURIComponent("about:blank")}`, { method: "PUT" }).then((response) => response.json());
  const socket = await connect(target.webSocketDebuggerUrl);
  const client = cdp(socket);
  await client.call("Runtime.enable"); await client.call("Page.enable");
  if (!ZOOM) await client.call("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  await client.call("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await client.call("Page.navigate", { url: siteOrigin + pathname });
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const ready = await client.call("Runtime.evaluate", { expression: `document.readyState === 'complete' && !!document.querySelector(${JSON.stringify(selector)})`, returnByValue: true });
    if (ready.result.value) break;
    await sleep(50);
  }
  await sleep(250);
  return client;
}

async function value(client, expression) {
  const result = await client.call("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function act(client, expression) { await value(client, expression); await sleep(180); }
async function pressEnter(client) {
  for (const type of ["keyDown", "keyUp"]) await client.call("Input.dispatchKeyEvent", { type, key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 });
  await sleep(180);
}

let checks = 0;
function check(actual, expected, label) { assert.deepEqual(actual, expected, label); checks += 1; }

try {
  devtoolsEndpoint = await devtoolsPromise; clearTimeout(timeout);
  const desktop = await openPage("/newsstand.html");
  if (CALIBRATE_RETURNING) {
    const knownBad = await openPage("/newsstand.html#chatgpt-health-permission-screen");
    const wronglyAdvanced = await value(knownBad, `(() => {
      const state = JSON.parse(localStorage.getItem('laidies_newsstand_seen_v1') || 'null');
      return !!(state && state.lastPublication);
    })()`);
    if (wronglyAdvanced) throw new Error("RETURNING READER CALIBRATION FAIL known-bad page-visit baseline was accepted");
    console.log("NEWSSTAND RETURNING READER CALIBRATION PASS known-bad publication baseline rejected");
    knownBad.close(); desktop.close();
  } else if (ZOOM) {
    const metrics = await value(desktop,"({width:innerWidth,outer:outerWidth,dpr:devicePixelRatio,scale:visualViewport.scale,overflow:document.documentElement.scrollWidth>innerWidth})");
    check(metrics.dpr,2,'native browser 200% zoom with device scale forced to 1');
    check(Math.abs(metrics.outer/metrics.width-2)<0.05,true,'native zoom halves CSS viewport; not a DPR-only or pinch test');
    check(metrics.scale,1,'not pinch zoom');
    check(metrics.overflow,false,'200% no page overflow');
    check(await value(desktop,`(()=>{const s=document.querySelector('.ns-newsroom-bar__status').getBoundingClientRect(),a=document.querySelector('.ns-paper-statusbar .ns-state__actions').getBoundingClientRect();return a.top>=s.bottom || a.left>=s.right;})()`),true,'200% status/actions do not overlap');
    await act(desktop,"document.querySelector('.ns-publication').focus()"); await pressEnter(desktop);
    await sleep(200);
    check(await value(desktop,"document.activeElement.id"),'ns-story-title','200% keyboard opens full story and transfers focus');
    check(await value(desktop,"document.documentElement.scrollWidth<=innerWidth"),true,'200% article no overflow');
    const shot=await desktop.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    const screenshot=path.join(os.tmpdir(),`newsstand-zoom-200-${Date.now()}.png`); fs.writeFileSync(screenshot,Buffer.from(shot.data,'base64'));
    await act(desktop,"document.querySelector('#ns-return').click();document.querySelector('#ns-browse-all').click()");
    check(await value(desktop,"document.querySelectorAll('#paper-counter .ns-front-story').length"),ARCHIVE.items.length,'200% return and archive work');
    await act(desktop,`document.querySelector('#ns-archive-concept').value='context';document.querySelector('#ns-archive-concept').dispatchEvent(new Event('change',{bubbles:true}))`);
    check(await value(desktop,"document.querySelectorAll('#paper-counter .ns-front-story').length>0 && document.documentElement.scrollWidth<=innerWidth"),true,'200% filters remain usable without overflow');
    console.log(`NEWSSTAND ZOOM PASS checks=${checks} metrics=${JSON.stringify(metrics)} screenshot=${screenshot}`); desktop.close();
  } else if (CALIBRATE) {
    check(await value(desktop, "document.querySelector('.ns-one-paper') === null"), true, "known-bad one-paper removal must be visible");
    console.log("NEWSSTAND BROWSER CALIBRATION PASS known-bad missing one-newspaper surface rejected");
    desktop.close();
    process.exitCode = 0;
  } else {
    check(await value(desktop, "({contract:typeof window.NewsstandContract,data:!!window.NEWSSTAND_DATA,contractScript:Array.from(document.scripts).find((item)=>item.src.includes('newsstand-reader-contract'))?.src||null})"), { contract: "object", data: true, contractScript: new URL(CONTRACT_SRC, siteOrigin + '/').href }, "reader contract and canonical dataset load before interaction");
    check(await value(desktop, "window.NewsstandContract.validate(window.NEWSSTAND_DATA)"), [], "canonical browser dataset satisfies the reader contract");
    check(await value(desktop, "document.querySelectorAll('.ns-publication').length"), 1, "one complete Daily control");
    check(await value(desktop, "['breaking','weekly','big-picture'].every((edition)=>document.querySelector('[data-status-for=\"'+edition+'\"]')&&document.querySelector('[data-contents-for=\"'+edition+'\"]'))"), true, "three editorial columns inside one paper");
    check(await value(desktop, "document.querySelector('.ns-front-desk--lead .ns-front-desk__label').innerText.includes('THE FRONT PAiGE')"), true, "Front PAiGE names the Daily lead");
    check(await value(desktop, `(() => {
      const grid = document.querySelector('.ns-front-page-grid').getBoundingClientRect();
      const lead = document.querySelector('.ns-front-desk--lead').getBoundingClientRect();
      const rail = document.querySelector('.ns-front-page-grid__right').getBoundingClientRect();
      const picture = document.querySelector('.ns-front-desk--big-picture').getBoundingClientRect();
      return Math.abs(picture.width - grid.width) <= 1 &&
        picture.top >= Math.max(lead.bottom, rail.bottom) - 1;
    })()`), true, "Big Picture spans the full desktop grid beneath Front PAiGE and the news rail");
    check(await value(desktop, "document.body.textContent.includes('Wednesday to Wednesday') && document.body.textContent.includes('Latest analysis')"), true, "Weekly and Big Picture jobs visible");
    check(await value(desktop, "!document.body.textContent.includes('The Tribune')"), true, "retired identity absent");
    check(await value(desktop, "document.documentElement.scrollWidth <= window.innerWidth"), true, "desktop has no document overflow");

    const currentPreview = await openPage("/newsstand.html");
    check(await value(currentPreview, "window.NEWSSTAND_DATA.publications.daily.editionDate"), DATE, "schema-2 canonical source uses the admitted current issue");
    check(await value(currentPreview, "document.querySelector('.ns-front-desk--lead .ns-publication__headline').textContent"), FRONT.headline, "history renderer preserves the canonical Front PAiGE headline");
    check(await value(currentPreview, "document.querySelector('.ns-front-desk--lead [data-status-for=daily]').textContent"), 'Published ' + new Date(FRONT.publishedAt).toLocaleDateString('en-US', {month:'long',day:'numeric',year:'numeric',timeZone:'America/Vancouver'}), "carried-forward Front PAiGE keeps its original publication date");
    check(await value(currentPreview, "!document.querySelector('.ns-miss-jeeves') && !document.querySelector('.ns-concept-week')"), true, "held features cannot bypass service admission through static markup");
    check(await value(currentPreview, "document.querySelectorAll('[data-secondary-for=daily] article').length"), Math.min(3, EXPECTED_LATEST), "only admitted stories from the latest five-day window populate the Latest rail");
    check(await value(currentPreview, `(() => {
      const lead = document.querySelector('.ns-front-desk--lead .ns-publication__headline').textContent;
      const secondary = Array.from(document.querySelectorAll('[data-secondary-for=daily] article strong'), node => node.textContent);
      return new Set([lead].concat(secondary)).size === 1 + secondary.length;
    })()`), true, "Front PAiGE appears exactly once");
    const serviceRender = await value(currentPreview, `(() => {
      const section = document.querySelector('.ns-feature-desk');
      const normalize = value => value.replace(/[.?!]+$/,'');
      const sectionText = normalize(section.textContent);
      return {valid: section.querySelectorAll('[data-desk-state=ready]').length === ${READY.length} &&
        ${JSON.stringify(READY.map(desk => desk.headline))}.every(headline => sectionText.includes(normalize(headline))),
        ready: section.querySelectorAll('[data-desk-state=ready]').length,
        missing: ${JSON.stringify(READY.map(desk => desk.headline))}.filter(headline => !sectionText.includes(normalize(headline))),
        failure: window.__newsstandDailyIssueValidationFailure || window.__newsstandDailyIssueError || null};
    })()`);
    check(serviceRender.valid, true, `exact admitted current service desks are populated (${JSON.stringify(serviceRender)})`);
    check(await value(currentPreview, `(() => {
      const card = document.querySelector('.ns-front-desk--big-picture');
      return card && card.textContent.includes(${JSON.stringify(BIG_PICTURE.headline)}) &&
        !card.textContent.includes('No published article yet') &&
        !card.querySelector('.ns-big-picture-tracking__list');
    })()`), true, "Big Picture shows the approved data-centre article instead of the retired coming-soon tracker");
    check(await value(currentPreview, `(() => { const section=document.querySelector('.ns-feature-desk'); const links=section.querySelectorAll('[data-desk][data-desk-state=ready] a').length; return links > 0 && links <= ${READY.length} && !section.querySelector('[data-desk-state=empty] a') && !document.querySelector('.ns-paper-sections'); })()`), true, "only admitted service desks expose destinations and redundant section tabs stay removed");
    await act(currentPreview, "document.querySelector('.ns-front-desk--lead').click()");
    check(await value(currentPreview, `!!document.querySelector('.ns-article') && !document.querySelector('.ns-daily-issue') && location.hash === ${JSON.stringify('#' + FRONT.slug)}`), true, "Front PAiGE opens its full admitted story in one action");
    currentPreview.close();

    await act(desktop, "document.querySelector('#ns-browse-all').click()");
    check(await value(desktop, "document.querySelector('#ns-search-hint').textContent"), `${ARCHIVE.items.length} back issues available.`, "complete archive opens");
    check(await value(desktop, "document.querySelectorAll('#paper-counter .ns-front-story').length"), ARCHIVE.items.length, "archive contains every admitted story and excludes held service columns");
    check(await value(desktop, "document.querySelector('#paper-counter').textContent.includes('historical Promptoscope')"), true, "retired desk is explicitly historical");
    await act(desktop, "document.querySelector('#ns-archive-concept').value='context';document.querySelector('#ns-archive-concept').dispatchEvent(new Event('change',{bubbles:true}))");
    check(await value(desktop, "document.querySelectorAll('#paper-counter .ns-front-story').length > 0 && !document.querySelector('#paper-counter').textContent.includes('EUROPE’S AI TRANSPARENCY RULES')"), true, "concept filter changes archive results");

    const direct = await openPage("/newsstand.html#label-is-not-a-truth-detector");
    check(await value(direct, "document.querySelectorAll('.ns-article').length"), 1, "direct Big Picture route opens");
    check(await value(direct, "document.querySelector('.ns-big-picture-history') === null && document.querySelector('.ns-article__taxonomy') !== null"), true, "reclassified Daily archive story keeps its concept bridge without Big Picture history");
    check(await value(direct, "/Latest|Daily/.test(document.querySelector('#ns-reader-edition').textContent)"), true, "reclassified label story is identified as Latest archive reporting");
    check(await value(direct, `(() => {
      const state = JSON.parse(localStorage.getItem('laidies_newsstand_seen_v1') || 'null');
      return !!state && state.lastPublication &&
        state.lastPublication.viewed_at === new Date().toISOString();
    })()`), true, "successful story body view advances the returning-reader baseline");
    check(await value(direct, `(() => {
      const raw = localStorage.getItem('laidies_newsstand_seen_v1') || '';
      const state = JSON.parse(raw || 'null');
      return !raw.includes('The label can tell you') && !raw.includes('provenance') &&
        JSON.stringify(Object.keys(state)) === JSON.stringify(['lastPublication']) &&
        JSON.stringify(Object.keys(state.lastPublication)) === JSON.stringify(['viewed_at']);
    })()`), true, "returning-reader state stores one view timestamp only");
    direct.close(); desktop.close();

    const returning = await openPage("/newsstand.html");
    await sleep(1900);
    check(await value(returning, "window.__newsstandDailyIssueError || null"), null, "admitted Daily store loads before returning-reader range calculation");
    check(await value(returning, "!document.querySelector('#ns-catchup-since') && !!document.querySelector('#ns-catchup-signin') && document.querySelector('#ns-catchup-signin').textContent.includes('Sign in')"), true, "Catch Me Up asks the reader to sign in instead of making her remember a date");
    returning.close();

    const clicked = await openPage("/newsstand.html");
    await act(clicked, `localStorage.setItem('laidies_newsstand_seen_v1', JSON.stringify({lastPublication:{viewed_at:'2026-08-20T12:00:00Z'}}));document.querySelector('#ns-browse-all').click()`);
    await act(clicked, "document.querySelector('.ns-front-story[href^=\"#\"]').click()");
    check(await value(clicked, `(() => {
      const state = JSON.parse(localStorage.getItem('laidies_newsstand_seen_v1') || 'null');
      return !!document.querySelector('.ns-article') && state.lastPublication.viewed_at === new Date().toISOString();
    })()`), true, "clicked eligible story advances the baseline after its body opens");
    clicked.close();

    const legacy = await openPage("/newsstand.html");
    await act(legacy, `localStorage.setItem('laidies_newsstand_seen_v1', JSON.stringify({
      lastVisit:{updated_at:'2026-08-22T12:00:00Z'},
      seen:{'visit:2026-08-22T12:00:00Z':{updated_at:'2026-08-22T12:00:00Z'},'story:private-history':{viewed_at:'2026-08-22T12:00:00Z',publication_at:'2026-08-21T12:00:00Z'}}
    }));location.reload()`);
    const sanitizedReturningState = `(() => {
      const state = JSON.parse(localStorage.getItem('laidies_newsstand_seen_v1') || 'null');
      return !!state && Object.keys(state).length === 1 &&
        Object.prototype.hasOwnProperty.call(state, 'lastPublication') &&
        !Object.prototype.hasOwnProperty.call(state, 'lastVisit') &&
        !Object.prototype.hasOwnProperty.call(state, 'seen') &&
        (state.lastPublication === null ||
          (Object.keys(state.lastPublication).length === 1 &&
            typeof state.lastPublication.viewed_at === 'string'));
    })()`;
    for (let attempt = 0; attempt < 40; attempt += 1) {
      if (await value(legacy, sanitizedReturningState)) break;
      await sleep(50);
    }
    check(await value(legacy, sanitizedReturningState), true, "legacy visit and item history is discarded while a valid publication baseline may be restored");
    legacy.close();

    const malformed = await openPage("/newsstand.html");
    await act(malformed, "localStorage.setItem('laidies_newsstand_seen_v1', '{not-json');location.reload()");
    for (let attempt = 0; attempt < 40; attempt += 1) {
      if (await value(malformed, sanitizedReturningState)) break;
      await sleep(50);
    }
    check(await value(malformed, `(() => {
      const state = JSON.parse(localStorage.getItem('laidies_newsstand_seen_v1') || 'null');
      return !!state && Object.keys(state).length === 1 &&
        Object.prototype.hasOwnProperty.call(state, 'lastPublication') &&
        !!document.querySelector('#ns-catchup-explainer') && !!document.querySelector('.ns-one-paper');
    })()`), true, "malformed local returning state is discarded without blocking the reader");
    malformed.close();

    for (const width of [390, 320]) {
      const mobile = await openPage("/newsstand.html", { width, height: 844 });
      check(await value(mobile, "window.innerWidth"), width, `${width}: exact viewport applied`);
      check(await value(mobile, "document.documentElement.scrollWidth <= window.innerWidth"), true, `${width}: no document overflow`);
      check(await value(mobile, "document.querySelector('.ns-publication').offsetParent !== null"), true, `${width}: paper control visible`);
      check(await value(mobile, "document.querySelector('.ns-front-desk--lead').getBoundingClientRect().top < document.querySelector('.ns-front-desk--big-picture').getBoundingClientRect().top"), true, `${width}: Front PAiGE reads first`);
      await act(mobile, "document.querySelector('.ns-publication').focus()"); await pressEnter(mobile);
      check(await value(mobile, "document.querySelector('.ns-article') !== null && document.querySelector('.ns-daily-issue') === null"), true, `${width}: keyboard Front PAiGE opens the story directly`);
      for (let attempt = 0; attempt < 20; attempt += 1) {
        if (await value(mobile, "document.activeElement.id === 'ns-story-title'")) break;
        await sleep(50);
      }
      check(await value(mobile, "document.activeElement.id"), "ns-story-title", `${width}: focus moves to the actual story heading`);
      mobile.close();
    }

    const crossword = await openPage("/newsstand-crossword.html", { width: 390, height: 844, selector: "#cw-grid" });
    check(await value(crossword, "document.querySelectorAll('.cw-cell input').length"), 49, "crossword playable cells render");
    check(await value(crossword, "document.documentElement.scrollWidth <= window.innerWidth"), true, "crossword page has no document overflow");
    await act(crossword, "document.querySelector('#cw-reveal').click()");
    check(await value(crossword, "document.querySelector('#cw-status').textContent.includes('Puzzle revealed')"), true, "crossword reveal works");
    await act(crossword, "document.querySelector('#cw-clear').click()");
    check(await value(crossword, "Array.from(document.querySelectorAll('.cw-cell input')).every((input)=>!input.value)"), true, "crossword clear works");
    crossword.close();
    console.log(`NEWSSTAND BROWSER PASS checks=${checks} desktop=1440 mobile=390,320 archive Daily Big-Picture crossword keyboard`);
  }
} finally {
  clearTimeout(timeout); server.close();
  if (chrome.exitCode === null) {
    chrome.kill("SIGTERM");
    await Promise.race([new Promise((resolve) => chrome.once("exit", resolve)), sleep(2000)]);
  }
  fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
