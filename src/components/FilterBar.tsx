/**
 * FilterBar — LİSTELEME işleminin arama, filtreleme ve sıralama denetimleri
 */

import type { FilterState } from '../interfaces/Application';
import type { Status } from '../interfaces/Status';
import { STATUS_META, STATUS_ORDER } from '../interfaces/Status';

interface Props {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  counts: Record<Status | 'all', number>;
}

export function FilterBar({ filters, onChange, counts }: Props) {
  const tabs: Array<{ key: Status | 'all'; label: string }> = [
    { key: 'all', label: 'Tümü' },
    ...STATUS_ORDER.map((status) => ({ key: status, label: STATUS_META[status].label })),
  ];

  return (
    <div className="flex flex-col gap-4 border-b border-ink-700 pb-5 lg:flex-row lg:items-end lg:justify-between">
      {/* Duruma göre filtreleme */}
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Duruma göre filtrele">
        {tabs.map((tab) => {
          const isActive = filters.status === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange({ ...filters, status: tab.key })}
              className={`cursor-pointer border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors ${
                isActive
                  ? 'border-ochre-400 bg-ochre-400 text-ink-950'
                  : 'border-ink-700 text-bone-300 hover:border-ink-600 hover:text-bone-50'
              }`}
            >
              {tab.label}
              <span className={isActive ? 'ml-2 opacity-70' : 'ml-2 text-bone-500'}>
                {counts[tab.key]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Arama */}
        <label className="relative block">
          <span className="sr-only">Şirket veya pozisyon ara</span>
          <svg
            className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-bone-500"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={filters.search}
            onChange={(event) => onChange({ ...filters, search: event.target.value })}
            placeholder="Şirket veya pozisyon ara…"
            className="w-full border border-ink-700 bg-ink-850 py-2 pr-3 pl-9 text-sm text-bone-100 placeholder:text-bone-500 focus:border-ochre-400 focus:outline-none sm:w-64"
          />
        </label>

        {/* Sıralama */}
        <label className="flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.14em] text-bone-500 uppercase">
            Sırala
          </span>
          <select
            value={filters.sort}
            onChange={(event) =>
              onChange({ ...filters, sort: event.target.value as FilterState['sort'] })
            }
            className="cursor-pointer border border-ink-700 bg-ink-850 px-3 py-2 text-sm text-bone-100 focus:border-ochre-400 focus:outline-none"
          >
            <option value="newest">En yeni</option>
            <option value="oldest">En eski</option>
            <option value="company">Şirket adı</option>
          </select>
        </label>
      </div>
    </div>
  );
}
