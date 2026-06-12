const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outputPath = path.join(root, "content", "community", "chat-room-digest.json");

const websiteId = process.env.HYVOR_WEBSITE_ID || "15519";
const apiKey = process.env.HYVOR_CONSOLE_API_KEY;
const baseUrl = `https://talk.hyvor.com/api/console/v1/${websiteId}`;

const rooms = [
  { id: "ask-the-room", label: "Ask the Room", url: "ask-the-room.html" },
  { id: "send-it-energy", label: "Send It Energy", url: "send-it-energy.html" },
  { id: "try-on-debrief", label: "The Try-On Debrief", url: "try-on-debrief.html" },
  { id: "wins", label: "Wins of the Week", url: "wins.html" },
  { id: "dear-laidies", label: "Dear lAIdies", url: "dear-laidies.html" },
  { id: "burn-book", label: "Put It in the Burn Book", url: "burn-book.html" },
  { id: "mix-cd-exchange", label: "Mix CD Exchange", url: "mix-cd-exchange.html" },
];

const riskPattern = /\b(tax|legal|law|policy|hr|human resources|medical|health|financial|finance|privacy|confidential|salary|compensation|termination|fired|layoff|model|pricing|price|cost|plan|company|study|statistic|number|date|quote|source|citation)\b/i;
const questionPattern = /(\?|^how\b|^what\b|^which\b|^can\b|^should\b|^does\b|^do\b|^has anyone\b|help\b|stuck\b|confused\b)/i;
const usefulPattern = /\b(this worked|worked for me|solved|thank|thanks|helpful|useful|try this|template|prompt|workflow|checklist|step|setting|shortcut|example)\b/i;
const tipPattern = /\b(prompt|workflow|template|checklist|setting|shortcut|tool|try this|step|copy this|example|source|link)\b/i;

function stripHtml(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value, max = 220) {
  const text = String(value || "").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}...`;
}

function commentText(comment) {
  return stripHtml(comment.body_html || comment.body || comment.body_text || "");
}

function commentTitle(text) {
  const firstSentence = text.split(/(?<=[.!?])\s+/)[0] || text;
  return truncate(firstSentence, 92);
}

function roomById(pageIdentifier) {
  return rooms.find((room) => room.id === pageIdentifier) || {
    id: pageIdentifier || "unknown",
    label: pageIdentifier || "Unknown room",
    url: "chat-room-digest.html",
  };
}

async function fetchRoomComments(room) {
  const url = new URL(`${baseUrl}/comments`);
  url.searchParams.set("type", "published");
  url.searchParams.set("page_identifier", room.id);
  url.searchParams.set("limit", "100");

  const response = await fetch(url, {
    headers: {
      "X-API-KEY": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Hyvor ${room.id} returned ${response.status}`);
  }

  return response.json();
}

function isTopLevel(comment) {
  return !Array.isArray(comment.parent_ids) || comment.parent_ids.length === 0;
}

function directParentId(comment) {
  if (!Array.isArray(comment.parent_ids) || !comment.parent_ids.length) return null;
  return comment.parent_ids[0];
}

function hasUsefulSignal(comment, text) {
  return Boolean(comment.is_featured || comment.is_loved || Number(comment.upvotes || 0) > 0 || usefulPattern.test(text));
}

function buildItem(comment, room, category, review) {
  const text = commentText(comment);
  return {
    title: commentTitle(text),
    summary: truncate(text),
    room: room.label,
    url: room.url,
    status: category,
    review,
    sourceCommentId: comment.id || null,
    signals: {
      upvotes: Number(comment.upvotes || 0),
      featured: Boolean(comment.is_featured),
      loved: Boolean(comment.is_loved),
    },
  };
}

function topicKey(text) {
  const normalized = text.toLowerCase();
  if (/\b(prompt|context|specific|instruction)\b/.test(normalized)) return "Prompting and specificity";
  if (/\b(privacy|confidential|policy|allowed|sensitive)\b/.test(normalized)) return "Privacy and workplace boundaries";
  if (/\b(email|message|tone|reply|slack|teams)\b/.test(normalized)) return "Drafting and tone";
  if (/\b(tool|chatgpt|claude|gemini|model)\b/.test(normalized)) return "Tool choice and model questions";
  if (/\b(meeting|summary|agenda|notes)\b/.test(normalized)) return "Meeting prep and summaries";
  return null;
}

