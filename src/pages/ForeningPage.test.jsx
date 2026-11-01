import React from 'react';
import {afterEach,beforeEach,expect,test,vi} from 'vitest';
import {cleanup,render,screen} from '@testing-library/react';
import {MemoryRouter,Route,Routes} from 'react-router-dom';
import ForeningPage from './ForeningPage';

vi.mock('../lib/supabaseClient',()=>({SMH_API_URL:'https://production-api.invalid'}));
vi.mock('../lib/pageSeo',()=>({setPageSeo:vi.fn()}));
vi.mock('@/components/marketing/SiteNav',()=>({default:()=> <nav>Navigation</nav>}));
vi.mock('@/components/marketing/SiteFooter',()=>({default:()=> <footer>Footer</footer>}));

const response=(data,status=200)=>({ok:status>=200&&status<300,status,json:async()=>data});
const renderProfile=(slug='heartland-united')=>render(<MemoryRouter initialEntries={['/forening/'+slug]}><Routes><Route path="/forening/:slug" element={<ForeningPage/>}/></Routes></MemoryRouter>);
const assertNoDemo=()=>{
 expect(screen.queryByText('Testhjertesager')).toBeNull();
 expect(screen.queryByText('Nye mål til ungdomsafdelingen')).toBeNull();
 expect(screen.queryByText('Se testhjertesagen')).toBeNull();
};
beforeEach(()=>vi.stubEnv('VITE_SMH_PUBLIC_PROFILE_PROXY','true'));
afterEach(()=>{cleanup();vi.unstubAllGlobals();vi.unstubAllEnvs();vi.clearAllMocks();});

test('preview reads the current-origin profile and preserves the actual pending state for Heartland United',async()=>{
 const fetch=vi.fn(async()=>response({klar:false,forening:{foreningsnavn:'Heartland United (TEST)',by:'Testby'}}));vi.stubGlobal('fetch',fetch);
 renderProfile();
 expect(await screen.findByRole('heading',{name:'Testprofilen er endnu ikke klar'})).toBeInTheDocument();
 expect(screen.getByRole('status')).toHaveTextContent('Betaling er lukket.');
 expect(fetch).toHaveBeenCalledWith(window.location.origin+'/api/public/forening/heartland-united');
 expect(fetch).toHaveBeenCalledTimes(1);assertNoDemo();
});
test.each([404,503])('preview keeps actual HTTP %i without substituting the HU demo',async status=>{
 vi.stubGlobal('fetch',vi.fn(async()=>response({},status)));renderProfile();
 expect(await screen.findByRole('heading',{name:status===404?'Heartland United er en TESTFORENING':'Noget gik galt'})).toBeInTheDocument();
 assertNoDemo();
});
test('preview keeps a network failure without substituting the HU demo',async()=>{
 vi.stubGlobal('fetch',vi.fn(async()=>{throw Error('network unavailable');}));renderProfile();
 expect(await screen.findByRole('heading',{name:'Noget gik galt'})).toBeInTheDocument();assertNoDemo();
});
test('a successful preview uses the actual HU profile and original profile markup instead of the special demo page',async()=>{
 vi.stubGlobal('fetch',vi.fn(async()=>response({forening:{foreningsnavn:'Aktuel HU-profil fra API',slug:'heartland-united',payment_ready:false,coverbillede:'https://images.invalid/actual-cover.jpg'},formaal:[],hjertesager:[]})));
 renderProfile();
 expect(await screen.findByRole('heading',{name:'Aktuel HU-profil fra API'})).toBeInTheDocument();
 expect(screen.getByAltText('Foto fra Aktuel HU-profil fra API')).toHaveAttribute('src','https://images.invalid/actual-cover.jpg');
 assertNoDemo();
});
test('the production default API and existing HU presentation stay unchanged when the preview flag is absent',async()=>{
 vi.stubEnv('VITE_SMH_PUBLIC_PROFILE_PROXY',undefined);
 const fetch=vi.fn(async()=>response({},404));vi.stubGlobal('fetch',fetch);renderProfile();
 expect(await screen.findByRole('heading',{name:'Testhjertesager'})).toBeInTheDocument();
 expect(screen.getByText('Nye mål til ungdomsafdelingen')).toBeInTheDocument();
 expect(fetch).toHaveBeenCalledWith('https://production-api.invalid/api/public/forening/heartland-united');
});
test('a false preview flag preserves the configured API and normal missing-profile result',async()=>{
 vi.stubEnv('VITE_SMH_PUBLIC_PROFILE_PROXY','false');
 const fetch=vi.fn(async()=>response({},404));vi.stubGlobal('fetch',fetch);renderProfile('ukendt-forening');
 expect(await screen.findByRole('heading',{name:'Vi kunne ikke finde denne forening'})).toBeInTheDocument();
 expect(fetch).toHaveBeenCalledWith('https://production-api.invalid/api/public/forening/ukendt-forening');
});
