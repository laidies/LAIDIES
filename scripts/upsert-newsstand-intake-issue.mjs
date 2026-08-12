#!/usr/bin/env node
import fs from "node:fs";

const LABEL = "newsstand-intake";
const TITLE = "[NewsStand intake] Unreconciled cloud signals";

function md(value) {
  return String(value || "").replace(/[\[\]`*_<>]/g, " ").replace(/\s+/g, " ").trim();
}

export function buildIssueComment(receipt, runUrl) {
  const lines = [
    `## Private intake — ${receipt.generatedAt}`,
    "",
    `**Outcome:** ${receipt.counts.newSignals} new private signal(s); ${receipt.counts.sourceHealthAlerts} new or changed source-health alert(s). Nothing was drafted, approved, published or deployed.`,
    "",
    `**Receipt:** [GitHub Actions run](${runUrl})`,
    ""
  ];
  if (receipt.newSignals.length) {
    lines.push("### Signals requiring an exact disposition", "");
    for (const signal of receipt.newSignals) {
      lines.push(`- **${md(signal.title)}** — ${md(signal.sourceName)} (${signal.signalId})`);
      lines.push(`  - Source: ${signal.url}`);
      lines.push(`  - Published: ${signal.publishedAt || "UNKNOWN"}`);
      lines.push(`  - Candidate routes: ${signal.destinations.map(md).join(", ")}`);
      lines.push("  - Required next record: duplicate / quiet / watch / no-build, or one governed content work order with exact owner and trigger.");
    }
    lines.push("");
  }
  if (receipt.sourceHealthAlerts.length) {
    lines.push("### Source health", "");
    for (const source of receipt.sourceHealthAlerts) {
      lines.push(`- ${md(source.sourceId)} — ${md(source.error)} (${source.url || "URL unavailable"})`);
    }
    lines.push("");
  }
  lines.push("This issue is a private execution queue, not a publication queue. It may close only after every listed signal has a durable disposition.");
  return lines.join("\n");
}

async function api(path, options = {}) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  if (!token || !repo) throw new Error("GITHUB_TOKEN and GITHUB_REPOSITORY are required");
  const response = await fetch(`https://api.github.com/repos/${repo}${path}`, {
    ...options,
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${token}`,
      "x-github-api-version": "2022-11-28",
      "content-type": "application/json",
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status}: ${body.slice(0, 500)}`);
  }
  return response.status === 204 ? null : response.json();
}

async function main() {
  const receiptPath = process.argv[2];
  if (!receiptPath) throw new Error("usage: node scripts/upsert-newsstand-intake-issue.mjs RECEIPT.json");
  const receipt = JSON.parse(fs.readFileSync(receiptPath, "utf8"));
  if (!(receipt.counts.newSignals || receipt.counts.sourceHealthAlerts)) {
    console.log("NO_ISSUE_UPDATE — no signals or source-health failures");
    return;
  }
  try {
    await api("/labels", { method: "POST", body: JSON.stringify({ name: LABEL, color: "5319E7", description: "Private NewsStand source signals awaiting durable reconciliation" }) });
  } catch (error) {
    if (!/422/.test(error.message)) throw error;
  }
  const issues = await api(`/issues?state=open&labels=${encodeURIComponent(LABEL)}&per_page=100`);
  let issue = issues.find((candidate) => candidate.title === TITLE);
  if (!issue) {
    issue = await api("/issues", {
      method: "POST",
      body: JSON.stringify({
        title: TITLE,
        labels: [LABEL],
        body: "Cloud intake continues while Ali's laptop is off. Every signal must receive a durable duplicate, quiet, watch, no-build or governed work-order disposition. This issue does not authorize drafting, approval, publication or deployment."
      })
    });
  }
  const runUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
  await api(`/issues/${issue.number}/comments`, {
    method: "POST",
    body: JSON.stringify({ body: buildIssueComment(receipt, runUrl) })
  });
  console.log(`NEWSSTAND INTAKE ISSUE UPDATED number=${issue.number}`);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
