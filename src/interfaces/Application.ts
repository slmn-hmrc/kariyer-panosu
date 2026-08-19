/**
 * Application.ts — Başvuru veri modeli
 */

import type { Status } from './Status';

export interface Application {
  /** Benzersiz kimlik (crypto.randomUUID ile üretilir) */
  id: string;
  /** Şirket adı */
  company: string;
  /** Başvurulan pozisyon */
  position: string;
  /** Şehir veya "Uzaktan" */
  location: string;
  /** İlanın bulunduğu kaynak (LinkedIn, Kariyer.net, referans vb.) */
  source: string;
  /** Başvuru tarihi — YYYY-AA-GG biçiminde */
  appliedAt: string;
  /** Başvurunun güncel durumu */
  status: Status;
  /** Serbest notlar */
  notes: string;
  /** Kayıt oluşturulma zamanı (ISO) */
  createdAt: string;
  /** Son güncelleme zamanı (ISO) */
  updatedAt: string;
}

/** Formdan gelen, henüz id/zaman damgası almamış veri */
export type ApplicationDraft = Omit<Application, 'id' | 'createdAt' | 'updatedAt'>;

/** Liste ekranındaki filtre durumu */
export interface FilterState {
  search: string;
  status: Status | 'all';
  sort: 'newest' | 'oldest' | 'company';
}
