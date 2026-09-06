import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root, 'content/site/puffy-bookmarks.js'), 'utf8');
const binderId = /^[A-Za-z0-9._:@-]{1,120}$/;
const plain = value => JSON.parse(JSON.stringify(value));

function loadAdapter({ pouch, failRead = false } = {}) {
  const values = new Map();
  if (pouch !== undefined) values.set('laidies_puffy_sticker_pouch', pouch);
  let writes = 0;
  const localStorage = {
    getItem(key) {
      if (failRead) throw new Error('blocked storage');
      return values.has(key) ? values.get(key) : null;
    },
    setItem() { writes += 1; },
    removeItem() { writes += 1; },
    clear() { writes += 1; }
  };
  const document = {
    readyState: 'loading',
    documentElement: { setAttribute() {} },
    addEventListener() {},
    getElementById() { return null; }
  };
  const window = { document, localStorage, addEventListener() {} };
  const context = vm.createContext({
    window,
    document,
    localStorage,
    console,
    Set,
    JSON,
    Object,
    Array,
    String,
    Number,
    Boolean,
    RegExp,
    Error,
    Date,
    CustomEvent: class CustomEvent {}
  });
  vm.runInContext(source, context, { filename: 'puffy-bookmarks.js' });
  return { api: window.LAIDIESPuffyCatalogV1, writes: () => writes };
}

const base = loadAdapter();
const catalog = base.api.catalog();
assert.equal(Object.isFrozen(base.api), true, 'catalog API is frozen');
assert.equal(catalog.length, 75, 'catalog exposes the approved 75 Puffies');
assert.equal(new Set(catalog.map(item => item.file)).size, 75, 'catalog files are unique');
assert.equal(new Set(catalog.map(item => item.sticker_id)).size, 75, 'Binder IDs are unique');
for (const item of catalog) {
  assert.match(item.sticker_id, binderId, 'every Binder ID fits Binder validation');
  assert.equal(item.sticker_id, `puffy:${item.file.replaceAll('/', ':').replace(/\.png$/, '')}`);
  assert.equal(item.url, `/assets/puffies/${item.file}`);
  assert.deepEqual(base.api.resolve(item.sticker_id), item, 'each Binder ID round-trips through resolve');
}
assert.equal(base.api.resolve('puffy:unknown'), null, 'unknown IDs do not acquire fallback URLs');
assert.equal(base.api.resolve('usable-25:01-heart-sunglasses'), null, 'noncanonical IDs are rejected');
assert.equal(base.writes(), 0, 'catalog and resolve do not write storage');

catalog[0].label = 'mutated';
catalog.push({ sticker_id: 'puffy:fake' });
const catalogAgain = base.api.catalog();
assert.equal(catalogAgain.length, 75, 'returned catalog array is defensive');
assert.notEqual(catalogAgain[0].label, 'mutated', 'returned catalog records are defensive');
assert.equal(base.writes(), 0, 'defensive reads do not write storage');

const validPouch = JSON.stringify(catalog.slice(0, 10).map(item => ({ file: item.file, purpose: 'private note' })));
const valid = loadAdapter({ pouch: validPouch });
const pouch = valid.api.readPouch();
assert.equal(pouch.state, 'device-local', 'a complete valid pouch is available locally');
assert.equal(pouch.items.length, 10, 'a complete pouch exposes ten items');
assert.deepEqual(plain(pouch.items), plain(catalogAgain.slice(0, 10)), 'pouch items use the catalog descriptors only');
assert.equal(Object.hasOwn(pouch.items[0], 'purpose'), false, 'private pouch purposes are not exposed');
pouch.items[0].label = 'changed';
assert.notEqual(valid.api.readPouch().items[0].label, 'changed', 'pouch results are defensive');
assert.equal(valid.writes(), 0, 'valid pouch reads do not write storage');

const missing = loadAdapter();
assert.deepEqual(plain(missing.api.readPouch()), { state: 'not-configured', items: [] }, 'missing pouch remains unconfigured');
assert.equal(missing.writes(), 0, 'missing pouch does not receive defaults or writes');

const malformed = loadAdapter({ pouch: '{invalid json' });
assert.deepEqual(plain(malformed.api.readPouch()), { state: 'needs-closet-review', items: [] }, 'malformed pouch requires Closet review');
assert.equal(malformed.writes(), 0, 'malformed pouch is not repaired by the adapter');

const duplicate = loadAdapter({ pouch: JSON.stringify(Array.from({ length: 10 }, () => ({ file: catalog[0].file }))) });
assert.deepEqual(plain(duplicate.api.readPouch()), { state: 'needs-closet-review', items: [] }, 'duplicate pouch entries are rejected');
assert.equal(duplicate.writes(), 0, 'rejected pouch does not change storage');

const unavailable = loadAdapter({ failRead: true });
assert.deepEqual(plain(unavailable.api.readPouch()), { state: 'unavailable', items: [] }, 'storage failures stay unavailable');
assert.equal(unavailable.writes(), 0, 'unavailable storage does not receive writes');

console.log('PASS test-puffy-catalog-adapter');
