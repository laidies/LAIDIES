#!/usr/bin/env python3
"""Build the Operations Centre dashboard from verified state + ledgers.
Run AFTER check_site.py. Writes operations/ops/ops-centre.html (open it directly).

This mirrors the FULL documented vision (operations/command-center-spec.md) — all 11
elements are present as panels. Each panel is honestly badged:
  WIRED   = real data / really runs right now
  PARTIAL = installed or seeded, but not surfaced/automated yet
  PLANNED = not built; each says what it takes to light up.
Nothing here is faked "done." A panel showing structure is not a claim that it works.
"""
import os, json, html
HERE = os.path.dirname(os.path.abspath(__file__))
state  = json.load(open(os.path.join(HERE,'state.json')))
tasks  = json.load(open(os.path.join(HERE,'tasks.json')))['tasks']
agents = json.load(open(os.path.join(HERE,'agents.json')))['agents']
checks = state['checks']

def esc(s): return html.escape(str(s))

# ---- the 11 documented elements → panel status (from command-center-spec.md) ----
ELEMENTS = [
    ('1',  'Everything in one place',   'WIRED',   'State + tasks, verified below.'),
    ('2',  'Tools, quick access',       'WIRED',   'One click to every tool.'),
    ('3',  "This week's episode",       'PARTIAL', 'Shows status; not yet auto-pulled.'),
    ('4',  'Agentic OS (all agents)',   'PARTIAL', 'Registry live; most agents planned.'),
    ('5',  'Analytics → insights',      'PLANNED', 'Plausible+Clarity collecting; not surfaced.'),
    ('6',  'Social engine + posting',   'PLANNED', 'Not built.'),
    ('7',  'Two-way inbox',             'WIRED',   'Approvals/questions + your ideas.'),
    ('8',  'One task at a time',        'WIRED',   'Current focus, below.'),
    ('9',  'News + explanation',        'PARTIAL', 'Hot Goss runs; explanation layer planned.'),
    ('10', 'Trusted sources',           'PARTIAL', 'Seeded list; not yet wired to agents.'),
    ('11', 'Unified chat (Claude+Codex)','PLANNED','Needs a real app, not a static page.'),
]
BADGE = {'WIRED':'#1d9e75','PARTIAL':'#c98a2b','PLANNED':'#8a5384','NOT':'#e24b4a'}

def badge(state_str):
    return f'<span class="badge" style="background:{BADGE.get(state_str,"#888")}">{esc(state_str)}</span>'

# ---- element 1: verified state ----
def state_row(key):
    c = checks[key]; s = c.get('status',''); ok = s=='DONE'
    extra=''
    if key=='header' and c.get('missing_real'):
        extra='<div class="tn">missing: '+esc(', '.join(c['missing_real']))+'</div>'
    if key in ('zombies','broken_layout') and c.get('pages'):
        extra='<div class="tn">'+esc(', '.join(c['pages']))+'</div>'
    col = '#1d9e75' if ok else '#e24b4a'
    return (f'<div class="row"><div class="pill" style="background:{col}">{"OK" if ok else "NO"}</div>'
            f'<div><div class="tt">{esc(c["label"])}</div><div class="tn">{esc(s)}</div>{extra}</div></div>')

dep = checks['deploy']
deploy_html = (f'<div class="tn">branch <b>{esc(dep["branch"])}</b> · {esc(dep["commits_ahead_of_main"])} ahead of main · '
               f'<b>{esc(dep["uncommitted_files"])} uncommitted files</b><br>main last: {esc(dep["main_last_commit"])}<br>'
               f'<i>{esc(dep["note"])}</i></div>')

# ---- element 8: current focus + tasks ----
def task_status(t):
    v = t.get('verify','')
    if v.startswith('check:'):
        s = checks.get(v.split(':',1)[1],{}).get('status','?')
        return ('done' if s=='DONE' else 'notdone')
    return t['status']
PILL = {'done':('#1d9e75','done'),'doing':('#378add','in progress'),'blocked':('#e24b4a','blocked'),
        'todo':('#888780','to do'),'notdone':('#e24b4a','NOT done'),'auto':('#888780','—')}
def task_row(t):
    st = task_status(t); col,lab = PILL.get(st,PILL['todo'])
    verified = 'verified by a check' if t.get('verify','').startswith('check') else 'status is manual (unverified)'
    return (f'<div class="row"><div class="pill" style="background:{col}">{esc(lab)}</div>'
            f'<div><div class="tt">{esc(t["title"])}</div><div class="tn">{esc(t["notes"])}</div>'
            f'<div class="tm">owner: {esc(t["owner"])} · {verified}</div></div></div>')
