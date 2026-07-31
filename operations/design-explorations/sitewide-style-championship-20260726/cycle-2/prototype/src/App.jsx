import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BookmarkSimple,
  Check,
  MagnifyingGlass,
  Sparkle,
  X,
} from "@phosphor-icons/react";

const DIRECTIONS = {
  a: {
    code: "A",
    name: "One graphic-novel world",
    short: "Ink carries place, people and operation.",
  },
  b: {
    code: "B",
    name: "Deliberate dual system",
    short: "Painterly town. Comic episodes.",
  },
  c: {
    code: "C",
    name: "Functional hybrid",
    short: "Atmosphere for place. Ink for action.",
  },
};

const BOOKS = [
  {
    id: "vocab",
    collection: "101s",
    kicker: "LIBRAiRY 101",
    title: "Vocab",
    subtitle: "The words behind the work",
    status: "available",
    color: "blue",
  },
  {
    id: "concepts",
    collection: "101s",
    kicker: "LIBRAiRY 101",
    title: "Concepts",
    subtitle: "How the machinery fits",
    status: "available",
    color: "berry",
  },
  {
    id: "briefing",
    collection: "101s",
    kicker: "LIBRAiRY 101",
    title: "Briefing",
    subtitle: "Give AI the right job",
    status: "hold",
    color: "plum",
  },
  {
    id: "who",
    collection: "tools",
    kicker: "FIELD GUIDE",
    title: "Who’s Who",
    subtitle: "Products, companies, models",
    status: "preview",
    color: "ink",
  },
  {
    id: "chatgpt",
    collection: "tools",
    kicker: "TOOL GUIDE",
    title: "ChatGPT",
    subtitle: "What it does—and doesn’t",
    status: "preview",
    color: "teal",
  },
  {
    id: "claude",
    collection: "tools",
    kicker: "TOOL GUIDE",
    title: "Claude",
    subtitle: "A careful working guide",
    status: "hold",
    color: "violet",
  },
  {
    id: "straight",
    collection: "reference",
    kicker: "REFERENCE",
    title: "Straight Answers",
    subtitle: "Plain-English AI answers",
    status: "preview",
    color: "gold",
  },
  {
    id: "check",
    collection: "reference",
    kicker: "RULEBOOK",
    title: "Check AI’s Work",
    subtitle: "A verification field guide",
    status: "available",
    color: "cyan",
  },
  {
    id: "privacy",
    collection: "reference",
    kicker: "REFERENCE",
    title: "What Not to Paste",
    subtitle: "Privacy before prompting",
    status: "hold",
    color: "coral",
  },
];

const COLLECTIONS = [
  ["all", "All shelves"],
  ["101s", "The 101s"],
  ["tools", "The tools"],
  ["reference", "Reference"],
];

const READER_CONTENT = {
  vocab: {
    eyebrow: "LIBRAiRY 101 · Vocab",
    section: "THE USEFUL DISTINCTION",
    title: "A model is not the app around it.",
    deck:
      "The model is the trained system producing the response. The product wraps it in an interface, tools, memory, permissions and business rules.",
    leftLabel: "MODEL",
    leftText: "The engine doing the inference.",
    rightLabel: "PRODUCT",
    rightText: "The experience deciding how you reach and use it.",
    body:
      "That is why two products can use related models yet feel completely different—and why a familiar product name does not prove which exact model handled a particular answer.",
    limit:
      "The model is not a literal engine sitting inside one fixed car. Providers can route requests and change defaults.",
  },
  concepts: {
    eyebrow: "LIBRAiRY 101 · Concepts",
    section: "HOW THE MACHINERY FITS",
    title: "A useful system is more than its model.",
    deck:
      "A working AI product combines a model with instructions, tools, data access, safeguards and a user interface.",
    leftLabel: "CAPABILITY",
    leftText: "What the underlying components can do.",
    rightLabel: "EXPERIENCE",
    rightText: "How the product exposes, limits and explains that capability.",
    body:
      "Separate the components before you compare products. A strong interface can make a limited system easier to use, while a powerful model can still be poorly governed.",
    limit:
      "This map is conceptual, not a promise that every provider uses the same architecture or exposes every component.",
  },
  check: {
    eyebrow: "RULEBOOK · Check AI’s Work",
    section: "THE VERIFICATION LOOP",
    title: "A fluent answer is still a claim to check.",
    deck:
      "Confirm consequential claims against current primary sources, inspect dates and scope, and keep evidence separate from inference.",
    leftLabel: "CLAIM",
    leftText: "The exact statement the answer asks you to trust.",
    rightLabel: "EVIDENCE",
    rightText: "A source that directly supports that statement now.",
    body:
      "Start with the facts that would change your decision if they were wrong. Do not confuse confident language, a citation-shaped link or repeated summaries with verification.",
    limit:
      "Verification reduces error; it cannot guarantee that a source is complete, unbiased or still applicable to your exact situation.",
  },
};

