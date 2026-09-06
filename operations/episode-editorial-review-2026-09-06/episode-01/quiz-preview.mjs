import { buildEpisodeQuizAttempt } from "../../../content/site/episode-quiz-attempt.mjs";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);
const QUIZ_ID = "episode-01-quiz";
const EPISODE = "01";
const $ = (selector) => document.querySelector(selector);
const form = $("#quizForm");
const questionsHost = $("#quizQuestions");
const status = $("#quizStatus");
const saveButton = $("#quizSaveButton");
const retryButton = $("#quizRetryButton");
const abandonButton = $("#quizAbandonButton");
const openSavedButton = $("#quizOpenSavedButton");

if (!LOCAL_HOSTS.has(location.hostname)) {
  throw new Error("This private candidate may only run on localhost.");
}

let quiz;
let runtime;
let binder;
let owner = "";
let epoch = 0;
let pendingAttempt = null;
let savedAttempt = null;
let subscription;
let busy = false;
let retryLocked = false;
let requestedAttempt = new URLSearchParams(location.search).get("attempt") || "";

function message(text) {
  status.textContent = text;
}

function isAccountChange(error) {
  return String(error?.message || error).includes("account-changed-reload-binder");
}

function current(token) {
  return token.epoch === epoch && token.owner === owner;
}

function clearFeedback() {
  questionsHost.querySelectorAll(".quiz-question").forEach((field) => field.classList.remove("is-answered-correct", "is-answered-wrong"));
  questionsHost.querySelectorAll(".quiz-option").forEach((option) => option.classList.remove("is-correct", "is-wrong"));
  questionsHost.querySelectorAll(".quiz-explain").forEach((explanation) => explanation.remove());
}

function updateControls() {
  const locked = busy || retryLocked;
  form.querySelectorAll("input, button").forEach((control) => { control.disabled = locked; });
  retryButton.disabled = busy;
  abandonButton.disabled = busy;
  retryButton.hidden = !retryLocked;
  abandonButton.hidden = !retryLocked;
  openSavedButton.disabled = busy || retryLocked;
  saveButton.disabled = busy || retryLocked || !pendingAttempt;
}

function setBusy(value) {
  busy = value;
  updateControls();
}

function resetCandidate(note) {
  epoch += 1;
  busy = false;
  owner = "";
  binder?.invalidate();
  pendingAttempt = null;
  savedAttempt = null;
  retryLocked = false;
  form?.reset();
  clearFeedback();
  openSavedButton.hidden = true;
  updateControls();
  if (note) message(note);
}

function accountChanged() {
  resetCandidate("The account changed. The previous account’s attempt and Binder view have been closed.");
}

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function renderQuestions() {
  questionsHost.replaceChildren();
  quiz.questions.forEach((question, questionIndex) => {
    const fieldset = element("fieldset", undefined, `quiz-question${question.bonus ? " is-bonus" : ""}`);
    fieldset.dataset.quizQuestion = question.id;
    const legend = document.createElement("legend");
    legend.append(element("h4", `${questionIndex + 1}. ${question.prompt}${question.bonus ? " — Optional bonus" : ""}`));
    fieldset.append(legend);
    const options = element("div", undefined, "quiz-options");
    question.options.forEach((option, optionIndex) => {
      const label = element("label", undefined, "quiz-option");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `quiz-${question.id}`;
      input.value = String(optionIndex);
      const text = element("span", option);
      label.append(input, text);
      options.append(label);
    });
    fieldset.append(options);
    questionsHost.append(fieldset);
  });
}

function collectedAnswers() {
  const answers = {};
  quiz.questions.forEach((question) => {
    const selected = questionsHost.querySelector(`input[name="quiz-${question.id}"]:checked`);
    if (selected) answers[question.id] = Number(selected.value);
  });
  return answers;
}

function restoreAnswers(answers) {
  form.reset();
  Object.entries(answers).forEach(([questionId, selected]) => {
    const input = questionsHost.querySelector(`input[name="quiz-${questionId}"][value="${selected}"]`);
    if (input) input.checked = true;
  });
}

function renderFeedback(result) {
  clearFeedback();
  result.review.forEach((item) => {
    const fieldset = questionsHost.querySelector(`[data-quiz-question="${item.question_id}"]`);
    if (!fieldset) return;
    const selected = item.selected_option === null ? null : fieldset.querySelector(`input[value="${item.selected_option}"]`);
    const correct = fieldset.querySelector(`input[value="${item.correct_option}"]`);
    if (item.selected_option !== null) fieldset.classList.add(item.correct ? "is-answered-correct" : "is-answered-wrong");
    selected?.closest(".quiz-option")?.classList.add(item.correct ? "is-correct" : "is-wrong");
    correct?.closest(".quiz-option")?.classList.add("is-correct");
    const explain = element("div", undefined, "quiz-explain");
    explain.append(
      element("strong", item.selected_option === null ? "Bonus not answered." : item.correct ? "Correct." : "Not quite."),
      element("span", `Correct answer: ${quiz.questions.find((question) => question.id === item.question_id).options[item.correct_option]}`, "quiz-correct-answer"),
      element("p", item.selected_explain || item.explain)
    );
    fieldset.append(explain);
  });
}

