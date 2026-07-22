import json, sys, time
from faster_whisper import WhisperModel
audio, out, model_size = sys.argv[1], sys.argv[2], (sys.argv[3] if len(sys.argv)>3 else "small.en")
t0=time.time()
print(f"loading {model_size}...", flush=True)
m = WhisperModel(model_size, device="cpu", compute_type="int8")
segs, info = m.transcribe(audio, word_timestamps=True, vad_filter=False, language="en")
words=[]
for s in segs:
    for w in (s.words or []):
        words.append({"w":w.word.strip(),"s":round(w.start,3),"e":round(w.end,3)})
    if len(words) % 500 < 12:
        print(f"  {len(words)} words | audio t={s.end:.0f}s | {time.time()-t0:.0f}s elapsed", flush=True)
json.dump({"duration":info.duration,"words":words}, open(out,"w"), indent=0)
print(f"DONE {len(words)} words -> {out} in {time.time()-t0:.0f}s", flush=True)
