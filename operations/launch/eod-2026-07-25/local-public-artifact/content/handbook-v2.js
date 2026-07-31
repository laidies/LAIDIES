(function () {
  'use strict';

  function buildChapterPages() {
    var main = document.querySelector('.handbook-main');
    if (!main) return;

    var headings = Array.prototype.slice.call(main.querySelectorAll(':scope > h2'));
    headings.forEach(function (heading, index) {
      var stop = headings[index + 1] || null;
      var section = document.createElement('section');
      section.className = 'hb-chapter';
      section.dataset.chapter = String(index + 1).padStart(2, '0');
      section.setAttribute('aria-labelledby', heading.id);
      main.insertBefore(section, heading);

      var content = document.createElement('div');
      content.className = 'hb-chapter-content';
      section.appendChild(heading);
      section.appendChild(content);

      var node = section.nextSibling;
      while (node && node !== stop) {
        var next = node.nextSibling;
        content.appendChild(node);
        node = next;
      }
    });

    document.querySelectorAll('.hb-back-top').forEach(function (link) {
      link.textContent = 'Back to contents';
    });
    document.querySelectorAll('.hb-visit').forEach(function (link) {
      link.textContent = link.textContent.replace(/\s*→\s*$/, '');
    });

    var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.hb-toc a[href^="#"]'));
    if (!('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(function (entries) {
      var visible = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; })[0];
      if (!visible) return;
      tocLinks.forEach(function (link) {
        if (link.getAttribute('href') === '#' + visible.target.id) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });
    headings.forEach(function (heading) { observer.observe(heading); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildChapterPages);
  } else {
    buildChapterPages();
  }
})();
