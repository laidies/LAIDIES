#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const moduleRoot = process.env.ECO01_PLAYWRIGHT_ROOT;
if (!moduleRoot) throw new Error("ECO01_PLAYWRIGHT_ROOT must point to a temporary package root containing Playwright");
const requireFromRoot = createRequire(path.join(moduleRoot, "package.json"));
const { chromium } = requireFromRoot("playwright");

const url = process.env.ECO01_URL || "http://127.0.0.1:8765/content/library-books/rendered/verification-rulebook.html";
const evidenceDir = process.env.ECO01_BROWSER_EVIDENCE || "operations/product-stewards/learning-content-ecosystem/evidence-eco01-browser";
fs.mkdirSync(evidenceDir, { recursive: true });

const executableCandidates = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium"
];
const executablePath = executableCandidates.find((candidate) => fs.existsSync(candidate));
if (!executablePath) throw new Error("No local Chrome/Chromium executable found");

const browser = await chromium.launch({ headless: true, executablePath });
const results = [];
const check = (condition, name, detail = "") => {
  results.push({ name, pass: Boolean(condition), detail });
  if (!condition) throw new Error(`${name}${detail ? `: ${detail}` : ""}`);
};
const measureContrasts = (page, roles) => page.evaluate((requestedRoles) => {
  const parseRgb = (value) => {
    const channels = value.match(/[\d.]+/g)?.slice(0, 3).map(Number);
    return channels?.length === 3 ? channels : null;
  };
  const opaqueBackground = (node) => {
    for (let current = node; current; current = current.parentElement) {
      const value = getComputedStyle(current).backgroundColor;
      const channels = value.match(/[\d.]+/g)?.map(Number);
      if (channels?.length >= 3 && (channels.length < 4 || channels[3] > 0)) return value;
    }
    return "rgb(255, 255, 255)";
  };
  const luminance = (rgb) => {
    const linear = rgb.map((channel) => {
      const value = channel / 255;
      return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
    });
    return .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2];
  };
  const contrast = (foreground, background) => {
    const lighter = Math.max(luminance(foreground), luminance(background));
    const darker = Math.min(luminance(foreground), luminance(background));
    return (lighter + .05) / (darker + .05);
  };
  return requestedRoles.map(({ role, selector, minimum }) => {
    const node = document.querySelector(selector);
    const foreground = node ? getComputedStyle(node).color : "";
    const background = node ? opaqueBackground(node) : "";
    const ratio = node ? contrast(parseRgb(foreground), parseRgb(background)) : 0;
    return { role, selector, minimum, foreground, background, ratio };
  });
}, roles);

