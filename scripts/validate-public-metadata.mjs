#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const artifact = path.resolve(process.argv[2] || '');
const failures = [];

function requireFile(relative) {
  const absolute = path.join(artifact, relative);
  if (!fs.existsSync(absolute)) failures.push(`missing public metadata: ${relative}`);
  return absolute;
}

if (!process.argv[2] || !fs.existsSync(artifact)) {
  console.error('Usage: node scripts/validate-public-metadata.mjs <public-artifact>');
  process.exit(2);
}

const robotsPath = requireFile('robots.txt');
const sitemapPath = requireFile('sitemap.xml');
const redirectsPath = requireFile('_redirects');
requireFile('404.html');

if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  if (!/^Sitemap:\s*https:\/\/laidies\.ai\/sitemap\.xml\s*$/mi.test(robots)) {
    failures.push('robots.txt does not declare the canonical LAiDIES sitemap');
  }
}

if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  if (!urls.length) failures.push('sitemap.xml contains no URLs');

  for (const value of urls) {
    let url;
    try {
      url = new URL(value);
    } catch {
      failures.push(`invalid sitemap URL: ${value}`);
      continue;
    }
    if (url.origin !== 'https://laidies.ai') {
      failures.push(`non-canonical sitemap origin: ${value}`);
      continue;
    }
    const relative = url.pathname === '/'
      ? 'index.html'
      : `${decodeURIComponent(url.pathname).replace(/^\/|\/$/g, '')}.html`;
    if (!fs.existsSync(path.join(artifact, relative))) {
      failures.push(`sitemap route has no public page: ${value} -> ${relative}`);
    }
  }

  if (/grimoire(?:\.html|\/slaiyer-handbook|\/power-map)/i.test(sitemap)) {
    failures.push('sitemap.xml still promotes retired Grimoire routes');
  }
}

if (fs.existsSync(redirectsPath)) {
  const redirects = fs.readFileSync(redirectsPath, 'utf8');
  for (const retired of [
    '/grimoire.html',
    '/grimoire/slaiyer-handbook.html',
    '/grimoire/power-map.html',
  ]) {
    if (!redirects.split(/\r?\n/).some((line) => line.startsWith(`${retired} `))) {
      failures.push(`missing retired-route redirect: ${retired}`);
    }
  }
}

if (failures.length) {
  console.error(`Public metadata validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Public metadata validation passed: robots, sitemap, 404 and retired-route redirects are release-ready.');
