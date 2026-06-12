const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const episodeDir = path.join(root, "content", "episodes");
const siteDir = path.join(root, "content", "site");
const socialDir = path.join(root, "social", "episodes");
const emailDir = path.join(root, "email", "buttondown");
const communityPromptDir = path.join(root, "community", "weekly-prompts");
const issueContentDir = path.join(root, "content", "issues");
const indexPath = path.join(root, "content", "episode-index.json");
const siteDataPath = path.join(siteDir, "site-data.js");
const generatedIssueMarker = "data-generated-by=\"laidies-weekly-production\"";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function padIssue(number) {
  return String(number).padStart(2, "0");
}

function safeList(items) {
  return (items || []).map((item) => `- ${item}`).join("\n");
}

function readJsonIfExists(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return readJson(filePath);
}

function publicUrl(pathname) {
  return `https://wearelaidies.com/${pathname}`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInlineMarkdown(value) {
  let output = escapeHtml(value);
  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    const safeHref = escapeHtml(href);
    const external = /^https?:\/\//.test(href) ? " rel=\"noreferrer\"" : "";
    return `<a href="${safeHref}"${external}>${label}</a>`;
  });
  output = output.replace(/`([^`]+)`/g, "<code>$1</code>");
  output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return output;
}

function stripWebsiteModulesSection(markdown) {
  const lines = markdown.split(/\r?\n/);
  const kept = [];
  let skipping = false;

  for (const line of lines) {
    if (/^## Website Modules\s*$/i.test(line.trim())) {
      skipping = true;
      continue;
    }

    if (skipping && /^##\s+/.test(line)) {
      skipping = false;
    }

    if (!skipping) kept.push(line);
  }

  return kept.join("\n");
}

function markdownToHtml(markdown) {
  const lines = stripWebsiteModulesSection(markdown).split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let list = [];
  let code = [];
  let inCode = false;

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${renderInlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    html.push("<ul>");
    for (const item of list) html.push(`<li>${renderInlineMarkdown(item)}</li>`);
    html.push("</ul>");
    list = [];
  }

  function flushCode() {
    if (!code.length) return;
    html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
    code = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (/^```/.test(line)) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(rawLine);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    if (/^Published page:\s*/i.test(line) || /^Source metadata:\s*/i.test(line)) {
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      if (level === 1) continue;
      html.push(`<h${level}>${renderInlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const bullet = line.match(/^-\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      list.push(bullet[1]);
      continue;
    }

    const quote = line.match(/^>\s+(.+)$/);
    if (quote) {
      flushParagraph();
      flushList();
      html.push(`<blockquote>${renderInlineMarkdown(quote[1])}</blockquote>`);
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  flushCode();
  return html.join("\n");
}

function buildSiteLinksHtml(episode) {
  const links = episode.siteLinks || [];
  if (!links.length) return "";
  const items = links
    .map((link) => `<li><a href="../${escapeHtml(link.url)}">${renderInlineMarkdown(link.label)}</a></li>`)
    .join("\n");

  return `<section class="issue-site-links" aria-labelledby="issue-site-links-title">
  <h2 id="issue-site-links-title">Keep Playing on the Website</h2>
  <ul>
${items}
  </ul>
</section>`;
}

function buildGeneratedIssuePage(episode, markdown) {
  const issue = padIssue(episode.number);
  const body = markdownToHtml(markdown);
  return `<!doctype html>
<html lang="en" ${generatedIssueMarker}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>lAIdies #${issue}: ${escapeHtml(episode.title)}</title>
    <meta name="description" content="${escapeHtml(episode.subtitle || episode.oneLineDescription)}" />
    <link rel="stylesheet" href="../styles.css?v=weekly-production" />
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="../index.html#top" aria-label="lAIdies home">
        <img src="../assets/laidies-logo-wordmark.png" alt="" />
      </a>
      <nav class="nav" aria-label="Primary navigation">
        <a href="../index.html#episodes">Episodes</a>
        <a href="../index.html#about">About</a>
        <a href="../index.html#community-board">Community</a>
        <a href="../index.html#signup">Subscribe</a>
      </nav>
    </header>
    <main class="issue-page">
      <a class="back-link" href="../index.html#episodes">Back to episodes</a>
      <article>
        <p class="eyebrow">Issue ${issue}</p>
        <h1>${escapeHtml(episode.title)}</h1>
        <p class="issue-meta">${escapeHtml(episode.subtitle || episode.lesson)}</p>
${body}
${buildSiteLinksHtml(episode)}
      </article>
    </main>
    <footer class="site-footer">
      <p>lAIdies</p>
      <div>
        <a href="../index.html#episodes">Episodes</a>
        <a href="../index.html#community-board">Community</a>
        <a href="../index.html#signup">Subscribe</a>
      </div>
    </footer>
  </body>
</html>
`;
}

function shouldWriteIssuePage(filePath) {
  if (!fs.existsSync(filePath)) return true;
  const existing = fs.readFileSync(filePath, "utf8");
  return existing.includes(generatedIssueMarker);
}

function buildIssuePageIfPossible(episode) {
  const issue = padIssue(episode.number);
  const sourcePath = path.join(issueContentDir, `issue-${issue}.md`);
  if (!fs.existsSync(sourcePath) || !episode.issueUrl) return "missing-source";

  const issuePath = path.join(root, episode.issueUrl);
  if (!shouldWriteIssuePage(issuePath)) return "manual-page-kept";

  fs.mkdirSync(path.dirname(issuePath), { recursive: true });
  fs.writeFileSync(issuePath, buildGeneratedIssuePage(episode, fs.readFileSync(sourcePath, "utf8")), "utf8");
  return "generated";
}

function buildInstagramKit(episode) {
  const issue = padIssue(episode.number);
  const hooks = episode.social?.reelHooks || [];
  const primaryHook = hooks[0] || episode.title;
  const secondaryHook = hooks[1] || episode.subtitle;
  const tertiaryHook = hooks[2] || episode.mainCharacterEnergy;

  return `# Instagram Kit: Issue ${issue} - ${episode.title}

Source file: \`content/episodes/issue-${issue}.json\`

## Episode Snapshot

- Title: ${episode.title}
- Lesson: ${episode.lesson}
- Emotional beat: ${episode.emotionalBeat}
- Issue URL: ${episode.issueUrl}
- CTA: ${episode.social?.cta || episode.communityPrompt}

## Reel 1: Episode Hook

On-screen hook:

\`\`\`text
${primaryHook}
\`\`\`

Script:

\`\`\`text
${primaryHook}

This week on lAIdies: ${episode.episodeDescription}

The actual lesson: ${episode.lesson}

Try this in under 10 minutes:
${episode.tryOn}
\`\`\`

Caption:

\`\`\`text
${episode.social?.captionAngle || episode.oneLineDescription}

Try-On:
${episode.tryOn}

${episode.social?.cta || "Read the full episode at the link in bio."}

#lAIdies #AIForWomen #AIFluency #WomenInAI #WomenAtWork
\`\`\`

## Reel 2: Practical Takeaway

On-screen hook:

\`\`\`text
${secondaryHook}
\`\`\`

Script:

\`\`\`text
${secondaryHook}

The useful work move is:
${episode.mainCharacterEnergy}

Do this:
${episode.tryOn}
\`\`\`

Caption:

\`\`\`text
Save this for the next time AI comes up at work:

"${episode.mainCharacterEnergy}"

${episode.social?.cta || "Bring the result to The Try-On Debrief."}

#AIForWork #CareerConfidence #PromptTips #lAIdies
\`\`\`

## Reel 3: Community Prompt

On-screen hook:

\`\`\`text
${tertiaryHook}
\`\`\`

Script:

\`\`\`text
The lAIdies Room question this week:

${episode.communityPrompt}

Post the version before it turns into a second job in your head. Someone else is probably stuck at the same locker.
\`\`\`

Caption:

\`\`\`text
Community prompt:
${episode.communityPrompt}

Ask the rooms. Share the attempt. Bring the receipts.

#WomenAtWork #CareerCommunity #AIForWomen #lAIdies
\`\`\`

## Carousel: ${episode.social?.carouselIdea || episode.title}

Slide 1:

\`\`\`text
${episode.social?.carouselIdea || episode.title}
\`\`\`

Slide 2:

\`\`\`text
The episode:
${episode.title}
\`\`\`

Slide 3:

\`\`\`text
What you learn:
${episode.lesson}
\`\`\`

Slide 4:

\`\`\`text
Say this in a meeting:
"${episode.mainCharacterEnergy}"
\`\`\`

Slide 5:

\`\`\`text
Try this:
${episode.tryOn}
\`\`\`

Slide 6:

\`\`\`text
Remember, lAIdies:
${episode.rememberLine}
\`\`\`

Slide 7:

\`\`\`text
Read Issue ${issue}.
Then bring your answer to the room.
\`\`\`

Caption:

\`\`\`text
Issue ${issue}: ${episode.title}

${episode.oneLineDescription}

Save this, try the prompt, and send it to the friend who is learning AI between meetings.

#lAIdies #AIForWomen #AIFluency #WomenInAI #FutureOfWork
\`\`\`

## Stories

Frame 1:

\`\`\`text
New lAIdies episode is live:
${episode.title}
\`\`\`

Frame 2:

\`\`\`text
This week:
${episode.lesson}
\`\`\`

Frame 3:

\`\`\`text
Poll:
${episode.social?.storyPoll || episode.communityPrompt}
\`\`\`

Frame 4:

\`\`\`text
10-minute Try-On:
${episode.tryOn}
\`\`\`

Frame 5:

\`\`\`text
Read the episode.
Then tell us how it went.
\`\`\`

Link sticker:

\`\`\`text
${episode.issueUrl}
\`\`\`

## Tags To Carry Forward

Glossary terms:
${safeList(episode.glossaryTerms)}

References:
${safeList(episode.referencesUsed)}

Tools:
${safeList(episode.toolsMentioned)}
`;
}

function buildLinkedInPost(episode) {
  const issue = padIssue(episode.number);
  return `# LinkedIn Draft: Issue ${issue} - ${episode.title}

Source file: \`content/episodes/issue-${issue}.json\`

## Post

AI fluency does not start with becoming technical.

It starts with one useful workplace try.

This week in lAIdies:
${episode.lesson}

The work move:
"${episode.mainCharacterEnergy}"

Try-On:
${episode.tryOn}

Why it matters:
${episode.oneLineDescription}

Read Issue ${issue}: ${publicUrl(episode.issueUrl)}

#AIForWork #WomenInAI #FutureOfWork #AIFluency
`;
}

function buildButtondownDraft(episode) {
  const issue = padIssue(episode.number);
  const links = episode.siteLinks || [];
  const linkList = links.length
    ? links.map((link) => `- [${link.label}](${publicUrl(link.url)})`).join("\n")
    : `- [Read the issue](${publicUrl(episode.issueUrl)})`;

  return `Subject: lAIdies #${issue}: ${episode.title}

Preview: ${episode.subtitle}

# ${episode.title}

${episode.oneLineDescription}

This week:

${episode.lesson}

Try this:

${episode.tryOn}

Main Character Energy:

> ${episode.mainCharacterEnergy}

Keep playing on the website:

${linkList}

Remember, lAIdies:

${episode.rememberLine}

Read the full issue:
${publicUrl(episode.issueUrl)}
`;
}

function buildCommunityPrompt(episode) {
  const issue = padIssue(episode.number);
  return `# Weekly Community Prompt: Issue ${issue} - ${episode.title}

Source file: \`content/episodes/issue-${issue}.json\`

## Primary Thread

${episode.communityPrompt}

## Try-On Debrief

${episode.tryOn}

## Room Nudge

Post the version before it turns into a second job in your head. Someone else is probably stuck at the same locker.

## Website Links

${safeList((episode.siteLinks || []).map((link) => `${link.label}: ${link.url}`))}
`;
}

function buildSiteData(episodes) {
  const quizzes = readJsonIfExists(path.join(siteDir, "quizzes.json"), {});
  const cardPacks = readJsonIfExists(path.join(siteDir, "card-packs.json"), { cards: [] });
  const publishedEpisodes = episodes.filter((episode) => episode.status === "published");
  const publishedQuizKeys = new Set(publishedEpisodes.map((episode) => episode.websiteModules?.quiz).filter(Boolean));
  const publishedCardPackKeys = new Set(publishedEpisodes.map((episode) => episode.websiteModules?.cardPack).filter(Boolean));
  const publishedQuizzes = Object.fromEntries(
    Object.entries(quizzes).filter(([key]) => publishedQuizKeys.has(key))
  );
  const publishedCardPacks = {
    ...cardPacks,
    cards: (cardPacks.cards || []).filter((card) => publishedCardPackKeys.has(card.issue))
  };

  return `window.LAIDIES_SITE_DATA = ${JSON.stringify({
    episodes: publishedEpisodes,
    quizzes: publishedQuizzes,
    cardPacks: publishedCardPacks
  }, null, 2)};\n`;
}

function main() {
  fs.mkdirSync(siteDir, { recursive: true });
  fs.mkdirSync(socialDir, { recursive: true });
  fs.mkdirSync(emailDir, { recursive: true });
  fs.mkdirSync(communityPromptDir, { recursive: true });

  const files = fs
    .readdirSync(episodeDir)
    .filter((file) => /^issue-\d+\.json$/.test(file))
    .sort();

  const episodes = files.map((file) => {
    const episode = readJson(path.join(episodeDir, file));
    const issue = padIssue(episode.number);
    const issuePageStatus = buildIssuePageIfPossible(episode);
    fs.writeFileSync(path.join(socialDir, `issue-${issue}-instagram-kit.md`), buildInstagramKit(episode), "utf8");
    fs.writeFileSync(path.join(socialDir, `issue-${issue}-linkedin.md`), buildLinkedInPost(episode), "utf8");
    fs.writeFileSync(path.join(emailDir, `issue-${issue}.md`), buildButtondownDraft(episode), "utf8");
    fs.writeFileSync(path.join(communityPromptDir, `issue-${issue}.md`), buildCommunityPrompt(episode), "utf8");
    return {
      number: episode.number,
      slug: episode.slug,
      title: episode.title,
      status: episode.status,
      issueUrl: episode.issueUrl,
      heroImage: episode.heroImage,
      oneLineDescription: episode.oneLineDescription,
      act: episode.act,
      lesson: episode.lesson,
      emotionalBeat: episode.emotionalBeat,
      siteLinks: episode.siteLinks || [],
      websiteModules: episode.websiteModules || {},
      issuePageStatus
    };
  });

  fs.writeFileSync(indexPath, `${JSON.stringify({ episodes }, null, 2)}\n`, "utf8");
  fs.writeFileSync(siteDataPath, buildSiteData(episodes), "utf8");
  console.log(`Generated ${episodes.length} episode kits, content/episode-index.json, and content/site/site-data.js`);
}

main();
