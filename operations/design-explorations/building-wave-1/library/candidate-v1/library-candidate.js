(() => {
  const books = {
    vocab: { label: 'Vocab shelf · useful words first', title: 'Words you can use without pretending to know more than you do', copy: 'Clear definitions, examples and ways to check a word before it becomes a rule.', items: [
      { id:'vocab101', name:'Vocab 101', image:'textbook-vocab-101.png', status:'available', fixture:true },
      { id:'prompt', name:'The Prompt Cookbook', image:'book-the-prompt-cookbook.png', status:'hold' },
      { id:'check', name:'How to Check AI Work', image:'book-how-to-check-ai-work.png', status:'preview' }
    ]},
    concepts: { label: 'Concepts shelf · mechanisms and distinctions', title: 'Make the mechanism visible', copy: 'Use this shelf when a definition is not enough and you need to understand how a thing works.', items: [
      { id:'concepts', name:'Concepts 101', image:'textbook-concepts-101.png', status:'hold' },
      { id:'straight', name:'Straight Answers About AI', image:'book-straight-answers-about-ai.png', status:'preview' },
      { id:'briefing', name:'Briefing 101', image:'textbook-briefing-101.png', status:'hold' }
    ]},
    tools: { label: 'Tools shelf · choose with a reason', title: 'Compare tools without turning the room into a sales pitch', copy: 'This shelf holds practical reference checks. Current status is shown before a cover can open.', items: [
      { id:'chatgpt', name:'ChatGPT', image:'book-chatgpt.png', status:'hold' },
      { id:'perplexity', name:'Perplexity', image:'book-perplexity.png', status:'preview' },
      { id:'claude', name:'Claude', image:'book-claude.png', status:'hold' }
    ]}
  };
  const row = document.querySelector('#book-row'), shelfPanel = document.querySelector('#shelf-panel');
  const label = document.querySelector('#bay-label'), deskTitle = document.querySelector('#desk-title'), deskCopy = document.querySelector('#desk-copy');
  const reader = document.querySelector('#reader-shell'), readerTitle = document.querySelector('#reader-book-title');
  const save = document.querySelector('#save-puffy'), saveStatus = document.querySelector('#save-status'), pouch = document.querySelector('#pouch');
  const renderShelf = (key) => {
    const shelf = books[key]; label.textContent = shelf.label; deskTitle.textContent = shelf.title; deskCopy.textContent = shelf.copy;
    row.replaceChildren();
    shelf.items.forEach(item => {
      const button = document.createElement('button'); button.className = `book ${item.status === 'available' ? '' : 'held'}`; button.type = 'button';
      button.setAttribute('aria-label', `${item.name}. ${item.status === 'available' ? 'Available review fixture: open reader.' : `${item.status}: cannot open.`}`);
      button.innerHTML = `<img src="../../../../../assets/library-101/bright-family-v2/${item.image}" alt=""><span class="book-name">${item.name}</span><span class="badge">${item.status === 'available' ? 'Review fixture available' : item.status}</span>`;
      button.addEventListener('click', () => item.status === 'available' ? openReader(item) : showHeld(item)); row.append(button);
    });
  };
  const showHeld = item => { reader.hidden = false; readerTitle.textContent = `${item.name} is ${item.status}`; reader.querySelector('.lede').textContent = 'This cover is visible for discovery, but it cannot open from this candidate.'; reader.querySelector('article p:nth-of-type(3)').textContent = 'The Library should offer an honest alternative or ask Miss Jeeves for another useful route—not substitute teaser copy for a book.'; save.hidden = true; saveStatus.textContent = 'Nothing has been saved.'; reader.scrollIntoView({behavior:'smooth'}); document.querySelector('#close-reader').focus(); };
  let opener = null;
  const openReader = item => { opener = document.activeElement; reader.hidden = false; save.hidden = false; readerTitle.textContent = item.name; reader.querySelector('.lede').textContent = 'A prompt is an instruction plus the context needed to make a useful response. Better prompts make their purpose, limits and audience clear.'; reader.querySelector('article p:nth-of-type(3)').textContent = 'Try saying what you need, what material matters, and how you will judge the answer. This is a short demonstration passage—not a newly admitted production book.'; reader.scrollIntoView({behavior:'smooth'}); document.querySelector('#close-reader').focus(); };
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const selectTab = (tab, moveFocus = false) => {
    tabs.forEach(candidate => {
      const selected = candidate === tab;
      candidate.setAttribute('aria-selected', String(selected));
      candidate.tabIndex = selected ? 0 : -1;
    });
    shelfPanel.setAttribute('aria-labelledby', tab.id);
    renderShelf(tab.dataset.shelf);
    if (moveFocus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let nextIndex = null;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      selectTab(tabs[nextIndex], true);
    });
  });
  selectTab(tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0]);
  const closeReader = () => { reader.hidden = true; (opener?.focus ? opener : document.querySelector('[aria-selected="true"]')).focus(); };
  document.querySelector('#close-reader').addEventListener('click', closeReader);
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !reader.hidden) closeReader(); });
  const updatePouch = () => { const has = localStorage.getItem('library-candidate-puffy') === 'vocab101'; pouch.innerHTML = has ? '<p><strong>Vocab 101 · section 2</strong><br>Saved in this browser on this device.</p><button type="button" id="resume">Resume exact place</button><button type="button" id="remove">Remove from Puffy</button>' : '<p>No saved place yet. Open the review-fixture book to try the local Puffy flow.</p>'; if(has){document.querySelector('#resume').onclick=()=>openReader(books.vocab.items[0]);document.querySelector('#remove').onclick=()=>{localStorage.removeItem('library-candidate-puffy');save.setAttribute('aria-pressed','false');saveStatus.textContent='Removed from this device. Nothing is synced.';updatePouch();};}};
  save.addEventListener('click',()=>{try{localStorage.setItem('library-candidate-puffy','vocab101');save.setAttribute('aria-pressed','true');saveStatus.textContent='Saved: Vocab 101, section 2. Available only in this browser on this device.';updatePouch();}catch{saveStatus.textContent='Puffy could not save here. Nothing was saved; try again after storage is available.';}});
  document.querySelector('#jeeves-form').addEventListener('submit', event=>{event.preventDefault();const q=document.querySelector('#jeeves-question').value.trim();const out=document.querySelector('#jeeves-answer');out.hidden=false;out.innerHTML=q ? '<strong>A starting place:</strong> begin with the Vocab shelf, then open the available review fixture to see the exact-place flow. Held and preview books stay closed.' : '<strong>Please add a question.</strong> Miss Jeeves can orient you, but she should not invent a result.';});
  document.querySelector('#simulate-search-failure').addEventListener('click',()=>{const out=document.querySelector('#jeeves-answer');out.hidden=false;out.innerHTML='<strong>Miss Jeeves is unavailable right now.</strong> Nothing has been searched or saved. Try again, browse a shelf, or return to your local Puffy pouch.';});
  updatePouch();
})();
