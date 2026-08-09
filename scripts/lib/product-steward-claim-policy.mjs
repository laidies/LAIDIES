function asTime(value) {
  const timestamp = Date.parse(value || '');
  return Number.isFinite(timestamp) ? timestamp : null;
}

function scopeRoot(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const normalized = value.replaceAll('\\', '/').replace(/\/(?:\*|\*\*)$/, '').replace(/\/$/, '');
  if (normalized.includes('*')) return null;
  return normalized;
}

function scopesOverlap(left, right) {
  return left === right || left.startsWith(`${right}/`) || right.startsWith(`${left}/`);
}

export function validateRunQueueClaims(queue, { now = new Date() } = {}) {
  const errors = [];
  const policy = queue.claim_policy;
  if (!policy || policy.schema_version !== 1) return ['claim_policy schema_version 1 is required'];
  if (!Number.isFinite(policy.claim_ttl_hours) || policy.claim_ttl_hours <= 0 || policy.claim_ttl_hours > 8) {
    errors.push('claim_policy claim_ttl_hours must be between 0 and 8');
  }
  if (!Number.isFinite(policy.heartbeat_stale_minutes) || policy.heartbeat_stale_minutes <= 0) {
    errors.push('claim_policy heartbeat_stale_minutes must be positive');
  }
  if (policy.pull_mode !== 'EXPLICIT_SESSION_CLAIM_ONLY_WHILE_DISPATCHER_PAUSED') {
    errors.push('claim_policy pull_mode must preserve the paused dispatcher boundary');
  }
  if (!policy.expiry_action) errors.push('claim_policy expiry_action is required');

  const nowMs = now.getTime();
  const active = queue.active || [];
  const claims = [];
  for (const item of active) {
    for (const field of ['claim_id', 'claimed_at', 'expires_at', 'heartbeat_at']) {
      if (!item[field]) errors.push(`${item.product_id || 'unknown product'} active claim missing ${field}`);
    }
    const claimedAt = asTime(item.claimed_at);
    const expiresAt = asTime(item.expires_at);
    const heartbeatAt = asTime(item.heartbeat_at);
    if (item.claimed_at && claimedAt === null) errors.push(`${item.product_id} claimed_at is invalid`);
    if (item.expires_at && expiresAt === null) errors.push(`${item.product_id} expires_at is invalid`);
    if (item.heartbeat_at && heartbeatAt === null) errors.push(`${item.product_id} heartbeat_at is invalid`);
    if (claimedAt !== null && expiresAt !== null) {
      const durationHours = (expiresAt - claimedAt) / 3_600_000;
      if (durationHours <= 0 || durationHours > policy.claim_ttl_hours) {
        errors.push(`${item.product_id} claim exceeds claim_ttl_hours`);
      }
      if (nowMs > expiresAt) errors.push(`${item.product_id} claim expired at ${item.expires_at}`);
    }
    if (heartbeatAt !== null && nowMs - heartbeatAt > policy.heartbeat_stale_minutes * 60_000) {
      errors.push(`${item.product_id} heartbeat is stale`);
    }
    const roots = [];
    for (const scope of item.write_scope || []) {
      const root = scopeRoot(scope);
      if (!root) errors.push(`${item.product_id} has unsupported write_scope ${scope}`);
      else roots.push(root);
    }
    claims.push({ productId: item.product_id, roots });
  }

  for (let leftIndex = 0; leftIndex < claims.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < claims.length; rightIndex += 1) {
      const left = claims[leftIndex];
      const right = claims[rightIndex];
      for (const leftRoot of left.roots) {
        for (const rightRoot of right.roots) {
          if (scopesOverlap(leftRoot, rightRoot)) {
            errors.push(`${left.productId} and ${right.productId} have colliding write_scope ${leftRoot} <> ${rightRoot}`);
          }
        }
      }
    }
  }
  return errors;
}
