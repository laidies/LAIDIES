#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const moduleRoot = process.env.HIGH_PLAYWRIGHT_ROOT;
if (!moduleRoot) throw new Error("HIGH_PLAYWRIGHT_ROOT must point to a package root containing playwright-core");
const requireFromRoot = createRequire(path.join(moduleRoot, "package.json"));
const { chromium } = requireFromRoot("playwright-core");
const classRegister = JSON.parse(fs.readFileSync("content/site/high-classes.json", "utf8"));
const learningLedger = JSON.parse(fs.readFileSync("content/site/high-learning-ledger.json", "utf8"));

const base = process.env.HIGH_URL || "http://127.0.0.1:8765";
const executablePath = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium"
].find((candidate) => fs.existsSync(candidate));
if (!executablePath) throw new Error("No local Chrome/Chromium executable found");

const browser = await chromium.launch({ headless: true, executablePath });
const results = [];
const pass = (name) => results.push(name);
const localOnly = async (page) => {
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === "127.0.0.1" || url.hostname === "localhost") await route.continue();
    else await route.abort();
  });
};
const measureReflow = async (page, selectors) => page.evaluate((namedSelectors) => {
  const metric = (element) => element ? ({
    client: element.clientWidth,
    scroll: element.scrollWidth,
    left: Math.round(element.getBoundingClientRect().left),
    right: Math.round(element.getBoundingClientRect().right)
  }) : null;
  return {
    document: metric(document.documentElement),
    body: metric(document.body),
    components: Object.fromEntries(namedSelectors.map((selector) => [selector, metric(document.querySelector(selector))])),
    offenders: Array.from(document.querySelectorAll("body *"))
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        id: element.id,
        classes: element.className && typeof element.className === "string" ? element.className : "",
        right: Math.round(element.getBoundingClientRect().right),
        width: Math.round(element.getBoundingClientRect().width)
      }))
      .filter((item) => item.right > document.documentElement.clientWidth + 1)
      .sort((a, b) => b.right - a.right)
      .slice(0, 8)
  };
}, selectors);
const assertReflow = (measurement, label) => {
  assert.ok(measurement.document.scroll <= measurement.document.client + 1, `${label}: ${JSON.stringify(measurement)}`);
  assert.ok(measurement.body.scroll <= measurement.body.client + 1, `${label}: ${JSON.stringify(measurement)}`);
  for (const [selector, metric] of Object.entries(measurement.components)) {
    assert.ok(metric, `${label}: missing component ${selector}`);
    assert.ok(metric.scroll <= metric.client + 1, `${label} ${selector}: ${JSON.stringify(measurement)}`);
  }
};

