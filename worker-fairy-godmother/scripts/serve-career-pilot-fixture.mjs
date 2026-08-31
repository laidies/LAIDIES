// UI-only synthetic fixture. No credentials, real model, account or network backend.
// Run from any directory: node worker-fairy-godmother/scripts/serve-career-pilot-fixture.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
import { validateCareerFields } from '../src/career-guidance.js';
const root = fileURLToPath(new URL('../../', import.meta.url));
const previewKey = 'laidies_fixture_preview_' + Date.now();
let calls = 0;
const answer = {
  read: 'The feedback does not yet identify a change you can make.',
  deliverable: 'Could you give me a specific example and describe what you wanted me to do differently?',
  reasoning: ['A concrete example makes the expectation discussable without accepting or rejecting the label.'],
  assumptions: [], unknowns: ['Would asking privately reduce the risk of this conversation?'],
  nextMove: 'Choose one recent example to discuss privately.', sources: ['specific-feedback'], asOf: null,
  aiAssist: { label: 'Prepare clarification questions',
    instruction: 'Using only non-confidential feedback I supply, separate observable examples from labels and draft three clarification questions. Mark missing details; do not invent expectations. Ask me to check each question against the original feedback.',
    why: 'This turns a vague label into questions you can check and use.' }
};
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    if (url.pathname === '/fixture-status') {
      res.setHeader('Content-Type', 'text/plain'); res.end(`Synthetic answer requests: ${calls}`); return;
    }
    if (url.pathname === '/fixture-answer' && req.method === 'POST') {
      let size = 0; for await (const chunk of req) { size += chunk.length; if (size > 20000) { res.writeHead(413); res.end(); return; } }
      calls++;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: true, type: 'case_success', requestId: 'synthetic-browser-fixture',
        case: { status: 'ephemeral', domain: 'work_career', task: 'advice_or_conversation' },
        answer: { ...answer, ...validateCareerFields(answer, true) },
        play: { outcome: 'not_spent', amount: 0 }, allowance: { status: 'guest_preview_no_verified_allowance' }
      })); return;
    }
    const pathname = decodeURIComponent(url.pathname);
    if (!/^\/(games\/fairy-godmother\.html|styles\.css|assets\/|content\/)/.test(pathname)) { res.writeHead(404); res.end(); return; }
    const path = resolve(root, '.' + pathname);
    if (!path.startsWith(root.endsWith(sep) ? root : root + sep) || !['.html','.css','.js','.json','.png','.jpg','.jpeg','.webp','.svg','.woff2','.ico'].includes(extname(path))) { res.writeHead(403); res.end(); return; }
    let bytes = await readFile(path);
    if (pathname === '/games/fairy-godmother.html') {
      bytes = bytes.toString().replace('<head>', '<head><script>window.LAIDIES_FAIRY_WORKER_URL="/fixture-answer";</script>')
        .replace('"laidies_free_wishes_used"', JSON.stringify(previewKey))
        .replace(/<script async src="https:\/\/plausible[^>]+><\/script>/, '')
        .replace(/<body([^>]*)>/, '<body$1><p style="position:relative;z-index:9999;background:#fff;color:#111;padding:12px">LOCAL SYNTHETIC FIXTURE — UI checks only. No real AI advice or account calls.</p>');
    }
    // Existing external account/analytics scripts cannot contact their services.
    res.setHeader('Content-Security-Policy', "connect-src 'self'; frame-src 'none'; form-action 'none'");
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', ({ '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml' })[extname(path)] || 'application/octet-stream');
    res.end(bytes);
  } catch { res.writeHead(404); res.end(); }
});
server.listen(8863, '127.0.0.1', () => console.log('UI fixture: http://127.0.0.1:8863/games/fairy-godmother.html ; counter: /fixture-status'));
