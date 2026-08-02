#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const moduleRoot = process.env.HIGH_PLAYWRIGHT_ROOT;
if (!moduleRoot) throw new Error('HIGH_PLAYWRIGHT_ROOT must point to a package root containing playwright-core');
const requireFromRoot = createRequire(path.join(moduleRoot, 'package.json'));
const { chromium } = requireFromRoot('playwright-core');
const base = process.env.HIGH_URL || 'http://127.0.0.1:4190';
const capture = process.argv.includes('--capture');
const evidenceRoot = path.join(root, 'operations/video-qa/sunnyvaile-high-class-runtime-motion-audit-2026-08-01');
const classRegister = JSON.parse(fs.readFileSync(path.join(root, 'content/site/high-classes.json'), 'utf8'));
const sourcePath = 'learn/class.html';
const sourceFile = path.join(root, sourcePath);
const sourceHash = crypto.createHash('sha256').update(fs.readFileSync(sourceFile)).digest('hex');
const executablePath = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium'
].find((candidate) => fs.existsSync(candidate));
if (!executablePath) throw new Error('No local Chrome/Chromium executable found');

const browser = await chromium.launch({ headless: true, executablePath });
const assertions = [];
const captures = [];

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

async function localOnly(page) {
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') await route.continue();
    else await route.abort();
  });
}

async function openClass(page, slug) {
  await page.goto(`${base}/learn/class.html?c=${encodeURIComponent(slug)}`, { waitUntil: 'networkidle' });
  await page.locator('#tv').waitFor();
}

async function motionState(page) {
  return page.evaluate(() => {
    const tv = document.querySelector('#tv');
    const inner = document.querySelector('#screen-inner');
    const tvAfter = getComputedStyle(tv, '::after');
    const innerStyle = getComputedStyle(inner);
    return {
      tv: {
        disabled: tv.disabled,
        animation_name: tvAfter.animationName,
        animation_duration: tvAfter.animationDuration,
        animation_iteration_count: tvAfter.animationIterationCount,
        opacity: tvAfter.opacity
      },
      screen: {
        open: document.querySelector('#screen').classList.contains('is-on'),
        animation_name: innerStyle.animationName,
        animation_duration: innerStyle.animationDuration,
        animation_iteration_count: innerStyle.animationIterationCount,
        transform: innerStyle.transform,
        filter: innerStyle.filter
      },
      viewport: {
        client_width: document.documentElement.clientWidth,
        scroll_width: document.documentElement.scrollWidth,
        body_scroll_width: document.body.scrollWidth
      }
    };
  });
}

async function captureScenario({ width, height, reducedMotion, label }) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion });
  await localOnly(page);
  await openClass(page, 'basics-current-context');
  const closed = await motionState(page);
  assert.ok(closed.viewport.scroll_width <= closed.viewport.client_width + 1, `${label}: page overflow before open`);
  assert.ok(closed.viewport.body_scroll_width <= closed.viewport.client_width + 1, `${label}: body overflow before open`);
  if (reducedMotion === 'reduce') {
    assert.equal(closed.tv.animation_name, 'none', `${label}: tvpulse must stop for reduced motion`);
    assert.equal(closed.tv.opacity, '0.5', `${label}: reduced-motion TV affordance must remain visible`);
  } else {
    assert.equal(closed.tv.animation_name, 'tvpulse', `${label}: tvpulse is absent`);
    assert.equal(closed.tv.animation_duration, '2.6s', `${label}: unexpected tvpulse duration`);
    assert.equal(closed.tv.animation_iteration_count, 'infinite', `${label}: tvpulse should repeat while the TV is available`);
  }
  await page.locator('#tv').focus();
  if (capture) {
    fs.mkdirSync(evidenceRoot, { recursive: true });
    const affordanceFilename = `${label}-tv-affordance.png`;
    const affordanceAbsolute = path.join(evidenceRoot, affordanceFilename);
    await page.locator('.room').screenshot({ path: affordanceAbsolute });
    captures.push({
      path: path.posix.join('operations/video-qa/sunnyvaile-high-class-runtime-motion-audit-2026-08-01', affordanceFilename),
      sha256: sha256(affordanceAbsolute),
      width,
      height,
      reduced_motion: reducedMotion === 'reduce',
      state: 'focused-tv-affordance'
    });
  }
  await page.keyboard.press('Enter');
  await page.locator('#screen.is-on').waitFor();
  const opening = await motionState(page);
  assert.ok(opening.viewport.scroll_width <= opening.viewport.client_width + 1, `${label}: page overflow after open`);
  assert.ok(opening.viewport.body_scroll_width <= opening.viewport.client_width + 1, `${label}: body overflow after open`);
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'screen-close', `${label}: modal focus did not move to Close`);
  if (reducedMotion === 'reduce') {
    assert.equal(opening.screen.animation_name, 'none', `${label}: crton must stop for reduced motion`);
  } else {
    assert.equal(opening.screen.animation_name, 'crton', `${label}: crton is absent`);
    assert.equal(opening.screen.animation_duration, '0.42s', `${label}: unexpected crton duration`);
    assert.equal(opening.screen.animation_iteration_count, '1', `${label}: crton must not loop`);
  }
  await page.waitForTimeout(500);
  const settled = await motionState(page);
  assert.equal(settled.screen.open, true, `${label}: modal closed during the opening effect`);
  const filename = `${label}.png`;
  if (capture) {
    fs.mkdirSync(evidenceRoot, { recursive: true });
    const absolute = path.join(evidenceRoot, filename);
    await page.screenshot({ path: absolute, fullPage: false });
    captures.push({
      path: path.posix.join('operations/video-qa/sunnyvaile-high-class-runtime-motion-audit-2026-08-01', filename),
      sha256: sha256(absolute),
      width,
      height,
      reduced_motion: reducedMotion === 'reduce',
      state: 'settled-production-status-dialog'
    });
  }
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#screen').getAttribute('aria-hidden'), 'true', `${label}: Escape did not close the modal`);
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'tv', `${label}: focus did not return to the TV`);
  assertions.push({ label, width, height, reduced_motion: reducedMotion === 'reduce', closed, opening, settled });
  await page.close();
}

