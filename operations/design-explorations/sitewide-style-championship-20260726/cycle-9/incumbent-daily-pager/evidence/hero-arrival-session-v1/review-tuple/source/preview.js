const frame = document.querySelector("#incumbent-frame");

const candidateRoot =
  "/operations/design-explorations/sitewide-style-championship-20260726/cycle-9/incumbent-daily-pager";

const masterLogoAnimationRoot =
  "/operations/design-explorations/laidies-motion-ident-20260725";

const providerArtwork = {
  claude: {
    product: "Claude",
    company: "Anthropic",
    src: `${candidateRoot}/artwork/providers/claude-provider-news-v1.png`,
    alt:
      "A warm orange comic-style model-testing desk with a long manuscript, tabbed files and an amber computer"
  },
  chatgpt: {
    product: "ChatGPT",
    company: "OpenAI",
    src: `${candidateRoot}/artwork/providers/chatgpt-provider-news-v1.png`,
    alt:
      "An emerald comic-style communications desk with a translucent computer and conversation panels"
  },
  gemini: {
    product: "Gemini",
    company: "Google",
    src: `${candidateRoot}/artwork/providers/gemini-provider-news-v1.png`,
    alt:
      "A cobalt and magenta comic-style multimodal desk with twin monitors and a faceted star prism"
  }
};

const themeArtwork = {
  policy: {
    product: "Policy update",
    company: "Rules & regulation",
    src: `${candidateRoot}/artwork/themes/policy-regulation-news-v1.png`,
    alt:
      "A burgundy and royal-blue comic-style policy desk with a fax, rulebook, filing trays, stamp and balanced scales"
  },
  security: {
    product: "Security alert",
    company: "Incident watch",
    src: `${candidateRoot}/artwork/themes/security-alert-news-v1.png`,
    alt:
      "A red-and-black comic-style incident desk with warning monitor, locks, alert pager, disconnected cable and circuit inspection"
  }
};

const dailyEdition = [
  {
    tone: "pink",
    icon: "breaking_news",
    label: "Breaking News",
    title: "Claude got a major upgrade.",
    body:
      "Anthropic released Claude Opus 5. If you use Claude for demanding work, this one is worth a controlled test—not an automatic switch.",
    providerKey: "claude",
    href: "/newsstand.html",
    linkLabel: "Visit the NewsStand"
  },
  {
    tone: "blue",
    icon: "newspaper",
    label: "Daily News",
    title: "What Opus 5 is actually better at—and its early problems.",
    body:
      "Anthropic says it is stronger at difficult coding, long documents, visual work and office tasks. One early independent test found instruction conflicts and stopping too soon. The practical move: compare it on one real task before changing your default.",
    detail:
      "Provider benchmarks are evidence—not a universal verdict. The Tribune will explain what model scores can and cannot tell you.",
    href: "/newsstand.html",
    linkLabel: "Read the Daily News"
  },
  {
    tone: "violet",
    icon: "style",
    label: "Mme CLAi-O’s Daily Reading",
    title: "The Pager",
    body:
      "Something keeps buzzing at you in code, and you never agreed to learn this language.",
    detail:
      "Not every signal is urgent. Some are just loud. Translate before you react. Ask: is this urgent, important, political—or someone else’s anxiety wearing a deadline costume?",
    href: "/games/madame-claio.html",
    linkLabel: "Visit Mme CLAi-O"
  },
  {
    tone: "aqua",
    icon: "lightbulb",
    label: "Paige’s pocket note",
    title: "Show the positive target.",
    body:
      "Before adding another “don’t,” give the model one example of the result to match and name what must remain unchanged.",
    detail:
      "A rejection rule can stop one bad answer. It cannot define the answer you actually want.",
    href: "/newsstand.html",
    linkLabel: "Find more from Paige"
  },
  {
    tone: "yellow",
    icon: "auto_awesome",
    label: "Promptoscope",
    title: "Your rules are talking over each other.",
    body:
      "Your model is not ignoring the rules because Mercury is in retrograde.",
    detail:
      "Today favours one source of truth, one positive reference and one visible acceptance test. Expect confident chaos if you hand it six competing briefs."
  },
  {
    tone: "coral",
    icon: "route",
    label: "Did You Know?",
    title: "The Wednesday Tour has eight stops.",
    body:
      "NewsStand → episode → Study Pack → KSVL → Pop Quiz → free time → BRONZE AiGE → Delta LAi Nu.",
    detail:
      "Short on time? The Express Route is episode → Study Pack → quiz.",
    href: "/this-week.html",
    linkLabel: "Open the Wednesday route"
  },
  {
    tone: "pink",
    icon: "headphones",
    label: "Song of the Day",
    title: "Wednesdays in SUNNYVAiLE",
    body:
      "The town’s Wednesday theme—made for episode day and playing today on KSVL 99.9.",
    detail:
      "Playing today at KSVL 99.9.",
    audioSrc: "/content/music/the-laidies-wednesday-in-sunnyvaile.mp3",
    href: "/radio.html",
    linkLabel: "Visit KSVL 99.9"
  }
];

