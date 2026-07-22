#!/usr/bin/env python3
"""SUNNYVAiLE Workspace — Ali's real, visual, persistent home. NOT a chat, NOT a static file.
A tiny live app (Python stdlib only — no installs) that:
  - SHOWS her images as thumbnails, organized (fixes "I have no visualization")
  - SAVES ideas she types, straight into IDEAS.md (capture without chat)
  - SHOWS the real launch status (from check_site.py's state.json)
Run:  python3 Website-homepage/operations/ops/workspace.py
Open: http://localhost:8790  (bookmark it)
"""
import os, json, html, urllib.parse, mimetypes, datetime, re
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
WEB  = os.path.dirname(os.path.dirname(HERE))          # Website-homepage/
ROOT = os.path.dirname(WEB)                             # LAIDIES/
APPROVED = os.path.join(WEB, 'approved-assets')
IDEAS = os.path.join(ROOT, 'IDEAS.md')
STATE = os.path.join(HERE, 'state.json')
CURATION = os.path.join(HERE, 'curation.json')   # {basename: correct|redo|unused} — Ali's verdicts
NOTES = os.path.join(HERE, 'notes.json')         # {basename: "what needs to change"} — Ali's words
TOMAKE = os.path.join(HERE, 'to-make.json')      # [{text, cat, added}] — images that should exist
IMG_EXT = ('.png','.jpg','.jpeg','.webp','.gif')
PORT = 8790
_IMG_REF = re.compile(r'((?:approved-)?assets/[A-Za-z0-9_./\-]+\.(?:png|jpg|jpeg|webp|gif))', re.I)
_LIVE_CACHE = None
_USAGE_CACHE = None

def esc(s): return html.escape(str(s))

# Folder name → the name Ali actually uses (canon). Folders not listed use a tidied default.
LABELS = {
    'saints': 'Patron Saints', 'builders': 'TRAiLBLAZERS', 'mavens': 'MAiVENS',
    'town-characters': 'Town Characters', 'building-interiors': 'Building Interiors',
    'sunnyvaile-interiors': 'Interiors', 'sunnyvaile-buildings': 'Buildings',
    'sunnyvaile-streets': 'Street Scenes', 'mall-storefronts': 'Mall Storefronts',
    'library-101': 'LIBRAiRY', 'episodes': 'Episodes', 'printables': 'Printables',
    'portal': 'Portal / Homepage', 'brand': 'Brand & Logos', 'games': 'Games',
    'bws-fortune-teller': 'Bronze AiGE Fortune', 'pixel-restyle': 'Pixel Restyle',
    'postcards': 'Postcards', 'albums': 'Albums', 'dream-phone': 'Dream Phone',
    'other': 'Other', 'buildings-storefronts': 'Buildings & Storefronts',
    'bronze-aige-bws': 'Bronze AiGE', 'town-scenes-and-map': 'Town Scenes & Map',
    'residence-card-and-avatars': 'Resident Card & Avatars',
    'episode-section-art': 'Episode Section Art', 'stickers-charms': 'Stickers & Charms',
}
PENDING = []

def pretty(name):
    return LABELS.get(name, name.replace('-', ' ').title())

def cat_cards_html():
    cur = read_curation()
    cards = ''
    for name,cnt,cover in categories():
        imgs = images_in_cat(name)
        left = sum(1 for rp in imgs if not cur.get(keyof(rp)))
        if left == 0:
            prog = '<span class="done">✓ all decided</span>'; cls = ' done'
        else:
            prog = f'<span class="left">{left} of {len(imgs)} left</span>'; cls = ''
        cards += (f'<a href="/gallery?cat={urllib.parse.quote(name)}"><div class="card{cls}">'
                  f'<div class="ph"><img loading="lazy" src="/img?p={urllib.parse.quote(cover)}"></div>'
                  f'<div class="lb"><b>{esc(pretty(name))}</b><span>{prog}</span></div></div></a>')
    return cards

def keyof(rp):
    """An image's identity = its filename without extension. Marks key on THIS, so they
    survive folder/format/version changes and never need re-sorting."""
    return os.path.splitext(os.path.basename(rp))[0].lower()

def usage_map():
    """{image relpath: [pages/files that reference it]} — the reverse index.
    So the workspace can tell Ali WHERE each image is used, not just that it exists."""
    global _USAGE_CACHE
    if _USAGE_CACHE is not None: return _USAGE_CACHE
    m = {}
    for base,_,files in os.walk(WEB):
        for f in files:
            if not f.endswith(('.html','.css','.js')): continue
            rf = os.path.relpath(os.path.join(base,f), WEB).replace('\\','/')
            if rf.startswith(('operations/','node_modules/','.versions/')) or '/_' in rf: continue
            try: t = open(os.path.join(base,f), encoding='utf-8', errors='ignore').read()
            except Exception: continue
            for ref in _IMG_REF.findall(t):
                full = os.path.normpath(os.path.join(WEB, ref))
                if os.path.isfile(full):
                    m.setdefault(os.path.relpath(full, ROOT), set()).add(rf)
    _USAGE_CACHE = {k: sorted(v) for k,v in m.items()}
    return _USAGE_CACHE

