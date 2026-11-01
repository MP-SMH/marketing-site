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

const actualProfile={
 foreningsnavn:'Heartland United (TEST)',slug:'heartland-united',payment_ready:false,
 logo:'https://images.invalid/actual-logo.png',coverbillede:'https://images.invalid/actual-cover.jpg',coverbillede_position:56.5,
 profiltekst:'Profiltekst fra den offentlige API-whitelist.',lang_beskrivelse:'Foreningens faktiske beskrivelse fra den offentlige profil.',
 by:'Hillerød',cvr_nummer:'45407438',kontakt:{email:'forening@example.invalid',telefon:'12345678'},
};
const purpose=[{ikon:'heart',titel:'Lokalt fællesskab',tekst:'Foreningens egen beskrivelse af sit formål.'}];
const assertContributionsClosed=()=>{
 expect(screen.queryAllByRole('link').filter(link=>/\/hjertesag\/|\/kvittering|\/api\/mobilepay|#stoet|#hjertesager/.test(link.getAttribute('href')||''))).toHaveLength(0);
 expect(screen.queryByText('Bliv den første, der støtter fast')).toBeNull();
 expect(screen.queryByRole('heading',{name:'Godkendt hos Indsamlingsnævnet'})).toBeNull();
 expect(screen.queryByText(/Foreningen har Indsamlingsnævnets tilladelse/)).toBeNull();
 expect(screen.queryByText('Den rene model')).toBeNull();
 expect(screen.getByRole('button',{name:'Lukket i TESTVISNING'})).toBeDisabled();
 expect(screen.queryByRole('button',{name:/betal|støt|godkend/i})).toBeNull();
};
test.each([false,true])('actual public profile remains readable with contributions closed and har_fast_stoette=%s',async recurring=>{
 const fetch=vi.fn(async()=>response({klar:false,profile_available:true,forening:{...actualProfile,har_fast_stoette:recurring,indsamlingsnaevn:null},hjertesager:[],formaal:purpose}));vi.stubGlobal('fetch',fetch);
 renderProfile();
 expect(await screen.findByRole('heading',{name:actualProfile.foreningsnavn})).toBeInTheDocument();
 expect(screen.getByAltText(actualProfile.foreningsnavn)).toHaveAttribute('src',actualProfile.logo);
 const cover=screen.getByAltText('Foto fra '+actualProfile.foreningsnavn);
 expect(cover).toHaveAttribute('src',actualProfile.coverbillede);expect(cover.style.objectPosition).toBe('50% 56.5%');
 expect(screen.getByText(actualProfile.profiltekst)).toBeInTheDocument();
 expect(screen.getByText(actualProfile.lang_beskrivelse)).toBeInTheDocument();
 expect(screen.getByRole('heading',{name:'Lokalt fællesskab'})).toBeInTheDocument();
 expect(screen.getByRole('heading',{name:'Profil og deling'})).toBeInTheDocument();
 expect(screen.getByRole('status')).toHaveTextContent('Betaling er lukket.');
 expect(screen.getAllByRole('button',{name:'Kopiér link'}).length).toBeGreaterThan(0);
 expect(screen.getByRole('link',{name:/forening@example.invalid/})).toHaveAttribute('href','mailto:forening@example.invalid');
 assertContributionsClosed();assertNoDemo();expect(fetch).toHaveBeenCalledTimes(1);
});
test('the closed top-level state overrides inconsistent cause, recurring and permit fields',async()=>{
 vi.stubGlobal('fetch',vi.fn(async()=>response({klar:false,profile_available:true,forening:{...actualProfile,payment_ready:true,har_fast_stoette:true,indsamlingsnaevn:{status:'Godkendt',journal_nr:'MUST-NOT-BE-SHOWN'}},hjertesager:[{slug:'must-not-open',kampagnenavn:'MUST-NOT-BE-PUBLISHED'}],formaal:[]})));
 renderProfile();await screen.findByRole('heading',{name:actualProfile.foreningsnavn});
 expect(screen.queryByText('MUST-NOT-BE-PUBLISHED')).toBeNull();expect(screen.queryByText(/MUST-NOT-BE-SHOWN/)).toBeNull();assertContributionsClosed();
});
test.each([undefined,false,'true'])('old/incomplete closed responses do not disclose the full profile for flag %s',async flag=>{
 vi.stubGlobal('fetch',vi.fn(async()=>response({klar:false,profile_available:flag,forening:actualProfile,hjertesager:[],formaal:purpose})));
 renderProfile();expect(await screen.findByRole('heading',{name:'Testprofilen er endnu ikke klar'})).toBeInTheDocument();
 expect(screen.queryByAltText('Foto fra '+actualProfile.foreningsnavn)).toBeNull();expect(screen.queryByText(actualProfile.profiltekst)).toBeNull();assertNoDemo();
});
test('a private/not-found response cannot be opened by a profile flag in its body',async()=>{
 vi.stubGlobal('fetch',vi.fn(async()=>response({klar:false,profile_available:true,forening:actualProfile},404)));
 renderProfile();expect(await screen.findByRole('heading',{name:'Heartland United er en TESTFORENING'})).toBeInTheDocument();
 expect(screen.queryByAltText('Foto fra '+actualProfile.foreningsnavn)).toBeNull();expect(screen.queryByText(actualProfile.profiltekst)).toBeNull();
});
test('a non-test pending profile uses the same original layout with a truthful closed-status notice',async()=>{
 vi.stubGlobal('fetch',vi.fn(async()=>response({klar:false,profile_available:true,forening:{...actualProfile,foreningsnavn:'Offentlig profil uden bidrag',slug:'public-profile',har_fast_stoette:true},hjertesager:[],formaal:[]})));
 renderProfile('public-profile');await screen.findByRole('heading',{name:'Offentlig profil uden bidrag'});
 expect(screen.getByRole('status')).toHaveTextContent('Bidrag og Fast Støtte er lukket i denne TESTVISNING.');
 assertContributionsClosed();
});
test.each([false,true])('the production eligible profile keeps its original contribution presentation with recurring=%s',async recurring=>{
 vi.stubEnv('VITE_SMH_PUBLIC_PROFILE_PROXY',undefined);
 const profile={...actualProfile,foreningsnavn:'Eligible test fixture',slug:'eligible-forening',payment_ready:true,har_fast_stoette:recurring,indsamlingsnaevn:{status:'Godkendt',journal_nr:'TEST-ELIGIBLE-FIXTURE'}};
 vi.stubGlobal('fetch',vi.fn(async()=>response({forening:profile,hjertesager:[{slug:'unit-cause',kampagnenavn:'Eligible cause fixture',kort_beskrivelse:'Unit fixture',maalbeloeb:100,indsamlet_beloeb:0}],formaal:purpose})));
 renderProfile('eligible-forening');await screen.findByRole('heading',{name:profile.foreningsnavn});
 expect(screen.getByRole('link',{name:recurring?'Støt fast hver måned':'Se foreningens hjertesager'})).toHaveAttribute('href',recurring?'#stoet':'#hjertesager');
 expect(screen.getByRole('heading',{name:'Godkendt hos Indsamlingsnævnet'})).toBeInTheDocument();
 expect(screen.getByText('Den rene model')).toBeInTheDocument();
 expect(screen.queryByRole('heading',{name:'Profil og deling'})).toBeNull();
 expect(screen.queryByRole('button',{name:'Lukket i TESTVISNING'})).toBeNull();
 expect(screen.getAllByRole('link').some(link=>link.getAttribute('href')==='/hjertesag/eligible-forening/unit-cause')).toBe(true);
});

test.each([false,true])('an eligible API profile is still read-only in this explicit TEST preview with recurring=%s',async recurring=>{
 const profile={...actualProfile,foreningsnavn:'Eligible outside this TEST preview',slug:'eligible-forening',payment_ready:true,har_fast_stoette:recurring,indsamlingsnaevn:{status:'Godkendt',journal_nr:'TEST-ELIGIBLE-FIXTURE'}};
 vi.stubGlobal('fetch',vi.fn(async()=>response({forening:profile,hjertesager:[{slug:'unit-cause',kampagnenavn:'Eligible cause fixture'}],formaal:purpose})));
 renderProfile('eligible-forening');await screen.findByRole('heading',{name:profile.foreningsnavn});
 expect(screen.getByRole('status')).toHaveTextContent('Bidrag og Fast Støtte er lukket i denne TESTVISNING.');
 expect(screen.getByAltText('Foto fra '+profile.foreningsnavn)).toHaveAttribute('src',profile.coverbillede);
 expect(screen.queryByText('Eligible cause fixture')).toBeNull();
 expect(screen.queryByText('Foreningen er lige gået i luften')).toBeNull();
 assertContributionsClosed();
});
