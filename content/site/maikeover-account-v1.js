(function () {
  'use strict';
  var runtime, state, pendingEmail = '', nextSendAt = 0, requesting = false, verifying = false;
  var pendingKey = 'laidies_maikeover_pending_email_v1';
  var newsletterUser = null;
  var watchingAuth = false;
  var activeUserId = null;
  try {
    var pending = JSON.parse(window.sessionStorage.getItem(pendingKey) || 'null');
    if (pending && typeof pending.email === 'string' && pending.email.length <= 254 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pending.email) && pending.expires > Date.now()) {
      pendingEmail = pending.email;
      nextSendAt = Math.min(Number(pending.nextSendAt) || 0, Date.now() + 60000);
    }
  } catch (_) {}
  function clearPending() { try { window.sessionStorage.removeItem(pendingKey); } catch (_) {} }
  var el = function (id) { return document.getElementById(id); };
  function message(text) { el('moAccountStatus').textContent = text; }
  function normalizeHandle(value) {
    return String(value == null ? '' : value).trim().toLowerCase().replace(/^@+/, '');
  }
  function validHandle(value) {
    return /^[a-z0-9_]{3,24}$/.test(value);
  }
  function syncLocalHandle(value) {
    var handle = normalizeHandle(value);
    try {
      if (validHandle(handle)) {
        window.localStorage.setItem('laidies_card_username', handle);
      } else {
        window.localStorage.removeItem('laidies_card_username');
      }
    } catch (_) {}
  }
  function hydrateHandle(profile, force) {
    var maker = window.LAIDIESMaikeoverHandle;
    if (maker && typeof maker.hydrate === 'function') {
      maker.hydrate(profile && profile.card_username || '', force === true);
    }
  }
  async function refresh() {
    runtime = await window.LAIDIESResidentAccountRuntime.get();
    if (!watchingAuth && runtime.client.auth.onAuthStateChange) {
      watchingAuth = true;
      runtime.client.auth.onAuthStateChange(function (event) {
        if (event === 'SIGNED_OUT' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Leave Supabase's auth callback before reading its session again.
          window.setTimeout(function () { refresh().catch(unavailable); }, 0);
        }
      });
    }
    state = await runtime.getState();
    if (state.error) throw state.error;
    var signed = !!state.session;
    var nextUser = signed ? state.session.user.id : null;
    var accountChanged = nextUser !== activeUserId;
    activeUserId = nextUser;
    if (nextUser !== newsletterUser) {
      var newsletterEmail = el('moEpisodeEmail');
      var newsletterConsent = el('moEpisodeConsent');
      if (newsletterEmail) newsletterEmail.value = signed ? state.session.user.email || '' : '';
      if (newsletterConsent) newsletterConsent.checked = false;
      newsletterUser = nextUser;
    }
    if (signed) { pendingEmail = ''; clearPending(); el('moAccountCode').value = ''; }
    if (signed && state.remote && state.remote.profile) {
      // The account record is authoritative when a resident first arrives or
      // deliberately changes accounts. Later refreshes must not erase a
      // handle she is actively typing in the maker.
      hydrateHandle(state.remote.profile, accountChanged);
    }
    el('moAccountForm').hidden = signed || !!pendingEmail;
    el('moAccountCodeForm').hidden = signed || !pendingEmail;
    el('moAccountReady').hidden = !signed;
    el('moAccountRestore').hidden = !(signed && state.remote && state.remote.card);
    if (!signed && pendingEmail) message('Check ' + pendingEmail + ' for your code, then enter it here.');
    if (signed || !pendingEmail) message(signed
      ? 'You’re signed in. ' + (state.remote && state.remote.card
        ? 'You already have a Resident Card. Restore it before editing, or save your current design to replace it.'
        : 'Your account is ready. Continue below to make your Resident Card.')
      : 'New here? Verify your email to create your account and begin. Returning residents use the same email-code process to sign in.');
    window.dispatchEvent(new CustomEvent('laidies:maikeover-account-ready'));
    return state;
  }
  function unavailable() {
    el('moAccountForm').hidden = true;
    el('moAccountReady').hidden = true;
    el('moAccountCodeForm').hidden = true;
    message('We couldn’t connect to the account service. Reload to try again. Your saved Card has not changed.');
  }
  async function beforeSave() {
    var current = await refresh();
    if (!current.session) {
      el('mo-account').scrollIntoView({block:'start'});
      el(pendingEmail ? 'moAccountCode' : 'moAccountEmail').focus();
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
  async function save(envelope, context, requestedHandle) {
    await validateSession(context);
    if (window.LAIDIESPortraitSelection) await window.LAIDIESPortraitSelection.validate(envelope);
    var handle = normalizeHandle(requestedHandle);
    if (!validHandle(handle)) {
      throw new TypeError('Choose a handle with 3–24 lowercase letters, numbers or underscores.');
    }
    var result;
    try {
      result = await runtime.controller.claimLocalCard(
        envelope, crypto.randomUUID(), context.revision, handle
      );
    } catch (error) {
      if (error && (error.code === '23505' || error.message === 'card-username-not-available')) {
        throw new Error('That handle was just claimed. Pick another and try Save my Card again.');
      }
      throw error;
    }
    if (!result.localPreserved) throw new Error('The browser copy changed during saving.');
    if (!result.remote || !result.remote.profile ||
        result.remote.profile.card_username !== handle) {
      throw new Error('The account did not confirm your handle. Your browser draft is still here.');
    }
    syncLocalHandle(handle);
    hydrateHandle(result.remote.profile, true);
    await refresh();
    window.dispatchEvent(new CustomEvent('laidies:continuation-ready'));
  }
  window.LAIDIESMaikeoverAccount = Object.freeze({
    beforeSave:beforeSave,
    normalizeHandle:normalizeHandle,
    validHandle:validHandle,
    validateSession:validateSession,
    save:save
  });
  async function sendCode() {
    if (requesting || verifying) return;
    if (Date.now() < nextSendAt) {
      message('Please wait ' + Math.ceil((nextSendAt - Date.now()) / 1000) + ' seconds before requesting another code.');
      return;
    }
    requesting = true;
    el('moAccountSend').disabled = el('moAccountResend').disabled = el('moAccountChange').disabled = true;
    try {
      runtime = await window.LAIDIESResidentAccountRuntime.get();
      var email = pendingEmail || el('moAccountEmail').value.trim();
      await runtime.controller.requestEmailCode(email, window.location.pathname);
      pendingEmail = email;
      nextSendAt = Date.now() + 60000;
      try { window.sessionStorage.setItem(pendingKey, JSON.stringify({email:pendingEmail, nextSendAt:nextSendAt, expires:Date.now()+1200000})); } catch (_) {}
      el('moAccountForm').hidden = true;
      el('moAccountCodeForm').hidden = false;
      el('moAccountCode').value = '';
      message('Check ' + email + ' for your code, then enter it here. New and returning residents use this same step.');
      el('moAccountCode').focus();
    } catch (error) { message('We couldn’t request a code. Please check your email address and try again shortly.'); }
    finally {
      requesting = false;
      el('moAccountSend').disabled = el('moAccountResend').disabled = el('moAccountChange').disabled = false;
    }
  }
  el('moAccountForm').addEventListener('submit', function (event) {
    event.preventDefault(); return sendCode();
  });
  el('moAccountResend').addEventListener('click', sendCode);
  el('moAccountChange').addEventListener('click', function () {
    if (requesting || verifying) return;
    pendingEmail = ''; clearPending(); el('moAccountCode').value = '';
    el('moAccountCodeForm').hidden = true; el('moAccountForm').hidden = false;
    el('moAccountEmail').focus(); message('Enter the email address you want to use for your account.');
  });
  el('moAccountCodeForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!pendingEmail || verifying || requesting) return;
    verifying = true;
    el('moAccountVerify').disabled = el('moAccountChange').disabled = el('moAccountResend').disabled = true;
    try {
      await runtime.controller.verifyEmailCode(pendingEmail, el('moAccountCode').value);
      var current = await refresh();
      if (!current.session) throw new Error('No verified session');
      window.dispatchEvent(new CustomEvent('laidies:continuation-ready'));
      // Existing Cards need an explicit restore choice; never skip over it.
      el(current.remote && current.remote.card ? 'mo-account' : 'mo-maker').scrollIntoView({block:'start'});
    } catch (error) {
      message('We couldn’t finish verification. Check the latest code and try again. If it has expired, request a new one.');
    } finally {
      verifying = false;
      el('moAccountVerify').disabled = el('moAccountChange').disabled = el('moAccountResend').disabled = false;
    }
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
      syncLocalHandle(current.remote && current.remote.profile && current.remote.profile.card_username);
      hydrateHandle(current.remote && current.remote.profile, true);
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
