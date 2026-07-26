(function residentCardLocalStatus() {
  "use strict";

  function readLocalCard() {
    var contract = window.LAIDIESResidentCard;
    return contract ? contract.read(window.localStorage) : { state: "unavailable" };
  }

  function readLocalHandle() {
    var contract = window.LAIDIESResidentCard;
    return contract ? contract.readHandle(window.localStorage) : "";
  }

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function render() {
    var result = readLocalCard();
    var primary = document.getElementById("rcPrimaryAction");
    var closet = document.getElementById("rcClosetAction");

    if (result.state === "saved") {
      var name = result.fields.displayName || "LAiDY";
      var handle = readLocalHandle();
      setText("rcLocalKicker", "Saved in this browser");
      setText("rcLocalTitle", name + "’s local card");
      setText(
        "rcLocalDetail",
        handle
          ? "This device remembers a valid card and the local draft label @" + handle + ". Edit either at MAiKEOVER; neither is an account or reserved identity."
          : "This device remembers a valid Resident Card. You can edit it at MAiKEOVER or use its supported details in this device’s Closet."
      );
      primary.textContent = "Edit this local card";
      closet.hidden = false;
      return;
    }

    if (result.state === "invalid") {
      setText("rcLocalKicker", "Recovery needed");
      setText("rcLocalTitle", "This saved copy cannot be read");
      setText(
        "rcLocalDetail",
        "The local card record is incomplete or from an unsupported format. It has not been deleted or treated as an account. Open MAiKEOVER to review your preview and save a fresh valid copy."
      );
      primary.textContent = "Review at MAiKEOVER";
      return;
    }

    if (result.state === "legacy" || result.state === "legacy-invalid") {
      setText("rcLocalKicker", "Older local card details found");
      setText("rcLocalTitle", "Review before saving a current Card");
      setText(
        "rcLocalDetail",
        "This browser has older per-field Card details, not a valid current Card envelope. Nothing was deleted or upgraded. Open MAiKEOVER to review the preview and deliberately save one current local Card."
      );
      primary.textContent = "Review older details";
      return;
    }

    if (result.state === "unavailable") {
      setText("rcLocalKicker", "Storage unavailable");
      setText("rcLocalTitle", "This browser cannot check your card");
      setText(
        "rcLocalDetail",
        "A privacy setting or storage restriction blocked the local check. Nothing was changed. Adjust the browser setting or continue to MAiKEOVER without assuming a card was saved."
      );
      primary.textContent = "Open MAiKEOVER";
      return;
    }

    setText("rcLocalKicker", "No local card found");
    setText("rcLocalTitle", "Make your first local card");
    setText(
      "rcLocalDetail",
      "There is no valid Resident Card saved in this browser on this device. Start at MAiKEOVER; no email or account is required for the local version."
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render, { once: true });
  } else {
    render();
  }
})();
