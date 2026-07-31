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
const evidence = path.join(here, "evidence", "gate-b-renders");
const baseUrl =
  "http://127.0.0.1:8791/operations/design-explorations/sitewide-style-championship-20260726/cycle-8g/desktop-hierarchy-repeatability-successor/proofs";

const captures = [
  {
    key: "colour1440",
    page: "colour-energy-hierarchy.html",
    viewport: { width: 1440, height: 900 },
    output: "colour-energy-hierarchy-1440.png"
  },
  {
    key: "colour390",
    page: "colour-energy-hierarchy.html",
    viewport: { width: 390, height: 844 },
    output: "colour-energy-hierarchy-390.png"
  },
  {
    key: "mainStreet390",
    page: "main-street-mobile.html",
    viewport: { width: 390, height: 844 },
    output: "main-street-mobile-390.png"
  },
  {
    key: "willow1440",
    page: "willow-lane.html",
    viewport: { width: 1440, height: 900 },
    output: "willow-lane-1440.png"
  },
  {
    key: "willow390",
    page: "willow-lane.html",
    viewport: { width: 390, height: 844 },
    output: "willow-lane-390.png"
  }
];

const sha256 = (bytes) =>
  crypto.createHash("sha256").update(bytes).digest("hex");

async function settle(page) {
  await page.evaluate(async () => {
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const total = document.documentElement.scrollHeight;
    for (let y = 0; y < total; y += Math.max(420, innerHeight * 0.72)) {
      scrollTo(0, y);
      await pause(35);
    }
    scrollTo(0, 0);
    await Promise.all(
      [...document.images].map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      })
    );
    await Promise.race([document.fonts.ready, pause(1500)]);
    await pause(120);
  });
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
    `
  });
}

async function facts(page) {
  return page.evaluate(() => {
    const normalize = (value) => value.replace(/\s+/g, " ").trim();
    const round = (value) => Math.round(value * 100) / 100;
    const rect = (element) => {
      const box = element.getBoundingClientRect();
      return {
        left: round(box.left),
        top: round(box.top),
        right: round(box.right),
        bottom: round(box.bottom),
        width: round(box.width),
        height: round(box.height)
      };
    };
    const visible = (element) => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number(style.opacity) > 0 &&
        box.width > 0 &&
        box.height > 0
      );
    };
    const images = [...document.images].map((image) => ({
      src: image.getAttribute("src"),
      alt: image.getAttribute("alt"),
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      visible: visible(image),
      bounds: rect(image),
      objectFit: getComputedStyle(image).objectFit,
      objectPosition: getComputedStyle(image).objectPosition
    }));
    const sections = [...document.querySelectorAll("main > section")].map(
      (section) => ({
        tag: section.tagName,
        class: section.className,
        ariaLabelledby: section.getAttribute("aria-labelledby"),
        bounds: rect(section)
      })
    );
    const links = [...document.querySelectorAll("a[href]")].map((link) => ({
      href: link.getAttribute("href"),
      text: normalize(link.innerText),
      bounds: rect(link)
    }));
    const imageRects = images.map((image) => image.bounds);
    const visibleText = [
      ...document.querySelectorAll("h1,h2,h3,p,.eyebrow,.action,.text-link")
    ]
      .filter(visible)
      .map((element) => {
        const style = getComputedStyle(element);
        return {
          tag: element.tagName,
          class: element.className,
          text: normalize(element.innerText),
          color: style.color,
          backgroundColor: style.backgroundColor,
          bounds: rect(element)
        };
      });
    const imageTextOverlaps = [];
    for (const text of visibleText) {
      for (const imageRect of imageRects) {
        const intersection =
          Math.max(0, Math.min(text.bounds.right, imageRect.right) -
            Math.max(text.bounds.left, imageRect.left)) *
          Math.max(0, Math.min(text.bounds.bottom, imageRect.bottom) -
            Math.max(text.bounds.top, imageRect.top));
        if (intersection > 1) {
          imageTextOverlaps.push({ text: text.text, intersection: round(intersection) });
        }
      }
    }
    return {
      title: document.title,
      lang: document.documentElement.lang,
      text: normalize(document.body.innerText),
      hrefs: links.map((link) => link.href),
      links,
      imageSources: images.map((image) => image.src),
      alts: images.map((image) => image.alt),
      images,
      brokenImages: images.filter(
        (image) => !image.complete || image.naturalWidth === 0
      ),
      hiddenImages: images.filter((image) => !image.visible),
      sections,
      semanticSectionOrder: sections.map((section) => section.class),
      document: {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        horizontalOverflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1
      },
      mainBounds: rect(document.querySelector("main")),
      visibleText,
      imageTextOverlaps
    };
  });
}

await fs.mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const config of captures) {
    const context = await browser.newContext({
      viewport: config.viewport,
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
      serviceWorkers: "block",
      locale: "en-CA",
      timezoneId: "America/Vancouver"
    });
    const page = await context.newPage();
    await page.goto(`${baseUrl}/${config.page}`, {
      waitUntil: "domcontentloaded",
      timeout: 60_000
    });
    await settle(page);
    const diagnostics = await facts(page);
    const output = path.join(evidence, config.output);
    await page.screenshot({ path: output, fullPage: true });
    const bytes = await fs.readFile(output);
    results.push({
      key: config.key,
      page: config.page,
      viewport: config.viewport,
      file: `evidence/gate-b-renders/${config.output}`,
      bytes: bytes.length,
      sha256: sha256(bytes),
      facts: diagnostics
    });
    await context.close();
  }
} finally {
  await browser.close();
}

const receipt = {
  capturedAt: new Date().toISOString(),
  method: "Playwright Chromium via bundled workspace runtime against isolated Cycle 8G proof sources",
  baseUrl,
  sourceScope: "Cycle 8G only",
  homepageAssemblyOpened: false,
  productionSharedLiveMutation: false,
  results
};
const receiptPath = path.join(evidence, "CAPTURE-RECEIPT.json");
await fs.writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
