(() => {
  const dialog = document.querySelector('#cf-episode-dialog');
  const closeButton = dialog?.querySelector('.cf-dialog__close');
  const rentals = [...document.querySelectorAll('.cf-rental[data-episode], .cf-rental[data-program]')];
  const triggers = [...document.querySelectorAll('a[href="#trailer"], a[href^="#episode-"]')];
  const known = new Set(rentals.map((rental) => rental.id));
  let lastTrigger = null;

  if (!dialog || !closeButton || rentals.length === 0) return;

  function selectedEpisode() {
    const id = location.hash.slice(1);
    return known.has(id) ? id : null;
  }

  function showEpisode(id, trigger = null) {
    if (!known.has(id)) return;

    const selected = rentals.find((rental) => rental.id === id);
    rentals.forEach((rental) => {
      rental.hidden = rental !== selected;
    });
    triggers.forEach((item) => {
      if (item.getAttribute('href') === `#${id}`) item.setAttribute('aria-current', 'true');
      else item.removeAttribute('aria-current');
    });

    lastTrigger = trigger || lastTrigger;
    dialog.setAttribute('aria-labelledby', `${id}-title`);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('cf-dialog-open');
    requestAnimationFrame(() => closeButton.focus({ preventScroll: true }));
  }

  function clearEpisodeHash() {
    if (selectedEpisode()) {
      history.replaceState(null, '', `${location.pathname}${location.search}`);
    }
  }

  function closeEpisode() {
    if (dialog.open) dialog.close();
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      const id = trigger.hash.slice(1);
      if (!known.has(id)) return;
      event.preventDefault();
      history.pushState(null, '', `#${id}`);
      showEpisode(id, trigger);
    });
  });

  closeButton.addEventListener('click', closeEpisode);
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeEpisode();
    }
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeEpisode();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('cf-dialog-open');
    clearEpisodeHash();
    triggers.forEach((trigger) => trigger.removeAttribute('aria-current'));
    lastTrigger?.focus({ preventScroll: true });
    lastTrigger = null;
  });

  addEventListener('popstate', () => {
    const id = selectedEpisode();
    if (id) showEpisode(id);
    else closeEpisode();
  });

  const directEpisode = selectedEpisode();
  if (directEpisode) requestAnimationFrame(() => showEpisode(directEpisode));
})();
