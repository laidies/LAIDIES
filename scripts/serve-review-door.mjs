#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { resolveContentPresentation } from "./resolve-review-url.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const value = flag => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };
const consumed = new Set(["--type", "--work-order", "--port"]);
for (const flag of [...consumed]) { const i = args.indexOf(flag); if (i >= 0 && args[i + 1]) consumed.add(args[i + 1]); }
const candidate = args.find(item => !consumed.has(item) && !item.startsWith("--"));
const type = value("--type");
const workOrderId = value("--work-order");
const port = Number(value("--port") || "8010");
const fail = reasons => {
  console.error("REVIEW DOOR SERVER BLOCKED");
  for (const reason of Array.isArray(reasons) ? reasons : [reasons]) console.error(`- ${reason}`);
  process.exit(1);
};

export function requestHasToken(requestUrl, cookieHeader, token) {
  const encoded = encodeURIComponent(token);
  return requestUrl.startsWith(`/__laidies_review/${encoded}/`) || (cookieHeader || "").split(/;\s*/).includes(`laidies_review_token=${encoded}`);
}

export function safeRepositoryFile(root, requestPath, token, candidateRelative) {
  const prefix = `/__laidies_review/${encodeURIComponent(token)}/`;
  let relative;
  if (requestPath.startsWith(prefix)) {
    const suffix = decodeURIComponent(requestPath.slice(prefix.length));
    relative = suffix === "review.html" ? candidateRelative : path.join(path.dirname(candidateRelative), suffix);
  } else {
    relative = decodeURIComponent(requestPath.replace(/^\/+/, ""));
  }
  const absolute = path.resolve(root, relative);
  if (!absolute.startsWith(`${root}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) return null;
  return absolute;
}

function main() {
  const contentTypes = new Set(["content", "prose", "book"]);
  const designTypes = new Set(["design", "page", "visual", "media"]);
  if (!type || (!contentTypes.has(type) && !designTypes.has(type))) fail("--type must be prose, book, page, visual, media, content or design");
  if (!candidate) fail("exact candidate path is required");
  if (!Number.isInteger(port) || port < 1024 || port > 65535) fail("--port must be an unprivileged TCP port");
  const absoluteCandidate = path.resolve(ROOT, candidate);
  if (!absoluteCandidate.startsWith(`${ROOT}${path.sep}`) || !fs.existsSync(absoluteCandidate) || !fs.statSync(absoluteCandidate).isFile()) fail("candidate must be a repository file");
  const candidateRelative = path.relative(ROOT, absoluteCandidate);

  if (contentTypes.has(type)) {
    if (!workOrderId) fail(`${type} requires --work-order <exact-id>`);
    const admission = resolveContentPresentation({ root: ROOT, candidatePath: candidateRelative, workOrderId });
    if (admission.errors.length) fail(admission.errors);
  } else {
    const result = spawnSync(process.execPath, [path.join(ROOT, "scripts/resolve-design-review-url.mjs"), candidateRelative], { cwd: ROOT, encoding: "utf8" });
    if (result.status !== 0) fail(result.stderr.trim() || "design admission failed");
  }

  const token = crypto.randomBytes(24).toString("base64url");
  const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".ttf": "font/ttf" };
  const server = http.createServer((request, response) => {
  if (!["GET", "HEAD"].includes(request.method || "")) { response.writeHead(405); response.end("Method not allowed"); return; }
  const parsed = new URL(request.url || "/", `http://${request.headers.host || "127.0.0.1"}`);
  if (!requestHasToken(parsed.pathname, request.headers.cookie, token)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
    response.end("Review Door admission token required. Raw candidate paths are not review URLs.\n");
    return;
  }
  const file = safeRepositoryFile(ROOT, parsed.pathname, token, candidateRelative);
  if (!file) { response.writeHead(404); response.end("Not found"); return; }
  const headers = { "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
  if (parsed.pathname.startsWith(`/__laidies_review/${encodeURIComponent(token)}/`)) headers["Set-Cookie"] = `laidies_review_token=${encodeURIComponent(token)}; HttpOnly; SameSite=Strict; Path=/`;
  response.writeHead(200, headers);
  if (request.method === "HEAD") { response.end(); return; }
  fs.createReadStream(file).pipe(response);
  });
  server.on("error", error => fail(`could not bind review server: ${error.message}`));
  server.listen(port, "127.0.0.1", () => {
    console.log(`REVIEW DOOR READY type=${type} candidate=${candidateRelative}`);
    console.log(`http://127.0.0.1:${port}/__laidies_review/${encodeURIComponent(token)}/review.html`);
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
