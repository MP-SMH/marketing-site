import {PRICING,BINDING_MONTHS} from '../data/pricing.js';
export const SIGNUP_PRODUCTS=Object.freeze([
 Object.freeze({key:'donationer',title:'Donationer',description:'Engangsbidrag via foreningens MobilePay.'}),
 Object.freeze({key:'samlet',title:'Donationer + Fast Støtte',description:'Engangsbidrag og faste månedlige bidrag samlet.'}),
]);
export function signupPlan(product,binding){
 const item=SIGNUP_PRODUCTS.find(item=>item.key===product);
 if(!item||!['binding','ingen'].includes(binding))return null;
 return {product,binding,title:item.title,monthlyAmount:PRICING[binding==='binding'?'med_binding':'uden_binding'][product].inkl,bindingLabel:binding==='binding'?`${BINDING_MONTHS} måneders binding`:'Uden binding'};
}
