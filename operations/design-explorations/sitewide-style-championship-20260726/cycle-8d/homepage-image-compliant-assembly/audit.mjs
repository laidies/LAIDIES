#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(
  "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright"
);

const here = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(here, "evidence", "diagnostics");
const baseUrl =
  "http://127.0.0.1:8788/operations/design-explorations/sitewide-style-championship-20260726/cycle-8d/homepage-image-compliant-assembly/candidate.html";

const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "390", width: 390, height: 844 }
];

const surfaces = [
  { selector: ".explainer", backgrounds: ["#0b3444", "#10243b", "#241a36"] },
  { selector: ".why-box", backgrounds: ["#23385d", "#2a173d"] },
  { selector: ".intent", backgrounds: ["#0a2740", "#113b4b", "#4a223d"] },
  { selector: ".weekly", backgrounds: ["#096f78", "#18496b", "#432b59"] },
  { selector: ".activities", backgrounds: ["#111f35"] },
  { selector: ".reference", backgrounds: ["#087f83", "#15546b", "#292341"] },
  { selector: ".town", backgrounds: ["#0d2d43", "#11223a"] },
  { selector: ".closet", backgrounds: ["#263a59", "#332040"] },
  { selector: ".postcard-band", backgrounds: ["#b9415e", "#7b2f55", "#28365a"] }
];

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: "reduce",
      locale: "en-CA",
      timezoneId: "America/Vancouver",
      serviceWorkers: "block"
    });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.evaluate(async () => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const total = document.documentElement.scrollHeight;
      for (let y = 0; y < total; y += Math.max(420, innerHeight * 0.7)) {
        scrollTo(0, y);
        await wait(30);
      }
      scrollTo(0, 0);
      await Promise.race([document.fonts.ready, wait(1500)]);
    });

    const contrast = await page.evaluate((surfaceDefinitions) => {
      const parseRgb = (value) => {
        const match = value.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/);
        return match ? match.slice(1, 4).map(Number) : null;
      };
      const parseHex = (value) => {
        const hex = value.replace("#", "");
        return [
          parseInt(hex.slice(0, 2), 16),
          parseInt(hex.slice(2, 4), 16),
          parseInt(hex.slice(4, 6), 16)
        ];
      };
      const luminance = (rgb) => {
        const channels = rgb.map((value) => {
          const channel = value / 255;
          return channel <= 0.04045
            ? channel / 12.92
            : Math.pow((channel + 0.055) / 1.055, 2.4);
        });
        return (
          0.2126 * channels[0] +
          0.7152 * channels[1] +
          0.0722 * channels[2]
        );
      };
      const ratio = (foreground, background) => {
        const high = Math.max(luminance(foreground), luminance(background));
        const low = Math.min(luminance(foreground), luminance(background));
        return (high + 0.05) / (low + 0.05);
      };
      const visible = (element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          Number(style.opacity) > 0 &&
          rect.width > 0 &&
          rect.height > 0
        );
      };
      const ownOpaqueBackgrounds = (element, stopAt) => {
        for (let current = element; current && current !== stopAt; current = current.parentElement) {
          const currentStyle = getComputedStyle(current);
          const gradientColors = [
            ...currentStyle.backgroundImage.matchAll(
              /rgb\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\s*\)/g
            )
          ].map((match) => match.slice(1, 4).map(Number));
          if (gradientColors.length) return gradientColors;
          const value = currentStyle.backgroundColor;
          const match = value.match(
            /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/
          );
          if (match && (match[4] === undefined || Number(match[4]) >= 0.98)) {
            return [[Number(match[1]), Number(match[2]), Number(match[3])]];
          }
        }
        return null;
      };
      const records = [];
      for (const definition of surfaceDefinitions) {
        const surface = document.querySelector(definition.selector);
        if (!surface) {
          records.push({ selector: definition.selector, missing: true, descendants: [] });
          continue;
        }
        const candidates = [...surface.querySelectorAll(
          "h1,h2,h3,h4,h5,h6,p,a,button,label,summary,blockquote,cite,li,span,strong,small,input"
        )].filter((element) => {
          const ownText = [...element.childNodes]
            .filter((node) => node.nodeType === Node.TEXT_NODE)
            .map((node) => node.textContent || "")
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();
          return visible(element) && (ownText || element.matches("input"));
        });
        const descendants = candidates.map((element) => {
          const style = getComputedStyle(element);
          const foreground = parseRgb(style.color);
          const ownBackgrounds = ownOpaqueBackgrounds(element, surface);
          const backgrounds = ownBackgrounds
            ? ownBackgrounds
            : definition.backgrounds.map(parseHex);
          const ratios = backgrounds.map((background) =>
            ratio(foreground, background)
          );
          const fontSize = parseFloat(style.fontSize);
          const fontWeight = Number(style.fontWeight) || 400;
          const large = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
          const required = large ? 3 : 4.5;
          const text = (element.value || element.textContent || "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 140);
          return {
            element:
              element.tagName.toLowerCase() +
              (element.id ? `#${element.id}` : "") +
              (element.className && typeof element.className === "string"
                ? `.${element.className.trim().replace(/\s+/g, ".")}`
                : ""),
            text,
            color: style.color,
            backgrounds: backgrounds.map(
              (background) => `rgb(${background.join(", ")})`
            ),
            ratios: ratios.map((value) => Number(value.toFixed(2))),
            minimumRatio: Number(Math.min(...ratios).toFixed(2)),
            required,
            pass: ratios.every((value) => value >= required)
          };
        });
        records.push({
          selector: definition.selector,
          missing: false,
          descendants
        });
      }
      const failures = records.flatMap((record) =>
        record.descendants
          .filter((item) => !item.pass)
          .map((item) => ({ surface: record.selector, ...item }))
      );
      return {
        surfaces: records,
        checkedDescendants: records.reduce(
          (total, record) => total + record.descendants.length,
          0
        ),
        failures,
        pass: failures.length === 0
      };
    }, surfaces);

    const interactions = await page.evaluate(async () => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const visible = (element) => {
        if (!element) return false;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0
        );
      };
      const result = {};

      const why = document.querySelector(".why-box");
      if (why?.matches("details")) {
        const before = why.open;
        why.querySelector("summary")?.click();
        await wait(40);
        result.whyToggle = { before, after: why.open, pass: why.open !== before };
      } else {
        result.whyToggle = { notApplicable: true, pass: true };
      }

      const filterButtons = [...document.querySelectorAll(".filter button")];
      if (filterButtons.length > 1) {
        const target = filterButtons[1];
        target.click();
        await wait(80);
        result.activityFilter = {
          clicked: target.textContent.trim(),
          active: target.classList.contains("active"),
          visibleCards: [...document.querySelectorAll(".activity-grid article")].filter(visible).length,
          pass:
            target.classList.contains("active") &&
            [...document.querySelectorAll(".activity-grid article")].some(visible)
        };
        filterButtons[0]?.click();
      } else {
        result.activityFilter = { notApplicable: true, pass: true };
      }

      const mapSpot = document.querySelector(".map-spot, [data-map-target], .hotspot");
      if (mapSpot) {
        mapSpot.click();
        await wait(80);
        const popup = document.querySelector(
          ".map-pop, .map-popup, .town-popup, [role='dialog'], .map-card"
        );
        result.mapPopup = {
          target: mapSpot.getAttribute("aria-label") || mapSpot.textContent.trim(),
          popupVisible: visible(popup),
          pass: visible(popup)
        };
      } else {
        result.mapPopup = { notApplicable: true, pass: true };
      }

      const menuButton = document.querySelector(
        ".menu-toggle, [aria-controls*='nav'], button[aria-label*='menu' i]"
      );
      if (menuButton && visible(menuButton)) {
        menuButton.click();
        await wait(60);
        const controls = menuButton.getAttribute("aria-controls");
        const menu = controls ? document.getElementById(controls) : document.querySelector(".mobile-nav");
        result.mobileMenu = {
          expanded: menuButton.getAttribute("aria-expanded"),
          menuVisible: visible(menu),
          pass:
            menuButton.getAttribute("aria-expanded") === "true" || visible(menu)
        };
      } else {
        result.mobileMenu = { notApplicable: true, pass: true };
      }

      result.pass = Object.values(result).every((item) => item.pass);
      return result;
    });

    const diagnostic = {
      auditedAt: new Date().toISOString(),
      viewport: { width: viewport.width, height: viewport.height },
      url: baseUrl,
      contrast,
      interactions,
      consoleErrors,
      pageErrors,
      pass:
        contrast.pass &&
        interactions.pass &&
        pageErrors.length === 0
    };
    await fs.writeFile(
      path.join(outputDir, `surface-descendant-and-interaction-${viewport.name}.json`),
      `${JSON.stringify(diagnostic, null, 2)}\n`
    );
    results.push({
      viewport: viewport.name,
      contrastPass: contrast.pass,
      contrastFailures: contrast.failures.length,
      interactionPass: interactions.pass,
      pageErrors: pageErrors.length,
      consoleErrors: consoleErrors.length,
      pass: diagnostic.pass
    });
    await context.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify({ status: "AUDITED", results }, null, 2));
