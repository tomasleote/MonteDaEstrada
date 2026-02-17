import { Suspense, lazy, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
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

// Navigation items for NavBar (matching Papa Léguas structure)
const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Quartos', path: '/quartos' },
  { label: 'Atividades', path: '/atividades' },
  { label: 'Redondezas', path: '/redondezas' },
  { label: 'Localização', path: '/localizacao' },
  { label: 'Galeria', path: '/galeria' },
]

// Contact information for Footer
const contactInfo = {
  phone: '283 647 535',
  phone2: '960 254 072',
  email: 'montedaestradazambujeiradomar@gmail.com',
  address: 'Zambujeira do Mar, 7630-568 Odemira, Alentejo',
}

// Quick links for Footer
const quickLinks = [
  { label: 'Início', path: '/' },
  { label: 'Quartos', path: '/quartos' },
  { label: 'Galeria', path: '/galeria' },
  { label: 'Localização', path: '/localizacao' },
]

function App() {
  // Scroll to top on route change
  useScrollToTop()

  // Language state for header (EN/PT)
  const [currentLanguage, setCurrentLanguage] = useState('PT')

  // Handler for RESERVAS button click
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

      <Header
        brandName="Monte da Estrada"
        navigationItems={navItems}
        sticky={true}
        onReservasClick={handleReservasClick}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      <main id="main-content" style={{ minHeight: 'calc(100vh - 192px)', paddingTop: '0' }}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
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

            {/* Old localStorage-based admin routes removed - now using Decap CMS */}
          </Routes>
        </Suspense>
      </main>

      <Footer contactInfo={contactInfo} quickLinks={quickLinks} />
    </div>
  )
}

export default App
