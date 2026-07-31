import { useEffect, useMemo, useRef, useState } from "react";

const stateCopy = {
  first: {
    label: "First visit",
    title: "Start at the Visitor’s Centre.",
    copy: "Take a 60–90-second orientation, then choose the learning format that helps the idea click. Nothing here requires an account.",
    action: "See how LAiDIES works",
    href: "#visitors-centre",
  },
  returning: {
    label: "Returning · no Card",
    title: "Welcome back. Pick up with the latest admitted lesson.",
    copy: "This device remembers only that you have visited. It does not claim a saved episode, identity, progress, or Resident Card.",
    action: "See the episode module",
    href: "#current-episode",
  },
  resident: {
    label: "Resident Card",
    title: "Resume only what your Card can prove.",
    copy: "Your Card can offer a deliberate resume cue after verification. The same public episodes, tools, and town routes stay open without it.",
    action: "Check Card status",
    href: "#resident-resume",
  },
};

function track(name, properties = {}) {
  window.prototypeEvents = window.prototypeEvents || [];
  window.prototypeEvents.push({ name, properties, at: new Date().toISOString() });
  window.dispatchEvent(new CustomEvent("laidies:prototype-event", {
    detail: { name, properties },
  }));
}

function StatePreview({ state, setState }) {
  return (
    <aside className="preview-bar" aria-label="Prototype visitor-state controls">
      <strong>Preview state</strong>
      {Object.entries(stateCopy).map(([key, item]) => (
        <button
          key={key}
          type="button"
          aria-pressed={state === key}
          onClick={() => setState(key)}
        >
          {item.label}
        </button>
      ))}
    </aside>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function closeOnEscape(event) {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="topbar">
      <a className="logo" href="#top" aria-label="LAiDIES home">LA<span>i</span>DIES</a>
      <button
        ref={menuButton}
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="entry-nav"
        onClick={() => setOpen(!open)}
      >
        Menu
      </button>
      <nav id="entry-nav" className={open ? "nav open" : "nav"} aria-label="Homepage">
        <a href="#visitors-centre" onClick={() => setOpen(false)}>How it works</a>
        <a href="#current-episode" onClick={() => setOpen(false)}>Current episode</a>
        <a href="#town" onClick={() => setOpen(false)}>Explore SUNNYVAiLE</a>
        <a href="#resident-resume" onClick={() => setOpen(false)}>Resident Card</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <img src="/assets/main-street-dusk.webp" alt="" />
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="eyebrow">LAiDIES · connected to the Rewind Era</p>
        <h1 id="hero-title">AI fluency, taught through the pop culture you never forgot.</h1>
        <p className="hero-lede">
          <strong>LAiDIES is a story-led AI learning world for women.</strong>{" "}
          Episodes explain the idea. SUNNYVAiLE helps you practise it.
        </p>
        <p className="rewind-explainer">
          The Rewind Era—1990 to 2010—is familiar cultural language. LAiDIES
          uses the stories, objects, and memories you already know to make new
          AI concepts easier to understand, remember, and reuse.
        </p>
        <p className="learning-model">
          Watch the story <span>→</span> Visit the town <span>→</span> Try it
          yourself <span>→</span> Keep what helps
        </p>
        <a
          className="primary-button"
          href="#visitors-centre"
          onClick={() => track("entry_primary_start_selected", { route: "visitors-centre" })}
        >
          Start at the Visitor’s Centre
        </a>
        <p className="hero-note">Recommended orientation · about 60–90 seconds · Resident Card optional</p>
      </div>
    </section>
  );
}

function LegacyNotice({ legacy }) {
  if (!legacy) return null;
  return (
    <div className="legacy-notice" role="status">
      <strong>You’re in the right place.</strong> wearelaidies.com now redirects
      to laidies.ai. Same LAiDIES, new address.
    </div>
  );
}

function StateArrival({ state }) {
  const item = stateCopy[state];
  return (
    <section
      className={`state-arrival state-${state}`}
      id={state === "resident" ? "resident-resume" : undefined}
      aria-labelledby="arrival-title"
    >
      <p className="section-label">{item.label}</p>
      <div>
        <h2 id="arrival-title">{item.title}</h2>
        <p>{item.copy}</p>
      </div>
      <a
        className="text-action"
        href={item.href}
        onClick={() => track(
          state === "resident" ? "entry_resume_selected" : "entry_state_action_selected",
          { visitorState: state },
        )}
      >
        {item.action}
      </a>
    </section>
  );
}

function VisitorCentreModule() {
  return (
    <section className="welcome-module" id="visitors-centre" aria-labelledby="welcome-title">
      <div className="welcome-copy">
        <p className="section-label">Your first 90 seconds</p>
        <h2 id="welcome-title">See how the learning world works. Then choose your route.</h2>
        <p>
          The Visitor’s Centre introduces LAiDIES, SUNNYVAiLE, and the ways you
          can learn: episodes, classes, the LIBRAiRY, current explanations,
          practical tools, activities, games, and building experiences.
        </p>
        <ol>
          <li><strong>Follow the idea</strong><span>Use a story, class, current explanation, or reference.</span></li>
          <li><strong>Try it yourself</strong><span>Practise with a tool, activity, game, or building experience.</span></li>
          <li><strong>Keep what helps</strong><span>Return to useful routes; a Resident Card is optional.</span></li>
        </ol>
        <a
          className="secondary-button"
          href="/visitors-centre.html"
          onClick={() => track("entry_intro_started", { source: "homepage" })}
        >
          Continue to the Visitor’s Centre
        </a>
        <p className="module-limit">Receiving experience remains subject to the Visitor’s Centre owner’s exact acceptance.</p>
      </div>
      <figure className="welcome-visual">
        <img src="/assets/main-street-dusk.webp" alt="SUNNYVAiLE MAiN Street at luminous dusk" />
        <figcaption><strong>LAiDIES in one minute</strong><span>Story → lesson → practice → optional town</span></figcaption>
      </figure>
    </section>
  );
}

function CurrentEpisode() {
  return (
    <section className="current-module" id="current-episode" aria-labelledby="current-title">
      <div className="current-heading">
        <div>
          <p className="section-label">Separate current-episode module</p>
          <h2 id="current-title">Continue the story</h2>
        </div>
        <p className="status-pill">Previously published fallback</p>
      </div>
      <div className="episode-card">
        <img src="/assets/pc-chick-flicks.webp" alt="The Chick Flicks video-rental postcard" />
        <div>
          <p className="episode-number">Episode 04</p>
          <h3>The Founding Mothers</h3>
          <p>
            The current release record is not yet owner-admitted, so this mock
            shows the complete, truthful fallback instead of mixing fresh and
            hard-coded episode fields.
          </p>
          <div className="episode-actions">
            <a href="/issues/issue-04.html">Read the episode</a>
            <a href="/watch.html?ep=04">Watch or listen</a>
          </div>
        </div>
      </div>
      <p className="record-note">
        Later integration swaps one checksum-bound record—title, summary,
        image, links, date, song, card pack, authority, and fallback—at once.
      </p>
    </section>
  );
}

function TownNextSteps() {
  return (
    <section className="town-next" id="town" aria-labelledby="town-title">
      <img src="/assets/town-map.webp" alt="Map of SUNNYVAiLE and its districts" />
      <div>
        <p className="section-label">After the first episode</p>
        <h2 id="town-title">Choose the format that helps the idea click.</h2>
        <p>
          Watch a story, take a class, look something up, follow a current
          explanation, improve a prompt, try an activity, or explore a
          building. SUNNYVAiLE turns those formats into places you can use.
        </p>
        <div className="small-links">
          <a href="/library.html">Look up one answer</a>
          <a href="/games/fairy-godmother.html">Improve a prompt</a>
          <a href="/visitors-centre.html">Explore the directory</a>
        </div>
      </div>
    </section>
  );
}

export function App() {
  const query = useMemo(() => new URLSearchParams(window.location.search), []);
  const initial = query.get("state");
  const [state, setState] = useState(stateCopy[initial] ? initial : "first");
  const legacy = query.get("legacy") === "1";
  const review = query.get("review") === "1";

  useEffect(() => {
    track("entry_viewed", {
      visitorState: state,
      legacyRedirect: legacy,
      viewport: window.innerWidth <= 430 ? "compact" : "wide",
    });
  }, [state, legacy]);

  return (
    <>
      {review ? <StatePreview state={state} setState={setState} /> : null}
      <a className="skip-link" href="#main">Skip to main content</a>
      <LegacyNotice legacy={legacy} />
      <Header />
      <main id="main">
        <Hero />
        <StateArrival state={state} />
        {state === "first" ? (
          <>
            <VisitorCentreModule />
            <CurrentEpisode />
          </>
        ) : (
          <>
            <CurrentEpisode />
            <VisitorCentreModule />
          </>
        )}
        <TownNextSteps />
      </main>
      <footer>
        <strong>LAiDIES now lives at laidies.ai</strong>
        <span>No account required. Resident Card optional.</span>
      </footer>
    </>
  );
}
