import { useMemo, useRef, useState } from "react";
import {useEpisodeBinder} from './useEpisodeBinder';
import exerciseSchema from '../../../../../content/episodes/episode-01.exercise-fields.json';
import {
  ArrowCounterClockwise,
  ArrowRight,
  Check,
  CheckCircle,
  CopySimple,
  DownloadSimple,
  ArrowSquareOut,
  Info,
  Printer,
  Trash,
} from "@phosphor-icons/react";

const SAMPLE_TASK =
  "Draft a short warm email moving Friday’s deadline to next Tuesday.";

const providers = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    className: "provider-chatgpt",
    officialUrl: "https://chatgpt.com/",
    presentation: "Email writing block",
    observed: "28 Jul 2026",
    modelOptions: [
      "Model label not displayed",
      "Other",
    ],
    initialModel: "Model label not displayed",
    guidedAnswer: `Here’s a concise, warm email you can send.

Subject: Updated Deadline

Hi,

I hope you’re doing well. I wanted to let you know that we’re moving Friday’s deadline to next Tuesday to allow a bit more time.

Thanks for your flexibility, and please let me know if you have any questions.

Best,
[Your Name]`,
  },
  {
    id: "claude",
    name: "Claude",
    className: "provider-claude",
    officialUrl: "https://claude.ai/new",
    presentation: "Email composer",
    observed: "27 Jul 2026",
    modelOptions: ["Model label not displayed", "Other"],
    initialModel: "Model label not displayed",
    guidedAnswer: `Subject: Quick update on the deadline

Hi [Name],

I wanted to give you a heads-up as early as I could: I’m not going to be able to hit Friday’s deadline. I underestimated the time a couple of pieces would take, and I’d rather be upfront with you than hand over something rushed.

Could we push to next Tuesday instead? That gives me the room to do it properly.

Thanks for your understanding,
[Your Name]`,
  },
  {
    id: "gemini",
    name: "Gemini",
    className: "provider-gemini",
    officialUrl: "https://gemini.google.com/app",
    presentation: "Answer + quick tip",
    observed: "27 Jul 2026",
    modelOptions: ["Model label not displayed", "Other"],
    initialModel: "Model label not displayed",
    guidedAnswer: `Subject: Quick update regarding the deadline

Hi [Name],

I’m reaching out with a quick update. I won’t be able to wrap this up by Friday as planned. Would it work for you if I send the completed draft by next Tuesday instead?

Thanks for your understanding and flexibility.

Quick tip: If useful, add one brief sentence explaining the reason for the delay.`,
  },
];

const ratingLabels = [
  ["gotMeaning", "Got what I meant"],
  ["useful", "Useful material"],
  ["tone", "Tone fit"],
  ["easy", "Easy to work with"],
];

const guidedRatingLabels = [
  ["gotMeaning", "Followed the task"],
  ["useful", "Useful starting point"],
  ["tone", "Tone suits the task"],
  ["easy", "Needs little editing"],
];

const styleLabels = [
  ["detail", "Short", "Detailed"],
  ["tone", "Direct", "Conversational"],
  ["scope", "Sticks to my ask", "Adds ideas"],
  ["structure", "Plain", "Structured"],
];

const guidedStyleLabels = [
  ["detail", "Short", "Detailed"],
  ["tone", "Direct", "Conversational"],
  ["scope", "Sticks to the task", "Adds ideas"],
  ["structure", "Plain", "Structured"],
];

const emptyRatings = () => ({
  gotMeaning: 0,
  useful: 0,
  tone: 0,
  easy: 0,
});

const emptyStyles = () => ({
  detail: 50,
  tone: 50,
  scope: 50,
  structure: 50,
});

const makeInitialRuns = () =>
  Object.fromEntries(
    providers.map((provider) => [
      provider.id,
      {
        model: provider.initialModel,
        customModel: "",
        answer: "",
        ratings: emptyRatings(),
        styles: emptyStyles(),
        liked: "",
        disliked: "",
        change: "",
        verify: "",
      },
    ]),
  );

const steps = [
  ["task", "Task"],
  ["answers", "Answers"],
  ["compare", "Compare"],
  ["pick", "Pick + review"],
  ["receipt", "Receipt"],
];

function modelLabel(run) {
  if (run.model === "Other") return run.customModel.trim() || "Other";
  return run.model;
}

