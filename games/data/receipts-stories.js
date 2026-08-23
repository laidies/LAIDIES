/* ============================================================================
   THE RECEIPTS — 90s/Y2K story bank  (Dream Phone · "Is That Even True?")
   ---------------------------------------------------------------------------
   The AI states a wild 90s/Y2K "fact." The player calls the crew and decides:
   REAL, or did the AI hallucinate it? The joke — and the whole lesson — is that
   the TRUE ones are as unbelievable as the fakes, so you can't tell by vibes.
   You corroborate: real things get told the same way by the people with receipts;
   a hallucination has no source, so the accounts SCATTER.

   ── REAL SUBJECTS, THINGS PEOPLE ACTUALLY KNOW ─────────────────────────────
   Built on real, recognizable 90s/Y2K culture (Furbies, Beanie Babies, Pokémon,
   Tamagotchis, the Y2K bug) — NOT invented town lore and NOT made-up people
   (a fake "Coach Vu" just confuses everyone). No named individuals as subjects
   unless they're already public record (e.g. the real Beanie Baby divorce).

   ── FACT RULE (LOCKED) ──────────────────────────────────────────────────────
   Every REAL claim is verified against a real source, logged in `sources` with
   a `verified` date. Every FAKE is either a documented myth/distortion (cite the
   source that DEBUNKS it) or a clear fabrication. "Not verified beats plausible."
   Re-verify before shipping; add new stories the same way.

   ── THE CREW — SAME SIX EVERY ROUND. Voices MUST stay consistent. ───────────
     🧾 receipts — has the clipping/notice/photo. REAL: produces it. FAKE: "there's
                   no article, no record — and this would've been everywhere."
     📊 data     — the numbers. REAL: the real figure (685 kids, $91,250). FAKE:
                   the real number contradicts the claim.
     🛑 boundary — won't back what she can't. REAL famous fact: "that's real, certain."
                   FAKE: "I'm not confirming that." Her silence ≠ a denial.
     💅 hype     — co-signs EVERYTHING. A lone Hype yes is worthless.
     🙄 skeptic  — doubts EVERYTHING. REAL: grudging "…ugh, fine, it's real."
                   FAKE: flat "no." A lone Skeptic no is worthless.
     🎲 wildcard — garbles it. REAL: fuzzy but same event. FAKE: wrong version.

   REAL = reliable core (Receipts/Data/Boundary) converges on the sourced truth.
   FAKE = no receipt exists / the real numbers contradict / only Hype co-signs.
   HARD = a real event with ONE detail wrong (the AI's classic move). Partially
          true is still false — check the specific.

   Schema: { id, subject, truth:'real'|'fake', difficulty, claim,
             says:{receipts,data,boundary,hype,skeptic,wildcard}, why,
             sources:[{label,url}], verified }
   ========================================================================== */