try {
  for (const scenario of [
    { width: 1280, height: 900, reducedMotion: 'no-preference', label: 'desktop-standard-motion' },
    { width: 390, height: 844, reducedMotion: 'no-preference', label: 'mobile-standard-motion' },
    { width: 1280, height: 900, reducedMotion: 'reduce', label: 'desktop-reduced-motion' },
    { width: 390, height: 844, reducedMotion: 'reduce', label: 'mobile-reduced-motion' }
  ]) await captureScenario(scenario);

  // Every registered class uses this one template and the same two animation
  // definitions. Exercise all current slugs so a broken query state cannot be
  // mistaken for a reviewed occurrence.
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await localOnly(page);
  for (const cls of classRegister.classes) {
    await openClass(page, cls.slug);
    assert.equal(await page.locator('#hd-name').textContent(), cls.name, cls.slug);
    assert.equal((await motionState(page)).tv.animation_name, 'none', `${cls.slug}: reduced motion did not disable tvpulse`);
    await page.locator('#tv').click();
    assert.equal((await motionState(page)).screen.animation_name, 'none', `${cls.slug}: reduced motion did not disable crton`);
    await page.keyboard.press('Escape');
  }
  await page.close();

  if (capture) {
    const evidence = {
      schema_version: 1,
      evidence_date: new Date().toISOString().slice(0, 10),
      status: 'PASS',
      source_path: sourcePath,
      source_sha256: sourceHash,
      registered_class_instances: classRegister.classes.length,
      reviewed_class_instances: classRegister.classes.length,
      animation_reviews: [
        {
          name: 'tvpulse',
          kind: 'CSS_KEYFRAMES',
          source_type: 'semantic_animation',
          interface_trigger: 'A registered class page renders its television control.',
          silent_purpose: 'Make the small television control discoverable without changing lesson meaning or claiming that a class tape is available.',
          status: 'PASS'
        },
        {
          name: 'crton',
          kind: 'CSS_KEYFRAMES',
          source_type: 'decorative_motion',
          interface_trigger: 'A visitor activates the television control.',
          silent_purpose: 'Open the class-tape or production-status dialog with a brief, one-shot CRT power-on transition.',
          status: 'PASS'
        }
      ],
      checks: {
        desktop_and_mobile: true,
        no_horizontal_overflow: true,
        keyboard_open_close_and_focus_restore: true,
        reduced_motion_disables_both_animations: true,
        reduced_motion_preserves_static_tv_affordance: true,
        all_registered_class_slugs_use_the_reviewed_template: true,
        class_video_admission_changed: false
      },
      assertions,
      captures
    };
    fs.writeFileSync(path.join(evidenceRoot, 'class-runtime-motion-audit.json'), `${JSON.stringify(evidence, null, 2)}\n`);
  }
  console.log(`CLASS PLAYER RUNTIME MOTION PASS (${classRegister.classes.length} registered class states; 4 responsive/reduced-motion scenarios)`);
} finally {
  await browser.close();
}
