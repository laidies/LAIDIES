const MAX_QUERY_LENGTH = 240;
const AI_MODEL = '@cf/google/gemma-4-26b-a4b-it';
const LIBRARY_ENTRY_ALLOWLIST = new Set([
  'book-ai-fundamentals-101',
  'book-working-with-ai-101',
  'ref-straight-answers',
  'book-ai-dictionary',
  'concept-generative',
  'concept-prompt',
  'concept-hallucination',
  'concept-model',
  'concept-context',
  'concept-token',
  'concept-agent'
]);
const STOPWORDS = new Set(['a','ai','an','and','are','can','could','do','does','for','how','i','important','in','is','it','me','my','of','on','or','should','so','take','the','to','use','what','which','why','will','with','you']);
const TOPIC_RULES = [
  ['compute-chips-gpus', /\b(chip|chips|gpu|gpus|cpu|cpus|accelerator|accelerators|semiconductor|semiconductors|compute|data[ -]?centre|data[ -]?center)\b/i],
  ['context-tokens-memory', /\b(token|tokens|context|context window|memory)\b/i],
  ['prompting', /\b(prompt|prompts|prompting|instruction|instructions)\b/i],
  ['verification-misinformation', /\b(hallucination|hallucinations|verify|verification|truth|true|false|source|sources|misinformation|check)\b/i],
  ['privacy-security', /\b(private|privacy|personal data|security|secure|paste|confidential|password|copyright)\b/i],
  ['tools-model-selection', /\b(chatgpt|claude|gemini|model|models|tool|tools|which ai|choose ai)\b/i],
  ['women-ai-history', /\b(woman|women|female|maven|mavens|trailblazer|trailblazers|history)\b/i],
  ['work-career', /\b(work|job|jobs|career|careers|office|workplace|manager|management)\b/i],
  ['agents-automation', /\b(agent|agents|agentic|automation|automate|workflow|workflows)\b/i],
  ['accounts-setup-access', /\b(account|accounts|login|log in|sign in|setup|set up|access|subscription)\b/i],
  ['ai-news-policy', /\b(news|today|latest|law|laws|policy|regulation|regulations)\b/i],
  ['ai-concepts', /\b(ai|artificial intelligence|machine learning|llm|llms|model|models|training|prediction)\b/i]
];
const TOPIC_IDS = new Set([...TOPIC_RULES.map(([id]) => id), 'other']);

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    }
  });
}

function normalize(value) {
  return String(value || '').trim().toLowerCase().replace(/[’]/g, "'").replace(/\bwhat's\b/g, 'what is').replace(/[?!.]+$/g, '');
}

function tokens(value) {
  return normalize(value).split(/\s+/).map(token => token.replace(/[^a-z0-9-]/g, '')).filter(token => token.length > 1 && !STOPWORDS.has(token));
}

function classifyTopic(query, matches = []) {
  const evidence = `${query} ${matches.slice(0, 4).flatMap(match => [match.entry?.title, ...(match.entry?.topics || [])]).join(' ')}`;
  return TOPIC_RULES.find(([, pattern]) => pattern.test(evidence))?.[0] || 'other';
}

function safeEntry(entry) {
  if (!entry || entry.status !== 'live' || typeof entry.url !== 'string' || !entry.url.startsWith('/') || entry.url.startsWith('//')) return false;
  if (entry.url.startsWith('/grimoire/')) return false;
  if (entry.url.startsWith('/library.html')) {
    let libraryUrl;
    try { libraryUrl = new URL(entry.url, 'https://laidies.invalid'); } catch { return false; }
    if (!LIBRARY_ENTRY_ALLOWLIST.has(entry.id)) return false;
  }
  return typeof entry.id === 'string' && typeof entry.title === 'string' && typeof entry.summary === 'string' && Array.isArray(entry.topics) && Array.isArray(entry.aliases);
}

function retrieve(query, entries) {
  const normalized = normalize(query);
  const queryTokens = tokens(normalized);
  return entries.filter(safeEntry).map(entry => {
    const title = entry.title.toLowerCase();
    const aliases = entry.aliases.map(alias => String(alias).toLowerCase());
    const topics = entry.topics.map(topic => String(topic).toLowerCase());
    const searchable = [title, entry.summary, aliases.join(' '), topics.join(' ')].join(' ').toLowerCase();
    const searchableTokens = new Set(tokens(searchable));
    const titleTokens = new Set(tokens(title));
    const topicTokens = new Set(tokens(topics.join(' ')));
    let score = 0;
    for (const alias of aliases) {
      if (alias === normalized) score += 12;
      else if (alias.includes(normalized) || normalized.includes(alias)) score += 6;
    }
    if (title.includes(normalized)) score += 6;
    for (const token of queryTokens) {
      if (titleTokens.has(token)) score += 4;
      else if (topicTokens.has(token)) score += 3;
      else if (searchableTokens.has(token)) score += 1;
    }
    return { entry, score };
  }).filter(result => result.score > 0).sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title)).slice(0, 6);
}

