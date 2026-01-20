import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ParallaxProvider } from 'react-scroll-parallax'
import { AuthProvider } from './context/AuthContext'
import './styles/global.scss'
import './i18n'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ParallaxProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ParallaxProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
