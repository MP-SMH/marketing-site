import React from 'react';
const kr=n=>new Intl.NumberFormat('da-DK',{style:'currency',currency:'DKK'}).format(n/100);
const date=s=>s?new Intl.DateTimeFormat('da-DK',{day:'numeric',month:'long',year:'numeric',timeZone:'Europe/Copenhagen'}).format(new Date(s+'T12:00:00Z')):'';
export default function OffentligtRegnskab({grundlag:g,pdfUrl,offentliggjort,forhaandsvisning=false}){
 if(!g)return null;
 const items=[[g.type==='overskudserklaering'?'Tidligere restbeløb':'Indsamlede bidrag',g.indsamlet_oere],['Udgifter',g.omkostninger_oere],['Brugt til formålet',g.anvendt_oere],[g.rest_oere<0?'Merforbrug':'Ikke anvendt ved aflæggelsen',Math.abs(g.rest_oere)]];
 const list=(title,rows)=>rows?.length>0&&<section><h4 style={{margin:'22px 0 8px',fontSize:15}}>{title}</h4>{rows.map((p,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',gap:20,padding:'10px 0',borderBottom:'1px solid #E5E7EB'}}><span style={{overflowWrap:'anywhere'}}>{p.tekst}</span><strong style={{whiteSpace:'nowrap',flexShrink:0}}>{kr(p.beloeb_oere)}</strong></div>)}</section>;
 return <section aria-label={forhaandsvisning?'Forhåndsvisning af offentlig side':'Offentligt regnskab'} style={{border:'1px solid #E5E7EB',borderRadius:18,padding:'clamp(16px,4vw,26px)',background:'white',fontSize:13,lineHeight:1.6,color:'#17253B'}}>
  <h3 style={{margin:'0 0 6px',fontSize:19}}>{g.type==='overskudserklaering'?'Anvendelse af de resterende penge':'Regnskab for indsamlingen'}</h3>
  {g.periode_start&&g.periode_slut&&<p style={{margin:'0 0 6px',color:'#55606F'}}>Indsamlingsperiode: {date(g.periode_start)} til {date(g.periode_slut)}{g.kraever_revision?' · Revideret':''}</p>}
  <p style={{margin:'0 0 16px',color:'#55606F'}}>Journalnummer {g.journalnummer} · Aflagt {date(g.aflagt_dato)}{offentliggjort?' · Offentliggjort':''}</p>
  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,150px),1fr))',gap:12}}>{items.map(([label,value])=><div key={label} style={{background:'#F7F8FB',borderRadius:12,padding:14}}><span style={{display:'block',fontSize:12,color:'#55606F'}}>{label}</span><strong style={{fontSize:18}}>{kr(value)}</strong></div>)}</div>
  {list('Udgifter til indsamlingen',g.udgifter)}{list('Pengene er brugt til',g.anvendelse)}
  <p style={{margin:'18px 0 0',padding:14,borderRadius:12,background:g.rest_oere>0?'#FEF9E7':'#ECFDF3'}}>{g.rest_oere>0?(forhaandsvisning?`Der er ${kr(g.rest_oere)} tilbage til indsamlingens formål. En overskudserklæring skal indsendes senest ét år efter indsendelsen.`:`Ved aflæggelsen var ${kr(g.rest_oere)} endnu ikke anvendt. Den senere anvendelse dokumenteres i overskudserklæringerne.`):'Alle indsamlede midler er anvendt.'}</p>
  {pdfUrl&&<a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{display:'inline-block',marginTop:16,fontWeight:700,color:'#D52C46'}}>Se {g.type==='overskudserklaering'?'overskudserklæringen':'regnskabet'} (PDF)</a>}
  {forhaandsvisning&&<p style={{margin:'12px 0 0',fontSize:12,color:'#55606F'}}>Forhåndsvisning. {g.type==='overskudserklaering'?'Overskudserklæringen':'Regnskabet'} er endnu ikke offentliggjort.</p>}
 </section>;
}