focus = next((t for t in tasks if task_status(t)=='doing'), None)
focus_html = (f'<div class="focus"><div class="tn" style="color:#e982ab">CURRENT FOCUS (one thing)</div>'
              f'<div class="tt" style="font-size:17px">{esc(focus["title"])}</div>'
              f'<div class="tn">{esc(focus["notes"])}</div></div>') if focus else ''
tasks_html = ''.join(task_row(t) for t in tasks)

# ---- element 4: agents ----
def agent_row(a):
    col = BADGE.get(a['state'].split()[0], '#8a5384')
    return (f'<div class="row"><div class="pill" style="background:{col}">{esc(a["state"].split()[0])}</div>'
            f'<div><div class="tt">{esc(a["name"])}</div><div class="tn">{esc(a["role"])}</div>'
            f'<div class="tm">{esc(a["runs"])} · last: {esc(a["last"])}</div></div></div>')
agents_html = ''.join(agent_row(a) for a in agents)

# ---- element 2: tools ----
TOOLS = [('Live site','https://laidies.ai'),('GitHub','https://github.com/laidies/LAIDIES'),
         ('Cloudflare','https://dash.cloudflare.com'),('Plausible','https://plausible.io/laidies.ai'),
         ('Clarity','https://clarity.microsoft.com'),('Suno','https://suno.com'),
         ('ElevenLabs','https://elevenlabs.io'),('YouTube @LAiDIES','https://youtube.com/@LAiDIES'),
         ('IG @laidies.ai','https://instagram.com/laidies.ai')]
tools_html = ' '.join(f'<a href="{u}" target="_blank">{esc(n)}</a>' for n,u in TOOLS)

# ---- element 7: two-way inbox (waiting on Ali) ----
inbox = [t for t in tasks if t['owner']=='Ali' or t['status']=='blocked']
inbox_html = ''.join(
    f'<div class="row"><div class="pill" style="background:#e24b4a">you</div>'
    f'<div><div class="tt">{esc(t["title"])}</div><div class="tn">{esc(t["notes"])}</div></div></div>'
    for t in inbox) or '<div class="tn">Nothing waiting on you right now.</div>'

# ---- planned-panel helper (elements 5,6,9,11 + partials) ----
def planned(title, what_it_takes):
    return (f'<div class="row"><div class="pill" style="background:#8a5384">plan</div>'
            f'<div><div class="tt">{esc(title)}</div>'
            f'<div class="tn"><b>To light up:</b> {esc(what_it_takes)}</div></div></div>')

analytics_html = (planned('Visitors / sign-ups / engagement, in here',
        'Plausible + Clarity are installed and collecting now. Needs: pull their APIs into a small script, show the numbers here, and add a plain-English "what changed / what to do" line.')
    + '<div class="tn" style="margin-top:8px">Until then, the raw dashboards are one click away under Tools.</div>')
social_html = planned('Generate + schedule IG/YT posts per episode',
        'A generator that turns each episode into captions + stills + a post schedule. Nothing built yet — this is a real project, not a checkbox.')
news_html = (planned('Explanation layer on the news',
        'Hot Goss already fetches + rewrites AI news daily (LIVE). Needs: the LAiDIES "here\'s what it means for you" layer, and a curated-opinion feed.')
    )
chat_html = planned('Chat with Claude AND Codex from inside the centre',
        'A static page can\'t host a live two-way chat. Needs a small real app (local server or hosted) that talks to both, shares repo context, and manages that context. Biggest lift of the 11 — do it last.')
sources_html = ('<div class="tn">Seeded registry of sources agents are allowed to trust '
                '(verification rulebook, current-models.js, official model docs). Lives at '
                '<code>operations/reference/</code>. Not yet enforced in agent prompts — that\'s the wiring step.</div>')
episode_html = ('<div class="tn">This week: see the Ep4 task under focus/tasks. '
                'Auto-pull of the live episode\'s status + surfaces is the PARTIAL step.</div>')

