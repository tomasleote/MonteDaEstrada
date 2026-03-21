import { Suspense, lazy, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { HeaderModern, Footer } from '@touril-ecosystem/ui-components'
import LoadingSpinner from './components/LoadingSpinner'
import AnimatedPage from '@/motion/components/AnimatedPage'
const logoBrancoAzul = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@495a0e9/mde/logos/logo-azul-texto-branco.webp'
import useScrollToTop from './hooks/useScrollToTop'
import BookingTab from './components/BookingTab'
// Remove legacy BookingModal import

// Lazy load page components for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const QuartosPage = lazy(() => import('./pages/QuartosPage'))
const DescobrirPage = lazy(() => import('./pages/DescobrirPage'))
const ContactoPage = lazy(() => import('./pages/ContactoPage'))
const GaleriaPage = lazy(() => import('./pages/GaleriaPage'))

// NOTE: Admin panel now powered by Decap CMS
// Access at /admin (served from public/admin/index.html)
// Old localStorage-based admin pages have been replaced

// Navigation links for HeaderModern
const navLinks = [
  { label: 'Casa', to: '/' },
  { label: 'Quartos', to: '/quartos' },
  { label: 'Descobrir', to: '/descobrir' },
  { label: 'Galeria', to: '/galeria' },
  { label: 'Contacto', to: '/contacto' },
]

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
  // TODO: Replace gpsCoords with exact property coordinates
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

// Footer navigation links
const footerNavLinks = [
  { text: 'Casa', href: '/' },
  { text: 'Quartos', href: '/quartos' },
  { text: 'Descobrir', href: '/descobrir' },
  { text: 'Galeria', href: '/galeria' },
  { text: 'Contacto', href: '/contacto' },
]

function App() {
  // Scroll to top on route change
  useScrollToTop()

  // Current location for page transitions
  const location = useLocation()

  // Language state for header (EN/PT)
  const [currentLanguage, setCurrentLanguage] = useState('PT')

  // HeyTravel Direct Booking URL
  const HEYTRAVEL_BOOKING_URL = 'https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?occupation=[{"room":1,"adults":2,"children":0}]&complex=1828&lang=pt-PT&';

  // Handler for language change
  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang)
    // TODO: Implement i18n language switching
    console.log(`Language changed to: ${lang}`)
  }

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
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/quartos" element={<QuartosPage />} />
                  <Route path="/descobrir" element={<DescobrirPage />} />
                  <Route path="/galeria" element={<GaleriaPage />} />
                  <Route path="/contacto" element={<ContactoPage />} />

                  {/* Legacy redirects — preserve old URLs */}
                  <Route path="/atividades" element={<Navigate to="/descobrir" replace />} />
                  <Route path="/redondezas" element={<Navigate to="/descobrir" replace />} />
                  <Route path="/localizacao" element={<Navigate to="/contacto" replace />} />

                  {/* Admin Panel - Powered by Decap CMS */}
                  {/* Access the admin panel at: /admin */}
                  {/* Authentication handled by Netlify Identity */}
                  {/* Content management handled by Decap CMS (Git-based) */}
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

      {/* PRP-02: Persistent right-edge booking tab — desktop only */}
      <BookingTab onClick={() => window.open(HEYTRAVEL_BOOKING_URL, '_blank', 'noopener,noreferrer')} />
    </div>
  )
}

export default App
