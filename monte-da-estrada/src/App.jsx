import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import ScrollProgress from './components/ScrollProgress'
import PageTransition from './components/PageTransition'
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

// Contact information for Footer (static data)
const contactInfo = {
  phone: '283 647 535',
  phone2: '960 254 072',
  email: 'montedaestradazambujeiradomar@gmail.com',
  address: 'Zambujeira do Mar, 7630-568 Odemira, Alentejo',
}

function App() {
  const { t } = useTranslation('common');

  // Scroll to top on route change
  useScrollToTop()

  // Navigation items with translations
  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.quartos'), path: '/quartos' },
    { label: t('nav.atividades'), path: '/atividades' },
    { label: t('nav.redondezas'), path: '/redondezas' },
    { label: t('nav.localizacao'), path: '/localizacao' },
    { label: t('nav.galeria'), path: '/galeria' },
  ]

  // Quick links for Footer with translations
  const quickLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.quartos'), path: '/quartos' },
    { label: t('nav.galeria'), path: '/galeria' },
    { label: t('nav.localizacao'), path: '/localizacao' },
  ]

  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <ScrollProgress />

        <a href="#main-content" className="skip-to-main">
          {t('accessibility.skipToMain')}
        </a>

        <NavBar navItems={navItems} />

        <main id="main-content" style={{ minHeight: 'calc(100vh - 70px)', paddingTop: '70px' }}>
          <PageTransition>
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
          </PageTransition>
        </main>

        <Footer contactInfo={contactInfo} quickLinks={quickLinks} />
      </div>
    </MotionConfig>
  )
}

export default App
