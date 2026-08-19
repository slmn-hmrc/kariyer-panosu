/**
 * format.ts — Küçük yardımcı fonksiyonlar
 */

/** YYYY-AA-GG değerini "12 Ağustos 2026" biçimine çevirir. */
export function formatDate(value: string): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Başvurunun üzerinden kaç gün geçtiğini insan diliyle anlatır. */
export function daysSince(value: string): string {
  if (!value) return '';
  const diff = Math.floor((Date.now() - new Date(value).getTime()) / 86_400_000);
  if (Number.isNaN(diff)) return '';
  if (diff <= 0) return 'bugün';
  if (diff === 1) return 'dün';
  return `${diff} gün önce`;
}

/** Bugünün tarihini form varsayılanı için YYYY-AA-GG olarak verir. */
export function today(): string {
  return new Date().toISOString().slice(0, 10);
}
