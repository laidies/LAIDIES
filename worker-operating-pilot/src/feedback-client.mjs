import { validateSubmissionInput, canonicalSubmissionDigest, validateAcceptedReceipt } from './feedback-contract.mjs';

const STORAGE_KEY = 'laidies.feedback.pending.v1';
export class FeedbackClientError extends Error {}

// The draft stays in the form/in memory. Only a random retry key and digest are
// kept in session storage, so reload cannot silently create a duplicate key.
export function createFeedbackClient({ endpoint, getChallengeToken, storage = sessionStorage, fetcher = fetch, timeoutMs = 7000 }) {
  let busy = false;
  let accepted = null;
  return {
    async submit(rawInput) {
      if (busy) throw new FeedbackClientError('busy');
      busy = true;
      try {
        const input = validateSubmissionInput(rawInput);
        const digest = await canonicalSubmissionDigest(input);
        if (accepted?.input_sha256 === digest) return accepted;
        let pending;
        try {
          const saved = storage.getItem(STORAGE_KEY);
          pending = saved ? JSON.parse(saved) : null;
          if (pending && (!/^[a-f0-9]{64}$/.test(pending.digest) || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(pending.key))) throw new Error();
          if (pending && pending.digest !== digest) throw new FeedbackClientError('pending_different_message');
          pending ||= { key: crypto.randomUUID(), digest };
          storage.setItem(STORAGE_KEY, JSON.stringify(pending));
        } catch (error) {
          throw error instanceof FeedbackClientError ? error : new FeedbackClientError('retry_storage_unavailable');
        }
        const controller = new AbortController();
        let timer;
        const deadline = new Promise((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new FeedbackClientError('uncertain')); }, timeoutMs); });
        try {
          return await Promise.race([deadline, (async () => {
          const token = await getChallengeToken({ signal: controller.signal });
          controller.signal.throwIfAborted();
          const response = await fetcher(endpoint, {
            method: 'POST', credentials: 'omit', redirect: 'error', signal: controller.signal,
            headers: { 'Content-Type': 'application/json', 'Idempotency-Key': pending.key, 'X-Turnstile-Token': token },
            body: JSON.stringify(input)
          });
          // Receipt/error responses are deliberately tiny; stream before parsing.
          const reader = response.body?.getReader();
          if (!reader) throw new FeedbackClientError('uncertain');
          let text = '', bytes = 0;
          const decoder = new TextDecoder('utf-8', { fatal: true });
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              bytes += value.byteLength;
              if (bytes > 1024) { await reader.cancel(); throw new FeedbackClientError('uncertain'); }
              text += decoder.decode(value, { stream: true });
            }
            text += decoder.decode();
          } finally { reader.releaseLock(); }
          const result = JSON.parse(text);
          if (!response.ok) throw new FeedbackClientError(response.status === 429 ? 'rate_limited' : response.status === 403 ? 'challenge_failed' : response.status === 409 ? 'conflict' : 'uncertain');
          controller.signal.throwIfAborted();
          accepted = validateAcceptedReceipt(result, digest);
          try { storage.removeItem(STORAGE_KEY); } catch { /* Same key remains safe to replay. */ }
          return accepted;
          })()]);
        } catch (error) {
          throw error instanceof FeedbackClientError ? error : new FeedbackClientError('uncertain');
        } finally { clearTimeout(timer); }
      } finally { busy = false; }
    }
  };
}
