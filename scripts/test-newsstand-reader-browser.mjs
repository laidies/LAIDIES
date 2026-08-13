#!/usr/bin/env node

import assert from "node:assert/strict";
import childProcess from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(process.env.NEWSSTAND_ROOT || path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."));
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const NOW_STALE = "2026-06-01T00:00:00Z";
const TEST_CLOCKS = {
  "same-day": "2026-08-04T23:00:00-07:00",
  "next-day": "2026-08-05T12:00:00-07:00",
  "released-worldwide": "2026-08-05T06:30:00Z",
  "backfill-current": "2026-08-11T23:00:00Z",
  "candidate-day": "2026-08-12T23:30:00-07:00"
};
const CORRECTION_RECORD = "/operations/test-fixtures/newsstand-reader/evidence/correction-label-truth-2026-07-25.json";
const RETRACTION_RECORD = "/operations/test-fixtures/newsstand-reader/evidence/retraction-label-truth-2026-07-25.json";
const EVIDENCE_DIR = process.env.NEWSSTAND_EVIDENCE_DIR
  ? path.resolve(process.env.NEWSSTAND_EVIDENCE_DIR)
  : null;
const EVIDENCE_FILTER = String(process.env.NEWSSTAND_EVIDENCE_FILTER || "").trim();

if (!fs.existsSync(CHROME)) {
  console.log("SKIP NEWSSTAND BROWSER: Google Chrome is unavailable.");
  process.exit(0);
}

function baseData() {
  const context = { window: {} };
  vm.runInNewContext(
    fs.readFileSync(path.join(ROOT, "content", "newsstand-stories.js"), "utf8"),
    context
  );
  return JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA));
}

function fixtureData(name) {
  if (name === "load-failure") return null;
  const data = baseData();
  if (name === "no-data") data.stories = [];
  if (name === "dataset-hold") data.datasetStatus = "hold";
  if (name === "stale") {
    Object.values(data.publications).forEach((publication) => {
      publication.lastCheckedAt = NOW_STALE;
    });
  }
  if (name === "unavailable") {
    data.publications.tribune.status = "unavailable";
    data.publications.daily.status = "quiet";
    data.publications.daily.publishedAt = null;
  }
  if (name === "mixed") {
    data.publications.tribune.lastCheckedAt = NOW_STALE;
    data.publications.daily.status = "current";
    data.publications.daily.publishedAt = "2026-07-25T17:00:00Z";
    data.publications.daily.editionDate = "2026-08-04";
  }
  if (name === "growth") {
    const second = JSON.parse(JSON.stringify(data.stories.find((story) => story.id === "label-is-not-a-truth-detector")));
    second.id = "second-tribune-growth-fixture";
    second.slug = "second-tribune-growth-fixture";
    second.tags = [...second.tags, "agents"];
    data.stories.push(second);
  }
  if (name === "same-date-injection") {
    const injected = JSON.parse(JSON.stringify(data.stories.find((story) => story.edition === "daily")));
    injected.id = "unadmitted-same-date-story";
    injected.slug = "unadmitted-same-date-story";
    injected.headline = "UNADMITTED SAME-DATE STORY";
    injected.publishedAt = "2026-08-04T18:00:00Z";
    injected.updatedAt = "2026-08-04T18:00:00Z";
    injected.lastCheckedAt = "2026-08-04T18:00:00Z";
    data.stories.push(injected);
  }
  if (name === "corrected") {
    const story = data.stories.find((item) => item.id === "label-is-not-a-truth-detector");
    story.status = "corrected";
    story.correction = {
      correctedAt: "2026-07-25T18:00:00Z",
      summary: "A material date was corrected and the change is shown.",
      owner: "NewsStand accuracy editor",
      record: CORRECTION_RECORD
    };
  }
  if (name === "retracted") {
    const story = data.stories.find((item) => item.id === "label-is-not-a-truth-detector");
    story.status = "retracted";
    story.retraction = {
      retractedAt: "2026-07-25T18:30:00Z",
      reason: "The central source no longer supports the published claim.",
      owner: "NewsStand accuracy editor",
      record: RETRACTION_RECORD
    };
  }
  if (name === "admitted-story-tampered") {
    const story = data.stories.find((item) => item.id === "eu-ai-act-transparency-starts");
    story.headline = "FORGED ADMITTED-ID STORY COPY";
    story.the_story = "Forged body with the admitted identifier, date and status preserved.";
    story.laidies_read = "Forged analysis with the admitted identifier, date and status preserved.";
    story.slug = "forged-admitted-destination";
    if (story.sources && story.sources[0]) story.sources[0].url = "https://example.invalid/forged-source";
  }
  return data;
}

function fixtureScript(name) {
  const mutatesStorySource = new Set([
    "load-failure", "no-data", "dataset-hold", "stale", "unavailable", "mixed",
    "growth", "same-date-injection", "corrected", "retracted", "admitted-story-tampered"
  ]);
  if (!mutatesStorySource.has(name)) {
    return fs.readFileSync(path.join(ROOT, "content", "newsstand-stories.js"), "utf8");
  }
  const data = fixtureData(name);
  if (!data) return "/* intentional load-failure fixture: NEWSSTAND_DATA absent */";
  return "window.NEWSSTAND_DATA = " + JSON.stringify(data) +
    ";\nwindow.NEWSSTAND_STORIES = window.NEWSSTAND_DATA.stories;\n";
}

function canonicalJson(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function completeDailyReviewFixture() {
  const candidateRoot = path.join(ROOT, "operations/product-stewards/newsstand/candidates");
  const storyCandidate = JSON.parse(fs.readFileSync(path.join(candidateRoot, "ai-work-files-private-details-2026-08-12-story-record-candidate-v3.json"), "utf8"));
  const serviceCandidates = [
    "paige-receipt-list-service-exemplar-2026-08-12.json",
    "career-share-the-win-with-purpose-service-exemplar-2026-08-13.json",
    "promptoscope-refrigerator-service-exemplar-2026-08-12.json",
    "mme-claio-mini-backpack-service-exemplar-2026-08-12.json"
  ].map((file) => JSON.parse(fs.readFileSync(path.join(candidateRoot, file), "utf8")));
  const serviceTypes = { paige_tip: "paige_tip", career_work_life: "career_life", promptoscope: "promptoscope", mme_claio: "mme_claio" };
  const serviceByType = new Map(serviceCandidates.map((candidate) => [serviceTypes[candidate.laneId], candidate]));
  const columns = JSON.parse(fs.readFileSync(path.join(ROOT, "content/daily-edition-columns.json"), "utf8"));
  const story = structuredClone(storyCandidate.story);
  story.status = "published";
  story.publishedAt = "2026-08-12T23:30:00Z";
  story.updatedAt = "2026-08-13T03:53:37Z";
  story.lastCheckedAt = "2026-08-13T03:53:37Z";
  story.sourceApproval = { status: "approved", record: "/operations/product-stewards/newsstand/evidence/stories/ai-work-logs-can-carry-secrets.json" };
  const deskTypes = ["paige_tip", "promptoscope", "career_life", "mme_claio", "song", "did_you_know", "town_note", "curiosity", "fiction"];
  const desks = deskTypes.map((type) => {
    const candidate = serviceByType.get(type);
    if (!candidate) return { type, state: "empty", recordId: null, emptyState: columns.emptyStates[type] };
    return {
      type,
      state: "ready",
      recordId: candidate.storage.recordId,
      headline: candidate.headline,
      summary: candidate.body,
      destination: candidate.destination?.startsWith("/newsstand.html#daily-") ? null : candidate.destination || null
    };
  });
  const sourceIdentity = {
    radarPath: "operations/product-stewards/newsstand/editorial-intake/2026-08-12.md",
    radarSha256: sha256(fs.readFileSync(path.join(ROOT, "operations/product-stewards/newsstand/editorial-intake/2026-08-12.md"))),
    storiesPath: "content/newsstand-stories.js",
    storiesSha256: sha256(fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"))),
    columnsPath: "content/daily-edition-columns.json",
    columnsSha256: sha256(fs.readFileSync(path.join(ROOT, "content/daily-edition-columns.json")))
  };
  const envelope = {
    schemaVersion: "daily-private-issue-v1", mode: "PRIVATE_DRAFT_ONLY", editionDate: "2026-08-12",
    editorialTimeZone: "America/Vancouver", disposition: "CANDIDATES_PENDING_REVIEW", status: "PRIVATE_REVIEW_DRAFT",
    storyIds: [story.id], storySnapshots: [story], desks, sourceIdentity, canonicalWrite: false, deployActionTaken: false
  };
  return {
    editionDate: "2026-08-12", editorialTimeZone: "America/Vancouver", status: "complete",
    disposition: "candidates_pending_review", storyIds: [story.id], stories: [story],
    serviceRecordIds: desks.filter((desk) => desk.state === "ready").map((desk) => desk.recordId), desks,
    sourceIdentity, envelopeSha256: sha256(`${canonicalJson(envelope)}\n`),
    admission: {
      decision: "ACCEPT_LOCAL_CANONICAL_WRITE", reviewedAt: "2026-08-13T03:53:37Z",
      reviewedBy: "independent-complete-daily-review-fixture", reviewerRole: "Independent complete Daily candidate reviewer"
    }
  };
}

function mime(file) {
  const ext = path.extname(file);
  return {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".webp": "image/webp",
    ".woff2": "font/woff2",
    ".mp3": "audio/mpeg"
  }[ext] || "application/octet-stream";
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, "http://127.0.0.1");
  if (requestUrl.pathname === "/content/site/newsstand-catchup-v1.js" && process.env.NEWSSTAND_CATCHUP_CALIBRATION) {
    let source = fs.readFileSync(path.join(ROOT, "content", "site", "newsstand-catchup-v1.js"), "utf8");
    if (process.env.NEWSSTAND_CATCHUP_CALIBRATION === "bypass-access-gate") {
      source = source.replace('if (dataset.state !== "ready") {', 'if (false) {');
    }
    if (process.env.NEWSSTAND_CATCHUP_CALIBRATION === "visitor-date-gate") {
      source = source.replaceAll(
        'Date.parse(item.admission.reviewedAt) <= Date.now();',
        'Date.parse(item.admission.reviewedAt) <= Date.now() && item.editionDate <= "2026-08-03";'
      );
    }
    response.writeHead(200, { "content-type": "text/javascript; charset=utf-8" });
    response.end(source);
    return;
  }
  if (requestUrl.pathname === "/content/newsstand-stories.js") {
    let fixture = "base";
    try {
      fixture = new URL(request.headers.referer).searchParams.get("fixture") || "base";
    } catch {}
    const body = fixtureScript(fixture);
    response.writeHead(200, { "content-type": "text/javascript; charset=utf-8" });
    response.end(body);
    return;
  }
  if (requestUrl.pathname === "/content/daily-edition-columns.json") {
    try {
      const fixture = new URL(request.headers.referer).searchParams.get("fixture");
      if (fixture === "columns-load-failure") {
        response.writeHead(503);
        response.end("intentional Daily columns load failure");
        return;
      }
      if (fixture === "same-date-injection") {
        const value = JSON.parse(fs.readFileSync(path.join(ROOT, "content/daily-edition-columns.json"), "utf8"));
        const injected = structuredClone(value.records.find((record) => record.editionDate === "2026-08-03" && record.type === "paige_tip"));
        injected.id = "UNADMITTED-SAME-DATE-SERVICE";
        injected.editionDate = "2026-08-04";
        injected.headline = "UNADMITTED SAME-DATE SERVICE";
        value.records.push(injected);
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify(value));
        return;
      }
    } catch {}
  }
  if (requestUrl.pathname === "/content/newsstand-daily-issues.json") {
    try {
      const fixture = new URL(request.headers.referer).searchParams.get("fixture");
      if (["pre-release", "post-release"].includes(fixture)) {
        const referer = new URL(request.headers.referer);
        const clock = TEST_CLOCKS[referer.searchParams.get("clock") || "same-day"] || TEST_CLOCKS["same-day"];
        const value = JSON.parse(fs.readFileSync(path.join(ROOT, "content/newsstand-daily-issues.json"), "utf8"));
        const issue = value.issues.find((item) => item.editionDate === "2026-08-04");
        issue.admission.reviewedAt = new Date(new Date(clock).getTime() + (fixture === "pre-release" ? 1 : -1)).toISOString();
        value.issues = value.issues.filter((item) => Date.parse(item.admission.reviewedAt) <= Date.parse(clock));
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify(value));
        return;
      }
      if (fixture === "daily-issues-load-failure") {
        response.writeHead(503);
        response.end("intentional canonical Daily issue-store load failure");
        return;
      }
      if (fixture === "post-validation-memory-tamper") {
        const value = JSON.parse(fs.readFileSync(path.join(ROOT, "content/newsstand-daily-issues.json"), "utf8"));
        value.issues = value.issues.filter((issue) => issue.editionDate === "2026-08-03");
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify(value));
        return;
      }
      if (fixture === "daily-issues-tampered") {
        const value = JSON.parse(fs.readFileSync(path.join(ROOT, "content/newsstand-daily-issues.json"), "utf8"));
        const archivedIssue = value.issues.find((issue) => issue.editionDate === "2026-08-03");
        const readyDesk = archivedIssue.desks.find((desk) => desk.state === "ready");
        readyDesk.headline = "FORGED STRUCTURALLY VALID DESK COPY";
        readyDesk.summary = "Forged summary that preserves the accepted shape and identifiers.";
        readyDesk.destination = "/newsstand.html?forged=1";
        archivedIssue.stories[0].headline = "FORGED ARCHIVED STORY SNAPSHOT";
        value.issues.find((issue) => issue.editionDate === "2026-08-04").desks[0].emptyState = "Forged but structurally valid quiet-desk copy.";
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify(value));
        return;
      }
      if (fixture === "daily-review-candidate") {
        const value = JSON.parse(fs.readFileSync(path.join(ROOT, "content/newsstand-daily-issues.json"), "utf8"));
        value.issues.push(completeDailyReviewFixture());
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify(value));
        return;
      }
      const referer = new URL(request.headers.referer);
      const clock = TEST_CLOCKS[referer.searchParams.get("clock") || "same-day"] || TEST_CLOCKS["same-day"];
      const value = JSON.parse(fs.readFileSync(path.join(ROOT, "content/newsstand-daily-issues.json"), "utf8"));
      value.issues = value.issues.filter((item) => Date.parse(item.admission.reviewedAt) <= Date.parse(clock));
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(value));
      return;
    } catch {}
  }
  if (requestUrl.pathname === "/newsstand.html") {
    const clock = TEST_CLOCKS[requestUrl.searchParams.get("clock") || "same-day"] || TEST_CLOCKS["same-day"];
    const clockScript = `<script>(()=>{const NativeDate=Date;const fixed=${JSON.stringify(clock)};function FixedDate(...args){if(!(this instanceof FixedDate))return new NativeDate(fixed).toString();return new NativeDate(...(args.length?args:[fixed]));}FixedDate.prototype=NativeDate.prototype;Object.setPrototypeOf(FixedDate,NativeDate);FixedDate.now=()=>new NativeDate(fixed).getTime();window.Date=FixedDate;})();</script>`;
    const body = fs.readFileSync(path.join(ROOT, "newsstand.html"), "utf8").replace("<head>", "<head>" + clockScript);
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(body);
    return;
  }
  const relative = requestUrl.pathname === "/" ? "newsstand.html" : requestUrl.pathname.replace(/^\/+/, "");
  const file = path.resolve(ROOT, relative);
  if (!file.startsWith(ROOT + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": mime(file) });
  fs.createReadStream(file).pipe(response);
});

