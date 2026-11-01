import {expect,test} from 'vitest';
import {stagingProfileRedirects} from '../../scripts/prepare-staging-profile-preview.mjs';

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
