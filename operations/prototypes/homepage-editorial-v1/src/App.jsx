import { useEffect, useMemo, useRef, useState } from "react";
import { PLATFORM_PROJECTION_BINDING } from "./generated/platform-projection-binding-v1.js";

const VISITOR_STATES = {
  first: {
    label: "First visit",
    eyebrow: "No saved state assumed",
    title: "Welcome to LAiDIES.",
    body: "Start with one useful route. The town is optional, and no account or Resident Card is required.",
    action: { label: "Start at the Welcome Wagon", href: "/start-here.html" },
  },
  returning: {
    label: "Returning · no Card",
    eyebrow: "Device-local return, no identity claim",
    title: "Welcome back.",
    body: "Return to Episode 04, published June 24, 2026. No Resident Card, newer episode, or account-backed resume is claimed.",
    action: { label: "Open Episode 04", href: "/issues/issue-04.html" },
  },
  "local-card": {
    label: "Card on this device",
    eyebrow: "Device-local Resident Card",
    title: "Your local Card can take you to your Closet.",
    body: "This preview does not claim sign-in, restoration, public membership, rewards, or cross-device continuity.",
    action: { label: "Open the local Closet", href: "/laidies-card.html" },
  },
  "verified-held": {
    label: "Verified Resident",
    eyebrow: "Account-backed state is held",
    title: "Verified Resident continuation is not available yet.",
    body: "A browser token is not enough to prove a complete Resident Card. The public entry choices remain available.",
    action: { label: "Use the public entry", href: "#entry-actions" },
  },
};

const HOMEPAGE_DESTINATION_IDS = new Set([
  "visitors-centre",
  "chick-flicks",
  "library",
  "newsstand",
  "fairy-godmother",
  "maikeover"
]);

const METHOD = [
  ["Story", "Follow the plot", "Episodes introduce one practical AI idea at a time."],
  ["Analogy", "Unlock the idea", "A useful Rewind Era reference makes the unfamiliar easier to retrieve."],
  ["Practice", "Make it click", "A Try-On or quiz turns recognition into something you can do."],
  ["Return", "Keep it useful", "Come back for the latest admitted episode, news, reference, or tool."],
];

function readParam(name, fallback) {
  const value = new URLSearchParams(window.location.search).get(name);
  return value || fallback;
}

function setParams(patch) {
  const url = new URL(window.location.href);
  Object.entries(patch).forEach(([key, value]) => {
    if (!value || value === "ok") url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  });
  window.history.replaceState({}, "", url);
}

