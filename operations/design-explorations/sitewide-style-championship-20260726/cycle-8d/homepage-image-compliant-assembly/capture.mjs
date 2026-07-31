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
const evidence = path.join(here, "evidence");
const baseUrl =
  "http://127.0.0.1:8788/operations/design-explorations/sitewide-style-championship-20260726/cycle-8d/homepage-image-compliant-assembly";
const rejectedFairy = "/assets/town-characters/scenes/fairy-godmother-scene.webp";
const admittedJobs = {
  "FG-INTENT-HELP":
    "/operations/design-explorations/sitewide-style-championship-20260726/cycle-8d/homepage-image-compliant-assembly/assets/fairy-prompt-help-intent-ink-faceted-v1.png",
  "FG-ACTIVITY-TOOL":
    "/operations/design-explorations/sitewide-style-championship-20260726/cycle-8d/homepage-image-compliant-assembly/assets/fairy-activity-tool-ink-faceted-v1.png",
  "FG-WILLOW-LANE":
    "/operations/design-explorations/sitewide-style-championship-20260726/cycle-8d/homepage-image-compliant-assembly/assets/fairy-willow-lane-ink-faceted-v1.png"
};

const configs = [
  { name: "desktop-1440", viewport: { width: 1440, height: 900 }, suffix: "1440" },
  { name: "mobile-390", viewport: { width: 390, height: 844 }, suffix: "390" }
];

const sha256 = (bytes) =>
  crypto.createHash("sha256").update(bytes).digest("hex");

async function loadAllImages(page) {
  await page.evaluate(async () => {
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const total = document.documentElement.scrollHeight;
    for (let y = 0; y < total; y += Math.max(420, innerHeight * 0.7)) {
      scrollTo(0, y);
      await pause(35);
    }
    scrollTo(0, document.documentElement.scrollHeight);
    await pause(240);
    scrollTo(0, 0);
    await pause(160);
    const visibleImages = [...document.images].filter(
      (image) => getComputedStyle(image).display !== "none"
    );
    await Promise.all(
      visibleImages.map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      })
    );
    await Promise.race([document.fonts.ready, pause(1500)]);
  });
}

async function freezeMotion(page) {
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
}

