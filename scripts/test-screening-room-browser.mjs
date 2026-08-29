#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(process.env.SCREENING_ROOM_ROOT || process.cwd());
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH ||
  path.join(root, ".ds-sync", "node_modules", "playwright-core");
const chrome = process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".m4a": "audio/mp4",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".vtt": "text/vtt; charset=utf-8",
  ".woff2": "font/woff2"
};

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const relative = pathname === "/" ? "watch.html" : pathname.replace(/^\/+/, "");
  const file = path.resolve(root, relative);
  if (!file.startsWith(`${root}${path.sep}`) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404).end("Not found");
    return;
  }
  const stat = fs.statSync(file);
  const headers = {
    "Accept-Ranges": "bytes",
    "Cache-Control": "no-store",
    "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream"
  };
  const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range || "");
  if (match) {
    const start = match[1] ? Number(match[1]) : 0;
    const end = Math.min(match[2] ? Number(match[2]) : stat.size - 1, stat.size - 1);
    if (start > end || start >= stat.size) {
      response.writeHead(416, { "Content-Range": `bytes */${stat.size}` }).end();
      return;
    }
    response.writeHead(206, {
      ...headers,
      "Content-Length": end - start + 1,
      "Content-Range": `bytes ${start}-${end}/${stat.size}`
    });
    fs.createReadStream(file, { start, end }).pipe(response);
    return;
  }
  response.writeHead(200, { ...headers, "Content-Length": stat.size });
  fs.createReadStream(file).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });

async function open(programme = "01", options = {}) {
  const context = await browser.newContext({ viewport: options.viewport || { width: 1280, height: 900 } });
  if (options.mediaSession) {
    await context.addInitScript(() => {
      window.__mediaSessionProbe = { handlers: {}, metadata: null, playbackState: "none" };
      window.MediaMetadata = class MediaMetadata {
        constructor(metadata) {
          Object.assign(this, metadata);
          window.__mediaSessionProbe.metadata = metadata;
        }
      };
      Object.defineProperty(navigator, "mediaSession", {
        configurable: true,
        value: {
          setActionHandler(name, handler) { window.__mediaSessionProbe.handlers[name] = handler; },
          set metadata(value) { this._metadata = value; },
          get metadata() { return this._metadata; },
          set playbackState(value) { window.__mediaSessionProbe.playbackState = value; },
          get playbackState() { return window.__mediaSessionProbe.playbackState; }
        }
      });
    });
  }
  if (options.progress) {
    await context.addInitScript((progress) => {
      localStorage.setItem("laidies_screening_progress_v1", JSON.stringify(progress));
    }, options.progress);
  }
  const page = await context.newPage();
  if (options.admissionOverride) {
    await page.route("**/content/episodes/screening-room-admission.json", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(options.admissionOverride)
      })
    );
  }
  for (const pattern of options.abort || []) await page.route(pattern, (route) => route.abort());
  if (options.rejectPlay) {
    await page.addInitScript(() => {
      HTMLMediaElement.prototype.play = function () {
        return Promise.reject(new Error("test rejection"));
      };
    });
  }
  const mode = options.mode ? `&mode=${encodeURIComponent(options.mode)}` : "";
  await page.goto(`${base}/watch.html?ep=${programme}${mode}`, { waitUntil: "domcontentloaded" });
  return { context, page };
}

async function expectFailure(pattern, kind, options = {}) {
  const run = await open("01", { abort: [pattern], rejectPlay: options.rejectPlay });
  if (options.clickPlay) await run.page.locator("#btnPlay").click();
  await run.page.locator(`#playerStatus[data-failure="${kind}"]`).waitFor();
  assert.equal(await run.page.locator("#btnPlay").isDisabled(), true, `${kind}: play must stop`);
  assert.equal(await run.page.locator("#retryMedia").isVisible(), true, `${kind}: retry missing`);
  await run.context.close();
}

