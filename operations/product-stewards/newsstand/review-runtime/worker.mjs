const models = new Map([
  ['/', '@cf/meta/llama-3.3-70b-instruct-fp8-fast'],
  ['/gemma', '@cf/google/gemma-4-26b-a4b-it'],
]);
const maxBytes = 1_000_000;

export default {
  async fetch(request, env) {
    if (request.method !== 'POST' || request.headers.has('origin')) {
      return new Response('Local review POST only', { status: 405 });
    }
    const model = models.get(new URL(request.url).pathname);
    if (!model) return new Response('Unknown review route', { status: 404 });
    if (Number(request.headers.get('content-length')) > maxBytes) {
      return new Response('Review too large', { status: 413 });
    }
    // Check actual bytes as well: local callers may omit Content-Length.
    const body = await request.arrayBuffer();
    if (body.byteLength > maxBytes) return new Response('Review too large', { status: 413 });
    let input;
    try { input = JSON.parse(new TextDecoder().decode(body)); }
    catch { return new Response('Invalid review JSON', { status: 400 }); }
    try { return Response.json(await env.AI.run(model, input)); }
    catch (error) { return Response.json({ error: String(error.message) }, { status: 502 }); }
  },
};