CSS = """
:root{--plum:#4b2148;--cream:#fbf3ec;--muted:#c9a6c2;--card:#2a0f28;--ink:#3a1838}
*{box-sizing:border-box}
body{margin:0;background:#180818;color:var(--cream);font:15px/1.5 -apple-system,Inter,sans-serif;padding:24px;max-width:1040px;margin:auto}
h1{font:800 26px/1.1 Inter;margin:0 0 2px;letter-spacing:-.01em}h1 .ai{color:#e982ab}
.sub{color:var(--muted);font-size:13px;margin-bottom:20px}
.sub code{background:#2a0f28;padding:2px 6px;border-radius:5px;font-size:12px}
h2{font:800 13px/1.2 Inter;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);margin:26px 0 4px;display:flex;align-items:center;gap:9px}
.map{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px;margin:6px 0 8px}
.mapcard{background:var(--card);border:1px solid var(--ink);border-radius:10px;padding:11px 12px}
.mapcard .n{font-size:11px;color:#7d5f78;font-weight:700}
.mapcard .t{font-weight:600;font-size:14px;margin:2px 0 5px}
.mapcard .d{font-size:12px;color:var(--muted)}
.badge{display:inline-block;font:700 10px/1 Inter;color:#fff;padding:4px 7px;border-radius:999px;letter-spacing:.04em;vertical-align:middle}
.panel{background:#1e0b1c;border:1px solid var(--ink);border-radius:12px;padding:6px 14px 12px;margin:0 0 6px}
.row{display:flex;gap:12px;align-items:flex-start;padding:11px 2px;border-bottom:1px solid #2a1428}
.row:last-child{border-bottom:none}
.pill{flex:0 0 auto;font:700 11px/1 Inter;color:#fff;padding:6px 9px;border-radius:999px;min-width:66px;text-align:center}
.tt{font-weight:600}.tn{font-size:13px;color:var(--muted);margin-top:3px;word-break:break-word}
.tm{font-size:12px;color:#7d5f78;margin-top:4px}
.focus{background:linear-gradient(90deg,#3a1838,#2a0f28);border:1px solid #5a2a54;border-radius:10px;padding:12px 14px;margin:8px 0}
a{color:#57b6c0;text-decoration:none;background:#2a0f28;border:1px solid var(--ink);border-radius:999px;padding:6px 12px;font-size:13px;display:inline-block;margin:3px 3px 3px 0}
.legend{font-size:12px;color:#7d5f78;margin:2px 0 0}
"""

mapcards = ''.join(
    f'<div class="mapcard"><div class="n">{n}</div><div class="t">{esc(t)} {badge(s)}</div><div class="d">{esc(d)}</div></div>'
    for n,t,s,d in ELEMENTS)

HTML = f"""<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<title>SUNNYVAiLE Operations Centre</title><style>{CSS}</style>
<h1>SUNNYV<span class="ai">Ai</span>LE — Operations Centre</h1>
<div class="sub">The whole system in one place. Verified state, not claims. &nbsp;
Re-run: <code>python3 operations/ops/check_site.py &amp;&amp; python3 operations/ops/build_dashboard.py</code></div>

<h2>The system — all 11 parts</h2>
<div class="legend">{badge('WIRED')} really works now &nbsp; {badge('PARTIAL')} seeded/installed, not automated &nbsp; {badge('PLANNED')} not built — says what it takes</div>
<div class="map">{mapcards}</div>

<h2>8 · One thing at a time</h2>
<div class="panel">{focus_html}</div>

<h2>1 · State of the site {badge('WIRED')}</h2>
<div class="panel">{state_row('header')}{state_row('zombies')}{state_row('broken_layout')}
<div class="row"><div class="pill" style="background:#888780">info</div><div><div class="tt">Deploy / live state</div>{deploy_html}</div></div></div>

<h2>Tasks toward launch</h2>
<div class="panel">{tasks_html}</div>

<h2>7 · Waiting on you {badge('WIRED')}</h2>
<div class="panel">{inbox_html}</div>

<h2>4 · Agents {badge('PARTIAL')}</h2>
<div class="panel">{agents_html}</div>

<h2>2 · Tools {badge('WIRED')}</h2>
<div class="panel">{tools_html}</div>

<h2>3 · This week's episode {badge('PARTIAL')}</h2>
<div class="panel">{episode_html}</div>

<h2>5 · Analytics → insights {badge('PLANNED')}</h2>
<div class="panel">{analytics_html}</div>

<h2>9 · News + explanation {badge('PARTIAL')}</h2>
<div class="panel">{news_html}</div>

<h2>10 · Trusted sources {badge('PARTIAL')}</h2>
<div class="panel">{sources_html}</div>

<h2>6 · Social engine {badge('PLANNED')}</h2>
<div class="panel">{social_html}</div>

<h2>11 · Unified chat {badge('PLANNED')}</h2>
<div class="panel">{chat_html}</div>
"""
out = os.path.join(HERE,'ops-centre.html')
open(out,'w').write(HTML)
print('wrote', out)
