import { handleMissJeevesGuidance } from "./miss-jeeves-guidance.js";
import { abortMissJeevesAnswer, beginMissJeevesAnswer, commitMissJeevesAnswer, settleMissJeevesResearch, holdMissJeevesResearch, resolveMissJeevesActor, sha256 } from "./beta-runtime.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function serviceJson(payload, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
}
// Retry only idempotent ledger writes. Never retry the provider request here.
async function confirm(operation) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try { const result = await operation(); if (result?.ok) return result; } catch {}
  }
  return {ok:false};
}

export async function missJeevesGuidance(request, env) {
  let body;
  try { body = await request.clone().json(); } catch { return serviceJson({ status: "error", error: "invalid_json" }, 400); }
  if (body?.intent !== "research") return serviceJson({status:"error",error:"research_intent_required"},400);
  if (!UUID.test(body.researchAttemptId || '')) return serviceJson({status:"error",error:"research_attempt_required"},400);
  let actor;
  try { actor = await resolveMissJeevesActor(request, env, body); }
  catch (error) { return serviceJson({ status: "error", error: String(error?.message || "identity_unavailable") }, 401); }
  // Actor-bound client identity survives transport retries, including a changed query.
  // Once this attempt has reserved money, reusing it never calls the provider again.
  const requestId = `jeeves-${await sha256(`${actor.kind}:${actor.id}:${body.researchAttemptId.toLowerCase()}`)}`;
  let reservation;
  try { reservation = await beginMissJeevesAnswer(env, actor, requestId); }
  catch { return serviceJson({status:"unavailable",error:"service_unavailable",guestToken:actor.guestToken},503); }
  if (!reservation.ok) {
    const duplicate = reservation.kind === 'duplicate';
    const capacity = ["cap", "actor_share", "pace", "in_progress"].includes(reservation.kind);
    return serviceJson({
      status: "error",
      error: duplicate ? "research_attempt_already_received" : capacity ? "research_capacity_reached" : "service_unavailable",
      guestToken: actor.guestToken,
      allowance: {kind:actor.kind,policy:"adaptive.v1",state:reservation.kind === "in_progress" ? "busy" : "paused",retryAt:reservation.retryAt}
    }, duplicate ? 409 : capacity ? 429 : 503);
  }
  const hold = () => confirm(() => holdMissJeevesResearch(env, reservation, requestId));
  let response;
  try { response = await handleMissJeevesGuidance(request, env); }
  catch {
    await confirm(() => abortMissJeevesAnswer(env, actor, requestId, false, reservation));
    return serviceJson({status:"unavailable",error:"research_failed",guestToken:actor.guestToken},503);
  }
  let payload;
  try { payload = await response.clone().json(); } catch { payload = null; }
  const charge = payload?.research_charge_micro_usd;
  const knownCharge = Number.isSafeInteger(charge) && charge >= 0;
  if (knownCharge) {
    const settled = await confirm(() => settleMissJeevesResearch(env,reservation,requestId,charge));
    if (!settled.ok) {
      await hold();
      return serviceJson({status:"unavailable",error:"research_accounting_unavailable",guestToken:actor.guestToken},503);
    }
  }
  if (!response.ok || payload?.status !== "ok" || !knownCharge) {
    // Only an explicit pre-provider result can refund the reserved amount.
    const finished = await confirm(() => abortMissJeevesAnswer(env, actor, requestId, payload?.providerAttempted === false && !knownCharge, reservation));
    if (!finished.ok) await hold();
    if (!payload || (payload.status === 'ok' && !knownCharge)) return serviceJson({status:"unavailable",error:"research_accounting_unavailable",guestToken:actor.guestToken},503);
    delete payload.research_charge_micro_usd;
    delete payload.providerAttempted;
    return serviceJson({...payload,guestToken:actor.guestToken,allowance:{kind:actor.kind,policy:"adaptive.v1",research_answer_used:false}},response.status);
  }
  const answerHash = await sha256(JSON.stringify(payload.output || []));
  const committed = await confirm(() => commitMissJeevesAnswer(env, actor, requestId, answerHash, reservation));
  if (!committed.ok) {
    await hold();
    return serviceJson({ status: "unavailable", error: "allowance_commit_failed", guestToken:actor.guestToken }, 503);
  }
  delete payload.research_charge_micro_usd;
  delete payload.providerAttempted;
  return serviceJson({ ...payload, guestToken: actor.guestToken, allowance: { kind: actor.kind, policy:"adaptive.v1", state:"available" } });
}
