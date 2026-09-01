import assert from "node:assert/strict";
import test from "node:test";

import { prepareSuccessorTrial } from "../harness/successor-classifier-trial.mjs";

test("the August 31 paid-trial runner refuses the superseding classifier bytes", () => {
  assert.throws(() => prepareSuccessorTrial(), /successor_frozen_binding_invalid/);
});
