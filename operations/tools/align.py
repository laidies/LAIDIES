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

# --- 1. parse the true script into (speaker, sentence) units -------------
units=[]; cur="JESSICA"
for line in open(script_p):
    line=line.strip()
    if not line or line.startswith("#"): continue
    # leading speaker tag
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
json.dump(units, open(f"{outdir}/episode-04-timing-map.json","w"), indent=1)

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
open(f"{outdir}/episode-04.vtt","w").write("\n".join(vtt))
open(f"{outdir}/episode-04.srt","w").write("\n".join(srt))
print(f"wrote {n} cues -> episode-04.vtt / .srt / timing-map.json")
