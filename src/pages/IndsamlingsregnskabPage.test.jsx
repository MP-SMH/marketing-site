import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// supabaseClient kaster ved import hvis VITE_SUPABASE-variablerne mangler.
// Mockes med en tom klient, saa testen koerer uden .env og uden netvaerk.
vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    from: vi.fn(),
    auth: { getSession: vi.fn().mockResolvedValue({ data: { session: null } }) },
  },
  SMH_API_URL: 'https://api.test',
}));

import IndsamlingsregnskabPage from './IndsamlingsregnskabPage';

const UUID = '11111111-2222-3333-4444-555555555555';

function detalje(regnskab) {
  return {
    forening: { navn: 'Testforening', paragraf: 'paragraf_3', by: 'København' },
    regnskab: { status: 'offentliggjort', indsamlet_oere: 250000, ...regnskab },
    linjer: [],
    erstattet_af: null,
    erklaeringer: [],
  };
}

function mockFetch(data) {
  global.fetch = vi.fn(() =>
    Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(data) })
  );
}

function renderSiden() {
  return render(
    <MemoryRouter initialEntries={[`/indsamlingsregnskab/${UUID}`]}>
      <Routes>
        <Route path="/indsamlingsregnskab/:id" element={<IndsamlingsregnskabPage />} />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => {
  // globals:false slaar Testing Librarys auto-cleanup fra, saa DOM ryddes
  // eksplicit mellem tests. Ellers hober rendret markup sig op paa tvaers.
  cleanup();
  vi.restoreAllMocks();
});

describe('IndsamlingsregnskabPage - dokumentknapper', () => {
  it('case 1: viser begge knapper med korrekte href', async () => {
    mockFetch(
      detalje({
        fil_url: 'https://x/regnskab.pdf',
        revideret_fil_url: 'https://x/revideret.pdf',
      })
    );
    renderSiden();

    const regnskab = await screen.findByRole('link', { name: /Se regnskabet/i });
    expect(regnskab).toHaveAttribute('href', 'https://x/regnskab.pdf');

    const revideret = await screen.findByRole('link', { name: /Se revisors påtegning/i });
    expect(revideret).toHaveAttribute('href', 'https://x/revideret.pdf');
  });

  it('case 2: uden revideret_fil_url vises kun "Se regnskabet"', async () => {
    mockFetch(detalje({ fil_url: 'https://x/regnskab.pdf', revideret_fil_url: null }));
    renderSiden();

    await screen.findByRole('link', { name: /Se regnskabet/i });
    expect(screen.queryByRole('link', { name: /Se revisors påtegning/i })).toBeNull();
  });

  it('case 3: erstattet uden fil_url og revideret_fil_url viser ingen knapper', async () => {
    mockFetch(detalje({ status: 'erstattet', fil_url: null, revideret_fil_url: null }));
    renderSiden();

    await screen.findByRole('heading', { name: /Testforening/i });
    expect(screen.queryByRole('link', { name: /Se regnskabet/i })).toBeNull();
    expect(screen.queryByRole('link', { name: /Se revisors påtegning/i })).toBeNull();
  });
});
