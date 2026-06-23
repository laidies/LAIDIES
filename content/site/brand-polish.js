(function () {
  function applyLAiDIESInlineWordmark(root) {
    var scope = root || document.body;
    if (!scope) return;

    var brandRegex = /\b(?:LAiDIES|LAIDIES|lAIdies|Laidies)\b/g;
    var skipTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "CODE", "PRE", "SVG"]);

    function makeWordmark() {
      // Canonical wordmark: <span class="brand-word-inline"><span aria-hidden>L<span data-brand-ai>Ai</span>DIES</span></span>
      var outer = document.createElement("span");
      outer.className = "brand-word-inline";
      outer.setAttribute("aria-label", "LAiDIES");

      var visual = document.createElement("span");
      visual.setAttribute("aria-hidden", "true");

      var rose = document.createElement("span");
      rose.setAttribute("data-brand-ai", "");
      rose.textContent = "Ai";

      visual.append(document.createTextNode("L"), rose, document.createTextNode("DIES"));
      outer.append(visual);
      return outer;
    }

    scope.querySelectorAll(".wordmark").forEach(function (element) {
      var normalized = element.textContent.replace(/\s+/g, "").toLowerCase();
      if (normalized !== "laidies") return;
      var wordmark = makeWordmark();
      element.classList.add("brand-word-inline");
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
        if (parent.closest(".brand-word-inline, .laidies-inline-wordmark, .hero-masthead-layered")) return NodeFilter.FILTER_REJECT;
        // Leave buttons/CTAs as plain text — no wordmark wrap (avoids flex space-collapse and dark-button invisibility).
        if (parent.closest('button, .button, [class*="button"], [class*="btn"], .cta-row, [class*="cta"]')) return NodeFilter.FILTER_REJECT;
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
      installLAiDIESLiveNavigation();
    });
  } else {
    applyLAiDIESInlineWordmark();
    installLAiDIESLiveNavigation();
  }

  function installLAiDIESLiveNavigation() {
    if (window.__laidiesLiveNavigationInstalled) return;
    window.__laidiesLiveNavigationInstalled = true;

    var path = window.location.pathname || "";
    var filename = path.split("/").pop() || "index.html";
    var isHome = filename === "" || filename === "index.html";
    var isNested = /\/(?:issues|games|learn|community)\//.test(path);
    var root = isNested ? "../" : "";
    var params = new URLSearchParams(window.location.search || "");

    function local(pathname) {
      return root + pathname;
    }

    function getCurrentIssue() {
      var requested = String(params.get("issue") || document.body?.dataset.issueNumber || "").match(/\d+/)?.[0];
      if (requested) return String(Number(requested));
      var issueFromPath = filename.match(/issue-(\d+)/)?.[1];
      if (issueFromPath) return String(Number(issueFromPath));
      var episodes = window.siteData?.episodes || window.LAIDIES_SITE_DATA?.episodes || [];
      var latest = episodes
        .filter(function (episode) { return episode.status === "published" && episode.number; })
        .sort(function (a, b) { return Number(b.number) - Number(a.number); })[0];
      return latest?.number ? String(Number(latest.number)) : "3";
    }

    function draftQueryPart() {
      return params.get("draft") === "1" ? "&draft=1" : "";
    }

    function contextQuery(group, issueOverride) {
      var issue = issueOverride || getCurrentIssue();
      var query = "?issue=" + encodeURIComponent(issue) + "&bag=open";
      if (group) query += "&group=" + encodeURIComponent(group);
      query += draftQueryPart();
      return query;
    }

    function weeklyToolQuery(group, issueOverride, extraHash) {
      var issue = issueOverride || getCurrentIssue();
      var query = "?from=this-week&issue=" + encodeURIComponent(issue) + "&bag=open";
      if (group) query += "&group=" + encodeURIComponent(group);
      query += draftQueryPart();
      return query + (extraHash || "");
    }

    function inferGroupFromPage() {
      if (/^(quiz|try-on|printable|trading-cards)\.html$/.test(filename)) return "practice";
      if (/^(fun-pack|dream-phone|madame-claio|fairy-godmother|girl-talk|dj-booth)\.html$/.test(filename)) return "fun";
      if (/^(hot-goss|reference-closet|learn|receipts)\.html$/.test(filename) || path.endsWith("/learn/glossary.html")) return "realworld";
      if (path.includes("/community/") || filename === "community.html" || filename === "clubhouse-pass.html" || filename === "businesswomens-special.html") return "connect";
      return "";
    }

    function getReturnConfig() {
      if (isHome) return null;
      var source = params.get("from") || "";
      var fromBag = source === "this-week" || source === "bag";
      var group = /^(practice|fun|connect|realworld)$/.test(params.get("group") || "") ? params.get("group") : "";
      var isIssuePage = /^issue-\d+\.html$/.test(filename);
      var groupLabels = {
        practice: "Back to Weekly Study Pack",
        fun: "Back to THE EXTRA CREDIT",
        connect: "Back to Meet & Celebrate",
        realworld: "Back to THE LAiDIES GRIMOIRE",
      };
      if (fromBag || group) {
        var normalizedGroup = group || inferGroupFromPage();
        if (isIssuePage) {
          return {
            href: local("this-week.html") + contextQuery("", getCurrentIssue()),
            label: "← Back to the Bag",
          };
        }
        if (filename === "fun-pack.html") {
          return {
            href: local("this-week.html") + contextQuery("fun"),
            label: "← Back to the Bag",
          };
        }
        return {
          href: local("this-week.html") + contextQuery(normalizedGroup),
          label: "← " + (groupLabels[normalizedGroup] || "Back to the Bag"),
        };
      }
      if (isIssuePage) {
        if (source === "start-here") {
          return {
            href: local("start-here.html"),
            label: "← Back to Start Here",
          };
        }
        if (source === "home") {
          return {
            href: local("index.html"),
            label: "← Back to LAiDIES",
          };
        }
        return {
          href: local("episodes.html"),
          label: "← Back to the Season",
        };
      }
      if (/^(quiz|try-on|printable|trading-cards)\.html$/.test(filename)) {
        return {
          href: local("this-week.html") + contextQuery("practice"),
          label: "← Back to Weekly Study Pack",
        };
      }
      if (/^(hot-goss|reference-closet|learn)\.html$/.test(filename) || path.endsWith("/learn/glossary.html") || filename === "receipts.html") {
        return {
          href: local("this-week.html") + contextQuery("realworld"),
          label: "← Back to THE LAiDIES GRIMOIRE",
        };
      }
      if (path.includes("/community/") || filename === "community.html" || filename === "clubhouse-pass.html" || filename === "businesswomens-special.html") {
        return {
          href: local("this-week.html") + contextQuery("connect"),
          label: "← Back to Meet & Celebrate",
        };
      }
      if (/^(dream-phone|madame-claio|fairy-godmother|girl-talk|dj-booth|fun-pack)\.html$/.test(filename)) {
        return {
          href: local("clubhouse.html"),
          label: "← Back to the Clubhouse",
        };
      }
      if (filename === "episodes.html") {
        return {
          href: local("start-here.html"),
          label: "← Back to Start Here",
        };
      }
      if (filename === "start-here.html") {
        return {
          href: local("index.html"),
          label: "← Back to LAiDIES",
        };
      }
      if (filename === "clubhouse.html") {
        return {
          href: local("this-week.html") + contextQuery("fun"),
          label: "← Back to THE EXTRA CREDIT",
        };
      }
      return {
        href: local("index.html"),
        label: "← Back to LAiDIES",
      };
    }

    function ensureLiveNavStyles() {
      if (document.getElementById("laidies-live-nav-styles")) return;
      var style = document.createElement("style");
      style.id = "laidies-live-nav-styles";
      style.textContent = [
        ".site-header.laidies-nav-enhanced,.back-bar.laidies-nav-enhanced,.preview-ribbon.laidies-nav-enhanced,.issue-site-nav.laidies-nav-enhanced,.sticky-back.laidies-nav-enhanced,.back-nav.laidies-nav-enhanced,.site-nav.laidies-nav-enhanced{position:sticky!important;top:0!important;z-index:1200!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:center!important;gap:clamp(8px,2vw,18px)!important;min-height:96px!important;padding:10px clamp(14px,4vw,36px)!important;background:rgba(255,253,251,.97)!important;border-bottom:1px solid rgba(75,33,72,.16)!important;box-shadow:0 12px 28px rgba(75,33,72,.08)!important;color:#3f1737!important;backdrop-filter:blur(16px)!important;}",
        ".site-header.laidies-nav-enhanced .brand,.back-bar.laidies-nav-enhanced .brand,.issue-site-nav.laidies-nav-enhanced .issue-brand-link,.sticky-back.laidies-nav-enhanced .brand,.back-nav.laidies-nav-enhanced .brand,.site-nav.laidies-nav-enhanced .nav-brand{justify-self:start!important;min-width:0!important;overflow:visible!important;}",
        // Lock the logo height so the header bar is a uniform 96px on every page
        // (per-page logo sizing was making some bars taller, e.g. community at 108px).
        ".site-header.laidies-nav-enhanced .brand img,.back-bar.laidies-nav-enhanced .brand img,.issue-site-nav.laidies-nav-enhanced .issue-brand-link img,.sticky-back.laidies-nav-enhanced .brand img,.back-nav.laidies-nav-enhanced .brand img,.site-nav.laidies-nav-enhanced .nav-brand img{height:64px!important;width:auto!important;max-height:64px!important;}",
        "@media(max-width:760px){.site-header.laidies-nav-enhanced .brand img,.back-bar.laidies-nav-enhanced .brand img,.issue-site-nav.laidies-nav-enhanced .issue-brand-link img,.sticky-back.laidies-nav-enhanced .brand img,.back-nav.laidies-nav-enhanced .brand img{height:46px!important;max-height:46px!important;}}",
        ".laidies-context-return{display:inline-flex!important;align-items:center!important;min-height:36px!important;width:max-content!important;max-width:calc(100% - 28px)!important;margin:10px 0 0 clamp(14px,4vw,36px)!important;padding:8px 13px!important;border:1px solid rgba(111,38,63,.2)!important;border-radius:999px!important;background:rgba(255,250,247,.84)!important;color:#6f263f!important;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important;font-size:clamp(.72rem,1.9vw,.86rem)!important;font-weight:850!important;line-height:1.15!important;letter-spacing:.01em!important;text-decoration:none!important;box-shadow:0 10px 24px rgba(75,33,72,.08)!important;}",
        ".laidies-context-return:hover,.laidies-context-return:focus-visible{color:#3f1737!important;border-color:rgba(111,38,63,.42)!important;background:#fffdfb!important;outline:none!important;}",
        ".site-header.laidies-nav-enhanced .hamburger-btn,.back-bar.laidies-nav-enhanced .hamburger-btn,.preview-ribbon.laidies-nav-enhanced .hamburger-btn,.issue-site-nav.laidies-nav-enhanced .hamburger-btn,.sticky-back.laidies-nav-enhanced .hamburger-btn,.back-nav.laidies-nav-enhanced .hamburger-btn,.site-nav.laidies-nav-enhanced .hamburger-btn{justify-self:end!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;min-width:46px!important;min-height:42px!important;padding:9px 13px!important;border:1px solid rgba(75,33,72,.18)!important;border-radius:999px!important;background:#fffdfb!important;color:#3f1737!important;font:850 .86rem/1 Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important;box-shadow:0 10px 24px rgba(75,33,72,.08)!important;cursor:pointer!important;}",
        ".laidies-menu-panel{position:fixed!important;top:82px!important;right:clamp(10px,3vw,34px)!important;left:auto!important;width:min(900px,calc(100vw - 24px))!important;max-height:calc(100vh - 96px)!important;overflow:auto!important;padding:clamp(18px,3vw,30px)!important;border:1px solid rgba(75,33,72,.18)!important;border-radius:22px!important;background:linear-gradient(145deg,rgba(255,253,251,.99),rgba(252,228,242,.96))!important;box-shadow:0 30px 80px rgba(63,23,55,.22)!important;color:#3f1737!important;z-index:1400!important;}",
        ".laidies-menu-panel[hidden]{display:none!important;}",
        ".laidies-menu-top{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:18px!important;margin-bottom:18px!important;padding-bottom:14px!important;border-bottom:1px solid rgba(75,33,72,.14)!important;}",
        ".laidies-menu-kicker{display:block!important;margin-bottom:4px!important;color:#9b3f5f!important;font:900 .76rem/1.1 'JetBrains Mono',monospace!important;letter-spacing:.14em!important;text-transform:none!important;}",
        ".laidies-menu-top p{margin:0!important;max-width:46rem!important;color:#604556!important;font:600 .95rem/1.45 Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important;}",
        ".laidies-menu-close{border:1px solid rgba(75,33,72,.18)!important;border-radius:999px!important;background:#fffdfb!important;color:#3f1737!important;padding:9px 13px!important;font:850 .8rem/1 Inter,sans-serif!important;cursor:pointer!important;}",
        ".laidies-menu-grid{display:grid!important;grid-template-columns:1fr!important;gap:6px!important;}",
        ".laidies-menu-group a{font-size:1rem!important;}",
        ".laidies-menu-group{min-width:0!important;padding:0!important;margin:0!important;}",
        ".laidies-menu-group h2{margin:0 0 9px!important;color:#7a2742!important;font:900 .72rem/1.2 'JetBrains Mono',monospace!important;letter-spacing:.12em!important;text-transform:none!important;}",
        ".laidies-menu-group a,.laidies-menu-preview{display:block!important;padding:9px 0!important;border-top:1px solid rgba(75,33,72,.1)!important;color:#3f1737!important;font:800 .88rem/1.25 Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important;text-decoration:none!important;white-space:normal!important;}",
        ".laidies-menu-group a:hover,.laidies-menu-group a:focus-visible{color:#9b3f5f!important;text-decoration:underline!important;text-underline-offset:4px!important;outline:none!important;}",
        ".laidies-menu-preview{color:rgba(63,23,55,.62)!important;cursor:default!important;}",
        ".laidies-menu-status{display:block!important;width:max-content!important;max-width:100%!important;margin-top:5px!important;padding:4px 8px!important;border:1px solid rgba(155,63,95,.24)!important;border-radius:999px!important;background:rgba(252,228,242,.72)!important;color:#8a2d50!important;font:900 .62rem/1 'JetBrains Mono',monospace!important;letter-spacing:.08em!important;text-transform:uppercase!important;}",
        ".laidies-legacy-nav{display:none!important;}",
        ".game-page-header,.sticky-back:not(.laidies-nav-enhanced),.back-nav:not(.laidies-nav-enhanced),.back-btn,.laidies-nav-enhanced ~ main .quiz-return-link,.laidies-nav-enhanced ~ main [data-wednesday-return],.laidies-nav-enhanced ~ [data-wednesday-return]{display:none!important;}",
        "body.laidies-menu-open{overflow:hidden!important;}",
        "@media(max-width:760px){.site-header.laidies-nav-enhanced,.back-bar.laidies-nav-enhanced,.preview-ribbon.laidies-nav-enhanced,.issue-site-nav.laidies-nav-enhanced,.sticky-back.laidies-nav-enhanced,.back-nav.laidies-nav-enhanced,.site-nav.laidies-nav-enhanced{grid-template-columns:minmax(0,1fr) auto!important;min-height:80px!important;padding:9px 14px!important;}.site-header.laidies-nav-enhanced .brand,.back-bar.laidies-nav-enhanced .brand,.issue-site-nav.laidies-nav-enhanced .issue-brand-link,.sticky-back.laidies-nav-enhanced .brand,.back-nav.laidies-nav-enhanced .brand,.site-nav.laidies-nav-enhanced .nav-brand{justify-self:start!important;}.laidies-context-return{grid-column:1 / -1!important;grid-row:2!important;max-width:none!important;width:max-content!important;min-height:34px!important;padding:7px 11px!important;font-size:.72rem!important;}.laidies-menu-panel{top:88px!important;right:10px!important;left:10px!important;width:auto!important;max-height:calc(100vh - 102px)!important;border-radius:18px!important;}.laidies-menu-grid{grid-template-columns:1fr!important;gap:18px!important;}.laidies-menu-top{align-items:flex-start!important;}.laidies-menu-top p{font-size:.88rem!important;}.laidies-menu-group a{min-height:42px!important;font-size:.95rem!important;}}"
      ].join("\n");
      document.head.appendChild(style);
    }

    function menuGroups() {
      var currentIssue = getCurrentIssue();
      var currentIssueSlug = String(currentIssue).padStart(2, "0");
      // Six doors — the canonical global menu (LAiDIES Global Header, Structure Part 1).
      // Flat list, same labels/order on every page. Anything dropped from the old
      // mega-menu stays reachable one tap deeper via its hub.
      return [
        {
          title: "",
          links: [
            ["This Week's Bag", local("this-week.html") + "?issue=" + encodeURIComponent(currentIssue) + "&bag=open"],
            ["Read the Season", local("episodes.html")],
            ["The Grimoire", local("learn.html")],
            ["The Clubhouse", local("clubhouse.html")],
            ["Join the Club", local("community.html")],
            ["Start Here", local("start-here.html")],
          ],
        },
      ];
    }

    function createMenuPanel() {
      var panel = document.createElement("aside");
      panel.className = "laidies-menu-panel";
      panel.id = "laidiesUnifiedMenu";
      panel.setAttribute("aria-label", "LAiDIES site menu");
      panel.hidden = true;

      var top = document.createElement("div");
      top.className = "laidies-menu-top";
      var intro = document.createElement("p");
      intro.innerHTML = '<span class="laidies-menu-kicker">LAiDIES Site Menu</span>Jump to this week, the Season, the Grimoire, the Clubhouse, or Meet & Celebrate. Items still being polished are labeled before you tap.';
      var close = document.createElement("button");
      close.className = "laidies-menu-close";
      close.type = "button";
      close.textContent = "Close";
      top.append(intro, close);

      var grid = document.createElement("div");
      grid.className = "laidies-menu-grid";
      menuGroups().forEach(function (group) {
        var section = document.createElement("section");
        section.className = "laidies-menu-group";
        if (group.title) {
          var heading = document.createElement("h2");
          heading.textContent = group.title;
          section.append(heading);
        }
        group.links.forEach(function (item) {
          var label = Array.isArray(item) ? item[0] : item.label;
          var href = Array.isArray(item) ? item[1] : item.href;
          var status = Array.isArray(item) ? item[2] : item.status;
          var node = document.createElement(href ? "a" : "span");
          if (href) {
            node.href = href;
          } else {
            node.className = "laidies-menu-preview";
            node.setAttribute("aria-disabled", "true");
          }
          node.appendChild(document.createTextNode(label));
          if (status) {
            var statusNode = document.createElement("span");
            statusNode.className = "laidies-menu-status";
            statusNode.textContent = status;
            node.appendChild(statusNode);
          }
          section.append(node);
        });
        grid.append(section);
      });
      panel.append(top, grid);
      return panel;
    }

    function enhanceHeader(header) {
      if (!header || header.dataset.laidiesNavReady === "true") return;
      header.dataset.laidiesNavReady = "true";
      header.classList.add("laidies-nav-enhanced");
      ensureLiveNavStyles();

      header.querySelectorAll(".site-menu-panel:not(#laidiesUnifiedMenu)").forEach(function (legacyPanel) {
        legacyPanel.remove();
      });

      var existingLegacyNav = header.querySelector(".nav, .nav-links, nav:not(.laidies-menu-panel)");
      if (existingLegacyNav && !existingLegacyNav.closest(".laidies-menu-panel")) existingLegacyNav.classList.add("laidies-legacy-nav");

      var returnConfig = getReturnConfig();
      if (returnConfig && !document.querySelector("[data-laidies-context-return]")) {
        var oldHeaderBack = header.querySelector(":scope > a:not(.brand):not(.nav-brand):not(.issue-brand-link)");
        if (oldHeaderBack) oldHeaderBack.remove();
        // Also drop the classless hardcoded "← Back" button (history.back) that the
        // CSS legacy-hide rule misses. Only runs here, where the context pill is
        // being added, so a back control always remains.
        var oldBackButton = header.querySelector('button[onclick*="history.back"]');
        if (oldBackButton) oldBackButton.remove();
        var returnLink = document.createElement("a");
        returnLink.className = "laidies-context-return";
        returnLink.dataset.laidiesContextReturn = "true";
        returnLink.href = returnConfig.href;
        returnLink.textContent = returnConfig.label;
        // Sibling strip directly under the bar — keeps the header bar a locked height
        // on every page (home included), with the back pill in a consistent spot below.
        header.insertAdjacentElement("afterend", returnLink);
      }

      var button = header.querySelector(".hamburger-btn");
      if (!button) {
        button = document.createElement("button");
        button.className = "hamburger-btn";
        button.type = "button";
        header.append(button);
      } else {
        var freshButton = button.cloneNode(false);
        freshButton.className = button.className;
        header.replaceChild(freshButton, button);
        button = freshButton;
      }
      button.removeAttribute("onclick");
      button.type = "button";
      button.setAttribute("aria-controls", "laidiesUnifiedMenu");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open site menu");
      button.innerHTML = '☰ <span class="site-menu-label">Menu</span>';

      var panel = header.querySelector("#laidiesUnifiedMenu") || createMenuPanel();
      if (!panel.parentElement) header.append(panel);
      var closeButton = panel.querySelector(".laidies-menu-close");

      function setMenu(open) {
        panel.hidden = !open;
        button.setAttribute("aria-expanded", String(open));
        button.setAttribute("aria-label", open ? "Close site menu" : "Open site menu");
        button.innerHTML = open ? '✕ <span class="site-menu-label">Close</span>' : '☰ <span class="site-menu-label">Menu</span>';
        document.body?.classList.toggle("laidies-menu-open", open);
        if (open) closeButton?.focus({ preventScroll: true });
      }

      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        setMenu(panel.hidden);
      });
      closeButton?.addEventListener("click", function () {
        setMenu(false);
        button.focus({ preventScroll: true });
      });
      panel.addEventListener("click", function (event) {
        event.stopPropagation();
        if (event.target?.tagName === "A") setMenu(false);
      });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !panel.hidden) setMenu(false);
      });
      document.addEventListener("click", function (event) {
        if (panel.hidden) return;
        if (!header.contains(event.target)) setMenu(false);
      });
    }

    var header = document.querySelector(".site-header") || document.querySelector(".back-bar") || document.querySelector(".issue-site-nav") || document.querySelector(".preview-ribbon") || document.querySelector(".sticky-back") || document.querySelector(".back-nav") || document.querySelector(".site-nav");
    enhanceHeader(header);
  }
})();
