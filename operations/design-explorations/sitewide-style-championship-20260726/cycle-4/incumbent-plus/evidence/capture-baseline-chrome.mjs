import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const rootUrl = "http://127.0.0.1:4199/";
const evidenceDir = resolve(dirname(fileURLToPath(import.meta.url)));

async function waitForJson(url, attempts = 80) {
  for (let index = 0; index < attempts; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error(`Chrome did not expose ${url}`);
}

async function capture({ direction, width, height, output, mobile }) {
  const port = 9400 + direction.charCodeAt(0) + (mobile ? 100 : 0);
  const profile = `/tmp/laidies-svc01-cdp-${direction}-${mobile ? "mobile" : "desktop"}-${Date.now()}`;
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--no-first-run",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-sync",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ], { stdio: "ignore" });

  try {
    const tabs = await waitForJson(`http://127.0.0.1:${port}/json`);
    const tab = tabs.find((item) => item.type === "page");
    if (!tab) throw new Error("No Chrome page target found");

    const socket = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise((resolveOpen, rejectOpen) => {
      socket.addEventListener("open", resolveOpen, { once: true });
      socket.addEventListener("error", rejectOpen, { once: true });
    });

    let id = 0;
    const pending = new Map();
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id || !pending.has(message.id)) return;
      const { resolveCall, rejectCall } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) rejectCall(new Error(message.error.message));
      else resolveCall(message.result);
    });
    const call = (method, params = {}) => new Promise((resolveCall, rejectCall) => {
      id += 1;
      pending.set(id, { resolveCall, rejectCall });
      socket.send(JSON.stringify({ id, method, params }));
    });

    await call("Page.enable");
    await call("Runtime.enable");
    await call("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile,
    });
    const suffix = `?direction=${direction}&capture=1${mobile ? "&mobile=1" : ""}`;
    await call("Page.navigate", { url: `${rootUrl}${suffix}` });
    await new Promise((resolveWait) => setTimeout(resolveWait, 1600));
    await call("Runtime.evaluate", {
      awaitPromise: true,
      returnByValue: true,
      expression: `new Promise(async (done) => {
        document.querySelectorAll("img").forEach((image) => image.loading = "eager");
        const step = Math.max(500, window.innerHeight * .8);
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((next) => setTimeout(next, 70));
        }
        window.scrollTo(0, 0);
        document.activeElement?.blur();
        setTimeout(done, 500);
      })`,
    });
    await call("Runtime.evaluate", {
      awaitPromise: true,
      returnByValue: true,
      expression: `new Promise(async (done) => {
        await document.fonts.ready;
        await Promise.race([
          Promise.all(Array.from(document.images).map((image) =>
            image.complete ? image.decode().catch(() => {}) :
            new Promise((finish) => {
              image.addEventListener("load", finish, { once: true });
              image.addEventListener("error", finish, { once: true });
            })
          )),
          new Promise((finish) => setTimeout(finish, 4000))
        ]);
        requestAnimationFrame(() => requestAnimationFrame(done));
      })`,
    });
    const metrics = await call("Page.getLayoutMetrics");
    const content = metrics.cssContentSize;
    const screenshot = await call("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      fromSurface: true,
      clip: { x: 0, y: 0, width: content.width, height: content.height, scale: 1 },
    });
    const destination = resolve(evidenceDir, output);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, Buffer.from(screenshot.data, "base64"));
    socket.close();
    return { file: basename(destination), width: content.width, height: content.height };
  } finally {
    chrome.kill("SIGTERM");
  }
}

for (const direction of ["a"]) {
  const upper = direction.toUpperCase();
  const desktop = await capture({
    direction,
    width: 1440,
    height: 900,
    output: "baseline/incumbent-homepage-1440.png",
    mobile: false,
  });
  const mobile = await capture({
    direction,
    width: 390,
    height: 844,
    output: "baseline/incumbent-homepage-390.png",
    mobile: true,
  });
  process.stdout.write(`${upper}: desktop ${desktop.width}x${desktop.height}; mobile ${mobile.width}x${mobile.height}\n`);
}
