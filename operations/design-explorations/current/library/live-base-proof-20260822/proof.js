(() => {
  'use strict';
  if (!document.documentElement.classList.contains('library-proof')) return;

  const lede = document.querySelector('.library-intro .lede');
  if (lede && !document.querySelector('.library-entry-rail')) {
    const rail = document.createElement('nav');
    rail.className = 'library-entry-rail';
    rail.setAttribute('aria-label', 'Choose how to use the Library');
    rail.innerHTML = '<a href="#miss-jeeves">Ask Miss Jeeves</a><a href="#shelf-guide-title">Browse the shelves</a>';
    lede.after(rail);
  }
})();
