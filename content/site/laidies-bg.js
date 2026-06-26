/* ============================================================
   LAiDIES BACKGROUND COMPONENT — particle seeder
   Standalone generalization of the grimoire gr-* generator
   (content/grimoire-book.js: seedStars / seedGlitter). Finds
   .laidies-bg layers, reads the variant from the class, and seeds:
     --dark  → twinkling gold stars
     --light → BOTH layers at once (like the grimoire shell):
               twinkling bright flecks + drifting iridescent glitter
   Fully decoupled from the paginated book reader; the grimoire's
   own copy is left untouched.

   Particle count drops on small screens. With JS off, the CSS
   ::before static field is the baseline; reduced-motion keeps a
   static field with animation off (handled in CSS).
   ============================================================ */
(function () {
  "use strict";

  // bright/metallic/iridescent palette so light particles read as
  // SPARKLE (bright core + glow), never as dark specks.
  var LIGHT_COLORS = ["#ffd700", "#f4b9a0", "#ffe1b8", "#ffc2e3", "#fff3d6", "#e7c9a0"];

  function isSmallScreen() {
    try {
      if (window.matchMedia) return window.matchMedia("(max-width: 600px)").matches;
    } catch (e) {}
    return (window.innerWidth || 9999) <= 600;
  }

  function seedStars(field, count, opts) {
    opts = opts || {};
    if (!field || field.dataset.seeded === "1") return;
    field.dataset.seeded = "1";
    for (var i = 0; i < count; i++) {
      var s = document.createElement("div");
      s.className = "laidies-bg__star";
      if (opts.mixWhite && i % 3 === 0) s.classList.add("is-white");
      if (i % 5 === 0) s.classList.add("is-large");
      s.style.left = (Math.random() * 100) + "%";
      s.style.top = (Math.random() * 100) + "%";
      s.style.setProperty("--dur", (2.4 + Math.random() * 3.6) + "s");
      s.style.setProperty("--delay", (Math.random() * 3) + "s");
      field.appendChild(s);
    }
  }

  function seedGlitter(field, count, colors) {
    if (!field || field.dataset.seeded === "1") return;
    field.dataset.seeded = "1";
    for (var i = 0; i < count; i++) {
      var dot = document.createElement("div");
      dot.className = "laidies-bg__glitter-dot";
      var size = 4 + Math.random() * 6;            // 4–10px — sparkle flecks
      var left = Math.random() * 100;
      var duration = 5 + Math.random() * 8;          // 5–13s upward drift (grimoire timing)
      var delay = Math.random() * 10;                // stagger across the field
      var shine = 1.1 + Math.random() * 1.5;         // 1.1–2.6s glint
      var shineDelay = Math.random() * 2;
      var color = colors[Math.floor(Math.random() * colors.length)];
      dot.style.cssText =
        "left:" + left + "%;" +
        "--size:" + size + "px;" +
        "--duration:" + duration + "s;" +
        "--delay:" + delay + "s;" +
        "--shine:" + shine + "s;" +
        "--shine-delay:" + shineDelay + "s;" +
        "--color:" + color + ";";
      field.appendChild(dot);
    }
  }

  function ensureChild(parent, cls) {
    var el = parent.querySelector(":scope > ." + cls);
    if (!el) {
      el = document.createElement("div");
      el.className = cls;
      el.setAttribute("aria-hidden", "true");
      parent.appendChild(el);
    }
    return el;
  }

  function init() {
    var layers = document.querySelectorAll(".laidies-bg");
    if (!layers.length) return;
    var small = isSmallScreen();
    Array.prototype.forEach.call(layers, function (layer) {
      var isLight = layer.classList.contains("laidies-bg--light");
      // twinkle stars: dark keeps grimoire's 36; light runs denser for visibility
      seedStars(ensureChild(layer, "laidies-bg__field"), isLight ? (small ? 24 : 56) : (small ? 15 : 36), { mixWhite: true });
      // LIGHT additionally runs the floating glitter layer
      if (isLight) {
        seedGlitter(ensureChild(layer, "laidies-bg__glitter"), small ? 20 : 46, LIGHT_COLORS);
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
