/**
 * Status.ts — Başvuru durumu tipleri
 *
 * Bir iş başvurusunun yaşam döngüsü burada tanımlanır. Durumlar tek bir
 * yerden yönetildiği için hem kart rozetleri hem filtre çubuğu hem de
 * istatistik paneli aynı kaynağı kullanır.
 */

export type Status = 'applied' | 'interview' | 'offer' | 'rejected';

export interface StatusMeta {
  /** Kullanıcıya gösterilen Türkçe etiket */
  label: string;
  /** Rozet ve grafiklerde kullanılan Tailwind sınıfları */
  badgeClass: string;
  /** İlerleme çubuğu / vurgu rengi */
  accentClass: string;
  /** Kart üzerindeki "sonraki adım" butonunun hedefi (null ise akış biter) */
  next: Status | null;
}

export const STATUS_ORDER: Status[] = ['applied', 'interview', 'offer', 'rejected'];

export const STATUS_META: Record<Status, StatusMeta> = {
  applied: {
    label: 'Başvuruldu',
    badgeClass: 'bg-slateblue/12 text-slateblue ring-slateblue/30',
    accentClass: 'bg-slateblue',
    next: 'interview',
  },
  interview: {
    label: 'Mülakat',
    badgeClass: 'bg-ochre-400/12 text-ochre-300 ring-ochre-400/30',
    accentClass: 'bg-ochre-400',
    next: 'offer',
  },
  offer: {
    label: 'Teklif Alındı',
    badgeClass: 'bg-sage/12 text-sage ring-sage/30',
    accentClass: 'bg-sage',
    next: null,
  },
  rejected: {
    label: 'Olumsuz',
    badgeClass: 'bg-brick/12 text-brick ring-brick/30',
    accentClass: 'bg-brick',
    next: null,
  },
};