def referenced_images():
    """The LIVE set = images actually referenced by the site (keys of the usage map)."""
    global _LIVE_CACHE
    if _LIVE_CACHE is None: _LIVE_CACHE = sorted(usage_map().keys())
    return _LIVE_CACHE

def used_on(rp):
    """Short label of where an image is used, e.g. 'chick-flicks' or 'radio +2'."""
    pages = usage_map().get(rp, [])
    names = [os.path.basename(p)[:-5] if p.endswith('.html') else os.path.basename(p) for p in pages]
    if not names: return ''
    return names[0] + (f' +{len(names)-1}' if len(names) > 1 else '')

def category_of(rp):
    parts = rp.replace('\\','/').split('/')
    for i,p in enumerate(parts):
        if p in ('assets','approved-assets'):
            return parts[i+1] if i+2 < len(parts) else 'other'
    return 'other'

def _mtime(rp):
    f = os.path.join(ROOT, rp)
    return os.path.getmtime(f) if os.path.isfile(f) else 0

def cat_map():
    """{category: [relpaths newest-first]} over the live set."""
    m = {}
    for rp in referenced_images():
        m.setdefault(category_of(rp), []).append(rp)
    for c in m: m[c].sort(key=_mtime, reverse=True)
    return m

def categories():
    out = [(c, len(v), v[0]) for c,v in cat_map().items() if v]
    out.sort(key=lambda x:-x[1])
    return out

def images_in_cat(cat):
    return cat_map().get(cat, [])

def live_index():
    """basename → one representative live relpath (newest)."""
    idx = {}
    for rp in referenced_images():
        if keyof(rp) not in idx: idx[keyof(rp)] = rp
    return idx

def search_images(query, limit=24):
    """Hunt ALL images under assets/ + approved-assets whose filename matches every token.
    This is how the tool finds a 'missing' image for Ali instead of her hunting."""
    toks = [t for t in re.split(r'[^a-z0-9]+', query.lower()) if t]
    if not toks: return []
    hits = set()
    for folder in ('assets','approved-assets'):
        d = os.path.join(WEB, folder)
        if not os.path.isdir(d): continue
        for base,_,files in os.walk(d):
            for f in files:
                if f.lower().endswith(IMG_EXT) and all(t in f.lower() for t in toks):
                    hits.add(os.path.relpath(os.path.join(base,f), ROOT))
    return sorted(hits)[:limit]

def read_tomake():
    try: return json.load(open(TOMAKE))
    except Exception: return []

def save_tomake(items): open(TOMAKE,'w').write(json.dumps(items, indent=1))

def read_state():
    try: return json.load(open(STATE)).get('checks',{})
    except Exception: return {}

def read_ideas():
    try: return open(IDEAS, encoding='utf-8').read()
    except Exception: return ''

STATES = ('correct','redo','unused')   # + '' = unsorted ; 'redo' = needs a change (see note)
STATE_LABEL = {'correct':'Correct','redo':'Needs a change','unused':'Not in use'}

_ORDER = {'correct':3,'redo':2,'unused':1,'':0}
def read_curation():
    try: c = json.load(open(CURATION))
    except Exception: return {}
    # migrate: path keys → basename; old 'keep' → 'correct'. Keeps strongest verdict on collision.
    out = {}; changed = False
    for k,v in c.items():
        nk = keyof(k) if ('/' in k or '\\' in k) else k
        nv = 'correct' if v=='keep' else v
        if nk!=k or nv!=v: changed = True
        if nk in out and _ORDER.get(nv,0) <= _ORDER.get(out[nk],0): continue
        out[nk] = nv
    if changed:
        try: save_curation(out)
        except Exception: pass
    return out

def save_curation(c):
    open(CURATION,'w').write(json.dumps(c, indent=0))

def read_notes():
    try: return json.load(open(NOTES))
    except Exception: return {}

def save_notes(n):
    open(NOTES,'w').write(json.dumps(n, indent=0))

def parse_ideas(txt):
    """Pull bullet lines out of IDEAS.md, grouped by the '## heading' above them."""
    groups=[]; cur=None
    for line in txt.splitlines():
        if line.startswith('## '):
            cur={'title':line[3:].strip(),'items':[]}; groups.append(cur)
        elif cur is not None and line.strip().startswith('- '):
            cur['items'].append(line.strip()[2:])
    return [g for g in groups if g['items']]

