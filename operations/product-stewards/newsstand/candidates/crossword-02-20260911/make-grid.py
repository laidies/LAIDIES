"""Private grid construction: intersections only; reject accidental adjacent runs."""
import json,random
from pathlib import Path
root=Path(__file__).parent; copy=json.loads((root/'puzzle-copy.json').read_text()); terms=[(k,v['answer']) for k,v in copy.items()];rng=random.Random(20260911)
def place(grid,word,row,col,direction):
 dr,dc=(0,1) if direction=='across' else (1,0)
 if (row-dr,col-dc) in grid or (row+dr*len(word),col+dc*len(word)) in grid:return None
 crossing=0
 for i,ch in enumerate(word):
  r,c=row+i*dr,col+i*dc
  if (r,c) in grid:
   if grid[r,c][0]!=ch or direction in grid[r,c][1]:return None
   crossing+=1
  elif (r+dc,c+dr) in grid or (r-dc,c-dr) in grid:return None
 if grid and not crossing:return None
 new={k:(v[0],set(v[1])) for k,v in grid.items()}
 for i,ch in enumerate(word):
  key=row+i*dr,col+i*dc
  if key in new:new[key][1].add(direction)
  else:new[key]=(ch,{direction})
 return new
best=None
for attempt in range(1800):
 order=terms[:];rng.shuffle(order);order.sort(key=lambda x:-len(x[1]) if attempt%3==0 else 0);grid={};placed=[]
 for id,word in order:
  options=[]
  if not grid:options=[(0,0,'across')]
  else:
   for (r,c),(ch,dirs) in grid.items():
    for i,char in enumerate(word):
     if char==ch:
      for direction in ['across','down']:
       dr,dc=(0,1) if direction=='across' else (1,0);options.append((r-dr*i,c-dc*i,direction))
  rng.shuffle(options);choices=[]
  for r,c,direction in options:
   g=place(grid,word,r,c,direction)
   if g is None:continue
   rows=[x[0] for x in g];cols=[x[1] for x in g];h=max(rows)-min(rows)+1;w=max(cols)-min(cols)+1
   if max(h,w)>15:continue
   choices.append((h*w+max(h,w)*8+rng.random()*18,g,(id,word,r,c,direction)))
  if not choices:break
  _,grid,item=min(choices,key=lambda x:x[0]);placed.append(item)
 if len(placed)!=len(terms):continue
 rows=[x[0] for x in grid];cols=[x[1] for x in grid];h=max(rows)-min(rows)+1;w=max(cols)-min(cols)+1;score=max(h,w)**2+h*w
 if best is None or score<best[0]:best=(score,placed,min(rows),min(cols),max(h,w))
assert best,'No connected bounded grid found'
_,placed,r0,c0,size=best;starts=sorted(set((r-r0,c-c0) for _,_,r,c,_ in placed));numbers={k:i+1 for i,k in enumerate(starts)}
words=[dict(id=id,answer=word,row=r-r0,col=c-c0,dir=d,number=numbers[r-r0,c-c0],clue=copy[id]['clue']) for id,word,r,c,d in placed];words.sort(key=lambda x:(x['number'],x['dir']))
puzzle=dict(id='puzzle-02',number='02',publishedAt='2026-09-11T12:00:00-07:00',status='hold',size=size,storageKey='laidies_newsstand_crossword_02_v1',words=words,help={k:{f:v for f,v in x.items() if f not in ['answer','clue']} for k,x in copy.items()})
(root/'puzzle.json').write_text(json.dumps(puzzle,indent=2,ensure_ascii=False)+'\n');print('PRIVATE HOLD grid',size,'x',size,'words',len(words))
