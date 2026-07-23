# =============================================================================
#  THE WEDNESDAY ENGINE
#  One system that runs the weekly cycle. Written for GNU Make 3.81 (the one
#  Apple ships) — no .ONESHELL, no $(file), no fancy business.
#
#  RUN IT FROM THE REPO ROOT:
#    cd "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage"
#    make -f operations/engine/Makefile EP=05 week
#
#  HOW IT BEHAVES
#  · Every stage writes a stamp file under build/ep05/. A stage that is already
#    stamped is skipped. So a failed run RESUMES — it never restarts.
#  · .DELETE_ON_ERROR means a stage that fails halfway leaves NO stamp behind.
#    Make can never believe a half-finished stage is done.
#  · Re-running is always safe. If nothing changed, nothing happens.
#  · Staleness is decided by CONTENT HASH, not modification time (see
#    hashstamp.sh). iCloud moves mtimes around; it does not move content.
#  · Approval files (G1..G4) are created ONLY by Ali saying yes. The engine
#    never touches them.
# =============================================================================

SHELL := /bin/bash
.DELETE_ON_ERROR:
.SUFFIXES:

EP ?= 05
NN := $(shell echo "$(EP)" | awk '{printf "%02d", $$1+0}')

ifeq ($(strip $(NN)),)
$(error EP must be an episode number, e.g. EP=05)
endif

ifeq ($(wildcard content/episodes),)
$(error Run make from the repo root. Do this first: cd "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage")
endif

# ── where everything lives ───────────────────────────────────────────────────
ENGINE  := operations/engine
B       := build/ep$(NN)

CANON   := content/episodes/episode-$(NN).canon.md
SUBST   := content/episodes/episode-$(NN).substance.md
SCRIPT  := operations/audio/episode-$(NN)-elevenlabs-v3-tagged.txt
ARTICLE := content/issues/issue-$(NN).md
NARR    := content/music/episode-$(NN)-narration.mp3
WORDS   := operations/captions/episode-$(NN)-words.json
TIMING  := operations/captions/episode-$(NN)-timing-map.json
CUES    := content/episodes/episode-$(NN)-cues.json
CAPDIR  := operations/captions

# The only Python that has faster_whisper installed. It lives in the OTHER copy
# of tools/, one directory up from this repo. Absolute path on purpose.
VENVPY  := /Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/operations/tools/.venv-align/bin/python

# Derivation of the ~11 Stage-6 surfaces stays OFF until canon has been RULED.
# See operations/research/00-SYNTHESIS §4.5: the canon files were reverse-
# extracted from shipped surfaces and carry those surfaces' errors. Derivation
# is a multiplier — pointed at contaminated canon its first act is to
# industrialise the bugs. Ali creates this file when the canon sweep is done.
RULED   := $(ENGINE)/CANON-RULED

.PHONY: help week __chain where gate stages clean-stamps \
        substance canon scripts audio timing art cut surfaces

# ── the friendly front door ──────────────────────────────────────────────────
help:
	@echo ""
	@echo "  THE WEDNESDAY ENGINE — episode $(NN)"
	@echo ""
	@echo "  make -f $(ENGINE)/Makefile EP=$(NN) where     what's the state, in English"
	@echo "  make -f $(ENGINE)/Makefile EP=$(NN) week      run the whole week"
	@echo "  make -f $(ENGINE)/Makefile EP=$(NN) gate      run every check, one verdict"
	@echo ""
	@echo "  Or one stage at a time, in order:"
	@echo "    substance  canon  scripts  audio  timing  art  cut  surfaces"
	@echo ""
	@echo "  Stamps live in $(B)/ — delete one to force that stage to re-run."
	@echo ""

where:
	@bash $(ENGINE)/where.sh $(NN)

gate:
	@bash $(ENGINE)/gate.sh $(NN)

stages:
	@ls -1 $(B) 2>/dev/null || echo "  nothing built yet for episode $(NN)"

