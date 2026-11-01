import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

// Netlify redirects are global; generate this narrow proxy only for a Deploy Preview.
export function stagingProfileRedirects(original,context){
 if(context!=='deploy-preview')throw Error('staging_profile_proxy_requires_deploy_preview');
 if(typeof original!=='string'||!original.includes('/*  /index.html  200'))throw Error('existing_spa_fallback_required');
 return '# Deploy Preview: the staging ingress permits only GET/HEAD on this exact public profile route.\n'
  +'/api/public/forening/:slug  https://api-staging.stotmedhjerte.dk/api/public/forening/:slug  200\n'
  +original;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const output=new URL('../dist/_redirects',import.meta.url);
 writeFileSync(output,stagingProfileRedirects(readFileSync(output,'utf8'),process.env.CONTEXT));
}
