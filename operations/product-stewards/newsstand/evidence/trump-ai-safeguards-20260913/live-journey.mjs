#!/usr/bin/env node

import assert from "node:assert/strict";
import selection from "/Users/alisoneakin/Projects/laidies-newsstand-overheard-20260907/content/newsstand-selection.js";
import childProcess from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = "/Users/alisoneakin/Projects/laidies-newsstand-overheard-20260907";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const CALIBRATE = process.argv.includes("--calibrate");
const CALIBRATE_RETURNING = process.argv.includes("--calibrate-returning");
const CALIBRATE_READER_SCALE = process.argv.includes("--calibrate-reader-scale");
const READER_SCALE_ONLY = process.argv.includes("--reader-scale-only");
const TOWN_LAYOUT = process.argv.includes('--town-layout-only');
const CALIBRATE_TOWN = process.argv.includes('--calibrate-town-layout');
const ZOOM = process.argv.includes('--zoom-200');
const MEASUREMENT_BROWSER = process.argv.includes('--measurement-browser');
const FIXTURE_ROOT = process.env.NEWSSTAND_TEST_FIXTURE_ROOT;
const inputFile = relative => FIXTURE_ROOT && fs.existsSync(path.join(FIXTURE_ROOT,relative)) ? path.join(FIXTURE_ROOT,relative) : path.join(ROOT,relative);
const dataContext = { window: {} };
vm.runInNewContext(fs.readFileSync(inputFile('content/newsstand-stories.js'), 'utf8'), dataContext);
const DATA = dataContext.window.NEWSSTAND_DATA;
const DATE = DATA.publications.daily.editionDate;
const ISSUE_STORE = JSON.parse(fs.readFileSync(inputFile('content/newsstand-daily-issues.json'), 'utf8'));
const LATEST_ISSUE_REVIEW = Math.max(...ISSUE_STORE.issues.map(item => Date.parse(item.admission?.reviewedAt || 0)).filter(Number.isFinite));
const FIXED_NOW = (TOWN_LAYOUT || CALIBRATE_TOWN) ? '2026-09-07T17:00:00Z' : new Date(Math.max(Date.parse(`${DATE}T17:00:00Z`), Date.parse(DATA.lastCheckedAt) + 60000, LATEST_ISSUE_REVIEW + 60000)).toISOString();
const ISSUE = ISSUE_STORE.issues.find(item => item.editionDate === DATE);
const puzzleContext = { window: {} };
vm.runInNewContext(fs.readFileSync(inputFile('content/newsstand-crosswords.js'), 'utf8'), puzzleContext);
const latestPuzzle = puzzleContext.window.NEWSSTAND_CROSSWORDS.puzzles
  .filter(p => p.status === 'published' && Date.parse(p.publishedAt) <= Date.parse(FIXED_NOW))
  .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))[0];
assert.ok(latestPuzzle, 'Published puzzle required for crossword journey');
const expectedPuzzleCells = new Set(latestPuzzle.words.flatMap(word => [...word.answer].map((_, i) =>
  `${word.row + (word.dir === 'down' ? i : 0)}:${word.col + (word.dir === 'across' ? i : 0)}`))).size;

const ISSUE_DAILY = (ISSUE?.storyIds || []).map(id => DATA.stories.find(story => story.id === id)).filter(Boolean);
const FRONT = DATA.stories.find(item => item.id === DATA.publications.daily.issue.frontPaigeStoryId);
// Select the current edition editorial lead; upload order must not decide prominence.
const CURRENT_DAILY = (DATA.publications.daily.issue.storyIds || [])
  .map(id => DATA.stories.find(item => item.id === id)).filter(Boolean)
  .sort(selection.compare)[0];
// A service-only edition still needs to exercise a real, admitted news reader.
const READER_DAILY = CURRENT_DAILY || DATA.stories.filter(item => item.edition === 'daily' &&
  ['published', 'corrected'].includes(item.status) && item.sourceApproval?.status === 'approved' && item.id !== FRONT.id)
  .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)))[0];
