const MAX_QUERY_LENGTH = 240;
const MAX_TOPIC_REQUEST_LENGTH = 500;
const AI_MODEL = '@cf/meta/llama-3.1-8b-instruct-fp8-fast';
const ADMITTED_LIBRARY_PARENTS = new Set(['ai-fundamentals-101','working-with-ai-101','straight-answers','ai-dictionary']);
const LEARNER_JOBS = new Set(['understand','see-explained','current','practise','step-by-step','planned','trusted']);
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
const COMMON_QUESTION_TARGETS = new Map([
  ['which ai should i use', 'book-section-working-with-ai-101-chapter-7'],
  ['can i upload a work document', 'book-section-working-with-ai-101-4-4-upload-paste-or-describe'],
  ['how do i check an ai answer', 'book-section-working-with-ai-101-11-3-a-practical-evaluation-framework'],
  ['what can ai help me do at work', 'book-section-working-with-ai-101-8-2-what-ai-is-genuinely-good-at']
]);
const TEACHING_ANCHOR_RULES = [
  {
    pattern: /\b(hugging\s*face|breach|hack|hacked|cyber|sandbox|agentic)\b/i,
    ids: [
      'book-section-ai-fundamentals-101-ch-2-2-4-agentic-ai-the-layer-that-acts',
      'book-section-ai-fundamentals-101-ch-13-13-1-why-sandboxing-matters-now',
      'book-section-ai-fundamentals-101-ch-13-13-2-what-a-sandbox-actually-is'
    ]
  },
  {
    pattern: /\b(hugging\s*face|open[ -]source|open[ -]weight|open model|open models)\b/i,
    ids: [
      'book-section-ai-fundamentals-101-ch-2-2-5-variations-within-the-family-size-openness-and-thinking'
    ]
  }
];
const SAFE_EVENT_ID = /^[a-z0-9][a-z0-9._:-]{0,159}$/i;
const PRIVATE_CONTENT_PATTERNS = [
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  /\b(?:\+?1[ .-]?)?(?:\(?\d{3}\)?[ .-]?)\d{3}[ .-]?\d{4}\b/,
  /\b\d{3}[ -]?\d{2}[ -]?\d{4}\b/,
  /\b(?:\d[ -]*?){13,19}\b/,
  /\b(?:api[_ -]?key|access[_ -]?token|secret|password|passcode)\s*[:=]\s*\S+/i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/
];

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

function containsPrivateContent(value) {
  return PRIVATE_CONTENT_PATTERNS.some(pattern => pattern.test(String(value || '')));
}

function currentGuidancePayload(data) {
  if (!data || data.status !== 'ok' || !Array.isArray(data.output)) return null;
  const parts = [];
  const citations = [];
  const seen = new Set();
  for (const item of data.output) {
    for (const content of Array.isArray(item?.content) ? item.content : []) {
      if (content?.type !== 'output_text' || typeof content.text !== 'string') continue;
      parts.push(content.text.trim());
      for (const annotation of Array.isArray(content.annotations) ? content.annotations : []) {
        if (annotation?.type !== 'url_citation' || typeof annotation.url !== 'string') continue;
        let url;
        try { url = new URL(annotation.url); } catch { continue; }
        if (url.protocol !== 'https:' || seen.has(url.href)) continue;
        seen.add(url.href);
        citations.push({ url: url.href, title: String(annotation.title || url.hostname).trim().slice(0, 180) });
      }
    }
  }
  const answer = parts.filter(Boolean).join('\n\n')
    .replace(/\*\*/g, '')
    .replace(/\s*\(\[[^\]]+\]\(https:\/\/[^)]+\)\)/g, '')
    .replace(/\[([^\]]+)\]\(https:\/\/[^)]+\)/g, '$1');
  return answer && citations.length ? {
    answer, citations, model: String(data.model || ''), sourcePolicyVersion: String(data.source_policy_version || ''),
    guestToken: typeof data.guestToken === 'string' ? data.guestToken : '',
    allowance: data.allowance && typeof data.allowance === 'object' ? data.allowance : null
  } : null;
}

