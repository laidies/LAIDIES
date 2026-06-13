(function () {
  const toolkitMount = document.querySelector("[data-episode-toolkit]");
  if (!toolkitMount) return;

  const issueNumber = Number(document.body?.dataset.issueNumber || 0);
  const padIssue = (number) => String(number).padStart(2, "0");

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
    const links = episode?.siteLinks?.length ? episode.siteLinks : [];
    const issueLabel = episode?.number ? "Episode " + padIssue(episode.number) + " Fun Pack" : "Episode Fun Pack";
    const title = episode?.title ? episode.title + ": keep playing." : "Keep playing after the read.";
    const track = episodeTracks[issueNumber];

    toolkitMount.className = "issue-toolkit";
    const article = document.querySelector(".article-container");
    if (article?.parentNode && toolkitMount.previousElementSibling !== article) {
      article.insertAdjacentElement("afterend", toolkitMount);
    }

    const trackHtml = track ? `
      <div style="margin-top: 16px; padding: 14px 16px; background: rgba(255,45,155,0.08); border-radius: 10px; border: 1px solid rgba(255,45,155,0.2);">
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
        <p>Now that the read is done, jump back into the quiz, card pack, printables, glossary, and chat-room pieces without leaving the lAIdies room.</p>
        <div class="issue-toolkit-grid">
          <a href="../games/fun-pack.html" data-link-type="cardPack">Open the full Fun Pack</a>
          ${linksHtml}
          <a href="../index.html" data-link-type="episodes">Back to homepage</a>
        </div>
        ${trackHtml}
      </div>
    `;
  }

  fetch("../content/episode-index.json")
    .then((response) => {
      if (!response.ok) throw new Error("Episode index unavailable");
      return response.json();
    })
    .then((data) => {
      const episode = data.episodes?.find((item) => Number(item.number) === issueNumber);
      renderToolkit(episode);
    })
    .catch(() => renderToolkit(null));
})();