function getInitialDirection() {
  const value = new URLSearchParams(window.location.search).get("direction");
  return DIRECTIONS[value] ? value : "a";
}

function BookCard({ book, saved, onOpen, onSave }) {
  const available = book.status === "available";
  return (
    <article className={`book-card book-${book.color}`} data-status={book.status}>
      <button
        className="book-cover"
        type="button"
        disabled={!available}
        onClick={() => available && onOpen(book)}
        aria-label={
          available
            ? `Open ${book.title}`
            : `${book.title}, ${book.status === "hold" ? "on hold" : "preview"}`
        }
      >
        <span className="book-kicker">{book.kicker}</span>
        <span className="book-title">{book.title}</span>
        <span className="book-subtitle">{book.subtitle}</span>
        <span className="book-status">
          {available ? "Open now" : book.status === "hold" ? "On hold" : "Preview"}
        </span>
      </button>
      {available && (
        <button
          className={`puffy-save ${saved ? "is-saved" : ""}`}
          type="button"
          onClick={() => onSave(book)}
          aria-pressed={saved}
          aria-label={`${saved ? "Remove" : "Add"} Puffy save for ${book.title}`}
        >
          <img src="/assets/puffy-butterfly-holo.png" alt="" />
          <span>{saved ? "Saved" : "Puffy"}</span>
        </button>
      )}
    </article>
  );
}

function useModalBehavior(onClose) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    const background = [
      ...document.querySelectorAll(
        ".site-header, .capability-rail, .library-room, .continuation",
      ),
    ];
    background.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const focusable = [
          ...dialogRef.current.querySelectorAll(
            'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      background.forEach((element) => {
        element.inert = false;
        element.removeAttribute("aria-hidden");
      });
      opener?.focus();
    };
  }, [onClose]);

  return { dialogRef, closeRef };
}