try {
  for (const width of [320, 390, 430, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "no-preference" });
    await page.goto(url, { waitUntil: "networkidle" });
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      h1Count: document.querySelectorAll("h1").length,
      holdVisible: Boolean(document.querySelector(".vr-hold")?.getClientRects().length)
    }));
    check(metrics.scrollWidth <= metrics.clientWidth + 1, `width-${width}-no-horizontal-overflow`, JSON.stringify(metrics));
    check(metrics.h1Count === 1 && metrics.holdVisible, `width-${width}-structure-and-hold`);
    await page.screenshot({ path: path.join(evidenceDir, `eco01-${width}px.png`), fullPage: false });
    await page.close();
  }

  const zoomPage = await browser.newPage({ viewport: { width: 720, height: 900 } });
  await zoomPage.goto(url, { waitUntil: "networkidle" });
  await zoomPage.evaluate(() => { document.documentElement.style.zoom = "2"; });
  const zoomMetrics = await zoomPage.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    holdVisible: Boolean(document.querySelector(".vr-hold")?.getClientRects().length)
  }));
  check(zoomMetrics.scrollWidth <= zoomMetrics.clientWidth + 1, "zoom-200-equivalent-no-horizontal-overflow", JSON.stringify(zoomMetrics));
  check(zoomMetrics.holdVisible, "zoom-200-equivalent-hold-visible");
  await zoomPage.screenshot({ path: path.join(evidenceDir, "eco01-200pct-css-zoom.png"), fullPage: false });
  await zoomPage.close();

  const anchorPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await anchorPage.goto(url, { waitUntil: "networkidle" });
  await anchorPage.locator('a[href="#receipt-loop"]').focus();
  await anchorPage.keyboard.press("Enter");
  await anchorPage.waitForTimeout(1200);
  const anchorMetrics = await anchorPage.evaluate(() => {
    const target = document.querySelector("#receipt-loop");
    const bar = document.querySelector(".vr-topbar");
    return {
      targetTop: target.getBoundingClientRect().top,
      barBottom: bar.getBoundingClientRect().bottom,
      barPosition: getComputedStyle(bar).position
    };
  });
  check(anchorMetrics.barPosition === "sticky" && anchorMetrics.barBottom > 0 && anchorMetrics.targetTop >= anchorMetrics.barBottom - 1, "sticky-anchor-visible", JSON.stringify(anchorMetrics));
  await anchorPage.close();

  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: "reduce" });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined });
    document.execCommand = () => false;
  });
  await page.goto(url, { waitUntil: "networkidle" });
  check(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === "auto"), "reduced-motion-scroll-behavior");

  const form = page.locator('[data-check="chapter-4"]');
  await form.locator('input[value="official"]').check();
  await form.locator('textarea[name="chapter-4-reason"]').fill("purple toaster purple toaster purple toaster");
  await form.locator('textarea[name="chapter-4-action"]').fill("purple toaster purple toaster purple toaster");
  const submit = form.locator('button[type="submit"]');
  await submit.focus();
  await page.keyboard.press("Enter");
  const nonsense = await form.evaluate((node) => {
    const feedback = node.querySelector(".vr-feedback");
    return {
      result: feedback.dataset.result,
      text: feedback.textContent,
      rubricVisible: !node.querySelector("[data-self-check]").hidden,
      feedbackIsActive: document.activeElement === feedback,
      role: feedback.getAttribute("role"),
      atomic: feedback.getAttribute("aria-atomic")
    };
  });
  check(nonsense.result === "self-check-ready", "nonsense-remains-self-check-ready", JSON.stringify(nonsense));
  check(!/passed|correct/i.test(nonsense.text), "nonsense-not-labelled-correct", nonsense.text);
  check(nonsense.rubricVisible, "comparison-rubric-revealed");
  check(!nonsense.feedbackIsActive && nonsense.role === "status" && nonsense.atomic === "true", "live-region-in-place-no-focus-theft", JSON.stringify(nonsense));

  const rubricChoices = form.locator("[data-rubric-choice]");
  check(await rubricChoices.count() === 4, "four-dimension-self-check-rubric");
  for (let index = 0; index < 4; index += 1) await rubricChoices.nth(index).selectOption(index === 0 ? "unsure" : "revise");
  await form.locator("[data-record-self-check]").click();
  const recorded = await form.locator(".vr-feedback").evaluate((node) => ({ result: node.dataset.result, text: node.textContent }));
  check(recorded.result === "recorded" && /not an independent correctness score/i.test(recorded.text), "self-check-recorded-truthfully", JSON.stringify(recorded));

  const copyButton = page.locator("[data-copy-target]");
  await copyButton.scrollIntoViewIfNeeded();
  await copyButton.click();
  const copyState = await page.evaluate(() => ({
    status: document.querySelector(".vr-copy-status")?.textContent,
    selected: document.querySelector("#vr-prompt-text")?.selectionEnd > document.querySelector("#vr-prompt-text")?.selectionStart
  }));
  check(/unavailable/i.test(copyState.status || "") && copyState.selected, "clipboard-failure-recovery", JSON.stringify(copyState));

  const promptContrast = await measureContrasts(page, [
    { role: "heading", selector: ".vr-prompt > h2", minimum: 3 },
    { role: "intro", selector: ".vr-prompt > p:not(.vr-copy-status):not(.vr-warning)", minimum: 4.5 },
    { role: "label", selector: ".vr-prompt > label", minimum: 4.5 },
    { role: "prompt-text", selector: ".vr-prompt > textarea", minimum: 4.5 },
    { role: "copy-button", selector: ".vr-prompt > .vr-copy", minimum: 4.5 },
    { role: "copy-status", selector: ".vr-prompt > .vr-copy-status", minimum: 4.5 },
    { role: "critical-warning", selector: ".vr-prompt > .vr-warning", minimum: 4.5 },
    { role: "claim-copy", selector: ".vr-prompt > .vr-claim p", minimum: 4.5 },
    { role: "claim-link", selector: ".vr-prompt > .vr-claim a", minimum: 4.5 }
  ]);
  for (const role of promptContrast) {
    check(role.ratio >= role.minimum, `prompt-contrast-${role.role}`, JSON.stringify(role));
  }
  const claimRoles = promptContrast.filter(({ role }) => role === "claim-copy" || role === "claim-link");
  check(
    claimRoles.every(({ foreground }) => foreground !== "rgb(255, 255, 255)"),
    "prompt-claim-card-retains-dark-text-colours",
    JSON.stringify(claimRoles)
  );
  const screenColours = Object.fromEntries(promptContrast.map(({ role, foreground, background }) => [role, { foreground, background }]));
  check(
    screenColours.heading.foreground === "rgb(255, 255, 255)"
      && screenColours["critical-warning"].foreground === "rgb(255, 224, 155)"
      && screenColours["claim-copy"].foreground === "rgb(37, 22, 45)"
      && screenColours["claim-link"].foreground === "rgb(22, 79, 145)",
    "screen-prompt-colours-unchanged",
    JSON.stringify(screenColours)
  );

  await page.evaluate(() => document.activeElement?.blur());
  await page.keyboard.press("Tab");
  const focusState = await page.evaluate(() => {
    const node = document.activeElement;
    const style = getComputedStyle(node);
    return { tag: node?.tagName, text: node?.textContent?.trim().slice(0, 40), outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
  });
  check(["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(focusState.tag) && focusState.outlineStyle !== "none" && parseFloat(focusState.outlineWidth) >= 3, "keyboard-focus-visible", JSON.stringify(focusState));
  await page.screenshot({ path: path.join(evidenceDir, "eco01-interaction-mobile.png"), fullPage: false });
  await page.close();

  const printPage = await browser.newPage({ viewport: { width: 900, height: 1200 } });
  await printPage.emulateMedia({ media: "print" });
  await printPage.goto(url, { waitUntil: "networkidle" });
  const printPanel = await printPage.locator(".vr-prompt").evaluate((node) => ({
    background: getComputedStyle(node).backgroundColor,
    copyButtonDisplay: getComputedStyle(node.querySelector(".vr-copy")).display
  }));
  check(
    printPanel.background === "rgb(255, 255, 255)" && printPanel.copyButtonDisplay === "none",
    "print-prompt-background-and-controls",
    JSON.stringify(printPanel)
  );
  const printContrast = await measureContrasts(printPage, [
    { role: "heading", selector: ".vr-prompt > h2", minimum: 3 },
    { role: "intro", selector: ".vr-prompt > p:not(.vr-copy-status):not(.vr-warning)", minimum: 4.5 },
    { role: "label", selector: ".vr-prompt > label", minimum: 4.5 },
    { role: "prompt-text", selector: ".vr-prompt > textarea", minimum: 4.5 },
    { role: "critical-warning", selector: ".vr-prompt > .vr-warning", minimum: 4.5 },
    { role: "claim-copy", selector: ".vr-prompt > .vr-claim p", minimum: 4.5 },
    { role: "claim-link", selector: ".vr-prompt > .vr-claim a", minimum: 4.5 }
  ]);
  for (const role of printContrast) {
    check(role.ratio >= role.minimum, `print-prompt-contrast-${role.role}`, JSON.stringify(role));
  }
  const printColours = Object.fromEntries(printContrast.map(({ role, foreground, background }) => [role, { foreground, background }]));
  check(
    printColours["critical-warning"].foreground === "rgb(0, 0, 0)"
      && printColours["critical-warning"].background === "rgb(255, 255, 255)"
      && printColours["claim-copy"].foreground === "rgb(37, 22, 45)"
      && printColours["claim-link"].foreground === "rgb(22, 79, 145)",
    "print-warning-dark-with-claim-colours-preserved",
    JSON.stringify(printColours)
  );
  await printPage.locator(".vr-prompt").screenshot({ path: path.join(evidenceDir, "eco01-print-prompt.png") });
  await printPage.close();
} finally {
  await browser.close();
}

const report = { url, executablePath, created: new Date().toISOString(), results };
fs.writeFileSync(path.join(evidenceDir, "matrix.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(`ECO-01 BROWSER MATRIX PASS: ${results.length} checks`);
console.log(`evidence=${evidenceDir}`);
