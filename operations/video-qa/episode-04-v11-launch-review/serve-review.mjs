import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)));
const port = Number(process.env.PORT || 8766);
const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.mp4', 'video/mp4'],
  ['.vtt', 'text/vtt; charset=utf-8']
]);

const server = http.createServer((request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host || '127.0.0.1'}`);
  let requested = decodeURIComponent(url.pathname);
  if (requested.endsWith('/')) requested += 'index.html';
  const resolved = path.resolve(root, `.${requested}`);
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  let stat;
  try {
    stat = fs.statSync(resolved);
  } catch {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  if (!stat.isFile()) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }

  const commonHeaders = {
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-store',
    'Content-Type': types.get(path.extname(resolved).toLowerCase()) || 'application/octet-stream'
  };
  const range = request.headers.range;
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!match) {
      response.writeHead(416, { ...commonHeaders, 'Content-Range': `bytes */${stat.size}` });
      response.end();
      return;
    }
    const start = match[1] ? Number(match[1]) : 0;
    const end = match[2] ? Math.min(Number(match[2]), stat.size - 1) : stat.size - 1;
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || start > end || start >= stat.size) {
      response.writeHead(416, { ...commonHeaders, 'Content-Range': `bytes */${stat.size}` });
      response.end();
      return;
    }
    response.writeHead(206, {
      ...commonHeaders,
      'Content-Length': end - start + 1,
      'Content-Range': `bytes ${start}-${end}/${stat.size}`
    });
    if (request.method === 'HEAD') response.end();
    else fs.createReadStream(resolved, { start, end }).pipe(response);
    return;
  }

  response.writeHead(200, { ...commonHeaders, 'Content-Length': stat.size });
  if (request.method === 'HEAD') response.end();
  else fs.createReadStream(resolved).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Episode 04 review server: http://127.0.0.1:${port}/operations/video-qa/episode-04-v11-launch-review/`);
});
