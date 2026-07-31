#!/usr/bin/env python3
"""State-of-the-site truth engine. Re-runnable. Reports the ACTUAL state — not claims.
Run from repo root (Website-homepage/). Outputs operations/ops/state.json + a readable summary."""
import os, re, json, glob, subprocess, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # Website-homepage/
os.chdir(ROOT)

def sh(*a):
    try: return subprocess.run(a, capture_output=True, text=True, timeout=30).stdout.strip()
    except Exception: return ""

# --- enumerate real, live-facing pages ---
EXCLUDE = ('concepts/','operations/','node_modules/','.versions/')
EXCLUDE_SUB = ('/_','preview-','-magazine','-reskin','render-','delivery-','logo-preview')
def is_real(p):
    p = p.replace('\\','/').lstrip('./')
    if any(p.startswith(e) or ('/'+e) in p for e in EXCLUDE): return False
    if any(s in p for s in EXCLUDE_SUB): return False
    return True

pages = sorted(p for p in glob.glob('**/*.html', recursive=True) if is_real(p))
def read(p):
    try: return open(p, encoding='utf-8', errors='ignore').read()
    except Exception: return ''

ZOMBIE = lambda p: p == 'grimoire.html' or p.startswith('grimoire/')
STUB = lambda p: p in ('sanctuary.html',)

checks = {}

# CHECK 1: current homepage topbar vs the older shared header.
# Do not call sv-global-header.js "homepage-matching": the homepage moved to
# the live Jost topbar and the old script still renders a different shell.
def header_kind(p):
    t = read(p)
    if 'sv-topbar.css' in t or re.search(r'<header[^>]+class=["\'][^"\']*\btopbar\b', t):
        return 'current'
    if 'sv-global-header' in t:
        return 'legacy'
    return 'missing'

header_kinds = {p: header_kind(p) for p in pages}
current_hdr = [p for p, kind in header_kinds.items() if kind == 'current']
legacy_hdr = [p for p, kind in header_kinds.items() if kind == 'legacy']
missing_hdr = [p for p, kind in header_kinds.items() if kind == 'missing']
legacy_real = [p for p in legacy_hdr if not ZOMBIE(p) and not STUB(p)]
missing_real = [p for p in missing_hdr if not ZOMBIE(p) and not STUB(p)]
checks['header'] = {
    'label': 'Current homepage topbar on every page',
    'total': len(pages), 'have_current': len(current_hdr),
    'legacy_real': legacy_real,
    'missing_real': missing_real,
    'status': (
        'DONE'
        if not legacy_real and not missing_real
        else f'{len(legacy_real)} real pages on legacy header; {len(missing_real)} missing a recognized header'
    ),
}

# CHECK 2: zombie Grimoire pages (should be deleted/redirected)
zombies = [p for p in pages if ZOMBIE(p)]
checks['zombies'] = {
    'label': 'Dead Grimoire pages removed (Grimoire → LIBRAiRY)',
    'count': len(zombies), 'pages': zombies,
    'status': 'DONE' if not zombies else f'{len(zombies)} zombie pages still exist',
}

# CHECK 3: broken-layout candidates (thin inline CSS + relies on old sunnyvaile-page.css)
broken = []
for p in pages:
    if ZOMBIE(p) or STUB(p): continue
    t = read(p)
    inline = sum(len(m) for m in re.findall(r'<style[^>]*>(.*?)</style>', t, re.S))
    if inline < 3000 and 'sunnyvaile-page.css' in t:
        broken.append(p)
checks['broken_layout'] = {
    'label': 'Pages off the broken old-layout CSS',
    'count': len(broken), 'pages': broken,
    'status': 'DONE' if not broken else f'{len(broken)} pages on the broken layout',
}

# CHECK 4: live / deploy state (git)
branch = sh('git','branch','--show-current')
ahead = sh('git','rev-list','--count','main..HEAD')
uncommitted = len([l for l in sh('git','status','--short').splitlines() if l.strip()])
main_last = sh('git','log','main','-1','--format=%ci  %s')
checks['deploy'] = {
    'label': 'Deploy / live state',
    'branch': branch, 'commits_ahead_of_main': ahead,
    'uncommitted_files': uncommitted, 'main_last_commit': main_last,
    'note': 'GitHub Pages serves main. Local main ref may be stale — verify origin/main before trusting.',
}

state = {
    'generated': None,  # stamped by caller; Date is unavailable in some sandboxes
    'checks': checks,
}
open('operations/ops/state.json','w').write(json.dumps(state, indent=2))

# readable summary
print('=== STATE OF THE SITE (verified) ===')
print(f"pages scanned: {len(pages)}")
for k,c in checks.items():
    print(f"\n[{k}] {c['label']}")
    print(f"  -> {c.get('status') or ''}")
    if k=='header' and c['missing_real']:
        print('     missing:', ', '.join(c['missing_real']))
    if k=='broken_layout' and c['pages']:
        print('     broken:', ', '.join(c['pages'][:12]), ('…' if len(c['pages'])>12 else ''))
    if k=='deploy':
        print(f"     branch={c['branch']}  ahead-of-main={c['commits_ahead_of_main']}  uncommitted={c['uncommitted_files']}")
        print(f"     main last: {c['main_last_commit']}")
