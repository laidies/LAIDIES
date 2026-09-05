import { researchBudgetConfigured, researchMonth, MISS_JEEVES_MONTHLY_CAP_MICRO_USD, MISS_JEEVES_RESERVATION_MICRO_USD } from "./miss-jeeves-budget.js";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DAY_MS = 24 * 60 * 60 * 1000;
const enc = new TextEncoder();

function b64url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function unb64url(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - value.length % 4) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function hmac(secret, value) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(value)));
}

async function opaque(secret, value) {
  return b64url(await hmac(secret, value));
}

async function verifyQaToken(request, env) {
  const supplied = request.headers.get("X-LAiDIES-QA-Token") || "";
  if (env.FAIRY_QA_ENABLED !== "true" || !supplied) return null;
  if (!env.FAIRY_QA_TOKEN || supplied.length > 512) throw new Error("qa_token_invalid");
  const suppliedDigest = await crypto.subtle.digest("SHA-256", enc.encode(supplied));
  const expectedDigest = await crypto.subtle.digest("SHA-256", enc.encode(env.FAIRY_QA_TOKEN));
  if (!crypto.subtle.timingSafeEqual(suppliedDigest, expectedDigest)) throw new Error("qa_token_invalid");
  return opaque(env.IDENTITY_HASH_SALT, `staging-qa:${supplied}`);
}

async function verifyResident(request, env) {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1] || "";
  if (!token) return null;
  if (!env.SUPABASE_URL || !env.SUPABASE_PUBLISHABLE_KEY) throw new Error("resident_identity_unavailable");
  const response = await fetch(new URL("/auth/v1/user", env.SUPABASE_URL), {
    headers: { apikey: env.SUPABASE_PUBLISHABLE_KEY, authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(5000), redirect: "manual"
  });
  if (response.status >= 300 && response.status < 400) throw new Error("resident_identity_redirect_rejected");
  const data = response.ok ? await response.json() : null;
  return UUID.test(String(data?.id || "")) ? data.id : null;
}

async function mintGuest(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "local";
  const ua = (request.headers.get("User-Agent") || "unknown").slice(0, 256);
  const actor = await opaque(env.GUEST_TOKEN_SIGNING_KEY, `guest:${ip}:${ua}`);
  const payload = { v: 1, actor, exp: Date.now() + 30 * DAY_MS };
  const encoded = b64url(enc.encode(JSON.stringify(payload)));
  const signature = b64url(await hmac(env.GUEST_TOKEN_SIGNING_KEY, encoded));
  return { token: `${encoded}.${signature}`, actor };
}

async function verifyGuest(token, env) {
  if (typeof token !== "string" || token.length > 1200) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const expected = await hmac(env.GUEST_TOKEN_SIGNING_KEY, parts[0]);
  const supplied = unb64url(parts[1]);
  if (expected.length !== supplied.length || !crypto.subtle.timingSafeEqual(expected, supplied)) return null;
  let payload;
  try { payload = JSON.parse(new TextDecoder().decode(unb64url(parts[0]))); } catch { return null; }
  return payload?.v === 1 && typeof payload.actor === "string" && payload.actor.length >= 32 &&
    Number.isFinite(payload.exp) && payload.exp > Date.now() ? payload : null;
}

export async function resolveBetaActor(request, env, body) {
  if (!env.GUEST_TOKEN_SIGNING_KEY || !env.IDENTITY_HASH_SALT) throw new Error("identity_secrets_unavailable");
  const qa = await verifyQaToken(request, env);
  if (qa) return { kind: "qa", id: qa, guestToken: null, limit: 3 };
  const suppliedAuthorization = request.headers.get("authorization") || "";
  const resident = await verifyResident(request, env);
  if (resident) return { kind: "resident", id: await opaque(env.IDENTITY_HASH_SALT, `resident:${resident}`), guestToken: null, limit: 3 };
  if (suppliedAuthorization) throw new Error("resident_session_invalid");
  const supplied = body?.guestToken || request.headers.get("X-LAiDIES-Guest-Token") || "";
  const verified = supplied ? await verifyGuest(supplied, env) : null;
  if (supplied && !verified) throw new Error("guest_token_invalid");
  const guest = verified ? { actor: verified.actor, token: supplied } : await mintGuest(request, env);
  return { kind: "guest", id: guest.actor, guestToken: guest.token, limit: 1 };
}