# ---------- HTML ----------
CSS = """
:root{--plum:#4b2148;--ink:#2a0f28;--cream:#fbf3ec;--muted:#c9a6c2;
 --pink:#e94494;--teal:#00aec0;--tang:#f47001;--peri:#788ae7;--coral:#ec2d53;--sky:#51cfe9}
*{box-sizing:border-box}
body{margin:0;background:#180818;color:var(--cream);font:15px/1.55 Inter,-apple-system,sans-serif}
a{color:inherit;text-decoration:none}
.wrap{max-width:1120px;margin:0 auto;padding:22px 20px 60px}
header.top{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;margin-bottom:6px}
h1{font:800 26px/1 "Jost",Inter,sans-serif;margin:0;letter-spacing:.01em}
h1 .ai{color:var(--pink)}
.tag{color:var(--muted);font-size:13px}
nav.tabs{display:flex;gap:8px;margin:18px 0 22px;flex-wrap:wrap}
nav.tabs a{padding:8px 15px;border-radius:999px;background:var(--ink);border:1px solid #3a1838;font-weight:600;font-size:14px}
nav.tabs a.on{background:var(--pink);border-color:var(--pink);color:#fff}
h2{font:800 13px/1 "Jost",Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin:30px 0 12px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
.card{background:var(--ink);border:1px solid #3a1838;border-radius:12px;overflow:hidden}
.card.done{border:1.5px solid #1d9e75}
.lb .done{color:#57e0a0;font-weight:600}
.lb .left{color:#f4a636;font-weight:600}
.card .ph{aspect-ratio:1;background:#241023;display:flex;align-items:center;justify-content:center;overflow:hidden}
.card .ph img{width:100%;height:100%;object-fit:cover;display:block}
.card .lb{padding:9px 11px}
.card .lb b{font-size:14px;font-weight:600;text-transform:capitalize}
.card .lb span{display:block;color:var(--muted);font-size:12px;margin-top:2px}
.gal{display:grid;grid-template-columns:repeat(auto-fill,minmax(165px,1fr));gap:10px}
.gal .g{position:relative;border-radius:10px;overflow:hidden;background:#241023;border:2.5px solid #3a1838}
.gal .g img{width:100%;display:block;aspect-ratio:1;object-fit:cover}
.gal .g[data-st="correct"]{border-color:#57e0a0}
.gal .g[data-st="redo"]{border-color:#f4a636}
.gal .g[data-st="unused"]{border-color:#6b5a68;opacity:.45}
.gal .ks{position:absolute;top:6px;right:6px;display:flex;gap:5px}
.gal .kb{width:32px;height:32px;border-radius:50%;border:none;cursor:pointer;background:rgba(24,8,24,.82);color:#fff;font-size:15px;line-height:32px;text-align:center;padding:0}
.gal .kb:hover{background:rgba(24,8,24,.98)}
.gal .g[data-st="correct"] .kb.c{background:#1d9e75}
.gal .g[data-st="redo"] .kb.r{background:#d98a1f}
.gal .g[data-st="unused"] .kb.u{background:#8a5384}
.gal .g[data-note]:not([data-note=""]) .kb.n{background:#d98a1f}
.gal .note{position:absolute;left:0;right:0;bottom:0;background:rgba(24,8,24,.9);color:#ffe9b3;font-size:11px;line-height:1.3;padding:5px 7px;text-align:left}
.gal .use{position:absolute;left:0;right:0;bottom:0;background:rgba(24,8,24,.8);color:#c9b0d6;font-size:10.5px;padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gal .noteedit{position:absolute;left:0;right:0;bottom:0;display:flex;gap:5px;align-items:center;background:rgba(24,8,24,.98);padding:6px;z-index:5}
.gal .noteedit input{flex:1;min-width:0;border:none;outline:1.5px solid #f4a636;background:#1c0a1a;color:#ffe9b3;font:12px Inter,sans-serif;padding:6px 7px;border-radius:6px}
.gal .noteedit button{flex:0 0 auto;border:none;background:#f4a636;color:#2a0f28;font:700 11px Inter,sans-serif;padding:6px 10px;border-radius:6px;cursor:pointer}
.bulkbar input{background:#1c0a1a;color:var(--cream);border:1px solid #4a2846;border-radius:8px;padding:7px 10px;font:13px Inter,sans-serif;min-width:180px}
.gal.onlyleft .g:not([data-st=""]){display:none}
.gal.selecting .g{cursor:pointer}
.gal .g.sel{outline:4px solid var(--pink);outline-offset:-4px}
.setbtn{background:var(--ink);border:1px solid #3a1838;color:var(--cream);border-radius:999px;padding:8px 16px;font:600 14px Inter,sans-serif;cursor:pointer;margin-bottom:12px}
.bulkbar{position:sticky;top:8px;z-index:20;display:flex;gap:8px;align-items:center;flex-wrap:wrap;background:#2a0f28;border:1px solid #5a2a54;border-radius:12px;padding:11px 14px;margin:0 0 12px}
.bulkbar span{color:var(--muted);font-size:13px}
.bulkbar button{background:var(--ink);border:1px solid #3a1838;color:var(--cream);border-radius:999px;padding:8px 14px;font:600 13px Inter,sans-serif;cursor:pointer}
.bulkbar button:hover{border-color:var(--pink)}
.stat{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px}
.tile{display:block;background:var(--ink);border:1px solid #3a1838;border-radius:12px;padding:14px 16px}
a.tile:hover{border-color:var(--pink)}
.tile .n{font:800 26px/1 "Jost",Inter,sans-serif}
.tile .l{color:var(--muted);font-size:12px;margin-top:6px}
.ok{color:#57e0a0}.no{color:#ff7a86}
.drop{background:linear-gradient(100deg,#3a1838,#2a0f28);border:1px solid #5a2a54;border-radius:14px;padding:16px 18px;margin-bottom:14px}
.drop textarea{width:100%;min-height:74px;background:#1c0a1a;color:var(--cream);border:1px solid #4a2846;border-radius:10px;padding:11px 13px;font:15px/1.5 Inter,sans-serif;resize:vertical}
.drop button{margin-top:10px;background:var(--pink);color:#fff;border:none;border-radius:999px;padding:10px 22px;font:700 15px Inter,sans-serif;cursor:pointer}
.drop .hint{color:var(--muted);font-size:12px;margin:0 0 9px}
.idea{background:var(--ink);border:1px solid #3a1838;border-radius:10px;padding:11px 13px;margin:7px 0;font-size:14px}
.idea .g{color:var(--pink);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em}
.saved{background:#0f3a2a;border:1px solid #1d9e75;color:#8ff0c4;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:14px}
.back{color:var(--sky);font-size:14px;font-weight:600}
.rm{background:transparent;border:1px solid #5a2a54;color:var(--muted);border-radius:999px;padding:5px 12px;font:600 12px Inter,sans-serif;cursor:pointer;white-space:nowrap}
.rm:hover{border-color:#ff7a86;color:#ff7a86}
"""
FONTS = '<link href="https://fonts.googleapis.com/css2?family=Jost:wght@600;800&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">'

