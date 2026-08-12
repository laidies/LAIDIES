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
  generatedAt: "2026-08-11T22:00:00Z",
  lastCheckedAt: "2026-08-11T22:00:00Z",
  publications: {
    breaking: {
      edition: "breaking",
      job: "News as it happens, when waiting would leave readers behind.",
      status: "quiet",
      publishedAt: null,
      updatedAt: "2026-08-11T22:00:00Z",
      lastCheckedAt: "2026-08-11T22:00:00Z",
      maxAgeHours: 24,
      note: "No breaking story right now. Enjoy the quiet."
    },
    daily: {
      edition: "daily",
      editionDate: "2026-08-03",
      editorialTimeZone: "America/Vancouver",
      issue: {
        status: "complete",
        storyIds: ["eu-ai-act-transparency-starts"],
        serviceRecordIds: ["daily-2026-08-03-paige-tip", "daily-2026-08-03-promptoscope", "daily-2026-08-03-career-life", "daily-2026-08-03-mme-claio"]
      },
      job: "A clear explanation of what changed and why it matters.",
      status: "current",
      publishedAt: "2026-08-03T22:00:00Z",
      updatedAt: "2026-08-03T22:00:00Z",
      lastCheckedAt: "2026-08-03T22:00:00Z",
      maxAgeHours: 36,
      note: "Today’s complete edition is on the rack with sourced reporting and governed service desks."
    },
    weekly: {
      edition: "weekly",
      job: "The week’s bigger picture, connecting the stories without repeating every headline.",
      status: "current",
      publishedAt: "2026-07-27T17:00:00Z",
      updatedAt: "2026-08-11T22:00:00Z",
      lastCheckedAt: "2026-08-11T22:00:00Z",
      maxAgeHours: 192,
      note: "The Weekly connects two large studies about how AI is changing the boundaries inside work."
    },
    tribune: {
      edition: "tribune",
      job: "Opinion and big questions, with the evidence clearly separated from the argument.",
      status: "current",
      publishedAt: "2026-07-24T16:00:00Z",
      updatedAt: "2026-07-25T19:30:00Z",
      lastCheckedAt: "2026-07-25T19:30:00Z",
      maxAgeHours: 336,
      note: "One Tribune article is on the rack."
    }
  },
  stories: [
    {
      id: "chatgpt-health-permission-screen",
      slug: "chatgpt-health-permission-screen",
      edition: "breaking",
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
      badge: "COMING SOON · THE BREAKING"
    },
    {
      id: "gemini-flash-costs-less-test-before-switching",
      slug: "gemini-flash-costs-less-test-before-switching",
      edition: "daily",
      status: "published",
      publishedAt: "2026-07-21T18:00:00Z",
      updatedAt: "2026-08-11T22:00:00Z",
      lastCheckedAt: "2026-08-11T22:00:00Z",
      sourceApproval: {
        status: "approved",
        record: "/operations/product-stewards/newsstand/evidence/stories/gemini-flash-costs-less-test-before-switching.json"
      },
      correction: null,
      retraction: null,
      thread: null,
      thread_subtitle: null,
      thread_entry: null,
      headline: "Google’s new Flash models cost less. Test your whole task before switching.",
      the_story: "Google released Gemini 3.6 Flash and Gemini 3.5 Flash-Lite on July 21. Google lists 3.6 Flash at $1.50 per million input tokens and $7.50 per million output tokens, while Flash-Lite is $0.30 for input and $2.50 for output. Both are available through the Gemini API; Google also placed 3.6 Flash in the Gemini app and made it the default model for its Antigravity managed agent. The company says 3.6 Flash used 17% fewer output tokens than 3.5 Flash on one named external index. That is evidence from a bounded test, not a promise that every task becomes 17% cheaper or better. Google also announced a specialized Flash Cyber model, but said its limited pilot would be for governments and trusted partners rather than general public use.",
      laidies_read: "A cheaper token is like cheaper printer ink: welcome, but it does not tell you how many pages you will ruin before the document is right. The bill that matters includes the model’s output, retries, tool calls, your time and whether the result can actually be used. A lower list price can reduce cost; it cannot replace a comparison on your own work.",
      what_this_means: "If you already use Gemini for repeated coding, documents, extraction or agent work, run the same small set of real tasks through your current model and the new candidate. Record quality, elapsed time, tokens, tool calls and retries before changing production. Flash-Lite is the more plausible low-cost lane for high-volume classification, extraction or routing. If you only use the consumer app occasionally, there is no reason to reorganize your workflow because a model name changed.",
      cocktail_party: "“Google’s latest Flash models have lower token prices, but cheaper tokens do not automatically mean a cheaper finished task. Test quality, retries and total time before switching.”",
      watch_fors: null,
      closing_note: null,
      class_notes: "Reference this story when teaching model selection: compare cost to a usable outcome, not only the advertised price per token.",
      sources: [
        {
          id: "google-gemini-flash-family-2026-07-21",
          label: "Google — Introducing Gemini 3.6 Flash, 3.5 Flash-Lite and 3.5 Flash Cyber (July 21, 2026)",
          url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/",
          publisherType: "vendor",
          accessedAt: "2026-08-11",
          approvalStatus: "reviewed"
        },
        {
          id: "google-gemini-latest-model-guide-2026-08-11",
          label: "Google AI for Developers — Latest Gemini model and migration guide",
          url: "https://ai.google.dev/gemini-api/docs/latest-model",
          publisherType: "vendor",
          accessedAt: "2026-08-11",
          approvalStatus: "reviewed"
        }
      ],
      aidb_credit: null,
      tags: ["Gemini", "model choice", "AI costs", "agents", "Google"],
      saint_lane: "C.J. Cregg · Read the whole receipt",
      badge: "ARCHIVE · THE DAILY"
    },
    {
      id: "kimi-k3-open-weights-not-laptop-ai",
      slug: "kimi-k3-open-weights-not-laptop-ai",
      edition: "daily",
      status: "published",
      publishedAt: "2026-07-27T18:00:00Z",
      updatedAt: "2026-08-11T22:00:00Z",
      lastCheckedAt: "2026-08-11T22:00:00Z",
      sourceApproval: {
        status: "approved",
        record: "/operations/product-stewards/newsstand/evidence/stories/kimi-k3-open-weights-not-laptop-ai.json"
      },
      correction: null,
      retraction: null,
      thread: null,
      thread_subtitle: null,
      thread_entry: null,
      headline: "Kimi K3’s weights are open. That does not make it laptop AI.",
      the_story: "Moonshot AI released Kimi K3’s model files, deployment instructions and license on Hugging Face. Its model card describes a 2.8-trillion-parameter mixture-of-experts model that uses 104 billion parameters at a time, accepts text and images and supports a context window of up to one million tokens. Publishing weights gives technically equipped organizations the option to inspect, modify and operate the model rather than using only a hosted service. It does not supply the hardware, storage, power, serving software, security work or specialist staff needed to run a model of this size. The custom license grants broad rights but includes conditions, so “open weights” should not be silently translated into “no restrictions.”",
      laidies_read: "Publishing the weights is like releasing the recipe instead of requiring everyone to order from one restaurant. This particular recipe still needs an industrial kitchen. The access change is real for organizations with infrastructure; for most people, the practical way to use K3 remains a hosted product.",
      what_this_means: "If control over deployment or data is important to your organization, K3 is now a serious evaluation candidate—but compare the license, hardware, security, staffing and total serving cost with a hosted API. If you want a capable model running on an ordinary personal laptop, this release is not that. A preliminary NIST and UK AISI assessment also found meaningful cyber capability and reported that K3’s safeguards did not prevent offensive assistance in its selected tests; that warrants continued evaluation without turning a bounded test into a claim about every possible use.",
      cocktail_party: "“Kimi K3 released its weights, which gives well-equipped teams more control. Open weights means access to the model files; it does not mean a 2.8-trillion-parameter model becomes a free laptop app.”",
      watch_fors: null,
      closing_note: null,
      class_notes: "Use this as the practical distinction between an open-weight release, a hosted service and a genuinely local personal-computer model.",
      sources: [
        {
          id: "moonshot-kimi-k3-model-card-2026-08-11",
          label: "Moonshot AI — Kimi K3 model card and released weights",
          url: "https://huggingface.co/moonshotai/Kimi-K3",
          publisherType: "vendor",
          accessedAt: "2026-08-11",
          approvalStatus: "reviewed"
        },
        {
          id: "moonshot-kimi-k3-license-2026-08-11",
          label: "Moonshot AI — Kimi K3 License",
          url: "https://huggingface.co/moonshotai/Kimi-K3/blob/main/LICENSE",
          publisherType: "primary-document",
          accessedAt: "2026-08-11",
          approvalStatus: "reviewed"
        },
        {
          id: "nist-uk-aisi-kimi-k3-2026-07",
          label: "NIST and UK AISI — Preliminary assessment of Kimi K3’s cyber capabilities",
          url: "https://www.nist.gov/news-events/news/2026/07/uk-aisi-caisi-preliminary-assessment-kimi-k3s-cyber-capabilities",
          publisherType: "regulator",
          accessedAt: "2026-08-11",
          approvalStatus: "reviewed"
        }
      ],
      aidb_credit: null,
      tags: ["Kimi K3", "open weights", "local AI", "model deployment", "AI safety"],
      saint_lane: "Dana Scully · Open the file, then read the conditions",
      badge: "ARCHIVE · THE DAILY"
    },
    {
      id: "weathernext-cyclones-open-model-human-warning",
      slug: "weathernext-cyclones-open-model-human-warning",
      edition: "daily",
      status: "published",
      publishedAt: "2026-08-06T18:00:00Z",
      updatedAt: "2026-08-11T22:00:00Z",
      lastCheckedAt: "2026-08-11T22:00:00Z",
      sourceApproval: {
        status: "approved",
        record: "/operations/product-stewards/newsstand/evidence/stories/weathernext-cyclones-open-model-human-warning.json"
      },
      correction: null,
      retraction: null,
      thread: null,
      thread_subtitle: null,
      thread_entry: null,
      headline: "The cyclone model is open. The storm warning is still human.",
      the_story: "Google DeepMind released code and pretrained weights for WeatherNext Cyclones and WeatherNext 2 alongside a peer-reviewed Nature paper. The study reports that, averaged across its 2023–2025 evaluation, the cyclone model’s three-day forecasts for track, intensity and wind structure matched the skill of leading operational models at two days. That is a forecasting result, not proof that every community will receive every warning one day earlier. The system can generate large ensembles of plausible forecasts, giving forecasters information about both likely outcomes and uncertainty. The public release now lets specialist teams inspect and test the model rather than relying only on Google’s reported results or forecast feed.",
      laidies_read: "An ensemble is not one crystal-ball answer. It is closer to running the same route planner many times while conditions vary: convergence can increase confidence and spread is useful information. But the runs share a model family, data and assumptions, so they can also share blind spots. Human forecasters still compare model guidance with observations, other models and local knowledge before an authority issues an official forecast or warning.",
      what_this_means: "For weather agencies and researchers, open code and weights make independent testing more possible. For everyone else, this is not a personal warning app or a Gemini feature. Better model guidance becomes public safety only when forecasting centres can operate it, interpret uncertainty and communicate a useful warning. Keep following the official weather authority where you live.",
      cocktail_party: "“Google opened a promising cyclone-forecasting model, but a better forecast is not automatically an earlier public warning. Forecasters and warning systems still turn model guidance into action.”",
      watch_fors: null,
      closing_note: null,
      class_notes: "A useful example for classes on uncertainty: many model runs can reveal a range of outcomes without becoming many independent experts.",
      sources: [
        {
          id: "deepmind-weathernext-cyclones-2026-08-06",
          label: "Google DeepMind — WeatherNext cyclone forecasting release (August 6, 2026)",
          url: "https://deepmind.google/blog/weathernext-ai-model-achieves-breakthrough-in-forecasting-cyclones/",
          publisherType: "vendor",
          accessedAt: "2026-08-11",
          approvalStatus: "reviewed"
        },
        {
          id: "nature-weathernext-cyclones-2026",
          label: "Nature — Operational tropical cyclone forecasting with AI",
          url: "https://www.nature.com/articles/s41586-026-10953-2",
          publisherType: "academic",
          accessedAt: "2026-08-11",
          approvalStatus: "reviewed"
        },
        {
          id: "deepmind-weathernext-repository-2026-08-11",
          label: "Google DeepMind — WeatherNext source repository and model documentation",
          url: "https://github.com/google-deepmind/weathernext",
          publisherType: "primary-document",
          accessedAt: "2026-08-11",
          approvalStatus: "reviewed"
        }
      ],
      aidb_credit: null,
      tags: ["WeatherNext", "weather", "forecasting", "open models", "uncertainty"],
      saint_lane: "Jo Harding · Watch the sky and the instruments",
      badge: "ARCHIVE · THE DAILY"
    },
    {
      id: "ai-is-moving-the-handoff-line-at-work",
      slug: "ai-is-moving-the-handoff-line-at-work",
      edition: "weekly",
      status: "published",
      publishedAt: "2026-07-27T17:00:00Z",
      updatedAt: "2026-08-11T22:00:00Z",
      lastCheckedAt: "2026-08-11T22:00:00Z",
      sourceApproval: {
        status: "approved",
        record: "/operations/product-stewards/newsstand/evidence/stories/ai-is-moving-the-handoff-line-at-work.json"
      },
      correction: null,
      retraction: null,
      thread: null,
      thread_subtitle: null,
      thread_entry: null,
      headline: "AI use may be moving the handoff line at work.",
      the_story: "Two large vendor studies describe related changes in how people use AI at work. Google’s ATLAS report examined about 14.7 million de-identified interactions sampled from the Gemini App, Google AI Mode and the free Gemini API over two weeks in April 2026; paid API and enterprise use were excluded from this granular analysis. It classified less than 10% of work interactions as full task automation; collaboration, information retrieval, learning and ideation were more common. OpenAI’s Work at the Frontier report examined more than 800,000 work-related messages from individual ChatGPT accounts of U.S. users whose self-reported role information was linked from ChatGPT Business, across eight occupation groups. It reports that 16.8% of all work messages—and 43.5% of the non-generic messages it classified as occupation-specific—concerned tasks historically associated with another occupation. The percentages are not directly comparable: the products, samples, units and classification methods differ.",
      laidies_read: "The study captures people asking AI for tasks outside the historic boundaries of their role. That may change what they try before asking a specialist—but it does not show that the handoff actually changed, or that the result was accepted. A marketer may troubleshoot a website; a salesperson may explore a dataset. Those examples do not automatically make either person an engineer or analyst.",
      what_this_means: "Choose one recurring handoff in your work and run a bounded experiment. Define the output, the evidence it must contain and the point where a qualified reviewer must take over. Then measure whether AI improved the completed result—not merely whether it produced a plausible draft. Neither study observes enough to prove productivity, accepted quality, employment effects or the disappearance of specialist work. Both are vendor studies of their own users and model-classified behaviour, so treat them as useful maps rather than a census of work.",
      cocktail_party: "“One possible workplace change is less about whole jobs vanishing and more about people attempting tasks across historic role boundaries. These studies show the requests, not whether the handoff actually changed or the result was accepted.”",
      watch_fors: null,
      closing_note: null,
      class_notes: "This provides a reusable model for classes and episodes: identify the task step, the shifted handoff and the point where accountable human judgment returns.",
      sources: [
        {
          id: "google-atlas-v1-2026-07",
          label: "Google — ATLAS v1 report on AI use across work and daily life",
          url: "https://ai.google/static/documents/GoogleATLASv1.pdf",
          publisherType: "vendor",
          accessedAt: "2026-08-11",
          approvalStatus: "reviewed"
        },
        {
          id: "openai-work-at-frontier-2026-07",
          label: "OpenAI — Work at the Frontier report",
          url: "https://cdn.openai.com/pdf/work-at-the-frontier-report.pdf",
          publisherType: "vendor",
          accessedAt: "2026-08-11",
          approvalStatus: "reviewed"
        },
        {
          id: "openai-work-frontier-explainer-2026-07",
          label: "OpenAI — How AI is expanding what people do at work",
          url: "https://openai.com/index/how-ai-is-expanding-what-people-do-at-work/",
          publisherType: "vendor",
          accessedAt: "2026-08-11",
          approvalStatus: "reviewed"
        }
      ],
      aidb_credit: null,
      tags: ["AI at work", "tasks", "job boundaries", "Gemini", "ChatGPT"],
      saint_lane: "Sydney Bristow · Know where the handoff moved",
      badge: "ARCHIVE · THE WEEKLY"
    },
    {
      id: "eu-ai-act-transparency-starts",
      slug: "eu-ai-act-transparency-starts",
      edition: "daily",
      status: "published",
      publishedAt: "2026-08-03T22:00:00Z",
      updatedAt: "2026-08-03T22:00:00Z",
      lastCheckedAt: "2026-08-03T22:00:00Z",
      sourceApproval: {
        status: "approved",
        record: "/operations/product-stewards/newsstand/evidence/stories/eu-ai-act-transparency-starts.json"
      },
      correction: null,
      retraction: null,
      thread: null,
      thread_subtitle: null,
      thread_entry: null,
      headline: "Europe’s AI transparency rules started August 2. Here’s when you should expect a label.",
      the_story: "Article 50 of the European Union’s AI Act began applying on August 2, 2026. The European Commission’s guidance says providers of certain AI systems must make people aware when they are interacting directly with AI and must add machine-readable marks to certain AI-generated or manipulated outputs. Professional deployers have separate disclosure duties for emotion-recognition and biometric-categorisation systems, deepfakes, and AI-generated or manipulated text published to inform the public on matters of public interest when it has not received human review or editorial control. The Commission also describes a limited transition to December 2, 2026 for the marking-and-detection obligation for certain systems already on the market before August 2. The exact duty depends on the system, actor, use and exception; this is a practical orientation, not legal advice.",
      laidies_read: "Think of the rule as caller ID for particular AI encounters—not a lie detector for everything on the screen. In covered situations, the person or system behind the interaction may need to tell you that AI is involved, and some generated media needs a machine-readable origin signal. That disclosure helps you ask the next question. It does not prove that the output is accurate, fair, safe or lawful.",
      what_this_means: "If you are in the EU, expect clearer disclosure in the covered situations: direct AI interaction, certain generated or manipulated media, deepfakes, emotion recognition, biometric categorisation and some public-interest text without human editorial control. If you publish or deploy AI professionally, do not turn this article into a compliance checklist; use the Commission’s current guidance and qualified advice for your exact role and system. As a reader, treat a label as useful origin context. Still check the claim, source and date separately—and do not assume that an unlabelled item is human-made or compliant.",
      cocktail_party: "“Europe’s Article 50 transparency rules started on August 2. In covered situations, people should be told when they are interacting with AI or seeing certain AI-generated or manipulated content. The label is useful caller ID, not proof that the content is true.”",
      watch_fors: null,
      closing_note: null,
      class_notes: "The current <a href=\"#label-is-not-a-truth-detector\"><strong>Tribune</strong></a> explains the durable rule: provenance and labelling can help establish origin; the underlying claim still needs evidence.",
      sources: [
        {
          id: "ec-article-50-guidelines-2026-07-20",
          label: "European Commission — Guidelines on Article 50 transparency obligations (July 20, 2026)",
          url: "https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems",
          publisherType: "regulator",
          accessedAt: "2026-08-03",
          approvalStatus: "reviewed"
        },
        {
          id: "ec-article-50-quick-facts-2026-07-20",
          label: "European Commission — Quick facts: transparency rules for AI systems",
          url: "https://digital-strategy.ec.europa.eu/en/factpages/quick-facts-transparency-rules-ai-systems",
          publisherType: "regulator",
          accessedAt: "2026-08-03",
          approvalStatus: "reviewed"
        },
        {
          id: "eurlex-ai-act-2024-1689",
          label: "EUR-Lex — Regulation (EU) 2024/1689, Articles 50 and 113",
          url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj?locale=en",
          publisherType: "primary-document",
          accessedAt: "2026-08-03",
          approvalStatus: "reviewed"
        },
        {
          id: "eurlex-ai-act-amendment-2026-1744",
          label: "EUR-Lex — Regulation (EU) 2026/1744, Article 111(4) and recital 38",
          url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32026R1744",
          publisherType: "primary-document",
          accessedAt: "2026-08-03",
          approvalStatus: "reviewed"
        }
      ],
      aidb_credit: null,
      tags: ["AI Act", "transparency", "labels", "deepfakes", "European Union"],
      saint_lane: "Elle Woods · Read the label and the fine print",
      badge: "AT THE LEGAL DESK · THE DAILY"
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
