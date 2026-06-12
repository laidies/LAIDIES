const websiteId = process.env.HYVOR_WEBSITE_ID || "15519";
const apiKey = process.env.HYVOR_CONSOLE_API_KEY;
const baseUrl = `https://talk.hyvor.com/api/console/v1/${websiteId}`;

const testPosts = [
  {
    pageIdentifier: "ask-the-room",
    guestName: "lAIdies Test Ask",
    body: "I am trying to use AI to rewrite a stakeholder update, but the first draft sounds too generic. What context should I give it so the output sounds useful and specific?",
    reply: {
      guestName: "lAIdies Test Reply",
      body: "Try giving it the audience, the decision you need from them, the tone, the length, and three facts it must include. \"Rewrite this for a VP who needs the risk, the recommendation, and the next step in under 150 words\" works much better than \"make this better.\"",
    },
  },
  {
    pageIdentifier: "send-it-energy",
    guestName: "lAIdies Test Tip",
    body: "This worked for me: I asked ChatGPT to give me three versions of an email: warmer, more direct, and executive-clean. Then I picked the best parts from each instead of accepting the first draft.",
  },
  {
    pageIdentifier: "try-on-debrief",
    guestName: "lAIdies Test Try-On",
    body: "I tried the vague prompt vs specific prompt exercise. The specific version was dramatically better once I added audience, context, tone, and what not to include.",
  },
  {
    pageIdentifier: "wins",
    guestName: "lAIdies Test Win",
    body: "Tiny win: I used AI to turn messy meeting notes into three follow-up bullets, and it saved me from staring at the same paragraph for 20 minutes.",
  },
  {
    pageIdentifier: "dear-laidies",
    guestName: "lAIdies Test Advice",
    body: "How do I tell my manager I am using AI for drafting without making it sound like I am outsourcing my judgment?",
  },
  {
    pageIdentifier: "burn-book",
    guestName: "lAIdies Test Reference",
    body: "Please use Miss Congeniality for an issue about polishing rough drafts. The makeover scene is basically first draft to final draft with better hair.",
  },
  {
    pageIdentifier: "mix-cd-exchange",
    guestName: "lAIdies Test Mix",
    body: "Playlist situation: I have to write the thing I have been avoiding. First three songs: Work It, Stronger, and Man! I Feel Like a Woman!",
  },
];

function bodyHtml(text) {
  return `<p>${String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")}</p>`;
}

async function postComment({ pageIdentifier, guestName, body, parentId = null }) {
  const response = await fetch(`${baseUrl}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify({
      page_id: null,
      page_identifier: pageIdentifier,
      body: null,
      body_html: bodyHtml(body),
      user_sso_id: null,
      guest_name: guestName,
      guest_email: null,
      parent_id: parentId,
      created_at: null,
      ip: null,
      check_premoderation: true,
      spam_detection: true,
      rules: true,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Hyvor ${pageIdentifier} returned ${response.status}: ${detail}`);
  }

  return response.json();
}

async function main() {
  if (!apiKey) {
    throw new Error("Set HYVOR_CONSOLE_API_KEY before running this script.");
  }

  for (const post of testPosts) {
    const created = await postComment(post);
    console.log(`Posted ${post.pageIdentifier}: ${created.id}`);

    if (post.reply) {
      const reply = await postComment({
        pageIdentifier: post.pageIdentifier,
        guestName: post.reply.guestName,
        body: post.reply.body,
        parentId: created.id,
      });
      console.log(`Posted ${post.pageIdentifier} reply: ${reply.id}`);
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
