const APP_ORIGIN='https://app.stotmedhjerte.dk';
export const SIGNUP_LOGIN_URL=APP_ORIGIN+'/login';
// Validate response destinations; never navigate to arbitrary http(s) URLs.
export function signupRedirect(result){
 for(const [key,path] of [['handoff_redirect_url','/handoff'],['fallback_redirect','/login']]){
  if(key==='fallback_redirect'&&result?.handoff_failed!==true)continue;
  try{const url=new URL(result?.[key]);if(url.origin===APP_ORIGIN&&url.protocol==='https:'&&!url.username&&!url.password&&url.pathname===path&&(path!=='/handoff'||url.searchParams.get('token')))return url.href;}catch{}
 }
 return null;
}
