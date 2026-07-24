/**
 * LAiDIES avatar maker.
 * POST { image?: base64(no prefix), traits?: {...}, itemPrompt?: string }
 *   -> vision model describes the photo (if given)
 *   -> prompt built from description + trait picks + Y2K pixel style
 *   -> Flux generates the pixel character
 * Returns { image: base64png, prompt, desc }.
 */

// Shared look — DETAILED, TEXTURED semi-realistic Y2K illustration (the v6 target):
// fine pixel/painted grain, rich shading, MATTE. Not plastic/glossy soft cartoon,
// not photoreal, not blurry heavy pixels.
const PIXEL_MEDIUM =
  'a highly detailed 1999 Y2K pixel-art character portrait — semi-realistic face with clean detailed ' +
  'shading, like a high-resolution pre-rendered SNES / 16-bit RPG character portrait with crisp fine ' +
  'pixels, a saturated pink and purple Y2K palette, sparkles. Flattering, smooth clear skin, natural chic ' +
  'makeup (no heavy eyeliner). Head and shoulders. NOT warm-toned, NOT airbrushed, NOT soft-painterly, ' +
  'NOT a flat cartoon, NOT blurry, NOT chunky Minecraft blocks, NOT photorealistic. No text, no watermark.';
const STYLE = PIXEL_MEDIUM;
// Safety circuit breaker. Keep paid generation closed until the public flow
// has server-validated bot protection and durable budget controls.
const GENERATION_ENABLED = false;

// Concise style tag for InstantID (SDXL prefers short tag-style prompts).
const INSTANT_STYLE =
  '1999 Y2K studio portrait, retro late-90s style, soft flattering studio lighting, vibrant colours, ' +
  'clean and simple';
function instantIdPrompt(extras) {
  return (
    'a close-up head-and-shoulders portrait of one woman, facing forward, centred, upright, looking at ' +
    'camera, ' + INSTANT_STYLE +
    (extras ? ', ' + extras : '') +
    ', smooth even skin, warm soft smile, bright flattering lighting'
  );
}

// Photo edit: keep an ACCURATE likeness, restyle into the illustration, swap the
// background. Kept short on purpose — long tangled prompts distort faces.
function photoPrompt(extras) {
  return (
    'Turn this photo of a real woman into ' + PIXEL_MEDIUM +
    ' Make it clearly recognizable as HER — same hair colour and style, same skin tone and ethnicity, ' +
    'same general features and vibe — rendered as a crisp, clean, richly detailed Y2K character (flattering, ' +
    'smooth clear skin, natural confident expression). Completely replace the background with the backdrop below' +
    (extras ? '. Include: ' + extras : '') +
    '.'
  );
}

// Call OpenAI Images. With imageBytes -> /edits (keeps the person). Without -> /generations.
// moderation:'low' cuts the over-aggressive false-positive blocks; retries handle the rest.
async function openaiImage(env, { prompt, imageBytes }) {
  const auth = { Authorization: 'Bearer ' + env.OPENAI_API_KEY };
  let lastErr = '';
  for (let attempt = 0; attempt < 4; attempt++) {
    let resp;
    if (imageBytes) {
      const form = new FormData();
      form.append('model', 'gpt-image-1');
      form.append('image', new File([imageBytes], 'photo.png', { type: 'image/png' }));
      form.append('prompt', prompt);
      form.append('size', '1024x1024');
      form.append('quality', 'medium'); // medium is plenty at avatar size, ~2x faster than high
      form.append('input_fidelity', 'high'); // hold the real face/features tightly
      form.append('moderation', 'low');
      form.append('n', '1');
      resp = await fetch('https://api.openai.com/v1/images/edits', { method: 'POST', headers: auth, body: form });
    } else {
      resp = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, auth),
        body: JSON.stringify({ model: 'gpt-image-1', prompt, size: '1024x1024', quality: 'medium', moderation: 'low', n: 1 }),
      });
    }
    const data = await resp.json();
    if (resp.ok && data.data && data.data[0] && data.data[0].b64_json) return data.data[0].b64_json;
    lastErr = (data && data.error && data.error.message) || 'OpenAI ' + resp.status;
    // Retry on stochastic safety/moderation blocks or transient server/rate errors.
    const retryable = /safety|moderation/i.test(lastErr) || resp.status >= 500 || resp.status === 429;
    if (!retryable) throw new Error(lastErr);
  }
  throw new Error(lastErr + ' (still blocked after 4 tries)');
}

