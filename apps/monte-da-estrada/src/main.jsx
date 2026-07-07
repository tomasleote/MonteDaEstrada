import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './styles/global.scss'
import App from './App.jsx'

// HashRouter: routing lives entirely in the URL hash, so the app works on any
// host without server-side rewrite rules (this shared host ignores .htaccess).
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </HelmetProvider>
  </StrictMode>,
)