async function facts(page) {
  return page.evaluate(
    ({ rejectedFairy }) => {
      const normalize = (value) => value.replace(/\s+/g, " ").trim();
      const visible = (element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0
        );
      };
      const images = [...document.images].map((image) => ({
        src: image.getAttribute("src"),
        alt: image.getAttribute("alt"),
        job: image.dataset.imageJob || null,
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        visible: visible(image)
      }));
      const sections = [...document.querySelectorAll("main section")].map(
        (section) => ({
          id: section.id,
          class: section.className
        })
      );
      const allText = [...document.querySelectorAll("body *")]
        .filter((element) => element.children.length === 0)
        .map((element) => normalize(element.textContent || ""))
        .filter(Boolean);
      const hrefs = [...document.querySelectorAll("a[href]")].map((a) =>
        a.getAttribute("href")
      );
      const alts = images.map((image) => image.alt);
      const scripts = [...document.scripts].map((script) => ({
        src: script.getAttribute("src"),
        type: script.getAttribute("type"),
        inline: script.src ? null : normalize(script.textContent || "")
      }));
      const hero = document.querySelector(".hero");
      const heroImage = hero?.querySelector(":scope > img");
      const admitted = {};
      for (const job of [
        "FG-INTENT-HELP",
        "FG-ACTIVITY-TOOL",
        "FG-WILLOW-LANE"
      ]) {
        const matches = images.filter((image) => image.job === job);
        admitted[job] = {
          source: matches[0]?.src || null,
          count: matches.length,
          visibleCount: matches.filter((image) => image.visible).length,
          complete:
            matches.length === 1 &&
            matches.every(
              (image) => image.complete && image.naturalWidth > 0
            )
        };
      }
      const visibleSourceCounts = {};
      for (const image of images.filter((item) => item.visible)) {
        visibleSourceCounts[image.src] =
          (visibleSourceCounts[image.src] || 0) + 1;
      }
      const changedSurfaces = [
        ".explainer",
        ".why-box",
        ".intent",
        ".weekly",
        ".activities",
        ".activity-grid article",
        ".reference",
        ".town",
        ".closet",
        ".postcard-band"
      ].map((selector) => {
        const element = document.querySelector(selector);
        if (!element) return { selector, missing: true };
        const style = getComputedStyle(element);
        return {
          selector,
          color: style.color,
          backgroundColor: style.backgroundColor,
          backgroundImage: style.backgroundImage
        };
      });
      const overlap = [...document.querySelectorAll("[data-image-job]")].map(
        (image) => {
          const imageRect = image.getBoundingClientRect();
          const important = {
            "FG-INTENT-HELP": { x: 0.50, y: 0.08, w: 0.48, h: 0.86 },
            "FG-ACTIVITY-TOOL": { x: 0.18, y: 0.06, w: 0.74, h: 0.88 },
            "FG-WILLOW-LANE": { x: 0.10, y: 0.08, w: 0.80, h: 0.82 }
          }[image.dataset.imageJob];
          const keyRect = {
            left: imageRect.left + imageRect.width * important.x,
            top: imageRect.top + imageRect.height * important.y,
            right:
              imageRect.left +
              imageRect.width * (important.x + important.w),
            bottom:
              imageRect.top +
              imageRect.height * (important.y + important.h)
          };
          const obstructions = [...document.querySelectorAll("a,button,input,label,h1,h2,h3,p,span")]
            .filter((element) => !image.closest("a,article")?.contains(element))
            .filter(visible)
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              return !(
                rect.right <= keyRect.left ||
                rect.left >= keyRect.right ||
                rect.bottom <= keyRect.top ||
                rect.top >= keyRect.bottom
              );
            })
            .map((element) => element.tagName + "." + element.className);
          return {
            job: image.dataset.imageJob,
            rendered: {
              width: Math.round(imageRect.width),
              height: Math.round(imageRect.height)
            },
            obstructions
          };
        }
      );
      return {
        text: normalize(document.body.innerText),
        allText,
        hrefs,
        alts,
        scripts,
        sections,
        structure: {
          headings: document.querySelectorAll("h1,h2,h3,h4,h5,h6").length,
          links: document.querySelectorAll("a[href]").length,
          buttons: document.querySelectorAll("button").length,
          sections: sections.length,
          forms: document.querySelectorAll("form").length,
          images: images.length
        },
        images,
        brokenImages: images.filter(
          (image) =>
            image.visible && (!image.complete || image.naturalWidth === 0)
        ),
        overflow: {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          horizontal:
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth + 1
        },
        hero: {
          src: heroImage?.getAttribute("src"),
          width: Math.round(hero?.getBoundingClientRect().width || 0),
          height: Math.round(hero?.getBoundingClientRect().height || 0)
        },
        rejectedFairyCount: images.filter(
          (image) => image.src === rejectedFairy
        ).length,
        admitted,
        visibleSourceCounts,
        changedSurfaces,
        overlap
      };
    },
    { rejectedFairy }
  );
}

async function captureCrop(page, selector, file) {
  const locator = page.locator(selector).first();
  await locator.scrollIntoViewIfNeeded();
  await locator.screenshot({ path: file });
}

const browser = await chromium.launch({ headless: true });
const summary = [];