function hasExactCatalogueMatch(query, matches) {
  const normalized = normalize(query);
  if (/\b(where|find|show)\b/.test(normalized) && matches.length) return true;
  return matches.some(({ entry }) =>
    normalize(entry.title) === normalized ||
    entry.aliases.some(alias => normalize(alias) === normalized) ||
    entry.topics.some(topic => normalize(topic) === normalized)
  );
}

async function loadIndex(request, env) {
  const indexUrl = new URL('/content/site/site-index.json', request.url);
  const response = await env.ASSETS.fetch(new Request(indexUrl, { headers: { accept: 'application/json' } }));
  if (!response.ok) throw new Error('index unavailable');
  const data = await response.json();
  if (!data?._meta || !Array.isArray(data.entries)) throw new Error('index invalid');
  let dailyEntries = [];
  let studyPackEntries = [];
  try {
    const dailyUrl = new URL('/content/newsstand-daily-issues.json', request.url);
    const dailyResponse = await env.ASSETS.fetch(new Request(dailyUrl, { headers: { accept: 'application/json' } }));
    if (dailyResponse.ok) dailyEntries = publishedDailyEntries(await dailyResponse.json());
  } catch {
    dailyEntries = [];
  }
  try {
    const packsUrl = new URL('/content/blend-snap-weekly-packs.json', request.url);
    const packsResponse = await env.ASSETS.fetch(new Request(packsUrl, { headers: { accept: 'application/json' } }));
    if (packsResponse.ok) studyPackEntries = availableStudyPackEntries(await packsResponse.json(), data.entries);
  } catch {
    studyPackEntries = [];
  }
  return [...data.entries, ...dailyEntries, ...studyPackEntries];
}

function publishedDailyEntries(data) {
  if (!data || !Array.isArray(data.issues)) return [];
  return data.issues.flatMap(issue => {
    if (issue?.status !== 'complete' || !Array.isArray(issue.stories) || !Array.isArray(issue.storyIds)) return [];
    return issue.stories.filter(story =>
      story && story.status === 'published' && story.edition === 'daily' &&
      issue.storyIds.includes(story.id) && story.sourceApproval?.status === 'approved' &&
      typeof story.slug === 'string' && /^[a-z0-9-]+$/.test(story.slug) &&
      typeof story.headline === 'string' && typeof story.publishedAt === 'string'
    ).map(story => ({
      id: `daily-${story.id}`,
      title: story.headline,
      url: `/newsstand.html#${story.slug}`,
      type: 'daily',
      section: 'NewsStand · The Daily',
      status: 'live',
      summary: String(story.laidies_read || story.cocktail_party || story.the_story || '').slice(0, 1200),
      topics: Array.isArray(story.tags) ? story.tags.map(tag => String(tag).toLowerCase()).slice(0, 12) : [],
      aliases: [story.headline, ...(Array.isArray(story.tags) ? story.tags : [])].map(String).slice(0, 16),
      publishedAt: story.publishedAt,
      updatedAt: story.updatedAt || story.lastCheckedAt || story.publishedAt
    }));
  });
}

