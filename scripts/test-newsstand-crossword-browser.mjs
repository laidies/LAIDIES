#!/usr/bin/env node
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const playwrightRoot=process.env.PLAYWRIGHT_CORE_PATH||'/Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/playwright-core';
const {chromium}=await import(pathToFileURL(path.join(playwrightRoot,'index.mjs')));
const chrome=process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
const server=http.createServer((req,res)=>{const pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);const file=path.resolve(root,'.'+(pathname==='/'?'/newsstand-crossword.html':pathname));if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404);res.end();return;}res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=process.env.NEWSSTAND_TEST_ORIGIN||`http://127.0.0.1:${server.address().port}`;
const expectedClues=Object.values(JSON.parse(fs.readFileSync(path.join(root,'operations/product-stewards/newsstand/candidates/crossword-discovery-20260907/puzzle-copy.json'),'utf8'))).map(item=>item.clue);
const puzzleCopy=JSON.parse(fs.readFileSync(path.join(root,'operations/product-stewards/newsstand/candidates/crossword-discovery-20260907/final/puzzle-copy.json'),'utf8'));
function checkHintLabels(copy){for(const [answer,item] of Object.entries(copy))assert.ok(!item.label.toLowerCase().includes(answer),`Pre-solve hint label reveals ${answer}`);}
checkHintLabels(puzzleCopy);
const spoiler=structuredClone(puzzleCopy);spoiler.paige.label='Find Paige';assert.throws(()=>checkHintLabels(spoiler),/reveals paige/);
const browser=await chromium.launch({headless:true,executablePath:chrome});
try{
  for(const width of [1280,390,320]){
    const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto(origin+'/newsstand-crossword.html',{waitUntil:'networkidle'});
    assert.equal(await page.locator('#cw-grid-wrap').isVisible(),width>760,`${width}: grid default follows screen size`);
    assert.equal(await page.locator('#cw-linear').isVisible(),width<=760,`${width}: phone starts with clue list`);
    const gridClues=await page.locator('.cw-clue').count();assert.equal(gridClues,10,`${width}: grid exposes every clue`);
    await page.getByRole('button',{name:'Grid mode'}).focus();await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(()=>document.activeElement.id),'cw-mode-linear',`${width}: Tab reaches clue-list mode`);
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#cw-grid-wrap').isVisible(),false,`${width}: keyboard activation hides the grid`);
    assert.equal(await page.locator('#cw-linear').isVisible(),true,`${width}: keyboard activation opens the clue list`);
    const linear=page.locator('#cw-linear input');assert.equal(await linear.count(),gridClues,`${width}: clue list has every existing clue`);
    assert.deepEqual(await page.locator('#cw-linear__missing').count(),0,`${width}: no synthetic fallback list exists`);
    const labels=await page.locator('#cw-linear label').allTextContents();
    assert.equal(labels.length,expectedClues.length,`${width}: every clue has a readable label`);
    expectedClues.forEach(clue=>assert.ok(labels.some(label=>label.includes(clue)),`${width}: retains clue text: ${clue}`));
    await page.locator('#cw-linear-claio').fill('CLAIO');
    assert.equal(await page.locator('#cw-linear-tools').inputValue(),' O',`${width}: crossing letter keeps its second position`);
    await page.locator('#cw-linear-tools').fill('T OLS');
    assert.equal(await page.locator('#cw-grid input[data-key="3-8"]').inputValue(),'O',`${width}: blank inside a clue answer does not shift later letters`);
    await page.getByRole('button',{name:'Clear',exact:true}).click();
    await page.locator('#cw-linear-tools').focus();await page.keyboard.type('TOOLS');
    await page.getByRole('button',{name:'Check my work'}).focus();await page.keyboard.press('Enter');
    assert.match(await page.locator('#cw-status').textContent(),/1 of 10 answers are correct/,`${width}: keyboard check gives readable feedback`);
    assert.equal(await page.locator('#cw-explanations article').count(),1,`${width}: checking one answer explains only that answer`);
    await page.locator('#cw-explanations').evaluate(el=>el.replaceChildren());
    const removedCount=await page.locator('#cw-explanations article').count();
    assert.throws(()=>assert.equal(removedCount,1),`${width}: missing answer feedback is rejected`);
    await page.getByRole('button',{name:'Check my work'}).click();
    assert.equal(await page.locator('#cw-explanations article').count(),1);
    await page.reload({waitUntil:'networkidle'});
    await page.getByRole('button',{name:'Clue list mode'}).click();
    assert.equal(await page.locator('#cw-linear-tools').inputValue(),'TOOLS',`${width}: progress survives reload`);
    await page.locator('#cw-linear .cw-hint summary').first().click();
    assert.equal(await page.locator('#cw-linear .cw-hint a').first().isVisible(),true,`${width}: optional hint reveals lesson link`);
    await page.getByRole('button',{name:'Reveal puzzle'}).focus();await page.keyboard.press('Enter');
    assert.equal(await page.locator('#cw-linear input').evaluateAll(inputs=>inputs.every(input=>input.value.length===Number(input.maxLength))),true,`${width}: keyboard reveal fills every clue-list answer`);
    assert.match(await page.locator('#cw-status').textContent(),/Puzzle revealed/,`${width}: reveal preserves learning feedback`);
    assert.ok((await page.locator('#cw-linear label').allTextContents()).every((label,index)=>label.includes(expectedClues[index])),`${width}: reveal retains all existing clue texts`);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,`${width}: clue-list mode has no horizontal overflow`);
    await page.getByRole('button',{name:'Clear'}).focus();await page.keyboard.press('Enter');
    assert.equal(await page.locator('#cw-linear input').evaluateAll(inputs=>inputs.every(input=>input.value==='')),true,`${width}: keyboard clear empties clue-list answers`);
    await page.getByRole('button',{name:'Grid mode'}).focus();await page.keyboard.press('Enter');
    assert.equal(await page.locator('#cw-grid-wrap').isVisible(),true,`${width}: keyboard can restore grid mode`);
    await page.getByRole('button',{name:'Reveal puzzle'}).focus();await page.keyboard.press('Enter');
    assert.equal(await page.locator('#cw-grid input').evaluateAll(inputs=>inputs.every(input=>input.value)),true,`${width}: grid shares clue-list answer state`);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,`${width}: grid mode has no horizontal overflow`);
    const cdp=await page.context().newCDPSession(page);
    const ax=await cdp.send('Accessibility.getFullAXTree');
    assert.ok(ax.nodes.some(n=>n.role?.value==='grid'),`${width}: grid reaches browser accessibility tree`);
    assert.ok(ax.nodes.some(n=>n.role?.value==='button'&&n.name?.value==='Check my work'),`${width}: checking action has accessible name`);
    assert.deepEqual(errors,[],`${width}: no page errors`);await page.close();
  }
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
console.log('NEWSSTAND CROSSWORD BROWSER PASS modes=grid,clue-list widths=1280,390,320 exact_clues=10 shared_state=1');