function classify(comments) {
  const sections = {
    answered: [],
    unanswered: [],
    tips: [],
    needsReceipts: [],
    themes: [],
  };

  const byId = new Map(comments.map((entry) => [entry.comment.id, entry]));
  const repliesByParent = new Map();
  const themes = new Map();

  comments.forEach((entry) => {
    const parentId = directParentId(entry.comment);
    if (parentId === null) return;
    const replies = repliesByParent.get(parentId) || [];
    replies.push(entry);
    repliesByParent.set(parentId, replies);
  });

  comments.forEach((entry) => {
    const { comment, room } = entry;
    const text = commentText(comment);
    if (!text) return;

    const key = topicKey(text);
    if (key) {
      const theme = themes.get(key) || { count: 0, rooms: new Set(), examples: [] };
      theme.count += 1;
      theme.rooms.add(room.label);
      if (theme.examples.length < 2) theme.examples.push(truncate(text, 120));
      themes.set(key, theme);
    }

    const needsReceipts = riskPattern.test(text);
    const isQuestion = questionPattern.test(text);
    const useful = hasUsefulSignal(comment, text);

    if (needsReceipts) {
      sections.needsReceipts.push(buildItem(comment, room, "Needs receipts", "Human review required before this becomes guidance."));
    }

    if (tipPattern.test(text) && useful) {
      sections.tips.push(buildItem(comment, room, "Tip worth saving", needsReceipts ? "Human review required." : "Low-risk tip unless context changes."));
    }

    if (!isTopLevel(comment) && useful) {
      sections.answered.push(buildItem(comment, room, "Helpful answer", needsReceipts ? "Human review required." : "Useful answer signal found."));
    }

    if (isTopLevel(comment) && isQuestion) {
      const replies = repliesByParent.get(comment.id) || [];
      const hasUsefulReply = replies.some((reply) => hasUsefulSignal(reply.comment, commentText(reply.comment)));
      if (!hasUsefulReply) {
        sections.unanswered.push(buildItem(comment, room, "Needs the room", "Low-risk navigation item unless the answer becomes sensitive."));
      } else {
        const source = byId.get(comment.id);
        sections.answered.push(buildItem(source.comment, source.room, "Question has useful replies", "Check replies before treating as guidance."));
      }
    }
  });

  themes.forEach((theme, title) => {
    if (theme.count < 2) return;
    sections.themes.push({
      title,
      summary: `${theme.count} related comments across ${Array.from(theme.rooms).join(", ")}. Examples: ${theme.examples.join(" / ")}`,
      room: "Multiple rooms",
      url: "../index.html#community-board",
      status: "Repeated theme",
      review: "Editorial review recommended for FAQ, glossary, issue example, or social post.",
    });
  });

  Object.keys(sections).forEach((key) => {
    sections[key] = sections[key].slice(0, 12);
  });

  return sections;
}

async function main() {
  if (!apiKey) {
    throw new Error("Set HYVOR_CONSOLE_API_KEY before running this script.");
  }

  const allComments = [];
  const roomStatus = [];
  for (const room of rooms) {
    try {
      const comments = await fetchRoomComments(room);
      comments.forEach((comment) => allComments.push({ comment, room }));
      roomStatus.push({
        room: room.label,
        pageId: room.id,
        status: "ok",
        comments: comments.length,
      });
    } catch (error) {
      roomStatus.push({
        room: room.label,
        pageId: room.id,
        status: "skipped",
        reason: error.message,
      });
      console.warn(`Skipped ${room.id}: ${error.message}`);
    }
  }

  const digest = {
    generatedAt: new Date().toISOString(),
    source: "Hyvor Talk Console API",
    status: roomStatus.some((room) => room.status === "skipped") ? "generated-with-warnings" : "generated",
    roomStatus,
    sections: classify(allComments),
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(digest, null, 2)}\n`);
  console.log(`Generated ${path.relative(root, outputPath)} from ${allComments.length} Hyvor comments.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
