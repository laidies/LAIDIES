(() => {
  "use strict";

  const DATA_URL = "/operations/product-stewards/trading-cards/town-character-catalogue-admission-candidate-v1-2026-07-27.json";
  const catalogue = document.querySelector("#catalogue");
  const status = document.querySelector("#catalogue-status");

  const setFailure = () => {
    catalogue.setAttribute("aria-busy", "false");
    catalogue.innerHTML = '<div class="notice"><strong>The Town roll call is unavailable.</strong><br>Nothing was added to a pack or collection. Try this local preview again later.</div>';
    status.textContent = "Catalogue unavailable";
  };

  const createCard = (record) => {
    const article = document.createElement("article");
    article.className = "card-item";

    const button = document.createElement("button");
    button.className = "card-button";
    button.type = "button";
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", `Turn ${record.display_name}'s card over`);

    const card = document.createElement("span");
    card.className = "card";
    card.setAttribute("aria-hidden", "true");

    const front = document.createElement("span");
    front.className = "card-face card-front";

    const image = document.createElement("img");
    image.src = `/${record.front.file}`;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => front.classList.add("image-failed"), { once: true });

    const fallback = document.createElement("span");
    fallback.className = "image-fallback";
    fallback.textContent = `${record.display_name} artwork unavailable`;

    const back = document.createElement("span");
    back.className = "card-face card-back";
    back.innerHTML = `
      <span class="back-copy">
        <span class="back-label">${record.back.heading}</span>
        <h3>${record.display_name}</h3>
        <span class="teaching-move">${record.back.teaching_move}</span>
        <span class="boundary">${record.back.boundary}</span>
      </span>
    `;

    const prompt = document.createElement("span");
    prompt.className = "turn-prompt";
    prompt.textContent = "Turn card";

    front.append(image, fallback);
    card.append(front, back, prompt);
    button.append(card);
    article.append(button);

    button.addEventListener("click", () => {
      const isBack = button.getAttribute("aria-pressed") === "true";
      button.setAttribute("aria-pressed", String(!isBack));
      button.setAttribute("aria-label", `${isBack ? "Turn" : "Return"} ${record.display_name}'s card ${isBack ? "over" : "to the front"}`);
      prompt.textContent = isBack ? "Turn card" : "Show front";
    });

    return article;
  };

  fetch(DATA_URL, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error(`Catalogue response ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data.records) || data.records.length !== 13) {
        throw new Error("Expected exactly 13 Town records");
      }
      const fragment = document.createDocumentFragment();
      data.records.forEach((record) => fragment.append(createCard(record)));
      catalogue.replaceChildren(fragment);
      catalogue.setAttribute("aria-busy", "false");
      status.textContent = "13 cards loaded · choose a card to turn it over";
    })
    .catch(setFailure);
})();
