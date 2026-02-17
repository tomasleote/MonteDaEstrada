# Header Integration Guide

This guide explains how to integrate the new modular Header component into your React application and replace the existing NavBar component.

## Overview

The new Header component is a three-tier design matching the Herdade do Touril parent site:
1. **Tier 1**: Language selector (EN/PT)
2. **Tier 2**: Logo + Brand name + RESERVAS button
3. **Tier 3**: Main navigation menu

## Step 1: Import the Header Component

In your `App.jsx` or main layout component:

```jsx
import Header from '@/components/Header';
```

## Step 2: Prepare Navigation Items

Define your navigation items with label and path:

```javascript
const navigationItems = [
  { label: 'Início', path: '/' },
  { label: 'Quartos', path: '/quartos' },
  { label: 'Atividades', path: '/atividades' },
  { label: 'Redondezas', path: '/redondezas' },
  { label: 'Localização', path: '/localizacao' },
  { label: 'Galeria', path: '/galeria' },
];
```

## Step 3: Set Up State Management (Optional)

If you want to implement language switching, add state:

```jsx
const [currentLanguage, setCurrentLanguage] = useState('PT');

const handleLanguageChange = (lang) => {
  setCurrentLanguage(lang);
  // Optionally trigger content translation here
  // loadTranslations(lang);
};
```

## Step 4: Handle RESERVAS Button Click

Create a handler for the RESERVAS button:

```jsx
const handleReservasClick = () => {
  // Option 1: Open external booking URL
  window.open('https://your-booking-platform.com');

  // Option 2: Navigate to booking page
  // navigate('/reservas');

  // Option 3: Open modal/dialog
  // setShowBookingModal(true);
};
```

## Step 5: Render the Header Component

Replace the NavBar with the new Header:

```jsx
<Header
  logo="/path/to/logo.jpg"
  brandName="Monte da Estrada"
  navigationItems={navigationItems}
  sticky={true}
  onReservasClick={handleReservasClick}
  currentLanguage={currentLanguage}
  onLanguageChange={handleLanguageChange}
/>
```

## Complete Example Integration

```jsx
import { Suspense, lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import useScrollToTop from '@/hooks/useScrollToTop';

// Lazy load page components
const HomePage = lazy(() => import('@/pages/HomePage'));
const QuartosPage = lazy(() => import('@/pages/QuartosPage'));
const AtividadesPage = lazy(() => import('@/pages/AtividadesPage'));
const RedondezasPage = lazy(() => import('@/pages/RedondezasPage'));
const LocalizacaoPage = lazy(() => import('@/pages/LocalizacaoPage'));
const GaleriaPage = lazy(() => import('@/pages/GaleriaPage'));

const navigationItems = [
  { label: 'Início', path: '/' },
  { label: 'Quartos', path: '/quartos' },
  { label: 'Atividades', path: '/atividades' },
  { label: 'Redondezas', path: '/redondezas' },
  { label: 'Localização', path: '/localizacao' },
  { label: 'Galeria', path: '/galeria' },
];

const contactInfo = {
  phone: '283 647 535',
  phone2: '960 254 072',
  email: 'montedaestradazambujeiradomar@gmail.com',
  address: 'Zambujeira do Mar, 7630-568 Odemira, Alentejo',
};

const quickLinks = [
  { label: 'Início', path: '/' },
  { label: 'Quartos', path: '/quartos' },
  { label: 'Galeria', path: '/galeria' },
  { label: 'Localização', path: '/localizacao' },
];

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('PT');

  useScrollToTop();

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    // Add your language change logic here
  };

  const handleReservasClick = () => {
    // Redirect to booking platform or open modal
    window.location.href = '/reservas'; // or external booking URL
  };

  return (
    <div className="app">
      <a href="#main-content" className="skip-to-main">
        Saltar para o conteúdo principal
      </a>

      <Header
        logo="/logo.jpg"
        brandName="Monte da Estrada"
        navigationItems={navigationItems}
        sticky={true}
        onReservasClick={handleReservasClick}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      <main id="main-content" style={{ minHeight: 'calc(100vh - 192px)', paddingTop: '0px' }}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quartos" element={<QuartosPage />} />
            <Route path="/atividades" element={<AtividadesPage />} />
            <Route path="/redondezas" element={<RedondezasPage />} />
            <Route path="/localizacao" element={<LocalizacaoPage />} />
            <Route path="/galeria" element={<GaleriaPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer contactInfo={contactInfo} quickLinks={quickLinks} />
    </div>
  );
}

export default App;
```

