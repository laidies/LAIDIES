(function () {
  const toolkitMount = document.querySelector("[data-episode-toolkit]");
  const mastheadMount = document.querySelector("[data-episode-masthead-copy]");
  if (!toolkitMount && !mastheadMount) return;

  const issueNumber = Number(document.body?.dataset.issueNumber || 0);
  const padIssue = (number) => String(number).padStart(2, "0");

  function formatReleaseDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString + "T12:00:00");
    if (Number.isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(date);
  }

  function renderMasthead(episode) {
    if (!mastheadMount || !episode) return;
    const numberEl = mastheadMount.querySelector("[data-episode-masthead-number]");
    const titleEl = mastheadMount.querySelector("[data-episode-masthead-title]");
    const dateEl = mastheadMount.querySelector("[data-episode-masthead-date]");
    if (numberEl) numberEl.textContent = "#" + padIssue(episode.number || issueNumber);
    if (titleEl) titleEl.textContent = episode.title || "";
    if (dateEl) dateEl.textContent = formatReleaseDate(episode.releaseDate);
  }

  function getMastheadFallback() {
    if (!mastheadMount) return null;
    return {
      number: Number(mastheadMount.dataset.episodeNumber || issueNumber),
      title: mastheadMount.dataset.episodeTitle || "",
      releaseDate: mastheadMount.dataset.episodeReleaseDate || ""
    };
  }

  function mergeMastheadEpisode(episode) {
    const fallback = getMastheadFallback();
    if (!episode) return fallback;
    return {
      ...fallback,
      ...episode,
      releaseDate: episode.releaseDate || fallback?.releaseDate || ""
    };
  }

  function getArticleReturnConfig() {
    const params = new URLSearchParams(window.location.search || "");
    const requestedIssue = String(params.get("issue") || issueNumber || "").match(/\d+/)?.[0] || "";
    const source = params.get("from") || "";
    if (source === "this-week" || source === "bag") {
      const draftFlag = params.get("draft") === "1" ? "&draft=1" : "";
      const group = /^(practice|connect|realworld|fun)$/.test(params.get("group") || "") ? params.get("group") : "";
      const groupFlag = group ? "&group=" + encodeURIComponent(group) : "";
      return {
        href: "../this-week.html" + (requestedIssue ? "?issue=" + encodeURIComponent(Number(requestedIssue)) + "&bag=open" : "?bag=open") + groupFlag + draftFlag,
        label: "\u2190 Back to the Bag",
      };
    }
    if (source === "start-here") {
      return {
        href: "../start-here.html",
        label: "\u2190 Back to Start Here",
      };
    }
    if (source === "home") {
      return {
        href: "../index.html",
        label: "\u2190 Back to LAiDIES",
      };
    }
    return {
      href: "../episodes.html",
      label: "\u2190 Back to the Season",
    };
  }

  function applyArticleReturnLink() {
    const config = getArticleReturnConfig();
    const existing = document.querySelector(".issue-back-link");
    if (existing) {
      existing.href = config.href;
      existing.textContent = config.label;
      return;
    }
    if (document.querySelector("[data-wednesday-return]")) return;
    const link = document.createElement("a");
    link.dataset.wednesdayReturn = "true";
    link.href = config.href;
    link.textContent = config.label;
    link.style.cssText = "position:fixed;top:76px;left:clamp(14px,3vw,26px);right:auto;bottom:auto;z-index:120;display:inline-flex;width:fit-content;max-width:calc(100% - 28px);margin:0;padding:10px 14px;border:1px solid rgba(185,93,120,.42);border-radius:999px;background:rgba(20,8,24,.86);color:#ff8ccc;font-weight:850;text-decoration:none;box-shadow:0 12px 30px rgba(0,0,0,.28),0 0 0 4px rgba(185,93,120,.1);backdrop-filter:blur(10px);";
    const nav = document.querySelector(".issue-site-nav");
    if (nav?.parentNode) nav.insertAdjacentElement("afterend", link);
  }

  applyArticleReturnLink();
  renderMasthead(getMastheadFallback());

  /* Episode music tracks */
  const episodeTracks = {
    1: { title: "On Wednesday We Do AI", file: "content/music/dj-jaidy-week-01-on-wednesday-we-do-ai.mp3" },
    2: { title: "Tell Me What You Want", file: "content/music/dj-jaidy-week-02-tell-me-what-you-want.mp3" }
  };

  function fromIssuePage(url) {
    if (!url) return "../index.html";
    if (/^(https?:|mailto:|#)/i.test(url)) return url;
    if (url.startsWith("../")) return url;
    return "../" + url;
  }

  function renderToolkit(episode) {
    if (!toolkitMount) return;
    const links = episode?.siteLinks?.length ? episode.siteLinks : [];
    const issueLabel = episode?.number ? "Episode " + padIssue(episode.number) + " Fun Pack" : "Episode Fun Pack";
    const title = episode?.title ? episode.title + ": keep practicing." : "Keep practicing after the read.";
    const track = episodeTracks[issueNumber];

    toolkitMount.className = "issue-toolkit";
    const article = document.querySelector(".article-container");
    if (article?.parentNode && toolkitMount.previousElementSibling !== article) {
      article.insertAdjacentElement("afterend", toolkitMount);
    }

    const trackHtml = track ? `
      <div style="margin-top: 16px; padding: 14px 16px; background: rgba(185,93,120,0.08); border-radius: 10px; border: 1px solid rgba(185,93,120,0.2);">
        <p style="margin: 0 0 8px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #247b83;">\ud83c\udfb5 This episode\u2019s track \u2014 DJ JAIDY</p>
        <audio controls preload="metadata" src="../${track.file}" style="width: 100%; max-width: 400px; display: block;">
          <a href="../${track.file}">Play "${track.title}"</a>
        </audio>
        <p style="margin: 6px 0 0; font-size: 0.82rem; color: #65515d; font-style: italic;">${track.title}</p>
      </div>
    ` : "";

    const linksHtml = links.length ? links.map(
      (link) => `<a href="${fromIssuePage(link.url)}" data-link-type="${link.type || "other"}">${link.label}</a>`
    ).join("") : "";

    toolkitMount.innerHTML = `
      <div class="issue-toolkit-inner">
        <p class="issue-toolkit-label">${issueLabel}</p>
        <h2>${title}</h2>
        <p>Now that the read is done, use the weekly dashboard, quiz, Fun Pack, printable, glossary, and prompt to make the Episode stick.</p>
        <div class="issue-toolkit-grid">
          <a href="../this-week.html" data-link-type="weekly">Open this week's dashboard</a>
          <a href="../games/fun-pack.html" data-link-type="cardPack">Open the full Fun Pack</a>
          ${linksHtml}
          <a href="../index.html" data-link-type="episodes">Back to homepage</a>
        </div>
        ${trackHtml}
      </div>
    `;
  }

  fetch("../content/episode-index.json?v=masthead-data-1")
    .then((response) => {
      if (!response.ok) throw new Error("Episode index unavailable");
      return response.json();
    })
    .then((data) => {
      const episode = data.episodes?.find((item) => Number(item.number) === issueNumber);
      renderMasthead(mergeMastheadEpisode(episode));
      renderToolkit(episode);
    })
    .catch(() => {
      renderMasthead(getMastheadFallback());
      renderToolkit(null);
    });
})();
