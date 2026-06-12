#!/usr/bin/env python3
"""
Fetch AI news from RSS feeds, rewrite in LAIDIES voice via Anthropic,
and update content/hot-goss-feed.json.
"""

import json
import os
from datetime import datetime, timezone

import feedparser
import requests

# ─── RSS FEEDS ───────────────────────────────────────────────────────
FEEDS = [
    {"name": "TechCrunch AI", "url": "https://techcrunch.com/category/artificial-intelligence/feed/"},
    {"name": "Ars Technica AI", "url": "https://feeds.arstechnica.com/arstechnica/technology-lab"},
    {"name": "The Verge AI", "url": "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml"},
    {"name": "Simon Willison", "url": "https://simonwillison.net/atom/everything/"},
    {"name": "MIT Tech Review AI", "url": "https://www.technologyreview.com/topic/artificial-intelligence/feed"},
]

MAX_WEEKLY_STORIES = 4
MAX_DAILY_HEADLINES = 3


def fetch_stories():
    """Pull recent AI stories from RSS feeds."""
    all_stories = []
    for feed_info in FEEDS:
        try:
            feed = feedparser.parse(feed_info["url"])
            for entry in feed.entries[:5]:
                title = entry.get("title", "").strip()
                link = entry.get("link", "")
                summary = entry.get("summary", entry.get("description", ""))[:300]
                # Basic AI relevance filter
                text = (title + " " + summary).lower()
                ai_keywords = ["ai", "artificial intelligence", "llm", "gpt", "claude",
                               "gemini", "openai", "anthropic", "machine learning",
                               "generative", "copilot", "model", "chatbot"]
                if any(kw in text for kw in ai_keywords):
                    all_stories.append({
                        "title": title,
                        "summary": summary[:200],
                        "source": link,
                        "feed": feed_info["name"],
                    })
        except Exception as e:
            print(f"  Skipped {feed_info['name']}: {e}")
    
    # Deduplicate by title similarity (simple)
    seen_titles = set()
    unique = []
    for s in all_stories:
        key = s["title"][:40].lower()
        if key not in seen_titles:
            seen_titles.add(key)
            unique.append(s)
    
    return unique[:12]  # Top 12 candidates


def rewrite_in_laidies_voice(stories):
    """Use Anthropic Claude to rewrite stories in LAIDIES voice."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("  No ANTHROPIC_API_KEY — using raw headlines")
        return format_without_ai(stories)

    try:
        import anthropic
        client = anthropic.Anthropic(api_key=api_key)
    except Exception as e:
        print(f"  Anthropic client error: {e}")
        return format_without_ai(stories)

    # Build the prompt
    story_text = "\n".join([
        f"{i+1}. {s['title']} — {s['summary']} (Source: {s['source']})"
        for i, s in enumerate(stories[:8])
    ])

    prompt = f"""You write the "Hot Goss" section for LAIDIES — an AI fluency newsletter for professional women. 
Voice: 90s/Y2K girl-power, warm, funny, smart. Think group chat energy — like catching someone up on what they missed.

Rules:
- Headlines should be punchy and opinionated (bold the headline)
- Body is 1-2 sentences explaining why it matters, using pop culture analogies
- End each with a link labeled "Read the receipt"
- Pick the 4 most interesting stories for "weeklyStories" and 3 quick ones for "dailyHeadlines"
- dailyHeadlines are shorter — 1 sentence each

Return ONLY valid JSON in this exact format:
{{
  "weeklyStories": [
    {{"headline": "...", "body": "...", "source": "url"}},
  ],
  "dailyHeadlines": [
    {{"headline": "...", "body": "...", "source": "url"}},
  ]
}}

Here are today's AI stories:
{story_text}
"""

    try:
        response = client.messages.create(
            model="claude-haiku-4-20250414",
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}]
        )
        text = response.content[0].text.strip()
        # Extract JSON from response
        if text.startswith("{"):
            return json.loads(text)
        # Try to find JSON in the response
        start = text.find("{")
        end = text.rfind("}") + 1
        if start > -1 and end > 0:
            return json.loads(text[start:end])
    except Exception as e:
        print(f"  Anthropic API error: {e}")

    return format_without_ai(stories)


def format_without_ai(stories):
    """Fallback: format stories without AI rewrite."""
    weekly = []
    daily = []
    for i, s in enumerate(stories[:MAX_WEEKLY_STORIES]):
        weekly.append({
            "headline": s["title"],
            "body": s["summary"][:150] + "...",
            "source": s["source"],
        })
    for s in stories[MAX_WEEKLY_STORIES:MAX_WEEKLY_STORIES + MAX_DAILY_HEADLINES]:
        daily.append({
            "headline": s["title"],
            "body": s["summary"][:100] + "...",
            "source": s["source"],
        })
    return {"weeklyStories": weekly, "dailyHeadlines": daily}


def main():
    print("🗞️ Hot Goss Daily Update")
    print("  Fetching stories from RSS feeds...")
    stories = fetch_stories()
    print(f"  Found {len(stories)} AI stories")

    if not stories:
        print("  No stories found — keeping existing feed")
        return

    print("  Rewriting in LAIDIES voice...")
    result = rewrite_in_laidies_voice(stories)

    # Build the feed
    feed = {
        "lastUpdated": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        "weeklyStories": result.get("weeklyStories", [])[:MAX_WEEKLY_STORIES],
        "dailyHeadlines": result.get("dailyHeadlines", [])[:MAX_DAILY_HEADLINES],
    }

    # Write to file
    feed_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "content", "hot-goss-feed.json")
    with open(feed_path, "w", encoding="utf-8") as f:
        json.dump(feed, f, indent=2, ensure_ascii=False)

    print(f"  ✓ Updated {feed_path}")
    print(f"    Weekly stories: {len(feed['weeklyStories'])}")
    print(f"    Daily headlines: {len(feed['dailyHeadlines'])}")


if __name__ == "__main__":
    main()
