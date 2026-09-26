#!/usr/bin/env node
import assert from "node:assert/strict";
import {runTransportProbe} from "./probe-newsstand-hosted-claude.mjs";

const writer = {
  role: "writer", status: "TRANSPORT_SUCCESS", transportSuccess: true,
  provider: {model: ["claude-fable-5"]},
  output: {role: "writer", draft: {headline: "A Tuesday reading room", body: "The fictional reading room opens on Tuesday."}}
};
const catchesNineAm = {
  role: "reviewer", status: "TRANSPORT_SUCCESS", transportSuccess: true,
  provider: {model: ["claude-fable-5"]},
  output: {role: "reviewer", verdict: "HOLD", findings: [{claim: "The article says the room opens at 9am.", reason: "The complete source says the opening time is unknown, so 9am is unsupported."}]}
};
const vagueFinding = {
  ...catchesNineAm,
  output: {role: "reviewer", verdict: "HOLD", findings: [{claim: "The article needs more verification.", reason: "Review the factual details before publishing this fictional sentence."}]}
};
const emptyWriter = {...writer, output: {role: "writer", draft: {headline: "", body: ""}}};

async function invoke(responses) {
  const calls = [];
  const summary = await runTransportProbe({token: "test-token", run: async input => {
    calls.push(input);
    return responses[calls.length - 1];
  }});
  return {summary, calls};
}

const success = await invoke([writer, catchesNineAm]);
assert.equal(success.summary.status, "TRANSPORT_PROBE_PASSED");
assert.equal(success.summary.results[0].writerOutputPresent, true);
assert.equal(success.summary.results[1].reviewerFoundUnsupportedNineAm, true);
assert.equal(success.calls.length, 2);
assert.equal(success.calls[0].maxTurns, 2);
assert.match(success.calls[1].request.prompt, /unsupported 9am claim/i);

const vague = await invoke([writer, vagueFinding]);
assert.equal(vague.summary.status, "TRANSPORT_PROBE_FAILED");
assert.equal(vague.summary.results[1].reviewerFoundUnsupportedNineAm, false);

const vacuousWriter = await invoke([emptyWriter, catchesNineAm]);
assert.equal(vacuousWriter.summary.status, "TRANSPORT_PROBE_FAILED");
assert.equal(vacuousWriter.summary.results[0].writerOutputPresent, false);

console.log("NEWSSTAND HOSTED PROBE TEST PASS nine_am_detection=1 vague_review_rejection=1 empty_writer_rejection=1");
