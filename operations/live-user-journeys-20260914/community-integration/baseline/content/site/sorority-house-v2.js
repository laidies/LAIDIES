(function () {
  var handle = "";
  var hasLocalCard = false;

  var roomData = {
    common: [
      {
        id: "ask-the-room",
        title: "Ask the Room",
        description: "The question is allowed to show up before the polished answer does.",
        href: "/community/ask-the-room.html",
        embed: true
      },
      {
        id: "wins",
        title: "Wins of the Week",
        description: "What you actually shipped, did, or figured out.",
        href: "/community/wins.html",
        embed: true
      },
      {
        id: "chat-room-digest",
        title: "Chat Room Digest",
        description: "The this-week thread to skim before the next meeting.",
        href: "/community/chat-room-digest.html",
        embed: false,
        action: "Read this week’s digest"
      }
    ],
    advice: [
      {
        id: "dear-laidies",
        title: "Dear LAiDIES",
        description: "Non-AI advice: office politics, confidence, and the right way to say it.",
        href: "/community/dear-laidies.html",
        embed: true
      },
      {
        id: "try-on-debrief",
        title: "The Try-On Debrief",
        description: "Tried it on this week. Here’s how it fit.",
        href: "/community/try-on-debrief.html",
        embed: true
      },
      {
        id: "send-it-energy",
        title: "Send It Energy",
        description: "Pre-send pep talks. Hit the button.",
        href: "/community/send-it-energy.html",
        embed: true
      }
    ],
    creative: [
      {
        id: "mix-cd-exchange",
        title: "Mix CD Exchange",
        description: "Swap a song. Make the wall louder.",
        href: "/community/mix-cd-exchange.html",
        embed: true
      },
      {
        id: "burn-book",
        title: "The Burn Book",
        description: "Nominate the Y2K reference that deserves to become an AI analogy.",
        href: "/community/burn-book.html",
        embed: true
      },
      {
        id: "comment-card",
        title: "Comment Card",
        description: "Tell us if an episode landed, missed, or needs better shoes.",
        href: "/community/comment-card.html",
        embed: false,
        action: "Take it to the comment desk"
      }
    ],
    yours: [
      {
        id: "closet",
        title: "Your Closet",
        description: "Resident Card, Luminaries, Wednesday Tour, charms, and stickers.",
        href: "/laidies-card.html",
        embed: false,
        action: "Open your Closet"
      },
      {
        id: "dare-reports",
        title: "Dare Reports",
        description: "Draw the next Truth or Dare and close out the one you already drew.",
        href: "/games/girl-talk.html",
        embed: false,
        action: "Open Girl Talk"
      }
    ]
  };

  var wingMeta = {
    common: {
      eyebrow: "Living Room",
      title: "The whole house is here."
    },
    advice: {
      eyebrow: "Kitchen",
      title: "Bring the situation."
    },
    creative: {
      eyebrow: "Rec Room",
      title: "Swap what you made."
    },
    yours: {
      eyebrow: "Your Room",
      title: "The things that live on you."
    }
  };

  function readResident() {
    try {
      handle = localStorage.getItem("laidies_card_username") || "";
      hasLocalCard = !!handle;
    } catch (_) {
      handle = "";
      hasLocalCard = false;
    }
  }

  function escapeText(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function updateArrival() {
    var title = document.getElementById("shArrivalTitle");
    var body = document.getElementById("shArrivalBody");
    var residentState = document.getElementById("shResidentState");
    var doorState = document.getElementById("shDoorState");
    if (!title || !body) return;

    if (hasLocalCard) {
      title.textContent = "Welcome back" + (handle ? ", @" + handle : "") + ".";
      body.textContent = "This device remembers your local Resident Card. It is not a Hyvor sign-in or cross-device community identity. Every room is still open to explore.";
      if (residentState) residentState.textContent = "Local card on this device · not community sign-in";
      if (doorState) doorState.textContent = "Rooms discoverable · Hyvor controls participation";
    } else {
      title.textContent = "Come in and look around.";
      body.textContent = "Every wing and room is discoverable. Discussion is hosted by Hyvor, which controls its own sign-in, publication and moderation.";
      if (residentState) residentState.textContent = "No community identity assumed";
      if (doorState) doorState.textContent = "Rooms discoverable · external participation separate";
    }
  }

  function roomById(wing, roomId) {
    return (roomData[wing] || []).filter(function (room) {
      return room.id === roomId;
    })[0] || null;
  }

  function renderDirectory(wing) {
    var meta = wingMeta[wing];
    var eyebrow = document.getElementById("shWingEyebrow");
    var heading = document.getElementById("shWingTitle");
    var list = document.getElementById("shRoomList");
    if (!meta || !eyebrow || !heading || !list) return;

    eyebrow.textContent = meta.eyebrow;
    heading.textContent = meta.title;
    list.innerHTML = "";

    (roomData[wing] || []).forEach(function (room, index) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "sh-room-choice";
      button.dataset.room = room.id;
      button.setAttribute("aria-current", index === 0 ? "true" : "false");
      button.innerHTML = "<strong>" + escapeText(room.title) + "</strong><span aria-hidden=\"true\">→</span>";
      button.addEventListener("click", function () {
        openRoom(wing, room.id);
      });
      list.appendChild(button);
    });
  }

  function loadHyvor(room, mount) {
    if (
      window.LAIDIES_COMMUNITY_ROOM &&
      typeof window.LAIDIES_COMMUNITY_ROOM.mount === "function"
    ) {
      window.LAIDIES_COMMUNITY_ROOM.mount({
        mount: mount,
        pageId: room.id,
        roomHref: room.href
      });
      return;
    }
    mount.innerHTML =
      '<div class="sh-thread-state" role="status">' +
        "<h4>The external discussion is unavailable.</h4>" +
        "<p>Nothing was submitted. Use the direct room link or return to the directory.</p>" +
      "</div>";
  }

  function openRoom(wing, roomId, updateHash) {
    var room = roomById(wing, roomId);
    var title = document.getElementById("shConversationTitle");
    var body = document.getElementById("shConversationBody");
    var mount = document.getElementById("shThreadMount");
    var fallback = document.getElementById("shFallbackLink");
    if (!room || !title || !body || !mount || !fallback) return;

    document.querySelectorAll(".sh-room-choice").forEach(function (button) {
      button.setAttribute("aria-current", button.dataset.room === room.id ? "true" : "false");
    });

    title.textContent = room.title;
    body.textContent = room.description;
    fallback.href = room.href;
    fallback.textContent = room.embed ? "Open as its own page" : (room.action || "Enter this room");
    mount.innerHTML = "";

    // Write every selected destination before either branch can return so the
    // visible room, copyable URL and Back/Forward state remain the same truth.
    if (updateHash !== false) {
      window.history.pushState(null, "", "#room-" + room.id);
    }

    if (!room.embed) {
      mount.innerHTML =
        '<div class="sh-thread-state">' +
          "<h4>This door goes somewhere specific.</h4>" +
          "<p>" + escapeText(room.description) + " Use the door above to continue without pretending this is a live thread.</p>" +
        "</div>";
      return;
    }

    loadHyvor(room, mount);
  }

  function openWing(wing, focusPanel, updateHash) {
    var panel = document.getElementById("shWingRoom");
    var rooms = roomData[wing] || [];
    if (!panel || !rooms.length) return;

    document.querySelectorAll(".sh-wing-key").forEach(function (button) {
      button.setAttribute("aria-expanded", button.dataset.wing === wing ? "true" : "false");
    });

    panel.hidden = false;
    panel.dataset.wing = wing;
    renderDirectory(wing);
    openRoom(wing, rooms[0].id, updateHash);

    if (focusPanel) {
      var reduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      panel.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start"
      });
    }
  }

  function locationSelection() {
    var roomId = String(window.location.hash || "").replace(/^#room-/, "");
    var found = null;
    Object.keys(roomData).some(function (wing) {
      if (roomById(wing, roomId)) {
        found = { wing: wing, roomId: roomId };
        return true;
      }
      return false;
    });
    return found;
  }

  function openLocationSelection(focusPanel) {
    var selected = locationSelection();
    if (!selected) return false;
    openWing(selected.wing, focusPanel, false);
    openRoom(selected.wing, selected.roomId, false);
    return true;
  }

  function bind() {
    readResident();
    updateArrival();

    document.querySelectorAll(".sh-wing-key").forEach(function (button) {
      button.addEventListener("click", function () {
        openWing(button.dataset.wing, true, true);
      });
    });

    if (!openLocationSelection(false)) openWing("common", false, false);
    window.addEventListener("popstate", function () {
      openLocationSelection(false);
    });
    window.addEventListener("hashchange", function () {
      openLocationSelection(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
