/**
 * SUNNYVAiLE NewsStand — canonical public publication dataset
 *
 * Schema: /content/newsstand.schema.json
 * Public editions: breaking | daily | weekly | tribune
 *
 * A private radar or candidate never publishes directly to this object.
 * The reader fails closed when this object is absent, malformed, held or stale.
 */
window.NEWSSTAND_DATA = {
  schemaVersion: "1.0.0",
  datasetStatus: "published",
  generatedAt: "2026-07-25T19:30:00Z",
  lastCheckedAt: "2026-07-25T19:30:00Z",
  publications: {
    breaking: {
      edition: "breaking",
      job: "A rare, qualified interruption when waiting would materially disadvantage the reader.",
      status: "quiet",
      publishedAt: null,
      updatedAt: "2026-07-25T19:30:00Z",
      lastCheckedAt: "2026-07-25T19:30:00Z",
      maxAgeHours: 24,
      note: "No qualified Breaking story is live. A clear day is a valid result."
    },
    daily: {
      edition: "daily",
      job: "An edited briefing of consequential changes since the previous issue.",
      status: "quiet",
      publishedAt: null,
      updatedAt: "2026-07-25T19:30:00Z",
      lastCheckedAt: "2026-07-25T19:30:00Z",
      maxAgeHours: 36,
      note: "No Daily issue is filed. Paige will not fill one with low-consequence headlines."
    },
    weekly: {
      edition: "weekly",
      job: "Durable synthesis that connects the week’s evidence without repeating the headline cycle.",
      status: "hold",
      publishedAt: null,
      updatedAt: "2026-07-25T19:30:00Z",
      lastCheckedAt: "2026-07-25T19:30:00Z",
      maxAgeHours: 192,
      note: "The Weekly is on editorial hold while its health and privacy context receives independent approval."
    },
    tribune: {
      edition: "tribune",
      job: "A sourced argument that separates evidence, inference and the position being argued.",
      status: "current",
      publishedAt: "2026-07-24T16:00:00Z",
      updatedAt: "2026-07-25T19:30:00Z",
      lastCheckedAt: "2026-07-25T19:30:00Z",
      maxAgeHours: 336,
      note: "One current sourced argument is filed."
    }
  },
  stories: [
    {
      id: "chatgpt-health-permission-screen",
      slug: "chatgpt-health-permission-screen",
      edition: "weekly",
      status: "hold",
      publishedAt: "2026-07-24T16:00:00Z",
      updatedAt: "2026-07-25T19:30:00Z",
      lastCheckedAt: "2026-07-25T19:30:00Z",
      sourceApproval: {
        status: "independent-review-required",
        record: "/operations/product-stewards/newsstand/evidence/stories/chatgpt-health-permission-screen.json"
      },
      correction: null,
      retraction: null,
      thread: null,
      thread_subtitle: null,
      thread_entry: null,
      headline: "ChatGPT can now read your health record. The permission screen is the whole story.",
      the_story: "OpenAI announced <strong>Health in ChatGPT</strong> on July 23. It is beginning to roll out to logged-in U.S. users aged 18 and older on web and iOS across Free, Go, Plus and Pro plans. You can choose to connect Apple Health and supported medical records so ChatGPT can use that information when answering relevant questions. OpenAI says connected Health data and conversations that use it are not used to train its foundation models or target ads. By default, ChatGPT asks before using connected Health information, but you can change that to “always allow.” Disconnecting a source starts deletion of its synced data from OpenAI’s systems within 30 days; information already placed in conversation history remains until you delete those conversations. OpenAI’s help centre says this consumer Health product is not intended for clinical or covered-entity use and does not offer a Business Associate Agreement. This is a vendor product announcement, not independent clinical validation, and OpenAI explicitly says ChatGPT can still make mistakes and does not replace qualified medical care.",
      laidies_read: "This is less “magic medical oracle” and more Cher’s digital closet after somebody added a locked drawer marked <em>private</em>. More context may make an answer more relevant, but the important questions are who has the key, when the drawer opens, what is remembered after it closes and which privacy rules actually apply. U.S. health-app data does not automatically receive the same HIPAA protection as a record held by a covered doctor, hospital or insurer. HHS says information sent at a person’s direction to an app that is not a covered entity or business associate may no longer be protected by the HIPAA Rules; the FTC separately regulates certain consumer health apps and breach notifications.",
      what_this_means: "Before connecting anything, read four settings like they are the care instructions on the one dress you cannot replace: <strong>what is connected, whether access is once or always, what can become memory, and what remains in chat history after disconnection.</strong> Also read the product’s privacy terms instead of treating “health data” as a promise that HIPAA applies. The useful lane is preparation: summarize a timeline, translate unfamiliar language, notice questions you want to take to an appointment. For a diagnosis, treatment decision, medication change or urgent symptom, go back to the original record and a qualified professional. Personalization can make an answer more relevant; it does not make the model infallible.",
      cocktail_party: "“ChatGPT can now connect to Apple Health and some medical records. The important bit is that connected data, memory and conversation history have different controls—and consumer health apps are not automatically covered by HIPAA. More context may improve relevance, but it still is not a doctor and you still check the original record.”",
      watch_fors: null,
      closing_note: null,
      class_notes: "Use <a href=\"/content/library-books/rendered/accounts-101.html\"><strong>Accounts 101</strong></a> for the privacy basics, then revisit <a href=\"/issues/issue-03.html\"><strong>Episode 3 — The Burn Book Problem</strong></a> before trusting a confident health summary.",
      sources: [
        {
          id: "openai-health-launch-2026-07-23",
          label: "OpenAI — Launching Health in ChatGPT (July 23, 2026)",
          url: "https://openai.com/index/health-in-chatgpt/",
          publisherType: "vendor",
          accessedAt: "2026-07-25",
          approvalStatus: "reviewed"
        },
        {
          id: "openai-health-help-2026-07-25",
          label: "OpenAI Help — Health access, controls and HIPAA eligibility",
          url: "https://help.openai.com/en/articles/20001036-health-in-chatgpt",
          publisherType: "vendor",
          accessedAt: "2026-07-25",
          approvalStatus: "reviewed"
        },
        {
          id: "hhs-health-apps-api-2025-05-30",
          label: "U.S. HHS — The access right, health apps and APIs",
          url: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/access-right-health-apps-apis/index.html",
          publisherType: "regulator",
          accessedAt: "2026-07-25",
          approvalStatus: "reviewed"
        },
        {
          id: "ftc-health-breach-rule-2024",
          label: "U.S. FTC — Health Breach Notification Rule for health apps",
          url: "https://www.ftc.gov/business-guidance/resources/complying-ftcs-health-breach-notification-rule-0",
          publisherType: "regulator",
          accessedAt: "2026-07-25",
          approvalStatus: "reviewed"
        }
      ],
      aidb_credit: null,
      tags: ["privacy", "health", "ChatGPT", "verification", "permissions"],
      saint_lane: "Elle Woods · Read the fine print",
      badge: "EDITORIAL HOLD · THE WEEKLY"
    },
    {
      id: "label-is-not-a-truth-detector",
      slug: "label-is-not-a-truth-detector",
      edition: "tribune",
      status: "published",
      publishedAt: "2026-07-24T16:00:00Z",
      updatedAt: "2026-07-25T19:30:00Z",
      lastCheckedAt: "2026-07-25T19:30:00Z",
      sourceApproval: {
        status: "approved",
        record: "/operations/product-stewards/newsstand/evidence/stories/label-is-not-a-truth-detector.json"
      },
      correction: null,
      retraction: null,
      thread: "The Label Maker",
      thread_subtitle: "provenance can show where content came from; it cannot decide whether the claim is true",
      thread_entry: 1,
      headline: "The label can tell you it was made with AI. It cannot tell you it is true.",
      the_story: "Google said on July 24 that it is signing the EU AI Act Code of Practice on Transparency of AI-Generated Content. Google connected that commitment to its work on the C2PA provenance standard and SynthID watermarking. The European Commission describes the code as a voluntary way for providers and deployers to help demonstrate compliance with AI Act transparency obligations that begin applying on August 2, 2026. The Commission also says adherence is <em>not</em> conclusive evidence of compliance. Those are two different layers: a company’s announcement about the tools it supports, and the regulator’s description of what signing the code does and does not prove.",
      laidies_read: "Think of the liner notes inside a CD. They can tell you who produced the track, who sang backup and where it was recorded. That is useful provenance. They cannot tell you whether the singer’s story actually happened. An AI label works the same way: it can help show that a file was generated or edited with a particular system. It does not fact-check the sentence, prove the picture’s caption or turn a polished claim into evidence.",
      what_this_means: "Treat provenance as one receipt, not the whole investigation. If a label or content credential is present, use it to understand origin and editing history. Then separately check the claim against a named source, date and original context. If the label is missing, do not assume the content is human-made; marks and metadata can be absent, stripped or unsupported. If the label is present, do not assume the content is deceptive—or accurate. <strong>How it was made and whether it is true are different questions.</strong>",
      cocktail_party: "“Google just signed Europe’s voluntary AI-content transparency code. The useful bit is provenance: a watermark or content credential can act like CD liner notes and show how something was made. It still cannot tell you whether the lyric—or the claim—is true.”",
      watch_fors: [
        "<strong>Does the mark survive the trip?</strong> A provenance system is only useful if platforms preserve and display it after content is resized, reposted or exported.",
        "<strong>What happens to text?</strong> Images and audio have established watermarking approaches; reliable, interoperable marking of generated text remains a harder problem.",
        "<strong>Can ordinary people understand the label?</strong> Machine-readable provenance helps systems exchange information, but the public still needs a clear explanation of what the signal proves—and what it does not."
      ],
      closing_note: "Transparency is a valuable layer. It is not a truth layer. LAiDIES will keep asking both questions: <em>where did this come from?</em> and <em>what evidence supports it?</em>",
      class_notes: "This is the retrieval rule from <a href=\"/issues/issue-03.html\"><strong>Episode 3 — The Burn Book Problem</strong></a>: a receipt can establish origin, while the claim still needs evidence.",
      sources: [
        {
          id: "google-eu-ai-transparency-code-2026-07-24",
          label: "Google — Signing the EU AI Act transparency code (July 24, 2026)",
          url: "https://blog.google/company-news/outreach-and-initiatives/public-policy/eu-ai-act-transparency-code-of-practice/",
          publisherType: "vendor",
          accessedAt: "2026-07-25",
          approvalStatus: "reviewed"
        },
        {
          id: "ec-transparency-code-opinion-2026-07-09",
          label: "European Commission — assessment of the transparency code (July 9, 2026)",
          url: "https://digital-strategy.ec.europa.eu/en/library/commission-opinion-assessment-code-practice-transparency-ai-generated-content",
          publisherType: "regulator",
          accessedAt: "2026-07-25",
          approvalStatus: "reviewed"
        },
        {
          id: "ec-transparency-code-faq-2026",
          label: "European Commission — signing and Article 50 timing",
          url: "https://digital-strategy.ec.europa.eu/en/faqs/signing-code-practice-transparency-ai-generated-content",
          publisherType: "regulator",
          accessedAt: "2026-07-25",
          approvalStatus: "reviewed"
        }
      ],
      aidb_credit: null,
      tags: ["provenance", "watermarking", "verification", "AI Act", "Google", "SynthID"],
      saint_lane: "Elle Woods · Receipts",
      badge: "THE TRIBUNE · THE LABEL MAKER · ENTRY 1"
    }
  ]
};

/* Compatibility for old private inspection scripts only. Public code uses NEWSSTAND_DATA. */
window.NEWSSTAND_STORIES = window.NEWSSTAND_DATA.stories;
