// Explicit exercise-only state. Never collect browser storage or account state.
const providers = ['chatgpt', 'claude', 'gemini'];
const steps = ['task', 'answers', 'compare', 'pick', 'receipt'];
const ratings = ['gotMeaning', 'useful', 'tone', 'easy'];
const styles = ['detail', 'tone', 'scope', 'structure'];
const top = { step:'step', journeyMode:'journey_mode', task:'task', activeProvider:'active_provider', chosenProvider:'chosen_provider', editedDraft:'edited_draft', humanChange:'human_change' };
const text = { model:'model', customModel:'custom_model', answer:'answer', liked:'liked', disliked:'disliked', change:'change', verify:'verify' };

export function validateExerciseFields(input, schema) {
  if (schema?.schemaVersion !== 'laidies-exercise-fields.v1' || schema?.exerciseId !== 'ep01-same-task-different-drafts' || typeof schema?.exerciseVersion !== 'string' || !/^[A-Za-z0-9._-]{1,120}$/.test(schema.exerciseVersion)) throw new TypeError('This exercise field registry is not supported.');
  const fields = input?.fields;
  if (!input || Object.keys(input).length !== 1 || !fields || typeof fields !== 'object' || Array.isArray(fields)) throw new TypeError('Exercise fields are missing.');
  const expected = Object.keys(schema.fields);
  if (Object.keys(fields).length !== expected.length || expected.some(key => !Object.hasOwn(fields,key))) throw new TypeError('This saved exercise uses different fields. Keep it unchanged until its version can be opened.');
  for (const key of expected) {
    const value = fields[key], rule = schema.fields[key];
    const ok = rule.type === 'text' ? typeof value === 'string' && value.length <= rule.maxLength
      : rule.type === 'boolean' ? typeof value === 'boolean'
      : rule.type === 'number' && Number.isFinite(value) && value >= rule.min && value <= rule.max;
    if (!ok || (rule.choices && !rule.choices.includes(value))) throw new TypeError(`Check the saved exercise field: ${key}.`);
  }
  return input;
}

export function encodeEpisode01(state, schema) {
  const fields = {};
  for (const [property,key] of Object.entries(top)) fields[key] = property === 'journeyMode' ? state[property] || '' : state[property];
  for (const step of steps) fields[`completed.${step}`] = state.completedSteps.includes(step);
  for (const provider of providers) {
    const run = state.runs[provider];
    for (const [property,key] of Object.entries(text)) fields[`${provider}.${key}`] = run[property];
    for (const key of ratings) fields[`${provider}.rating.${key}`] = run.ratings[key];
    for (const key of styles) fields[`${provider}.style.${key}`] = run.styles[key];
  }
  return validateExerciseFields({fields},schema);
}

export function decodeEpisode01(record,schema) {
  if (!record || record.exercise_id !== schema.exerciseId || record.exercise_version !== schema.exerciseVersion) throw new TypeError('This saved exercise belongs to a different version. Keep it unchanged.');
  const fields = validateExerciseFields(record.input_state,schema).fields;
  const state = {runs:{},completedSteps:steps.filter(step => fields[`completed.${step}`])};
  for (const [property,key] of Object.entries(top)) state[property] = property === 'journeyMode' ? fields[key] || null : fields[key];
  for (const provider of providers) {
    const run = {ratings:{},styles:{}};
    for (const [property,key] of Object.entries(text)) run[property] = fields[`${provider}.${key}`];
    for (const key of ratings) run.ratings[key] = fields[`${provider}.rating.${key}`];
    for (const key of styles) run.styles[key] = fields[`${provider}.style.${key}`];
    state.runs[provider] = run;
  }
  return state;
}
