import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SMH_API_URL } from '../lib/supabaseClient';
import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';

/**
 * Offentlig hjertesagsside. Rute: /hjertesag/:slug
 *
 * Data hentes fra smh-api (GET /api/public/hjertesag/:slug), IKKE fra
 * Supabase i browseren: RLS kraever rollen supporter, og stoettere logger
 * aldrig ind.
 *
 * DEL 1 af 4: skelet og datahentning. Design foelger i del 2-4.
 */
export default function HjertesagPage() {
  const { slug } = useParams();

  const [status, setStatus] = useState('indlaeser');
  const [hjertesag, setHjertesag] = useState(null);
  const [forening, setForening] = useState(null);

  useEffect(() => {
    let afbrudt = false;

    async function hent() {
      setStatus('indlaeser');

      try {
        const svar = await fetch(
          `${SMH_API_URL}/api/public/hjertesag/${encodeURIComponent(slug)}`
        );

        if (afbrudt) return;

        if (svar.status === 404) {
          setStatus('findes-ikke');
          return;
        }

        if (!svar.ok) {
          setStatus('fejl');
          return;
        }

        const data = await svar.json();
        if (afbrudt) return;

        setHjertesag(data.hjertesag);
        setForening(data.forening);
        setStatus('klar');
      } catch {
        if (!afbrudt) setStatus('fejl');
      }
    }

    hent();

    return () => {
      afbrudt = true;
    };
  }, [slug]);

  return (
    <>
      <Navbar />

      <main style={{ minHeight: '60vh', padding: '48px 20px', maxWidth: 960, margin: '0 auto' }}>
        {status === 'indlaeser' && <p>Henter hjertesagen…</p>}

        {status === 'findes-ikke' && (
          <div>
            <h1>Vi kunne ikke finde denne hjertesag</h1>
            <p>Den er måske afsluttet, eller linket kan være forkert.</p>
          </div>
        )}

        {status === 'fejl' && (
          <div>
            <h1>Noget gik galt</h1>
            <p>Vi kunne ikke hente hjertesagen lige nu. Prøv igen om et øjeblik.</p>
          </div>
        )}

        {status === 'klar' && hjertesag && forening && (
          <div>
            <h1>{hjertesag.kampagnenavn}</h1>
            <p>{forening.foreningsnavn}</p>
            <p>{hjertesag.kort_beskrivelse}</p>
            <p>
              Indsamlet {hjertesag.indsamlet_beloeb} kr af {hjertesag.maalbeloeb} kr
            </p>
            {!forening.payment_ready && (
              <p>Denne forening kan ikke modtage donationer endnu.</p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
