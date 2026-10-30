/* ===================================================================
   OpretForeningLanding.jsx  (S66)
   Omdøbt fra CD's OpretForeningPage.jsx mod filnavns-kollision med
   den eksisterende wizard-fil i src/pages/. Ellers byte-tro.
   Rute: /opret-forening
   Fortælle-/landingsside for oprettelse. Byte-tro port af prototypen.
   Bruger de delte <SiteNav/> og <SiteFooter/> (urørt).
   Alle primære CTA'er fører til onboarding-wizarden /opret-forening/start.

   Ingen submitting <form>. Intern navigation via <Link>.
   In-page scroll til de fem trin sker via #flow-anker (samme side).
   =================================================================== */

import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/marketing/SiteNav";
import SiteFooter from "@/components/marketing/SiteFooter";
import "./OpretForeningLanding.css";
import {SETUP_TASKS} from "../../../shared/association-onboarding";

/* Ikon-hjælper (inline SVG) */
function Icon({ d, size = 16, sw = 2, color, fill = "none" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color || "currentColor"}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: d }} />
  );
}
const ARROW = '<path d="M5 12h14M13 6l6 6-6 6"/>';
const CHECK = '<path d="M20 6 9 17l-5-5"/>';
const CHEV = '<path d="m9 6 6 6-6 6"/>';

/* Fem opgaver efter registreringen; samme rækkefølge som AdminV2. */
const STEP_ICONS = [
 '<circle cx="12" cy="8" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',
 '<circle cx="9" cy="8" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M17 5a3 3 0 0 1 0 6M22 21v-3a7 7 0 0 0-4-6"/>',
 '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
 '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 14h6"/>',
 '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 10h20"/>',
];
const ALL_STEPS=SETUP_TASKS.map((task,i)=>({n:String(i+1).padStart(2,'0'),title:task.title,body:task.description,icon:STEP_ICONS[i]}));
const STEPS=ALL_STEPS.slice(0,4),STEP5=ALL_STEPS[4];

/* Prereq-tjekliste */
const PREREQS = [
  { text: "Foreningens CVR-nummer", ok: true },
  { text: "Kontaktperson med e-mail og telefon", ok: true },
  { text: "Oplysninger til foreningens MobilePay-ansøgning", ok: true },
  { text: "Tilladelsen kan registreres efter oprettelsen", ok: false },
];