function isAllowedOrigin(origin) {
  // Test the full origin string (scheme + host). Allow localhost (any port),
  // 127.0.0.1, and laidies.ai / wearelaidies.ai (+ subdomains).
  return Boolean(
    origin &&
    /^(https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?|https:\/\/([a-z0-9-]+\.)*(laidies\.ai|wearelaidies\.ai))$/.test(origin)
  );
}

function cors(origin) {
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin(origin) ? origin : 'https://laidies.ai',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json' }, headers || {}),
  });
}

function b64ToBytes(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function bytesToB64(bytes) {
  let bin = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  return btoa(bin);
}

// Shared Replicate runner: POST a prediction (sync via Prefer:wait) + poll fallback,
// then fetch the output image and return it as base64.
async function replicateRun(env, version, input) {
  const auth = { Authorization: 'Bearer ' + env.REPLICATE_API_TOKEN };
  let resp = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: Object.assign({ 'Content-Type': 'application/json', Prefer: 'wait' }, auth),
    body: JSON.stringify({ version, input }),
  });
  let data = await resp.json();
  if (!resp.ok) throw new Error('Replicate ' + resp.status + ': ' + JSON.stringify(data).slice(0, 400));
  let tries = 0;
  while (data.status && data.status !== 'succeeded' && data.status !== 'failed' && data.status !== 'canceled' && data.urls && data.urls.get && tries < 60) {
    await new Promise((r) => setTimeout(r, 1500));
    const pr = await fetch(data.urls.get, { headers: auth });
    data = await pr.json();
    tries++;
  }
  if (data.status !== 'succeeded') throw new Error('Replicate ' + (data.status || 'error') + ': ' + (data.error || ''));
  const url = Array.isArray(data.output) ? data.output[0] : data.output;
  const imgResp = await fetch(url);
  return bytesToB64(new Uint8Array(await imgResp.arrayBuffer()));
}

// face-to-many — stylise a face into a chosen style (Video game / Pixels / 3D…)
// while locking identity via instant_id_strength. Purpose-built for this.
const FACE_TO_MANY_VERSION = 'a07f252abbbd832009640b27f063ea52d87d7a23a185ca165bec23b5adc8deaf';
async function replicateFaceToMany(env, { imageBytes, style, prompt, idStrength, promptStrength }) {
  const image = 'data:image/png;base64,' + bytesToB64(imageBytes);
  return replicateRun(env, FACE_TO_MANY_VERSION, {
    image,
    style: style || 'Video game',
    prompt: prompt || '1999 Y2K style, retro late-90s',
    negative_prompt: 'ugly, deformed, blurry, low quality, watermark, text',
    instant_id_strength: typeof idStrength === 'number' ? idStrength : 0.8,
    prompt_strength: typeof promptStrength === 'number' ? promptStrength : 4.5,
  });
}

// Convert ANY uploaded image (incl. HEIC/HEIF) to a resized PNG via Cloudflare
// Images. Returns null if the binding is unavailable / conversion fails.
async function normalizePng(env, bytes) {
  if (!env.IMAGES) return null;
  try {
    const r = await env.IMAGES.input(new Response(bytes).body)
      .transform({ width: 1024 })
      .output({ format: 'image/png' });
    return new Uint8Array(await r.response().arrayBuffer());
  } catch (e) {
    return null;
  }
}