JS = ("<script>"
      "function toggleLeft(btn){var gal=document.querySelector('.gal');if(!gal)return;"
      "var on=gal.classList.toggle('onlyleft');btn.textContent=on?'Show all':'Show only undecided';}"
      "function recount(){var tiles=document.querySelectorAll('.gal .g');if(!tiles.length)return;"
      "var left=0;[].forEach.call(tiles,function(g){if(!(g.getAttribute('data-st')||''))left++;});"
      "var el=document.getElementById('leftcount');if(el)el.textContent=left?(left+' left to decide'):'\\u2713 all decided';}"
      "function mk(el,st){var g=el.closest('.g');var p=g.getAttribute('data-p');"
      "var cur=g.getAttribute('data-st')||'';var next=(cur===st)?'':st;"
      "fetch('/mark',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},"
      "body:'p='+encodeURIComponent(p)+'&st='+next}).then(function(r){"
      "if(r.ok){g.setAttribute('data-st',next);recount();}});}"
      "var SELMODE=false;"
      "function selCount(){var n=document.querySelectorAll('.g.sel').length;var c=document.getElementById('selcount');if(c)c.textContent=n;}"
      "function toggleSel(btn){SELMODE=!SELMODE;var gal=document.querySelector('.gal');if(gal)gal.classList.toggle('selecting',SELMODE);"
      "var bb=document.getElementById('bulkbar');if(bb)bb.style.display=SELMODE?'flex':'none';"
      "btn.textContent=SELMODE?'Cancel':'Select many';"
      "if(!SELMODE){[].forEach.call(document.querySelectorAll('.g.sel'),function(g){g.classList.remove('sel');});selCount();}}"
      "function tileClick(e,g){if(SELMODE){e.preventDefault();g.classList.toggle('sel');selCount();return false;}return true;}"
      "function saveNote(g,p,t,box){if(box._done)return;box._done=true;if(box.parentNode)box.parentNode.removeChild(box);"
      "fetch('/note',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},"
      "body:'p='+encodeURIComponent(p)+'&text='+encodeURIComponent(t)}).then(function(r){if(!r.ok)return;"
      "g.setAttribute('data-note',t);var nc=g.querySelector('.note');"
      "if(t){if(!nc){nc=document.createElement('div');nc.className='note';g.appendChild(nc);}nc.textContent=t;"
      "if(g.getAttribute('data-st')!=='unused'){g.setAttribute('data-st','redo');}}else if(nc){nc.remove();}recount();});}"
      "function note(el){var g=el.closest('.g');if(g.querySelector('.noteedit'))return;var p=g.getAttribute('data-p');"
      "var box=document.createElement('div');box.className='noteedit';"
      "var inp=document.createElement('input');inp.value=g.getAttribute('data-note')||'';inp.placeholder='what needs to change';"
      "var b=document.createElement('button');b.type='button';b.textContent='save';"
      "box.appendChild(inp);box.appendChild(b);g.appendChild(box);inp.focus();inp.select();"
      "b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();saveNote(g,p,inp.value.trim(),box);});"
      "inp.addEventListener('keydown',function(e){e.stopPropagation();if(e.key==='Enter'){e.preventDefault();saveNote(g,p,inp.value.trim(),box);}"
      "else if(e.key==='Escape'){box._done=true;box.remove();}});}"
      "function applyBulk(st){var gs=document.querySelectorAll('.g.sel');if(!gs.length)return;"
      "var body='st='+st+'&'+[].map.call(gs,function(g){return 'p='+encodeURIComponent(g.getAttribute('data-p'));}).join('&');"
      "fetch('/mark_batch',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body})"
      ".then(function(r){if(r.ok)location.reload();});}"
      "function selectAll(){var gal=document.querySelector('.gal');if(!gal)return;"
      "if(!SELMODE){SELMODE=true;gal.classList.add('selecting');var bb=document.getElementById('bulkbar');if(bb)bb.style.display='flex';"
      "var sm=document.getElementById('selmany');if(sm)sm.textContent='Cancel';}"
      "[].forEach.call(gal.querySelectorAll('.g'),function(g){g.classList.add('sel');});selCount();}"
      "function applyBulkNote(){var gs=document.querySelectorAll('.g.sel');if(!gs.length)return;"
      "var el=document.getElementById('bulknote');var t=el?el.value.trim():'';if(!t)return;"
      "var body='text='+encodeURIComponent(t)+'&'+[].map.call(gs,function(g){return 'p='+encodeURIComponent(g.getAttribute('data-p'));}).join('&');"
      "fetch('/note_batch',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body})"
      ".then(function(r){if(r.ok)location.reload();});}"
      "</script>")

