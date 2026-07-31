import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(
  new URL("../content/site/sv-nav-auth.js", import.meta.url),
  "utf8"
);
const authKey = "sb-swqnkxzebxdbgyrzpdne-auth-token";

class FakeElement {
  constructor(tagName = "a") {
    this.tagName = tagName.toUpperCase();
    this.attributes = new Map();
    this.children = [];
    this.style = {};
    this._text = "";
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  replaceChildren(...children) {
    this.children = children;
    this._text = "";
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  set textContent(value) {
    this._text = String(value);
    this.children = [];
  }

  get textContent() {
    return this._text + this.children.map((child) => child.textContent || "").join("");
  }
}

function runState(session) {
  const links = [new FakeElement(), new FakeElement()];
  const values = new Map();
  if (session) values.set(authKey, JSON.stringify(session));
  const document = {
    readyState: "complete",
    querySelectorAll(selector) {
      assert.equal(selector, ".sv-signin, .signin-link");
      return links;
    },
    createElement(tagName) {
      return new FakeElement(tagName);
    },
    createTextNode(value) {
      const node = new FakeElement("#text");
      node.textContent = value;
      return node;
    }
  };
  const window = { addEventListener() {} };
  const localStorage = {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    }
  };
  vm.runInNewContext(source, { Date, document, localStorage, window });
  return links;
}

const signedOut = runState(null);
signedOut.forEach((link) => {
  assert.equal(link.textContent, "Sign in");
  assert.equal(link.getAttribute("href"), "/post-office.html#signin");
  assert.equal(link.getAttribute("data-authenticated"), null);
});

const signedIn = runState({
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  user: { email: "ali.example@example.com" }
});
signedIn.forEach((link) => {
  assert.equal(link.textContent, "AEMy Closet");
  assert.equal(link.getAttribute("href"), "/laidies-card.html");
  assert.equal(link.getAttribute("data-authenticated"), "true");
  assert.match(link.getAttribute("title"), /open My Closet$/);
});

console.log("NAV AUTH STATE PASS signed-out=Sign in signed-in=My Closet links=2");
