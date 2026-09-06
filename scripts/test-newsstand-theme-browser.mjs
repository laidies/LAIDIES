#!/usr/bin/env node
// Test the real deployed-player integration, including native audio playback.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';

const root = process.env.NEWSSTAND_THEME_ROOT;
const external = process.env.NEWSSTAND_THEME_URL;
const playwright = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwright || (!root && !external)) throw Error('Set PLAYWRIGHT_CORE_PATH and NEWSSTAND_THEME_ROOT or NEWSSTAND_THEME_URL.');
const {chromium} = await import(pathToFileURL(path.join(playwright, 'index.mjs')));
const output = process.env.NEWSSTAND_THEME_OUTPUT;
if (output) fs.mkdirSync(output, {recursive: true});
const mime = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.mp3':'audio/mpeg', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml'};
let server;
let origin = external;
if (!external) {
  server = http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    let relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    if (!path.extname(relative)) relative = relative ? relative + '.html' : 'index.html';
    const file = path.resolve(root, relative);
    if (!file.startsWith(path.resolve(root) + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      response.writeHead(404).end('Not found'); return;
    }
    const size = fs.statSync(file).size;
    const range = /bytes=(\d+)-(\d*)/.exec(request.headers.range || '');
    const headers = {'content-type':mime[path.extname(file)] || 'application/octet-stream', 'accept-ranges':'bytes'};
    if (range) {
      const start = Number(range[1]), end = Math.min(Number(range[2] || size - 1), size - 1);
      if (start > end || start >= size) { response.writeHead(416).end(); return; }
      response.writeHead(206, {...headers, 'content-range':`bytes ${start}-${end}/${size}`, 'content-length':end-start+1});
      fs.createReadStream(file, {start, end}).pipe(response);
    } else {
      response.writeHead(200, {...headers, 'content-length':size});
      fs.createReadStream(file).pipe(response);
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
}
const browser = await chromium.launch({headless:true, executablePath:process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const results = [];
async function context(width) {
  const ctx = await browser.newContext({viewport:{width, height:900}});
  await ctx.addInitScript(() => {
    window.__themeAudio = [];
    const NativeAudio = window.Audio;
    window.Audio = function (...args) {
      const audio = new NativeAudio(...args);
      window.__themeAudio.push(audio);
      return audio;
    };
    window.Audio.prototype = NativeAudio.prototype;
  });
  return ctx;
}
async function insertRelatedSong(page, id, label) {
  await page.evaluate(({id, label}) => {
    const control = document.createElement('div');
    control.className = 'related-song-test';
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.ksvlTrack = id;
    button.setAttribute('aria-describedby', 'related-song-status');
    button.textContent = label;
    const status = document.createElement('span');
    status.id = 'related-song-status';
    status.setAttribute('role', 'status');
    control.append(button, status);
    document.body.append(control);
  }, {id, label});
  return page.getByRole('button', {name:label, exact:true});
}
async function assertDynamicAdmittedSong(page, ctx) {
  const label = 'Play Sister Mary Clarence theme';
  const button = await insertRelatedSong(page, 'saint-sister-mary-clarence', label);
  await page.waitForFunction(name => {
    const candidate = Array.from(document.querySelectorAll('button[data-ksvl-track]'))
      .find(button => button.textContent === name);
    return candidate && !candidate.disabled;
  }, label);
  assert.equal(await page.evaluate(() => window.__themeAudio.some(audio => !audio.paused)), false, 'Inserting a related song must not autoplay');
  await button.focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => {
    const state = window.KSVL_getPublicState();
    return state && state.trackId === 'saint-sister-mary-clarence' && !state.paused;
  });
  await page.waitForFunction(() => document.querySelector('.ksvl-now-playing.is-visible'));
  assert.equal(await page.locator('.ksvl-now-playing.is-visible').count(), 1, 'Dynamic selection must use the existing in-page deck');
  assert.equal(await page.locator('.ksvl-np-btn--play').evaluate(el => document.activeElement === el), true, 'Dynamic keyboard selection must move focus to the deck');
  assert.equal(ctx.pages().length, 1, 'Dynamic selection must not open another tab');
  await page.locator('.ksvl-np-btn--stop').click();
  await page.waitForFunction(name => document.activeElement && document.activeElement.textContent === name, label);
  assert.equal(await page.evaluate(() => window.__themeAudio.every(audio => audio.paused)), true);
  await button.evaluate(button => button.closest('.related-song-test').remove());
  const reinserted = await insertRelatedSong(page, 'saint-sister-mary-clarence', label);
  await page.waitForFunction(name => {
    const candidate = Array.from(document.querySelectorAll('button[data-ksvl-track]'))
      .find(button => button.textContent === name);
    return candidate && !candidate.disabled;
  }, label);
  await reinserted.click();
  await page.waitForFunction(() => window.__themeAudio.filter(audio => !audio.paused).length === 1);
  await page.locator('.ksvl-np-btn--stop').click();
}
async function assertDynamicUnavailableSong(page, id, label) {
  const button = await insertRelatedSong(page, id, label);
  await page.waitForFunction(name => {
    const candidate = Array.from(document.querySelectorAll('button[data-ksvl-track]'))
      .find(button => button.textContent === name);
    return candidate && candidate.disabled && /unavailable/.test(document.getElementById('related-song-status').textContent);
  }, label);
  assert.equal(await button.isDisabled(), true, 'Unavailable dynamic song must remain disabled');
  assert.equal(await page.evaluate(() => window.__themeAudio.some(audio => !audio.paused)), false, 'Unavailable dynamic song must not autoplay');
}
try {
  for (const width of [1280, 390, 320]) {
    const ctx = await context(width);
    const page = await ctx.newPage();
    if (process.env.NEWSSTAND_THEME_CALIBRATE) {
      await page.route('**/newsstand', route => route.fulfill({path:path.join(process.env.NEWSSTAND_THEME_CALIBRATE, 'newsstand.html'), contentType:'text/html'}));
    }
    await page.goto(origin + '/newsstand', {waitUntil:'domcontentloaded'});
    const button = page.getByRole('button', {name:'Play the NewsStand theme', exact:true});
    assert.equal(await button.count(), 1, 'Masthead must expose the theme button');
    await page.waitForFunction(() => !document.querySelector('[data-ksvl-track="the-newsstand"]').disabled);
    assert.equal(await page.evaluate(() => window.__themeAudio.some(a => !a.paused)), false, 'Fresh visit must not autoplay');
    assert.equal(await button.evaluate(el => !!el.closest('.ns-v11-brandbar')), true);
    await button.focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => window.__themeAudio.some(a => !a.paused && a.currentTime > 0.3 && a.duration > 30));
    const state = await page.evaluate(() => window.KSVL_getPublicState());
    assert.equal(state.trackId, 'the-newsstand');
    assert.equal(state.title, 'The NewsStand');
    assert.equal(state.artist, 'The Embeddings');
    assert.equal(state.repeatMode, 'off');
    assert.equal(ctx.pages().length, 1, 'Theme must not open another tab');
    assert.equal(page.url(), origin + '/newsstand', 'Theme must not navigate away');
    const deck = page.locator('.ksvl-now-playing.is-visible');
    assert.equal(await deck.count(), 1);
    await page.waitForFunction(() => document.activeElement === document.querySelector('.ksvl-np-btn--play'));
    assert.equal(await page.locator('.ksvl-np-btn--play').evaluate(el => document.activeElement === el), true, 'Keyboard focus must reach player controls');
    await page.keyboard.press('Space');
    await page.waitForFunction(() => window.__themeAudio.every(a => a.paused));
    await page.keyboard.press('Space');
    await page.waitForFunction(() => window.__themeAudio.some(a => !a.paused));
    await button.click();
    await page.waitForFunction(() => window.__themeAudio.some(a => !a.paused && a.currentTime > 0.2));
    assert.equal(await page.evaluate(() => window.__themeAudio.filter(a => !a.paused).length), 1, 'Repeated selection must not overlap songs');
    const geometry = await button.boundingBox();
    assert.ok(geometry.height >= 44 && geometry.width >= 44);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'Player/masthead must fit the viewport');
    if (output) await page.screenshot({path:path.join(output, `playing-${width}.png`)});
    await page.locator('.ksvl-np-btn--stop').focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.activeElement === document.querySelector('[data-ksvl-track="the-newsstand"]'));
    assert.equal(await page.evaluate(() => window.__themeAudio.every(a => a.paused)), true);
    assert.equal(await page.locator('.ksvl-now-playing.is-visible').count(), 0);
    if (output) await page.screenshot({path:path.join(output, `masthead-${width}.png`)});
    await assertDynamicAdmittedSong(page, ctx);
    await assertDynamicUnavailableSong(page, 'not-in-the-admitted-catalogue', 'Play unknown related song');
    results.push({width, result:'PASS', track:state.trackId, duration:state.duration});
    await ctx.close();
  }
  if (!external) {
    {
      const ctx = await context(390);
      const page = await ctx.newPage();
      const zeroButtonNewsStand = fs.readFileSync(path.join(root, 'newsstand.html'), 'utf8')
        .replace(/\s*<div class="ns-theme-control">[\s\S]*?<\/div>\s*<\/div>\s*<\/header>/, '\n          </div>\n        </header>');
      assert.equal(/data-ksvl-track/.test(zeroButtonNewsStand), false, 'Zero-button fixture must not retain an initial related-song control');
      await page.route('**/empty-related-songs', route => route.fulfill({contentType:'text/html', body:zeroButtonNewsStand}));
      await page.goto(origin + '/empty-related-songs', {waitUntil:'domcontentloaded'});
      await page.waitForFunction(() => typeof window.KSVL_whenReady === 'function');
      const zeroCatalogue = await page.evaluate(() => window.KSVL_whenReady());
      assert.equal(zeroCatalogue.ready, true, 'The zero-button page must receive the admitted catalogue: ' + JSON.stringify(zeroCatalogue));
      await assertDynamicAdmittedSong(page, ctx);
      results.push({scenario:'zero-initial-buttons', result:'PASS'});
      await ctx.close();
    }
    for (const failure of ['held-song', 'missing-player', 'broken-audio']) {
      const ctx = await context(390);
      const page = await ctx.newPage();
      if (failure === 'held-song') {
        await page.route('**/content/music/ksvl-track-registry.json', async route => {
          const data = JSON.parse(fs.readFileSync(path.join(root, 'content/music/ksvl-track-registry.json')));
          const track = data.tracks.find(t => t.id === 'the-newsstand');
          track.status = 'HOLD'; track.sourceStatus = 'QUALITY_REJECTED';
          await route.fulfill({json:data});
        });
      } else if (failure === 'missing-player') {
        await page.route('**/ksvl-player.js*', route => route.abort());
      } else {
        await page.route('**/sunnyvaile-newsstand.mp3', route => route.fulfill({status:404, body:'Not found'}));
      }
      await page.goto(origin + '/newsstand', {waitUntil:'domcontentloaded'});
      if (failure === 'held-song') {
        const held = await insertRelatedSong(page, 'the-newsstand', 'Play held related song');
        await page.waitForFunction(() => {
          const button = Array.from(document.querySelectorAll('button[data-ksvl-track]'))
            .find(candidate => candidate.textContent === 'Play held related song');
          return button && button.disabled && /unavailable/.test(document.getElementById('related-song-status').textContent);
        });
        assert.equal(await held.isDisabled(), true, 'Held dynamic song must remain disabled');
        assert.equal(await page.evaluate(() => window.__themeAudio.some(audio => !audio.paused)), false, 'Held dynamic song must not autoplay');
      }
      if (failure === 'broken-audio') {
        await page.waitForFunction(() => !document.querySelector('[data-ksvl-track]').disabled);
        await page.getByRole('button', {name:'Play the NewsStand theme', exact:true}).click();
        await page.waitForFunction(() => document.querySelector('.ksvl-np-status')?.dataset.kind === 'error');
        assert.equal(await page.getByRole('button', {name:'Retry this track', exact:true}).isVisible(), true);
        assert.equal(await page.evaluate(() => window.KSVL_getPublicState().paused), true);
        assert.equal(await page.evaluate(() => window.__themeAudio.every(a => a.error && a.readyState === 0 && a.currentTime === 0)), true, 'Broken media must report a native error without playable frames');
      } else {
        await page.waitForFunction(() => /unavailable/.test(document.getElementById('ns-theme-status').textContent));
        assert.equal(await page.getByRole('button', {name:'Play the NewsStand theme', exact:true}).isDisabled(), true);
        assert.equal(await page.evaluate(() => window.__themeAudio.some(a => !a.paused)), false);
      }
      results.push({failure, result:'PASS'});
      await ctx.close();
    }
  }
  console.log(JSON.stringify({result:'PASS', results}, null, 2));
} finally {
  await browser.close();
  if (server) await new Promise(resolve => server.close(resolve));
}