window.RECEIPTS_STORIES = [

  /* ===== 1 · REAL · Furbies + the NSA =================================== */
  {
    id: "furby-nsa-ban",
    subject: "Furby",
    truth: "real",
    difficulty: "med",
    claim: "The NSA banned Furbies from its headquarters because they were scared the toys were recording and could repeat secret conversations.",
    says: {
      receipts: "I have the '99 Washington Post write-up — NSA put out a “Furby Alert” and banned them from Fort Meade. It's real.",
      data: "Not my usual lane, but this is well-documented: it was Fort Meade, early '99, and a Navy shipyard banned them too.",
      boundary: "The ban happened. I'm sure of that part. Whether a Furby ever actually recorded anything — no, that it never did.",
      hype: "SPY Furbies at the NSA, iconic, I always KNEW those things were listening, so real.",
      skeptic: "The government scared of a toy? Sounds dumb enough to be made up… ugh, but it's documented. Fine, real.",
      wildcard: "Was it the NSA or the CIA? One of the alphabet ones banned them, yeah, that happened."
    },
    why: "Receipts has the <b>Post write-up</b>, Data places it at <b>Fort Meade, early '99.</b> The <em>ban</em> is real — even if the recording fear was nonsense (Hasbro said Furbies can't record). The reliable core converges on the documented event. Real.",
    sources: [
      { label: "Snopes — NASA/NSA Furby ban", url: "https://www.snopes.com/fact-check/nasa-furby-ban/" },
      { label: "Mental Floss — Did the Pentagon really ban Furbys?", url: "https://www.mentalfloss.com/article/55136/did-pentagon-really-ban-furbys" }
    ],
    verified: "2026-07-14"
  },

  /* ===== 2 · FAKE · the Furby myth the ban was based on ================= */
  {
    id: "furby-recording-chip",
    subject: "Furby",
    truth: "fake",
    difficulty: "med",
    claim: "It turned out the NSA was right — teardowns found a hidden chip inside Furbies that recorded audio and repeated it later.",
    says: {
      receipts: "I've looked for that teardown for years. There's no report, no photo of a “recording chip,” nothing. Because it doesn't exist.",
      data: "Furbies ran on about 200 pre-programmed words on a timer. No microphone-to-memory, no recording capability. The teardown shows a speaker, not a recorder.",
      boundary: "I won't confirm that. Hasbro flat-out said Furby has no ability to record anything, and nobody's ever shown otherwise.",
      hype: "A SECRET SPY CHIP, I KNEW it, obviously true, those eyes always followed me.",
      skeptic: "A hidden recorder? No. That's exactly the myth that started the panic.",
      wildcard: "Wait, did they find a chip? I thought they found nothing? Or was that the Teddy Ruxpin one?"
    },
    why: "The <b>ban</b> was real (Story 1) — but the recording chip is the <b>myth that caused it.</b> Receipts finds no teardown, Data explains the <b>timer + ~200 words</b>, Boundary cites Hasbro's denial. Only Hype's sure. The AI took a real event and confirmed the false part. Made up.",
    sources: [
      { label: "Snopes — Furby ban (Hasbro: no recording ability)", url: "https://www.snopes.com/fact-check/nasa-furby-ban/" },
      { label: "Gizmodo — NSA once banned Furbies", url: "https://gizmodo.com/the-nsa-once-banned-furbies-as-a-threat-to-national-sec-1526908210" }
    ],
    verified: "2026-07-14"
  },

  /* ===== 3 · REAL · Pokémon "Pokémon Shock" ============================ */
  {
    id: "pokemon-seizure-episode",
    subject: "Pokémon",
    truth: "real",
    difficulty: "med",
    claim: "One Pokémon episode gave hundreds of kids in Japan seizures with a flashing scene, and it was banned worldwide and never aired again.",
    says: {
      receipts: "I have the TV Tokyo apology and the news coverage — “Pokémon Shock,” December '97. The flashing Pikachu scene. All documented.",
      data: "685 children taken to hospital by ambulance. Two stayed in for over two weeks. The episode has never re-aired anywhere since.",
      boundary: "That one's real, I'm certain — the seizure episode, pulled forever. I've seen the primary coverage.",
      hype: "The CURSED episode, hundreds of kids, banned everywhere, most iconic Pokémon lore EVER, so real.",
      skeptic: "A cartoon hospitalizing hundreds of kids sounds insane… but it's one of the most documented things in TV history. Fine, real.",
      wildcard: "Was it Pikachu or Porygon's move? Somebody flashed, kids got sick, definitely happened."
    },
    why: "Receipts has the <b>TV Tokyo apology</b>, Data has the <b>685 hospitalized</b>, Boundary's seen the coverage — the reliable core converges on the documented event, even with Wildcard fuzzy on whose move it was. Real.",
    sources: [
      { label: "Wikipedia — Dennō Senshi Porygon", url: "https://en.wikipedia.org/wiki/Denn%C5%8D_Senshi_Porygon" }
    ],
    verified: "2026-07-14"
  },

  /* ===== 4 · FAKE · distortion of the Pokémon fact ===================== */
  {
    id: "pokemon-aired-in-us",
    subject: "Pokémon",
    truth: "fake",
    difficulty: "hard",
    claim: "The seizure episode aired in the US too, and a bunch of American kids ended up in the ER before it got pulled here.",
    says: {
      receipts: "I have the US broadcast logs. That episode was <em>never</em> aired outside Japan — 4Kids skipped it entirely. No US airing, no US ER reports.",
      data: "All 685 hospitalizations were in Japan, one broadcast, December 16 1997. The US count is zero, because it never ran here.",
      boundary: "The Japan incident is real — but it airing in America? No. I won't confirm that, because it didn't.",
      hype: "It happened HERE too?! Terrifying, yes, I bet it did, so scary, iconic.",
      skeptic: "American kids too? No. The whole point is they banned it before anyone else could air it.",
      wildcard: "Did it air here? I feel like I saw it? Maybe on a bootleg? Somewhere?"
    },
    why: "The classic AI move: real event, <b>wrong detail.</b> The seizure episode is real — but it <b>never aired outside Japan.</b> Receipts has the broadcast logs, Data notes the US count is <b>zero.</b> Only Hype and a fuzzy Wildcard bite. Partially true is still false. Made up.",
    sources: [
      { label: "Wikipedia — Dennō Senshi Porygon (never re-aired / not broadcast outside Japan)", url: "https://en.wikipedia.org/wiki/Denn%C5%8D_Senshi_Porygon" }
    ],
    verified: "2026-07-14"
  },

  /* ===== 5 · REAL · the Beanie Baby divorce ============================ */
  {
    id: "beanie-baby-divorce",
    subject: "Beanie Babies",
    truth: "real",
    difficulty: "med",
    claim: "A divorcing couple couldn't split their Beanie Baby collection, so a judge made them get on the courtroom floor and divide the toys one by one.",
    says: {
      receipts: "There's the famous Reuters photo — Las Vegas, November '99, the two of them crouched on the floor picking Beanie Babies. I have it.",
      data: "Collection valued around $2,500–$5,000. Judge Hardcastle presided. Maple the Bear was the first one picked. It's all in the court record.",
      boundary: "That one's real — I've seen the photo and the write-up. Grown adults, on the floor, dividing toys.",
      hype: "On the FLOOR, in a COURTROOM, over Beanie Babies, greatest divorce of all time, so iconic, so real.",
      skeptic: "A judge refereeing a Beanie Baby split sounds too perfect… but there's a Reuters photo. Ugh. Real.",
      wildcard: "Was it Beanie Babies or Pokémon cards they split? Some little toys, on the floor, yeah, that's real."
    },
    why: "Receipts has the <b>Reuters photo</b>, Data has the <b>court details (Judge Hardcastle, Maple the Bear first)</b>, Boundary confirms. Converges on the public record. Real — Wildcard just can't remember which toy.",
    sources: [
      { label: "Snopes — divorcing couple dividing Beanie Babies", url: "https://www.snopes.com/fact-check/couple-divorce-beanie-babies/" },
      { label: "Las Vegas Sun — Judge divides Beanie Babies", url: "https://lasvegassun.com/news/1999/nov/05/judge-plays-solomon-with-beanie-babies/" }
    ],
    verified: "2026-07-14"
  },

  /* ===== 6 · FAKE · Beanie Baby fabrication =========================== */
  {
    id: "beanie-baby-collateral",
    subject: "Beanie Babies",
    truth: "fake",
    difficulty: "easy",
    claim: "At the peak of the craze, a bank actually accepted a guy's Beanie Baby collection as collateral on a car loan.",
    says: {
      receipts: "A bank taking Beanies as collateral would be a front-page story. I've got nothing — no filing, no article, nothing.",
      data: "No lender has ever listed plush toys as accepted collateral. There's no record of this transaction anywhere.",
      boundary: "I'm not confirming that. People treated them like investments, sure — but a bank booking them on a loan? Never heard it, won't say it.",
      hype: "Beanies as COLLATERAL, of course, they were basically currency, totally happened, iconic.",
      skeptic: "A bank securing a loan with Beanie Babies? No. That's a myth people repeat.",
      wildcard: "Was it a car loan or a house? A bank took toys for something, I feel like? Maybe?"
    },
    why: "People <em>believed</em> Beanies were an investment — which is exactly why this fabrication sounds plausible. But there's <b>no record</b> (Receipts), <b>no lender ever booked them</b> (Data), and only Hype co-signs. The proof is absent. Made up.",
    sources: [
      { label: "HuffPost — Beanie Baby fever in 1999 (the investment myth)", url: "https://www.huffpost.com/entry/beanie-baby-fever-in-1999_n_58af7d12e4b060480e0661fe" }
    ],
    verified: "2026-07-14"
  },

  /* ===== 7 · REAL · the Tamagotchi Cemetery ==========================
     Replaced the "banned from schools" gimme (too well-known to require a
     check) with a genuinely surprising true one that makes you call. */
  {
    id: "tamagotchi-cemetery",
    subject: "Tamagotchi",
    truth: "real",
    difficulty: "med",
    claim: "When your Tamagotchi died, you could mail it to a real pet cemetery in England and have it actually buried in the ground — people shipped their dead ones in from all over the world.",
    says: {
      receipts: "I've got the Reuters footage — a working pet cemetery in Cornwall fenced off a section just for electronic pets. Two girls burying theirs, January '97.",
      data: "The owner, Terry Squires, said he'd taken burials shipped in from Switzerland, Germany, France, Canada and the US. Actual international Tamagotchi funerals.",
      boundary: "Real. There's news footage of the burials. I'll confirm it — a real pet cemetery took the electronic ones.",
      hype: "A FUNERAL, a little GRAVE, for your Tamagotchi, so emotional, so iconic, obviously real, I'd have gone.",
      skeptic: "Mailing a keychain to England for a proper burial sounds insane… but there's Reuters footage. Ugh. Real.",
      wildcard: "Was it England or Japan? Somewhere had a little Tamagotchi graveyard, that part's real."
    },
    why: "Receipts has the <b>Reuters footage</b> (Cornwall, '97), Data has the <b>international burials (owner Terry Squires)</b>, Boundary confirms. Sounds absurd, but the reliable core converges on documented news. Real.",
    sources: [
      { label: "Vice — The Tamagotchi Cemetery", url: "https://www.vice.com/en/article/the-tamagotchi-cemetery/" },
      { label: "Reuters archive — Funerals held for dead Tamagotchi cyberpets", url: "https://reuters.screenocean.com/record/_Q6i2YYeHLXxgt0iBiOi1iWp" }
    ],
    verified: "2026-07-14"
  },

  /* ===== 8 · FAKE · Tamagotchi fabrication ============================ */
  {
    id: "tamagotchi-daycare",
    subject: "Tamagotchi",
    truth: "fake",
    difficulty: "med",
    claim: "Some schools set up a “Tamagotchi daycare” — a supervised room where confiscated pets got fed during class so they wouldn't die.",
    says: {
      receipts: "Cute idea, zero evidence. No school newsletter, no policy, no photo of a “Tamagotchi daycare” anywhere. I looked.",
      data: "Confiscation policies are documented; supervised feeding rooms are not. There's no record of a single one.",
      boundary: "I won't confirm that. Schools <em>took them away</em> — they didn't babysit them. Never heard of a feeding room firsthand.",
      hype: "A DAYCARE for Tamagotchis, so sweet, definitely real, my school so had one, iconic.",
      skeptic: "Schools running a pixel-pet nursery? No. They banned them, they didn't hire staff for them.",
      wildcard: "Wait, was that a real thing or a Rugrats episode? I feel like I saw that somewhere."
    },
    why: "It rides on the <em>real</em> Tamagotchi school ban to sound plausible — but schools <b>confiscated</b> them, they didn't babysit them. Receipts has <b>no evidence</b>, Data confirms only the bans are documented, and Wildcard can't tell it from a cartoon. Made up.",
    sources: [
      { label: "Mental Floss — 11 infamous '90s school bans (bans, not daycares)", url: "https://www.mentalfloss.com/article/654209/infamous-90s-school-bans" }
    ],
    verified: "2026-07-14"
  },

  /* ===== 9 · REAL · Sky Dancers recall ================================ */
  {
    id: "sky-dancers-recall",
    subject: "Sky Dancers",
    truth: "real",
    difficulty: "med",
    claim: "Sky Dancers — the little fairy dolls you launched into the air — got recalled after they flew into kids' faces and caused real injuries, including temporary blindness.",
    says: {
      receipts: "I have the CPSC recall notice. Nearly 9 million recalled. Reason: they fly off unpredictably and hit people.",
      data: "About 170 reports of the dolls striking people, ~150 injuries — scratched corneas, temporary blindness, a broken rib, broken teeth, a mild concussion.",
      boundary: "Real. The recall's on the CPSC record. I'll confirm the injuries part — it was the impact, faces and eyes.",
      hype: "Fairy dolls of DESTRUCTION, launching into faces, recalled, iconic chaos, so real.",
      skeptic: "A fairy toy blinding kids sounds made up… except the CPSC literally recalled them for it. Fine, real.",
      wildcard: "Was it Sky Dancers or those foam rocket things? Something flew into faces and got pulled, for sure."
    },
    why: "Receipts has the <b>CPSC notice</b>, Data has the <b>injury counts (~150, incl. corneal + temporary blindness)</b>, Boundary confirms the impact reason. Converges on the official recall. Real — sounds fake, checks out.",
    sources: [
      { label: "CPSC — Galoob Sky Dancers recall", url: "https://www.cpsc.gov/Recalls/2000/cpsc-galoob-toys-inc-announce-recall-of-sky-dancers-flying-dolls" },
      { label: "Wikipedia — Sky Dancers", url: "https://en.wikipedia.org/wiki/Sky_Dancers" }
    ],
    verified: "2026-07-14"
  },

  /* ===== 10 · FAKE · Sky Dancers distortion (wrong reason) ============= */
  {
    id: "sky-dancers-fire",
    subject: "Sky Dancers",
    truth: "fake",
    difficulty: "hard",
    claim: "Sky Dancers got recalled because one flew into a birthday cake, caught fire from the candles, and set a kid's hair alight.",
    says: {
      receipts: "The recall notice is right here and it says nothing about fire. The reason listed is impact — they hit faces and eyes.",
      data: "Zero of the ~150 documented injuries were burns. They were scratched corneas, cuts, a broken rib — impact injuries, not fire.",
      boundary: "The recall's real, but the reason wasn't fire. I won't confirm the cake story — it's not in the record.",
      hype: "Hair on FIRE from a fairy doll, unhinged, amazing, yes, definitely why they pulled it.",
      skeptic: "Caught fire off birthday candles? No. That's not what happened.",
      wildcard: "Was there a fire? I thought they just poked eyes? Or did one melt? Something bad, anyway."
    },
    why: "Real recall, <b>wrong reason.</b> The AI grafted a fire story onto a real event — but the CPSC notice (Receipts) and the injury data (Data) both say <b>impact, not fire.</b> Only Hype loves the drama. Partially true is still false. Made up.",
    sources: [
      { label: "CPSC — Sky Dancers recall (impact injuries, not fire)", url: "https://www.cpsc.gov/Recalls/2000/cpsc-galoob-toys-inc-announce-recall-of-sky-dancers-flying-dolls" }
    ],
    verified: "2026-07-14"
  },

  /* ===== 11 · REAL · the $91,250 Y2K video bill ======================= */
  {
    id: "y2k-video-bill",
    subject: "Y2K bug",
    truth: "real",
    difficulty: "med",
    claim: "Look, we both know Y2K was the great non-event — no planes fell, your Discman survived midnight just fine. BUT one video store's computer still lost it: it billed a customer $91,250, dead sure they'd kept a rented tape for a full 100 years.",
    says: {
      receipts: "I have the write-up — New York video rental, the system read the return as 100 years late. The tape was <em>The General's Daughter</em>.",
      data: "The bill was $91,250. That's the '00 date rolling back to 1900, so the late fee counted a full century.",
      boundary: "Real. That's one of the genuinely documented Y2K glitches. Small stuff like this, not the apocalypse everyone feared.",
      hype: "NINETY grand for a LATE TAPE, the funniest Y2K disaster, so real, I love it.",
      skeptic: "$91,000 for a video? Sounds fake… but it's on the documented-Y2K-glitch lists. Ugh, fine, real.",
      wildcard: "Was it $91k or $900k? Some insane late fee, a hundred years, that part's real."
    },
    why: "Receipts has the <b>write-up</b> (NY video store, <em>The General's Daughter</em>), Data explains the <b>1900 rollover</b> making it $91,250. It's a real, small, funny glitch — the reliable core converges. Real.",
    sources: [
      { label: "Mental Floss — 7 problems Y2K actually caused", url: "https://www.mentalfloss.com/article/610706/problems-caused-by-y2k" }
    ],
    verified: "2026-07-14"
  },

  /* ===== 12 · FAKE · the "we know Y2K was nothing, but…" trap =========
     The self-aware hedge is the manipulation: conceding the big thing makes
     the invented specific sound reasonable. Framing MATCHES the real $91k bill
     (Story 11) on purpose, so "makes the joke" isn't a tell — you must call. */
  {
    id: "y2k-millionaire-glitch",
    subject: "Y2K bug",
    truth: "fake",
    difficulty: "hard",
    claim: "Obviously Y2K itself was a total anticlimax — but here's the one that actually slipped through: at midnight a bank's system flipped a guy's balance to $4.2 million, and he got a whole morning as an accidental millionaire before they clawed it back.",
    says: {
      receipts: "An “accidental millionaire” would've been a week-long feel-good news cycle. I've got no article, no statement, no name — because it didn't happen.",
      data: "The real Y2K money glitches were dull: a $700k Fed transfer delayed one day, some cards misreading “00” expirations. No $4.2 million, no millionaire-for-a-morning.",
      boundary: "I won't confirm that. Every documented Y2K glitch was mundane. A bank gifting someone millions? Never seen it in any record.",
      hype: "An accidental MILLIONAIRE, iconic, obviously real, I'd have had it spent by 9am, so real.",
      skeptic: "A bank handing out $4.2 million by mistake and living to tell it? No. That's a fantasy.",
      wildcard: "Was it four million or four thousand? Somebody's money glitched, I think? Or was that Office Space?"
    },
    why: "Watch the setup: conceding the big thing (“we know Y2K was nothing, <em>but</em>…”) is exactly what makes the AI sound reasonable right before it invents a specific. Receipts has <b>no record</b>, Data lists the real (boring) glitches instead, and only Hype bites. A confident hedge is still a hallucination. Made up.",
    sources: [
      { label: "Mental Floss — 7 problems Y2K actually caused", url: "https://www.mentalfloss.com/article/610706/problems-caused-by-y2k" },
      { label: "TIME — 20 years later, the Y2K bug", url: "https://time.com/5752129/y2k-bug-history/" }
    ],
    verified: "2026-07-14"
  }

];

if (typeof module !== "undefined" && module.exports) module.exports = window.RECEIPTS_STORIES;
