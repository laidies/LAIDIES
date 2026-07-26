#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const read = (file) => fs.readFileSync(file, "utf8");
const classes = JSON.parse(read("content/site/high-classes.json"));
const learningLedger = JSON.parse(read("content/site/high-learning-ledger.json"));
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

check("class playback also fails closed on a separate learning-admission ledger", () => {
  assert.equal(learningLedger.schemaVersion, 1);
  assert.equal(learningLedger.product, "sunnyvaile-high");
  assert.equal(learningLedger.admissionPolicy, "fail-closed");
  assert.equal(learningLedger.defaultStatus, "held");
  assert.match(classroom, /Promise\.all\(\[/);
  assert.match(classroom, /fetchJSON\(LEARNING_DATA, 'Learning ledger'\)/);
  assert.match(classroom, /function exactKeys\(/);
  assert.match(classroom, /function isoDay\(/);
  assert.match(classroom, /is not a real calendar date/);
  assert.match(classroom, /admission is future, expired or out of order/);
  assert.match(classroom, /sourceInterval\.checkedOn > reviewed/);
  assert.match(classroom, /recheck > sourceInterval\.recheckOn/);
  assert.match(classroom, /source evidence does not contain the admission interval/);
  assert.match(classroom, /duplicate or ambiguous records/);
  assert.match(classroom, /Class-to-learning record binding is invalid/);
  assert.match(classroom, /Class-to-quiz binding is invalid/);
  assert.match(classroom, /unknown or extra record/);
  assert.match(classroom, /cls\.status === 'live' && cls\.video && admitted/);
  assert.match(classroom, /held-unlisted/);
  assert.match(classroom, /Learning review held/);
  assert.equal(
    learningLedger.records.filter((record) => record.kind === "class" && record.status === "admitted").length,
    0
  );
});

check("representative class and aligned quiz candidate satisfy the learning packet shape", () => {
  const cls = classes.classes.find((item) => item.slug === "basics-what-youre-looking-at");
  const lesson = learningLedger.records.find((record) => record.recordId === cls.learning_record);
  const quiz = learningLedger.records.find((record) => record.recordId === lesson.assessmentCandidateId);
  assert.equal(cls.status, "scripted");
  assert.equal(cls.video, null);
  assert.equal(cls.verified_on, null);
  assert.equal(cls.learning_content, lesson.contentPath);
  assert.equal(lesson.status, "held");
  assert.equal(lesson.candidateStatus, "repaired-awaiting-independent-review");
  assert.equal(lesson.reviewedOn, null);
  assert.equal(lesson.recheckOn, null);
  assert.equal(lesson.bindings.registerLearningRecord, lesson.recordId);
  assert.equal(lesson.bindings.videoPath, cls.video);
  for (const field of ["learningObjective", "prerequisite", "mentalModel"]) {
    assert.ok(lesson[field]?.trim(), `lesson missing ${field}`);
  }
  assert.ok(lesson.adjacentDistinctions.length >= 3);
  assert.ok(lesson.misconceptions.length >= 4);
  for (const mode of ["narration", "images", "animation", "demonstration", "captions"]) {
    assert.ok(lesson.modality[mode]?.trim(), `lesson modality missing ${mode}`);
  }
  assert.ok(lesson.analogy.text?.trim() && lesson.analogy.limit?.trim());
  assert.ok(lesson.sources.length >= 6);
  assert.ok(lesson.sources.some((source) =>
    source.sourceId === "openai-chatgpt-memory" &&
    source.supports.some((claim) => /future responses|Temporary Chat/i.test(claim))
  ));
  for (const source of lesson.sources) {
    assert.match(source.url, /^https:\/\/(help\.openai\.com|support\.anthropic\.com|ai\.google\.dev)\//);
    assert.match(source.checkedOn, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(source.recheckOn, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(source.supports.length);
  }
  assert.equal(quiz.kind, "quiz-candidate");
  assert.equal(quiz.status, "held");
  assert.equal(quiz.runtimeKey, null);
  assert.equal(quiz.runtimePath, null);
  assert.equal(quiz.assessmentMode, "selected-response-practice-not-explain-back");
  assert.equal(quiz.explainBackStatus, "held-requires-human-rubric-and-unfamiliar-learner-study");
  assert.equal(quiz.alignedClassRecordId, lesson.recordId);
  assert.equal(quiz.questions.length, 5);
  assert.ok(!quiz.questions.some((question) => /explain.*friend/i.test(question.prompt)));
  for (const question of quiz.questions) {
    assert.equal(question.options.length, 3);
    assert.ok(question.options.includes(question.answer));
    assert.ok(question.explanation?.trim());
    assert.ok(question.misconception?.trim());
    assert.ok(question.reviewAction?.trim());
  }
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
