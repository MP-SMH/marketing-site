import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

// Netlify redirects are global; generate this narrow proxy only for a Deploy Preview.
export function stagingProfileRedirects(original,context){
 if(context!=='deploy-preview')throw Error('staging_profile_proxy_requires_deploy_preview');
 if(typeof original!=='string'||!original.includes('/*  /index.html  200'))throw Error('existing_spa_fallback_required');
 return '# Deploy Preview: the staging ingress permits only GET/HEAD on this exact public profile route.\n'
  +'/api/public/forening/:slug  https://api-staging.stotmedhjerte.dk/api/public/forening/:slug  200\n'
  +original;
}

// A placeholder lets the closed client initialize; it is not a working credential.
export function assertStagingProfileBundle(files){
 const required=['https://preview-api.invalid','https://preview-auth.invalid','preview-read-only'];
 const all=files.map(file=>file.content).join('\n');
 for(const marker of required)if(!all.includes(marker))throw Error('preview_bundle_missing_closed_binding');
 for(const {name,content}of files){
  const text=content.replaceAll('\\/','/');
  if(/https?:\/\/api\.stotmedhjerte\.dk\b/i.test(text))throw Error('preview_bundle_production_api:'+name);
  if(/https?:\/\/[a-z0-9.-]+\.supabase\.(?:co|in|net)\b/i.test(text))throw Error('preview_bundle_supabase_origin:'+name);
  if(/sb_secret_|SUPABASE_SERVICE_ROLE_KEY|SUPABASE_SERVICE_KEY|service_role/i.test(text))throw Error('preview_bundle_secret_marker:'+name);
  for(const token of text.match(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*/g)||[]){
   let role;try{role=JSON.parse(Buffer.from(token.split('.')[1],'base64url').toString('utf8')).role;}catch{}
   if(role==='service_role')throw Error('preview_bundle_privileged_token:'+name);
  }
 }
 return{status:'closed_public_bindings_verified',files_checked:files.length,api_origin:required[0],auth_origin:required[1],placeholder_is_credential:false};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const directory=new URL('../dist/',import.meta.url),output=new URL('_redirects',directory);
 const redirects=stagingProfileRedirects(readFileSync(output,'utf8'),process.env.CONTEXT);
 const files=[];
 function collect(folder,prefix=''){
  for(const entry of readdirSync(folder,{withFileTypes:true})){
   const file=new URL(entry.name+(entry.isDirectory()?'/':''),folder),name=prefix+entry.name;
   if(entry.isDirectory())collect(file,name+'/');
   else if(/\.(?:js|mjs|html|json|map|css|txt|xml)$/i.test(name))files.push({name,content:readFileSync(file,'utf8')});
  }
 }
 collect(directory);
 const proof=assertStagingProfileBundle(files);
 writeFileSync(output,redirects);
 writeFileSync(new URL('staging-profile-boundary.json',directory),JSON.stringify({...proof,context:'deploy-preview',commit_ref:process.env.COMMIT_REF||null,public_read_path:'/api/public/forening/:slug'},null,2)+'\n');
 console.log(JSON.stringify({staging_profile_preview:proof.status,files_checked:proof.files_checked,placeholder_is_credential:false}));
}
