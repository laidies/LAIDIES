import json, re, sys, difflib
SPEAKERS = {"tv announcer":"The Announcer","host":"The Heroine","ada lovelace":"Ada Lovelace",
            "hedy lamarr":"Hedy Lamarr","grace hopper":"Grace Hopper",
            "karen sparck jones":"Karen Spärck Jones"}

# The recording script spells brand words phonetically for the TTS engine.
# Captions are VIEWER-FACING, so they use brand spelling. Context-sensitive:
# "on ladies" = the show; "remember, ladies" = her addressing the audience.
BRAND = [
    # the URL, spoken as "ladies dot A I" — written down it's the real address
    (r"\bladies dot A\s*I\b",   "laidies.ai"),
    # EVERY other "ladies" is the brand — show name, vocative, and the quoted
    # spelling gag alike. Ali 2026-07-22: the audience ARE LAiDIES. No exceptions.
    (r"\bladies\b",              "LAiDIES"),
    (r"\bSunnyvale\b",           "SUNNYVAiLE"),
    (r"\bMavens\b",              "MAiVENS"),
    (r"\bMaven\b",               "MAiVEN"),
]
def brandify(t):
    for pat, rep in BRAND: t = re.sub(pat, rep, t)
    return t

script_p, words_p, outdir = sys.argv[1], sys.argv[2], sys.argv[3]

# --- which episode? ------------------------------------------------------
# Was hard-coded to "episode-04", so running this for any other episode
# silently overwrote Ep4's timing map and captions. Derive it from the script
# filename (episode-05-elevenlabs-v3-tagged.txt -> 05); allow an explicit
# 4th argument to override. Refuse to guess — a wrong number destroys work.
if len(sys.argv) > 4:
    EP = f"{int(sys.argv[4]):02d}"
else:
    m = re.search(r"episode-(\d{1,2})", script_p)
    if not m:
        sys.exit(f"align.py: cannot tell which episode '{script_p}' is.\n"
                 f"           Pass the number explicitly: align.py <script> <words> <outdir> <N>")
    EP = f"{int(m.group(1)):02d}"
STEM = f"episode-{EP}"
print(f"episode {EP}  ->  {outdir}/{STEM}-timing-map.json, {STEM}.vtt, {STEM}.srt")

# --- 1. parse the true script into (speaker, sentence) units -------------
# Three script formats have to work here:
#   Ep2 marks voices with `=== HOST VOICE ===` SECTION headers (sticky).
#   Ep1 tags only the intro/outro with an inline `[tv announcer]` (per-line).
#   Ep4 uses inline maven tags inside a host section.
# So: a `=== header ===` sets the STICKY section default; an inline `[speaker]`
# tag applies to ITS OWN line only, then we revert to the section default. If
# inline tags were sticky (the old behaviour), Ep1's announcer intro bled
# through the whole episode and every host line came out "The Announcer".
units=[]; section="The Heroine"
for line in open(script_p):
    line=line.strip()
    if not line or line.startswith("#"): continue
    # `=== VOICE ===` section headers — NOT spoken; switch the sticky default.
    hm=re.match(r"^===\s*(.+?)\s*===$", line)
    if hm:
        h=hm.group(1).upper()
        if "ANNOUNCER" in h: section="The Announcer"
        elif "EXPERT" in h or "SEPARATE VOICE" in h: section="The Expert"
        elif "HOST" in h or "JESSICA" in h: section="The Heroine"
        continue
    # inline leading speaker tag(s) — apply to THIS line only
    cur=section
    m=re.match(r"^\[([^\]]+)\]\s*", line)
    while m and m.group(1).lower() in SPEAKERS:
        cur=SPEAKERS[m.group(1).lower()]; line=line[m.end():]; m=re.match(r"^\[([^\]]+)\]\s*", line)
    line=re.sub(r"\[[^\]]*\]","",line)              # strip delivery cues
    line=re.sub(r"\s+"," ",line).strip()
    if not line: continue
    for sent in re.split(r"(?<=[.!?…])\s+(?=[A-Z\"'—])", line):
        sent=sent.strip()
        if sent: units.append({"speaker":cur,"text":brandify(sent)})

norm=lambda s: re.sub(r"[^a-z0-9' ]"," ",s.lower()).split()
script_tokens=[]; owner=[]
for i,u in enumerate(units):
    for t in norm(u["text"]): script_tokens.append(t); owner.append(i)

# --- 2. align to whisper's timed words -----------------------------------
W=json.load(open(words_p))["words"]
whisper_tokens=[]; wmap=[]
for j,w in enumerate(W):
    for t in norm(w["w"]): whisper_tokens.append(t); wmap.append(j)

