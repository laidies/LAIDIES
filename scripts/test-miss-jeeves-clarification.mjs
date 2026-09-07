import assert from 'node:assert/strict';
import {clarificationForQuestion} from './lib/miss-jeeves-clarification.mjs';

const goal = {kind: 'goal', question: 'What would you like AI to help you do?'};
const broad = [
  'How do I ask AI a question so it gives me a useful answer?',
  ' how do i ask ai a question so it gives me a useful answer ',
  'How do I write a better prompt?',
  'How can I get a more useful answer from AI?',
  'How can I get useful results from AI?',
  'How can I get a useful answer from AI?'
];
for (const question of broad) assert.equal(clarificationForQuestion(question).question, goal.question, question);

const narrow = [
  'Why can AI sound confident and still be wrong?',
  'What information is safe to put into ChatGPT or another AI tool?',
  'My boss wants a weekly project update. How can AI help me prepare it without sharing confidential information?',
  'Help me write a concise project update for my boss.',
  'How can I use AI to summarize this public report?'
];
for (const question of narrow) assert.equal(clarificationForQuestion(question), null, question);

const original = 'How do I ask AI a question so it gives me a useful answer?';
const followUps = new Map([
  ['work', 'What would you like to get done at work?'],
  ['at work', 'What would you like to get done at work?'],
  ['writing', 'What would you like to write?'],
  ['research', 'What would you like to research?'],
  ['documents', 'What would you like to do with your documents?'],
  ['writing documents', 'What would you like to write?']
]);
for (const [area, question] of followUps) assert.equal(clarificationForQuestion(area, {originalQuestion: original}).question, question, area);
for (const specific of ['general guidance', 'write a project update for my manager', 'research the history of a client']) {
  assert.equal(clarificationForQuestion(specific, {originalQuestion: original}), null, specific);
}

assert.equal(clarificationForQuestion('What should I avoid sharing with an AI tool?'), null);
assert.equal(clarificationForQuestion(''), null);
assert.equal(goal.question.includes('wrong'), false);
assert.equal(goal.question.includes('not working'), false);
console.log('PASS clarification: broad=6 narrow=5 vague_followups=6 specific_exits=3 neutral=1');

const initial=clarificationForQuestion(original);
assert.equal(initial.choices.length,6);
for(const choice of initial.choices){const next=clarificationForQuestion(choice,{originalQuestion:original});assert.ok(next?.question,choice);assert.notEqual(next.question,initial.question);}
const writing=clarificationForQuestion(initial.choices[0],{originalQuestion:original});
assert.match(writing.question,/who will read/);
assert.deepEqual(writing.choices,[], 'do not steer a writing goal to an unrelated saved answer');
console.log('PASS guided choices: six routes, relevant follow-up, specific exit');
