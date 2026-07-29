(function installResidentChat(global) {
  "use strict";

  var status = document.querySelector("[data-chat-status]");
  var threadList = document.querySelector("[data-chat-thread-list]");
  var messages = document.querySelector("[data-chat-messages]");
  var threadTitle = document.querySelector("[data-chat-title]");
  var threadDetail = document.querySelector("[data-chat-detail]");
  var directForm = document.querySelector("[data-direct-form]");
  var groupForm = document.querySelector("[data-group-form]");
  var composeForm = document.querySelector("[data-compose-form]");
  var composeBody = document.querySelector("[data-compose-body]");
  var client = null;
  var session = null;
  var activeConversation = "";
  var activeChannel = null;

  function announce(text) {
    status.textContent = text;
  }

  function uuid() {
    return global.crypto && global.crypto.randomUUID
      ? global.crypto.randomUUID()
      : "00000000-0000-4000-8000-" +
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

  function escapeText(value) {
    return String(value == null ? "" : value);
  }

  function formatTime(value) {
    try {
      return new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit"
      }).format(new Date(value));
    } catch (_) {
      return "";
    }
  }

  function renderMessages(rows) {
    messages.innerHTML = "";
    if (!rows || !rows.length) {
      messages.innerHTML =
        '<div class="chat-empty"><strong>No messages yet.</strong><p>Say hello when you are ready.</p></div>';
      return;
    }
    rows.forEach(function (row) {
      var article = document.createElement("article");
      article.className = "chat-message" + (row.is_mine ? " chat-message--mine" : "");
      var meta = document.createElement("div");
      meta.className = "chat-message__meta";
      meta.textContent = (row.is_mine ? "You" : "@" + row.sender_handle) +
        " · " + formatTime(row.created_at);
      if (!row.is_mine) {
        var report = document.createElement("button");
        report.type = "button";
        report.className = "chat-message__report";
        report.textContent = "Report";
        report.addEventListener("click", async function () {
          if (!global.confirm("Report this message for review?")) return;
          try {
            var result = await client.rpc("report_resident_chat_message", {
              p_message_id: row.message_id,
              p_reason: "other",
              p_detail: null
            });
            if (result.error) throw result.error;
            announce(result.data === "reported"
              ? "Message reported for review."
              : "The report was not recorded.");
          } catch (error) {
            announce("The report was not recorded. " +
              String(error && error.message || ""));
          }
        });
        meta.appendChild(report);
      }
      var body = document.createElement("p");
      body.textContent = escapeText(row.body);
      article.append(meta, body);
      messages.appendChild(article);
    });
    messages.scrollTop = messages.scrollHeight;
  }

  async function openConversation(id, title, kind) {
    activeConversation = id;
    threadTitle.textContent = title;
    threadDetail.textContent = kind === "group"
      ? "Private group chat"
      : "Private resident chat";
    composeForm.hidden = false;
    threadList.querySelectorAll("[data-conversation-id]").forEach(function (button) {
      button.setAttribute(
        "aria-current",
        button.dataset.conversationId === id ? "true" : "false"
      );
    });
    var response = await client.rpc("resident_chat_messages", {
      p_conversation_id: id,
      p_limit: 200
    });
    if (response.error) throw response.error;
    renderMessages(response.data || []);
    if (activeChannel) await client.removeChannel(activeChannel);
    activeChannel = client.channel("resident-chat:" + id)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "resident_messages",
          filter: "conversation_id=eq." + id
        },
        function () {
          openConversation(id, title, kind).catch(function () {});
        }
      )
      .subscribe();
  }

  async function loadConversations(preferredId) {
    var response = await client.rpc("my_resident_conversations");
    if (response.error) throw response.error;
    var rows = response.data || [];
    threadList.innerHTML = "";
    if (!rows.length) {
      threadList.innerHTML = "<p>No chats yet.</p>";
      threadTitle.textContent = "Start a conversation";
      threadDetail.textContent = "Use a resident handle. Email addresses are never shown.";
      composeForm.hidden = true;
      renderMessages([]);
      return;
    }
    rows.forEach(function (row) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "chat-thread-button";
      button.dataset.conversationId = row.conversation_id;
      var strong = document.createElement("strong");
      strong.textContent = row.display_title || row.title || "Conversation";
      var detail = document.createElement("span");
      detail.textContent = row.unread_count
        ? row.unread_count + " unread"
        : (row.kind === "group" ? "Group" : "Resident");
      button.append(strong, detail);
      button.addEventListener("click", function () {
        openConversation(
          row.conversation_id,
          strong.textContent,
          row.kind
        ).catch(function (error) {
          announce("That conversation could not open. " + error.message);
        });
      });
      threadList.appendChild(button);
    });
    var selected = rows.find(function (row) {
      return row.conversation_id === preferredId;
    }) || rows[0];
    await openConversation(
      selected.conversation_id,
      selected.display_title || selected.title || "Conversation",
      selected.kind
    );
  }

  directForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      var handle = String(new FormData(directForm).get("handle") || "")
        .trim().replace(/^@+/, "").toLowerCase();
      if (!handle) return;
      announce("Opening private chat…");
      var response = await client.rpc("create_direct_resident_chat", {
        p_to_handle: handle
      });
      if (response.error) throw response.error;
      if (!response.data || response.data.status !== "ready") {
        announce("That resident is unavailable for chat.");
        return;
      }
      directForm.reset();
      await loadConversations(response.data.conversation_id);
      announce("Private chat ready.");
    } catch (error) {
      announce("Private chat did not open. " + String(error && error.message || ""));
    }
  });

  groupForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      var data = new FormData(groupForm);
      var handles = String(data.get("handles") || "")
        .split(",")
        .map(function (value) {
          return value.trim().replace(/^@+/, "").toLowerCase();
        })
        .filter(Boolean);
      var response = await client.rpc("create_group_resident_chat", {
        p_title: String(data.get("title") || "").trim(),
        p_handles: handles
      });
      if (response.error) throw response.error;
      if (!response.data || response.data.status !== "ready") {
        announce("The group was not created. Check the title and resident handles.");
        return;
      }
      groupForm.reset();
      await loadConversations(response.data.conversation_id);
      announce("Private group ready.");
    } catch (error) {
      announce("The group did not open. " + String(error && error.message || ""));
    }
  });

  composeForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      var body = String(composeBody.value || "").trim();
      if (!activeConversation || !body) return;
      var response = await client.rpc("send_resident_chat_message", {
        p_conversation_id: activeConversation,
        p_body: body,
        p_idempotency_key: uuid()
      });
      if (response.error) throw response.error;
      if (!response.data || response.data.status !== "sent") {
        announce("The message was not sent. Nothing was changed.");
        return;
      }
      composeBody.value = "";
      await loadConversations(activeConversation);
      announce("Message sent.");
    } catch (error) {
      announce("The message was not sent. " + String(error && error.message || ""));
    }
  });

  async function init() {
    client = await createClient();
    if (!client) throw new Error("Resident services are unavailable.");
    var auth = await client.auth.getSession();
    if (auth.error) throw auth.error;
    session = auth.data && auth.data.session;
    if (!session) {
      directForm.hidden = true;
      groupForm.hidden = true;
      composeForm.hidden = true;
      announce("Sign in at the Resident Card desk to use private chat.");
      threadList.innerHTML = "<p>Sign in to see your conversations.</p>";
      messages.innerHTML =
        '<div class="chat-empty"><a href="/resident-card.html">Open Resident Card sign-in</a></div>';
      return;
    }
    await loadConversations("");
    announce("Private resident chat is connected.");
  }

  init().catch(function (error) {
    directForm.hidden = true;
    groupForm.hidden = true;
    composeForm.hidden = true;
    announce("Chat did not open. " + String(error && error.message || ""));
  });
})(window);