try {
  for (const config of configs) {
    const context = await browser.newContext({
      viewport: config.viewport,
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
      locale: "en-CA",
      timezoneId: "America/Vancouver",
      serviceWorkers: "block"
    });
    const incumbentPage = await context.newPage();
    await incumbentPage.goto(`${baseUrl}/incumbent.html`, {
      waitUntil: "domcontentloaded",
      timeout: 60_000
    });
    await loadAllImages(incumbentPage);
    await freezeMotion(incumbentPage);
    const incumbentFacts = await facts(incumbentPage);
    const incumbentRender = path.join(
      evidence,
      config.name.startsWith("desktop") ? "desktop" : "mobile",
      `homepage-incumbent-${config.suffix}.png`
    );
    const incumbentHero = path.join(
      evidence,
      "crops",
      `masthead-incumbent-${config.suffix}.png`
    );
    await incumbentPage.screenshot({ path: incumbentRender, fullPage: true });
    await incumbentPage.locator(".hero").screenshot({ path: incumbentHero });

    const candidatePage = await context.newPage();
    await candidatePage.goto(`${baseUrl}/candidate.html`, {
      waitUntil: "domcontentloaded",
      timeout: 60_000
    });
    await loadAllImages(candidatePage);
    await freezeMotion(candidatePage);
    const candidateFacts = await facts(candidatePage);
    const candidateRender = path.join(
      evidence,
      config.name.startsWith("desktop") ? "desktop" : "mobile",
      `homepage-candidate-${config.suffix}.png`
    );
    const candidateHero = path.join(
      evidence,
      "crops",
      `masthead-candidate-${config.suffix}.png`
    );
    await candidatePage.screenshot({ path: candidateRender, fullPage: true });
    await candidatePage.locator(".hero").screenshot({ path: candidateHero });
    for (const job of Object.keys(admittedJobs)) {
      await captureCrop(
        candidatePage,
        `[data-image-job="${job}"]`,
        path.join(
          evidence,
          "crops",
          `${job.toLowerCase()}-${config.suffix}.png`
        )
      );
    }

    const files = {
      incumbentRender,
      candidateRender,
      incumbentHero,
      candidateHero
    };
    const hashes = Object.fromEntries(
      await Promise.all(
        Object.entries(files).map(async ([key, file]) => [
          key,
          sha256(await fs.readFile(file))
        ])
      )
    );
    const normalized = (value) => sha256(Buffer.from(JSON.stringify(value)));
    const allowedVisibleDuplicates = new Set([
      "/assets/games/girl-talk/truth-card-face.webp",
      "/assets/games/girl-talk/dare-card-face.webp"
    ]);
    const duplicateViolations = Object.entries(
      candidateFacts.visibleSourceCounts
    ).filter(
      ([src, count]) => count > 1 && !allowedVisibleDuplicates.has(src)
    );

    const invariants = {
      structure:
        JSON.stringify(incumbentFacts.structure) ===
        JSON.stringify(candidateFacts.structure),
      text: normalized(incumbentFacts.allText) === normalized(candidateFacts.allText),
      hrefs: normalized(incumbentFacts.hrefs) === normalized(candidateFacts.hrefs),
      imageAlts: normalized(incumbentFacts.alts) === normalized(candidateFacts.alts),
      sectionOrder:
        normalized(incumbentFacts.sections) === normalized(candidateFacts.sections),
      runtime:
        normalized(incumbentFacts.scripts) === normalized(candidateFacts.scripts),
      mastheadSource:
        incumbentFacts.hero.src === candidateFacts.hero.src &&
        candidateFacts.hero.src ===
          "/assets/sunnyvaile-streets/main-street-dusk.webp",
      mastheadDimensions:
        incumbentFacts.hero.width === candidateFacts.hero.width &&
        incumbentFacts.hero.height === candidateFacts.hero.height,
      mastheadPixels: hashes.incumbentHero === hashes.candidateHero,
      noRejectedFairy: candidateFacts.rejectedFairyCount === 0,
      admittedJobs: [
        "FG-INTENT-HELP",
        "FG-ACTIVITY-TOOL",
        "FG-WILLOW-LANE"
      ].every((key) => {
        const job = candidateFacts.admitted[key];
        return Boolean(
          job && job.count === 1 && job.visibleCount === 1 && job.complete
        );
      }),
      duplicateCompliance: duplicateViolations.length === 0,
      noBrokenImages: candidateFacts.brokenImages.length === 0,
      noHorizontalOverflow: !candidateFacts.overflow.horizontal,
      noArtworkObstruction: candidateFacts.overlap.every(
        (item) => item.obstructions.length === 0
      )
    };

    const diagnostic = {
      capturedAt: new Date().toISOString(),
      viewport: config.viewport,
      urls: {
        incumbent: `${baseUrl}/incumbent.html`,
        candidate: `${baseUrl}/candidate.html`
      },
      files: Object.fromEntries(
        Object.entries(files).map(([key, file]) => [
          key,
          path.relative(here, file)
        ])
      ),
      hashes,
      incumbent: incumbentFacts,
      candidate: candidateFacts,
      duplicateViolations,
      invariants
    };
    await fs.writeFile(
      path.join(evidence, "diagnostics", `${config.name}.json`),
      `${JSON.stringify(diagnostic, null, 2)}\n`
    );
    summary.push({ name: config.name, hashes, invariants });
    await context.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify({ status: "CAPTURED", summary }, null, 2));
await import("./audit.mjs");
