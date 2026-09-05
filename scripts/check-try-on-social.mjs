import fs from 'node:fs';
const html=fs.readFileSync(process.argv[2]||'try-on.html','utf8');
const banned=/One name\. One sentence\. One friend|You do not have to meet everyone|Who did you meet\?|Save my discovery|Vanity visual held/i;
const failures=[];
if(banned.test(html)) failures.push('Rejected worksheet, reassurance or operational label remains.');
for(const id of ['mavenSocial','socialImage','socialDownload','socialCaption','socialCopy','socialStatus']){
 if(!html.includes(`id="${id}"`)) failures.push(`Missing finished social-result control: ${id}`);
}
if(!html.includes('if (config.social) return;'))failures.push('Episode04 must exit the private exercise save path.');
if(!html.includes('social-source'))failures.push('The historical contribution needs a visible source.');
if(failures.length){console.error('TRY-ON SOCIAL GUARD FAIL\n'+failures.map(f=>'- '+f).join('\n'));process.exitCode=1;}
else console.log('TRY-ON SOCIAL GUARD: known-pattern checks passed; subjective product/design review still required.');