def page(body):
    return (f'<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">'
            f'<title>SUNNYVAiLE Workspace</title>{FONTS}<style>{CSS}</style>'
            f'<div class="wrap">{body}</div>{JS}')

def header(active):
    def t(href,name,key): return f'<a href="{href}" class="{"on" if key==active else ""}">{name}</a>'
    return (f'<header class="top"><h1>SUNNYV<span class="ai">Ai</span>LE — Workspace</h1>'
            f'<span class="tag">your place. it saves. it shows your work.</span></header>'
            f'<nav class="tabs">{t("/","Home","home")}{t("/gallery","Gallery","gallery")}'
            f'{t("/correct","Correct ✓","correct")}{t("/redo","To redo ↻","redo")}'
            f'{t("/tomake","To make +","tomake")}{t("/ideas","Ideas","ideas")}{t("/status","Status","status")}</nav>')

def bulk_controls():
    return ('<button class="setbtn" id="selmany" onclick="toggleSel(this)">Select many</button>'
            '<button class="setbtn" onclick="selectAll()" style="margin-left:8px">Select all</button>'
            '<div id="bulkbar" class="bulkbar" style="display:none">'
            '<span><b id="selcount">0</b> selected — apply to all:</span>'
            '<button onclick="applyBulk(\'correct\')">✓ correct</button>'
            '<button onclick="applyBulk(\'redo\')">↻ needs a change</button>'
            '<button onclick="applyBulk(\'unused\')">✕ not in use</button>'
            '<button onclick="applyBulk(\'\')">clear</button>'
            '<input id="bulknote" placeholder="one note for all selected…">'
            '<button onclick="applyBulkNote()">✎ apply note</button></div>')

def gal_tiles(imgs, cur, notes=None):
    notes = notes if notes is not None else read_notes()
    out=[]
    for rp in imgs:
        k = keyof(rp); st = cur.get(k,''); nt = notes.get(k,''); q = urllib.parse.quote(rp)
        cap = f'<div class="note">{esc(nt)}</div>' if nt else ''
        uses = used_on(rp)
        use = f'<div class="use" title="used on {esc(uses)}">▸ {esc(uses)}</div>' if uses else ''
        out.append(
            f'<div class="g" data-p="{esc(rp)}" data-st="{st}" data-note="{esc(nt)}">'
            f'<a href="/img?p={q}" target="_blank" onclick="return tileClick(event,this.closest(\'.g\'))"><img loading="lazy" src="/img?p={q}"></a>{use}'
            f'<div class="ks">'
            f'<button class="kb c" onclick="mk(this,\'correct\')" title="Correct" aria-label="Correct">✓</button>'
            f'<button class="kb n" onclick="note(this)" title="Note what needs to change (a few words)" aria-label="Add a note">✎</button>'
            f'<button class="kb r" onclick="mk(this,\'redo\')" title="Needs a change" aria-label="Needs a change">↻</button>'
            f'<button class="kb u" onclick="mk(this,\'unused\')" title="Not in use" aria-label="Not in use">✕</button>'
            f'</div>{cap}</div>')
    return ''.join(out)

def home_body():
    checks = read_state()
    hdr = checks.get('header',{}); zom = checks.get('zombies',{}); brk = checks.get('broken_layout',{})
    def num(c,k,inv=True):
        v = c.get(k)
        return v if v is not None else '—'
    missing = len(hdr.get('missing_real',[])) if hdr else '—'
    idx = live_index()
    cur = read_curation()
    def cnt(s): return sum(1 for k in idx if cur.get(k)==s)
    total = len(idx)
    n_cor, n_redo, n_un = cnt('correct'), cnt('redo'), cnt('unused')
    n_unsorted = total - n_cor - n_redo - n_un
    n_make = len(read_tomake())
    img_tiles = (f'<div class="stat">'
             f'<a class="tile" href="/correct"><div class="n ok">{n_cor}</div><div class="l">correct (your clean library)</div></a>'
             f'<a class="tile" href="/redo"><div class="n" style="color:#f4a636">{n_redo}</div><div class="l">needs a change (with your notes)</div></a>'
             f'<a class="tile" href="/sorted?s=unused"><div class="n" style="color:#b39ab0">{n_un}</div><div class="l">not in use</div></a>'
             f'<a class="tile" href="/tomake"><div class="n" style="color:#51cfe9">{n_make}</div><div class="l">to make (missing → generate)</div></a>'
             f'<a class="tile" href="/gallery"><div class="n">{n_unsorted}</div><div class="l">still to sort ({total} live images)</div></a>'
             f'</div>')
    site_tiles = (f'<div class="stat">'
             f'<div class="tile"><div class="n {"no" if missing else "ok"}">{missing}</div><div class="l">pages missing header</div></div>'
             f'<div class="tile"><div class="n no">{zom.get("count","—")}</div><div class="l">dead pages to clear</div></div>'
             f'<div class="tile"><div class="n no">{brk.get("count","—")}</div><div class="l">pages on broken layout</div></div>'
             f'</div>')
    return (header('home')
            + '<h2>Your images</h2>' + img_tiles
            + '<h2>Where the site stands</h2>' + site_tiles
            + '<h2>Your work — tap a set to sort it</h2>'
            + f'<div class="grid">{cat_cards_html()}</div>')

