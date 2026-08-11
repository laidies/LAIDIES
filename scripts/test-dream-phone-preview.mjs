#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root=process.cwd();
const read=file=>fs.readFileSync(path.join(root,file),"utf8");
const page=read("games/dream-phone.html");
const gamePage=read("games/dream-phone-game.html");
const redirect=read("games/dream-phone-preview.html");
const bundleSource=read("games/dream-phone-bundles.js");
const context={window:{}};
vm.runInNewContext(bundleSource,context,{filename:"dream-phone-bundles.js"});
const bundles=context.window.dreamPhoneBundles||{};

function validate(candidatePage,candidateBundles){
  const failures=[];
  const check=(condition,message)=>{if(!condition) failures.push(message);};
  const justCall=candidatePage.match(/<section class="dp-section" id="dpJustCall"[\s\S]*?<\/section>\s*<\/div>/)?.[0]||"";
  const cards=[...justCall.matchAll(/<button class="caller-card(?: [^"]*)?"[^>]*data-dream-pick="([^"]+)"[^>]*>[\s\S]*?<\/button>/g)];

  check(candidatePage.includes("assets/sunnyvaile-buildings/y2k-v3/17-dream-phone-booth.webp"),"exact Dream Phone booth exterior is missing");
  check(/id="dpDoorCall"/.test(candidatePage)&&/id="dpDoorGame"/.test(candidatePage),"two equal Dream Phone choices are missing");
  check(justCall.includes("assets/portal/dream-phone-dialer-product-v4-transparent.png"),"full Dream Phone player card is missing");
  check((justCall.match(/class="dp-key"/g)||[]).length===12,"phone must expose 12 live keypad hit-zones");
  check(/id="dpHeart"/.test(justCall)&&/id="dpHistBtn"/.test(justCall),"phone heart/history zones are missing");
  check(cards.length===25,`expected 25 real caller cards, found ${cards.length}`);
  check(cards.every(match=>/class="caller-avatar"/.test(match[0])),"every caller card must include its image");
  for(const match of cards){
    const src=match[0].match(/<img[^>]+src="\.\.\/([^"]+)"/)?.[1];
    check(Boolean(src)&&fs.existsSync(path.join(root,src)),`caller ${match[1]} must bind an existing player-card image`);
  }
  check(!/Miss Jeeves|JoJo|Mme CLAi-O|Puffy|DJ SunnyV|Screened Caller/.test(justCall),"invented preview callers returned");
  check(!/professional advice|authoritative fact-checking service|scripted entertainment/.test(candidatePage),"rejected visitor disclaimer returned");
  check(/var debArmed = false/.test(candidatePage)&&/if \(!debArmed\) \{ debBrush\(digits\); return; \}/.test(candidatePage),"two-step Deb/*67 mechanic is missing");
  check(/code === "\*69"/.test(candidatePage)&&/setTimeout\(redial, 900\)/.test(candidatePage),"*69 redial mechanic is missing");
  check(/digits === "8675309"/.test(candidatePage)&&/You found the secret line/.test(candidatePage),"hidden Jenny line is missing");

  const keys=Object.keys(candidateBundles);
  check(keys.length===25,`expected 25 authored bundle callers, found ${keys.length}`);
  for(const key of keys){
    const entries=candidateBundles[key];
    check(Array.isArray(entries)&&entries.length===3,`${key} must keep three rotating bundles`);
    for(const entry of entries||[]){
      for(const field of ["output","secret","speaker","hangup"]){
        check(typeof entry?.[field]==="string"&&entry[field].trim().length>0,`${key} bundle missing ${field}`);
      }
    }
  }
  return failures;
}

const failures=validate(page,bundles);
if(/authoritative fact-checking service|scripted entertainment/.test(gamePage)) failures.push("rejected game visitor disclaimer returned");
if(!/location\.replace\("\.\/dream-phone\.html\?preview=restored-just-call"\)/.test(redirect)) failures.push("failed preview must redirect to restored Dream Phone");
for(const removed of ["games/dream-phone-preview.css","games/dream-phone-preview.js","games/dream-phone-preview-contract.mjs"]){
  if(fs.existsSync(path.join(root,removed))) failures.push(`rejected preview artifact still exists: ${removed}`);
}

const noPhone=validate(page.replace("../assets/portal/dream-phone-dialer-product-v4-transparent.png","missing-phone.png"),bundles);
if(!noPhone.includes("full Dream Phone player card is missing")) failures.push("calibration failed: missing phone was accepted");
const invented=validate(page.replace("Receipts","Puffy"),bundles);
if(!invented.includes("invented preview callers returned")) failures.push("calibration failed: invented caller was accepted");
const brokenBundles=structuredClone(bundles); delete brokenBundles[Object.keys(brokenBundles)[0]][0].speaker;
if(!validate(page,brokenBundles).some(message=>message.includes("bundle missing speaker"))) failures.push("calibration failed: incomplete bundle was accepted");

if(failures.length){
  console.error("DREAM PHONE RESTORATION FAIL");
  failures.forEach(failure=>console.error(`- ${failure}`));
  process.exit(1);
}
console.log("DREAM PHONE RESTORATION PASS");
console.log("callers=25 bundles=75 responses=300 keypad_zones=12");
console.log("calibration=missing-phone-invented-caller-incomplete-bundle-rejected");
