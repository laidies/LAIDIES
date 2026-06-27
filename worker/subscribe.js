// LAiDIES subscribe proxy — Cloudflare Worker.
//
// Holds the Buttondown API key (set as a Cloudflare Secret, never in repo).
// Front-end (laidies.ai / www.laidies.ai — plus wearelaidies.com / www.wearelaidies.com
// through the domain transition) POSTs {email} here;
// we call Buttondown, then return a small {status} envelope the page can
// branch on. Raw Buttondown responses are never echoed to the browser.

const ALLOWED_ORIGINS = new Set([
  "https://laidies.ai",
  "https://www.laidies.ai",
  // kept valid through the wearelaidies.com -> laidies.ai transition:
  "https://wearelaidies.com",
  "https://www.wearelaidies.com",
]);

const BUTTONDOWN_ENDPOINT = "https://api.buttondown.com/v1/subscribers";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      if (!ALLOWED_ORIGINS.has(origin)) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return json({ status: "error" }, 405, origin);
    }

    if (!ALLOWED_ORIGINS.has(origin)) {
      return json({ status: "error" }, 403, origin);
    }

    let email = "";
    try {
      const body = await request.json();
      email = String(body?.email || "").trim().toLowerCase();
    } catch {
      return json({ status: "invalid" }, 200, origin);
    }

    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return json({ status: "invalid" }, 200, origin);
    }

    if (!env.BUTTONDOWN_API_KEY) {
      return json({ status: "error" }, 200, origin);
    }

    let upstream;
    try {
      upstream = await fetch(BUTTONDOWN_ENDPOINT, {
        method: "POST",
        headers: {
          "Authorization": `Token ${env.BUTTONDOWN_API_KEY}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        // Double opt-in stays on (Buttondown default) — matches today's behaviour
        // where the user receives a confirmation email. Do NOT set type: "regular".
        body: JSON.stringify({ email_address: email }),
      });
    } catch {
      return json({ status: "error" }, 200, origin);
    }

    if (upstream.status === 201) {
      return json({ status: "created" }, 200, origin);
    }
    if (upstream.status === 429) {
      return json({ status: "rate_limited" }, 200, origin);
    }
    if (upstream.status === 400) {
      let payload = null;
      try { payload = await upstream.json(); } catch {}
      const code = String(payload?.code || "").toLowerCase();
      const detail = String(payload?.detail || payload?.message || "").toLowerCase();
      const isAlready =
        code.includes("already") ||
        code.includes("exists") ||
        code === "email_already_exists" ||
        detail.includes("already");
      return json({ status: isAlready ? "already" : "invalid" }, 200, origin);
    }

    return json({ status: "error" }, 200, origin);
  },
};