const tourStops = [
  {
    selector: "#method",
    name: "How LAiDIES works",
    copy: "Start with the method: stories make the AI idea memorable, then tools make it useful."
  },
  {
    selector: "#today",
    name: "Choose your errand",
    copy: "Pick the thing you came for. You do not need to learn the whole town first."
  },
  {
    selector: "#this-week",
    name: "Find the Wednesday route",
    copy: "This section shows the full eight-stop weekly route and its shorter Express Route."
  },
  {
    selector: "#activities",
    name: "Try a game or tool",
    copy: "Get prompt help, make a decision or do something entertaining in a few minutes."
  },
  {
    selector: "#reference",
    name: "Visit the LIBRAiRY",
    copy: "Miss Jeeves appears here—and only here—to help you look something up."
  },
  {
    selector: "#town",
    name: "Explore SUNNYVAiLE",
    copy: "Browse every district and building without losing the guided starting point."
  },
  {
    selector: "#collect",
    name: "Save your place",
    copy: "See how the Resident Card and Closet connect what you learn, collect and revisit."
  }
];

function el(doc, tag, className, text) {
  const node = doc.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function buildDailyColumn(doc) {
  const aside = el(doc, "aside", "daily-column");
  aside.setAttribute("aria-labelledby", "daily-column-title");

  const header = el(doc, "header", "daily-column-header");
  header.innerHTML = `
    <p class="daily-date">Today · July 29</p>
    <h2 id="daily-column-title">From today’s paper</h2>
    <p class="daily-purpose">Front-page highlights from SUNNYVAiLE’s daily newspaper: AI news, useful tips, Mme CLAi-O’s reading, Promptoscope, town notes and a song.</p>
    <p class="daily-cadence">
      <span class="material-symbols-rounded" aria-hidden="true">update</span>
      <strong>Updated daily</strong>
      <span>Read the highlights right here.</span>
    </p>
    <a class="daily-paper-link" href="/newsstand.html">Visit the full NewsStand<span aria-hidden="true"> →</span></a>
    <button class="pager-button" type="button" aria-controls="tour-guide-panel" aria-expanded="false">
      <img src="${candidateRoot}/artwork/sunnyvaile-signal-pager-v1.png" alt="">
      <span><strong>Need directions?</strong><small>Open the SUNNYVAiLE Tour Guide</small></span>
    </button>
  `;
  aside.append(header);

  const edition = el(doc, "div", "daily-edition");
  dailyEdition.forEach((item, index) => {
    const article = el(doc, "article", `daily-entry daily-entry-${item.tone}`);
    const provider = item.providerKey ? providerArtwork[item.providerKey] : null;
    const theme = item.themeKey ? themeArtwork[item.themeKey] : null;
    const artwork = provider || theme;
    const artworkKey = item.providerKey || item.themeKey;
    const artworkKind = provider ? "provider" : "theme";
    const imageSrc = artwork?.src || item.image;
    const imageAlt = artwork?.alt || item.imageAlt;
    if (item.audioSrc) article.id = "daily-song";
    article.innerHTML = `
      ${imageSrc ? `
        <div class="daily-entry-media">
          <img class="daily-entry-image" src="${imageSrc}" alt="${imageAlt}">
          ${artwork ? `
            <span class="daily-provider-lockup daily-${artworkKind}-${artworkKey}">
              <strong>${artwork.product}</strong>
              <small>${artwork.company}</small>
            </span>
          ` : ""}
        </div>
      ` : ""}
      <p class="daily-entry-label"><span class="material-symbols-rounded" aria-hidden="true">${item.icon}</span>${item.label}</p>
      <h3>${item.title}</h3>
      <p>${item.body}</p>
      ${item.detail ? `<p class="daily-entry-detail">${item.detail}</p>` : ""}
      ${item.audioSrc || item.href ? `
        <div class="daily-entry-actions">
          ${item.audioSrc ? `
            <button
              class="daily-song-listen"
              type="button"
              data-audio-src="${item.audioSrc}"
              data-audio-title="${item.title}"
              aria-pressed="false"
            >
              <span class="material-symbols-rounded" aria-hidden="true">play_arrow</span>
              <span data-listen-label>Listen</span>
            </button>
          ` : ""}
          ${item.href ? `
            <a class="daily-entry-link" href="${item.href}">${item.linkLabel}<span aria-hidden="true"> →</span></a>
          ` : ""}
        </div>
      ` : ""}
      ${item.audioSrc ? `<p class="daily-song-status" role="status" aria-live="polite"></p>` : ""}
    `;
    edition.append(article);
    if (index === 1) {
      const figure = el(doc, "figure", "daily-service-illustration");
      figure.innerHTML = `
        <img src="${candidateRoot}/artwork/daily-edition-object-desk-v1.png" alt="A comic-style daily desk with a pager, pocket note, AI horoscope crystal ball, eight-stop town map, cassette and headphones">
      `;
      edition.append(figure);
    }
  });
  aside.append(edition);
  return aside;
}

function buildTourPanel(doc) {
  const panel = el(doc, "aside", "tour-guide-panel");
  panel.id = "tour-guide-panel";
  panel.hidden = true;
  panel.setAttribute("aria-labelledby", "tour-guide-title");
  panel.innerHTML = `
    <div class="tour-guide-head">
      <div class="tour-guide-identity">
        <span class="tour-guide-pager-icon" aria-hidden="true">
          <img src="${candidateRoot}/artwork/sunnyvaile-signal-pager-v1.png" alt="">
        </span>
        <div>
          <p class="daily-date">SUNNYVAiLE Tour Guide</p>
          <h2 id="tour-guide-title">Where would you like to go?</h2>
        </div>
      </div>
      <button type="button" class="tour-close" aria-label="Close tour guide">
        <span class="material-symbols-rounded" aria-hidden="true">close</span>
      </button>
    </div>
    <p class="tour-guide-intro">New here? Take the seven-stop overview. Back for Wednesday? Jump straight to this week’s route. Or choose the thing you came for today.</p>
    <div class="tour-guide-actions">
      <button type="button" data-tour-action="start"><span class="material-symbols-rounded" aria-hidden="true">play_arrow</span><span><strong>New here? Tour the Homepage</strong><small>Seven useful stops on this page</small></span></button>
      <button type="button" data-tour-action="wednesday"><span class="material-symbols-rounded" aria-hidden="true">route</span><span><strong>Back for Wednesday?</strong><small>Jump to the eight-stop weekly route</small></span></button>
      <button type="button" data-tour-action="activities"><span class="material-symbols-rounded" aria-hidden="true">casino</span><span><strong>Find a game or tool</strong><small>Something useful, funny or quick</small></span></button>
      <button type="button" data-tour-action="buildings"><span class="material-symbols-rounded" aria-hidden="true">location_city</span><span><strong>Find a building</strong><small>Open the town map and directory</small></span></button>
    </div>
    <div class="tour-stop" hidden>
      <p class="daily-date">Stop <span data-tour-index>1</span> of ${tourStops.length}</p>
      <h3 data-tour-name></h3>
      <p data-tour-copy></p>
      <div class="tour-stop-controls">
        <button type="button" data-tour-control="previous">Back</button>
        <button type="button" data-tour-control="next">Next</button>
        <button type="button" data-tour-control="finish">Finish</button>
      </div>
    </div>
  `;
  return panel;
}

function installCandidate(doc, win) {
  if (doc.documentElement.dataset.dailyCandidateInstalled === "true") return;
  doc.documentElement.dataset.dailyCandidateInstalled = "true";

  const iconFont = doc.createElement("link");
  iconFont.rel = "stylesheet";
  iconFont.href =
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL@20..48,600,1";
  doc.head.append(iconFont);

  const styles = doc.createElement("link");
  styles.rel = "stylesheet";
  styles.href = `${candidateRoot}/candidate.css?v=84`;
  doc.head.append(styles);

  doc.body.classList.add("daily-pager-candidate");

  const whyActions = doc.querySelectorAll(".why-links .text-link");
  const whyActionContent = [
    {
      label: "Read their stories",
      detail: "The LUMINAiRY"
    },
    {
      label: "Listen to Episode 04",
      detail: "It Was Women All Along"
    }
  ];
  whyActions.forEach((link, index) => {
    const content = whyActionContent[index];
    if (!content) return;
    link.classList.add("why-action");
    link.innerHTML = `
      <span class="why-action-label">${content.label}</span>
      <span class="why-action-detail">${content.detail}</span>
      <span class="why-action-arrow" aria-hidden="true">→</span>
    `;
  });

  const imageAuthority = [
    {
      selector: '.intent-grid a[href="#reference"] img',
      src: "/assets/sunnyvaile-buildings/y2k-v3/03-town-library.webp",
      alt: "The LIBRAiRY building in SUNNYVAiLE"
    },
    {
      selector: '.intent-grid a[href="#help"] img',
      src: "/assets/sunnyvaile-buildings/y2k-v3-rethink-20260715/regular/11-fairy-godmother-house-enchanted-garden-crisp-roof-v6.png?homepage=17",
      alt: "The FAiRY Godmother’s Willow Lane house with its abundant whimsical purple and teal garden"
    },
    {
      selector: '#reference > img',
      src: "/assets/video/delivery-20260714-opening-v6/shots/opening-10-miss-jeeves-approved-wide.png",
      alt: "Miss Jeeves at her modern LIBRAiRY reference desk"
    },
    {
      selector: '.activity-grid article#help > img',
      src: "/assets/video/delivery-20260714-opening-v6/shots/opening-08-fairy-godmother-clean-lit-v2.png",
      alt: "The FAiRY Godmother in her Willow Lane parlour"
    },
    {
      selector: '.activity-grid article:nth-child(2) > img',
      src: `${candidateRoot}/artwork/mme-claio-reading-room-card-v1.png`,
      alt: "Mme CLAi-O seated at her tarot table in her SUNNYVAiLE reading room"
    },
    {
      selector: '.activity-grid article:nth-child(3) > img',
      src: "/assets/bws-fortune-teller/frame-1-closed.webp",
      alt: "The current Businesswomen’s Special paper fortune teller, closed with Bubbles, After Dark, Citrus and Classic panels"
    },
    {
      selector: '.spot[href="/radio.html"] img',
      src: "/assets/video/delivery-20260714-opening-v6/shots/opening-05-dj-sunnyv-clean-face.png",
      alt: "DJ SunnyV at the KSVL 99.9 studio desk"
    },
    {
      selector: '.district[href="/sorority-house.html"] img',
      src: "/assets/sunnyvaile-buildings/y2k-v3-rethink-20260715/web/10-delta-lai-nu-house-rethink-v1.jpg",
      alt: "Delta LAi Nu house on Wisteria Lane"
    },
    {
      selector: '.district[href="/games/fairy-godmother.html"] img',
      src: "/assets/sunnyvaile-buildings/y2k-v3-rethink-20260715/regular/11-fairy-godmother-house-enchanted-garden-crisp-roof-v6.png?homepage=17",
      alt: "The FAiRY Godmother’s Willow Lane house with its abundant whimsical purple and teal garden"
    }
  ];
  imageAuthority.forEach(({ selector, src, alt }) => {
    const image = doc.querySelector(selector);
    if (!image) return;
    image.src = src;
    image.alt = alt;
  });

  const referenceInput = doc.querySelector("#reference #lookup");
  if (referenceInput) {
    referenceInput.placeholder = "Try: Why does AI make things up?";
  }

  const referenceQuestions = [
    "Why does AI make things up?",
    "Which AI tool should I use?",
    "How do I check an AI answer?"
  ];
  doc.querySelectorAll("#reference .popular button").forEach((button, index) => {
    const question = referenceQuestions[index];
    if (!question) return;
    button.type = "button";
    button.textContent = question;
    button.addEventListener("click", () => {
      if (!referenceInput) return;
      referenceInput.value = question;
      referenceInput.focus();
    });
  });

  const postcardBand = doc.querySelector(".postcard-band");
  if (postcardBand) {
    postcardBand.id = "postcard";
    const postcardCopy = postcardBand.querySelector(":scope > div");
    const postcardAction = postcardBand.querySelector(":scope > a");
    const postcardVisual = el(doc, "figure", "postcard-visual");
    postcardVisual.innerHTML = `
      <img
        src="/assets/postcards/from-sunnyvaile/greetings-from-sunnyvaile-post-card.png"
        alt="A Greetings from SUNNYVAiLE postcard showing friends gathered in the town park"
      >
    `;
    if (postcardCopy) {
      postcardCopy.classList.add("postcard-copy");
      const postcardHeading = el(doc, "div", "postcard-heading");
      const postcardDetails = el(doc, "div", "postcard-details");
      const eyebrow = postcardCopy.querySelector(".eyebrow");
      const title = postcardCopy.querySelector("h2");
      if (eyebrow) postcardHeading.append(eyebrow);
      if (title) postcardHeading.append(title);
      Array.from(postcardCopy.children).forEach((child) =>
        postcardDetails.append(child)
      );
      postcardCopy.append(postcardHeading, postcardDetails);
    }
    postcardAction?.classList.add("postcard-action");
    postcardBand.prepend(postcardVisual);
    if (win.location.hash === "#postcard") {
      win.requestAnimationFrame(() =>
        postcardBand.scrollIntoView({ block: "center" })
      );
    }
  }

  const dreamPhoneCard = Array.from(
    doc.querySelectorAll(".activity-grid article")
  ).find((card) => card.querySelector("h3")?.textContent.trim() === "Dream Phone");
  if (dreamPhoneCard) {
    const tag = dreamPhoneCard.querySelector(".tag");
    const description = dreamPhoneCard.querySelector("p");
    const action = dreamPhoneCard.querySelector("button");
    if (tag) tag.textContent = "Two ways to play · 3–5 min";
    if (description) {
      description.textContent =
        "Call a SUNNYVAiLE character for a funny, prewritten reframe—or play For Real / As If and investigate whether the AI’s claim holds up or is a hallucination.";
    }
    if (action) action.textContent = "Answer Dream Phone";
  }

  const activityFilters = [...doc.querySelectorAll(".filter button[data-filter]")];
  function syncActivityFilterState() {
    activityFilters.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.classList.contains("active"))
      );
    });
  }
  activityFilters.forEach((button) => {
    button.addEventListener("click", syncActivityFilterState);
  });
  syncActivityFilterState();

  doc.querySelector(".district-cards")?.setAttribute("id", "town-districts");
  doc.querySelector(".why-box")?.setAttribute("id", "why-exists");
  doc
    .querySelector('.district[href="/sorority-house.html"]')
    ?.setAttribute("id", "district-wisteria");
  doc
    .querySelector('.district[href="/games/fairy-godmother.html"]')
    ?.setAttribute("id", "district-willow");

  const main = doc.querySelector("main#top");
  const hero = main?.querySelector(":scope > .hero");
  if (!main || !hero) throw new Error("The current Homepage hero could not be found.");

  /*
   * The master animation is the first masthead a visitor sees once per
   * browser-tab visit. Session storage prevents it replaying when the visitor
   * returns to the Homepage during that visit. The existing masthead remains
   * intact underneath and becomes visible after five seconds (or when the
   * master finishes). Reduced-motion visitors go straight to that masthead.
   */
  const introSessionKey = "laidies-homepage-master-intro-seen-v1";
  const introPreviewParams = new URLSearchParams(location.search);
  const previewReducedMotion =
    introPreviewParams.get("motion") === "reduce";
  const forceIntroPreview = introPreviewParams.get("intro") === "preview";
  if (forceIntroPreview) {
    win.sessionStorage.removeItem(introSessionKey);
  }
  const reducedMotion = {
    matches:
      previewReducedMotion ||
      win.matchMedia("(prefers-reduced-motion: reduce)").matches
  };
  const introAlreadySeen =
    !forceIntroPreview &&
    win.sessionStorage.getItem(introSessionKey) === "true";

  if (!introAlreadySeen && !reducedMotion.matches) {
    win.sessionStorage.setItem(introSessionKey, "true");

    const arrival = el(doc, "section", "hero-arrival");
    arrival.setAttribute("aria-label", "LAiDIES animated introduction");
    arrival.innerHTML = `
      <video
        class="hero-arrival-video"
        muted
        playsinline
        autoplay
        preload="auto"
        poster="${masterLogoAnimationRoot}/continuous-i-evergreen-six-clean-electric-v10-still.png"
      >
        <source
          src="${masterLogoAnimationRoot}/continuous-i-evergreen-six-clean-electric-v10.mp4"
          type="video/mp4"
        >
        <img
          src="${masterLogoAnimationRoot}/continuous-i-evergreen-six-clean-electric-v10-still.png"
          alt="The LAiDIES logo with its Rewind Era icon sequence"
        >
      </video>
      <button class="hero-arrival-skip" type="button">Skip intro</button>
      <p class="sr-only" role="status" aria-live="polite">
        The muted LAiDIES introduction is playing. The Homepage masthead follows.
      </p>
    `;
    hero.classList.add("hero-arrival-active");
    hero.prepend(arrival);

    const arrivalVideo = arrival.querySelector(".hero-arrival-video");
    const skipIntro = arrival.querySelector(".hero-arrival-skip");
    let introFinished = false;
    let introTimer = win.setTimeout(finishIntro, forceIntroPreview ? 15000 : 5000);

    function finishIntro() {
      if (introFinished) return;
      introFinished = true;
      win.clearTimeout(introTimer);
      arrivalVideo.pause();
      hero.classList.add("hero-arrival-revealing");
      arrival.classList.add("is-leaving");
      win.setTimeout(() => {
        arrival.remove();
        hero.classList.remove(
          "hero-arrival-active",
          "hero-arrival-revealing"
        );
      }, 760);
    }

    arrivalVideo.muted = true;
    arrivalVideo.defaultMuted = true;
    arrivalVideo.addEventListener("ended", finishIntro, { once: true });
    arrivalVideo.addEventListener("error", finishIntro, { once: true });
    skipIntro.addEventListener("click", finishIntro);

    const playPromise = arrivalVideo.play();
    playPromise?.catch(finishIntro);
  } else if (reducedMotion.matches) {
    win.sessionStorage.setItem(introSessionKey, "true");
  }

  const afterHero = el(doc, "div", "homepage-after-hero");
  const flow = el(doc, "div", "homepage-main-flow");
  const followingNodes = [];
  let cursor = hero.nextSibling;
  while (cursor) {
    followingNodes.push(cursor);
    cursor = cursor.nextSibling;
  }
  followingNodes.forEach((node) => flow.append(node));
  const dailyColumn = buildDailyColumn(doc);
  afterHero.append(flow, dailyColumn);
  main.append(afterHero);

  /* Reparenting the Homepage sections can invalidate the browser's initial
     hash position. Reapply it after the candidate layout exists so review and
     visitor deep links land on the section they named. */
  const requestedSection = win.location.hash.slice(1);
  if (requestedSection) {
    win.requestAnimationFrame(() => {
      doc.getElementById(requestedSection)?.scrollIntoView({ block: "start" });
    });
  }

  const dailyAudio = new win.Audio();
  dailyAudio.preload = "metadata";
  let dailyAudioButton = null;

  function setDailyAudioState(button, state, message = "") {
    if (!button) return;
    const playing = state === "playing";
    button.setAttribute("aria-pressed", String(playing));
    button.querySelector(".material-symbols-rounded").textContent =
      playing ? "pause" : "play_arrow";
    button.querySelector("[data-listen-label]").textContent =
      playing ? "Pause" : "Listen";
    const status = button.closest(".daily-entry")?.querySelector(".daily-song-status");
    if (status) status.textContent = message;
  }

  dailyColumn.querySelectorAll(".daily-song-listen").forEach((button) => {
    button.addEventListener("click", async () => {
      const src = button.dataset.audioSrc;
      const title = button.dataset.audioTitle || "Song of the Day";
      if (!src) return;

      if (dailyAudioButton === button && !dailyAudio.paused) {
        dailyAudio.pause();
        setDailyAudioState(button, "paused", `${title} paused.`);
        return;
      }

      doc.querySelectorAll("audio").forEach((audio) => {
        if (audio !== dailyAudio) audio.pause();
      });
      if (dailyAudioButton && dailyAudioButton !== button) {
        setDailyAudioState(dailyAudioButton, "paused");
      }
      if (dailyAudio.src !== new URL(src, win.location.href).href) {
        dailyAudio.src = src;
      }
      dailyAudioButton = button;

      try {
        await dailyAudio.play();
        setDailyAudioState(button, "playing", `Playing ${title}.`);
      } catch {
        setDailyAudioState(
          button,
          "error",
          `${title} could not start. Visit KSVL 99.9 to listen.`
        );
      }
    });
  });

  dailyAudio.addEventListener("ended", () => {
    setDailyAudioState(dailyAudioButton, "ended", "Song finished.");
  });
  dailyAudio.addEventListener("error", () => {
    setDailyAudioState(
      dailyAudioButton,
      "error",
      "The song could not load. Visit KSVL 99.9 to listen."
    );
  });

  const tourPanel = buildTourPanel(doc);
  doc.body.append(tourPanel);

  const pager = doc.querySelector(".pager-button");
  const close = tourPanel.querySelector(".tour-close");
  const errandLink = doc.querySelector('.hero-jumps a[href="#today"]');
  let returnFocus = pager;
  let tourIndex = 0;

  function scrollTo(selector) {
    const target = doc.querySelector(selector);
    if (!target) return;
    target.scrollIntoView({
      behavior: win.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start"
    });
  }

  function openTour(trigger = pager) {
    returnFocus = trigger;
    tourPanel.hidden = false;
    pager.setAttribute("aria-expanded", "true");
    close.focus();
  }

  function closeTour() {
    tourPanel.hidden = true;
    pager.setAttribute("aria-expanded", "false");
    doc.querySelectorAll(".tour-highlight").forEach((node) =>
      node.classList.remove("tour-highlight")
    );
    returnFocus?.focus();
  }

  function showTourStop(index) {
    tourIndex = Math.max(0, Math.min(index, tourStops.length - 1));
    const stop = tourStops[tourIndex];
    const card = tourPanel.querySelector(".tour-stop");
    card.hidden = false;
    card.querySelector("[data-tour-index]").textContent = String(tourIndex + 1);
    card.querySelector("[data-tour-name]").textContent = stop.name;
    card.querySelector("[data-tour-copy]").textContent = stop.copy;
    card.querySelector('[data-tour-control="previous"]').disabled = tourIndex === 0;
    card.querySelector('[data-tour-control="next"]').hidden =
      tourIndex === tourStops.length - 1;
    card.querySelector('[data-tour-control="finish"]').hidden =
      tourIndex !== tourStops.length - 1;
    doc.querySelectorAll(".tour-highlight").forEach((node) =>
      node.classList.remove("tour-highlight")
    );
    const target = doc.querySelector(stop.selector);
    target?.classList.add("tour-highlight");
    scrollTo(stop.selector);
  }

  pager.addEventListener("click", () => {
    if (tourPanel.hidden) openTour();
    else closeTour();
  });
  errandLink?.addEventListener("click", (event) => {
    event.preventDefault();
    dailyColumn.scrollIntoView({
      behavior: win.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start"
    });
  });
  close.addEventListener("click", closeTour);

  tourPanel.addEventListener("click", (event) => {
    const action = event.target.closest("[data-tour-action]")?.dataset.tourAction;
    if (action === "start") showTourStop(0);
    if (action === "wednesday") {
      closeTour();
      scrollTo("#this-week");
    }
    if (action === "activities") {
      closeTour();
      scrollTo("#activities");
    }
    if (action === "buildings") {
      closeTour();
      scrollTo("#town");
    }
    const control = event.target.closest("[data-tour-control]")?.dataset.tourControl;
    if (control === "previous") showTourStop(tourIndex - 1);
    if (control === "next") showTourStop(tourIndex + 1);
    if (control === "finish") closeTour();
  });

  doc.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !tourPanel.hidden) closeTour();
  });

  const previewSection = new URLSearchParams(location.search).get("section");
  const previewTarget = previewSection
    ? doc.getElementById(previewSection)
    : null;
  if (previewTarget) {
    win.requestAnimationFrame(() => {
      win.requestAnimationFrame(() =>
        previewTarget.scrollIntoView({ behavior: "auto", block: "start" })
      );
    });
  }
}

function initializePreviewFrame() {
  try {
    const doc = frame.contentDocument;
    const win = frame.contentWindow;
    if (!doc || !win) throw new Error("The isolated preview is not same-origin.");
    installCandidate(doc, win);
  } catch (error) {
    frame.hidden = true;
    const fallback = document.createElement("div");
    fallback.className = "preview-error";
    fallback.textContent = `The isolated Homepage candidate could not initialize: ${error.message}`;
    document.body.append(fallback);
  }
}

frame.addEventListener("load", initializePreviewFrame);
if (
  frame.contentDocument?.documentElement &&
  frame.contentWindow?.location.href !== "about:blank"
) {
  initializePreviewFrame();
}
