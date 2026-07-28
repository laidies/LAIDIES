(function installResidentCardGifting(global) {
  "use strict";

  var root = document.querySelector("[data-resident-card-gifting]");
  if (!root) return;

  var status = root.querySelector("[data-gift-status]");
  var form = root.querySelector("[data-gift-form]");
  var handle = root.querySelector("[data-gift-handle]");
  var card = root.querySelector("[data-gift-card]");
  var note = root.querySelector("[data-gift-note]");
  var submit = root.querySelector("[data-gift-submit]");
  var client = null;
  var session = null;

  function announce(message, kind) {
    status.textContent = message;
    status.dataset.kind = kind || "info";
  }

  function normalizeHandle(value) {
    return String(value || "")
      .trim()
      .replace(/^@+/, "")
      .toLowerCase();
  }

  function makeIdempotencyKey() {
    if (global.crypto && typeof global.crypto.randomUUID === "function") {
      return global.crypto.randomUUID();
    }
    return "00000000-0000-4000-8000-" +
      Math.random().toString(16).slice(2).padEnd(12, "0").slice(0, 12);
  }

  async function createClient() {
    var config = global.LAIDIES_SUPABASE_CONFIG;
    if (!config || !config.url || !config.anonKey) return null;
    var module = await import(
      "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm"
    );
    return module.createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }

  function showCards(cards) {
    card.innerHTML = "";
    var giftable = (cards || []).filter(function (item) {
      return Number(item.giftable_count || 0) > 0;
    });
    if (!giftable.length) {
      card.disabled = true;
      submit.disabled = true;
      card.appendChild(new Option("No duplicate cards available", ""));
      announce(
        "You are signed in, but you do not have a duplicate card to send. Your final copy always stays in your binder.",
        "held"
      );
      return;
    }
    card.disabled = false;
    submit.disabled = false;
    card.appendChild(new Option("Choose a duplicate card", ""));
    giftable.forEach(function (item) {
      var label = item.title + " · " + item.giftable_count + " giftable";
      card.appendChild(new Option(label, item.card_id));
    });
    announce(
      "Choose one duplicate. The transfer happens once and your final copy cannot be sent.",
      "ready"
    );
  }

  async function refresh() {
    client = await createClient();
    if (!client) {
      announce("Resident services are unavailable in this build.", "error");
      form.hidden = true;
      return;
    }
    var auth = await client.auth.getSession();
    if (auth.error) throw auth.error;
    session = auth.data && auth.data.session;
    if (!session) {
      form.hidden = true;
      announce(
        "Sign in at the Resident Card desk to send a duplicate card.",
        "signed-out"
      );
      return;
    }
    form.hidden = false;
    var inventory = await client.rpc("my_trading_cards");
    if (inventory.error) throw inventory.error;
    showCards(inventory.data);
  }

  function messageFor(result) {
    var statusCode = result && result.status;
    if (statusCode === "sent") {
      return "Sent " + result.title + ". It is now in their binder and Post Office box.";
    }
    return {
      "last-copy": "That is your final copy, so it stayed in your binder.",
      "not-owned": "That card is no longer in your binder.",
      "no-such-card": "That card is not in the active roster.",
      "no-such-resident": "No resident has claimed that handle.",
      "not-accepting": "That resident is not accepting Post Office deliveries.",
      "need-a-handle": "Claim your own resident handle before sending a gift.",
      "self": "Keep it in your own binder—you cannot mail a card to yourself.",
      "not-signed-in": "Your session ended. Sign in again at the Resident Card desk."
    }[statusCode] || "The card was not sent. Nothing changed.";
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    var toHandle = normalizeHandle(handle.value);
    var cardId = String(card.value || "");
    if (!toHandle || !cardId) {
      announce("Choose a duplicate card and enter a resident handle.", "held");
      return;
    }

    submit.disabled = true;
    announce("Sending one duplicate…", "working");
    try {
      var requestKey = makeIdempotencyKey();
      var response = await client.rpc("send_duplicate_trading_card", {
        p_to_handle: toHandle,
        p_card_id: cardId,
        p_note: String(note.value || "").trim() || null,
        p_idempotency_key: requestKey
      });
      if (response.error) throw response.error;
      var result = response.data || {};
      announce(messageFor(result), result.status === "sent" ? "sent" : "held");
      if (result.status === "sent") {
        form.reset();
        await refresh();
      }
    } catch (error) {
      announce(
        "The card was not sent. Your binder was not changed. " +
          String(error && error.message || ""),
        "error"
      );
    } finally {
      submit.disabled = false;
    }
  });

  refresh().catch(function (error) {
    form.hidden = true;
    announce(
      "The card desk could not open. Nothing was transferred. " +
        String(error && error.message || ""),
      "error"
    );
  });
})(window);
