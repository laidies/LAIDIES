import { MISS_JEEVES_MONTHLY_CAP_MICRO_USD, MISS_JEEVES_RESERVATION_MICRO_USD, researchMonth } from './miss-jeeves-budget.js';

const PENDING_MS = 2 * 60 * 1000;
const validId = value => typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9:_-]{7,255}$/.test(value)
  && !['constructor', 'prototype'].includes(value);
const result = (state, body, status = 200) => ({state, body, status});
const validShare = value => Number.isSafeInteger(value) && value >= MISS_JEEVES_RESERVATION_MICRO_USD
  && value <= MISS_JEEVES_MONTHLY_CAP_MICRO_USD / 2;

// There is deliberately no production default: size the share after the measured
// Sol pilot. Fixture dollars are examples, not an approved visitor allowance.
export function researchFairUseConfigured(env) {
  return validShare(Number(env.MISS_JEEVES_ACTOR_MONTHLY_CAP_MICRO_USD));
}

export function researchPace(now) {
  const date = new Date(now);
  const nextMonth = Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);
  const days = new Date(nextMonth - 1).getUTCDate();
  return {
    cap: Math.floor(MISS_JEEVES_MONTHLY_CAP_MICRO_USD * date.getUTCDate() / days),
    tomorrow: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1)).toISOString(),
    nextMonth: new Date(nextMonth).toISOString()
  };
}

// One existing monthly Durable Object owns both money and actor reservations.
// No awaited operation separates the shared-cap and individual-share decisions.
export function applyResearchAction(previousState, command, now) {
  const state = previousState || {reservedMicroUsd: 0, attempts: {}, researchActors: {}};
  if (!Number.isSafeInteger(state.reservedMicroUsd) || state.reservedMicroUsd < 0 || !state.attempts
      || !validId(command.requestId)) return result(previousState, {ok:false,error:'invalid'}, 400);
  state.researchActors ||= {};
  const attempt = Object.hasOwn(state.attempts, command.requestId) ? state.attempts[command.requestId] : null;
  if (command.action === 'reserveResearch') {
    if (!validId(command.actorId) || !validShare(command.actorCapMicroUsd)
        || command.month !== researchMonth(new Date(now))) return result(previousState, {ok:false,error:'invalid'}, 400);
    // Replaying a reservation must never authorize a second provider call.
    if (attempt) return result(state, {ok:false,status:'duplicate'}, 409);
    if (state.accountingHold) return result(state, {ok:false,status:'accounting_hold'}, 503);
    const pace = researchPace(now);
    const actor = state.researchActors[command.actorId] || {reservedMicroUsd:0,pending:null};
    if (actor.pending?.expiresAt > now) return result(state, {
      ok:false,status:'in_progress',retryAt:new Date(actor.pending.expiresAt).toISOString()
    }, 429);
    const amount = MISS_JEEVES_RESERVATION_MICRO_USD;
    if (state.overrun || state.reservedMicroUsd + amount > MISS_JEEVES_MONTHLY_CAP_MICRO_USD) {
      return result(state, {ok:false,status:'cap',retryAt:pace.nextMonth}, 429);
    }
    if (actor.reservedMicroUsd + amount > command.actorCapMicroUsd) {
      return result(state, {ok:false,status:'actor_share',retryAt:pace.nextMonth}, 429);
    }
    if (state.reservedMicroUsd + amount > pace.cap) {
      // Unused capacity carries forward: this ceiling grows through the month.
      return result(state, {ok:false,status:'pace',retryAt:pace.tomorrow}, 429);
    }
    state.attempts[command.requestId] = {actorId:command.actorId,amountMicroUsd:amount,at:now};
    state.reservedMicroUsd += amount;
    actor.reservedMicroUsd += amount;
    actor.pending = {requestId:command.requestId,expiresAt:now + PENDING_MS};
    state.researchActors[command.actorId] = actor;
    return result(state, {ok:true,status:'reserved'});
  }
  if (!attempt?.actorId || !state.researchActors[attempt.actorId]) {
    return result(state, {ok:false,error:'missing_reservation'}, 409);
  }
  const actor = state.researchActors[attempt.actorId];
  if (command.action === 'holdResearch') {
    state.accountingHold = true;
    return result(state, {ok:true,status:'held'});
  }
  if (command.action === 'settleResearch') {
    if (!Number.isSafeInteger(command.amountMicroUsd) || command.amountMicroUsd < 0) {
      return result(state, {ok:false,error:'invalid'}, 400);
    }
    if (attempt.released) return result(state, {ok:false,error:'released_attempt'}, 409);
    if (attempt.settled) return result(state, {ok:true,status:'already_settled'});
    const delta = command.amountMicroUsd - attempt.amountMicroUsd;
    if (!Number.isSafeInteger(state.reservedMicroUsd + delta) || !Number.isSafeInteger(actor.reservedMicroUsd + delta)) {
      return result(state, {ok:false,error:'invalid'}, 400);
    }
    state.reservedMicroUsd += delta;
    actor.reservedMicroUsd += delta;
    if (delta > 0) state.overrun = true;
    attempt.amountMicroUsd = command.amountMicroUsd;
    attempt.settled = true;
    return result(state, {ok:true,status:state.overrun?'overrun':'settled'});
  }
  if (command.action === 'finishResearch') {
    if (command.used !== true && command.used !== false) return result(state, {ok:false,error:'invalid'}, 400);
    if (command.used && !/^[a-f0-9]{64}$/.test(command.answerHash || '')) return result(state, {ok:false,error:'invalid'}, 400);
    if (command.releaseBudget && (command.used || attempt.settled)) return result(state, {ok:false,error:'incurred_cost_cannot_release'}, 409);
    if (attempt.finished) {
      const same = attempt.used === command.used && (!command.used || attempt.answerHash === command.answerHash);
      return result(state, {ok:same,status:same?'already_finished':'conflict'}, same?200:409);
    }
    if (command.releaseBudget) {
      state.reservedMicroUsd -= attempt.amountMicroUsd;
      actor.reservedMicroUsd -= attempt.amountMicroUsd;
      attempt.amountMicroUsd = 0;
      attempt.released = true;
    }
    // Finishing/timing out a request frees its slot, never its unknown cost.
    if (actor.pending?.requestId === command.requestId) actor.pending = null;
    attempt.finished = true;
    attempt.used = command.used;
    if (command.used) attempt.answerHash = command.answerHash;
    return result(state, {ok:true,status:'finished'});
  }
  return result(previousState, {ok:false,error:'action'}, 400);
}
