import { isFresh, validateCases } from "./dream-phone-preview-contract.mjs";

(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const callers = [
    {id:"jeeves",name:"Miss Jeeves",number:"555-0104",role:"the librarian",base:"Before we decide, darling: what exactly is being claimed, and what would count as a first-hand record?",secret:"Between us? The confident sentence is usually doing more work than the source.",speaker:"For the room: separate what happened from what somebody concluded about it.",hangup:"Your mother is right. Hang up, find the date, and call me back with the noun the number is counting.",clarify:"The useful follow-up is: which clause would still be true if the exciting adjective disappeared?"},
    {id:"deb",name:"Deb",number:"404-6969",role:"forwards everything",base:"My cousin sent this to everyone at work, which is basically peer review if the peer group is enormous.",secret:"Fine. I did not open the link. But the subject line was in ALL CAPS.",speaker:"Everyone on speaker? Great. I have three screenshots and zero original URLs.",hangup:"Mom says stop forwarding. This feels targeted.",clarify:"Fresh clarification: Kathy remembers the number differently, so now we have two unsupported numbers."},
    {id:"jojo",name:"JoJo",number:"555-0112",role:"at Blend & Snap",base:"Tell me what outcome you want before you ask the machine for wording. Otherwise it serves a gorgeous smoothie with no cup.",secret:"I keep a bad first draft on purpose. It makes the useful constraints obvious.",speaker:"Speakerphone rule: one person names the audience, one names the outcome, one cuts the fluff.",hangup:"We are done. Save the good sentence and release the hostage paragraph.",clarify:"Add one example of what good looks like. It works better than another paragraph of vibes."},
    {id:"claio",name:"Mme CLAi-O",number:"555-0131",role:"the cards",base:"I see a question hiding inside your question. Very mysterious. Also very fixable.",secret:"The cards say you already know the boundary—you just have not written it down.",speaker:"The room receives this: ask for options first, judgment second. Never confuse the two.",hangup:"The spirits have left for lunch. Pick one reversible next move.",clarify:"The fog clears when you name what the answer must not do."},
    {id:"puffy",name:"Puffy",number:"555-0199",role:"closet confidante",base:"Try the smaller version first. If it survives contact with Tuesday, then give it sequins.",secret:"I have never regretted a reversible test. I have regretted twelve matching jackets.",speaker:"Everyone can hear me: we are testing the silhouette, not buying the whole collection.",hangup:"Put the credit card down. We have learned enough for today.",clarify:"Your smallest useful proof should expose the expensive mistake, not imitate the final launch."},
    {id:"sunnyv",name:"DJ SunnyV",number:"555-0867",role:"on the night line",base:"You are live. Give me the one sentence version, then tell me which part you are least sure about.",secret:"Off air? The best calls are the ones where somebody changes her mind for a reason.",speaker:"SUNNYVAiLE, you heard her: confidence is not a source and uncertainty is not a crime.",hangup:"And that is our cue. Fade the track before the metaphor gets another verse.",clarify:"Ask the next caller for a contradiction, not another vote."}
  ];
  const screened = {id:"screened",name:"Screened Caller",number:"*67",role:"private line",base:"I can give you the perspective people leave out when their name is attached—but not the whole answer.",secret:"Anonymity can reveal a risk. It cannot prove the underlying claim.",speaker:"Keep this private line off speaker. Compare it with a named source instead.",hangup:"That is all I can safely say. Use it as a question, not a conclusion.",clarify:"The part worth checking is whether the incentive I described actually applies here."};
  const jenny = {id:"jenny",name:"Jenny",number:"867-5309",role:"best-next-question desk",base:"Try this next: Which exact part of that answer could be checked against a dated primary source?",secret:"My secret is disappointingly practical: good questions beat magic numbers.",speaker:"For everyone listening: I suggest the next question. I do not decide the answer.",hangup:"You have your next question. Go use it.",clarify:"If the topic can change, ask what date the answer is current through."};

  const cases = [
    {
      id:"sky-dancers",status:"ADMITTED",checkedAt:"2026-08-10",reviewBy:"2027-01-25",answer:"as-if",
      requiredClauses:["injuries","units"],
      claim:"Sky Dancers caused thousands of reported injuries before about 8.9 million dolls were recalled.",
      source:"U.S. Consumer Product Safety Commission recall record",sourceUrl:"https://www.cpsc.gov/Recalls/2000/cpsc-galoob-toys-inc-announce-recall-of-sky-dancers-flying-dolls",
      lesson:"The hazard and recall were real. The injury count was inflated. A true event can carry a false number.",
      prevention:"Ask what each number counts, then name the numerator and denominator before comparing them.",
      prompt:"Separate every number in the claim. For each one, cite the dated source, state what the number counts, and supply the relevant denominator. Do not substitute recall units for injuries.",
      callers:[
        {id:"jeeves",name:"Miss Jeeves",role:"official record",clause:"injuries",text:"The dated CPSC record says 170 strike reports resulted in 150 reported injuries.",clarify:"Reports received by CPSC and Galoob are not a measure of every incident that may have occurred."},
        {id:"counter",name:"Toy Counter",role:"the denominator",clause:"units",text:"About 8.9 million dolls were recalled. Recalled units are exposure, not an injury count.",clarify:"Do not divide claims by drama. Ask what each number actually counts."},
        {id:"deb",name:"Deb",role:"the rumour",clause:"signal",text:"The forwarded warning says thousands, but names no record for that number.",clarify:"Several copies of one chain email are still one unsupported claim."}
      ],
      screened:"A former seller remembers genuine injuries, but memory cannot establish the total.",jenny:"Ask which number is the numerator and which is the denominator."
    },
    {
      id:"pokemon",status:"SOURCE CANDIDATE",checkedAt:"2026-08-10",reviewBy:"2026-09-10",answer:null,
      requiredClauses:["japan","us"],
      claim:"The flashing Pokémon episode caused a mass health event in Japan—and the same episode later aired in America and sent U.S. children to the ER.",
      source:"Japanese health-ministry record and primary medical research; U.S. distribution clause still under admission review",sourceUrl:"https://www.mhlw.go.jp/www1/houdou/1004/h0414-2.html",
      lesson:"The Japanese event is documented. The U.S.-airing clause is doing separate work and needs separate evidence. One true clause cannot smuggle in another.",
      prevention:"Split event, location, distribution and medical-outcome clauses; require separate evidence for each.",
      prompt:"Break this claim into event, location, broadcast/distribution, symptoms, hospital visits, and confirmed seizures. Cite each clause separately. Mark any clause you cannot verify as unconfirmed rather than borrowing support from another clause.",
      callers:[
        {id:"doctor",name:"Clinic Desk",role:"Japan event",clause:"japan",text:"Medical studies document neurologic symptoms, including seizures, after the December 1997 Japanese broadcast.",clarify:"Symptoms, hospital visits, and confirmed seizures are not interchangeable counts."},
        {id:"archive",name:"Broadcast Archive",role:"U.S. scope",clause:"us",text:"The episode itself was not part of the later U.S. broadcast run. The U.S. claim needs its own distribution record.",clarify:"A clip being discussed in America is not the same as the episode airing there."},
        {id:"deb",name:"Deb",role:"memory",clause:"signal",text:"I remember seeing it on American television. Or maybe a news report about it. Same thing?",clarify:"No: memory has just collapsed coverage about the event into broadcast of the episode."}
      ],
      screened:"A parent remembers news footage in the U.S., not the original episode.",jenny:"Ask whether the evidence proves the event, the location, or the distribution claim."
    },
    {
      id:"tamagotchi",status:"SOURCE CANDIDATE",checkedAt:"2026-08-10",reviewBy:"2026-09-10",answer:null,
      requiredClauses:["cemetery","shipment"],
      claim:"In the late 1990s, people opened real cemeteries for dead Tamagotchis and accepted devices sent in from other places for burial.",
      source:"Contemporaneous 1997–1998 reporting; exact shipment scope remains under admission review",sourceUrl:"https://www.eltiempo.com/archivo/documento/mam-781611",
      lesson:"It sounds ridiculous, which makes it a good plausibility trap. Weird is not the same as false—but every scope clause still needs support.",
      prevention:"Do not use plausibility as a verdict. Ask for a dated record naming the place, operator and exact shipment scope.",
      prompt:"Treat weirdness as irrelevant. Find a dated contemporaneous source that names the place and operator. Verify the shipment clause separately, and say exactly which part remains unconfirmed.",
      callers:[
        {id:"archive",name:"News Archive",role:"contemporary report",clause:"cemetery",text:"A January 1998 report describes a dedicated Tamagotchi cemetery opening in southern Hungary.",clarify:"The report names a town, an operator, and the reason he created it."},
        {id:"post",name:"Post Office",role:"shipment scope",clause:"shipment",text:"Other contemporary accounts describe electronic pets being mailed to dedicated burial services.",clarify:"The exact countries and quantities need careful source binding before public release."},
        {id:"deb",name:"Deb",role:"plausibility",clause:"signal",text:"That is too weird to be real. I refuse on aesthetic grounds.",clarify:"Aesthetic grounds remain inadmissible, though strongly felt."}
      ],
      screened:"A child treating a digital pet as emotionally real explains the demand; it does not prove a particular cemetery claim.",jenny:"Ask for a dated report that names the place and operator."
    }
  ];

  let activePanel = "entry";
  let lastCaller = null;
  let currentCaller = null;
  let callHistory = [];
  let gameHistory = [];
  let caseIndex = 0;
  let called = new Set();
  let powerUsed = {star67:false,star69:false};
  let speakerSelection = [];
  const bundleIndex = new Map();

  window.DreamPhonePreview={validateCases};

  const panels = {entry:$("#entryPanel"),call:$("#callPanel"),game:$("#gamePanel")};
  function showPanel(name){
    activePanel=name;
    Object.entries(panels).forEach(([key,panel])=>{panel.hidden=key!==name;panel.classList.toggle("is-active",key===name);});
    const screen=$("#boothScreen");
    $(".booth").classList.toggle("booth--active",name!=="entry");
    screen.scrollTop=0;
    screen.focus();
  }

  function cleanDial(value){return value.replace(/[^0-9*#]/g,"");}
  function addCallRecord(caller,text,type="call"){
    callHistory.push({name:caller.name,callerId:caller.id,text,type});
    $("#historyCount").textContent=String(callHistory.length);
  }
  function connect(caller,text=caller.base,type="call"){
    currentCaller=caller;
    if(type==="call") lastCaller=caller;
    $("#answerName").textContent=caller.name;
    $("#callAnswer").textContent=text;
    $("#callLineStatus").textContent=type==="restore"?"History restored":"Connected";
    if(type!=="restore") addCallRecord(caller,text,type);
  }
  function connectNext(caller,type="call"){
    const bundle=[caller.base,caller.clarify];
    const index=bundleIndex.get(caller.id)||0;
    bundleIndex.set(caller.id,index+1);
    connect(caller,bundle[index%bundle.length],type);
  }
  function dial(value){
    const code=cleanDial(value);
    if(code==="*67"){
      const deb=callers.find(item=>item.id==="deb");
      lastCaller=deb;
      return connect(deb,deb.secret,"private *67 call");
    }
    if(code==="*69"){
      if(!lastCaller){$("#callAnswer").textContent="No previous caller to clarify yet.";return;}
      return connectNext(lastCaller,"*69 return call");
    }
    if(code==="8675309") return connect(jenny);
    const caller=callers.find(item=>cleanDial(item.number)===code);
    if(!caller){$("#answerName").textContent="The operator";$("#callAnswer").textContent="That line is not in this preview directory. Try a listed number or one of the special codes.";$("#callLineStatus").textContent="Number unavailable";return;}
    connectNext(caller);
  }
  function renderCallDirectory(){
    $("#callDirectory").innerHTML=callers.map(c=>`<button type="button" data-call="${c.id}">${c.name}<span>${c.number} · ${c.role}</span></button>`).join("");
    $$("[data-call]").forEach(button=>button.addEventListener("click",()=>connectNext(callers.find(c=>c.id===button.dataset.call))));
  }
  function remixCall(kind){
    if(!currentCaller){$("#callAnswer").textContent="Call someone first, then remix the conversation.";return;}
    let text=currentCaller[kind];
    if(kind==="speaker"&&callHistory.length>=2){
      const [a,b]=callHistory.slice(-2);
      text=`Speakerphone comparison — ${a.name}: “${a.text}” / ${b.name}: “${b.text}” Notice what agrees, what conflicts, and whether either one names evidence.`;
    }
    connect(currentCaller,text,`remix-${kind}`);
  }

  function fresh(item){
    return isFresh(item);
  }
  function loadCase(){
    called=new Set();gameHistory=[];speakerSelection=[];powerUsed={star67:false,star69:false};
    const item=cases[caseIndex];
    if(!fresh(item)){
      $("#claimText").textContent="This case is unavailable because its source check is stale.";
      $("#gameDirectory").innerHTML="";
      return;
    }
    $("#roundProgress").textContent=`Case ${caseIndex+1} of ${cases.length}`;
    $("#claimText").textContent=item.claim;
    $("#evidenceState").textContent=item.status==="ADMITTED"?"Evidence admitted":"Mechanics preview · source held";
    $("#evidenceState").classList.toggle("is-candidate",item.status!=="ADMITTED");
    $("#gameDirectory").innerHTML=item.callers.map(c=>`<button type="button" data-case-call="${c.id}">${c.name}<span>${c.role}</span></button>`).join("");
    $$("[data-case-call]").forEach(button=>button.addEventListener("click",()=>gameCall(button.dataset.caseCall)));
    $("#clueList").innerHTML='<li class="empty-note">The answer is distributed. No one caller gets the whole thing.</li>';
    $("#clueCount").textContent="0 of 3 calls";
    $("#gameHistoryEcho").hidden=true;
    $("#resultCard").hidden=true;
    updateVerdicts();updatePowers();
  }
  function appendGameRecord(record){
    gameHistory.push(record);
    const list=$("#clueList");
    if(list.querySelector(".empty-note")) list.innerHTML="";
    const li=document.createElement("li");
    li.innerHTML=`<b>${record.name}${record.kind!=="normal"?` · ${record.kind}`:""}</b>${record.text}`;
    list.append(li);
  }
  function gameCall(id){
    if(called.has(id)) return;
    if(called.size>=3) return;
    const caller=cases[caseIndex].callers.find(c=>c.id===id);
    called.add(id);appendGameRecord({name:caller.name,text:caller.text,kind:"normal",callerId:id,clause:caller.clause});
    const button=$(`[data-case-call="${id}"]`);button.disabled=true;button.classList.add("is-called");
    $("#clueCount").textContent=`${called.size} of 3 calls`;
    updateVerdicts();updatePowers();
  }
  function updateVerdicts(){
    const ready=called.size===3;
    $$("[data-verdict]").forEach(button=>{if(button.dataset.verdict!=="hold-up")button.disabled=!ready;});
  }
  function updatePowers(){
    const star69=$("[data-power=star69]");
    star69.disabled=called.size===0||powerUsed.star69;
    $("[data-power=star67]").disabled=powerUsed.star67;
  }
  function usePower(power){
    const item=cases[caseIndex];
    if(power==="star67"&&!powerUsed.star67){powerUsed.star67=true;appendGameRecord({name:"Screened source",text:item.screened,kind:"*67 partial perspective"});}
    if(power==="star69"&&!powerUsed.star69&&called.size){
      powerUsed.star69=true;
      const last=[...gameHistory].reverse().find(r=>r.kind==="normal");
      const caller=item.callers.find(c=>c.id===last.callerId);
      appendGameRecord({name:caller.name,text:caller.clarify,kind:"*69 clarification"});
    }
    if(power==="jenny") appendGameRecord({name:"Jenny",text:item.jenny,kind:"best next question"});
    if(power==="speaker"){
      const selected=speakerSelection.map(index=>gameHistory[index]).filter(Boolean);
      const normals=(selected.length===2?selected:gameHistory.filter(r=>r.kind==="normal").slice(-2));
      const text=normals.length<2?"Call two people first. Speaker Phone compares evidence already heard; it does not create evidence.":`Compare ${normals[0].name} with ${normals[1].name}: they cover ${normals[0].clause} versus ${normals[1].clause}. Agreement is not the job—clause coverage is.`;
      appendGameRecord({name:"Speaker Phone",text,kind:"comparison"});
      speakerSelection=[];
    }
    updatePowers();
  }
  function gameRemix(kind){
    if(kind==="secret") appendGameRecord({name:"Operator card",text:"What would this caller be least able to know first-hand? Use the answer to choose your next source.",kind:"question card"});
    if(kind==="hangup") appendGameRecord({name:"Mom",text:"Hang up on the loudest unsupported rumour. Removing noise does not add proof.",kind:"rumour filter"});
  }
  function decide(verdict){
    const item=cases[caseIndex];
    const early=verdict==="hold-up"&&called.size<3;
    const result=$("#resultCard");
    if(early){
      result.innerHTML=`<h3>Good hold. Keep the case open.</h3><p>You have made ${called.size} of 3 normal calls. Hold Up protects you from a premature verdict; it does not skip the investigation.</p><button class="next-case" type="button">Keep calling</button>`;
      result.hidden=false;result.focus();
      $(".next-case",result).addEventListener("click",()=>{result.hidden=true;$("#gameDirectory").focus?.();});
      return;
    }
    const admitted=item.status==="ADMITTED";
    const right=admitted&&verdict===item.answer;
    const label={"for-real":"For Real","as-if":"As If","hold-up":"Hold Up"}[verdict];
    const heading=admitted?(right?"That call holds up.":"Not quite—split the claim."):`${label} recorded—not scored.`;
    const lesson=admitted?item.lesson:`This case is still source-held, so the preview cannot grade a definitive answer. Its intended learning pattern is: ${item.lesson}`;
    result.innerHTML=`<h3>${heading}</h3><p>${lesson}</p><p><b>Your preventive move:</b> ${item.prevention}</p><p><b>Source status:</b> ${item.status}. <a href="${item.sourceUrl}" target="_blank" rel="noopener">${item.source}</a>. Checked ${item.checkedAt}; review by ${item.reviewBy}.</p><div class="rules"><div class="rule"><b>Case-specific rule</b><span>${item.prevention}</span></div><div class="rule"><b>Use current-information tools</b><span>For changing facts, enable web search or retrieval and ask for dated links—not a confident memory.</span></div><div class="rule"><b>Separate fact from inference</b><span>Require the AI to label what the source confirms, what it infers, and what remains unknown.</span></div><div class="rule"><b>Make fabrication a failure</b><span>Require “I can’t verify this” instead of an invented citation, quote, setting, or number.</span></div></div><p><b>Reusable prompt for this pattern:</b> “${item.prompt}”</p><button class="next-case" type="button">${caseIndex<cases.length-1?"Next case":"Replay the game"}</button>`;
    result.hidden=false;result.focus();
    $(".next-case",result).addEventListener("click",()=>{caseIndex=caseIndex<cases.length-1?caseIndex+1:0;loadCase();$("#gameTitle").focus?.();});
  }

  function openHistory(kind){
    const isGame=kind==="game";
    $("#historyTitle").textContent=isGame?"Game call history":"Call history";
    $("#historyIntro").textContent=isGame?"Exact call notes. Reopening them creates no evidence and spends no call.":"Reopen an exact prior call. It creates no new call and spends nothing.";
    const records=isGame?gameHistory:callHistory;
    $("#historyItems").innerHTML=records.length?records.map((record,index)=>`<button class="history-item" type="button" data-history-index="${index}" data-history-kind="${kind}"${isGame&&record.kind==="normal"?` aria-pressed="${speakerSelection.includes(index)}"`:""}><b>${record.name}</b><span>${record.text}</span></button>`).join(""):'<p>No calls yet.</p>';
    $$("[data-history-index]").forEach(button=>button.addEventListener("click",()=>{
      const index=Number(button.dataset.historyIndex);
      const record=records[index];
      if(!isGame){
        currentCaller=[...callers,jenny].find(c=>c.id===record.callerId)||currentCaller;
        $("#answerName").textContent=record.name;$("#callAnswer").textContent=record.text;$("#callLineStatus").textContent="History restored";
        $("#historyDialog").close();
        return;
      }
      $("#gameHistoryEcho").hidden=false;
      $("#gameHistoryEcho").textContent=`Restored exactly — ${record.name}: ${record.text}`;
      $$("#clueList li").forEach((item,itemIndex)=>item.classList.toggle("is-restored",itemIndex===index));
      if(record.kind==="normal"){
        speakerSelection=speakerSelection.includes(index)?speakerSelection.filter(value=>value!==index):[...speakerSelection,index].slice(-2);
        button.setAttribute("aria-pressed",String(speakerSelection.includes(index)));
        $("#historyIntro").textContent=`Exact note restored. ${speakerSelection.length} of 2 callers selected for Speaker Phone.`;
      }
    }));
    $("#historyDialog").showModal();
  }

  $("#openJustCall").addEventListener("click",()=>showPanel("call"));
  $("#openGame").addEventListener("click",()=>{showPanel("game");loadCase();});
  $$(".change-mode").forEach(button=>button.addEventListener("click",()=>showPanel("entry")));
  $("#dialButton").addEventListener("click",()=>dial($("#dialInput").value));
  $("#dialInput").addEventListener("keydown",event=>{if(event.key==="Enter")dial(event.currentTarget.value);});
  $$("[data-remix]").forEach(button=>button.addEventListener("click",()=>remixCall(button.dataset.remix)));
  $$("[data-power]").forEach(button=>button.addEventListener("click",()=>usePower(button.dataset.power)));
  $$("[data-game-remix]").forEach(button=>button.addEventListener("click",()=>gameRemix(button.dataset.gameRemix)));
  $$("[data-verdict]").forEach(button=>button.addEventListener("click",()=>decide(button.dataset.verdict)));
  $("#openCallHistory").addEventListener("click",()=>openHistory("call"));
  $("#openGameHistory").addEventListener("click",()=>openHistory("game"));
  $("#closeHistory").addEventListener("click",()=>$("#historyDialog").close());
  $("#historyDialog").addEventListener("click",event=>{if(event.target===$("#historyDialog"))event.currentTarget.close();});
  const contractErrors=validateCases(cases);
  if(contractErrors.length) throw new Error(`Dream Phone preview deck blocked: ${contractErrors.join("; ")}`);
  renderCallDirectory();
})();