const previewPort = process.env.NEWSSTAND_PREVIEW_ONLY ? Number(process.env.NEWSSTAND_PREVIEW_PORT || 41731) : 0;
await new Promise((resolve) => server.listen(previewPort, "127.0.0.1", resolve));
const siteOrigin = `http://127.0.0.1:${server.address().port}`;
if (process.env.NEWSSTAND_PREVIEW_ONLY) {
  console.log(`${siteOrigin}/newsstand.html?fixture=daily-review-candidate&clock=candidate-day`);
  await new Promise((resolve) => {
    process.once("SIGINT", resolve);
    process.once("SIGTERM", resolve);
  });
  server.close();
  process.exit(0);
}
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-newsstand-chrome-"));
const chrome = childProcess.spawn(CHROME, [
  "--headless=new",
  "--remote-debugging-port=0",
  `--user-data-dir=${profile}`,
  "--no-first-run",
  "--disable-default-apps",
  "--disable-background-networking",
  "--disable-component-update",
  "--disable-sync",
  "--metrics-recording-only",
  "--host-resolver-rules=MAP fonts.googleapis.com ~NOTFOUND, MAP fonts.gstatic.com ~NOTFOUND",
  "about:blank"
], { stdio: ["ignore", "ignore", "pipe"] });

let devtoolsResolve;
let devtoolsReject;
const devtoolsPromise = new Promise((resolve, reject) => {
  devtoolsResolve = resolve;
  devtoolsReject = reject;
});
let stderr = "";
chrome.stderr.on("data", (chunk) => {
  stderr += chunk.toString();
  const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
  if (match) devtoolsResolve(match[1]);
});
chrome.once("error", devtoolsReject);
const timeout = setTimeout(() => devtoolsReject(new Error("Chrome DevTools did not start")), 10000);
let devtoolsEndpoint = null;

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
    const handler = pending.get(message.id);
    pending.delete(message.id);
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

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function openPage(pathname, options = {}) {
  const target = await fetch(
    `${new URL(devtoolsEndpoint).origin.replace("ws:", "http:")}/json/new?${encodeURIComponent("about:blank")}`,
    { method: "PUT" }
  ).then((response) => response.json());
  const socket = await connect(target.webSocketDebuggerUrl);
  const client = cdp(socket);
  await client.call("Runtime.enable");
  await client.call("Page.enable");
  await client.call("Page.bringToFront");
  if (options.timezone) {
    await client.call("Emulation.setTimezoneOverride", { timezoneId: options.timezone });
  }
  await client.call("Emulation.setDeviceMetricsOverride", {
    width: options.width || 1280,
    height: options.height || 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  if (options.reducedMotion) {
    await client.call("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }]
    });
  }
  await client.call("Page.navigate", { url: siteOrigin + pathname });
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const ready = await client.call("Runtime.evaluate", {
      expression: "document.readyState === 'complete' && !!document.querySelector('#ns-title')",
      returnByValue: true
    });
    if (ready.result.value) break;
    await sleep(50);
  }
  await sleep(100);
  return client;
}

async function value(client, expression) {
  const result = await client.call("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function waitForValue(client, expression, expected, label) {
  let actual;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    actual = await value(client, expression);
    if (Object.is(actual, expected)) return actual;
    await sleep(25);
  }
  throw new Error(label + " did not settle to the expected value; actual=" + JSON.stringify(actual));
}

async function checkNewsstandFonts(client, label) {
  const fontState = await value(client, `(async () => {
    const loaded = await Promise.all([
      document.fonts.load('400 16px "Jost"'),
      document.fonts.load('italic 400 16px "Jost"'),
      document.fonts.load('400 40px "Anton"')
    ]);
    await document.fonts.ready;
    const resources = performance.getEntriesByType('resource')
      .map((entry) => new URL(entry.name).pathname)
      .filter((pathname) => pathname.startsWith('/assets/fonts/newsstand/'))
      .sort();
    return {
      faceCounts: loaded.map((faces) => faces.length),
      jostReady: document.fonts.check('400 16px "Jost"'),
      jostItalicReady: document.fonts.check('italic 400 16px "Jost"'),
      antonReady: document.fonts.check('400 40px "Anton"'),
      bodyFamily: getComputedStyle(document.querySelector('.ns-page')).fontFamily,
      displayFamily: getComputedStyle(document.querySelector('.ns-daily-news h3')).fontFamily,
      resources
    };
  })()`);
  check(fontState.faceCounts, [1, 1, 1], `${label}: exact local font faces loaded`);
  check(fontState.jostReady && fontState.jostItalicReady && fontState.antonReady, true, `${label}: FontFaceSet reports every NewsStand face ready`);
  check(fontState.bodyFamily.startsWith("Jost"), true, `${label}: body computes to Jost`);
  check(fontState.displayFamily.startsWith("Anton"), true, `${label}: display computes to Anton`);
  check(fontState.resources, [
    "/assets/fonts/newsstand/anton-latin.woff2",
    "/assets/fonts/newsstand/jost-italic-latin.woff2",
    "/assets/fonts/newsstand/jost-normal-latin.woff2"
  ], `${label}: only self-hosted NewsStand font resources rendered`);
}

async function act(client, expression) {
  await value(client, expression);
  await sleep(120);
}

async function waitForHistoryRestoration(client, previousId = "") {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const state = await value(client, `(() => { const reader = document.querySelector('#paper-counter'); return { state: reader.getAttribute('data-ns-restoration'), id: reader.getAttribute('data-ns-restoration-id') }; })()`);
    if (state.state === "settled" && state.id && state.id !== previousId) return state.id;
    await sleep(20);
  }
  throw new Error("NewsStand history restoration did not reach its observable settled state");
}

async function pressEnter(client) {
  await client.call("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Enter",
    code: "Enter",
    windowsVirtualKeyCode: 13,
    nativeVirtualKeyCode: 13
  });
  await client.call("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Enter",
    code: "Enter",
    windowsVirtualKeyCode: 13,
    nativeVirtualKeyCode: 13
  });
  await sleep(160);
}

let checks = 0;
function check(actual, expected, label) {
  assert.deepEqual(actual, expected, label);
  checks += 1;
}

async function checkPaperContentsCoVisible(client, label) {
  check(await value(client, `(async () => {
    document.documentElement.style.setProperty('scroll-behavior', 'auto', 'important');
    const papers = Array.from(document.querySelectorAll('.ns-publication'));
    for (const paper of papers) {
      paper.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'nearest' });
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      paper.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'nearest' });
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const paperRect = paper.getBoundingClientRect();
      const children = [
        paper.querySelector('strong'),
        paper.querySelector('.ns-publication__job'),
        paper.querySelector('.ns-publication__status'),
        paper.querySelector('.ns-publication__contents'),
        paper.querySelector('.ns-publication__action')
      ];
      if (paperRect.top < -1 || paperRect.bottom > window.innerHeight + 1) return false;
      if (!children.every((child) => {
        if (!child || child.offsetParent === null) return false;
        const rect = child.getBoundingClientRect();
        return rect.top >= paperRect.top - 1 && rect.bottom <= paperRect.bottom + 1 &&
          rect.left >= paperRect.left - 1 && rect.right <= paperRect.right + 1;
      })) return false;
    }
    return true;
  })()`), true, label);
}

