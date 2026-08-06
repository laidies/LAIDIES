// Static preview server WITH HTTP Range support, so video can be scrubbed.
// Python's http.server ignores Range and returns the whole file -> no seeking.
const http = require('http'), fs = require('fs'), path = require('path'), url = require('url');
const ROOT = path.resolve(process.argv[2] || '.'), PORT = +(process.argv[3] || 8221);
const TYPES = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css',
  '.json':'application/json', '.mp4':'video/mp4', '.mp3':'audio/mpeg', '.vtt':'text/vtt',
  '.srt':'text/plain', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg',
  '.webp':'image/webp', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.ico':'image/x-icon' };
http.createServer((req, res) => {
  let p = decodeURIComponent(url.parse(req.url).pathname);
  let f = path.join(ROOT, p);
  if (!f.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  fs.stat(f, (e, st) => {
    if (!e && st.isDirectory()) { f = path.join(f, 'index.html'); st = null; }
    fs.stat(f, (e2, s) => {
      if (e2) { res.writeHead(404, {'Content-Type':'text/plain'}).end('404'); return; }
      const type = TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream';
      const range = req.headers.range;
      if (range) {                                    // <-- the part Python lacks
        const m = /bytes=(\d*)-(\d*)/.exec(range);
        let start = m[1] ? parseInt(m[1]) : 0;
        let end = m[2] ? parseInt(m[2]) : s.size - 1;
        if (start >= s.size) { res.writeHead(416, {'Content-Range':`bytes */${s.size}`}).end(); return; }
        end = Math.min(end, s.size - 1);
        res.writeHead(206, { 'Content-Type': type, 'Accept-Ranges':'bytes',
          'Content-Range': `bytes ${start}-${end}/${s.size}`, 'Content-Length': end - start + 1 });
        fs.createReadStream(f, { start, end }).pipe(res);
      } else {
        res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges':'bytes', 'Content-Length': s.size });
        fs.createReadStream(f).pipe(res);
      }
    });
  });
}).listen(PORT, () => console.log('range-capable preview on http://localhost:' + PORT));
