(function () {
  var corridor = document.getElementById("mallCorridor");
  var input = document.getElementById("mallSearch");
  var searchButton = document.getElementById("mallSearchButton");
  var noResults = document.getElementById("mallNoResults");
  var noResultsQuery = document.getElementById("mallNoResultsQuery");
  var burnLink = document.getElementById("mallBurnLink");
  var wish = document.getElementById("mallWish");

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function filterDirectory() {
    if (!input) return;
    var query = normalize(input.value);
    var count = 0;

    document.querySelectorAll(".mall-board li[data-search]").forEach(function (item) {
      var match = !query || normalize(item.dataset.search).indexOf(query) !== -1;
      item.hidden = !match;
      if (match) count += 1;
    });

    if (noResults) noResults.hidden = count > 0;
    if (!count) {
      var raw = input.value.trim();
      if (noResultsQuery) noResultsQuery.textContent = raw || "that";
      if (burnLink) burnLink.href = "/community/burn-book.html";
    }
  }

  function walk(direction) {
    if (!corridor) return;
    var first = corridor.querySelector(".shop");
    var amount = first ? first.getBoundingClientRect().width : window.innerWidth * .75;
    corridor.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (input) {
    input.addEventListener("input", filterDirectory);
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        filterDirectory();
      }
    });
  }

  if (searchButton) searchButton.addEventListener("click", filterDirectory);

  document.querySelectorAll("[data-mall-walk]").forEach(function (button) {
    button.addEventListener("click", function () {
      walk(button.dataset.mallWalk === "next" ? 1 : -1);
    });
  });

  if (corridor) {
    corridor.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        walk(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        walk(-1);
      }
    });
  }

  if (wish) {
    wish.addEventListener("click", function () {
      wish.dataset.wished = "true";
      wish.querySelector("strong").textContent = "Wish made.";
      wish.querySelector("span").textContent = "The fountain keeps it";
      try {
        localStorage.setItem("laidies_mall_wish", new Date().toISOString());
      } catch (_) {}
    });

    try {
      if (localStorage.getItem("laidies_mall_wish")) {
        wish.dataset.wished = "true";
        wish.querySelector("strong").textContent = "Wish made.";
        wish.querySelector("span").textContent = "The fountain remembers";
      }
    } catch (_) {}
  }
})();
