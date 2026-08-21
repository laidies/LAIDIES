import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const concepts = read('operations/evals/library-rejected-artifacts/concepts-101-3bf3d6bddd659af0.html');
const vocabSource = read('content/library-books/vocab-101.md');
const library = read('library.html');
const rejected = JSON.parse(read('content/library-books/rejected-artifacts.json'));
const admission = JSON.parse(read('content/library-books/admission-manifest.json'));
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const conceptsSha = sha256(concepts);
const rejection = rejected.artifacts.find(row => row.artifact_sha256 === conceptsSha);
const sourceMine = admission.books.find(row => row.book_id === 'concepts-101');
const successor = admission.books.find(row => row.book_id === 'ai-fundamentals-101');

if (!rejection || rejection.derivative_use !== 'PROHIBITED_EXCEPT_SOURCE_MINE') {
  throw new Error('Exact Concepts artifact is not bound as rejected/source-mine-only');
}
if (sourceMine?.status !== 'source-mine-only' || sourceMine.artifact_sha256 !== conceptsSha) {
  throw new Error('Rejected Concepts artifact escaped its source-mine-only admission row');
}
if (!successor || successor.status !== 'pending-successor' || successor.artifact_sha256) {
  throw new Error('Immutable AI Fundamentals successor slot is missing or falsely artifact-bound');
}
if (/id:'concepts-101'/.test(library) || !/id:'ai-fundamentals-101'/.test(library)) {
  throw new Error('Library catalogue still exposes the rejected Concepts identity');
}

if (!/name:'THE 101s'/.test(library)) {
  throw new Error('The canonical shelf name THE 101s is missing');
}
if (!/id:'vocab-101'[\s\S]{0,120}listed:false/.test(library)) {
  throw new Error('Legacy Vocab catalogue record is not fail-closed');
}
if (/section\.books\.filter\(book=>book\.listed!==false\)/.test(library) === false) {
  throw new Error('Catalogue render does not exclude unlisted legacy books');
}
if (!/status: superseded-source/.test(vocabSource) ||
    !/Vocab 101 was a book[\s\S]*The 101s[\s\S]*never a shelf/.test(vocabSource)) {
  throw new Error('Vocab migration source does not record the book/shelf boundary');
}

console.log(
  `LIBRARY VOCAB/CONCEPTS RETIREMENT GUARD PASS shelf=THE_101s vocab_listed=false concepts_sha=${conceptsSha} successor=pending`
);
