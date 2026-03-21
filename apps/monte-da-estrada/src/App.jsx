import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { HeaderModern, Footer } from '@touril-ecosystem/ui-components'
import LoadingSpinner from './components/LoadingSpinner'
import AnimatedPage from '@/motion/components/AnimatedPage'
import useScrollToTop from './hooks/useScrollToTop'
import BookingTab from './components/BookingTab'
import { LocaleProvider, useLocale } from './contexts/LocaleContext'

const logoBrancoAzul = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@495a0e9/mde/logos/logo-azul-texto-branco.webp'

// Lazy load page components for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const QuartosPage = lazy(() => import('./pages/QuartosPage'))
const DescobrirPage = lazy(() => import('./pages/DescobrirPage'))
const ContactoPage = lazy(() => import('./pages/ContactoPage'))
const GaleriaPage = lazy(() => import('./pages/GaleriaPage'))

// Properties for HeaderModern collection switcher dropdown
const properties = [
  { id: 'monte-da-estrada', name: 'Monte da Estrada', url: 'https://montedaestrada.com' },
  { id: 'papa-leguas', name: 'Monte do Papa-Léguas', url: 'https://montedopapaleguas.pt' },
]

// Footer address/contact information
const footerAddress = {
  name: 'Monte da Estrada',
  street: 'Malhadil – Zambujeira do Mar',
  postalCode: '7630-611',
  region: 'Alentejo',
  country: 'Portugal',
  mobile: '+351 960 254 072',
  email: 'geral@montedaestrada.com',
  gpsCoords: '37.58841557051901, -8.778295719162255',
  gpsLink: 'https://maps.app.goo.gl/iXs8og3TukTh4k397',
}

// Footer legal information
const footerLegalInfo = {
  complaintBook: {
    text: 'Livro de Reclamações Electrónico',
    url: 'https://www.livroreclamacoes.pt/',
  },
  arbitration: {
    entityName: 'CNIACC – Centro Arbitragem',
    entityUrl: 'https://www.cniacc.pt/',
    phone: '253 619 107',
    email: 'geral@cniacc.pt',
  },
}

// HeyTravel Direct Booking URL
const HEYTRAVEL_BOOKING_URL = 'https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?occupation=%5B%7B%22room%22%3A1%2C%22adults%22%3A2%2C%22children%22%3A0%7D%5D&complex=1828&lang=pt-PT';

// ──────────────────────────────────────────────
// Locale-aware nav links
// ──────────────────────────────────────────────
const getNavLinks = (locale) => {
  const base = locale === 'en';
  return [
    { label: base ? 'Home' : 'Casa', to: base ? '/en/' : '/' },
    { label: base ? 'Rooms' : 'Quartos', to: base ? '/en/quartos' : '/quartos' },
    { label: base ? 'Discover' : 'Descobrir', to: base ? '/en/descobrir' : '/descobrir' },
    { label: base ? 'Gallery' : 'Galeria', to: base ? '/en/galeria' : '/galeria' },
    { label: base ? 'Contact' : 'Contacto', to: base ? '/en/contacto' : '/contacto' },
  ];
};

const getFooterNavLinks = (locale) => {
  const base = locale === 'en';
  return [
    { text: base ? 'Home' : 'Casa', href: base ? '/en/' : '/' },
    { text: base ? 'Rooms' : 'Quartos', href: base ? '/en/quartos' : '/quartos' },
    { text: base ? 'Discover' : 'Descobrir', href: base ? '/en/descobrir' : '/descobrir' },
    { text: base ? 'Gallery' : 'Galeria', href: base ? '/en/galeria' : '/galeria' },
    { text: base ? 'Contact' : 'Contacto', href: base ? '/en/contacto' : '/contacto' },
  ];
};

// ──────────────────────────────────────────────
// Inner component — has access to LocaleContext
// ──────────────────────────────────────────────
function AppContent() {
  useScrollToTop()
  const location = useLocation()
  const navigate = useNavigate()
  const { locale, setLocale } = useLocale()

  // Browser language detection on first load
  // Redirects English-preferring browsers to /en on first visit
  useEffect(() => {
    const stored = localStorage.getItem('mde-locale');
    if (stored) {
      // Already has a preference — sync locale with URL
      if (stored === 'en' && !location.pathname.startsWith('/en')) {
        navigate('/en' + location.pathname, { replace: true });
      } else if (stored === 'pt' && location.pathname.startsWith('/en')) {
        navigate(location.pathname.replace(/^\/en/, '') || '/', { replace: true });
      }
      return;
    }
    // No stored preference — detect browser language
    const browserLang = navigator.language || '';
    if (browserLang.startsWith('en') && !location.pathname.startsWith('/en')) {
      setLocale('en');
      navigate('/en' + location.pathname, { replace: true });
    }
  }, []);

  const handleLanguageChange = (lang) => {
    setLocale(lang);
    const currentPath = location.pathname;
    if (lang === 'en') {
      // Switch TO English — add /en prefix
      navigate('/en' + (currentPath === '/' ? '' : currentPath));
    } else {
      // Switch TO Portuguese — remove /en prefix
      const newPath = currentPath.replace(/^\/en/, '') || '/';
      navigate(newPath);
    }
  };

  const currentLanguage = locale === 'en' ? 'EN' : 'PT';
  const navLinks = getNavLinks(locale);
  const footerNavLinks = getFooterNavLinks(locale);

  return (
    <div className="app">
      <a href="#main-content" className="skip-to-main">
        Saltar para o conteúdo principal
      </a>

      <HeaderModern
        links={navLinks}
        brandName="Monte da Estrada"
        logoDefault={logoBrancoAzul}
        logoScrolled={logoBrancoAzul}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        scrollThreshold={50}
        properties={properties}
        currentPropertyUrl="https://montedaestrada.com"
        showProperties={true}
        onBookingClick={() => window.open(HEYTRAVEL_BOOKING_URL, '_blank', 'noopener,noreferrer')}
      />

      <main id="main-content" style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <AnimatedPage key={location.pathname}>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes location={location}>
                {/* ── Portuguese (default) ── */}
                <Route path="/" element={<HomePage />} />
                <Route path="/quartos" element={<QuartosPage />} />
                <Route path="/descobrir" element={<DescobrirPage />} />
                <Route path="/galeria" element={<GaleriaPage />} />
                <Route path="/contacto" element={<ContactoPage />} />

                {/* ── English ── */}
                <Route path="/en/" element={<HomePage />} />
                <Route path="/en/quartos" element={<QuartosPage />} />
                <Route path="/en/descobrir" element={<DescobrirPage />} />
                <Route path="/en/galeria" element={<GaleriaPage />} />
                <Route path="/en/contacto" element={<ContactoPage />} />

                {/* Legacy redirects */}
                <Route path="/atividades" element={<Navigate to="/descobrir" replace />} />
                <Route path="/redondezas" element={<Navigate to="/descobrir" replace />} />
                <Route path="/localizacao" element={<Navigate to="/contacto" replace />} />
              </Routes>
            </Suspense>
          </AnimatedPage>
        </AnimatePresence>
      </main>

      <Footer
        address={footerAddress}
        navigationLinks={footerNavLinks}
        legalInfo={footerLegalInfo}
        copyright={`© Monte da Estrada ${new Date().getFullYear()}`}
      />

      <BookingTab onClick={() => window.open(HEYTRAVEL_BOOKING_URL, '_blank', 'noopener,noreferrer')} />
    </div>
  )
}

// ──────────────────────────────────────────────
// Root — wraps with LocaleProvider
// ──────────────────────────────────────────────
function App() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  )
}

export default App
