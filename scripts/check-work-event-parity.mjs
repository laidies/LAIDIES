#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path'; import { projectWorkEvents } from './project-work-events.mjs';
const legacyPath=process.env.LAIDIES_LEGACY_WORK_PATH || path.join(process.cwd(),'operations/runtime/work-resolution-loop.json');
const eventPath=process.env.LAIDIES_WORK_EVENTS_PATH || path.join(process.cwd(),'operations/runtime/work-events.jsonl');
const legacy=JSON.parse(fs.readFileSync(legacyPath,'utf8')); const projected=projectWorkEvents(eventPath);
const terminal=new Set(['RESOLVED','STOPPED','COMPLETE','COMPLETED','VERIFIED_PUBLICLY','CANCELLED']);
const required=(legacy.records||legacy.items||[]).filter(item=>!terminal.has(item.status)).map(item=>item.work_id||item.id).filter(Boolean);
const present=new Set(projected.items.map(item=>item.work_id)); const missing=required.filter(id=>!present.has(id));
if(missing.length){console.error(`WORK EVENT PARITY FAIL missing=${missing.length}\n${missing.map(id=>`- ${id}`).join('\n')}`);process.exit(1);}
console.log(`WORK EVENT PARITY PASS active_legacy=${required.length} projected=${projected.items.length}`);
