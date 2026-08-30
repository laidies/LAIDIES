import assert from 'node:assert/strict';
import {distributeKsvl, KSVL_VERSION} from './lib/ksvl-distribution.mjs';
const modern = '<script defer src="/content/site/ksvl-player.js?v=old"></script>';
const legacy = '<script src="../content/site/mini-player.js?v=old"></script>';
const check = html => {
  assert.equal((html.match(/src="\/content\/site\/ksvl-player\.js/g) || []).length, 1);
  assert.ok(!html.includes('mini-player.js'));
  assert.ok(html.includes(KSVL_VERSION));
};
for (const input of ['', modern, legacy, modern + legacy, legacy + modern]) {
  const html = `<html><body><p>Protected visitor content</p>${input}</body></html>`;
  assert.throws(() => check(html));
  const result = distributeKsvl('library.html', html);
  check(result);
  assert.ok(result.includes('<p>Protected visitor content</p>'));
  assert.equal(distributeKsvl('library.html', result), result);
}
const fragment = '<article>Book prose</article>';
assert.equal(distributeKsvl('content/library-books/rendered/test.html', fragment), fragment);
const fullBook = `<html><body>${fragment}</body></html>`;
assert.equal(distributeKsvl('content/library-books/rendered/test.html', fullBook), fullBook);
const redirect = '<html><head><meta http-equiv="refresh" content="0;url=/library"></head><body>Moved</body></html>';
assert.equal(distributeKsvl('old.html', redirect), redirect);
console.log('KSVL DISTRIBUTION PASS calibrated=5 fragment-and-redirect-preserved idempotent=5');
