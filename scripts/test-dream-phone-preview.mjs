#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { validateCases } from "../games/dream-phone-preview-contract.mjs";

const root=process.cwd();
const read=file=>fs.readFileSync(path.join(root,file),"utf8");
const html=read("games/dream-phone-preview.html");
const css=read("games/dream-phone-preview.css");
const js=read("games/dream-phone-preview.js");
const contract=read("games/dream-phone-preview-contract.mjs");
const failures=[];
const check=(condition,message)=>{if(!condition) failures.push(message);};

for(const file of [
  "games/dream-phone-preview.html",
  "games/dream-phone-preview.css",
  "games/dream-phone-preview.js",
  "games/dream-phone-preview-contract.mjs",
  "assets/sunnyvaile-buildings/y2k-v3/17-dream-phone-booth.webp"
]) check(fs.existsSync(path.join(root,file)),`missing preview artifact: ${file}`);

check(/id="openJustCall"/.test(html)&&/id="openGame"/.test(html),"entry must expose two explicit choices");
check((html.match(/class="door"/g)||[]).length===2,"entry must expose exactly two equal doors");
for(const control of ["*67","*69","867-5309","Call history","Share a Secret","Speaker Phone","Mom Says Hang Up"]){
  check(html.includes(control),`missing phone control: ${control}`);
}
check(/data-verdict="for-real" disabled/.test(html)&&/data-verdict="as-if" disabled/.test(html),"committal verdicts must start disabled");
check(/data-verdict="hold-up"/.test(html),"Hold Up verdict is missing");
check(/called\.size===3/.test(js),"verdict unlock must require all three normal calls");
check(/lastCaller=deb;\s*return connect\(deb,deb\.secret,"private \*67 call"\)/.test(js),"*69 must redial Deb after a *67 call");
check(/stale or malformed freshness record/.test(contract),"runtime must fail closed on stale case guidance");
check(!/linear-gradient|radial-gradient/.test(css),"preview CSS must not use decorative gradients");
check(!/[☎✓✗📚☕🔮]/u.test(html+js),"preview UI must not use emoji as interface art");
check(/prefers-reduced-motion/.test(css),"reduced-motion support is missing");
check(/not personalized or professional advice/.test(html),"Just Call boundary is missing");
check(/not an authoritative fact-checking service/.test(html),"game source boundary is missing");
check(/not saved to an account or another device/.test(html),"session-only persistence boundary is missing");

const valid=[
  {id:"a",status:"ADMITTED",answer:"as-if",checkedAt:"2026-08-01",reviewBy:"2026-09-01",requiredClauses:["x","y"],callers:[{name:"A",clause:"x"},{name:"B",clause:"y"},{name:"C",clause:"signal"}]},
  {id:"b",status:"ADMITTED",answer:"for-real",checkedAt:"2026-08-01",reviewBy:"2026-09-01",requiredClauses:["x","y"],callers:[{name:"A",clause:"x"},{name:"B",clause:"y"},{name:"C",clause:"signal"}]},
  {id:"c",status:"ADMITTED",answer:"as-if",checkedAt:"2026-08-01",reviewBy:"2026-09-01",requiredClauses:["x","y"],callers:[{name:"A",clause:"x"},{name:"B",clause:"y"},{name:"C",clause:"signal"}]}
];
check(validateCases(valid,{today:"2026-08-10"}).length===0,"known-good contract fixture failed");
const omniscient=structuredClone(valid);
omniscient[0].callers[0].coveredClauseIds=["x","y"];
omniscient[0].callers[0].decisionHint="as-if";
const calibrated=validateCases(omniscient,{today:"2026-08-10"});
check(calibrated.some(message=>message.includes("gives away the complete answer")),"validator did not reject omniscient caller fixture");
check(calibrated.some(message=>message.includes("verdict hint")),"validator did not reject caller verdict hint");
const stale=structuredClone(valid);stale[0].reviewBy="2026-08-09";
check(validateCases(stale,{today:"2026-08-10"}).some(message=>message.includes("stale")),"validator did not reject stale guidance fixture");

if(failures.length){
  console.error("DREAM PHONE PREVIEW FAIL");
  failures.forEach(failure=>console.error(`- ${failure}`));
  process.exit(1);
}
console.log("DREAM PHONE PREVIEW PASS");
console.log("calibration=omniscient-caller-and-stale-guidance-rejected");
console.log("choices=2 cases=3 normal_calls_per_case=3");
