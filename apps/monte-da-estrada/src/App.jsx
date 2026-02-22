import { Suspense, lazy, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { HeaderModern, Footer } from '@touril-ecosystem/ui-components'
import LoadingSpinner from './components/LoadingSpinner'
import AnimatedPage from '@/motion/components/AnimatedPage'
import useScrollToTop from './hooks/useScrollToTop'

// Lazy load page components for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const QuartosPage = lazy(() => import('./pages/QuartosPage'))
const AtividadesPage = lazy(() => import('./pages/AtividadesPage'))
const RedondezasPage = lazy(() => import('./pages/RedondezasPage'))
const LocalizacaoPage = lazy(() => import('./pages/LocalizacaoPage'))
const GaleriaPage = lazy(() => import('./pages/GaleriaPage'))

// NOTE: Admin panel now powered by Decap CMS
// Access at /admin (served from public/admin/index.html)
// Old localStorage-based admin pages have been replaced

// Navigation links for HeaderModern
const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Quartos', to: '/quartos' },
  { label: 'Atividades', to: '/atividades' },
  { label: 'Redondezas', to: '/redondezas' },
  { label: 'Localização', to: '/localizacao' },
  { label: 'Galeria', to: '/galeria' },
]

// Properties for HeaderModern dropdown
const properties = [
  { name: 'Monte da Estrada', url: '#monte-da-estrada' },
  { name: 'Monte do Papa Léguas', url: '#monte-do-papa-leguas' },
]

// Footer address/contact information
const footerAddress = {
  name: 'Monte da Estrada',
  street: 'Zambujeira do Mar',
  postalCode: '7630-568 Odemira',
  region: 'Alentejo',
  country: 'Portugal',
  mobile: '+351 960 254 072',
  email: 'montedaestradazambujeiradomar@gmail.com',
  // TODO: Replace gpsCoords with exact property coordinates
  gpsCoords: '37°31\'10"N / 8°46\'54"W',
  gpsLink: 'https://maps.google.com/maps?q=Zambujeira+do+Mar,+7630-568+Odemira,+Portugal',
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
  { text: 'Início', href: '/' },
  { text: 'Quartos', href: '/quartos' },
  { text: 'Atividades', href: '/atividades' },
  { text: 'Redondezas', href: '/redondezas' },
  { text: 'Localização', href: '/localizacao' },
  { text: 'Galeria', href: '/galeria' },
]

function App() {
  // Scroll to top on route change
  useScrollToTop()

  // Current location for page transitions
  const location = useLocation()

  // Language state for header (EN/PT)
  const [currentLanguage, setCurrentLanguage] = useState('PT')

  // Handler for reserve button click
  const handleReservasClick = () => {
    // TODO: Integrate with booking system
    // For now, navigate to external booking page or show modal
    window.location.href = 'https://www.booking.com/' // Replace with actual booking URL
  }

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
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        scrollThreshold={50}
        properties={properties}
        currentPropertyUrl="#monte-da-estrada"
        showProperties={true}
      />

      <main id="main-content" style={{ minHeight: '100vh' }}>
        <AnimatePresence mode="wait">
          <AnimatedPage key={location.pathname}>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes location={location}>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/quartos" element={<QuartosPage />} />
                <Route path="/atividades" element={<AtividadesPage />} />
                <Route path="/redondezas" element={<RedondezasPage />} />
                <Route path="/localizacao" element={<LocalizacaoPage />} />
                <Route path="/galeria" element={<GaleriaPage />} />

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
    </div>
  )
}

export default App
