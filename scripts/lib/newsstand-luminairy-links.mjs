import fs from "node:fs";
import path from "node:path";

const visibleStoryText = story => [
  story?.headline,
  story?.thread_subtitle,
  story?.the_story,
  story?.laidies_read,
  story?.what_this_means,
  story?.cocktail_party,
  story?.closing_note,
  story?.class_notes,
  ...(story?.watch_fors || []),
  ...(story?.examination_sections || []).flatMap(section => [section?.title, section?.body])
].filter(Boolean).join(" ").replace(/<[^>]+>/g, " ").toLocaleLowerCase();

export function loadLuminairyWomen(root) {
  const profiles = JSON.parse(fs.readFileSync(path.join(root, "content/luminairy-profiles.json"), "utf8"));
  return [...(profiles.mavens || []), ...(profiles.trailblazers || [])];
}

export function inspectNewsstandLuminairyLinks(story, { root }) {
  const errors = [];
  const profiles = loadLuminairyWomen(root);
  const byId = new Map(profiles.map(profile => [profile.id, profile]));
  const related = story?.relatedPeople;

  if (related !== undefined && !Array.isArray(related)) {
    return { errors: ["relatedPeople must be an array when supplied"], matches: [] };
  }

  const declared = new Set();
  for (const [index, relation] of (related || []).entries()) {
    const profile = byId.get(relation?.profileId);
    if (!profile) {
      errors.push(`relatedPeople[${index}] does not resolve to a real LUMINAiRY profile`);
      continue;
    }
    if (declared.has(relation.profileId)) errors.push(`relatedPeople repeats ${relation.profileId}`);
    declared.add(relation.profileId);
    if (relation.name !== profile.name) errors.push(`relatedPeople[${index}].name must match the LUMINAiRY profile`);
    if (typeof relation.reason !== "string" || !relation.reason.trim()) errors.push(`relatedPeople[${index}].reason is required`);
  }

  const text = visibleStoryText(story);
  const matches = profiles.filter(profile => text.includes(profile.name.toLocaleLowerCase()));
  for (const profile of matches) {
    if (!declared.has(profile.id)) errors.push(`${profile.name} is named in the story but is not linked to her LUMINAiRY profile`);
  }

  return { errors, matches: matches.map(profile => profile.id) };
}