## Important Notes

### Header Height Calculation

The header has three tiers with specific heights:
- **Tier 1 (Utility Bar)**: 40px
- **Tier 2 (Branding Bar)**: 100px
- **Tier 3 (Navigation Bar)**: 52px
- **Total Header Height**: 192px (40 + 100 + 52)

If you need to adjust main content padding, use:
```jsx
<main style={{ paddingTop: '192px' }}>
```

On tablets and mobile, the heights are reduced:
- **Tablet**: 40px + 80px + 48px = 168px
- **Mobile**: 36px + 70px + 44px = 150px

### Sticky Positioning

The Header uses sticky positioning by default. To disable:
```jsx
<Header ... sticky={false} />
```

### Responsive Behavior

The component is fully responsive:
- **Desktop (1024px+)**: Full three-tier layout
- **Tablet (768px-1023px)**: Reduced sizes, maintained layout
- **Mobile (≤480px)**: Compact sizes, horizontal nav scroll if needed

### Logo Path

You can use:
```jsx
// Relative path from public folder
logo="/logo.jpg"

// Import from assets
import logoImage from '@/assets/images/logos/logo-monte-estrada.jpg';
// Then: logo={logoImage}

// No logo (optional)
logo={null} // or omit the prop
```

## Migrating from NavBar

If you're replacing an existing NavBar component:

1. Remove the NavBar import:
   ```jsx
   // Remove this:
   import NavBar from '@/components/NavBar'
   ```

2. Remove the NavBar render:
   ```jsx
   // Remove this:
   <NavBar navItems={navItems} />
   ```

3. Add the Header import and render as shown above.

4. The old NavBar component can be deleted or archived if no longer needed.

## Styling & Customization

All colors use design tokens from `@/styles/_variables.scss`:

- **Primary Black**: `$color-primary` (#0A0203)
- **Accent Gold**: `$color-accent` (#FBAB18)
- **Neutral Gray**: `$color-neutral-dark-gray` (#777777)
- **White**: `$color-neutral-white` (#FFFFFF)

To customize colors globally, update the variables in `src/styles/_variables.scss`.

## Testing

The Header component includes comprehensive tests. To run tests (once configured):

```bash
npm test
```

Tests cover:
- Rendering of all three tiers
- Language selection
- Navigation highlighting
- Button callbacks
- Accessibility features

## Troubleshooting

### Header appearing below content

Make sure to adjust main content padding or margin-top:
```jsx
<main style={{ paddingTop: '192px' }}>
```

Or use a CSS variable:
```css
main {
  padding-top: var(--header-height, 192px);
}
```

### Language switching not working

Ensure you're passing both `currentLanguage` and `onLanguageChange`:
```jsx
<Header
  ...
  currentLanguage={currentLanguage}
  onLanguageChange={handleLanguageChange}
/>
```

### Navigation not highlighting

The active link is determined by the current route. Make sure your navigation paths match your React Router routes exactly.

### Logo not displaying

Verify the logo path is correct and the image exists. Check browser console for 404 errors.

## Browser Compatibility

The Header component works in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari 13+
- Chrome Mobile (latest)

## Next Steps

1. Update `App.jsx` with the Header component
2. Configure language switching logic if needed
3. Set up RESERVAS button functionality
4. Test responsive design on mobile/tablet
5. Deploy and monitor for issues
