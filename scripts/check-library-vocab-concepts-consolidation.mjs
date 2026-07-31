import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const concepts = read('content/library-books/rendered/concepts-101.html');
const vocabSource = read('content/library-books/vocab-101.md');
const library = read('library.html');

const requiredTerms = [
  'Agentic AI',
  'AGI',
  'AI winter',
  'Context',
  'Context window',
  'Generative AI',
  'Grounding',
  'Hallucination',
  'Knowledge cutoff',
  'Model / large language model (LLM)',
  'Multimodal',
  'Prompt',
  'Reasoning model',
  'Sandbox',
  'Retrieval',
  'Token',
  'Training data'
];

const quickReference = concepts.match(
  /<h2>Concepts quick reference<\/h2>([\s\S]*?)<\/div>\s*$/
)?.[1];

if (!quickReference) {
  throw new Error('Concepts quick-reference section is missing');
}

const missing = requiredTerms.filter(term => {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return !new RegExp(`<h3>${escaped}<\\/h3>`).test(quickReference);
});

if (missing.length) {
  throw new Error(`Concepts is missing consolidated terms: ${missing.join(', ')}`);
}

const termCount = [...quickReference.matchAll(/<h3>([^<]+)<\/h3>/g)].length;
if (termCount !== requiredTerms.length) {
  throw new Error(
    `Concepts quick reference has ${termCount} terms; expected ${requiredTerms.length}`
  );
}

if (!/name:'THE 101s'/.test(library)) {
  throw new Error('The canonical shelf name THE 101s is missing');
}
if (!/id:'vocab-101'[\s\S]{0,120}listed:false/.test(library)) {
  throw new Error('Legacy Vocab catalogue record is not fail-closed');
}
if (/filter\(b=>b\.listed!==false\)/.test(library) === false) {
  throw new Error('Catalogue render does not exclude unlisted legacy books');
}
if (!/status: superseded-source/.test(vocabSource) ||
    !/Vocab 101 was a book[\s\S]*The 101s[\s\S]*never a shelf/.test(vocabSource)) {
  throw new Error('Vocab migration source does not record the book/shelf boundary');
}

console.log(
  `LIBRARY VOCAB→CONCEPTS CONSOLIDATION PASS terms=${termCount} shelf=THE_101s vocab_listed=false`
);
