import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const pageUrl =
  "http://127.0.0.1:4177/operations/design-explorations/sitewide-style-championship-20260726/cycle-5/homepage-incumbent-plus/evidence/ali-decision/index.html";
const outputDir = dirname(fileURLToPath(import.meta.url));

async function waitForTarget(port) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json`);
      if (response.ok) {
        const targets = await response.json();
        const page = targets.find((target) => target.type === "page");
        if (page) return page;
      }
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error("Chrome debugging target unavailable");
}

async function capture({ width, height, filename, mobile, port }) {
  const profile = `/tmp/laidies-ali-decision-${port}-${Date.now()}`;
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--no-first-run",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-sync",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "about:blank"
  ], { stdio: "ignore" });

  try {
    const target = await waitForTarget(port);
    const socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolveOpen, rejectOpen) => {
      socket.addEventListener("open", resolveOpen, { once: true });
      socket.addEventListener("error", rejectOpen, { once: true });
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

    const call = (method, params = {}) => new Promise((resolveCall, rejectCall) => {
      id += 1;
      pending.set(id, { resolve: resolveCall, reject: rejectCall });
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
    await call("Page.navigate", { url: pageUrl });
    await new Promise((resolveWait) => setTimeout(resolveWait, 3500));
    await call("Runtime.evaluate", {
      awaitPromise: true,
      expression: "document.fonts.ready"
    });

    const audit = await call("Runtime.evaluate", {
      returnByValue: true,
      expression: `({
        innerWidth,
        innerHeight,
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        brokenImages: Array.from(document.images)
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.getAttribute("src"))
      })`
    });

    const screenshot = await call("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
      fromSurface: true
    });
    await writeFile(resolve(outputDir, filename), Buffer.from(screenshot.data, "base64"));
    socket.close();
    return audit.result.value;
  } finally {
    chrome.kill("SIGTERM");
  }
}

const desktop = await capture({
  width: 1440,
  height: 1100,
  filename: "decision-overview-1440.png",
  mobile: false,
  port: 9521
});
const mobile = await capture({
  width: 390,
  height: 844,
  filename: "decision-overview-390.png",
  mobile: true,
  port: 9522
});

process.stdout.write(`${JSON.stringify({ desktop, mobile }, null, 2)}\n`);
