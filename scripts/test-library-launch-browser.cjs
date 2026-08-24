#!/usr/bin/env node
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const root = process.cwd();
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH || path.join(root, 'node_modules/playwright-core');
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.css':'text/css; charset=utf-8'};
const server = http.createServer((request,response)=>{
  const relative = decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname).replace(/^\/+/, '') || 'library.html';
  const target = path.resolve(root, relative);
  if (!target.startsWith(`${root}${path.sep}`) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) return response.writeHead(404).end('not found');
  response.writeHead(200, {'content-type':mime[path.extname(target)] || 'application/octet-stream','cache-control':'no-store'});
  fs.createReadStream(target).pipe(response);
});

(async()=>{
  const {chromium} = await import(pathToFileURL(path.join(playwrightRoot,'index.mjs')));
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin=`http://127.0.0.1:${server.address().port}`;
  const browser=await chromium.launch({executablePath:process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
  const failures=[];
  const captureDir=fs.mkdtempSync(path.join(os.tmpdir(),'laidies-library-launch-'));
  try{
    for(const width of [1440,390,320]){
      const page=await browser.newPage({viewport:{width,height:width===1440?1000:844}});
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.route('**/api/miss-jeeves',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({
        status:'ok',coverage:'exact',mode:'retrieval',answer:'A token is a chunk the system processes as one unit.',results:[
          {id:'book-section-ai-dictionary-term-token',parentId:'ai-dictionary',title:'Token',url:'/library.html#ai-dictionary::%40term-token',wholeUrl:'/library.html#ai-dictionary',type:'book-section',learnerJob:'understand',section:'The AI Dictionary',summary:'Plain-English definition and a route to the full explanation.',topics:['token']},
          {id:'ep-03',title:'The Burn Book Problem',url:'/issues/issue-03.html',type:'episode',learnerJob:'see-explained',section:'Chick Flicks',summary:'See why confident wrong answers happen.',topics:['hallucination']},
          {id:'act-quiz',title:'The Pop Quiz',url:'/learn/quiz.html',type:'activity',learnerJob:'practise',section:'SUNNYVAiLE High',summary:'Try the idea yourself.',topics:['practice']}
        ]
      })}));
      await page.goto(`${origin}/library.html`,{waitUntil:'networkidle'});
      const state=await page.evaluate(()=>{
        const rect=selector=>{const node=document.querySelector(selector);const box=node?.getBoundingClientRect();return box?{left:box.left,right:box.right,top:box.top,bottom:box.bottom,width:box.width,height:box.height}:null;};
        return {
          overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
          header:rect('.sv-header'),heroTitle:rect('#library-title'),masthead:rect('.arrival-visual'),shelf:rect('.libroom'),shelfUnit:rect('.shelf-unit.is-compact'),controls:rect('.catalogue-controls'),
          covers:[...document.querySelectorAll('#wallcase .bk:not(.soon)')].map(node=>{const box=node.getBoundingClientRect();return {left:box.left,right:box.right,width:box.width,height:box.height};}),
          shelfTitle:document.getElementById('shelf-title-all')?.textContent,
          categoryBoxes:document.querySelectorAll('.shelf-captions,[data-shelf-jump]').length,
          yellow:getComputedStyle(document.documentElement).getPropertyValue('--yellow').trim()
        };
      });
      if(state.overflow>1)failures.push(`${width}: horizontal overflow ${state.overflow}px`);
      if(!state.header||!state.heroTitle||state.header.bottom>state.heroTitle.top)failures.push(`${width}: shared header obstructs the live Library title ${JSON.stringify({header:state.header,title:state.heroTitle})}`);
      if(!state.masthead||state.masthead.height>(width===1440?331:261))failures.push(`${width}: masthead too tall ${state.masthead?.height}`);
      if(state.covers.length!==4)failures.push(`${width}: expected four visible admitted covers, got ${state.covers.length}`);
      if(state.covers.some(cover=>cover.width<(width===1440?120:100)))failures.push(`${width}: a cover is too small ${JSON.stringify(state.covers)}`);
      if(state.covers.some(cover=>cover.left<0||cover.right>width))failures.push(`${width}: a cover is clipped outside the viewport unit=${JSON.stringify(state.shelfUnit)} covers=${JSON.stringify(state.covers)}`);
      if(!state.shelf||!state.controls||state.shelf.top>=state.controls.top)failures.push(`${width}: books do not precede optional search controls`);
      if(state.shelfTitle!=='All Books'||state.categoryBoxes!==0||state.yellow)failures.push(`${width}: one-shelf/colour contract failed ${JSON.stringify(state)}`);
      if(width<=390){
        const topics=await page.locator('.topic-link').evaluateAll(nodes=>nodes.map(node=>{const r=node.getBoundingClientRect(),parent=node.closest('.catalogue-controls').getBoundingClientRect();return{left:r.left,right:r.right,parentLeft:parent.left,parentRight:parent.right,text:node.textContent.trim()};}));
        if(topics.some(topic=>topic.left<topic.parentLeft||topic.right>topic.parentRight))failures.push(`${width}: a topic control is clipped or undiscoverable ${JSON.stringify(topics)}`);
      }
      await page.locator('.bk[data-book-id="ai-fundamentals-101"]').click();
      const preview=await page.locator('#book-preview').evaluate(node=>({
        bookId:node.dataset.bookId,previous:node.previousElementSibling?.className,
        openHidden:document.getElementById('book-preview-read').hidden,
        title:document.getElementById('book-preview-title').textContent,
        inside:document.getElementById('book-preview-inside').textContent,
        titleClient:document.getElementById('book-preview-title').clientWidth,
        titleScroll:document.getElementById('book-preview-title').scrollWidth,
        titleRect:(()=>{const r=document.getElementById('book-preview-title').getBoundingClientRect();return{left:r.left,right:r.right}})(),
        previewRect:(()=>{const r=node.getBoundingClientRect();return{left:r.left,right:r.right}})()
      }));
      if(preview.bookId!=='ai-fundamentals-101'||preview.openHidden||preview.title!=='AI Fundamentals 101'||!preview.inside.includes('Inside this book')||!String(preview.previous).includes('libroom')) failures.push(`${width}: cover-to-preview-to-open failed ${JSON.stringify(preview)}`);
      if(preview.titleScroll>preview.titleClient+1||preview.titleRect.left<preview.previewRect.left||preview.titleRect.right>preview.previewRect.right)failures.push(`${width}: selected-book title clips ${JSON.stringify(preview)}`);
      await page.click('#book-preview-read');
      await page.waitForSelector('#reader.on');
      const readerControls=await page.evaluate(()=>{
        const box=selector=>{const node=document.querySelector(selector);const rect=node?.getBoundingClientRect();return rect?{width:rect.width,height:rect.height}:null;};
        return {
          report:box('#reader-report'),
          saveBook:box('.reader-save-book'),
          saveImage:document.querySelector('.reader-save-book img')?.getAttribute('src')||'',
          reportTitle:document.getElementById('reader-report')?.getAttribute('title')||''
        };
      });
      if(!readerControls.report||readerControls.report.width>150||readerControls.report.height>46)failures.push(`${width}: Report an issue is not discreet ${JSON.stringify(readerControls.report)}`);
      if(!readerControls.saveBook||readerControls.saveBook.width>88||readerControls.saveBook.height>58||!readerControls.saveImage.includes('60-teal-floppy-disk.png'))failures.push(`${width}: Save Book control is not compact/floppy based ${JSON.stringify(readerControls)}`);
      if(!readerControls.reportTitle.includes('version')||!readerControls.reportTitle.includes('section'))failures.push(`${width}: Report an issue does not explain its automatic context ${readerControls.reportTitle}`);
      await page.click('#reader-report');
      const correctionContext=await page.locator('#correction-desk').evaluate(node=>({hidden:node.hidden,location:document.getElementById('correction-location')?.textContent||''}));
      if(correctionContext.hidden||!correctionContext.location.includes('AI Fundamentals 101')||!correctionContext.location.includes('version'))failures.push(`${width}: Report an issue did not open a version-bound correction form ${JSON.stringify(correctionContext)}`);
      await page.click('#correction-cancel');
      await page.click('#reader-close');
      await page.fill('#jv-q','What is a token?');
      await page.click('.jv-form button[type="submit"]');
      await page.waitForSelector('.jv-group[data-learning-job="understand"]');
      for(const job of ['understand','see-explained','practise']) if(await page.locator(`.jv-group[data-learning-job="${job}"]`).count()!==1) failures.push(`${width}: Miss Jeeves group missing ${job}`);
      const routeGeometry=await page.locator('.jv-route').evaluateAll(nodes=>nodes.map(node=>{
        const card=node.querySelector('.jv-card'),title=node.querySelector('.jv-t'),box=node.getBoundingClientRect(),cardBox=card.getBoundingClientRect(),titleBox=title.getBoundingClientRect();
        return {routeClient:node.clientWidth,routeScroll:node.scrollWidth,cardClient:card.clientWidth,cardScroll:card.scrollWidth,left:cardBox.left,right:cardBox.right,routeLeft:box.left,routeRight:box.right,titleWidth:titleBox.width};
      }));
      if(routeGeometry.some(route=>route.routeScroll>route.routeClient+1||route.cardScroll>route.cardClient+1||route.left<route.routeLeft||route.right>route.routeRight||(width<=390&&route.titleWidth<100)))failures.push(`${width}: Miss Jeeves route cards collapse or clip ${JSON.stringify(routeGeometry)}`);
      await page.addStyleTag({content:'.sv-header{position:relative!important;top:auto!important}.svgh-skip{display:none!important}'});
      await page.screenshot({path:path.join(captureDir,`library-${width}.png`),fullPage:true});
      await page.close();
    }
  } finally {await browser.close();server.close();}
  if(failures.length){console.error(`LIBRARY LAUNCH BROWSER FAIL\n${failures.map(item=>`- ${item}`).join('\n')}\ncaptures=${captureDir}`);process.exitCode=1;return;}
  console.log(`LIBRARY LAUNCH BROWSER PASS viewports=1440,390,320 covers=4 preview_to_open=1 compact_reader_controls=1 correction_context=1 grouped_jeeves=1 captures=${captureDir}`);
})().catch(error=>{server.close();console.error(`LIBRARY LAUNCH BROWSER FAIL: ${error.stack||error}`);process.exitCode=1;});
