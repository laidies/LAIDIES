#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const read = (file) => fs.readFileSync(file, "utf8");
const classes = JSON.parse(read("content/site/high-classes.json"));
const quizzes = JSON.parse(read("content/site/quizzes.json"));
const high = read("sunnyvaile-high.html");
const classroom = read("learn/class.html");
const quizPage = read("learn/quiz.html");
const quizStyles = read("content/site/quiz-v2.css");
const globalHeader = read("content/site/sv-global-header.js");
const shared = read("script.js");
const siteDataContext = { window: {} };
vm.runInNewContext(read("content/site/site-data.js"), siteDataContext);

const checks = [];
const check = (name, fn) => {
  fn();
  checks.push(name);
};

check("class register has the expected bounded inventory", () => {
  assert.equal(classes.subjects.length, 4);
  assert.equal(classes.classes.length, 37);
  assert.equal(new Set(classes.classes.map((item) => item.slug)).size, 37);
});

check("no planned class is presented as a ready tape", () => {
  const live = classes.classes.filter((item) => item.status === "live");
  assert.equal(live.length, 0);
  for (const item of classes.classes) {
    if (item.video) {
      assert.equal(item.status, "live");
      assert.ok(item.filmed_on);
      assert.ok(item.verified_on);
    }
  }
});

check("every visible class preview has a selection question", () => {
  for (const item of classes.classes) {
    assert.ok(item.name?.trim(), `${item.slug}: missing name`);
    assert.ok(item.question?.trim(), `${item.slug}: missing learner selection question`);
    assert.ok(item.subtitle?.trim(), `${item.slug}: missing scope subtitle`);
  }
});

check("classroom fails closed for non-OK, empty, and unknown registers", () => {
  assert.match(classroom, /if \(!r\.ok\) throw new Error/);
  assert.match(classroom, /if \(!list\.length\) throw new Error/);
  assert.match(classroom, /That class is not in the register/);
  assert.doesNotMatch(classroom, /if \(!cls\) cls = list\[0\]/);
  assert.match(classroom, /\$\('tv'\)\.disabled = true/);
  assert.match(high, /if \(!list\.length \|\| !subjects\.length\) throw new Error\('Class register is empty'\)/);
});

check("classroom states preview truth and implements modal focus recovery", () => {
  assert.match(classroom, /written production preview, not a finished class/i);
  assert.match(classroom, /aria-modal="true"[^>]+aria-label="Class tape"[^>]+aria-hidden="true"/);
  assert.match(classroom, /screen\.setAttribute\('aria-hidden', 'false'\)/);
  assert.match(classroom, /close\.focus\(\)/);
  assert.match(classroom, /e\.key === 'Tab'/);
  assert.match(classroom, /lastFocus\.focus\(\)/);
  assert.match(classroom, /Class production status opened/);
});

