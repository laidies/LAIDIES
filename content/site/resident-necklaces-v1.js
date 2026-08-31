(function residentNecklaces(global) {
  'use strict';
  function bounded(promise) {
    var timer;
    return Promise.race([promise,new Promise(function(_,reject){timer=global.setTimeout(function(){reject(new Error('service-unconfirmed'));},15000);})]).finally(function(){global.clearTimeout(timer);});
  }
  function create(runtime, render) {
    var generation=0;
    function clear() {generation++;render(null,'Sign in to check your private necklaces.');}
    async function refresh() {
      var version=++generation;
      render(null,'Checking your private necklaces…');
      try {
        var before=await bounded(runtime.controller.getSession());
        if(version!==generation)return;
        if(!before){render(null,'Sign in to check your private necklaces.');return;}
        var request=runtime.client.rpc('list_my_resident_necklaces_v1',{});
        if(typeof request.setHeader!=='function')throw new Error('owner-binding-unavailable');
        var result=await bounded(request.setHeader('Authorization','Bearer '+before.access_token));
        var after=await bounded(runtime.controller.getSession());
        if(version!==generation)return;
        if(!after || after.user.id!==before.user.id){clear();return;}
        if(result.error || !Array.isArray(result.data) || result.data.some(function(row){return !row || typeof row.id!=='string' || row.title!=='BEST FRIENDS necklace' || typeof row.createdAt!=='string';}))throw new Error('service-unconfirmed');
        render(result.data,result.data.length?'Your private account necklaces. Friend identities are not published here.':'No confirmed necklaces for this account yet.');
      } catch(_){if(version===generation)render(null,'Necklaces could not be checked. Your saved collection has not been changed.');}
    }
    return {refresh:refresh,clear:clear};
  }
  global.LAIDIESResidentNecklacesV1={create:create};
  async function init() {
    var params=new URLSearchParams(global.location.search);
    if(params.has('u') || params.has('member'))return;
    var doc=global.document,grid=doc.getElementById('bestieGrid'),count=doc.getElementById('bestieCount'),note=doc.getElementById('bestieNote');
    if(!grid || !count || !note)return;
    note.setAttribute('role','status');
    function render(rows,message) {
      grid.replaceChildren();count.textContent=rows ? rows.length+(rows.length===1?' necklace':' necklaces') : 'Not checked';
      note.textContent=message;
      (rows||[]).forEach(function(row){
        var card=doc.createElement('div'),heart=doc.createElement('span'),label=doc.createElement('span');
        card.className='bestie-charm';heart.className='bestie-heart';heart.textContent='♥';heart.setAttribute('aria-hidden','true');
        label.className='bestie-handle';label.textContent=row.title;card.append(heart,label);grid.appendChild(card);
      });
    }
    render(null,'Checking your private necklaces…');
    try {
      var runtime=await bounded(global.LAIDIESResidentAccountRuntime.get()),controller=create(runtime,render);
      runtime.client.auth.onAuthStateChange(function(){controller.clear();global.setTimeout(function(){controller.refresh();},0);});
      await controller.refresh();
    }catch(_){render(null,'Necklaces could not be checked. Your saved collection has not been changed.');}
  }
  if(global.document.readyState==='loading')global.document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(window);
