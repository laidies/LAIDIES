import crypto from "node:crypto";

export const stable = value => value === null || typeof value !== "object" ? JSON.stringify(value)
  : Array.isArray(value) ? `[${value.map(stable).join(",")}]`
    : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
export const storySha256 = story => crypto.createHash("sha256").update(stable(story)).digest("hex");

const reject = message => { throw new Error(`NEWSSTAND_STORY_LINEAGE_REJECT: ${message}`); };
const ids = (value, label) => {
  if (!Array.isArray(value) || value.some(id => typeof id !== "string" || !id)) reject(`${label} must be a list of story IDs`);
  if (new Set(value).size !== value.length) reject(`${label} contains duplicates`);
  return value;
};
const priorPublication = (predecessor, story) => {
  const prior = Date.parse(predecessor.publishedAt), next = Date.parse(story.publishedAt);
  if (!Number.isFinite(prior)) reject(`predecessor was never published: ${predecessor.id}`);
  if (!Number.isFinite(next) || prior >= next) reject(`predecessor is not earlier than later coverage: ${predecessor.id}`);
};

// A candidate binds each predecessor's complete current object. The only
// allowed mutation is appending the candidate ID to successorStoryIds.
export function applyStoryLineageTransaction({ dataset, story, lineage = null }) {
  if (!dataset || !Array.isArray(dataset.stories) || !story?.id) reject("dataset and candidate story are required");
  const predecessorIds = ids(story.predecessorStoryIds ?? [], "candidate predecessorStoryIds");
  const successorIds = ids(story.successorStoryIds ?? [], "candidate successorStoryIds");
  if (successorIds.length) reject("new dated story cannot name successors");
  if (predecessorIds.includes(story.id)) reject("candidate contains a self-link");
  const expectations = lineage?.predecessors;
  if (!predecessorIds.length) {
    if (lineage !== null && (!Array.isArray(expectations) || expectations.length)) reject("first story cannot carry predecessor expectations");
  } else {
    if (!lineage || !Array.isArray(expectations) || expectations.length !== predecessorIds.length) reject("each predecessor requires one old-state expectation");
    if (new Set(expectations.map(item => item?.storyId)).size !== expectations.length) reject("predecessor expectations contain duplicates");
    if (expectations.some(item => !item || typeof item.storyId !== "string" || !/^[a-f0-9]{64}$/.test(item.storySha256 || ""))) reject("predecessor expectation is incomplete");
    if (expectations.map(item => item.storyId).join("\n") !== predecessorIds.join("\n")) reject("predecessor expectations must match candidate links in order");
  }
  const next = structuredClone(dataset);
  const existing = new Map(next.stories.map(item => [item.id, item]));
  if (existing.has(story.id) || next.stories.some(item => item.slug === story.slug)) reject("candidate identity already exists");
  // Validate every target before touching any object.
  for (const expected of expectations || []) {
    if (expected.storyId === story.id) reject("predecessor expectation contains a self-link");
    const old = existing.get(expected.storyId);
    if (!old) reject(`predecessor does not exist: ${expected.storyId}`);
    if (storySha256(old) !== expected.storySha256) reject(`predecessor old-state changed: ${expected.storyId}`);
    priorPublication(old, story);
    const successors = ids(old.successorStoryIds, `predecessor ${expected.storyId} successorStoryIds`);
    if (successors.includes(story.id)) reject(`predecessor already links to candidate: ${expected.storyId}`);
  }
  next.stories.push(structuredClone(story));
  for (const expected of expectations || []) {
    const old = existing.get(expected.storyId);
    const before = structuredClone(old);
    old.successorStoryIds = [...old.successorStoryIds, story.id];
    const preserved = { ...old, successorStoryIds: before.successorStoryIds };
    if (stable(preserved) !== stable(before)) reject(`predecessor preservation failed: ${expected.storyId}`);
  }
  return next;
}

// Retrying a completed transaction must prove the precise post-state. It may
// not accept a previously inserted successor whose reciprocal old-story link
// was lost or whose predecessor changed after admission.
export function validateStoryLineageReplay({ dataset, story, lineage = null }) {
  if (!lineage) return;
  const predecessorIds = ids(story.predecessorStoryIds ?? [], "candidate predecessorStoryIds");
  const expectations = lineage.predecessors;
  if (!Array.isArray(expectations) || expectations.length !== predecessorIds.length ||
      expectations.map(item => item?.storyId).join("\n") !== predecessorIds.join("\n")) reject("replay predecessor expectations differ from candidate links");
  const existing = new Map((dataset?.stories || []).map(item => [item.id, item]));
  const successor = existing.get(story.id);
  if (!successor || stable(successor) !== stable(story)) reject("replay successor differs from admitted story");
  for (const expected of expectations) {
    const old = existing.get(expected.storyId);
    if (!old) reject(`replay predecessor does not exist: ${expected.storyId}`);
    priorPublication(old, story);
    const successors = ids(old.successorStoryIds, `replay predecessor ${expected.storyId} successorStoryIds`);
    if (successors.filter(id => id === story.id).length !== 1) reject(`replay reciprocal successor link is missing or duplicated: ${expected.storyId}`);
    const preState = { ...old, successorStoryIds: successors.filter(id => id !== story.id) };
    if (storySha256(preState) !== expected.storySha256) reject(`replay predecessor changed outside successor link: ${expected.storyId}`);
  }
}