function availableStudyPackEntries(data, catalogueEntries) {
  if (!data || data.manifestId !== 'blend-snap-weekly-packs' || !Array.isArray(data.packs)) return [];
  const liveEpisodes = new Map(catalogueEntries.filter(entry => entry.status === 'live' && entry.type === 'episode')
    .map(entry => [Number(String(entry.id).replace(/^ep-/, '')), entry]));
  return data.packs.flatMap(pack => {
    const episode = liveEpisodes.get(Number(pack?.episodeNumber));
    const ready = Array.isArray(pack?.components)
      ? pack.components.filter(component => component?.status === 'available' && typeof component.route === 'string')
      : [];
    if (!episode || !ready.length || pack.episodeTitle !== episode.title) return [];
    const number = String(pack.episodeNumber).padStart(2, '0');
    return [{
      id: `study-pack-${number}`,
      title: `Episode ${number} Study Pack`,
      url: `/blend-snap.html?episode=${Number(pack.episodeNumber)}#the-study-pack`,
      type: 'study-pack',
      section: 'Blend & Snap',
      status: 'live',
      summary: `Practise and keep Episode ${number} · ${episode.title}. Ready now: ${ready.map(component => component.label).join(', ')}.`,
      topics: [...new Set([...(episode.topics || []), 'study pack', 'practice'])],
      aliases: [...new Set([...(episode.aliases || []), `${episode.title} study pack`, `episode ${number} study pack`])],
      episodeId: episode.id
    }];
  });
}

function publicResult(result) {
  const { entry } = result;
  return {
    id: entry.id,
    title: entry.title,
    url: entry.url,
    type: entry.type,
    section: entry.section,
    summary: entry.summary,
    topics: entry.topics.slice(0, 8),
    ...(entry.episodeId ? { episodeId: entry.episodeId } : {}),
    ...(entry.publishedAt ? { publishedAt: entry.publishedAt } : {}),
    ...(entry.updatedAt ? { updatedAt: entry.updatedAt } : {})
  };
}

function writeQuestionSignal(env, { placement, outcome, topicId = 'other', matches = [] }) {
  const binding = env.MISS_JEEVES_SIGNALS;
  if (!binding || typeof binding.writeDataPoint !== 'function') return;
  const safeTopicId = TOPIC_IDS.has(topicId) ? topicId : 'other';
  const sourceIds = matches.slice(0, 6).map(match => match.entry.id).join(',').slice(0, 240);
  try {
    binding.writeDataPoint({
      blobs: ['miss_jeeves_answer_outcome', 'v1', placement, outcome, safeTopicId, sourceIds, 'healthy'],
      doubles: [1, matches.length]
    });
  } catch {
    // Learning signals must never break the visitor's answer.
  }
}

function parseAiJson(response) {
  const value = response?.response || response?.result?.response || response?.choices?.[0]?.message?.content;
  if (typeof value !== 'string' || !value.trim()) throw new Error('AI returned no answer');
  const candidate = value.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(candidate);
}

