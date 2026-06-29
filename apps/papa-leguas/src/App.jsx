import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { HeaderModern, Footer } from '@touril-ecosystem/ui-components'
import LoadingSpinner from './components/LoadingSpinner'
import AnimatedPage from '@/motion/components/AnimatedPage'
import useScrollToTop from './hooks/useScrollToTop'
import BookingTab from './components/BookingTab'
import MobileReserveBar from './components/MobileReserveBar/MobileReserveBar'
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher'
import { LocaleProvider, useLocale } from './contexts/LocaleContext'
import ptSiteSettings from './data/pt/site-settings.json'
import enSiteSettings from './data/en/site-settings.json'

const PL_LOGO = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@COMMIT_HASH_PLACEHOLDER/pl/logos/logo-pl-branco.webp'

const HEYTRAVEL_PL_BOOKING_URL = 'HEYTRAVEL_PL_BOOKING_URL_PLACEHOLDER'

const HomePage = lazy(() => import('./pages/HomePage'))
const EspacosPage = lazy(() => import('./pages/EspacosPage'))
const DescobrirPage = lazy(() => import('./pages/DescobrirPage'))
const GaleriaPage = lazy(() => import('./pages/GaleriaPage'))
const ContactoPage = lazy(() => import('./pages/ContactoPage'))

const properties = [
  { id: 'monte-da-estrada', name: 'Monte da Estrada', url: 'https://montedaestrada.com' },
  { id: 'papa-leguas', name: 'Monte do Papa-Léguas', url: 'https://montedopapaleguas.pt' },
]

const footerAddress = {
  name: 'Monte do Papa Léguas',
  street: 'Zambujeira do Mar',
  postalCode: '7630-611',
  region: 'Alentejo',
  country: 'Portugal',
  mobile: '+351 960 432 223',
  email: 'geral@montedopapaleguas.pt',
  gpsCoords: '37.529416994463, -8.761460462675107',
  gpsLink: 'https://maps.app.goo.gl/tuuhyE1gYJKvjm3d9',
}

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

const getNavLinks = (locale) => {
  const base = locale === 'en';
  return [
    { label: base ? 'Home' : 'Casa', to: base ? '/en/' : '/' },
    { label: base ? 'Spaces' : 'Espaços', to: base ? '/en/espacos' : '/espacos' },
    { label: base ? 'Discover' : 'Descobrir', to: base ? '/en/descobrir' : '/descobrir' },
    { label: base ? 'Gallery' : 'Galeria', to: base ? '/en/galeria' : '/galeria' },
    { label: base ? 'Contact' : 'Contacto', to: base ? '/en/contacto' : '/contacto' },
  ];
};

const getFooterNavLinks = (locale) => {
  const base = locale === 'en';
  return [
    { text: base ? 'Home' : 'Casa', href: base ? '/en/' : '/' },
    { text: base ? 'Spaces' : 'Espaços', href: base ? '/en/espacos' : '/espacos' },
    { text: base ? 'Discover' : 'Descobrir', href: base ? '/en/descobrir' : '/descobrir' },
    { text: base ? 'Gallery' : 'Galeria', href: base ? '/en/galeria' : '/galeria' },
    { text: base ? 'Contact' : 'Contacto', href: base ? '/en/contacto' : '/contacto' },
  ];
};

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
      const stored = localStorage.getItem('pl-locale');
      let targetLang = 'pt';

      if (stored) {
        targetLang = stored;
      } else {
        targetLang = navigator.language.startsWith('en') ? 'en' : 'pt';
      }

      if (targetLang === 'en') {
        navigate('/en/', { replace: true });
      }

      localStorage.setItem('pl-locale', targetLang);
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
        brandName="Monte do Papa Léguas"
        logoDefault={PL_LOGO}
        logoScrolled={PL_LOGO}
        scrollThreshold={50}
        properties={properties}
        currentPropertyUrl="https://montedopapaleguas.pt"
        showProperties={true}
        onBookingClick={() => window.open(HEYTRAVEL_PL_BOOKING_URL, '_blank', 'noopener,noreferrer')}
      />

      <main id="main-content" style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <AnimatedPage key={location.pathname}>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes location={location}>
                {/* ── Portuguese (default) ── */}
                <Route path="/" element={<HomePage />} />
                <Route path="/espacos" element={<EspacosPage />} />
                <Route path="/descobrir" element={<DescobrirPage />} />
                <Route path="/galeria" element={<GaleriaPage />} />
                <Route path="/contacto" element={<ContactoPage />} />

                {/* ── English ── */}
                <Route path="/en/" element={<HomePage />} />
                <Route path="/en/espacos" element={<EspacosPage />} />
                <Route path="/en/descobrir" element={<DescobrirPage />} />
                <Route path="/en/galeria" element={<GaleriaPage />} />
                <Route path="/en/contacto" element={<ContactoPage />} />

                {/* Legacy redirects */}
                <Route path="/quartos" element={<Navigate to="/espacos" replace />} />
                <Route path="/atividades" element={<Navigate to="/descobrir" replace />} />
                <Route path="/redondezas" element={<Navigate to="/descobrir" replace />} />
                <Route path="/contactos" element={<Navigate to="/contacto" replace />} />

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
        copyright={`© Monte do Papa Léguas ${new Date().getFullYear()}`}
      />

      <BookingTab onClick={() => window.open(HEYTRAVEL_PL_BOOKING_URL, '_blank', 'noopener,noreferrer')} />
      <MobileReserveBar />
      <LanguageSwitcher />
    </div>
  )
}

function App() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  )
}

export default App
