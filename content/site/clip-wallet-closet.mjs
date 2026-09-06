import {createClipWalletClient} from './clip-wallet-client.mjs';
const section=document.querySelector('#butterflyJar');
const params=new URLSearchParams(location.search);
if(section&&(params.has('u')||params.has('member')||location.pathname.startsWith('/@'))){section.remove();}
else if(section){
  const $=id=>document.getElementById(id);
  const totals={clipWalletTotal:'available',clipWalletPending:'pending',clipWalletEarned:'lifetime_earned',clipWalletSpent:'lifetime_spent',clipWalletRefunded:'lifetime_refunded',clipWalletAdjusted:'lifetime_adjusted'};
  let runtime,wallet,owner='',epoch=0,busy=false,nextCursor=null;
  section.hidden=false;
  function clear(note){epoch++;owner='';wallet?.invalidate();nextCursor=null;busy=false;for(const id of Object.keys(totals))$(id).textContent='—';$('clipWalletHistory').replaceChildren();$('clipWalletCount').textContent='Account balance';$('clipWalletStatus').textContent=note;$('clipWalletMore').hidden=true;$('clipWalletRefresh').disabled=false;}
  async function refresh(more=false){
    if(busy)return;busy=true;$('clipWalletRefresh').disabled=true;$('clipWalletMore').disabled=true;
    const started=epoch;
    try{
      const session=await runtime.controller.getSession();
      if(started!==epoch)return;
      const observed=session?.user?.id||'';
      if(owner&&owner!==observed){clear('The account changed. Reopen this account’s clip balance.');return;}
      if(!observed){clear('Sign in to see your saved Butterfly Clips.');return;}
      owner=observed;
      const result=await wallet.snapshot(owner,{cursor:more?nextCursor:null,limit:20});
      if(started!==epoch)return;
      for(const [id,key] of Object.entries(totals))$(id).textContent=String(result[key]);
      $('clipWalletCount').textContent=`${result.available} available`;
      if(result.legacy_review_required){for(const id of Object.keys(totals))$(id).textContent='—';$('clipWalletCount').textContent='Reconciliation pending';}
      if(!more)$('clipWalletHistory').replaceChildren();
      for(const entry of result.history){
        const row=document.createElement('li'),description=document.createElement('span'),amount=document.createElement('span');
        description.className='clip-ep';description.textContent=entry.reason;
        const date=document.createElement('small');date.textContent=new Date(entry.occurred_at).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'});description.append(document.createElement('br'),date);
        amount.className='clip-amount';amount.textContent=`${entry.event_type==='GRANT'?'+':''}${entry.units}`;row.append(description,amount);$('clipWalletHistory').append(row);
      }
      nextCursor=result.next_cursor;$('clipWalletMore').hidden=!nextCursor;
      $('clipWalletStatus').textContent=result.legacy_review_required?'Your earlier reward records are kept. Their account balance needs reconciliation; they have not been added to this verified total.':result.history.length?'Your first quiz award is kept here. Practice retakes do not increase it.':'No account clip earnings yet. Your first submitted quiz attempt can earn clips.';
    }catch(error){
      if(started!==epoch)return;
      clear(String(error?.message||error).includes('account-changed')?'The account changed. Previous account details are closed.':'Your clip balance is unavailable right now. Try again.');
    }finally{if(started===epoch){busy=false;$('clipWalletRefresh').disabled=false;$('clipWalletMore').disabled=false;}}
  }
  $('clipWalletRefresh').addEventListener('click',()=>refresh());$('clipWalletMore').addEventListener('click',()=>refresh(true));
  window.addEventListener('pagehide',()=>clear('Reopen your saved clip balance when you return.'));
  window.addEventListener('pageshow',event=>{if(event.persisted&&runtime)refresh();});
  try{
    runtime=await window.LAIDIESResidentAccountRuntime.get();wallet=createClipWalletClient(runtime);
    runtime.client.auth.onAuthStateChange((_event,session)=>{if(owner&&owner!==session?.user?.id)clear('The account changed. Reopen this account’s clip balance.');});
    await refresh();
  }catch(_){clear('Your clip balance is unavailable right now. Try again.');}
}
