/**
 * ApplicationCard — Bir başvuru kaydının defter satırı görünümü
 *
 * Kart üzerinden iki işlem doğrudan tetiklenebilir:
 *  - GÜNCELLEME : "Sonraki aşama" butonu ile durum ilerletme
 *  - SİLME      : Sil butonu (onay penceresi açar)
 * Tam düzenleme için kayıt formuna yönlendirilir.
 */

import { Link } from 'react-router-dom';
import type { Application } from '../interfaces/Application';
import { STATUS_META } from '../interfaces/Status';
import { StatusBadge } from './StatusBadge';
import { daysSince, formatDate } from '../lib/format';

interface Props {
  application: Application;
  index: number;
  onAdvance: (application: Application) => void;
  onDelete: (application: Application) => void;
}

export function ApplicationCard({ application, index, onAdvance, onDelete }: Props) {
  const meta = STATUS_META[application.status];

  return (
    <article
      className="animate-rise group relative border border-ink-700 bg-ink-850/60 transition-colors hover:border-ink-600 hover:bg-ink-850"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      {/* Sol kenardaki durum şeridi */}
      <span
        className={`absolute inset-y-0 left-0 w-0.5 ${meta.accentClass}`}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-5 p-5 pl-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.18em] text-bone-500">
              {String(index + 1).padStart(2, '0')}
            </span>
            <StatusBadge status={application.status} />
          </div>

          <h3 className="mt-3 font-display text-2xl leading-tight font-semibold text-bone-50">
            {application.position}
          </h3>
          <p className="mt-1 text-sm text-ochre-300">{application.company}</p>

          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[10px] tracking-[0.12em] text-bone-500 uppercase">
            <li>{application.location}</li>
            <li aria-hidden="true">·</li>
            <li>{application.source}</li>
            <li aria-hidden="true">·</li>
            <li>
              {formatDate(application.appliedAt)} ({daysSince(application.appliedAt)})
            </li>
          </ul>

          {application.notes ? (
            <p className="mt-4 border-l border-ink-700 pl-4 text-sm leading-relaxed text-bone-300">
              {application.notes}
            </p>
          ) : null}
        </div>

        {/* İşlem butonları */}
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-stretch">
          {meta.next ? (
            <button
              type="button"
              onClick={() => onAdvance(application)}
              className="cursor-pointer border border-ochre-400/50 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-ochre-300 uppercase transition-colors hover:bg-ochre-400 hover:text-ink-950"
            >
              → {STATUS_META[meta.next].label}
            </button>
          ) : null}

          <Link
            to={`/basvuru/${application.id}`}
            className="border border-ink-600 px-3 py-1.5 text-center font-mono text-[10px] tracking-[0.14em] text-bone-300 uppercase transition-colors hover:border-bone-500 hover:text-bone-50"
          >
            Düzenle
          </Link>

          <button
            type="button"
            onClick={() => onDelete(application)}
            className="cursor-pointer border border-ink-600 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-bone-500 uppercase transition-colors hover:border-brick hover:text-brick"
          >
            Sil
          </button>
        </div>
      </div>
    </article>
  );
}
