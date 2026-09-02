#!/usr/bin/env node
import assert from "node:assert/strict";
import { validateModelReleaseUtility } from "./validate-newsstand-ordinary-story-candidate.mjs";

const priorFailure = {
  headline: "Anthropic released Fable 5.1",
  themes: ["model capabilities"],
  tags: ["Claude"],
  the_story: "Fable is generally available in Claude products and costs 25% less per token.",
  laidies_read: "The decimal point is not the most interesting part.",
  what_this_means: "If you use Claude for ordinary work, Fable is the release that applies to you."
};
assert.ok(validateModelReleaseUtility(priorFailure).length >= 3, "the published failure must be rejected");

const useful = {
  ...priorFailure,
  the_story: "Fable is not on the Free plan. Pro users need usage credits; some paid plans include it.",
  laidies_read: "It is aimed at long research, document comparison, spreadsheets and large coding projects. Anthropic says it was designed for difficult work; that is not a promise.",
  what_this_means: "Use it when a task is complex and long-running. It may be unnecessary for a simple email or summary, where a cheaper or faster existing model may be enough."
};
assert.deepEqual(validateModelReleaseUtility(useful), [], "a useful model-release explanation must pass");

console.log("NEWSSTAND MODEL RELEASE UTILITY PASS known_bad_rejected=1 access_fit_tasks_limits_attribution=1");
