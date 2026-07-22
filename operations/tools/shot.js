const { chromium } = require('playwright');
(async () => {
  const [url, out, full] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  await p.waitForTimeout(600);
  await p.screenshot({ path: out, fullPage: full === 'full' });
  console.log('  saved', out);
  await b.close();
})();
