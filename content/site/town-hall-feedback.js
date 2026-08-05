(function () {
  "use strict";

  var form = document.getElementById("town-hall-form");
  if (!form) return;

  var typeInputs = Array.prototype.slice.call(
    form.querySelectorAll('input[name="th-type"]')
  );
  var typeChips = Array.prototype.slice.call(
    form.querySelectorAll("[data-th-type-chip]")
  );
  var subjectInput = document.getElementById("th-subject");
  var bodyInput = document.getElementById("th-body");
  var bodyCount = document.getElementById("th-body-count");
  var submitBtn = document.getElementById("th-submit");
  var statusEl = document.getElementById("th-status");
  var intakeFields = document.getElementById("th-intake-fields");
  var submitting = false;
  var supabaseClient = null;
  var ALLOWED_TYPES = ["compliment", "complaint", "suggestion"];
  var PREFLIGHT_FIXTURE_ID = "town-hall-private-inbox-repair-1";
  var SUBMISSION_RELEASED = false;

  function setStatus(message, kind) {
    statusEl.textContent = message;
    statusEl.dataset.state = kind || "idle";
    statusEl.setAttribute("role", kind === "error" ? "alert" : "status");
  }

  function refreshChips() {
    typeInputs.forEach(function (input, index) {
      var chip = typeChips[index];
      if (!chip) return;
      chip.dataset.selected = input.checked ? "true" : "false";
      chip.style.setProperty(
        "background",
        input.checked ? "#6938cc" : "transparent",
        "important"
      );
      chip.style.setProperty(
        "color",
        input.checked ? "#ffffff" : "var(--th2-ink)",
        "important"
      );
    });
  }

  function updateBodyCount() {
    bodyCount.textContent = bodyInput.value.length + " / 2000";
  }

  function setIntakeState(state) {
    form.dataset.intakeState = state;
    var held = state === "release-hold";
    if (intakeFields) intakeFields.disabled = held;
    if (held) {
      submitting = false;
      submitBtn.disabled = true;
      submitBtn.textContent = "Inbox not open yet";
      setStatus(
        "Town Hall submissions are still in release preflight. Nothing entered here can be delivered or saved.",
        "idle"
      );
    }
  }

  function productionAdapter() {
    async function client() {
      if (!SUBMISSION_RELEASED) {
        var holdError = new Error("Town Hall intake is in release preflight");
        holdError.code = "release-hold";
        throw holdError;
      }
      if (supabaseClient) return supabaseClient;
      var cfg = window.LAIDIES_SUPABASE_CONFIG;
      if (!cfg || !cfg.url || !cfg.anonKey) {
        var configError = new Error("Town Hall intake is not configured");
        configError.code = "configuration";
        throw configError;
      }
      try {
        var mod = await import(
          "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm"
        );
        supabaseClient = mod.createClient(cfg.url, cfg.anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: false
          }
        });
        return supabaseClient;
      } catch (_) {
        var loadError = new Error("Town Hall intake could not load");
        loadError.code = "configuration";
        throw loadError;
      }
    }

    return {
      getSession: async function () {
        var activeClient = await client();
        try {
          var response = await activeClient.auth.getSession();
          if (response && response.error) throw response.error;
          return response && response.data ? response.data.session : null;
        } catch (_) {
          var authError = new Error("Town Hall could not verify sign-in state");
          authError.code = "auth";
          throw authError;
        }
      },
      submit: async function (payload) {
        var activeClient = await client();
        var result;
        try {
          // Do not request the inserted row. Anonymous inserts have no matching
          // SELECT grant in the inspected RLS policy, so a returning select can
          // turn a completed write into an apparent failure.
          result = await activeClient.from("town_hall_feedback").insert(payload);
        } catch (_) {
          var networkError = new Error("Town Hall delivery outcome is unknown");
          networkError.code = "unknown";
          throw networkError;
        }
        return result;
      }
    };
  }

  function isLocalPreflight() {
    return (
      /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname) &&
      window.__LAIDIES_TOWN_HALL_PREFLIGHT__ === PREFLIGHT_FIXTURE_ID
    );
  }

  function adapter() {
    var injected = window.__LAIDIES_TOWN_HALL_PREFLIGHT_ADAPTER__;
    if (
      isLocalPreflight() &&
      injected &&
      injected.fixtureId === PREFLIGHT_FIXTURE_ID &&
      typeof injected.getSession === "function" &&
      typeof injected.submit === "function"
    ) {
      return injected;
    }
    if (!SUBMISSION_RELEASED) {
      return {
        getSession: async function () {
          var holdError = new Error("Town Hall intake is in release preflight");
          holdError.code = "release-hold";
          throw holdError;
        },
        submit: async function () {
          var holdError = new Error("Town Hall intake is in release preflight");
          holdError.code = "release-hold";
          throw holdError;
        }
      };
    }
    return productionAdapter();
  }

  function classifyInsertError(error) {
    if (!error || typeof error !== "object") return "unknown";
    var status = Number(error.status);
    var code = typeof error.code === "string" ? error.code : "";
    var message = typeof error.message === "string" ? error.message : "";
    if (
      status === 0 ||
      /failed to fetch|network|timeout|timed out|abort/i.test(message)
    ) {
      return "unknown";
    }
    if ((status >= 400 && status < 500) || /^23\d{3}$/.test(code)) {
      return "rejected";
    }
    return "unknown";
  }

  function validateReceipt(result) {
    if (result && result.accepted === true) return true;
    if (result && result.error) {
      var insertError = new Error("Town Hall intake returned an error");
      insertError.code = classifyInsertError(result.error);
      throw insertError;
    }
    var receiptError = new Error("Missing acceptance receipt");
    receiptError.code = "unknown";
    throw receiptError;
  }

  function restoreButton(label) {
    submitting = false;
    submitBtn.disabled = false;
    submitBtn.textContent = label;
  }

  function holdUnknownOutcome() {
    submitting = false;
    submitBtn.disabled = true;
    submitBtn.textContent = "Outcome unknown — wait";
  }

  typeInputs.forEach(function (input) {
    input.addEventListener("change", refreshChips);
  });
  bodyInput.addEventListener("input", updateBodyCount);
  updateBodyCount();
  if (!isLocalPreflight() && !SUBMISSION_RELEASED) setIntakeState("release-hold");
  else setIntakeState("preflight");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (submitting) return;
    if (form.dataset.intakeState === "release-hold") {
      setStatus(
        "Town Hall submissions are still in release preflight. Nothing entered here can be delivered or saved.",
        "idle"
      );
      return;
    }

    var checkedType = typeInputs.find(function (input) {
      return input.checked;
    });
    var body = bodyInput.value.trim();
    if (!checkedType || !ALLOWED_TYPES.includes(checkedType.value)) {
      setStatus(
        "Choose a card type: compliment, complaint, or suggestion.",
        "error"
      );
      typeInputs[0].focus();
      return;
    }
    if (body.length < 3 || body.length > 2000) {
      setStatus("Write between 3 and 2,000 characters.", "error");
      bodyInput.focus();
      return;
    }
    var subject = subjectInput.value.trim();
    if (subject.length > 100) {
      setStatus("Keep the optional subject to 100 characters or fewer.", "error");
      subjectInput.focus();
      return;
    }

    submitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Filing…";
    setStatus("Sending your card to the private inbox…", "progress");

    var intake = adapter();
    var session;
    try {
      session = await intake.getSession();
    } catch (error) {
      setStatus(
        error && error.code === "release-hold"
          ? "The private inbox is still in release preflight, so nothing was sent. Your note is still here."
          : error && error.code === "configuration"
          ? "The inbox is unavailable, so nothing was sent. Your note is still here."
          : "We could not verify whether you are signed in, so nothing was sent. Your note is still here.",
        "error"
      );
      restoreButton("File it →");
      return;
    }

    var payload = {
      submission_type: checkedType.value,
      subject: subject || null,
      body: body
    };
    if (session && session.user && session.user.id) {
      payload.user_id = session.user.id;
    }

    try {
      var receipt = await intake.submit(payload);
      validateReceipt(receipt);
    } catch (error) {
      if (error && error.code === "rejected") {
        setStatus(
          "The inbox did not accept this card. Your note is still here; check it and try again.",
          "error"
        );
        restoreButton("Check and try again →");
      } else {
        setStatus(
          "We could not confirm whether the inbox accepted this card. Your note is still here; wait before retrying to avoid a duplicate.",
          "error"
        );
        holdUnknownOutcome();
      }
      return;
    }

    try {
      localStorage.setItem(
        "laidies_town_hall_feedback_filed",
        JSON.stringify({
          version: 1,
          outcome: "accepted",
          acceptedAt: new Date().toISOString()
        })
      );
    } catch (_) {
      // The service receipt remains valid when device storage is unavailable.
    }
    window.dispatchEvent(
      new CustomEvent("laidies:town-hall-feedback-filed", {
        detail: { scope: "device-local", outcome: "accepted" }
      })
    );
    form.reset();
    refreshChips();
    updateBodyCount();
    setStatus(
      "Accepted by the Town Hall inbox. This confirms delivery only — not reading, review, or a reply.",
      "success"
    );
    restoreButton("File another card →");
  });
})();
