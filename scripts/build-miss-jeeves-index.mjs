import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const readJson = relative => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const readText = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const decode = value => String(value || '')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const text = html => decode(String(html || '')
  .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')).trim();
const sentence = (value, maximum = 440) => {
  const clean = text(value);
  if (clean.length <= maximum) return clean;
  const clipped = clean.slice(0, maximum + 1);
  const stop = Math.max(clipped.lastIndexOf('. '), clipped.lastIndexOf('? '), clipped.lastIndexOf('! '));
  return `${clipped.slice(0, stop > maximum * .55 ? stop + 1 : maximum).trim()}…`;
};
const slug = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 96);
const topicWords = value => [...new Set(text(value).toLowerCase().split(/[^a-z0-9+#-]+/)
  .filter(word => word.length > 2 && !new Set(['about','after','again','also','and','are','because','before','being','book','chapter','does','from','have','into','more','most','that','the','their','then','these','they','this','through','what','when','where','which','with','your']).has(word)))].slice(0, 20);

const titles = {
  'ai-fundamentals-101': 'AI Fundamentals 101',
  'working-with-ai-101': 'Working with AI 101',
  'straight-answers': 'Straight Answers About AI',
  'ai-dictionary': 'The AI Dictionary'
};
const manifest = readJson('content/library-books/admission-manifest.json');
const siteIndex = readJson('content/site/site-index.json');
const available = manifest.books.filter(book => book.status === 'available' && titles[book.book_id]);
if (available.length !== 4) throw new Error(`Expected four admitted opening books; found ${available.length}`);

const bookEntries = [];
for (const book of available) {
  const relative = book.source_path.replace(/^\//, '');
  const html = readText(relative);
  if (sha256(html) !== book.artifact_sha256) throw new Error(`${book.book_id} artifact checksum does not match admission manifest`);
  const wholeUrl = `/library.html#${book.book_id}`;
  const lede = sentence(html.match(/<p class="lede">([\s\S]*?)<\/p>/i)?.[1] || titles[book.book_id]);
  bookEntries.push({
    id: `book-${book.book_id}`,
    parentId: book.book_id,
    title: titles[book.book_id],
    url: wholeUrl,
    wholeUrl,
    type: 'book',
    learnerJob: 'understand',
    section: 'The LIBRAiRY',
    status: 'live',
    summary: lede,
    topics: topicWords(`${titles[book.book_id]} ${lede}`),
    aliases: [titles[book.book_id], `read ${titles[book.book_id]}`, `open ${titles[book.book_id]}`],
    reviewedAt: book.reviewed_at,
    contentVersion: book.content_version,
    artifactSha256: book.artifact_sha256
  });
  const headingPattern = /<h([23])\b([^>]*)\bid="([^"]+)"([^>]*)>([\s\S]*?)<\/h\1>/gi;
  const headings = [...html.matchAll(headingPattern)];
  const anchorOccurrences = new Map();
  for (let index = 0; index < headings.length; index += 1) {
    const match = headings[index];
    const heading = text(match[5]);
    if (!heading || heading.length < 3 || /^contents$/i.test(heading)) continue;
    const start = match.index + match[0].length;
    const end = headings[index + 1]?.index ?? html.length;
    let excerpt = sentence(html.slice(start, end));
    const headingAttributes = `${match[2]} ${match[4]}`;
    if (!excerpt && match[1] === '2' && /data-source-block="chapter-\d+"/i.test(headingAttributes) && headings[index + 1]) {
      const openingStart = headings[index + 1].index + headings[index + 1][0].length;
      const openingEnd = headings[index + 2]?.index ?? html.length;
      excerpt = sentence(html.slice(openingStart, openingEnd));
    }
    if (!excerpt) continue;
    const sourceAnchor = match[3];
    const occurrence = (anchorOccurrences.get(sourceAnchor) || 0) + 1;
    anchorOccurrences.set(sourceAnchor, occurrence);
    const anchor = `${sourceAnchor}${occurrence > 1 ? `-${occurrence}` : ''}`;
    bookEntries.push({
      id: `book-section-${book.book_id}-${slug(anchor)}`,
      parentId: book.book_id,
      title: heading,
      url: `${wholeUrl}::${encodeURIComponent(`@${anchor}`)}`,
      wholeUrl,
      type: 'book-section',
      learnerJob: 'understand',
      section: titles[book.book_id],
      status: 'live',
      summary: excerpt,
      topics: topicWords(`${heading} ${excerpt}`),
      aliases: [heading, `what is ${heading}`, `how does ${heading} work`],
      reviewedAt: book.reviewed_at,
      contentVersion: book.content_version,
      artifactSha256: book.artifact_sha256
    });
  }
  if (book.book_id === 'ai-dictionary') {
    const termPattern = /<article\b[^>]*class="[^"]*\bterm\b[^"]*"[^>]*id="([^"]+)"[^>]*>\s*<h3>([\s\S]*?)<\/h3>([\s\S]*?)<\/article>/gi;
    for (const match of html.matchAll(termPattern)) {
      const anchor = match[1];
      const heading = text(match[2]);
      const excerpt = sentence(match[3]);
      if (!heading || !excerpt) continue;
      bookEntries.push({
        id: `book-section-${book.book_id}-${slug(anchor)}`,
        parentId: book.book_id,
        title: heading,
        url: `${wholeUrl}::${encodeURIComponent(`@${anchor}`)}`,
        wholeUrl,
        type: 'book-section',
        learnerJob: 'understand',
        section: titles[book.book_id],
        status: 'live',
        summary: excerpt,
        topics: topicWords(`${heading} ${excerpt}`),
        aliases: [heading, `what is ${heading}`, `what does ${heading} mean`, `define ${heading}`],
        reviewedAt: book.reviewed_at,
        contentVersion: book.content_version,
        artifactSha256: book.artifact_sha256
      });
    }
  }
}

