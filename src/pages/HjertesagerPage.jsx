import { useState, useMemo, useRef } from 'react';
import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';
import AnimationStyles from '../components/hjertesager/AnimationStyles';
import HjertesagerHero from '../components/hjertesager/HjertesagerHero';
import SearchFilter from '../components/hjertesager/SearchFilter';
import CampaignList from '../components/hjertesager/CampaignList';
import HjertesagerInfoSection from '../components/hjertesager/HjertesagerInfoSection';
import CampaignDetail from '../components/hjertesager/CampaignDetail';
import DonationPage from '../components/hjertesager/DonationPage';

const CAMPAIGNS = [
  {
    id: 1,
    title: 'Støt børnenes sport',
    association: 'Heartland United',
    type: 'Fodbold',
    city: 'Hillerød',
    zip: '3400',
    verified: true,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    ],
    desc: 'Heartland United samler ind via StøtMedHjerte for at give vores børn mulighed for at deltage i fodboldrejser, turneringer og stævner i hele Danmark. Vores klub har eksisteret i over 15 år og har altid prioriteret fællesskabet og det sociale sammenhold lige så højt som de sportslige resultater. Hvert år sender vi hold til ungdomsturneringer i både ind- og udland, men de stigende transportomkostninger og deltagergebyrer gør det sværere for mange familier at følge med. Med denne hjertesag ønsker vi at sikre, at ingen børn holdes ude af holdet på grund af økonomi. Pengene går direkte til rejseudgifter, overnatning og turneringsgebyrer, så alle børn får chancen for at opleve glæden ved at spille bold sammen med deres holdkammerater.',
    raised: 15200,
    goal: 25000,
  },
  {
    id: 2,
    title: 'Støtte til afvikling af vores aktiviteter',
    association: 'Vennernes Klub',
    type: 'Handicap / Special',
    city: 'Gentofte',
    zip: '2820',
    verified: true,
    image: null,
    images: [],
    desc: 'Din støtte hjælper os med at lave flere aktiviteter og udvikle nye tilbud til vores medlemmer. Vi arbejder hver dag for at styrke fællesskabet og skabe trygge rammer for børn med autisme, ADHD og andre udviklingsforstyrrelser. Vores frivillige ildsjæle bruger utallige timer på at sikre, at alle børn føler sig set og inkluderet. Med din hjælp kan vi ansætte flere specialuddannede pædagoger, udvide vores tilbud og nå endnu flere familier, der har brug for os. Hver krone gør en forskel.',
    raised: 8400,
    goal: 30000,
  },
  {
    id: 3,
    title: 'Nye redskaber til gymnastikken',
    association: 'Skjold Birkerød',
    type: 'Gymnastik',
    city: 'Birkerød',
    zip: '3460',
    verified: true,
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    ],
    desc: 'Vi samler ind til nye redskaber og udstyr til vores gymnastikhold. Vores nuværende materiel er slidt og trænger hårdt til udskiftning, og sikkerheden for vores gymnaster er altafgørende. Bidragene går direkte til trampoliner, landingsmåtter, springredskaber og bom. Med nyt udstyr kan vi tilbyde endnu bedre træning til vores over 120 aktive medlemmer og tage imod endnu flere børn, der ønsker at prøve kræfter med gymnastiksportens glæder.',
    raised: 12800,
    goal: 20000,
  },
  {
    id: 4,
    title: 'Svømmestævner 2026',
    association: 'Hillerød Svømmeklub',
    type: 'Svømmeklub',
    city: 'Hillerød',
    zip: '3400',
    verified: true,
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    ],
    desc: 'Hjælp vores svømmere til stævner i hele landet. Vores klub har haft fremragende resultater de seneste sæsoner, og vi ønsker at give endnu flere unge svømmere mulighed for at konkurrere på højt niveau. Bidragene dækker transport til stævnerne, startgebyr, overnatning og forplejning for børn og unge i alderen 8 til 18 år. Ingen svømmer skal blive hjemme på grund af manglende midler.',
    raised: 5600,
    goal: 15000,
  },
  {
    id: 5,
    title: 'Håndbold for alle',
    association: 'Køge Håndbold',
    type: 'Håndbold',
    city: 'Køge',
    zip: '4600',
    verified: true,
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    ],
    desc: 'Vi vil gøre håndbold tilgængeligt for alle børn i Køge, uanset økonomi eller baggrund. Håndbold handler om mere end sport: det handler om venskaber, sammenhold og fælles oplevelser. Din støtte går direkte til nyt udstyr, kontingenthjælp til familier med stramme budgetter og sociale arrangementer, der binder holdet sammen. Hjælp os med at sikre, at ingen barn udelukkes fra fællesskabet.',
    raised: 3200,
    goal: 10000,
  },
  {
    id: 6,
    title: 'Karate Camp 2026',
    association: 'Allerød Karate',
    type: 'Kampsport',
    city: 'Allerød',
    zip: '3450',
    verified: true,
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    ],
    desc: 'Støt vores årlige karate-lejr for børn og unge. En hel uge med intensiv træning, fællesskab og personlig udvikling under kyndige instruktørers vejledning. Lejren er et fast holdepunkt i vores kalender og noget, alle vores elever ser frem til hele året. Her bygges der ikke blot tekniske færdigheder, men også selvtillid, disciplin og respekt. Med din støtte kan vi holde deltagerprisen lav og sikre, at alle kan være med.',
    raised: 9800,
    goal: 12000,
  },
];

export default function HjertesagerPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donatingCampaign, setDonatingCampaign] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Alle');
  const [viewMode, setViewMode] = useState('grid');
  const listRef = useRef(null);

  const filtered = useMemo(() => {
    return CAMPAIGNS.filter(c => {
      const matchesSearch = !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.association.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === 'Alle' || c.type === category;
      return matchesSearch && matchesCat;
    });
  }, [search, category]);

  const uniqueAssociations = new Set(CAMPAIGNS.map(c => c.association)).size;

  if (donatingCampaign) {
    return (
      <div style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
        <AnimationStyles />
        <DonationPage campaign={donatingCampaign} onBack={() => setDonatingCampaign(null)} />
      </div>
    );
  }

  if (selectedCampaign) {
    return (
      <div style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
        <AnimationStyles />
        <CampaignDetail
          campaign={selectedCampaign}
          onBack={() => setSelectedCampaign(null)}
          onDonate={(c) => setDonatingCampaign(c)}
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <AnimationStyles />
      <Navbar />

      <HjertesagerHero
        campaignCount={CAMPAIGNS.length}
        associationCount={uniqueAssociations}
        onScrollToList={() => listRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onHowItWorks={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
      />

      <div style={{ padding: '40px 0 0' }} ref={listRef}>
        <SearchFilter
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
        />
      </div>

      <CampaignList
        campaigns={filtered}
        onSelect={setSelectedCampaign}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <HjertesagerInfoSection />
      <Footer />
    </div>
  );
}