assert.ok(READER_DAILY, 'An admitted news story is required for the reader regression journey');
const LEARNING_STORY = DATA.stories.find(story => /href=["']\/?library\.html(?:#|["'])/.test(story.class_notes || ""));
assert.ok(LEARNING_STORY, 'A NewsStand story with an approved Library class-note route is required for measurement coverage');
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
const readerScaleExpression = `(() => {
  const paper = document.querySelector('.ns-reader--story .ns-unfolded-paper');
  const heading = document.querySelector('.ns-reader--story .ns-article__head h2');
  const hero = document.querySelector('.ns-reader--story .ns-article__hero');
  const copy = document.querySelector('.ns-reader--story .ns-article__copy, .ns-reader--story .ns-examination__copy');
  if (!paper || !heading || !hero || !copy) return { pass: false, missing: true };
  const px = (element, property) => Number.parseFloat(getComputedStyle(element)[property]);
  const compact = innerWidth <= 720;
  const metrics = {
    paperWidth: paper.getBoundingClientRect().width,
    headingSize: px(heading, 'fontSize'),
    heroWidth: hero.getBoundingClientRect().width,
    copySize: px(copy, 'fontSize'),
    viewportWidth: innerWidth,
    overflow: document.documentElement.scrollWidth > innerWidth
  };
  metrics.pass = metrics.paperWidth <= Math.min(innerWidth, 821) &&
    metrics.headingSize <= (compact ? 32.5 : 40.5) &&
    metrics.heroWidth <= Math.min(480.5, metrics.paperWidth) &&
    metrics.copySize <= 17.5 && !metrics.overflow;
  return metrics;
})()`;

if (!fs.existsSync(CHROME)) {
  console.log("SKIP NEWSSTAND BROWSER: Google Chrome is unavailable.");
  process.exit(0);
}

function mime(file) {
  return ({
    ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
    ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".mp3": "audio/mpeg"
  })[path.extname(file)] || "application/octet-stream";
}

const fixedClock = `<script>(()=>{const NativeDate=Date;const fixed=${JSON.stringify(FIXED_NOW)};function FixedDate(...args){if(!(this instanceof FixedDate))return new NativeDate(fixed).toString();return new NativeDate(...(args.length?args:[fixed]));}FixedDate.prototype=NativeDate.prototype;Object.setPrototypeOf(FixedDate,NativeDate);FixedDate.now=()=>new NativeDate(fixed).getTime();window.Date=FixedDate;})();</script>`;
const measurementRequests = [];
const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, "http://127.0.0.1");
  const relative = requestUrl.pathname === "/" ? "newsstand.html" : requestUrl.pathname.replace(/^\/+/, "");
  const file = path.resolve(inputFile(relative));
  if (MEASUREMENT_BROWSER && requestUrl.pathname === "/__measurement-event") {
    let body = "";
    request.on("data", chunk => { body += chunk; });
    request.on("end", () => {
      measurementRequests.push({ headers: request.headers, body });
      response.writeHead(202); response.end();
    });
    return;
  }
  if (!(file.startsWith(ROOT + path.sep) || FIXTURE_ROOT && file.startsWith(FIXTURE_ROOT + path.sep)) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404); response.end("Not found"); return;
  }
  if (requestUrl.pathname === "/newsstand.html") {
    let body = fs.readFileSync(file, "utf8").replace("<head>", "<head>" + fixedClock);
    if (CALIBRATE) body = body.replace('class="ns-one-paper"', 'class="ns-retired-four-paper"');
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" }); response.end(body); return;
  }
  if (CALIBRATE_TOWN && requestUrl.pathname === "/content/newsstand-design.css") {
    const body = fs.readFileSync(file, "utf8").split('/* One available town column')[0];
    response.writeHead(200, { "content-type": "text/css; charset=utf-8" }); response.end(body); return;
  }
  if (CALIBRATE_READER_SCALE && requestUrl.pathname === "/content/newsstand-design.css") {
    const body = fs.readFileSync(file, "utf8")
      .replace("width: min(100%, 820px);", "width: min(100%, 1120px);")
      .replace("font-size: clamp(30px, 3vw, 40px);", "font-size: clamp(48px, 5.8vw, 76px);")
      .replace("width: min(100%, 480px);", "width: min(100%, 780px);")
      .replace("font-size: clamp(16px, 1.1vw, 17px);", "font-size: clamp(18px, 1.5vw, 21px);");
    response.writeHead(200, { "content-type": "text/css; charset=utf-8" }); response.end(body); return;
  }
  if (CALIBRATE_RETURNING && requestUrl.pathname === "/content/site/newsstand-catchup-v1.js") {
    const body = fs.readFileSync(file, "utf8").replace(
      "state.lastPublication = {",
      "state.lastVisit = {"
    );
    response.writeHead(200, { "content-type": "text/javascript; charset=utf-8" }); response.end(body); return;
  }
  if (MEASUREMENT_BROWSER && requestUrl.pathname === "/content/site/newsstand-measurement-v1.mjs") {
    const body = fs.readFileSync(file, "utf8")
      .replace('const ENDPOINT = "https://plausible.io/api/event";', 'const ENDPOINT = "/__measurement-event";')
      .replace('return Boolean(locationLike && locationLike.protocol === "https:" && locationLike.hostname === "laidies.ai");', 'return Boolean(locationLike);');
    response.writeHead(200, { "content-type": "text/javascript; charset=utf-8" }); response.end(body); return;
  }
  response.writeHead(200, { "content-type": mime(file) }); fs.createReadStream(file).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const siteOrigin = process.env.NEWSSTAND_PUBLIC_ORIGIN || `http://127.0.0.1:${server.address().port}`;
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
const timeout = setTimeout(() => devtoolsReject(new Error("Chrome DevTools did not start within 30 seconds: " + stderr.slice(-1500))), 30000);
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