const commonQuestionRoutes = new Map([
  ['book-section-working-with-ai-101-chapter-7', ['Which AI should I use?']],
  ['book-section-working-with-ai-101-4-4-upload-paste-or-describe', ['Can I upload a work document?']],
  ['book-section-working-with-ai-101-11-3-a-practical-evaluation-framework', ['How do I check an AI answer?']],
  ['book-section-working-with-ai-101-8-2-what-ai-is-genuinely-good-at', ['What can AI help me do at work?']]
]);
for (const [recordId, aliases] of commonQuestionRoutes) {
  const record = bookEntries.find(entry => entry.id === recordId);
  if (!record) throw new Error(`Common Miss Jeeves question route is missing: ${recordId}`);
  record.aliases = [...new Set([...record.aliases, ...aliases])];
}

const publicTypeJobs = {
  episode: 'see-explained',
  daily: 'current',
  activity: 'practise',
  tool: 'practise',
  'study-pack': 'practise',
  class: 'step-by-step',
  roadmap: 'planned',
  external: 'trusted',
  voice: 'trusted'
};
const siteEntries = siteIndex.entries.filter(entry => entry.status === 'live' && publicTypeJobs[entry.type])
  .filter(entry => !entry.url.startsWith('/library.html'))
  .map(entry => ({...entry, learnerJob: publicTypeJobs[entry.type]}));
const entries = [...bookEntries, ...siteEntries];
const ids = new Set();
for (const entry of entries) {
  if (ids.has(entry.id)) throw new Error(`Duplicate Miss Jeeves record: ${entry.id}`);
  ids.add(entry.id);
}
const output = {
  _meta: {
    schema: 'laidies-miss-jeeves-index.v1',
    generatedAt: manifest.frozen_at,
    sourceManifestVersion: manifest.manifest_version,
    sourceSiteIndexPath: 'content/site/site-index.json',
    sourceSiteIndexVersion: siteIndex._meta?.version || null,
    admittedBookCount: available.length,
    recordCount: entries.length,
    authority: 'Compiled only from admitted Library artifacts and current live site records. Empty result groups are omitted.'
  },
  entries
};
fs.writeFileSync(path.join(root, 'content/site/miss-jeeves-index.json'), `${JSON.stringify(output, null, 2)}\n`);
console.log(`MISS JEEVES INDEX BUILT books=${available.length} records=${entries.length}`);
