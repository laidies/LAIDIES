// Runtime projection of the governed LAiDIES source bank.
// Authority: operations/agents/aidb-intelligence-desk/sources/practitioner-source-roster.json
// Scout-only sources are intentionally absent: they may discover an original,
// but they may not support a Miss Jeeves answer directly.
export const MISS_JEEVES_SOURCE_POLICY = Object.freeze({
  version: "2026-09-04.2",
  sourceRosterAsOf: "2026-09-04",
  sources: Object.freeze([
    { id: "SRC-ETHAN-MOLLICK", domain: "oneusefulthing.org", authority: "attributed_practitioner", reviewedAt: "2026-08-07", expiresAt: "2026-11-07" },
    { id: "SRC-OPENAI-DEVELOPERS", domain: "developers.openai.com", authority: "official", reviewedAt: "2026-09-04", expiresAt: "2026-10-04" },
    { id: "SRC-ANTHROPIC-ENGINEERING", domain: "anthropic.com", authority: "official", reviewedAt: "2026-09-04", expiresAt: "2026-10-04" },
    { id: "SRC-ANTHROPIC-DOCS", domain: "platform.claude.com", authority: "official", reviewedAt: "2026-09-04", expiresAt: "2026-10-04" },
    { id: "SRC-GOOGLE-AI-DEVELOPERS", domain: "ai.google.dev", authority: "official", reviewedAt: "2026-09-04", expiresAt: "2026-10-04" },
    { id: "SRC-STANFORD-HAI-INDEX", domain: "hai.stanford.edu", authority: "official", reviewedAt: "2026-08-07", expiresAt: "2027-04-01" },
    { id: "SRC-STANFORD-SAIL", domain: "ai.stanford.edu", authority: "official", reviewedAt: "2026-08-07", expiresAt: "2026-11-07" },
    { id: "SRC-SIMON-WILLISON", domain: "simonwillison.net", authority: "attributed_practitioner", reviewedAt: "2026-08-07", expiresAt: "2026-11-07" },
    { id: "SRC-CHIP-HUYEN", domain: "huyenchip.com", authority: "attributed_practitioner", reviewedAt: "2026-08-07", expiresAt: "2026-11-07" }
  ]),
  // Standing first-party and public-interest authorities already admitted for
  // bounded current-answer checks. These supplement the curated source bank;
  // they do not turn a search result into an admitted LAiDIES claim.
  standingAuthorityDomains: Object.freeze([
    "openai.com", "help.openai.com", "platform.openai.com",
    "support.anthropic.com", "platform.claude.com",
    "cloud.google.com", "support.google.com", "blog.google",
    "microsoft.com", "learn.microsoft.com", "support.microsoft.com",
    "nvidia.com", "huggingface.co", "docs.github.com", "apple.com",
    "aws.amazon.com", "docs.aws.amazon.com", "cloudflare.com", "developers.cloudflare.com",
    "nist.gov", "oecd.org", "europa.eu", "canada.ca", "gov.uk",
    "ftc.gov", "cisa.gov", "sec.gov", "iso.org", "owasp.org", "w3.org",
    "reuters.com", "apnews.com", "nature.com", "acm.org", "ieee.org"
  ])
});

export const MISS_JEEVES_EXCLUDED_ROSTER_SOURCES = Object.freeze({
  "SRC-AIDB": "secondary_scout_only",
  "SRC-OPENAI-COOKBOOK": "shared_host_cannot_be_safely_domain_allowlisted",
  "SRC-ALLIE-K-MILLER": "secondary_scout_only",
  "SRC-DEEPLEARNING-AI": "secondary_scout_only"
});

export function currentMissJeevesSourcePolicy(today = new Date().toISOString().slice(0, 10)) {
  const currentBankSources = MISS_JEEVES_SOURCE_POLICY.sources.filter(source => source.expiresAt >= today);
  if (!currentBankSources.length) throw new Error("trusted_source_bank_stale");
  return {
    version: MISS_JEEVES_SOURCE_POLICY.version,
    sourceRosterAsOf: MISS_JEEVES_SOURCE_POLICY.sourceRosterAsOf,
    bankSources: currentBankSources,
    allowedDomains: [...new Set([
      ...currentBankSources.map(source => source.domain),
      ...MISS_JEEVES_SOURCE_POLICY.standingAuthorityDomains
    ])]
  };
}

export function citationDomainIsAllowed(rawUrl, allowedDomains) {
  let hostname;
  try { hostname = new URL(rawUrl).hostname.toLowerCase(); } catch { return false; }
  return allowedDomains.some(domain => hostname === domain || hostname.endsWith(`.${domain}`));
}
