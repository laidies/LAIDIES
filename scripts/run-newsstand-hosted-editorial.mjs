#!/usr/bin/env node
// Private in-process bridge for the exact qualified NewsStand editorial protocol.
import crypto from 'node:crypto';

export const QUALIFIED_PROTOCOL = Object.freeze({
  path: 'operations/product-stewards/newsstand/review-runtime/protocol.mjs',
  sha256: '1a74aa1ebd16201e939fd5df0b5a64722ff1e94c45f79bff6f359dce53f9e448',
  calibrationPath: 'operations/product-stewards/newsstand/review-runtime/calibration/qualified-news-current-registry-20260926-v3/calibration-result.json',
  registrySha256: 'be22fb5ae73c431ae0fd5e20c3d29f305eaaa609d5c752dbfc7abedff6ecb06b',
  model: 'claude-fable-5',
  effort: 'medium'
});

const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const stable = value => value === null || typeof value !== 'object' ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(',')}]` : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const publicResult = (status, extra = {}) => ({
  status,
  transportSuccess: status === 'EDITORIAL_TRANSPORT_SUCCESS',
  qualification: 'NOT_ESTABLISHED',
  editorialQualificationEstablished: false,
  admissionAuthority: false,
  publicationActionTaken: false,
  ...extra
});

function sameIdentity(identity) {
  return identity && Object.entries(QUALIFIED_PROTOCOL).every(([key, value]) => identity[key] === value);
}

function validProtocol(protocol) {
  return protocol && typeof protocol.requestFor === 'function' && typeof protocol.normalize === 'function';
}

/**
 * `execute` receives the exact protocol request and must return the unlogged
 * Claude JSON response. Private output is returned only for an in-process next
 * stage; callers must never serialize `privateResult` to Actions output.
 */
export async function runHostedEditorial({packet, protocol, protocolIdentity, execute}) {
  if (!validProtocol(protocol) || !sameIdentity(protocolIdentity)) return publicResult('PROTOCOL_BINDING_MISMATCH');
  if (!packet || typeof packet !== 'object' || typeof packet.completeArtifact !== 'string' || !Array.isArray(packet.paragraphs)) return publicResult('INVALID_PACKET');
  if (typeof execute !== 'function') return publicResult('EXECUTOR_MISSING');

  let request;
  try { request = protocol.requestFor('editorial', packet); }
  catch { return publicResult('REQUEST_CONSTRUCTION_FAILED'); }
  if (!request || typeof request !== 'object' || !request.outputSchema || !Array.isArray(request.messages)) return publicResult('INVALID_PROTOCOL_REQUEST');

  let provider;
  try { provider = await execute({request, model: QUALIFIED_PROTOCOL.model, effort: QUALIFIED_PROTOCOL.effort}); }
  catch { return publicResult('EXECUTION_ERROR'); }
  if (!provider || typeof provider !== 'object') return publicResult('INVALID_PROVIDER_OUTPUT');
  if (provider.is_error === true) return publicResult('PROVIDER_ERROR');
  if (provider.subtype !== 'success') return publicResult('PROVIDER_INCOMPLETE');
  const models = Object.keys(provider.modelUsage || {});
  if (!models.includes(QUALIFIED_PROTOCOL.model) || !models.every(model => model.startsWith('claude-'))) return publicResult('MODEL_MISMATCH');
  if (!provider.structured_output || typeof provider.structured_output !== 'object') return publicResult('INVALID_PROVIDER_OUTPUT');

  let normalized;
  try { normalized = protocol.normalize('editorial', provider.structured_output, packet); }
  catch { return publicResult('NORMALIZATION_REJECTED', {model: models}); }
  if (!normalized || !['PASS', 'HOLD', 'REJECT'].includes(normalized.verdict)) return publicResult('NORMALIZATION_REJECTED', {model: models});

  const requestSha256 = sha256(stable(request));
  const providerRawSha256 = sha256(stable(provider));
  const judgmentSha256 = sha256(stable(provider.structured_output));
  const outcome = publicResult('EDITORIAL_TRANSPORT_SUCCESS', {
    model: models,
    effort: QUALIFIED_PROTOCOL.effort,
    verdict: normalized.verdict,
    requestSha256,
    providerRawSha256,
    judgmentSha256
  });
  // Deliberately non-enumerable: JSON logging emits only the public summary.
  Object.defineProperty(outcome, 'privateResult', {value: {request, provider, judgment: provider.structured_output, normalized}});
  return outcome;
}