def missing_box(cat=''):
    return ('<div class="drop"><p class="hint">Something you expect here is missing? Name it — I\'ll '
            'search everything first. If it exists, I show it (and don\'t add it). Only if it\'s truly missing does it go on <b>To make</b>.</p>'
            '<form method="POST" action="/make">'
            f'<input type="hidden" name="cat" value="{esc(cat)}">'
            '<textarea name="text" placeholder="e.g. post office lobby"></textarea><br>'
            '<button type="submit">It\'s missing →</button></form></div>')

def gallery_body(cat):
    cats = [c for c,_,_ in categories()]
    if cat and cat in cats:
        imgs = images_in_cat(cat)[:400]
        cur = read_curation()
        n_cor = sum(1 for rp in imgs if cur.get(keyof(rp))=='correct')
        left = sum(1 for rp in imgs if not cur.get(keyof(rp)))
        prog = '✓ all decided' if left==0 else f'{left} left to decide'
        return (header('gallery') + f'<a class="back" href="/gallery">← all sets</a>'
                + f'<h2>{esc(pretty(cat))} — {len(imgs)} · {n_cor} correct · <span id="leftcount">{esc(prog)}</span></h2>'
                + '<p class="tag" style="margin:-6px 0 12px">On each image: <b style="color:#57e0a0">✓</b> correct · '
                + '<b style="color:#f4a636">✎</b> note what to change · <b style="color:#f4a636">↻</b> needs a change · '
                + '<b style="color:#b39ab0">✕</b> not in use. Tap again to undo. Lots at once? <b>Select many</b>.</p>'
                + '<button class="setbtn" style="margin-right:8px" onclick="toggleLeft(this)">Show only undecided</button>'
                + bulk_controls()
                + f'<div class="gal">{gal_tiles(imgs, cur)}</div>'
                + '<h2>Missing something?</h2>' + missing_box(cat))
    # overview
    return header('gallery') + '<h2>Your work (what\'s live on the site)</h2>' + f'<div class="grid">{cat_cards_html()}</div>'

SORTED_META = {
    'correct': ('correct', 'Correct — your clean library',
                'This is the only set I use as a reference going forward.',
                'Nothing marked correct yet. Open a set in Gallery and tap ✓ on the good ones.'),
    'redo':    ('redo', 'Needs a change — your worklist',
                'Everything you flagged, each with your note on what to fix (recolor, sign wrong, regenerate…). This is what feeds the fixes.',
                'Nothing flagged yet. On any image tap ✎ to jot what needs changing, or ↻ to flag it.'),
    'unused':  ('unused', 'Not in use',
                'Dead / not used anywhere. Candidates to archive later — nothing gets deleted automatically.',
                'Nothing marked not-in-use yet. Tap ✕ on images that aren\'t used.'),
}
def sorted_body(state):
    active, title, blurb, empty = SORTED_META[state]
    cur = read_curation(); idx = live_index(); notes = read_notes()
    rps = sorted([idx[k] for k,v in cur.items() if v==state and k in idx], key=_mtime, reverse=True)
    nav_key = {'correct':'correct','redo':'redo','unused':'home'}[state]
    if not rps:
        return header(nav_key) + f'<h2>{esc(title)} — 0</h2><p class="tag">{esc(empty)}</p>'
    return (header(nav_key) + f'<h2>{esc(title)} — {len(rps)}</h2>'
            + f'<p class="tag" style="margin:-6px 0 12px">{esc(blurb)}</p>'
            + bulk_controls()
            + f'<div class="gal">{gal_tiles(rps, cur, notes)}</div>')

def _thumbgrid(rps, limit=12):
    thumbs = ''.join(
        f'<a href="/img?p={urllib.parse.quote(rp)}" target="_blank" style="display:block;border-radius:8px;overflow:hidden;border:1px solid #3a1838">'
        f'<img loading="lazy" src="/img?p={urllib.parse.quote(rp)}" style="width:100%;display:block;aspect-ratio:1;object-fit:cover"></a>'
        for rp in rps[:limit])
    return f'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px">{thumbs}</div>'

def find_result_body(text, cat):
    hits = search_images(text)
    return (header('tomake')
        + f'<h2>Found {len(hits)} that might be “{esc(text)}”</h2>'
        + '<p class="tag" style="margin:-6px 0 12px">If one of these is it, you\'re done — it already exists, nothing to make. '
        + 'Only add it if none of these are right.</p>'
        + _thumbgrid(hits)
        + '<h2>None of these?</h2>'
        + '<form method="POST" action="/make_confirm">'
        + f'<input type="hidden" name="text" value="{esc(text)}"><input type="hidden" name="cat" value="{esc(cat)}">'
        + '<button class="setbtn" type="submit">None match — add to make-list</button></form>'
        + '<p style="margin-top:12px"><a class="back" href="/tomake">← back to To make</a></p>')

