import worker from "./index.js";
import { missingMaterialQuestion } from "./clarification.js";
import { handleMissJeevesGuidance } from "./miss-jeeves-guidance.js";
import { abortMissJeevesAnswer, beginMissJeevesAnswer, commitMissJeevesAnswer, resolveMissJeevesActor, sha256 } from "./beta-runtime.js";

function serviceJson(payload, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
}

async function missJeevesGuidance(request, env) {
  let body;
  try { body = await request.clone().json(); } catch { return serviceJson({ status: "error", error: "invalid_json" }, 400); }
  let actor;
  try { actor = await resolveMissJeevesActor(request, env, body); }
  catch (error) { return serviceJson({ status: "error", error: String(error?.message || "identity_unavailable") }, 401); }
  const requestId = `jeeves-${crypto.randomUUID()}`;
  const reservation = await beginMissJeevesAnswer(env, actor, requestId);
  if (!reservation.ok) {
    const limit = reservation.kind === "limit";
    return serviceJson({
      status: "error",
      error: limit ? (actor.kind === "guest" ? "guest_limit_reached" : "resident_daily_limit_reached") : reservation.kind === "cap" ? "service_budget_reached" : "service_unavailable",
      guestToken: actor.guestToken,
      allowance: { kind: actor.kind, limit: actor.limit, remaining: 0 }
    }, limit || reservation.kind === "cap" ? 429 : 503);
  }
  const response = await handleMissJeevesGuidance(request, env);
  let payload;
  try { payload = await response.clone().json(); } catch { payload = null; }
  if (!response.ok || payload?.status !== "ok") {
    await abortMissJeevesAnswer(env, actor, requestId, response.status < 500);
    return response;
  }
  const answerHash = await sha256(JSON.stringify(payload.output || []));
  const committed = await commitMissJeevesAnswer(env, actor, requestId, answerHash);
  if (!committed.ok) return serviceJson({ status: "unavailable", error: "allowance_commit_failed" }, 503);
  return serviceJson({ ...payload, guestToken: actor.guestToken, allowance: { kind: actor.kind, limit: actor.limit, remaining: committed.data.remaining } });
}

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    if (url.hostname === "miss-jeeves.internal" && url.pathname === "/guidance") {
      return missJeevesGuidance(request, env);
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
