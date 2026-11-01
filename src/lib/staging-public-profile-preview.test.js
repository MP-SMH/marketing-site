import {expect,test,vi} from 'vitest';
import {createClient} from '@supabase/supabase-js';
import {stagingProfileRedirects,assertStagingProfileBundle} from '../../scripts/prepare-staging-profile-preview.mjs';

test('preview prepends only the exact public profile proxy before the unchanged SPA fallback',()=>{
 const original='/*  /index.html  200\n';
 const output=stagingProfileRedirects(original,'deploy-preview');
 const rules=output.split('\n').filter(line=>line&&!line.startsWith('#'));
 expect(rules).toEqual([
  '/api/public/forening/:slug  https://api-staging.stotmedhjerte.dk/api/public/forening/:slug  200',
  '/*  /index.html  200',
 ]);
 expect(output.endsWith(original)).toBe(true);
 expect(output).not.toMatch(/\/api\/\*|\/api\/public\/\*|payment|checkout|auth/);
});
test.each(['production','branch-deploy','dev',undefined])('proxy generation fails closed for %s',context=>{
 expect(()=>stagingProfileRedirects('/*  /index.html  200\n',context)).toThrow('requires_deploy_preview');
});
test('preview generation requires the existing clean-route SPA fallback',()=>{
 expect(()=>stagingProfileRedirects('', 'deploy-preview')).toThrow('spa_fallback_required');
});

const closed="https://preview-api.invalid https://preview-auth.invalid preview-read-only";
test('output proof records live closed bindings and allows unused bindings to be removed by the bundler',()=>{
 expect(assertStagingProfileBundle([{name:'assets/app.js',content:closed}])).toMatchObject({status:'closed_public_bindings_verified',placeholder_is_credential:false});
 expect(assertStagingProfileBundle([{name:'assets/app.js',content:'const profileOnly = true;'}])).toMatchObject({closed_api_binding_present:false,closed_auth_binding_present:false,placeholder_present:false,placeholder_is_credential:false});
});
test.each([
 ['production API','https://api.stotmedhjerte.dk/api/auth/otp/request','production_api'],
 ['Supabase project','https://synthetic-project.supabase.co/auth/v1','supabase_origin'],
 ['secret key marker','sb_secret_synthetic_not_a_key','secret_marker'],
 ['service key marker','SUPABASE_SERVICE_ROLE_KEY','secret_marker'],
 ['privileged role marker','service_role','secret_marker'],
])('output proof rejects %s without exposing the matching value',(_label,value,error)=>{
 expect(()=>assertStagingProfileBundle([{name:'assets/app.js',content:closed+' '+value}])).toThrow(error+':assets/app.js');
});
test('output proof rejects a privileged JWT claim even when the payload is encoded',()=>{
 const token='eyJhbGciOiJIUzI1NiJ9.'+Buffer.from(JSON.stringify({role:'service_role'})).toString('base64url')+'.synthetic';
 expect(()=>assertStagingProfileBundle([{name:'assets/app.js',content:closed+' '+token}])).toThrow('privileged_token:assets/app.js');
});
test('the closed Supabase placeholder can initialize an empty client without a network request',async()=>{
 const fetch=vi.fn(async()=>{throw Error('unexpected transport');});
 const client=createClient('https://preview-auth.invalid','preview-read-only',{global:{fetch},auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
 const result=await client.auth.getSession();
 expect(result.data.session).toBeNull();expect(fetch).not.toHaveBeenCalled();
});
