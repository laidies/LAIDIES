import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "../../../..");
const room = await readFile(path.join(root, "content/site/community-room.js"), "utf8");

class Element {
  constructor() { this.children = []; this.dataset = {}; this.isConnected = true; this.communityMountVersion = 0; this._html = ""; }
  set innerHTML(value) {
    this._html = value;
    this.children = value.includes('data-community-account-mount="true"') ? [new Element()] : [];
  }
  get innerHTML() { return this._html; }
  querySelector(selector) { return selector === "[data-community-account-mount]" ? this.children[0] || null : null; }
  querySelectorAll() { return []; }
  appendChild(node) { this.children.push(node); return node; }
  addEventListener() {}
  setAttribute() {}
}

function loadRoom(accountModule) {
  const document = {
    readyState: "loading", head: new Element(),
    querySelector: () => null, querySelectorAll: () => [],
    createElement: () => new Element(), addEventListener() {}
  };
  const window = {
    location: { hostname: "laidies.ai", pathname: "/community/ask-the-room.html", search: "", hash: "" },
    __communityAccountModule: accountModule, customElements: { get: () => null }, addEventListener() {}
  };
  const source = room.replace('import("/content/site/community-account-ui.mjs")', 'Promise.resolve(window.__communityAccountModule)');
  vm.runInNewContext(source, { window, document, URLSearchParams, Promise, setTimeout, clearTimeout });
  return window.LAIDIES_COMMUNITY_ROOM.mount;
}

test("account UI replaces only its mount while the public-room boundary remains its sibling", () => {
  assert.match(room, /function interactiveMarkup\(roomHref\)/);
  assert.match(room, /data-community-account-mount="true"/);
  assert.match(room, /class="community-provider-boundary"/);
  assert.match(room, /boundaryDetailsMarkup\(roomHref\)/);
  assert.match(room, /var accountMount = mountNode\.querySelector\("\[data-community-account-mount\]"\)/);
  assert.match(room, /mount: accountMount, pageId: pageId/);
  assert.doesNotMatch(room, /mount: mountNode, pageId: pageId/);
  assert.match(room, /accountMount\.innerHTML = stateMarkup\("unavailable"\) \+ "<\/div>"/);
});

test("the stable boundary retains the admitted public, privacy, and reporting copy", () => {
  assert.match(room, /This is a public room\. Keep confidential work/);
  assert.match(room, /LAiDIES privacy applies on this site\. Hyvor hosts and moderates the discussion/);
  assert.match(room, /Hyvor moderation and reporting guide/);
});

test("a failed account render keeps one persistent boundary outside its replaceable mount", async () => {
  const mount = loadRoom({ mountCommunity: async () => { throw new Error("offline"); } });
  const root = new Element();
  await mount({ mount: root, pageId: "ask-the-room" });
  assert.equal((root.innerHTML.match(/This is a public room/g) || []).length, 1);
  assert.equal((root.innerHTML.match(/Hyvor moderation and reporting guide/g) || []).length, 1);
  assert.match(root.children[0].innerHTML, /The external discussion is unavailable/);
  assert.doesNotMatch(root.children[0].innerHTML, /This is a public room/);
});

test("a later mount disposes an in-flight account instance and keeps its own parent instance", async () => {
  let resolveFirst;
  let calls = 0, oldDisposals = 0;
  const oldInstance = { dispose: async () => { oldDisposals += 1; return true; } };
  const newInstance = { dispose: async () => true };
  const mount = loadRoom({ mountCommunity: async ({ mount: accountMount }) => {
    calls += 1;
    if (calls === 1) {
      accountMount.communityAccount = oldInstance;
      return new Promise(resolve => { resolveFirst = () => resolve(oldInstance); });
    }
    accountMount.communityAccount = newInstance;
    return newInstance;
  } });
  const root = new Element();
  const first = mount({ mount: root, pageId: "ask-the-room" });
  await new Promise(resolve => setTimeout(resolve, 0));
  assert.equal(typeof resolveFirst, "function");
  assert.match(root.children[0].innerHTML, /Loading the conversation/);
  const second = mount({ mount: root, pageId: "ask-the-room" });
  await new Promise(resolve => setTimeout(resolve, 0));
  resolveFirst();
  await Promise.all([first, second]);
  assert.equal(oldDisposals, 1);
  assert.equal(root.communityAccount, newInstance);
});
