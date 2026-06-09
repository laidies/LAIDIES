(function () {
  const board = document.querySelector("[data-digest-board]");
  const status = document.querySelector("[data-digest-status]");
  const roomStatus = document.querySelector("[data-digest-room-status]");
  if (!board) return;

  const sectionLabels = {
    answered: "Answered + Useful",
    unanswered: "Unanswered",
    tips: "Tips",
    needsReceipts: "Needs Receipts",
    themes: "Repeated Themes",
  };

  function setStatus(message) {
    if (status) status.textContent = message;
  }

  function createDigestItem(item) {
    const article = document.createElement("article");
    article.className = "digest-item";

    const meta = document.createElement("p");
    meta.className = "digest-item-meta";
    meta.textContent = [item.room, item.status].filter(Boolean).join(" | ");

    const title = document.createElement("h3");
    title.textContent = item.title || "Untitled digest item";

    const summary = document.createElement("p");
    summary.textContent = item.summary || "No summary yet.";

    const review = document.createElement("p");
    review.className = "digest-review-note";
    review.textContent = item.review || "Review status not set.";

    article.append(meta, title, summary, review);

    if (item.url) {
      const link = document.createElement("a");
      link.href = item.url;
      link.textContent = "Open source room";
      article.append(link);
    }

    return article;
  }

  function renderDigest(data) {
    board.replaceChildren();
    if (roomStatus) roomStatus.replaceChildren();
    const sections = data.sections || {};

    if (roomStatus && Array.isArray(data.roomStatus) && data.roomStatus.length) {
      data.roomStatus.forEach((room) => {
        const chip = document.createElement("span");
        chip.className = `digest-room-chip ${room.status === "ok" ? "is-ok" : "is-skipped"}`;
        chip.textContent = room.status === "ok"
          ? `${room.room}: ${room.comments || 0} comments`
          : `${room.room}: waiting`;
        roomStatus.append(chip);
      });
    }

    Object.entries(sectionLabels).forEach(([key, label]) => {
      const items = sections[key] || [];
      const section = document.createElement("section");
      section.className = "digest-live-section";

      const heading = document.createElement("div");
      heading.className = "digest-live-heading";
      const eyebrow = document.createElement("p");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = label;
      const count = document.createElement("span");
      count.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;
      heading.append(eyebrow, count);
      section.append(heading);

      if (!items.length) {
        const empty = document.createElement("p");
        empty.className = "board-empty";
        empty.textContent = "Nothing here yet. Either the room is quiet or the receipts desk is still sorting.";
        section.append(empty);
      } else {
        const list = document.createElement("div");
        list.className = "digest-item-list";
        items.forEach((item) => list.append(createDigestItem(item)));
        section.append(list);
      }

      board.append(section);
    });

    const generatedAt = data.generatedAt ? new Date(data.generatedAt) : null;
    if (generatedAt && !Number.isNaN(generatedAt.getTime())) {
      setStatus(`Last refreshed ${generatedAt.toLocaleString()}. Source: ${data.source || "Hyvor Talk"}.`);
    } else {
      setStatus("Digest data is ready for the first Hyvor refresh.");
    }
  }

  fetch("../content/community/chat-room-digest.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error(`Digest data returned ${response.status}`);
      return response.json();
    })
    .then(renderDigest)
    .catch(() => {
      setStatus("Digest data could not load yet. The room still works; the receipts desk needs a refresh.");
    });
})();
