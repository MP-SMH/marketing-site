import React from 'react';
import {UserRound,UsersRound,HeartHandshake,ClipboardCheck,CreditCard,Clock3} from 'lucide-react';
import {SETUP_TASKS} from '../../../shared/association-onboarding';
const icons={profile:UserRound,team:UsersRound,cause:HeartHandshake,permit:ClipboardCheck,payment:CreditCard};
export default function OnboardingAfterSignup({confirmedPurchase=false}){
 return <section aria-labelledby="after-signup-title">
  <h2 id="after-signup-title" className="ofo-preparation-title">Efter oprettelsen: Kom godt i gang</h2>
  <p className="ofo-preparation-intro">E-mail, foreningsoplysninger, samtykker, samarbejdsaftale og abonnementsvalg er klaret. I fortsætter med de opgaver, der mangler.</p>
  <ol className="ofo-preparation-list">{SETUP_TASKS.map(task=>{const Icon=icons[task.key];const visible=confirmedPurchase&&task.key==='payment'?{...task,title:'Foreningens MobilePay',description:'Første måned er betalt. Forbind foreningens MobilePay uden at registrere kortet igen.'}:task;return <li key={task.key}><span><Icon size={20} aria-hidden="true"/></span><div><strong>{visible.title}</strong><p>{visible.description}</p></div></li>;})}</ol>
  <p className="ofo-preparation-wait"><Clock3 size={18} aria-hidden="true"/><span>I kan klargøre profil og hjertesager, mens tilladelse og MobilePay behandles. Indsendte ansøgninger står som ventestatus.</span></p>
  <p className="ofo-preparation-intro">Opgaverne følger de gemte oplysninger. I kan åbne dashboardet undervejs; det bliver jeres startside, når jeres egne opgaver er klaret. I vælger selv, hvornår profilen skal være offentlig.</p>
 </section>;
}