def tomake_body():
    items = read_tomake()
    head = (header('tomake') + '<h2>Missing images → to make</h2>'
            + '<p class="tag" style="margin:-6px 0 12px">Name anything that should exist. I search everything first — '
            + 'if it already exists (just mis-filed) I show it and <b>don\'t</b> add it. Only truly-missing ones land here.</p>'
            + missing_box(''))
    if not items:
        return head + '<p class="tag">Nothing on the make-list yet.</p>'
    rows = ''
    for idx, it in list(enumerate(items))[::-1]:
        cat = f' · {esc(pretty(it["cat"]))}' if it.get('cat') else ''
        rows += (f'<div class="idea" style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:9px">'
                 f'<div><div class="tt" style="font-weight:600">{esc(it.get("text",""))}</div>'
                 f'<div class="tag">{cat} · added {esc(it.get("added",""))}</div></div>'
                 f'<form method="POST" action="/make_remove"><input type="hidden" name="i" value="{idx}">'
                 f'<button class="rm" type="submit">remove</button></form></div>')
    return head + f'<h2>Your make-list — {len(items)}</h2>' + rows

def ideas_body(saved=False):
    groups = parse_ideas(read_ideas())
    saved_html = '<div class="saved">Saved. It\'s in your ideas bank now — nothing lost.</div>' if saved else ''
    drop = ('<div class="drop"><p class="hint">Type anything — messy is fine. It saves straight into your ideas bank.</p>'
            '<form method="POST" action="/idea">'
            '<textarea name="text" placeholder="idea: ..." autofocus></textarea><br>'
            '<button type="submit">Drop it in</button></form></div>')
    body = ''
    for g in groups:
        if 'DROP ZONE' in g['title']: continue
        items = ''.join(f'<div class="idea"><span class="g">{esc(g["title"])}</span>{esc(i)}</div>' for i in g['items'])
        body += items
    return header('ideas') + saved_html + '<h2>Drop an idea</h2>' + drop + '<h2>Everything you\'ve shared, not built</h2>' + body

def status_body():
    checks = read_state()
    def row(key,label):
        c = checks.get(key,{}); s = c.get('status','—'); ok = s=='DONE'
        detail = ''
        if key=='header' and c.get('missing_real'):
            detail = '<div class="l">'+esc(', '.join(c['missing_real'][:8]))+('…' if len(c['missing_real'])>8 else '')+'</div>'
        return f'<div class="tile"><div class="n {"ok" if ok else "no"}">{"OK" if ok else "NO"}</div><div class="l">{esc(label)}</div><div class="l">{esc(s)}</div>{detail}</div>'
    dep = checks.get('deploy',{})
    deprow = (f'<div class="tile"><div class="l">Deploy</div><div class="l">branch <b>{esc(dep.get("branch","—"))}</b> · '
              f'{esc(dep.get("uncommitted_files","—"))} uncommitted · {esc(dep.get("commits_ahead_of_main","—"))} ahead of main</div></div>')
    return (header('status') + '<h2>The real numbers (verified, not claimed)</h2>'
            + '<div class="stat">' + row('header','Headers match homepage') + row('zombies','Dead pages removed')
            + row('broken_layout','Off the broken layout') + deprow + '</div>'
            + '<p class="tag" style="margin-top:16px">Refresh after work lands — these update from the truth-engine check.</p>')

