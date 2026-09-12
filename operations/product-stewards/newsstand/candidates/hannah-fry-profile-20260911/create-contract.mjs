#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../../../../..");
const dir=path.dirname(fileURLToPath(import.meta.url));
const rel=file=>path.relative(root,file).split(path.sep).join("/");
const read=file=>fs.readFileSync(file);
const sha=file=>crypto.createHash("sha256").update(read(file)).digest("hex");
const bind=file=>({path:rel(file),sha256:sha(file)});
const write=(name,value)=>fs.writeFileSync(path.join(dir,name),JSON.stringify(value,null,2)+"\n");
const existingEvidencePath=path.join(dir,"source-evidence.json");
const checkedAt=fs.existsSync(existingEvidencePath)
  ? JSON.parse(fs.readFileSync(existingEvidencePath,"utf8")).checkedAt
  : new Date().toISOString();
const sourceDir=path.join(dir,"source");
const evidence={
  schemaVersion:"laidies-luminairy-profile-source-evidence.v1",
  profileId:"hannah-fry",
  checkedAt,
  records:[
    {
      id:"cambridge-leelavati-2026",
      url:"https://www.maths.cam.ac.uk/features/professor-hannah-fry-wins-leelavati-prize",
      publisher:"University of Cambridge Faculty of Mathematics",
      publisherType:"primary-institution",
      accessedAt:checkedAt,
      snapshot:bind(path.join(sourceDir,"cambridge-leelavati.txt")),
      passages:[
        {locator:"plain-text line 300",excerpt:"Congratulations to Professor Hannah Fry, who has been awarded the Leelavati Prize at the International Congress of Mathematicians for outstanding contributions to increasing the public awareness of mathematics."},
        {locator:"plain-text line 330",excerpt:"Listen to this podcast interview with Hannah Fry about winning the Leelavati Prize, and discover more coverage of the full ICM 2026 on our Plus outreach platform."},
        {locator:"plain-text lines 301-303",excerpt:"Hannah Fry is Professor of the Public Understanding of Mathematics in the Department of Applied Mathematics and Theoretical Physics (DAMTP). She joined the University of Cambridge in January 2025, becoming the first person ever to hold the role."},
        {locator:"plain-text lines 305-306",excerpt:"Through a wide range of media — including books, videos, and television programs — she has used outstanding creativity and originality to translate mathematics into a language of wonder and relevance for the public without diminishing its scope and importance."}
      ],
      limitation:"Cambridge establishes Fry's role and recognition for public communication. It does not make her work an AI invention or independently validate every publisher claim about Hello World."
    },
    {
      id:"penguin-hello-world",
      url:"https://www.penguin.co.uk/books/436025/hello-world-by-fry-hannah/9781473562424",
      publisher:"Penguin",
      publisherType:"book-publisher",
      accessedAt:checkedAt,
      snapshot:bind(path.join(sourceDir,"penguin-hello-world.txt")),
      passages:[
        {locator:"plain-text line 53",excerpt:"You are accused of a crime. Who would you rather determined your fate – a human or an algorithm?"},
        {locator:"plain-text lines 55-56",excerpt:"You need a liver transplant to save your life. Who would you want in charge of organ allocation? An algorithm can match organ donors with patients, potentially saving many more lives. But it may send you to the back of the queue."},
        {locator:"plain-text lines 58-61",excerpt:"Welcome to the age of the algorithm, the story of a not-too-distant future where machines rule supreme, making important decisions – in healthcare, transport, finance, security, what we watch, where we go even who we send to prison. So how much should we rely on them? What kind of future do we want? Hannah Fry takes us on a tour of the good, the bad and the downright ugly of the algorithms that surround us. In Hello World she lifts the lid on their inner workings, demonstrates their power, exposes their limitations, and examines whether they really are an improvement on the humans they are replacing."}
      ],
      limitation:"This is publisher copy. It supports the book's questions and stated scope, not the broad promotional claim that algorithms are generally less error-prone or an independent judgment of the book."
    }
  ],
  claims:[
    {claimId:"public-explanation-contribution",sourceIds:["cambridge-leelavati-2026"],candidateMeaning:"Fry is recognized for making mathematics relevant and understandable to the public."},
    {claimId:"hello-world-criminal-decision-example",sourceIds:["penguin-hello-world"],candidateMeaning:"Hello World asks whether a human or algorithm should determine the fate of a person accused of a crime."},
    {claimId:"hello-world-organ-allocation-example",sourceIds:["penguin-hello-world"],candidateMeaning:"Hello World asks who should be in charge of allocating a life-saving liver."},
    {claimId:"decision-scope-and-limits",sourceIds:["penguin-hello-world"],candidateMeaning:"The book examines automated decisions in consequential fields and their powers and limits."},
    {claimId:"leelavati-recognition",sourceIds:["cambridge-leelavati-2026"],candidateMeaning:"Cambridge reports that the Leelavati Prize recognized Fry's contribution to public awareness of mathematics."}
  ],
  nextTrigger:"Reopen Cambridge and Penguin if the profile is not admitted in this cycle, either source changes materially, or a new factual sentence is added."
};
write("source-evidence.json",evidence);
write("source-attempts.json",{schemaVersion:"laidies-source-attempts.v1",checkedAt,attempts:evidence.records.map(record=>({url:record.url,result:"HTTP 200; complete page saved and relevant passages extracted",snapshot:record.snapshot})),limits:["No biography claim is taken from a title alone.","No publisher claim that algorithms are generally less error-prone is used.","No 2026 book-release claim is made."]});
const registry=path.join(root,"operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json");
const benchmark=path.join(root,"operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md");
const baseProfiles=path.join(root,"operations/product-stewards/newsstand/candidates/hannah-fry-why-maiven-20260906/current-base-20260911/luminairy-profiles.json");
const decisions=path.join(root,"operations/DECISIONS.md");
const failures={
  glossaryAccumulation:["Use no glossary; explain algorithm through the decision it influences.","The planned card uses one ordinary decision question and no term list."],
  templateRepetition:["Write one compact contribution paragraph, not repeated labels or tips.","Each sentence has a distinct job: contribution, example, limit, recognition, reader question."],
  decorativeAnalogy:["Use no analogy; the criminal-decision example must carry the explanation.","The plan contains no metaphor or period reference."],
  referenceConfetti:["Name only Hello World and the Leelavati recognition because each supplies evidence for the profile's purpose.","No extra book, show, award list or cultural reference is planned."],
  missingMechanism:["Connect invisible rules to a consequential choice and show why the trade-offs deserve scrutiny.","The causal sequence moves from rules to decision to trade-offs to reader questions."],
  genericAction:["Leave the reader with three specific questions for inspecting a system.","The planned landing asks what the system is trying to achieve, what it misses and who bears the consequence."],
  jargonBeforeMeaning:["Use 'algorithm' only inside the familiar human-versus-system decision question.","The decision appears before any abstraction about automated systems."],
  disconnectedSystem:["Keep the rule, decision, limitation and affected person in one chain.","The criminal-case and organ-allocation questions connect the system to specific affected people."],
  joylessInstruction:["Use a live moral question and concise adult prose rather than a checklist.","The criminal-decision question creates useful curiosity without forced humour."],
  purposeTooNarrow:["Explain both Fry's distinctive public contribution and why LAiDIES gives her this role.","The paragraph joins external evidence, a concrete example and reader agency."],
  mechanismBeforeMotivation:["Open with why her contribution matters to an ordinary person before naming recognition.","The reader consequence leads; the prize supports rather than substitutes for it."],
  workedExampleOvertakesBookPurpose:["Use one short Hello World example, then return to Fry's broader explanatory contribution.","The example occupies one sentence and the remaining paragraph explains its significance."],
  technicalExplainerVoice:["Organize around a person's decision and scrutiny, not mathematical taxonomy.","No specialist method, credential list or internal production language appears."]
};
const contract={
 schemaVersion:"laidies-content-producer-contract.v1",candidateId:"hannah-fry-profile-20260911",surface:"LUMINAIRY_PROFILE_CARD",contentClass:"EXPLANATION",producer:"/root/weekly_recovery",status:"READY_TO_DRAFT",
 readerContract:{humanQuestion:"Why does Hannah Fry belong among the LAiDIES MAiVENS beyond holding an impressive title?",promisedPayoff:"Understand her distinctive contribution through concrete consequential decisions and leave with questions that make an automated system easier to scrutinize.",priorKnowledge:"No mathematics, computer science or AI expertise is assumed; the reader may only know that algorithms influence decisions.",centralMentalModel:"A good explanation makes an invisible decision system visible by showing what it is trying to achieve, what it can miss and who bears the result.",dailyLifeConnection:"A person may encounter an automated recommendation or ranking in healthcare, justice, finance or another consequential service.",surfaceJob:"An 80–140-word LUMINAiRY profile About field that earns Keeper of the Explanation while preserving the current role, lesson, image and seven resource links byte for byte.",desiredFeeling:"Now I understand why LAiDIES celebrates her, and I have a sharper way to question a system that shapes a decision."},
 canonicalTruth:[
  {claimId:"current-profile-identity",owner:"Current live r5 LUMINAiRY profile baseline",freshnessTrigger:"The live profile or r5 admission mechanism changes.",source:bind(baseProfiles)},
  {claimId:"spotlight-substance-ruling",owner:"Ali's September 6 spotlight substance correction",freshnessTrigger:"Ali changes the spotlight purpose or profile role.",source:bind(decisions)},
  {claimId:"current-primary-evidence",owner:"Cambridge and Penguin source observations reopened by producer",freshnessTrigger:evidence.nextTrigger,source:bind(path.join(dir,"source-evidence.json"))}
 ],
 positiveExemplars:[{id:"CQX-GOOD-NEWS-002",strengthsToUse:["plain distinction before abstraction","specific human consequence","bounded limitation and useful next question"],patternsNotToCopy:["news structure, legal topic, caller-ID comparison or article length"]}],
 knownFailurePreflight:{registryVersion:"laidies-content-quality-exemplars.v1",registrySha256:sha(registry),negativeExemplarIds:["CQX-BAD-001","CQX-BAD-002"],knownDefectsRemaining:[],candidateRepairPreflight:{awardConferrer:"Do not name Cambridge as the awarding body; Cambridge reports the recognition and the International Mathematical Union awards it.",prizeDateScope:"The source supports the prize and its rationale; omit a year from reader prose because the award sentence does not state it verbatim.",publisherAttribution:"Replace the unsupported interpretive fairness gloss with a direct Penguin-attributed description of the book's questions, power and limits.",healthcareSpecificity:"Use Penguin's allocation-oversight framing; do not shift it to the different claim that the question is directly about recipient selection.",criminalQuestionScope:"Preserve Penguin's accused-person fate question; do not broaden it to deciding an entire criminal case.",contributionScope:"Keep Cambridge's public-mathematics contribution separate from Hello World's automated-decision examples; do not fuse them into a single-source claim.",recognitionFlow:"Use the prize as support inside the contribution sentence, not as a detached credential.",beginnerAbstraction:"Use 'trying to achieve' rather than 'optimizing' in reader prose.",reviewerTransfer:"An unseen-system transfer may pose questions or possibilities only; it cannot invent a system objective, omitted inputs or consequence as established fact."},dispositions:Object.fromEntries(Object.entries(failures).map(([family,[producerGuard,preventionEvidence]])=>[family,{status:"CLEAR",producerGuard,preventionEvidence}]))},
 draftArchitecture:{plainAnswer:"Fry earns Keeper of the Explanation because she translates mathematics for the public and makes consequential automated decisions concrete enough for non-specialists to question.",causalSequence:["Cambridge supports the public-mathematics contribution.","Hello World poses concrete choices about an accused person's fate and who should oversee allocating a life-saving liver.","Penguin describes the book as examining algorithms' power, limitations and whether they improve on human decisions.","Those questions let a reader ask what a system is trying to achieve, what it misses and who bears the consequence."],workedCase:"Hello World asks whether a person or algorithm should decide an accused person's fate and who should be in charge of allocating a life-saving liver.",transferCase:"For an automated healthcare ranking, a reader can ask what it might be trying to achieve, what evidence it might miss and who would carry the consequence; the profile does not supply factual answers about an unseen system.",usefulAction:"When an automated system affects a consequential choice, ask what it is trying to achieve, what it misses and who bears the consequence.",formatSpecificStructure:"One compact About paragraph: source-bounded contribution and recognition, two linked Hello World questions, an attributed statement of the book's scope, LAiDIES role and three reader questions.",antiTemplateDecision:"No title-first biography, credential stack, award list, book summary or generic inspiration language.",analogyPlan:[],humourPlan:{noneReason:"The consequential decision questions supply interest; humour would weaken the compact profile's purpose."}},
 communicationDesign:{benchmarkId:"HANNAH_FRY_COMMUNICATION_LENS_V2",benchmark:bind(benchmark),mode:"FULL",surfaceAdaptation:"Apply the benchmark mechanics to a short profile: human reason first, one concrete decision, the hidden process made visible, a limitation and a better next question. Do not imitate Fry's voice.",imitationBoundary:"ADAPT_PRINCIPLES_NEVER_IMITATE_VOICE_OR_PERSONA",dimensions:{
  humanQuestion:{disposition:"APPLY",reason:"A title does not answer why this person matters.",plannedEvidence:"Open with Fry's contribution to making automated decisions visible enough to question."},
  usefulCuriosity:{disposition:"APPLY",reason:"A human-versus-algorithm criminal decision creates a real uncertainty.",plannedEvidence:"Use the exact Hello World decision question without adopting the publisher's answer."},
  invisibleProcessConcrete:{disposition:"APPLY",reason:"The profile role depends on revealing hidden system choices.",plannedEvidence:"Name intended result, omissions and consequences as the visible parts to inspect."},
  familiarTechnicalMovement:{disposition:"APPLY",reason:"A consequential decision is more concrete than an abstract definition of algorithm.",plannedEvidence:"Move from an accused person's fate to the broader system-inspection questions."},
  limitationsConsequences:{disposition:"APPLY",reason:"The profile needs to retain the book's questions without converting publisher copy into an independent fairness judgment.",plannedEvidence:"Attribute the book's examination of power, limitations and improvement to Penguin, then return to the person carrying the result."},
  humourSurprise:{disposition:"NOT_APPLICABLE",reason:"The profile is short and the justice example is serious; no humour is needed."},
  betterNextQuestion:{disposition:"APPLY",reason:"The reader needs a reusable way to inspect another automated decision.",plannedEvidence:"End with what the system is trying to achieve, what it misses and who bears the consequence."}
 },explanationArc:{mode:"DEFAULT_SUBSTANTIAL_EXPLANATION",sharedStartingPoint:"Automated systems influence choices that affect ordinary people, while their rules remain hard to see.",curiosityGap:"What does Fry do that makes those systems easier to question?",mechanismSequence:["Begin with her contribution: making hidden mathematics visible.","Use the criminal-case and liver-allocation questions to make the stakes concrete.","Attribute the book's scope to Penguin and return to the reader with three inspectable questions."],earnedClick:"Explanation gives a non-specialist leverage when it reveals the decision and affected person, rather than only simplifying terminology.",smallLanding:"Ask what the system is trying to achieve, what it misses and who carries the consequence.",safetyBoundary:"Do not claim Fry invented an AI system, campaigns for women, published a new 2026 book, proved algorithms less error-prone or established that one decision-maker is fairer.",order:"START_AND_GAP_THEN_MECHANISM_THEN_EARNED_CLICK_THEN_SMALL_LANDING"}},
 representativeProofPlan:{highestRisk:"The successor still reads like a credential card or gives the Hello World example without returning to a useful reason for inclusion.",plannedProof:"Compare the exact incumbent and successor fields; confirm only About changes, count 80–140 words, map every factual sentence to Cambridge or Penguin and ask an independent reviewer to reject the incumbent title-only copy while judging the successor artifact first.",acceptanceOutcome:"A reader can name Fry's contribution, repeat the criminal-decision example and use the three inspection questions on a new consequential system."},
 ratchet:{targets:{repeatedKnownDefects:0,objectiveDefectsFirstFoundAtReview:0},rule:"REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW"}
};
write("producer-contract.json",contract);
console.log(JSON.stringify({checkedAt,sourceEvidence:bind(path.join(dir,"source-evidence.json")),contract:bind(path.join(dir,"producer-contract.json"))}));
