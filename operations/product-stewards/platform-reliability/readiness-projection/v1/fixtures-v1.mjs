import {
  CANONICAL_DESTINATIONS,
  sealProjectionDraft,
  shaBytes
} from "./readiness-projection-v1.mjs";

export const FIXTURE_EVIDENCE_PATH = "fixture://owner-readiness-receipt-v1";
export const FIXTURE_EVIDENCE_BYTES = Buffer.from(
  "Synthetic owner receipt for Platform contract testing only.\n",
  "utf8"
);
export const FIXTURE_EVIDENCE_SHA256 = shaBytes(FIXTURE_EVIDENCE_BYTES);

const HELD = new Set([
  "chick-flicks",
  "maikeover",
  "dream-phone",
  "town-hall",
  "sunnyvaile-high",
  "fairy-godmother"
]);

function evidence() {
  return {
    path: FIXTURE_EVIDENCE_PATH,
    sha256: FIXTURE_EVIDENCE_SHA256,
    observedAt: "2026-07-26T18:00:00Z"
  };
}

function noArtifact() {
  return { kind: "none", id: null, sha256: null };
}

export function makeValidDraft(overrides = {}) {
  const base = {
    projectionId: "readiness-local-contract-v1",
    sequence: 1,
    generatedAt: "2026-07-26T18:15:00Z",
    validUntil: "2026-07-27T18:15:00Z",
    replacesProjectionId: null,
    fallbackRoute: "/visitors-centre.html",
    destinations: CANONICAL_DESTINATIONS.map((canonical) => ({
      ...canonical,
      state: HELD.has(canonical.destinationId) ? "held" : "limited",
      label: HELD.has(canonical.destinationId)
        ? "Promotion held"
        : "Available with limits",
      summary: `Open ${canonical.name} and check its own current page.`,
      limitation:
        "Route arrival is navigation only; it does not prove a downstream action or product is complete.",
      disposition: HELD.has(canonical.destinationId)
        ? "LOCAL_EVIDENCE_RELEASE_HOLD"
        : "LOCAL_EVIDENCE_LIMITED",
      freshUntil: "2026-07-27T18:15:00Z",
      evidence: evidence(),
      artifact: noArtifact()
    })),
    currentContent: [
      {
        slot: "latest-episode",
        ownerId: "weekly-episodes-engine-production-director",
        state: "available",
        label: "Latest published",
        title: "Episode 04 · The Founding Mothers",
        route: "/issues/issue-04.html",
        publishedOn: "2026-06-24",
        limitation:
          "This is the latest admitted evergreen episode, not a claim that it was published this week.",
        disposition: "LATEST_PUBLISHED_EVERGREEN",
        freshUntil: "2026-07-27T18:15:00Z",
        evidence: evidence(),
        artifact: {
          kind: "local-evidence",
          id: "fixture-episode-04",
          sha256: FIXTURE_EVIDENCE_SHA256
        }
      },
      {
        slot: "breaking",
        ownerId: "newsstand-champion",
        state: "quiet",
        label: "No admitted breaking story",
        title: null,
        route: null,
        publishedOn: null,
        limitation:
          "No alarm or filler headline appears when no qualified story is admitted.",
        disposition: "CLEAR_DAY_NO_ADMITTED_STORY",
        freshUntil: "2026-07-27T18:15:00Z",
        evidence: evidence(),
        artifact: noArtifact()
      },
      {
        slot: "daily",
        ownerId: "newsstand-champion",
        state: "held",
        label: "Release held",
        title: "The Daily",
        route: "/newsstand.html",
        publishedOn: null,
        limitation:
          "The current edited briefing is not admitted for entry-page promotion.",
        disposition: "RELEASE_HOLD",
        freshUntil: "2026-07-27T18:15:00Z",
        evidence: evidence(),
        artifact: noArtifact()
      }
    ]
  };
  return Object.assign(base, structuredClone(overrides));
}

export async function fixtureReadEvidence(path) {
  if (path !== FIXTURE_EVIDENCE_PATH) throw new Error("fixture evidence missing");
  return FIXTURE_EVIDENCE_BYTES;
}

export async function makeValidEnvelope(overrides = {}) {
  return sealProjectionDraft(makeValidDraft(overrides), {
    now: new Date("2026-07-26T18:16:00Z"),
    readEvidence: fixtureReadEvidence
  });
}
