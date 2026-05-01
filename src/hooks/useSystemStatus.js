/**
 * useSystemStatus - Forberedt dynamisk system-status indicator
 *
 * Bruges til "ALLE SYSTEMER KØRER"-indikatoren i top-nav paa auth-sider.
 *
 * NUVAERENDE IMPLEMENTATION (P2-006a, april 2026):
 * - Hardcoded 'operational' status
 * - Returnerer fast label paa dansk
 *
 * FREMTIDIG IMPLEMENTATION (tracked som tech-debt):
 * - Fetch GET /api/health fra smh-api
 * - Polling hver 60 sekunder (ikke ved hvert page-load)
 * - States: 'operational' | 'degraded' | 'outage' | 'unknown'
 * - Caching i sessionStorage for at undgaa race conditions
 *
 * Migration-noter naar /api/health bygges:
 * 1. smh-api endpoint skal returnere { status, services: { database, email, payment } }
 * 2. Erstat HARDCODED_STATUS med useEffect + fetch
 * 3. Alle auth-sider opdateres automatisk (bruger samme hook)
 *
 * Reference: docs/strategy/auth-strategy.md tech-debt
 */

import { useState } from 'react';

// Hardcoded fallback (erstattes med fetch i fremtidig implementation)
const HARDCODED_STATUS = {
  status: 'operational',
  label: 'ALLE SYSTEMER KØRER',
  color: '#22C55E',
};

const STATUS_CONFIG = {
  operational: {
    label: 'ALLE SYSTEMER KØRER',
    color: '#22C55E',
  },
  degraded: {
    label: 'DELVIS DRIFT',
    color: '#F59E0B',
  },
  outage: {
    label: 'TEKNISK FEJL',
    color: '#EF4444',
  },
  unknown: {
    label: 'STATUS UKENDT',
    color: '#6B7280',
  },
};

export function useSystemStatus() {
  // I fremtidig implementation: useState(null) + useEffect med fetch
  const [status] = useState(HARDCODED_STATUS.status);

  return {
    status,
    label: STATUS_CONFIG[status]?.label || HARDCODED_STATUS.label,
    color: STATUS_CONFIG[status]?.color || HARDCODED_STATUS.color,
    isOperational: status === 'operational',
  };
}
