import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

import { runClassifierTrial } from "./terra-classifier-trial.mjs";

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

export async function main() {
  const required = [
    "--provider-input", "--system-prompt", "--send-manifest", "--key-file",
    "--authority-journal", "--out", "--run-id"
  ];
  for (const name of required) {
    if (!argument(name)) throw new Error(`Missing required argument: ${name}`);
  }
  const result = await runClassifierTrial({
    providerInputPath: path.resolve(argument("--provider-input")),
    systemPromptPath: path.resolve(argument("--system-prompt")),
    sendManifestPath: path.resolve(argument("--send-manifest")),
    keyFile: path.resolve(argument("--key-file")),
    authorityJournal: path.resolve(argument("--authority-journal")),
    outputDirectory: path.resolve(argument("--out")),
    runId: argument("--run-id")
  });
  console.log(JSON.stringify(result.summary, null, 2));
  if (result.summary.completed !== result.summary.cases) process.exitCode = 2;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