export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const ch = cors(origin);
    if ((request.method === 'OPTIONS' || request.method === 'POST') && !isAllowedOrigin(origin)) {
      return json({ error: 'origin not allowed' }, 403);
    }
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: ch });
    if (request.method === 'GET') {
      return json({ service: 'laidies-avatar', generation: 'paused' }, 200);
    }
    if (request.method !== 'POST') return json({ error: 'POST only' }, 405, ch);
    if (!GENERATION_ENABLED) {
      return json(
        { error: 'The portrait booth is getting a safety upgrade. The rest of your Resident Card still works.' },
        503,
        Object.assign({ 'Retry-After': '86400' }, ch)
      );
    }

    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'bad json' }, 400, ch); }

    const traits = body.traits && typeof body.traits === 'object' ? body.traits : {};
    const traitStr = Object.keys(traits)
      .map((k) => (traits[k] ? String(traits[k]) : ''))
      .filter(Boolean)
      .join(', ');

    const hasPhoto = typeof body.image === 'string' && body.image.length > 100;
    const extras = [traitStr, body.itemPrompt ? String(body.itemPrompt) : ''].filter(Boolean).join(', ');

    try {
      // ---- PHOTO PATH: gpt-image-1 edit — cartoon-stylise + obey the prompt (accessories/outfit/bg) ----
      if (hasPhoto) {
        if (!env.OPENAI_API_KEY) return json({ error: 'OPENAI_API_KEY is not set on this worker yet.' }, 500, ch);
        let bytes = b64ToBytes(body.image.replace(/^data:[^,]+,/, ''));
        const png = await normalizePng(env, bytes); // HEIC/any -> PNG server-side
        if (png) bytes = png;
        const prompt = body.rawPrompt ? String(body.rawPrompt) : photoPrompt(extras);
        const outB64 = await openaiImage(env, { prompt, imageBytes: bytes });
        return json({ image: outB64, prompt, mode: 'openai-edit' }, 200, ch);
      }

      // ---- NO-PHOTO PATH: OpenAI generation — full character from scratch ----
      if (!env.OPENAI_API_KEY) return json({ error: 'OPENAI_API_KEY is not set on this worker yet.' }, 500, ch);
      const subject = body.itemPrompt ? String(body.itemPrompt) : traitStr || 'a friendly 90s girl with a bright smile';
      const prompt = body.rawPrompt ? String(body.rawPrompt) : subject + ', ' + STYLE;
      const outB64 = await openaiImage(env, { prompt });
      return json({ image: outB64, prompt, mode: 'openai-gen' }, 200, ch);
    } catch (e) {
      return json({ error: String((e && e.message) || e) }, 500, ch);
    }
  },
};

