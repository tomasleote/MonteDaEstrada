# Routing Integration Guide
## Monte da Estrada - Flexible Routing for Parent Site Integration

**Document Version:** 1.0
**Created:** February 15, 2026
**Purpose:** Configure routing for standalone or parent site sub-path deployment

---

## Table of Contents
1. [Overview](#overview)
2. [Standalone Deployment](#standalone-deployment)
3. [Sub-Path Deployment](#sub-path-deployment)
4. [Environment Configuration](#environment-configuration)
5. [App Component Updates](#app-component-updates)
6. [URL Structure](#url-structure)
7. [Testing](#testing)

---

## 1. Overview

Monte da Estrada's routing system is designed to support two deployment scenarios:

### Scenario A: Standalone Site
- **URL**: `https://montedaestrada.com/`
- **Base Path**: `/`
- **Example Routes**:
  - Home: `https://montedaestrada.com/`
  - Quartos: `https://montedaestrada.com/quartos`
  - Galeria: `https://montedaestrada.com/galeria`

### Scenario B: Integrated Sub-Path (Parent Site)
- **URL**: `https://herdadedotouril.com/properties/monte-da-estrada/`
- **Base Path**: `/properties/monte-da-estrada/`
- **Example Routes**:
  - Home: `https://herdadedotouril.com/properties/monte-da-estrada/`
  - Quartos: `https://herdadedotouril.com/properties/monte-da-estrada/quartos`
  - Galeria: `https://herdadedotouril.com/properties/monte-da-estrada/galeria`

The application uses **React Router v6** with `basename` support to handle both scenarios.

---

## 2. Standalone Deployment

### Configuration

**Environment Variables** (`.env`)
```env
VITE_APP_BASE_PATH=/
VITE_API_BASE_URL=https://api.montedaestrada.com
VITE_ENABLE_ADMIN=true
```

**index.jsx** (Entry Point)
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.scss';

const basePath = import.meta.env.VITE_APP_BASE_PATH || '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basePath}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

**App.jsx**
```javascript
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
// ... page imports

function App() {
  const navItems = [
    { label: 'Início', path: '/' },
    { label: 'Quartos', path: '/quartos' },
    { label: 'Atividades', path: '/atividades' },
    { label: 'Galeria', path: '/galeria' },
    { label: 'Localização', path: '/localizacao' }
  ];

  return (
    <div className="app">
      <Header
        brandName="Monte da Estrada"
        navigationItems={navItems}
        onReservasClick={() => window.location.href = '/reservas'}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quartos" element={<QuartosPage />} />
          <Route path="/atividades" element={<AtividadesPage />} />
          <Route path="/galeria" element={<GaleriaPage />} />
          <Route path="/localizacao" element={<LocalizacaoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer {...footerProps} />
    </div>
  );
}

export default App;
```

### Result
All routes work with clean URLs:
- `https://montedaestrada.com/` → HomePage
- `https://montedaestrada.com/quartos` → QuartosPage
- `https://montedaestrada.com/galeria` → GaleriaPage

---

## 3. Sub-Path Deployment

### Configuration for Parent Site Integration

**Environment Variables** (`.env.production`)
```env
VITE_APP_BASE_PATH=/properties/monte-da-estrada
VITE_API_BASE_URL=https://api.herdadedotouril.com
VITE_ENABLE_ADMIN=false
```

**index.jsx** (Same as standalone)
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.scss';

const basePath = import.meta.env.VITE_APP_BASE_PATH || '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basePath}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

**App.jsx** (Same component, paths are relative)
```javascript
// Navigation items use RELATIVE paths (no basePath prefix needed)
const navItems = [
  { label: 'Início', path: '/' },           // Will resolve to /properties/monte-da-estrada/
  { label: 'Quartos', path: '/quartos' },   // Will resolve to /properties/monte-da-estrada/quartos
  { label: 'Galeria', path: '/galeria' }    // Will resolve to /properties/monte-da-estrada/galeria
];

// Routes are defined without basePath prefix
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/quartos" element={<QuartosPage />} />
  <Route path="/galeria" element={<GaleriaPage />} />
</Routes>
```

### Parent Site Integration

**Parent Site HTML** (`herdadedotouril.com`)
```html
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Herdade do Touril - Monte da Estrada</title>

  <!-- Parent site stylesheets -->
  <link rel="stylesheet" href="/assets/touril-styles.css">

  <!-- Monte da Estrada fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">

  <!-- Monte da Estrada app -->
  <script type="module" src="/properties/monte-da-estrada/assets/index.js"></script>
  <link rel="stylesheet" href="/properties/monte-da-estrada/assets/index.css">
</head>
<body>
  <!-- Parent site can have its own header here if needed -->

  <div id="monte-root"></div>

  <script>
    // Initialize Monte da Estrada app in sub-path
    import('/properties/monte-da-estrada/assets/index.js');
  </script>
</body>
</html>
```

**Update index.jsx for custom mount point**
```javascript
// Mount to custom element ID when embedded
const rootElement = document.getElementById('monte-root') || document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter basename={basePath}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

### Result
All routes work under the parent site's path:
- `https://herdadedotouril.com/properties/monte-da-estrada/` → HomePage
- `https://herdadedotouril.com/properties/monte-da-estrada/quartos` → QuartosPage
- `https://herdadedotouril.com/properties/monte-da-estrada/galeria` → GaleriaPage

---

## 4. Environment Configuration

### Environment Variables Explained

| Variable | Purpose | Standalone Value | Sub-Path Value |
|----------|---------|------------------|----------------|
| `VITE_APP_BASE_PATH` | React Router basename | `/` | `/properties/monte-da-estrada` |
| `VITE_API_BASE_URL` | API endpoint for CMS/data | `https://api.montedaestrada.com` | `https://api.herdadedotouril.com` |
| `VITE_ENABLE_ADMIN` | Show admin panel link | `true` | `false` |
| `VITE_CMS_REPO` | Decap CMS GitHub repo | `tomasleote/MonteDaEstrada` | Same or different |

### Multiple Environment Files

**Development** (`.env.development`)
```env
VITE_APP_BASE_PATH=/
VITE_API_BASE_URL=http://localhost:3001
VITE_ENABLE_ADMIN=true
```

**Standalone Production** (`.env.production`)
```env
VITE_APP_BASE_PATH=/
VITE_API_BASE_URL=https://api.montedaestrada.com
VITE_ENABLE_ADMIN=true
```

**Parent Site Production** (`.env.production.parent`)
```env
VITE_APP_BASE_PATH=/properties/monte-da-estrada
VITE_API_BASE_URL=https://api.herdadedotouril.com
VITE_ENABLE_ADMIN=false
```

### Build Commands

**Standalone Build**
```bash
npm run build
# Uses .env.production
```

**Parent Site Build**
```bash
npm run build -- --mode production.parent
# Uses .env.production.parent
```

---

## 5. App Component Updates

### Current App.jsx Structure
The App.jsx file already supports relative routing and is compatible with both deployment scenarios.

### Recommended Updates

**Add basePath Prop Support** (Optional, for advanced use cases)
```javascript
export const App = ({ basePath = '/' }) => {
  // If you want to override basePath at runtime (not common)
  // This allows parent site to pass basePath dynamically

  return (
    <BrowserRouter basename={basePath}>
      {/* App content */}
    </BrowserRouter>
  );
};

export default App;
```

**Usage in Parent Site**
```jsx
import { App } from 'monte-da-estrada/App';

<App basePath="/properties/monte-da-estrada/" />
```

**However**, this is **not recommended** because:
- Environment variables are cleaner
- Build-time configuration is safer
- Less prone to runtime errors

**Stick with environment variables** for basePath configuration.

---

## 6. URL Structure

### Standalone Site URLs

| Page | Path (code) | Full URL |
|------|-------------|----------|
| Home | `/` | `https://montedaestrada.com/` |
| Quartos | `/quartos` | `https://montedaestrada.com/quartos` |
| Atividades | `/atividades` | `https://montedaestrada.com/atividades` |
| Redondezas | `/redondezas` | `https://montedaestrada.com/redondezas` |
| Localização | `/localizacao` | `https://montedaestrada.com/localizacao` |
| Galeria | `/galeria` | `https://montedaestrada.com/galeria` |
| Admin (CMS) | `/admin` | `https://montedaestrada.com/admin` |

### Parent Site Sub-Path URLs

| Page | Path (code) | Full URL |
|------|-------------|----------|
| Home | `/` | `https://herdadedotouril.com/properties/monte-da-estrada/` |
| Quartos | `/quartos` | `https://herdadedotouril.com/properties/monte-da-estrada/quartos` |
| Atividades | `/atividades` | `https://herdadedotouril.com/properties/monte-da-estrada/atividades` |
| Redondezas | `/redondezas` | `https://herdadedotouril.com/properties/monte-da-estrada/redondezas` |
| Localização | `/localizacao` | `https://herdadedotouril.com/properties/monte-da-estrada/localizacao` |
| Galeria | `/galeria` | `https://herdadedotouril.com/properties/monte-da-estrada/galeria` |

### Important Notes

1. **Paths in code are always relative** (no basePath prefix)
2. **React Router handles basePath automatically** via `<BrowserRouter basename={basePath}>`
3. **`<Link to="/quartos">` automatically resolves** to correct full URL
4. **External links need full path**:
   ```jsx
   // Internal navigation (React Router handles basePath)
   <Link to="/quartos">Quartos</Link>

   // External link (must include basePath manually)
   <a href={`${basePath}/quartos`}>Quartos</a>
   ```

---

## 7. Testing

### Testing Standalone Deployment

**Local Development**
```bash
npm run dev
# Open http://localhost:5173/
```

**Test all routes:**
- `http://localhost:5173/` → Home page
- `http://localhost:5173/quartos` → Quartos page
- `http://localhost:5173/galeria` → Galeria page

### Testing Sub-Path Deployment

**Update .env.development**
```env
VITE_APP_BASE_PATH=/properties/monte-da-estrada
```

**Start dev server**
```bash
npm run dev
```

**Test all routes:**
- `http://localhost:5173/properties/monte-da-estrada/` → Home page
- `http://localhost:5173/properties/monte-da-estrada/quartos` → Quartos page
- `http://localhost:5173/properties/monte-da-estrada/galeria` → Galeria page

**Important:** Routes without basePath will 404:
- ❌ `http://localhost:5173/` → 404
- ❌ `http://localhost:5173/quartos` → 404
- ✅ `http://localhost:5173/properties/monte-da-estrada/` → OK

### Automated Route Testing

**Create test file:** `__tests__/routing.test.js`
```javascript
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Routing with basePath', () => {
  it('should render home page at basePath root', () => {
    const basePath = '/properties/monte-da-estrada';

    window.history.pushState({}, 'Test', `${basePath}/`);

    render(
      <BrowserRouter basename={basePath}>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(/Monte da Estrada/i)).toBeInTheDocument();
  });

  it('should navigate to quartos page', () => {
    const basePath = '/properties/monte-da-estrada';

    window.history.pushState({}, 'Test', `${basePath}/quartos`);

    render(
      <BrowserRouter basename={basePath}>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(/Quartos/i)).toBeInTheDocument();
  });
});
```

**Run tests**
```bash
npm run test
```

---

## Integration Checklist

### Pre-Integration
- [ ] Determine deployment scenario (standalone or sub-path)
- [ ] Define basePath value (e.g., `/properties/monte-da-estrada`)
- [ ] Update environment variables in `.env.production` or `.env.production.parent`
- [ ] Verify React Router v6 is installed
- [ ] Review all navigation links in Header component

### During Integration
- [ ] Set `VITE_APP_BASE_PATH` in environment variables
- [ ] Update `index.jsx` to read basePath from env
- [ ] Ensure `<BrowserRouter basename={basePath}>` wraps `<App />`
- [ ] Use relative paths in all `<Link>` and `<Route>` components
- [ ] Build application with correct environment file
- [ ] Deploy built files to correct server path

### Post-Integration
- [ ] Test home page loads at `{domain}{basePath}/`
- [ ] Test all navigation links resolve correctly
- [ ] Verify browser back/forward buttons work
- [ ] Test direct URL access to sub-pages
- [ ] Verify 404 page handles unknown routes
- [ ] Test external links (booking system, social media)
- [ ] Check browser history and URL changes
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)

---

## Troubleshooting

### Issue: Routes return 404 in production

**Cause:** Server not configured to handle client-side routing.

**Solution:** Configure server to redirect all requests to `index.html`.

**Nginx Configuration**
```nginx
server {
  listen 80;
  server_name montedaestrada.com;
  root /var/www/monte-da-estrada;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

**Apache Configuration** (`.htaccess`)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Netlify Configuration** (`netlify.toml`)
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Issue: Routes work locally but not in production

**Cause:** basePath mismatch between build and deployment.

**Solution:** Verify environment variables match deployment path.

```bash
# Check build output
cat dist/assets/index-*.js | grep -i "basename"

# Should show: basename: "/properties/monte-da-estrada"
```

### Issue: Links navigate to wrong URLs

**Cause:** Using absolute paths instead of relative paths.

**Solution:** Always use relative paths in `<Link to="...">`:
```jsx
// ✅ Correct (relative)
<Link to="/quartos">Quartos</Link>

// ❌ Incorrect (absolute, bypasses basePath)
<Link to="https://montedaestrada.com/quartos">Quartos</Link>
```

### Issue: Assets (images, CSS) not loading in sub-path

**Cause:** Hardcoded absolute paths to assets.

**Solution:** Use relative paths or Vite's asset handling:
```javascript
// ✅ Correct (Vite handles basePath automatically)
import logo from './assets/logo.png';
<img src={logo} alt="Logo" />

// ❌ Incorrect (absolute path, ignores basePath)
<img src="/assets/logo.png" alt="Logo" />
```

---

## Advanced: Dynamic basePath

For advanced use cases where basePath needs to be determined at runtime:

**index.jsx**
```javascript
// Read basePath from meta tag or data attribute
const metaBasePath = document.querySelector('meta[name="base-path"]')?.content;
const basePath = metaBasePath || import.meta.env.VITE_APP_BASE_PATH || '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basePath}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

**Parent site HTML**
```html
<meta name="base-path" content="/properties/monte-da-estrada">
```

---

## Support & Documentation

- **Component Integration**: `COMPONENT-INTEGRATION.md`
- **Design Specs**: `HEADER-DESIGN-SPECS.md`
- **App Configuration**: `src/App.jsx`
- **Environment Variables**: `.env.example`
- **React Router Docs**: [reactrouter.com](https://reactrouter.com/en/main/router-components/browser-router#basename)

---

**Document Status:** ✅ Complete
**Last Updated:** February 15, 2026
**Maintained By:** Monte da Estrada Development Team
