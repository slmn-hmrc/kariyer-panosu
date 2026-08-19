/**
 * DashboardPage — Ana pano
 *
 * LİSTELEME, hızlı GÜNCELLEME ve SİLME işlemlerinin yapıldığı ekran.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Application, FilterState } from '../interfaces/Application';
import { useApplications } from '../hooks/useApplications';
import { StatsPanel } from '../components/StatsPanel';
import { FilterBar } from '../components/FilterBar';
import { ApplicationCard } from '../components/ApplicationCard';
import { EmptyState } from '../components/EmptyState';
import { ConfirmDialog } from '../components/ConfirmDialog';

export function DashboardPage() {
  const { applications, selectApplications, counts, advanceStatus, removeApplication } =
    useApplications();

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    sort: 'newest',
  });

  const [pendingDelete, setPendingDelete] = useState<Application | null>(null);

  const visible = selectApplications(filters);
  const isFiltered = filters.search.trim() !== '' || filters.status !== 'all';

  function handleConfirmDelete() {
    if (pendingDelete) removeApplication(pendingDelete.id);
    setPendingDelete(null);
  }

  return (
    <div className="space-y-10">
      {/* Künye şeridi */}
      <StatsPanel applications={applications} />

      {/* Filtre ve arama */}
      <FilterBar filters={filters} onChange={setFilters} counts={counts} />

      {/* Kayıt listesi */}
      {visible.length === 0 ? (
        <EmptyState
          title={isFiltered ? 'Bu filtreye uyan kayıt yok' : 'Defter henüz boş'}
          description={
            isFiltered
              ? 'Arama terimini değiştirmeyi veya durum filtresini "Tümü" yapmayı deneyin.'
              : 'İlk iş başvurunuzu ekleyerek takibe başlayın. Tüm kayıtlar tarayıcınızda saklanır.'
          }
          action={
            isFiltered ? (
              <button
                type="button"
                onClick={() => setFilters({ search: '', status: 'all', sort: 'newest' })}
                className="cursor-pointer border border-ink-600 px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-bone-300 uppercase transition-colors hover:border-ochre-400 hover:text-ochre-300"
              >
                Filtreleri temizle
              </button>
            ) : (
              <Link
                to="/basvuru/yeni"
                className="inline-block bg-ochre-400 px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] text-ink-950 uppercase transition-opacity hover:opacity-85"
              >
                Yeni kayıt ekle
              </Link>
            )
          }
        />
      ) : (
        <>
          <p className="font-mono text-[10px] tracking-[0.18em] text-bone-500 uppercase">
            {visible.length} kayıt gösteriliyor
            {isFiltered ? ` · toplam ${applications.length}` : ''}
          </p>

          <div className="space-y-3">
            {visible.map((application, index) => (
              <ApplicationCard
                key={application.id}
                application={application}
                index={index}
                onAdvance={(item) => advanceStatus(item.id)}
                onDelete={(item) => setPendingDelete(item)}
              />
            ))}
          </div>
        </>
      )}

      {/* Silme onayı */}
      <ConfirmDialog
        open={pendingDelete !== null}
        title="Kayıt silinsin mi?"
        description={
          pendingDelete
            ? `"${pendingDelete.company} — ${pendingDelete.position}" kaydı defterden kalıcı olarak kaldırılacak. Bu işlem geri alınamaz.`
            : ''
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
