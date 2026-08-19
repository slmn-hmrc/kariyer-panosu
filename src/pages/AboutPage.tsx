/**
 * AboutPage — Proje künyesi
 *
 * Envanterin hangi eğitim kapsamında ve hangi tekniklerle hazırlandığını anlatır.
 */

import { Link } from 'react-router-dom';

const stack = [
  { label: 'Kütüphane', value: 'React 19' },
  { label: 'Derleyici', value: 'Vite 8' },
  { label: 'Dil', value: 'TypeScript' },
  { label: 'Stil', value: 'Tailwind CSS 4' },
  { label: 'Yönlendirme', value: 'React Router 7' },
  { label: 'Veri', value: 'LocalStorage' },
];

const operations = [
  {
    key: 'EKLE',
    title: 'Ekleme',
    detail:
      'Kayıt formu üzerinden yeni başvuru oluşturulur; kayıt anında LocalStorage’a yazılır.',
  },
  {
    key: 'LİSTELE',
    title: 'Listeleme',
    detail:
      'Panoda tüm kayıtlar; duruma göre filtreleme, metin araması ve sıralama ile listelenir.',
  },
  {
    key: 'GÜNCELLE',
    title: 'Güncelleme',
    detail:
      'Kart üzerindeki tek tıkla durum ilerletilir veya form üzerinden tüm alanlar düzenlenir.',
  },
  {
    key: 'SİL',
    title: 'Silme',
    detail: 'Kayıt, geri alınamaz olduğu için onay penceresi sonrası defterden kaldırılır.',
  },
];

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <div>
        <Link
          to="/"
          className="font-mono text-[10px] tracking-[0.18em] text-bone-500 uppercase transition-colors hover:text-ochre-300"
        >
          ← Panoya dön
        </Link>
        <h2 className="mt-4 font-display text-4xl leading-tight font-semibold text-bone-50">
          Proje künyesi
        </h2>
        <p className="mt-3 leading-relaxed text-bone-300">
          <strong className="text-bone-100">Kariyer Panosu</strong>, iş başvurularının tek
          bir defterde takip edilmesini sağlayan bir tek sayfa uygulamasıdır. Web Geliştirme;
          JavaScript eğitimi bitirme projesi olarak hazırlanmıştır.
        </p>
      </div>

      <section>
        <h3 className="font-mono text-[10px] tracking-[0.22em] text-ochre-400 uppercase">
          Kullanılan teknolojiler
        </h3>
        <dl className="mt-4 grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-3">
          {stack.map((item) => (
            <div key={item.label} className="bg-ink-850 px-5 py-4">
              <dt className="font-mono text-[10px] tracking-[0.16em] text-bone-500 uppercase">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-sm text-bone-100">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h3 className="font-mono text-[10px] tracking-[0.22em] text-ochre-400 uppercase">
          Yönergedeki dört işlem
        </h3>
        <ul className="mt-4 space-y-px border border-ink-700 bg-ink-700">
          {operations.map((operation) => (
            <li key={operation.key} className="bg-ink-850 px-5 py-4">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-[10px] tracking-[0.16em] text-ochre-300">
                  {operation.key}
                </span>
                <h4 className="font-display text-lg text-bone-50">{operation.title}</h4>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-bone-300">
                {operation.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-mono text-[10px] tracking-[0.22em] text-ochre-400 uppercase">
          Veri saklama
        </h3>
        <p className="mt-4 leading-relaxed text-bone-300">
          Uygulama sunucusuz çalışır. Tüm kayıtlar{' '}
          <code className="border border-ink-600 bg-ink-800 px-1.5 py-0.5 font-mono text-xs text-ochre-300">
            kariyer-panosu:applications
          </code>{' '}
          anahtarıyla tarayıcınızın LocalStorage alanında tutulur. Bu nedenle veriler yalnızca
          kendi cihazınızda kalır; başka bir tarayıcıda açtığınızda örnek kayıtlarla
          başlarsınız.
        </p>
      </section>
    </div>
  );
}
