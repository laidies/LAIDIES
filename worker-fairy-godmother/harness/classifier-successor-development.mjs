import fs from "node:fs";

const DECISIONS = new Set(["allow", "boundary", "boundary_or_uncertain", "verify_current"]);
const TASKS = new Set([
  "explain", "draft_or_rewrite", "advice_or_conversation", "decision_or_plan"
]);
const BOUNDARIES = new Set([
  "medical", "crisis_or_emergency", "legal", "regulated_financial",
  "dangerous_or_abusive", "untrusted_instruction"
]);

export function validateDevelopmentSet(candidate, frozenSet) {
  if (!candidate || candidate.status !== "DEVELOPMENT_ONLY_NOT_BLIND_ADMISSION" ||
      !Array.isArray(candidate.cases) || candidate.cases.length !== 18) {
    throw new Error("development_set_scope_invalid");
  }
  const frozenPrompts = new Set((frozenSet?.semanticCases || []).map((entry) => entry.prompt));
  const ids = new Set();
  const prompts = new Set();
  for (const entry of candidate.cases) {
    if (!entry || typeof entry.id !== "string" || !/^dev-[a-z]+-\d{3}$/.test(entry.id) ||
        ids.has(entry.id) || typeof entry.family !== "string" || !entry.family ||
        typeof entry.prompt !== "string" || entry.prompt.trim().length < 20 ||
        prompts.has(entry.prompt) || frozenPrompts.has(entry.prompt) ||
        !entry.expected || !DECISIONS.has(entry.expected.decision)) {
      throw new Error("development_case_identity_or_lineage_invalid");
    }
    if (entry.expected.task && !TASKS.has(entry.expected.task)) {
      throw new Error("development_case_task_invalid");
    }
    if (entry.expected.boundary && !BOUNDARIES.has(entry.expected.boundary)) {
      throw new Error("development_case_boundary_invalid");
    }
    if ((entry.expected.decision === "boundary" ||
         entry.expected.decision === "boundary_or_uncertain") && !entry.expected.boundary) {
      throw new Error("development_boundary_missing");
    }
    ids.add(entry.id);
    prompts.add(entry.prompt);
  }
  const requiredFamilies = [
    "direct_prompt_exfiltration", "obfuscated_prompt_exfiltration",
    "mixed_prompt_exfiltration", "benign_prevention_contrast", "quoted_summary",
    "quoted_translation", "quoted_extraction", "quoted_rewrite",
    "quoted_plus_unsafe_instruction", "explain_supplied_content",
    "rewrite_supplied_content", "preparation_framework", "conversation_coaching",
    "conversation_deliverable", "general_legal_education",
    "general_financial_preparation", "acute_medical_boundary", "volatile_product_price"
  ];
  if (requiredFamilies.some((family) => !candidate.cases.some((entry) => entry.family === family))) {
    throw new Error("development_family_coverage_invalid");
  }
  return true;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const candidate = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
  const frozen = JSON.parse(fs.readFileSync(process.argv[3], "utf8"));
  validateDevelopmentSet(candidate, frozen);
  console.log(`classifier successor development gate: ${candidate.cases.length}/18 cases valid`);
}
