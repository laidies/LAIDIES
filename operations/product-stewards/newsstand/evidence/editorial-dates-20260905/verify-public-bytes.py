from pathlib import Path
import json,sys,hashlib,subprocess,concurrent.futures,datetime
manifest=json.load(open(sys.argv[1]));target=Path(sys.argv[2]);origins=sys.argv[3:]
prior=json.load(open('operations/product-stewards/newsstand/evidence/big-picture-versions-20260905/public-byte-verification.json'));paths=sorted(set(x['path'] for x in prior['results'])|{'content/site/newsstand-catchup-v1.js'})
by={x['path']:x for x in manifest['files']}
def check(pair):
 origin,p=pair
 result=subprocess.run(['curl','--fail','--silent','--show-error','--location','--max-time','40',origin+'/'+p],capture_output=True)
 if result.returncode:return {'origin':origin,'path':p,'error':result.stderr.decode(errors='replace').strip(),'match':False}
 body=result.stdout;final=origin+'/'+p
 actual=hashlib.sha256(body).hexdigest();expected=by[p];return {'origin':origin,'path':p,'sha256':actual,'bytes':len(body),'finalUrl':final,'match':actual==expected['sha256'] and len(body)==expected['bytes']}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:results=list(pool.map(check,[(o,p) for o in origins for p in paths]))
target.write_text(json.dumps({'verifiedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'artifactIdentity':manifest['identitySha256'],'results':results},indent=2)+'\n')
failed=[x for x in results if not x['match']];print(json.dumps({'checks':len(results),'failed':failed,'artifactIdentity':manifest['identitySha256']}));assert not failed
