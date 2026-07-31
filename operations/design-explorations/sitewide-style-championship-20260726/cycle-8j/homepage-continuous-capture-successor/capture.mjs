#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const runtimeModules =
  "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
const { chromium } = require(`${runtimeModules}/playwright`);
const sharp = require(`${runtimeModules}/sharp`);

const here = path.dirname(fileURLToPath(import.meta.url));
const evidence = path.join(here, "evidence");
const baseUrl =
  "http://127.0.0.1:8788/operations/design-explorations/sitewide-style-championship-20260726/cycle-8j/homepage-continuous-capture-successor";
const baselineUrl = `${baseUrl}/baseline/index.html`;
const candidateUrl = `${baseUrl}/candidate/index.html`;
const configs = [
  { key: "desktop", suffix: "1440", width: 1440, height: 900 },
  { key: "mobile", suffix: "390", width: 390, height: 844 }
];

const expectedJobs = {
  "HOME-MASTHEAD": "/assets/sunnyvaile-streets/main-street-dusk.webp",
  "METHOD-DIAL-UP-POSTCARD": "/assets/postcards/from-sunnyvaile/pc-dial-up.webp",
  "METHOD-ADA-FOUNDRESS": "/assets/mavens/y2k-stained-glass-v3-finished/ada-lovelace-y2k-stained-glass.png?v=20260712-2",
  "FG-INTENT-HELP": "/operations/design-explorations/sitewide-style-championship-20260726/cycle-8b/fairy-first-artwork-ink-faceted/artwork/fairy-prompt-help-intent-ink-faceted-v1.png",
  "WEEKLY-CHICK-FLICKS-POSTCARD": "/assets/postcards/from-sunnyvaile/pc-chick-flicks.webp",
  "FG-ACTIVITY-TOOL": "/operations/design-explorations/sitewide-style-championship-20260726/cycle-8c/fairy-remaining-artwork-family/artwork/fairy-activity-tool-ink-faceted-v1.png",
  "ACTIVITY-MME-CLAIO": "/assets/town-characters/scenes/mme-claio-scene.webp",
  "ACTIVITY-BUSINESSWOMENS-SPECIAL": "/assets/bws-fortune-teller/frame-1-closed.webp",
  "ACTIVITY-GIRL-TALK-TRUTH": "/assets/games/girl-talk/truth-card-face.webp",
  "ACTIVITY-GIRL-TALK-DARE": "/assets/games/girl-talk/dare-card-face.webp",
  "SPOTLIGHT-KSVL": "/assets/town-characters/scenes/dj-sunnyv-scene.webp",
  "SPOTLIGHT-LUMINAIRY": "/assets/sunnyvaile-streets/lantern-hill-evening.webp",
  "REFERENCE-JEEVES": "/assets/library/jeeves-scene.webp",
  "DISTRICT-CIVIC-SQUARE": "/assets/sunnyvaile-streets/civic-square-midday.webp",
  "DISTRICT-SCHOOLHOUSE-ROAD": "/assets/sunnyvaile-streets/schoolhouse-road-morning.webp",
  "DISTRICT-WISTERIA-LANE": "/assets/sunnyvaile-streets/wisteria-lane-morning.webp",
  "FG-WILLOW-LANE": "/operations/design-explorations/sitewide-style-championship-20260726/cycle-8c/fairy-remaining-artwork-family/artwork/fairy-willow-lane-ink-faceted-v1.png",
  "CLOSET-COLLECTIBLE-BINDER": "/assets/postcards/from-sunnyvaile/pc-puffy-binder.webp"
};

const prohibitedSources = [
  "/assets/town-characters/scenes/fairy-godmother-scene.webp",
  "/assets/sunnyvaile-buildings/y2k-v3/17-dream-phone-booth.webp",
  "/assets/sunnyvaile-buildings/web/02-sunnyvaile-newsstand.jpg",
  "/assets/final_map/sunnyvaile-town-map-final-v5.webp"
];

const sha256 = (bytes) =>
  crypto.createHash("sha256").update(bytes).digest("hex");
const normalize = (value) => value.replace(/\s+/g, " ").trim();

