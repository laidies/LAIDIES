(function () {
  var corridor = document.getElementById("mallCorridor");
  var input = document.getElementById("mallSearch");
  var searchButton = document.getElementById("mallSearchButton");
  var noResults = document.getElementById("mallNoResults");
  var noResultsQuery = document.getElementById("mallNoResultsQuery");
  var burnLink = document.getElementById("mallBurnLink");
  var resetButton = document.getElementById("mallSearchReset");
  var searchStatus = document.getElementById("mallSearchStatus");
  var corridorStatus = document.getElementById("mallCorridorStatus");
  var wish = document.getElementById("mallWish");

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function announceSearch(message, focusTarget) {
    if (searchStatus && searchStatus.textContent !== message) {
      searchStatus.textContent = message;
    }
    if (focusTarget) focusTarget.focus();
  }

  function filterDirectory(moveFocus) {
    if (!input) return;
    var query = normalize(input.value);
    var count = 0;
    var firstMatch = null;

    document.querySelectorAll(".mall-board li[data-search]").forEach(function (item) {
      var match = !query || normalize(item.dataset.search).indexOf(query) !== -1;
      item.hidden = !match;
      if (match) {
        count += 1;
        if (!firstMatch) firstMatch = item.querySelector("a");
      }
    });

    if (noResults) noResults.hidden = count > 0;
    if (!count) {
      var raw = input.value.trim();
      if (noResultsQuery) noResultsQuery.textContent = raw || "that";
      if (burnLink) burnLink.href = "/community/burn-book.html";
      announceSearch(
        "No directory results. Unit 11 offers an optional external community discussion.",
        moveFocus ? noResults : null
      );
    } else {
      var message = query
        ? count + (count === 1 ? " preview department matches." : " preview departments match.")
        : "All 10 preview departments are shown.";
      announceSearch(message, moveFocus ? searchStatus : null);
    }
  }

  function walk(direction) {
    if (!corridor) return;
    var shops = Array.prototype.slice.call(corridor.querySelectorAll(".shop"));
    var first = shops[0];
    var amount = first ? first.getBoundingClientRect().width : window.innerWidth * .75;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    corridor.scrollBy({ left: direction * amount, behavior: reduced ? "auto" : "smooth" });
    window.setTimeout(function () {
      var index = Math.max(0, Math.min(
        shops.length - 1,
        Math.round(corridor.scrollLeft / Math.max(amount, 1))
      ));
      if (corridorStatus) {
        corridorStatus.textContent =
          "Storefront " + (index + 1) + " of " + shops.length + ": " +
          (shops[index].querySelector(".shop-unit") || {}).textContent + ".";
      }
    }, reduced ? 0 : 420);
  }

  if (input) {
    input.addEventListener("input", function () { filterDirectory(false); });
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        filterDirectory(true);
      }
      if (event.key === "Escape") {
        input.value = "";
        filterDirectory(true);
      }
    });
  }

  if (searchButton) {
    searchButton.addEventListener("click", function () { filterDirectory(true); });
  }
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      input.value = "";
      filterDirectory(true);
    });
  }

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
      wish.querySelector("span").textContent = "Remembered privately on this device · no reward";
      try {
        localStorage.setItem("laidies_mall_wish", new Date().toISOString());
      } catch (_) {}
    });

    try {
      if (localStorage.getItem("laidies_mall_wish")) {
        wish.dataset.wished = "true";
        wish.querySelector("strong").textContent = "Wish made.";
        wish.querySelector("span").textContent = "Remembered privately on this device · no reward";
      }
    } catch (_) {}
  }
})();
