// Approved local advice target. Classifier selection is a separate decision.
export const ADVICE_MODEL = 'gpt-5.6-sol';
export const ADVICE_MAX_COMPLETION_TOKENS = 8192;
// Leave enough room for the measured Sol/medium tail while keeping one bounded
// provider attempt. The browser waits two seconds longer so this service can
// return its truthful no-charge failure state first.
export const ADVICE_TIMEOUT_MS = 30000;
export const ADVICE_MAX_RESPONSE_BYTES = 131072;

export function buildAdviceRequest(env, messages, structured = true) {
  const model = env.FAIRY_BETA_ENABLED === 'true'
    ? ADVICE_MODEL
    : typeof env.ANSWER_MODEL === 'string' && env.ANSWER_MODEL.trim()
    ? env.ANSWER_MODEL.trim() : ADVICE_MODEL;
  const common = { model, messages, ...(structured ? { response_format: { type: 'json_object' } } : {}) };
  if (model === ADVICE_MODEL) {
    return { ...common, reasoning_effort: 'medium',
      max_completion_tokens: ADVICE_MAX_COMPLETION_TOKENS,
      store: false, service_tier: 'default', n: 1 };
  }
  // Explicit historical/test overrides retain their request shape. Never retry
  // with this path after a Sol error. No new model is selected by the client.
  return { ...common, max_tokens: structured ? 1500 : 800,
    temperature: 0.55, frequency_penalty: 0.3, presence_penalty: 0.1 };
}

export function isCompleteAdviceCompletion(data, model) {
  if (!Array.isArray(data?.choices) || data.choices.length !== 1) return false;
  const choice = data.choices[0], message = choice?.message;
  if (!message || typeof message.content !== 'string' || !message.content.trim() ||
      message.refusal || message.function_call || message.tool_calls?.length) return false;
  if (choice.finish_reason !== undefined && choice.finish_reason !== 'stop') return false;
  // Real Sol receipts must name the requested model and confirm completion.
  // Old synthetic fixture envelopes omit these; don't rewrite historical tests.
  return model !== ADVICE_MODEL || (data.model === ADVICE_MODEL &&
    choice.finish_reason === 'stop' && message.role === 'assistant');
}

async function boundedJSON(response, signal) {
  if (!response.body) throw new Error('advice_missing_body');
  const reader = response.body.getReader();
  const cancel = () => { void reader.cancel().catch(() => {}); };
  signal.addEventListener('abort', cancel, { once: true });
  if (signal.aborted) cancel();
  const chunks = []; let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > ADVICE_MAX_RESPONSE_BYTES) {
        await reader.cancel(); throw new Error('advice_response_too_large');
      }
      chunks.push(value);
    }
  } finally { signal.removeEventListener('abort', cancel); reader.releaseLock(); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function requestAdviceCompletion(env, messages, structured = true) {
  const body = buildAdviceRequest(env, messages, structured);
  const controller = new AbortController(); let timer;
  const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      const error = new Error('advice_timeout'); error.name = 'AbortError'; reject(error);
    }, ADVICE_TIMEOUT_MS);
  });
  try {
    return await Promise.race([deadline, (async () => {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.OPENAI_API_KEY}` },
        body: JSON.stringify(body), signal: controller.signal, redirect: 'manual'
      });
      if (response.status >= 300 && response.status < 400) {
        await response.body?.cancel();
        throw new Error('advice_redirect_rejected');
      }
      if (!response.ok) { await response.body?.cancel(); return { ok: false, status: response.status }; }
      const data = await boundedJSON(response, controller.signal);
      if (!isCompleteAdviceCompletion(data, body.model)) throw new Error('advice_incomplete_or_refused');
      return { ok: true, status: response.status, data };
    })()]);
  } finally { clearTimeout(timer); }
}
