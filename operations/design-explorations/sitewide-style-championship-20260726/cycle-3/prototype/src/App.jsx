import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookmarkSimple,
  BookOpen,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react";

const DIRECTIONS = {
  a: {
    code: "A",
    name: "One graphic-novel world",
    rule: "Place, people and every operated object share one adult-comic register.",
  },
  b: {
    code: "B",
    name: "Deliberate dual system",
    rule: "The town stays painterly; episode media crosses a named comic threshold.",
  },
  c: {
    code: "C",
    name: "Controlled functional hybrid",
    rule: "Painterly place; adult-comic ink begins only on true operated objects.",
  },
};

const COLLECTIONS = [
  ["all", "All shelves"],
  ["101s", "The 101s"],
  ["tools", "The tools"],
  ["reference", "Reference"],
];

const BOOKS = [
  ["vocab", "101s", "LIBRAiRY 101", "Vocab", "The words behind the work", "available", "blue"],
  ["concepts", "101s", "LIBRAiRY 101", "Concepts", "How the machinery fits", "available", "berry"],
  ["briefing", "101s", "LIBRAiRY 101", "Briefing", "Give AI the right job", "hold", "plum"],
  ["who", "tools", "FIELD GUIDE", "Who’s Who", "Products, companies, models", "preview", "ink"],
  ["chatgpt", "tools", "TOOL GUIDE", "ChatGPT", "What it does—and doesn’t", "preview", "teal"],
  ["claude", "tools", "TOOL GUIDE", "Claude", "A careful working guide", "hold", "violet"],
  ["straight", "reference", "REFERENCE", "Straight Answers", "Plain-English AI answers", "preview", "gold"],
  ["check", "reference", "RULEBOOK", "Check AI’s Work", "A verification field guide", "available", "cyan"],
  ["privacy", "reference", "REFERENCE", "What Not to Paste", "Privacy before prompting", "hold", "coral"],
].map(([id, collection, kicker, title, subtitle, status, color]) => ({
  id,
  collection,
  kicker,
  title,
  subtitle,
  status,
  color,
}));

const READER = {
  vocab: {
    eyebrow: "LIBRAiRY 101 · Vocab",
    title: "A model is not the app around it.",
    body: "The model is the trained system producing the response. The product wraps it in an interface, tools, memory, permissions and business rules.",
  },
  concepts: {
    eyebrow: "LIBRAiRY 101 · Concepts",
    title: "A useful system is more than its model.",
    body: "A working AI product combines a model with instructions, tools, data access, safeguards and a user interface.",
  },
  check: {
    eyebrow: "RULEBOOK · Check AI’s Work",
    title: "A fluent answer is still a claim to check.",
    body: "Confirm consequential claims against current primary sources, inspect dates and scope, and keep evidence separate from inference.",
  },
};

function initialDirection() {
  const value = new URLSearchParams(window.location.search).get("direction");
  return DIRECTIONS[value] ? value : "a";
}

