/* ============================================================================
   Dream Phone — THE GAME (deduction track)
   ---------------------------------------------------------------------------
   Loaded AFTER ../script.js on games/dream-phone.html. Classic scripts share
   the page's global scope, so this file can read/extend script.js globals
   (unlockSecretBadge, hiddenMeritBadges, dreamPhoneSecretBadges) when present,
   and degrades gracefully when they are not.

   This file owns its own DOM subtree (#dpGame*) and its own trait data. It does
   NOT touch script.js's Just Call engine — that stays wired by script.js.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- v4 trait table (LOCKED — Ali's canon) -------------------------------
     Energy stored as a key; the saint name is a subtitle only and never used
     in clue text (clues are description-led). */
  var TRAITS = {
    mentor:     { beat: "career",          energy: "warm-direct", drink: "Classic",    accessory: "Tamagotchi",      favourite: "The Grimoire" },
    bestie:     { beat: "drama",           energy: "warm-direct", drink: "Bubble",     accessory: "Tamagotchi",      favourite: "Mme CLAi-O" },
    boundary:   { beat: "drama",           energy: "exacting",    drink: "Citrus",     accessory: "Caboodle",        favourite: "Happy Hour" },
    receipts:   { beat: "drama",           energy: "evidence",    drink: "Citrus",     accessory: "Butterfly clips", favourite: "Hot Goss" },
    hype:       { beat: "confidence",      energy: "style",       drink: "Bubble",     accessory: "Lip Smackers",    favourite: "DJ Booth" },
    steady:     { beat: "career",          energy: "warm-direct", drink: "After Dark", accessory: "Tamagotchi",      favourite: "Happy Hour" },
    strategist: { beat: "career",          energy: "exec-clean",  drink: "Classic",    accessory: "Caboodle",        favourite: "The Quiz" },
    bigbro:     { beat: "confidence",      energy: "bold",        drink: "After Dark", accessory: "NO FEAR tee",     favourite: "Mme CLAi-O" },
    wildcard:   { beat: "ai",              energy: "style",       drink: "Bubble",     accessory: "Dance Mix CD",    favourite: "Mme CLAi-O" },
    creative:   { beat: "confidence",      energy: "bold",        drink: "Bubble",     accessory: "Dance Mix CD",    favourite: "DJ Booth" },
    research:   { beat: "ai",              energy: "evidence",    drink: "Citrus",     accessory: "Dance Mix CD",    favourite: "The Grimoire" },
    aihelp:     { beat: "ai",              energy: "bold",        drink: "After Dark", accessory: "Caboodle",        favourite: "The Grimoire" },
    boss:       { beat: "leadership/ops",  energy: "exec-clean",  drink: "Classic",    accessory: "NO FEAR tee",     favourite: "The Quiz" },
    coach:      { beat: "confidence",      energy: "warm-direct", drink: "Bubble",     accessory: "Tamagotchi",      favourite: "The Quiz" },
    operator:   { beat: "leadership/ops",  energy: "exacting",    drink: "Citrus",     accessory: "Caboodle",        favourite: "Happy Hour" },
    counsel:    { beat: "drama",           energy: "wise",        drink: "Classic",    accessory: "Butterfly clips", favourite: "The Grimoire" },
    finance:    { beat: "voice/evidence",  energy: "exacting",    drink: "After Dark", accessory: "Butterfly clips", favourite: "Hot Goss" },
    product:    { beat: "leadership/ops",  energy: "exacting",    drink: "After Dark", accessory: "Dance Mix CD",    favourite: "The Quiz" },
    comms:      { beat: "voice/evidence",  energy: "style",       drink: "Bubble",     accessory: "Lip Smackers",    favourite: "DJ Booth" },
    data:       { beat: "voice/evidence",  energy: "evidence",    drink: "Citrus",     accessory: "Butterfly clips", favourite: "Hot Goss" },
    founder:    { beat: "leadership/ops",  energy: "wise",        drink: "Classic",    accessory: "Lip Smackers",    favourite: "Hot Goss" },
    sponsor:    { beat: "career",          energy: "wise",        drink: "Classic",    accessory: "Lip Smackers",    favourite: "Mme CLAi-O" },
    builder:    { beat: "ai",              energy: "bold",        drink: "After Dark", accessory: "NO FEAR tee",     favourite: "DJ Booth" },
    closer:     { beat: "voice/evidence",  energy: "exec-clean",  drink: "Citrus",     accessory: "NO FEAR tee",     favourite: "Happy Hour" }
  };

  /* Display + dial + portrait. Order = board order (table #1..#24). */
  var CALLERS = [
    { key: "mentor",     name: "Mentor",     number: "555-1995", img: "../assets/dream-phone-mentor.webp" },
    { key: "bestie",     name: "Bestie",     number: "555-2001", img: "../assets/dream-phone-bestie.webp" },
    { key: "boundary",   name: "Boundary",   number: "555-2003", img: "../assets/dream-phone-boundary.webp" },
    { key: "receipts",   name: "Receipts",   number: "555-2004", img: "../assets/dream-phone-receipts.webp" },
    { key: "hype",       name: "Hype",       number: "555-2007", img: "../assets/dream-phone-hype.webp" },
    { key: "steady",     name: "Steady",     number: "555-2008", img: "../assets/dream-phone-steady.webp" },
    { key: "strategist", name: "Strategist", number: "555-1999", img: "../assets/dream-phone-strategist.webp" },
    { key: "bigbro",     name: "Big Bro",    number: "555-2010", img: "../assets/dream-phone-bigbro.webp" },
    { key: "wildcard",   name: "Wildcard",   number: "555-2013", img: "../assets/dream-phone-wildcard.webp" },
    { key: "creative",   name: "Creative",   number: "555-2016", img: "../assets/dream-phone-creative.webp" },
    { key: "research",   name: "Research",   number: "555-2024", img: "../assets/dream-phone-research.webp" },
    { key: "aihelp",     name: "AI Help",    number: "555-2026", img: "../assets/dream-phone-ai-help.webp" },
    { key: "boss",       name: "Boss",       number: "555-2027", img: "../assets/dream-phone-boss-ali.webp" },
    { key: "coach",      name: "Coach",      number: "555-2028", img: "../assets/dream-phone-coach.jpg" },
    { key: "operator",   name: "Operator",   number: "555-2029", img: "../assets/dream-phone-operator.jpg" },
    { key: "counsel",    name: "Counsel",    number: "555-2030", img: "../assets/dream-phone-counsel.jpg" },
    { key: "finance",    name: "Finance",    number: "555-2031", img: "../assets/dream-phone-finance.jpg" },
    { key: "product",    name: "Product",    number: "555-2032", img: "../assets/dream-phone-product.jpg" },
    { key: "comms",      name: "Comms",      number: "555-2033", img: "../assets/dream-phone-comms.jpg" },
    { key: "data",       name: "Data",       number: "555-2034", img: "../assets/dream-phone-data.jpg" },
    { key: "founder",    name: "Founder",    number: "555-2035", img: "../assets/dream-phone-founder.jpg" },
    { key: "sponsor",    name: "Sponsor",    number: "555-2036", img: "../assets/dream-phone-sponsor.jpg" },
    { key: "builder",    name: "Builder",    number: "555-2037", img: "../assets/dream-phone-builder.jpg" },
    { key: "closer",     name: "Closer",     number: "555-2038", img: "../assets/dream-phone-closer.jpg" }
  ];
  var META = {};
  CALLERS.forEach(function (c) { META[c.key] = c; });

  var AXES = ["beat", "energy", "drink", "accessory", "favourite"];
  var AXIS_VALUES = {
    beat: ["career", "drama", "confidence", "ai", "leadership/ops", "voice/evidence"],
    energy: ["warm-direct", "exec-clean", "evidence", "style", "wise", "exacting", "bold"],
    drink: ["Bubble", "Citrus", "Classic", "After Dark"],
    accessory: ["Tamagotchi", "Caboodle", "Butterfly clips", "Lip Smackers", "NO FEAR tee", "Dance Mix CD"],
    favourite: ["Hot Goss", "The Grimoire", "The Quiz", "DJ Booth", "Happy Hour", "Mme CLAi-O"]
  };

  var ENERGY_DISPLAY = { "warm-direct": "warm & direct", "exec-clean": "executive-clean", evidence: "evidence-backed", style: "style-first", wise: "wise & brief", exacting: "exacting", bold: "bold & brave" };
  var BEAT_DISPLAY = { career: "career", drama: "drama", confidence: "confidence", ai: "AI", "leadership/ops": "leadership & ops", "voice/evidence": "voice & evidence" };
  var DRINK_PHRASE = { Bubble: "a Bubble", Citrus: "a Citrus", Classic: "a Classic", "After Dark": "an After Dark" };
  var ACC_PHRASE = { Tamagotchi: "a Tamagotchi", Caboodle: "a Caboodle", "Butterfly clips": "Butterfly clips", "Lip Smackers": "Lip Smackers", "NO FEAR tee": "a NO FEAR tee", "Dance Mix CD": "a Dance Mix CD" };

  var FAVOURITE_LINK = {
    "Hot Goss":     { url: "../hot-goss.html",                    blurb: "the Hot Goss" },
    "The Grimoire": { url: "../grimoire.html",                    blurb: "the Grimoire" },
    "The Quiz":     { url: "../learn/quiz.html",                  blurb: "the Quiz" },
    "DJ Booth":     { url: "../games/dj-booth.html",              blurb: "the DJ Booth" },
    "Happy Hour":   { url: "../games/businesswomens-special.html", blurb: "Happy Hour" },
    "Mme CLAi-O":   { url: "../games/madame-claio.html",          blurb: "Mme CLAi-O" }
  };

  var PREFIXES = ["Pssst —", "Okay, between us:", "Word on the line:", "Heard it straight:", "Don't say I told you, but"];
  var DUDS = [
    "“Ha ha — not telling!” *click*",
    "She just giggled and hung up. Rude. Helpful? No.",
    "Static, a laugh, and a dial tone. Nothing this round.",
    "“Nice try.” Wrong number for gossip today."
  ];

  /* ---- helpers ----------------------------------------------------------- */
  function rand(n) { return Math.floor(Math.random() * n); }
  function pick(arr) { return arr[rand(arr.length)]; }
  function digitsOf(s) { return String(s || "").replace(/\D/g, ""); }
  function clueValueText(axis, value) {
    if (axis === "beat") return "Her beat isn't " + BEAT_DISPLAY[value] + ".";
    if (axis === "energy") return "Her energy isn't " + ENERGY_DISPLAY[value] + ".";
    if (axis === "drink") return "Her drink order isn't " + DRINK_PHRASE[value] + ".";
    if (axis === "accessory") return "She isn't carrying " + ACC_PHRASE[value] + ".";
    return "Her favourite corner isn't " + value + ".";
  }

  /* ---- one-time validation (balance + uniqueness) ------------------------ */
  function validateTable() {
    var seen = {}, dupes = [];
    CALLERS.forEach(function (c) {
      var t = TRAITS[c.key];
      var sig = [t.beat, t.energy, t.drink, t.accessory, t.favourite].join("|");
      if (seen[sig]) dupes.push(c.key + " == " + seen[sig]); else seen[sig] = c.key;
    });
    if (dupes.length) console.warn("[DreamPhone] NON-UNIQUE callers:", dupes);
    AXES.forEach(function (axis) {
      var counts = {};
      CALLERS.forEach(function (c) { var v = TRAITS[c.key][axis]; counts[v] = (counts[v] || 0) + 1; });
      var vals = Object.keys(counts).map(function (k) { return counts[k]; });
      var min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
      if (max - min > 1) console.warn("[DreamPhone] axis '" + axis + "' uneven:", counts);
    });
    if (!dupes.length) console.log("[DreamPhone] trait table OK — " + CALLERS.length + " unique callers across " + AXES.length + " axes.");
    return !dupes.length;
  }

  /* ---- game state -------------------------------------------------------- */
  var S = null; // current game

  function newGame(mode) {
    var lineup = CALLERS.map(function (c) { return c.key; });
    if (mode === "quick") {
      // supporter + 11 random others
      var supporterKey = pick(lineup);
      var others = lineup.filter(function (k) { return k !== supporterKey; });
      // shuffle others
      for (var i = others.length - 1; i > 0; i--) { var j = rand(i + 1); var tmp = others[i]; others[i] = others[j]; others[j] = tmp; }
      lineup = [supporterKey].concat(others.slice(0, 11));
      // keep board order stable by table order
      lineup.sort(function (a, b) { return CALLERS.findIndex(function (c) { return c.key === a; }) - CALLERS.findIndex(function (c) { return c.key === b; }); });
      S = { mode: mode, lineup: lineup, supporter: supporterKey };
    } else {
      S = { mode: "full", lineup: lineup, supporter: pick(lineup) };
    }
    S.active = {}; lineup.forEach(function (k) { S.active[k] = true; });
    S.clues = [];          // {axis, value, text} given
    S.givenSet = {};       // axis|value -> true
    S.calls = 0;
    S.duds = 0;
    S.lastWasDud = false;
    S.wrongAccusations = 0;
    S.solveMode = false;
    S.powersUsed = {};     // secret/speaker/hangup -> true
    S.over = false;
    // solvability guarantee: every non-supporter differs from supporter on >=1 axis.
    validateSolvable();
    buildBoard();
    render();
    setOutput("New line open. Someone in this list is secretly in your corner. Dial around — every call rules someone out. Deduce her, then Solve.");
  }

  function validateSolvable() {
    var sup = TRAITS[S.supporter];
    var bad = [];
    S.lineup.forEach(function (k) {
      if (k === S.supporter) return;
      var diff = AXES.some(function (a) { return TRAITS[k][a] !== sup[a]; });
      if (!diff) bad.push(k);
    });
    if (bad.length) console.warn("[DreamPhone] UNSOLVABLE — indistinguishable from supporter:", bad);
  }

  function activeKeys() { return S.lineup.filter(function (k) { return S.active[k]; }); }
  function activeNonSupporters() { return activeKeys().filter(function (k) { return k !== S.supporter; }); }

  /* ---- clue engine: a true NEGATIVE about the supporter that still cuts ---
     someone currently active. (Clue is about the supporter, not the dialed
     caller, so calling the supporter herself never gives a tell.) */
  function candidateClues() {
    var sup = TRAITS[S.supporter];
    var out = [];
    AXES.forEach(function (axis) {
      AXIS_VALUES[axis].forEach(function (value) {
        if (value === sup[axis]) return;            // must be a true negative
        if (S.givenSet[axis + "|" + value]) return; // not already said
        var cuts = activeNonSupporters().filter(function (k) { return TRAITS[k][axis] === value; });
        if (cuts.length) out.push({ axis: axis, value: value, cuts: cuts });
      });
    });
    return out;
  }

  function applyClue(c) {
    S.givenSet[c.axis + "|" + c.value] = true;
    var text = clueValueText(c.axis, c.value);
    S.clues.push({ axis: c.axis, value: c.value, text: text });
    c.cuts.forEach(function (k) { S.active[k] = false; });
    return text;
  }

  function makeCall() {
    if (S.over) return;
    if (S.solveMode) { setOutput("You're in Solve mode — tap the caller you've deduced, or switch back to Calling to gather more clues."); return; }
    var remaining = activeNonSupporters();
    if (!remaining.length) {
      setOutput("Everyone else is crossed off. Only one name left standing — hit Solve and call her.");
      return;
    }
    S.calls++;
    var forceClue = S.pendingSecret || S.pendingSpeaker;

    // dud (capped ~1 in 5, never twice in a row, never when a special forces a clue)
    if (!forceClue && !S.lastWasDud && (S.duds / Math.max(S.calls, 1)) < 0.2 && Math.random() < 0.22) {
      S.duds++; S.lastWasDud = true;
      setOutput(pick(DUDS));
      render();
      return;
    }
    S.lastWasDud = false;

    var cands = candidateClues();
    if (!cands.length) { setOutput("That's everything worth knowing — only one name fits now. Solve when ready."); render(); return; }

    if (S.pendingSpeaker) {
      // Speaker phone: two clues on different axes when possible
      S.pendingSpeaker = false; S.pendingSecret = false;
      var first = pick(cands);
      var t1 = applyClue(first);
      var rest = candidateClues().filter(function (c) { return c.axis !== first.axis; });
      if (rest.length) {
        var t2 = applyClue(pick(rest));
        setOutput("📢 On speaker, for the whole room: " + t1 + " And: " + t2);
      } else {
        setOutput("📢 On speaker: " + t1);
      }
      render();
      return;
    }

    if (S.pendingSecret) {
      S.pendingSecret = false;
      var ts = applyClue(pick(cands));
      setOutput("🤫 Guaranteed secret: " + ts);
      render();
      return;
    }

    var c = pick(cands);
    var text = applyClue(c);
    setOutput(pick(PREFIXES) + " " + text);
    render();
  }

  /* ---- specials as power-ups -------------------------------------------- */
  function usePower(key) {
    if (S.over) return;
    if (S.powersUsed[key]) { setOutput("That remix card's already been pulled this game."); return; }
    S.powersUsed[key] = true;
    if (key === "speaker") { S.pendingSpeaker = true; setOutput("Speaker Phone is up. Your next call comes in loud — a double clue for the whole room."); }
    else if (key === "secret") { S.pendingSecret = true; setOutput("Share a Secret is pulled. Your next call is a guaranteed clue — no duds."); }
    else if (key === "hangup") {
      // Mom says hang up: dodge a wasted turn -> free elimination of one active non-supporter
      var remaining = activeNonSupporters();
      if (remaining.length) {
        var victim = pick(remaining);
        S.active[victim] = false;
        setOutput("☎️ Mom grabbed the phone: “Not " + META[victim].name + ", trust me.” *click* — one less to worry about.");
      } else {
        setOutput("Mom says hang up — but there's only one name left. Go Solve.");
      }
    }
    maybeRemixScholar();
    render();
  }

  function maybeRemixScholar() {
    var count = Object.keys(S.powersUsed).length;
    if (count >= 3) {
      var msg = safeUnlock("remix-scholar", "Dream Phone");
      if (msg) appendOutput("\n\n🎴 Merit badge: Remix Scholar — you played all three remix cards in one game.");
    }
  }

  /* ---- solve / accuse ---------------------------------------------------- */
  function setSolveMode(on) {
    if (S.over) return;
    S.solveMode = on;
    render();
    setOutput(on ? "Solve mode on. Tap the caller you've deduced is secretly in your corner. (Wrong guess just crosses her off — keep going, no penalty.)" : "Back to Calling. Keep dialing for more clues.");
  }

  function accuse(key) {
    if (S.over || !S.active[key]) return;
    if (key === S.supporter) { win(); return; }
    // wrong: cross off, warm line, continue
    S.active[key] = false;
    S.wrongAccusations++;
    setOutput("Not " + META[key].name + " — but now you know one more it's not. Keep dialing. 💛");
    render();
  }

  function win() {
    S.over = true;
    var t = TRAITS[S.supporter];
    var meta = META[S.supporter];
    var link = FAVOURITE_LINK[t.favourite];
    var firstTry = S.wrongAccusations === 0;
    if (firstTry) safeUnlock("cold-read", "Dream Phone");
    showReveal(meta, t, link, firstTry);
    render();
  }

  function justTellMe() {
    if (S.over) return;
    S.over = true;
    var meta = META[S.supporter];
    var t = TRAITS[S.supporter];
    var link = FAVOURITE_LINK[t.favourite];
    showReveal(meta, t, link, false, true);
    render();
  }

  /* ---- 867 easter egg (works in the Game dialer too) --------------------- */
  function tryEasterEgg(digits) {
    if (digits !== "8675309") return false;
    var msg = safeUnlock("867-club", "Dream Phone");
    setOutput("☎️ 867-5309 connected. I like the way you think — you found the secret line." + (msg ? " (867 Club badge unlocked.)" : " (You're already in the 867 Club.)"));
    return true;
  }

  /* ---- bridge to script.js badge system (graceful if absent) ------------- */
  function safeUnlock(badgeId, source) {
    try {
      if (typeof hiddenMeritBadges === "object" && hiddenMeritBadges && typeof unlockSecretBadge === "function") {
        ensureBadgeCatalog();
        return unlockSecretBadge(badgeId, source) || "";
      }
    } catch (e) { /* no-op */ }
    return "";
  }

  // Inject the new Cold Read badge into the runtime catalog + de-park stale copy.
  var catalogPatched = false;
  function ensureBadgeCatalog() {
    if (catalogPatched) return;
    catalogPatched = true;
    try {
      if (typeof hiddenMeritBadges === "object" && hiddenMeritBadges) {
        if (!hiddenMeritBadges["cold-read"]) {
          hiddenMeritBadges["cold-read"] = {
            id: "cold-read",
            title: "Cold Read merit badge",
            sticker: "COLD READ",
            source: "Dream Phone",
            unlockMessage: "Cold Read unlocked. First-try solve, zero wrong numbers. You read the room before the room knew it was being read."
          };
        }
        if (!hiddenMeritBadges["redial-royalty"]) {
          hiddenMeritBadges["redial-royalty"] = {
            id: "redial-royalty",
            title: "Redial Royalty merit badge",
            sticker: "*69",
            source: "Dream Phone",
            unlockMessage: "Redial Royalty unlocked. You *69'd like a true Y2K detective. The last call never stood a chance."
          };
        }
        if (!hiddenMeritBadges["blocked-and-iconic"]) {
          hiddenMeritBadges["blocked-and-iconic"] = {
            id: "blocked-and-iconic",
            title: "Blocked & Iconic merit badge",
            sticker: "*67",
            source: "Dream Phone",
            unlockMessage: "Blocked & Iconic unlocked. Caller ID off, mystique on. Nobody saw you coming."
          };
        }
        if (hiddenMeritBadges["867-club"]) hiddenMeritBadges["867-club"].unlockMessage = "867 Club unlocked. You found the secret Dream Phone line. Pin the sticker and be a little smug in the group chat.";
        if (hiddenMeritBadges["remix-scholar"]) hiddenMeritBadges["remix-scholar"].unlockMessage = "Remix Scholar unlocked. You played all three remix cards in one game. The drama was fully utilised.";
      }
      if (typeof dreamPhoneSecretBadges === "object" && dreamPhoneSecretBadges && dreamPhoneSecretBadges[8675309]) {
        dreamPhoneSecretBadges[8675309].baseMessage = "867-5309 connected. I like the way you think. You found the secret Dream Phone line.";
      }
    } catch (e) { /* no-op */ }
  }

  /* ---- *69 / *67 dial eggs (additive; the image dialer in dream-phone.html
     calls this — engine caller/number/867 logic is untouched). Badges ride the
     same hidden-badge mechanism as 867 Club. Returns { first } so the dialer can
     play the first-time wink. ------------------------------------------------ */
  function dreamPhoneEgg(code) {
    if (code === "*69") return { first: !!safeUnlock("redial-royalty", "Dream Phone") };
    if (code === "*67") return { first: !!safeUnlock("blocked-and-iconic", "Dream Phone") };
    return { first: false };
  }
  if (typeof window !== "undefined") window.dreamPhoneEgg = dreamPhoneEgg;

  /* ===========================  DOM / RENDER  ============================== */
  var el = {};
  function $(id) { return document.getElementById(id); }

  function buildBoard() {
    el.board.innerHTML = "";
    S.lineup.forEach(function (key) {
      var c = META[key];
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dp-suspect";
      btn.setAttribute("data-suspect", key);
      btn.innerHTML =
        '<span class="dp-suspect-photo"><img src="' + c.img + '" alt="' + c.name + '" loading="lazy" ' +
        'onerror="this.style.display=\'none\';this.parentNode.classList.add(\'dp-noimg\');this.parentNode.setAttribute(\'data-initial\',\'' + c.name.charAt(0) + '\')" />' +
        '<span class="dp-cross" aria-hidden="true">✕</span></span>' +
        '<span class="dp-suspect-name">' + c.name + "</span>" +
        '<span class="dp-suspect-num">' + c.number + "</span>";
      btn.addEventListener("click", function () {
        if (S.over) return;
        if (!S.active[key]) return; // crossed off — inert
        if (S.solveMode) accuse(key);
        else { setDialer(c.number); makeCall(); }
      });
      el.board.appendChild(btn);
    });
  }

  function render() {
    if (!S) return;
    // suspects
    Array.prototype.forEach.call(el.board.querySelectorAll(".dp-suspect"), function (btn) {
      var key = btn.getAttribute("data-suspect");
      var out = !S.active[key];
      btn.classList.toggle("is-out", out);
      btn.classList.toggle("is-target", S.solveMode && !out);
    });
    // count
    var left = activeKeys().length;
    el.count.textContent = left + (left === 1 ? " left — that's her!" : " left");
    el.count.classList.toggle("is-close", left <= 3 && left > 1);
    // clue log
    el.clues.innerHTML = "";
    if (!S.clues.length) {
      var li0 = document.createElement("li");
      li0.className = "dp-clue-empty";
      li0.textContent = "No clues yet. Dial a caller to start ruling people out.";
      el.clues.appendChild(li0);
    } else {
      S.clues.forEach(function (cl) {
        var li = document.createElement("li");
        li.textContent = cl.text;
        el.clues.appendChild(li);
      });
    }
    // power buttons
    Array.prototype.forEach.call(el.powers.querySelectorAll("[data-power]"), function (b) {
      b.classList.toggle("is-spent", !!S.powersUsed[b.getAttribute("data-power")]);
      b.disabled = !!S.powersUsed[b.getAttribute("data-power")] || S.over;
    });
    // solve toggle label
    el.solveToggle.textContent = S.solveMode ? "← Back to Calling" : "I'm ready to Solve";
    el.solveToggle.classList.toggle("is-active", S.solveMode);
    el.game.classList.toggle("dp-solving", S.solveMode);
  }

  function showReveal(meta, t, link, firstTry, gaveUp) {
    var html = '<div class="dp-reveal-card">' +
      '<img class="dp-reveal-photo" src="' + meta.img + '" alt="' + meta.name + '" ' +
      'onerror="this.style.display=\'none\'" />' +
      '<p class="dp-reveal-kicker">' + (gaveUp ? "Your Secret Supporter was…" : "You found her.") + '</p>' +
      '<h3 class="dp-reveal-name">' + meta.name + "</h3>" +
      '<p class="dp-reveal-line">Secretly in your corner this week — ' +
        ENERGY_DISPLAY[t.energy] + ", " + BEAT_DISPLAY[t.beat] + " energy, " +
        ACC_PHRASE[t.accessory] + " in her bag.</p>" +
      (firstTry ? '<p class="dp-reveal-badge">🎯 Cold Read badge unlocked — first-try solve, zero wrong numbers.</p>' : "") +
      '<a class="dp-reveal-cta" href="' + link.url + '">"You found me. Now go see why I live in ' + link.blurb + '" →</a>' +
      '<div class="dp-reveal-actions"><button type="button" class="dp-btn" id="dpPlayAgain">Play again</button></div>' +
      "</div>";
    el.reveal.innerHTML = html;
    el.reveal.hidden = false;
    var again = $("dpPlayAgain");
    if (again) again.addEventListener("click", function () { el.reveal.hidden = true; newGame(S.mode); });
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
    if (section === "game" && !S) newGame("full");
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
    el.solveToggle = $("dpSolveToggle");
    if (!el.entry || !el.game || !el.board) { console.warn("[DreamPhone] game DOM not found; skipping init."); return; }

    validateTable();

    // two-door
    var doorGame = $("dpDoorGame"); if (doorGame) doorGame.addEventListener("click", function () { show("game"); });
    var doorCall = $("dpDoorCall"); if (doorCall) doorCall.addEventListener("click", function () { show("justcall"); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-dp-back]"), function (b) {
      b.addEventListener("click", function () { show("entry"); });
    });

    // game controls
    var nb = $("dpNewGame"); if (nb) nb.addEventListener("click", function () { el.reveal.hidden = true; newGame(S ? S.mode : "full"); });
    var tellBtn = $("dpJustTellMe"); if (tellBtn) tellBtn.addEventListener("click", justTellMe);
    if (el.solveToggle) el.solveToggle.addEventListener("click", function () { setSolveMode(!S.solveMode); });

    // mode toggle (Full / Quick)
    Array.prototype.forEach.call(document.querySelectorAll("[data-mode]"), function (b) {
      b.addEventListener("click", function () {
        var mode = b.getAttribute("data-mode");
        Array.prototype.forEach.call(document.querySelectorAll("[data-mode]"), function (x) { x.classList.toggle("is-active", x === b); });
        el.reveal.hidden = true;
        newGame(mode);
      });
    });

    // power-ups
    Array.prototype.forEach.call(el.powers.querySelectorAll("[data-power]"), function (b) {
      b.addEventListener("click", function () { usePower(b.getAttribute("data-power")); });
    });

    // game dialer
    var dialBtn = $("dpDialBtn");
    if (dialBtn) dialBtn.addEventListener("click", function () {
      var d = digitsOf(el.dialer.value);
      if (tryEasterEgg(d)) return;
      var hit = CALLERS.filter(function (c) { return digitsOf(c.number) === d; })[0];
      if (!hit) { setOutput("Busy signal — no one on this line has that number."); return; }
      if (!S.active[hit.key] && !S.solveMode) { setOutput(META[hit.key].name + " is already crossed off. Try a name that's still in the running."); return; }
      if (S.solveMode) accuse(hit.key); else makeCall();
    });
    if (el.dialer) el.dialer.addEventListener("keydown", function (e) { if (e.key === "Enter" && dialBtn) dialBtn.click(); });

    // default door state
    show("entry");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
