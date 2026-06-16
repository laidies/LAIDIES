(function () {
  function applyLAiDIESInlineWordmark(root) {
    var scope = root || document.body;
    if (!scope) return;

    var brandRegex = /\b(?:LAiDIES|LAIDIES|lAIdies|Laidies)\b/g;
    var skipTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "CODE", "PRE", "SVG"]);

    function makeWordmark() {
      var outer = document.createElement("span");
      outer.className = "laidies-inline-wordmark";
      outer.setAttribute("aria-label", "LAiDIES");

      var visual = document.createElement("span");
      visual.setAttribute("aria-hidden", "true");

      var plumStart = document.createElement("span");
      plumStart.dataset.laidiesPart = "plum";
      plumStart.textContent = "L";

      var rose = document.createElement("span");
      rose.dataset.laidiesPart = "rose";
      rose.textContent = "Ai";

      var plumEnd = document.createElement("span");
      plumEnd.dataset.laidiesPart = "plum";
      plumEnd.textContent = "DIES";

      visual.append(plumStart, rose, plumEnd);
      outer.append(visual);
      return outer;
    }

    scope.querySelectorAll(".wordmark").forEach(function (element) {
      var normalized = element.textContent.replace(/\s+/g, "").toLowerCase();
      if (normalized !== "laidies") return;
      var wordmark = makeWordmark();
      element.classList.add("laidies-inline-wordmark");
      element.setAttribute("aria-label", "LAiDIES");
      element.replaceChildren.apply(element, Array.prototype.slice.call(wordmark.childNodes));
    });

    function replaceTextNode(node) {
      var value = node.nodeValue;
      if (!brandRegex.test(value)) return;
      brandRegex.lastIndex = 0;

      var fragment = document.createDocumentFragment();
      var cursor = 0;
      var match;
      while ((match = brandRegex.exec(value)) !== null) {
        if (match.index > cursor) {
          fragment.append(document.createTextNode(value.slice(cursor, match.index)));
        }
        fragment.append(makeWordmark());
        cursor = match.index + match[0].length;
      }
      if (cursor < value.length) {
        fragment.append(document.createTextNode(value.slice(cursor)));
      }
      node.parentNode.replaceChild(fragment, node);
    }

    var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent || skipTags.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.closest(".laidies-inline-wordmark, .hero-masthead-layered")) return NodeFilter.FILTER_REJECT;
        if (!brandRegex.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        brandRegex.lastIndex = 0;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    var textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(replaceTextNode);

    scope.querySelectorAll("[aria-label], [alt], [title]").forEach(function (element) {
      ["aria-label", "alt", "title"].forEach(function (attribute) {
        if (!element.hasAttribute(attribute)) return;
        element.setAttribute(attribute, element.getAttribute(attribute).replace(brandRegex, "LAiDIES"));
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      applyLAiDIESInlineWordmark();
    });
  } else {
    applyLAiDIESInlineWordmark();
  }
})();
