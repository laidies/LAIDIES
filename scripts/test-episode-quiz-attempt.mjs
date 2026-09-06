import assert from "node:assert/strict";
import fs from "node:fs";
import { buildEpisodeQuizAttempt } from "../content/site/episode-quiz-attempt.mjs";

const root = new URL("../", import.meta.url);
const quiz = JSON.parse(fs.readFileSync(new URL("operations/episode-editorial-review-2026-09-06/episode-01/quiz.json", root), "utf8"));
const attemptId = "00000000-0000-4000-8000-000000000001";
const completedAt = "2026-09-06T12:00:00.000Z";
const allAnswers = Object.fromEntries(quiz.questions.map(question => [question.id, question.answer]));

const result = buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: allAnswers, attemptId, completedAt });
assert.deepEqual(result.binderPayload, {
  quiz_id: "episode-01-quiz", quiz_version: quiz.version, attempt_id: attemptId,
  completed_at: completedAt, score: 10, max_score: 10, answers: allAnswers
});
assert.equal(result.review.length, 12);
assert.equal(result.review.filter(item => item.bonus).length, 2);
assert.equal(result.review.find(item => item.question_id === "ep01-bonus-training").correct, true);
assert.equal(result.review.find(item => item.question_id === "ep01-generation").explain, quiz.questions[2].explain);

for (const question of quiz.questions) {
  assert.ok(Array.isArray(question.optionFeedback), `${question.id} has selected-answer feedback`);
  for (let selected = 0; selected < question.options.length; selected += 1) {
    const answers = { ...allAnswers, [question.id]: selected };
    const mapped = buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers, attemptId, completedAt })
      .review.find(item => item.question_id === question.id);
    assert.equal(mapped.selected_explain, question.optionFeedback[selected], `${question.id} option ${selected} maps to its feedback`);
  }
}

const noBonus = Object.fromEntries(quiz.questions.filter(question => !question.bonus).map(question => [question.id, question.answer]));
const withoutBonus = buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: noBonus, attemptId, completedAt });
assert.equal(withoutBonus.binderPayload.score, 10, "bonus omissions do not change score");
assert.equal(withoutBonus.review.find(item => item.question_id === "ep01-bonus-saint").selected_option, null);
assert.equal(withoutBonus.review.find(item => item.question_id === "ep01-bonus-saint").selected_explain, null);

const archivedQuiz = JSON.parse(fs.readFileSync(new URL("operations/episode-editorial-review-2026-09-06/episode-01/quiz-2026-09-06-v1.json", root), "utf8"));
const archivedResult = buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz: archivedQuiz, answers: noBonus, attemptId, completedAt });
assert.equal(archivedResult.binderPayload.quiz_version, "2026-09-06-v1");
assert.equal(archivedResult.binderPayload.score, 10);
assert.ok(archivedResult.review.every(item => item.selected_explain === null));
assert.deepEqual(archivedResult.review.map(item => item.explain), archivedQuiz.questions.map(question => question.explain));

const legacyQuiz = {
  version: "2026-09-06-v1",
  questions: [
    { id: "legacy-scored", options: ["Keep", "Skip"], answer: 0, explain: "Legacy explanation.", bonus: false },
    { id: "legacy-bonus", options: ["Yes", "No"], answer: 1, explain: "Legacy bonus explanation.", bonus: true }
  ]
};
const legacyAnswers = { "legacy-scored": 0 };
const legacy = buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz: legacyQuiz, answers: legacyAnswers, attemptId, completedAt });
assert.deepEqual(legacy.binderPayload, {
  quiz_id: "episode-01-quiz", quiz_version: "2026-09-06-v1", attempt_id: attemptId,
  completed_at: completedAt, score: 1, max_score: 1, answers: legacyAnswers
});
assert.equal(legacy.review.find(item => item.question_id === "legacy-scored").selected_explain, null);
assert.equal(legacy.review.find(item => item.question_id === "legacy-bonus").selected_explain, null);

const feedbackFixture = {
  version: "feedback-fixture-v1",
  questions: [{ id: "feedback-scored", options: ["One", "Two"], answer: 0, explain: "Explanation.", optionFeedback: ["For one.", "For two."], bonus: false }]
};
for (const invalidFeedback of [[], ["Only one."], ["For one.", "   "], ["For one.", 2]]) {
  const malformed = structuredClone(feedbackFixture);
  malformed.questions[0].optionFeedback = invalidFeedback;
  assert.throws(() => buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz: malformed, answers: { "feedback-scored": 0 }, attemptId, completedAt }), /unsupported option feedback/);
}

const incomplete = { ...noBonus };
delete incomplete["ep01-context"];
assert.throws(() => buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: incomplete, attemptId, completedAt }), /Answer every scored question/);
assert.throws(() => buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: { ...noBonus, unknown: 0 }, attemptId, completedAt }), /Unknown quiz question/);
assert.throws(() => buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: { ...noBonus, "ep01-context": 99 }, attemptId, completedAt }), /Invalid selected option/);
assert.throws(() => buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: [], attemptId, completedAt }), /Answers must be keyed/);
assert.throws(() => buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: noBonus, attemptId: "not-a-uuid", completedAt }), /stable attempt UUID/);
assert.throws(() => buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: noBonus, attemptId, completedAt: "tomorrow" }), /stable ISO completion time/);

console.log("EPISODE QUIZ ATTEMPT PASS selected-feedback=current legacy=v1 malformed=10");
