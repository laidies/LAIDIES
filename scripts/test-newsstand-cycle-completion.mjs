import assert from 'node:assert/strict';
import {inspectCycle,parseStories} from './check-newsstand-cycle-completion.mjs';
const story={id:'w',status:'published',edition:'weekly'};
const stories={publications:{weekly:{editionDate:'2026-09-09',storyId:'w'}},stories:[story]};
const issue=d=>({editionDate:d,status:'complete',disposition:'service_ready',storyIds:[],serviceRecordIds:['one']});
const input={issues:{issues:[issue('2026-09-09'),issue('2026-09-10')]},stories,from:'2026-09-09',now:'2026-09-10T18:00:00Z'};
assert.equal(inspectCycle(input).status,'DATED_DELIVERY_PRESENT');
assert.equal(inspectCycle(input).delivered[1].newsStories,0);
const missing=inspectCycle({...input,issues:{issues:[issue('2026-09-09')]}});assert.equal(missing.status,'DELIVERY_INCOMPLETE');assert.deepEqual(missing.missingDailyDates,['2026-09-10']);
const stale=structuredClone(input);stale.stories.publications.weekly.editionDate='2026-09-06';assert.equal(inspectCycle(stale).weekly.overdue,true);
assert.equal(inspectCycle({...input,issues:{issues:[issue('2026-09-09')]},now:'2026-09-10T13:59:00Z'}).status,'DATED_DELIVERY_PRESENT');
assert.equal(inspectCycle({...input,issues:{issues:[issue('2026-09-09')]},now:'2026-09-10T14:00:00Z'}).status,'DELIVERY_INCOMPLETE');
assert.equal(inspectCycle({...input,issues:{issues:[]},now:'2026-09-11T03:00:00Z'}).missingDailyDates.length,2);
assert.throws(()=>inspectCycle({...input,from:'2026-02-30'}));assert.throws(()=>inspectCycle({...input,issues:{}}));assert.throws(()=>inspectCycle({...input,issues:{issues:[issue('2026-09-09'),issue('2026-09-09')]}}));

for(const editionDate of ['not-a-date','9999-99-99','2026-09-11']){const bad=structuredClone(input);bad.stories.publications.weekly.editionDate=editionDate;assert.throws(()=>inspectCycle(bad));}
assert.throws(()=>inspectCycle({...input,from:'2026-09-11'}));

assert.throws(()=>inspectCycle({...input,from:'2026-09-10',now:'2026-09-10T13:59:00Z'}));
console.log('Cycle delivery check: known missing/old/invalid inputs rejected; current, service-only and Vancouver deadline boundaries verified. No editorial approval asserted.');

const wrap=(comment="")=>`window.NEWSSTAND_DATA = ${JSON.stringify(stories)};\n${comment}window.NEWSSTAND_STORIES = window.NEWSSTAND_DATA.stories;\n`;
assert.deepEqual(parseStories(wrap()),stories);
assert.deepEqual(parseStories(wrap("/* Compatibility for old private inspection scripts only. Public code uses NEWSSTAND_DATA. */\n")),stories);
assert.throws(()=>parseStories("<html>Access denied</html>"));
assert.throws(()=>parseStories(wrap()+"alert(1)"));
assert.throws(()=>parseStories(wrap().replace("window.NEWSSTAND_DATA.stories;","evil();")));
console.log("Both admitted publisher wrappers parsed without execution; access pages and executable suffixes rejected.");
