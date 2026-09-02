export const REQUIRED_USEFUL_DESKS = [
  "dear_miss_jeeves",
  "career_life",
  "paige_tip",
  "concept_week"
];

export function requiredUsefulDeskErrors(desks, editionDate) {
  if (editionDate < "2026-09-02") return [];
  const entries = Array.isArray(desks) ? desks : [];
  return REQUIRED_USEFUL_DESKS.flatMap(type => {
    const matches = entries.filter(desk => desk?.type === type);
    if (matches.length !== 1) return [`Useful this week requires exactly one ${type} desk`];
    return matches[0].state === "ready" ? [] : [`Useful this week requires ${type} to be ready`];
  });
}