function Reader({ book, saved, onSave, onClose }) {
  const { dialogRef, closeRef } = useModalBehavior(onClose);
  const content = READER_CONTENT[book.id];

  return (
    <div className="reader-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={dialogRef}
        className="reader"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reader-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="reader-toolbar">
          <span className="eyebrow">{content.eyebrow}</span>
          <button ref={closeRef} className="icon-button" type="button" onClick={onClose}>
            <X aria-hidden="true" />
            <span>Close</span>
          </button>
        </div>
        <div className="reader-body">
          <p className="reader-section">{content.section}</p>
          <h2 id="reader-title">{content.title}</h2>
          <p className="reader-deck">{content.deck}</p>
          <div className="definition-pair">
            <div>
              <span>{content.leftLabel}</span>
              <strong>{content.leftText}</strong>
            </div>
            <div>
              <span>{content.rightLabel}</span>
              <strong>{content.rightText}</strong>
            </div>
          </div>
          <p>{content.body}</p>
          <aside className="reader-note">
            <strong>Where this explanation stops:</strong> {content.limit}
          </aside>
        </div>
        <div className="reader-footer">
          <button className="text-action" type="button" onClick={() => onSave(book)}>
            <BookmarkSimple weight={saved ? "fill" : "regular"} aria-hidden="true" />
            {saved ? "Saved for this prototype" : "Puffy-save this exact section"}
          </button>
          <a href="/sunnyvaile-high.html">
            Continue at SUNNYVAiLE High <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}

function Transition({ onClose }) {
  const { dialogRef, closeRef } = useModalBehavior(onClose);

  return (
    <section
      ref={dialogRef}
      className="transition-card"
      role="dialog"
      aria-modal="true"
      aria-label="Episode to Library transition evidence"
    >
      <button
        ref={closeRef}
        className="icon-button transition-close"
        type="button"
        onClick={onClose}
      >
        <X aria-hidden="true" />
        <span>Close</span>
      </button>
      <div className="transition-episode">
        <span>EPISODE 04</span>
        <strong>The women who built the machinery</strong>
      </div>
      <div className="transition-bridge" aria-hidden="true">
        <ArrowRight weight="bold" />
      </div>
      <div className="transition-site">
        <span>KEEP THE CONCEPT</span>
        <strong>Open Vocab in the LIBRAiRY</strong>
      </div>
    </section>
  );
}

export function App() {
  const query = new URLSearchParams(window.location.search);
  const forceAssetFailure = query.get("assetfail") === "1";
  const reducedMotionFixture = query.get("motion") === "reduced";
  const blindReview = query.get("blind") === "1";
  const boundaryReview = query.get("boundaries") === "1";
  const [direction, setDirection] = useState(getInitialDirection);
  const [collection, setCollection] = useState("all");
  const [savedIds, setSavedIds] = useState(["check"]);
  const [readerBook, setReaderBook] = useState(null);
  const [question, setQuestion] = useState("What is the difference between a model and an app?");
  const [answerVisible, setAnswerVisible] = useState(false);
  const [transitionVisible, setTransitionVisible] = useState(
    query.get("transition") === "1",
  );
  const [artFailed, setArtFailed] = useState(
    query.get("failure") === "1",
  );

  useEffect(() => {
    document.documentElement.dataset.direction = direction;
    const url = new URL(window.location);
    url.searchParams.set("direction", direction);
    window.history.replaceState({}, "", url);
  }, [direction]);

  useEffect(() => {
    const roomAsset = new Image();
    roomAsset.onerror = () => setArtFailed(true);
    roomAsset.src = forceAssetFailure
      ? "/assets/__intentional-missing-room-art.png"
      : direction === "a"
        ? "/assets/library-room-comic-desktop.png"
        : "/assets/library-room-painterly-desktop.png";
  }, [direction, forceAssetFailure]);

  const visibleBooks = useMemo(
    () => BOOKS.filter((book) => collection === "all" || book.collection === collection),
    [collection],
  );

  const toggleSave = (book) => {
    setSavedIds((ids) =>
      ids.includes(book.id) ? ids.filter((id) => id !== book.id) : [...ids, book.id],
    );
  };
  const closeReader = useCallback(() => setReaderBook(null), []);
  const closeTransition = useCallback(() => setTransitionVisible(false), []);

  return (
    <main
      className={[
        "championship",
        `direction-${direction}`,
        reducedMotionFixture ? "reduced-motion" : "",
        blindReview ? "blind-review" : "",
        boundaryReview ? "boundary-review" : "",
      ].join(" ")}
      data-motion={reducedMotionFixture ? "reduced" : "system"}
    >
      <header className="site-header">
        <div className="brand-lockup">
          <span className="town-mark">SUNNYVAiLE CIVIC SQUARE</span>
          <h1>LIBRA<span>i</span>RY</h1>
          <p>Come in with a question. Leave with the one useful answer.</p>
        </div>
        <div className="direction-switcher" aria-label="Visual direction">
          {Object.entries(DIRECTIONS).map(([key, item]) => (
            <button
              type="button"
              key={key}
              className={direction === key ? "active" : ""}
              onClick={() => setDirection(key)}
              aria-pressed={direction === key}
            >
              <span>{item.code}</span>
              <strong>{item.name}</strong>
            </button>
          ))}
        </div>
        <div className="direction-readout" aria-live="polite">
          <span>CONTROLLED DIRECTION {DIRECTIONS[direction].code}</span>
          <strong>{DIRECTIONS[direction].short}</strong>
        </div>
      </header>

      <nav className="capability-rail" aria-label="Library capabilities">
        <div className="collection-tabs">
          {COLLECTIONS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={collection === key ? "active" : ""}
              onClick={() => setCollection(key)}
              aria-pressed={collection === key}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="rail-actions">
          <button type="button" onClick={() => setTransitionVisible(true)}>
            <Sparkle aria-hidden="true" /> Episode handoff
          </button>
          <button type="button" onClick={() => setArtFailed((value) => !value)}>
            {artFailed ? "Restore room art" : "Test art fallback"}
          </button>
          <a href="#continue">
            My saved finds <span>{savedIds.length}</span>
          </a>
        </div>
      </nav>

      <section className={`library-room ${artFailed ? "art-failed" : ""}`} aria-label="Library room">
        <div className="art-fallback" aria-live="polite">
          <BookOpen aria-hidden="true" />
          <strong>Room artwork unavailable.</strong>
          <span>The shelves, statuses and reference desk still work.</span>
        </div>

        <div
          className="shelf-interface"
          aria-label="Library shelves"
          data-boundary="OPERATED · SHELF AND BOOK HIT AREAS"
        >
          <div className="shelf-labels" aria-hidden="true">
            <span>THE 101s</span>
            <span>THE TOOLS</span>
            <span>REFERENCE</span>
          </div>
          <div className="book-grid">
            {visibleBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                saved={savedIds.includes(book.id)}
                onOpen={setReaderBook}
                onSave={toggleSave}
              />
            ))}
          </div>
          {visibleBooks.length === 0 && (
            <p className="empty-shelf">No books match this shelf yet.</p>
          )}
        </div>

        <aside
          className="jeeves-desk"
          data-boundary="OPERATED · REFERENCE DESK"
        >
          <div className="jeeves-heading">
            <img
              className="jeeves-comic"
              src={
                forceAssetFailure
                  ? "/assets/__intentional-missing-miss-jeeves.png"
                  : "/assets/miss-jeeves-comic-v2.png"
              }
              alt="Miss Jeeves at the reference desk"
              onError={() => setArtFailed(true)}
            />
            <img
              className="jeeves-painterly"
              src={
                forceAssetFailure
                  ? "/assets/__intentional-missing-miss-jeeves.png"
                  : "/assets/miss-jeeves-painterly.png"
              }
              alt="Miss Jeeves at the reference desk"
              onError={() => setArtFailed(true)}
            />
            <div>
              <span>REFERENCE DESK</span>
              <h2>Ask Miss Jeeves</h2>
              <p>Start with your question. She’ll answer before she routes.</p>
            </div>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setAnswerVisible(true);
            }}
          >
            <label htmlFor="question">What are you trying to understand?</label>
            <div className="search-field">
              <input
                id="question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
              />
              <button type="submit" aria-label="Ask Miss Jeeves">
                <MagnifyingGlass aria-hidden="true" />
              </button>
            </div>
          </form>
          {answerVisible && (
            <div className="jeeves-answer" aria-live="polite">
              <span><Check weight="bold" aria-hidden="true" /> Direct answer</span>
              <p>
                The model produces the response. The app decides what tools,
                memory and rules surround it.
              </p>
              <button type="button" onClick={() => setReaderBook(BOOKS[0])}>
                Open the Vocab section <ArrowRight aria-hidden="true" />
              </button>
            </div>
          )}
        </aside>
      </section>

      <section
        className="continuation"
        id="continue"
        data-boundary="OPERATED · CONTINUATION SURFACES"
      >
        <div>
          <span>YOU FOUND THE DEFINITION</span>
          <h2>Now use it somewhere real.</h2>
        </div>
        <a href="/sunnyvaile-high.html">
          Practise at SUNNYVAiLE High <ArrowRight aria-hidden="true" />
        </a>
        <a href="/episodes.html">
          See it in Episode 04 <ArrowRight aria-hidden="true" />
        </a>
        <a href="/newsstand.html">
          Check current evidence at The NewsStand <ArrowRight aria-hidden="true" />
        </a>
      </section>

      {readerBook && (
        <Reader
          book={readerBook}
          saved={savedIds.includes(readerBook.id)}
          onSave={toggleSave}
          onClose={closeReader}
        />
      )}
      {transitionVisible && <Transition onClose={closeTransition} />}
    </main>
  );
}
