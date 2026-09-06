import {useEffect,useRef,useState} from 'react';
import schema from '../../../../../content/episodes/episode-01.exercise-fields.json';
import {encodeEpisode01,decodeEpisode01} from '../../../../../content/site/episode-01-exercise-state.mjs';
import '../../../../../content/site/supabase-config.js';
import '../../../../../content/site/resident-card-contract-v1.js';
import '../../../../../content/site/identity-client-v1.js';
import '../../../../../content/site/resident-account-runtime-v1.js';
import '../../../../../content/site/resident-episode-binder-v1.js';

const recordKey=`${schema.exerciseId}@${schema.exerciseVersion}`;
const fingerprintOf=input=>JSON.stringify(Object.keys(input.fields).sort().map(key=>[key,input.fields[key]]));
export function useEpisodeBinder(snapshot,restore,reset) {
  const [phase,setPhase]=useState('loading');
  const [message,setMessage]=useState('Checking your episode binder…');
  const [savedFingerprint,setSavedFingerprint]=useState('');
  const latest=useRef({snapshot,restore,reset}); latest.current={snapshot,restore,reset};
  const refs=useRef({runtime:null,binder:null,owner:'',pendingKey:null,saved:null,undo:null,epoch:0});
  let fingerprint='';
  try {fingerprint=fingerprintOf(encodeEpisode01(snapshot,schema));} catch (_) {}
  const initialFingerprint=useRef(null);
  if(initialFingerprint.current===null&&fingerprint)initialFingerprint.current=fingerprint;

  const isCurrent=(token)=>token.epoch===refs.current.epoch&&token.owner===refs.current.owner;
  const isAccountChange=(error)=>String(error?.message||error).includes('account-changed-reload-binder');
  const clearOwner=(resetWork=true)=>{
    const r=refs.current;
    r.epoch+=1;
    r.binder?.invalidate();r.owner='';r.pendingKey=null;r.saved=null;r.undo=null;
    setSavedFingerprint(initialFingerprint.current||'');
    if(resetWork)latest.current.reset();
  };

  const applySaved=(record)=>{
    const restored=decodeEpisode01({exercise_id:schema.exerciseId,...record},schema);
    latest.current.restore(restored);
    setSavedFingerprint(fingerprintOf(record.input_state));
  };
  const read=async(autoRestore=false)=>{
    const r=refs.current;
    const startedAt=r.epoch;
    const session=await r.runtime.controller.getSession();
    if(startedAt!==r.epoch)return {authenticated:false,stale:true};
    if(!session?.user?.id) {
      const hadOwner=!!r.owner;
      clearOwner(hadOwner);
      setPhase('guest');
      setMessage(hadOwner?'You are signed out. Previous account work has been closed.':'Your work stays open here. Sign in to save it to My Closet.');
      return {authenticated:false};
    }
    if(r.owner && r.owner!==session.user.id) {
      clearOwner(true);
    }
    r.owner=session.user.id;
    const token={epoch:r.epoch,owner:r.owner};
    let result;
    try {result=await r.binder.load(token.owner);}
    catch(error){
      if(!isCurrent(token))return {authenticated:false,stale:true};
      if(isAccountChange(error)){clearOwner(true);setPhase('guest');setMessage('The account changed. Previous account work has been closed.');return {authenticated:false,accountChanged:true};}
      throw error;
    }
    if(!isCurrent(token))return {authenticated:false,stale:true};
    r.saved=result.document.episodes['01']?.exercises[recordKey]||null;
    if(autoRestore&&r.saved&&!latest.current.snapshot.task.trim()) applySaved(r.saved);
    else if(!r.saved)setSavedFingerprint(initialFingerprint.current||fingerprint);
    setPhase('ready');setMessage(r.saved?'Your saved exercise is available in your binder.':'Save your exercise whenever you want to pause.');
    return {authenticated:true,saved:r.saved};
  };
  useEffect(()=>{
    let live=true,subscription;
    (async()=>{
      try {
        const runtime=await window.LAIDIESResidentAccountRuntime.get();
        if(!live)return;
        refs.current.runtime=runtime;
        refs.current.binder=window.LAIDIESResidentEpisodeBinderV1.create(runtime);
        subscription=runtime.client.auth.onAuthStateChange((_event,session)=>{
          if(!live)return;
          const r=refs.current;
          if(r.owner&&r.owner!==session?.user?.id) {
            clearOwner(true);setPhase('guest');
            setMessage('The account changed. Previous account work has been closed.');
          }
        }).data.subscription;
        await read(true);
      } catch (_) {if(live){setPhase('unavailable');setMessage('Account saving is unavailable. Keep this page open so your current work stays here.');}}
    })();
    return()=>{live=false;refs.current.epoch+=1;subscription?.unsubscribe();refs.current.binder?.dispose();};
  },[]);

  const save=async()=>{
    const r=refs.current;
    if(!r.binder)return;
    let token=null;
    try {
      const startedAt=r.epoch;
      const session=await r.runtime.controller.getSession();
      if(startedAt!==r.epoch)return;
      if(!session?.user?.id){const hadOwner=!!r.owner;clearOwner(hadOwner);setPhase('guest');setMessage(hadOwner?'You are signed out. Previous account work has been closed.':'Sign in before saving. Your current work is still here.');return;}
      if(r.owner&&r.owner!==session.user.id){await read();return;}
      r.owner=session.user.id;
      token={epoch:r.epoch,owner:r.owner};
      const input=encodeEpisode01(latest.current.snapshot,schema);
      r.pendingKey ||= crypto.randomUUID();
      setPhase('saving');setMessage('Saving your exercise…');
      const result=await r.binder.saveExercise(1,{exercise_id:schema.exerciseId,exercise_version:schema.exerciseVersion,input_state:input,placements:r.saved?.placements||[]},r.pendingKey,token.owner);
      if(!isCurrent(token))return;
      if(result.state==='conflict') {r.pendingKey=null;setPhase('conflict');setMessage('Your binder changed elsewhere. Your current work is still here; reopen the saved copy before choosing what to keep.');return;}
      r.pendingKey=null;r.saved=result.document.episodes['01'].exercises[recordKey];
      setSavedFingerprint(fingerprintOf(r.saved.input_state));setPhase('ready');setMessage('Saved to your episode binder in My Closet.');
    } catch(error) {
      if(token&&!isCurrent(token))return;
      if(isAccountChange(error)){clearOwner(true);setPhase('guest');setMessage('The account changed. Previous account work has been closed.');return;}
      setPhase('error');
      setMessage(error instanceof TypeError||error instanceof RangeError?error.message:'The save could not be confirmed. Your work is still here. Retry to check the same save.');
    }
  };
  const reopen=async()=>{
    try {
      const result=await read();
      if(result?.authenticated&&result.saved) {refs.current.undo=structuredClone(latest.current.snapshot);applySaved(result.saved);setMessage('Your saved exercise is open. You can return to the draft you had open.');}
    } catch (_) {setPhase('error');setMessage('The saved exercise could not be opened. Your current work has been kept.');}
  };
  const undoRestore=()=>{if(refs.current.undo){latest.current.restore(refs.current.undo);refs.current.undo=null;setPhase('ready');setMessage('Your previous draft is back. Save it when you are ready.');}};
  return {phase,message,save,reopen,undoRestore,canUndo:!!refs.current.undo,checkSignIn:()=>read().catch(()=>{setPhase('unavailable');setMessage('Account saving is unavailable. Your current work is still here.');}),hasSaved:!!refs.current.saved,dirty:!!fingerprint&&fingerprint!==savedFingerprint};
}
