#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const policyPath = path.join(root, 'operations/product-stewards/learning-content-ecosystem/miss-jeeves-answer-routing.json');
const policy = JSON.parse(fs.readFileSync(policyPath, 'utf8'));

assert.equal(policy.schemaVersion, 'miss-jeeves-answer-routing-v1');
assert.equal(policy.status, 'accepted_product_rule_implementation_required');

const homes = new Map(policy.primaryHomes.map(home => [home.id, home]));
for (const id of ['straight_answers', 'dear_miss_jeeves', 'newsstand', 'library_learning', 'site_help', 'do_not_publish']) {
  assert.ok(homes.has(id), `missing primary home: ${id}`);
  assert.ok(homes.get(id).requiredTests.length, `missing routing tests: ${id}`);
}

assert.equal(policy.reusePolicy.rawPersonalQuestionCacheProhibited, true);
assert.equal(policy.reusePolicy.privateSaveRequiresExplicitVisitorAction, true);
assert.equal(policy.reusePolicy.privateSaveCreatesPublicationCandidate, false);
assert.equal(policy.reusePolicy.privateSaveMayEnterSharedCache, false);
assert.equal(policy.reusePolicy.privateSavePreservesOriginalVersion, true);
assert.equal(policy.reusePolicy.internalReusableMayAnswerEquivalentQuestions, true);
assert.equal(policy.reusePolicy.internalReusableMayBePubliclyIndexed, false);
assert.equal(policy.reusePolicy.internalReusableRequiresDeidentification, true);
assert.equal(policy.reusePolicy.internalReusableRequiresFreshnessMetadata, true);
assert.equal(policy.reusePolicy.staleAnswerRequiresSourcedRefresh, true);
assert.equal(policy.reusePolicy.materialChangeCreatesSuccessor, true);
assert.equal(policy.reusePolicy.cacheMayAutoPublish, false);
assert.ok(policy.promotionTriggers.includes('ali_explicit_request'));

const visibility = new Map(policy.visibilityStates.map(state => [state.id, state]));
assert.deepEqual([...visibility.keys()], ['transient', 'private_saved', 'internal_reusable', 'internal_candidate', 'public_admitted']);
assert.equal(visibility.get('private_saved').audience, 'saving_visitor_only');
assert.equal(visibility.get('private_saved').publiclyIndexed, false);
assert.equal(visibility.get('internal_reusable').audience, 'miss_jeeves_and_authorised_editors');
assert.equal(visibility.get('internal_reusable').publiclyIndexed, false);
assert.equal(visibility.get('internal_candidate').publiclyIndexed, false);
assert.equal(visibility.get('public_admitted').publiclyIndexed, true);

for (const field of ['answer_key', 'canonical_question', 'answer', 'sources', 'checked_at', 'expires_at', 'answer_fingerprint', 'visibility']) {
  assert.ok(policy.internalAnswerBankRequiredFields.includes(field), `missing internal Answer Bank field: ${field}`);
}
for (const field of ['raw_visitor_prompt', 'visitor_identity', 'attachments', 'personal_context', 'confidential_workplace_content', 'account_data']) {
  assert.ok(policy.internalAnswerBankProhibitedFields.includes(field), `missing prohibited Answer Bank field: ${field}`);
}

assert.equal(policy.answerQuality.labels.live_checked, 'automatic_runtime_checks_passed_not_independently_reviewed');
assert.equal(policy.answerQuality.labels.laidies_reviewed, 'exact_answer_passed_hard_gates_scoring_and_role_distinct_review');
assert.equal(policy.answerQuality.labels.public_admitted, 'exact_reviewed_artifact_passed_destination_admission_and_release');
for (const gate of ['direct_complete_answer', 'claim_source_fidelity', 'freshness_and_unknowns', 'beginner_comprehension', 'useful_mechanism_or_decision_logic', 'laidies_relationship_integrity', 'privacy_and_safety', 'no_known_slop']) {
  assert.ok(policy.answerQuality.hardGates.includes(gate), `missing answer-quality hard gate: ${gate}`);
}
assert.equal(policy.answerQuality.scoredDimensions.length, 5);
assert.equal(policy.answerQuality.pointsPerDimension, 4);
assert.equal(policy.answerQuality.minimumTotal, 17);
assert.equal(policy.answerQuality.minimumPerDimension, 3);
assert.equal(policy.answerQuality.hardGateFailureMayBeAveragedAway, false);
assert.equal(policy.answerQuality.makerMayReviewOwnAnswer, false);
assert.equal(policy.answerQuality.modelGraderMayAdmitAnswer, false);
assert.equal(policy.answerQuality.liveCheckedImpliesIndependentReview, false);
for (const field of ['answer_fingerprint', 'answer_key', 'sources', 'checked_at', 'model_version', 'source_policy_version', 'related_laidies_records', 'reviewer', 'findings', 'recheck_trigger']) {
  assert.ok(policy.answerQuality.requiredReceiptBindings.includes(field), `missing answer-quality receipt binding: ${field}`);
}
for (const testCase of ['beginner_definition', 'multi_part_current_event', 'tool_choice', 'troubleshooting', 'ambiguous_question', 'prior_rejected_output']) {
  assert.ok(policy.answerQuality.evaluationSetRequiredCases.includes(testCase), `missing evaluation-set case: ${testCase}`);
}
assert.equal(policy.answerQuality.runOnRecurringFreshnessCycle, true);
assert.equal(policy.answerQuality.feedbackMayAutoTrainOrPublish, false);

