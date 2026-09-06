import { privateFeedbackFetch } from './private-feedback.mjs';
import { WorkflowEntrypoint } from "cloudflare:workers";
import { NonRetryableError } from "cloudflare:workflows";
import { checkpointHandoff, unacknowledgedResult, validateAcknowledgement } from "./contract.mjs";
export { FounderDecisionPilot } from "./founder-workflow.js";

export class OperatingHandoffPilot extends WorkflowEntrypoint {
  async run(event, step) {
    const handoff = await step.do("validate receipt and checkpoint handoff", async () => {
      try {
        if (event.payload?.workId !== event.instanceId) throw new Error("workId must equal workflow instance ID");
        return await checkpointHandoff(event.payload, this.env.FROZEN_RECEIPT_SHA256);
      } catch (error) {
        throw new NonRetryableError(error.message);
      }
    });

    let incoming;
    try {
      incoming = await step.waitForEvent("owner acknowledgement", {
        type: "operator-ack",
        timeout: `${handoff.waitSeconds} seconds`
      });
    } catch {
      return step.do("record unacknowledged hold", async () => unacknowledgedResult(handoff));
    }

    return step.do("record explicit operator result", async () => {
      try {
        return validateAcknowledgement(incoming, handoff);
      } catch (error) {
        throw new NonRetryableError(error.message);
      }
    });
  }
}

export default {
  fetch(request, env) { return privateFeedbackFetch(request, env); }
};