export function App() {
  const captureMode = new URLSearchParams(window.location.search).get("capture") === "1";
  const [direction, setDirection] = useState(initialDirection);
  const [collection, setCollection] = useState("all");
  const [saved, setSaved] = useState(new Set());
  const [reader, setReader] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const books = useMemo(
    () =>
      BOOKS.map((book) => ({
        ...book,
        dimmed: collection !== "all" && collection !== book.collection,
      })),
    [collection],
  );

  const chooseDirection = (next) => {
    setDirection(next);
    const url = new URL(window.location.href);
    url.searchParams.set("direction", next);
    window.history.replaceState({}, "", url);
  };

  const toggleSaved = (id) => {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const askJeeves = (event) => {
    event.preventDefault();
    if (!question.trim()) return;
    setAnswer(
      "Start with Check AI’s Work. It gives you the short verification loop, then links into Vocab when a term needs unpacking.",
    );
  };

  return (
    <main className={`championship direction-${direction}${captureMode ? " capture-mode" : ""}`}>
      {!captureMode && <aside className="review-rail" aria-label="Championship direction selector">
        <span className="review-label">SVC-01 · evaluator control</span>
        <div className="direction-buttons">
          {Object.entries(DIRECTIONS).map(([key, item]) => (
            <button
              key={key}
              type="button"
              className={direction === key ? "active" : ""}
              onClick={() => chooseDirection(key)}
              aria-pressed={direction === key}
            >
              <strong>{item.code}</strong>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        <p><strong>{DIRECTIONS[direction].code}:</strong> {DIRECTIONS[direction].rule}</p>
      </aside>}

      <section className="library-room" aria-labelledby="library-title">
        <header className="wall-plaque">
          <span>SUNNYVAiLE · THE TOWN THAT RUNS ON AI</span>
          <h1 id="library-title">The LAiDIES Librairy</h1>
          <p>Come in curious. Leave knowing what to try—and what to check.</p>
        </header>

        <nav className="shelf-tabs" aria-label="Choose a physical shelf">
          {COLLECTIONS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={collection === id ? "active" : ""}
              onClick={() => setCollection(id)}
              aria-pressed={collection === id}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="physical-shelves" aria-label="Library books">
          {books.map((book) => {
            const available = book.status === "available";
            const isSaved = saved.has(book.id);
            return (
              <article
                key={book.id}
                className={`book-object book-${book.color}${book.dimmed ? " is-dimmed" : ""}`}
                data-status={book.status}
              >
                <button
                  className="book-cover"
                  type="button"
                  disabled={!available}
                  onClick={() => available && setReader(book)}
                  aria-label={
                    available
                      ? `Open ${book.title}`
                      : `${book.title}: ${book.status === "hold" ? "on hold" : "preview"}`
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
                    className={`puffy-save${isSaved ? " is-saved" : ""}`}
                    type="button"
                    onClick={() => toggleSaved(book.id)}
                    aria-label={`${isSaved ? "Remove" : "Add"} Puffy save for ${book.title}`}
                    aria-pressed={isSaved}
                  >
                    <img src="/assets/puffy-butterfly-holo.png" alt="" />
                    <BookmarkSimple weight={isSaved ? "fill" : "bold"} />
                  </button>
                )}
              </article>
            );
          })}
        </div>

        <section className="jeeves-station" aria-labelledby="jeeves-title">
          <img
            className="jeeves-character jeeves-comic"
            src="/assets/miss-jeeves-comic.png"
            alt=""
          />
          <img
            className="jeeves-character jeeves-painterly"
            src="/assets/miss-jeeves-painterly.png"
            alt=""
          />
          <div className="counter-controls">
            <span>Reference desk</span>
            <h2 id="jeeves-title">Ask Miss Jeeves</h2>
            <form onSubmit={askJeeves}>
              <label htmlFor="jeeves-question">What do you want to understand?</label>
              <div>
                <MagnifyingGlass aria-hidden="true" />
                <input
                  id="jeeves-question"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Try: how do I check an AI answer?"
                />
                <button type="submit">Ask</button>
              </div>
            </form>
          </div>
          {answer && (
            <div className="jeeves-answer" role="status">
              <button type="button" onClick={() => setAnswer("")} aria-label="Close answer">
                <X />
              </button>
              <strong>Miss Jeeves says</strong>
              <p>{answer}</p>
              <button type="button" onClick={() => setReader(BOOKS.find((book) => book.id === "check"))}>
                Open the field guide <ArrowRight />
              </button>
            </div>
          )}
        </section>

        <nav className="room-exits" aria-label="Continue through SUNNYVAiLE">
          <a href="#episode">
            <BookOpen aria-hidden="true" />
            <span>Read an episode</span>
          </a>
          <a href="#town">
            <ArrowRight aria-hidden="true" />
            <span>Back to town</span>
          </a>
        </nav>
      </section>

      {reader && (
        <section className="reader-layer" role="dialog" aria-modal="true" aria-labelledby="reader-title">
          <article className="reader-page">
            <button className="reader-close" type="button" onClick={() => setReader(null)}>
              <X /> Close
            </button>
            <span>{READER[reader.id]?.eyebrow}</span>
            <h2 id="reader-title">{READER[reader.id]?.title}</h2>
            <p className="reader-deck">{READER[reader.id]?.body}</p>
            <div className="reader-columns">
              <p><strong>Capability</strong>What the underlying components can do.</p>
              <p><strong>Experience</strong>How the product exposes, limits and explains that capability.</p>
            </div>
            <p>That is why two products can use related models yet feel completely different—and why a familiar product name does not prove which exact model handled an answer.</p>
            <aside><strong>Limit:</strong> providers can route requests and change defaults. Treat current product claims as changing facts.</aside>
          </article>
        </section>
      )}
    </main>
  );
}