function canonicalize(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) =>
    `${JSON.stringify(key)}:${canonicalize(value[key])}`
  ).join(",")}}`;
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(canonicalize(value));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

function failClosed(errorCode) {
  return {
    status: "failed",
    errorCode,
    evidenceCeiling: "NO_FRESH_BOUND_PLATFORM_RECEIPT",
    envelope: null,
    currentContent: {
      mode: "fail-closed",
      errorCode,
      announcement:
        "Current-content status is unavailable. Evergreen navigation remains.",
      items: []
    },
    destinations: PLATFORM_PROJECTION_BINDING.canonicalDestinations.map((item) => ({
      ...item,
      state: "unavailable",
      label: "Current status unavailable",
      summary: "Open the named route only to check its current page.",
      limitation:
        "Current readiness could not be verified. Route arrival is navigation, not completion.",
      disposition: "FAIL_CLOSED_STATUS_UNAVAILABLE",
      completionClaim: false
    }))
  };
}

async function readPlatformScenario(bundle, requestedMode) {
  if (requestedMode === "missing") return failClosed("PROJECTION_MISSING");
  const envelope = structuredClone(bundle?.envelope);
  if (requestedMode === "tampered") {
    envelope.payload.fallbackRoute = "/tampered-route.html";
  }
  if (
    bundle?.contractVersion !== PLATFORM_PROJECTION_BINDING.schemaVersion ||
    envelope?.schemaVersion !== PLATFORM_PROJECTION_BINDING.schemaVersion ||
    envelope?.recordType !== PLATFORM_PROJECTION_BINDING.recordType ||
    envelope?.payload?.projectionId !== PLATFORM_PROJECTION_BINDING.projectionId ||
    envelope?.payload?.sequence !== PLATFORM_PROJECTION_BINDING.sequence
  ) {
    return failClosed("RELEASE_BINDING_MISMATCH");
  }
  const payloadSha256 = await sha256(envelope.payload);
  if (
    payloadSha256 !== envelope.integrity?.payloadSha256 ||
    payloadSha256 !== PLATFORM_PROJECTION_BINDING.payloadSha256
  ) {
    return failClosed("PAYLOAD_HASH_MISMATCH");
  }
  const destinationIds = envelope.payload.destinations?.map((item) => item.destinationId);
  const currentSlots = envelope.payload.currentContent?.map((item) => item.slot);
  if (
    destinationIds?.length !== 17 ||
    new Set(destinationIds).size !== 17 ||
    currentSlots?.length !== 3 ||
    new Set(currentSlots).size !== 3
  ) {
    return failClosed("PROJECTION_SET_INCOMPLETE");
  }
  for (const canonical of PLATFORM_PROJECTION_BINDING.canonicalDestinations) {
    const item = envelope.payload.destinations.find(
      (destination) => destination.destinationId === canonical.destinationId
    );
    if (
      !item ||
      item.productId !== canonical.productId ||
      item.ownerId !== canonical.ownerId ||
      item.name !== canonical.name ||
      item.route !== canonical.route
    ) {
      return failClosed("DESTINATION_CANON_MISMATCH");
    }
  }
  const scenarioName = requestedMode === "stale" || requestedMode === "conflict"
    ? requestedMode
    : "fresh";
  const scenario = bundle.scenarios?.[scenarioName];
  if (!scenario?.receipt || !scenario?.currentContent) {
    return failClosed("RECEIVER_OUTPUT_MISSING");
  }
  if (scenario.receipt.mode !== "fresh") {
    return {
      ...failClosed(scenario.receipt.errorCode || "PROJECTION_REJECTED"),
      destinations: scenario.receipt.destinations,
      currentContent: scenario.currentContent,
      evidenceCeiling: bundle.evidenceCeiling
    };
  }
  const now = Date.now();
  if (
    Date.parse(envelope.payload.validUntil) <= now ||
    [...envelope.payload.destinations, ...envelope.payload.currentContent]
      .some((item) => Date.parse(item.freshUntil) <= now)
  ) {
    return failClosed("PROJECTION_STALE");
  }
  if (
    scenario.receipt.projectionId !== PLATFORM_PROJECTION_BINDING.projectionId ||
    scenario.receipt.projectionSha256 !== PLATFORM_PROJECTION_BINDING.payloadSha256 ||
    scenario.currentContent.mode !== "fresh"
  ) {
    return failClosed("RECEIVER_BINDING_MISMATCH");
  }
  return {
    status: "ready",
    errorCode: null,
    evidenceCeiling: bundle.evidenceCeiling,
    envelope,
    currentContent: scenario.currentContent,
    destinations: scenario.receipt.destinations
  };
}

function usePlatformProjection(mode) {
  const [state, setState] = useState({ status: "loading" });
  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });
    fetch("/data/readiness-current-projection-v1.json", {
      signal: controller.signal,
      headers: { accept: "application/json" }
    })
      .then((response) => {
        if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
          throw new Error(`Projection unavailable (${response.status})`);
        }
        return response.json();
      })
      .then((bundle) => readPlatformScenario(bundle, mode))
      .then(setState)
      .catch((error) => {
        if (error.name !== "AbortError") setState(failClosed("PROJECTION_FETCH_FAILED"));
      });
    return () => controller.abort();
  }, [mode]);
  return state;
}

function Logo() {
  return (
    <span className="wordmark" aria-label="LAiDIES">
      L<span className="wordmark-accent">A</span>
      <span className="wordmark-i">
        <span className="wordmark-accent">i</span>
        <span className="wordmark-dot" aria-hidden="true" />
      </span>
      DIES
    </span>
  );
}

function PrototypeControls({ visitor, onVisitor, projectionMode, onProjectionMode }) {
  return (
    <aside className="prototype-controls" aria-label="Candidate test controls">
      <div>
        <strong>Isolated candidate</strong>
        <span>No live routes · no global style decision</span>
      </div>
      <label>
        Visitor
        <select value={visitor} onChange={(event) => onVisitor(event.target.value)}>
          {Object.entries(VISITOR_STATES).map(([value, state]) => (
            <option value={value} key={value}>{state.label}</option>
          ))}
        </select>
      </label>
      <label>
        Platform projection
        <select value={projectionMode} onChange={(event) => onProjectionMode(event.target.value)}>
          <option value="fresh">Fresh bound fixture</option>
          <option value="missing">Missing receipt</option>
          <option value="stale">Stale receipt</option>
          <option value="conflict">Conflicting receipt</option>
          <option value="tampered">Tampered payload</option>
        </select>
      </label>
    </aside>
  );
}

function Header({ menuOpen, setMenuOpen }) {
  const menuButton = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen, setMenuOpen]);

  const links = [
    ["Current", "#current"],
    ["How it works", "#method"],
    ["Choose a route", "#entry-actions"],
    ["Explore", "#town"],
  ];

  return (
    <>
      <header className="topbar">
        <a className="logo-link" href="/" aria-label="LAiDIES homepage candidate">
          <Logo />
        </a>
        <nav className="desktop-nav" aria-label="Primary">
          {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          <a className="join-link" href="/start-here.html">Start here</a>
        </nav>
        <button
          ref={menuButton}
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>
      <nav
        className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile primary"
        hidden={!menuOpen}
      >
        {links.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a className="join-link" href="/start-here.html">Start here</a>
      </nav>
    </>
  );
}

function VisitorBanner({ visitor }) {
  const state = VISITOR_STATES[visitor] || VISITOR_STATES.first;
  return (
    <section className={`visitor-banner state-${visitor}`} aria-labelledby="visitor-title">
      <div>
        <p className="eyebrow">{state.eyebrow}</p>
        <h2 id="visitor-title">{state.title}</h2>
        <p>{state.body}</p>
      </div>
      <a className="text-link" href="#town">See every route’s current readiness ↓</a>
    </section>
  );
}

function CurrentContent({ projectionState }) {
  const failed = projectionState.status === "failed";
  const loading = projectionState.status === "loading";
  const items = projectionState.currentContent?.items || [];
  const currentEpisode = items.find(
    (item) => item.slot === "latest-episode" && item.promotable
  );
  const breaking = items.find((item) => item.slot === "breaking");
  const daily = items.find((item) => item.slot === "daily");
  const episode = currentEpisode || {
    number: 4,
    title: "The Founding Mothers",
    publishedOn: "2026-06-24",
    route: "/issues/issue-04.html",
    label: "Previously published",
    limitation: "The last stable evergreen episode route."
  };
  const episodeNumber = episode.title.match(/Episode\s+(\d+)/i)?.[1] || "04";
  const episodeTitle = episode.title.replace(/^Episode\s+\d+\s*·\s*/i, "");
  return (
    <section className="current-section" id="current" aria-labelledby="current-title">
      <div className="section-heading">
        <p className="eyebrow">Current, only when proved</p>
        <h2 id="current-title">What is current in town?</h2>
        <p>
          This candidate distinguishes the latest published episode from a current-week claim,
          and treats an unadmitted publication as held rather than filling the space.
        </p>
      </div>
      {loading && <div className="system-notice" role="status">Loading the Platform readiness projection…</div>}
      {failed && (
        <div className="system-notice" role="status" data-error-code={projectionState.errorCode}>
          Current-content status is unavailable. Showing a fixed previously published route;
          no current promotion is claimed.
        </div>
      )}
      <div className="current-grid">
        <article className="episode-feature">
          <img src="/assets/eniac-women.png" alt="The women of ENIAC at the machine" />
          <div>
            <span className="status available">{episode.label}</span>
            <p className="meta">Episode {episodeNumber.padStart(2, "0")} · Published {episode.publishedOn}</p>
            <h3>{episodeTitle}</h3>
            <p>{episode.limitation}</p>
            <a className="text-link" href={episode.route}>Read Episode {episodeNumber.padStart(2, "0")} →</a>
          </div>
        </article>
        <aside className="news-status" aria-label="News publication status">
          <div>
            <span className="status quiet">{breaking?.label || "No current promotion"}</span>
            <h3>The Breaking</h3>
            <p>{breaking?.limitation || "No fresh, available Breaking receipt is present."}</p>
            {breaking?.route && <a className="text-link" href={breaking.route}>Read The Breaking →</a>}
          </div>
          <div>
            <span className="status held">{daily?.label || "No current promotion"}</span>
            <h3>The Daily</h3>
            <p>{daily?.limitation || "No fresh, available Daily receipt is present."}</p>
            {daily?.route && <a className="text-link" href={daily.route}>Read The Daily →</a>}
          </div>
        </aside>
      </div>
      {projectionState.envelope && (
        <p className="projection-receipt">
          Platform projection {projectionState.envelope.payload.projectionId}
          {" · "}fresh until {new Date(projectionState.envelope.payload.validUntil).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" })}
          {" · "}SHA-256 {projectionState.envelope.integrity.payloadSha256}
        </p>
      )}
      {projectionState.evidenceCeiling && (
        <p className="projection-ceiling">
          Evidence ceiling: Platform’s synthetic contract fixture; destination owner receipts remain required.
        </p>
      )}
    </section>
  );
}

function ReadinessGrid({ projectionState }) {
  const failed = projectionState.status === "failed";
  const loading = projectionState.status === "loading";
  const entries = (projectionState.destinations || [])
    .filter((entry) => HOMEPAGE_DESTINATION_IDS.has(entry.destinationId));

  return (
    <section className="town-section" id="town" aria-labelledby="town-title">
      <div className="section-heading split">
        <div>
          <p className="eyebrow">Destination readiness projection</p>
          <h2 id="town-title">Explore what each route can honestly do.</h2>
        </div>
        <p>
          A route can be useful without being fully released. Every card names its current
          limitation instead of turning a page load into a town-wide promise.
        </p>
      </div>
      {loading && <div className="system-notice" role="status">Loading the Platform destination projection…</div>}
      {failed && (
        <div
          className="system-notice warning"
          role="status"
          data-error-code={projectionState.errorCode}
        >
          Current destination status is unavailable. Named routes remain for checking,
          but none is certified as ready.
        </div>
      )}
      <div className="readiness-grid">
        {entries.map((entry) => (
          <article
            className={`readiness-card ${entry.state}`}
            key={entry.destinationId}
            data-product-id={entry.productId}
            data-destination-id={entry.destinationId}
          >
            <span className={`status ${entry.state}`}>{entry.label}</span>
            <h3>{entry.name}</h3>
            <p className="projection-meta">Owner: {entry.ownerId}</p>
            <p className="job">{entry.summary}</p>
            <p className="limitation">{entry.limitation}</p>
            <a href={entry.route} aria-label={`${entry.name}: ${entry.label}`}>
              Open route <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function StartHere({ projectionState }) {
  const failed = projectionState.status === "failed";
  return (
    <main id="main" className="start-here-page">
      <section className="start-here-hero" aria-labelledby="start-here-title">
        <p className="terminal-kicker">&gt; WELCOME WAGON · FIRST STOP</p>
        <h1 id="start-here-title">Start with a person, not a map.</h1>
        <p>
          The Visitor’s Centre is the orientation room. It introduces LAiDIES, shows the
          town’s named destinations, and lets you choose without requiring a tour, Card,
          account, or reward.
        </p>
        {failed && (
          <div
            className="system-notice warning"
            role="status"
            data-error-code={projectionState.errorCode}
          >
            Destination readiness is unavailable. The ordinary Visitor’s Centre route remains,
            but it cannot certify any receiving product.
          </div>
        )}
        <div className="start-actions">
          <a className="button primary" href="/visitors-centre.html">Enter the Visitor’s Centre</a>
          <a className="button secondary" href="/">Back to the homepage candidate</a>
        </div>
      </section>
      <section className="orientation-proof" aria-labelledby="orientation-title">
        <img src="/assets/sunnyvaile-main-street.png" alt="SUNNYVAiLE Main Street" />
        <div>
          <p className="eyebrow">Orientation contract</p>
          <h2 id="orientation-title">What happens next</h2>
          <ol>
            <li>Hear the short explanation of LAiDIES and SUNNYVAiLE.</li>
            <li>Choose a named destination with its current limitation visible.</li>
            <li>Arrive at the route. That arrival does not claim the destination’s job is complete.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}

function HomePage({ visitor, projectionState }) {
  const state = VISITOR_STATES[visitor] || VISITOR_STATES.first;
  const primaryHref = visitor === "first" ? "/start-here.html" : state.action.href;
  const primaryLabel = visitor === "first" ? "Start at the Welcome Wagon" : state.action.label;
  const currentEpisode = projectionState.status === "ready"
    ? projectionState.currentContent.items.find(
      (item) => item.slot === "latest-episode" && item.promotable
    )
    : null;
  const episodeHref = currentEpisode?.route || "/issues/issue-04.html";
  const episodeLabel = currentEpisode
    ? "Read the latest published episode"
    : "Read Episode 04 · published June 24";

  return (
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <figure className="hero-backdrop">
          <img src="/assets/sunnyvaile-main-street.png" alt="SUNNYVAiLE Main Street in daylight" />
        </figure>
        <div className="hero-wash" aria-hidden="true" />
        <div className="hero-copy">
          <p className="terminal-kicker">&gt; LAiDIES · PRACTICAL AI, MADE MEMORABLE</p>
          <h1 id="hero-title">AI fluency, taught through the pop culture you <em>never forgot.</em></h1>
          <p className="hero-tagline">Made to click. Built to stick.</p>
          <p className="lede">
            LAiDIES helps women understand and use AI through stories, practical tools,
            source-bound news, music, and a fictional learning town called SUNNYVAiLE.
          </p>
          <div className="primary-actions" id="entry-actions">
            <a className="button primary" href={primaryHref}>{primaryLabel}</a>
            <a className="button secondary" href={episodeHref}>{episodeLabel}</a>
            <a className="button tertiary" href="/library.html">Look up one answer</a>
          </div>
          <p className="action-note">Three entrances, three different jobs. Town exploration comes later.</p>
        </div>
      </section>

      <VisitorBanner visitor={visitor} />
      <CurrentContent projectionState={projectionState} />

      <section className="method" id="method" aria-labelledby="method-title">
        <div className="section-heading">
          <p className="eyebrow">How LAiDIES teaches</p>
          <h2 id="method-title">The story opens the door. Practice does the work.</h2>
        </div>
        <ol className="method-grid">
          {METHOD.map(([cue, title, copy], index) => (
            <li key={cue}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p className="meta">{cue}</p>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <ReadinessGrid projectionState={projectionState} />

      <section className="newsletter-boundary" aria-labelledby="newsletter-title">
        <div>
          <p className="eyebrow">Optional weekly handoff</p>
          <h2 id="newsletter-title">The Wednesday Postcard</h2>
          <p>
            A Resident Card does not subscribe you. The homepage can request the Postcard,
            but Buttondown and the inbox own confirmation and delivery.
          </p>
        </div>
        <a className="button secondary" href="/post-office.html">Open the Post Office request desk</a>
      </section>
    </main>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visitor, setVisitorState] = useState(() => readParam("visitor", "first"));
  const [projectionMode, setProjectionMode] = useState(() => {
    const legacyFailure =
      readParam("content", "ok") === "failed" ||
      readParam("readiness", "ok") === "failed";
    return readParam("projection", legacyFailure ? "missing" : "fresh");
  });
  const startHere = useMemo(() => /\/start-here(?:\.html)?\/?$/.test(window.location.pathname), []);
  const projectionState = usePlatformProjection(projectionMode);

  const updateVisitor = (value) => {
    setVisitorState(value);
    setParams({ visitor: value === "first" ? "ok" : value });
  };
  const updateProjection = (value) => {
    setProjectionMode(value);
    setParams({ projection: value === "fresh" ? "ok" : value, content: "ok", readiness: "ok" });
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <PrototypeControls
        visitor={visitor}
        onVisitor={updateVisitor}
        projectionMode={projectionMode}
        onProjectionMode={updateProjection}
      />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {startHere
        ? <StartHere projectionState={projectionState} />
        : <HomePage visitor={visitor} projectionState={projectionState} />}
      <footer>
        <Logo />
        <p>Isolated functional candidate · not production · no deployment or style ruling</p>
      </footer>
    </div>
  );
}