const DEMO_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>LAiDIES avatar maker — style preview</title>
<style>
 body{margin:0;font-family:system-ui,sans-serif;background:#1a0f18;color:#f3e9ef;padding:24px}
 .wrap{max-width:720px;margin:0 auto}
 h1{font-size:21px;margin:0 0 4px} .sub{font-size:13px;color:#a794a3;margin:0 0 18px}
 label{display:block;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#e6b8d2;margin:16px 0 6px;font-weight:700}
 textarea,input[type=file],input[type=text]{width:100%;box-sizing:border-box;background:#22131f;border:1px solid #3a2433;color:#f3e9ef;border-radius:9px;padding:11px;font:14px system-ui}
 textarea{min-height:74px;resize:vertical}
 .chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}
 .chip{font-size:12.5px;background:#22131f;border:1px solid #3a2433;color:#e6b8d2;border-radius:999px;padding:6px 12px;cursor:pointer;user-select:none}
 .chip.on{background:#e982ab;color:#2b1622;border-color:#e982ab;font-weight:700}
 button{margin-top:16px;background:#e982ab;color:#2b1622;border:0;border-radius:999px;padding:13px 26px;font-weight:800;cursor:pointer;font-size:14px}
 button:disabled{opacity:.45;cursor:default}
 .st{margin-top:12px;font-size:13px;color:#e6b8d2;min-height:18px}
 .row{display:flex;gap:18px;flex-wrap:wrap;margin-top:22px}
 .box{flex:1;min-width:230px} .box canvas,.box img{width:100%;border-radius:14px;image-rendering:pixelated;background:#22131f;display:block}
 .box img{image-rendering:auto}
 .cap{font-size:11.5px;color:#a794a3;margin-top:9px;text-align:center}
 .modes{display:flex;gap:8px;margin-top:6px}
 .mode{margin-top:0;flex:1;background:#22131f;color:#e6b8d2;border:1px solid #3a2433;font-size:13.5px;font-weight:700;padding:11px}
 .mode.on{background:#e982ab;color:#2b1622;border-color:#e982ab}
 .hint{font-size:12px;color:#a794a3;margin:7px 0 0}
 .result{margin:22px auto 0;max-width:440px}
 .result>img,.result>canvas{width:100%;border-radius:16px;background:#22131f;display:block;min-height:140px}
 .avrow{display:flex;gap:16px;align-items:center;justify-content:center;margin-top:18px}
 .avrow img{border-radius:50%;display:block;background:#22131f;object-fit:cover}
 .av-lg{width:120px;height:120px} .av-md{width:72px;height:72px} .av-sm{width:44px;height:44px}
 .cands{display:flex;gap:10px;margin-top:16px;justify-content:center}
 .cand{flex:1;max-width:140px;aspect-ratio:1;border-radius:12px;background:#22131f;border:2px solid transparent;overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:pointer}
 .cand.sel{border-color:#e982ab}
 .cand img{width:100%;height:100%;object-fit:cover;display:block}
 .cand .spin{color:#a794a3;font-size:20px}
</style></head><body><div class="wrap">
<h1>LAiDIES avatar maker <span style="color:#e982ab">★</span></h1>
<p class="sub">Turn your photo into a Y2K pixel character — or build one from scratch. Runs on gpt-image-1.</p>
<div class="modes">
 <button type="button" class="mode on" data-mode="photo">Use my photo</button>
 <button type="button" class="mode" data-mode="scratch">Build from scratch</button>
</div>
<div id="photoBlock">
 <label>Your photo</label>
 <input type="file" id="photo" accept="image/*">
 <p class="hint">We keep your real face &amp; skin tone — just add extras below.</p>
</div>
<div id="scratchBlock" hidden>
 <label>Describe the person you want</label>
 <p class="hint">No photo — so tell us who to draw: hair, skin tone, features, outfit. Be specific.</p>
 <textarea id="prompt" placeholder="e.g. warm brown skin, long dark curly hair, brown eyes, gold hoops, denim jacket, big smile"></textarea>
</div>
<label>The Era's Tour — pick one</label>
<div class="chips" id="eraChips"></div>
<p class="hint" id="eraDesc"></p>
<label>Outfit — pick one</label>
<div class="chips" id="fitChips"></div>
<label>Accessories — pick any</label>
<div class="chips" id="accChips"></div>
<input type="text" id="nameField" placeholder="First name (used only if you pick the name necklace)" style="margin-top:8px">
<label>Background — pick one</label>
<div class="chips" id="bgChips"></div>
<button id="go">Make 3 characters ★</button>
<div class="st" id="st"></div>
<div class="cands" id="cands"></div>
<label id="grainLabel" hidden>Pixel finish (optional) — <span id="grainVal">off</span></label>
<input type="range" id="grain" min="0" max="5" value="0" step="1" style="width:100%" hidden>
<div class="result">
 <canvas id="out" width="512" height="512"></canvas>
 <div class="cap">full size</div>
 <div class="avrow" id="avrow"></div>
 <div class="cap" id="avcap"></div>
</div>
</div>
<script>
// Worn accessories (visible in a head-and-shoulders crop — no held props).
var ACC=[
 {l:'butterfly clips',p:'butterfly hair clips'},
 {l:'choker',p:'black choker necklace'},
 {l:'hoop earrings',p:'gold hoop earrings'},
 {l:'heart necklace',p:'gold heart pendant necklace'},
 {l:'name necklace',p:'gold name-plate necklace',name:1},
 {l:'lip gloss',p:'shiny lip gloss'},
 {l:'glittery cheeks',p:'a little cosmetic glitter on the cheeks only, nowhere else'},
 {l:'freckles',p:'natural freckles'},
 {l:'sunnies on head',p:'big oversized Y2K tinted sunglasses pushed up on top of the head'},
 {l:'flip phone',p:'holding a Y2K flip phone'},
 {l:'lip gloss wand',p:'holding a lip gloss wand'}
];
// The Era's Tour — pick one. LOOK ONLY (hair / makeup / colour-grade), never
// clothing, so it never fights the Outfit pick. d = shown to the user.
var ERA=[
 {l:'any',p:'',d:'No era styling — just your own look.'},
 {l:'1990',p:'1990 hair and makeup — matte lip, centre-parted hair, minimal natural makeup, muted early-90s colour grade',d:'Matte lip · centre part · minimal makeup · muted grade'},
 {l:'1995',p:'1995 hair and makeup — frosted lip, soft waves, a little shimmer, mid-90s colour grade',d:'Frosted lip · soft waves · shimmer · mid-90s grade'},
 {l:'2000',p:'year-2000 Y2K hair and makeup — glossy frosted lip, sleek flippy hair, shimmer, bright Y2K colour grade',d:'Glossy frosted lip · flippy hair · shimmer · bright grade'},
 {l:'2005',p:'2005 hair and makeup — side-swept bang, chunky highlights, glossy lip, mid-2000s colour grade',d:'Side bang · chunky highlights · glossy lip'},
 {l:'2010',p:'2010 hair and makeup — side-swept bangs, soft glam, warm indie-sleaze colour grade',d:'Side-swept bangs · soft glam · warm grade'}
];
// Outfit — pick one. First = keep whatever she's wearing in the photo.
var OUTFIT=[
 {l:'keep my outfit',p:''},
 {l:'hot-pink blazer',p:'wearing a hot-pink blazer over a black top'},
 {l:'baby tee',p:'wearing a fitted Y2K baby tee'},
 {l:'denim jacket',p:'wearing a denim jacket'},
 {l:'halter top',p:'wearing a sparkly halter top'},
 {l:'satin tube top',p:'wearing a satin tube top'},
 {l:'velour tracksuit',p:'wearing a velour tracksuit zip-up'},
 {l:'cardigan + cami',p:'wearing a cropped cardigan over a lace cami'},
 {l:'feather boa',p:'with a fluffy feather boa around the shoulders'}
];
// Backgrounds — 90s school-portrait style. Pick exactly one (first is default).
var BG=[
 {l:'Pink lasers',p:'a 1990s Glamour Shots laser-beam studio backdrop, pink and magenta lasers on a dark ground'},
 {l:'Blue lasers',p:'a 1990s Glamour Shots laser-beam studio backdrop, blue and cyan lasers on a dark ground'},
 {l:'Rainbow lasers',p:'a 1990s Glamour Shots laser-beam studio backdrop, multicoloured rainbow lasers on a dark ground'},
 {l:'Blue cloud',p:'a classic 1990s school-portrait mottled blue and grey cloud studio backdrop'},
 {l:'Grey marble',p:'a classic 1990s school-portrait mottled grey studio backdrop'},
 {l:'Teal→purple',p:'a 1990s school-portrait smooth teal-to-purple gradient studio backdrop'},
 {l:'Pink→lilac',p:'a 1990s school-portrait smooth pink-to-lilac gradient studio backdrop'},
 {l:'Starfield',p:'a 1990s school-portrait starry-night studio backdrop'}
];
var accOn={}, bgIdx=0, fitIdx=0, eraIdx=0;
var accChips=document.getElementById('accChips'), bgChips=document.getElementById('bgChips'), fitChips=document.getElementById('fitChips'), eraChips=document.getElementById('eraChips');
ERA.forEach(function(v,i){
 var c=document.createElement('span');c.className='chip'+(i===0?' on':'');c.textContent=v.l;
 c.onclick=function(){ eraIdx=i; Array.prototype.forEach.call(eraChips.children,function(x,j){x.classList.toggle('on',j===i);}); document.getElementById('eraDesc').textContent=ERA[i].d; };
 eraChips.appendChild(c);
});
document.getElementById('eraDesc').textContent=ERA[0].d;
var ACC_MAX=4;
function accCount(){ return Object.keys(accOn).filter(function(k){return accOn[k];}).length; }
ACC.forEach(function(v,i){
 var c=document.createElement('span');c.className='chip';c.textContent=v.l;
 c.onclick=function(){
  if(!accOn[i] && accCount()>=ACC_MAX){ document.getElementById('st').textContent='Keep it to '+ACC_MAX+' accessories — less is more.'; return; }
  accOn[i]=!accOn[i]; c.classList.toggle('on');
 };
 accChips.appendChild(c);
});
OUTFIT.forEach(function(v,i){
 var c=document.createElement('span');c.className='chip'+(i===0?' on':'');c.textContent=v.l;
 c.onclick=function(){ fitIdx=i; Array.prototype.forEach.call(fitChips.children,function(x,j){x.classList.toggle('on',j===i);}); };
 fitChips.appendChild(c);
});
BG.forEach(function(v,i){
 var c=document.createElement('span');c.className='chip'+(i===0?' on':'');c.textContent=v.l;
 c.onclick=function(){ bgIdx=i; Array.prototype.forEach.call(bgChips.children,function(x,j){x.classList.toggle('on',j===i);}); };
 bgChips.appendChild(c);
});
function extrasStr(){
 var nm=(document.getElementById('nameField').value||'').trim().replace(/"/g,'');
 var a=ACC.filter(function(v,i){return accOn[i];}).map(function(v){
  if(v.name) return nm ? ('a gold name-plate necklace that clearly reads "'+nm+'" in cursive script') : v.p;
  return v.p;
 });
 if(ERA[eraIdx].p) a.push(ERA[eraIdx].p);
 if(OUTFIT[fitIdx].p) a.push(OUTFIT[fitIdx].p);
 a.push(BG[bgIdx].p);
 return a.join(', ');
}
var mode='photo';
document.querySelectorAll('.mode').forEach(function(b){
 b.onclick=function(){
  mode=b.getAttribute('data-mode');
  document.querySelectorAll('.mode').forEach(function(x){x.classList.toggle('on',x===b);});
  document.getElementById('photoBlock').hidden=(mode!=='photo');
  document.getElementById('scratchBlock').hidden=(mode!=='scratch');
 };
});
// Light pixel finish (nearest-neighbor resample, no colour crush). 512 = off.
var genImg=null, GLEVELS=[512,420,384,340,300,256], GLAB=['off','light','fine','medium','more','chunky'];
function draw(){
 if(!genImg)return;
 var gi=+document.getElementById('grain').value, S=GLEVELS[gi];
 document.getElementById('grainVal').textContent=GLAB[gi];
 var out=document.getElementById('out'),ox=out.getContext('2d');
 if(S>=512){ ox.imageSmoothingEnabled=true; ox.clearRect(0,0,512,512); ox.drawImage(genImg,0,0,512,512); }
 else { var c=document.createElement('canvas');c.width=S;c.height=S;var cx=c.getContext('2d');cx.imageSmoothingEnabled=true;cx.drawImage(genImg,0,0,S,S);ox.imageSmoothingEnabled=false;ox.clearRect(0,0,512,512);ox.drawImage(c,0,0,512,512); }
 var url=out.toDataURL();
 document.getElementById('avrow').innerHTML='<img class="av-lg" src="'+url+'"><img class="av-md" src="'+url+'"><img class="av-sm" src="'+url+'">';
 document.getElementById('avcap').textContent='↑ how it looks at avatar size';
}
document.getElementById('grain').addEventListener('input',draw);
// Try to convert the upload to a resized PNG in-browser (fast, small payload).
// Works for PNG/JPEG/WEBP everywhere, and for HEIC in browsers that decode it
// natively (Safari). If it can't decode (e.g. HEIC in Chromium), we send the raw
// bytes and the Worker converts them with Cloudflare Images.
function canvasPngB64(f){
 return new Promise(function(res,rej){
  var url=URL.createObjectURL(f), img=new Image();
  img.onload=function(){
   var max=1024,w=img.naturalWidth||img.width,h=img.naturalHeight||img.height;
   var s=Math.min(1,max/Math.max(w,h)),cw=Math.max(1,Math.round(w*s)),ch=Math.max(1,Math.round(h*s));
   var c=document.createElement('canvas');c.width=cw;c.height=ch;
   c.getContext('2d').drawImage(img,0,0,cw,ch);
   URL.revokeObjectURL(url);
   res(c.toDataURL('image/png').replace(/^data:[^,]+,/,''));
  };
  img.onerror=function(){ URL.revokeObjectURL(url); rej(new Error('decode-failed')); };
  img.src=url;
 });
}
function rawB64(f){ return new Promise(function(res){var r=new FileReader();r.onload=function(){res(String(r.result).replace(/^data:[^,]+,/,''));};r.readAsDataURL(f);}); }
async function fileToUpload(f){ try{ return await canvasPngB64(f); }catch(e){ return await rawB64(f); } }
document.getElementById('go').onclick=async function(){
 var st=document.getElementById('st'),go=this,extras=extrasStr(),body={};
 if(mode==='photo'){
  var f=document.getElementById('photo').files[0];
  if(!f){st.textContent='Pick a photo first ↑';return;}
  st.textContent='Reading your photo…';
  try{ body.image=await fileToUpload(f); }catch(e){ st.textContent='Could not read that image — try a JPG or PNG.'; return; }
  if(extras) body.traits={extras:extras};
 } else {
  var look=document.getElementById('prompt').value.trim();
  if(!look){st.textContent='Describe the person first ↑';return;}
  body.itemPrompt=[look,extras].filter(Boolean).join(', ');
 }
 go.disabled=true; st.textContent='Making 3 — pick your favourite… (~25s)';
 var cands=document.getElementById('cands'); cands.innerHTML=''; var slots=[];
 for(var k=0;k<3;k++){ var s=document.createElement('div'); s.className='cand'; s.innerHTML='<span class="spin">…</span>'; cands.appendChild(s); slots.push(s); }
 var done=0, firstPicked=false, lastErr='';
 function finish(){ done++; if(done>=3){ go.disabled=false; if(!firstPicked) st.textContent='All 3 failed: '+(lastErr||'unknown error'); } }
 for(let k=0;k<3;k++){
  (async function(){
   await new Promise(function(r){ setTimeout(r, k*900); }); // stagger — avoid Replicate concurrency limit
   var ok=false;
   for(var attempt=0; attempt<2 && !ok; attempt++){
    try{
     var r=await fetch(location.pathname,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
     var dd=await r.json();
     if(dd.image){
      var url='data:image/png;base64,'+dd.image;
      var im=document.createElement('img'); im.src=url;
      im.onclick=function(){ pick(url, slots[k]); };
      slots[k].innerHTML=''; slots[k].appendChild(im);
      if(!firstPicked){ firstPicked=true; pick(url, slots[k]); }
      st.textContent='done ★ — tap the one that looks most like you';
      ok=true;
     } else { lastErr=dd.error||'no image'; }
    }catch(e){ lastErr=String(e); }
   }
   if(!ok){ slots[k].innerHTML='<span class="spin">✕</span>'; }
   finish();
  })();
 }
};
function pick(url, slot){
 Array.prototype.forEach.call(document.getElementById('cands').children,function(x){x.classList.remove('sel');});
 slot.classList.add('sel');
 genImg=new Image();
 genImg.onload=function(){ document.getElementById('grainLabel').hidden=false; document.getElementById('grain').hidden=false; draw(); };
 genImg.src=url;
}
</script></body></html>`;