assert.deepEqual(policy.responseFeedback.ratingOptions, ['helpful', 'not_helpful']);
assert.equal(policy.responseFeedback.reasonSelection, 'multi_select');
assert.ok(policy.responseFeedback.helpfulReasons.includes('easy_to_understand'));
assert.ok(policy.responseFeedback.notHelpfulReasons.includes('inaccurate_or_outdated'));
assert.ok(policy.responseFeedback.notHelpfulReasons.includes('weak_missing_or_broken_sources'));
assert.ok(policy.responseFeedback.notHelpfulReasons.includes('seemed_like_ai_slop'));
assert.equal(policy.responseFeedback.optionalNote.trigger, 'something_else');
assert.equal(policy.responseFeedback.optionalNote.hiddenByDefault, true);
assert.equal(policy.responseFeedback.optionalNote.mayBeOnlyPrimaryMechanism, false);
assert.equal(policy.responseFeedback.optionalNote.privateInformationWarningRequired, true);
assert.equal(policy.responseFeedback.optionalNote.shortRetentionRequired, true);
for (const field of ['answer_fingerprint', 'answer_key', 'answer_mode', 'model_version', 'source_policy_version', 'checked_at', 'displayed_result_ids']) {
  assert.ok(policy.responseFeedback.requiredBindings.includes(field), `missing feedback binding: ${field}`);
}
for (const field of ['raw_question', 'visitor_identity', 'account_data', 'attachments']) {
  assert.ok(policy.responseFeedback.prohibitedBindings.includes(field), `missing prohibited feedback binding: ${field}`);
}
assert.equal(policy.responseFeedback.appendOnly, true);
assert.equal(policy.responseFeedback.idempotent, true);
assert.equal(policy.responseFeedback.rateLimited, true);
assert.equal(policy.responseFeedback.mayAutoRewrite, false);
assert.equal(policy.responseFeedback.mayAutoRetrain, false);
assert.equal(policy.responseFeedback.mayAutoPublish, false);
assert.equal(policy.responseFeedback.accuracyComplaintCreatesReviewHold, true);

assert.equal(policy.abuseProtection.providerCredentialServerSideOnly, true);
assert.equal(policy.abuseProtection.launchBudget.currency, 'USD');
assert.equal(policy.abuseProtection.launchBudget.monthlyTargetMinimum, 50);
assert.equal(policy.abuseProtection.launchBudget.monthlyTargetMaximum, 150);
assert.equal(policy.abuseProtection.launchBudget.dailyHardCircuitBreaker, 5);
assert.deepEqual(policy.abuseProtection.launchBudget.dailyWarningThresholds, [2, 4]);
assert.equal(policy.abuseProtection.launchBudget.budgetWindow, 'utc_day');
assert.ok(policy.abuseProtection.launchBudget.onCircuitOpen.includes('block_new_paid_generation_and_web_search'));
assert.equal(policy.abuseProtection.allowances.anonymousSuccessfulAnswersTotal, 3);
assert.equal(policy.abuseProtection.allowances.residentSuccessfulGeneratedAnswersPerDay, 5);
assert.equal(policy.abuseProtection.allowances.answerRequestsPerMinutePerClient, 3);
assert.equal(policy.abuseProtection.allowances.reopeningExistingAnswerConsumesAllowance, false);
assert.equal(policy.abuseProtection.allowances.currentAnswerBankHitConsumesAllowance, false);
assert.equal(policy.abuseProtection.allowances.failedOrUndeliveredAnswerConsumesAllowance, false);
assert.equal(policy.abuseProtection.allowances.guestAnswersPreservedOnAccountConnection, true);
assert.equal(policy.abuseProtection.costAwareRoutingOrder.at(0), 'current_answer_bank_or_admitted_laidies');
assert.equal(policy.abuseProtection.budgetMaySilentlyLowerQuality, false);
assert.equal(policy.abuseProtection.budgetMayPresentStaleInformationAsCurrent, false);
assert.equal(policy.abuseProtection.internalServiceBindingRequired, true);
assert.ok(policy.abuseProtection.preSpendValidation.includes('moderation'));
assert.ok(policy.abuseProtection.requestLimits.includes('global_daily_cost_circuit_breaker'));
assert.equal(policy.abuseProtection.turnstileMode, 'step_up_on_suspicion');
assert.equal(policy.abuseProtection.turnstileServerValidationRequired, true);
assert.equal(policy.abuseProtection.openAiSafetyIdentifier, 'hmac_derived_non_pii');
assert.ok(policy.abuseProtection.providerBounds.includes('no_automatic_retry_loop'));
assert.equal(policy.abuseProtection.answerBankReuseReducesDuplicateSpend, true);
assert.equal(policy.abuseProtection.privateSavedAnswerMayEnterSharedCache, false);
assert.equal(policy.abuseProtection.feedbackRequiresAnswerReceiptAndFingerprint, true);
assert.equal(policy.abuseProtection.rawQuestionLoggingByDefault, false);
assert.equal(policy.abuseProtection.providerErrorDetailsPublic, false);

for (const example of policy.examples) {
  assert.ok(homes.has(example.primaryHome), `invalid example primary home: ${example.primaryHome}`);
  assert.equal(new Set(example.secondaryHomes).size, example.secondaryHomes.length, 'duplicate secondary home');
  assert.ok(!example.secondaryHomes.includes(example.primaryHome), 'primary home repeated as secondary home');
  for (const secondary of example.secondaryHomes) assert.ok(homes.has(secondary), `invalid secondary home: ${secondary}`);
}

assert.equal(policy.examples.find(row => row.question === 'What is Hugging Face?')?.primaryHome, 'straight_answers');
assert.equal(policy.examples.find(row => row.question === 'Do I need Hugging Face to build this for work?')?.primaryHome, 'dear_miss_jeeves');
assert.equal(policy.examples.find(row => row.question === 'Why is Hugging Face in the news today?')?.primaryHome, 'newsstand');

console.log('PASS Miss Jeeves answer reuse and publication routing policy');
