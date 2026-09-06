// The town wallet reads the server projection; browser quiz scores are not money.
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function createClipWalletClient(runtime) {
  let epoch=0,disposed=false;
  const invalidate=()=>{epoch++;};
  const subscription=runtime.client.auth.onAuthStateChange(invalidate).data.subscription;
  async function snapshot(owner,{cursor=null,limit=20}={}) {
    if(!UUID.test(owner||''))throw new TypeError('An expected account owner is required.');
    const started=epoch;
    async function verify(){const session=await runtime.controller.getSession();if(disposed||started!==epoch||session?.user?.id!==owner)throw new Error('account-changed-reload-binder');}
    await verify();
    const {data,error}=await runtime.client.rpc('wallet_snapshot',{p_expected_owner:owner,p_cursor:cursor,p_limit:limit});
    await verify();if(error)throw error;
    if(!data||!Array.isArray(data.history)||!['available','pending','lifetime_earned','lifetime_spent','lifetime_refunded','lifetime_adjusted'].every(key=>Number.isInteger(data[key])))throw new Error('invalid-wallet-response');
    return structuredClone(data);
  }
  return {snapshot,invalidate,dispose(){disposed=true;invalidate();subscription.unsubscribe();}};
}
