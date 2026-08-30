(function residentAccountPageV1() {
  "use strict";

  var runtime = null;
  var state = null;
  var continuationState = null;

  function byId(id) {
    return document.getElementById(id);
  }

  function show(id, visible) {
    var node = byId(id);
    if (node) node.hidden = !visible;
  }

  function setStatus(message, tone) {
    var node = byId("rcAccountStatus");
    if (!node) return;
    node.textContent = message;
    node.dataset.tone = tone || "neutral";
  }

  function render() {
    var signedIn = !!(state && state.session);
    var remote = state && state.remote && state.remote.card || null;
    var local = state && state.localCard;
    var email = signedIn && state.session.user
      ? String(state.session.user.email || "")
      : "";

    show("rcAccountSignedOut", !signedIn);
    show("rcAccountSignedIn", signedIn);
    show("rcAccountClaim", signedIn && !remote && local && local.state === "saved");
    show("rcAccountRestore", signedIn && !!remote);
    var hasDifferentLocalCard = signedIn && remote && local && local.state === "saved" &&
      JSON.stringify(window.LAIDIESResidentCard.validateEnvelope(local.envelope)) !==
      JSON.stringify(window.LAIDIESResidentCard.validateEnvelope(remote.document));
    show("rcAccountUpdate", !!hasDifferentLocalCard);
    show("rcAccountNoCard", signedIn && !remote && (!local || local.state !== "saved"));
    show("rcAccountCloset", signedIn && !!remote);

    var continueLink = byId("rcAccountContinue");
    var continuation = continuationState && continuationState.document ||
      window.LAIDIESResidentContinuationV1 && window.LAIDIESResidentContinuationV1.readLocalDocument();
    var target = continuation && continuation.last;
    if (continueLink) {
      var canContinue = signedIn && target && target.path && target.path.indexOf("/resident-card") !== 0;
      continueLink.hidden = !canContinue;
      if (canContinue) {
        continueLink.href = target.path;
        continueLink.textContent = "Pick up: " + target.label + " →";
      }
    }

    if (!signedIn) {
      setStatus(
        local && local.state === "saved"
          ? "Your local Card is still safe in this browser. Sign in to keep a private account-backed copy."
          : "Sign in by email to restore an account-backed Card or create one after MAiKEOVER.",
        "neutral"
      );
      return;
    }

    var identity = byId("rcAccountIdentity");
    if (identity) {
      identity.textContent = email
        ? "Signed in as " + email
        : "Signed in with a verified account";
    }
    if (remote) {
      var name = remote.document && remote.document.fields && remote.document.fields.displayName;
      setStatus((name ? name + "’s" : "Your") + " private account-backed Card is available. Restore it to this browser to use it throughout the Closet.", "success");
    } else {
      setStatus(local && local.state === "saved"
        ? "This account does not have a Card yet. Keep the valid Card already saved in this browser."
        : "This account does not have a Resident Card yet. Make one at MAiKEOVER, then return here to keep it.", "neutral");
    }
  }

  async function refresh() {
    state = await runtime.getState();
    if (state.error) throw state.error;
    if (window.LAIDIESResidentContinuationV1) continuationState = await window.LAIDIESResidentContinuationV1.syncWith(runtime);
    render();
  }

  async function requestLink(event) {
    event.preventDefault();
    var email = byId("rcAccountEmail");
    var button = byId("rcAccountEmailButton");
    button.disabled = true;
    setStatus("Requesting your private sign-in link…", "neutral");
    try {
      await runtime.controller.requestMagicLink(
        email.value,
        window.location.pathname
      );
      setStatus(
        "Check your email for the LAiDIES sign-in link. The link returns to this Resident Card desk.",
        "success"
      );
      email.value = "";
    } catch (error) {
      setStatus(error && error.message
        ? error.message
        : "The sign-in link could not be requested.", "error");
    } finally {
      button.disabled = false;
    }
  }

  async function claimLocalCard() {
    var buttons = [byId("rcAccountClaimButton"), byId("rcAccountUpdateButton")];
    if (buttons.some(function (button) { return button && button.disabled; })) return;
    buttons.forEach(function (button) { if (button) button.disabled = true; });
    setStatus("Keeping this Card with your account…", "neutral");
    try {
      var current = await runtime.client.auth.getSession();
      if (current.error || !current.data.session || !state.session ||
          current.data.session.user.id !== state.session.user.id) {
        throw new Error("The signed-in account changed. Reload this desk before keeping a Card.");
      }
      var local = runtime.localCard();
      var revision = state && state.remote && state.remote.card && state.remote.card.revision || null;
      var result = await runtime.controller.claimLocalCard(local.envelope, crypto.randomUUID(), revision);
      if (!result.localPreserved) throw new Error("The local Card was not preserved after claim.");
      await refresh();
    } catch (error) {
      setStatus(error && error.message ? error.message : "The Card could not be kept with this account.", "error");
    } finally {
      buttons.forEach(function (button) { if (button) button.disabled = false; });
    }
  }

  async function restoreRemoteCard() {
    var button = byId("rcAccountRestoreButton");
    button.disabled = true;
    setStatus("Restoring your account-backed Card to this browser…", "neutral");
    try {
      var current = await runtime.client.auth.getSession();
      if (current.error || !current.data.session || !state.session ||
          current.data.session.user.id !== state.session.user.id) {
        throw new Error("The signed-in account changed. Reload this desk before restoring a Card.");
      }
      var remote = state && state.remote && state.remote.card;
      runtime.writeLocalEnvelope(remote.document);
      setStatus("Restored. This browser now uses your account-backed Card and signed-in continuation.", "success");
      window.dispatchEvent(new CustomEvent("laidies:resident-card-restored"));
    } catch (error) {
      setStatus(error && error.message ? error.message : "The Card could not be restored to this browser.", "error");
    } finally {
      button.disabled = false;
    }
  }

  async function signOut() {
    var button = byId("rcAccountSignOut");
    button.disabled = true;
    setStatus("Signing out…", "neutral");
    try {
      state = await runtime.controller.signOut();
      render();
    } catch (error) {
      setStatus(error && error.message
        ? error.message
        : "Sign-out did not complete.", "error");
    } finally {
      button.disabled = false;
    }
  }

  async function init() {
    var form = byId("rcAccountForm");
    if (!form) return;
    form.addEventListener("submit", requestLink);
    byId("rcAccountClaimButton").addEventListener("click", claimLocalCard);
    byId("rcAccountUpdateButton").addEventListener("click", claimLocalCard);
    byId("rcAccountRestoreButton").addEventListener("click", restoreRemoteCard);
    var signOutButton = byId("rcAccountSignOut");
    if (signOutButton) signOutButton.addEventListener("click", signOut);
    try {
      runtime = await window.LAIDIESResidentAccountRuntime.get();
      await refresh();
    } catch (error) {
      setStatus(
        "The account service is not available yet. Your device-local Card has not changed.",
        "error"
      );
      show("rcAccountSignedOut", false);
      show("rcAccountSignedIn", false);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
