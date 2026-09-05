(function () {
  'use strict';
  var runtime, state;
  var el = function (id) { return document.getElementById(id); };
  function message(text) { el('moAccountStatus').textContent = text; }
  async function refresh() {
    runtime = await window.LAIDIESResidentAccountRuntime.get();
    state = await runtime.getState();
    if (state.error) throw state.error;
    var signed = !!state.session;
    el('moAccountForm').hidden = signed;
    el('moAccountReady').hidden = !signed;
    el('moAccountRestore').hidden = !(signed && state.remote && state.remote.card);
    message(signed
      ? 'You’re signed in. ' + (state.remote && state.remote.card
        ? 'You already have a Resident Card. Restore it before editing, or save your current design to replace it.'
        : 'Your account is ready. Continue below to make your Resident Card.')
      : 'New here? Verify your email to create your account and begin. Returning residents use the same link to sign in.');
    window.dispatchEvent(new CustomEvent('laidies:maikeover-account-ready'));
    return state;
  }
  function unavailable() {
    el('moAccountForm').hidden = true;
    el('moAccountReady').hidden = true;
    message('We couldn’t connect to the account service. Reload to try again. Your saved Card has not changed.');
  }
  async function beforeSave() {
    var current = await refresh();
    if (!current.session) {
      el('mo-account').scrollIntoView({block:'start'});
      el('moAccountEmail').focus();
      message('Verify your email here, then return to Finish to save your Card to your account.');
      return null;
    }
    var remote = current.remote && current.remote.card;
    if (remote && !window.confirm('Replace the Resident Card saved to this account with the design currently in MAiKEOVER? Cancel to keep your existing account Card.')) return null;
    return { userId: current.session.user.id, revision: remote && remote.revision || null };
  }
  async function validateSession(context) {
    var session = await runtime.client.auth.getSession();
    if (session.error || !session.data.session || session.data.session.user.id !== context.userId) {
      throw new Error('Your sign-in changed. Sign in again before saving.');
    }
  }
  async function save(envelope, context) {
    await validateSession(context);
    var result = await runtime.controller.claimLocalCard(envelope, crypto.randomUUID(), context.revision);
    if (!result.localPreserved) throw new Error('The browser copy changed during saving.');
    await refresh();
    window.dispatchEvent(new CustomEvent('laidies:continuation-ready'));
  }
  window.LAIDIESMaikeoverAccount = Object.freeze({beforeSave:beforeSave, validateSession:validateSession, save:save});
  el('moAccountForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    var button = el('moAccountSend');
    if (button.disabled) return;
    button.disabled = true;
    try {
      runtime = await window.LAIDIESResidentAccountRuntime.get();
      await runtime.controller.requestMagicLink(el('moAccountEmail').value, window.location.pathname);
      message('Check your email for your verification link. Open it in this browser to return here and make your Card. If you already have an account, it signs you in.');
      el('moAccountEmail').value = '';
    } catch (error) { message('The email link could not be requested. Please try again.'); }
    finally { button.disabled = false; }
  });
  el('moAccountRestore').addEventListener('click', async function () {
    this.disabled = true;
    try {
      var current = await refresh();
      var remote = current.remote && current.remote.card;
      if (!current.session || !remote) throw new Error('No account Card is available.');
      if (!window.confirm('Restore your account Card? This replaces the Card and unsaved choices in this browser.')) return;
      var session = await runtime.client.auth.getSession();
      if (session.error || !session.data.session || session.data.session.user.id !== current.session.user.id) throw new Error('Your sign-in changed.');
      runtime.writeLocalEnvelope(remote.document);
      window.location.reload();
    } catch (error) { message('Your Card could not be restored. ' + error.message); }
    finally { this.disabled = false; }
  });
  el('moAccountSignOut').addEventListener('click', async function () {
    this.disabled = true;
    try { await runtime.controller.signOut(); await refresh(); }
    catch (_) { message('Sign-out did not finish. Please try again.'); }
    finally { this.disabled = false; }
  });
  window.addEventListener('focus', function () { refresh().catch(unavailable); });
  refresh().catch(unavailable);
})();