async function captureEvidence(client, filename, scrollSelector = null, preserveCurrentScroll = false) {
  if (!EVIDENCE_DIR || (EVIDENCE_FILTER && filename !== "__settle-only.png" && !filename.includes(EVIDENCE_FILTER))) return;
  fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
  await client.call("Page.bringToFront");
  await client.call("Emulation.setScrollbarsHidden", { hidden: true });
  await value(client, `(async () => {
    let freeze = document.querySelector('#newsstand-evidence-freeze');
    if (!freeze) {
      freeze = document.createElement('style');
      freeze.id = 'newsstand-evidence-freeze';
      freeze.textContent = [
        'html { scroll-behavior: auto !important; scrollbar-width: none !important; }',
        '*::-webkit-scrollbar { display: none !important; }',
        '*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }'
      ].join(' ');
      document.head.appendChild(freeze);
    }
    if (document.fonts) {
      await Promise.all([
        document.fonts.load('16px "Jost"'),
        document.fonts.load('40px "Anton"')
      ]);
      await document.fonts.ready;
      if (!document.fonts.check('16px "Jost"') || !document.fonts.check('40px "Anton"')) {
        throw new Error('NewsStand evidence fonts did not settle');
      }
    }
    const selector = ${JSON.stringify(scrollSelector)};
    const target = selector ? document.querySelector(selector) : null;
    if (target) {
      const rect = target.getBoundingClientRect();
      const header = document.querySelector('.topbar');
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const offset = rect.height >= window.innerHeight - headerHeight - 20
        ? headerHeight + 8
        : ((window.innerHeight - rect.height) / 2);
      window.scrollTo(0, Math.max(0, Math.round(window.scrollY + rect.top -
        offset)));
    } else if (!${JSON.stringify(preserveCurrentScroll)}) {
      window.scrollTo(0, 0);
    }
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    const selection = window.getSelection && window.getSelection();
    if (selection) selection.removeAllRanges();
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  })()`);
  const shot = await client.call("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false
  });
  fs.writeFileSync(path.join(EVIDENCE_DIR, filename), Buffer.from(shot.data, "base64"));
}

async function captureElementEvidence(client, filename, selector) {
  if (!EVIDENCE_DIR || (EVIDENCE_FILTER && !filename.includes(EVIDENCE_FILTER))) return;
  fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
  await captureEvidence(client, "__settle-only.png", selector);
  const clip = await value(client, `(() => {
    const node = document.querySelector(${JSON.stringify(selector)});
    if (!node) return null;
    const rect = node.getBoundingClientRect();
    return { x: Math.max(0, rect.left + window.scrollX), y: Math.max(0, rect.top + window.scrollY), width: rect.width, height: rect.height, scale: 1 };
  })()`);
  if (!clip || clip.width <= 0 || clip.height <= 0) throw new Error(`Evidence selector unavailable: ${selector}`);
  const shot = await client.call("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
    clip
  });
  fs.writeFileSync(path.join(EVIDENCE_DIR, filename), Buffer.from(shot.data, "base64"));
  fs.rmSync(path.join(EVIDENCE_DIR, "__settle-only.png"), { force: true });
}

