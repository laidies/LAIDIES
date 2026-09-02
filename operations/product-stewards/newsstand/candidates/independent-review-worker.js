export default {
  async fetch(request, env) {
    if (request.method !== "POST") return new Response("method", { status: 405 });
    const body = await request.json();
    const result = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", body);
    return Response.json(result);
  }
};
