/* ============================================================
   THE GIFT SHOP — product catalog (print-on-demand)
   ------------------------------------------------------------
   HOW TO GO LIVE (Ali — this is the ONLY part I can't do for you):
   1. Create the products in Printful (posters/prints/stickers/
      apparel) and/or Gumroad (the digital mix CD).
   2. Each product there gives you a hosted CHECKOUT URL.
   3. Paste that URL into `buyUrl` below. That's it — the card's
      "Buy" button will link straight to the hosted checkout, which
      handles payment + shipping (incl. gift address + gift note).
   No payment code lives on this site, so there's nothing to secure
   here. Prices below are placeholders — set the real price in
   Printful/Gumroad; keep this label in sync for display.
   ============================================================ */
var PRODUCTS = [
  {
    name: "Deb's “NOPE” Poster Set",
    price: "$28",
    tag: "Bestseller",
    giftable: true,
    department: "prints",
    preview: "poster-set",
    images: [
      "/assets/printables/deb-nope-poster-loop-me-out-web.jpg?v=20260716",
      "/assets/printables/deb-nope-poster-deb-flection-trademark-web.jpg?v=20260716",
      "/assets/printables/deb-nope-poster-mayor-sunnyvaile-since-1999-web.jpg?v=20260716"
    ],
    blurb: "The full NOPE trilogy — “Loop Me Out,” “Deb-flection™,” and “Mayor since 1999.” Deb's whole philosophy, pulled straight from the print bin.",
    buyUrl: "#"
  },
  {
    name: "Deb's 1999 Campaign Poster",
    price: "$20",
    tag: "The original",
    giftable: true,
    department: "prints",
    preview: "poster",
    img: "/assets/printables/deb-1999-campaign-poster-yippee-ki-ai-hr-redacted-web.jpg?v=20260716",
    blurb: "The one that started it all — the Die Hard poster she never asked for, HR-redacted in Sharpie.",
    buyUrl: "#"
  },
  {
    name: "MAiVEN Window — your pick",
    price: "$24",
    tag: "Choose your MAiVEN",
    giftable: true,
    department: "prints",
    preview: "window-set",
    images: [
      "/assets/mavens/y2k-stained-glass-v3-finished/grace-hopper-y2k-stained-glass.png",
      "/assets/mavens/y2k-stained-glass-v3-finished/hedy-lamarr-y2k-stained-glass.png"
    ],
    blurb: "A gallery-grade print of one real woman from the LUMINAiRY's MAiVENS wing. Grace Hopper and Hedy Lamarr are on the counter while the rest of the range is checked.",
    buyUrl: "#"
  },
  {
    name: "The MAiVEN Set — mini prints",
    price: "$42",
    tag: "Collector",
    giftable: true,
    department: "prints",
    preview: "window-set",
    images: [
      "/assets/mavens/y2k-stained-glass-v3-finished/grace-hopper-y2k-stained-glass.png",
      "/assets/mavens/y2k-stained-glass-v3-finished/hedy-lamarr-y2k-stained-glass.png",
      "/assets/mavens/y2k-stained-glass-v3-finished/timnit-gebru-y2k-stained-glass.png",
      "/assets/mavens/y2k-stained-glass-v3-finished/fei-fei-li-y2k-stained-glass.png"
    ],
    blurb: "A boxed mini-print set from the real-women windows. The full production count is still being confirmed; the four approved examples shown are the actual art.",
    buyUrl: "#"
  },
  {
    name: "Episode Scene Art Print",
    price: "$22",
    tag: "Graphic novel",
    giftable: true,
    department: "prints",
    preview: "landscape",
    img: "/assets/episodes/ep-04/pixel/ep04-scene-05-grace-b-mid-comic-v1-locked-1920.png",
    blurb: "A current graphic-novel scene from Episode 04: Grace Hopper, the moth, and the machine — not the retired pixel frame that used to stand in for this product.",
    buyUrl: "#"
  },
  {
    name: "Puffy Sticker Sheet",
    price: "$8",
    tag: "Restock",
    giftable: true,
    department: "small-goods",
    preview: "landscape",
    img: "/assets/puffies/contact-sheets/all-usable-puffy-stickers-contact-sheet.png",
    blurb: "The approved puffy collection gathered in one place. This is the real source-art sheet; the final retail backing card is still being produced.",
    buyUrl: "#"
  },
  {
    name: "Tee · “On Wednesdays we do AI”",
    price: "$34",
    tag: "Signature",
    giftable: true,
    department: "apparel",
    blurb: "The house motto in the house voice — the Mean Girls nod and the AI punchline. The garment mockup is still in production, so the wall stays honestly empty.",
    buyUrl: "#"
  },
  {
    name: "Tee · “I survived Y2K. I'll survive this too.”",
    price: "$34",
    tag: "Bestseller",
    giftable: true,
    department: "apparel",
    blurb: "You dialed up, you hoarded canned goods, the clock rolled over and you were fine. AI is just the next Tuesday. The real garment proof is not finished yet.",
    buyUrl: "#"
  },
  {
    name: "Tee · “Don't ship the beige”",
    price: "$34",
    tag: "Lyric · Miranda",
    giftable: true,
    department: "apparel",
    blurb: "Miranda's standard in three words, made for anyone who refuses to ship mediocre. The final in-generation lettering proof still needs to be made.",
    buyUrl: "#"
  },
  {
    name: "Tee · “Loop me out”",
    price: "$34",
    tag: "Lyric · Deb",
    giftable: true,
    department: "apparel",
    blurb: "Deb's cry for freedom, styled like the reply-all you never wanted. Deb-flection™, wearable — once the real garment proof clears production.",
    buyUrl: "#"
  },
  {
    name: "The NOPE Pad",
    price: "$12",
    tag: "Bestseller",
    giftable: true,
    department: "small-goods",
    blurb: "From the desk of Deb: a tear-off memo pad for the email, the task, or the meeting invite. The pad artwork is specced but does not yet have an approved product image.",
    buyUrl: "#"
  },
  {
    name: "SUNNYVAiLE Tote",
    price: "$24",
    tag: "Made to order",
    giftable: true,
    department: "small-goods",
    blurb: "Carry the whole town. The wordmark treatment belongs on a real canvas proof; until that exists, there is no fake tote hanging on the rack.",
    buyUrl: "#"
  },
  {
    name: "KSVL Mix — “Saints on 99.9”",
    price: "$6",
    tag: "Digital",
    giftable: true,
    department: "digital",
    preview: "landscape",
    img: "/assets/playlist-mix-cd-v2.png",
    blurb: "The saint anthems and episode songs, mixed by DJ SunnyV. The real KSVL disc art is here; the Gumroad download link is not connected yet.",
    buyUrl: "#"
  }
];

