#!/usr/bin/env node
/**
 * Auto Cross-Link Hot Goss Stories
 * 
 * Scans hot-goss-feed.json against content-registry.json
 * and automatically adds siteLinks to stories based on keyword matches.
 * 
 * Run: node scripts/auto-crosslink-hot-goss.js
 * Triggered by: GitHub Actions on content change, daily pipeline
 */

const fs = require('fs');
const path = require('path');

const FEED_PATH = path.join(__dirname, '..', 'content', 'hot-goss-feed.json');
const REGISTRY_PATH = path.join(__dirname, '..', 'content', 'site', 'content-registry.json');
const MAX_LINKS_PER_STORY = 4;

function main() {
  // Load files
  const feed = JSON.parse(fs.readFileSync(FEED_PATH, 'utf-8'));
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));

  let totalLinksAdded = 0;

  // Process all stories
  const allStories = [...(feed.weeklyStories || []), ...(feed.dailyHeadlines || [])];
  
  for (const story of allStories) {
    const searchText = [
      story.headline || '',
      story.body || '',
      story.whyYouCare || '',
      story.cocktailParty || ''
    ].join(' ').toLowerCase();

    const links = [];

    // Check glossary terms
    for (const term of registry.glossaryTerms) {
      const matched = term.keywords.some(kw => searchText.includes(kw.toLowerCase()));
      if (matched) {
        links.push({
          label: `What's ${term.term.toLowerCase().startsWith('a') ? 'an' : 'a'} ${term.term.toLowerCase()}?`,
          url: term.url,
          type: 'glossary',
          score: countMatches(searchText, term.keywords)
        });
      }
    }

    // Check episodes
    for (const ep of registry.episodes) {
      const matched = ep.keywords.some(kw => searchText.includes(kw.toLowerCase()));
      if (matched) {
        links.push({
          label: `Episode ${ep.number}: ${ep.title}`,
          url: ep.url,
          type: 'episode',
          score: countMatches(searchText, ep.keywords)
        });
      }
    }

    // Check features
    for (const feat of registry.features) {
      const matched = feat.keywords.some(kw => searchText.includes(kw.toLowerCase()));
      if (matched && feat.url !== 'learn/glossary.html') { // avoid duplicate glossary links
        links.push({
          label: feat.name,
          url: feat.url,
          type: 'feature',
          score: countMatches(searchText, feat.keywords)
        });
      }
    }

    // De-duplicate by URL
    const seen = new Set();
    const uniqueLinks = links.filter(link => {
      if (seen.has(link.url)) return false;
      seen.add(link.url);
      return true;
    });

    // Sort by relevance score, take top N
    uniqueLinks.sort((a, b) => b.score - a.score);
    const finalLinks = uniqueLinks.slice(0, MAX_LINKS_PER_STORY).map(({ label, url, type }) => ({ label, url, type }));

    // Only update if we found links
    if (finalLinks.length > 0) {
      story.siteLinks = finalLinks;
      totalLinksAdded += finalLinks.length;
    }
  }

  // Write back
  fs.writeFileSync(FEED_PATH, JSON.stringify(feed, null, 2), 'utf-8');
  console.log(`✅ Auto-crosslink complete: ${totalLinksAdded} links across ${allStories.length} stories`);
}

function countMatches(text, keywords) {
  return keywords.reduce((count, kw) => {
    const regex = new RegExp(kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = text.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);
}

main();