class H(BaseHTTPRequestHandler):
    def _send(self, body, ct='text/html; charset=utf-8', code=200):
        b = body.encode('utf-8') if isinstance(body,str) else body
        self.send_response(code); self.send_header('Content-Type',ct)
        self.send_header('Content-Length',str(len(b))); self.end_headers(); self.wfile.write(b)
    def log_message(self,*a): pass
    def do_GET(self):
        u = urllib.parse.urlparse(self.path); q = urllib.parse.parse_qs(u.query)
        if u.path == '/':            return self._send(page(home_body()))
        if u.path == '/gallery':     return self._send(page(gallery_body(q.get('cat',[''])[0])))
        if u.path == '/correct':     return self._send(page(sorted_body('correct')))
        if u.path == '/redo':        return self._send(page(sorted_body('redo')))
        if u.path == '/sorted':
            s = q.get('s',['correct'])[0]
            return self._send(page(sorted_body(s if s in SORTED_META else 'correct')))
        if u.path == '/tomake':      return self._send(page(tomake_body()))
        if u.path == '/ideas':       return self._send(page(ideas_body(saved=q.get('saved',['0'])[0]=='1')))
        if u.path == '/status':      return self._send(page(status_body()))
        if u.path == '/img':
            rp = q.get('p',[''])[0]
            full = os.path.realpath(os.path.join(ROOT, rp))
            if full.startswith(os.path.realpath(ROOT)) and full.lower().endswith(IMG_EXT) and os.path.isfile(full):
                ct = mimetypes.guess_type(full)[0] or 'application/octet-stream'
                return self._send(open(full,'rb').read(), ct)
            return self._send('not found','text/plain',404)
        return self._send('not found','text/plain',404)
    def do_POST(self):
        if urllib.parse.urlparse(self.path).path == '/idea':
            n = int(self.headers.get('Content-Length',0))
            data = urllib.parse.parse_qs(self.rfile.read(n).decode('utf-8'))
            text = (data.get('text',[''])[0]).strip()
            if text:
                stamp = datetime.date.today().isoformat()
                line = f'- {text}  _(added {stamp})_\n'
                txt = read_ideas()
                marker = '<!-- just type below this line'
                if marker in txt:
                    i = txt.index('\n', txt.index(marker))+1
                    txt = txt[:i] + line + txt[i:]
                else:
                    txt += '\n' + line
                open(IDEAS,'w',encoding='utf-8').write(txt)
            self.send_response(303); self.send_header('Location','/ideas?saved=1'); self.end_headers(); return
        if urllib.parse.urlparse(self.path).path == '/make':
            n = int(self.headers.get('Content-Length',0))
            data = urllib.parse.parse_qs(self.rfile.read(n).decode('utf-8'))
            text = (data.get('text',[''])[0]).strip(); cat = data.get('cat',[''])[0]
            if text and search_images(text):
                # it already exists somewhere — show matches, DON'T add yet
                return self._send(page(find_result_body(text, cat)))
            if text:
                items = read_tomake()
                items.append({'text':text, 'cat':cat, 'added':datetime.date.today().isoformat()})
                save_tomake(items)
            self.send_response(303); self.send_header('Location','/tomake'); self.end_headers(); return
        if urllib.parse.urlparse(self.path).path == '/make_confirm':
            n = int(self.headers.get('Content-Length',0))
            data = urllib.parse.parse_qs(self.rfile.read(n).decode('utf-8'))
            text = (data.get('text',[''])[0]).strip(); cat = data.get('cat',[''])[0]
            if text:
                items = read_tomake()
                items.append({'text':text, 'cat':cat, 'added':datetime.date.today().isoformat()})
                save_tomake(items)
            self.send_response(303); self.send_header('Location','/tomake'); self.end_headers(); return
        if urllib.parse.urlparse(self.path).path == '/make_remove':
            n = int(self.headers.get('Content-Length',0))
            data = urllib.parse.parse_qs(self.rfile.read(n).decode('utf-8'))
            try: i = int(data.get('i',['-1'])[0])
            except Exception: i = -1
            items = read_tomake()
            if 0 <= i < len(items): items.pop(i); save_tomake(items)
            self.send_response(303); self.send_header('Location','/tomake'); self.end_headers(); return
        if urllib.parse.urlparse(self.path).path == '/note':
            n = int(self.headers.get('Content-Length',0))
            data = urllib.parse.parse_qs(self.rfile.read(n).decode('utf-8'))
            rp = data.get('p',[''])[0]; text = (data.get('text',[''])[0]).strip()
            k = keyof(rp); notes = read_notes()
            if text:
                notes[k] = text; save_notes(notes)
                cur = read_curation()
                if cur.get(k) != 'unused':          # a note = "needs a change" (overrides correct; leaves unused alone)
                    cur[k] = 'redo'; save_curation(cur)
            else:
                notes.pop(k, None); save_notes(notes)
            return self._send('ok','text/plain',200)
        if urllib.parse.urlparse(self.path).path == '/note_batch':
            n = int(self.headers.get('Content-Length',0))
            data = urllib.parse.parse_qs(self.rfile.read(n).decode('utf-8'))
            text = (data.get('text',[''])[0]).strip(); paths = data.get('p',[])
            if text:
                notes = read_notes(); cur = read_curation()
                for rp in paths:
                    k = keyof(rp); notes[k] = text
                    if cur.get(k) != 'unused': cur[k] = 'redo'
                save_notes(notes); save_curation(cur)
            return self._send('ok','text/plain',200)
        if urllib.parse.urlparse(self.path).path == '/mark':
            n = int(self.headers.get('Content-Length',0))
            data = urllib.parse.parse_qs(self.rfile.read(n).decode('utf-8'))
            rp = data.get('p',[''])[0]; st = data.get('st',[''])[0]
            cur = read_curation()
            if st in STATES: cur[keyof(rp)] = st
            else: cur.pop(keyof(rp), None)
            save_curation(cur)
            return self._send('ok','text/plain',200)
        if urllib.parse.urlparse(self.path).path == '/mark_batch':
            n = int(self.headers.get('Content-Length',0))
            data = urllib.parse.parse_qs(self.rfile.read(n).decode('utf-8'))
            st = data.get('st',[''])[0]; paths = data.get('p',[])
            cur = read_curation()
            for rp in paths:
                if st in STATES: cur[keyof(rp)] = st
                else: cur.pop(keyof(rp), None)
            save_curation(cur)
            return self._send('ok','text/plain',200)
        self.send_response(404); self.end_headers()

if __name__ == '__main__':
    print(f'SUNNYVAiLE Workspace running →  http://localhost:{PORT}')
    ThreadingHTTPServer(('127.0.0.1',PORT), H).serve_forever()
