#!/usr/bin/env node
// Reproduce the existing provider-preserving Pages upload on a clean runner.
// This prepares a separate CLI file. It neither edits the installed CLI nor deploys.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';

export const PIN = Object.freeze({version:'4.105.0', sha256:'8641bcc9571c41b63b3ad2bbdd7d3c52cafc125cf8d5d86b14ae3bad4fcb1889'});
const anchor = '  formData.append("manifest", JSON.stringify(manifest));';

// Kept self-contained so the exact tested function can run inside Wrangler's CJS bundle.
export function mergePreservedManifest(manifest, preserved) {
  if (!preserved || typeof preserved !== 'object' || Array.isArray(preserved) || !Object.keys(preserved).length) throw Error('PRESERVATION_MANIFEST_REQUIRED');
  for (const [key, value] of Object.entries(preserved)) {
    if (!key.startsWith('/') || key.includes('\\') || key.includes('//') || /[?#\x00-\x1f]/.test(key) || key.split('/').some(part => part === '.' || part === '..') || !/^[a-f0-9]{32}$/.test(value)) throw Error('INVALID_PRESERVED_ENTRY');
    if (Object.hasOwn(manifest, key)) throw Error('PRESERVED_PATH_OVERLAP');
  }
  for (const [key, value] of Object.entries(preserved)) manifest[key] = value;
  return manifest;
}

export function patchWrangler(source, version) {
  if (version !== PIN.version || crypto.createHash('sha256').update(source).digest('hex') !== PIN.sha256) throw Error('WRANGLER_PIN_MISMATCH');
  if (source.split(anchor).length !== 2) throw Error('WRANGLER_ANCHOR_MISMATCH');
  const injection = `  if (!process.env.LAIDIES_PRESERVE_MANIFEST) throw new Error("PRESERVATION_MANIFEST_REQUIRED");\n  (${mergePreservedManifest.toString()})(manifest, JSON.parse(fs11.readFileSync(process.env.LAIDIES_PRESERVE_MANIFEST, "utf8")));\n`;
  return source.replace(anchor, injection + anchor);
}

export function prepareWrangler(packageDirectory) {
  const directory = path.resolve(packageDirectory);
  const pkg = JSON.parse(fs.readFileSync(path.join(directory,'package.json'),'utf8'));
  const source = fs.readFileSync(path.join(directory,'wrangler-dist/cli.js'),'utf8');
  const output = path.join(directory,'wrangler-dist/laidies-preserve.cjs');
  const patched = patchWrangler(source, pkg.version);
  // Safe to repeat only if the exact previous output is already present.
  if (fs.existsSync(output)) {
    if (fs.readFileSync(output,'utf8') !== patched) throw Error('PATCH_OUTPUT_EXISTS_WITH_DIFFERENT_BYTES');
  } else fs.writeFileSync(output,patched,{flag:'wx',mode:0o600});
  return output;
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  if (!process.argv[2]) throw Error('Usage: node scripts/patch-newsstand-hosted-wrangler.mjs <installed-wrangler-package-directory>');
  console.log(prepareWrangler(process.argv[2]));
}