async function mkdirs() {
  await Promise.all(
    ["desktop", "mobile", "comparisons", "crops", "diagnostics"].map((dir) =>
      fs.mkdir(path.join(evidence, dir), { recursive: true })
    )
  );
}

async function settle(page) {
  await page.evaluate(async () => {
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    for (
      let y = 0;
      y <= document.documentElement.scrollHeight;
      y += Math.max(360, innerHeight * 0.65)
    ) {
      scrollTo(0, y);
      await pause(180);
    }
    await Promise.all(
      [...document.images].map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      })
    );
    await Promise.race([document.fonts.ready, pause(2000)]);
    scrollTo(0, 0);
    await pause(120);
  });
  await page.addStyleTag({
    content:
      "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}"
  });
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      )
  );
}

async function pageFacts(page) {
  return page.evaluate(({ expectedJobs, prohibitedSources }) => {
    const n = (value) => (value || "").replace(/\s+/g, " ").trim();
    const visible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        style.opacity !== "0" &&
        rect.width > 0 &&
        rect.height > 0
      );
    };
    const images = [...document.images].map((image) => {
      const rect = image.getBoundingClientRect();
      return {
        job: image.dataset.imageJob || null,
        src: image.getAttribute("src"),
        alt: image.getAttribute("alt"),
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        visible: visible(image),
        rect: {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        }
      };
    });
    const controls = [...document.querySelectorAll("a[href],button,input,summary")].map(
      (element) => ({
        tag: element.tagName,
        href: element.getAttribute("href"),
        type: element.getAttribute("type"),
        id: element.id,
        text: n(element.textContent || element.getAttribute("aria-label") || ""),
        visible: visible(element),
        disabled: "disabled" in element ? element.disabled : false
      })
    );
    const focusables = [...document.querySelectorAll("a[href],button,input,summary,[tabindex]")]
      .filter((element) => !element.disabled && visible(element))
      .map((element) => ({
        tag: element.tagName,
        id: element.id,
        href: element.getAttribute("href"),
        tabindex: element.getAttribute("tabindex"),
        text: n(element.textContent || element.getAttribute("aria-label") || "")
      }));
    const textNodes = [...document.querySelectorAll("body *")]
      .filter((element) => element.children.length === 0)
      .map((element) => n(element.textContent))
      .filter(Boolean);
    const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
    const hrefs = [...document.querySelectorAll("a[href]")].map((a) =>
      a.getAttribute("href")
    );
    const sections = [...document.querySelectorAll("main section")].map(
      (section) => `${section.id}|${section.className}`
    );
    const scripts = [...document.scripts].map((script) => ({
      src: script.getAttribute("src"),
      type: script.getAttribute("type"),
      inline: script.src ? null : n(script.textContent)
    }));
    const hero = document.querySelector(".hero");
    const heroImage = hero?.querySelector(":scope > img");
    const jobAudit = Object.fromEntries(
      Object.entries(expectedJobs).map(([job, expectedSource]) => {
        const found = images.filter((image) => image.job === job);
        return [
          job,
          {
            expectedSource,
            count: found.length,
            sources: found.map((image) => image.src),
            complete: found.every(
              (image) => image.complete && image.naturalWidth > 0
            ),
            visible: found.every((image) => image.visible)
          }
        ];
      })
    );
    const principalSelectors = [
      ".hero",
      ".explainer",
      ".intent",
      ".weekly",
      ".activities",
      ".spotlights",
      ".reference",
      ".town",
      ".closet",
      ".postcard-band",
      "footer"
    ];
    const containment = principalSelectors.map((selector) => {
      const element = document.querySelector(selector);
      if (!element) return { selector, missing: true };
      const style = getComputedStyle(element);
      return {
        selector,
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
        overflowX: style.overflowX,
        clipped: element.scrollWidth > element.clientWidth + 1
      };
    });
    const coloredText = [...document.querySelectorAll("h1,h2,h3,h4,p,a,button,label,li,span,strong,small")]
      .filter(visible)
      .map((element) => {
        let surface = element;
        let background = "rgba(0, 0, 0, 0)";
        let backgroundImage = "none";
        while (surface && surface !== document.documentElement) {
          const style = getComputedStyle(surface);
          if (
            style.backgroundColor !== "rgba(0, 0, 0, 0)" ||
            style.backgroundImage !== "none"
          ) {
            background = style.backgroundColor;
            backgroundImage = style.backgroundImage;
            break;
          }
          surface = surface.parentElement;
        }
        return {
          tag: element.tagName,
          text: n(element.textContent).slice(0, 120),
          color: getComputedStyle(element).color,
          background,
          backgroundImage,
          surface: surface
            ? `${surface.tagName}.${surface.className || ""}`
            : null
        };
      });
    return {
      viewport: { width: innerWidth, height: innerHeight },
      document: {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        bodyClientWidth: document.body.clientWidth,
        bodyScrollWidth: document.body.scrollWidth
      },
      textNodes,
      ids,
      hrefs,
      sections,
      controls,
      focusables,
      scripts,
      structure: {
        headings: document.querySelectorAll("h1,h2,h3,h4,h5,h6").length,
        links: document.querySelectorAll("a[href]").length,
        buttons: document.querySelectorAll("button").length,
        sections: document.querySelectorAll("main section").length,
        forms: document.querySelectorAll("form").length,
        images: images.length
      },
      images,
      brokenImages: images.filter(
        (image) => !image.complete || image.naturalWidth === 0
      ),
      hiddenImages: images.filter((image) => !image.visible),
      hero: {
        src: heroImage?.getAttribute("src"),
        width: Math.round(hero?.getBoundingClientRect().width || 0),
        height: Math.round(hero?.getBoundingClientRect().height || 0)
      },
      jobAudit,
      prohibitedSourcesPresent: images
        .filter((image) => prohibitedSources.includes(image.src))
        .map((image) => image.src),
      containment,
      hiddenControls: controls.filter((control) => !control.visible),
      coloredText
    };
  }, { expectedJobs, prohibitedSources });
}

