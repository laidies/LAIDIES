#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(
  "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright"
);

const here = path.dirname(fileURLToPath(import.meta.url));
const cssPath = path.join(here, "candidate.css");
const evidence = path.join(here, "evidence");
const publicUrl = "https://laidies.ai/";
const expectedPublicSha =
  "238dff887de35233994d421b39bee0845a29b5bd09defd95dbe00d877773fb87";

const viewports = [
  {
    name: "desktop-1440",
    viewport: { width: 1440, height: 900 },
    baseline: "baseline/desktop/homepage-incumbent-1440.png",
    candidate: "candidate/desktop/homepage-challenger-1440.png",
    baselineHero: "baseline/desktop/homepage-incumbent-hero-1440.png",
    candidateHero: "candidate/desktop/homepage-challenger-hero-1440.png"
  },
  {
    name: "mobile-390",
    viewport: { width: 390, height: 844 },
    baseline: "baseline/mobile/homepage-incumbent-390.png",
    candidate: "candidate/mobile/homepage-challenger-390.png",
    baselineHero: "baseline/mobile/homepage-incumbent-hero-390.png",
    candidateHero: "candidate/mobile/homepage-challenger-hero-390.png"
  }
];

const sha256 = (bytes) =>
  crypto.createHash("sha256").update(bytes).digest("hex");

async function loadAllImages(page) {
  await page.evaluate(async () => {
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const height = document.documentElement.scrollHeight;
    for (let y = 0; y < height; y += Math.max(420, innerHeight * 0.72)) {
      scrollTo(0, y);
      await pause(45);
    }
    scrollTo(0, document.documentElement.scrollHeight);
    await pause(260);
    scrollTo(0, 0);
    await pause(180);
    await Promise.all(
      [...document.images].map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      })
    );
    await document.fonts.ready;
  });
}

async function pageFacts(page) {
  return page.evaluate(() => {
    const normal = (value) => value.replace(/\s+/g, " ").trim();
    const imageSources = [...document.images].map((image) => ({
      src: image.getAttribute("src"),
      currentSrc: image.currentSrc,
      alt: image.getAttribute("alt"),
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      visible:
        getComputedStyle(image).display !== "none" &&
        getComputedStyle(image).visibility !== "hidden"
    }));
    const structure = {
      headings: document.querySelectorAll("h1,h2,h3,h4,h5,h6").length,
      links: document.querySelectorAll("a[href]").length,
      buttons: document.querySelectorAll("button").length,
      sections: document.querySelectorAll("main section").length,
      forms: document.querySelectorAll("form").length,
      images: document.images.length
    };
    const hero = document.querySelector(".hero");
    const heroImage = hero?.querySelector(":scope > img");
    const heroCopy = hero?.querySelector(".hero-copy");
    const styleFacts = (element) => {
      if (!element) return null;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        display: style.display,
        position: style.position,
        color: style.color,
        background: style.background,
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        width: Math.round(rect.width * 100) / 100,
        height: Math.round(rect.height * 100) / 100
      };
    };
    const contrastTargets = [
      ".intent-grid a strong",
      ".intent-grid a span",
      ".feature-card h3",
      ".feature-card p",
      ".why-box p:not(.eyebrow):not(.foundress-caption)",
      ".weekly .section-heading h2",
      ".weekly .section-heading > p:last-child",
      ".activity-grid article h3",
      ".activity-grid article p",
      ".reference h2",
      ".reference p",
      ".town .section-heading h2",
      ".town .section-heading > p:last-child",
      ".closet h2",
      ".closet p",
      ".postcard-band h2",
      ".postcard-band p"
    ];
    const contrast = contrastTargets.map((selector) => {
      const element = document.querySelector(selector);
      if (!element) return { selector, missing: true };
      let surface = element;
      let background = "rgba(0, 0, 0, 0)";
      let backgroundImage = "none";
      while (surface) {
        const surfaceStyle = getComputedStyle(surface);
        background = surfaceStyle.backgroundColor;
        backgroundImage = surfaceStyle.backgroundImage;
        if (
          backgroundImage !== "none" ||
          (!background.endsWith(", 0)") && background !== "transparent")
        ) {
          break;
        }
        surface = surface.parentElement;
      }
      return {
        selector,
        color: getComputedStyle(element).color,
        background,
        backgroundImage,
        surface: surface?.className || surface?.tagName || null
      };
    });
    return {
      title: document.title,
      lang: document.documentElement.lang,
      text: normal(document.body.innerText),
      hrefs: [...document.querySelectorAll("a[href]")].map((a) =>
        a.getAttribute("href")
      ),
      structure,
      imageSources,
      brokenImages: imageSources.filter(
        (image) => !image.complete || image.naturalWidth === 0
      ),
      hiddenImages: imageSources.filter((image) => !image.visible),
      overflow: {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        horizontal:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1
      },
      hero: {
        root: styleFacts(hero),
        image: styleFacts(heroImage),
        copy: styleFacts(heroCopy),
        imageSrc: heroImage?.getAttribute("src") || null,
        imageCurrentSrc: heroImage?.currentSrc || null
      },
      contrast
    };
  });
}

