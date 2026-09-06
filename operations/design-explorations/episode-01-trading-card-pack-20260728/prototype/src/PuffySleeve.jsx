import {useRef,useState} from 'react';
import '../../../../../content/site/puffy-bookmarks.js';

const asset=file=>`${import.meta.env.BASE_URL}assets/puffies/${file}`;
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
export function PuffySleeve({card,placements,onChange,disabled}){
  const [selected,setSelected]=useState(-1),[drawer,setDrawer]=useState(false);
  const mat=useRef(null),drag=useRef(null);
  const catalog=window.LAIDIESPuffyCatalogV1,pouch=catalog.readPouch();
  const selectedItem=placements[selected];
  function update(index,patch){if(disabled)return;onChange(placements.map((item,i)=>i===index?{...item,...patch}:item));}
  function move(index,x,y){update(index,{x:clamp(x,.2,.8),y:clamp(y,.35,.65)});}
  function add(sticker){if(disabled||placements.length>=30)return;onChange([...placements,{sticker_id:sticker.sticker_id,x:.25+(placements.length%3)*.25,y:.5,scale:1,rotation:0,z:placements.length}]);setSelected(placements.length);}
  return <section className="puffy-sleeve" aria-label={`${card.title} card sleeve`}>
    <div className="sleeve-label"><span>MY CARD SLEEVE</span><button type="button" aria-expanded={drawer} onClick={()=>setDrawer(!drawer)}>PUFFIES</button></div>
    {(drawer||placements.length>0)&&<div className="sleeve-mat" ref={mat}>
      {!placements.length&&<p>Keep a little flair with this card.</p>}
      {placements.map((item,index)=>{const sticker=catalog.resolve(item.sticker_id);return <button key={index} type="button" className={`sleeve-puffy ${selected===index?'selected':''}`} disabled={disabled} aria-label={`Select ${sticker?.label||'earlier Puffy'} on ${card.title} sleeve`} aria-pressed={selected===index} style={{left:`${item.x*100}%`,top:`${item.y*100}%`,transform:`translate(-50%,-50%) rotate(${item.rotation}deg) scale(${item.scale})`,zIndex:item.z+1}}
        onClick={()=>setSelected(index)}
        onPointerDown={event=>{if(disabled)return;setSelected(index);drag.current=index;event.currentTarget.setPointerCapture(event.pointerId);}}
        onPointerMove={event=>{if(drag.current!==index||!event.currentTarget.hasPointerCapture(event.pointerId))return;const box=mat.current.getBoundingClientRect();move(index,(event.clientX-box.left)/box.width,(event.clientY-box.top)/box.height);}}
        onPointerUp={()=>{drag.current=null;}} onPointerCancel={()=>{drag.current=null;}}
        onKeyDown={event=>{const steps={ArrowLeft:[-.05,0],ArrowRight:[.05,0],ArrowUp:[0,-.05],ArrowDown:[0,.05]};if(steps[event.key]){event.preventDefault();move(index,item.x+steps[event.key][0],item.y+steps[event.key][1]);}}}>
        {sticker?<img src={asset(sticker.file)} alt="" draggable="false"/>:<span>Earlier Puffy</span>}
      </button>;})}
    </div>}
    {drawer&&<div className="sleeve-drawer">
      <p>Choose a Puffy, then drag it on the sleeve. You can also select it and use the arrow keys.</p>
      {pouch.state==='device-local'?<><p className="pouch-note">Your ten Puffies on this device.</p><div className="sleeve-pouch">{pouch.items.map(sticker=><button type="button" key={sticker.sticker_id} onClick={()=>add(sticker)} disabled={disabled||placements.length>=30} aria-label={`Add ${sticker.label} to ${card.title} sleeve`}><img src={asset(sticker.file)} alt=""/><span>{sticker.label}</span></button>)}</div></>:<p>Your Puffy pouch isn’t available here yet. <a href="/laidies-card.html#puffyPouch">Choose your ten Puffies in My Closet.</a></p>}
      {disabled&&<p>Sign in and open your saved cards to decorate them. During a save, wait for confirmation before changing the sleeve.</p>}
      {selectedItem&&<div className="sleeve-adjustments">
        <label>Size <input aria-label={`Puffy size on ${card.title}`} type="range" min="0.6" max="1.25" step="0.05" value={selectedItem.scale} disabled={disabled} onChange={event=>update(selected,{scale:Number(event.target.value)})}/></label>
        <label>Tilt <input aria-label={`Puffy tilt on ${card.title}`} type="range" min="-25" max="25" step="1" value={selectedItem.rotation} disabled={disabled} onChange={event=>update(selected,{rotation:Number(event.target.value)})}/></label>
        <button type="button" disabled={disabled} onClick={()=>{onChange(placements.filter((_,index)=>index!==selected));setSelected(-1);}}>PEEL OFF SELECTED PUFFY</button>
      </div>}
      {placements.length>=30&&<p>This sleeve holds thirty Puffies. Peel one off to make room.</p>}
    </div>}
  </section>;
}
