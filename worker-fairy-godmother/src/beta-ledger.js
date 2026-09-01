import { DurableObject } from "cloudflare:workers";
import { applyLedgerAction } from "./beta-ledger-state.js";

function json(value, status = 200) {
  return Response.json(value, { status });
}

function loadState(storage) {
  const value = storage.kv.get("state");
  return value && typeof value === "object" ? value : null;
}

function storeState(storage, state) {
  storage.kv.put("state", state);
}

export class FairyBetaLedger extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.ctx = ctx;
  }

  async fetch(request) {
    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405);
    let body;
    try { body = await request.json(); } catch { return json({ ok: false, error: "json" }, 400); }
    const transition = applyLedgerAction(loadState(this.ctx.storage), body, Date.now());
    if (transition.state) storeState(this.ctx.storage, transition.state);
    return json(transition.body, transition.status);
  }
}