async function askCurrentMissJeeves(request, env, query, matches) {
  if (!env.FAIRY_AI || typeof env.FAIRY_AI.fetch !== 'function') return null;
  const networkKey = await sha256Text([
    request.headers.get('cf-connecting-ip') || 'unknown',
    request.headers.get('user-agent') || 'unknown'
  ].join('|'));
  const related = matches.slice(0, 4).map(({ entry }) => ({
    title: entry.title,
    summary: entry.summary,
    section: entry.section || ''
  }));
  const headers = {
    'content-type': 'application/json',
    'x-laidies-rate-key': networkKey
  };
  const authorization = request.headers.get('authorization');
  const guestToken = request.headers.get('x-laidies-guest-token');
  if (authorization) headers.authorization = authorization;
  if (guestToken) headers['x-laidies-guest-token'] = guestToken;
  const response = await env.FAIRY_AI.fetch(new Request('https://miss-jeeves.internal/guidance', {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, related_laidies_material: related, guestToken })
  }));
  const data = await response.json().catch(() => null);
  if (!response.ok) return { error: data?.error || 'service_unavailable', status: response.status, guestToken: data?.guestToken || '', allowance: data?.allowance || null };
  return currentGuidancePayload(data);
}

function classifyTopic(query, matches = []) {
  const direct = TOPIC_RULES.find(([, pattern]) => pattern.test(query));
  if (direct) return direct[0];
  const evidence = `${query} ${matches.slice(0, 4).flatMap(match => [match.entry?.title, ...(match.entry?.topics || [])]).join(' ')}`;
  return TOPIC_RULES.find(([, pattern]) => pattern.test(evidence))?.[0] || 'other';
}

function safeEntry(entry) {
  if (!entry || entry.status !== 'live' || typeof entry.url !== 'string' || !entry.url.startsWith('/') || entry.url.startsWith('//')) return false;
  if (entry.url.startsWith('/grimoire/')) return false;
  if (!LEARNER_JOBS.has(entry.learnerJob)) return false;
  if (entry.url.startsWith('/library.html')) {
    let libraryUrl;
    try { libraryUrl = new URL(entry.url, 'https://laidies.invalid'); } catch { return false; }
    if (!ADMITTED_LIBRARY_PARENTS.has(entry.parentId) || !/^[a-f0-9]{64}$/.test(entry.artifactSha256 || '') || typeof entry.reviewedAt !== 'string') return false;
  }
  return typeof entry.id === 'string' && typeof entry.title === 'string' && typeof entry.summary === 'string' && Array.isArray(entry.topics) && Array.isArray(entry.aliases);
}

function retrieve(query, entries) {
  const normalized = normalize(query);
  const queryTokens = tokens(normalized);
  const ranked = entries.filter(safeEntry).map(entry => {
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
      else if (alias.length >= 4 && normalized.length >= 4 && (alias.includes(normalized) || normalized.includes(alias))) score += 6;
    }
    if (title.includes(normalized)) score += 6;
    for (const token of queryTokens) {
      if (titleTokens.has(token)) score += 4;
      else if (topicTokens.has(token)) score += 3;
      else if (searchableTokens.has(token)) score += 1;
    }
    return { entry, score };
  }).filter(result => result.score > 0).sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));
  const selected = [];
  for (const job of ['understand','see-explained','current','practise','step-by-step','planned','trusted']) {
    const match = ranked.find(result => result.entry.learnerJob === job);
    if (match) selected.push(match);
  }
  for (const result of ranked) {
    if (!selected.includes(result)) selected.push(result);
    if (selected.length >= 12) break;
  }
  return selected;
}

function addTeachingAnchors(query, entries, matches) {
  const anchors = TEACHING_ANCHOR_RULES
    .filter(rule => rule.pattern.test(query))
    .flatMap(rule => rule.ids)
    .map(id => entries.find(entry => entry.id === id && safeEntry(entry)))
    .filter(Boolean);
  const seen = new Set();
  return [...anchors.map(entry => ({ entry, score: 50 })), ...matches]
    .filter(({ entry }) => entry && !seen.has(entry.id) && seen.add(entry.id))
    .slice(0, 12);
}

