#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(process.env.RESIDENT_CARD_ROOT || process.cwd());
const source = fs.readFileSync(
  path.join(root, "content", "site", "resident-card-contract-v1.js"),
  "utf8"
);
const document = {
  createElement(tag) {
    return {
      tagName: String(tag).toUpperCase(),
      style: {},
      attributes: Object.create(null),
      addEventListener() {},
      remove() {},
      set src(value) { this.attributes.src = value; },
      get src() { return this.attributes.src || ""; },
      set alt(value) { this.attributes.alt = value; },
      get alt() { return this.attributes.alt || ""; }
    };
  }
};
const sandbox = { window: { document } };
vm.createContext(sandbox);
vm.runInContext(source, sandbox, {
  filename: "resident-card-contract-v1.js"
});
const contract = sandbox.window.LAIDIESResidentCard;
const checks = [];
const failures = [];

function check(value, label) {
  checks.push(label);
  if (!value) failures.push(label);
}

function parse(value) {
  return contract.parse(typeof value === "string" ? value : JSON.stringify(value));
}

const validAsset = "/assets/brand/laidies-logo-square-pearl-512-v1.png";
check(Boolean(contract), "shared contract installs");
check(Boolean(parse({ version: 1, fields: { displayName: "Ali" } })), "minimal valid envelope passes");
check(Boolean(parse({
  version: 1,
  fields: { displayName: "Ali", cardBg: "classic", cardAvatarUrl: validAsset }
})), "canonical packaged avatar envelope passes");
check(fs.existsSync(path.join(root, validAsset.slice(1))), "valid avatar fixture exists in source");

const invalidFixtures = [
  ["malformed JSON", "{not-json"],
  ["top-level array", "[]"],
  ["null fields", { version: 1, fields: null }],
  ["array fields", { version: 1, fields: [] }],
  ["unknown top-level key", { version: 1, fields: { displayName: "Ali" }, extra: true }],
  ["unknown field", { version: 1, fields: { displayName: "Ali", privateReward: "yes" } }],
  ["empty-only field", { version: 1, fields: { displayName: "   " } }],
  ["prototype-shaped field", '{"version":1,"fields":{"displayName":"Ali","__proto__":{"polluted":"yes"}}}'],
  ["markup text", { version: 1, fields: { displayName: "<img src=x>" } }],
  ["control text", { version: 1, fields: { quote: "a\u0000b" } }],
  ["bidi text", { version: 1, fields: { displayName: "a\u202eb" } }],
  ["overlong display name", { version: 1, fields: { displayName: "x".repeat(81) } }],
  ["unknown background", { version: 1, fields: { cardBg: "javascript" } }],
  ["attribute avatar", { version: 1, fields: { cardAvatarUrl: '/assets/x.png" onerror="alert(1)' } }],
  ["javascript avatar", { version: 1, fields: { cardAvatarUrl: "javascript:alert(1)" } }],
  ["data avatar", { version: 1, fields: { cardAvatarUrl: "data:image/png;base64,AAAA" } }],
  ["external avatar", { version: 1, fields: { cardAvatarUrl: "https://example.com/x.png" } }],
  ["protocol-relative avatar", { version: 1, fields: { cardAvatarUrl: "//example.com/x.png" } }],
  ["traversal avatar", { version: 1, fields: { cardAvatarUrl: "/assets/../x.png" } }],
  ["double-slash avatar", { version: 1, fields: { cardAvatarUrl: "/assets//x.png" } }],
  ["encoded avatar", { version: 1, fields: { cardAvatarUrl: "/assets/%2e%2e/x.png" } }],
  ["query avatar", { version: 1, fields: { cardAvatarUrl: "/assets/x.png?y=1" } }],
  ["fragment avatar", { version: 1, fields: { cardAvatarUrl: "/assets/x.png#y" } }],
  ["SVG avatar", { version: 1, fields: { cardAvatarUrl: "/assets/x.svg" } }],
  ["attribute avatar slug", { version: 1, fields: { avatarSlug: 'x" onerror="alert(1)' } }]
];

for (const [label, fixture] of invalidFixtures) {
  check(parse(fixture) === null, `${label} fails closed`);
}

const container = {
  child: null,
  replaceChildren(child) { this.child = child; }
};
check(contract.replaceWithSafeImage(container, validAsset, "Portrait"), "safe DOM image renders");
check(container.child && container.child.tagName === "IMG", "renderer creates an img element");
check(container.child && container.child.attributes.src === validAsset, "renderer assigns exact safe source property");
check(!Object.prototype.hasOwnProperty.call(container.child.attributes, "onerror"), "renderer creates no handler attribute");
check(!contract.replaceWithSafeImage(container, "javascript:alert(1)", "Bad"), "renderer rejects executable scheme");

for (const label of checks) {
  console.log(`${failures.includes(label) ? "FAIL" : "PASS"} ${label}`);
}
console.log(`Resident Card shared contract: ${checks.length - failures.length}/${checks.length} passed`);
process.exit(failures.length ? 1 : 0);
