const CANONICAL_URL = "https://laidies.ai/newsstand";
const DOMAIN = "laidies.ai";
const EVENT_NAME = "NewsStand action";

const outcomes = Object.freeze({
  paper_opened: new Set(["available", "unavailable"]),
  story_opened: new Set(["available"]),
  source_opened: new Set(["activated"]),
  learning_opened: new Set(["activated"]),
  search_completed: new Set(["results", "no_results", "unavailable"]),
  correction_viewed: new Set(["corrected", "retracted"])
});
const transitionActions = new Set(["paper_opened", "story_opened"]);

function reject(message) {
  throw new TypeError(`NewsStand measurement rejected: ${message}`);
}

function validToken(value) {
  return typeof value === "string" && /^[a-z0-9_-]{1,64}$/i.test(value);
}

/**
 * Private candidate only. This factory never reads a browser, storage, input
 * value, history entry, URL, referrer, or account identifier. A future page
 * integration supplies its own explicit transition token after a rendered
 * paper/story view; the token is used only for this instance's in-memory
 * dedupe and is never included in the outbound payload.
 */
export function createNewsStandMeasurementAdapter({
  enabled = false,
  transport = null,
  privacy = { globalPrivacyControl: false, doNotTrack: false }
} = {}) {
  if (typeof enabled !== "boolean") reject("enabled must be boolean");
  if (transport !== null && typeof transport !== "function") reject("transport must be a function or null");
  if (!privacy || typeof privacy !== "object" || Array.isArray(privacy)) reject("privacy must be an object");
  for (const key of ["globalPrivacyControl", "doNotTrack"]) {
    if (privacy[key] !== undefined && typeof privacy[key] !== "boolean") reject(`${key} must be boolean when supplied`);
  }

  let sequence = 0;
  let currentTransition = null;
  const suppressed = Boolean(privacy.globalPrivacyControl || privacy.doNotTrack);

  function beginTransition(action) {
    if (!transitionActions.has(action)) reject("only rendered paper/story actions can begin a transition");
    sequence += 1;
    // Superseding a view discards every old token and its state. This bounds
    // memory to one active view and rejects delayed callbacks from old views.
    currentTransition = { token: `ns-transition-${sequence}`, action, state: "ready" };
    return currentTransition.token;
  }

  function payloadFor(action, outcome) {
    return Object.freeze({
      name: EVENT_NAME,
      url: CANONICAL_URL,
      domain: DOMAIN,
      props: Object.freeze({ schema: "ns-v1", action, outcome })
    });
  }

  async function record(event) {
    if (!event || typeof event !== "object" || Array.isArray(event)) reject("event must be an object");
    const keys = Object.keys(event).sort();
    const allowed = ["action", "outcome", "transition", "trigger"].filter(key => Object.hasOwn(event, key)).sort();
    if (keys.join("|") !== allowed.join("|")) reject("event may contain only action, outcome, transition, and internal trigger");
    const { action, outcome, transition, trigger } = event;
    if (!Object.hasOwn(outcomes, action)) reject("action is not allowed");
    if (!outcomes[action].has(outcome)) reject("outcome is not allowed for action");
    if (transition !== undefined && !validToken(transition)) reject("transition token is invalid");
    if (transitionActions.has(action) && !transition) reject("rendered paper/story requires an explicit transition token");
    if (!transitionActions.has(action) && transition !== undefined) reject("only rendered paper/story events accept a transition token");
    if (action === "search_completed") {
      if (!Object.hasOwn(event, "trigger")) reject("search requires an explicit trigger");
      if (trigger === "history_restoration") return { status: "suppressed_restoration" };
      if (trigger !== "explicit_submission") reject("search trigger is not allowed");
    } else if (trigger !== undefined) reject("internal trigger is limited to search");
    if (suppressed) return { status: "suppressed_privacy" };
    if (!enabled || !transport) return { status: "disabled" };
    if (transition) {
      if (!currentTransition || currentTransition.token !== transition || currentTransition.action !== action) reject("transition is stale or belongs to another action");
      if (currentTransition.state !== "ready") return { status: "deduped" };
      // Claim before awaiting so two callbacks for one rendered view cannot
      // both reach transport. Failed transport returns this one view to ready.
      currentTransition.state = "in_flight";
    }

    const payload = payloadFor(action, outcome);
    try {
      await transport(payload);
      if (transition && currentTransition?.token === transition) currentTransition.state = "completed";
      return { status: "transport_completed" };
    } catch {
      // Metrics are optional: a blocked or failing provider never changes the
      // reader flow, and a failed attempt remains eligible for a later render.
      if (transition && currentTransition?.token === transition) currentTransition.state = "ready";
      return { status: "provider_error" };
    }
  }

  return Object.freeze({ beginTransition, record });
}

export const NEWSSTAND_MEASUREMENT_WIRE_FORMAT = Object.freeze({
  name: EVENT_NAME,
  url: CANONICAL_URL,
  domain: DOMAIN,
  props: Object.freeze({ schema: "ns-v1", action: "controlled", outcome: "controlled" })
});