function showAttempt(result, prefix) {
  pendingAttempt = result;
  retryLocked = false;
  renderFeedback(result);
  message(`${prefix} ${result.binderPayload.score}/${result.binderPayload.max_score} on scored questions. Bonus answers are shown for review but do not change this score.`);
  updateControls();
}

async function sessionOwner() {
  const session = await runtime.controller.getSession();
  if (!session?.user?.id) return "";
  return String(session.user.id);
}

function latestSavedFrom(documentValue) {
  const saved = documentValue?.episodes?.[EPISODE]?.quizzes?.[`${QUIZ_ID}@${quiz.version}`]?.attempts || [];
  return requestedAttempt ? saved.find(attempt=>attempt.attempt_id===requestedAttempt)||null : saved.length ? saved[saved.length - 1] : null;
}

function renderSavedAttempt() {
  if (!savedAttempt) return;
  const result = buildEpisodeQuizAttempt({ quizId: QUIZ_ID, quiz, answers: savedAttempt.answers, attemptId: savedAttempt.attempt_id, completedAt: savedAttempt.completed_at });
  if (result.binderPayload.score !== savedAttempt.score || result.binderPayload.max_score !== savedAttempt.max_score) throw new Error("saved-attempt-score-mismatch");
  restoreAnswers(savedAttempt.answers);
  renderFeedback(result);
  pendingAttempt = null;
  retryLocked = false;
  updateControls();
  message(`Opened saved attempt: ${result.binderPayload.score}/${result.binderPayload.max_score}. Its selected answers and feedback are shown above.`);
}

async function loadSaved(openSaved = false) {
  if (!runtime || !binder) return;
  setBusy(true);
  const started = epoch;
  let observedOwner;
  try {
    observedOwner = await sessionOwner();
  } catch (_) {
    message("Account saving is unavailable. You can still check this private candidate.");
    setBusy(false);
    return;
  }
  if (started !== epoch) return;
  if (!observedOwner) {
    if (owner) accountChanged();
    message("You can check answers as a guest. Sign in through your Resident Card before saving an attempt.");
    setBusy(false);
    return;
  }
  if (owner && owner !== observedOwner) {
    accountChanged();
    setBusy(false);
    return;
  }
  owner = observedOwner;
  const token = { epoch, owner };
  try {
    const loaded = await binder.load(owner);
    if (!current(token)) return;
    savedAttempt = latestSavedFrom(loaded.document);
    openSavedButton.hidden = !savedAttempt;
    if (openSaved && savedAttempt) renderSavedAttempt();
    else message(savedAttempt ? "A saved attempt is available in your Episode Binder." : requestedAttempt ? "That saved attempt is not available in this account." : "Check your answers, then choose whether to save this attempt to your Episode Binder.");
  } catch (error) {
    if (!current(token)) return;
    if (isAccountChange(error)) return accountChanged();
    message("The Episode Binder could not be opened. Your current answers remain on this page.");
  } finally {
    if (started === epoch) setBusy(false);
  }
}

async function saveAttempt() {
  if (busy || !pendingAttempt) return;
  if (!runtime || !binder) {message("Account saving is unavailable. Your checked answers remain open here.");return;}
  const snapshot=pendingAttempt,started=epoch;
  setBusy(true);
  let token;
  try {
    const observedOwner=await sessionOwner();
    if(started!==epoch)return;
    if(!observedOwner){if(owner)accountChanged();else message("Sign in through your Resident Card before saving. Your checked answers remain open here.");return;}
    if(owner&&owner!==observedOwner){accountChanged();return;}
    owner=observedOwner;token={epoch,owner};
    snapshot.mutationKey ||= crypto.randomUUID();
    message("Saving this attempt to your Episode Binder…");
    const result=await binder.saveQuizResult(1,snapshot.binderPayload,snapshot.mutationKey,token.owner);
    if(!current(token))return;
    if(result.state==='conflict'){snapshot.mutationKey=null;retryLocked=false;message("Your Binder changed elsewhere. Reopen the saved attempt before choosing what to keep.");return;}
    savedAttempt=result.document.episodes[EPISODE].quizzes[`${QUIZ_ID}@${quiz.version}`].attempts.find(attempt=>attempt.attempt_id===snapshot.binderPayload.attempt_id);
    pendingAttempt=null;retryLocked=false;openSavedButton.hidden=!savedAttempt;
    message("Saved to your Episode Binder. You can reopen this saved attempt and its feedback here.");
  }catch(error){
    if(started!==epoch||token&&!current(token))return;
    if(isAccountChange(error)){accountChanged();return;}
    retryLocked=!!snapshot.mutationKey;
    message(retryLocked?"The save could not be confirmed. Retry checks the same attempt.":"Account saving is unavailable. Your checked answers remain open here.");
  }finally{if(started===epoch)setBusy(false);}
}

