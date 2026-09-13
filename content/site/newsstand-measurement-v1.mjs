const ENDPOINT = "https://plausible.io/api/event";
const URL = "https://laidies.ai/newsstand";
const DOMAIN = "wearelaidies.com";

export const NEWSSTAND_EVENTS = Object.freeze({
  paper_available: "NewsStand paper available",
  paper_unavailable: "NewsStand paper unavailable",
  story_opened: "NewsStand story opened",
  source_opened: "NewsStand source opened",
  learning_opened: "NewsStand learning opened",
  search_results: "NewsStand search results",
  search_empty: "NewsStand search empty",
  search_unavailable: "NewsStand search unavailable",
  correction_viewed: "NewsStand correction viewed",
  retraction_viewed: "NewsStand retraction viewed"
});

const TRANSITION_EVENTS = new Set([
  "paper_available", "paper_unavailable", "story_opened", "correction_viewed", "retraction_viewed"
]);

function reject(message) {
  throw new TypeError("NewsStand measurement rejected: " + message);
}

function validTransition(value) {
  return typeof value === "string" && /^ns-render-[0-9]+$/.test(value);
}

export function shouldCollect(locationLike) {
  return Boolean(locationLike && locationLike.protocol === "https:" && locationLike.hostname === "laidies.ai");
}

export function browserPrivacySignals(navigatorLike) {
  return {
    globalPrivacyControl: Boolean(navigatorLike && navigatorLike.globalPrivacyControl === true),
    doNotTrack: Boolean(navigatorLike && (navigatorLike.doNotTrack === "1" || navigatorLike.doNotTrack === "yes" || navigatorLike.msDoNotTrack === "1"))
  };
}

export function createNewsStandMeasurementAdapter({
  enabled = false,
  transport = null,
  privacy = { globalPrivacyControl: false, doNotTrack: false }
} = {}) {
  if (typeof enabled !== "boolean") reject("enabled must be boolean");
  if (transport !== null && typeof transport !== "function") reject("transport must be a function or null");
  if (!privacy || typeof privacy !== "object" || Array.isArray(privacy)) reject("privacy must be an object");
  for (const key of ["globalPrivacyControl", "doNotTrack"]) {
    if (privacy[key] !== undefined && typeof privacy[key] !== "boolean") reject(key + " must be boolean when supplied");
  }

  const completed = new Set();
  const inFlight = new Set();
  const suppressed = Boolean(privacy.globalPrivacyControl || privacy.doNotTrack);

  async function record(event) {
    if (!event || typeof event !== "object" || Array.isArray(event)) reject("event must be an object");
    const keys = Object.keys(event).sort();
    const allowed = ["kind", "transition"].filter(key => Object.hasOwn(event, key)).sort();
    if (keys.join("|") !== allowed.join("|")) reject("event may contain only kind and internal transition");
    if (!Object.hasOwn(NEWSSTAND_EVENTS, event.kind)) reject("event kind is not allowed");
    const needsTransition = TRANSITION_EVENTS.has(event.kind);
    if (needsTransition && !validTransition(event.transition)) reject("rendered event requires a valid transition");
    if (!needsTransition && event.transition !== undefined) reject("only rendered events accept a transition");
    if (suppressed) return { status: "suppressed_privacy" };
    if (!enabled || !transport) return { status: "disabled" };
    if (needsTransition) {
      if (completed.has(event.transition) || inFlight.has(event.transition)) return { status: "deduped" };
      inFlight.add(event.transition);
    }
    const payload = Object.freeze({ name: NEWSSTAND_EVENTS[event.kind], url: URL, domain: DOMAIN });
    try {
      const response = await transport(payload);
      if (!response || response.ok !== true) throw new Error("measurement provider did not accept the event");
      if (needsTransition) completed.add(event.transition);
      return { status: "transport_completed" };
    } catch {
      return { status: "provider_error" };
    } finally {
      if (needsTransition) inFlight.delete(event.transition);
    }
  }

  return Object.freeze({ record });
}

function browserTransport(payload) {
  return fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
    keepalive: true,
    referrerPolicy: "no-referrer"
  });
}

if (typeof window !== "undefined") {
  const adapter = createNewsStandMeasurementAdapter({
    enabled: shouldCollect(window.location),
    transport: shouldCollect(window.location) ? browserTransport : null,
    privacy: browserPrivacySignals(window.navigator)
  });
  window.NewsStandMeasurement = Object.freeze({
    record: event => adapter.record(event).catch(() => undefined)
  });
  const queued = Array.isArray(window.NewsStandMeasurementQueue) ? window.NewsStandMeasurementQueue.splice(0) : [];
  queued.forEach(event => window.NewsStandMeasurement.record(event));
}
