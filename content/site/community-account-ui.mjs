import { createCommunitySession } from './community-session.mjs';

let runtimePromise;
async function deadline(promise, ms = 15000) {
  let timer;
  try {
    return await Promise.race([promise, new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error('community_provider_timeout')), ms);
    })]);
  } finally { clearTimeout(timer); }
}
function dependency(src, installed) {
  if (installed()) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('dependency_timeout')), 15000);
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => { clearTimeout(timer); installed() ? resolve() : reject(new Error('dependency_unavailable')); };
    script.onerror = error => { clearTimeout(timer); reject(error); };
    document.head.appendChild(script);
  });
}
function runtime() {
  if (!runtimePromise) runtimePromise = (async () => {
    await dependency('/content/site/supabase-config.js', () => window.LAIDIES_SUPABASE_CONFIG);
    await dependency('/content/site/identity-client-v1.js?v=20260915-profile-verification-1', () => window.LAIDIESIdentityV1);
    await dependency('/content/site/resident-account-runtime-v1.js', () => window.LAIDIESResidentAccountRuntime);
    return window.LAIDIESResidentAccountRuntime.get();
  })();
  return runtimePromise;
}

function element(tag, text) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  return node;
}

export async function mountCommunity({ mount, pageId, loadProvider, isCurrent }) {
  if (!document.querySelector('link[data-community-account]')) {
    const style = document.createElement('link'); style.rel = 'stylesheet';
    style.href = '/content/site/community-account.css'; style.dataset.communityAccount = 'true';
    document.head.appendChild(style);
  }
  const account = await runtime();
  if (!isCurrent()) return;
  const root = element('div');
  root.className = 'community-provider-state community-account';
  const status = element('p');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  const controls = element('div');
  controls.className = 'community-provider-state__links';
  const thread = element('div');
  root.append(status, controls, thread);
  mount.replaceChildren(root);
  let rendering = 0, stopped = false;
  const bridge = createCommunitySession({ runtime: account, onState(state, source) {
    if (source === 'auth' && !stopped) setTimeout(render, 0);
    if (state === 'logout-unconfirmed') status.textContent = 'Community sign-out could not be confirmed. Please reload before continuing.';
  } });

  function signIn() {
    const destination = window.location.pathname + window.location.search + window.location.hash;
    const link = element('a', 'Sign in with LAiDIES →');
    link.href = '/resident-card?community_return=' + encodeURIComponent(destination) + '#rcAccountTitle';
    link.className = 'button';
    controls.append(link);
  }

  function nameForm() {
    const form = element('form');
    const label = element('label', 'The name people will see beside your comments');
    const name = element('input');
    name.type = 'text'; name.required = true; name.maxLength = 30;
    name.autocomplete = 'nickname'; name.name = 'community_display_name';
    label.append(name);
    const button = element('button', 'Save my display name');
    button.type = 'submit';
    form.append(label, button);
    form.addEventListener('submit', async event => {
      event.preventDefault(); button.disabled = true;
      try {
        const state = await account.getState();
        if (state.error || !state.session) throw new Error('signin_required');
        const profile = state.remote?.profile || {};
        // Use the existing profile mutation, retaining its username/visibility.
        await account.controller.updateProfile({
          displayName: name.value.trim(), cardUsername: profile.card_username || null,
          memberCardIsPublic: profile.member_card_is_public === true
        }, crypto.randomUUID());
        await render();
      } catch { status.textContent = 'Your display name could not be saved. Please try again.'; }
      finally { button.disabled = false; }
    });
    controls.append(form);
  }

  async function render() {
    const attempt = ++rendering;
    status.textContent = 'Checking your LAiDIES sign-in…';
    controls.replaceChildren();
    const authorization = await bridge.authorize();
    if (stopped || !isCurrent() || attempt !== rendering) return;
    if (authorization.state === 'superseded') return;
    if (authorization.state === 'signed-out') {
      status.textContent = 'Use your LAiDIES Resident account to join the conversation. Your Resident Card is optional.';
      signIn();
      try {
        await loadProvider();
        await deadline(customElements.whenDefined('hyvor-talk-comments'));
        if (stopped || !isCurrent() || attempt !== rendering || !authorization.attachReader) return;
        const reader = document.createElement('hyvor-talk-comments');
        reader.setAttribute('website-id', '15519'); reader.setAttribute('page-id', pageId);
        reader.addEventListener('auth:login:clicked', event => { event.preventDefault(); controls.querySelector('a')?.click(); });
        authorization.attachReader(reader, thread);
      } catch { status.textContent = 'The conversation could not load. You can still explore the rooms.'; }
      return;
    }
    if (authorization.state === 'display-name-required') {
      status.textContent = 'You’re signed in. Choose a public display name for the conversation.';
      nameForm(); return;
    }
    if (authorization.state !== 'authorized') {
      status.textContent = 'Community sign-in is unavailable right now. Your account and Card have not changed.';
      const retry = element('button', 'Try again'); retry.type = 'button'; retry.onclick = render;
      controls.append(retry); return;
    }
    status.textContent = 'Opening the conversation with your LAiDIES account…';
    try {
      await loadProvider();
      await deadline(customElements.whenDefined('hyvor-talk-comments'));
      if (stopped || !isCurrent() || attempt !== rendering) return;
      const comments = document.createElement('hyvor-talk-comments');
      comments.setAttribute('website-id', '15519');
      comments.setAttribute('page-id', pageId);
      comments.addEventListener('auth:login:clicked', event => { event.preventDefault(); controls.replaceChildren(); signIn(); });
      comments.addEventListener('loaded', async () => {
        if (stopped || !isCurrent() || attempt !== rendering) return;
        try {
          const providerUser = !comments.api?.auth?.user ? null : await deadline(Promise.resolve(comments.api.auth.user()), 3000);
          if (!providerUser || providerUser.type !== 'sso') throw new Error('community_signin_not_accepted');
          if (stopped || !isCurrent() || attempt !== rendering) return;
          status.textContent = 'You’re signed in with LAiDIES. Comments here are public.';
        } catch {
          if (stopped || !isCurrent() || attempt !== rendering) return;
          comments.hidden = true; comments.inert = true;
          status.textContent = 'The conversation could not confirm your LAiDIES sign-in. Please reload to try again.';
        }
      }, { once: true });
      if (!await authorization.attach(comments, thread, () => {
        const probe = document.createElement('hyvor-talk-comments');
        probe.setAttribute('website-id', '15519');
        probe.setAttribute('page-id', pageId);
        return probe;
      })) {
        status.textContent = 'The conversation could not confirm your LAiDIES sign-in. Please reload to try again.';
        return;
      }
      const signOut = element('button', 'Sign out of LAiDIES'); signOut.type = 'button';
      signOut.onclick = async () => {
        signOut.disabled = true;
        try { await account.controller.signOut(); }
        catch { status.textContent = 'Sign-out did not complete. Please try again.'; signOut.disabled = false; }
      };
      controls.append(signOut);
    } catch { status.textContent = 'The conversation could not load. Please try again shortly.'; }
  }
  const instance = { async dispose() { stopped = true; rendering++; return bridge.dispose(); } };
  mount.communityAccount = instance;
  await render();
  return instance;
}
