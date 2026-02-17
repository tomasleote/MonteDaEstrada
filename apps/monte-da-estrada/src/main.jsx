import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './context/AuthContext'
import './styles/global.scss'
import App from './App.jsx'

// Get basePath from environment variable for flexible deployment
// Standalone: VITE_APP_BASE_PATH=/
// Parent site integration: VITE_APP_BASE_PATH=/properties/monte-da-estrada
const basePath = import.meta.env.VITE_APP_BASE_PATH || '/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={basePath}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
