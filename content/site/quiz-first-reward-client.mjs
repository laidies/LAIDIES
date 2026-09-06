// Account-bound caller for the existing reward ledger's one-time quiz award.
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function createQuizFirstRewardClient(runtime) {
  let epoch=0,disposed=false;
  const snapshots=new Map();
  function invalidate(){epoch++;snapshots.clear();}
  const subscription=runtime.client.auth.onAuthStateChange(()=>invalidate()).data.subscription;
  async function sameOwner(owner,started){
    const session=await runtime.controller.getSession();
    if(disposed||epoch!==started||session?.user?.id!==owner)throw new Error('account-changed-reload-binder');
  }
  async function request(name,args,owner){
    if(!UUID.test(owner||''))throw new TypeError('An expected account owner is required.');
    const started=epoch;
    await sameOwner(owner,started);
    const {data,error}=await runtime.client.rpc(name,{p_expected_owner:owner,...args});
    await sameOwner(owner,started);
    if(error)throw error;
    if(!data||!['unclaimed','claimed','existing'].includes(data.state)||data.episode!==args.p_episode)throw new Error('invalid-quiz-reward-response');
    if(data.state!=='unclaimed'&&![data.score,data.max_score,data.clips].every(n=>Number.isInteger(n)&&n>=0))throw new Error('invalid-quiz-reward-response');
    return structuredClone(data);
  }
  return {
    read(episode,owner){return request('get_my_quiz_first_reward_v1',{p_episode:episode},owner);},
    submit(attempt,owner){
      if(!UUID.test(attempt?.attemptId||''))throw new TypeError('A stable attempt UUID is required.');
      const args={p_episode:attempt.episode,p_quiz_version:attempt.version,p_attempt_id:attempt.attemptId,p_answers:structuredClone(attempt.answers)};
      const key=`${owner}:${attempt.attemptId}`,bytes=JSON.stringify(args);
      if(snapshots.has(key)&&snapshots.get(key)!==bytes)throw new Error('quiz-reward-retry-changed');
      snapshots.set(key,bytes);
      return request('submit_quiz_first_reward_v1',JSON.parse(bytes),owner);
    },
    invalidate,
    dispose(){disposed=true;invalidate();subscription.unsubscribe();}
  };
}