sm=difflib.SequenceMatcher(None, script_tokens, whisper_tokens, autojunk=False)
hit={}
for a,b,n in sm.get_matching_blocks():
    for k in range(n): hit[a+k]=wmap[b+k]

for i,u in enumerate(units): u["_t"]=[]
for si,wi in hit.items(): units[owner[si]]["_t"].append(wi)

matched=0
for u in units:
    if u["_t"]:
        u["start"]=W[min(u["_t"])]["s"]; u["end"]=W[max(u["_t"])]["e"]; matched+=1
    else:
        u["start"]=None; u["end"]=None
    del u["_t"]
# fill gaps by interpolation so no cue is lost
last=0.0
for u in units:
    if u["start"] is None: u["start"]=last; u["end"]=last
    last=max(last,u["end"])
for u in units:
    if u["end"]<=u["start"]: u["end"]=u["start"]+1.2

print(f"units={len(units)}  timed={matched}  coverage={matched/len(units)*100:.1f}%")
json.dump(units, open(f"{outdir}/{STEM}-timing-map.json","w"), indent=1)

# --- 3. emit VTT + SRT ----------------------------------------------------
def ts(t,sep="."):
    h=int(t//3600); m=int(t%3600//60); s=t%60
    return f"{h:02d}:{m:02d}:{s:06.3f}".replace(".",sep)
def wrap(txt,width=40):
    out=[];cur=""
    for w in txt.split():
        if len(cur)+len(w)+1>width: out.append(cur); cur=w
        else: cur=(cur+" "+w).strip()
    if cur: out.append(cur)
    return out
def chunks(u):
    """split a long sentence into <=2-line cues, time-sliced by word share"""
    lines=wrap(u["text"]); dur=u["end"]-u["start"]; total=max(1,len(u["text"]))
    groups=[lines[i:i+2] for i in range(0,len(lines),2)]
    t=u["start"]; out=[]
    for g in groups:
        share=sum(len(x)+1 for x in g)/total
        d=max(0.8,dur*share); out.append([t,min(u["end"],t+d),"\n".join(g)]); t+=d
    # a cue under MIN_CUE flashes — fold it back into the one before it
    MIN_CUE=1.4
    merged=[]
    for c in out:
        if merged and (c[1]-c[0])<MIN_CUE and len(merged[-1][2].split("\n"))<3:
            merged[-1][1]=c[1]; merged[-1][2]+=" "+c[2].replace("\n"," ")
        else: merged.append(c)
    return [(a,b,x) for a,b,x in merged]

# build every cue first, then merge short ones ACROSS sentence boundaries
raw=[]
for u in units:
    for (a,b,txt) in chunks(u): raw.append([a,b,txt,u["speaker"]])
MIN_CUE, MAX_GAP, MAX_LINES = 1.4, 1.6, 3
out=[]
for c in raw:
    if out and (c[1]-c[0])<MIN_CUE and c[3]==out[-1][3] \
       and (c[0]-out[-1][1])<MAX_GAP \
       and len((out[-1][2]+" "+c[2]).replace("\n"," "))<86:
        out[-1][1]=c[1]; out[-1][2]=(out[-1][2].replace("\n"," ")+" "+c[2].replace("\n"," "))
    else: out.append(c)
# a still-short cue absorbs the NEXT one instead
i=0
while i < len(out)-1:
    if (out[i][1]-out[i][0])<MIN_CUE and out[i][3]==out[i+1][3] \
       and (out[i+1][0]-out[i][1])<MAX_GAP:
        out[i][1]=out[i+1][1]
        out[i][2]=(out[i][2].replace("\n"," ")+" "+out[i+1][2].replace("\n"," "))
        del out[i+1]
    else: i+=1

vtt=["WEBVTT",""]; srt=[]; prev=None
for n,(a,b,txt,sp) in enumerate(out,1):
    body="\n".join(wrap(txt.replace("\n"," "), 40))
    vtt.append(f"{ts(a)} --> {ts(b)}")
    vtt.append(f"<v {sp}>"+body); vtt.append("")
    srt.append(f"{n}\n{ts(a,',')} --> {ts(b,',')}\n{body}\n")
    prev=sp
n=len(out)
open(f"{outdir}/{STEM}.vtt","w").write("\n".join(vtt))
open(f"{outdir}/{STEM}.srt","w").write("\n".join(srt))
print(f"wrote {n} cues -> {STEM}.vtt / {STEM}.srt / {STEM}-timing-map.json")
