(function () {
  var PROJECT_REF = "swqnkxzebxdbgyrzpdne";
  var AUTH_KEY = "sb-" + PROJECT_REF + "-auth-token";
  var isLocalPreview = /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/i.test(window.location.hostname);
  var handle = "";
  var isResident = false;

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
      var raw = localStorage.getItem(AUTH_KEY);
      if (raw) {
        var session = JSON.parse(raw);
        if (session && session.user && session.user.email) {
          isResident = !session.expires_at || session.expires_at * 1000 > Date.now();
          if (!handle) handle = String(session.user.email).split("@")[0];
        }
      }
      if (handle) isResident = true;
    } catch (_) {
      isResident = false;
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

    if (isResident) {
      title.textContent = "Welcome home" + (handle ? ", @" + handle : "") + ".";
      body.textContent = "Your card is on file. Pick a wing, choose a room, and the live conversation opens right here in the house.";
      if (residentState) residentState.textContent = "Your Resident Card is on file";
      if (doorState) doorState.textContent = "All live rooms are unlocked";
    } else {
      title.textContent = "You’re on the porch—for now.";
      body.textContent = "You can look through every wing and see what each room is for. A Resident Card unlocks the live conversations.";
      if (residentState) residentState.textContent = "Visitor at the front door";
      if (doorState) doorState.textContent = "Rooms visible · posting locked";
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
    if (isLocalPreview) {
      mount.innerHTML =
        '<div class="sh-thread-state">' +
          "<h4>The live conversation lives here.</h4>" +
          "<p>Hyvor only trusts the public site domain, so the comments are hidden in this local preview. On the live site, residents post and reply in this exact panel.</p>" +
          '<a class="sh-button sh-button--paper" href="' + room.href + '">Open the fallback room <span>→</span></a>' +
        "</div>";
      return;
    }

    var existing = document.querySelector('script[data-sh-hyvor="true"]');
    if (!existing) {
      var script = document.createElement("script");
      script.type = "module";
      script.async = true;
      script.src = "https://talk.hyvor.com/embed/embed.js";
      script.dataset.shHyvor = "true";
      document.head.appendChild(script);
    }

    var comments = document.createElement("hyvor-talk-comments");
    comments.setAttribute("website-id", "15519");
    comments.setAttribute("page-id", room.id);
    mount.innerHTML = "";
    mount.appendChild(comments);
  }

  function openRoom(wing, roomId) {
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

    if (!room.embed) {
      mount.innerHTML =
        '<div class="sh-thread-state">' +
          "<h4>This door goes somewhere specific.</h4>" +
          "<p>" + escapeText(room.description) + " Use the door above to continue without pretending this is a live thread.</p>" +
        "</div>";
      return;
    }

    if (!isResident) {
      mount.innerHTML =
        '<div class="sh-thread-state">' +
          "<h4>The conversation is past this door.</h4>" +
          "<p>Visitors can see what happens in the room. Posting unlocks when your Resident Card is on file.</p>" +
          '<a class="sh-button sh-button--pink" href="/resident-card.html">Get your Resident Card <span>→</span></a>' +
        "</div>";
      return;
    }

    loadHyvor(room, mount);
  }

  function openWing(wing, focusPanel) {
    var panel = document.getElementById("shWingRoom");
    var rooms = roomData[wing] || [];
    if (!panel || !rooms.length) return;

    document.querySelectorAll(".sh-wing-key").forEach(function (button) {
      button.setAttribute("aria-expanded", button.dataset.wing === wing ? "true" : "false");
    });

    panel.hidden = false;
    panel.dataset.wing = wing;
    renderDirectory(wing);
    openRoom(wing, rooms[0].id);

    if (focusPanel) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function bind() {
    readResident();
    updateArrival();

    document.querySelectorAll(".sh-wing-key").forEach(function (button) {
      button.addEventListener("click", function () {
        openWing(button.dataset.wing, true);
      });
    });

    openWing("common", false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
