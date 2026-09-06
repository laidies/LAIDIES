const ID = /^[A-Za-z0-9._:@-]{1,120}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ISO_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;

function plainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function requireId(value, label) {
  if (typeof value !== "string" || !ID.test(value)) throw new TypeError(`${label} is required.`);
  return value;
}

function requireQuestion(question) {
  if (!plainObject(question) || typeof question.id !== "string" || !ID.test(question.id)
    || !Array.isArray(question.options) || question.options.length < 2
    || question.options.some(option => typeof option !== "string")
    || !Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length
    || typeof question.explain !== "string") throw new TypeError("Quiz contains an unsupported question.");
  if (Object.hasOwn(question, "optionFeedback")
    && (!Array.isArray(question.optionFeedback)
      || question.optionFeedback.length !== question.options.length
      || question.optionFeedback.some(feedback => typeof feedback !== "string" || !feedback.trim())))
    throw new TypeError("Quiz contains unsupported option feedback.");
}

function quizQuestions(quiz) {
  if (!plainObject(quiz) || !Array.isArray(quiz.questions) || !quiz.questions.length) throw new TypeError("Quiz questions are required.");
  const ids = new Set();
  for (const question of quiz.questions) {
    requireQuestion(question);
    if (ids.has(question.id)) throw new TypeError("Quiz question IDs must be unique.");
    ids.add(question.id);
  }
  return quiz.questions;
}

function validateAnswers(questions, answers) {
  if (!plainObject(answers)) throw new TypeError("Answers must be keyed by exact question ID.");
  const known = new Map(questions.map(question => [question.id, question]));
  for (const [questionId, selected] of Object.entries(answers)) {
    const question = known.get(questionId);
    if (!question) throw new TypeError(`Unknown quiz question: ${questionId}.`);
    if (!Number.isInteger(selected) || selected < 0 || selected >= question.options.length)
      throw new TypeError(`Invalid selected option for quiz question: ${questionId}.`);
  }
  for (const question of questions) {
    if (!question.bonus && !Object.hasOwn(answers, question.id))
      throw new TypeError(`Answer every scored question before saving: ${question.id}.`);
  }
}

/**
 * Scores one completed episode quiz without performing storage or clock/UUID work.
 * Bonus answers are retained for review but deliberately do not affect score.
 */
export function buildEpisodeQuizAttempt({ quizId, quiz, answers, attemptId, completedAt }) {
  requireId(quizId, "Quiz ID");
  if (!plainObject(quiz) || typeof quiz.version !== "string" || !ID.test(quiz.version))
    throw new TypeError("Quiz version is required.");
  if (typeof attemptId !== "string" || !UUID.test(attemptId)) throw new TypeError("A stable attempt UUID is required.");
  if (typeof completedAt !== "string" || !ISO_TIME.test(completedAt) || Number.isNaN(Date.parse(completedAt)))
    throw new TypeError("A stable ISO completion time is required.");

  const questions = quizQuestions(quiz);
  validateAnswers(questions, answers);
  const selectedAnswers = Object.fromEntries(Object.entries(answers));
  const review = questions.map(question => {
    const selected = Object.hasOwn(selectedAnswers, question.id) ? selectedAnswers[question.id] : null;
    return {
      question_id: question.id,
      selected_option: selected,
      correct_option: question.answer,
      correct: selected === question.answer,
      bonus: Boolean(question.bonus),
      explain: question.explain,
      selected_explain: selected === null ? null : question.optionFeedback?.[selected] ?? null
    };
  });
  const scored = review.filter(item => !item.bonus);
  const score = scored.filter(item => item.correct).length;

  return {
    binderPayload: {
      quiz_id: quizId,
      quiz_version: quiz.version,
      attempt_id: attemptId,
      completed_at: completedAt,
      score,
      max_score: scored.length,
      answers: selectedAnswers
    },
    review
  };
}
