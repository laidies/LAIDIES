#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { inspectVisualMediaReview } from "./check-visual-media-admission.mjs";

const root = process.cwd();
const registryPath = "operations/product-stewards/learning-content-ecosystem/visual-media-quality-exemplars.json";
const lockPath = "operations/episode-visual-system-lock.md";
const masterPath = "assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png";
const hash = value => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, value))).digest("hex");
const registry = JSON.parse(fs.readFileSync(path.join(root, registryPath), "utf8"));
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-visual-admission-"));
const rel = path.relative(root, temporary);
const ref = { path: lockPath, sha256: hash(lockPath), rule: "Bound governing visual authority for calibration." };
const contract = {
  schemaVersion:"1.0.0", candidateId:"fixture-still", surface:"EPISODE", mediaClass:"STILL", renderingMethod:"GENERATED_RASTER", status:"READY_TO_RENDER", maker:{principalId:"maker-visual-1"},
  registry:{path:registryPath,sha256:hash(registryPath),positiveExemplarId:"VQX-GOOD-STILL-001",patternApplied:"Use the adult faceted rendering register while preserving identity.",limitObserved:"The exemplar supplies style only, never scene or identity."},
  intent:{placement:"Episode player at intended display size.",scenePurpose:"Explain one visible relationship.",viewerQuestion:"What visible relationship explains the line?",viewerUnderstanding:"Viewer understands the pictured relationship during the line.",proseInsufficientReason:"The spatial relationship is easier to understand when the connection is visible.",visualJob:"EXPLAIN"},
  companion:{kind:"NARRATION",path:lockPath,sha256:hash(lockPath),locator:"speech-bubble delivery rule",exactTextOrSilentPurpose:"Bubble shape must communicate delivery"},
  truth:{destinationStyleAuthority:{...ref},location:{...ref},era:{...ref},wardrobeAndAccessories:{...ref},physicalReality:{...ref},requiredVisualFacts:["Character and object relationship remains visible at intended size."],prohibitedContradictions:["No phantom anatomy, impossible device geometry, invented words, wrong period objects or unrelated scene elements."]},
  references:[{role:"visual authority",path:lockPath,sha256:hash(lockPath)}],
  characters:[{name:"Heroine",roleInScene:"Performs the action described by narration.",identityReference:{path:masterPath,sha256:hash(masterPath)},realHistorical:false}],
  objectMap:[{id:"object",disposition:"REQUIRED",visualJob:"Makes the narrated relationship visible.",relationToCompanion:"Performs the action during the bound line."}],
  instructionalMap:{familiarElements:["Visible everyday object and action."],technicalElements:["Bound technical relationship."],explicitMappings:["Every familiar element maps directly to the named technical relationship."],faithfulMechanism:"The visible cause and effect is the same as the technical cause and effect.",whySimpler:"The object relationship is visible before the technical vocabulary is introduced.",unfamiliarViewerSuccess:"Viewer can explain the relationship and use it in a different case without maker notes."},
  textPlan:{mode:"NO_VISIBLE_TEXT",unplannedGeneratedTextForbidden:true},
  knownDefects:registry.negativeExemplars.filter(item=>item.appliesTo.includes("STILL")).map(item=>({id:item.id,disposition:"PREVENTED",preventionEvidence:`Prevents ${item.failureFamily} before generation.`})),
  makerPreflight:{knownDefectsRemaining:0,objectiveDefectsRemaining:0,representativeProofFirst:true}
};
const contractPath = path.join(temporary, "contract.json");
fs.writeFileSync(contractPath, JSON.stringify(contract));
const calibration = { reviewerPrincipalId:"judge-visual-1", completedAt:"2026-08-07T07:10:00-07:00", registrySha256:hash(registryPath), results:registry.negativeExemplars.filter(item=>item.appliesTo.includes("STILL")).map(item=>({negativeId:item.id,verdict:"REJECT"})) };
const calibrationPath = path.join(temporary, "calibration.json");
fs.writeFileSync(calibrationPath, JSON.stringify(calibration));
const outcomeIds = ["semanticAlignment","instructionalClarity","analogyMapping","visualHierarchyAndCognitiveLoad","styleAndLocationFit","characterAndTownIdentity","anatomyAndPhysics","textIntegrity","periodWardrobeAndProps","objectPurpose","renderedSizeLegibility"];
const self = {
  schemaVersion:"1.0.0",candidateId:"fixture-still",stage:"PRODUCER_SELF_REVIEW",verdict:"PASS",
  reviewer:{principalId:"maker-visual-1",reviewedAt:"2026-08-07T07:20:00-07:00",artifactFirst:true,viewedAtIntendedSize:true},
  producerContract:{path:rel+"/contract.json",sha256:crypto.createHash("sha256").update(fs.readFileSync(contractPath)).digest("hex")},
  artifact:{path:masterPath,sha256:hash(masterPath),kind:"STILL"},
  companion:{path:lockPath,sha256:hash(lockPath),locator:"speech-bubble delivery rule"},
  renderedEvidence:{path:masterPath,sha256:hash(masterPath)},
  outcomes:outcomeIds.map(id=>({id,result:"PASS",observation:`Observed exact rendered pixels for ${id}; the candidate satisfies the bound scene requirement.`,artifactLocator:`Full frame at intended size; ${id} inspection.`})),
  visibleDefects:[],learningDisposition:{kind:"NO_NEW_DEFECT"},lineage:{kind:"FIRST",noComparableReason:"First calibrated candidate in this bounded visual class."}
};
const learnerEvidencePath=path.join(temporary,"learner-observation.txt");
fs.writeFileSync(learnerEvidencePath,"The unfamiliar viewer identified the object relationship, stated the technical meaning and named the analogy limit.");
self.learnerObservation={prompt:"Explain what relationship this visual shows and where the comparison stops.",observedResponse:"The object action shows the technical relationship, and the object is not the system itself.",expectedEvidence:"Names the relationship, technical meaning and analogy limit.",evidence:{path:rel+"/learner-observation.txt",sha256:crypto.createHash("sha256").update(fs.readFileSync(learnerEvidencePath)).digest("hex")}};
const selfPath=path.join(temporary,"self-review.json");
fs.writeFileSync(selfPath,JSON.stringify(self));
const base = structuredClone(self);
base.stage="INDEPENDENT_VISUAL_ADMISSION";
base.reviewer={principalId:"judge-visual-1",reviewedAt:"2026-08-07T07:30:00-07:00",artifactFirst:true,viewedAtIntendedSize:true,independentFromMaker:true,calibration:{path:rel+"/calibration.json",sha256:crypto.createHash("sha256").update(fs.readFileSync(calibrationPath)).digest("hex")}};
base.producerReview={path:rel+"/self-review.json",sha256:crypto.createHash("sha256").update(fs.readFileSync(selfPath)).digest("hex")};
const clone = value => structuredClone(value);
const rejected = [];
const expectReject = (name, mutate) => { const value=clone(base); mutate(value); const result=inspectVisualMediaReview(value,{root}); if(!result.errors.length) throw new Error(`${name} false-PASS`); rejected.push(name); };
try {
  const valid = inspectVisualMediaReview(base,{root});
  if(valid.errors.length) throw new Error(`valid visual review failed:\n${valid.errors.join("\n")}`);
  const selfResult=inspectVisualMediaReview(self,{root}); if(selfResult.errors.length) throw new Error(`valid producer review failed:\n${selfResult.errors.join("\n")}`);
  expectReject("phantom_limb_pass",value=>{value.visibleDefects=["A phantom hand is visible beside the laptop."];});
  expectReject("impossible_laptop_pass",value=>{value.visibleDefects=["The laptop display is rendered on the exterior lid."];});
  expectReject("gibberish_text_pass",value=>{value.visibleDefects=["Unrelated invented lettering is visible on the screen."];});
  expectReject("wrong_period_pass",value=>{value.visibleDefects=["A modern smartphone appears in the historical scene."];});
  expectReject("narration_mismatch_pass",value=>{value.outcomes.find(item=>item.id==="semanticAlignment").result="HOLD";});
  expectReject("confusing_visual_pass",value=>{value.outcomes.find(item=>item.id==="instructionalClarity").result="HOLD";});
  expectReject("unmapped_analogy_pass",value=>{value.outcomes.find(item=>item.id==="analogyMapping").result="HOLD";});
  expectReject("cognitive_overload_pass",value=>{value.outcomes.find(item=>item.id==="visualHierarchyAndCognitiveLoad").result="HOLD";});
  expectReject("missing_learner_observation",value=>{delete value.learnerObservation;});
  expectReject("missing_pixel_observation",value=>{value.outcomes.find(item=>item.id==="anatomyAndPhysics").observation="ok";});
  expectReject("decoy_artifact",value=>{value.artifact.sha256="0".repeat(64);});
  expectReject("maker_as_judge",value=>{value.reviewer.principalId="maker-visual-1";value.reviewer.independentFromMaker=false;});
  expectReject("incomplete_known_bad_calibration",value=>{const changed=structuredClone(calibration);changed.results.pop();fs.writeFileSync(calibrationPath,JSON.stringify(changed));value.reviewer.calibration.sha256=crypto.createHash("sha256").update(fs.readFileSync(calibrationPath)).digest("hex");});
  fs.writeFileSync(calibrationPath,JSON.stringify(calibration));
  expectReject("missing_producer_review",value=>{delete value.producerReview;});
  expectReject("late_calibration",value=>{const changed=structuredClone(calibration);changed.completedAt="2026-08-07T08:00:00-07:00";fs.writeFileSync(calibrationPath,JSON.stringify(changed));value.reviewer.calibration.sha256=crypto.createHash("sha256").update(fs.readFileSync(calibrationPath)).digest("hex");});
  fs.writeFileSync(calibrationPath,JSON.stringify(calibration));
  expectReject("flat_successor_ratchet",value=>{value.lineage={kind:"SUCCESSOR",predecessorCandidateId:"prior",priorComparable:{reviewIssues:1,reviewCycles:1}};value.ratchet={reviewIssues:1,reviewCycles:1};});
  expectReject("silent_learning_loop",value=>{value.verdict="REJECT";value.learningDisposition={kind:"NO_NEW_DEFECT"};});
  console.log(`VISUAL MEDIA ADMISSION CALIBRATION PASS valid=2 rejected=${rejected.length} exact_artifact=1 pixel_observation=1 narration_fit=1 physics=1 text=1 era=1 learning_disposition=1`);
} finally { fs.rmSync(temporary,{recursive:true,force:true}); }