export async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", enc.encode(String(value)));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function stub(env, name) {
  if (!env.FAIRY_BETA_LEDGER?.getByName) throw new Error("beta_ledger_unavailable");
  return env.FAIRY_BETA_LEDGER.getByName(name);
}

async function ledger(env, name, payload) {
  const response = await stub(env, name).fetch("https://fairy-ledger.internal/", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => null);
  return { ok: response.ok && data?.ok === true, status: response.status, data };
}

function day() { return new Date().toISOString().slice(0, 10); }
function actorObject(actor) { return `actor:${day()}:${actor.kind}:${actor.id}`; }

function missJeevesActorObject(actor) {
  return actor.kind === "guest"
    ? `miss-jeeves:actor:guest:${actor.id}`
    : `miss-jeeves:actor:${day()}:${actor.kind}:${actor.id}`;
}

export function betaEnabled(env) { return env.FAIRY_BETA_ENABLED === "true"; }

export async function resolveMissJeevesActor(request, env, body) {
  if (!env.GUEST_TOKEN_SIGNING_KEY || !env.IDENTITY_HASH_SALT) throw new Error("identity_secrets_unavailable");
  const suppliedAuthorization = request.headers.get("authorization") || "";
  const resident = await verifyResident(request, env);
  if (resident) return { kind: "resident", id: await opaque(env.IDENTITY_HASH_SALT, `resident:${resident}`), guestToken: null, limit: 5 };
  if (suppliedAuthorization) throw new Error("resident_session_invalid");
  const supplied = body?.guestToken || request.headers.get("X-LAiDIES-Guest-Token") || "";
  const verified = supplied ? await verifyGuest(supplied, env) : null;
  if (supplied && !verified) throw new Error("guest_token_invalid");
  const guest = verified ? { actor: verified.actor, token: supplied } : await mintGuest(request, env);
  return { kind: "guest", id: guest.actor, guestToken: guest.token, limit: 3 };
}

export async function beginMissJeevesAnswer(env, actor, requestId) {
  if (!researchBudgetConfigured(env)) return {ok:false,kind:"configuration"};
  const actorKey = missJeevesActorObject(actor);
  const budgetKey = `miss-jeeves:budget:${researchMonth()}`;
  const actorResult = await ledger(env, actorKey, { action: "beginAnswer", requestId, limit: actor.limit });
  if (!actorResult.ok) return { ok: false, kind: actorResult.data?.status || "unavailable", actorResult };
  const amountMicroUsd = MISS_JEEVES_RESERVATION_MICRO_USD;
  const capMicroUsd = MISS_JEEVES_MONTHLY_CAP_MICRO_USD;
  const budget = await ledger(env, budgetKey, { action: "reserveBudget", requestId, amountMicroUsd, capMicroUsd });
  if (!budget.ok) {
    await ledger(env, actorKey, { action: "abortCase", requestId });
    return { ok: false, kind: budget.data?.status || "unavailable", budget };
  }
  return { ok: true, actorKey, budgetKey, actorResult: actorResult.data, budget: budget.data };
}

export async function abortMissJeevesAnswer(env, actor, requestId, releaseBudget = true, reservation = {}) {
  const actorResult = await ledger(env, (reservation.actorKey || missJeevesActorObject(actor)), { action: "abortCase", requestId });
  if (releaseBudget) await ledger(env, (reservation.budgetKey || `miss-jeeves:budget:${researchMonth()}`), { action: "releaseBudget", requestId });
  return actorResult;
}