check("building copy matches zero ready tapes and device-local score state", () => {
  assert.match(high, /No class tapes are available yet/);
  assert.match(high, /current register has no ready tapes/i);
  assert.match(high, /This device only/);
  assert.match(high, /does not certify mastery/i);
  assert.match(high, /clearing browser data can remove it/i);
  assert.doesNotMatch(high, /Permanent Record/);
  assert.doesNotMatch(high, /Take this week's Pop Quiz/);
  assert.doesNotMatch(high, /Season 2 = 201 classes/);
  assert.doesNotMatch(high, /banked this season|fill your .*Closet jar|Voted Most Likely|Not yet voted|Bank 12\+ clips/i);
  assert.doesNotMatch(shared, /Banked in your Butterfly Clip Jar/i);
  assert.match(shared, /not a stored clip balance/i);
});

check("quiz surface scopes storage and cross-device limits", () => {
  assert.match(quizPage, /device-local/i);
  assert.match(quizPage, /Cross-device progress is not verified/i);
  assert.match(shared, /saved on this browser\/device; cross-device progress is not verified/i);
  assert.doesNotMatch(shared, /props: \{ quiz: activeQuizKey, score: score \}/);
  assert.match(shared, /return "device"/);
  assert.match(shared, /return "session"/);
  assert.match(shared, /result lasts only for this open session and will not survive reload/i);
  assert.match(shared, /Session-only best:/);
});

check("High layout families have explicit intrinsic zoom/reflow repairs", () => {
  assert.match(high, /#rc-table \{ min-width: 0; table-layout: fixed; \}/);
  assert.match(high, /#rc-table th, #rc-table td \{ overflow-wrap: anywhere; \}/);
  assert.match(high, /#rc-meta > div \{[^}]+flex: 1 1 180px;[^}]+min-width: 0; max-width: 100%; \}/);
  assert.match(high, /#rc-meta \.rc-meta-v \{[^}]+min-width: 0; max-width: 100%;[^}]+overflow-wrap: anywhere; \}/);
  assert.match(high, /#yb-portrait > \* \{ min-width: 0; max-width: 100%; overflow-wrap: anywhere; \}/);
  assert.match(classroom, /\.room__stage\{\s*position:absolute;inset:0;width:100%;height:100%;transform:none;/);
  assert.match(classroom, /\.room__img\{width:100%;height:100%;object-fit:cover;/);
  assert.match(quizStyles, /\.quiz-v2 :is\([\s\S]+?\.quiz-question,[\s\S]+?\) \{\s*min-width: 0;\s*max-width: 100%;/);
  assert.match(quizStyles, /overflow-wrap: anywhere/);
  assert.match(globalHeader, /body:is\(\.class-v2,\.quiz-v2\) \.sv-header \{ min-width: 0; flex-wrap: wrap; container: svgh \/ inline-size; \}/);
  assert.match(globalHeader, /@container svgh \(max-width: 520px\)/);
});

check("every quiz answer can be explained and reviewed", () => {
  assert.ok(Object.keys(quizzes).length >= 5);
  for (const [quizKey, quiz] of Object.entries(quizzes)) {
    assert.ok(quiz.title?.trim(), `${quizKey}: missing title`);
    assert.ok(quiz.questions?.length, `${quizKey}: missing questions`);
    const ids = new Set();
    let scored = 0;
    for (const question of quiz.questions) {
      assert.ok(question.id?.trim(), `${quizKey}: missing question id`);
      assert.ok(!ids.has(question.id), `${quizKey}: duplicate ${question.id}`);
      ids.add(question.id);
      assert.ok(question.prompt?.trim(), `${quizKey}/${question.id}: missing prompt`);
      assert.ok(Array.isArray(question.options) && question.options.length >= 3,
        `${quizKey}/${question.id}: too few options`);
      assert.equal(new Set(question.options).size, question.options.length,
        `${quizKey}/${question.id}: duplicate option`);
      assert.ok(question.options.includes(question.answer),
        `${quizKey}/${question.id}: answer not offered`);
      assert.ok(question.explain?.trim(), `${quizKey}/${question.id}: missing explanation`);
      assert.ok(question.review?.trim(), `${quizKey}/${question.id}: missing review direction`);
      const heldFuture = question.bonus === true &&
        question.reviewStatus === "held-future-episode" &&
        /not published/i.test(question.review);
      assert.ok(question.reviewUrl?.trim() || heldFuture,
        `${quizKey}/${question.id}: missing review route or explicit future hold`);
      if (!question.bonus) scored += Number(question.points || 0);
    }
    assert.equal(scored, Number(quiz.maxScore),
      `${quizKey}: core points do not match maxScore`);
  }
});

check("canonical and inline quiz datasets cannot drift", () => {
  assert.deepEqual(
    JSON.parse(JSON.stringify(siteDataContext.window.LAIDIES_SITE_DATA.quizzes)),
    quizzes
  );
});

check("quiz completion is not a naked score event", () => {
  assert.match(shared, /Correct answer:/);
  assert.match(shared, /What it means:/);
  assert.match(shared, /Where to find it:/);
  assert.match(shared, /attempts: Number\(current\.attempts \|\| 0\) \+ 1/);
  assert.match(shared, /bestScore: Math\.max\(Number\(current\.bestScore \|\| 0\), score\)/);
});

console.log(`SUNNYVAiLE HIGH CONTRACT PASS (${checks.length} checks)`);
for (const name of checks) console.log(`- ${name}`);
