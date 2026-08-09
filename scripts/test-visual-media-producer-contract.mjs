#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { inspectVisualMediaProducerContract } from "./check-visual-media-producer-contract.mjs";

const root = process.cwd();
const registryPath = "operations/product-stewards/learning-content-ecosystem/visual-media-quality-exemplars.json";
const lockPath = "operations/episode-visual-system-lock.md";
const masterPath = "assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png";
const hash = value => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, value))).digest("hex");
const registry = JSON.parse(fs.readFileSync(path.join(root, registryPath), "utf8"));
const ref = { path: lockPath, sha256: hash(lockPath), rule: "The current episode visual lock governs this bounded test scene." };
const base = {
  schemaVersion: "1.0.0",
  candidateId: "fixture-still",
  surface: "EPISODE",
  mediaClass: "STILL",
  renderingMethod: "GENERATED_RASTER",
  status: "READY_TO_RENDER",
  maker: { principalId: "maker-visual-1" },
  registry: { path: registryPath, sha256: hash(registryPath), positiveExemplarId: "VQX-GOOD-STILL-001", patternApplied: "Use the adult faceted people-rendering register while preserving character-specific identity.", limitObserved: "The exemplar supplies style only; it does not supply scene, location, wardrobe or another character identity." },
  intent: { placement: "Representative episode teaching beat at intended player size.", scenePurpose: "Show one governed object interaction without decorative or contradictory detail.", viewerQuestion: "What visible relationship explains the accompanying line?", viewerUnderstanding: "The viewer should understand the pictured object relationship while hearing the exact accompanying line.", proseInsufficientReason: "The spatial relationship is faster to understand when the object connection is visible.", visualJob: "EXPLAIN" },
  companion: { kind: "NARRATION", path: lockPath, sha256: hash(lockPath), locator: "speech-bubble delivery rule", exactTextOrSilentPurpose: "Bubble shape must communicate delivery" },
  truth: {
    destinationStyleAuthority: { ...ref }, location: { ...ref }, era: { ...ref }, wardrobeAndAccessories: { ...ref }, physicalReality: { ...ref },
    requiredVisualFacts: ["The named character, object, and location must remain visually distinguishable at intended display size."],
    prohibitedContradictions: ["No phantom hands, extra limbs, impossible joints, exterior laptop screens, unsupported props, invented text, or unrelated scene elements."]
  },
  references: [{ role: "destination visual authority", path: lockPath, sha256: hash(lockPath) }],
  characters: [{ name: "Heroine", roleInScene: "Performs the visible action described by the companion line.", identityReference: { path: masterPath, sha256: hash(masterPath) }, realHistorical: false }],
  objectMap: [{ id: "governed-object", disposition: "REQUIRED", visualJob: "Make the narrated relationship visible rather than decorate the frame.", relationToCompanion: "Appears during the exact line and performs the action the words describe." }],
  instructionalMap: { familiarElements: ["A visible everyday object and action."], technicalElements: ["The exact technical relationship named by the companion."], explicitMappings: ["The familiar action maps directly to the technical relationship without adding a second vocabulary."], faithfulMechanism: "Every visible relationship preserves the cause and effect of the technical mechanism.", whySimpler: "The object connection is immediately visible before the technical terms are introduced.", unfamiliarViewerSuccess: "An unfamiliar viewer can explain the technical relationship and use it in a different case." },
  textPlan: { mode: "NO_VISIBLE_TEXT", unplannedGeneratedTextForbidden: true },
  knownDefects: registry.negativeExemplars.filter(item => item.appliesTo.includes("STILL")).map(item => ({ id: item.id, disposition: "PREVENTED", preventionEvidence: `Producer instruction and maker preflight explicitly apply ${item.failureFamily}.` })),
  makerPreflight: { knownDefectsRemaining: 0, objectiveDefectsRemaining: 0, representativeProofFirst: true }
};
const clone = value => structuredClone(value);
const cases = [];
const expectReject = (name, mutate) => { const value = clone(base); mutate(value); const result = inspectVisualMediaProducerContract(value, { root }); if (!result.errors.length) throw new Error(`${name} false-PASS`); cases.push(name); };

const valid = inspectVisualMediaProducerContract(base, { root });
if (valid.errors.length) throw new Error(`valid producer contract failed:\n${valid.errors.join("\n")}`);
expectReject("stale_registry", value => { value.registry.sha256 = "0".repeat(64); });
expectReject("missing_companion", value => { delete value.companion.locator; });
expectReject("missing_viewer_question", value => { delete value.intent.viewerQuestion; });
expectReject("missing_instructional_mapping", value => { delete value.instructionalMap.explicitMappings; });
expectReject("css_drawing_forbidden", value => { value.renderingMethod = "CSS_HTML_DRAWING"; });
expectReject("analogy_not_proven_simpler", value => { delete value.instructionalMap.whySimpler; });
expectReject("missing_style_authority", value => { delete value.truth.destinationStyleAuthority; });
expectReject("omitted_physics_learning", value => { value.knownDefects = value.knownDefects.filter(item => item.id !== "VQX-BAD-003"); });
expectReject("omitted_anatomy_learning", value => { value.knownDefects = value.knownDefects.filter(item => item.id !== "VQX-BAD-004"); });
expectReject("omitted_gibberish_learning", value => { value.knownDefects = value.knownDefects.filter(item => item.id !== "VQX-BAD-005"); });
expectReject("unbound_period", value => { value.truth.era = { rule: "period is fine" }; });
expectReject("unsafe_generated_text", value => { value.textPlan = { mode: "PURPOSE_BUILT_IN_ART", unplannedGeneratedTextForbidden: false }; });
expectReject("maker_defect_remaining", value => { value.makerPreflight.knownDefectsRemaining = 1; });
expectReject("animation_without_event", value => { value.mediaClass = "ANIMATION"; value.registry.positiveExemplarId = "VQX-GOOD-MOTION-001"; value.knownDefects = registry.negativeExemplars.filter(item => item.appliesTo.includes("ANIMATION")).map(item => ({ id:item.id, disposition:"PREVENTED", preventionEvidence:`Prevents ${item.failureFamily} before animation.` })); });

console.log(`VISUAL MEDIA PRODUCER CALIBRATION PASS valid=1 rejected=${cases.length} anatomy=1 text=1 period=1 narration=1`);
