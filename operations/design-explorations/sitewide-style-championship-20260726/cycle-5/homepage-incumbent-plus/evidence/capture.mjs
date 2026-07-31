import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const candidateUrl = process.env.CANDIDATE_URL ||
  "http://127.0.0.1:4177/operations/design-explorations/sitewide-style-championship-20260726/cycle-5/homepage-incumbent-plus/index.html";
const evidenceDir = resolve(dirname(fileURLToPath(import.meta.url)));

async function waitForJson(url, attempts = 100) {
  for (let index = 0; index < attempts; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error(`Chrome did not expose ${url}`);
}

async function capture({ width, height, output, mobile, port }) {
  const profile = `/tmp/laidies-cycle5-${mobile ? "mobile" : "desktop"}-${Date.now()}`;
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--no-first-run",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-sync",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-prefers-reduced-motion",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "about:blank"
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
    await call("Page.navigate", { url: candidateUrl });
    await new Promise((resolveWait) => setTimeout(resolveWait, 6000));

    await call("Runtime.evaluate", {
      awaitPromise: true,
      expression: `new Promise(async (done) => {
        const style = document.querySelector('link[data-cycle="homepage-incumbent-plus-5"]');
        if (!style) throw new Error("Candidate stylesheet unavailable");
        for (let attempt = 0; attempt < 100 && document.documentElement.dataset.homepageCandidate !== "cycle-5-incumbent-plus"; attempt += 1) {
          await new Promise((next) => setTimeout(next, 100));
        }
        if (document.documentElement.dataset.homepageCandidate !== "cycle-5-incumbent-plus") {
          throw new Error("Candidate runtime unavailable");
        }
        await Promise.race([
          document.fonts.ready,
          new Promise((next) => setTimeout(next, 5000))
        ]);
        document.querySelectorAll("img").forEach((image) => image.loading = "eager");
        const step = Math.max(500, window.innerHeight * .8);
        const initialScrollHeight = document.documentElement.scrollHeight;
        for (let y = 0; y < initialScrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((next) => setTimeout(next, 55));
        }
        window.scrollTo(0, 0);
        await Promise.race([
          Promise.all(Array.from(document.images).map((image) =>
            image.complete ? image.decode().catch(() => {}) :
            new Promise((finish) => {
              image.addEventListener("load", finish, { once: true });
              image.addEventListener("error", finish, { once: true });
            })
          )),
          new Promise((finish) => setTimeout(finish, 5000))
        ]);
        requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(done, 500)));
      })`
    });

    const auditResult = await call("Runtime.evaluate", {
      returnByValue: true,
      expression: `({
        candidate: document.documentElement.dataset.homepageCandidate,
        incumbentSha256: document.documentElement.dataset.incumbentSha256,
        viewport: { width: innerWidth, height: innerHeight },
        document: {
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          scrollHeight: document.documentElement.scrollHeight
        },
        hero: {
          title: document.querySelector("#hero-title")?.textContent.replace(/\\s+/g, " ").trim(),
          image: document.querySelector(".hero > img")?.getAttribute("src")
        },
        removedJobs: {
          entryVisitor: document.querySelectorAll(".entry-visitor").length,
          intent: document.querySelectorAll(".intent").length,
          spotlights: document.querySelectorAll(".spotlights").length,
          districtCards: document.querySelectorAll(".district-cards").length,
          townIndex: document.querySelectorAll(".town-index").length
        },
        visitorHotspot: {
          dataName: document.querySelector('.map-spot[data-href="/visitors-centre.html"]')?.dataset.name,
          ariaLabel: document.querySelector('.map-spot[data-href="/visitors-centre.html"]')?.getAttribute("aria-label")
        },
        imageSources: Array.from(document.images).map((image) => image.getAttribute("src")),
        bannedImageCounts: {
          repeatedMasthead: Array.from(document.images).filter((image) => image.getAttribute("src") === "/assets/sunnyvaile-streets/main-street-dusk.webp").length,
          rejectedFairyScene: Array.from(document.images).filter((image) => /fairy-godmother-scene/.test(image.getAttribute("src") || "")).length,
          unauditedDreamPhone: Array.from(document.images).filter((image) => /17-dream-phone-booth/.test(image.getAttribute("src") || "")).length,
          unauditedNewsStand: Array.from(document.images).filter((image) => /02-sunnyvaile-newsstand/.test(image.getAttribute("src") || "")).length
        },
        brokenImages: Array.from(document.images)
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.getAttribute("src"))
      })`
    });
    const audit = auditResult.result.value;
    const diagnosticName = mobile ? "mobile-390.json" : "desktop-1440.json";
    const diagnosticPath = resolve(evidenceDir, "diagnostics", diagnosticName);
    await mkdir(dirname(diagnosticPath), { recursive: true });
    await writeFile(diagnosticPath, JSON.stringify(audit, null, 2) + "\n");

    const metrics = await call("Page.getLayoutMetrics");
    const content = metrics.cssContentSize;
    process.stdout.write(`${output} layout ${content.width}x${content.height}\n`);
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
  output: "desktop/homepage-challenger-1440.png",
  mobile: false,
  port: 9511
});
const mobile = await capture({
  width: 390,
  height: 844,
  output: "mobile/homepage-challenger-390.png",
  mobile: true,
  port: 9512
});

process.stdout.write(
  `desktop ${desktop.width}x${desktop.height}; mobile ${mobile.width}x${mobile.height}\n`
);
