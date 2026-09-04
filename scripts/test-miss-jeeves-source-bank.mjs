#!/usr/bin/env node

import assert from "node:assert/strict";
import test from "node:test";

import { checkAccessibility, inspectSourceBank, renderBankReport } from "./check-miss-jeeves-source-bank.mjs";

const source = (overrides = {}) => ({
  id: "SRC-PRIMARY",
  identity: "Primary source",
  channelUrl: "https://example.com/source",
  tier: "OFFICIAL_AUTHORITY",
  promotionStatus: "PILOT",
  verifiedAt: "2026-09-01",
  expiresAt: "2026-09-08",
  ...overrides
});

test("classifies current, due and expired review dates", () => {
  const result = inspectSourceBank({ schemaVersion: "1.0.0", recurringAuthority: true, sources: [
    source(), source({ id: "SRC-CURRENT", expiresAt: "2026-10-01" }), source({ id: "SRC-EXPIRED", expiresAt: "2026-09-03" })
  ] }, "2026-09-04");
  assert.equal(result.errors.length, 0);
  assert.deepEqual(result.sources.map(item => item.state), ["DUE", "CURRENT", "EXPIRED"]);
});

test("a due review is visible before it becomes an expiry hold", () => {
  const result = inspectSourceBank({ schemaVersion: "1.0.0", recurringAuthority: true, sources: [source()] }, "2026-09-04");
  assert.equal(result.sources[0].state, "DUE");
  assert.match(renderBankReport(result), /Due within seven days: 1/);
});

test("rejects malformed or insecure bank records", () => {
  const result = inspectSourceBank({ schemaVersion: "0", recurringAuthority: false, sources: [
    source({ id: "bad", channelUrl: "http://example.com", verifiedAt: "tomorrow" })
  ] }, "2026-09-04");
  assert.ok(result.errors.some(error => error.includes("schemaVersion")));
  assert.ok(result.errors.some(error => error.includes("recurringAuthority")));
  assert.ok(result.errors.some(error => error.includes("invalid source id")));
  assert.ok(result.errors.some(error => error.includes("must use https")));
});

test("network check records success and failure without renewing review dates", async () => {
  const records = [source(), source({ id: "SRC-DOWN", channelUrl: "https://down.example/" })];
  const checked = await checkAccessibility(records, async url => {
    if (String(url).includes("down.example")) throw new Error("offline");
    return new Response("ok", { status: 200 });
  });
  assert.equal(checked[0].accessible, true);
  assert.equal(checked[0].verifiedAt, "2026-09-01");
  assert.equal(checked[1].accessible, false);
  assert.match(renderBankReport({ asOf: "2026-09-04", errors: [], sources: checked }), /not automatically renewed/);
});