const publicResponse = await fetch(publicUrl, { redirect: "follow" });
if (!publicResponse.ok) {
  throw new Error(`Public Homepage fetch failed: ${publicResponse.status}`);
}
const publicBytes = Buffer.from(await publicResponse.arrayBuffer());
const publicSha = sha256(publicBytes);
if (publicSha !== expectedPublicSha) {
  throw new Error(
    `Public Homepage drift: expected ${expectedPublicSha}, received ${publicSha}`
  );
}

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const config of viewports) {
    const context = await browser.newContext({
      viewport: config.viewport,
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
      serviceWorkers: "block",
      locale: "en-CA",
      timezoneId: "America/Vancouver"
    });
    const page = await context.newPage();
    await page.goto(publicUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60_000
    });
    await loadAllImages(page);
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
          caret-color: transparent !important;
        }
      `
    });
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve))
        )
    );

    const baselineFacts = await pageFacts(page);
    const baselinePng = path.join(evidence, config.baseline);
    const baselineHeroPng = path.join(evidence, config.baselineHero);
    await page.screenshot({ path: baselinePng, fullPage: true });
    await page.evaluate(() => scrollTo(0, 0));
    await page.locator(".hero").screenshot({ path: baselineHeroPng });

    await page.addStyleTag({ path: cssPath });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      );
    });
    const candidateFacts = await pageFacts(page);
    const candidatePng = path.join(evidence, config.candidate);
    const candidateHeroPng = path.join(evidence, config.candidateHero);
    await page.screenshot({ path: candidatePng, fullPage: true });
    await page.evaluate(() => scrollTo(0, 0));
    await page.locator(".hero").screenshot({ path: candidateHeroPng });

    const baselineBytes = await fs.readFile(baselinePng);
    const baselineHeroBytes = await fs.readFile(baselineHeroPng);
    const candidateBytes = await fs.readFile(candidatePng);
    const candidateHeroBytes = await fs.readFile(candidateHeroPng);
    const diagnostics = {
      capturedAt: new Date().toISOString(),
      viewport: config.viewport,
      publicUrl,
      publicSha256: publicSha,
      baseline: {
        screenshot: config.baseline,
        screenshotSha256: sha256(baselineBytes),
        heroScreenshot: config.baselineHero,
        heroScreenshotSha256: sha256(baselineHeroBytes),
        ...baselineFacts,
        textSha256: sha256(Buffer.from(baselineFacts.text)),
        hrefsSha256: sha256(Buffer.from(JSON.stringify(baselineFacts.hrefs))),
        imageSourcesSha256: sha256(
          Buffer.from(JSON.stringify(baselineFacts.imageSources))
        )
      },
      candidate: {
        screenshot: config.candidate,
        screenshotSha256: sha256(candidateBytes),
        heroScreenshot: config.candidateHero,
        heroScreenshotSha256: sha256(candidateHeroBytes),
        ...candidateFacts,
        textSha256: sha256(Buffer.from(candidateFacts.text)),
        hrefsSha256: sha256(Buffer.from(JSON.stringify(candidateFacts.hrefs))),
        imageSourcesSha256: sha256(
          Buffer.from(JSON.stringify(candidateFacts.imageSources))
        )
      }
    };

    diagnostics.invariants = {
      structure:
        JSON.stringify(baselineFacts.structure) ===
        JSON.stringify(candidateFacts.structure),
      text: diagnostics.baseline.textSha256 === diagnostics.candidate.textSha256,
      hrefs:
        diagnostics.baseline.hrefsSha256 === diagnostics.candidate.hrefsSha256,
      imageSources:
        diagnostics.baseline.imageSourcesSha256 ===
        diagnostics.candidate.imageSourcesSha256,
      heroPixels:
        diagnostics.baseline.heroScreenshotSha256 ===
        diagnostics.candidate.heroScreenshotSha256,
      noBrokenImages:
        baselineFacts.brokenImages.length === 0 &&
        candidateFacts.brokenImages.length === 0,
      noHorizontalOverflow:
        !baselineFacts.overflow.horizontal &&
        !candidateFacts.overflow.horizontal
    };

    await fs.writeFile(
      path.join(evidence, "diagnostics", `${config.name}.json`),
      `${JSON.stringify(diagnostics, null, 2)}\n`
    );
    results.push({
      name: config.name,
      baseline: diagnostics.baseline.screenshotSha256,
      candidate: diagnostics.candidate.screenshotSha256,
      heroPixelsEqual: diagnostics.invariants.heroPixels,
      invariants: diagnostics.invariants
    });
    await context.close();
  }
} finally {
  await browser.close();
}

console.log(
  JSON.stringify(
    {
      status: "CAPTURED",
      publicSha256: publicSha,
      cssSha256: sha256(await fs.readFile(cssPath)),
      results
    },
    null,
    2
  )
);