export async function commitMissJeevesAnswer(env, actor, requestId, answerHash, reservation = {}) {
  return ledger(env, (reservation.actorKey || missJeevesActorObject(actor)), {
    action: "commitCase", requestId, caseId: `jeeves-${crypto.randomUUID()}`, answerHash
  });
}

export async function settleMissJeevesResearch(env, reservation, requestId, amountMicroUsd) {
  if (!reservation.budgetKey || !Number.isSafeInteger(amountMicroUsd) || amountMicroUsd < 0) return;
  return ledger(env, reservation.budgetKey, {action:"settleBudget", requestId, amountMicroUsd});
}

export async function beginBetaCase(env, actor, requestId) {
  const actorResult = await ledger(env, actorObject(actor), { action: "beginCase", requestId, limit: actor.limit });
  if (!actorResult.ok) return { ok: false, kind: actorResult.data?.status || "unavailable", actorResult };
  const amountMicroUsd = Number.parseInt(env.FAIRY_ATTEMPT_RESERVATION_MICRO_USD || "500000", 10);
  const capMicroUsd = Number.parseInt(env.FAIRY_DAILY_CAP_MICRO_USD || "10000000", 10);
  if (!Number.isInteger(amountMicroUsd) || amountMicroUsd < 1 || !Number.isInteger(capMicroUsd) || capMicroUsd !== 10000000) {
    await ledger(env, actorObject(actor), { action: "abortCase", requestId });
    return { ok: false, kind: "configuration" };
  }
  const budget = await ledger(env, `budget:${day()}`, { action: "reserveBudget", requestId, amountMicroUsd, capMicroUsd });
  if (!budget.ok) {
    await ledger(env, actorObject(actor), { action: "abortCase", requestId });
    return { ok: false, kind: budget.data?.status || "unavailable", budget };
  }
  return { ok: true, actorResult: actorResult.data, budget: budget.data };
}

export async function abortBetaCase(env, actor, requestId) {
  return ledger(env, actorObject(actor), { action: "abortCase", requestId });
}

export async function commitBetaCase(env, actor, requestId, caseId, answerHash) {
  return ledger(env, actorObject(actor), { action: "commitCase", requestId, caseId, answerHash });
}

export async function beginBetaFitting(env, actor, requestId, caseId, expectedVersion, answerHash) {
  const actorResult = await ledger(env, actorObject(actor), { action: "beginFitting", requestId, caseId, expectedVersion, answerHash });
  if (!actorResult.ok) return { ok: false, kind: actorResult.data?.status || "unavailable", actorResult };
  const amountMicroUsd = Number.parseInt(env.FAIRY_ATTEMPT_RESERVATION_MICRO_USD || "500000", 10);
  const capMicroUsd = Number.parseInt(env.FAIRY_DAILY_CAP_MICRO_USD || "10000000", 10);
  if (!Number.isInteger(amountMicroUsd) || amountMicroUsd < 1 || !Number.isInteger(capMicroUsd) || capMicroUsd !== 10000000) {
    await ledger(env, actorObject(actor), { action: "abortFitting", requestId, caseId });
    return { ok: false, kind: "configuration" };
  }
  const budget = await ledger(env, `budget:${day()}`, { action: "reserveBudget", requestId, amountMicroUsd, capMicroUsd });
  if (!budget.ok) {
    await ledger(env, actorObject(actor), { action: "abortFitting", requestId, caseId });
    return { ok: false, kind: budget.data?.status || "unavailable", budget };
  }
  return { ok: true, actorResult: actorResult.data, budget: budget.data };
}

export async function abortBetaFitting(env, actor, requestId, caseId) {
  return ledger(env, actorObject(actor), { action: "abortFitting", requestId, caseId });
}

export async function commitBetaFitting(env, actor, requestId, caseId, answerHash) {
  return ledger(env, actorObject(actor), { action: "commitFitting", requestId, caseId, answerHash });
}
