const PENDING_MS = 2 * 60 * 1000;

function validId(value, maximum = 160) {
  return typeof value === "string" && /^[A-Za-z0-9:_-]+$/.test(value) &&
    value.length >= 8 && value.length <= maximum;
}

function actorState(state) {
  return state || { successfulCases: 0, pendingCases: {}, completedRequests: {}, cases: {} };
}

function pruneActor(state, now) {
  for (const [requestId, pending] of Object.entries(state.pendingCases || {})) {
    if (!pending || pending.expiresAt <= now) delete state.pendingCases[requestId];
  }
  for (const record of Object.values(state.cases || {})) {
    if (record?.pendingFitting?.expiresAt <= now) record.pendingFitting = null;
  }
}

function result(state, body, status = 200) {
  return { state, body, status };
}

export function applyLedgerAction(previousState, command, now = Date.now()) {
  const action = command?.action;
  if (action === "reserveBudget") {
    if (!validId(command.requestId) || !Number.isInteger(command.amountMicroUsd) ||
        command.amountMicroUsd <= 0 || !Number.isInteger(command.capMicroUsd) ||
        command.capMicroUsd <= 0) return result(previousState, { ok: false, error: "invalid" }, 400);
    const state = previousState || { reservedMicroUsd: 0, attempts: {} };
    if (state.attempts[command.requestId]) {
      return result(state, { ok: true, status: "replay", reservedMicroUsd: state.reservedMicroUsd });
    }
    if (state.reservedMicroUsd + command.amountMicroUsd > command.capMicroUsd) {
      return result(state, { ok: false, status: "cap", reservedMicroUsd: state.reservedMicroUsd }, 429);
    }
    state.attempts[command.requestId] = { amountMicroUsd: command.amountMicroUsd, at: now };
    state.reservedMicroUsd += command.amountMicroUsd;
    return result(state, { ok: true, status: "reserved", reservedMicroUsd: state.reservedMicroUsd });
  }
  if (action === "releaseBudget") {
    if (!validId(command.requestId)) return result(previousState, { ok: false, error: "invalid" }, 400);
    const state = previousState || { reservedMicroUsd: 0, attempts: {} };
    const attempt = state.attempts[command.requestId];
    if (!attempt) return result(state, { ok: true, status: "already_released", reservedMicroUsd: state.reservedMicroUsd });
    state.reservedMicroUsd = Math.max(0, state.reservedMicroUsd - attempt.amountMicroUsd);
    delete state.attempts[command.requestId];
    return result(state, { ok: true, status: "released", reservedMicroUsd: state.reservedMicroUsd });
  }

  const state = actorState(previousState);
  pruneActor(state, now);
  if (action === "beginCase" || action === "beginAnswer") {
    const maximum = action === "beginAnswer" ? 5 : 3;
    if (!validId(command.requestId) || !Number.isInteger(command.limit) || command.limit < 1 || command.limit > maximum) {
      return result(state, { ok: false, error: "invalid" }, 400);
    }
    if (state.completedRequests[command.requestId]) {
      return result(state, { ok: true, status: "complete", ...state.completedRequests[command.requestId] });
    }
    if (state.pendingCases[command.requestId]) return result(state, { ok: true, status: "pending" });
    const pendingCount = Object.keys(state.pendingCases).length;
    if (state.successfulCases + pendingCount >= command.limit) {
      return result(state, { ok: false, status: "limit", remaining: Math.max(0, command.limit - state.successfulCases) }, 429);
    }
    state.pendingCases[command.requestId] = { expiresAt: now + PENDING_MS, limit: command.limit };
    return result(state, { ok: true, status: "reserved", remaining: Math.max(0, command.limit - state.successfulCases - 1) });
  }
  if (action === "abortCase") {
    if (validId(command.requestId)) delete state.pendingCases[command.requestId];
    return result(state, { ok: true, status: "released" });
  }
  if (action === "commitCase") {
    if (!validId(command.requestId) || !validId(command.caseId) ||
        !/^[a-f0-9]{64}$/.test(command.answerHash || "") || !state.pendingCases[command.requestId]) {
      return result(state, { ok: false, error: "invalid_or_unreserved" }, 409);
    }
    const pending = state.pendingCases[command.requestId];
    delete state.pendingCases[command.requestId];
    state.successfulCases += 1;
    const receipt = { caseId: command.caseId, version: 1, fittingsUsed: 0,
      remaining: Math.max(0, pending.limit - state.successfulCases) };
    state.cases[command.caseId] = { version: 1, answerHash: command.answerHash, fittingsUsed: 0, pendingFitting: null };
    state.completedRequests[command.requestId] = receipt;
    return result(state, { ok: true, status: "committed", ...receipt });
  }
  if (action === "beginFitting") {
    if (!validId(command.requestId) || !validId(command.caseId) || !Number.isInteger(command.expectedVersion) ||
        !/^[a-f0-9]{64}$/.test(command.answerHash || "")) return result(state, { ok: false, error: "invalid" }, 400);
    const record = state.cases[command.caseId];
    if (!record || record.version !== command.expectedVersion || record.answerHash !== command.answerHash) {
      return result(state, { ok: false, status: "stale_or_unknown" }, 409);
    }
    if (record.fittingsUsed >= 3) return result(state, { ok: false, status: "fitting_limit" }, 429);
    if (record.pendingFitting && record.pendingFitting.requestId !== command.requestId) {
      return result(state, { ok: false, status: "fitting_in_progress" }, 409);
    }
    if (!record.pendingFitting) record.pendingFitting = { requestId: command.requestId, expiresAt: now + PENDING_MS };
    return result(state, { ok: true, status: "reserved", fittingsRemaining: 3 - record.fittingsUsed - 1 });
  }
  if (action === "abortFitting") {
    const record = state.cases[command.caseId];
    if (record?.pendingFitting?.requestId === command.requestId) record.pendingFitting = null;
    return result(state, { ok: true, status: "released" });
  }
  if (action === "commitFitting") {
    const record = state.cases[command.caseId];
    if (!record || record.pendingFitting?.requestId !== command.requestId ||
        !/^[a-f0-9]{64}$/.test(command.answerHash || "")) {
      return result(state, { ok: false, error: "invalid_or_unreserved" }, 409);
    }
    record.version += 1;
    record.answerHash = command.answerHash;
    record.fittingsUsed += 1;
    record.pendingFitting = null;
    return result(state, { ok: true, status: "committed", caseId: command.caseId,
      version: record.version, fittingsUsed: record.fittingsUsed,
      fittingsRemaining: 3 - record.fittingsUsed });
  }
  return result(state, { ok: false, error: "action" }, 400);
}
