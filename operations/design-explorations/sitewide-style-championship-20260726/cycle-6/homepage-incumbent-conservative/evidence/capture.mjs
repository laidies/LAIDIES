import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const candidateUrl =
  "http://127.0.0.1:4177/operations/design-explorations/sitewide-style-championship-20260726/cycle-6/homepage-incumbent-conservative/index.html";
const evidenceDir = dirname(fileURLToPath(import.meta.url));

async function waitForTarget(port) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
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

async function capture({ width, height, mobile, port, output, diagnostic }) {
  const profile = `/tmp/laidies-cycle6-${port}-${Date.now()}`;
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--no-first-run",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-sync",
    "--disable-gpu",
    "--force-prefers-reduced-motion",
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
    await call("Page.navigate", { url: candidateUrl });
    await new Promise((resolveWait) => setTimeout(resolveWait, 4500));
    await call("Runtime.evaluate", {
      awaitPromise: true,
      expression: `new Promise(async (done) => {
        await Promise.race([
          document.fonts.ready,
          new Promise((next) => setTimeout(next, 5000))
        ]);
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

    const auditResult = await call("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const text = document.body.innerText.replace(/\\s+/g, " ").trim();
        const sourceCounts = (pattern) => Array.from(document.images)
          .filter((image) => pattern.test(image.getAttribute("src") || "")).length;
        const activityCards = Array.from(document.querySelectorAll(".activity-grid article"));
        const visitorButton = document.querySelector('.map-spot[data-href="/visitors-centre.html"]');
        if (visitorButton) visitorButton.click();
        const visitorPopup = document.querySelector(".map-pop");
        const visitorPopupTitle = visitorPopup?.querySelector("h4")?.textContent.trim();
        if (visitorPopup) visitorPopup.hidden = true;
        return {
          candidate: document.documentElement.dataset.homepageCandidate,
          incumbentSha256: document.documentElement.dataset.incumbentSha256,
          viewport: { width: innerWidth, height: innerHeight },
          document: {
            clientWidth: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
            scrollHeight: document.documentElement.scrollHeight
          },
          structureCounts: {
            entryVisitor: document.querySelectorAll(".entry-visitor").length,
            entryProjection: document.querySelectorAll(".entry-projection").length,
            intent: document.querySelectorAll(".intent").length,
            districtCards: document.querySelectorAll(".district-cards").length,
            townIndex: document.querySelectorAll(".town-index").length
          },
          prohibitedCopy: {
            exploreEachRoute: text.includes("Explore what each route can honestly do"),
            sharedReceiver: text.includes("The shared receiver supplies"),
            receiptPaths: text.includes("owner receipt paths"),
            navigationNotCompletion: text.includes("navigation, not proof"),
            statusCheckRoutes: text.includes("status-check routes")
          },
          canonicalName: {
            straightVisitorCentreMatches: (text.match(/Visitor Centre/g) || []).length,
            canonicalVisitorCentreMatches: (text.match(/Visitor’s Centre/g) || []).length,
            hotspotDataName: visitorButton?.dataset.name,
            hotspotAriaLabel: visitorButton?.getAttribute("aria-label"),
            popupTitle: visitorPopupTitle
          },
          imageCounts: {
            masthead: sourceCounts(/main-street-dusk\\.webp/),
            rejectedFairyScene: sourceCounts(/fairy-godmother-scene/),
            approvedFairyHouse: sourceCounts(/11-fairy-godmother-house-faceon-user-approved/),
            unauditedDreamPhone: sourceCounts(/17-dream-phone-booth/),
            unauditedNewsStand: sourceCounts(/02-sunnyvaile-newsstand/),
            chickFlicks: sourceCounts(/pc-chick-flicks/),
            jeeves: sourceCounts(/jeeves-scene/),
            lanternHill: sourceCounts(/lantern-hill-evening/)
          },
          duplicateImageObjects: document.querySelectorAll(".c6-text-object").length,
          interactiveCounts: {
            headings: document.querySelectorAll("h1,h2,h3,h4").length,
            links: document.querySelectorAll("a[href]").length,
            buttons: document.querySelectorAll("button").length,
            sections: document.querySelectorAll("main > section").length
          },
          activityCardSurfaces: activityCards.map((card) => ({
            color: getComputedStyle(card).color,
            backgroundColor: getComputedStyle(card).backgroundColor,
            backgroundImage: getComputedStyle(card).backgroundImage
          })),
          brokenImages: Array.from(document.images)
            .filter((image) => image.complete && image.naturalWidth === 0)
            .map((image) => image.getAttribute("src"))
        };
      })()`
    });
    const audit = auditResult.result.value;
    await mkdir(resolve(evidenceDir, "diagnostics"), { recursive: true });
    await writeFile(
      resolve(evidenceDir, "diagnostics", diagnostic),
      `${JSON.stringify(audit, null, 2)}\n`
    );

    const metrics = await call("Page.getLayoutMetrics");
    const content = metrics.cssContentSize;
    const screenshot = await call("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      fromSurface: true,
      clip: {
        x: 0,
        y: 0,
        width: content.width,
        height: content.height,
        scale: 1
      }
    });
    const destination = resolve(evidenceDir, output);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, Buffer.from(screenshot.data, "base64"));
    socket.close();
    return { width: content.width, height: content.height, audit };
  } finally {
    chrome.kill("SIGTERM");
  }
}

const desktop = await capture({
  width: 1440,
  height: 900,
  mobile: false,
  port: 9531,
  output: "desktop/homepage-cycle6-1440.png",
  diagnostic: "desktop-1440.json"
});
const mobile = await capture({
  width: 390,
  height: 844,
  mobile: true,
  port: 9532,
  output: "mobile/homepage-cycle6-390.png",
  diagnostic: "mobile-390.json"
});

process.stdout.write(
  `${JSON.stringify({
    desktop: { width: desktop.width, height: desktop.height, audit: desktop.audit },
    mobile: { width: mobile.width, height: mobile.height, audit: mobile.audit }
  }, null, 2)}\n`
);
