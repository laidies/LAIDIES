#!/usr/bin/env node

import assert from "node:assert/strict";
import childProcess from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(process.env.NEWSSTAND_ROOT || path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."));
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const CALIBRATE = process.argv.includes("--calibrate");
const CALIBRATE_RETURNING = process.argv.includes("--calibrate-returning");
const FIXED_NOW = "2026-08-29T20:00:00-07:00";
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
  const file = path.resolve(ROOT, relative);
  if (!file.startsWith(ROOT + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
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
const siteOrigin = `http://127.0.0.1:${server.address().port}`;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-newsstand-chrome-"));
const chrome = childProcess.spawn(CHROME, [
  "--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`,
  "--no-first-run", "--disable-default-apps", "--disable-background-networking",
  "--disable-component-update", "--disable-sync", "--metrics-recording-only", "about:blank"
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
  await client.call("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
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
  } else if (CALIBRATE) {
    check(await value(desktop, "document.querySelector('.ns-one-paper') === null"), true, "known-bad one-paper removal must be visible");
    console.log("NEWSSTAND BROWSER CALIBRATION PASS known-bad missing one-newspaper surface rejected");
    desktop.close();
    process.exitCode = 0;
  } else {
    check(await value(desktop, "({contract:typeof window.NewsstandContract,data:!!window.NEWSSTAND_DATA,contractScript:Array.from(document.scripts).find((item)=>item.src.includes('newsstand-reader-contract'))?.src||null})"), { contract: "object", data: true, contractScript: siteOrigin + "/content/newsstand-reader-contract.js?v=20260823-newsstand-v1" }, "reader contract and canonical dataset load before interaction");
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
    check(await value(currentPreview, "window.NEWSSTAND_DATA.publications.daily.editionDate"), "2026-08-24", "public current-issue source uses the August 24 issue");
    check(await value(currentPreview, "document.querySelectorAll('[data-secondary-for=daily] article').length"), 0, "stale OpenAI brief is withheld from the Daily rail");
    check(await value(currentPreview, `(() => {
      const lead = document.querySelector('.ns-front-desk--lead .ns-publication__headline').textContent;
      const secondary = Array.from(document.querySelectorAll('[data-secondary-for=daily] article strong'), node => node.textContent);
      return new Set([lead].concat(secondary)).size === 1;
    })()`), true, "Front PAiGE appears exactly once");
    check(await value(currentPreview, `(() => {
      const section = document.querySelector('.ns-feature-desk');
      return section.hidden && !document.body.textContent.includes('Save the good setup, not just the good answer.') &&
        !document.body.textContent.includes('Keep receipts for the work AI helps you redesign.') &&
        !document.body.textContent.includes('The Caboodle.');
    })()`), true, "service desk stays hidden when its cited approval evidence cannot be resolved");
    check(await value(currentPreview, `(() => {
      const card = document.querySelector('.ns-front-desk--big-picture');
      return card && card.textContent.includes('Why data centres became a public villain') &&
        !card.textContent.includes('No published article yet') &&
        !card.querySelector('.ns-big-picture-tracking__list');
    })()`), true, "Big Picture shows the approved data-centre article instead of the retired coming-soon tracker");
    check(await value(currentPreview, "document.querySelectorAll('.ns-feature-desk [data-desk][data-desk-state=ready] a').length === 0 && !document.querySelector('.ns-paper-sections')"), true, "held service desks expose no destinations and redundant section tabs stay removed");
    await act(currentPreview, "document.querySelector('.ns-front-desk--lead').click()");
    check(await value(currentPreview, "!!document.querySelector('.ns-article') && !document.querySelector('.ns-daily-issue') && location.hash === '#front-paige-accountable-systems-2026-08-24'"), true, "Front PAiGE opens the full women-and-AI opportunity story in one action");
    currentPreview.close();

    await act(desktop, "document.querySelector('#ns-browse-all').click()");
    check(await value(desktop, "document.querySelector('#ns-search-hint').textContent"), "8 back issues available.", "complete archive opens");
    check(await value(desktop, "document.querySelectorAll('#paper-counter .ns-front-story').length"), 8, "archive contains every admitted story and excludes held service columns");
    check(await value(desktop, "document.querySelector('#paper-counter').textContent.includes('historical Promptoscope')"), true, "retired desk is explicitly historical");
    await act(desktop, "document.querySelector('#ns-archive-concept').value='context';document.querySelector('#ns-archive-concept').dispatchEvent(new Event('change',{bubbles:true}))");
    check(await value(desktop, "document.querySelectorAll('#paper-counter .ns-front-story').length > 0 && !document.querySelector('#paper-counter').textContent.includes('EUROPE’S AI TRANSPARENCY RULES')"), true, "concept filter changes archive results");

    await act(desktop, "document.querySelector('#ns-return').click();document.querySelector('[data-open-daily]').click()");
    check(await value(desktop, "document.querySelector('.ns-daily-issue').dataset.dailyDate"), "2026-08-24", "latest admitted Daily opens");
    check(await value(desktop, `(() => {
      const state = JSON.parse(localStorage.getItem('laidies_newsstand_seen_v1') || 'null');
      return state && state.lastPublication && state.lastPublication.viewed_at === new Date().toISOString();
    })()`), true, "admitted Daily advances the returning-reader baseline");
    check(await value(desktop, "document.querySelector('.ns-daily-news h3').textContent.includes('AI opportunity gap is opening now')"), true, "August 24 Daily contains the reviewed women-and-AI Front PAiGE story");
    check(await value(desktop, "document.querySelector('.ns-daily-service-grid').hidden && document.querySelectorAll('.ns-daily-service-grid [data-desk-state=ready]').length === 0"), true, "August 24 Daily withholds every service record whose cited approval evidence is missing");

    const direct = await openPage("/newsstand.html#label-is-not-a-truth-detector");
    check(await value(direct, "document.querySelectorAll('.ns-article').length"), 1, "direct Big Picture route opens");
    check(await value(direct, "document.querySelector('.ns-big-picture-history') === null && document.querySelector('.ns-article__taxonomy') !== null"), true, "reclassified Daily archive story keeps its concept bridge without Big Picture history");
    check(await value(direct, "document.querySelector('#ns-reader-edition').textContent.includes('Daily')"), true, "reclassified label story is identified as Daily archive reporting");
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
    for (let attempt = 0; attempt < 40; attempt += 1) {
      if (await value(returning, "document.querySelector('#ns-catchup-since').max === '2026-08-24'")) break;
      await sleep(50);
    }
    check(await value(returning, "window.__newsstandDailyIssueError || null"), null, "admitted Daily store loads before returning-reader range calculation");
    const returningRange = await value(returning, `(() => {
      const input = document.querySelector('#ns-catchup-since');
      const state = JSON.parse(localStorage.getItem('laidies_newsstand_seen_v1') || 'null');
      return { value: input.value, max: input.max,
        viewedAt: state && state.lastPublication && state.lastPublication.viewed_at,
        now: new Date().toISOString() };
    })()`);
    check(returningRange, { value: '2026-08-24', max: '2026-08-24', viewedAt: new Date(FIXED_NOW).toISOString(), now: new Date(FIXED_NOW).toISOString() }, "Catch Me Up uses the last successful view but caps the range at the latest admitted issue");
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
    for (let attempt = 0; attempt < 40; attempt += 1) {
      if (await value(legacy, "localStorage.getItem('laidies_newsstand_seen_v1') === JSON.stringify({lastPublication:null})")) break;
      await sleep(50);
    }
    check(await value(legacy, "localStorage.getItem('laidies_newsstand_seen_v1')"), JSON.stringify({ lastPublication: null }), "legacy visit and item history is discarded on read");
    legacy.close();

    const malformed = await openPage("/newsstand.html");
    await act(malformed, "localStorage.setItem('laidies_newsstand_seen_v1', '{not-json');location.reload()");
    for (let attempt = 0; attempt < 40; attempt += 1) {
      if (await value(malformed, "localStorage.getItem('laidies_newsstand_seen_v1') === JSON.stringify({lastPublication:null})")) break;
      await sleep(50);
    }
    check(await value(malformed, `(() => {
      return localStorage.getItem('laidies_newsstand_seen_v1') === JSON.stringify({lastPublication:null}) &&
        !!document.querySelector('#ns-catchup-since') && !!document.querySelector('.ns-one-paper');
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
