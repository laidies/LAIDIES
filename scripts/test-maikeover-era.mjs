import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../maikeover.html',import.meta.url),'utf8');
const source=html.slice(html.indexOf('    var A_ERA='),html.indexOf("    window.addEventListener('laidies:portrait-selected'"));
function run(code){
  const nodes={};
  const node=()=>({children:[],value:'',textContent:'',classList:{toggle(){}},setAttribute(){},addEventListener(){},appendChild(c){this.children.push(c);}});
  const context={window:{},document:{createElement:node},$:id=>nodes[id]??=node(),renderPreview(){},Math:Object.create(Math)};
  vm.runInNewContext(code,context);
  const extras=()=>context.window.LAIDIESPortraitChoices.extras();
  assert.deepEqual(Array.from(nodes.moEra.children,c=>c.textContent),['Random','None','1990','1995','2000','2005','2010']);
  for(const [value,year] of [[0,'1990'],[.21,'1995'],[.41,'year-2000'],[.61,'2005'],[.9999,'2010']]){
    context.Math.random=()=>value;
    assert.ok(extras().startsWith(year),'Random must resolve to a dated era');
  }
  nodes.moEra.children[1].onclick();
  assert.doesNotMatch(extras(),/hair and makeup/);
  assert.equal(nodes.moEraDesc.textContent,'No era styling — just your look.');
  nodes.moEra.children[3].onclick();
  assert.ok(extras().startsWith('1995'));
}
assert.throws(()=>run(source.replace('era = eras[Math.floor(Math.random() * eras.length)];',"era = {p:'',l:'None',d:''};")));
run(source);
console.log('Random resolves all five eras; None omits era; explicit choice retained. Broken Random rejected. No image generation performed.');