async function reasonAcrossCatalogue(query, entries, env) {
  const safeEntries = entries.filter(safeEntry);
  if (!env.AI || !safeEntries.length) return null;
  const sources = safeEntries.map(entry => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    topics: entry.topics,
    aliases: entry.aliases,
    section: entry.section,
    url: entry.url
  }));
  const response = await env.AI.run(AI_MODEL, {
    messages: [
      {
        role: 'system',
        content: 'You are Miss Jeeves, SUNNYVAiLE town guide. Interpret the visitor question, then use only the supplied current LAiDIES catalogue. Return JSON only: {"coverage":"exact"|"related"|"none","answer":string,"topic_id":string,"topic_label":string,"source_ids":string[]}. topic_id must be exactly one of: ai-concepts, context-tokens-memory, compute-chips-gpus, prompting, tools-model-selection, verification-misinformation, privacy-security, work-career, women-ai-history, agents-automation, ai-news-policy, accounts-setup-access, other. EXACT means the supplied material directly answers the specific question. RELATED means it discusses the underlying concept but does not answer that specific question; do not answer from outside knowledge. NONE means no meaningful coverage. Choose zero to four exact supplied IDs, best first. Do not choose a merely word-overlapping source. For exact, answer in plain English in at most 90 words using only the catalogue. For related, briefly name the missing answer and the related topic. For none, use no source IDs. Do not add facts or current product claims absent from the catalogue.'
      },
      {
        role: 'user',
        content: JSON.stringify({ question: query, sources })
      }
    ],
    max_tokens: 240,
    temperature: 0.1
  });
  const parsed = parseAiJson(response);
  if (!['exact', 'related', 'none'].includes(parsed?.coverage) || typeof parsed?.answer !== 'string' || !Array.isArray(parsed?.source_ids)) {
    throw new Error('AI returned invalid result');
  }
  const byId = new Map(safeEntries.map(entry => [entry.id, entry]));
  const selected = [...new Set(parsed.source_ids)].map(id => byId.get(id)).filter(Boolean).slice(0, 4);
  const topicId = TOPIC_IDS.has(parsed.topic_id) ? parsed.topic_id : classifyTopic(query, selected.map(entry => ({ entry })));
  if (parsed.coverage === 'none' || !selected.length) {
    return { coverage: 'none', answer: parsed.answer.trim(), topicId, matches: [] };
  }
  const topicLabel = typeof parsed.topic_label === 'string' && parsed.topic_label.trim()
    ? parsed.topic_label.trim().slice(0, 80)
    : selected[0].topics[0] || selected[0].title;
  return {
    coverage: parsed.coverage,
    topicId,
    answer: parsed.coverage === 'related'
      ? `LAiDIES does not have an exact answer to that question yet. Here is everything currently available on ${topicLabel}.`
      : parsed.answer.trim(),
    matches: selected.map((entry, index) => ({ entry, score: 100 - index }))
  };
}

async function missJeeves(request, env) {
  if (request.method !== 'POST') return json({ status: 'error', error: 'method_not_allowed' }, 405);
  if (!String(request.headers.get('content-type') || '').toLowerCase().includes('application/json')) {
    return json({ status: 'error', error: 'content_type_required' }, 415);
  }
  let query = '';
  let placement = 'library';
  try {
    const body = await request.json();
    query = String(body?.query || '').trim();
    placement = body?.placement === 'homepage' ? 'homepage' : 'library';
  } catch {
    return json({ status: 'error', error: 'invalid_json' }, 400);
  }
  if (!query || query.length > MAX_QUERY_LENGTH) return json({ status: 'error', error: 'invalid_query' }, 400);

  let entries;
  try {
    entries = await loadIndex(request, env);
  } catch {
    writeQuestionSignal(env, { placement, outcome: 'unavailable', topicId: classifyTopic(query) });
    return json({ status: 'unavailable', answer: 'Miss Jeeves cannot check the catalogue right now. Your question is still here.', results: [] }, 503);
  }
  let reasoned = null;
  try {
    reasoned = await reasonAcrossCatalogue(query, entries, env);
  } catch {
    reasoned = null;
  }
  const matches = reasoned ? reasoned.matches : retrieve(query, entries);
  if (!matches.length) {
    writeQuestionSignal(env, { placement, outcome: 'not_covered', topicId: reasoned?.topicId || classifyTopic(query) });
    return json({
      status: 'not_covered',
      mode: reasoned ? 'grounded-ai' : 'retrieval',
      answer: reasoned?.answer || 'LAiDIES does not cover that clearly enough yet. Miss Jeeves will not invent an answer. Try another phrase or browse the current shelves.',
      results: []
    });
  }
  const coverage = reasoned?.coverage || (hasExactCatalogueMatch(query, matches) ? 'exact' : 'related');
  const first = matches[0].entry;
  const generated = reasoned
    ? { mode: 'grounded-ai', answer: reasoned.answer }
    : coverage === 'exact'
      ? { mode: 'retrieval', answer: `${first.title}: ${first.summary}` }
      : { mode: 'retrieval', answer: `LAiDIES does not have an exact answer to that question yet. Here is everything currently available on ${first.topics[0] || first.title}.` };
  writeQuestionSignal(env, {
    placement,
    outcome: coverage === 'exact' ? 'answered' : 'related_coverage',
    topicId: reasoned?.topicId || classifyTopic(query, matches),
    matches
  });
  return json({ status: coverage === 'exact' ? 'ok' : 'related', coverage, ...generated, results: matches.map(publicResult) });
}

