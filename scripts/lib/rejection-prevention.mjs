export function validateRejectionPrevention({ registry, activeLessons, mediaFixtures }) {
  const errors = [];
  const lessonIds = new Set(
    String(activeLessons || "")
      .split(/\r?\n/)
      .map((line) => line.match(/^\s*(\d+)\.\s+/)?.[1])
      .filter(Boolean)
      .map((number) => `LESSON-${number}`)
  );
  const fixtureIds = new Set((mediaFixtures?.fixtures || []).map((fixture) => fixture.id));
  const seenIds = new Set();

  if (!Array.isArray(registry?.rejections)) return ["rejections registry has no rejections array"];
  for (const rejection of registry.rejections) {
    const id = String(rejection?.id || "").trim();
    if (!id) errors.push("rejection has no id");
    else if (seenIds.has(id)) errors.push(`${id}: duplicate rejection id`);
    else seenIds.add(id);

    if (!/^[a-f0-9]{64}$/.test(String(rejection?.candidate_sha256 || ""))) {
      errors.push(`${id || "unknown"}: invalid candidate_sha256`);
    }
    if (!Array.isArray(rejection?.prevention_refs) || rejection.prevention_refs.length === 0) {
      errors.push(`${id || "unknown"}: missing prevention_refs`);
      continue;
    }
    for (const ref of rejection.prevention_refs) {
      if (!lessonIds.has(ref) && !fixtureIds.has(ref)) {
        errors.push(`${id || "unknown"}: unknown prevention ref ${ref}`);
      }
    }
  }
  return errors;
}