function hasExactCatalogueMatch(query, matches) {
  const normalized = normalize(query);
  const canonical = tokens(normalized).join(' ');
  if (/\b(where|find|show)\b/.test(normalized) && matches.length) return true;
  return matches.some(({ entry }) =>
    normalize(entry.title) === normalized ||
    tokens(entry.title).join(' ') === canonical ||
    entry.aliases.some(alias => normalize(alias) === normalized || tokens(alias).join(' ') === canonical) ||
    entry.topics.some(topic => normalize(topic) === normalized || tokens(topic).join(' ') === canonical)
  );
}

async function loadIndex(request, env) {
  const indexUrl = new URL('/content/site/miss-jeeves-index.json', request.url);
  const response = await env.ASSETS.fetch(new Request(indexUrl, { headers: { accept: 'application/json' } }));
  if (!response.ok) throw new Error('index unavailable');
  const data = await response.json();
  if (data?._meta?.schema !== 'laidies-miss-jeeves-index.v1' || !Array.isArray(data.entries)) throw new Error('index invalid');
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
      learnerJob: 'current',
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
      learnerJob: 'practise',
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
    ...(entry.parentId ? { parentId: entry.parentId } : {}),
    title: entry.title,
    url: entry.url,
    type: entry.type,
    section: entry.section,
    summary: entry.summary,
    learnerJob: entry.learnerJob,
    ...(entry.wholeUrl ? { wholeUrl: entry.wholeUrl } : {}),
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

function writeResultOpenSignal(env, { placement, topicId = 'other', resultId }) {
  const binding = env.MISS_JEEVES_SIGNALS;
  if (!binding || typeof binding.writeDataPoint !== 'function') return;
  try {
    binding.writeDataPoint({
      blobs: ['miss_jeeves_result_open', 'v1', placement, TOPIC_IDS.has(topicId) ? topicId : 'other', resultId, 'healthy'],
      doubles: [1]
    });
  } catch {
    // Measurement must never break navigation.
  }
}

function parseAiJson(response) {
  const structured = response?.response || response?.result?.response;
  if (structured && typeof structured === 'object' && !Array.isArray(structured)) return structured;
  const value = structured || response?.choices?.[0]?.message?.content || response?.result?.choices?.[0]?.message?.content;
  if (typeof value !== 'string' || !value.trim()) throw new Error('AI returned no answer');
  const candidate = value.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(candidate);
}

async function reasonAcrossCatalogue(query, entries, env) {
  const safeEntries = entries.filter(safeEntry);
  if (!env.AI || !safeEntries.length) return null;
  const candidates = retrieve(query, safeEntries).slice(0, 12);
  if (!candidates.length) return null;
  const sources = candidates.map(({entry}) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    topics: entry.topics,
    aliases: entry.aliases,
    section: entry.section,
    url: entry.url,
    learner_job: entry.learnerJob
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
    max_tokens: 300,
    response_format: { type: 'json_object' },
    temperature: 0.1
  });
  const parsed = parseAiJson(response);
  if (!['exact', 'related', 'none'].includes(parsed?.coverage) || typeof parsed?.answer !== 'string' || !Array.isArray(parsed?.source_ids)) {
    throw new Error('AI returned invalid result');
  }
  const byId = new Map(candidates.map(({entry}) => [entry.id, entry]));
  let selected = [...new Set(parsed.source_ids)].map(id => byId.get(id)).filter(Boolean).slice(0, 4);
  const designedTarget = byId.get(COMMON_QUESTION_TARGETS.get(normalize(query)));
  if (designedTarget) selected = [designedTarget, ...selected.filter(entry => entry.id !== designedTarget.id)].slice(0, 4);
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
  let siteSearch = false;
  try {
    const body = await request.json();
    query = String(body?.query || '').trim();
    placement = body?.placement === 'homepage' ? 'homepage' : 'library';
    siteSearch = body?.intent === 'search';
  } catch {
    return json({ status: 'error', error: 'invalid_json' }, 400);
  }
  if (!query || query.length > MAX_QUERY_LENGTH) return json({ status: 'error', error: 'invalid_query' }, 400);
  if (containsPrivateContent(query)) {
    return json({ status: 'error', error: 'private_content_prohibited', answer: 'Please remove personal, confidential or account information before asking Miss Jeeves.', results: [] }, 400);
  }

  let entries;
  try {
    entries = await loadIndex(request, env);
  } catch {
    writeQuestionSignal(env, { placement, outcome: 'unavailable', topicId: classifyTopic(query) });
    return json({ status: 'unavailable', answer: 'Miss Jeeves cannot check the catalogue right now. Your question is still here.', results: [] }, 503);
  }
  let reasoned = null;
  const retrieved = addTeachingAnchors(query, entries, retrieve(query, entries));
  // Explicit free search exits before either paid guidance or model reasoning.
  // Legacy Library callers retain their current contract until its separate release.
  if (siteSearch) {
    const relevant = [...retrieved].sort((a, b) => b.score - a.score);
    const bestScore = relevant[0]?.score || 0;
    const matches = relevant.filter(item => item.score >= Math.max(2, bestScore * 0.3));
    writeQuestionSignal(env, { placement, outcome: retrieved.length ? 'related_coverage' : 'not_covered', topicId: classifyTopic(query), matches: retrieved });
    return json({ status: 'search_results', mode: 'site-search', coverage: retrieved.length ? 'related' : 'none', topic_id: classifyTopic(query), answer: retrieved.length ? 'Here is what I found in LAiDIES. These references may answer part of your question.' : 'I could not find a close match in LAiDIES.', results: matches.map(publicResult), research_available: false });
  }

  let currentGuidance = null;
  try {
    currentGuidance = await askCurrentMissJeeves(request, env, query, retrieved);
  } catch {
    currentGuidance = null;
  }
  if (currentGuidance?.error) {
    const gated = currentGuidance.error === 'guest_limit_reached' || currentGuidance.error === 'resident_daily_limit_reached';
    return json({
      status: gated ? 'limit_reached' : 'unavailable',
      error: currentGuidance.error,
      answer: currentGuidance.error === 'guest_limit_reached'
        ? 'Keep asking Miss Jeeves. You have used your three guest questions. Make your free Resident Card to continue and keep your answers in your Closet.'
        : currentGuidance.error === 'resident_daily_limit_reached'
          ? 'You have used today’s five Miss Jeeves answers. Come back tomorrow; the current shelves are still open.'
          : currentGuidance.error === 'service_budget_reached'
            ? 'Miss Jeeves has reached today’s service limit. The current Library shelves are still open.'
            : 'Miss Jeeves cannot check current sources right now. Your question is still here.',
      guestToken: currentGuidance.guestToken,
      allowance: currentGuidance.allowance,
      results: retrieved.map(publicResult)
    }, currentGuidance.status || (gated ? 429 : 503));
  }
  if (currentGuidance) {
    const topicId = classifyTopic(query, retrieved);
    const answerId = await sha256Text(`miss-jeeves-answer:v1:${currentGuidance.answer}`);
    writeQuestionSignal(env, { placement, outcome: 'answered', topicId, matches: retrieved });
    return json({
      status: 'ok',
      coverage: retrieved.length ? 'exact' : 'current',
      topic_id: topicId,
      mode: 'current-guidance',
      answer: currentGuidance.answer,
      answer_id: answerId,
      citations: currentGuidance.citations,
      current_guidance_status: 'checked',
      current_guidance: {
        model: currentGuidance.model,
        source_policy_version: currentGuidance.sourcePolicyVersion,
        checked_at: new Date().toISOString()
      },
      guestToken: currentGuidance.guestToken,
      allowance: currentGuidance.allowance,
      results: retrieved.map(publicResult)
    });
  }
  try {
    reasoned = await reasonAcrossCatalogue(query, entries, env);
  } catch {
    reasoned = null;
  }
  const matches = reasoned ? reasoned.matches : retrieved;
  if (!matches.length) {
    writeQuestionSignal(env, { placement, outcome: 'not_covered', topicId: reasoned?.topicId || classifyTopic(query) });
    return json({
      status: 'not_covered',
      mode: reasoned ? 'grounded-ai' : 'retrieval',
      topic_id: reasoned?.topicId || classifyTopic(query),
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
  return json({ status: coverage === 'exact' ? 'ok' : 'related', coverage, topic_id: reasoned?.topicId || classifyTopic(query, matches), ...generated, results: matches.map(publicResult) });
}

async function missJeevesFeedback(request, env) {
  if (request.method !== 'POST') return json({ status: 'error', error: 'method_not_allowed' }, 405);
  let body;
  try { body = await request.json(); } catch { return json({ status: 'error', error: 'invalid_json' }, 400); }
  const answerId = String(body?.answer_id || '');
  const rating = String(body?.rating || '');
  const allowedReasons = ['did_not_answer','confusing_or_too_technical','inaccurate_or_outdated','missed_context','weak_missing_or_broken_sources','seemed_like_ai_slop','too_long','too_brief'];
  const reasons = Array.isArray(body?.reasons) ? [...new Set(body.reasons.map(reason => String(reason)))].filter(reason => allowedReasons.includes(reason)) : [];
  const placement = body?.placement === 'homepage' ? 'homepage' : 'library';
  const validFeedback = rating === 'helpful' ? reasons.length === 0 : rating === 'not_helpful' && reasons.length > 0 && reasons.length <= allowedReasons.length;
  if (!/^[a-f0-9]{64}$/.test(answerId) || !validFeedback) {
    return json({ status: 'error', error: 'invalid_feedback' }, 400);
  }
  try {
    env.MISS_JEEVES_SIGNALS?.writeDataPoint({
      blobs: ['miss_jeeves_answer_feedback', 'v2', placement, rating, answerId, ...reasons], doubles: [1]
    });
  } catch {}
  return json({ status: 'accepted' }, 202);
}

function missJeevesDb(env) {
  const db = env.MISS_JEEVES_DB || env.LIBRARY_CORRECTIONS_DB;
  return db && typeof db.prepare === 'function' ? db : null;
}

function unavailableTopicRequest() {
  return json({ status: 'unavailable', error: 'topic_request_service_unavailable', message: 'Miss Jeeves cannot file this request yet. Your wording remains in this browser so you can retry.' }, 503);
}

function normalizeTopicRequest(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('invalid_body');
  const allowed = new Set(['question', 'topic_id', 'placement', 'consent']);
  if (Object.keys(input).some(key => !allowed.has(key))) throw new Error('unknown_field');
  if (input.consent !== true) throw new Error('consent_required');
  const question = String(input.question || '').trim().replace(/\s+/g, ' ');
  if (!question || question.length > MAX_TOPIC_REQUEST_LENGTH) throw new Error('invalid_question');
  if (containsPrivateContent(question)) throw new Error('private_content_prohibited');
  return {
    question,
    topic_id: TOPIC_IDS.has(input.topic_id) ? input.topic_id : classifyTopic(question),
    placement: input.placement === 'homepage' ? 'homepage' : 'library'
  };
}

async function enforceTopicRequestRateLimit(request, env, db) {
  if (env.MISS_JEEVES_TOPIC_LIMITER && typeof env.MISS_JEEVES_TOPIC_LIMITER.limit === 'function') {
    const networkKey = String(request.headers.get('cf-connecting-ip') || 'unidentified');
    const key = await sha256Text(`miss-jeeves-topic-request:${networkKey}`);
    try { return Boolean((await env.MISS_JEEVES_TOPIC_LIMITER.limit({ key })).success); }
    catch { return false; }
  }
  const windowStart = new Date(Math.floor(Date.now() / 60000) * 60000).toISOString();
  const pruneBefore = new Date(Date.now() - 10 * 60000).toISOString();
  try {
    await db.prepare('INSERT INTO miss_jeeves_topic_request_rate_windows (window_start, request_count) VALUES (?1,1) ON CONFLICT(window_start) DO UPDATE SET request_count=request_count+1').bind(windowStart).run();
    const row = await db.prepare('SELECT request_count FROM miss_jeeves_topic_request_rate_windows WHERE window_start=?1').bind(windowStart).first();
    db.prepare('DELETE FROM miss_jeeves_topic_request_rate_windows WHERE window_start < ?1').bind(pruneBefore).run().catch(() => {});
    return Number(row?.request_count || 0) <= 120;
  } catch { return false; }
}

async function missJeevesTopicRequestSubmit(request, env) {
  const db = missJeevesDb(env);
  if (!db || typeof env.MISS_JEEVES_DIGEST_KEY !== 'string' || env.MISS_JEEVES_DIGEST_KEY.length < 32) return unavailableTopicRequest();
  if (!String(request.headers.get('content-type') || '').toLowerCase().includes('application/json')) return json({ status: 'error', error: 'content_type_required' }, 415);
  const idempotencyKey = String(request.headers.get('idempotency-key') || '');
  if (!SAFE_EVENT_ID.test(idempotencyKey)) return json({ status: 'error', error: 'idempotency_key_required' }, 400);
  if (!(await enforceTopicRequestRateLimit(request, env, db))) return json({ status: 'error', error: 'rate_limited', message: 'That is too many requests at once. Please wait a minute and try again.' }, 429);
  let normalized;
  try { normalized = normalizeTopicRequest(await request.json()); }
  catch (error) { return json({ status: 'error', error: error.message || 'invalid_submission' }, 400); }
  const canonicalQuestion = normalize(normalized.question);
  const requestDigest = await hmacSha256Text(canonicalQuestion, env.MISS_JEEVES_DIGEST_KEY);
  const prior = await db.prepare('SELECT request_id, receipt_id, request_digest, topic_id, created_at FROM miss_jeeves_topic_request_events WHERE idempotency_key = ?1').bind(idempotencyKey).first();
  if (prior) {
    if (prior.request_digest !== requestDigest) return json({ status: 'error', error: 'idempotency_conflict' }, 409);
    return json({ status: 'accepted', request_id: prior.request_id, receipt_id: prior.receipt_id, topic_id: prior.topic_id, state: 'submitted', created_at: prior.created_at, replayed: true, status_reference: `/api/miss-jeeves/topic-request/status?receipt=${encodeURIComponent(prior.receipt_id)}` });
  }
  const requestId = `mjr_${crypto.randomUUID().replaceAll('-', '')}`;
  const receiptId = `mjs_${crypto.randomUUID().replaceAll('-', '')}`;
  const statusEventId = `mje_${crypto.randomUUID().replaceAll('-', '')}`;
  const now = new Date().toISOString();
  const expires = new Date(Date.now() + 30 * 86400000).toISOString();
  try {
    await db.batch([
      db.prepare('INSERT INTO miss_jeeves_topic_request_events (request_id, receipt_id, idempotency_key, request_digest, topic_id, placement, created_at) VALUES (?1,?2,?3,?4,?5,?6,?7)').bind(requestId, receiptId, idempotencyKey, requestDigest, normalized.topic_id, normalized.placement, now),
      db.prepare('INSERT INTO miss_jeeves_topic_request_payload_vault (request_id, question, expires_at) VALUES (?1,?2,?3)').bind(requestId, normalized.question, expires),
      db.prepare('INSERT INTO miss_jeeves_topic_request_status_events (status_event_id, request_id, state, reason_code, created_at) VALUES (?1,?2,\'submitted\',NULL,?3)').bind(statusEventId, requestId, now),
      db.prepare('INSERT INTO miss_jeeves_topic_request_aggregates (request_digest, topic_id, request_count, first_seen_at, last_seen_at, latest_request_id) VALUES (?1,?2,1,?3,?3,?4) ON CONFLICT(request_digest) DO UPDATE SET request_count=request_count+1,last_seen_at=excluded.last_seen_at,latest_request_id=excluded.latest_request_id').bind(requestDigest, normalized.topic_id, now, requestId),
      db.prepare('DELETE FROM miss_jeeves_topic_request_payload_vault WHERE expires_at < ?1').bind(now)
    ]);
  } catch { return unavailableTopicRequest(); }
  return json({ status: 'accepted', request_id: requestId, receipt_id: receiptId, topic_id: normalized.topic_id, state: 'submitted', created_at: now, status_reference: `/api/miss-jeeves/topic-request/status?receipt=${encodeURIComponent(receiptId)}` }, 201);
}

async function missJeevesTopicRequestStatus(request, env) {
  const db = missJeevesDb(env);
  if (!db) return unavailableTopicRequest();
  const receipt = new URL(request.url).searchParams.get('receipt') || '';
  if (!SAFE_EVENT_ID.test(receipt)) return json({ status: 'error', error: 'invalid_status_reference' }, 400);
  const row = await db.prepare("SELECT e.receipt_id, e.topic_id, e.created_at, s.state, s.created_at AS updated_at FROM miss_jeeves_topic_request_events e JOIN miss_jeeves_topic_request_status_events s ON s.request_id=e.request_id WHERE e.receipt_id=?1 ORDER BY s.created_at DESC LIMIT 1").bind(receipt).first();
  if (!row) return json({ status: 'error', error: 'not_found' }, 404);
  return json({ status: 'ok', receipt_id: row.receipt_id, topic_id: row.topic_id, state: row.state, created_at: row.created_at, updated_at: row.updated_at });
}

async function missJeevesTopicRequest(request, env) {
  if (request.method === 'POST') return missJeevesTopicRequestSubmit(request, env);
  if (request.method === 'GET') return missJeevesTopicRequestStatus(request, env);
  return json({ status: 'error', error: 'method_not_allowed' }, 405);
}

async function missJeevesResultOpen(request, env) {
  if (request.method !== 'POST') return json({ status: 'error', error: 'method_not_allowed' }, 405);
  if (!String(request.headers.get('content-type') || '').toLowerCase().includes('application/json')) return json({ status: 'error', error: 'content_type_required' }, 415);
  let body;
  try { body = await request.json(); } catch { return json({ status: 'error', error: 'invalid_json' }, 400); }
  const resultId = String(body?.result_id || '');
  if (!SAFE_EVENT_ID.test(resultId)) return json({ status: 'error', error: 'invalid_result_id' }, 400);
  const placement = body?.placement === 'homepage' ? 'homepage' : 'library';
  const topicId = TOPIC_IDS.has(body?.topic_id) ? body.topic_id : 'other';
  if (!env.MISS_JEEVES_SIGNALS || typeof env.MISS_JEEVES_SIGNALS.writeDataPoint !== 'function') return json({ status: 'measurement_off' }, 202);
  writeResultOpenSignal(env, { placement, topicId, resultId });
  return json({ status: 'recorded' }, 202);
}

async function missJeevesHealth(request, env) {
  if (request.method !== 'GET') return json({ status: 'error', error: 'method_not_allowed' }, 405);
  let catalogue = 'unavailable';
  try { await loadIndex(request, env); catalogue = 'healthy'; } catch { catalogue = 'unavailable'; }
  const requests = missJeevesDb(env) ? 'healthy' : 'unavailable';
  return json({ status: catalogue === 'healthy' ? 'ok' : 'degraded', service: 'miss-jeeves', version: '2', catalogue, topic_requests: requests, grounded_ai: env.AI ? 'configured' : 'fallback', aggregate_measurement: env.MISS_JEEVES_SIGNALS ? 'available' : 'off' }, catalogue === 'healthy' ? 200 : 503);
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

async function hmacSha256Text(value, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const digest = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
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
  const db = missJeevesDb(env);
  if (!db) return unavailableCorrection();
  if (!String(request.headers.get('content-type') || '').toLowerCase().includes('application/json')) return json({ status: 'error', error: 'content_type_required' }, 415);
  const idempotencyKey = String(request.headers.get('idempotency-key') || '');
  if (!CORRECTION_ID.test(idempotencyKey)) return json({ status: 'error', error: 'idempotency_key_required' }, 400);
  let normalized;
  try { normalized = normalizeCorrection(await request.json()); }
  catch (error) { return json({ status: 'error', error: error.message || 'invalid_submission' }, 400); }
  const requestDigest = await sha256Text(JSON.stringify(normalized));
  const prior = await db.prepare('SELECT correction_id, receipt_id, created_at, request_digest FROM library_correction_events WHERE idempotency_key = ?1').bind(idempotencyKey).first();
  if (prior) {
    if (prior.request_digest !== requestDigest) return json({ status: 'error', error: 'idempotency_conflict' }, 409);
    return json({ status: 'accepted', correction_id: prior.correction_id, receipt_id: prior.receipt_id, created_at: prior.created_at, state: 'submitted', replayed: true, status_reference: `/api/library-corrections/status?receipt=${encodeURIComponent(prior.receipt_id)}` });
  }
  const correctionIdValue = `lc_${crypto.randomUUID().replaceAll('-', '')}`;
  const receiptId = `lr_${crypto.randomUUID().replaceAll('-', '')}`;
  const now = new Date().toISOString();
  const expires = new Date(Date.now() + 30 * 86400000).toISOString();
  try {
    await db.batch([
      db.prepare('INSERT INTO library_correction_events (correction_id, receipt_id, idempotency_key, request_digest, book_id, section_id, claim_id, source_id, content_version, category, state, record_version, created_at, updated_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,\'submitted\',1,?11,?11)').bind(correctionIdValue, receiptId, idempotencyKey, requestDigest, normalized.book_id, normalized.section_id, normalized.claim_id, normalized.source_id, normalized.content_version, normalized.category, now),
      db.prepare('INSERT INTO library_correction_payload_vault (correction_id, finding, evidence_url, expires_at) VALUES (?1,?2,?3,?4)').bind(correctionIdValue, normalized.finding, normalized.evidence_url, expires)
    ]);
  } catch { return unavailableCorrection(); }
  return json({ status: 'accepted', correction_id: correctionIdValue, receipt_id: receiptId, created_at: now, state: 'submitted', status_reference: `/api/library-corrections/status?receipt=${encodeURIComponent(receiptId)}` }, 201);
}

async function libraryCorrectionStatus(request, env) {
  const db = missJeevesDb(env);
  if (!db) return unavailableCorrection();
  const url = new URL(request.url);
  const receipt = url.searchParams.get('receipt') || '';
  if (!CORRECTION_ID.test(receipt)) return json({ status: 'error', error: 'invalid_status_reference' }, 400);
  const row = await db.prepare('SELECT receipt_id, state, created_at, updated_at FROM library_correction_events WHERE receipt_id = ?1').bind(receipt).first();
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
    if (url.pathname === '/api/miss-jeeves/feedback') return missJeevesFeedback(request, env);
    if (url.pathname === '/api/miss-jeeves/topic-request' || url.pathname === '/api/miss-jeeves/topic-request/status') return missJeevesTopicRequest(request, env);
    if (url.pathname === '/api/miss-jeeves/result-open') return missJeevesResultOpen(request, env);
    if (url.pathname === '/api/miss-jeeves/health') return missJeevesHealth(request, env);
    if (url.pathname === '/api/library-corrections' || url.pathname === '/api/library-corrections/status') return libraryCorrections(request, env);
    if (request.headers.get('sec-fetch-dest') === 'document' && url.pathname.startsWith('/content/library-books/rendered/')) {
      const bookId = url.pathname.slice('/content/library-books/rendered/'.length).replace(/\.html$/, '');
      if (/^[a-z0-9-]+$/.test(bookId)) return Response.redirect(`${url.origin}/library#${bookId}`, 302);
    }
    const response = await env.ASSETS.fetch(request);
    if (!url.pathname.startsWith('/content/library-books/rendered/')) return response;
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
