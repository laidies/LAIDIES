// The application ledger complements the provider project's enforced limit.
// A reservation is a conservative allowance, not a proven maximum hosted-tool bill.
export const MISS_JEEVES_MONTHLY_CAP_MICRO_USD = 100_000_000;
export const MISS_JEEVES_RESERVATION_MICRO_USD = 3_000_000;
export const MISS_JEEVES_PRICE_REVIEW_THROUGH = '2026-11-20';
export function researchBudgetConfigured(env, now = new Date()) {
  return env.MISS_JEEVES_RESEARCH_ENABLED === 'true'
    && env.MISS_JEEVES_PROVIDER_LIMIT_VERIFIED === 'true'
    && Number(env.MISS_JEEVES_MONTHLY_CAP_MICRO_USD) === MISS_JEEVES_MONTHLY_CAP_MICRO_USD
    && now.toISOString().slice(0,10) <= MISS_JEEVES_PRICE_REVIEW_THROUGH;
}
export function researchMonth(now = new Date()) { return now.toISOString().slice(0,7); }

// Use the non-promotional list rates conservatively, ignoring cached-token discounts.
// Usage includes reasoning output; always allow for both permitted web searches.
export function researchChargeMicroUsd(data) {
  const input = data?.usage?.input_tokens;
  const output = data?.usage?.output_tokens;
  if (!Number.isSafeInteger(input) || input < 0 || !Number.isSafeInteger(output) || output < 0) return null;
  if (!/^gpt-5\.6-sol(?:-\d{4}-\d{2}-\d{2})?$/.test(data?.model || '')) return null;
  const long = input > 272000;
  const charge = Math.ceil(input * (long ? 12.5 : 6.25) + output * (long ? 45 : 30) + 20000);
  return Number.isSafeInteger(charge) ? charge : null;
}
