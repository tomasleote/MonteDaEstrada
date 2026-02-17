# Component Integration Guide
## Monte da Estrada - Modular Components for Parent Site Integration

**Document Version:** 1.0
**Created:** February 15, 2026
**Purpose:** Guide for integrating Monte da Estrada components into the Herdade do Touril parent site

---

## Table of Contents
1. [Standalone Components](#standalone-components)
2. [Header Component](#header-component)
3. [Footer Component](#footer-component)
4. [Styling Integration](#styling-integration)
5. [Communication & Events](#communication--events)
6. [Package Export Configuration](#package-export-configuration)

---

## 1. Standalone Components

### Overview
Monte da Estrada components are designed to be extraction-ready for integration into the Herdade do Touril parent site. All components follow these principles:

- **Style Isolation**: SCSS Modules prevent CSS leakage
- **Self-Contained**: No external state dependencies
- **Event-Driven**: Custom events for parent communication
- **Responsive**: Mobile-first, fully responsive design
- **Accessible**: WCAG 2.1 AA compliant

### Available Components
- **Header** - Three-tier navigation matching Touril design
- **Footer** - Multi-column footer with links and contact info

---

## 2. Header Component

### Export Location
```javascript
// Primary export
export { default as Header } from 'monte-da-estrada/components/Header';

// File path
src/components/Header/index.js
```

### Import in Parent Site
```javascript
import { Header } from 'monte-da-estrada/components/Header';
// OR
import Header from 'monte-da-estrada/components/Header';
```

### Usage Example
```jsx
import React, { useState } from 'react';
import { Header } from 'monte-da-estrada/components/Header';
import logoImage from './assets/logo.png';

const ParentSiteLayout = () => {
  const [currentLang, setCurrentLang] = useState('PT');

  const navigationItems = [
    { label: 'Início', path: '/monte-da-estrada' },
    { label: 'Quartos', path: '/monte-da-estrada/quartos' },
    { label: 'Atividades', path: '/monte-da-estrada/atividades' },
    { label: 'Galeria', path: '/monte-da-estrada/galeria' },
    { label: 'Localização', path: '/monte-da-estrada/localizacao' }
  ];

  const handleReservasClick = () => {
    // Open booking system or navigate to booking page
    window.location.href = 'https://booking.herdadedotouril.com/monte-da-estrada';
  };

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    // Trigger language switch in parent site
    // e.g., i18n.changeLanguage(lang);
  };

  return (
    <div className="parent-site-container">
      <Header
        logo={logoImage}
        brandName="Monte da Estrada"
        navigationItems={navigationItems}
        sticky={true}
        onReservasClick={handleReservasClick}
        currentLanguage={currentLang}
        onLanguageChange={handleLanguageChange}
      />

      {/* Page content */}
    </div>
  );
};

export default ParentSiteLayout;
```

### Props Documentation

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `logo` | `string` | No | `null` | URL to logo image (absolute or relative path) |
| `brandName` | `string` | **Yes** | - | Property/brand name displayed in Tier 2 |
| `navigationItems` | `Array<{label: string, path: string}>` | **Yes** | `[]` | Array of navigation menu items |
| `sticky` | `boolean` | No | `true` | Enable sticky positioning on scroll |
| `onReservasClick` | `function` | No | `undefined` | Callback when RESERVAS button is clicked |
| `currentLanguage` | `'EN' \| 'PT'` | No | `'PT'` | Currently active language |
| `onLanguageChange` | `function` | No | `undefined` | Callback when language is changed: `(lang) => void` |

### Event Callbacks

#### onReservasClick
Triggered when user clicks the "RESERVAS" button in Tier 2.

```javascript
const handleReservasClick = () => {
  console.log('User clicked RESERVAS button');
  // Navigate to booking page or open modal
};
```

#### onLanguageChange
Triggered when user switches language in Tier 1.

```javascript
const handleLanguageChange = (language) => {
  console.log(`Language switched to: ${language}`); // 'EN' or 'PT'
  // Update application language
};
```

### CSS Module Integration

The Header component uses scoped SCSS modules. To customize:

#### Option 1: CSS Variables (Recommended)
Override CSS custom properties in parent site:

```css
:root {
  --monte-header-utility-bg: #f5f5f5;
  --monte-header-branding-bg: #000000;
  --monte-header-nav-bg: #ffffff;
  --monte-header-accent: rgb(251, 171, 24);
  --monte-header-text: #ffffff;
}
```

#### Option 2: Wrapper Class
Wrap the Header in a custom className with higher specificity:

```jsx
<div className="touril-header-wrapper">
  <Header {...props} />
</div>
```

```css
.touril-header-wrapper {
  /* Custom overrides */
  .header {
    /* Specific adjustments */
  }
}
```

#### Option 3: SCSS Variable Override
If bundling together, override SCSS variables before import:

```scss
// In parent site's main.scss
$header-utility-bg: #f0f0f0;
$header-branding-bg: #1a1a1a;

@import 'monte-da-estrada/components/Header/Header.module.scss';
```

---

## 3. Footer Component

### Export Location
```javascript
export { default as Footer } from 'monte-da-estrada/components/Footer';
```

### Import & Usage
```jsx
import { Footer } from 'monte-da-estrada/components/Footer';

const contactInfo = {
  phone: '283 647 535',
  phone2: '960 254 072',
  email: 'montedaestradazambujeiradomar@gmail.com',
  address: 'Zambujeira do Mar, 7630-568 Odemira, Alentejo'
};

const footerLinks = [
  { label: 'Início', path: '/' },
  { label: 'Quartos', path: '/quartos' },
  { label: 'Galeria', path: '/galeria' },
  { label: 'Localização', path: '/localizacao' }
];

<Footer
  companyName="Monte da Estrada"
  contactInfo={contactInfo}
  quickLinks={footerLinks}
  socialLinks={[
    { platform: 'facebook', url: 'https://facebook.com/...' },
    { platform: 'instagram', url: 'https://instagram.com/...' }
  ]}
/>
```

### Props Documentation

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `companyName` | `string` | **Yes** | - | Property/company name |
| `contactInfo` | `Object` | **Yes** | - | Contact details (phone, email, address) |
| `quickLinks` | `Array<{label, path}>` | No | `[]` | Quick navigation links |
| `socialLinks` | `Array<{platform, url}>` | No | `[]` | Social media links |

---

## 4. Styling Integration

### SCSS Modules Scoping
All components use SCSS Modules with automatic class name scoping:

```scss
// Component styles are automatically scoped
.header { } → .Header_header__abc123 { }
.navLink { } → .Header_navLink__def456 { }
```

**Benefits:**
- ✅ No global namespace pollution
- ✅ No CSS conflicts with parent site
- ✅ Safe to embed alongside other components
- ✅ Tree-shakeable styles

### Global Dependencies

#### Required Font Imports
Add these to the parent site's `<head>` or main CSS:

```html
<!-- In index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
```

Or in CSS:
```css
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
```

#### Optional CSS Variables for Theming
```css
:root {
  /* Header Colors */
  --monte-primary-color: #000000;
  --monte-accent-color: rgb(251, 171, 24);
  --monte-text-color: #ffffff;
  --monte-bg-color: #ffffff;
  --monte-gray-color: #f5f5f5;

  /* Transitions */
  --monte-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
  --monte-transition-duration: 0.3s;

  /* Typography */
  --monte-font-family: 'Open Sans', sans-serif;
  --monte-font-size-base: 14px;
  --monte-font-weight-bold: 700;
}
```

### No Global Styles Required
The components are **fully self-contained** and will not leak styles to the parent site.

**What's Isolated:**
- Component class names (via CSS Modules)
- Internal layout (flexbox, grid)
- Typography (scoped to component)
- Colors and backgrounds
- Spacing and sizing

**What's NOT Isolated (intentional):**
- Font families (requires global import)
- CSS custom properties (opt-in theming)
- Root-level utility classes (prefixed with `monte-`)

---

## 5. Communication & Events

### Custom Events
Components emit custom events for parent site integration:

#### Header Events
```javascript
// Event: Language Change
window.addEventListener('monte:header:languageChange', (event) => {
  console.log('New language:', event.detail.language); // 'EN' or 'PT'
});

// Event: RESERVAS Button Click
window.addEventListener('monte:header:reservasClick', (event) => {
  console.log('RESERVAS button clicked');
  // Open booking modal or navigate
});

// Event: Navigation Click
window.addEventListener('monte:header:navClick', (event) => {
  console.log('Navigation item clicked:', event.detail.path);
});
```

#### Footer Events
```javascript
// Event: Footer Link Click
window.addEventListener('monte:footer:linkClick', (event) => {
  console.log('Footer link clicked:', event.detail.path);
});

// Event: Social Link Click
window.addEventListener('monte:footer:socialClick', (event) => {
  console.log('Social link clicked:', event.detail.platform);
});
```

### Custom Event Implementation (Advanced)

If you need to add custom events to components:

```javascript
// Inside Header component
const handleReservasClick = () => {
  // Emit custom event
  const event = new CustomEvent('monte:header:reservasClick', {
    detail: { timestamp: Date.now() },
    bubbles: true,
    composed: true
  });
  window.dispatchEvent(event);

  // Also call prop callback
  onReservasClick?.();
};
```

### React Context Integration

For deeper integration, wrap components in React Context:

```jsx
import { MonteContextProvider } from 'monte-da-estrada/context';

<MonteContextProvider value={{ language: 'PT', theme: 'light' }}>
  <Header {...props} />
  <Footer {...props} />
</MonteContextProvider>
```

---

## 6. Package Export Configuration

### NPM Package (Future)

If packaging Monte da Estrada as an npm module:

**package.json**
```json
{
  "name": "monte-da-estrada-components",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./components/Header": {
      "import": "./dist/components/Header/index.js",
      "types": "./dist/components/Header/index.d.ts"
    },
    "./components/Footer": {
      "import": "./dist/components/Footer/index.js",
      "types": "./dist/components/Footer/index.d.ts"
    },
    "./styles": {
      "import": "./dist/styles/index.css"
    }
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "react-router-dom": "^6.0.0"
  }
}
```

**dist/index.js** (Main export)
```javascript
export { default as Header } from './components/Header';
export { default as Footer } from './components/Footer';
```

### Installation in Parent Site
```bash
npm install monte-da-estrada-components
# OR
yarn add monte-da-estrada-components
```

### Import in Parent Site
```javascript
import { Header, Footer } from 'monte-da-estrada-components';
import 'monte-da-estrada-components/styles';
```

---

## Integration Checklist

### Pre-Integration
- [ ] Review component props and callbacks
- [ ] Ensure React Router v6+ is installed
- [ ] Import required fonts (Open Sans)
- [ ] Set up CSS variables (optional)
- [ ] Plan event handling for RESERVAS and language switching

### During Integration
- [ ] Import Header component
- [ ] Pass all required props (brandName, navigationItems)
- [ ] Implement callback functions (onReservasClick, onLanguageChange)
- [ ] Test navigation paths match routing structure
- [ ] Verify sticky positioning works as expected

### Post-Integration
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Verify no style conflicts with parent site
- [ ] Test keyboard navigation (Tab, Enter, Space)
- [ ] Run accessibility audit (Lighthouse, axe DevTools)
- [ ] Verify events are emitted correctly
- [ ] Test language switching
- [ ] Validate RESERVAS button behavior

---

## Troubleshooting

### Issue: Styles Not Applying
**Solution:** Ensure SCSS Modules are configured in your build tool (Webpack, Vite).

```javascript
// vite.config.js
export default {
  css: {
    modules: {
      scopeBehaviour: 'local'
    }
  }
}
```

### Issue: Fonts Not Loading
**Solution:** Add font import to `<head>` or main CSS file.

### Issue: Navigation Not Working
**Solution:** Ensure React Router `<BrowserRouter>` wraps the Header component.

```jsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter basename="/monte-da-estrada">
  <Header {...props} />
</BrowserRouter>
```

### Issue: Events Not Firing
**Solution:** Verify event listener names match custom event names exactly.

```javascript
// Correct
window.addEventListener('monte:header:reservasClick', handler);

// Incorrect
window.addEventListener('reservasClick', handler);
```

---

## Support & Documentation

- **Component README**: `src/components/Header/README.md`
- **Design Specs**: `HEADER-DESIGN-SPECS.md`
- **Integration Guide**: This document
- **Routing Guide**: `ROUTING-INTEGRATION.md`
- **GitHub Issues**: [Report issues](https://github.com/tomasleote/MonteDaEstrada/issues)

---

**Document Status:** ✅ Complete
**Last Updated:** February 15, 2026
**Maintained By:** Monte da Estrada Development Team
