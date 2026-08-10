const ISO_DATE=/^\d{4}-\d{2}-\d{2}$/;

export function isFresh(item,today=new Date().toISOString().slice(0,10)){
  return ISO_DATE.test(item?.checkedAt||"")&&ISO_DATE.test(item?.reviewBy||"")&&item.checkedAt<=today&&item.reviewBy>=today;
}

export function validateCases(deck,{today=new Date().toISOString().slice(0,10)}={}){
  const errors=[];
  if(!Array.isArray(deck)||deck.length!==3) errors.push("preview deck must contain exactly three cases");
  for(const item of deck||[]){
    if(!Array.isArray(item.requiredClauses)||item.requiredClauses.length<2) errors.push(`${item.id}: required clauses missing`);
    if(!Array.isArray(item.callers)||item.callers.length!==3) errors.push(`${item.id}: exactly three normal callers required`);
    const required=new Set(item.requiredClauses||[]);
    const covered=new Set((item.callers||[]).map(c=>c.clause).filter(c=>required.has(c)));
    if(covered.size!==required.size) errors.push(`${item.id}: normal-call union misses a required clause`);
    for(const caller of item.callers||[]){
      const coverage=Array.isArray(caller.coveredClauseIds)?caller.coveredClauseIds:[caller.clause].filter(c=>required.has(c));
      if(coverage.length>=required.size) errors.push(`${item.id}: ${caller.name} gives away the complete answer`);
      if(caller.decisionHint||caller.correctVerdict) errors.push(`${item.id}: ${caller.name} contains a verdict hint`);
    }
    if(item.status==="ADMITTED"&&!["for-real","as-if"].includes(item.answer)) errors.push(`${item.id}: admitted case needs a valid answer`);
    if(item.status!=="ADMITTED"&&item.answer!==null) errors.push(`${item.id}: source-held case must not carry a scored answer`);
    if(!isFresh(item,today)) errors.push(`${item.id}: stale or malformed freshness record`);
  }
  return errors;
}
