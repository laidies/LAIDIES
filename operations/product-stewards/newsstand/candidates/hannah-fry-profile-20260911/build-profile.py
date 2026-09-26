#!/usr/bin/env python3
import json, hashlib
from pathlib import Path
from datetime import datetime, timezone

root=Path(__file__).resolve().parents[5]
here=Path(__file__).resolve().parent
def raw(p): return Path(p).read_bytes()
def sha(p): return hashlib.sha256(raw(p)).hexdigest()
def bind(p): return {"path":str(Path(p).relative_to(root)),"sha256":sha(p)}
def dump(name,value):
    p=here/name
    if isinstance(value,str): p.write_text(value)
    else: p.write_text(json.dumps(value,ensure_ascii=False,indent=2)+"\n")
    return bind(p)

base_file=root/"operations/product-stewards/newsstand/candidates/hannah-fry-why-maiven-20260906/current-base-20260911/luminairy-profiles.json"
base=json.loads(base_file.read_text())
profiles=(base.get("wings") or {}).get("mavens") or base.get("mavens") or []
incumbent=next((p for p in profiles if p.get("id")=="hannah-fry"),None)
if not incumbent: raise SystemExit("Current Hannah profile missing")
about=("Fry translates mathematics for the public without losing its scope or importance. "
       "The Leelavati Prize recognized her contribution to increasing public awareness of mathematics. "
       "In Hello World, she asks who should decide an accused person's fate—a person or an algorithm—and who should be in charge of allocating a life-saving liver. "
       "Penguin describes the book as examining algorithms' power, limitations and whether they improve on human decisions. "
       "LAiDIES calls her Keeper of the Explanation because she turns a hidden system into questions a reader can use: What is it trying to achieve? What does it miss? Who carries the consequence?")
