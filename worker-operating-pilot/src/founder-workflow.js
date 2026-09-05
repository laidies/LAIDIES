import { WorkflowEntrypoint } from "cloudflare:workers";
import { NonRetryableError } from "cloudflare:workflows";
import { decisionRpc, runFounderDecision } from "./founder-contract.mjs";

export class FounderDecisionPilot extends WorkflowEntrypoint {
  async run(event, step) {
    return runFounderDecision(event, step,
      (name, payload) => decisionRpc(this.env.SUPABASE_PUBLIC_KEY, name, payload),
      error => new NonRetryableError(error.message));
  }
}