const CORRECTION_ID = /^[a-z0-9][a-z0-9._:-]{0,95}$/i;
const CORRECTION_CATEGORIES = new Set(['factual-error','source-mismatch','stale-source','missing-qualification','broken-source','other']);
const CORRECTION_FIELDS = new Set(['book_id','section_id','claim_id','source_id','content_version','category','finding','evidence_url']);
const CORRECTION_PROHIBITED = new Set(['email','name','resident_card_id','account_id','raw_query','reading_activity','reading_text','puffy_purpose','saved_title']);

async function sha256Text(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function correctionText(value, name, max, optional = false) {
  if (optional && (value == null || value === '')) return null;
  const normalized = typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
  if (!normalized || normalized.length > max) throw new Error(`invalid_${name}`);
  return normalized;
}

function correctionId(value, name, optional = false) {
  if (optional && (value == null || value === '')) return null;
  if (typeof value !== 'string' || !CORRECTION_ID.test(value)) throw new Error(`invalid_${name}`);
  return value;
}

function correctionEvidenceUrl(value) {
  if (value == null || value === '') return null;
  let parsed;
  try { parsed = new URL(String(value)); } catch { throw new Error('invalid_evidence_url'); }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.toString().length > 1500) throw new Error('invalid_evidence_url');
  return parsed.toString();
}

function normalizeCorrection(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('invalid_body');
  for (const key of Object.keys(input)) {
    if (CORRECTION_PROHIBITED.has(key)) throw new Error('private_field_prohibited');
    if (!CORRECTION_FIELDS.has(key)) throw new Error('unknown_field');
  }
  const category = correctionText(input.category, 'category', 40);
  if (!CORRECTION_CATEGORIES.has(category)) throw new Error('invalid_category');
  return {
    book_id: correctionId(input.book_id, 'book_id'),
    section_id: correctionId(input.section_id, 'section_id', true),
    claim_id: correctionId(input.claim_id, 'claim_id', true),
    source_id: correctionId(input.source_id, 'source_id', true),
    content_version: correctionId(input.content_version, 'content_version'),
    category,
    finding: correctionText(input.finding, 'finding', 2000),
    evidence_url: correctionEvidenceUrl(input.evidence_url)
  };
}

function unavailableCorrection() {
  return json({ status: 'unavailable', error: 'correction_service_unavailable', message: 'The correction desk cannot file this yet. Your report remains in this browser so you can retry.' }, 503);
}

