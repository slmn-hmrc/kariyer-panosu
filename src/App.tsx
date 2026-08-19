/**
 * App — Uygulama kabuğu ve yönlendirme yapısı
 */

import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ApplicationsProvider } from './hooks/useApplications';
import { DashboardPage } from './pages/DashboardPage';
import { ApplicationFormPage } from './pages/ApplicationFormPage';
import { AboutPage } from './pages/AboutPage';

function Header() {
  const { pathname } = useLocation();
  const isDashboard = pathname === '/';

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `font-mono text-[10px] tracking-[0.16em] uppercase transition-colors ${
      isActive ? 'text-ochre-300' : 'text-bone-500 hover:text-bone-100'
    }`;

  return (
    <header className="border-b border-ink-700">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link to="/" className="group flex items-baseline gap-3">
          <span className="font-display text-xl font-semibold text-bone-50">
            Kariyer Panosu
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-bone-500 uppercase">
            v1.0
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink to="/" className={navClass} end>
            Pano
          </NavLink>
          <NavLink to="/hakkinda" className={navClass}>
            Künye
          </NavLink>
          {isDashboard ? (
            <Link
              to="/basvuru/yeni"
              className="bg-ochre-400 px-4 py-2 font-mono text-[10px] tracking-[0.14em] text-ink-950 uppercase transition-opacity hover:opacity-85"
            >
              + Yeni kayıt
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

function Masthead() {
  return (
    <div className="mx-auto max-w-5xl px-5 pt-14 pb-10 sm:px-8">
      <p className="font-mono text-[10px] tracking-[0.28em] text-ochre-400 uppercase">
        Başvuru takip defteri
      </p>
      <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[1.05] font-semibold text-balance text-bone-50 sm:text-6xl">
        Her başvuru bir kayıt, her kayıt bir adım.
      </h1>
      <p className="mt-5 max-w-xl leading-relaxed text-bone-300">
        Başvurduğunuz pozisyonları tek bir defterde toplayın; hangi aşamada
        olduklarını, ne zaman başvurduğunuzu ve sıradaki adımı gözden kaçırmayın.
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-700">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-6 font-mono text-[10px] tracking-[0.16em] text-bone-500 uppercase sm:px-8">
        <span>Kariyer Panosu — Süleyman Hamurcu</span>
        <span>Web Geliştirme; JavaScript · Proje Envanteri</span>
      </div>
    </footer>
  );
}

export default function App() {
  const { pathname } = useLocation();

  return (
    <ApplicationsProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        {pathname === '/' ? <Masthead /> : null}

        <main className="mx-auto w-full max-w-5xl flex-1 px-5 pt-4 pb-16 sm:px-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/basvuru/yeni" element={<ApplicationFormPage />} />
            <Route path="/basvuru/:id" element={<ApplicationFormPage />} />
            <Route path="/hakkinda" element={<AboutPage />} />
            <Route
              path="*"
              element={
                <div className="py-20 text-center">
                  <p className="font-mono text-[10px] tracking-[0.22em] text-bone-500 uppercase">
                    404
                  </p>
                  <h2 className="mt-3 font-display text-3xl text-bone-50">Sayfa bulunamadı</h2>
                  <Link
                    to="/"
                    className="mt-6 inline-block border border-ink-600 px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-bone-300 uppercase transition-colors hover:border-ochre-400 hover:text-ochre-300"
                  >
                    Panoya dön
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </ApplicationsProvider>
  );
}
