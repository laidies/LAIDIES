# Hot Goss Auto Cross-Link System

## The Problem

Hot Goss stories need to automatically cross-reference related content on the LAIDIES site:
- Glossary terms mentioned in the story
- Episodes that cover the same concepts
- Features/games that relate to the topic

Currently this is done manually. It should be automatic every time:
- A new story is added to `content/hot-goss-feed.json`
- A new episode is published
- Glossary terms are added or updated
- Any site content changes that could create new connections

## Architecture

### Content Registry (`content/site/content-registry.json`)

A single source of truth that maps all site content for cross-referencing:

```json
{
  "glossaryTerms": [
    {
      "term": "Generative AI",
      "slug": "generative-ai",
      "url": "learn.html#glossary",
      "keywords": ["generative", "gen ai", "creates", "generates", "produces content"],
      "relatedConcepts": ["Model", "Prompt"]
    },
    {
      "term": "Prompt",
      "slug": "prompt",
      "url": "learn.html#glossary",
      "keywords": ["prompt", "prompting", "ask ai", "instruction", "query", "input"],
      "relatedConcepts": ["Context", "Hallucination"]
    },
    {
      "term": "Hallucination",
      "slug": "hallucination",
      "url": "learn.html#glossary",
      "keywords": ["hallucinate", "hallucination", "made up", "inaccurate", "wrong output", "incorrect", "fabricat"],
      "relatedConcepts": ["Model"]
    },
    {
      "term": "Model",
      "slug": "model",
      "url": "learn.html#glossary",
      "keywords": ["model", "ai model", "language model", "llm", "gpt", "claude", "gemini"],
      "relatedConcepts": ["Generative AI", "Token"]
    },
    {
      "term": "Context",
      "slug": "context",
      "url": "learn.html#glossary",
      "keywords": ["context", "context window", "background", "information you give"],
      "relatedConcepts": ["Prompt", "Token"]
    },
    {
      "term": "Token",
      "slug": "token",
      "url": "learn.html#glossary",
      "keywords": ["token", "tokens", "word pieces", "pricing", "usage"],
      "relatedConcepts": ["Model", "Context"]
    },
    {
      "term": "Agent",
      "slug": "agent",
      "url": "learn.html#glossary",
      "keywords": ["agent", "ai agent", "autonomous", "coding agent", "assistant", "copilot"],
      "relatedConcepts": ["Model", "Prompt"]
    }
  ],
  "episodes": [
    {
      "number": 1,
      "title": "On Wednesdays We Use AI",
      "url": "issues/issue-01.html",
      "concepts": ["what ai is", "first interaction", "chatgpt", "claude", "gemini", "generative ai", "model"],
      "keywords": ["getting started", "first time", "opening the tab", "what is ai", "tools"]
    },
    {
      "number": 2,
      "title": "Tell Me What You Want",
      "url": "issues/issue-02.html",
      "concepts": ["prompting", "context", "specificity", "delegation", "clear instructions"],
      "keywords": ["prompt", "ask", "delegation", "specificity", "output quality", "brief", "instructions"]
    }
  ],
  "features": [
    {
      "name": "Glossary Rolodex",
      "url": "learn.html#glossary",
      "keywords": ["term", "definition", "glossary", "meaning"]
    },
    {
      "name": "Dream Phone",
      "url": "clubhouse.html#dreamPhoneToggle",
      "keywords": ["career advice", "ai career", "work advice"]
    },
    {
      "name": "fAIry Godmother",
      "url": "clubhouse.html#laidy",
      "keywords": ["advice", "help", "prompt feedback", "improve"]
    }
  ]
}
```

### Auto-Link Script (`scripts/auto-crosslink-hot-goss.js`)

Runs automatically:
1. After any story is added to hot-goss-feed.json
2. As part of the GitHub Actions daily pipeline
3. When episodes or glossary terms are updated

Logic:
```
For each story in hot-goss-feed.json:
  1. Scan headline + body + whyYouCare for keyword matches against content-registry
  2. For each match:
     - If it's a glossary term → add to siteLinks with type "glossary"
     - If it's an episode concept → add to siteLinks with type "episode"  
     - If it's a feature → add to siteLinks with type "feature"
  3. De-duplicate (no two links to the same URL)
  4. Rank by relevance (direct keyword match > related concept match)
  5. Limit to 4 links per story (keep it useful, not overwhelming)
  6. Write updated hot-goss-feed.json
```

### Trigger Points

| When this happens | Auto-crosslink runs |
|---|---|
| New story added to feed | GitHub Action triggers crosslink script |
| New episode published | Script re-scans all existing stories for new connections |
| Glossary term added/edited | Script re-scans all stories for new term matches |
| Weekly cron (Wednesdays) | Full re-scan to catch any drift |

### Integration with GitHub Actions Pipeline

Add to `.github/workflows/hot-goss-daily.yml`:

```yaml
- name: Auto-crosslink stories
  run: node scripts/auto-crosslink-hot-goss.js
```

And create a new workflow for content updates:

```yaml
# .github/workflows/crosslink-on-content-change.yml
name: Auto-crosslink on content change
on:
  push:
    paths:
      - 'content/site/site-data.js'
      - 'learn.html'
      - 'issues/**'
      - 'content/hot-goss-feed.json'
jobs:
  crosslink:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: node scripts/auto-crosslink-hot-goss.js
      - run: |
          git config user.email "wednesday.laidies@gmail.com"
          git config user.name "laidies"
          git add content/hot-goss-feed.json
          git diff --staged --quiet || git commit -m "Auto: update story cross-links"
          git push
```

## Mean Girls Section Header

The Hot Goss section intro uses the Amy Poehler "cool mom" energy:

> **"So what's the 411? What has everybody been talking about? What's the hot gossip?"**
> — Mrs. George, trying way too hard

This replaces the current generic: "The biggest AI stories of the week, explained like we are catching you up on the group chat you missed."

New copy for the section:
- Eyebrow: `TLDR. But make it fetch.`
- H2: `Hot Goss`
- Quote/header: `"What's the 411? What has everybody been talking about?"`
- Subtitle: `AI news explained like your cool friend is catching you up. Headlines big enough to bring to the group chat.`