async function libraryCorrectionSubmit(request, env) {
  if (!env.LIBRARY_CORRECTIONS_DB || typeof env.LIBRARY_CORRECTIONS_DB.prepare !== 'function') return unavailableCorrection();
  if (!String(request.headers.get('content-type') || '').toLowerCase().includes('application/json')) return json({ status: 'error', error: 'content_type_required' }, 415);
  const idempotencyKey = String(request.headers.get('idempotency-key') || '');
  if (!CORRECTION_ID.test(idempotencyKey)) return json({ status: 'error', error: 'idempotency_key_required' }, 400);
  let normalized;
  try { normalized = normalizeCorrection(await request.json()); }
  catch (error) { return json({ status: 'error', error: error.message || 'invalid_submission' }, 400); }
  const requestDigest = await sha256Text(JSON.stringify(normalized));
  const prior = await env.LIBRARY_CORRECTIONS_DB.prepare('SELECT correction_id, receipt_id, created_at, request_digest FROM library_correction_events WHERE idempotency_key = ?1').bind(idempotencyKey).first();
  if (prior) {
    if (prior.request_digest !== requestDigest) return json({ status: 'error', error: 'idempotency_conflict' }, 409);
    return json({ status: 'accepted', correction_id: prior.correction_id, receipt_id: prior.receipt_id, created_at: prior.created_at, state: 'submitted', replayed: true, status_reference: `/api/library-corrections/status?receipt=${encodeURIComponent(prior.receipt_id)}` });
  }
  const correctionIdValue = `lc_${crypto.randomUUID().replaceAll('-', '')}`;
  const receiptId = `lr_${crypto.randomUUID().replaceAll('-', '')}`;
  const now = new Date().toISOString();
  const expires = new Date(Date.now() + 30 * 86400000).toISOString();
  try {
    await env.LIBRARY_CORRECTIONS_DB.batch([
      env.LIBRARY_CORRECTIONS_DB.prepare('INSERT INTO library_correction_events (correction_id, receipt_id, idempotency_key, request_digest, book_id, section_id, claim_id, source_id, content_version, category, state, record_version, created_at, updated_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,\'submitted\',1,?11,?11)').bind(correctionIdValue, receiptId, idempotencyKey, requestDigest, normalized.book_id, normalized.section_id, normalized.claim_id, normalized.source_id, normalized.content_version, normalized.category, now),
      env.LIBRARY_CORRECTIONS_DB.prepare('INSERT INTO library_correction_payload_vault (correction_id, finding, evidence_url, expires_at) VALUES (?1,?2,?3,?4)').bind(correctionIdValue, normalized.finding, normalized.evidence_url, expires)
    ]);
  } catch { return unavailableCorrection(); }
  return json({ status: 'accepted', correction_id: correctionIdValue, receipt_id: receiptId, created_at: now, state: 'submitted', status_reference: `/api/library-corrections/status?receipt=${encodeURIComponent(receiptId)}` }, 201);
}

async function libraryCorrectionStatus(request, env) {
  if (!env.LIBRARY_CORRECTIONS_DB || typeof env.LIBRARY_CORRECTIONS_DB.prepare !== 'function') return unavailableCorrection();
  const url = new URL(request.url);
  const receipt = url.searchParams.get('receipt') || '';
  if (!CORRECTION_ID.test(receipt)) return json({ status: 'error', error: 'invalid_status_reference' }, 400);
  const row = await env.LIBRARY_CORRECTIONS_DB.prepare('SELECT receipt_id, state, created_at, updated_at FROM library_correction_events WHERE receipt_id = ?1').bind(receipt).first();
  if (!row) return json({ status: 'error', error: 'not_found' }, 404);
  return json({ status: 'ok', receipt_id: row.receipt_id, state: row.state, created_at: row.created_at, updated_at: row.updated_at });
}

async function libraryCorrections(request, env) {
  if (request.method === 'POST') return libraryCorrectionSubmit(request, env);
  if (request.method === 'GET') return libraryCorrectionStatus(request, env);
  return json({ status: 'error', error: 'method_not_allowed' }, 405);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/miss-jeeves') return missJeeves(request, env);
    if (url.pathname === '/api/library-corrections' || url.pathname === '/api/library-corrections/status') return libraryCorrections(request, env);
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';
    const isHtml = url.pathname.endsWith('.html') || contentType.toLowerCase().includes('text/html');
    if (!isHtml) return response;
    const headers = new Headers(response.headers);
    const cacheControl = headers.get('cache-control');
    headers.set('cache-control', cacheControl ? `${cacheControl}, no-transform` : 'no-transform');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
