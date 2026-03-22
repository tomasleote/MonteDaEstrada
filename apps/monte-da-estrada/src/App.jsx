import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { HeaderModern, Footer } from '@touril-ecosystem/ui-components'
import LoadingSpinner from './components/LoadingSpinner'
import AnimatedPage from '@/motion/components/AnimatedPage'
import useScrollToTop from './hooks/useScrollToTop'
import BookingTab from './components/BookingTab'
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher'
import { LocaleProvider, useLocale } from './contexts/LocaleContext'
import ptSiteSettings from './data/pt/site-settings.json'
import enSiteSettings from './data/en/site-settings.json'

const logoBrancoAzul = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/logos/logo-azul-texto-branco.webp'

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
const getFooterLegalInfo = (settings) => ({
  complaintBook: {
    text: settings.footer.complaintBook,
    url: 'https://www.livroreclamacoes.pt/',
  },
  arbitration: {
    entityName: settings.footer.arbitrationEntity,
    entityUrl: 'https://www.cniacc.pt/',
    phone: '253 619 107',
    email: 'geral@cniacc.pt',
  },
})

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

  // 1. URL IS THE ABSOLUTE SOURCE OF TRUTH
  useEffect(() => {
    const isEnUrl = location.pathname.startsWith('/en');
    const urlLang = isEnUrl ? 'en' : 'pt';
    
    if (locale !== urlLang) {
      setLocale(urlLang);
    }
  }, [location.pathname]); // Explicitly omitted setLocale and locale dependencies to prevent infinite loop

  // 2. ROOT AUTODETECT ON FIRST VISIT ONLY
  useEffect(() => {
    if (location.pathname === '/') {
      const stored = localStorage.getItem('mde-locale');
      let targetLang = 'pt';
      
      if (stored) {
        targetLang = stored; // Re-use explicitly saved preference
      } else {
        // Strict auto-detect
        targetLang = navigator.language.startsWith('en') ? 'en' : 'pt';
      }

      // Automatically execute the redirect
      if (targetLang === 'en') {
        navigate('/en/', { replace: true });
      }
      
      // Save it immediately so we satisfy the "first visit" clause permanently
      localStorage.setItem('mde-locale', targetLang);
    }
  }, []); // Run ONCE on app mount


  const currentLanguage = locale === 'en' ? 'EN' : 'PT';
  const navLinks = getNavLinks(locale);
  const footerNavLinks = getFooterNavLinks(locale);
  const siteSettings = locale === 'en' ? enSiteSettings : ptSiteSettings;

  return (
    <div className="app">
      <a href="#main-content" className="skip-to-main">
        {siteSettings.skipToMain}
      </a>

      <HeaderModern
        links={navLinks}
        brandName="Monte da Estrada"
        logoDefault={logoBrancoAzul}
        logoScrolled={logoBrancoAzul}
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

                {/* 404 Catch-all */}
                <Route path="*" element={
                  <div style={{ padding: '80px 20px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--foreground)' }}>{locale === 'en' ? 'Page not found' : 'Página não encontrada'}</h1>
                    <p style={{ marginBottom: '2rem', color: 'var(--muted-foreground)' }}>{locale === 'en' ? 'The page you are looking for does not exist.' : 'A página que procura não existe.'}</p>
                    <a href={locale === 'en' ? '/en/' : '/'} style={{ textDecoration: 'underline', color: 'var(--primary)' }}>
                      {locale === 'en' ? 'Return to Home' : 'Voltar à Página Inicial'}
                    </a>
                  </div>
                } />
              </Routes>
            </Suspense>
          </AnimatedPage>
        </AnimatePresence>
      </main>

      <Footer
        address={footerAddress}
        navigationLinks={footerNavLinks}
        legalInfo={getFooterLegalInfo(siteSettings)}
        copyright={`© Monte da Estrada ${new Date().getFullYear()}`}
      />

      <BookingTab onClick={() => window.open(HEYTRAVEL_BOOKING_URL, '_blank', 'noopener,noreferrer')} />
      <LanguageSwitcher />
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
