const MAX_JSON = 3_000_000, MAX_IMAGE = 2_000_000, MAX_OUTPUT = 8_000_000;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const B64 = /^[A-Za-z0-9+/]+={0,2}$/;
const PNG = [137,80,78,71,13,10,26,10];
const STYLE = "a highly detailed pixel-art character portrait, head and shoulders, crisp fine pixels, saturated pink and purple Y2K palette, flattering natural makeup, no text, no watermark. Preserve the selected era styling rather than imposing a single year.";

const body = (value, status = 200, headers = {}) => new Response(JSON.stringify(value), { status, headers: { "content-type": "application/json", ...headers } });
function allowed(origin, env) {
  return origin === "https://laidies.ai" || origin === "https://www.laidies.ai" ||
    (env.ALLOW_LOCALHOST === "true" && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin));
}
function cors(origin, env) { return allowed(origin, env) ? { "access-control-allow-origin": origin, "access-control-allow-methods": "POST, OPTIONS", "access-control-allow-headers": "Authorization, Content-Type", "access-control-max-age": "600", vary: "Origin" } : {}; }
const fail = (code, status, origin, env) => body({ error: code }, status, cors(origin, env));
async function boundedText(source, limit) {
  const reader = source.body?.getReader();
  if (!reader) throw new Error("missing-stream");
  const chunks = []; let length = 0;
  try {
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      length += next.value.byteLength;
      if (length > limit) { await reader.cancel(); throw new Error("oversize-stream"); }
      chunks.push(next.value);
    }
  } finally { reader.releaseLock(); }
  const merged = new Uint8Array(length); let offset = 0;
  for (const chunk of chunks) { merged.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(merged);
}
function isPng(bytes) { return bytes.length >= 8 && PNG.every((n, i) => bytes[i] === n); }
function validBase64(raw) { return typeof raw === "string" && raw.length >= 4 && raw.length % 4 === 0 && B64.test(raw); }
// `Uint8Array.from(atob(raw), mapper)` briefly retains a large input string,
// callback machinery and a second output array. Photo input is bounded, but
// still decode it with one indexed allocation before placing it in FormData.
function decodeBase64(raw) {
  if (!validBase64(raw)) return null;
  try {
    const binary = atob(raw), data = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) data[index] = binary.charCodeAt(index);
    return data;
  } catch { return null; }
}
// Provider output stays base64 all the way to the visitor. Confirm its PNG
// signature from the first 12 encoded characters instead of decoding up to
// three multi-megabyte images concurrently just to inspect eight bytes.
function pngBase64(raw) {
  if (!validBase64(raw) || raw.length > MAX_OUTPUT || raw.length < 12) return false;
  try { return isPng(new Uint8Array([...atob(raw.slice(0, 12))].map(c => c.charCodeAt(0)))); }
  catch { return false; }
}
function image(value) {
  const match = typeof value === "string" && value.match(/^data:(image\/(?:png|jpeg));base64,([A-Za-z0-9+/]+={0,2})$/);
  if (!match || !validBase64(match[2])) return null;
  const data = decodeBase64(match[2]);
  if (!data || !data.length || data.length > MAX_IMAGE) return null;
  const valid = match[1] === "image/png" ? isPng(data) : data.length >= 3 && data[0] === 255 && data[1] === 216 && data[2] === 255;
  return valid ? { data, mime: match[1] } : null;
}
function input(value) {
  if (!value || typeof value !== "object" || Array.isArray(value) || !UUID.test(String(value.requestId || ""))) return null;
  const prompt = typeof value.itemPrompt === "string" ? value.itemPrompt.trim() : "";
  const extras = value.traits && typeof value.traits === "object" && !Array.isArray(value.traits) ? value.traits.extras : "";
  const photo = image(value.image);
  if (prompt.length > 2000 || typeof extras !== "string" || extras.length > 2000 || (prompt ? 1 : 0) + (photo ? 1 : 0) !== 1 || (photo && value.consent !== true)) return null;
  return { requestId: value.requestId, prompt, extras, photo };
}
async function user(request, env) {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1] || "";
  if (!token || !env.SUPABASE_URL || !env.SUPABASE_PUBLISHABLE_KEY) return null;
  try {
    const result = await fetch(new URL("/auth/v1/user", env.SUPABASE_URL), { headers: { apikey: env.SUPABASE_PUBLISHABLE_KEY, authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(5000) });
    const value = result.ok ? await result.json() : null;
    return UUID.test(String(value?.id || "")) ? value.id : null;
  } catch { return null; }
}
async function hash(value) { const data = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)); return [...new Uint8Array(data)].map(x => x.toString(16).padStart(2, "0")).join(""); }
async function reserve(db, requestId, userHash, day, now) {
  if (!db?.prepare) return "unavailable";
  try {
    await db.prepare("DELETE FROM portrait_usage WHERE created_at < ?").bind(now - 604800000).run();
    const result = await db.prepare("INSERT INTO portrait_usage (request_id,user_hash,utc_day,created_at) SELECT ?,?,?,? WHERE (SELECT COUNT(*) FROM portrait_usage WHERE request_id=?)=0 AND (SELECT COUNT(*) FROM portrait_usage WHERE user_hash=? AND utc_day=?)<2 AND (SELECT COUNT(*) FROM portrait_usage WHERE utc_day=?)<20").bind(requestId,userHash,day,now,requestId,userHash,day,day).run();
    if (result.meta?.changes === 1) return "reserved";
    return await db.prepare("SELECT request_id FROM portrait_usage WHERE request_id=?").bind(requestId).first() ? "replay" : "limited";
  } catch { return "unavailable"; }
}
function promptFor(data) { return data.photo ? `Turn this photo into ${STYLE} Preserve the person's recognizable identity. ${data.extras}`.trim() : `${data.prompt}, ${data.extras}, ${STYLE}`.trim(); }
function logProviderFailure(status) { console.warn(JSON.stringify({ event: "portrait-provider-failure", status })); }
function logProviderException(error) {
  const name = String(error && error.name || "Error").replace(/[^A-Za-z0-9_.-]/g, "").slice(0, 64) || "Error";
  console.warn(JSON.stringify({ event: "portrait-provider-exception", name }));
}
async function generate(env, data, prompt, signal) {
  try {
    let result;
    if (data.photo) {
      const form = new FormData(); form.set("model", "gpt-image-1"); form.set("image", new File([data.photo.data], "portrait", { type: data.photo.mime })); form.set("prompt", prompt); form.set("size", "1024x1024"); form.set("quality", "medium"); form.set("input_fidelity", "high");
      result = await fetch("https://api.openai.com/v1/images/edits", { method: "POST", headers: { authorization: `Bearer ${env.OPENAI_API_KEY}` }, body: form, signal });
    } else result = await fetch("https://api.openai.com/v1/images/generations", { method: "POST", headers: { authorization: `Bearer ${env.OPENAI_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify({ model: "gpt-image-1", prompt, size: "1024x1024", quality: "medium", n: 1 }), signal });
    if (!result.ok) { logProviderFailure(result.status); return null; }
    const encoded = JSON.parse(await boundedText(result, MAX_OUTPUT + 4096))?.data?.[0]?.b64_json;
    return pngBase64(encoded) ? encoded : null;
  } catch (error) { logProviderException(error); return null; }
}
export default { async fetch(request, env) {
  const origin = request.headers.get("origin") || "";
  if (request.method === "GET") return body({ service: "laidies-avatar", generation: env.GENERATION_ENABLED === "true" ? "enabled" : "paused" });
  if (!allowed(origin, env)) return fail("origin-not-allowed",403,origin,env);
  if (request.method === "OPTIONS") return new Response(null,{status:204,headers:cors(origin,env)});
  if (request.method !== "POST") return fail("method-not-allowed",405,origin,env);
  if (env.GENERATION_ENABLED !== "true") return fail("generation-paused",503,origin,env);
  if (!env.OPENAI_API_KEY || !env.SUPABASE_URL || !env.SUPABASE_PUBLISHABLE_KEY || !env.PORTRAIT_USAGE) return fail("service-unavailable",503,origin,env);
  if (Number(request.headers.get("content-length") || 0) > MAX_JSON) return fail("invalid-request",400,origin,env);
  let text; try { text = await boundedText(request, MAX_JSON); } catch { return fail("invalid-request",400,origin,env); }
  let data; try { data = input(JSON.parse(text)); } catch { data = null; }
  if (!data) return fail("invalid-request",400,origin,env);
  const uid = await user(request,env); if (!uid) return fail("unauthorized",401,origin,env);
  const reserved = await reserve(env.PORTRAIT_USAGE,data.requestId,await hash(uid),new Date().toISOString().slice(0,10),Date.now());
  if (reserved === "unavailable") return fail("service-unavailable",503,origin,env);
  if (reserved === "replay") return fail("request-already-used",409,origin,env);
  if (reserved === "limited") return fail("quota-exhausted",429,origin,env);
  const prompt=promptFor(data), deadline=AbortSignal.timeout(165000);
  const images=(await Promise.all([0,1,2].map(() => generate(env,data,prompt,deadline)))).filter(Boolean);
  return images.length ? body({images,requested:3,completed:images.length},200,cors(origin,env)) : body({images:[],requested:3,completed:0,error:"generation-failed"},502,cors(origin,env));
} };
