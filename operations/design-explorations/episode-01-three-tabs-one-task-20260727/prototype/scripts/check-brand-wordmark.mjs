import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sourceRoots = [path.join(root, "src"), path.join(root, "public")];
const retiredAssetNames = [
  "laidies-wordmark-final-b-light",
  "laidies-wordmark-final-b-dark",
  "laidies-logo-header-approved-v6",
  "laidies-logo-masthead-approved-v3",
  "laidies-wordmark.png",
];

async function filesBelow(directory) {
  const entries = await readdir(directory);
  const files = [];

  for (const entry of entries) {
    const candidate = path.join(directory, entry);
    const info = await stat(candidate);
    if (info.isDirectory()) files.push(...(await filesBelow(candidate)));
    else files.push(candidate);
  }

  return files;
}

const files = (
  await Promise.all(sourceRoots.map((directory) => filesBelow(directory)))
).flat();
const failures = [];

for (const file of files) {
  const relative = path.relative(root, file);
  const lowerName = relative.toLowerCase();

  if (retiredAssetNames.some((name) => lowerName.includes(name))) {
    failures.push(`${relative}: retired LAiDIES wordmark asset`);
  }

  if (/\.(jsx?|tsx?|css|html|json|md)$/i.test(file)) {
    const text = (await readFile(file, "utf8")).toLowerCase();
    for (const retiredName of retiredAssetNames) {
      if (text.includes(retiredName)) {
        failures.push(`${relative}: references ${retiredName}`);
      }
    }
  }
}

const appSource = await readFile(path.join(root, "src", "App.jsx"), "utf8");
if (!appSource.includes('data-brand-wordmark="current-live-jost"')) {
  failures.push(
    "src/App.jsx: missing the current live-Jost wordmark authority marker",
  );
}

if (failures.length) {
  console.error("Brand wordmark check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Brand wordmark check passed: current live-Jost treatment only.");