try {
  const newcomer = await open("01");
  await newcomer.page.locator(".film-player").waitFor({ state: "attached" });
  assert.equal(await newcomer.page.locator("#resumePanel").isVisible(), false, "newcomer saw a false resume prompt");
  assert.equal(await newcomer.page.locator("#screeningMode").isVisible(), true, "current video did not expose the watch/listen switch");
  assert.match(await newcomer.page.locator("#formatWatch").textContent(), /Current video · improving/i);
  assert.match(await newcomer.page.locator("#formatStatus").textContent(), /Watch is also available/i);
  assert.deepEqual(
    await newcomer.page.locator(".screening-program a[data-ep]").evaluateAll((links) =>
      links.map((link) => link.getAttribute("data-ep"))),
    ["trailer", "01", "02", "03", "04"]
  );
  await newcomer.page.waitForFunction(() => Number(document.querySelector("#track").getAttribute("aria-valuemax")) > 0);
  await newcomer.page.locator("#track").focus();
  await newcomer.page.keyboard.press("ArrowRight");
  assert.ok(Number(await newcomer.page.locator("#track").getAttribute("aria-valuenow")) >= 5, "keyboard seek did not advance");
  await newcomer.page.keyboard.press("End");
  assert.ok(Number(await newcomer.page.locator("#track").getAttribute("aria-valuenow")) > 1000, "End did not seek to duration");
  await newcomer.page.keyboard.press("Home");
  assert.equal(await newcomer.page.locator("#track").getAttribute("aria-valuenow"), "0", "Home did not seek to start");
  await newcomer.context.close();

  const commute = await open("04", { mediaSession: true });
  await commute.page.waitForFunction(() => window.__mediaSessionProbe?.metadata?.title);
  const mediaSession = await commute.page.evaluate(() => ({
    metadata: window.__mediaSessionProbe.metadata,
    handlers: Object.keys(window.__mediaSessionProbe.handlers).sort()
  }));
  assert.equal(mediaSession.metadata.title, "Episode 04 · The Founding Mothers");
  assert.equal(mediaSession.metadata.artist, "LAiDIES");
  assert.equal(mediaSession.metadata.album, "The Wednesday Tour · Season 1");
  assert.match(mediaSession.metadata.artwork[0].src, /opening-day-covers-v1\/04\/04-site\.jpg$/);
  assert.deepEqual(mediaSession.handlers, ["pause", "play", "seekbackward", "seekforward", "seekto"]);
  await commute.page.locator("#tape").evaluate((audio) => { audio.currentTime = 30; });
  await commute.page.evaluate(() => window.__mediaSessionProbe.handlers.seekforward({ seekOffset: 20 }));
  assert.ok(await commute.page.locator("#tape").evaluate((audio) => Math.abs(audio.currentTime - 50) < 0.5));
  await commute.page.evaluate(() => window.__mediaSessionProbe.handlers.seekbackward({ seekOffset: 10 }));
  assert.ok(await commute.page.locator("#tape").evaluate((audio) => Math.abs(audio.currentTime - 40) < 0.5));
  await commute.context.close();

  const inProgress = await open("01", { mode: "watch" });
  await inProgress.page.locator(".film-player").waitFor();
  assert.match(await inProgress.page.locator("#screeningMeta").textContent(), /improvements ongoing/i);
  assert.match(await inProgress.page.locator("#scrNote").textContent(), /current illustrated video/i);
  await inProgress.context.close();

  const admissionFixture = JSON.parse(
    fs.readFileSync(path.join(root, "content/episodes/screening-room-admission.json"), "utf8")
  );
  const admittedEpisode = admissionFixture.programmes["01"];
  admittedEpisode.admissionStatus = "admitted";
  admittedEpisode.holds = [];
  admittedEpisode.filmPublicUrl = `${base}/assets/video/episode-01-full-v27-occurrence-repaired-review.mp4`;
  admittedEpisode.filmSha256 = "50311e89c1664c1fa7b8711b3f58d7135de405654723a2ef085f0e54700f135a";
  admittedEpisode.filmDurationSeconds = 1172.22;
  admittedEpisode.posterPublicUrl = `${base}/assets/media/opening-day-covers-v1/01/01-site.jpg`;
  admittedEpisode.posterSha256 = "4336aa009cbc031ffba0583f7eb44200e2dc447fc162867d0104f584e545cff6";
  admittedEpisode.occurrences = Array.from(
    { length: admittedEpisode.expectedOccurrenceCount },
    (_, index) => ({ fixtureOccurrence: index + 1 })
  );

  const admitted = await open("01", { admissionOverride: admissionFixture, mediaSession: true, mode: "watch" });
  await admitted.page.locator(".film-player").waitFor();
  assert.equal(
    await admitted.page.locator(".film-player").getAttribute("src"),
    admittedEpisode.filmPublicUrl,
    "admitted film did not bind from its admission record"
  );
  assert.equal(
    await admitted.page.locator(".film-player").getAttribute("poster"),
    admittedEpisode.posterPublicUrl,
    "admitted poster did not bind to the visible film player"
  );
  assert.equal(await admitted.page.locator(".scene.is-live").count(), 0, "admitted film fell through to cue stills");
  assert.match(await admitted.page.locator("#scrNote").textContent(), /complete illustrated film/i);
  assert.equal(await admitted.page.locator("#screeningMode").isVisible(), true, "admitted film did not expose playback modes");
  assert.equal(await admitted.page.locator("#watchMode").getAttribute("aria-pressed"), "true");
  await admitted.page.waitForFunction(() => window.__mediaSessionProbe?.metadata?.artwork?.[0]?.src);
  assert.equal(
    (await admitted.page.evaluate(() => window.__mediaSessionProbe.metadata.artwork[0].src)),
    admittedEpisode.posterPublicUrl,
    "admitted poster did not reach Media Session metadata"
  );
  await admitted.page.locator("#listenMode").click();
  await admitted.page.waitForFunction(() => document.querySelector("#tape").getAttribute("src"));
  assert.equal(
    await admitted.page.locator("#tape").getAttribute("src"),
    admittedEpisode.audio,
    "Listen only did not bind the admitted narration URL"
  );
  assert.equal(await admitted.page.locator(".film-player").isVisible(), false, "film remained visible in Listen only mode");
  assert.equal(await admitted.page.locator(".listen-only-cover").isVisible(), true, "Listen only cover is not visible");
  assert.equal(await admitted.page.locator(".deck").isVisible(), true, "Listen only transport is not visible");
  assert.equal(await admitted.page.locator("#listenMode").getAttribute("aria-pressed"), "true");
  assert.match(await admitted.page.locator("#screeningMeta").textContent(), /background and lock-screen controls/i);
  await admitted.page.locator("#watchMode").click();
  assert.equal(await admitted.page.locator(".film-player").isVisible(), true, "Watch did not restore the admitted film");
  assert.equal(await admitted.page.locator(".deck").isVisible(), false, "audio transport remained visible in Watch mode");
  assert.equal(await admitted.page.locator("#watchMode").getAttribute("aria-pressed"), "true");
  await admitted.context.close();

  const admittedMobile = await open("01", {
    admissionOverride: admissionFixture,
    mode: "watch",
    viewport: { width: 320, height: 820 }
  });
  await admittedMobile.page.locator("#screeningMode").waitFor();
  assert.equal(
    await admittedMobile.page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    true,
    "320px admitted Watch / Listen only layout overflows horizontally"
  );
  const modeButtons = await admittedMobile.page.locator("#screeningMode button").evaluateAll((buttons) =>
    buttons.map((button) => ({ width: button.getBoundingClientRect().width, height: button.getBoundingClientRect().height }))
  );
  assert.ok(Math.abs(modeButtons[0].width - modeButtons[1].width) < 1, "playback mode controls are uneven at 320px");
  assert.ok(modeButtons.every((button) => button.height >= 44), "playback mode control is below the minimum touch target");
  await admittedMobile.context.close();

  const returning = await open("02", {
    progress: { version: 1, programme: "02", time: 321.4 }
  });
  assert.equal(await returning.page.locator("#resumePanel").isVisible(), true, "returning listener resume prompt missing");
  assert.match(await returning.page.locator("#resumeText").textContent(), /local playback history, not an account/);
  await returning.page.locator("#resumePlayback").click();
  await returning.page.waitForFunction(() => Math.abs(document.querySelector("#tape").currentTime - 321.4) < 2);
  await returning.context.close();

  const startOverRun = await open("02", {
    progress: { version: 1, programme: "02", time: 321.4 }
  });
  await startOverRun.page.locator("#startOver").click();
  assert.equal(await startOverRun.page.evaluate(() => localStorage.getItem("laidies_screening_progress_v1")), null);
  assert.ok(await startOverRun.page.locator("#tape").evaluate((audio) => audio.currentTime < 1));
  await startOverRun.context.close();

  for (const width of [320, 390, 1280]) {
    const run = await open("01", { viewport: { width, height: 820 } });
    await run.page.locator(".film-player").waitFor({ state: "attached" });
    assert.equal(
      await run.page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      true,
      `${width}px viewport overflows horizontally`
    );
    await run.page.locator("#track").focus();
    assert.equal(await run.page.locator("#track").evaluate((el) => el === document.activeElement), true);
    await run.context.close();
  }

  const trailer = await open("trailer");
  await trailer.page.locator('#playerStatus[data-failure="release"]').waitFor();
  assert.match(await trailer.page.locator("#screeningIntro").textContent(), /being rebuilt/i);
  assert.equal(await trailer.page.locator("#formatWatch").getAttribute("aria-disabled"), "true");
  await trailer.context.close();

  await expectFailure("**/episode-01-cues.json", "cues");
  await expectFailure("**/episode-01.vtt", "captions");
  await expectFailure("**/episode-01-narration.m4a", "audio");
  await expectFailure("**/__never__", "playback", { rejectPlay: true, clickPlay: true });

  console.log("SCREENING ROOM BROWSER PASS");
  console.log("journeys=newcomer,returning,start-over");
  console.log("viewports=320,390,1280");
  console.log("keyboard=slider-arrow,end,home");
  console.log("failure_modes=cues,captions,audio,playback");
  console.log("trailer=unavailable_and_labelled");
  console.log("media_session=metadata,play,pause,seekbackward,seekforward,seekto");
  console.log("admission_binding=in_progress_public_and_admitted_film_poster_and_listen_only_bound");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
