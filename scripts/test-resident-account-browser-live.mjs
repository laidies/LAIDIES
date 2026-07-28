#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const email = process.env.RESIDENT_TEST_A_EMAIL;
const password = process.env.RESIDENT_TEST_A_PASSWORD;
if (!email || !password) {
  throw new Error("Resident test credentials are required.");
}

const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwrightRoot) throw new Error("PLAYWRIGHT_CORE_PATH is required.");
const { chromium } = await import(
  pathToFileURL(path.join(playwrightRoot, "index.mjs"))
);
const chrome = process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"]
]);

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const relative = url.pathname === "/"
    ? "resident-card.html"
    : url.pathname.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(`${root}${path.sep}`) ||
      !fs.existsSync(resolved) ||
      fs.statSync(resolved).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, {
    "content-type": mime.get(path.extname(resolved)) ||
      "application/octet-stream"
  });
  fs.createReadStream(resolved).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const card = {
  version: 1,
  fields: {
    displayName: "Resident browser journey",
    cardBg: "mint",
    cardAvatarUrl: "/assets/brand/laidies-logo-square-pearl-512-v1.png"
  }
};

async function signIn(page) {
  return page.evaluate(async ({ accountEmail, accountPassword }) => {
    const runtime = await window.LAIDIESResidentAccountRuntime.get();
    const result = await runtime.client.auth.signInWithPassword({
      email: accountEmail,
      password: accountPassword
    });
    if (result.error) throw result.error;
    return result.data.user.id;
  }, { accountEmail: email, accountPassword: password });
}

try {
  const first = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await first.addInitScript((envelope) => {
    localStorage.setItem("laidies_resident_card_v1", JSON.stringify(envelope));
  }, card);
  const firstPage = await first.newPage();
  await firstPage.goto(`${origin}/resident-card.html`, {
    waitUntil: "domcontentloaded"
  });
  const userId = await signIn(firstPage);
  await firstPage.reload({ waitUntil: "domcontentloaded" });
  await firstPage.locator("#rcAccountClaimButton").waitFor({ state: "visible" });
  await firstPage.locator("#rcAccountClaimButton").click();
  await firstPage.waitForFunction(() =>
    !document.getElementById("rcAccountStatus").textContent
      .includes("Keeping this Card")
  );
  console.log("STEP first-browser-status", await firstPage.locator("#rcAccountStatus").innerText());
  assert.match(
    await firstPage.locator("#rcAccountStatus").innerText(),
    /private account-backed Card/
  );

  const second = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const secondPage = await second.newPage();
  await secondPage.goto(`${origin}/resident-card.html`, {
    waitUntil: "domcontentloaded"
  });
  assert.equal(await signIn(secondPage), userId);
  await secondPage.reload({ waitUntil: "domcontentloaded" });
  await secondPage.locator("#rcAccountRestoreButton").waitFor({
    state: "visible"
  });
  await secondPage.locator("#rcAccountRestoreButton").click();
  await secondPage.waitForFunction(() =>
    document.getElementById("rcAccountStatus").textContent.startsWith("Restored.")
  );
  const restored = await secondPage.evaluate(() =>
    JSON.parse(localStorage.getItem("laidies_resident_card_v1"))
  );
  assert.deepEqual(restored, card);

  await secondPage.goto(`${origin}/laidies-card.html`, {
    waitUntil: "domcontentloaded"
  });
  await secondPage.waitForFunction(() =>
    document.getElementById("closetPersistenceState").textContent
      .includes("Account-backed view")
  );
  assert.match(
    await secondPage.locator("#closetPersistenceState").innerText(),
    /restored the verified private Card/
  );
  assert.equal(await secondPage.locator("#cardName").innerText(), card.fields.displayName);
  assert.equal(
    await secondPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    true
  );

  console.log(JSON.stringify({
    result: "PASS",
    accountUserId: userId,
    firstBrowserClaim: true,
    secondBrowserRestore: true,
    closetAccountBacked: true,
    mobileClosetNoHorizontalOverflow: true
  }, null, 2));

  await first.close();
  await second.close();
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
