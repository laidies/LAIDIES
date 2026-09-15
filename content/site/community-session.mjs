// Uses the existing Resident runtime; holds assertions only in memory.
export function createCommunitySession({ runtime, fetcher = fetch, onState = () => {} }) {
  let generation = 0;
  let disposed = false;
  let pending = null;
  let identityId = null;
  let cleanup = Promise.resolve(true);
  const embeds = new Set();

  async function deadline(promise, ms) {
    let timer;
    try {
      return await Promise.race([promise, new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error('community_logout_timeout')), ms);
      })]);
    } finally { clearTimeout(timer); }
  }

  function detach(record) {
    const { embed } = record;
    embed.removeEventListener('loaded', record.loaded);
    embed.removeAttribute('sso-user');
    embed.removeAttribute('sso-hash');
    embed.remove();
  }

  function clearEmbeds() {
    const records = [...embeds];
    embeds.clear();
    const previous = cleanup;
    records.forEach(({ embed }) => { embed.hidden = true; embed.inert = true; });
    cleanup = Promise.all([previous, ...records.map(async record => {
      const { embed } = record;
      try {
        await deadline(record.ready, 15000);
        if (!embed.api?.auth?.logout || !embed.api?.auth?.user) throw new Error('provider_auth_unavailable');
        await deadline(Promise.resolve(embed.api.auth.logout()), 3000);
        if (await deadline(Promise.resolve(embed.api.auth.user()), 3000)) throw new Error('provider_logout_unconfirmed');
        return true;
      } catch {
        if (!disposed) onState('logout-unconfirmed');
        return false;
      } finally { detach(record); }
    })]).then(results => results.every(Boolean));
  }

  function invalidate() {
    generation++;
    if (pending) pending.abort();
    pending = null;
    clearEmbeds();
  }

  function mountEmbed(embed, mount, assertion) {
    if (assertion) {
      embed.setAttribute('sso-user', assertion.user);
      embed.setAttribute('sso-hash', assertion.hash);
    } else { embed.hidden = true; embed.inert = true; }
    let loaded;
    const ready = new Promise(resolve => { loaded = resolve; });
    const record = { embed, ready, loaded };
    embed.addEventListener('loaded', loaded, { once: true });
    embeds.add(record);
    mount.appendChild(embed);
    return record;
  }

  async function clearProviderBeforeSignedEmbed(createProbe, mount, current) {
    if (typeof createProbe !== 'function') return false;
    const probe = createProbe();
    if (!probe) return false;
    const record = mountEmbed(probe, mount, null);
    try {
      await deadline(record.ready, 15000);
      if (!current()) return false;
      if (!probe.api?.auth?.user || !probe.api?.auth?.logout) throw new Error('provider_auth_unavailable');
      if (await deadline(Promise.resolve(probe.api.auth.user()), 3000)) {
        await deadline(Promise.resolve(probe.api.auth.logout()), 3000);
      }
      if (await deadline(Promise.resolve(probe.api.auth.user()), 3000)) throw new Error('provider_logout_unconfirmed');
      if (!current()) return false;
      embeds.delete(record);
      detach(record);
      return true;
    } catch {
      clearEmbeds();
      await cleanup;
      return false;
    }
  }

  async function authorize() {
    if (disposed) return { state: 'disposed' };
    invalidate();
    const version = generation;
    const current = () => !disposed && version === generation;
    const emit = result => {
      if (!current()) return { state: 'superseded' };
      onState(result.state);
      return result;
    };
    const attach = async (embed, mount, assertion, createProbe) => {
      if (!current()) return false;
      if (assertion && !(await clearProviderBeforeSignedEmbed(createProbe, mount, current))) return false;
      if (!current()) return false;
      const record = mountEmbed(embed, mount, assertion);
      if (!assertion) record.ready.then(async () => {
        if (!current()) return;
        try {
          if (!embed.api?.auth?.user || !embed.api?.auth?.logout) throw new Error('provider_auth_unavailable');
          if (await embed.api.auth.user()) await deadline(Promise.resolve(embed.api.auth.logout()), 3000);
          if (await embed.api.auth.user()) throw new Error('provider_logout_unconfirmed');
          if (!current()) return;
          embed.hidden = false; embed.inert = false;
          onState('reader-ready');
        } catch {
          cleanup = Promise.resolve(false);
          if (current()) onState('logout-unconfirmed');
        }
      });
      return true;
    };
    try {
      if (!(await cleanup)) return emit({ state: 'logout-unconfirmed' });
      if (!current()) return { state: 'superseded' };
      const { data, error } = await runtime.client.auth.getSession();
      if (!current()) return { state: 'superseded' };
      if (error) return emit({ state: 'unavailable' });
      const token = data?.session?.access_token;
      if (!token) return emit({ state: 'signed-out', attachReader: (embed, mount) => attach(embed, mount, null) });
      identityId = data.session.user?.id;
      if (!identityId) return emit({ state: 'unavailable' });
      const controller = new AbortController();
      pending = controller;
      const timer = setTimeout(() => controller.abort(), 10000);
      let response;
      try {
        response = await fetcher('/api/hyvor-sso', {
          method: 'POST', cache: 'no-store', credentials: 'same-origin', redirect: 'error',
          headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
          signal: controller.signal
        });
      } finally {
        clearTimeout(timer);
        if (pending === controller) pending = null;
      }
      if (!current()) return { state: 'superseded' };
      if (response.status === 401) return emit({ state: 'signed-out' });
      if (response.status === 409) return emit({ state: 'display-name-required' });
      if (!response.ok) return emit({ state: 'unavailable' });
      const assertion = await response.json();
      if (!current()) return { state: 'superseded' };
      if (typeof assertion.user !== 'string' || assertion.user.length > 4096 ||
          !/^[a-f0-9]{64}$/.test(assertion.hash || '')) return emit({ state: 'unavailable' });
      return emit({
        state: 'authorized',
        attach(embed, mount, createProbe) { return attach(embed, mount, assertion, createProbe); }
      });
    } catch {
      return emit({ state: 'unavailable' });
    }
  }

  const { data: { subscription } } = runtime.client.auth.onAuthStateChange((event, session) => {
    const nextId = session?.user?.id || null;
    if (session && nextId && nextId === identityId) return;
    identityId = nextId;
    invalidate();
    if (disposed) return;
    onState(session ? 'session-changed' : 'signed-out', 'auth');
  });

  return {
    authorize,
    async dispose() {
      disposed = true;
      invalidate();
      subscription.unsubscribe();
      return cleanup;
    }
  };
}