function ratingLabel(value) {
  return value ? `${value}/5` : "Not rated";
}

function ratingStatus(run) {
  return Object.values(run.ratings).every(Boolean) ? "Rated" : "Not rated";
}

function copyFallback(text) {
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

function AppButton({ children, kind = "primary", icon, ...props }) {
  return (
    <button className={`button button-${kind}`} {...props}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

function ProgressRail({ step, setStep, completedSteps }) {
  const activeIndex = steps.findIndex(([id]) => id === step);
  return (
    <nav className="progress-rail" aria-label="Try-On progress">
      {steps.map(([id, label], index) => {
        const isComplete = completedSteps.includes(id);
        const isActive = id === step;
        const isAvailable = index <= activeIndex || isComplete;
        return (
          <button
            key={id}
            type="button"
            className={`progress-step ${isActive ? "is-active" : ""} ${
              isComplete ? "is-complete" : ""
            }`}
            onClick={() => isAvailable && setStep(id)}
            disabled={!isAvailable}
            aria-current={isActive ? "step" : undefined}
          >
            <span className="step-number">
              {isComplete && !isActive ? <Check weight="bold" /> : index + 1}
            </span>
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function Header({ task, journeyMode }) {
  return (
    <header className="experience-header">
      <div className="brand-block">
        <a
          className="brand-wordmark"
          data-brand-wordmark="current-live-jost"
          href="/blend-snap.html?packVersion=2026-09-06-v1#episode-01-pack"
          aria-label="Return to Episode 01 Study Pack"
        >
          L<span className="brand-ai">A</span>
          <span className="brand-i-wrap">
            <span className="brand-ai">ı</span>
            <span className="brand-i-dot" aria-hidden="true" />
          </span>
          DIES
        </a>
        <div>
          <p className="eyebrow">Episode 01 Try-On</p>
          <p className="product-title">Three Tabs, One Task</p>
        </div>
      </div>
      <div className="headline-block">
        <h1>
          Same task.{" "}<strong>Different drafts.</strong>
        </h1>
        {task.trim() && (
          <p className="task-summary" aria-live="polite">
            <span>
              {journeyMode === "guided" ? "Example task:" : "Your task:"}
            </span>{" "}
            {task.trim()}
          </p>
        )}
      </div>
      <figure className="episode-art">
        <img
          src={`${import.meta.env.BASE_URL}assets/episode-01-title-card.png`}
          alt="Episode One: On Wednesdays We Do AI"
        />
      </figure>
    </header>
  );
}

function ModelRecorder({ provider, run, updateRun }) {
  return (
    <div className="model-recorder">
      <label htmlFor={`${provider.id}-model`}>
        Model / mode shown in your tool
      </label>
      <div className="model-row">
        <select
          id={`${provider.id}-model`}
          value={run.model}
          onChange={(event) => updateRun({ model: event.target.value })}
        >
          {provider.modelOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <button
          className="text-button"
          type="button"
          onClick={() =>
            window.alert(
              "Look near the chat header or model menu. If no model name appears, choose “Model label not displayed.” Do not guess.",
            )
          }
        >
          <Info weight="fill" aria-hidden="true" />
          How to check
        </button>
      </div>
      {run.model === "Other" && (
        <input
          className="custom-model"
          aria-label={`${provider.name} model or mode`}
          value={run.customModel}
          onChange={(event) => updateRun({ customModel: event.target.value })}
          placeholder="Type exactly what your tool shows"
        />
      )}
    </div>
  );
}

function ProviderScreen({
  provider,
  run,
  active,
  onActivate,
  updateRun,
  compact = false,
}) {
  return (
    <section
      className={`monitor ${provider.className} ${active ? "is-active" : ""}`}
      aria-labelledby={`${provider.id}-title`}
    >
      <button
        className="monitor-heading"
        type="button"
        onClick={onActivate}
        aria-pressed={active}
      >
        <span id={`${provider.id}-title`}>{provider.name}</span>
        {active && <span className="active-label">Active</span>}
      </button>
      <div className="monitor-bezel">
        <ModelRecorder
          provider={provider}
          run={run}
          updateRun={updateRun}
        />
        {!compact && (
          <>
            <p className="answer-meta">Paste the answer to your task.</p>
            <textarea
              className="answer-input"
              aria-label={`${provider.name} answer or excerpt`}
              value={run.answer}
              onChange={(event) => updateRun({ answer: event.target.value })}
              placeholder={`After ${provider.name} replies, paste the answer or a short non-sensitive excerpt here`}
            />
            <div className="answer-actions">
              <a
                className="official-link"
                href={provider.officialUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open {provider.name}
                <ArrowSquareOut aria-hidden="true" />
              </a>
              {run.answer && (
                <button
                  className="text-button"
                  type="button"
                  onClick={() => updateRun({ answer: "" })}
                >
                  <Trash aria-hidden="true" />
                  Clear
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <footer className="monitor-footer">
        <span>{modelLabel(run)}</span>
        <span>Your answer</span>
      </footer>
    </section>
  );
}

function ProviderTabs({ activeProvider, setActiveProvider, runs }) {
  return (
    <div className="provider-tabs" role="tablist" aria-label="AI tools">
      {providers.filter((provider) => runs[provider.id].answer.trim()).map((provider) => (
        <button
          key={provider.id}
          type="button"
          role="tab"
          aria-selected={activeProvider === provider.id}
          className={`${provider.className} ${
            activeProvider === provider.id ? "is-active" : ""
          }`}
          onClick={() => setActiveProvider(provider.id)}
          >
            <strong>{provider.name}</strong>
            <span>{modelLabel(runs[provider.id])}</span>
            <span>{ratingStatus(runs[provider.id])}</span>
          </button>
      ))}
    </div>
  );
}

function RatingControls({ run, updateRun, journeyMode }) {
  const labels =
    journeyMode === "guided" ? guidedRatingLabels : ratingLabels;

  return (
    <fieldset className="control-group rating-group">
      <legend>
        {journeyMode === "guided"
          ? "Rate this example answer"
          : "Your ratings for this task"}
      </legend>
      <p className="field-help">
        {journeyMode === "guided"
          ? "1 poor fit · 3 workable · 5 strong starting point"
          : "1 missed it · 3 partly useful · 5 strong fit for this task"}
      </p>
      {labels.map(([key, label]) => (
        <div className="rating-row" key={key}>
          <span>{label}</span>
          <div className="segmented" aria-label={label}>
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={run.ratings[key] === value ? "is-selected" : ""}
                aria-pressed={run.ratings[key] === value}
                onClick={() =>
                  updateRun({
                    ratings: { ...run.ratings, [key]: value },
                  })
                }
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </fieldset>
  );
}

function StyleControls({ run, updateRun, journeyMode }) {
  const labels =
    journeyMode === "guided" ? guidedStyleLabels : styleLabels;

  return (
    <fieldset className="control-group style-group">
      <legend>What did this answer feel like?</legend>
      <p className="field-help">Neither end is better. Describe what you saw.</p>
      {labels.map(([key, start, end]) => (
        <label className="style-row" key={key}>
          <span>{start}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={run.styles[key]}
            onChange={(event) =>
              updateRun({
                styles: {
                  ...run.styles,
                  [key]: Number(event.target.value),
                },
              })
            }
          />
          <span>{end}</span>
          <output>{run.styles[key]}</output>
        </label>
      ))}
    </fieldset>
  );
}

function NotesControls({ run, updateRun }) {
  return (
    <div className="notes-grid">
      {[
        ["liked", "I liked…"],
        ["disliked", "I didn’t like…"],
        ["change", "I would change…"],
      ].map(([key, label]) => (
        <label key={key}>
          <span>{label}</span>
          <textarea
            value={run[key]}
            onChange={(event) => updateRun({ [key]: event.target.value })}
            placeholder="Your note"
          />
        </label>
      ))}
      <fieldset className="verify-control">
        <legend>Anything factual to verify?</legend>
        {[
          ["yes", "Yes"],
          ["no", "No"],
          ["unsure", "Not sure"],
          ["na", "N/A"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={run.verify === value ? "is-selected" : ""}
            aria-pressed={run.verify === value}
            onClick={() => updateRun({ verify: value })}
          >
            {label}
          </button>
        ))}
      </fieldset>
    </div>
  );
}

function TaskStage({ task, setTask, startGuided, startLive }) {
  const starters = [
    "Draft an email I keep postponing.",
    "Turn my non-confidential notes into a checklist.",
    "Help me prepare for a conversation I’ve been avoiding.",
  ];
  return (
    <section className="stage single-stage">
      <div className="stage-intro">
        <p className="stage-number">Step 1</p>
        <h2>Choose how you want to try it</h2>
        <p>
          Use the ready-made example without leaving LAiDIES, or compare one of
          your own small tasks in the tools you have available.
        </p>
      </div>
      <div className="route-choice guided-route">
        <div>
          <p className="route-kicker">Stay inside LAiDIES</p>
          <h3>Try the guided example</h3>
          <p>
            We have already run the same avoided-email task in all three tools.
            Compare the dated example answers—no accounts, tabs or copying.
          </p>
          <blockquote className="guided-task-preview">
            <span>ChatGPT, Claude and Gemini were all asked exactly this:</span>
            “{SAMPLE_TASK}”
          </blockquote>
        </div>
        <AppButton onClick={startGuided} icon={<ArrowRight weight="bold" />}>
          Compare the guided answers
        </AppButton>
      </div>

      <div className="route-divider" aria-hidden="true">
        <span>or</span>
      </div>

      <div className="route-choice live-route">
        <div className="route-heading">
          <p className="route-kicker">Use the real tools</p>
          <h3>Compare my own task</h3>
          <p>
            Choose the exact words below. Next, you will open ChatGPT, Claude
            and Gemini, paste this task into each one you can use, then bring the
            answers back here. One tool is enough to start; add another later.
          </p>
        </div>
        <label className="large-field">
          <span>What is one small task you’ve been avoiding?</span>
          <textarea
            value={task}
            onChange={(event) => setTask(event.target.value)}
            placeholder="Write one small task in your own words"
          />
        </label>
        <p className="privacy-reminder">
          Use your own non-sensitive material or invented details. For work, both the tool and the information must be allowed by your employer.
        </p>
        <p className="starter-label">
          Need an idea? Choose a starter task—you can edit it.
        </p>
        <div className="starter-row">
          {starters.map((starter) => (
            <button
              key={starter}
              type="button"
              className={task === starter ? "is-selected" : ""}
              aria-pressed={task === starter}
              onClick={() => setTask(starter)}
            >
              <span>{starter}</span>
              <small>
                {task === starter
                  ? "Selected · edit above"
                  : "Use this starter"}
              </small>
            </button>
          ))}
        </div>
        <div className="stage-actions">
          <AppButton
            onClick={startLive}
            disabled={!task.trim()}
            icon={<CopySimple weight="bold" />}
          >
            Copy task + open the tools
          </AppButton>
        </div>
      </div>
    </section>
  );
}

function AnswersStage({ task, runs, setRuns, next, notify }) {
  const allReady = providers.some((provider) =>
    runs[provider.id].answer.trim(),
  );
  const updateRun = (id, patch) =>
    setRuns((current) => ({
      ...current,
      [id]: { ...current[id], ...patch },
    }));

  return (
    <section className="stage">
      <div className="stage-heading">
        <div>
          <p className="stage-number">Step 2</p>
          <h2>Try the task in a tool you can use</h2>
          <p>
            Start with one tool. If you try another, use exactly the same task
            wording so you can compare the answers fairly.
          </p>
        </div>
        <AppButton
          kind="secondary"
          onClick={notify}
          icon={<CopySimple weight="bold" />}
        >
          Copy exact task again
        </AppButton>
      </div>
      <div className="handoff-instructions">
        <div>
          <strong>1 · Open the tool</strong>
          <span>Use the official link in its panel.</span>
        </div>
        <div>
          <strong>2 · Paste + send</strong>
          <span>{task}</span>
        </div>
        <div>
          <strong>3 · Bring back the answer</strong>
          <span>Paste the reply into that tool’s answer box below.</span>
        </div>
      </div>
      <div className="monitor-grid answer-grid">
        {providers.map((provider) => (
          <ProviderScreen
            key={provider.id}
            provider={provider}
            run={runs[provider.id]}
            active
            onActivate={() => {}}
            updateRun={(patch) => updateRun(provider.id, patch)}
          />
        ))}
      </div>
      <div className="stage-actions">
        <p className="completion-note">
          {allReady
            ? "Your answer is ready to review. You can add more later."
            : "Paste at least one answer to continue."}
        </p>
        <AppButton
          onClick={next}
          disabled={!allReady}
          icon={<ArrowRight weight="bold" />}
        >
          Compare the answers
        </AppButton>
      </div>
    </section>
  );
}

function CompareStage({
  task,
  runs,
  setRuns,
  activeProvider,
  setActiveProvider,
  journeyMode,
  next,
}) {
  const provider = providers.find((item) => item.id === activeProvider);
  const run = runs[activeProvider];
  const updateRun = (patch) =>
    setRuns((current) => ({
      ...current,
      [activeProvider]: { ...current[activeProvider], ...patch },
    }));
  const availableProviders = providers.filter((item) => runs[item.id].answer.trim());
  const completedProviders = availableProviders.filter((item) =>
    Object.values(runs[item.id].ratings).every(Boolean),
  ).length;

  return (
    <section className="stage compare-stage">
      <div className="stage-heading">
        <div>
          <p className="stage-number">Step 3</p>
          <h2>Compare what actually came back</h2>
          <p>
            Compare what it understood, what you could use and what needs checking. Ratings and style sliders are optional.
          </p>
        </div>
        <div className="counter">{completedProviders} of {availableProviders.length} rated</div>
      </div>
      <div className={`comparison-mode ${journeyMode || "live"}`}>
        <strong>
          {journeyMode === "guided"
            ? "You’re comparing the ready-made example"
            : "You’re reviewing the answers you brought back"}
        </strong>
        <span>
          {journeyMode === "guided"
            ? "LAiDIES has already supplied the same dated email task and three example answers. Nothing was sent from this page."
            : "These are the answers you brought back from the products you tried."}
        </span>
      </div>
      <div className="comparison-task">
        <span>The request you used:</span>
        <strong>{task}</strong>
      </div>
      <ProviderTabs
        activeProvider={activeProvider}
        setActiveProvider={setActiveProvider}
        runs={runs}
      />
      <div className="compare-layout">
        <div className={`active-answer ${provider.className}`}>
          <div className="active-answer-heading">
            <div>
              <p>{provider.name}</p>
              <span>{modelLabel(run)}</span>
            </div>
            <span>{journeyMode === "guided" ? `Saved example · ${provider.observed}` : "Your answer"}</span>
            <span>{ratingStatus(run)}</span>
          </div>
          <pre>{run.answer}</pre>
        </div>
        <div className="comparison-console">
          <RatingControls
            run={run}
            updateRun={updateRun}
            journeyMode={journeyMode}
          />
          <StyleControls
            run={run}
            updateRun={updateRun}
            journeyMode={journeyMode}
          />
          <NotesControls run={run} updateRun={updateRun} />
        </div>
      </div>
      <div className="stage-actions receipt-preview">
        <div>
          <p className="preview-label">Next: My First-Pass Receipt</p>
          <p>
            Choose a draft · record what you checked or changed · save the version you would use
          </p>
        </div>
        <AppButton
          onClick={next}
          disabled={availableProviders.length === 0}
          icon={<ArrowRight weight="bold" />}
        >
          Continue: choose + review
        </AppButton>
      </div>
    </section>
  );
}

function PickStage({
  runs,
  chosenProvider,
  setChosenProvider,
  editedDraft,
  setEditedDraft,
  humanChange,
  setHumanChange,
  next,
}) {
  const chosen = providers.find((provider) => provider.id === chosenProvider);
  const hasDraft = editedDraft.trim();

  const choose = (id) => {
    setChosenProvider(id);
    setEditedDraft(runs[id].answer);
    setHumanChange("");
  };

  return (
    <section className="stage single-stage">
      <div className="stage-intro">
        <p className="stage-number">Step 4</p>
        <h2>Choose the best first pass for this task</h2>
        <p>
          This is not a permanent tool ranking. Pick the draft that gives you
          the strongest place to begin, then make it yours.
        </p>
      </div>
      <div className="choice-grid">
        {providers.filter((provider) => runs[provider.id].answer.trim()).map((provider) => (
          <button
            key={provider.id}
            type="button"
            className={`${provider.className} ${
              chosenProvider === provider.id ? "is-selected" : ""
            }`}
            onClick={() => choose(provider.id)}
          >
            {chosenProvider === provider.id && (
              <CheckCircle weight="fill" aria-hidden="true" />
            )}
            <strong>{provider.name}</strong>
            <span>{modelLabel(runs[provider.id])}</span>
            <small>My pick for this task</small>
          </button>
        ))}
      </div>
      <div className="edit-grid">
        <label className="large-field">
          <span>Your version</span>
          <textarea
            value={editedDraft}
            onChange={(event) => setEditedDraft(event.target.value)}
          />
        </label>
        <label className="large-field human-change">
          <span>What did you check, keep or change—and why?</span>
          <textarea
            value={humanChange}
            onChange={(event) => setHumanChange(event.target.value)}
            placeholder="For example: I checked the deadline and tone. I would keep this draft as written."
          />
          <small>
            Keep wording that works. Change what does not. Your note records the judgment behind that choice.
          </small>
        </label>
      </div>
      <div className="stage-actions">
        <p className={`completion-note ${hasDraft && humanChange.trim() ? "is-ready" : ""}`}>
          {hasDraft && humanChange.trim()
            ? "Your draft and judgment note are ready."
            : "Keep or edit the draft, then record what you checked."}
        </p>
        <AppButton
          onClick={next}
          disabled={!hasDraft || !humanChange.trim()}
          icon={<ArrowRight weight="bold" />}
        >
          Make my receipt
        </AppButton>
      </div>
    </section>
  );
}

function ReceiptStage({
  task,
  runs,
  journeyMode,
  chosenProvider,
  editedDraft,
  humanChange,
  notify,
  restart,
  guest,
  startUnsaved,
}) {
  const [confirmRestart, setConfirmRestart] = useState(false);
  const chosen = providers.find((provider) => provider.id === chosenProvider);
  const chosenRun = runs[chosenProvider];
  const receiptRatingLabels =
    journeyMode === "guided" ? guidedRatingLabels : ratingLabels;
  const receiptText = useMemo(() => {
    const toolLines = providers
      .filter((provider) => runs[provider.id].answer.trim())
      .map((provider) => {
        const run = runs[provider.id];
        const ratingText = receiptRatingLabels
          .map(([key, label]) => `${label}: ${ratingLabel(run.ratings[key])}`)
          .join("; ");
        return `${provider.name} — ${modelLabel(run)} — ${ratingText}`;
      })
      .join("\n");
    return `MY FIRST-PASS RECEIPT
Completed: ${new Date().toLocaleDateString()}

TASK
${task}

TOOL RECEIPTS
${toolLines}

MY PICK FOR THIS TASK
${chosen.name} — ${modelLabel(chosenRun)}

MY JUDGMENT
${humanChange}

FACTS TO VERIFY
${chosenRun.verify || "Not answered"}

MY DRAFT
${editedDraft}

This is a task-specific observation, not a permanent tool ranking.`;
  }, [
    task,
    runs,
    journeyMode,
    chosen,
    chosenRun,
    editedDraft,
    humanChange,
  ]);

  const downloadReceipt = () => {
    const blob = new Blob([receiptText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-first-pass-receipt.txt";
    link.click();
    URL.revokeObjectURL(url);
    notify("Receipt downloaded.", "");
  };

  return (
    <section className="stage receipt-stage">
      <div className="receipt" id="first-pass-receipt">
        <div className="receipt-heading">
          <div>
            <p className="stage-number">Step 5 · Complete</p>
            <h2>My First-Pass Receipt</h2>
            <p>
              One useful draft. One judgment about what you checked or changed.
              A dated note about what worked for this task.
            </p>
          </div>
          <CheckCircle size={54} weight="fill" aria-hidden="true" />
        </div>
        <dl className="receipt-facts">
          <div>
            <dt>Completed</dt>
            <dd>{new Date().toLocaleDateString()}</dd>
          </div>
          <div>
            <dt>My pick for this task</dt>
            <dd>
              {chosen.name} · {modelLabel(chosenRun)}
            </dd>
          </div>
          <div>
            <dt>Verification flag</dt>
            <dd className={chosenRun.verify === "yes" ? "needs-check" : ""}>
              {chosenRun.verify === "yes" || chosenRun.verify === "unsure"
                ? "Verify before using"
                : chosenRun.verify === "no"
                  ? "No factual check noted"
                  : chosenRun.verify === "na" ? "Not applicable" : "Not answered"}
            </dd>
          </div>
        </dl>
        <div className="receipt-section">
          <h3>My task</h3>
          <p>{task}</p>
        </div>
        <div className="receipt-tools">
          {providers.filter((provider) => runs[provider.id].answer.trim()).map((provider) => {
            const run = runs[provider.id];
            return (
              <article key={provider.id} className={provider.className}>
                <h3>{provider.name}</h3>
                <p>{modelLabel(run)}</p>
                <div className="mini-ratings">
                  {receiptRatingLabels.map(([key, label]) => (
                    <span key={key}>
                      {label}: <strong>{ratingLabel(run.ratings[key])}</strong>
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
        <div className="receipt-section">
          <h3>My judgment</h3>
          <p>{humanChange}</p>
        </div>
        <div className="receipt-section draft-receipt">
          <h3>My draft</h3>
          <pre>{editedDraft}</pre>
        </div>
        <p className="receipt-disclaimer">
          This is a task-specific observation, not a permanent tool ranking.
        </p>
      </div>
      <div className="receipt-actions">
        <AppButton
          onClick={() => notify("Draft copied.", editedDraft)}
          icon={<CopySimple weight="bold" />}
        >
          Copy my draft
        </AppButton>
        <AppButton
          kind="secondary"
          onClick={downloadReceipt}
          icon={<DownloadSimple weight="bold" />}
        >
          Download receipt
        </AppButton>
        <AppButton
          kind="secondary"
          onClick={() => window.print()}
          icon={<Printer weight="bold" />}
        >
          Print receipt
        </AppButton>
        {guest ? <div>{confirmRestart ? <><p>This clears the draft open on this page. Sign in to save it first if you want to keep it in your binder.</p><AppButton kind="secondary" onClick={()=>setConfirmRestart(false)}>Keep this draft open</AppButton><AppButton kind="ghost" onClick={startUnsaved}>Clear this draft and start another</AppButton></> : <AppButton kind="ghost" onClick={()=>setConfirmRestart(true)}>Try another task</AppButton>}</div> : <AppButton
          kind="ghost"
          onClick={restart}
          icon={<ArrowCounterClockwise weight="bold" />}
        >
          Save and try another task
        </AppButton>}
      </div>
    </section>
  );
}

export function App() {
  const query = new URLSearchParams(location.search);
  const requested = query.get('version');
  const exercise = query.get('exercise');
  const validExercise = exercise === null || exercise === exerciseSchema.exerciseId || exercise.startsWith(exerciseSchema.exerciseId + ':') && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(exercise.slice(exerciseSchema.exerciseId.length + 1));
  if (!validExercise || requested !== null && requested !== exerciseSchema.exerciseVersion) return <main className="app-shell"><h1>This saved edition cannot be opened here.</h1><p>Your saved work has not been changed. Return to your binder to choose an available exercise.</p><a className="button button-primary" href="/laidies-card.html#episodeBinderVessel">Return to my Episode Binder</a></main>;
  return <ExerciseApp />;
}

function ExerciseApp() {
  const [step, setStep] = useState("task");
  const [completedSteps, setCompletedSteps] = useState([]);
  const [task, setTask] = useState("");
  const [journeyMode, setJourneyMode] = useState(null);
  const [runs, setRuns] = useState(makeInitialRuns);
  const [activeProvider, setActiveProvider] = useState("chatgpt");
  const [chosenProvider, setChosenProvider] = useState("chatgpt");
  const [editedDraft, setEditedDraft] = useState("");
  const [humanChange, setHumanChange] = useState("");
  const [toast, setToast] = useState("");
  const toastTimer = useRef();

  const goTo = (nextStep) => {
    setCompletedSteps((current) =>
      current.includes(step) ? current : [...current, step],
    );
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const notify = async (message, text = task) => {
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        copyFallback(text);
      }
    }
    window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(""), 2600);
  };

  const restart = () => {
    setStep("task");
    setCompletedSteps([]);
    setTask("");
    setJourneyMode(null);
    setRuns(makeInitialRuns());
    setActiveProvider("chatgpt");
    setChosenProvider("chatgpt");
    setEditedDraft("");
    setHumanChange("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const binder=useEpisodeBinder({step,completedSteps,task,journeyMode,runs,activeProvider,chosenProvider,editedDraft,humanChange},(saved)=>{
    setStep(saved.step);setCompletedSteps(saved.completedSteps);setTask(saved.task);
    setJourneyMode(saved.journeyMode);setRuns(saved.runs);setActiveProvider(saved.activeProvider);
    setChosenProvider(saved.chosenProvider);setEditedDraft(saved.editedDraft);setHumanChange(saved.humanChange);
  },restart);

  return (
    <div className="app-shell">
      <Header task={task} journeyMode={journeyMode} />
      <aside className="binder-save-bar" aria-label="Your episode binder">
        <div>
          <strong>Your episode binder · My Closet</strong>
          <p>Save your task, pasted drafts, ratings, notes, edits and progress privately to your account.</p>
          <p role="status">{binder.message}{binder.phase==='ready'&&binder.dirty?' Current changes are not saved yet.':''}</p>
        </div>
        <div className="binder-save-actions">
          {binder.phase==='guest'?<>
            <a className="button button-primary" href="/laidies-card.html" target="_blank" rel="noreferrer">Sign in to save</a>
            <button className="button button-secondary" type="button" onClick={binder.checkSignIn}>Check sign-in</button>
          </>:<button className="button button-primary" type="button" onClick={binder.save} disabled={!task.trim()||['loading','saving','unavailable','conflict'].includes(binder.phase)}>{binder.phase==='saving'?'Saving…':binder.phase==='error'?'Retry save':'Save to My Closet'}</button>}
          {binder.hasSaved&&<button className="button button-secondary" type="button" onClick={binder.reopen} disabled={binder.phase==='saving'}>Open saved copy</button>}
          {binder.canUndo&&<button className="button button-secondary" type="button" onClick={binder.undoRestore}>Return to my previous draft</button>}
        </div>
      </aside>
      <ProgressRail
        step={step}
        setStep={setStep}
        completedSteps={completedSteps}
      />
      {step === "task" && (
        <TaskStage
          task={task}
          setTask={setTask}
          startGuided={() => {
            const guidedRuns = makeInitialRuns();
            providers.forEach((provider) => {
              guidedRuns[provider.id].answer = provider.guidedAnswer;
            });
            setJourneyMode("guided");
            setTask(SAMPLE_TASK);
            setRuns(guidedRuns);
            setCompletedSteps(["task", "answers"]);
            setStep("compare");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          startLive={() => {
            setJourneyMode("live");
            notify(
              "Task copied. Open each tool, paste it, then bring the answer back.",
              task,
            );
            goTo("answers");
          }}
        />
      )}
      {step === "answers" && (
        <AnswersStage
          task={task}
          runs={runs}
          setRuns={setRuns}
          next={() => {
            setActiveProvider(providers.find((provider) => runs[provider.id].answer.trim()).id);
            goTo("compare");
          }}
          notify={() => notify("Task copied. Paste the exact same words in each tool.")}
        />
      )}
      {step === "compare" && (
        <CompareStage
          task={task}
          runs={runs}
          setRuns={setRuns}
          activeProvider={activeProvider}
          setActiveProvider={setActiveProvider}
          journeyMode={journeyMode}
          next={() => {
            setChosenProvider(activeProvider);
            setEditedDraft(runs[activeProvider].answer);
            goTo("pick");
          }}
        />
      )}
      {step === "pick" && (
        <PickStage
          runs={runs}
          chosenProvider={chosenProvider}
          setChosenProvider={setChosenProvider}
          editedDraft={editedDraft}
          setEditedDraft={setEditedDraft}
          humanChange={humanChange}
          setHumanChange={setHumanChange}
          next={() => goTo("receipt")}
        />
      )}
      {step === "receipt" && (
        <ReceiptStage
          task={task}
          runs={runs}
          journeyMode={journeyMode}
          chosenProvider={chosenProvider}
          editedDraft={editedDraft}
          humanChange={humanChange}
          notify={notify}
          restart={binder.startAnother}
          guest={binder.phase === "guest" || binder.phase === "unavailable"}
          startUnsaved={binder.startUnsaved}
        />
      )}
      <div className={`toast ${toast ? "is-visible" : ""}`} role="status">
        <CheckCircle weight="fill" aria-hidden="true" />
        {toast}
      </div>
    </div>
  );
}
