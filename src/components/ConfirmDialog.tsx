/**
 * ConfirmDialog — Silme işlemi için onay penceresi
 *
 * SİLME işlemi geri alınamaz olduğu için kullanıcıdan açık onay alınır.
 */

import { useEffect } from 'react';

interface Props {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Sil',
  onConfirm,
  onCancel,
}: Props) {
  // Escape tuşu ile kapatma
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="animate-rise w-full max-w-md border border-ink-600 bg-ink-850 p-7 shadow-2xl shadow-black/60">
        <p className="font-mono text-[10px] tracking-[0.22em] text-brick uppercase">
          Onay gerekiyor
        </p>
        <h2 id="confirm-title" className="mt-3 font-display text-2xl text-bone-50">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-bone-300">{description}</p>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-bone-300 uppercase transition-colors hover:text-bone-50"
          >
            Vazgeç
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer bg-brick px-5 py-2 font-mono text-[11px] tracking-[0.14em] text-ink-950 uppercase transition-opacity hover:opacity-85"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