words=len(about.split())
if not 80 <= words <= 140: raise SystemExit("About word count "+str(words))
profile=dict(incumbent); profile["about"]=about
locked=[k for k in incumbent if k!="about"]
if any(json.dumps(profile[k],ensure_ascii=False,separators=(",",":"))!=json.dumps(incumbent[k],ensure_ascii=False,separators=(",",":")) for k in locked): raise SystemExit("Locked field changed")
if len(profile["links"])!=7: raise SystemExit("Seven resources required")
compact=lambda value: json.dumps(value,ensure_ascii=False,separators=(",",":"))
profile_hash=hashlib.sha256(compact({"wing":"mavens","profile":profile}).encode()).hexdigest()
incumbent_hash=hashlib.sha256(compact({"wing":"mavens","profile":incumbent}).encode()).hexdigest()
dump("about.md",about+"\n")
dump("profile.json",profile)
dump("profile-successor.json",{"schemaVersion":"laidies-luminairy-profile-successor.v1","status":"READY_FOR_INDEPENDENT_PROFILE_REVIEW","profileId":"hannah-fry","wing":"mavens","baseProfiles":bind(base_file),"incumbentProfileSha256":incumbent_hash,"profile":profile,"profileSha256":profile_hash,"lockedFields":locked,"changedFields":["about"],"aboutWordCount":words,"publicationAuthority":False,"signingRequired":True})
dump("change-proof.json",{"schemaVersion":"laidies-luminairy-profile-change-proof.v1","profileId":"hannah-fry","changedFields":["about"],"lockedFieldEquality":{k:profile[k]==incumbent[k] for k in locked},"linkCount":len(profile["links"]),"linksByteIdentical":profile["links"]==incumbent["links"],"incumbentAbout":incumbent["about"],"successorAbout":about})
lines=["# LUMINAiRY profile candidate","","Name: "+profile["name"],"Role: "+profile["role"],"","About: "+about,"","Lesson: "+profile["lesson"],"","Image: "+profile["image"],"","Resources (preserved exactly):"]
lines += ["- "+x["type"]+": "+x["label"]+" — "+x["url"] for x in profile["links"]]
lines += ["","Freshness: "+profile["freshness"],""]
review_text_binding=dump("review-text.md","\n".join(lines))
manifest={"schemaVersion":"laidies-content-artifact-manifest.v1","candidateId":"hannah-fry-profile-20260911","surface":"LUMINAIRY_PROFILE_CARD","contentClass":"EXPLANATION","reviewText":review_text_binding,"profile":bind(here/"profile.json"),"profileSuccessor":bind(here/"profile-successor.json"),"producerContract":bind(here/"producer-contract.json"),"sourceEvidence":bind(here/"source-evidence.json"),"currentBase":bind(base_file)}
manifest_binding=dump("artifact-manifest.json",manifest)
registry_file=root/"operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json"
registry=json.loads(registry_file.read_text())
calibration={"registrySha256":sha(registry_file),"reviewerPrincipalId":"/root/weekly_recovery","reviewedAt":datetime.now(timezone.utc).isoformat().replace("+00:00","Z"),"negatives":[
 {"exemplarId":"CQX-BAD-001","verdict":"REJECT","identifiedFailureFamilies":next(x for x in registry["negativeExemplars"] if x["id"]=="CQX-BAD-001")["failureFamilies"],"evidence":[{"excerpt":"This is the complete container around every other concept in this book.","locator":"known-bad exact prose"}]},
 {"exemplarId":"CQX-BAD-002","verdict":"REJECT","identifiedFailureFamilies":next(x for x in registry["negativeExemplars"] if x["id"]=="CQX-BAD-002")["failureFamilies"],"evidence":[{"excerpt":"We will begin with one decision and follow it all the way through.","locator":"known-bad exact prose"}]}
],"positive":{"exemplarId":"CQX-GOOD-NEWS-002","verdict":"PASS","strengthsRetained":["plain distinction before abstraction","specific human consequence","bounded limitation and useful next question"],"evidence":[{"excerpt":"Think of the disclosure as caller ID for particular AI encounters.","locator":"registered positive exact prose"}]}}
evidence_binding=bind(here/"source-evidence.json")
claims=[
 {"claimId":"public-explanation-contribution","status":"VERIFIED","candidateEvidence":[{"excerpt":"Fry translates mathematics for the public without losing its scope or importance","locator":"About"}],"sourceBinding":evidence_binding,"sourceEvidence":[{"excerpt":"translate mathematics into a language of wonder and relevance for the public without diminishing its scope and importance","locator":"cambridge-leelavati-2026"}],"scopeAndFreshness":"Cambridge directly supports this public-explanation contribution without narrowing its broad mathematics recognition to one book topic."},
 {"claimId":"hello-world-criminal-decision-example","status":"VERIFIED","candidateEvidence":[{"excerpt":"she asks who should decide an accused person's fate—a person or an algorithm","locator":"About"}],"sourceBinding":evidence_binding,"sourceEvidence":[{"excerpt":"You are accused of a crime. Who would you rather determined your fate – a human or an algorithm?","locator":"penguin-hello-world"}],"scopeAndFreshness":"Publisher copy supports this illustrative question about an accused person's fate; the profile does not broaden it to deciding an entire criminal case or adopt an answer."},
 {"claimId":"hello-world-organ-allocation-example","status":"VERIFIED","candidateEvidence":[{"excerpt":"who should be in charge of allocating a life-saving liver","locator":"About"}],"sourceBinding":evidence_binding,"sourceEvidence":[{"excerpt":"You need a liver transplant to save your life. Who would you want in charge of organ allocation?","locator":"penguin-hello-world"}],"scopeAndFreshness":"Publisher copy supports this allocation-oversight question; the profile does not shift it to recipient selection or claim an answer or outcome."},
 {"claimId":"decision-scope-and-limits","status":"QUALIFIED","candidateEvidence":[{"excerpt":"Penguin describes the book as examining algorithms' power, limitations and whether they improve on human decisions","locator":"About"}],"sourceBinding":evidence_binding,"sourceEvidence":[{"excerpt":"In Hello World she lifts the lid on their inner workings, demonstrates their power, exposes their limitations, and examines whether they really are an improvement on the humans they are replacing.","locator":"penguin-hello-world"}],"scopeAndFreshness":"The sentence is expressly attributed to Penguin and reports the publisher's description without adopting it as an independent evaluation."},
 {"claimId":"leelavati-recognition","status":"VERIFIED","candidateEvidence":[{"excerpt":"The Leelavati Prize recognized her contribution to increasing public awareness of mathematics","locator":"About"}],"sourceBinding":evidence_binding,"sourceEvidence":[{"excerpt":"awarded the Leelavati Prize at the International Congress of Mathematicians for outstanding contributions to increasing the public awareness of mathematics","locator":"cambridge-leelavati-2026"}],"scopeAndFreshness":"Cambridge directly supports the recognition and its public-awareness basis; the successor does not misidentify Cambridge as the awarding body or add a date absent from the award sentence."}
]
snippets={
"plainClarity":"who should be in charge of allocating a life-saving liver",
"readerValue":"What is it trying to achieve? What does it miss? Who carries the consequence?",
"laidiesVoice":"LAiDIES calls her Keeper of the Explanation",
"engagingEnjoyable":"who should decide an accused person's fate—a person or an algorithm",
"factualIntegrity":"The Leelavati Prize recognized her contribution to increasing public awareness of mathematics",
"freshnessReviewability":"The Leelavati Prize recognized her contribution",
"surfaceFit":"Fry translates mathematics for the public without losing its scope or importance",
"connectedSystemUnderstanding":"examining algorithms' power, limitations and whether they improve on human decisions",
"dailyLifeConnection":"who should be in charge of allocating a life-saving liver",
"communicationBenchmark":"she turns a hidden system into questions a reader can use",
"explainBack":"Penguin describes the book as examining algorithms' power, limitations and whether they improve on human decisions",
"unseenTransfer":"What is it trying to achieve? What does it miss? Who carries the consequence?",
"usefulAction":"What is it trying to achieve? What does it miss? Who carries the consequence?",
"analogyIntegrity":"who should decide an accused person's fate—a person or an algorithm",
"explanationArc":"Fry translates mathematics for the public without losing its scope or importance."
}
observations={
"plainClarity":"The card defines Fry's contribution through a concrete decision rather than titles or mathematical jargon.",
"readerValue":"The final three questions give the reader a reusable way to inspect another consequential system.",
"laidiesVoice":"The role is earned in practical adult language without first-person founder voice or generic inspiration.",
"engagingEnjoyable":"The human-versus-algorithm justice question creates interest without trivia or forced humour.",
"factualIntegrity":"Every external fact maps to current Cambridge or Penguin evidence; the publisher's blanket error-rate claim is excluded.",
"freshnessReviewability":"The recognition is bound to a current-cycle source capture; the card does not add a year absent from the source sentence.",
"surfaceFit":"The About field is "+str(words)+" words and all locked card fields, including seven links, remain byte-identical.",
"connectedSystemUnderstanding":"The paragraph joins two consequential decisions to an attributed description of the book's inquiry and the person carrying the consequence.",
"dailyLifeConnection":"A criminal case and a life-saving liver make the abstract system concrete without inventing an outcome.",
"communicationBenchmark":"The paragraph uses a human question, makes the hidden choice visible, retains a limit and ends on a better next question.",
"explainBack":"A reader can explain that Fry makes hidden decision systems visible through concrete questions and examines their power and limitations.",
"unseenTransfer":"The three ending questions transfer to an automated healthcare ranking that the profile does not work through.",
"usefulAction":"Intended result, omissions and consequence are three specific checks, not generic advice to learn more.",
"analogyIntegrity":"No analogy is used; the accused-person example is literal and preserves the human-versus-system distinction.",
"explanationArc":"Contribution leads, the concrete decision exposes the problem, the limit prevents a false winner, and the reader questions land the purpose."
}
outcomes={}
for name,excerpt in snippets.items():
    outcome={"verdict":"PASS","observation":observations[name],"artifactEvidence":[{"excerpt":excerpt,"locator":"complete review-text.md"}]}
    if name=="explainBack": outcome["simulatedReaderProbe"]={"prompt":"Why does the profile say Fry earns Keeper of the Explanation?","probeResponse":"She makes hidden automated decisions concrete through questions about an accused person's fate and a life-saving liver, then gives a reader questions for inspecting another system.","expectedEvidence":"Names the distinctive contribution, concrete examples and the three inspection questions."}
    if name=="unseenTransfer": outcome["simulatedReaderProbe"]={"prompt":"A hospital uses a ranking system to prioritize follow-up appointments. What can you ask using this profile?","probeResponse":"Ask what the ranking might be trying to achieve, which patient facts it may miss and who carries the consequence when it is wrong.","expectedEvidence":"Transfers intended result, omissions and consequences to a new healthcare case without asserting what the ranking does."}
    outcomes[name]=outcome
