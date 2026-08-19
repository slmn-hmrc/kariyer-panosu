/**
 * StatusBadge — Başvuru durumunu gösteren küçük rozet
 */

import type { Status } from '../interfaces/Status';
import { STATUS_META } from '../interfaces/Status';

interface Props {
  status: Status;
}

export function StatusBadge({ status }: Props) {
  const meta = STATUS_META[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.14em] uppercase ring-1 ring-inset ${meta.badgeClass}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.accentClass}`} aria-hidden="true" />
      {meta.label}
    </span>
  );
}
