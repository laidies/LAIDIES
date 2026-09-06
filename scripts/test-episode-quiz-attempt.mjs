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
  quiz_id: "episode-01-quiz", quiz_version: "2026-09-06-v1", attempt_id: attemptId,
  completed_at: completedAt, score: 10, max_score: 10, answers: allAnswers
});
assert.equal(result.review.length, 12);
assert.equal(result.review.filter(item => item.bonus).length, 2);
assert.equal(result.review.find(item => item.question_id === "ep01-bonus-training").correct, true);
assert.equal(result.review.find(item => item.question_id === "ep01-generation").explain, quiz.questions[2].explain);

const noBonus = Object.fromEntries(quiz.questions.filter(question => !question.bonus).map(question => [question.id, question.answer]));
const withoutBonus = buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: noBonus, attemptId, completedAt });
assert.equal(withoutBonus.binderPayload.score, 10, "bonus omissions do not change score");
assert.equal(withoutBonus.review.find(item => item.question_id === "ep01-bonus-saint").selected_option, null);

const incomplete = { ...noBonus };
delete incomplete["ep01-context"];
assert.throws(() => buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: incomplete, attemptId, completedAt }), /Answer every scored question/);
assert.throws(() => buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: { ...noBonus, unknown: 0 }, attemptId, completedAt }), /Unknown quiz question/);
assert.throws(() => buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: { ...noBonus, "ep01-context": 99 }, attemptId, completedAt }), /Invalid selected option/);
assert.throws(() => buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: [], attemptId, completedAt }), /Answers must be keyed/);
assert.throws(() => buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: noBonus, attemptId: "not-a-uuid", completedAt }), /stable attempt UUID/);
assert.throws(() => buildEpisodeQuizAttempt({ quizId: "episode-01-quiz", quiz, answers: noBonus, attemptId, completedAt: "tomorrow" }), /stable ISO completion time/);

console.log("EPISODE QUIZ ATTEMPT PASS scored=10 bonus=2 malformed=6");