/* Efter-oprettelse stepper-kort */
const AFTER = [
 {title:"Oprettelsen er klaret",body:"Jeres e-mail, foreningsoplysninger, samtykker, aftale og abonnementsvalg følger med.",tag:"Registrering",tagCls:"",icoCls:"",active:false,icon:CHECK},
 {title:"Kom godt i gang",body:"Se de fem opsætningsopgaver. Gemte oplysninger bestemmer, hvad I mangler.",tag:"Jeres opgaver",tagCls:"brand",icoCls:"brand",active:true,icon:'<path d="M9 6h12M9 12h12M9 18h12M3 6h.01M3 12h.01M3 18h.01"/>'},
 {title:"Afventer behandling",body:"Indsendte ansøgninger står særskilt. I kan gøre profil og hjertesager klar imens.",tag:"Ventestatus",tagCls:"",icoCls:"",active:false,icon:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'},
 {title:"Del, når I er klar",body:"Offentlig indsamling åbner, når tilladelse, betaling og den offentlige profil er klar.",tag:"Aktivt valg",tagCls:"",icoCls:"",active:false,icon:ARROW},
];

/* FAQ */
const FAQ = [
  { q: "Hvad koster det at oprette foreningen?", a: "Selve oprettelsen er gratis. I vælger abonnement undervejs og kan ændre det senere." },
  { q: "Hvornår er kontoen aktiv?", a: "Efter oprettelsen får I adgang til Kom godt i gang. Offentlig indsamling kræver en gyldig tilladelse, klar betaling og en offentlig profil." },
  { q: "Skal vi have journalnummer klar?", a: "Nej. Journalnummer kan tilføjes senere, før en offentlig hjertesag offentliggøres." },
  { q: "Skal støtter oprette profil for at støtte?", a: "Nej. Støtter bruger MobilePay-appen og skal ikke oprette profil for at give et bidrag." },
];

export default function OpretForeningLanding() {
  return (
    <div className="of-page">
      <SiteNav />

      <a id="top" />

      {/* ===== HERO ===== */}
      <section className="of-wrap of-hero">
        <div className="of-hero-inner">
          <div className="of-hero-anim">
            <div className="of-pill">
              <span className="of-pill-dot" />
              <span className="of-pill-txt">Opret forening</span>
            </div>
            <h1 className="of-h1">Opret jeres forening på StøtMedHjerte.</h1>
            <p className="of-hero-sub">Bekræft jeres e-mail, opret foreningen og vælg abonnement. Derefter guider Kom godt i gang jer gennem opsætningen.</p>
            <div className="of-cta-row of-hero-cta" style={{ marginBottom: 30, justifyContent: "center" }}>
              <Link to="/opret-forening/start" className="of-btn-primary of-cta-w of-hero-btn-lg">
                Start oprettelsen<Icon d={ARROW} size={18} sw={2.4} />
              </Link>
              <a href="#flow" className="of-btn-ghost of-cta-w of-hero-ghost-lg">Se de fem trin</a>
            </div>
            <div className="of-trust-row">
              <span className="of-trust"><Icon d={CHECK} size={15} sw={2.6} color="var(--success)" />CVR-valideret</span>
              <span className="of-trust"><Icon d={CHECK} size={15} sw={2.6} color="var(--success)" />Direkte til MobilePay</span>
              <span className="of-trust"><Icon d={CHECK} size={15} sw={2.6} color="var(--success)" />Ingen andel af donationer</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEM TRIN (spine) ===== */}
      <section className="of-sec-alt">
        <a id="flow" className="of-anchor" />
        <div className="of-wrap of-sec">
          <div className="of-sec-head">
            <div className="of-eyebrow brand">Sådan kommer I i gang</div>
            <h2 className="of-h2">Efter oprettelsen: fem overskuelige opgaver.</h2>
            <p className="of-sec-lead">Jeres registrerede oplysninger følger med. I får én opgaveliste med præcis det, der mangler, og kan fortsætte senere.</p>
          </div>

          <div className="of-spine">
            {STEPS.map((st, i) => (
              <React.Fragment key={st.n}>
                <div className="of-spine-card">
                  <div className="of-spine-top">
                    <span className="of-step-badge"><Icon d={st.icon} size={21} sw={2} /></span>
                    <span className="of-step-num">{st.n}</span>
                  </div>
                  <h3>{st.title}</h3>
                  <p>{st.body}</p>
                </div>
                <div className="of-chev"><Icon d={CHEV} size={20} sw={2.4} /></div>
              </React.Fragment>
            ))}
            <div className="of-spine-card accent">
              <div className="of-spine-top">
                <span className="of-step-badge fill"><Icon d={STEP5.icon} size={21} sw={2} color="var(--brand)" /></span>
                <span className="of-step-num accent">{STEP5.n}</span>
              </div>
              <h3>{STEP5.title}</h3>
              <p>{STEP5.body}</p>
            </div>
          </div>

          <div className="of-center-link">
            <Link to="/saadan-virker-det" className="of-textlink">Se hvordan platformen virker<Icon d={ARROW} size={17} sw={2.4} /></Link>
          </div>
        </div>
      </section>

      {/* ===== OPRETTELSE I PRAKSIS (4:5 foto) ===== */}
      <section className="of-wrap of-sec">
        <div className="of-praksis">
          <figure className="of-figure">
            <div className="of-figure-glow" />
            <div className="of-photo-frame">
              <img className="of-photo" src="/images/opret-forening-administrator-laptop.jpg"
                alt="Foreningsadministrator eller frivillig sætter foreningen op ved sin laptop" />
            </div>
            <div className="of-float-badge">
              <Icon d='<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>' size={14} sw={2.6} color="var(--success)" />Klar på få minutter
            </div>
          </figure>

          <div>
            <div className="of-eyebrow label">Oprettelse i praksis</div>
            <h2 className="of-h2-sub">Det meste er sat op, før kaffen er kold.</h2>
            <p className="of-praksis-lead">Den person, der opretter foreningen, bliver foreningsadministrator og styrer teamets adgang. Rollen som formand eller kasserer er en separat oplysning.</p>

            <div className="of-prereq">
              {PREREQS.map((p, i) => (
                <div className="of-prereq-item" key={i}>
                  {p.ok
                    ? <Icon d={CHECK} size={19} sw={2.4} color="var(--success)" />
                    : <Icon d='<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>' size={19} sw={2.4} color="var(--label)" />}
                  <span>{p.text}</span>
                </div>
              ))}
            </div>

            <Link to="/tilladelse-og-regnskab" className="of-textlink">Læs om tilladelse og regnskab<Icon d={ARROW} size={17} sw={2.4} /></Link>
          </div>
        </div>
      </section>

      {/* ===== HVAD SKER DER EFTER (stepper-UI) ===== */}
      <section className="of-sec-alt">
        <div className="of-wrap of-sec">
          <div className="of-sec-head" style={{ marginBottom: 40 }}>
            <div className="of-eyebrow label">Efter oprettelse</div>
            <h2 className="of-h2">Hvad sker der, når I har oprettet jer?</h2>
            <p className="of-sec-lead">Først opretter I foreningen. Derefter klargør I den i Kom godt i gang, mens eventuelle ansøgninger behandles.</p>
          </div>

          <figure className="of-panel-fig">
            <div className="of-panel">
              <div className="of-panel-head">
                <div className="of-dots"><span className="of-dot" /><span className="of-dot" /><span className="of-dot" /></div>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginLeft: 6 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: "linear-gradient(135deg,#243B57,#0B1424)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon d='<path d="M3 14c2 1 4 1 6 0M3 18c2 1 4 1 6 0M15 7v10M19 7v10"/>' size={14} sw={2} color="#fff" />
                  </div>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", letterSpacing: "-.2px" }}>Eksempel på opsætning</span>
                </div>
                <span className="of-panel-badge"><span className="of-panel-badge-dot" />Kom godt i gang</span>
              </div>

              <div className="of-panel-body">
                <div className="of-after">
                  {AFTER.map((c, i) => (
                    <div className={"of-after-card" + (c.active ? " active" : "")} key={i}>
                      <div className="of-after-top">
                        <span className={"of-after-ico" + (c.icoCls ? " " + c.icoCls : "")}><Icon d={c.icon} size={20} sw={2} /></span>
                        <span className={"of-after-tag" + (c.tagCls ? " " + c.tagCls : "")}>{c.tag}</span>
                      </div>
                      <h3>{c.title}</h3>
                      <p>{c.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </figure>

          <div className="of-cta-row" style={{ justifyContent: "center", marginTop: 40 }}>
            <Link to="/priser" className="of-btn-primary of-cta-w" style={{ fontSize: 15.5, padding: "15px 30px", minHeight: 52, boxShadow: "0 12px 30px rgba(224,25,63,.22)" }}>Se priser</Link>
            <Link to="/hjertesager" className="of-btn-ghost of-cta-w" style={{ fontSize: 15.5, padding: "15px 28px", minHeight: 52 }}>Find inspiration i hjertesager</Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="of-wrap of-sec">
        <div className="of-faq-head">
          <div className="of-eyebrow label">FAQ for oprettelse</div>
          <h2 className="of-h2-faq">Spørgsmål inden I opretter jer.</h2>
        </div>
        <div className="of-faq-grid">
          {FAQ.map((f, i) => (
            <div className="of-faq-card" key={i}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="of-wrap of-final">
        <div className="of-final-card">
          <div className="of-final-glow" />
          <div className="of-final-inner">
            <h2>Klar til at oprette jeres forening?</h2>
            <p>Efter oprettelsen gemmes jeres opsætning, så I kan vende tilbage og fortsætte.</p>
            <div className="of-cta-row" style={{ justifyContent: "center" }}>
              <Link to="/opret-forening/start" className="of-btn-primary of-cta-w of-final-btn">
                Start oprettelsen<Icon d={ARROW} size={18} sw={2.4} />
              </Link>
              <Link to="/kontakt" className="of-final-ghost of-cta-w">Tal med os først</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