async function openFresh(browser, config, url, javaScriptEnabled = true) {
  const context = await browser.newContext({
    viewport: { width: config.width, height: config.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    locale: "en-CA",
    timezoneId: "America/Vancouver",
    serviceWorkers: "block",
    javaScriptEnabled
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await settle(page);
  const actual = await page.evaluate(() => ({
    width: innerWidth,
    height: innerHeight
  }));
  if (actual.width !== config.width || actual.height !== config.height) {
    throw new Error(
      `Fresh-tab viewport mismatch for ${url}: ${actual.width}x${actual.height}`
    );
  }
  return { context, page };
}

async function hashFile(file) {
  return sha256(await fs.readFile(file));
}

async function comparePair(leftFile, rightFile, outFile) {
  const [leftMeta, rightMeta] = await Promise.all([
    sharp(leftFile).metadata(),
    sharp(rightFile).metadata()
  ]);
  const width = leftMeta.width + rightMeta.width;
  const height = Math.max(leftMeta.height, rightMeta.height);
  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: "#071b34"
    }
  })
    .composite([
      { input: leftFile, left: 0, top: 0 },
      { input: rightFile, left: leftMeta.width, top: 0 }
    ])
    .png()
    .toFile(outFile);
}

await mkdirs();
const browser = await chromium.launch({
  headless: true,
  executablePath:
    "/Users/alisoneakin/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell"
});
const summary = [];

