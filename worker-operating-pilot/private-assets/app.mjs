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
const inboxCount = document.querySelector('#inbox-count');
const attentionCount = document.querySelector('#attention-count');
const closedCount = document.querySelector('#closed-count');
const filters = {
  all: document.querySelector('#filter-all'),
  attention: document.querySelector('#filter-attention'),
  closed: document.querySelector('#filter-closed')
};
const receiptDetails = document.querySelector('#receipt-details');
const receiptValue = document.querySelector('#receipt-value');

let inboxBusy = false;
let frozenInput = null;
let latestRows = [];
let hasLoaded = false;
let activeFilter = 'all';

function setPrivateControls(enabled) {
  fields.disabled = !enabled;
  refreshButton.disabled = !enabled;
  for (const button of Object.values(filters)) button.disabled = !enabled;
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

function setIntakeMessage(message, state = 'info') {
  intakeStatus.dataset.state = state;
  intakeStatus.textContent = message;
}

function statusLabel(status) {
  return ({ filed: 'New', triaged: 'Reviewed', addressed: 'Addressed', ignored: 'No action', 'deb-flected': 'Referred' })[status] || 'Unknown';
}

function humanDate(value) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function newestFirst(left, right) {
  const leftTime = Date.parse(left.submitted_at) || 0;
  const rightTime = Date.parse(right.submitted_at) || 0;
  return rightTime - leftTime;
}

function makeReviewButton(row, status, label) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
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

function visibleRows() {
  if (activeFilter === 'attention') return latestRows.filter(row => row.status === 'filed' || row.status === 'triaged');
  if (activeFilter === 'closed') return latestRows.filter(row => row.status !== 'filed' && row.status !== 'triaged');
  return latestRows;
}

function updateCounts() {
  const attention = latestRows.filter(row => row.status === 'filed' || row.status === 'triaged').length;
  inboxCount.textContent = String(latestRows.length);
  attentionCount.textContent = String(attention);
  closedCount.textContent = String(latestRows.length - attention);
}

function renderInbox() {
  feedbackList.replaceChildren();
  if (!hasLoaded) return;
  const visible = visibleRows();
  if (!visible.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = activeFilter === 'attention' ? 'Nothing needs attention.' : activeFilter === 'closed' ? 'No closed notes yet.' : 'Your inbox is ready for its first test note.';
    feedbackList.append(empty);
  }
  for (const row of visible) {
    const article = document.createElement('article');
    article.className = 'message-card';
    const top = document.createElement('div');
    top.className = 'card-top';
    const typeBadge = document.createElement('span');
    typeBadge.className = 'type-badge';
    typeBadge.textContent = row.submission_type || 'feedback';
    const statusBadge = document.createElement('span');
    statusBadge.className = 'status-badge';
    statusBadge.dataset.status = row.status || '';
    statusBadge.textContent = statusLabel(row.status);
    top.append(typeBadge, statusBadge);
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = row.subject || 'Untitled note';
    const date = document.createElement('time');
    date.className = 'card-date';
    if (row.submitted_at) date.dateTime = row.submitted_at;
    date.textContent = humanDate(row.submitted_at);
    const message = document.createElement('p');
    message.className = 'card-body';
    message.textContent = row.body || '';
    const actions = document.createElement('div');
    actions.className = 'card-actions';
    const next = row.status === 'filed'
      ? [['triaged', 'Mark reviewed']]
      : row.status === 'triaged'
        ? [['addressed', 'Mark addressed'], ['no_action', 'No action needed'], ['referred', 'Refer']]
        : [];
    for (const [status, label] of next) actions.append(makeReviewButton(row, status, label));
    article.append(top, title, date, message, actions);
    feedbackList.append(article);
  }
}

function setFilter(filter) {
  activeFilter = filter;
  for (const [name, button] of Object.entries(filters)) button.setAttribute('aria-pressed', String(name === activeFilter));
  renderInbox();
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
    latestRows = [...rows].sort(newestFirst);
    hasLoaded = true;
    updateCounts();
    renderInbox();
    inboxStatus.textContent = latestRows.length ? 'Inbox updated.' : 'No active feedback.';
    tokenNote.textContent = 'Private access';
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
    setIntakeMessage('Your note is in the inbox.', 'success');
    receiptValue.textContent = `${receipt.receipt_id} · ${humanDate(receipt.accepted_at)}`;
    receiptDetails.hidden = false;
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
    setIntakeMessage(message, 'error');
  } finally {
    fields.disabled = false;
    setDraftFrozen(Boolean(frozenInput));
  }
});

refreshButton.addEventListener('click', refreshInbox);
for (const [filter, button] of Object.entries(filters)) button.addEventListener('click', () => setFilter(filter));
updateCounts();
setFilter('all');

if (!ownerToken) {
  setPrivateControls(false);
  tokenNote.textContent = 'This private link is incomplete. Open the complete private link.';
  setIntakeMessage('Private inbox unavailable.');
  inboxStatus.textContent = 'Private inbox unavailable.';
} else {
  setPrivateControls(true);
  void refreshInbox();
}
