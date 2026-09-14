import fs from 'node:fs'; import crypto from 'node:crypto';
const d='operations/product-stewards/newsstand/candidates/protein-data-20260914/'; const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const path=d+'prose-review-input.json', value=JSON.parse(fs.readFileSync(path,'utf8'));
value.producerContract.sha256=sha(d+'producer-contract.json');
fs.writeFileSync(path,JSON.stringify(value,null,2)+'\n');