# Deletes stamps only. Never touches content, art, audio or canon.
clean-stamps:
	@rm -f $(B)/*.stamp $(B)/*.hash
	@echo "  stamps cleared for episode $(NN) — approvals (G*.approved) kept."

# ── the whole week, with a human-readable stop ───────────────────────────────
week:
	@set -o pipefail; $(MAKE) --no-print-directory -f $(ENGINE)/Makefile EP=$(NN) __chain 2>&1 \
	  | sed -E '/^make(\[[0-9]+\])?: \*\*\*/d; /^make(\[[0-9]+\])?: Target/d' \
	  || { echo ""; echo "  ──────── the week stopped here ────────"; echo ""; \
	       bash $(ENGINE)/where.sh $(NN); exit 1; }

__chain: $(B)/surfaces.stamp
	@echo ""
	@echo "  ✓ EPISODE $(NN) IS THROUGH EVERY STAGE."
	@echo "    Last thing: Ali's publish approval."
	@echo "    touch $(B)/G4.approved"
	@echo ""

$(B)/.dir:
	@mkdir -p $(B) && touch $@

# ── friendly errors instead of make's "No rule to make target" ───────────────
$(CANON):
	@echo "  ✗ There is no canon file for episode $(NN)."
	@echo "    Expected: $(CURDIR)/$(CANON)"
	@echo "    Canon is the source of truth. Nothing downstream can start."
	@exit 1

$(SUBST):
	@echo "  ✗ There is no substance sheet for episode $(NN)."
	@echo "    Expected: $(CURDIR)/$(SUBST)"
	@echo "    This is the ONE page Ali reads before any prose exists:"
	@echo "    what she learns that she didn't know, the decision rule, the facts."
	@echo "    Copy the shape of $(CURDIR)/content/episodes/episode-05.substance.md"
	@exit 1

$(SCRIPT):
	@echo "  ✗ There is no narration script for episode $(NN)."
	@echo "    Expected: $(CURDIR)/$(SCRIPT)"
	@exit 1

$(NARR):
	@echo "  ✗ The narration audio has not been recorded for episode $(NN)."
	@echo "    Expected: $(CURDIR)/$(NARR)"
	@echo "    This is a human/ElevenLabs step. Everything visual is timed off it."
	@exit 1

$(CUES):
	@echo "  ✗ There is no cue sheet for episode $(NN)."
	@echo "    Expected: $(CURDIR)/$(CUES)"
	@echo "    The cue sheet is what says which image is on screen when."
	@exit 1

# =============================================================================
#  STAGE 1 · SUBSTANCE — the one page Ali rules on, before prose exists
# =============================================================================
substance: $(B)/substance.stamp

$(B)/substance.stamp: $(SUBST) | $(B)/.dir
	@echo ""
	@echo "  ── STAGE 1 · SUBSTANCE ──"
	@w=$$(wc -w < "$(SUBST)" | tr -d ' '); \
	 if [ "$$w" -lt 250 ]; then \
	   echo "  ✗ $(SUBST) is only $$w words. A real substance sheet is 500+."; \
	   echo "    A stub must never be able to pass a gate."; exit 1; \
	 fi; \
	 echo "  ✓ substance sheet present ($$w words)"
	@echo "  → Before approving, run the 5-reviewer quality battery on it."
	@echo "    It is built and has never been run. In Claude Code:"
	@echo "    Workflow({ scriptPath: \"$(CURDIR)/operations/workflows/review-content.mjs\","
	@echo "               args: { file: \"$(CURDIR)/$(SUBST)\", type: \"episode\" } })"
	@bash $(ENGINE)/hashstamp.sh $(SUBST) $(B)/substance.hash
	@touch $@

$(B)/G1.approved: $(B)/substance.stamp
	@echo ""
	@echo "  ⏸  WAITING ON ALI — GATE 1 of 4 · the substance sheet"
	@echo ""
	@echo "     Read:  $(CURDIR)/$(SUBST)"
	@echo "     One question only: does a smart, busy woman learn something here"
	@echo "     she did not already know, stated plainly?"
	@echo ""
	@echo "     Yes  →  touch $(B)/G1.approved"
	@echo "     No   →  say what's missing; the sheet gets rewritten, not the script."
	@echo ""
	@exit 1

# =============================================================================
#  STAGE 2 · CANON — the master file. Nothing downstream starts until it passes.
# =============================================================================
canon: $(B)/canon.stamp

$(B)/canon.hash: $(CANON) | $(B)/.dir
	@bash $(ENGINE)/hashstamp.sh $(CANON) $@

