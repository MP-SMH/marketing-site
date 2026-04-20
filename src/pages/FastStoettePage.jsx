import { useState, useRef, useCallback } from 'react';
import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';
import Hero from '../components/faststoette/Hero';
import SearchFilter from '../components/faststoette/SearchFilter';
import AssociationList from '../components/faststoette/AssociationList';
import InfoSection from '../components/faststoette/InfoSection';
import AnimationStyles from '../components/faststoette/AnimationStyles';

const ORGS = [
  { id: 1, name: 'Vennernes Klub', type: 'Handicap / Special', zip: '2820', city: 'Gentofte', verified: true, supporters: 23, desc: 'Den månedlige støtte går direkte til at holde vores fællesskab levende - fx aktiviteter, udstyr og de små ting i hverdagen, der gør en stor forskel for vores børn og familier.' },
  { id: 2, name: 'Heartland United', type: 'Fodbold', zip: '3400', city: 'Hillerød', verified: true, supporters: 41, desc: 'Din faste støtte styrker fællesskabet i klubben. Den hjælper os med at arrangere træningsdage, stævner og sociale aktiviteter for børn, unge og voksne hele året rundt.' },
  { id: 3, name: 'MK01 Motion', type: 'Løb / Motion', zip: '7000', city: 'Fredericia', verified: false, supporters: 0, desc: 'Din støtte giver vores frivillige forening tryghed til at starte nye arrangementer og skabe rammer for motion og fællesskab i lokalområdet.' },
  { id: 4, name: 'Skjold Birkerød', type: 'Gymnastik', zip: '3460', city: 'Birkerød', verified: true, supporters: 67, desc: 'Støt gymnastikken i Birkerød. Bidragene går til nye redskaber, stævner og sjove oplevelser der samler børn og voksne i foreningen.' },
  { id: 5, name: 'Albertslund IF', type: 'Fodbold', zip: '2620', city: 'Albertslund', verified: true, supporters: 18, desc: 'Støt lokal fodbold i Albertslund. Bidragene går til træningstøj, stævner og det fællesskab der samler alle aldersgrupper i klubben.' },
  { id: 6, name: 'Hillerød Svømmeklub', type: 'Svømmeklub', zip: '3400', city: 'Hillerød', verified: true, supporters: 34, desc: 'Støt svømmerne i Hillerød. Bidragene går til træning, udstyr og konkurrencer for alle niveauer - fra motionist til konkurrencesvømmer.' },
  { id: 7, name: 'Køge Håndbold', type: 'Håndbold', zip: '4600', city: 'Køge', verified: true, supporters: 52, desc: 'Støt håndbold i Køge. Vi træner og deltager i turneringer for alle aldre. Din støtte gør det muligt at udvikle klubben og skabe glæde.' },
  { id: 8, name: 'Allerød Karate', type: 'Kampsport', zip: '3450', city: 'Allerød', verified: true, supporters: 15, desc: 'Støt kampsport i Allerød. Vi træner karate, judo og selvforsvar for alle aldre. Din støtte går til udstyr, træningslejre og fællesskab.' },
];

const ALL_CATEGORIES = [
  { name: 'Fodbold', color: '#16a34a' }, { name: 'Håndbold', color: '#ea580c' },
  { name: 'Gymnastik', color: '#7c3aed' }, { name: 'Svømmeklub', color: '#0284c7' },
  { name: 'Kampsport', color: '#dc2626' }, { name: 'Løb / Motion', color: '#b45309' },
  { name: 'Handicap / Special', color: '#0891b2' }, { name: 'Badminton', color: '#0d9488' },
  { name: 'Tennis', color: '#0369a1' }, { name: 'Volleyball', color: '#a16207' },
  { name: 'Cykling', color: '#be123c' }, { name: 'Dans', color: '#a21caf' },
  { name: 'Atletik', color: '#4338ca' }, { name: 'Boksning', color: '#991b1b' },
  { name: 'E-sport', color: '#4f46e5' }, { name: 'Ridning', color: '#7c2d12' },
  { name: 'Roning', color: '#155e75' }, { name: 'Sejlsport', color: '#1e40af' },
  { name: 'Golf', color: '#166534' }, { name: 'Bordtennis', color: '#9333ea' },
  { name: 'Klatring', color: '#92400e' }, { name: 'Kor / Sang', color: '#7e22ce' },
  { name: 'Teater', color: '#a21caf' }, { name: 'Musik', color: '#6d28d9' },
  { name: 'Spejder', color: '#166534' }, { name: 'Natur / Friluft', color: '#15803d' },
  { name: 'Humanitær', color: '#b91c1c' }, { name: 'Lokal / Borger', color: '#0e7490' },
  { name: 'Dyrebeskyttelse', color: '#b45309' }, { name: 'NGO', color: '#4338ca' },
];

const POPULAR_CATEGORIES = ALL_CATEGORIES.slice(0, 7);

export default function FastStoettePage() {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const listRef = useRef(null);
  const infoRef = useRef(null);

  const scrollToList = () => {
    const el = listRef.current;
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  const scrollToInfo = () => infoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const toggleCategory = useCallback((catName) => {
    setSelectedCategories(prev =>
      prev.includes(catName)
        ? prev.filter(c => c !== catName)
        : [...prev, catName]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSearch('');
  }, []);

  const filtered = ORGS.filter(org => {
    const matchesSearch = !search ||
      org.name.toLowerCase().includes(search.toLowerCase()) ||
      org.city.toLowerCase().includes(search.toLowerCase()) ||
      org.zip.includes(search);
    const matchesCategory = selectedCategories.length === 0 ||
      selectedCategories.includes(org.type);
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <AnimationStyles />
      <Navbar />
      <Hero onScrollToList={scrollToList} onScrollToInfo={scrollToInfo} />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ marginTop: 48 }}>
          <div ref={listRef} style={{ position: 'relative', top: -20 }} />
          <SearchFilter
            search={search}
            setSearch={setSearch}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            clearFilters={clearFilters}
            showAllCategories={showAllCategories}
            setShowAllCategories={setShowAllCategories}
            popularCategories={POPULAR_CATEGORIES}
            allCategories={ALL_CATEGORIES}
          />
        </div>
        <AssociationList orgs={filtered} allCategories={ALL_CATEGORIES} clearFilters={clearFilters} />
        <InfoSection sectionRef={infoRef} onScrollToList={scrollToList} />
      </div>
      <Footer />
    </div>
  );
}