import worker from "./index.js";
import { missingMaterialQuestion } from "./clarification.js";
import { handleMissJeevesGuidance } from "./miss-jeeves-guidance.js";

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    if (url.hostname === "miss-jeeves.internal" && url.pathname === "/guidance") {
      return handleMissJeevesGuidance(request, env);
    }
    let prompt = "";
    if (env?.FAIRY_BETA_ENABLED === "true" && request.method === "POST") {
      try { prompt = String((await request.clone().json())?.prompt || ""); } catch {}
    }
    const response = await worker.fetch(request, env, context);
    const focusedQuestion = missingMaterialQuestion(prompt);
    if (!focusedQuestion || !response.headers.get("content-type")?.includes("application/json")) return response;
    let data;
    try { data = await response.clone().json(); } catch { return response; }
    if (data?.type !== "needs_information") return response;
    data.question = focusedQuestion;
    data.whyItMatters = "The missing material determines what the words mean, so guessing would be misleading.";
    data.usefulNow = "Remove names, account numbers and confidential details before sharing only the relevant passage.";
    return new Response(JSON.stringify(data), { status: response.status, headers: response.headers });
  }
};
export { FairyBetaLedger } from "./beta-ledger.js";