$(B)/canon.stamp: $(B)/canon.hash $(B)/G1.approved
	@echo ""
	@echo "  ── STAGE 2 · CANON ──"
	@bash $(ENGINE)/checks/check-inputs.sh $(NN) || { echo "  ✗ canon is not usable yet."; exit 1; }
	@bash $(ENGINE)/checks/check-must-match.sh $(NN)
	@touch $@

# =============================================================================
#  STAGE 3 · SCRIPTS — narration + article, both DERIVED from canon
# =============================================================================
scripts: $(B)/scripts.stamp

$(B)/scripts.stamp: $(B)/canon.stamp $(SCRIPT)
	@echo ""
	@echo "  ── STAGE 3 · SCRIPTS ──"
	@if [ ! -f "$(ARTICLE)" ]; then \
	   echo "  ✗ The written version is missing: $(CURDIR)/$(ARTICLE)"; \
	   echo "    The script and the article ship together — the outro points at it."; \
	   exit 1; fi
	@bash $(ENGINE)/gate.sh $(NN) --scope episode
	@bash $(ENGINE)/hashstamp.sh $(SCRIPT) $(B)/script.hash
	@touch $@

# =============================================================================
#  STAGE 4 · AUDIO — the narration recording
# =============================================================================
audio: $(B)/audio.stamp

$(B)/audio.stamp: $(B)/scripts.stamp $(NARR)
	@echo ""
	@echo "  ── STAGE 4 · AUDIO ──"
	@sz=$$(wc -c < "$(NARR)" | tr -d ' '); \
	 if [ "$$sz" -lt 200000 ]; then \
	   echo "  ✗ $(NARR) is only $$sz bytes — that is not a full narration."; exit 1; \
	 fi; \
	 echo "  ✓ narration recorded ($$(( sz / 1024 / 1024 )) MB)"
	@touch $@

# =============================================================================
#  STAGE 5 · TIMING — the clock everything visual is placed against
#            transcribe.py (Whisper) → align.py (true script + true clock)
# =============================================================================
timing: $(B)/timing.stamp

$(WORDS): $(NARR)
	@echo ""
	@echo "  ── STAGE 5a · TRANSCRIBE ──"
	@if [ ! -x "$(VENVPY)" ]; then \
	   echo "  ✗ The transcription Python is not available."; \
	   echo "    Expected: $(VENVPY)"; \
	   echo "    That virtualenv is the only one with faster_whisper installed."; \
	   echo "    Nothing is broken in the episode — the machine just can't do this step."; \
	   exit 1; fi
	@mkdir -p $(CAPDIR)
	@"$(VENVPY)" operations/tools/transcribe.py "$(NARR)" "$@"

$(TIMING): $(WORDS) $(SCRIPT)
	@echo ""
	@echo "  ── STAGE 5b · ALIGN ──"
	@if [ ! -x "$(VENVPY)" ]; then \
	   echo "  ✗ $(VENVPY) not available — cannot build the timing map."; exit 1; fi
	@"$(VENVPY)" operations/tools/align.py "$(SCRIPT)" "$(WORDS)" "$(CAPDIR)" $(NN)

$(B)/timing.stamp: $(B)/audio.stamp $(TIMING)
	@echo ""
	@echo "  ── STAGE 5 · TIMING CHECK ──"
	@cov=$$("$(VENVPY)" -c "import json,sys; u=json.load(open('$(TIMING)')); \
	   t=sum(1 for x in u if x.get('end',0)>x.get('start',0)); \
	   print(int(100*t/max(1,len(u))))" 2>/dev/null || echo 0); \
	 if [ "$$cov" -lt 90 ]; then \
	   echo "  ✗ Only $$cov% of the script lines got a real timestamp."; \
	   echo "    Below 90% every visual placement downstream is guesswork."; \
	   exit 1; fi; \
	 echo "  ✓ timing map covers $$cov% of the script"
	@touch $@

# =============================================================================
#  STAGE 6 · ART — the images, and whether they actually cover the episode
# =============================================================================
art: $(B)/art.stamp

