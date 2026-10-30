import React from 'react';
import {afterEach,beforeEach,expect,test,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Signup from './OpretForeningPage';
import Landing from './OpretForeningLanding';
import {SIGNUP_DRAFT_KEY} from '@/lib/signup-draft';
import {signupPlan} from '@/lib/signup-plans';

vi.mock('@/lib/supabaseClient',()=>({SMH_API_URL:'http://signup.invalid'}));
vi.mock('@/lib/consents',()=>({ConsentFetchError:class extends Error{},fetchActiveConsents:async()=>Object.fromEntries(['platform_terms','gdpr_terms','pii_consent','marketing_consent'].map(type=>[type,{id:type,title:type,consent_type:type,version:'local-test',content_markdown:'Lokalt testeksempel.'}]))}));
const response=(data,status=200)=>({ok:status>=200&&status<300,status,json:async()=>data});
let requests,cvrFails;
beforeEach(()=>{localStorage.clear();requests=[];cvrFails=false;vi.stubGlobal('fetch',vi.fn(async(url,options={})=>{
 requests.push({url:String(url),options});
 if(String(url).includes('/aftale/skabelon'))return response({template_uuid:'local-template',content:'Lokalt testeksempel.',title:'Samarbejdsaftale',version:'local-test'});
 if(String(url).includes('/cvr/lookup'))return cvrFails?response({},503):response({valid:true,active:true,foreningsnavn:'Lokal Testforening',postnummer:'3400'});
 return response({success:true});
}));});
afterEach(()=>{cleanup();vi.unstubAllGlobals();});

function makeApi(){
 let purchase=null,prepareCalls=0,checkoutCalls=0;
 return {review:true,get prepareCalls(){return prepareCalls},get checkoutCalls(){return checkoutCalls},
  quote:async({product,binding})=>{const plan=signupPlan(product,binding);return {quoteId:'test-quote',product,binding,dueNowOre:plan.monthlyAmount*100,monthlyAmountOre:plan.monthlyAmount*100,currency:'DKK',taxIncluded:true,termsVersion:'local-test'}},
  resume:async()=>purchase&&{...purchase},get:async()=>purchase&&{...purchase},
  prepare:async(payload,quote)=>{prepareCalls++;if(!purchase)purchase={purchaseId:'TEST-PURCHASE-1',product:payload.abonnement_produkt,binding:payload.abonnement_binding,status:'prepared',quote};return {...purchase}},
  checkout:async()=>{checkoutCalls++;purchase.status='action_required';return {...purchase}},
  simulate:async(_id,status)=>{purchase.status=status;if(status==='confirmed')purchase.receipt={paidAmountOre:purchase.quote.dueNowOre,confirmedDate:'27. oktober 2026',startDate:'27. oktober 2026',nextPaymentDate:'27. november 2026',invoiceReference:'TEST-FAKTURA-1',subscriptionReference:'TEST-ABONNEMENT-1',bindingEndsAt:'26. oktober 2027'};return {...purchase}},
 };
}
async function advance({api=makeApi(),product='donationer',binding='binding'}={}){
 render(<MemoryRouter><Signup purchaseApi={api}/></MemoryRouter>);
 fireEvent.change(screen.getByRole('textbox',{name:'E-mail'}),{target:{value:'local-test@example.invalid'}});fireEvent.click(screen.getByRole('button',{name:'Send bekræftelseskode'}));
 fireEvent.paste(await screen.findByLabelText('Bekræftelseskode'),{clipboardData:{getData:()=> '12345678'}});
 const cvr=await screen.findByPlaceholderText('12345678');fireEvent.change(cvr,{target:{value:'12345678'}});fireEvent.blur(cvr);
 if(cvrFails){await screen.findByText(/CVR-status er endnu ikke bekræftet/);fireEvent.change(screen.getByRole('textbox',{name:'Foreningsnavn *'}),{target:{value:'Lokal Testforening'}});fireEvent.change(screen.getByRole('textbox',{name:'Postnummer *'}),{target:{value:'3400'}});}else await screen.findByText('Forening bekræftet i CVR-registret');
 fireEvent.change(screen.getByPlaceholderText('F.eks. Anders Hansen'),{target:{value:'Lokal Testperson'}});fireEvent.change(screen.getByPlaceholderText('12 34 56 78'),{target:{value:'12345678'}});fireEvent.change(screen.getByPlaceholderText('Mindst 15 tegn'),{target:{value:'Lokalt-testeksempel-47!abc'}});
 fireEvent.click(screen.getByRole('button',{name:/Fortsæt til løsning/}));await screen.findByRole('heading',{name:'Vælg jeres løsning'});
 if(product==='samlet')fireEvent.click(screen.getByRole('radio',{name:/Donationer \+ Fast Støtte/}));fireEvent.click(screen.getByRole('radio',{name:binding==='binding'?/12 måneders binding/:/Uden binding/}));
 fireEvent.click(screen.getByRole('button',{name:'Gennemgå aftale og betal'}));await screen.findByRole('heading',{name:'Gennemgå aftale og betal'});
 for(let i=0;i<3;i++){fireEvent.click(screen.getAllByRole('button',{name:'Læs',exact:true})[0]);fireEvent.click(await screen.findByRole('button',{name:'Accepter vilkårene'}));}
 fireEvent.click(screen.getByRole('checkbox',{name:/Jeg har læst og accepterer samarbejdsaftalen/}));
 if(api&&!await api.resume())await screen.findByRole('button',{name:new RegExp(`Betal ${signupPlan(product,binding).monthlyAmount} kr\\. og fortsæt`)});
 return api;
}
const pay=()=>screen.getByRole('button',{name:/Betal \d+ kr\. og fortsæt/});
test('existing account route stays available and product signup cannot invoke a real payment adapter',async()=>{
 render(<MemoryRouter><Landing/></MemoryRouter>);expect(screen.getAllByRole('link',{name:'Start oprettelsen'}).every(node=>node.getAttribute('href')==='/opret-forening/start')).toBe(true);cleanup();await advance({api:null});expect(screen.getByText(/Betaling åbnes først/)).toBeTruthy();expect(screen.getByRole('button',{name:'Betal første måned og fortsæt'}).disabled).toBe(true);expect(screen.getByRole('link',{name:/Log ind og fortsæt/}).href).toBe('https://app.stotmedhjerte.dk/login');expect(requests.some(item=>item.url.includes('/signup/forening'))).toBe(false);
});
test('step four charges once and shows a dated receipt before setup',async()=>{
 const api=await advance();expect(screen.getByText('Trin 4 af 4')).toBeTruthy();expect(screen.getByText(/1.788 kr. ved uændret månedspris/)).toBeTruthy();const button=pay();fireEvent.click(button);fireEvent.click(button);await screen.findByRole('group',{name:'Sikkert betalingsvindue'});expect(api.prepareCalls).toBe(1);expect(api.checkoutCalls).toBe(1);fireEvent.click(screen.getByRole('button',{name:'Simulér betalt'}));expect(await screen.findByText(/Første måned er betalt/)).toBeTruthy();expect(screen.getByText(/Næste betaling: 27. november 2026/)).toBeTruthy();expect(screen.queryByRole('button',{name:/Betal 149 kr/})).toBeNull();
});
test.each([['donationer','ingen',179],['samlet','binding',278],['samlet','ingen',334]])('%s / %s uses %i kr. from the injected quote',async(product,binding,amount)=>{
 const api=await advance({product,binding});expect(pay().textContent).toContain(`${amount} kr.`);fireEvent.click(pay());await screen.findByRole('group',{name:'Sikkert betalingsvindue'});expect(api.prepareCalls).toBe(1);
});
test('rejected, cancelled and expired attempts reuse one purchase',async()=>{
 const api=await advance();fireEvent.click(pay());await screen.findByRole('group',{name:'Sikkert betalingsvindue'});for(const outcome of ['Afvist','Afbrudt','Udløbet']){fireEvent.click(screen.getByRole('button',{name:outcome}));fireEvent.click(await screen.findByRole('button',{name:'Genoptag samme køb'}));await screen.findByRole('group',{name:'Sikkert betalingsvindue'});}expect(api.prepareCalls).toBe(1);expect(api.checkoutCalls).toBe(4);
});
test.each(['Afventer','Uafklaret'])('%s blocks another charge until the original result is confirmed',async(outcome)=>{
 const api=await advance();fireEvent.click(pay());await screen.findByRole('group',{name:'Sikkert betalingsvindue'});fireEvent.click(screen.getByRole('button',{name:outcome}));expect(screen.queryByRole('button',{name:'Genoptag samme køb'})).toBeNull();fireEvent.click(await screen.findByRole('button',{name:/Tjek status for TEST-PURCHASE-1/}));expect(api.checkoutCalls).toBe(1);fireEvent.click(await screen.findByRole('button',{name:/Simulér senere bekræftelse/}));expect(await screen.findByText(/Første måned er betalt/)).toBeTruthy();expect(api.prepareCalls).toBe(1);
});
test('remounting with the same secure adapter finds the original checkout',async()=>{
 const api=await advance();fireEvent.click(pay());await screen.findByRole('group',{name:'Sikkert betalingsvindue'});cleanup();await advance({api});expect(screen.getByRole('group',{name:'Sikkert betalingsvindue'})).toBeTruthy();expect(api.prepareCalls).toBe(1);
});
test('an existing purchase with other terms blocks a second purchase after remount',async()=>{
 const api=await advance();fireEvent.click(pay());await screen.findByRole('group',{name:'Sikkert betalingsvindue'});cleanup();await advance({api,product:'samlet'});expect(await screen.findByText(/allerede et køb med andre vilkår/)).toBeTruthy();expect(screen.getByRole('button',{name:/Betal 278 kr/}).disabled).toBe(true);expect(api.prepareCalls).toBe(1);
});
test('changing product requires a new agreement acceptance',async()=>{
 await advance();fireEvent.click(screen.getByRole('button',{name:/Ret løsning/}));fireEvent.click(screen.getByRole('radio',{name:/Donationer \+ Fast Støtte/}));fireEvent.click(screen.getByRole('button',{name:'Gennemgå aftale og betal'}));expect(screen.getByRole('checkbox',{name:/Jeg har læst/}).checked).toBe(false);expect((await screen.findByRole('button',{name:/Betal 278 kr/})).disabled).toBe(true);
});
test('local drafts contain neither payment references nor sensitive data',async()=>{
 await advance();fireEvent.click(screen.getByRole('button',{name:'Gem og fortsæt senere'}));const value=JSON.parse(localStorage.getItem(SIGNUP_DRAFT_KEY));expect(value.email).toBe('local-test@example.invalid');expect(JSON.stringify(value)).not.toMatch(/password|otp|accepted|token|proof|purchase|checkout/i);
});
test('CVR outage offers manual entry without claiming verification',async()=>{cvrFails=true;await advance();expect(requests.some(item=>item.url.includes('/cvr/lookup'))).toBe(true);expect(screen.queryByText('Forening bekræftet i CVR-registret')).toBeNull();});
