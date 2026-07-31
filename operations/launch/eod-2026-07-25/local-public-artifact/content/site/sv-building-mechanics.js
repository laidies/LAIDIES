(function () {
  "use strict";

  function all(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function closeGroup(group, exceptId) {
    all('[data-svb-panel][data-svb-group="' + group + '"]').forEach(function (panel) {
      if (panel.id === exceptId) return;
      panel.classList.remove("is-open");
      panel.hidden = true;
    });
    all('[data-svb-trigger][data-svb-group="' + group + '"]').forEach(function (trigger) {
      if (trigger.getAttribute("aria-controls") === exceptId) return;
      trigger.setAttribute("aria-expanded", "false");
      trigger.classList.remove("is-active");
    });
  }

  function openPanel(trigger, options) {
    var id = trigger.getAttribute("aria-controls") || trigger.dataset.svbTarget;
    var panel = id && document.getElementById(id);
    if (!panel) return;

    var group = trigger.dataset.svbGroup || panel.dataset.svbGroup || "default";
    var isOpen = trigger.getAttribute("aria-expanded") === "true";
    closeGroup(group, isOpen ? "" : id);

    if (isOpen) {
      trigger.setAttribute("aria-expanded", "false");
      trigger.classList.remove("is-active");
      panel.classList.remove("is-open");
      panel.hidden = true;
      if (!options || options.updateHash !== false) history.replaceState(null, "", location.pathname + location.search);
      return;
    }

    trigger.setAttribute("aria-expanded", "true");
    trigger.classList.add("is-active");
    panel.hidden = false;
    panel.classList.add("is-open");
    if (!options || options.updateHash !== false) history.replaceState(null, "", "#" + id);
    if (!options || options.scroll !== false) {
      panel.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    }
    document.dispatchEvent(new CustomEvent("svb:panel-open", { detail: { id: id, group: group } }));
  }

  all("[data-svb-trigger]").forEach(function (trigger) {
    var id = trigger.getAttribute("aria-controls") || trigger.dataset.svbTarget;
    if (!id) return;
    trigger.setAttribute("aria-controls", id);
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", function () {
      openPanel(trigger);
    });
  });

  all("[data-svb-close]").forEach(function (button) {
    button.addEventListener("click", function () {
      var panel = button.closest("[data-svb-panel]");
      if (!panel) return;
      var trigger = document.querySelector('[data-svb-trigger][aria-controls="' + panel.id + '"]');
      if (trigger) openPanel(trigger);
    });
  });

  if (location.hash) {
    var hashId = location.hash.slice(1);
    var hashTrigger = document.querySelector('[data-svb-trigger][aria-controls="' + hashId + '"], [data-svb-trigger][data-svb-target="' + hashId + '"]');
    if (hashTrigger) openPanel(hashTrigger, { updateHash: false, scroll: false });
  }
})();
