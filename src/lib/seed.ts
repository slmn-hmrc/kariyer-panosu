/**
 * seed.ts — İlk açılışta panoyu boş bırakmamak için örnek başvurular
 */

import type { Application } from '../interfaces/Application';

/** Bugünden `days` gün öncesini YYYY-AA-GG biçiminde döndürür. */
function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
}

function build(
  company: string,
  position: string,
  location: string,
  source: string,
  days: number,
  status: Application['status'],
  notes: string
): Application {
  const iso = new Date(Date.now() - days * 86_400_000).toISOString();
  return {
    id: `seed-${company.toLowerCase().replace(/\s+/g, '-')}`,
    company,
    position,
    location,
    source,
    appliedAt: daysAgo(days),
    status,
    notes,
    createdAt: iso,
    updatedAt: iso,
  };
}

export const SEED_APPLICATIONS: Application[] = [
  build(
    'Nova Yazılım',
    'Junior Backend Developer',
    'İstanbul',
    'LinkedIn',
    24,
    'offer',
    'Teknik mülakat Node.js ve REST API üzerineydi. Teklif e-posta ile geldi, cevap için 1 hafta süre var.'
  ),
  build(
    'Delta Bilişim',
    'Frontend Developer (React)',
    'Uzaktan',
    'Kariyer.net',
    18,
    'interview',
    'İkinci tur teknik mülakat planlandı. React state yönetimi ve Tailwind soruları bekleniyor.'
  ),
  build(
    'Arya Teknoloji',
    'Fullstack Developer',
    'Ankara',
    'Şirket kariyer sayfası',
    12,
    'interview',
    'İK görüşmesi tamamlandı. Vaka çalışması olarak küçük bir CRUD uygulaması istendi.'
  ),
  build(
    'Meridyen Digital',
    'Mobil Uygulama Geliştirici',
    'İzmir',
    'Referans',
    9,
    'applied',
    'Flutter tecrübesi öne çıkarıldı. Portföydeki katalog uygulaması bağlantısı paylaşıldı.'
  ),
  build(
    'Kuzey Veri',
    'Veri Tabanı Uzmanı (SQL)',
    'Bursa',
    'LinkedIn',
    6,
    'applied',
    'İlanda T-SQL ve raporlama deneyimi isteniyor. NovaStore projesi CV ekinde gönderildi.'
  ),
  build(
    'Piksel Ajans',
    'Web Developer',
    'Uzaktan',
    'Twitter/X ilanı',
    30,
    'rejected',
    'Pozisyon kapandı bilgisi geldi. Geri bildirim: daha fazla canlı proje deneyimi bekleniyordu.'
  ),
];