const evidence=process.env.JOURNEY_EVIDENCE;
try {
  devtoolsEndpoint=await devtoolsPromise; clearTimeout(timeout);
  const results=[];
  for(const width of [1440,390,320]) {
    const client=await openPage('/newsstand#trump-ai-safeguards-20260913',{width,height:1000,selector:'.ns-reader--story .ns-article__head h2'});
    await sleep(600);
    const observed=await value(client, `({heading:document.querySelector('.ns-reader--story .ns-article__head h2')?.textContent,image:Array.from(document.images).filter(i=>i.src.includes('trump-ai-pace-and-checking')).map(i=>({loaded:i.complete&&i.naturalWidth>0,alt:i.alt})),overflow:document.documentElement.scrollWidth>innerWidth,link:document.querySelector('.ns-reader--story .ns-article__notes a[href*=library]' )?.href})`);
    assert.equal(observed.heading,'Trump backs the AI race as calls to slow it grow');assert.ok(observed.image.some(i=>i.loaded));assert.equal(observed.overflow,false);assert.ok(observed.link.includes('ai-fundamentals-101'));
    const shot=await client.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(evidence,`article-${width}.png`),Buffer.from(shot.data,'base64'));
    if(width===390){
      await act(client, `document.querySelector('.ns-reader--story .ns-article__notes a[href*=library]' ).focus()`);await pressEnter(client);await sleep(1800);
      observed.library=await value(client,`({url:location.href,text:document.body.innerText,headings:Array.from(document.querySelectorAll('h1,h2,h3')).map(e=>({text:e.textContent,id:e.id}))})`);
      fs.writeFileSync(path.join(evidence,'library-diagnostic.json'),JSON.stringify(observed.library,null,2));assert.ok(observed.library.url.includes('ai-fundamentals-101'));assert.ok(observed.library.headings.some(h=>h.text.includes('Guardrails') && h.text.includes('Runtime Safety Net')));observed.library.target=await value(client, `(()=>{const e=[...document.querySelectorAll('h1,h2,h3,h4')].find(e=>e.textContent.includes('Guardrails')&&e.textContent.includes('Runtime Safety Net'));return {top:e?.getBoundingClientRect().top,height:innerHeight}})()`);assert.ok(observed.library.target.top>=0&&observed.library.target.top<observed.library.target.height);delete observed.library.text;
      const shot2=await client.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(evidence,'library-390.png'),Buffer.from(shot2.data,'base64'));
    }
    results.push({width,...observed});client.close();
  }
  fs.writeFileSync(path.join(evidence,'article-library-journey.json'),JSON.stringify({checkedAt:new Date().toISOString(),origin:siteOrigin,results},null,2));console.log('TRUMP LIVE JOURNEY PASS: article, loaded illustration, no horizontal overflow at 1440/390/320; keyboard Class Notes link to actual Library chapter.');
} finally { clearTimeout(timeout);chrome.kill();server.close(); }
