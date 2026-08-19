/**
 * useApplications — Uygulamanın tek veri kaynağı (CRUD işlemleri)
 *
 * Yönergede istenen dört işlem burada tanımlanır:
 *   EKLE      → addApplication
 *   LİSTELE   → applications + selectApplications (filtre/sıralama ile)
 *   GÜNCELLE  → updateApplication / advanceStatus
 *   SİL       → removeApplication
 *
 * Veriler `useLocalStorage` üzerinden tarayıcının LocalStorage'ında saklanır.
 */

import { createContext, useCallback, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type {
  Application,
  ApplicationDraft,
  FilterState,
} from '../interfaces/Application';
import type { Status } from '../interfaces/Status';
import { STATUS_META, STATUS_ORDER } from '../interfaces/Status';
import { useLocalStorage } from './useLocalStorage';
import { SEED_APPLICATIONS } from '../lib/seed';

const STORAGE_KEY = 'kariyer-panosu:applications';

interface ApplicationsContextValue {
  applications: Application[];
  addApplication: (draft: ApplicationDraft) => Application;
  updateApplication: (id: string, draft: ApplicationDraft) => void;
  advanceStatus: (id: string) => void;
  removeApplication: (id: string) => void;
  getApplication: (id: string) => Application | undefined;
  selectApplications: (filters: FilterState) => Application[];
  counts: Record<Status | 'all', number>;
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(null);

/** Tarayıcı desteklemiyorsa yedek id üreteci */
function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `app-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useLocalStorage<Application[]>(
    STORAGE_KEY,
    SEED_APPLICATIONS
  );

  /** EKLE — yeni başvuru kaydı oluşturur */
  const addApplication = useCallback(
    (draft: ApplicationDraft) => {
      const now = new Date().toISOString();
      const created: Application = { ...draft, id: createId(), createdAt: now, updatedAt: now };
      setApplications((current) => [created, ...current]);
      return created;
    },
    [setApplications]
  );

  /** GÜNCELLE — mevcut kaydın tüm alanlarını yeniler */
  const updateApplication = useCallback(
    (id: string, draft: ApplicationDraft) => {
      setApplications((current) =>
        current.map((item) =>
          item.id === id ? { ...item, ...draft, updatedAt: new Date().toISOString() } : item
        )
      );
    },
    [setApplications]
  );

  /** GÜNCELLE (hızlı) — durumu akıştaki bir sonraki aşamaya taşır */
  const advanceStatus = useCallback(
    (id: string) => {
      setApplications((current) =>
        current.map((item) => {
          if (item.id !== id) return item;
          const next = STATUS_META[item.status].next;
          if (!next) return item;
          return { ...item, status: next, updatedAt: new Date().toISOString() };
        })
      );
    },
    [setApplications]
  );

  /** SİL — kaydı listeden kaldırır */
  const removeApplication = useCallback(
    (id: string) => {
      setApplications((current) => current.filter((item) => item.id !== id));
    },
    [setApplications]
  );

  const getApplication = useCallback(
    (id: string) => applications.find((item) => item.id === id),
    [applications]
  );

  /** LİSTELE — arama, durum filtresi ve sıralama uygulanmış liste */
  const selectApplications = useCallback(
    (filters: FilterState) => {
      const needle = filters.search.trim().toLocaleLowerCase('tr');

      let result = applications.filter((item) => {
        const matchesStatus = filters.status === 'all' || item.status === filters.status;
        const matchesSearch =
          needle.length === 0 ||
          item.company.toLocaleLowerCase('tr').includes(needle) ||
          item.position.toLocaleLowerCase('tr').includes(needle) ||
          item.location.toLocaleLowerCase('tr').includes(needle);
        return matchesStatus && matchesSearch;
      });

      result = [...result].sort((a, b) => {
        if (filters.sort === 'company') return a.company.localeCompare(b.company, 'tr');
        const diff = new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime();
        return filters.sort === 'oldest' ? diff : -diff;
      });

      return result;
    },
    [applications]
  );

  const counts = useMemo(() => {
    const base = { all: applications.length } as Record<Status | 'all', number>;
    for (const status of STATUS_ORDER) {
      base[status] = applications.filter((item) => item.status === status).length;
    }
    return base;
  }, [applications]);

  const value = useMemo<ApplicationsContextValue>(
    () => ({
      applications,
      addApplication,
      updateApplication,
      advanceStatus,
      removeApplication,
      getApplication,
      selectApplications,
      counts,
    }),
    [
      applications,
      addApplication,
      updateApplication,
      advanceStatus,
      removeApplication,
      getApplication,
      selectApplications,
      counts,
    ]
  );

  return (
    <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>
  );
}

export function useApplications(): ApplicationsContextValue {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error('useApplications, ApplicationsProvider içinde kullanılmalıdır.');
  }
  return context;
}
