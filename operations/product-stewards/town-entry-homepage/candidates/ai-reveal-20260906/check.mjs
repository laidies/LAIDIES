import fs from 'node:fs';import assert from 'node:assert/strict';
const p=new URL('./',import.meta.url),read=n=>JSON.parse(fs.readFileSync(new URL(n,p)));
function verify(rows){for(const width of [1440,390,320]){const group=rows.filter(r=>r.width===width);assert.equal(group.length,3,'missing viewport beat');for(const r of group){assert(!r.overflow,'page overflow');assert.equal(r.pause,'Resume arrival','pause not applied');if(r.cue==='icons')assert(r.aiCentre<2,'Ai off centre');else assert(r.wordInside,'word clipped');if(width<500)assert(Math.abs(r.stageBottom-r.viewportHeight)<2,'phone stage outside first screen');}}}
const rows=read('viewport-checks.json');verify(rows);
const bad=structuredClone(rows);bad.find(r=>r.cue==='icons').aiCentre=40;assert.throws(()=>verify(bad),/Ai off centre/);
const controls=read('functional-checks.json');assert.equal(controls.length,6);assert(controls.every(r=>r.ok));
console.log('Geometry and controls verified; deliberately off-centre input rejected. This does not judge visual quality.');

const replay=read("replay-regression-checks.json");function verifyReplay(rows){assert.equal(rows.length,3);assert(rows.every(r=>r.heroStable&&r.replayVisible&&r.links.length===3&&r.links.every(l=>l.overlap===0)),"Replay overlaps a homepage action or shifts hero");}verifyReplay(replay);const regression=structuredClone(replay);regression[1].links[2].overlap=100;assert.throws(()=>verifyReplay(regression));console.log("Replay overlap guard verified against deliberately overlapping input.");
