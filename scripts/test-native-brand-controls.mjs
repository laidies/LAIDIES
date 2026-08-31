import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=path.resolve(process.env.NATIVE_BRAND_ROOT||process.cwd());
const {chromium}=await import(pathToFileURL(path.join(process.env.PLAYWRIGHT_CORE_PATH,'index.mjs')));
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const files=['content/site/ai-accent-autowrap.js','script.js','content/site/brand-polish.js'];
const failures=[];
try{
  for(const file of files){
    const page=await browser.newPage();
    await page.setContent('<h1>LAiDIES</h1><label for="choice">Choose</label><select id="choice"><optgroup label="LAiDIES"><option value="one">LAiDIES</option><option value="two" class="wordmark">LAiDIES</option></optgroup></select><textarea class="wordmark">LAiDIES</textarea><input value="LAiDIES"><p class="wordmark">LAiDIES</p>');
    let code=fs.readFileSync(path.join(root,file),'utf8');
    // Run the actual formatter, excluding unrelated application/navigation code.
    if(file==='script.js')code=code.slice(0,code.indexOf('\nif (document.readyState'))+'\napplyLAiDIESInlineWordmark();';
    if(file.endsWith('brand-polish.js'))code=code.slice(0,code.indexOf('\n  if (document.readyState'))+'\napplyLAiDIESInlineWordmark();})();';
    try{
      await page.addScriptTag({content:code});
      assert.equal(await page.locator('option *').count(),0,file+' native options must contain plain text');
      assert.equal(await page.locator('textarea *').count(),0,file+' native textareas must stay plain');
      assert.deepEqual(await page.locator('option').allTextContents(),['LAiDIES','LAiDIES']);
      assert.equal(await page.getByRole('option',{name:'LAiDIES',exact:true}).count(),2);
      assert.equal(await page.locator('optgroup').getAttribute('label'),'LAiDIES');
      await page.locator('select').selectOption('two');
      assert.equal(await page.locator('select').inputValue(),'two');
      assert.equal(await page.locator('textarea').inputValue(),'LAiDIES');
      assert.equal(await page.locator('input').inputValue(),'LAiDIES');
      assert.ok(await page.locator('h1 span,p span').count(),'ordinary branding must still render');
      console.log('NATIVE BRAND CONTROLS PASS',file);
    }catch(error){failures.push(error.message);console.error('NATIVE BRAND CONTROLS FAIL',file,error.message);}
    await page.close();
  }
}finally{await browser.close();}
assert.equal(failures.length,0,failures.join('\n'));
