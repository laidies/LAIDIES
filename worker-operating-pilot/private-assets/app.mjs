import { createFeedbackClient, FeedbackClientError } from '/private-feedback/feedback-client.mjs';

// The private link carries its bearer capability in the fragment so it never
// reaches the server as part of an HTTP request. Keep it only in this module
// closure and remove it from the visible URL as soon as this module starts.
const fragment = window.location.hash.slice(1);
const ownerToken = /^[a-f0-9]{64}$/.test(fragment) ? fragment : null;
window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);

const form = document.querySelector('#intake-form');
const fields = document.querySelector('#intake-fields');
const type = document.querySelector('#submission-type');
const subject = document.querySelector('#subject');
const body = document.querySelector('#body');
const intakeStatus = document.querySelector('#intake-status');
const tokenNote = document.querySelector('#token-note');
const refreshButton = document.querySelector('#refresh-button');
const inboxStatus = document.querySelector('#inbox-status');
const feedbackList = document.querySelector('#feedback-list');

let inboxBusy = false;
let frozenInput = null;

function setPrivateControls(enabled) {
  fields.disabled = !enabled;
  refreshButton.disabled = !enabled;
  if (!enabled) {
    type.disabled = true;
    subject.disabled = true;
    body.disabled = true;
  }
}

function setDraftFrozen(frozen) {
  type.disabled = frozen;
  subject.disabled = frozen;
  body.disabled = frozen;
}

function sameOriginPath(path) {
  const target = new URL(path, window.location.origin);
  if (target.origin !== window.location.origin) throw new Error('Private inbox endpoint rejected');
  return `${target.pathname}${target.search}`;
}

async function authorizedFetch(path, options = {}) {
  if (!ownerToken) throw new Error('Private inbox link required');
  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${ownerToken}`);
  return fetch(sameOriginPath(path), {
    ...options,
    headers,
    credentials: 'omit',
    redirect: 'error'
  });
}

const client = createFeedbackClient({
  endpoint: '/private-feedback/api/intake',
  getChallengeToken: async () => 'private-owner',
  fetcher: authorizedFetch
});

function setIntakeMessage(message) {
  intakeStatus.textContent = message;
}

function makeReviewButton(row, status) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = status.replace('_', ' ');
  button.addEventListener('click', async () => {
    button.disabled = true;
    inboxStatus.textContent = 'Updating feedback…';
    try {
      const response = await authorizedFetch('/private-feedback/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: row.id, status }),
        signal: AbortSignal.timeout(7000)
      });
      if (!response.ok) throw new Error('review rejected');
      await refreshInbox();
    } catch {
      inboxStatus.textContent = 'Update was not confirmed. Refresh the inbox before retrying.';
      button.disabled = false;
    }
  });
  return button;
}

function renderInbox(rows) {
  feedbackList.replaceChildren();
  for (const row of rows) {
    const article = document.createElement('article');
    const heading = document.createElement('h3');
    heading.textContent = `${row.submission_type} — ${row.status}`;
    const when = document.createElement('p');
    when.textContent = `Received: ${row.submitted_at || 'time unavailable'}`;
    const subjectLine = document.createElement('p');
    subjectLine.textContent = row.subject || '(No subject)';
    const message = document.createElement('p');
    message.textContent = row.body || '';
    article.append(heading, when, subjectLine, message);
    const next = row.status === 'filed' ? ['triaged'] : row.status === 'triaged' ? ['addressed', 'no_action', 'referred'] : [];
    if (next.length) {
      const actions = document.createElement('p');
      actions.textContent = 'Set status: ';
      for (const status of next) actions.append(makeReviewButton(row, status));
      article.append(actions);
    }
    feedbackList.append(article);
  }
}

async function refreshInbox() {
  if (!ownerToken || inboxBusy) return;
  inboxBusy = true;
  refreshButton.disabled = true;
  inboxStatus.textContent = 'Loading inbox…';
  try {
    const response = await authorizedFetch('/private-feedback/api/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ limit: 25 }),
      signal: AbortSignal.timeout(7000)
    });
    if (!response.ok) throw new Error('inbox rejected');
    const rows = await response.json();
    if (!Array.isArray(rows)) throw new Error('invalid inbox response');
    renderInbox(rows);
    inboxStatus.textContent = rows.length ? `${rows.length} feedback item(s).` : 'No active feedback.';
  } catch {
    inboxStatus.textContent = 'Inbox could not be refreshed. Try again.';
  } finally {
    inboxBusy = false;
    refreshButton.disabled = false;
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!ownerToken) return;
  fields.disabled = true;
  setIntakeMessage('Sending private note…');
  try {
    const input = frozenInput || {
      submission_type: type.value,
      subject: subject.value,
      body: body.value
    };
    const receipt = await client.submit(input);
    frozenInput = null;
    setDraftFrozen(false);
    form.reset();
    setIntakeMessage(`Accepted. Receipt ${receipt.receipt_id}, ${receipt.accepted_at}.`);
    await refreshInbox();
  } catch (error) {
    if (error instanceof FeedbackClientError && error.message === 'uncertain') {
      frozenInput = Object.freeze({
        submission_type: type.value,
        subject: subject.value,
        body: body.value
      });
    }
    const message = error instanceof FeedbackClientError && error.message === 'pending_different_message'
      ? 'The pending note has different text. Restore its draft before retrying.'
      : error instanceof FeedbackClientError && error.message === 'busy'
        ? 'A request is already in progress.'
        : frozenInput
          ? 'Acceptance was not confirmed. This note is locked in this tab; retry it unchanged.'
          : 'The note was not accepted. You can correct it and try again.';
    setIntakeMessage(message);
  } finally {
    fields.disabled = false;
    setDraftFrozen(Boolean(frozenInput));
  }
});

refreshButton.addEventListener('click', refreshInbox);

if (!ownerToken) {
  setPrivateControls(false);
  tokenNote.textContent = 'This private inbox link is missing its access token. Use the complete private link.';
  setIntakeMessage('Private inbox unavailable.');
  inboxStatus.textContent = 'Private inbox unavailable.';
} else {
  tokenNote.textContent = 'Private access link accepted for this browser session.';
  setPrivateControls(true);
  void refreshInbox();
}
