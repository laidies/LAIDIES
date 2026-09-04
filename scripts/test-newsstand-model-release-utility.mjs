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
  laidies_read: "Fable is a top-tier Claude model aimed at long research, document comparison, spreadsheets and large coding projects. Anthropic says it was designed for difficult work; that is not a promise.",
  what_this_means: "Compared with Sol, Fable emphasizes long-running Claude work rather than everyday OpenAI tasks. Use it when a task is complex and long-running. It may be unnecessary for a simple email or summary, where a cheaper or faster existing model may be enough. This phased release does not remove its limitations."
};
assert.deepEqual(validateModelReleaseUtility(useful), [], "a useful model-release explanation must pass");

const noAlternative = { ...useful, what_this_means: "Use it when a task is complex and long-running. It may be unnecessary for a simple email. This phased release has limitations." };
assert.ok(validateModelReleaseUtility(noAlternative).some(error => error.includes("nearest useful alternative")), "a model story without a task-level alternative must reject");

const vagueTool = { headline: "A new AI tool launched", themes: ["tool release"], tags: [], the_story: "The tool is now available.", laidies_read: "It has many powerful capabilities.", what_this_means: "Try it." };
assert.ok(validateModelReleaseUtility(vagueTool).length >= 5, "a vague new-tool announcement must fail the same reader-fit gate");

console.log("NEWSSTAND MODEL RELEASE UTILITY PASS known_bad_rejected=1 access_fit_tasks_limits_attribution=1");