try {
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
    await localOnly(page);
    await page.goto(`${base}/learn/class.html?c=not-a-real-class`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("#hd-name").textContent(), "That class is not in the register.");
    assert.equal(await page.locator("#tv").isDisabled(), true);
    pass("unknown class fails closed without substituting another lesson");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
    await localOnly(page);
    await page.route("**/content/site/high-classes.json*", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ subjects: [], classes: [] })
      }));
    await page.goto(`${base}/sunnyvaile-high.html#classes`, { waitUntil: "networkidle" });
    const recovery = await page.locator("#av-class-grid").textContent();
    assert.match(recovery, /class register could not be loaded/i);
    assert.match(recovery, /101 shelf/i);
    assert.match(recovery, /Pop Quiz/i);
    pass("valid empty building register renders a useful independent recovery state");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
    await localOnly(page);
    await page.route("**/content/site/high-classes.json*", (route) =>
      route.fulfill({ status: 503, contentType: "application/json", body: "{}" }));
    await page.goto(`${base}/learn/class.html?c=basics-current-context`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("#hd-name").textContent(), "The class and learning review could not be loaded.");
    assert.equal(await page.locator("#tv").isDisabled(), true);
    pass("class register service failure has an honest disabled recovery state");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
    await localOnly(page);
    await page.route("**/content/site/high-learning-ledger.json*", (route) =>
      route.fulfill({ status: 503, contentType: "application/json", body: "{}" }));
    await page.goto(`${base}/learn/class.html?c=basics-what-youre-looking-at`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("#hd-name").textContent(), "The class and learning review could not be loaded.");
    assert.equal(await page.locator("#tv").isDisabled(), true);
    pass("missing learning ledger disables the classroom instead of guessing admission");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
    await localOnly(page);
    const hostileRegister = structuredClone(classRegister);
    const target = hostileRegister.classes.find((item) => item.slug === "basics-what-youre-looking-at");
    target.status = "live";
    target.video = "/assets/hostile-self-promoted-class.mp4";
    target.filmed_on = "2026-07-26";
    target.verified_on = "2026-07-26";
    await page.route("**/content/site/high-classes.json*", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(hostileRegister)
      }));
    await page.goto(`${base}/learn/class.html?c=basics-what-youre-looking-at`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("#hd-name").textContent(), "The class and learning review could not be loaded.");
    assert.equal(await page.locator("#tv").isDisabled(), true);
    assert.equal(await page.locator("#screen video").count(), 0);
    pass("a live row and video cannot bypass the exact held record/video binding");
    await page.close();
  }

  {
    const iso = (date) => date.toISOString().slice(0, 10);
    const today = new Date();
    const yesterday = new Date(today); yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const tomorrow = new Date(today); tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    const admittedFixture = () => {
      const register = structuredClone(classRegister);
      const ledger = structuredClone(learningLedger);
      const cls = register.classes.find((item) => item.slug === "basics-what-youre-looking-at");
      const record = ledger.records.find((item) => item.kind === "class");
      cls.status = "live";
      cls.video = "/assets/synthetic-review-only-class.mp4";
      cls.filmed_on = iso(today);
      cls.verified_on = iso(today);
      record.status = "admitted";
      record.reviewedOn = iso(today);
      record.recheckOn = iso(today);
      record.bindings.videoPath = cls.video;
      return { register, ledger, cls, record };
    };
    const cases = [
      ["top-level extra", ({ ledger }) => { ledger.unexpected = true; }],
      ["top-level missing", ({ ledger }) => { delete ledger.runtimeRule; }],
      ["record extra", ({ record }) => { record.unexpected = true; }],
      ["record missing", ({ record }) => { delete record.contentPath; }],
      ["short dates", ({ record }) => { record.reviewedOn = "0"; record.recheckOn = "9"; }],
      ["impossible date", ({ record }) => { record.reviewedOn = "2026-02-30"; }],
      ["future review", ({ record }) => { record.reviewedOn = iso(tomorrow); record.recheckOn = iso(tomorrow); }],
      ["expired review", ({ record }) => { record.reviewedOn = iso(yesterday); record.recheckOn = iso(yesterday); }],
      ["date order", ({ record }) => { record.reviewedOn = iso(today); record.recheckOn = iso(yesterday); }],
      ["duplicate record ID", ({ ledger }) => {
        const duplicate = structuredClone(ledger.records.find((item) => item.kind === "quiz-candidate"));
        duplicate.contentId = "extra-quiz";
        duplicate.questions.forEach((question) => { question.id += "-extra"; });
        ledger.records.push(duplicate);
      }],
      ["duplicate class mapping held first", ({ ledger, record }) => {
        const duplicate = structuredClone(record);
        duplicate.recordId = "class-duplicate-held";
        duplicate.status = "held";
        duplicate.reviewedOn = null;
        duplicate.recheckOn = null;
        duplicate.bindings.registerLearningRecord = duplicate.recordId;
        duplicate.bindings.videoPath = null;
        ledger.records.unshift(duplicate);
      }],
      ["duplicate class mapping admitted first", ({ ledger, record }) => {
        const duplicate = structuredClone(record);
        duplicate.recordId = "class-duplicate-held";
        duplicate.status = "held";
        duplicate.reviewedOn = null;
        duplicate.recheckOn = null;
        duplicate.bindings.registerLearningRecord = duplicate.recordId;
        duplicate.bindings.videoPath = null;
        ledger.records.push(duplicate);
      }],
      ["wrong kind", ({ record }) => { record.kind = "quiz-candidate"; }],
      ["wrong record ID binding", ({ record }) => { record.recordId = "wrong-record"; }],
      ["wrong content binding", ({ record }) => { record.contentId = "basics-current-context"; }],
      ["wrong video binding", ({ record }) => { record.bindings.videoPath = "/assets/wrong.mp4"; }],
      ["source binding omitted", ({ record }) => { record.bindings.sourceIds.pop(); }],
      ["duplicate source ID", ({ record }) => { record.sources[1].sourceId = record.sources[0].sourceId; }],
      ["future source check", ({ record }) => {
        record.sources[0].checkedOn = iso(tomorrow);
        record.sources[0].recheckOn = iso(tomorrow);
      }],
      ["expired source check", ({ record }) => {
        record.sources[0].checkedOn = iso(yesterday);
        record.sources[0].recheckOn = iso(yesterday);
      }],
      ["sources checked after class review", ({ cls, record }) => {
        cls.filmed_on = iso(yesterday);
        cls.verified_on = iso(yesterday);
        record.reviewedOn = iso(yesterday);
        record.recheckOn = iso(tomorrow);
        record.sources.forEach((source) => {
          source.checkedOn = iso(today);
          source.recheckOn = iso(tomorrow);
        });
      }],
      ["sources expire before class admission", ({ record }) => {
        record.reviewedOn = iso(today);
        record.recheckOn = iso(tomorrow);
        record.sources.forEach((source) => {
          source.checkedOn = iso(today);
          source.recheckOn = iso(today);
        });
      }],
      ["one mixed source was checked after class review", ({ cls, record }) => {
        cls.filmed_on = iso(yesterday);
        cls.verified_on = iso(yesterday);
        record.reviewedOn = iso(yesterday);
        record.recheckOn = iso(tomorrow);
        record.sources.forEach((source) => {
          source.checkedOn = iso(yesterday);
          source.recheckOn = iso(tomorrow);
        });
        record.sources[1].checkedOn = iso(today);
      }],
      ["one mixed source expires before class admission", ({ record }) => {
        record.reviewedOn = iso(today);
        record.recheckOn = iso(tomorrow);
        record.sources.forEach((source) => {
          source.checkedOn = iso(today);
          source.recheckOn = iso(tomorrow);
        });
        record.sources[1].recheckOn = iso(today);
      }],
      ["quiz class binding", ({ ledger }) => {
        ledger.records.find((item) => item.kind === "quiz-candidate").alignedClassId = "basics-current-context";
      }],
      ["duplicate register slug", ({ register }) => {
        register.classes.push(structuredClone(register.classes[0]));
      }],
      ["duplicate register learning binding", ({ register, cls }) => {
        const duplicate = structuredClone(cls);
        duplicate.slug = "synthetic-duplicate-learning-binding";
        register.classes.push(duplicate);
      }],
      ["future production evidence", ({ cls }) => {
        cls.filmed_on = iso(tomorrow);
        cls.verified_on = iso(tomorrow);
      }],
      ["unknown extra record", ({ ledger }) => {
        const duplicate = structuredClone(ledger.records.find((item) => item.kind === "quiz-candidate"));
        duplicate.recordId = "quiz-extra";
        duplicate.contentId = "quiz-extra";
        duplicate.questions.forEach((question) => { question.id += "-extra"; });
        ledger.records.push(duplicate);
      }]
    ];

    for (const [name, mutate] of cases) {
      const fixture = admittedFixture();
      mutate(fixture);
      const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
      await localOnly(page);
      await page.route("**/content/site/high-classes.json*", (route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(fixture.register) }));
      await page.route("**/content/site/high-learning-ledger.json*", (route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(fixture.ledger) }));
      await page.goto(`${base}/learn/class.html?c=basics-what-youre-looking-at`, { waitUntil: "networkidle" });
      assert.equal(await page.locator("#hd-name").textContent(),
        "The class and learning review could not be loaded.", name);
      assert.equal(await page.locator("#tv").isDisabled(), true, name);
      assert.equal(await page.locator("#screen video").count(), 0, name);
      await page.close();
    }
    pass("29-case future synthetic-live matrix denies malformed, stale, temporally uncontained, duplicate, ambiguous and misbound admissions");

    const admittedBoundaryFixtures = [
      ["equal source and class interval", (fixture) => {
        fixture.record.sources.forEach((source) => {
          source.checkedOn = iso(today);
          source.recheckOn = iso(today);
        });
      }],
      ["mixed sources contain both equality boundaries", (fixture) => {
        fixture.record.sources.forEach((source) => {
          source.checkedOn = iso(today);
          source.recheckOn = iso(today);
        });
        fixture.record.sources[0].checkedOn = iso(yesterday);
        fixture.record.sources[1].recheckOn = iso(tomorrow);
      }]
    ];
    for (const [name, mutate] of admittedBoundaryFixtures) {
      const fixture = admittedFixture();
      mutate(fixture);
      const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
      await localOnly(page);
      await page.route("**/content/site/high-classes.json*", (route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(fixture.register) }));
      await page.route("**/content/site/high-learning-ledger.json*", (route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(fixture.ledger) }));
      await page.goto(`${base}/learn/class.html?c=basics-what-youre-looking-at`, { waitUntil: "networkidle" });
      assert.match(await page.locator("#class-review-status").textContent(), /Learning review:\s*admitted through/i, name);
      assert.equal(await page.locator("#tv").isDisabled(), false, name);
      assert.equal(await page.locator("#screen video").count(), 1, name);
      await page.close();
    }
    pass("source intervals that inclusively contain both class boundaries remain admitted");
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: "reduce" });
    await localOnly(page);
    await page.goto(`${base}/learn/class.html?c=basics-current-context`, { waitUntil: "networkidle" });
    await page.locator("#class-format-note").waitFor();
    assert.match(await page.locator("#class-format-note").textContent(), /production preview, not a finished class/i);
    assert.match(await page.locator("#tape-status").textContent(), /Not filmed/);
    await page.locator("#tv").focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator("#screen").getAttribute("aria-hidden"), "false");
    assert.equal(await page.evaluate(() => document.activeElement?.id), "screen-close");
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement?.id), "screen-close");
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#screen").getAttribute("aria-hidden"), "true");
    assert.equal(await page.evaluate(() => document.activeElement?.id), "tv");
    pass("unfilmed preview dialog traps focus, closes on Escape, and restores the trigger");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 320, height: 900 } });
    await localOnly(page);
    await page.goto(`${base}/sunnyvaile-high.html#report-card`, { waitUntil: "networkidle" });
    await page.locator("#rc-rows").waitFor();
    assert.match(await page.locator(".rc-stamp").textContent(), /This device only/);
    assert.match(await page.locator(".rc-foot").textContent(), /not a permanent, account-wide or cross-device record/i);
    const width = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth
    }));
    assert.ok(width.scroll <= width.client + 1, JSON.stringify(width));
    pass("clean 320px report-card journey states device scope without page overflow");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
    await localOnly(page);
    await page.addInitScript(() => {
      localStorage.setItem("laidies_display_name", "Ali");
      localStorage.setItem("laidiesQuizProgress", JSON.stringify({
        issue01: {
          attempts: 2,
          latestScore: 7,
          bestScore: 9,
          maxScore: 10,
          completedAt: "2026-07-25T12:00:00.000Z",
          stickerTitle: "Honor Roll",
          stickerTier: "a"
        },
        issue02: {
          attempts: 1,
          latestScore: 10,
          bestScore: 10,
          maxScore: 10,
          completedAt: "2026-07-25T12:10:00.000Z",
          stickerTitle: "Quiz Ace",
          stickerTier: "ace"
        },
        issue03: {
          attempts: 1,
          latestScore: 10,
          bestScore: 10,
          maxScore: 10,
          completedAt: "2026-07-25T12:20:00.000Z",
          stickerTitle: "Quiz Ace",
          stickerTier: "ace"
        }
      }));
    });
    await page.goto(`${base}/sunnyvaile-high.html#report-card`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => document.querySelector("#rc-name")?.textContent === "Ali");
    assert.equal(await page.locator("#rc-name").textContent(), "Ali");
    assert.match(await page.locator("#rc-card").textContent(), /9/);
    assert.match(await page.locator("#yb-intro").textContent(), /not a vote, a ranking or a judgment of ability/i);
    const rendered = await page.locator("#rc-card, #hub-yearbook").allTextContents();
    assert.doesNotMatch(rendered.join(" "), /banked this season|fill your .*Closet jar|Voted Most Likely|Not yet voted/i);
    assert.match(await page.locator("#rc-clips").textContent(), /not a reward balance/i);
    assert.match(await page.locator("#yb-award-label").textContent(), /Calculated from this device/i);
    pass("seeded returning journey uses local tries and consistently calculated, non-reward language");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
    await localOnly(page);
    await page.goto(`${base}/learn/quiz.html`, { waitUntil: "networkidle" });
    await page.locator('[data-quiz-open="issue01"]').click();
    const questionCount = await page.locator(".quiz-question").count();
    assert.ok(questionCount > 0);
    await page.evaluate(() => {
      const quiz = window.LAIDIES_SITE_DATA.quizzes.issue01;
      for (const question of quiz.questions) {
        const fieldset = document.querySelector(`[data-quiz-question="${question.id}"]`);
        const correct = Array.from(fieldset.querySelectorAll("input")).find((input) => input.value === question.answer);
        correct.checked = true;
      }
      document.querySelector("#quizForm").requestSubmit();
    });
    await page.waitForFunction(() => document.querySelectorAll(".quiz-explain").length > 0);
    assert.equal(await page.locator(".quiz-explain").count(), questionCount);
    const firstExplanation = await page.locator(".quiz-explain").first().textContent();
    assert.match(firstExplanation, /Correct answer:/);
    assert.match(firstExplanation, /What it means:/);
    assert.match(firstExplanation, /Where to find it:/);
    const first = await page.evaluate(() => JSON.parse(localStorage.getItem("laidiesQuizProgress")).issue01);
    assert.equal(first.attempts, 1);
    assert.ok(first.bestScore > 0);

    await page.locator("#quizResetButton").click();
    await page.evaluate(() => {
      for (const fieldset of document.querySelectorAll(".quiz-question")) {
        fieldset.querySelector("input").checked = true;
      }
      document.querySelector("#quizForm").requestSubmit();
    });
    await page.waitForFunction(() => JSON.parse(localStorage.getItem("laidiesQuizProgress")).issue01.attempts === 2);
    const second = await page.evaluate(() => JSON.parse(localStorage.getItem("laidiesQuizProgress")).issue01);
    assert.equal(second.attempts, 2);
    assert.ok(second.bestScore >= second.latestScore);
    assert.match(await page.locator(".pass-cta-card").textContent(), /Cross-device progress is not verified/i);
    pass("quiz explains every answer, increments attempts, retains best, and scopes persistence");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
    await localOnly(page);
    await page.addInitScript(() => {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function setItem(key, value) {
        if (String(key).startsWith("laidiesQuiz") || String(key) === "laidiesWednesdayRitualVisits") {
          throw new DOMException("Blocked for deterministic test", "QuotaExceededError");
        }
        return original.call(this, key, value);
      };
    });
    await page.goto(`${base}/learn/quiz.html`, { waitUntil: "networkidle" });
    await page.locator('[data-quiz-open="issue01"]').click();
    await page.evaluate(() => {
      const quiz = window.LAIDIES_SITE_DATA.quizzes.issue01;
      for (const question of quiz.questions) {
        const fieldset = document.querySelector(`[data-quiz-question="${question.id}"]`);
        const correct = Array.from(fieldset.querySelectorAll("input")).find((input) => input.value === question.answer);
        correct.checked = true;
      }
      document.querySelector("#quizForm").requestSubmit();
    });
    await page.waitForFunction(() => /Session-only best/i.test(document.querySelector("#quizBestScore")?.textContent || ""));
    assert.match(await page.locator("#quizResult").textContent(), /open session/i);
    assert.match(await page.locator("#quizResult").textContent(), /will not survive reload/i);
    assert.doesNotMatch(await page.locator("#quizResult, #quizBestScore").allTextContents().then((parts) => parts.join(" ")), /Best saved score|saved on this browser/i);
    assert.equal(await page.evaluate(() => localStorage.getItem("laidiesQuizProgress")), null);
    await page.reload({ waitUntil: "networkidle" });
    assert.match(await page.locator("#quizBestScore").textContent(), /not taken/i);
    pass("blocked storage uses honest session-only copy and resets after reload");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 640, height: 900 }, reducedMotion: "reduce" });
    await localOnly(page);
    await page.addInitScript(() => {
      localStorage.setItem("laidies_display_name", "HonorRollResidentWithAnExtraordinarilyLongUnbrokenNameToStressTheRecord");
      localStorage.setItem("laidiesQuizProgress", JSON.stringify({
        issue01: { attempts: 3, latestScore: 10, bestScore: 10, maxScore: 10, completedAt: "2026-07-25T12:00:00.000Z" },
        issue02: { attempts: 2, latestScore: 10, bestScore: 10, maxScore: 10, completedAt: "2026-07-25T12:10:00.000Z" },
        issue03: { attempts: 1, latestScore: 10, bestScore: 10, maxScore: 10, completedAt: "2026-07-25T12:20:00.000Z" }
      }));
    });
    await page.goto(`${base}/sunnyvaile-high.html#report-card`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => document.querySelector("#rc-name")?.textContent === "HonorRollResidentWithAnExtraordinarilyLongUnbrokenNameToStressTheRecord");
    await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
    const zoom = await measureReflow(page, ["#hub-record", "#rc-card", "#rc-meta", "#rc-name", ".rc-table-wrap", "#rc-summary"]);
    assertReflow(zoom, "Report Card 200-percent zoom");
    const residentName = await page.evaluate(() => {
      const name = document.querySelector("#rc-name");
      const meta = document.querySelector("#rc-meta").getBoundingClientRect();
      const card = document.querySelector("#rc-card").getBoundingClientRect();
      const rect = name.getBoundingClientRect();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(name);
      selection.removeAllRanges();
      selection.addRange(range);
      const selected = selection.toString();
      selection.removeAllRanges();
      return {
        text: name.textContent,
        selected,
        userSelect: getComputedStyle(name).userSelect,
        whiteSpace: getComputedStyle(name).whiteSpace,
        rect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, height: rect.height },
        meta: { left: meta.left, right: meta.right },
        card: { left: card.left, right: card.right }
      };
    });
    assert.equal(residentName.selected, residentName.text);
    assert.notEqual(residentName.userSelect, "none");
    assert.equal(residentName.whiteSpace, "normal");
    assert.ok(residentName.rect.left >= residentName.meta.left && residentName.rect.right <= residentName.meta.right,
      JSON.stringify(residentName));
    assert.ok(residentName.rect.left >= residentName.card.left && residentName.rect.right <= residentName.card.right,
      JSON.stringify(residentName));
    assert.ok(residentName.rect.height > 20, JSON.stringify(residentName));
    pass("long resident-name Report Card 200-percent zoom reflows and remains selectable");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 640, height: 900 }, reducedMotion: "reduce" });
    await localOnly(page);
    await page.addInitScript(() => {
      localStorage.setItem("laidies_display_name", "Alexandria-Long-Returning-Resident");
      localStorage.setItem("laidiesQuizProgress", JSON.stringify({
        issue01: { attempts: 999, latestScore: 10, bestScore: 12, maxScore: 10, completedAt: "2026-07-25T12:00:00.000Z" },
        issue02: { attempts: 888, latestScore: 10, bestScore: 12, maxScore: 10, completedAt: "2026-07-25T12:10:00.000Z" },
        issue03: { attempts: 777, latestScore: 10, bestScore: 12, maxScore: 10, completedAt: "2026-07-25T12:20:00.000Z" }
      }));
    });
    await page.goto(`${base}/sunnyvaile-high.html#superlatives`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => /Calculated from this device/i.test(document.querySelector("#yb-award-label")?.textContent || ""));
    await page.evaluate(() => {
      document.querySelector("#yb-title").textContent = "MostLikelyToInterrogateEveryConfidentlyIncorrectArtificialIntelligenceAnswerBeforeRepeatingIt";
      document.documentElement.style.zoom = "2";
    });
    const zoom = await measureReflow(page, ["#hub-yearbook", "#yb-portrait", "#yb-slate"]);
    assertReflow(zoom, "Yearbook 200-percent zoom");
    pass("seeded long-string Yearbook 200-percent zoom has component-level reflow");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 640, height: 900 }, reducedMotion: "reduce" });
    await localOnly(page);
    await page.goto(`${base}/learn/class.html?c=basics-current-context`, { waitUntil: "networkidle" });
    await page.locator("#class-format-note").waitFor();
    await page.evaluate(() => {
      const longTitle = "CurrentContextConstraintsAndSourceMaterialThatMustRemainVisibleWithoutHorizontalScrolling";
      document.querySelector("#chalk-name").textContent = longTitle;
      document.querySelector("#hd-name").textContent = longTitle;
      document.documentElement.style.zoom = "2";
    });
    await page.locator("#tv").focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.evaluate(() => document.activeElement?.id), "screen-close");
    const zoom = await measureReflow(page, [".sv-header", ".room", ".room__stage", ".screen__inner", ".slide", ".cls-grid"]);
    assertReflow(zoom, "Classroom 200-percent zoom");
    const classroomTargets = await page.evaluate(() => {
      const room = document.querySelector(".room").getBoundingClientRect();
      const tv = document.querySelector("#tv").getBoundingClientRect();
      const chalk = document.querySelector(".chalk").getBoundingClientRect();
      return {
        room: { left: room.left, right: room.right, top: room.top, bottom: room.bottom },
        tv: { left: tv.left, right: tv.right, top: tv.top, bottom: tv.bottom, width: tv.width, height: tv.height },
        chalk: { left: chalk.left, right: chalk.right, top: chalk.top, bottom: chalk.bottom }
      };
    });
    assert.ok(classroomTargets.tv.left >= classroomTargets.room.left && classroomTargets.tv.right <= classroomTargets.room.right,
      JSON.stringify(classroomTargets));
    assert.ok(classroomTargets.chalk.left >= classroomTargets.room.left && classroomTargets.chalk.right <= classroomTargets.room.right,
      JSON.stringify(classroomTargets));
    assert.ok(classroomTargets.tv.width >= 44 && classroomTargets.tv.height >= 44, JSON.stringify(classroomTargets));
    await page.keyboard.press("Escape");
    assert.equal(await page.evaluate(() => document.activeElement?.id), "tv");
    pass("long-title interactive classroom 200-percent zoom has component-level reflow");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 640, height: 900 }, reducedMotion: "reduce" });
    await localOnly(page);
    await page.goto(`${base}/learn/quiz.html`, { waitUntil: "networkidle" });
    await page.locator('[data-quiz-open="issue01"]').click();
    await page.evaluate(() => {
      const current = document.querySelector(".quiz-question.is-current");
      current.querySelector("h4").textContent = "WhichCurrentSourceShouldYouVerifyBeforeRepeatingATimeSensitiveArtificialIntelligenceClaim?";
      current.querySelector(".quiz-option").append(" ALongUnbrokenAnswerChoiceThatStillNeedsToRemainReadableAndOperableAtTwoHundredPercentZoom");
      current.querySelector("input").click();
      document.documentElement.style.zoom = "2";
    });
    const zoom = await measureReflow(page, [".sv-header", ".quiz-hero", ".quiz-container", ".quiz-console", ".quiz-question.is-current", ".quiz-ritual-controls"]);
    assertReflow(zoom, "Pop Quiz 200-percent zoom");
    assert.equal(await page.locator("#quizNextQuestion").isEnabled(), true);
    pass("long-string interactive Pop Quiz 200-percent zoom has component-level reflow");
    await page.close();
  }

  for (const width of [320, 390, 1280]) {
    for (const route of [
      { path: "/sunnyvaile-high.html#superlatives", selectors: ["#hub-yearbook", "#yb-portrait", "#yb-slate"] },
      { path: "/learn/class.html?c=basics-current-context", selectors: [".sv-header", ".room", ".room__stage", ".slide", ".cls-grid"] },
      { path: "/learn/quiz.html", selectors: [".sv-header", ".quiz-hero", ".quiz-container", ".quiz-issue-shelf"] }
    ]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
      await localOnly(page);
      await page.goto(`${base}${route.path}`, { waitUntil: "networkidle" });
      assertReflow(await measureReflow(page, route.selectors), `${width}px ${route.path}`);
      await page.close();
    }
  }
  pass("High, classroom and quiz retain 320, 390 and 1280 reduced-motion reflow");

  {
    const page = await browser.newPage({ viewport: { width: 640, height: 900 } });
    await localOnly(page);
    await page.goto(`${base}/sunnyvaile-high.html#report-card`, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    assert.equal(await page.locator("#rc-card").evaluate((element) => getComputedStyle(element).visibility), "visible");
    assert.equal(await page.locator("#rc-actions").evaluate((element) => getComputedStyle(element).display), "none");
    assert.equal(await page.locator(".rc-foot").evaluate((element) => getComputedStyle(element).display), "none");
    pass("Report Card print view keeps the record and suppresses interactive chrome");
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(`SUNNYVAiLE HIGH BROWSER PASS (${results.length} journeys)`);
for (const name of results) console.log(`- ${name}`);
