const GOAL_QUESTION = 'What would you like AI to help you do?';

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

const broadQuestions = new Set([
  'how do i ask ai a question so it gives me a useful answer',
  'how do i write a better prompt',
  'how can i get a more useful answer from ai',
  'how can i get useful results from ai',
  'how can i get a useful answer from ai'
]);

const broadAreas = new Map([
  ['write an email or document', 'What are you writing, and who will read it?'],
  ['understand something confusing', 'What would you like to understand?'],
  ['research or compare options', 'What are you researching or choosing between?'],
  ['plan a task or project', 'What are you planning, and what would a useful result look like?'],
  ['improve an answer ai already gave me', 'What did you ask, and what would you like the answer to do differently?'],
  ['i m just exploring', 'Which everyday task would you like to try first?'],
  ['work', 'What would you like to get done at work?'],
  ['at work', 'What would you like to get done at work?'],
  ['for work', 'What would you like to get done at work?'],
  ['writing', 'What would you like to write?'],
  ['research', 'What would you like to research?'],
  ['documents', 'What would you like to do with your documents?'],
  ['a document', 'What would you like to do with your document?'],
  ['writing documents', 'What would you like to write?']
]);

export function clarificationForQuestion(query, {originalQuestion} = {}) {
  const current = normalize(query);
  const original = normalize(originalQuestion);
  if (!current) return null;
  if (broadQuestions.has(current)) return {kind: 'goal', question: GOAL_QUESTION, hint: 'Choose a starting point, or describe something you want to get done.', choices: ['Write an email or document', 'Understand something confusing', 'Research or compare options', 'Plan a task or project', 'Improve an answer AI already gave me', 'I’m just exploring']};
  if (broadQuestions.has(original) && broadAreas.has(current)) {
    return {kind: 'goal', question: broadAreas.get(current), hint: 'A little detail helps me answer the question that matters to you. Leave out confidential information.', choices: []};
  }
  return null;
}
