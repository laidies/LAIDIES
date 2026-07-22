#!/usr/bin/env python3
"""Acceptance check for Codex art deliveries (2026-07-21).

Run from Website-homepage/:   python3 operations/ops/accept-new-art.py

Finds image files newer than the prompts, and checks each against the things Ali has
actually rejected before. It CANNOT judge composition — that's her call — but it catches
the mechanical failures that have cost real time: wrong size, duplicate output (template
collapse), and art that never gets wired anywhere.
"""
import os, sys, glob, json, subprocess, hashlib, time

ROOT = os.getcwd()
PROMPTS = 'operations/codex-prompts'
since = max(os.path.getmtime(p) for p in glob.glob(f'{PROMPTS}/*.md'))

def dims(p):
    try:
        out = subprocess.run(['sips','-g','pixelWidth','-g','pixelHeight',p],
                             capture_output=True, text=True).stdout
        w = int([l for l in out.splitlines() if 'pixelWidth' in l][0].split(':')[1])
        h = int([l for l in out.splitlines() if 'pixelHeight' in l][0].split(':')[1])
        return w, h
    except Exception:
        return None, None

new = []
for p in glob.glob('assets/**/*', recursive=True):
    if not p.lower().endswith(('.png','.jpg','.jpeg')): continue
    if 'v4-clean' in p: continue
    try:
        if os.path.getmtime(p) > since: new.append(p)
    except OSError: pass

if not new:
    print("No new art delivered since the prompts were written.")
    print(f"(watching everything under assets/ newer than {time.strftime('%m-%d %H:%M', time.localtime(since))})")
    sys.exit(0)

print(f"{len(new)} new image(s) delivered\n")
hashes, problems = {}, []
for p in sorted(new):
    w, h = dims(p)
    md5 = hashlib.md5(open(p,'rb').read()).hexdigest()
    flags = []
    if (w, h) != (1920, 1080):
        flags.append(f"SIZE {w}x{h} — spec is 1920x1080")
    if md5 in hashes:
        flags.append(f"IDENTICAL to {os.path.basename(hashes[md5])} — template collapse")
    hashes.setdefault(md5, p)
    status = "  ok  " if not flags else "  ⚠   "
    print(f"{status}{os.path.basename(p)}   {w}x{h}")
    for f in flags:
        print(f"          {f}"); problems.append((p, f))

# is it wired anywhere yet?
print("\nwired into a live page/cue sheet?")
hay = ""
for f in glob.glob('issues/*.html') + glob.glob('content/episodes/*.json') + ['chick-flicks.html']:
    try: hay += open(f, encoding='utf-8', errors='ignore').read()
    except OSError: pass
for p in sorted(new):
    b = os.path.basename(p)
    print(f"   {'YES' if b in hay else 'not yet'}  {b}")

print("\n--- reminders that are Ali's call, not checkable here ---")
print("  · NO text boxes / speech bubbles / caption bars  (the most-repeated rejection)")
print("  · 'AI' never 'Ai'   · no banned wording \"that's your AI\"")
print("  · Ep3 Burn Book: collaged scrapbook, ransom lettering, NO padlock")
print("  · ep03-06: two popped-collar polos in DIFFERENT colours")
print("  · ep02-08: any visible dial reads 99.9 FM")
print("  · period-correct 1999 — no modern devices")
sys.exit(1 if problems else 0)
