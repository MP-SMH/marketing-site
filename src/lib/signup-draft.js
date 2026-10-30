// Explicit, local-only draft. No password, OTP, proof, token or acceptance is stored.
export const SIGNUP_DRAFT_KEY='smh-signup-draft-v1';
const TEXT=['email','foreningsnavn','cvrNummer','postnummer','kontaktNavn','kontaktRolle','kontaktTlf'];
const MAX_AGE=7*86400000;
export function readSignupDraft(storage,now=Date.now()){
 try{const value=JSON.parse(storage.getItem(SIGNUP_DRAFT_KEY));if(value?.version!==1||!Number.isFinite(value.savedAt)||now-value.savedAt>MAX_AGE||value.savedAt>now){storage.removeItem(SIGNUP_DRAFT_KEY);return null;}return sanitize(value);}
 catch{return null;}
}
function sanitize(value){return {version:1,savedAt:value.savedAt,...Object.fromEntries(TEXT.map(key=>[key,typeof value[key]==='string'?value[key].slice(0,200):''])),product:['donationer','samlet'].includes(value.product)?value.product:'donationer',binding:['binding','ingen'].includes(value.binding)?value.binding:''};}
export function saveSignupDraft(storage,fields,now=Date.now()){const draft=sanitize({...fields,savedAt:now});storage.setItem(SIGNUP_DRAFT_KEY,JSON.stringify(draft));return draft;}
