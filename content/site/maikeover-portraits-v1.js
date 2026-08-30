(function () {
  "use strict";
  var API = "https://laidies-avatar.wednesday-laidies.workers.dev";
  var busy = false;
  var byId = function (id) { return document.getElementById(id); };
  function status(text) { byId("moStatus").textContent = text; }

  async function session() {
    if (!window.LAIDIESResidentAccountRuntime) throw new Error("Account service is still loading. Please try again.");
    var runtime = await window.LAIDIESResidentAccountRuntime.get();
    var result = await runtime.client.auth.getSession();
    if (result.error) throw new Error("Sign-in could not be checked. Please sign in again.");
    return result.data && result.data.session;
  }
  async function showAccount() {
    try {
      var current = await session();
      byId("moPortraitAuth").textContent = current
        ? "Signed in for portraits as " + current.user.email
        : "Sign in to make portraits. Your choices can stay here while you sign in.";
      byId("moPortraitSignIn").hidden = !!current;
    } catch (_) {
      byId("moPortraitAuth").textContent = "Sign in at the Resident Card desk, then return to your portrait choices.";
      byId("moPortraitSignIn").hidden = false;
    }
  }
  function setMode() {
    var photo = document.querySelector('input[name="moPortraitMode"]:checked').value === "photo";
    byId("moPhotoPanel").hidden = !photo;
    byId("moDescriptionPanel").hidden = photo;
    if (!photo) { byId("moPhoto").value = ""; byId("moPhotoConsent").checked = false; }
  }
  function loadImage(url) {
    return new Promise(function (resolve, reject) {
      var image = new Image();
      image.onload = function () { resolve(image); };
      image.onerror = function () { reject(new Error("That image could not be read. Try a JPG or PNG.")); };
      image.src = url;
    });
  }
  async function raster(url, size, maxLength) {
    var image = await loadImage(url);
    if (!image.naturalWidth || !image.naturalHeight || image.naturalWidth * image.naturalHeight > 40000000) {
      throw new Error("That image is too large to process. Choose a smaller photo.");
    }
    var scale = Math.min(1, size / Math.max(image.naturalWidth, image.naturalHeight));
    var canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    var context = canvas.getContext("2d");
    if (!context) throw new Error("This browser cannot prepare your portrait.");
    context.fillStyle = "#fffdfb";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    for (var quality of [0.85, 0.7, 0.55, 0.4]) {
      var data = canvas.toDataURL("image/jpeg", quality);
      if (data.length <= maxLength) return data;
    }
    throw new Error("That portrait is too large to save. Your previous Card is unchanged.");
  }
  async function photoData() {
    var file = byId("moPhoto").files[0];
    if (!file) throw new Error("Choose a photo first.");
    if (!byId("moPhotoConsent").checked) throw new Error("Confirm permission to send this photo before generating.");
    if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 8 * 1024 * 1024) {
      throw new Error("Use a JPG, PNG or WebP photo smaller than 8 MB.");
    }
    var url = URL.createObjectURL(file);
    try { return await raster(url, 768, 1800000); }
    finally { URL.revokeObjectURL(url); }
  }
  async function boundedResponse(response) {
    var reader = response.body.getReader();
    var parts = [], length = 0;
    try {
      while (true) {
        var item = await reader.read();
        if (item.done) break;
        length += item.value.byteLength;
        if (length > 24 * 1024 * 1024) throw new Error("The portrait response was too large. Please try again later.");
        parts.push(item.value);
      }
    } finally { await reader.cancel().catch(function () {}); }
    var bytes = new Uint8Array(length), offset = 0;
    parts.forEach(function (part) { bytes.set(part, offset); offset += part.length; });
    return JSON.parse(new TextDecoder().decode(bytes));
  }
  function choose(data, button) {
    byId("moCands").querySelectorAll("button").forEach(function (candidate) {
      candidate.setAttribute("aria-pressed", candidate === button ? "true" : "false");
    });
    window.dispatchEvent(new CustomEvent("laidies:portrait-selected", { detail: { image: data } }));
    status("Portrait selected. Open Finish and save your Card; then keep or update the private account copy at the Resident Card desk.");
  }
  async function generate() {
    if (busy) return;
    busy = true;
    byId("moMake").disabled = true;
    var timer;
    try {
      var current = await session();
      if (!current) { await showAccount(); throw new Error("Sign in first using the link above, then return here. Your choices are unchanged."); }
      var extras = window.LAIDIESPortraitChoices.extras();
      var body = { requestId: crypto.randomUUID() };
      var photo = document.querySelector('input[name="moPortraitMode"]:checked').value === "photo";
      if (photo) {
        body.image = await photoData(); body.traits = { extras: extras }; body.consent = true;
      } else {
        var description = byId("moDescribe").value.trim();
        if (!description) throw new Error("Describe the person you would like in your portrait first.");
        body.itemPrompt = description + ", " + extras;
      }
      var abort = new AbortController();
      timer = window.setTimeout(function () { abort.abort(); }, 180000);
      status("Making three portraits. This can take a couple of minutes. Please keep this page open; one click is enough.");
      var response = await fetch(API, {
        method: "POST", credentials: "omit", redirect: "error", cache: "no-store",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + current.access_token },
        body: JSON.stringify(body), signal: abort.signal
      });
      var result = await boundedResponse(response);
      if (!response.ok) {
        if (response.status === 429) throw new Error("The portrait limit has been reached. Keep your current choices and try again tomorrow.");
        if (response.status === 401) throw new Error("Your sign-in expired. Sign in again before making portraits.");
        if (response.status === 409) throw new Error("This portrait request was already received. It will not be charged again.");
        if (response.status === 503) throw new Error("The portrait service is temporarily unavailable. Your existing Card is unchanged.");
        throw new Error("The portraits could not be made. Your existing Card is unchanged. Please try again later.");
      }
      if (!Array.isArray(result.images) || !result.images.length || result.images.length > 3) throw new Error("No usable portraits were returned. Your existing Card is unchanged.");
      var portraits = [];
      for (var base64 of result.images) {
        if (typeof base64 !== "string" || base64.length > 8 * 1024 * 1024 || !/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) continue;
        try {
          var small = await raster("data:image/png;base64," + base64, 384, 131095);
          if (window.LAIDIESResidentCard.isSafeRasterPortrait(small)) portraits.push(small);
        } catch (_) { /* A malformed candidate cannot replace a valid Card. */ }
      }
      var after = await session();
      if (!after || after.user.id !== current.user.id) throw new Error("The signed-in account changed. These candidates have been discarded.");
      if (!portraits.length) throw new Error("The returned portraits could not be read. Your existing Card is unchanged.");
      var buttons = portraits.map(function (data, index) {
        var button = document.createElement("button");
        button.type = "button"; button.className = "mo-portrait-candidate";
        button.setAttribute("aria-label", "Choose portrait " + (index + 1));
        button.setAttribute("aria-pressed", "false");
        var image = document.createElement("img"); image.src = data; image.alt = "Portrait option " + (index + 1);
        button.appendChild(image);
        button.addEventListener("click", function () { choose(data, button); });
        return button;
      });
      byId("moCands").replaceChildren.apply(byId("moCands"), buttons);
      status(portraits.length + " of 3 portraits ready. Choose one to preview it; your saved Card has not changed.");
      buttons[0].focus();
    } catch (error) {
      status(error.name === "AbortError"
        ? "The request took too long. It may have used this set's allowance; there is no automatic retry. Your saved Card is unchanged."
        : error.message || "Portrait generation did not finish. Your saved Card is unchanged.");
    } finally {
      window.clearTimeout(timer);
      byId("moPhoto").value = ""; byId("moPhotoConsent").checked = false;
      busy = false; byId("moMake").disabled = false;
    }
  }
  byId("moMake").addEventListener("click", generate);
  byId("moClearPortrait").addEventListener("click", function () {
    if (busy) return;
    byId("moCands").replaceChildren();
    window.dispatchEvent(new CustomEvent("laidies:portrait-selected", { detail: { image: "" } }));
    status("Portrait removed from the preview. Save your Card to keep that change.");
  });
  document.querySelectorAll('input[name="moPortraitMode"]').forEach(function (input) { input.addEventListener("change", setMode); });
  window.addEventListener("focus", showAccount);
  window.addEventListener("laidies:continuation-ready", showAccount);
  setMode(); showAccount();
})();
