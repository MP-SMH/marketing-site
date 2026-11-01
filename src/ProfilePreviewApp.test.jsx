import React from 'react';
import {afterEach,beforeEach,expect,test,vi} from 'vitest';
import {cleanup,render,screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import ProfilePreviewApp,{ProfilePreviewRoutes} from './ProfilePreviewApp';

vi.mock('@/lib/supabaseClient',()=>({SMH_API_URL:'https://preview-api.invalid'}));
vi.mock('@/lib/pageSeo',()=>({setPageSeo:vi.fn()}));
vi.mock('@/components/marketing/SiteNav',()=>({default:()=> <nav>Navigation</nav>}));
vi.mock('@/components/marketing/SiteFooter',()=>({default:()=> <footer>Footer</footer>}));

beforeEach(()=>vi.stubEnv('VITE_SMH_PUBLIC_PROFILE_PROXY','true'));
afterEach(()=>{cleanup();vi.unstubAllGlobals();vi.unstubAllEnvs();window.history.replaceState({},'','/');});
test('the actual BrowserRouter entry opens the clean HU route and reads only its pending profile',async()=>{
 const fetch=vi.fn(async()=>({ok:true,status:200,json:async()=>({klar:false,forening:{foreningsnavn:'Heartland United (TEST)'}})}));
 vi.stubGlobal('fetch',fetch);window.history.replaceState({},'','/forening/heartland-united');
 render(<ProfilePreviewApp/>);
 expect(await screen.findByRole('heading',{name:'Testprofilen er endnu ikke klar'})).toBeInTheDocument();
 expect(fetch).toHaveBeenCalledTimes(1);
 expect(fetch).toHaveBeenCalledWith(window.location.origin+'/api/public/forening/heartland-united');
});
test.each(['/log-ind','/opret-forening','/opret-forening/start','/hjertesag/heartland-united/test','/kvittering/test'])('the scoped preview does not mount another product flow at %s',async route=>{
 const fetch=vi.fn();vi.stubGlobal('fetch',fetch);
 render(<MemoryRouter initialEntries={[route]}><ProfilePreviewRoutes/></MemoryRouter>);
 expect(screen.getByRole('heading',{name:'Siden blev ikke fundet'})).toBeInTheDocument();
 expect(fetch).not.toHaveBeenCalled();
});
