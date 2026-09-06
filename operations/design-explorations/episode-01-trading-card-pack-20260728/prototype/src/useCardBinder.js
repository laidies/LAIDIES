import {useEffect,useRef,useState} from 'react';
import '../../../../../content/site/supabase-config.js';
import '../../../../../content/site/resident-card-contract-v1.js';
import '../../../../../content/site/identity-client-v1.js';
import '../../../../../content/site/resident-account-runtime-v1.js';
import '../../../../../content/site/resident-episode-binder-v1.js';

export function useCardBinder(cards,version,kind="cards") {
  const label=kind==="packs"?"Cheat Sheet":"four cards";
  const [view,setView]=useState({message:`Checking your saved ${label}…`,busy:true,guest:false,retry:false,placementsByCard:{},dirty:false,editable:false});
  const ref=useRef({runtime:null,binder:null,owner:'',epoch:0,live:false,pending:null,busy:true,placements:{},dirty:false,hydrated:false,revision:null,suspended:false});
  const report=(patch)=>{if('busy' in patch)ref.current.busy=patch.busy;if(ref.current.live)setView(value=>({...value,...patch}));};
  const close=()=>{const r=ref.current;r.epoch++;r.suspended=false;r.owner='';r.pending=null;r.placements={};r.dirty=false;r.hydrated=false;r.revision=null;r.binder?.invalidate();report({placementsByCard:{},dirty:false,editable:false,busy:false,guest:true,retry:false,message:'The account changed. Previous account saving has been closed.'});};
  const current=token=>ref.current.live&&token.epoch===ref.current.epoch&&token.owner===ref.current.owner;
  async function identify(){
    const r=ref.current,start=r.epoch,session=await r.runtime.controller.getSession();
    if(!r.live||r.epoch!==start)return null;
    if(!session?.user?.id){if(r.owner)close();report({busy:false,guest:true,retry:false,editable:false,message:`You can read the ${label} here. Sign in to keep a copy in your Episode Binder.`});return null;}
    if(r.owner&&r.owner!==session.user.id){close();return null;}
    r.owner=session.user.id;return {owner:r.owner,epoch:r.epoch};
  }
  function failure(error,token){
    if(token&&!current(token))return;
    if(String(error?.message||error).includes('account-changed-reload-binder')){close();return;}
    report({busy:false,retry:!!ref.current.pending,message:error instanceof TypeError||error instanceof RangeError?error.message:'The account request could not be confirmed. Retry the same save or check your binder.'});
  }
  function hydrate(result){
    const r=ref.current,saved=result.document.episodes['01']?.[kind]||{};
    r.placements=Object.fromEntries(cards.map(c=>[c.id,structuredClone(saved[`${c.id}@${version}`]?.placements||[])]));r.revision=result.revision;r.hydrated=true;r.dirty=false;
    report({placementsByCard:structuredClone(r.placements),dirty:false,editable:kind==='cards'});
  }
  function setPlacements(cardId,next){
    const r=ref.current;if(kind!=='cards'||!r.live||!r.owner||!r.hydrated||r.busy||r.pending||!cards.some(c=>c.id===cardId))return;
    r.placements={...r.placements,[cardId]:structuredClone(next)};r.dirty=true;report({placementsByCard:structuredClone(r.placements),dirty:true,message:'Sticker changes are not saved yet. Save the cards to keep them.'});
  }
  async function refresh(){let token;try{
    if(ref.current.suspended)return;
    if(ref.current.dirty||ref.current.pending){report({message:'Save your sticker changes first, or discard them to reopen the saved copy.'});return;}
    if(!ref.current.runtime)return;report({busy:true});token=await identify();if(!token)return;
    const result=await ref.current.binder.load(token.owner);if(!current(token))return;
    hydrate(result);
    const saved=result.document.episodes['01']?.[kind]||{},count=cards.filter(c=>saved[`${c.id}@${version}`]).length;
    report({busy:false,guest:false,message:count===cards.length?`Saved in your Episode Binder: ${label}.`:`Saved: ${count} of ${cards.length}. Keep the ${label} in your Episode Binder.`,retry:!!ref.current.pending});
  }catch(error){failure(error,token);}}
  async function save(){let token;try{
    if(ref.current.suspended)return;
    if(!ref.current.runtime)return;report({busy:true});token=await identify();if(!token)return;
    const r=ref.current;
    if(!r.pending){
      const loaded=await r.binder.load(token.owner);if(!current(token))return;
      if(r.dirty&&loaded.revision!==r.revision){report({busy:false,retry:false,message:'Your binder changed elsewhere. Discard these unsaved sticker changes to reopen the saved copy before decorating again.'});return;}
      const saved=loaded.document.episodes['01']?.[kind]||{};
      r.pending={key:crypto.randomUUID(),cards:cards.map(c=>({...kind==='packs'?{content_id:c.id,content_version:version}:{card_id:c.id,card_version:version},placements:r.dirty?r.placements[c.id]||[]:saved[`${c.id}@${version}`]?.placements||[]}))};
      r.pending.document=structuredClone(loaded.document);r.pending.revision=loaded.revision;
      const episode=r.pending.document.episodes['01'] ||= {packs:{},exercises:{},cards:{},quizzes:{}};
      for(const item of r.pending.cards){
        if(kind==='packs')episode.packs[`${item.content_id}@${item.content_version}`]={...item,saved_at:new Date().toISOString()};
        else episode.cards[`${item.card_id}@${item.card_version}`]={card_version:item.card_version,saved_at:new Date().toISOString(),placements:structuredClone(item.placements)};
      }
    }
    const result=await r.binder.saveDocument(r.pending.document,r.pending.key,r.pending.revision,token.owner);if(!current(token))return;
    if(result.state==='conflict'){r.pending=null;report({busy:false,retry:false,message:'Your binder changed elsewhere. Check the saved copy, then save again.'});return;}
    r.pending=null;hydrate(result);report({busy:false,guest:false,retry:false,message:`Saved the ${label} to your Episode Binder in My Closet.`});
  }catch(error){failure(error,token);}}
  useEffect(()=>{
    const r=ref.current;r.live=true;let subscription,live=true,refreshTimer;
    const hide=()=>{r.epoch++;r.suspended=true;report({placementsByCard:{},editable:false,busy:true,message:'Your private saved material is closed while this page is away.'});};
    const restore=async event=>{if(!event.persisted)return;let token;try{
      r.suspended=false;token=await identify();if(!token)return;
      if(r.pending||r.dirty){report({placementsByCard:structuredClone(r.placements),dirty:r.dirty,editable:kind==='cards',guest:false,busy:false,retry:!!r.pending,message:r.pending?'The earlier save was not confirmed here. Retry that same save to check its result.':'Your unsaved sticker changes are still here. Save them to keep them.'});}
      else await refresh();
    }catch(error){failure(error,token);}};
    window.addEventListener('pagehide',hide);window.addEventListener('pageshow',restore);
    (async()=>{try{
      const runtime=await window.LAIDIESResidentAccountRuntime.get();if(!live)return;
      r.runtime=runtime;r.binder=window.LAIDIESResidentEpisodeBinderV1.create(runtime);
      subscription=runtime.client.auth.onAuthStateChange((_event,session)=>{if(r.owner&&r.owner!==session?.user?.id)close();if(session?.user?.id&&!r.owner){clearTimeout(refreshTimer);refreshTimer=setTimeout(()=>{if(live)refresh();},0);}}).data.subscription;
      await refresh();
    }catch(error){if(live)failure(error);}})();
    return()=>{live=false;window.removeEventListener('pagehide',hide);window.removeEventListener('pageshow',restore);clearTimeout(refreshTimer);r.live=false;r.epoch++;subscription?.unsubscribe();r.binder?.dispose();};
  },[]);
  function discard(){const r=ref.current;if(r.busy||r.pending)return;r.dirty=false;r.placements={};r.hydrated=false;report({dirty:false,placementsByCard:{},editable:false});refresh();}
  return {...view,refresh,save,setPlacements,discard};
}