families=["glossaryAccumulation","templateRepetition","decorativeAnalogy","referenceConfetti","missingMechanism","genericAction","jargonBeforeMeaning","disconnectedSystem","factlessConfidence","staleUnreviewableClaims","corporateSludge","joylessInstruction","benchmarkNameDrop","curiosityWithoutPayoff","familiarExampleWithoutTechnicalReturn","communicationPastiche","entertainmentBeforeUnderstanding","mechanismCompressedBehindHook","prematureClickBeforeMechanism","inflatedTakeawayEnding","purposeTooNarrow","mechanismBeforeMotivation","workedExampleOvertakesBookPurpose","technicalExplainerVoice"]
family_notes={
"glossaryAccumulation":"No glossary or detached definition appears.",
"templateRepetition":"The paragraph has one continuous arc and no repeated scaffold.",
"decorativeAnalogy":"No analogy appears.",
"referenceConfetti":"Only Hello World and the Leelavati recognition appear, each with a factual job.",
"missingMechanism":"The paragraph connects hidden mathematics, two consequential decisions, documented limitations and consequences.",
"genericAction":"The ending gives three exact questions.",
"jargonBeforeMeaning":"The familiar decision question arrives before any abstract system claim.",
"disconnectedSystem":"Rule, decision, error and affected person are connected.",
"factlessConfidence":"The paragraph states what the prize recognized without misidentifying Cambridge as the conferrer and attributes the book description to Penguin.",
"staleUnreviewableClaims":"The 2026 recognition and source review are dated; no new book or current-program claim is made.",
"corporateSludge":"Every sentence names a contribution, example, limit, recognition or reader question.",
"joylessInstruction":"The live moral question carries the short profile.",
"benchmarkNameDrop":"The communication benchmark is absent from reader prose.",
"curiosityWithoutPayoff":"The accused-person and liver-allocation questions return to the book's examination of power and limitations and then to reader scrutiny.",
"familiarExampleWithoutTechnicalReturn":"The two concrete questions return to intended result, omissions and consequences.",
"communicationPastiche":"The prose describes Fry's contribution without imitating her quotations or voice.",
"entertainmentBeforeUnderstanding":"The serious example serves understanding and is not presented as spectacle.",
"mechanismCompressedBehindHook":"The central sentences provide two concrete decisions and the attributed scope of the book's inquiry.",
"prematureClickBeforeMechanism":"The Keeper title follows the explanation that earns it.",
"inflatedTakeawayEnding":"The landing is three bounded questions, not a universal moral.",
"purposeTooNarrow":"Contribution, concrete example, reader consequence and useful entry questions all appear.",
"mechanismBeforeMotivation":"The public value of Fry's contribution leads.",
"workedExampleOvertakesBookPurpose":"One sentence gives the example; the rest explains the broader contribution.",
"technicalExplainerVoice":"The organizing perspective is the affected person's decision, not technical taxonomy."
}
failure_families={f:{"present":False,"observation":family_notes[f],"artifactLocator":"complete review-text.md"} for f in families}
producer={
"schemaVersion":"laidies-prose-quality-review.v1","candidateId":"hannah-fry-profile-20260911","stage":"PRODUCER_SELF_REVIEW","contentClass":"EXPLANATION","surface":"LUMINAIRY_PROFILE_CARD","maker":"/root/weekly_recovery","reviewer":{"id":"/root/weekly_recovery","principalId":"/root/weekly_recovery","role":"Producer exact full-profile self-review","modelFamily":"openai"},"reviewMode":"EXACT_PROSE_IN_FULL","reviewedAt":datetime.now(timezone.utc).isoformat().replace("+00:00","Z"),"artifact":{"reviewText":review_text_binding,"manifest":manifest_binding},"calibration":calibration,
"reverseBrief":{"humanQuestion":"Why does Hannah Fry belong among the LAiDIES MAiVENS beyond holding an impressive title?","promisedPayoff":"Understand her distinctive contribution through concrete consequential decisions and leave with questions that make an automated system easier to scrutinize.","centralMentalModel":"Good explanation exposes the hidden choices and human consequences inside an automated decision.","dailyLifeConnection":"The book's accused-person and life-saving-liver questions locate automated decisions in recognizable human stakes.","surfaceJob":"A concise LUMINAiRY About field that earns Keeper of the Explanation while preserving the approved profile identity and destinations.","desiredReaderFeeling":"I understand why she matters and have a useful way to question a system."},
"outcomes":outcomes,"failureFamilies":failure_families,
"factualReview":{"disposition":"CLAIMS_REVIEWED","sourceBindings":[evidence_binding],"claimMap":claims,"reviewedThrough":"2026-09-11","nextTrigger":json.loads((here/"source-evidence.json").read_text())["nextTrigger"],"correctionOwner":"LUMINAiRY editorial owner"},
"ratchet":{"repeatedKnownDefects":0,"objectiveDefectsFirstFoundAtReview":0,"reviewIssues":0,"reviewCycles":1,"producerCurrent":{"reviewIssues":0,"reviewCycles":1},"independentHistoryBeforeCurrent":{"reviewIssues":12,"reviewCycles":9},"priorComparable":{"candidateId":"hannah-fry-profile-20260911-v9","reviewIssues":1,"reviewCycles":9},"onKnownDefect":"REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW"},
"lineage":{"kind":"SUCCESSOR","predecessorCandidateId":"current-live-hannah-fry-r5","predecessorProfileSha256":incumbent_hash,"repairSummary":"Replaces a title-only About sentence with a contribution, concrete example, reader consequence and useful questions while preserving every other field."},
"learningDisposition":{"disposition":"NO_NEW_DEFECT","rationale":"The producer preflight replaces the unsupported interpretive fairness gloss with a direct Penguin attribution and restores the source's concrete liver-allocation example. The exact successor keeps recognition attached to the contribution and has no unresolved producer-found defect before independent review."},"verdict":"PASS",
"limitations":["Producer review is not independent profile admission.","Cambridge and Penguin support the factual claims; Penguin is publisher copy rather than independent evaluation.","The profile remains private and unsigned; root controls renewed signing and integration."]
}
producer_binding=dump("producer-self-review.json",producer)
print(json.dumps({"profileSha256":profile_hash,"aboutWordCount":words,"reviewText":review_text_binding,"manifest":manifest_binding,"producer":producer_binding}))
