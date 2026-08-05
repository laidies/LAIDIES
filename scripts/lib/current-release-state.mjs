import fs from 'node:fs';

const requireMatch = (text, pattern, label) => {
  const match = text.match(pattern);
  if (!match) throw new Error(`RELEASE-STATE.md is missing ${label}`);
  return match[1];
};

export const readCurrentReleaseState = file => {
  const text = fs.readFileSync(file, 'utf8');
  return {
    updated: requireMatch(text, /\*\*Updated:\*\*\s*(\d{4}-\d{2}-\d{2})/, 'updated date'),
    state: 'DEPLOYED / PUBLICLY VERIFIED',
    source_branch: requireMatch(text, /\| Source branch \|[^\n]*`([^`]+)`/, 'source branch'),
    source_commit: requireMatch(text, /\| Source commit \|[^\n]*`([0-9a-f]{40})`/, 'source commit'),
    artifact_sha256: requireMatch(text, /\| Artifact manifest digest \|[^\n]*`([0-9a-f]{64})`/, 'artifact digest'),
    deployment_id: requireMatch(text, /\| Cloudflare deployment ID \|[^\n]*`([0-9a-f-]{36})`/, 'deployment id'),
    immutable_url: requireMatch(text, /\| Immutable deployment URL \|[^\n]*`(https:\/\/[^`]+)`/, 'immutable URL'),
    homepage_sha256: requireMatch(text, /Homepage SHA-256 `([0-9a-f]{64})`/, 'Homepage public hash'),
    watch_sha256: requireMatch(text, /watch-page SHA-256 `([0-9a-f]{64})`/, 'watch-page public hash'),
    rollback_deployment_id: requireMatch(text, /\| Rollback target \|[^\n]*`([0-9a-f-]{36})`/, 'rollback deployment id')
  };
};
