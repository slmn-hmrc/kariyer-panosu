/**
 * ApplicationFormPage — EKLEME ve GÜNCELLEME ekranı
 *
 * `/basvuru/yeni`  → yeni kayıt
 * `/basvuru/:id`   → mevcut kaydı düzenleme
 */

import { Link, useNavigate, useParams } from 'react-router-dom';
import type { ApplicationDraft } from '../interfaces/Application';
import { useApplications } from '../hooks/useApplications';
import { ApplicationForm } from '../components/ApplicationForm';
import { EmptyState } from '../components/EmptyState';

export function ApplicationFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getApplication, addApplication, updateApplication } = useApplications();

  const isNew = !id || id === 'yeni';
  const existing = isNew ? undefined : getApplication(id);

  // Düzenlenmek istenen kayıt silinmiş olabilir.
  if (!isNew && !existing) {
    return (
      <EmptyState
        title="Kayıt bulunamadı"
        description="Aradığınız başvuru silinmiş veya bağlantı geçersiz olabilir."
        action={
          <Link
            to="/"
            className="inline-block border border-ink-600 px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-bone-300 uppercase transition-colors hover:border-ochre-400 hover:text-ochre-300"
          >
            Panoya dön
          </Link>
        }
      />
    );
  }

  function handleSubmit(draft: ApplicationDraft) {
    if (isNew) {
      addApplication(draft);
    } else if (id) {
      updateApplication(id, draft);
    }
    navigate('/');
  }

  const initialValue: ApplicationDraft | undefined = existing
    ? {
        company: existing.company,
        position: existing.position,
        location: existing.location,
        source: existing.source,
        appliedAt: existing.appliedAt,
        status: existing.status,
        notes: existing.notes,
      }
    : undefined;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Link
          to="/"
          className="font-mono text-[10px] tracking-[0.18em] text-bone-500 uppercase transition-colors hover:text-ochre-300"
        >
          ← Panoya dön
        </Link>
        <h2 className="mt-4 font-display text-4xl leading-tight font-semibold text-bone-50">
          {isNew ? 'Yeni başvuru kaydı' : 'Kaydı düzenle'}
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-bone-300">
          {isNew
            ? 'Başvurduğunuz pozisyonun bilgilerini girin. Kayıt anında tarayıcınızın LocalStorage alanına yazılır.'
            : 'Alanları güncelleyip kaydettiğinizde değişiklikler anında panoya yansır.'}
        </p>
      </div>

      <ApplicationForm
        initialValue={initialValue}
        submitLabel={isNew ? 'Kaydı oluştur' : 'Değişiklikleri kaydet'}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
      />
    </div>
  );
}
