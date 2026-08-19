/**
 * StatsPanel — Panonun üst kısmındaki künye şeridi
 *
 * Toplam kayıt, aktif süreç, mülakat ve teklif sayılarını özetler.
 */

import type { Application } from '../interfaces/Application';

interface Props {
  applications: Application[];
}

export function StatsPanel({ applications }: Props) {
  const total = applications.length;
  const interview = applications.filter((a) => a.status === 'interview').length;
  const offer = applications.filter((a) => a.status === 'offer').length;
  const active = applications.filter(
    (a) => a.status === 'applied' || a.status === 'interview'
  ).length;

  const cells = [
    { label: 'Toplam kayıt', value: total, tone: 'text-bone-50' },
    { label: 'Süreci açık', value: active, tone: 'text-slateblue' },
    { label: 'Mülakat', value: interview, tone: 'text-ochre-300' },
    { label: 'Teklif', value: offer, tone: 'text-sage' },
  ];

  return (
    <dl className="grid grid-cols-2 divide-ink-700 border-y border-ink-700 sm:grid-cols-4 sm:divide-x">
      {cells.map((cell, index) => (
        <div
          key={cell.label}
          className="animate-rise border-ink-700 px-5 py-5 max-sm:border-b max-sm:last:border-b-0 max-sm:odd:border-r"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <dt className="font-mono text-[10px] tracking-[0.18em] text-bone-500 uppercase">
            {cell.label}
          </dt>
          <dd className={`mt-2 font-display text-4xl leading-none font-semibold ${cell.tone}`}>
            {String(cell.value).padStart(2, '0')}
          </dd>
        </div>
      ))}
    </dl>
  );
}
