import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';

const path = 'content/site/fairy-godmother-v2.js';
function run(source, supportsObserver = true) {
  const images = [], observed = new Set();
  let callback;
  const element = tag => ({
    tagName: tag, dataset: {}, children: [], handlers: {}, attributes: {},
    classList: {contains: () => false},
    appendChild(child) { this.children.push(child); },
    setAttribute(key, value) { this.attributes[key] = value; },
    addEventListener(event, fn) { this.handlers[event] = fn; },
    dispatchEvent(event) { this.handlers[event.type]?.(event); }
  });
  const rail = element('div'), select = element('select');
  rail.querySelectorAll = () => rail.children;
  const sandbox = {
    document: {
      getElementById: id => ({fairyMode: select, fgSaintRail: rail}[id] || null),
      createElement: tag => {const el = element(tag); if(tag === 'img') images.push(el); return el;}
    },
    Event: class {constructor(type) {this.type = type;}},
    window: {setTimeout}, localStorage: {getItem: () => null}
  };
  if (supportsObserver) sandbox.IntersectionObserver = class {
    constructor(fn, options) {callback = fn; assert.equal(options.rootMargin, '200px');}
    observe(image) {observed.add(image);}
    unobserve(image) {observed.delete(image);}
  };
  vm.runInNewContext(source, sandbox, {filename:path});
  return {images, rail, select, observed, intersect: entries => callback(entries)};
}
const current = fs.readFileSync(path, 'utf8');
const old = execFileSync('git', ['show', '3daf34a7:'+path], {encoding:'utf8'});
assert.throws(() => assert.equal(run(old).images.filter(i => i.src).length, 0),
  'calibration: predecessor must request offscreen portraits immediately');
const test = run(current);
assert.equal(test.images.length, 6);
assert.equal(test.images.filter(i => i.src).length, 0, 'no offscreen portrait request');
assert.equal(test.observed.size, 6);
test.intersect([{target:test.images[0],isIntersecting:false}]);
assert.equal(test.images[0].src, undefined);
test.intersect([{target:test.images[0],isIntersecting:true}]);
assert.equal(test.images[0].src, '../assets/saints/dolly-parton.png');
assert.equal(test.observed.size, 5);
assert.equal(test.images[0].dataset.portraitSrc, undefined);
test.rail.children[1].handlers.click();
assert.equal(test.select.value, 'dolly', 'choice remains usable without awaiting image');
assert.equal(test.rail.children[1].attributes['aria-pressed'], 'true');
const fallback = run(current, false);
assert.equal(fallback.images.filter(i => i.src).length, 6, 'older browser fallback retains all portraits');
assert.deepEqual(fallback.images.map(i => i.src), run(old).images.map(i => i.src), 'approved image identities unchanged');
console.log('PASS predecessor rejected; offscreen deferral, intersection, exact assets, native selection and fallback');
