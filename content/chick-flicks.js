(() => {
  const tapes = [...document.querySelectorAll('.cf-tape')];
  const rentals = [...document.querySelectorAll('.cf-rental[data-episode]')];
  const known = new Set(rentals.map((rental) => rental.id));

  function showRental(id, moveFocus = false) {
    const selectedId = known.has(id) ? id : 'episode-01';
    rentals.forEach((rental) => {
      rental.hidden = rental.id !== selectedId;
    });
    tapes.forEach((tape) => {
      if (tape.getAttribute('href') === `#${selectedId}`) tape.setAttribute('aria-current', 'true');
      else tape.removeAttribute('aria-current');
    });
    if (moveFocus) document.querySelector(`#${selectedId} h3`)?.focus({ preventScroll: true });
  }

  showRental(location.hash.slice(1));
  addEventListener('hashchange', () => showRental(location.hash.slice(1), true));
})();
