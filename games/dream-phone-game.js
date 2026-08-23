/* ============================================================================
   Dream Phone — THE GAME (patron-saint deduction track)
   ---------------------------------------------------------------------------
   Loaded AFTER ../script.js on games/dream-phone.html. Classic scripts share
   the page's global scope, so this file can read/extend script.js globals
   (unlockSecretBadge, hiddenMeritBadges, dreamPhoneSecretBadges) when present,
   and degrades gracefully when they are not.

   THE GAME: one of the 12 patron saints is "secretly in your corner" this week.
   You DIAL saints (3-digit extensions). If it's not her, she says "not me" and
   hands you one true clue about the saint who IS — which crosses non-matching
   saints off the board. Dial the right saint and she picks up: you win. Because
   the saints are known characters with VISIBLE traits, the clues are guessable
   and WHO you dial matters. Faithful to the Milton Bradley original.

   This file owns its own DOM subtree (#dpGame*). It does NOT touch script.js's
   Just Call engine.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- The 12 patron saints (roster + canon domains) -----------------------
     Three deduction axes, all canon-true and shown to the player:
       origin  — where you know her from (movie | tv | real | town)
       domain  — her patron power (self | truth | voice | judgment)
       emblem  — her signature energy (glam | fighter | queen | warmth)
     Every (origin, domain, emblem) triple is unique → always solvable.
     ext = 3-digit dial-in (themed; Jenny 867-5309 lives off-board as an egg). */
  var SAINTS = [
    { key: "cher",     name: "Cher Horowitz",       ext: "902", img: "../assets/saints/cher-horowitz.png",       domainLabel: "Making It Yours", origin: "movie", domain: "self",     emblem: "glam",    power: "Take charge of your world — and lift everyone you bring into it." },
    { key: "elle",     name: "Elle Woods",          ext: "411", img: "../assets/saints/elle-woods.png",          domainLabel: "Receipts",        origin: "movie", domain: "truth",    emblem: "fighter", power: "Let them underestimate you — then do the work and prove them wrong." },
    { key: "miranda",  name: "Miranda Priestly",    ext: "100", img: "../assets/saints/miranda-priestly.png",    domainLabel: "Standards",       origin: "movie", domain: "truth",    emblem: "queen",   power: "Never apologize for holding the bar high." },
    { key: "regina",   name: "Regina George",       ext: "666", img: "../assets/saints/regina-george.png",       domainLabel: "The Cautionary Tale", origin: "movie", domain: "judgment", emblem: "queen", power: "Real power lifts people up — it doesn't keep a Burn Book." },
    { key: "mary",     name: "Sister Mary Clarence", ext: "777", img: "../assets/saints/sister-mary-clarence.png", domainLabel: "Teaching",       origin: "movie", domain: "voice",    emblem: "warmth",  power: "Meet people where they are, and bring out the best in them." },
    { key: "buffy",    name: "Buffy Summers",       ext: "007", img: "../assets/saints/buffy-summers.png",       domainLabel: "SLAiYING",        origin: "tv",    domain: "self",     emblem: "fighter", power: "You're braver than the thing you're scared of. Do it anyway." },
    { key: "samantha", name: "Samantha Jones",      ext: "212", img: "../assets/saints/samantha-jones.png",      domainLabel: "Orientation",     origin: "tv",    domain: "self",     emblem: "glam",    power: "Walk into any room like you belong — because you do." },
    { key: "david",    name: "David Rose",          ext: "143", img: "../assets/saints/david-rose.png",          domainLabel: "Specificity",     origin: "tv",    domain: "voice",    emblem: "fighter", power: "Know exactly what you want — and never apologize for asking for it." },
    { key: "dolly",    name: "Dolly Parton",        ext: "905", img: "../assets/saints/dolly-parton.png",        domainLabel: "Common Sense",    origin: "real",  domain: "truth",    emblem: "warmth",  power: "Know exactly who you are, and do it on purpose." },
    { key: "oprah",    name: "Oprah Winfrey",       ext: "001", img: "../assets/saints/oprah-winfrey.png",       domainLabel: "Staying Current", origin: "real",  domain: "judgment", emblem: "queen",   power: "Stay curious — and lift others as you rise." },
    { key: "jlo",      name: "Jennifer Lopez",      ext: "646", img: "../assets/saints/jennifer-lopez.png",      domainLabel: "Range",           origin: "real",  domain: "voice",    emblem: "glam",    power: "You were never meant to be just one thing." },
    { key: "deb",      name: "Deb",                 ext: "000", img: "../assets/saints/deb.png",                 domainLabel: "NOPE",            origin: "town",  domain: "judgment", emblem: "warmth",  power: "“No” is a complete sentence. Protect your time and your peace." }
  ];
  var META = {};
  SAINTS.forEach(function (s) { META[s.key] = s; });

  var AXES = ["origin", "domain", "emblem"];

  /* Player-facing labels + gossip phrasing for every trait value. */
  var VALUE = {
    origin: {
      movie: { chip: "Big screen",   is: "a big-screen icon",          isnt: "no movie star" },
      tv:    { chip: "TV",           is: "on your TV every week",      isnt: "not a TV girl" },
      real:  { chip: "The real deal", is: "the real deal, no script",  isnt: "not a real-life icon" },
      town:  { chip: "SUNNYVAiLE",   is: "SUNNYVAiLE's very own",       isnt: "not a local" }
    },
    domain: {
      self:     { chip: "Confidence", is: "all about owning the room",       isnt: "not the walk-in-like-you-own-it type" },
      truth:    { chip: "Receipts",   is: "a receipts-and-standards girl",   isnt: "not a receipts girl" },
      voice:    { chip: "Voice",      is: "about saying exactly what she means", isnt: "not the say-it-plainly type" },
      judgment: { chip: "Judgment",   is: "about knowing what's worth her time", isnt: "not the gatekeeper type" }
    },
    emblem: {
      glam:    { chip: "Glam",     is: "pure sparkle — glam to the bone",   isnt: "not the glam type" },
      fighter: { chip: "Fighter",  is: "underdog energy — counted out, then wins", isnt: "no underdog" },
      queen:   { chip: "Queen",    is: "a total boss — runs the room",       isnt: "no boss-queen" },
      warmth:  { chip: "Warmth",   is: "heart of gold — leads with warmth",  isnt: "not the soft-warm type" }
    }
  };

  var PREFIXES = ["It's not me 💅", "Ha — not me, but between us:", "Wrong number, hon. Still,", "Not me! But here's the tea:"];

  /* ---- helpers ----------------------------------------------------------- */
  function rand(n) { return Math.floor(Math.random() * n); }
  function pick(arr) { return arr[rand(arr.length)]; }
  function digitsOf(s) { return String(s || "").replace(/\D/g, ""); }

  // Star/short codes still pull their old tricks from the GAME dialer too —
  // caught on the RAW value before digitsOf() strips the "*". (The booth's
  // image dialer routes to the same badges via window.dreamPhoneEgg.)
  function starCode(raw) {
    var t = String(raw || "").trim().replace(/\s+/g, "");
    if (t === "*67" || t === "*69" || t === "867") return t;
    return null;
  }
  // Star codes are hidden one-per-game perks with a real in-game effect, not
  // just a badge wink — each maps to what the code actually does on a phone.
  function playStarCode(code) {
    var res = (typeof dreamPhoneEgg === "function") ? dreamPhoneEgg(code) : { first: false };
    var badge = res && res.first ? " (Badge unlocked!)" : "";

    // 867 is Jenny's line — a wink, not a game move.
    if (code === "867") { setOutput("☎️ 867 — you know the line. Jenny says hey." + badge); return; }

    if (!S || S.over) { setOutput("☎️ " + code + " connects — but there's no game running for it to work on." + badge); return; }
    if (S.starUsed[code]) { setOutput("You already worked " + code + " this game — that trick's one per line." + badge); return; }
    if (code === "*69" && S.calls === 0) { setOutput("☎️ *69 returns your last call — but you haven't dialed anyone yet. Call a saint first."); return; }

    S.starUsed[code] = true;
    var c = bestSecretClue(null);
    if (!c) { setOutput("☎️ " + code + " — but the board's already narrow. Trust what you've got." + badge); render(); return; }
    var r = applyClue(c.axis, c.value, true);
    // Neither star code counts as a dial (no S.calls++), so both help Cold Read.
    if (code === "*67") setOutput("☎️ *67 — caller ID off, so she spills freely: " + r.text + " Blocked & Iconic." + badge);
    else setOutput("☎️ *69 — you call the last number back and she cracks: " + r.text + " Redial Royalty." + badge);
    render();
  }

  /* ---- one-time validation (uniqueness) ---------------------------------- */
  function validateTable() {
    var seen = {}, dupes = [];
    SAINTS.forEach(function (s) {
      var sig = [s.origin, s.domain, s.emblem].join("|");
      if (seen[sig]) dupes.push(s.key + " == " + seen[sig]); else seen[sig] = s.key;
    });
    if (dupes.length) console.warn("[DreamPhone] NON-UNIQUE saints:", dupes);
    else console.log("[DreamPhone] saint table OK — " + SAINTS.length + " unique across " + AXES.length + " axes.");
    return !dupes.length;
  }

  /* ---- game state -------------------------------------------------------- */
  var S = null;

  function newGame() {
    var lineup = SAINTS.map(function (s) { return s.key; });
    S = {
      lineup: lineup,
      supporter: pick(lineup),
      active: {},
      clues: [],       // {axis, value, positive, text}
      givenSet: {},    // "axis|value|pol" -> true (avoid repeating a clue)
      calls: 0,        // dials at a saint
      wrongCalls: 0,   // dials at a non-supporter
      powersUsed: {},  // secret/speaker/hangup
      starUsed: {},    // *67/*69 — one perk each per game
      pending: null,   // queued power effect for the next action
      over: false
    };
    lineup.forEach(function (k) { S.active[k] = true; });
    buildBoard();
    render();
    setOutput("New line open. One of your girls is secretly in your corner this week. Dial around — every wrong number hands you a clue. Match the tea to the traits on the board, then dial the right saint.");
  }

  function activeKeys() { return S.lineup.filter(function (k) { return S.active[k]; }); }
  function activeExcept(key) { return activeKeys().filter(function (k) { return k !== key; }); }

  /* ---- clue application -------------------------------------------------- */
  // A clue is a true statement about the supporter on one axis.
  //   positive: "she IS <value>"  -> cross off active saints whose axis != value
  //   negative: "she is NOT <value>" -> cross off active saints whose axis == value
  function clueText(axis, value, positive) {
    var v = VALUE[axis][value];
    return positive ? ("she's " + v.is + ".") : ("she's " + v.isnt + ".");
  }

  function clueCut(axis, value, positive) {
    // saints (excluding supporter, excluding already-out) this clue removes
    return activeKeys().filter(function (k) {
      if (k === S.supporter) return false;
      var match = META[k][axis] === value;
      return positive ? !match : match;
    });
  }

  function applyClue(axis, value, positive) {
    S.givenSet[axis + "|" + value + "|" + (positive ? 1 : 0)] = true;
    var cut = clueCut(axis, value, positive);
    cut.forEach(function (k) { S.active[k] = false; });
    var text = clueText(axis, value, positive);
    S.clues.push({ axis: axis, value: value, positive: positive, text: text });
    return { text: text, cut: cut.length };
  }

  // Best fresh POSITIVE clue about an axis the player hasn't pinned yet
  // (used by Share a Secret / Speaker Phone). Returns null if none informative.
  function bestSecretClue(excludeAxis) {
    var sup = META[S.supporter];
    var best = null;
    AXES.forEach(function (axis) {
      if (axis === excludeAxis) return;
      var value = sup[axis];
      if (S.givenSet[axis + "|" + value + "|1"]) return;
      var cut = clueCut(axis, value, true).length;
      if (cut > 0 && (!best || cut > best.cut)) best = { axis: axis, value: value, cut: cut };
    });
    return best;
  }

  // The clue a specific caller X hands you: compare X to the supporter.
  // Prefer the shared-axis positive that cuts the most; else a negative on an
  // axis where X differs. Returns null if X can tell you nothing new.
  function callerClue(xKey) {
    var x = META[xKey], sup = META[S.supporter];
    var best = null;
    AXES.forEach(function (axis) {
      var xv = x[axis], sv = sup[axis];
      var positive = xv === sv;
      var value = xv;
      if (S.givenSet[axis + "|" + value + "|" + (positive ? 1 : 0)]) return;
      var cut = clueCut(axis, value, positive).length;
      if (cut > 0 && (!best || cut > best.cut)) best = { axis: axis, value: value, positive: positive, cut: cut };
    });
    return best;
  }

  /* ---- calling a saint --------------------------------------------------- */
  function callSaint(key) {
    if (S.over || !S.active[key]) return;
    S.calls++;

    if (key === S.supporter) { win(); return; }

    // Wrong number: she declines, crosses herself off, and drops a clue.
    S.wrongCalls++;
    S.active[key] = false;
    var lead = pick(PREFIXES);

    // A queued remix effect fires now if present.
    if (S.pending === "secret" || S.pending === "speaker") {
      var double = S.pending === "speaker";
      S.pending = null;
      var c1 = bestSecretClue(null);
      if (c1) {
        var r1 = applyClue(c1.axis, c1.value, true);
        if (double) {
          var c2 = bestSecretClue(c1.axis);
          if (c2) { var r2 = applyClue(c2.axis, c2.value, true); setOutput("📢 " + META[key].name + " puts you on speaker for the whole room: " + r1.text + " And — " + r2.text); render(); return; }
        }
        setOutput("🤫 " + META[key].name + " leans in with a guaranteed secret: " + r1.text); render(); return;
      }
    }

    var clue = callerClue(key);
    if (clue) {
      var r = applyClue(clue.axis, clue.value, clue.positive);
      setOutput(lead + " " + r.text);
    } else {
      setOutput(lead + " honestly, she's nothing like me — that's all I've got. One less name, though.");
    }
    render();
  }

  /* ---- remix cards (power-ups) ------------------------------------------- */
  function usePower(key) {
    if (S.over) return;
    if (S.powersUsed[key]) { setOutput("That remix card's already been pulled this game."); return; }
    S.powersUsed[key] = true;

    if (key === "hangup") {
      var remaining = activeExcept(S.supporter);
      if (remaining.length) {
        var victim = pick(remaining);
        S.active[victim] = false;
        setOutput("☎️ Mom grabs the phone: “Not " + META[victim].name + ", trust me.” *click* — one less to worry about.");
      } else {
        setOutput("Mom says hang up — but there's only one name left. Dial her!");
      }
    } else if (key === "secret") {
      var c = bestSecretClue(null);
      if (c) { var r = applyClue(c.axis, c.value, true); setOutput("🤫 Share a Secret: " + r.text); }
      else { setOutput("🤫 Share a Secret — but the board's already narrow. Trust what you've got."); }
    } else if (key === "speaker") {
      var a = bestSecretClue(null);
      if (a) {
        var ra = applyClue(a.axis, a.value, true);
        var b = bestSecretClue(a.axis);
        if (b) { var rb = applyClue(b.axis, b.value, true); setOutput("📢 Speaker Phone, for the whole room: " + ra.text + " And — " + rb.text); }
        else { setOutput("📢 Speaker Phone: " + ra.text); }
      } else { setOutput("📢 Speaker Phone — nothing new to broadcast. You're close."); }
    }
    maybeRemixScholar();
    render();
  }

  function maybeRemixScholar() {
    if (Object.keys(S.powersUsed).length >= 3) {
      var msg = safeUnlock("remix-scholar", "Dream Phone");
      if (msg) appendOutput("\n\n🎴 Merit badge: Remix Scholar — you used all three remix cards in one game.");
    }
  }

  /* ---- win / give up ----------------------------------------------------- */
  function win() {
    S.over = true;
    var meta = META[S.supporter];
    // Cold Read: found her in four dials or fewer (a real deduction, not a slog).
    var coldRead = S.calls <= 4;
    if (coldRead) safeUnlock("cold-read", "Dream Phone");
    showReveal(meta, coldRead, false);
    render();
  }

  function justTellMe() {
    if (S.over) return;
    S.over = true;
    showReveal(META[S.supporter], false, true);
    render();
  }

  /* ---- 867 easter egg (works in the Game dialer too) --------------------- */
  function tryEasterEgg(digits) {
    if (digits !== "8675309") return false;
    var msg = safeUnlock("867-club", "Dream Phone");
    setOutput("☎️ 867-5309 connected. Jenny says hey — you found the secret line." + (msg ? " (867 Club badge unlocked.)" : " (You're already in the 867 Club.)"));
    return true;
  }

  /* ---- bridge to script.js badge system (graceful if absent) ------------- */
  function safeUnlock(badgeId, source) {
    // Discoveries are playful and session-local until an authoritative reward
    // ledger proves grant, sync, restore, and refund behaviour end to end.
    // Do not call the shared local-first badge writer from this experimental game.
    return "";
  }

  var catalogPatched = false;
  function ensureBadgeCatalog() {
    if (catalogPatched) return;
    catalogPatched = true;
    try {
      if (typeof hiddenMeritBadges === "object" && hiddenMeritBadges) {
        if (!hiddenMeritBadges["cold-read"]) {
          hiddenMeritBadges["cold-read"] = { id: "cold-read", title: "Cold Read merit badge", sticker: "COLD READ", source: "Dream Phone", unlockMessage: "Cold Read unlocked. You read the room in four dials flat. Deduction, not luck." };
        }
        if (!hiddenMeritBadges["redial-royalty"]) {
          hiddenMeritBadges["redial-royalty"] = { id: "redial-royalty", title: "Redial Royalty merit badge", sticker: "*69", source: "Dream Phone", unlockMessage: "Redial Royalty unlocked. You *69'd like a true Y2K detective. The last call never stood a chance." };
        }
        if (!hiddenMeritBadges["blocked-and-iconic"]) {
          hiddenMeritBadges["blocked-and-iconic"] = { id: "blocked-and-iconic", title: "Blocked & Iconic merit badge", sticker: "*67", source: "Dream Phone", unlockMessage: "Blocked & Iconic unlocked. Caller ID off, mystique on. Nobody saw you coming." };
        }
        if (!hiddenMeritBadges["deb-unlocked"]) {
          hiddenMeritBadges["deb-unlocked"] = { id: "deb-unlocked", title: "Found Deb merit badge", sticker: "DEB", source: "Dream Phone", unlockMessage: "Found Deb unlocked. You blocked your number, she actually picked up, and she still told you nothing. Iconic, useless, immovable." };
        }
        if (hiddenMeritBadges["867-club"]) hiddenMeritBadges["867-club"].unlockMessage = "867 Club unlocked. You found the secret Dream Phone line. Pin the sticker and be a little smug in the group chat.";
        if (hiddenMeritBadges["remix-scholar"]) hiddenMeritBadges["remix-scholar"].unlockMessage = "Remix Scholar unlocked. You used all three remix cards in one game. The drama was fully utilised.";
      }
      if (typeof dreamPhoneSecretBadges === "object" && dreamPhoneSecretBadges && dreamPhoneSecretBadges[8675309]) {
        dreamPhoneSecretBadges[8675309].baseMessage = "867-5309 connected. I like the way you think. You found the secret Dream Phone line.";
      }
    } catch (e) { /* no-op */ }
  }

  /* ---- *69 / *67 dial eggs (additive; image dialer in dream-phone.html
     calls this). Returns { first } so the dialer can play the first-time wink. */
  function dreamPhoneEgg(code) {
    if (code === "*69") return { first: !!safeUnlock("redial-royalty", "Dream Phone") };
    if (code === "*67") return { first: !!safeUnlock("blocked-and-iconic", "Dream Phone") };
    if (code === "867") return { first: !!safeUnlock("867-club", "Dream Phone") };
    if (code === "deb") return { first: !!safeUnlock("deb-unlocked", "Dream Phone") };
    if (code === "remix-scholar") return { first: !!safeUnlock("remix-scholar", "Dream Phone") };
    return { first: false };
  }
  if (typeof window !== "undefined") window.dreamPhoneEgg = dreamPhoneEgg;

  /* ===========================  DOM / RENDER  ============================== */
  var el = {};
  function $(id) { return document.getElementById(id); }

  function chip(label) { return '<span class="dp-trait">' + label + "</span>"; }

  function buildBoard() {
    el.board.innerHTML = "";
    S.lineup.forEach(function (key) {
      var s = META[key];
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dp-suspect";
      btn.setAttribute("data-suspect", key);
      btn.innerHTML =
        '<span class="dp-suspect-photo"><img src="' + s.img + '" alt="' + s.name + '" loading="lazy" ' +
        'onerror="this.style.display=\'none\';this.parentNode.classList.add(\'dp-noimg\');this.parentNode.setAttribute(\'data-initial\',\'' + s.name.charAt(0) + '\')" />' +
        '<span class="dp-cross" aria-hidden="true">✕</span></span>' +
        '<span class="dp-suspect-name">' + s.name + "</span>" +
        '<span class="dp-suspect-domain">' + s.domainLabel + "</span>" +
        '<span class="dp-suspect-traits">' + chip(VALUE.origin[s.origin].chip) + chip(VALUE.domain[s.domain].chip) + chip(VALUE.emblem[s.emblem].chip) + "</span>" +
        '<span class="dp-suspect-num">ext. ' + s.ext + "</span>";
      btn.addEventListener("click", function () {
        if (S.over || !S.active[key]) return;
        setDialer(s.ext);
        callSaint(key);
      });
      el.board.appendChild(btn);
    });
  }

  function render() {
    if (!S) return;
    Array.prototype.forEach.call(el.board.querySelectorAll(".dp-suspect"), function (btn) {
      var key = btn.getAttribute("data-suspect");
      btn.classList.toggle("is-out", !S.active[key]);
    });
    var left = activeKeys().length;
    if (el.count) {
      el.count.textContent = left + (left === 1 ? " left — that's her!" : " still in the running");
      el.count.classList.toggle("is-close", left <= 3 && left > 1);
    }
    if (el.clues) {
      el.clues.innerHTML = "";
      if (!S.clues.length) {
        var li0 = document.createElement("li");
        li0.className = "dp-clue-empty";
        li0.textContent = "No clues yet. Dial a saint — a wrong number still gives you the tea.";
        el.clues.appendChild(li0);
      } else {
        S.clues.forEach(function (cl) {
          var li = document.createElement("li");
          li.textContent = cl.text.charAt(0).toUpperCase() + cl.text.slice(1);
          el.clues.appendChild(li);
        });
      }
    }
    if (el.powers) {
      Array.prototype.forEach.call(el.powers.querySelectorAll("[data-power]"), function (b) {
        var used = !!S.powersUsed[b.getAttribute("data-power")];
        b.classList.toggle("is-spent", used);
        b.disabled = used || S.over;
      });
    }
  }

  function showReveal(meta, coldRead, gaveUp) {
    var html = '<div class="dp-reveal-card">' +
      '<img class="dp-reveal-photo" src="' + meta.img + '" alt="' + meta.name + '" onerror="this.style.display=\'none\'" />' +
      '<p class="dp-reveal-kicker">' + (gaveUp ? "Secretly in your corner this week…" : "You found her.") + '</p>' +
      '<h3 class="dp-reveal-name">' + meta.name + "</h3>" +
      '<p class="dp-reveal-domain">Patron saint of ' + meta.domainLabel + "</p>" +
      '<p class="dp-reveal-line">“' + meta.power + '”</p>' +
      (coldRead ? '<p class="dp-reveal-badge">🎯 Cold Read badge — four dials flat. Deduction, not luck.</p>' : "") +
      '<div class="dp-reveal-actions"><button type="button" class="dp-btn" id="dpPlayAgain">Try another card</button></div>' +
      "</div>";
    el.reveal.innerHTML = html;
    el.reveal.hidden = false;
    var again = $("dpPlayAgain");
    if (again) again.addEventListener("click", function () { el.reveal.hidden = true; newGame(); });
    el.reveal.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ---- output helpers ---------------------------------------------------- */
  function setOutput(txt) { if (el.output) el.output.textContent = txt; }
  function appendOutput(txt) { if (el.output) el.output.textContent += txt; }
  function setDialer(num) { if (el.dialer) el.dialer.value = num; }

  /* ======================  TWO-DOOR ENTRY + WIRING  ======================= */
  function show(section) {
    el.entry.hidden = section !== "entry";
    el.game.hidden = section !== "game";
    if (el.justcall) el.justcall.hidden = section !== "justcall";
    if (section === "game" && !S) newGame();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function init() {
    el.entry = $("dpEntry");
    el.game = $("dpGame");
    el.justcall = $("dpJustCall");
    el.board = $("dpBoard");
    el.count = $("dpCount");
    el.clues = $("dpClues");
    el.powers = $("dpPowers");
    el.output = $("dpGameOutput");
    el.reveal = $("dpReveal");
    el.dialer = $("dpDialer");
    if (!el.entry || !el.game || !el.board) { console.warn("[DreamPhone] game DOM not found; skipping init."); return; }

    validateTable();

    var doorGame = $("dpDoorGame"); if (doorGame) doorGame.addEventListener("click", function () { show("game"); });
    var doorCall = $("dpDoorCall"); if (doorCall) doorCall.addEventListener("click", function () { show("justcall"); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-dp-back]"), function (b) {
      b.addEventListener("click", function () { show("entry"); });
    });

    var nb = $("dpNewGame"); if (nb) nb.addEventListener("click", function () { if (el.reveal) el.reveal.hidden = true; newGame(); });
    var tellBtn = $("dpJustTellMe"); if (tellBtn) tellBtn.addEventListener("click", justTellMe);

    if (el.powers) {
      Array.prototype.forEach.call(el.powers.querySelectorAll("[data-power]"), function (b) {
        b.addEventListener("click", function () { usePower(b.getAttribute("data-power")); });
      });
    }

    // game dialer — 3-digit extensions (Jenny 8675309 still works as an egg)
    var dialBtn = $("dpDialBtn");
    if (dialBtn) dialBtn.addEventListener("click", function () {
      var star = starCode(el.dialer.value);
      if (star) { playStarCode(star); return; }
      var d = digitsOf(el.dialer.value);
      if (tryEasterEgg(d)) return;
      var hit = SAINTS.filter(function (s) { return s.ext === d; })[0];
      if (!hit) { setOutput("Busy signal — no saint at that extension. Try a 3-digit ext from the board."); return; }
      if (!S.active[hit.key]) { setOutput(META[hit.key].name + " is already crossed off. Try one still in the running."); return; }
      callSaint(hit.key);
    });
    if (el.dialer) el.dialer.addEventListener("keydown", function (e) { if (e.key === "Enter" && dialBtn) dialBtn.click(); });

    show("entry");
  }

  // Test hook (non-DOM): lets a headless harness exercise the pure engine.
  if (typeof window !== "undefined") {
    window.__dpGame = { SAINTS: SAINTS, AXES: AXES, VALUE: VALUE,
      _state: function () { return S; }, _new: newGame, _call: callSaint,
      _star: playStarCode, _starCode: starCode };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
