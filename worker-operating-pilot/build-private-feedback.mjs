import { mkdir, copyFile } from 'node:fs/promises';
const root = new URL('./', import.meta.url);
const output = new URL('private-dist/private-feedback/', root);
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'app.mjs']) await copyFile(new URL(`private-assets/${name}`, root), new URL(name, output));
for (const name of ['feedback-client.mjs', 'feedback-contract.mjs']) await copyFile(new URL(`src/${name}`, root), new URL(name, output));
console.log('Private inbox assets built');