(function () {
  var list = document.getElementById("shopStockList");
  var detail = document.getElementById("shopProduct");
  var heldCount = document.getElementById("shopHeldCount");
  var departments = Array.prototype.slice.call(document.querySelectorAll("[data-department]"));
  var productTriggers = Array.prototype.slice.call(document.querySelectorAll("[data-product]"));
  var currentDepartment = "all";
  var currentIndex = 0;
  var boardKey = "laidies_puffies_board";

  if (!list || !detail) return;

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      })[char];
    });
  }

  function itemId(index) {
    return "gift-shop-product-" + index;
  }

  function readBoard() {
    try {
      var value = JSON.parse(localStorage.getItem(boardKey) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function isHeld(index) {
    return readBoard().some(function (item) {
      return item.id === itemId(index);
    });
  }

  function countShopHolds() {
    return readBoard().filter(function (item) {
      return String(item.id || "").indexOf("gift-shop-product-") === 0;
    }).length;
  }

  function updateHeldCount() {
    if (heldCount) heldCount.textContent = String(countShopHolds());
  }

  function filteredIndexes() {
    return PRODUCTS.map(function (_, index) { return index; }).filter(function (index) {
      return currentDepartment === "all" || PRODUCTS[index].department === currentDepartment;
    });
  }

  function previewMarkup(product) {
    if (product.preview === "poster-set") {
      return '<div class="shop-product__art shop-product__art--poster-set"><div class="shop-poster-set">' +
        product.images.map(function (src) {
          return '<img src="' + esc(src) + '" alt="" loading="lazy">';
        }).join("") +
        "</div></div>";
    }
    if (product.preview === "window-set") {
      return '<div class="shop-product__art"><div class="shop-window-set">' +
        product.images.map(function (src) {
          return '<img src="' + esc(src) + '" alt="" loading="lazy">';
        }).join("") +
        "</div></div>";
    }
    if (product.img) {
      var artClass = product.preview === "poster" ? " shop-product__art--poster" :
        product.preview === "landscape" ? " shop-product__art--landscape" : "";
      return '<div class="shop-product__art' + artClass + '"><img src="' + esc(product.img) + '" alt="' + esc(product.name) + '" loading="lazy"></div>';
    }
    return "";
  }

  function departmentLabel(value) {
    return ({
      "prints": "Print bin",
      "apparel": "Tee wall",
      "small-goods": "Spinner rack",
      "digital": "KSVL counter"
    })[value] || "Gift Shop";
  }

  function renderList() {
    var indexes = filteredIndexes();
    list.innerHTML = indexes.map(function (index) {
      var product = PRODUCTS[index];
      return '<li><button type="button" data-select-product="' + index + '"' +
        (index === currentIndex ? ' class="is-current" aria-current="true"' : "") + ">" +
        "<strong>" + esc(product.name) + "</strong>" +
        "<small>" + esc(product.tag) + " · " + esc(product.price) + "</small>" +
        "</button></li>";
    }).join("");
  }

  function renderProduct(index, focusDetail) {
    var product = PRODUCTS[index];
    if (!product) return;
    currentIndex = index;

    var preview = previewMarkup(product);
    var hasPreview = Boolean(preview);
    var held = isHeld(index);
    var live = product.buyUrl && product.buyUrl !== "#";
    var buyMarkup = live
      ? '<a class="shop-buy" href="' + esc(product.buyUrl) + '" target="_blank" rel="noopener">Buy from the real checkout →</a>'
      : "";
    var giftMarkup = product.giftable
      ? live
        ? '<a class="shop-gift-action" href="' + esc(product.buyUrl) + '" target="_blank" rel="noopener" data-gift-action>Send it as a gift</a>'
        : '<button class="shop-gift-action" type="button" disabled>Gift option opens with the till</button>'
      : "";

    detail.id = itemId(index);
    detail.setAttribute("data-puffy-title", product.name);
    detail.setAttribute("data-puffy-summary", "Held behind the counter at the SUNNYVAiLE Gift Shop.");
    detail.innerHTML =
      '<div class="shop-product__layout' + (hasPreview ? "" : " is-copy-only") + '">' +
        preview +
        '<div class="shop-product__copy">' +
          '<p class="shop-product__dept">' + esc(departmentLabel(product.department)) + " · " + esc(product.tag) + "</p>" +
          '<h3 class="shop-product__name">' + esc(product.name) + "</h3>" +
          '<p class="shop-product__blurb">' + esc(product.blurb) + "</p>" +
          '<div class="shop-product__meta">' +
            '<span class="shop-product__price">' + esc(product.price) + "</span>" +
            '<span class="shop-product__status">' + (live ? "Hosted checkout connected" : "Working price · checkout not connected") + "</span>" +
          "</div>" +
          '<div class="shop-product__actions">' +
            '<button class="shop-hold' + (held ? " is-held" : "") + '" type="button" data-hold-product="' + index + '">' +
              (held ? "Held behind the counter ✓" : "Hold it behind the counter") +
            "</button>" +
            buyMarkup +
            giftMarkup +
          "</div>" +
          '<p class="shop-product__truth"><strong>' + (hasPreview ? "ACTUAL ART SHOWN." : "NO FAKE MOCKUP.") + "</strong> " +
            (hasPreview
              ? "This preview uses approved source art already in the project."
              : "This item stays text-only until its real product proof exists.") +
          "</p>" +
        "</div>" +
      "</div>";

    if (window.svPuffyScan) window.svPuffyScan();
    renderList();
    updateHeldCount();
    if (focusDetail) {
      detail.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(function () {
        var heading = detail.querySelector(".shop-product__name");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          heading.focus({ preventScroll: true });
        }
      }, 360);
    }
  }

  function selectDepartment(department, focusDetail) {
    currentDepartment = department || "all";
    departments.forEach(function (button) {
      if (!button.matches("button")) return;
      var current = button.getAttribute("data-department") === currentDepartment;
      button.classList.toggle("is-current", current);
      button.setAttribute("aria-pressed", current ? "true" : "false");
    });
    var indexes = filteredIndexes();
    if (indexes.indexOf(currentIndex) === -1) currentIndex = indexes[0] || 0;
    renderProduct(currentIndex, focusDetail);
  }

  function track(kind, index) {
    if (!window.plausible) return;
    try {
      window.plausible("Gift Shop click", {
        props: {
          product: PRODUCTS[index] ? PRODUCTS[index].name : "",
          kind: kind
        }
      });
    } catch (error) {}
  }

  departments.forEach(function (button) {
    if (!button.matches("button")) return;
    button.addEventListener("click", function () {
      selectDepartment(button.getAttribute("data-department"), true);
    });
  });

  productTriggers.forEach(function (button) {
    button.addEventListener("click", function () {
      currentDepartment = PRODUCTS[Number(button.getAttribute("data-product"))].department;
      renderProduct(Number(button.getAttribute("data-product")), true);
      departments.forEach(function (departmentButton) {
        if (!departmentButton.matches("button")) return;
        var current = departmentButton.getAttribute("data-department") === currentDepartment;
        departmentButton.classList.toggle("is-current", current);
        departmentButton.setAttribute("aria-pressed", current ? "true" : "false");
      });
    });
  });

  list.addEventListener("click", function (event) {
    var button = event.target.closest("[data-select-product]");
    if (!button) return;
    renderProduct(Number(button.getAttribute("data-select-product")), false);
  });

  detail.addEventListener("click", function (event) {
    var holdButton = event.target.closest("[data-hold-product]");
    if (holdButton) {
      var injectedPuffy = detail.querySelector(":scope > .puffy-btn");
      if (injectedPuffy) {
        injectedPuffy.click();
        renderProduct(Number(holdButton.getAttribute("data-hold-product")), false);
        track("hold", currentIndex);
      }
      return;
    }
    if (event.target.closest("[data-gift-action]")) track("gift", currentIndex);
    if (event.target.closest(".shop-buy")) track("buy", currentIndex);
  });

  document.addEventListener("puffies:changed", updateHeldCount);
  selectDepartment("all", false);
})();