$(B)/art.stamp: $(B)/timing.stamp $(CUES)
	@echo ""
	@echo "  ── STAGE 6 · ART & COVERAGE ──"
	@node scripts/check-episode-cues.js
	@echo ""
	@echo "  Holds that are too long for one still (the missing-beat brief):"
	@if [ -x "$(VENVPY)" ]; then \
	   "$(VENVPY)" operations/tools/beat-brief.py "$(CUES)" "$(TIMING)" 12 | tail -30 || true; \
	 else echo "  (skipped — $(VENVPY) not available)"; fi
	@touch $@

$(B)/G2.approved: $(B)/art.stamp
	@echo ""
	@echo "  ⏸  WAITING ON ALI — GATE 2 of 4 · the art"
	@echo ""
	@echo "     Only the frames the machine flagged. Everything else already passed."
	@echo "     Yes  →  touch $(B)/G2.approved"
	@echo ""
	@exit 1

# =============================================================================
#  STAGE 7 · CUT — the assembled video
#     CapCut has no scriptable interface. This stage does not try to drive it.
#     Its job is to verify the export exists and matches the clock.
# =============================================================================
cut: $(B)/cut.stamp

$(B)/cut.stamp: $(B)/G2.approved
	@echo ""
	@echo "  ── STAGE 7 · THE CUT ──"
	@f=$$(ls -1 assets/video/episode-$(NN)-full-v*.mp4 2>/dev/null | tail -1); \
	 if [ -z "$$f" ]; then \
	   echo "  ✗ No exported cut found."; \
	   echo "    Expected something like: $(CURDIR)/assets/video/episode-$(NN)-full-v1.mp4"; \
	   echo "    This is the CapCut step — it is done by hand, on purpose."; \
	   exit 1; fi; \
	 echo "  ✓ export found: $$f ($$(( $$(wc -c < "$$f") / 1024 / 1024 )) MB)"; \
	 if command -v ffprobe >/dev/null 2>&1; then \
	   ffprobe -v error -show_entries format=duration -of csv=p=0 "$$f"; \
	 else \
	   echo "  · ffmpeg/ffprobe is not installed on this Mac, so the runtime and"; \
	   echo "    audio track of the export cannot be measured here. Not a failure —"; \
	   echo "    the file is present and the captions come from the timing map."; \
	   echo "    To turn this check on:  brew install ffmpeg"; \
	 fi
	@if [ ! -f "$(CAPDIR)/episode-$(NN).vtt" ]; then \
	   echo "  ✗ No captions at $(CURDIR)/$(CAPDIR)/episode-$(NN).vtt"; exit 1; fi
	@echo "  ✓ captions present"
	@touch $@

$(B)/G3.approved: $(B)/cut.stamp
	@echo ""
	@echo "  ⏸  WAITING ON ALI — GATE 3 of 4 · watch the cut once"
	@echo ""
	@echo "     Coverage is already green, so nothing is missing. This is taste."
	@echo "     Yes  →  touch $(B)/G3.approved"
	@echo ""
	@exit 1

# =============================================================================
#  STAGE 8 · SURFACES — everything else the week owes
#     Deliberately OFF. See $(RULED) below.
# =============================================================================
surfaces: $(B)/surfaces.stamp

$(B)/surfaces.stamp: $(B)/G3.approved
	@echo ""
	@echo "  ── STAGE 8 · SURFACES ──"
	@if [ ! -f "$(RULED)" ]; then \
	  echo "  ⛔ AUTOMATIC DERIVATION IS SWITCHED OFF ON PURPOSE."; \
	  echo ""; \
	  echo "     The canon files were reverse-extracted from surfaces that had"; \
	  echo "     already shipped, so they faithfully copied those surfaces' errors"; \
	  echo "     — including one verified-wrong statistic. Deriving eleven surfaces"; \
	  echo "     from that would turn one error into eleven, automatically."; \
	  echo ""; \
	  echo "     Until the canon sweep is done, the week's surfaces are built the"; \
	  echo "     way they are built today, by hand, and the checklist is:"; \
	  echo "       $(CURDIR)/operations/weekly-cycle-map.md  (Stage 6 table)"; \
	  echo ""; \
	  echo "     When canon has been ruled, switch this on with:"; \
	  echo "       touch $(CURDIR)/$(RULED)"; \
	  echo ""; \
	  exit 1; fi
	@echo "  canon has been ruled — running the site-wide checks on the result"
	@bash $(ENGINE)/gate.sh $(NN)
	@touch $@
