/**
 * ApplicationForm — EKLEME ve GÜNCELLEME işlemlerinin ortak formu
 *
 * `initialValue` verildiğinde düzenleme, verilmediğinde yeni kayıt modunda çalışır.
 */

import { useState } from 'react';
import type { FormEvent } from 'react';
import type { ApplicationDraft } from '../interfaces/Application';
import { STATUS_META, STATUS_ORDER } from '../interfaces/Status';
import { today } from '../lib/format';

interface Props {
  initialValue?: ApplicationDraft;
  submitLabel: string;
  onSubmit: (draft: ApplicationDraft) => void;
  onCancel: () => void;
}

const EMPTY: ApplicationDraft = {
  company: '',
  position: '',
  location: '',
  source: '',
  appliedAt: today(),
  status: 'applied',
  notes: '',
};

const fieldClass =
  'w-full border border-ink-700 bg-ink-850 px-3 py-2.5 text-sm text-bone-100 placeholder:text-bone-500 focus:border-ochre-400 focus:outline-none';
const labelClass =
  'mb-2 block font-mono text-[10px] tracking-[0.16em] text-bone-500 uppercase';

export function ApplicationForm({ initialValue, submitLabel, onSubmit, onCancel }: Props) {
  const [draft, setDraft] = useState<ApplicationDraft>(initialValue ?? EMPTY);
  const [errors, setErrors] = useState<string[]>([]);

  function update<K extends keyof ApplicationDraft>(key: K, value: ApplicationDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Basit doğrulama — zorunlu alanlar boş bırakılamaz.
    const found: string[] = [];
    if (draft.company.trim().length < 2) found.push('Şirket adı en az 2 karakter olmalıdır.');
    if (draft.position.trim().length < 2) found.push('Pozisyon en az 2 karakter olmalıdır.');
    if (!draft.appliedAt) found.push('Başvuru tarihi seçilmelidir.');

    if (found.length > 0) {
      setErrors(found);
      return;
    }

    setErrors([]);
    onSubmit({
      ...draft,
      company: draft.company.trim(),
      position: draft.position.trim(),
      location: draft.location.trim() || 'Belirtilmedi',
      source: draft.source.trim() || 'Belirtilmedi',
      notes: draft.notes.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="animate-rise border border-ink-700 bg-ink-850/60">
      <div className="border-b border-ink-700 px-6 py-4">
        <p className="font-mono text-[10px] tracking-[0.22em] text-ochre-400 uppercase">
          Kayıt formu
        </p>
      </div>

      <div className="grid gap-5 p-6 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className={labelClass} htmlFor="company">
            Şirket <span className="text-brick">*</span>
          </label>
          <input
            id="company"
            className={fieldClass}
            value={draft.company}
            onChange={(event) => update('company', event.target.value)}
            placeholder="Nova Yazılım"
          />
        </div>

        <div className="sm:col-span-1">
          <label className={labelClass} htmlFor="position">
            Pozisyon <span className="text-brick">*</span>
          </label>
          <input
            id="position"
            className={fieldClass}
            value={draft.position}
            onChange={(event) => update('position', event.target.value)}
            placeholder="Junior Backend Developer"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="location">
            Konum
          </label>
          <input
            id="location"
            className={fieldClass}
            value={draft.location}
            onChange={(event) => update('location', event.target.value)}
            placeholder="İstanbul / Uzaktan"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="source">
            Kaynak
          </label>
          <input
            id="source"
            className={fieldClass}
            value={draft.source}
            onChange={(event) => update('source', event.target.value)}
            placeholder="LinkedIn, Kariyer.net, referans…"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="appliedAt">
            Başvuru tarihi <span className="text-brick">*</span>
          </label>
          <input
            id="appliedAt"
            type="date"
            className={fieldClass}
            value={draft.appliedAt}
            onChange={(event) => update('appliedAt', event.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="status">
            Durum
          </label>
          <select
            id="status"
            className={`${fieldClass} cursor-pointer`}
            value={draft.status}
            onChange={(event) =>
              update('status', event.target.value as ApplicationDraft['status'])
            }
          >
            {STATUS_ORDER.map((status) => (
              <option key={status} value={status}>
                {STATUS_META[status].label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="notes">
            Notlar
          </label>
          <textarea
            id="notes"
            rows={4}
            className={`${fieldClass} resize-y`}
            value={draft.notes}
            onChange={(event) => update('notes', event.target.value)}
            placeholder="Mülakat tarihi, iletişime geçilen kişi, teknik sorular…"
          />
        </div>

        {errors.length > 0 ? (
          <ul className="sm:col-span-2 border border-brick/40 bg-brick/10 px-4 py-3 text-sm text-brick">
            {errors.map((error) => (
              <li key={error}>• {error}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="flex justify-end gap-3 border-t border-ink-700 px-6 py-4">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-bone-300 uppercase transition-colors hover:text-bone-50"
        >
          Vazgeç
        </button>
        <button
          type="submit"
          className="cursor-pointer bg-ochre-400 px-6 py-2 font-mono text-[11px] tracking-[0.14em] text-ink-950 uppercase transition-opacity hover:opacity-85"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
