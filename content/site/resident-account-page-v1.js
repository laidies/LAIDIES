(function residentAccountPageV1() {
  "use strict";

  var runtime = null;
  var state = null;

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
    var local = state && state.localCard;
    var email = signedIn && state.session.user
      ? String(state.session.user.email || "")
      : "";

    show("rcAccountSignedOut", !signedIn);
    show("rcAccountSignedIn", signedIn);

    if (!signedIn) {
      setStatus(
        local && local.state === "saved"
          ? "Your local Card is still saved only in this browser. Requesting a sign-in link does not make it portable."
          : "Enter your email to ask for a private sign-in link. A request does not prove delivery, account creation, Card restoration or cross-device continuity.",
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
    setStatus(
      "A private session is active. Card claiming, restoration and cross-device continuation remain unavailable until the public lifecycle is verified.",
      "neutral"
    );
  }

  async function refresh() {
    state = {
      session: await runtime.controller.getSession(),
      localCard: runtime.localCard()
    };
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
        "Sign-in-link request accepted. Delivery has not been verified; if a link arrives, it returns to this Resident Card desk.",
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
