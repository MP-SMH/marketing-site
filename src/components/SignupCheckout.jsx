import {useEffect,useState} from 'react';
import {ArrowRight,Check,Clock3,CreditCard,RefreshCw,ShieldCheck} from 'lucide-react';
import {signupPlan} from '@/lib/signup-plans';

const kroner=ore=>`${(ore/100).toLocaleString('da-DK')} kr.`;
const blocked=new Set(['action_required','processing','reconciliation_required']);

// G1 is a closed local UI contract. No product entry point supplies a payment adapter.
export default function SignupCheckout({api,product,binding,payload,eligible,onContinue}){
 const plan=signupPlan(product,binding);
 const [quote,setQuote]=useState(null),[purchase,setPurchase]=useState(null),[busy,setBusy]=useState(false),[error,setError]=useState(''),[conflict,setConflict]=useState(false);
 useEffect(()=>{let live=true;setQuote(null);setPurchase(null);setError('');setConflict(false);if(!api||!plan)return;
  Promise.all([api.quote({product,binding}),api.resume()]).then(([next,existing])=>{if(!live)return;if(next?.product!==product||next?.binding!==binding||next?.currency!=='DKK'||next?.taxIncluded!==true||!next?.termsVersion||!Number.isInteger(next?.dueNowOre)||next.dueNowOre<=0||next.monthlyAmountOre!==next.dueNowOre)throw Error('Invalid quote');setQuote(next);if(existing){if(existing.product===product&&existing.binding===binding)setPurchase(existing);else{setConflict(true);setError('Der findes allerede et køb med andre vilkår. Log ind og få det afklaret, før I starter en ny betaling.');}}}).catch(()=>{if(live)setError('Pris og købsstatus kunne ikke bekræftes. Prøv at hente status igen.');});
  return()=>{live=false;};
 },[api,product,binding]);
 const refresh=async()=>{if(!api)return;setBusy(true);setError('');try{const next=purchase?.purchaseId?await api.get(purchase.purchaseId):await api.resume();if(next)setPurchase(next);else setError('Der blev ikke fundet et køb i denne sikre gennemgang.');}catch{setError('Købsstatus kunne ikke hentes. Betal ikke igen, før status er afklaret.');}finally{setBusy(false);}};
 const start=async()=>{if(!api||!quote||!eligible||busy||conflict||blocked.has(purchase?.status)||purchase?.status==='confirmed')return;setBusy(true);setError('');
  let current=purchase;
  try{
   if(!current){current=await api.prepare(payload(),quote);setPurchase(current);}
   const next=await api.checkout(current.purchaseId);setPurchase(next);
  }catch{if(current){setPurchase({...current,status:'reconciliation_required'});setError('Svaret på betalingsforsøget mangler. Tjek samme køb; betal ikke igen.');}else setError('Købet kunne ikke forberedes. Jeres oplysninger er bevaret.');}
  finally{setBusy(false);}
 };
 const simulate=async status=>{if(!api?.review||!purchase)return;setBusy(true);setError('');try{setPurchase(await api.simulate(purchase.purchaseId,status));}catch{setPurchase({...purchase,status:'reconciliation_required'});setError('Betalingen skal afstemmes. Tjek status, før I foretager jer mere.');}finally{setBusy(false);}};
 const receipt=purchase?.receipt;
 const receiptReady=purchase?.status==='confirmed'&&receipt?.paidAmountOre===quote?.dueNowOre&&!!receipt?.invoiceReference&&!!receipt?.subscriptionReference&&!!receipt?.confirmedDate&&!!receipt?.startDate&&!!receipt?.nextPaymentDate;
 const status=purchase?.status==='confirmed'&&!receiptReady?'reconciliation_required':purchase?.status;
 return <section className="ofo-checkout" aria-label="Betaling af første måned">
  <h3 className="ofo-section-title">Betal første måned</h3>
  <p>Abonnementet starter, når første måneds betaling er bekræftet. MobilePay og tilladelse ordnes bagefter og ændrer ikke abonnementsstarten.</p>
  <div className="ofo-checkout-price"><span>Pris i dag</span><strong>{quote?kroner(quote.dueNowOre):'Henter pris…'}</strong><span>Derefter pr. måned</span><strong>{quote?kroner(quote.monthlyAmountOre):'–'}</strong></div>
  <p className="ofo-checkout-note">Alle priser er inkl. moms. {binding==='binding'?`12 måneders binding: ${plan?`${(plan.monthlyAmount*12).toLocaleString('da-DK')} kr. ved uændret månedspris. `:''}Der betales månedligt, ikke et helt år på én gang.`:'Uden 12 måneders binding.'} Næste betalingsdato fremgår af den bekræftede kvittering.</p>
  {!api&&<p role="status" className="ofo-checkout-state">Betaling åbnes først, når den sikre købsforbindelse er klar. Eksisterende kunder kan fortsat logge ind.</p>}
  {error&&<p role="alert" className="ofo-submit-error">{error}</p>}
  {receiptReady&&<div className="ofo-checkout-state is-confirmed" role="status"><Check size={21} aria-hidden="true"/><div><h4>Første måned er betalt</h4><p>{plan?.title} · {kroner(receipt.paidAmountOre)} betalt {receipt.confirmedDate}. Abonnementet startede {receipt.startDate}. Næste betaling: {receipt.nextPaymentDate}.</p><p>Købsreference {purchase.purchaseId} · Abonnement {receipt.subscriptionReference} · Faktura {receipt.invoiceReference}. {binding==='binding'?`Binding til ${receipt.bindingEndsAt||'dato afventer bekræftelse'}. `:''}Kortet er klaret. Fortsæt til MobilePay i Kom godt i gang.</p></div></div>}
  {status==='action_required'&&<div className="ofo-checkout-window" role="group" aria-label="Sikkert betalingsvindue"><ShieldCheck size={22} aria-hidden="true"/><h4>Betalingsvindue åbnet</h4><p>Gennemfør kortbetalingen og eventuel bankgodkendelse. Lukker I vinduet, kan samme køb genoptages.</p>{api?.review&&<><p className="ofo-checkout-demo">Lukket simulator · ingen kortfelter eller rigtig betaling</p><div className="ofo-checkout-actions"><button type="button" onClick={()=>simulate('confirmed')}>Simulér betalt</button><button type="button" onClick={()=>simulate('rejected')}>Afvist</button><button type="button" onClick={()=>simulate('cancelled')}>Afbrudt</button><button type="button" onClick={()=>simulate('processing')}>Afventer</button><button type="button" onClick={()=>simulate('expired')}>Udløbet</button><button type="button" onClick={()=>simulate('reconciliation_required')}>Uafklaret</button></div></>}</div>}
  {status==='processing'&&<p role="status" className="ofo-checkout-state"><Clock3 size={19}/>Betalingen afventer bekræftelse. Tjek status senere; start ikke et nyt køb.</p>}
  {status==='reconciliation_required'&&<p role="alert" className="ofo-checkout-state"><Clock3 size={19}/>Betalingsresultatet er uafklaret. Det samme køb skal afstemmes, før I kan fortsætte.</p>}
  {status==='rejected'&&<p role="alert" className="ofo-checkout-state">Dette betalingsforsøg blev afvist. I kan bevidst prøve igen på samme køb.</p>}
  {status==='cancelled'&&<p role="status" className="ofo-checkout-state">Betalingsvinduet blev afbrudt. Købet er ikke bekræftet; I kan genoptage samme køb.</p>}
  {status==='expired'&&<p role="status" className="ofo-checkout-state">Betalingsvinduet er udløbet. Det tidligere forsøg er afklaret; I kan genoptage samme køb.</p>}
  {status==='confirmed'?<button type="button" className="ofo-primary" onClick={onContinue}>Fortsæt til Kom godt i gang <ArrowRight size={17}/></button>:<>
   {!blocked.has(status)&&<button type="button" className="ofo-primary" disabled={!api||!quote||!eligible||busy||conflict} onClick={start}><CreditCard size={18}/>{busy?'Kontrollerer købet…':status?'Genoptag samme køb':`Betal ${quote?kroner(quote.dueNowOre):'første måned'} og fortsæt`}</button>}
   {purchase&&<button type="button" className="ofo-linkbtn" disabled={busy} onClick={refresh}><RefreshCw size={16}/> Tjek status for {purchase.purchaseId}</button>}
   {api?.review&&['processing','reconciliation_required'].includes(status)&&<button type="button" className="ofo-linkbtn" onClick={()=>simulate('confirmed')}>Simulér senere bekræftelse af samme køb</button>}
  </>}
 </section>;
}
