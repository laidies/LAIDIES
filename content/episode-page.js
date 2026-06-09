(function () {
  const toolkitMount = document.querySelector("[data-episode-toolkit]");
  if (!toolkitMount) return;

  const issueNumber = Number(document.body?.dataset.issueNumber || 0);
  const padIssue = (number) => String(number).padStart(2, "0");

  const defaultLinks = [
    { label: "Back to the episode closet", url: "index.html#episodes", type: "episodes" },
    { label: "Take the quiz", url: "index.html#quiz", type: "quiz" },
    { label: "Open the card pack", url: "index.html#card-pack", type: "cardPack" },
    { label: "Enter the chat room", url: "index.html#community-board", type: "community" },
    { label: "Review the glossary", url: "index.html#glossary", type: "glossary" }
  ];

  function fromIssuePage(url) {
    if (!url) return "../index.html";
    if (/^(https?:|mailto:|#)/i.test(url)) return url;
    if (url.startsWith("../")) return url;
    return `../${url}`;
  }

  function renderToolkit(episode) {
    const links = episode?.siteLinks?.length ? episode.siteLinks : defaultLinks;
    const issueLabel = episode?.number ? `Issue ${padIssue(episode.number)} extras` : "Issue extras";
    const title = episode?.title ? `${episode.title}: keep playing.` : "Keep playing after the read.";
    const nextEpisode = episode?.nextEpisode;

    toolkitMount.className = "issue-toolkit";
    const article = document.querySelector(".article-container");
    if (article?.parentNode && toolkitMount.previousElementSibling !== article) {
      article.insertAdjacentElement("afterend", toolkitMount);
    }
    toolkitMount.innerHTML = `
      <div class="issue-toolkit-inner">
        <p class="issue-toolkit-label">${issueLabel}</p>
        <h2>${title}</h2>
        <p>Now that the read is done, jump back into the quiz, card pack, printables, glossary, and chat-room pieces without leaving the lAIdies room.</p>
        <div class="issue-toolkit-grid">
          <a href="../index.html#episodes" data-link-type="episodes">Back to homepage</a>
          ${nextEpisode ? `<a href="../${nextEpisode.issueUrl}" data-link-type="episodes">Read next episode</a>` : ""}
          ${links
            .map(
              (link) =>
                `<a href="${fromIssuePage(link.url)}" data-link-type="${link.type || "other"}">${link.label}</a>`
            )
            .join("")}
        </div>
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
      if (episode) {
        episode.nextEpisode = data.episodes?.find(
          (item) => Number(item.number) === issueNumber + 1 && item.issueUrl && item.status === "published"
        );
      }
      renderToolkit(episode);
    })
    .catch(() => renderToolkit(null));
})();