function reopenSaved() {
  loadSaved(true).catch(() => message("The saved attempt could not be reopened. Your current answers remain on this page."));
}

async function mountAccount() {
  subscription?.unsubscribe();
  binder?.dispose();
  subscription = null;
  binder = null;
  runtime = await window.LAIDIESResidentAccountRuntime.get();
  binder = window.LAIDIESResidentEpisodeBinderV1.create(runtime);
  subscription = runtime.client.auth.onAuthStateChange((_event, session) => {
    if (owner && owner !== String(session?.user?.id || "")) accountChanged();
  }).data.subscription;
  await loadSaved(!!requestedAttempt);
}

async function start() {
  const requestedVersion = new URLSearchParams(location.search).get("version");
  const source = requestedVersion === "2026-09-06-v1" ? "./quiz-2026-09-06-v1.json" : "./quiz.json";
  const response = await fetch(new URL(source, import.meta.url), { cache: "no-store" });
  if (!response.ok) throw new Error("candidate-quiz-unavailable");
  quiz = await response.json();
  if (requestedVersion !== null && requestedVersion !== quiz.version) {
    message('This saved edition cannot be opened here. Your saved attempts have not been changed.');
    const link = document.createElement('a');link.href='/laidies-card.html#episodeBinderVessel';link.textContent='Return to my Episode Binder';status.after(link);return;
  }
  $("#quizEdition").textContent = `Episode 01 candidate · version ${quiz.version}`;
  openSavedButton.textContent = requestedAttempt ? 'Open this saved attempt' : 'Open latest saved attempt';
  renderQuestions();
  form.hidden = false;
  await mountAccount();
  addEventListener("pagehide", () => { epoch++; subscription?.unsubscribe(); binder?.dispose(); subscription = null; binder = null; runtime = null; });
  addEventListener("pageshow", (event) => {
    if (event.persisted) mountAccount().catch(() => message("Account saving is unavailable. Your current answers remain open here."));
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const result = buildEpisodeQuizAttempt({
      quizId: QUIZ_ID,
      quiz,
      answers: collectedAnswers(),
      attemptId: crypto.randomUUID(),
      completedAt: new Date().toISOString()
    });
    showAttempt(result, "Checked:");
  } catch (error) {
    if (String(error?.message || "").startsWith("Answer every scored question")) {
      const answers = collectedAnswers();
      const missingIndex = quiz.questions.findIndex((question) => !question.bonus && !Object.hasOwn(answers, question.id));
      const missing = quiz.questions[missingIndex];
      const firstOption = missing && questionsHost.querySelector(`input[name="quiz-${missing.id}"]`);
      message(`Answer question ${missingIndex + 1}: ${missing.prompt}`);
      firstOption?.focus();
      return;
    }
    message(error.message || "Answer every scored question before checking your result.");
  }
});

$("#quizResetButton").addEventListener("click", () => {
  requestedAttempt="";openSavedButton.textContent="Open latest saved attempt";const url=new URL(location.href);url.searchParams.delete("attempt");history.replaceState({},"",url);
  form.reset();
  clearFeedback();
  pendingAttempt = null;
  retryLocked = false;
  updateControls();
  message("Ready for a new private attempt. Bonus questions remain optional.");
});
saveButton.addEventListener("click", saveAttempt);
retryButton.addEventListener("click", saveAttempt);
abandonButton.addEventListener("click", () => {
  retryLocked = false;
  pendingAttempt = null;
  updateControls();
  message("This abandons the local retry. If the network wrote before failing, that attempt may still be in your Binder; reopen it before starting another.");
});
openSavedButton.addEventListener("click", reopenSaved);
questionsHost.addEventListener("change", () => {
  if (busy || retryLocked) return;
  pendingAttempt = null;
  clearFeedback();
  updateControls();
  message("Choices changed. Check the answers again before saving this attempt.");
});

start().catch((error) => {
  message(error.message === "resident-account-dependencies-unavailable" ? "Account saving is unavailable. You can still inspect the candidate when its questions load." : "This private candidate could not be opened.");
});
