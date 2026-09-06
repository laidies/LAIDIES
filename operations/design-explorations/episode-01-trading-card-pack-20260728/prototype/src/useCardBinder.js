import {useEffect,useRef,useState} from 'react';
import '../../../../../content/site/supabase-config.js';
import '../../../../../content/site/resident-card-contract-v1.js';
import '../../../../../content/site/identity-client-v1.js';
import '../../../../../content/site/resident-account-runtime-v1.js';
import '../../../../../content/site/resident-episode-binder-v1.js';

export function useCardBinder(cards,version) {
  const [view,setView]=useState({message:'Checking your saved cards…',busy:true,guest:false,retry:false});
  const ref=useRef({runtime:null,binder:null,owner:'',epoch:0,live:false,pending:null});
  const report=(patch)=>{if(ref.current.live)setView(value=>({...value,...patch}));};
  const close=()=>{const r=ref.current;r.epoch++;r.owner='';r.pending=null;r.binder?.invalidate();report({busy:false,guest:true,retry:false,message:'The account changed. Previous account saving has been closed.'});};
  const current=token=>ref.current.live&&token.epoch===ref.current.epoch&&token.owner===ref.current.owner;
  async function identify(){
    const r=ref.current,start=r.epoch,session=await r.runtime.controller.getSession();
    if(!r.live||r.epoch!==start)return null;
    if(!session?.user?.id){if(r.owner)close();report({busy:false,guest:true,retry:false,message:'You can use every card here. Sign in to keep them in your Episode Binder.'});return null;}
    if(r.owner&&r.owner!==session.user.id){close();return null;}
    r.owner=session.user.id;return {owner:r.owner,epoch:r.epoch};
  }
  function failure(error,token){
    if(token&&!current(token))return;
    if(String(error?.message||error).includes('account-changed-reload-binder')){close();return;}
    report({busy:false,retry:!!ref.current.pending,message:error instanceof TypeError||error instanceof RangeError?error.message:'The account request could not be confirmed. Retry the same save or check your binder.'});
  }
  async function refresh(){let token;try{
    if(!ref.current.runtime)return;report({busy:true});token=await identify();if(!token)return;
    const result=await ref.current.binder.load(token.owner);if(!current(token))return;
    const saved=result.document.episodes['01']?.cards||{},count=cards.filter(c=>saved[`${c.id}@${version}`]).length;
    report({busy:false,guest:false,message:count===cards.length?'All four cards are saved in your Episode Binder.':`${count} of four cards saved to your Episode Binder.`,retry:!!ref.current.pending});
  }catch(error){failure(error,token);}}
  async function save(){let token;try{
    if(!ref.current.runtime)return;report({busy:true});token=await identify();if(!token)return;
    const r=ref.current;
    if(!r.pending){
      const loaded=await r.binder.load(token.owner);if(!current(token))return;
      const saved=loaded.document.episodes['01']?.cards||{};
      r.pending={key:crypto.randomUUID(),cards:cards.map(c=>({card_id:c.id,card_version:version,placements:saved[`${c.id}@${version}`]?.placements||[]}))};
    }
    const result=await r.binder.saveCards(1,r.pending.cards,r.pending.key,token.owner);if(!current(token))return;
    if(result.state==='conflict'){r.pending=null;report({busy:false,retry:false,message:'Your binder changed elsewhere. Check the saved cards, then save again.'});return;}
    r.pending=null;report({busy:false,guest:false,retry:false,message:'All four cards saved to your Episode Binder in My Closet.'});
  }catch(error){failure(error,token);}}
  useEffect(()=>{
    const r=ref.current;r.live=true;let subscription,live=true;
    (async()=>{try{
      const runtime=await window.LAIDIESResidentAccountRuntime.get();if(!live)return;
      r.runtime=runtime;r.binder=window.LAIDIESResidentEpisodeBinderV1.create(runtime);
      subscription=runtime.client.auth.onAuthStateChange((_event,session)=>{if(r.owner&&r.owner!==session?.user?.id)close();}).data.subscription;
      await refresh();
    }catch(error){if(live)failure(error);}})();
    return()=>{live=false;r.live=false;r.epoch++;subscription?.unsubscribe();r.binder?.dispose();};
  },[]);
  return {...view,refresh,save};
}
