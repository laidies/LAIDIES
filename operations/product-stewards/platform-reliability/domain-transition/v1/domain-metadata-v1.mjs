import crypto from "node:crypto";

export const DOMAIN_METADATA_ID = "LAIDIES-DOMAIN-METADATA-2026-07-26-v1";
export const CANONICAL_ORIGIN = "https://laidies.ai";
export const OWNER_RECEIPT_SHA256 =
  "93361a7a42a4fb7de63f5b1f0120e6e63557529b419b2c92583825b56409cb99";

export const sha256 = (value) =>
  crypto.createHash("sha256").update(value).digest("hex");

const canonicalPattern =
  /<link\b(?=[^>]*\brel\s*=\s*(["'])canonical\1)[^>]*\/?>/gi;
const ogUrlPattern =
  /<meta\b(?=[^>]*\bproperty\s*=\s*(["'])og:url\1)[^>]*\/?>/gi;

export function metadataTags(source) {
  return {
    canonical: [...source.matchAll(canonicalPattern)].map((match) => match[0]),
    ogUrl: [...source.matchAll(ogUrlPattern)].map((match) => match[0])
  };
}

export function transformDomainMetadata(file, source, publicUrl) {
  if (!/<\/head\s*>/i.test(source)) {
    throw new Error(`Domain metadata requires </head>: ${file}`);
  }
  const tags = metadataTags(source);
  if (tags.canonical.length > 1 || tags.ogUrl.length > 1) {
    throw new Error(
      `Domain metadata duplicate tags rejected: ${file}` +
      ` canonical=${tags.canonical.length} og=${tags.ogUrl.length}`
    );
  }

  const canonicalTag = `<link rel="canonical" href="${publicUrl}" />`;
  const ogUrlTag = `<meta property="og:url" content="${publicUrl}" />`;
  let output = source;
  if (tags.canonical.length) {
    output = output.replace(canonicalPattern, canonicalTag);
  }
  if (tags.ogUrl.length) {
    output = output.replace(ogUrlPattern, ogUrlTag);
  }

  const insertions = [];
  if (!tags.canonical.length) insertions.push(`  ${canonicalTag}`);
  if (!tags.ogUrl.length) insertions.push(`  ${ogUrlTag}`);
  if (insertions.length) {
    output = output.replace(/<\/head\s*>/i, `${insertions.join("\n")}\n</head>`);
  }
  return output;
}

export function reverseDomainMetadata(source, publicUrl, predecessor) {
  const canonicalTag = `<link rel="canonical" href="${publicUrl}" />`;
  const ogUrlTag = `<meta property="og:url" content="${publicUrl}" />`;
  let output = source;

  if (predecessor.canonicalTag === null) {
    output = output.replace(`  ${canonicalTag}\n`, "");
  } else {
    output = output.replace(canonicalTag, predecessor.canonicalTag);
  }
  if (predecessor.ogUrlTag === null) {
    output = output.replace(`  ${ogUrlTag}\n`, "");
  } else {
    output = output.replace(ogUrlTag, predecessor.ogUrlTag);
  }
  return output;
}