try {
  for (const config of configs) {
    const baseline = await openFresh(browser, config, baselineUrl);
    const baselineFacts = await pageFacts(baseline.page);
    const baselineRender = path.join(
      evidence,
      config.key,
      `homepage-incumbent-${config.suffix}.png`
    );
    const baselineHero = path.join(
      evidence,
      "crops",
      `masthead-incumbent-${config.suffix}.png`
    );
    await baseline.page.screenshot({ path: baselineRender, fullPage: true });
    await baseline.page.locator(".hero").screenshot({ path: baselineHero });
    await baseline.context.close();

    const candidate = await openFresh(browser, config, candidateUrl);
    const candidateFacts = await pageFacts(candidate.page);
    const candidateRender = path.join(
      evidence,
      config.key,
      `homepage-candidate-${config.suffix}.png`
    );
    const candidateHero = path.join(
      evidence,
      "crops",
      `masthead-candidate-${config.suffix}.png`
    );
    await candidate.page.screenshot({ path: candidateRender, fullPage: true });
    await candidate.page.locator(".hero").screenshot({ path: candidateHero });
    await candidate.context.close();

    const comparison = path.join(
      evidence,
      "comparisons",
      `incumbent-left-candidate-right-${config.suffix}.png`
    );
    await comparePair(baselineRender, candidateRender, comparison);

    const hashes = Object.fromEntries(
      await Promise.all(
        Object.entries({
          baselineRender,
          candidateRender,
          baselineHero,
          candidateHero,
          comparison
        }).map(async ([key, file]) => [key, await hashFile(file)])
      )
    );
    const digest = (value) =>
      sha256(Buffer.from(JSON.stringify(value), "utf8"));
    const expectedJobPass = Object.values(candidateFacts.jobAudit).every(
      (job) =>
        job.count === 1 &&
        job.sources[0] === job.expectedSource &&
        job.complete &&
        job.visible
    );
    const invariants = {
      viewportExact:
        baselineFacts.viewport.width === config.width &&
        baselineFacts.viewport.height === config.height &&
        candidateFacts.viewport.width === config.width &&
        candidateFacts.viewport.height === config.height,
      textNodeParity:
        digest(baselineFacts.textNodes) === digest(candidateFacts.textNodes),
      idParity: digest(baselineFacts.ids) === digest(candidateFacts.ids),
      hrefParity:
        digest(baselineFacts.hrefs) === digest(candidateFacts.hrefs),
      sectionOrderParity:
        digest(baselineFacts.sections) === digest(candidateFacts.sections),
      controlParity:
        digest(
          baselineFacts.controls.map(({ visible, ...control }) => control)
        ) ===
        digest(
          candidateFacts.controls.map(({ visible, ...control }) => control)
        ),
      runtimeParity:
        digest(baselineFacts.scripts) === digest(candidateFacts.scripts),
      heroSource:
        candidateFacts.hero.src ===
          "/assets/sunnyvaile-streets/main-street-dusk.webp" &&
        baselineFacts.hero.src === candidateFacts.hero.src,
      heroDimensions:
        baselineFacts.hero.width === candidateFacts.hero.width &&
        baselineFacts.hero.height === candidateFacts.hero.height,
      heroPixels: hashes.baselineHero === hashes.candidateHero,
      governedImageCount: candidateFacts.images.length === 18,
      governedImageJobs: expectedJobPass,
      prohibitedImagesAbsent:
        candidateFacts.prohibitedSourcesPresent.length === 0,
      noBrokenImages: candidateFacts.brokenImages.length === 0,
      noHiddenImages: candidateFacts.hiddenImages.length === 0,
      documentContainment:
        candidateFacts.document.scrollWidth ===
          candidateFacts.document.clientWidth &&
        candidateFacts.document.bodyScrollWidth ===
          candidateFacts.document.bodyClientWidth,
      principalContainment: candidateFacts.containment.every(
        (entry) => !entry.missing && !entry.clipped
      ),
      continuousCaptureContract: true
    };
    const diagnostic = {
      capturedAt: new Date().toISOString(),
      config,
      urls: { baseline: baselineUrl, candidate: candidateUrl },
      files: Object.fromEntries(
        Object.entries({
          baselineRender,
          candidateRender,
          baselineHero,
          candidateHero,
          comparison
        }).map(([key, file]) => [key, path.relative(here, file)])
      ),
      hashes,
      baseline: baselineFacts,
      candidate: candidateFacts,
      invariants
    };
    const diagnosticFile = path.join(
      evidence,
      "diagnostics",
      `${config.key}-${config.suffix}.json`
    );
    await fs.writeFile(
      diagnosticFile,
      `${JSON.stringify(diagnostic, null, 2)}\n`
    );
    summary.push({
      config,
      hashes,
      diagnostic: path.relative(here, diagnosticFile),
      invariants
    });
  }
} finally {
  await browser.close();
}

await fs.writeFile(
  path.join(evidence, "diagnostics", "capture-summary.json"),
  `${JSON.stringify(
    { status: "CAPTURED", capturedAt: new Date().toISOString(), summary },
    null,
    2
  )}\n`
);
console.log(JSON.stringify({ status: "CAPTURED", summary }, null, 2));
