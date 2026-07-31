import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const sourceUrl =
  "http://127.0.0.1:4177/operations/design-explorations/sitewide-style-championship-20260726/cycle-6/homepage-incumbent-conservative/incumbent-source.html";
const evidenceDir = dirname(fileURLToPath(import.meta.url));

async function target(port) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json`);
      if (response.ok) {
        const page = (await response.json()).find((item) => item.type === "page");
        if (page) return page;
      }
    } catch {}
    await new Promise((next) => setTimeout(next, 100));
  }
  throw new Error("Chrome target unavailable");
}

async function capture({ width, height, mobile, port, output }) {
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--no-first-run",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-sync",
    "--disable-gpu",
    "--force-prefers-reduced-motion",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=/tmp/laidies-cycle6-baseline-${port}-${Date.now()}`,
    "about:blank"
  ], { stdio: "ignore" });

  try {
    const page = await target(port);
    const socket = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((open, fail) => {
      socket.addEventListener("open", open, { once: true });
      socket.addEventListener("error", fail, { once: true });
    });
    let id = 0;
    const pending = new Map();
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id || !pending.has(message.id)) return;
      const handlers = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) handlers.reject(new Error(message.error.message));
      else handlers.resolve(message.result);
    });
    const call = (method, params = {}) => new Promise((done, fail) => {
      id += 1;
      pending.set(id, { resolve: done, reject: fail });
      socket.send(JSON.stringify({ id, method, params }));
    });

    await call("Page.enable");
    await call("Runtime.enable");
    await call("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile
    });
    await call("Page.navigate", { url: sourceUrl });
    await new Promise((next) => setTimeout(next, 4500));
    await call("Runtime.evaluate", {
      awaitPromise: true,
      expression: `new Promise(async (done) => {
        await Promise.race([document.fonts.ready, new Promise((next) => setTimeout(next, 5000))]);
        document.querySelectorAll("img").forEach((image) => image.loading = "eager");
        const initialHeight = document.documentElement.scrollHeight;
        const step = Math.max(500, innerHeight * .8);
        for (let y = 0; y < initialHeight; y += step) {
          scrollTo(0, y);
          await new Promise((next) => setTimeout(next, 50));
        }
        scrollTo(0, 0);
        await new Promise((next) => setTimeout(next, 600));
        done();
      })`
    });
    const metrics = await call("Page.getLayoutMetrics");
    const content = metrics.cssContentSize;
    const screenshot = await call("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      fromSurface: true,
      clip: { x: 0, y: 0, width: content.width, height: content.height, scale: 1 }
    });
    const destination = resolve(evidenceDir, output);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, Buffer.from(screenshot.data, "base64"));
    socket.close();
    return { width: content.width, height: content.height };
  } finally {
    chrome.kill("SIGTERM");
  }
}

const desktop = await capture({
  width: 1440,
  height: 900,
  mobile: false,
  port: 9541,
  output: "baseline/incumbent-clean-1440.png"
});
const mobile = await capture({
  width: 390,
  height: 844,
  mobile: true,
  port: 9542,
  output: "baseline/incumbent-clean-390.png"
});

process.stdout.write(`${JSON.stringify({ desktop, mobile }, null, 2)}\n`);