try {
  devtoolsEndpoint = await devtoolsPromise;
  clearTimeout(timeout);

  const base = await openPage("/newsstand.html", { width: 1440, height: 1000 });
  await waitForValue(base, "document.querySelector('#ns-title').textContent", "The Daily and The Weekly and The Big Picture are current.", "same-day Daily admission");
  check(await value(base, "document.querySelector('#ns-title').textContent === 'The Daily and The Weekly and The Big Picture are current.'"), true, "base arrival includes the canonical current-date Daily and Weekly");
  check(await value(base, "document.querySelector('.ns-publication [data-status-for=\"daily\"]').textContent === 'Current · checked August 4, 2026'"), true, "canonical Daily label uses its Vancouver edition date");
  await waitForValue(base, "document.querySelector('#paper-counter').hidden", false, "Daily-first default paper");
  check(await value(base, "document.querySelector('.ns-daily-issue')?.dataset.dailyDate"), "2026-08-04", "hashless NewsStand opens the latest admitted Daily automatically");
  check(await value(base, "getComputedStyle(document.querySelector('.ns-state__primary')).display"), "none", "the rejected choose-a-paper step is not visible");
  const rollover = await openPage("/newsstand.html?clock=next-day", { width: 390, height: 844, reducedMotion: true });
  await waitForValue(rollover, "document.querySelector('.ns-publication [data-status-for=\"daily\"]').textContent", "Latest complete edition · August 4, 2026", "next-day Daily rollover");
  check(await value(rollover, "document.querySelector('#ns-title').textContent === 'The Weekly and The Big Picture are current.'"), true, "next-day arrival no longer claims the prior Daily is current");
  check(await value(rollover, "document.querySelector('.ns-daily-issue')?.dataset.dailyDate"), "2026-08-04", "next-day hashless route opens the latest complete Daily rather than pretending it is current");
  check(await value(rollover, "document.querySelectorAll('.ns-publication').length"), 3, "next-day navigation remains Daily, Weekly and Big Picture only");
  await captureEvidence(rollover, "current-date-state-390.png");
  check(await value(rollover, "document.querySelector('.ns-daily-issue').dataset.dailyDate"), "2026-08-04", "next-day Daily opens the exact latest complete edition");
  rollover.close();
  const honolulu = await openPage("/newsstand.html?clock=released-worldwide", { width: 390, height: 844, timezone: "Pacific/Honolulu" });
  await waitForValue(honolulu, "document.querySelector('.ns-publication [data-status-for=\"daily\"]').textContent", "Current · checked August 4, 2026", "released Daily in Honolulu");
  await waitForValue(honolulu, "document.querySelector('#ns-catchup-since').max", "2026-08-04", "released Daily Catch Me Up maximum in Honolulu");
  await act(honolulu, "localStorage.setItem('laidies_newsstand_seen_v1', JSON.stringify({lastVisit:{updated_at:'2026-08-05T00:30:00Z'},seen:{}}));window.dispatchEvent(new CustomEvent('laidies:continuation-change'))");
  await waitForValue(honolulu, "document.querySelector('#ns-catchup-since').value", "2026-08-04", "stable visit date in Honolulu");
  honolulu.close();
  const kiritimati = await openPage("/newsstand.html?clock=released-worldwide", { width: 390, height: 844, timezone: "Pacific/Kiritimati" });
  await waitForValue(kiritimati, "document.querySelector('.ns-publication [data-status-for=\"daily\"]').textContent", "Current · checked August 4, 2026", "literal edition label in Kiritimati");
  check(await value(kiritimati, "document.querySelector('.ns-daily-issue')?.dataset.dailyDate === '2026-08-04'"), true, "date-only Daily labels and the open issue do not shift to August 5 in UTC+14");
  await act(kiritimati, "localStorage.setItem('laidies_newsstand_seen_v1', JSON.stringify({lastVisit:{updated_at:'2026-08-05T00:30:00Z'},seen:{}}));window.dispatchEvent(new CustomEvent('laidies:continuation-change'))");
  await waitForValue(kiritimati, "document.querySelector('#ns-catchup-since').value", "2026-08-04", "stable visit date in Kiritimati");
  kiritimati.close();
  const preRelease = await openPage("/newsstand.html?fixture=pre-release&clock=released-worldwide", { width: 390, height: 844, timezone: "Pacific/Honolulu" });
  await waitForValue(preRelease, "document.querySelector('.ns-publication [data-status-for=\"daily\"]').textContent", "Latest complete edition · August 3, 2026", "one millisecond pre-release issue remains hidden");
  preRelease.close();
  const postRelease = await openPage("/newsstand.html?fixture=post-release&clock=released-worldwide", { width: 390, height: 844, timezone: "Pacific/Honolulu" });
  await waitForValue(postRelease, "document.querySelector('.ns-publication [data-status-for=\"daily\"]').textContent", "Current · checked August 4, 2026", "one millisecond post-release issue is available");
  postRelease.close();
  await base.call("Page.bringToFront");
  check(await value(base, "document.querySelectorAll('.ns-publication').length"), 3, "three top-level publication choices");
  check(await value(base, "document.querySelector('.ns-publication[data-edition=\"breaking\"]')"), null, "Breaking is not a fourth top-level choice");
  check(await value(base, "Array.from(document.querySelectorAll('.ns-publication')).every((paper) => paper.offsetParent === null)"), true, "the superseded outer rack stays hidden while the Daily is open");
  check(await value(base, "Array.from(document.querySelectorAll('.ns-daily-section-switcher button')).filter((button) => button.offsetParent !== null).map((button) => button.textContent.trim()).join('|')"), "The Daily|The Weekly|The Big Picture|Archive + topics", "the newspaper itself carries the one visible publication switcher");
  check(await value(base, "document.querySelectorAll('.ns-publication__contents').length"), 3, "three live publication contents regions");
  check(await value(base, "document.querySelector('[data-contents-for=\"tribune\"]').getAttribute('data-story-count')"), "1", "Tribune eligible story count before pull");
  check(await value(base, "document.querySelector('[data-contents-for=\"tribune\"] .ns-publication__headline').textContent === window.NEWSSTAND_DATA.stories.find((story) => story.edition === 'tribune').headline"), true, "Tribune canonical lead headline before pull");
  check(await value(base, "(() => { const story = window.NEWSSTAND_DATA.stories.find((item) => item.edition === 'tribune'); const text = String(story.laidies_read || story.the_story).replace(/<[^>]*>/g, ' ').trim(); const match = text.match(/^(.+?[.!?])\\s/); return document.querySelector('[data-contents-for=\"tribune\"] .ns-publication__teaser').textContent === (match ? match[1] : text); })()"), true, "Tribune existing first-sentence teaser before pull");
  check(await value(base, "document.querySelector('.ns-daily-breaking')"), null, "quiet Breaking does not create a false strip inside Daily");
  check(await value(base, "document.querySelector('[data-contents-for=\"weekly\"]').textContent.includes('moving the handoff line')"), true, "current Weekly exposes its admitted lead story");
  check(await value(base, "(() => { const node = document.querySelector('[data-contents-for=\"daily\"]'); return Number(node.getAttribute('data-service-count')) === 0 && node.textContent.includes('Quiet edition') && node.textContent.includes('August 4, 2026'); })()"), true, "current Daily paper previews the admitted quiet edition without prior-date carryover");
  check(await value(base, "document.querySelector('.ns-publication [data-status-for=\"daily\"]').textContent === 'Current · checked August 4, 2026' && document.querySelector('.ns-daily-issue').dataset.dailyDate === '2026-08-04'"), true, "Daily choice and open issue share the admitted date");
  check(await value(base, "(() => { const held = window.NEWSSTAND_DATA.stories.filter((story) => story.status === 'hold').map((story) => story.headline); return Array.from(document.querySelectorAll('.ns-publication__contents')).every((node) => held.every((headline) => !node.textContent.includes(headline))); })()"), true, "held headlines never leak onto papers");
  check(await value(base, `(() => {
    const eligible = window.NEWSSTAND_DATA.stories.filter((story) =>
      ['published', 'corrected'].includes(story.status));
    const expected = new Set(eligible.flatMap((story) => story.tags));
    return document.querySelectorAll('.ns-topic-button').length === expected.size;
  })()`), true, "browse by topic derives one control for every eligible story topic");
  check(await value(base, "!document.querySelector('#ns-topic-buttons').textContent.includes('privacy') && !document.querySelector('#ns-topic-buttons').textContent.includes('health')"), true, "held-story topics never leak into browse controls");
  check(await value(base, "(() => { const action = (edition) => document.querySelector('.ns-publication[data-edition=\"' + edition + '\"] .ns-publication__action').textContent; return action('daily') === 'Pull this paper · Opens here' && action('weekly') === 'Pull this paper · Opens here' && action('tribune') === 'Pull this paper · Opens here'; })()"), true, "every visible publication action matches its truthful state");
  check(await value(base, `(() => {
    const eligible = window.NEWSSTAND_DATA.stories.filter((story) =>
      ['published', 'corrected'].includes(story.status));
    const expected = Array.from(new Set(eligible.flatMap((story) => story.tags)))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
      .slice(0, 3);
    const hint = document.querySelector('#ns-search-hint').textContent;
    return expected.every((topic) => hint.includes(topic)) &&
      !hint.includes('privacy') && !hint.includes('health');
  })()`), true, "search hint derives only from eligible topics");
  check(await value(base, "document.querySelectorAll('.ns-daily-issue').length"), 1, "Daily opens the complete dated paper");
  check(await value(base, "document.querySelector('.ns-daily-issue').dataset.dailyDate"), "2026-08-04", "current Daily opens the exact canonical edition date");
  check(await value(base, `document.querySelectorAll('.ns-daily-desk[data-desk-state="ready"]').length ===
    Number(document.querySelector('[data-contents-for="daily"]').dataset.serviceCount)`), true, "Daily exposes every and only admitted ready service desk");
  check(await value(base, "document.querySelectorAll('.ns-daily-desk[data-desk-state=\"ready\"]').length"), 0, "quiet Daily has no fabricated ready service desk");
  check(await value(base, "document.querySelector('.ns-daily-news').textContent.includes('No consequential report was filed.') && !document.querySelector('.ns-daily-news').textContent.includes('remains at its accuracy gate')"), true, "quiet Daily evidence desk names a concluded quiet edition rather than a pending story");
  check(await value(base, "!['Make the follow-up do the remembering.','Your prompt brought no guest list.','Delegate the outcome, not every keystroke.','The Mini Backpack'].some((copy) => document.querySelector('.ns-daily-issue').textContent.includes(copy))"), true, "quiet Daily does not carry August 3 service items forward");
  check(await value(base, "document.querySelectorAll('.ns-daily-desk').length"), 0, "quiet Daily does not expose empty internal desk records");
  check(await value(base, "document.querySelectorAll('.ns-daily-brief-edition').length === 1 && document.querySelector('.ns-daily-brief-edition').textContent === 'Today’s edition is brief. More tomorrow.'"), true, "quiet Daily uses one compact visitor-facing edition note");
  check(await value(base, "['Did you know?','Town notes','Try this today','desk-by-desk','desks stayed quiet'].every((label) => !document.querySelector('.ns-daily-issue').textContent.includes(label))"), true, "quiet Daily hides unfilled feature labels and operational language");
  await captureEvidence(base, "desktop-daily-1440.png", ".ns-daily-issue");
  await act(base, "document.querySelector('#ns-return').click()");
  check(await value(base, "document.activeElement.dataset.edition"), "daily", "Daily return focus");
  check(await value(base, "Array.from(document.querySelectorAll('.ns-publication')).every((paper) => paper.offsetWidth > 0 && paper.offsetHeight > 0 && paper.querySelector('.ns-publication__job').offsetParent && paper.querySelector('.ns-publication__status').offsetParent)"), true, "the rack fallback exposes all paper jobs and states only after the reader closes");
  await checkPaperContentsCoVisible(base, "closed-rack paper identity contents and action co-visible at 1440");
  await act(base, "localStorage.setItem('laidies_newsstand_seen_v1', JSON.stringify({lastVisit:{updated_at:'2026-07-29T12:00:00Z'},seen:{}}));window.dispatchEvent(new CustomEvent('laidies:continuation-change'))");
  check(await value(base, "document.querySelector('#ns-catchup-since').value"), "2026-07-29", "asynchronous continuation updates the visible Catch Me Up start date");
  check(await value(base, "(() => { const tomorrow=new Date(); tomorrow.setDate(tomorrow.getDate()+1); const label=tomorrow.toLocaleDateString('en-CA',{year:'numeric',month:'long',day:'numeric'}); return !document.querySelector('#ns-state-detail').textContent.includes(label); })()"), true, "arrival never presents the UTC next day as the local desk-check date");
  if (process.env.NEWSSTAND_CATCHUP_CALIBRATION === "future-date-default") {
    await act(base, "document.querySelector('#ns-catchup-since').max='2999-12-31';document.querySelector('#ns-catchup-since').value='2999-12-31'");
  }
  check(await value(base, "(() => { const input = document.querySelector('#ns-catchup-since'); return input.max === '2026-08-04' && input.value <= input.max; })()"), true, "Catch Me Up follows the newest released edition rather than the visitor's calendar");
  check(await value(base, "document.querySelector('#ns-catchup-since').value='2999-12-31';document.querySelector('#ns-catchup-run').click();document.querySelector('#ns-catchup-since').value === document.querySelector('#ns-catchup-since').max"), true, "Catch Me Up clamps a scripted future start date to the newest released edition");
  check(await value(base, "document.querySelector('#ns-catchup-since').value='2026-07-30';document.querySelector('#ns-catchup-since').dispatchEvent(new Event('input'));document.querySelector('#ns-catchup-run').click();document.querySelectorAll('.ns-catchup-item').length >= 1"), true, "Catch Me Up preserves eligible dated history");
  check(await value(base, "document.querySelector('[data-catchup-role=\"weekly\"] h3').textContent === window.NEWSSTAND_DATA.stories.find((story) => story.edition === 'weekly' && story.status === 'published').headline"), true, "Catch Me Up shows the current Weekly even when it predates the visitor's history cutoff");
  check(await value(base, "Array.from(document.querySelectorAll('[data-catchup-role]')).map((node) => node.dataset.catchupRole).join(',')"), "daily,weekly,history", "Catch Me Up orders Daily then Weekly then older history");
  check(await value(base, "document.querySelector('[data-catchup-role=\"daily\"]') !== null"), true, "Catch Me Up retains the latest complete Daily with its exact edition date");
  check(await value(base, "Array.from(document.querySelectorAll('.ns-catchup-item')).some((item) => item.textContent.includes('Draft first. Check second.'))"), true, "Catch Me Up preserves the July 31 Paige tip");
  check(await value(base, "Array.from(document.querySelectorAll('.ns-catchup-item__state')).every((node) => node.textContent.includes('Archive') || node.textContent === 'Filed')"), true, "Catch Me Up labels older stories as archive rather than current publication");
  const sharedDaily = await openPage("/newsstand.html?daily=2026-08-03", { width: 390, height: 844 });
  const unavailableSharedDaily = await openPage("/newsstand.html?daily=2026-08-02", { width: 390, height: 844 });
  const failedColumnsSharedDaily = await openPage("/newsstand.html?daily=2026-08-03&fixture=columns-load-failure", { width: 390, height: 844 });
  const failedIssueStore = await openPage("/newsstand.html?fixture=daily-issues-load-failure", { width: 390, height: 844 });
  const tamperedIssueStore = await openPage("/newsstand.html?fixture=daily-issues-tampered", { width: 390, height: 844 });
  const tamperedStorySource = await openPage("/newsstand.html?daily=2026-08-03&fixture=admitted-story-tampered", { width: 390, height: 844 });
  const memoryTamper = await openPage("/newsstand.html?fixture=post-validation-memory-tamper", { width: 390, height: 844 });
  const sameDateInjection = await openPage("/newsstand.html?fixture=same-date-injection", { width: 390, height: 844 });
  try {
    await sleep(600);
    check(await value(sharedDaily, "document.querySelector('#paper-counter').hidden"), false, "a shared eligible Daily URL opens the exact paper");
    check(await value(sharedDaily, "document.querySelector('.ns-daily-issue').dataset.dailyDate"), "2026-08-03", "shared Daily preserves its exact edition date");
    check(await value(sharedDaily, "['Make the follow-up do the remembering.','Your prompt brought no guest list.','Delegate the outcome, not every keystroke.','The Mini Backpack'].every((copy) => document.querySelector('.ns-daily-issue').textContent.includes(copy))"), true, "archived August 3 Daily preserves all admitted service items");
    check(await value(unavailableSharedDaily, "document.querySelector('#paper-counter').hidden && document.querySelector('#ns-catchup-results').textContent.includes('not available')"), true, "an unavailable shared Daily fails to a truthful notice");
    check(await value(failedColumnsSharedDaily, "document.querySelector('#paper-counter').hidden"), false, "shared Daily still opens when optional service columns fail to load");
    check(await value(failedColumnsSharedDaily, "document.querySelector('.ns-daily-issue').dataset.dailyDate"), "2026-08-03", "columns failure preserves the exact canonical Daily date");
    check(await value(failedColumnsSharedDaily, "document.querySelectorAll('.ns-daily-desk[data-desk-state=\"ready\"]').length"), 4, "columns failure preserves the four immutable admitted archive desks");
    check(await value(failedIssueStore, "document.querySelector('#ns-title').textContent === 'The Weekly and The Big Picture are current.' && document.querySelector('.ns-publication [data-status-for=\"daily\"]').textContent === 'Latest complete edition · August 3, 2026'"), true, "canonical issue-store failure preserves the truthful static fallback without claiming August 4");
    check(await value(tamperedIssueStore, "document.querySelector('#ns-title').textContent === 'The Weekly and The Big Picture are current.' && document.querySelector('.ns-publication [data-status-for=\"daily\"]').textContent === 'Latest complete edition · August 3, 2026'"), true, "structurally valid but checksum-mismatched canonical issue copy fails closed to the truthful static fallback");
    check(await value(tamperedStorySource, "document.querySelector('.ns-daily-issue').dataset.dailyDate === '2026-08-03' && document.body.textContent.includes('Europe’s AI transparency rules started August 2') && !document.body.textContent.includes('FORGED ADMITTED-ID STORY COPY')"), true, "later canonical story changes cannot erase or replace an immutable archived Daily snapshot");
    const memoryTamperState = await value(memoryTamper, "JSON.stringify({status:document.querySelector('[data-status-for=\"daily\"]').textContent,contents:document.querySelector('[data-contents-for=\"daily\"]').textContent,count:document.querySelector('[data-contents-for=\"daily\"]').dataset.serviceCount||null,title:document.querySelector('#ns-title').textContent,error:window.__newsstandDailyIssueError||null})");
    check(JSON.parse(memoryTamperState).count, "4", "snapshot fixture waits for the exact admitted August 3 issue");
    await act(memoryTamper, `(() => {
      const story = window.NEWSSTAND_DATA.stories.find((item) => item.id === 'eu-ai-act-transparency-starts');
      story.headline = 'FORGED POST-VALIDATION HEADLINE';
      story.the_story = 'FORGED POST-VALIDATION BODY';
      story.laidies_read = 'FORGED POST-VALIDATION ANALYSIS';
      story.slug = 'forged-post-validation-route';
      story.sources[0].url = 'https://example.invalid/post-validation';
    })()`);
    await act(memoryTamper, "document.querySelector('.ns-publication[data-edition=\"daily\"]').click()");
    check(await value(memoryTamper, "document.querySelector('.ns-daily-news').textContent.includes('Europe’s AI transparency rules started August 2') && !document.body.textContent.includes('FORGED POST-VALIDATION')"), true, "Daily renders the admitted immutable snapshot after global memory mutation");
    await act(memoryTamper, "document.querySelector('.ns-daily-news a').click()");
    check(await value(memoryTamper, "document.querySelector('.ns-article').textContent.includes('Article 50 of the European Union’s AI Act') && document.querySelector('.ns-article a[href=\"https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems\"]') !== null && !document.body.textContent.includes('FORGED POST-VALIDATION')"), true, "full Daily article route remains bound to admitted body and source after global memory mutation");
    await act(sameDateInjection, "document.querySelector('.ns-publication[data-edition=\"daily\"]').click()");
    check(await value(sameDateInjection, "!document.querySelector('.ns-daily-issue').textContent.includes('UNADMITTED SAME-DATE STORY') && !document.querySelector('.ns-daily-issue').textContent.includes('UNADMITTED SAME-DATE SERVICE')"), true, "later same-date story and service rows cannot bypass the admitted Daily issue IDs/snapshot");
  } finally {
    sharedDaily.close();
    unavailableSharedDaily.close();
    failedColumnsSharedDaily.close();
    failedIssueStore.close();
    tamperedIssueStore.close();
    tamperedStorySource.close();
    memoryTamper.close();
    sameDateInjection.close();
  }
  check(await value(base, "(() => { const value = getComputedStyle(document.querySelector('.ns-catchup__intro > p:last-child')).color.match(/[0-9.]+/g).map(Number); const bg = getComputedStyle(document.querySelector('.ns-catchup')).backgroundColor.match(/[0-9.]+/g).map(Number); const lum = (rgb) => { const c=rgb.slice(0,3).map((v)=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}); return .2126*c[0]+.7152*c[1]+.0722*c[2]; }; const a=lum(value), b=lum(bg); return (Math.max(a,b)+.05)/(Math.min(a,b)+.05) >= 4.5; })()"), true, "Catch Me Up introduction meets text contrast");
  await captureEvidence(base, "desktop-catchup-1440.png", ".ns-catchup");
  await captureEvidence(base, "desktop-1440.png");
  await captureEvidence(base, "desktop-counter-1440.png", ".ns-publications");
  check(await value(base, "document.documentElement.scrollWidth <= window.innerWidth"), true, "1440 rack reflow");
  await act(base, "document.querySelector('.ns-publication[data-edition=\"weekly\"]').click()");
  check(await value(base, "document.querySelectorAll('.ns-front-story').length"), 1, "current Weekly opens its admitted listing");
  check(await value(base, "document.querySelector('.ns-front-story').textContent.includes('moving the handoff line')"), true, "Weekly lists the exact admitted synthesis");
  await act(base, "document.querySelector('.ns-publication[data-edition=\"tribune\"]').click()");
  check(await value(base, "document.querySelectorAll('.ns-front-story').length"), 1, "Tribune listing");
  check(await value(base, "document.activeElement.id"), "ns-reader-title", "open focus");
  await act(base, "document.querySelector('.ns-front-story').click()");
  check(await value(base, "document.querySelectorAll('.ns-article').length"), 1, "Tribune body");
  await act(base, "document.querySelector('#ns-return').click()");
  check(await value(base, "document.activeElement.dataset.edition"), "tribune", "paper return focus");
  await act(base, "document.querySelector('#ns-search-input').value='verification';document.querySelector('#ns-search-button').click()");
  check(await value(base, "document.querySelectorAll('.ns-front-story').length"), 1, "approved search result");
  await act(base, "document.querySelector('.ns-front-story').click()");
  await act(base, "document.querySelector('#ns-return').click()");
  check(await value(base, "document.activeElement.id"), "ns-search-button", "search return focus");
  await act(base, "document.querySelector('#ns-browse-all').click()");
  check(await value(base, "document.querySelectorAll('.ns-front-story').length"), 3, "browse all exposes the two admitted papers plus the released August 3 Daily snapshot at the historical test clock");
  check(await value(base, "!document.body.textContent.includes('Kimi K3’s weights are open') && !document.body.textContent.includes('The cyclone model is open')"), true, "browse all does not leak archive issues before their admission time");
  check(await value(base, "document.querySelector('#ns-reader-title').textContent"), "Newest first.", "browse all explains its ordering");
  check(await value(base, "document.activeElement.id"), "ns-reader-title", "browse all moves focus to the archive heading");
  await act(base, "document.querySelector('#ns-search-input').value=''");
  await captureEvidence(base, "desktop-archive-1440.png", ".ns-archive");
  await act(base, "document.querySelector('.ns-front-story').click()");
  await act(base, "document.querySelector('#ns-return').click()");
  check(await value(base, "document.activeElement.id"), "ns-browse-all", "archive story returns focus to browse all");
  await act(base, "document.querySelector('.ns-topic-button[data-topic=\"verification\"]').click()");
  check(await value(base, "document.querySelectorAll('.ns-front-story').length"), 1, "browse by topic shows the eligible matching issue");
  check(await value(base, "document.querySelector('#ns-reader-edition').textContent"), "Topic", "topic result identifies its browse mode");
  check(await value(base, "document.querySelector('#ns-reader-title').textContent"), "verification", "topic result keeps the selected topic visible");
  base.close();

  const candidateDaily = await openPage("/newsstand.html?fixture=daily-review-candidate&clock=candidate-day", { width: 1440, height: 1000 });
  await checkNewsstandFonts(candidateDaily, "Daily candidate");
  await waitForValue(candidateDaily, "document.querySelector('.ns-daily-issue')?.dataset.dailyDate", "2026-08-12", "complete Daily review candidate");
  check(await value(candidateDaily, "window.__newsstandDailyIssueError || null"), null, "complete Daily review fixture passes the exact issue-store validator");
  check(await value(candidateDaily, "document.querySelectorAll('.ns-daily-desk[data-desk-state=\"ready\"]').length"), 4, "complete Daily carries exactly four reviewed service features");
  check(await value(candidateDaily, "document.querySelectorAll('.ns-daily-service-grid--primary .ns-daily-desk__full').length === 4 && document.querySelectorAll('.ns-daily-service-grid--spotlight').length === 0"), true, "all four service features share one compact newspaper desk rail and keep their full text behind disclosures");
  check(await value(candidateDaily, "document.querySelector('.ns-daily-news h3').textContent"), "People published records of their AI work. Some contained passwords.", "complete Daily front uses the exact reviewed lead headline");
  check(await value(candidateDaily, "['Turn your work draft into a receipt list','Share the win when it helps someone','Your refrigerator has entered its use-me-or-lose-me era','The Mini Backpack'].every((headline) => document.body.textContent.includes(headline))"), true, "complete Daily front files each distinct reviewed feature");
  await captureElementEvidence(candidateDaily, "daily-review-default-1440.png", ".ns-daily-issue");
  await act(candidateDaily, "(() => { const script = document.createElement('script'); script.src = '/content/site/sv-back-nav.js'; document.body.appendChild(script); })()");
  await waitForValue(candidateDaily, "document.querySelectorAll('.sv-rail-item--back').length", 1, "public desktop context return control");
  check(await value(candidateDaily, "(() => { const rail=document.querySelector('.sv-side-rail').getBoundingClientRect(); const paper=document.querySelector('.ns-daily-issue').getBoundingClientRect(); return rail.left >= paper.right; })()"), true, "public desktop context return control stays in the reserved page rail instead of covering the newspaper");
  await captureElementEvidence(candidateDaily, "daily-review-full-page-1440.png", "body");
  await act(candidateDaily, "document.querySelectorAll('.ns-daily-desk__full').forEach((item) => item.open = true)");
  await captureElementEvidence(candidateDaily, "service-features-open-1440.png", ".ns-daily-issue");
  await act(candidateDaily, "document.querySelector('.ns-daily-news a').click()");
  await waitForValue(candidateDaily, "document.querySelectorAll('.ns-article__section--longform').length", 6, "exact longform Daily article");
  check(await value(candidateDaily, "document.body.textContent.includes('The researchers lacked the original hidden text, so they cannot prove every recovered word was exact.')"), true, "full article preserves the independently required evidence limitation");
  check(await value(candidateDaily, "document.body.textContent.includes('Asking the AI to “show its work” does not scan the file.')"), true, "full article preserves the rejected-shortcut correction");
  check(await value(candidateDaily, "Array.from(document.querySelectorAll('.ns-article__section--longform')).every((section) => { const blocks = Array.from(section.children).filter((child) => child.tagName !== 'H3'); return blocks.length < 2 || Math.max(...blocks.map((block) => block.getBoundingClientRect().left)) - Math.min(...blocks.map((block) => block.getBoundingClientRect().left)) < 2; })"), true, "desktop longform keeps every meaning block in one readable article column rather than auto-flowing into the section-label margin");
  check(await value(candidateDaily, "(() => { const action = document.querySelector('#before-you-share-anything'); const style = getComputedStyle(action); return action && parseFloat(style.borderLeftWidth) >= 12 && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && action.querySelector('h3').getBoundingClientRect().height >= 24; })()"), true, "full article carries the Daily's yellow and pink Before You Share action object through from the front page");
  check(await value(candidateDaily, "(() => { const footer = document.querySelector('.ns-article__sources'); const text = footer.querySelector('p'); const bg = getComputedStyle(footer).backgroundColor; const fg = getComputedStyle(text).color; return bg === 'rgb(16, 24, 59)' && fg === 'rgb(255, 247, 217)'; })()"), true, "full article filing footer keeps light text legible on the navy band");
  await captureElementEvidence(candidateDaily, "daily-review-article-1440.png", ".ns-article");
  candidateDaily.close();

  for (const width of [390, 320]) {
    const mobileCandidate = await openPage("/newsstand.html?fixture=daily-review-candidate&clock=candidate-day", { width, height: 844, reducedMotion: true });
    await waitForValue(mobileCandidate, "document.querySelector('.ns-daily-issue')?.dataset.dailyDate", "2026-08-12", `complete Daily review candidate ${width}`);
    check(await value(mobileCandidate, "document.documentElement.scrollWidth <= document.documentElement.clientWidth"), true, `complete Daily ${width} has no horizontal overflow`);
    check(await value(mobileCandidate, "Array.from(document.querySelectorAll('.ns-publication')).every((paper) => paper.offsetParent === null) && document.querySelectorAll('.ns-daily-section-switcher button').length === 4"), true, `complete Daily ${width} removes the duplicate rack while keeping Daily, Weekly, Big Picture and Archive visible inside the paper`);
    check(await value(mobileCandidate, "document.querySelector('.ns-daily-issue__dateline span:last-child').getBoundingClientRect().width > 0"), true, `complete Daily ${width} preserves the MAiN Street edition marker`);
    check(await value(mobileCandidate, "parseFloat(getComputedStyle(document.querySelector('.ns-daily-issue__dateline .ns-brand-i')).fontSize) < parseFloat(getComputedStyle(document.querySelector('.ns-daily-issue__dateline')).fontSize)"), true, `complete Daily ${width} makes the SUNNYVAiLE lowercase i visibly intentional`);
    check(await value(mobileCandidate, "Array.from(document.querySelectorAll('.ns-daily-desk__full > summary, .ns-daily-desk > a')).every((control) => control.getBoundingClientRect().height >= 44)"), true, `complete Daily ${width} service actions meet the minimum touch height`);
    const mobileRail = await value(mobileCandidate, "(() => { const grid = document.querySelector('.ns-daily-service-grid--primary'); const cards = Array.from(grid.children); const result = { flow: getComputedStyle(grid).gridAutoFlow, scrollWidth: grid.scrollWidth, clientWidth: grid.clientWidth, cardCount: cards.length, cardWidths: cards.map((card) => card.getBoundingClientRect().width) }; result.ok = result.flow === 'column' && result.scrollWidth > result.clientWidth && result.cardCount === 4 && result.cardWidths.every((cardWidth) => cardWidth >= 236); return result; })()");
    if (!mobileRail.ok) console.error(`NEWSSTAND MOBILE RAIL ${width} DIAGNOSTIC`, mobileRail);
    check(mobileRail.ok, true, `complete Daily ${width} uses one swipeable four-desk newspaper rail instead of a runaway box stack`);
    check(await value(mobileCandidate, "document.querySelector('.ns-daily-issue').getBoundingClientRect().height <= 2300"), true, `complete Daily ${width} keeps the exact issue within the representative mobile height budget`);
    await act(mobileCandidate, "(() => { const script = document.createElement('script'); script.src = '/content/site/sv-back-nav.js'; document.body.appendChild(script); })()");
    await waitForValue(mobileCandidate, "document.querySelectorAll('.sv-rail-item--back').length", 1, `public context return control ${width}`);
    check(await value(mobileCandidate, "(() => { const rail = document.querySelector('.sv-side-rail'); const paper = document.querySelector('.ns-daily-issue'); const a = rail.getBoundingClientRect(); const b = paper.getBoundingClientRect(); const overlaps = a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top; return getComputedStyle(rail).position === 'absolute' && !overlaps; })()"), true, `public context return control ${width} occupies the reserved strip and never covers the newspaper`);
    await captureElementEvidence(mobileCandidate, `daily-review-full-page-${width}.png`, "body");
    await captureElementEvidence(mobileCandidate, `daily-review-default-${width}.png`, ".ns-daily-issue");
    await act(mobileCandidate, "document.querySelector('.ns-daily-news a').click()");
    await waitForValue(mobileCandidate, "document.querySelectorAll('.ns-article__section--longform').length", 6, `exact longform Daily article ${width}`);
    check(await value(mobileCandidate, "document.documentElement.scrollWidth <= document.documentElement.clientWidth"), true, `complete Daily article ${width} has no horizontal overflow`);
    const mobileArticle = await value(mobileCandidate, "(() => { const article = document.querySelector('.ns-article'); const back = document.querySelector('.ns-article__back'); const result = { height: article.getBoundingClientRect().height, backHeight: back.getBoundingClientRect().height }; result.ok = result.height <= 3700 && result.backHeight >= 42; return result; })()");
    if (!mobileArticle.ok) console.error(`NEWSSTAND MOBILE ARTICLE ${width} DIAGNOSTIC`, mobileArticle);
    check(mobileArticle.ok, true, `complete Daily article ${width} stays compact and provides a clear return to the paper`);
    await captureElementEvidence(mobileCandidate, `daily-review-article-${width}.png`, ".ns-article");
    mobileCandidate.close();
  }

  const backfillCurrent = await openPage("/newsstand.html?clock=backfill-current", { width: 1440, height: 1000 });
  await waitForValue(backfillCurrent, "document.querySelector('.ns-publication [data-status-for=\"daily\"]').textContent", "Latest complete edition · August 6, 2026", "three-week archive Daily admission");
  check(await value(backfillCurrent, "window.__newsstandDailyIssueError || null"), null, "current Daily issue store validates before archive search");
  await act(backfillCurrent, "document.querySelector('#ns-browse-all').click()");
  check(await value(backfillCurrent, "document.querySelectorAll('.ns-front-story').length"), 5, "current archive exposes the existing Daily, three newly admitted Daily snapshots and the Weekly; older overdue source checks remain suppressed");
  check(await value(backfillCurrent, "['Google’s new Flash models cost less','Kimi K3’s weights are open','The cyclone model is open','AI use may be moving the handoff line'].every((headline) => document.body.textContent.includes(headline))"), true, "current searchable archive contains the exact three-week Daily and Weekly batch");
  await act(backfillCurrent, "document.querySelector('#ns-search-input').value='Kimi';document.querySelector('#ns-search-button').click()");
  check(await value(backfillCurrent, "document.querySelectorAll('.ns-front-story').length === 1 && document.querySelector('.ns-front-story').textContent.includes('Kimi K3')"), true, "archive search finds the admitted Kimi Daily snapshot");
  backfillCurrent.close();

  const growth = await openPage("/newsstand.html?fixture=growth", { width: 1440, height: 1000 });
  check(await value(growth, "document.querySelectorAll('.ns-publication').length"), 3, "growth keeps the three stable top-level choices");
  check(await value(growth, "document.querySelector('[data-contents-for=\"tribune\"]').getAttribute('data-story-count')"), "2", "second eligible story updates Tribune count");
  check(await value(growth, "document.querySelectorAll('[data-contents-for=\"tribune\"] .ns-publication__headline').length"), 1, "growth keeps one lead on the paper face");
  await act(growth, "document.querySelector('#ns-browse-all').click()");
  check(await value(growth, "document.querySelectorAll('.ns-front-story').length"), 4, "growth adds one eligible Tribune issue to the released historical archive without redesign");
  check(await value(growth, "document.querySelector('.ns-topic-button[data-topic=\"agents\"]') !== null"), true, "growth adds a new eligible topic without redesign");
  await act(growth, "document.querySelector('.ns-topic-button[data-topic=\"agents\"]').click()");
  check(await value(growth, "document.querySelectorAll('.ns-front-story').length"), 1, "new growth topic opens its eligible issue");
  growth.close();

  const paperHistory = await openPage("/newsstand.html");
  await act(paperHistory, "document.querySelector('.ns-publication[data-edition=\"tribune\"]').click()");
  await act(paperHistory, "window.scrollTo(0,640)");
  await act(paperHistory, "document.querySelector('.ns-front-story').focus()");
  const paperScroll = await value(paperHistory, "window.scrollY");
  await pressEnter(paperHistory);
  check(await value(paperHistory, "location.hash"), "#label-is-not-a-truth-detector", "paper keyboard story route");
  check(await value(paperHistory, "document.querySelectorAll('.ns-article').length"), 1, "paper story open");
  const paperRestorationBefore = await value(paperHistory, "document.querySelector('#paper-counter').getAttribute('data-ns-restoration-id') || ''");
  await act(paperHistory, "history.back()");
  await waitForHistoryRestoration(paperHistory, paperRestorationBefore);
  check(await value(paperHistory, "location.hash"), "", "paper Back clears hash");
  check(await value(paperHistory, "document.querySelectorAll('.ns-article').length"), 0, "paper Back clears article");
  check(await value(paperHistory, "document.querySelectorAll('.ns-front-story').length"), 1, "paper Back restores cards");
  check(await value(paperHistory, "document.activeElement.getAttribute('href')"), "#label-is-not-a-truth-detector", "paper Back result focus");
  check(Math.abs((await value(paperHistory, "window.scrollY")) - paperScroll) <= 200, true, "paper Back restores origin vicinity");
  await act(paperHistory, "history.forward()");
  check(await value(paperHistory, "document.querySelectorAll('.ns-article').length"), 1, "paper Forward restores story");
  check(await value(paperHistory, "document.activeElement.id"), "ns-reader-title", "paper Forward heading focus");
  const repeatedPaperRestorationBefore = await value(paperHistory, "document.querySelector('#paper-counter').getAttribute('data-ns-restoration-id') || ''");
  await act(paperHistory, "history.back()");
  await waitForHistoryRestoration(paperHistory, repeatedPaperRestorationBefore);
  check(await value(paperHistory, "document.querySelectorAll('.ns-article').length"), 0, "repeated paper Back has no stale body");
  for (const [index, scrollTarget] of [360, 840].entries()) {
    await paperHistory.call("Emulation.setDeviceMetricsOverride", { width: 1280, height: [620, 900][index], deviceScaleFactor: 1, mobile: false });
    await act(paperHistory, `window.scrollTo(0, ${scrollTarget});document.querySelector('.ns-front-story').focus()`);
    const expectedScroll = await value(paperHistory, "window.scrollY");
    await pressEnter(paperHistory);
    const restorationBefore = await value(paperHistory, "document.querySelector('#paper-counter').getAttribute('data-ns-restoration-id') || ''");
    await act(paperHistory, "history.back()");
    await waitForHistoryRestoration(paperHistory, restorationBefore);
    check(await value(paperHistory, "document.querySelectorAll('.ns-front-story').length"), 1, `paper cycle ${scrollTarget} cards`);
    check(await value(paperHistory, "document.activeElement.getAttribute('href')"), "#label-is-not-a-truth-detector", `paper cycle ${scrollTarget} focus`);
    check(Math.abs((await value(paperHistory, "window.scrollY")) - expectedScroll) <= 200, true, `paper cycle ${scrollTarget} restored scroll vicinity`);
    check(await value(paperHistory, "Number(document.querySelector('#paper-counter').getAttribute('data-ns-restored-scroll')) === window.scrollY"), true, `paper cycle ${scrollTarget} observable settled scroll`);
  }
  paperHistory.close();

  const searchHistory = await openPage("/newsstand.html");
  await act(searchHistory, "document.querySelector('#ns-search-input').value='verification';document.querySelector('#ns-search-input').focus()");
  await pressEnter(searchHistory);
  check(await value(searchHistory, "document.querySelectorAll('.ns-front-story').length"), 1, "keyboard search result");
  await act(searchHistory, "window.scrollTo(0,720)");
  await act(searchHistory, "document.querySelector('.ns-front-story').focus()");
  const searchScroll = await value(searchHistory, "window.scrollY");
  await pressEnter(searchHistory);
  check(await value(searchHistory, "document.querySelectorAll('.ns-article').length"), 1, "keyboard result story");
  const searchRestorationBefore = await value(searchHistory, "document.querySelector('#paper-counter').getAttribute('data-ns-restoration-id') || ''");
  await act(searchHistory, "history.back()");
  await waitForHistoryRestoration(searchHistory, searchRestorationBefore);
  check(await value(searchHistory, "document.querySelector('#ns-search-input').value"), "verification", "search Back query");
  check(await value(searchHistory, "document.querySelectorAll('.ns-front-story').length"), 1, "search Back cards");
  check(await value(searchHistory, "document.activeElement.getAttribute('href')"), "#label-is-not-a-truth-detector", "search Back result focus");
  check(Math.abs((await value(searchHistory, "window.scrollY")) - searchScroll) <= 200, true, "search Back restores origin vicinity");
  await act(searchHistory, "history.forward()");
  check(await value(searchHistory, "document.querySelectorAll('.ns-article').length"), 1, "search Forward story");
  const repeatedSearchRestorationBefore = await value(searchHistory, "document.querySelector('#paper-counter').getAttribute('data-ns-restoration-id') || ''");
  await act(searchHistory, "history.back()");
  await waitForHistoryRestoration(searchHistory, repeatedSearchRestorationBefore);
  check(await value(searchHistory, "document.querySelectorAll('.ns-article').length"), 0, "repeated search Back clears body");
  for (const [index, scrollTarget] of [360, 840].entries()) {
    await searchHistory.call("Emulation.setDeviceMetricsOverride", { width: 1280, height: [620, 900][index], deviceScaleFactor: 1, mobile: false });
    await act(searchHistory, `window.scrollTo(0, ${scrollTarget});document.querySelector('.ns-front-story').focus()`);
    const expectedScroll = await value(searchHistory, "window.scrollY");
    await pressEnter(searchHistory);
    const restorationBefore = await value(searchHistory, "document.querySelector('#paper-counter').getAttribute('data-ns-restoration-id') || ''");
    await act(searchHistory, "history.back()");
    await waitForHistoryRestoration(searchHistory, restorationBefore);
    check(await value(searchHistory, "document.querySelector('#ns-search-input').value"), "verification", `search cycle ${scrollTarget} query`);
    check(await value(searchHistory, "document.activeElement.getAttribute('href')"), "#label-is-not-a-truth-detector", `search cycle ${scrollTarget} focus`);
    check(Math.abs((await value(searchHistory, "window.scrollY")) - expectedScroll) <= 200, true, `search cycle ${scrollTarget} restored scroll vicinity`);
    check(await value(searchHistory, "Number(document.querySelector('#paper-counter').getAttribute('data-ns-restored-scroll')) === window.scrollY"), true, `search cycle ${scrollTarget} observable settled scroll`);
  }
  searchHistory.close();

  const directHistory = await openPage("/newsstand.html#label-is-not-a-truth-detector");
  check(await value(directHistory, "document.querySelectorAll('.ns-article').length"), 1, "direct story starts open");
  await act(directHistory, "location.hash=''");
  check(await value(directHistory, "document.querySelector('#paper-counter').hidden"), true, "direct empty hash closes reader");
  check(await value(directHistory, "document.querySelectorAll('.ns-article').length"), 0, "direct empty hash clears body");
  check(await value(directHistory, "document.activeElement.dataset.edition"), "tribune", "direct empty hash focus");
  directHistory.close();

  const held = await openPage("/newsstand.html?fixture=dataset-hold#label-is-not-a-truth-detector");
  check(await value(held, "(() => { const action = document.querySelector('.ns-state__primary'); return action.textContent.trim() === 'Choose a paper' && !action.hasAttribute('data-pull'); })()"), true, "global hold action does not promote a held paper");
  check(await value(held, "Array.from(document.querySelectorAll('.ns-publication__contents')).every((node) => node.getAttribute('data-story-count') === '0' && !node.querySelector('.ns-publication__headline'))"), true, "global hold suppresses every paper headline");
  check(await value(held, "document.querySelectorAll('.ns-article').length"), 0, "global hold direct hash");
  check(await value(held, "document.querySelector('[data-access-state=\"hold\"]') !== null"), true, "global hold notice");
  await act(held, "document.querySelector('#ns-search-input').value='verification';document.querySelector('#ns-search-button').click()");
  check(await value(held, "document.querySelectorAll('.ns-front-story').length"), 0, "global hold search");
  check(await value(held, "document.querySelector('#ns-empty').textContent.includes('not publishing stories right now')"), true, "global hold search notice");
  check(await value(held, "Array.from(document.querySelectorAll('.ns-publication__action')).every((node) => node.textContent === 'Check this paper · Not published')"), true, "global hold paper actions do not promise a normal pull");
  await act(held, "document.querySelector('#ns-browse-all').click()");
  check(await value(held, "document.querySelectorAll('.ns-front-story').length"), 0, "global hold browse all remains fail closed");
  await act(held, "document.querySelector('#ns-catchup-run').click()");
  check(await value(held, "document.querySelectorAll('#ns-catchup-results a, #ns-catchup-results button').length"), 0, "global hold Catch Me Up exposes zero action links");
  check(await value(held, "document.querySelectorAll('#ns-catchup-results [data-catchup-role], #ns-catchup-results .ns-catchup-item').length"), 0, "global hold Catch Me Up exposes zero items");
  held.close();

  const failed = await openPage("/newsstand.html?fixture=load-failure#label-is-not-a-truth-detector");
  check(await value(failed, "document.querySelectorAll('.ns-article').length"), 0, "load failure direct hash");
  check(await value(failed, "document.querySelector('[data-access-state=\"load-failure\"]') !== null"), true, "load failure notice");
  failed.close();

  const noData = await openPage("/newsstand.html?fixture=no-data#label-is-not-a-truth-detector");
  check(await value(noData, "(() => { const action = document.querySelector('.ns-state__primary'); return action.textContent.trim() === 'Choose a paper' && !action.hasAttribute('data-pull'); })()"), true, "no-data action routes to orientation");
  check(await value(noData, "document.querySelectorAll('.ns-article').length"), 0, "no-data direct hash");
  check(await value(noData, "document.querySelector('[data-access-state=\"no-data\"]') !== null"), true, "no-data notice");
  await act(noData, "document.querySelector('#ns-search-input').value='verification';document.querySelector('#ns-search-button').click()");
  check(await value(noData, "document.querySelectorAll('.ns-front-story').length"), 0, "no-data search");
  check(await value(noData, "Array.from(document.querySelectorAll('.ns-publication__action')).every((node) => node.textContent === 'Check this paper · Unavailable')"), true, "no-data paper actions state unavailability");
  await act(noData, "document.querySelector('#ns-browse-all').click()");
  check(await value(noData, "document.querySelectorAll('.ns-front-story').length"), 0, "no-data browse all remains fail closed");
  noData.close();

  const stale = await openPage("/newsstand.html?fixture=stale#label-is-not-a-truth-detector");
  check(await value(stale, "(() => { const action = document.querySelector('.ns-state__primary'); return action.getAttribute('data-pull') === 'daily' && document.querySelector('[data-status-for=\"daily\"]').textContent.startsWith('Current'); })()"), true, "the exact admitted current Daily remains readable even when the mutable publication fixture is stale");
  check(await value(stale, "(() => { const tribune = document.querySelector('[data-contents-for=\"tribune\"]'); return document.querySelector('#ns-title').textContent === 'The Daily is current.' && tribune.getAttribute('data-story-count') === '0' && tribune.textContent.trim() === 'Check overdue · not current' && !tribune.querySelector('.ns-publication__headline'); })()"), true, "the overdue Big Picture fails closed without erasing the independently admitted current Daily");
  check(await value(stale, "document.querySelectorAll('.ns-article').length"), 0, "stale direct hash");
  check(await value(stale, "document.querySelector('[data-access-state=\"stale\"]') !== null"), true, "stale archive warning");
  check(await value(stale, "document.querySelector('#ns-reader-title').textContent.includes('check overdue')"), true, "stale heading");
  await act(stale, "document.querySelector('#ns-search-input').value='verification';document.querySelector('#ns-search-button').click()");
  check(await value(stale, "document.querySelectorAll('.ns-front-story').length"), 0, "stale search");
  check(await value(stale, "document.querySelectorAll('.ns-front-story').length === 0 && document.querySelector('#ns-empty').textContent.trim().length > 0"), true, "source-mismatch search exposes no stale Tribune or unverified Daily result");
  stale.close();

  const staleDirect = await openPage("/newsstand.html?fixture=stale#label-is-not-a-truth-detector");
  await act(staleDirect, "location.hash=''");
  check(await value(staleDirect, "document.querySelector('#paper-counter').hidden"), true, "stale empty hash closes reader");
  check(await value(staleDirect, "document.querySelectorAll('.ns-article').length"), 0, "stale empty hash has no body");
  staleDirect.close();

  const unavailable = await openPage("/newsstand.html?fixture=unavailable");
  check(await value(unavailable, "document.querySelector('[data-contents-for=\"tribune\"]').textContent.trim()"), "Unavailable", "unavailable paper exposes only existing unavailable state");
  check(await value(unavailable, "document.querySelector('[data-contents-for=\"tribune\"]').getAttribute('data-story-count')"), "0", "unavailable paper suppresses eligible count");
  check(await value(unavailable, "document.querySelector('[data-status-for=\"daily\"]').textContent.startsWith('Current')"), true, "an unavailable Tribune does not erase the independently admitted Daily snapshot");
  unavailable.close();

  const mixed = await openPage("/newsstand.html?fixture=mixed#label-is-not-a-truth-detector");
  check(await value(mixed, "document.querySelectorAll('.ns-article').length"), 0, "mixed stale story blocked");
  check(await value(mixed, "document.querySelector('[data-access-state=\"stale\"]') !== null"), true, "mixed stale warning");
  await act(mixed, "document.querySelector('#ns-search-input').value='verification';document.querySelector('#ns-search-button').click()");
  check(await value(mixed, "document.querySelectorAll('.ns-front-story').length"), 0, "mixed stale story excluded from search");
  await act(mixed, "location.hash='';document.querySelector('#ns-catchup-since').value='2026-07-20';document.querySelector('#ns-catchup-run').click()");
  check(await value(mixed, "document.querySelector('[data-catchup-role=\"history\"]').textContent.includes('Archive · source check overdue')"), true, "Catch Me Up preserves a non-exposing stale archive tombstone");
  check(await value(mixed, "!document.querySelector('[data-catchup-role=\"history\"]').textContent.includes(window.NEWSSTAND_DATA.stories.find((story) => story.edition === 'tribune').headline)"), true, "stale tombstone does not bypass the canonical headline access gate");
  mixed.close();

  const corrected = await openPage("/newsstand.html?fixture=corrected#label-is-not-a-truth-detector");
  check(await value(corrected, "document.querySelector('[data-contents-for=\"tribune\"]').getAttribute('data-story-count')"), "1", "corrected eligible story remains on Tribune paper");
  check(await value(corrected, "document.querySelector('[data-contents-for=\"tribune\"] .ns-publication__headline') !== null"), true, "corrected eligible lead remains visible");
  check(await value(corrected, "document.querySelectorAll('.ns-article').length"), 1, "corrected body visible");
  check(await value(corrected, "document.querySelector('.ns-story-notice--corrected') !== null"), true, "correction notice");
  await act(corrected, "location.hash=''");
  check(await value(corrected, "document.querySelector('#paper-counter').hidden"), true, "corrected empty hash closes reader");
  corrected.close();

  const correctedHistory = await openPage("/newsstand.html?fixture=corrected");
  await act(correctedHistory, "document.querySelector('#ns-search-input').value='verification';document.querySelector('#ns-search-button').click()");
  check(await value(correctedHistory, "document.querySelector('.ns-front-story__status').textContent.includes('Corrected')"), true, "corrected search card");
  await act(correctedHistory, "document.querySelector('.ns-front-story').focus()");
  await pressEnter(correctedHistory);
  check(await value(correctedHistory, "document.querySelector('.ns-story-notice--corrected') !== null"), true, "corrected keyboard route");
  await act(correctedHistory, "history.back()");
  check(await value(correctedHistory, "document.querySelector('#ns-search-input').value"), "verification", "corrected Back query");
  check(await value(correctedHistory, "document.querySelector('.ns-front-story__status').textContent.includes('Corrected')"), true, "corrected Back card");
  check(await value(correctedHistory, "document.activeElement.getAttribute('href')"), "#label-is-not-a-truth-detector", "corrected Back focus");
  correctedHistory.close();

  const retracted = await openPage("/newsstand.html?fixture=retracted#label-is-not-a-truth-detector");
  check(await value(retracted, "document.querySelector('[data-contents-for=\"tribune\"]').getAttribute('data-story-count')"), "0", "retraction removes paper count");
  check(await value(retracted, "document.querySelector('[data-contents-for=\"tribune\"] .ns-publication__headline')"), null, "retraction removes paper headline");
  check(await value(retracted, "document.querySelectorAll('.ns-article').length"), 0, "retracted body suppressed");
  check(await value(retracted, "document.querySelector('.ns-story-notice--retracted') !== null"), true, "retraction notice");
  await act(retracted, "location.hash=''");
  check(await value(retracted, "document.querySelector('#paper-counter').hidden"), true, "retracted empty hash closes reader");
  await act(retracted, "document.querySelector('#ns-catchup-since').value='2026-07-20';document.querySelector('#ns-catchup-run').click()");
  check(await value(retracted, "document.querySelector('[data-catchup-role=\"history\"]').textContent.includes('Archive · retracted')"), true, "Catch Me Up preserves the retracted-story tombstone");
  check(await value(retracted, "Array.from(document.querySelectorAll('[data-catchup-role=\"history\"] .ns-catchup-item')).some((item) => item.textContent.includes('Archive · retracted') && item.querySelector('a')?.textContent.includes('retraction notice'))"), true, "retracted Catch Me Up item opens only the preserved notice");
  retracted.close();

  const repeated = await openPage("/newsstand.html#label-is-not-a-truth-detector");
  await act(repeated, "location.hash='#chatgpt-health-permission-screen'");
  check(await value(repeated, "document.querySelectorAll('.ns-article').length"), 0, "repeated held route blocks body");
  check(await value(repeated, "document.querySelector('[data-access-state=\"hold\"]') !== null"), true, "repeated held notice");
  await act(repeated, "history.back()");
  check(await value(repeated, "document.querySelectorAll('.ns-article').length"), 1, "repeated Back restores eligible story");
  check(await value(repeated, "document.activeElement.id"), "ns-reader-title", "repeated Back focus");
  await act(repeated, "history.forward()");
  check(await value(repeated, "document.querySelectorAll('.ns-article').length"), 0, "repeated Forward blocks held body");
  repeated.close();

  const mobile = await openPage("/newsstand.html", { width: 390, height: 844, reducedMotion: true });
  await waitForValue(mobile, "document.querySelector('.ns-daily-issue')?.dataset.dailyDate", "2026-08-04", "390 Daily-first issue");
  if (process.env.NEWSSTAND_LAYOUT_CALIBRATION === "overlap-mobile-paper-labels") {
    await act(mobile, "document.querySelector('.ns-daily-section-switcher button:nth-child(3)').style.transform='translateY(-34px)'");
  }
  if (process.env.NEWSSTAND_LAYOUT_CALIBRATION === "overflow-mobile-paper-status") {
    await act(mobile, "(() => { const node=document.querySelector('.ns-daily-section-switcher button:nth-child(4)'); node.style.whiteSpace='nowrap'; node.textContent='ARCHIVE AND TOPICS WITH AN INTENTIONAL UNCHECKED OVERFLOW'; })()");
  }
  check(await value(mobile, "matchMedia('(prefers-reduced-motion: reduce)').matches"), true, "reduced-motion media");
  check(await value(mobile, "document.querySelectorAll('.ns-publication').length === 3 && Array.from(document.querySelectorAll('.ns-publication')).every((paper) => paper.offsetParent === null)"), true, "390 retains the three-paper fallback without duplicating it above the open Daily");
  check(await value(mobile, "(() => { const switcher=document.querySelector('.ns-daily-section-switcher'); const buttons=Array.from(switcher.querySelectorAll('button')); const columns=getComputedStyle(switcher).gridTemplateColumns.split(' ').length; return columns===2 && buttons.length===4 && buttons.every((button)=>button.offsetParent&&button.getBoundingClientRect().height>=46); })()"), true, "390 keeps Daily, Weekly, Big Picture and Archive visible in one stable two-by-two newspaper index");
  check(await value(mobile, "(() => { const switcher=document.querySelector('.ns-daily-section-switcher'); const box=switcher.getBoundingClientRect(); const buttons=Array.from(switcher.querySelectorAll('button')); const nodes=buttons.map((button)=>button.getBoundingClientRect()); return buttons.every((button)=>button.scrollWidth<=button.clientWidth+1) && nodes.every((rect)=>rect.left>=box.left-1&&rect.right<=box.right+1&&rect.top>=box.top-1&&rect.bottom<=box.bottom+1); })()"), true, "390 newspaper-index labels remain contained and non-overlapping");
  check(await value(mobile, "Array.from(document.querySelectorAll('.ns-daily-section-switcher button')).every((button) => parseFloat(getComputedStyle(button).fontSize) >= 10)"), true, "390 newspaper-index labels meet the mobile text floor");
  check(await value(mobile, "document.querySelector('.ns-daily-issue').getBoundingClientRect().width <= window.innerWidth"), true, "390 complete Daily fits the viewport");
  check(await value(mobile, "(() => { const grid=document.querySelector('.ns-daily-service-grid'); return !grid || grid.getBoundingClientRect().width <= window.innerWidth; })()"), true, "390 admitted Daily service content fits the viewport when present");
  check(await value(mobile, `document.querySelectorAll('.ns-daily-desk[data-desk-state="ready"]').length ===
    Number(document.querySelector('[data-contents-for="daily"]').dataset.serviceCount)`), true, "390 Daily keeps the admitted-service boundary");
  check(await value(mobile, "!document.querySelector('.ns-daily-quiet-desks') && document.querySelectorAll('.ns-daily-desk').length === 0 && document.querySelectorAll('.ns-daily-brief-edition').length === 1"), true, "quiet Daily removes empty desk records and keeps one compact edition note on mobile");
  check(await value(mobile, "Array.from(document.querySelectorAll('.ns-topic-button')).every((button) => button.getBoundingClientRect().height >= 44)"), true, "390 topic controls meet the minimum touch height");
  await captureEvidence(mobile, "mobile-arrival-390.png");
  await captureEvidence(mobile, "mobile-daily-390.png", ".ns-daily-issue");
  await captureElementEvidence(mobile, "mobile-daily-complete-390.png", ".ns-daily-issue");
  await act(mobile, "document.querySelector('#ns-return').click();document.querySelector('#ns-catchup-since').value='2026-07-30';document.querySelector('#ns-catchup-run').click()");
  check(await value(mobile, "document.querySelector('.ns-catchup').getBoundingClientRect().width <= window.innerWidth"), true, "390 Catch Me Up fits the viewport");
  check(await value(mobile, "document.querySelector('.ns-catchup-lead h3').textContent.includes('SUNNYVAiLE') && getComputedStyle(document.querySelector('.ns-catchup-lead h3')).textTransform==='none'"), true, "Catch Me Up preserves the canonical SUNNYVAiLE lowercase i");
  await captureEvidence(mobile, "mobile-catchup-390.png", ".ns-catchup");
  await act(mobile, "window.__nsScroll=[];Element.prototype.scrollIntoView=function(options){window.__nsScroll.push(options)};document.querySelector('.ns-publication[data-edition=\"tribune\"]').click()");
  check(await value(mobile, "window.__nsScroll[0].behavior"), "auto", "reduced-motion scroll");
  check(await value(mobile, "getComputedStyle(document.querySelector('.ns-publication')).transitionDuration"), "0s", "reduced-motion transition");
  check(await value(mobile, "document.documentElement.scrollWidth <= window.innerWidth"), true, "390 reflow");
  await mobile.call("Emulation.setPageScaleFactor", { pageScaleFactor: 2 });
  check(await value(mobile, "document.documentElement.scrollWidth <= window.innerWidth"), true, "200 percent page-scale proxy");
  mobile.close();

  const mobileDirect = await openPage("/newsstand.html#label-is-not-a-truth-detector", { width: 390, height: 844, reducedMotion: true });
  await waitForValue(mobileDirect, "document.querySelector('#paper-counter').hidden", false, "mobile direct-hash reader");
  await act(mobileDirect, "document.querySelector('#ns-return').click()");
  await sleep(150);
  check(await value(mobileDirect, "location.hash==='' && document.activeElement.matches('.ns-publication[data-edition=\"tribune\"]') && document.activeElement.offsetParent !== null"), true, "mobile direct-hash return restores the matching visible choice");
  mobileDirect.close();

  const mobileHistory = await openPage("/newsstand.html", { width: 390, height: 844, reducedMotion: true });
  await act(mobileHistory, "document.querySelector('.ns-publication[data-edition=\"tribune\"]').click()");
  await sleep(150);
  await act(mobileHistory, "document.querySelector('.ns-front-story').click()");
  await sleep(150);
  await act(mobileHistory, "history.back()");
  await waitForValue(mobileHistory, "document.activeElement.matches('.ns-front-story[href=\"#label-is-not-a-truth-detector\"]')", true, "mobile story Back restores focus to the originating Big Picture headline");
  await act(mobileHistory, "document.querySelector('#ns-return').click()");
  await sleep(150);
  check(await value(mobileHistory, "document.activeElement.matches('.ns-publication[data-edition=\"tribune\"]') && document.activeElement.offsetParent !== null"), true, "mobile Back-then-return restores focus to the visible matching choice");
  mobileHistory.close();

  const narrow = await openPage("/newsstand.html", { width: 320, height: 760, reducedMotion: true });
  await waitForValue(narrow, "document.querySelector('.ns-daily-issue')?.dataset.dailyDate", "2026-08-04", "320 Daily-first issue");
  check(await value(narrow, "document.querySelectorAll('.ns-publication').length === 3 && Array.from(document.querySelectorAll('.ns-publication')).every((paper) => paper.offsetParent === null)"), true, "320 keeps the three-paper fallback without duplicating it above the open Daily");
  check(await value(narrow, "(() => { const buttons=Array.from(document.querySelectorAll('.ns-daily-section-switcher button')); return buttons.length===4 && buttons.every((button)=>button.offsetParent&&button.getBoundingClientRect().width>0&&button.getBoundingClientRect().height>=46); })()"), true, "320 keeps Daily, Weekly, Big Picture and Archive operable inside the paper");
  check(await value(narrow, "(() => { const switcher=document.querySelector('.ns-daily-section-switcher'); const box=switcher.getBoundingClientRect(); return Array.from(switcher.querySelectorAll('button')).every((button)=>{const rect=button.getBoundingClientRect(); return button.scrollWidth<=button.clientWidth+1&&rect.left>=box.left-1&&rect.right<=box.right+1&&rect.top>=box.top-1&&rect.bottom<=box.bottom+1;}); })()"), true, "320 newspaper-index labels remain contained and non-overlapping");
  check(await value(narrow, "Array.from(document.querySelectorAll('.ns-topic-button')).every((button) => button.getBoundingClientRect().height >= 44)"), true, "320 topic controls meet the minimum touch height");
  check(await value(narrow, "document.querySelector('.ns-daily-issue').getBoundingClientRect().width <= window.innerWidth && document.documentElement.scrollWidth <= window.innerWidth"), true, "320 Daily fits without horizontal overflow");
  check(await value(narrow, "parseFloat(getComputedStyle(document.querySelector('.ns-daily-issue h2')).fontSize) >= 44"), true, "320 retains a recognisable newspaper masthead");
  await captureEvidence(narrow, "mobile-daily-320.png", ".ns-daily-issue");
  await captureElementEvidence(narrow, "mobile-daily-complete-320.png", ".ns-daily-issue");
  check(await value(narrow, "(() => { const nodes=[document.querySelector('.ns-daily-issue h2'), ...document.querySelectorAll('.ns-daily-section-switcher button')]; return nodes.every((node)=>{const rect=node.getBoundingClientRect(); return node.offsetParent&&rect.left>=0&&rect.right<=window.innerWidth;}); })()"), true, "320 newspaper title and publication actions stay inside the viewport");
  await act(narrow, "document.querySelector('#ns-return').click();document.querySelector('.ns-catchup-jump').click()");
  await sleep(150);
  check(await value(narrow, "(() => { const title=document.querySelector('#ns-catchup-title').getBoundingClientRect(); const header=document.querySelector('.topbar').getBoundingClientRect(); return title.top >= header.bottom && title.bottom <= window.innerHeight; })()"), true, "320 Catch Me Up CTA lands with the destination title fully below the sticky header");
  await act(narrow, "document.querySelector('#ns-catchup-run').click()");
  check(await value(narrow, "document.querySelector('.ns-catchup').getBoundingClientRect().width <= window.innerWidth && document.documentElement.scrollWidth <= window.innerWidth"), true, "320 Catch Me Up fits without document overflow");
  await act(narrow, "document.querySelector('.ns-publication[data-edition=\"tribune\"]').focus()");
  check(await value(narrow, "document.activeElement.dataset.edition"), "tribune", "320 keyboard starts on Big Picture");
  await pressEnter(narrow);
  await sleep(400);
  check(await value(narrow, "document.querySelector('#paper-counter').hidden"), false, "320 keyboard opens Big Picture");
  check(await value(narrow, "document.activeElement.id"), "ns-reader-title", "320 keyboard paper open focus");
  await act(narrow, "document.querySelector('#ns-return').click()");
  check(await value(narrow, "document.activeElement.dataset.edition"), "tribune", "320 return focus to the same choice");
  narrow.close();

  console.log(`✓ NEWSSTAND BROWSER: ${checks} rendered checks · three repeated paper/search history cycles at 620/900px · hold/stale/correction/retraction/focus/mobile/motion/zoom`);
} finally {
  clearTimeout(timeout);
  server.close();
  if (chrome.exitCode === null) {
    chrome.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => chrome.once("exit", resolve)),
      sleep(2000)
    ]);
  }
  fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
