# Implementation Plan: Multi-Language Support (i18n)

## Overview

Add professional multi-language support to Monte da Estrada website using react-i18next, enabling visitors to view content in Portuguese (default), English, German, Spanish, and French. This implementation provides automatic language detection, persistent language preferences, and a seamless language switching experience.

**Current State**: Portuguese-only website with hardcoded content in components and JSON files.

**Target State**: Fully internationalized website with 5 language options, automatic browser language detection, persistent user preferences, and a language switcher in the navigation bar.

---

## Technology Decision: react-i18next ⭐

**Selected Library**: **react-i18next** (based on i18next framework)

**Why react-i18next?**:
1. **Most Popular**: 9.8K+ GitHub stars, 6.3M+ weekly downloads
2. **100% Free**: MIT licensed with no limitations
3. **Actively Maintained**: Regular updates, excellent documentation
4. **Feature-Rich**: Built-in language detection, dynamic loading, pluralization, interpolation
5. **React-First**: Hooks API, HOC, and render props support
6. **TypeScript Support**: Full type safety for translation keys
7. **Flexible**: Multiple integration patterns, extensive plugin ecosystem
8. **SSR Compatible**: Works with Vite and modern build tools

**Bundle Size**: 22.2 KB (i18next 15.1 KB + react-i18next 7.1 KB) minified + gzipped

**Comparison to react-intl**:
- react-i18next: More features, built-in detection, 22.2 KB
- react-intl: ICU-focused, simpler, 17.8 KB
- **Decision**: Feature set outweighs 4.4 KB difference

---

## Language Strategy

### Supported Languages

| Language | Code | Native Name | Target Audience |
|----------|------|-------------|----------------|
| Portuguese | `pt` | Português | Primary (local visitors) |
| English | `en` | English | International tourists |
| German | `de` | Deutsch | Major European market |
| Spanish | `es` | Español | Spanish/Latin American visitors |
| French | `fr` | Français | French/Belgian visitors |

### Language Detection Order

1. **User Selection**: Stored in localStorage (persistent)
2. **Browser Language**: Automatic detection via navigator.language
3. **Fallback**: Portuguese (pt) as default

### Content to Translate

**All User-Facing Text**:
- Navigation menu items
- Page titles and subtitles
- Hero sections
- Feature descriptions
- Form labels and placeholders
- Button text
- Footer content
- Error messages
- Success notifications
- Meta tags (SEO)

**NOT Translated** (Dynamic Content from Decap CMS):
- Blog posts/articles content (if added later)
- User-generated content
- Image alt text (managed in CMS)

---

## Implementation Plan

### Phase 1: Setup & Configuration (Est: 1-2 hours)

#### 1.1 Install Dependencies

**Description**: Install react-i18next and related packages

**Steps**:
```bash
cd monte-da-estrada
npm install i18next@^23.20.0
npm install react-i18next@^15.3.0
npm install i18next-browser-languagedetector@^8.0.2
npm install i18next-http-backend@^3.0.2
```

**Package Purposes**:
- `i18next`: Core i18n framework
- `react-i18next`: React bindings with hooks
- `i18next-browser-languagedetector`: Auto-detect user language
- `i18next-http-backend`: Load translation files dynamically

**Dependencies**: None

---

#### 1.2 Create i18n Configuration File

**Description**: Set up i18next with language detection and backend loading

**File to create**: `src/i18n.js`

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // Load translations from /public/locales
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Fallback language if user language is not available
    fallbackLng: 'pt',

    // Supported languages
    supportedLngs: ['pt', 'en', 'de', 'es', 'fr'],

    // Disable console warnings in production
    debug: false,

    // Detection options
    detection: {
      // Order of language detection methods
      order: ['localStorage', 'navigator'],
      // Cache user language preference
      caches: ['localStorage'],
      // localStorage key name
      lookupLocalStorage: 'i18nextLng',
    },

    // Backend options
    backend: {
      // Path to translation files
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Interpolation options
    interpolation: {
      // React already escapes values
      escapeValue: false,
    },

    // Default namespace
    defaultNS: 'common',

    // Namespaces to load
    ns: ['common', 'home', 'quartos', 'atividades', 'redondezas', 'localizacao', 'galeria'],

    // React options
    react: {
      // Use Suspense for loading translations
      useSuspense: true,
    },
  });

export default i18n;
```

**Dependencies**: Task 1.1 complete

---

#### 1.3 Initialize i18n in App Entry Point

**Description**: Import i18n configuration before rendering React app

**File to modify**: `src/main.jsx`

**Changes**:
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ParallaxProvider } from 'react-scroll-parallax'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './styles/global.scss'

// Import i18n configuration BEFORE App
import './i18n'

// Detect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ParallaxProvider>
          <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
            <App />
          </MotionConfig>
        </ParallaxProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
```

**Important**: Import `./i18n` BEFORE `<App />` to ensure i18n is initialized before any component renders.

**Dependencies**: Task 1.2 complete

---

#### 1.4 Create Translation File Structure

**Description**: Create folder structure for translation files in public directory

**Folder structure to create**:
```
monte-da-estrada/public/locales/
├── pt/
│   ├── common.json
│   ├── home.json
│   ├── quartos.json
│   ├── atividades.json
│   ├── redondezas.json
│   ├── localizacao.json
│   └── galeria.json
├── en/
│   ├── common.json
│   ├── home.json
│   ├── quartos.json
│   ├── atividades.json
│   ├── redondezas.json
│   ├── localizacao.json
│   └── galeria.json
├── de/
│   └── (same structure)
├── es/
│   └── (same structure)
└── fr/
    └── (same structure)
```

**Why public/locales?**:
- Served as static assets (fast loading)
- Can be updated without rebuilding
- Backend plugin loads them dynamically
- Easy to manage and version control

**Dependencies**: None (can run in parallel with 1.2)

---

### Phase 2: Create Translation Files (Est: 3-4 hours)

#### 2.1 Create Common Translations (Navigation, Footer, Forms)

**Description**: Translate shared UI elements used across all pages

**File to create**: `public/locales/pt/common.json` (Portuguese - Master)

```json
{
  "nav": {
    "home": "Início",
    "quartos": "Quartos",
    "atividades": "Atividades",
    "redondezas": "Redondezas",
    "localizacao": "Localização",
    "galeria": "Galeria"
  },
  "footer": {
    "quickLinks": "Links Rápidos",
    "contact": "Contacto",
    "followUs": "Siga-nos",
    "allRightsReserved": "Todos os direitos reservados",
    "address": "Morada",
    "phone": "Telefone",
    "email": "Email"
  },
  "buttons": {
    "learnMore": "Saber Mais",
    "bookNow": "Reservar Agora",
    "viewRooms": "Ver Quartos",
    "viewGallery": "Ver Galeria",
    "sendMessage": "Enviar Mensagem",
    "viewMore": "Ver Mais",
    "showLess": "Mostrar Menos",
    "previous": "Anterior",
    "next": "Seguinte",
    "close": "Fechar"
  },
  "form": {
    "name": "Nome",
    "email": "Email",
    "phone": "Telefone",
    "message": "Mensagem",
    "namePlaceholder": "O seu nome",
    "emailPlaceholder": "O seu email",
    "phonePlaceholder": "O seu telefone",
    "messagePlaceholder": "A sua mensagem",
    "requiredField": "Este campo é obrigatório",
    "invalidEmail": "Email inválido",
    "sending": "A enviar...",
    "success": "Mensagem enviada com sucesso!",
    "error": "Erro ao enviar mensagem. Tente novamente."
  },
  "language": {
    "select": "Idioma",
    "pt": "Português",
    "en": "English",
    "de": "Deutsch",
    "es": "Español",
    "fr": "Français"
  },
  "accessibility": {
    "skipToMain": "Saltar para o conteúdo principal",
    "openMenu": "Abrir menu",
    "closeMenu": "Fechar menu"
  }
}
```

**Then translate to other languages**:

**English** (`public/locales/en/common.json`):
```json
{
  "nav": {
    "home": "Home",
    "quartos": "Rooms",
    "atividades": "Activities",
    "redondezas": "Surroundings",
    "localizacao": "Location",
    "galeria": "Gallery"
  },
  "footer": {
    "quickLinks": "Quick Links",
    "contact": "Contact",
    "followUs": "Follow Us",
    "allRightsReserved": "All rights reserved",
    "address": "Address",
    "phone": "Phone",
    "email": "Email"
  },
  "buttons": {
    "learnMore": "Learn More",
    "bookNow": "Book Now",
    "viewRooms": "View Rooms",
    "viewGallery": "View Gallery",
    "sendMessage": "Send Message",
    "viewMore": "View More",
    "showLess": "Show Less",
    "previous": "Previous",
    "next": "Next",
    "close": "Close"
  },
  "form": {
    "name": "Name",
    "email": "Email",
    "phone": "Phone",
    "message": "Message",
    "namePlaceholder": "Your name",
    "emailPlaceholder": "Your email",
    "phonePlaceholder": "Your phone",
    "messagePlaceholder": "Your message",
    "requiredField": "This field is required",
    "invalidEmail": "Invalid email",
    "sending": "Sending...",
    "success": "Message sent successfully!",
    "error": "Error sending message. Please try again."
  },
  "language": {
    "select": "Language",
    "pt": "Português",
    "en": "English",
    "de": "Deutsch",
    "es": "Español",
    "fr": "Français"
  },
  "accessibility": {
    "skipToMain": "Skip to main content",
    "openMenu": "Open menu",
    "closeMenu": "Close menu"
  }
}
```

**German**, **Spanish**, **French**: Similar structure with professional translations.

**Dependencies**: Task 1.4 complete

---

#### 2.2 Create HomePage Translations

**Description**: Extract all HomePage text into translation files

**File to create**: `public/locales/pt/home.json`

```json
{
  "hero": {
    "title": "Monte da Estrada",
    "subtitle": "A sua escapadela tranquila no coração do Alentejo",
    "cta": "Descobrir"
  },
  "welcome": {
    "title": "Bem-vindo ao Monte da Estrada",
    "paragraphs": [
      "Descubra um refúgio de tranquilidade no coração do Alentejo...",
      "As nossas acomodações combinam conforto moderno..."
    ]
  },
  "highlights": {
    "title": "Porquê Escolher o Monte da Estrada?",
    "items": [
      {
        "title": "Tranquilidade Alentejana",
        "description": "Desfrute da paz e sossego do campo alentejano"
      },
      {
        "title": "Praias Próximas",
        "description": "A poucos minutos das melhores praias da costa"
      },
      {
        "title": "Atividades ao Ar Livre",
        "description": "Caminhadas, birdwatching e natureza"
      },
      {
        "title": "Conforto Moderno",
        "description": "Comodidades modernas em ambiente tradicional"
      }
    ]
  },
  "information": {
    "title": "Informações Práticas",
    "checkIn": {
      "title": "Check-in",
      "time": "A partir das 15:00",
      "note": "Check-in tardio disponível mediante pedido"
    },
    "checkOut": {
      "title": "Check-out",
      "time": "Até às 11:00",
      "note": "Check-out tardio disponível mediante pedido"
    },
    "houseRules": {
      "title": "Regras da Casa",
      "rules": [
        "Não são permitidos animais de estimação",
        "Proibido fumar dentro das instalações",
        "Respeite o sossego após as 22:00"
      ]
    }
  },
  "cta": {
    "title": "Pronto para a sua escapadela?",
    "description": "Entre em contacto connosco para reservar ou esclarecer dúvidas",
    "button": "Contactar-nos"
  }
}
```

**Translate to English, German, Spanish, French** with professional, tourism-focused language.

**Dependencies**: Task 2.1 complete

---

#### 2.3 Create Remaining Page Translations

**Description**: Create translation files for all other pages

**Files to create** (for each language):
- `quartos.json` - Rooms page translations
- `atividades.json` - Activities page translations
- `redondezas.json` - Surroundings page translations
- `localizacao.json` - Location page translations
- `galeria.json` - Gallery page translations

**Example** (`localizacao.json` structure):
```json
{
  "hero": {
    "title": "Localização",
    "subtitle": "Como chegar ao Monte da Estrada"
  },
  "directions": {
    "title": "Como Chegar",
    "byCar": "De Carro",
    "fromLisbon": "De Lisboa (2h30)",
    "fromFaro": "De Faro (1h30)",
    "gps": "Coordenadas GPS"
  },
  "distances": {
    "title": "Distâncias",
    "beaches": "Praias Próximas",
    "cities": "Vilas e Cidades"
  }
}
```

**Translation Strategy**:
1. Extract existing Portuguese content from JSON files
2. Organize by page and section
3. Professional translation (use DeepL or Google Translate as base, then review)
4. Maintain consistent tone (welcoming, professional, tourism-focused)

**Dependencies**: Task 2.2 complete

---

### Phase 3: Implement Language Switcher (Est: 2-3 hours)

#### 3.1 Create LanguageSwitcher Component

**Description**: Build UI component for language selection

**Files to create**:
- `src/components/LanguageSwitcher/LanguageSwitcher.jsx`
- `src/components/LanguageSwitcher/LanguageSwitcher.module.scss`
- `src/components/LanguageSwitcher/index.js`

**LanguageSwitcher Component**:
```jsx
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './LanguageSwitcher.module.scss';

const LANGUAGES = [
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('language.select')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
        <span className={styles.currentLang}>{currentLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="menu">
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              className={`${styles.option} ${
                i18n.language === language.code ? styles.active : ''
              }`}
              onClick={() => changeLanguage(language.code)}
              role="menuitem"
            >
              <span className={styles.flag}>{language.flag}</span>
              <span className={styles.name}>{language.name}</span>
              {i18n.language === language.code && (
                <FontAwesomeIcon icon={faCheck} className={styles.checkmark} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
```

**LanguageSwitcher Styles**:
```scss
@use '@/styles' as *;

.languageSwitcher {
  position: relative;
  display: inline-block;
}

.trigger {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  background-color: transparent;
  border: 1px solid $color-border-light;
  border-radius: $border-radius-sm;
  color: $color-text-primary;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all $transition-base;

  &:hover {
    background-color: $color-bg-secondary;
    border-color: $color-primary;
  }

  &:focus {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }
}

.icon {
  font-size: $font-size-base;
  color: $color-primary;
}

.currentLang {
  font-weight: $font-weight-semibold;
  letter-spacing: 0.5px;
}

.dropdown {
  position: absolute;
  top: calc(100% + $spacing-xs);
  right: 0;
  min-width: 180px;
  background-color: $color-bg-primary;
  border: 1px solid $color-border-light;
  border-radius: $border-radius-md;
  box-shadow: $shadow-lg;
  padding: $spacing-xs 0;
  z-index: $z-index-dropdown;
  animation: fadeInDown 0.2s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.option {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  width: 100%;
  padding: $spacing-sm $spacing-md;
  background-color: transparent;
  border: none;
  color: $color-text-primary;
  font-size: $font-size-sm;
  text-align: left;
  cursor: pointer;
  transition: background-color $transition-base;

  &:hover {
    background-color: $color-bg-secondary;
  }

  &.active {
    background-color: rgba($color-primary, 0.1);
    color: $color-primary;
    font-weight: $font-weight-semibold;
  }
}

.flag {
  font-size: $font-size-lg;
  line-height: 1;
}

.name {
  flex: 1;
}

.checkmark {
  color: $color-primary;
  font-size: $font-size-sm;
}

// Mobile responsive
@media (max-width: $breakpoint-tablet) {
  .dropdown {
    right: auto;
    left: 0;
  }
}
```

**Export barrel** (`index.js`):
```js
export { default } from './LanguageSwitcher';
```

**Dependencies**: Task 2.1 complete (common translations needed)

---

#### 3.2 Add LanguageSwitcher to NavBar

**Description**: Integrate language switcher into navigation bar

**File to modify**: `src/components/NavBar/NavBar.jsx`

**Changes**:
```jsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

const NavBar = ({ navItems }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          Monte da Estrada
        </Link>

        {/* Navigation Links */}
        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </li>
          ))}
        </ul>

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Mobile Menu Toggle */}
        <button className={styles.mobileToggle}>
          <span>Menu</span>
        </button>
      </div>
    </nav>
  );
};
```

**Update NavBar styles** to accommodate language switcher (add flexbox gap, ensure proper spacing).

**Dependencies**: Task 3.1 complete

---

### Phase 4: Update Components to Use Translations (Est: 4-6 hours)

#### 4.1 Update NavBar with Translations

**Description**: Replace hardcoded navigation labels with translated text

**File to modify**: `src/components/NavBar/NavBar.jsx`

**Changes**:
```jsx
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const { t } = useTranslation('common');

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/quartos', label: t('nav.quartos') },
    { path: '/atividades', label: t('nav.atividades') },
    { path: '/redondezas', label: t('nav.redondezas') },
    { path: '/localizacao', label: t('nav.localizacao') },
    { path: '/galeria', label: t('nav.galeria') },
  ];

  return (
    <nav className={styles.navbar}>
      {/* ... rest of component */}
    </nav>
  );
};
```

**Dependencies**: Task 2.1 complete (common.json), Task 3.2 complete

---

#### 4.2 Update Footer with Translations

**Description**: Translate all footer text

**File to modify**: `src/components/Footer/Footer.jsx`

**Changes**:
```jsx
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>{t('footer.quickLinks')}</h3>
          {/* Links */}
        </div>

        <div className={styles.section}>
          <h3>{t('footer.contact')}</h3>
          <p>{t('footer.address')}: ...</p>
          <p>{t('footer.phone')}: ...</p>
          <p>{t('footer.email')}: ...</p>
        </div>

        <div className={styles.section}>
          <h3>{t('footer.followUs')}</h3>
          {/* Social links */}
        </div>
      </div>

      <div className={styles.copyright}>
        <p>© {new Date().getFullYear()} Monte da Estrada. {t('footer.allRightsReserved')}.</p>
      </div>
    </footer>
  );
};
```

**Dependencies**: Task 2.1 complete

---

#### 4.3 Update HomePage with Translations

**Description**: Replace all HomePage text with translation keys

**File to modify**: `src/pages/HomePage/HomePage.jsx`

**Changes**:
```jsx
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation('home');

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <Hero
        backgroundImage="/images/hero-home.jpg"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctaText={t('hero.cta')}
        ctaLink="/quartos"
      />

      {/* Welcome Section */}
      <Section padding="large">
        <Container>
          <motion.div className={styles.welcome}>
            <motion.h2>{t('welcome.title')}</motion.h2>
            {t('welcome.paragraphs', { returnObjects: true }).map((paragraph, index) => (
              <motion.p key={index}>{paragraph}</motion.p>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Highlights Section */}
      <Section background="light" padding="large">
        <Container>
          <h2>{t('highlights.title')}</h2>
          <Grid columns={4} gap="large">
            {t('highlights.items', { returnObjects: true }).map((item, index) => (
              <Card key={index}>
                <Icon name={item.icon} size="xl" color="primary" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </div>
  );
};
```

**Note**: Use `returnObjects: true` when translating arrays/objects from JSON.

**Dependencies**: Task 2.2 complete

---

#### 4.4 Update Remaining Pages with Translations

**Description**: Apply translations to all other pages

**Files to modify**:
- `src/pages/QuartosPage/QuartosPage.jsx` - Use `useTranslation('quartos')`
- `src/pages/AtividadesPage/AtividadesPage.jsx` - Use `useTranslation('atividades')`
- `src/pages/RedondezasPage/RedondezasPage.jsx` - Use `useTranslation('redondezas')`
- `src/pages/LocalizacaoPage/LocalizacaoPage.jsx` - Use `useTranslation('localizacao')`
- `src/pages/GaleriaPage/GaleriaPage.jsx` - Use `useTranslation('galeria')`

**Pattern**:
```jsx
import { useTranslation } from 'react-i18next';

const PageName = () => {
  const { t } = useTranslation('namespace');

  return (
    <div>
      <h1>{t('hero.title')}</h1>
      {/* Use t() function for all text */}
    </div>
  );
};
```

**Dependencies**: Task 2.3 complete, Task 4.3 complete

---

#### 4.5 Update ContactForm with Translations

**Description**: Translate form labels, placeholders, validation messages

**File to modify**: `src/components/ContactForm/ContactForm.jsx`

**Changes**:
```jsx
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { t } = useTranslation('common');

  return (
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name">{t('form.name')}</label>
        <input
          id="name"
          type="text"
          placeholder={t('form.namePlaceholder')}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">{t('form.email')}</label>
        <input
          id="email"
          type="email"
          placeholder={t('form.emailPlaceholder')}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">{t('form.message')}</label>
        <textarea
          id="message"
          placeholder={t('form.messagePlaceholder')}
          rows="5"
          required
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        {isSubmitting ? t('form.sending') : t('form.sendMessage')}
      </button>

      {/* Success/Error Messages */}
      {success && <p className={styles.success}>{t('form.success')}</p>}
      {error && <p className={styles.error}>{t('form.error')}</p>}
    </form>
  );
};
```

**Dependencies**: Task 2.1 complete

---

### Phase 5: SEO & Metadata Translations (Est: 1-2 hours)

#### 5.1 Create SEO Translation Hook

**Description**: Custom hook for translating meta tags and page titles

**File to create**: `src/hooks/usePageMeta.js`

```javascript
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

/**
 * Custom hook for managing translated page metadata
 * @param {string} namespace - Translation namespace (e.g., 'home', 'quartos')
 * @param {string} pageKey - Key for page-specific translations
 */
const usePageMeta = (namespace, pageKey = 'meta') => {
  const { t, i18n } = useTranslation(namespace);

  const title = t(`${pageKey}.title`, { defaultValue: 'Monte da Estrada' });
  const description = t(`${pageKey}.description`, { defaultValue: '' });
  const keywords = t(`${pageKey}.keywords`, { defaultValue: '' });

  return {
    title: `${title} | Monte da Estrada`,
    description,
    keywords,
    lang: i18n.language,
  };
};

export default usePageMeta;
```

**Dependencies**: None

---

#### 5.2 Add Meta Translations to Translation Files

**Description**: Add SEO metadata to each page's translation file

**Example** (`public/locales/pt/home.json`):
```json
{
  "meta": {
    "title": "Início - Monte da Estrada",
    "description": "Casa de férias no coração do Alentejo. Tranquilidade, conforto e praias próximas.",
    "keywords": "alentejo, casa férias, turismo rural, portugal, praias"
  },
  "hero": {
    // ... existing content
  }
}
```

**Translate for all languages and all pages**.

**Dependencies**: Task 5.1 complete

---

#### 5.3 Implement Meta Tags in Pages

**Description**: Use usePageMeta hook to set translated meta tags

**File to modify**: `src/pages/HomePage/HomePage.jsx`

**Changes**:
```jsx
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import usePageMeta from '@/hooks/usePageMeta';

const HomePage = () => {
  const { t } = useTranslation('home');
  const { title, description, keywords, lang } = usePageMeta('home');

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content={lang === 'pt' ? 'pt_PT' : lang} />
      </Helmet>

      <div className={styles.homePage}>
        {/* Page content */}
      </div>
    </>
  );
};
```

**Apply to all pages**.

**Dependencies**: Task 5.2 complete

---

### Phase 6: Testing & Refinement (Est: 2-3 hours)

#### 6.1 Test Language Detection

**Description**: Verify automatic language detection works correctly

**Test Cases**:
1. **First Visit**: Should detect browser language
2. **User Selection**: Should save to localStorage
3. **Return Visit**: Should load saved preference
4. **Browser Language Change**: Should update if no saved preference
5. **Unsupported Language**: Should fallback to Portuguese

**Testing Steps**:
```bash
# Test in different browsers
1. Chrome - Set language to English, clear localStorage, refresh
2. Firefox - Set language to German, clear localStorage, refresh
3. Safari - Set language to French, clear localStorage, refresh

# Test localStorage persistence
1. Select Spanish
2. Refresh page
3. Verify Spanish is still active

# Test fallback
1. Set browser to Chinese (not supported)
2. Verify Portuguese loads as fallback
```

**Dependencies**: All Phase 4 tasks complete

---

#### 6.2 Test All Pages in All Languages

**Description**: Comprehensive manual testing of all translations

**Test Matrix**:

| Page | PT | EN | DE | ES | FR |
|------|----|----|----|----|-----|
| Home | ✓ | ✓ | ✓ | ✓ | ✓ |
| Quartos | ✓ | ✓ | ✓ | ✓ | ✓ |
| Atividades | ✓ | ✓ | ✓ | ✓ | ✓ |
| Redondezas | ✓ | ✓ | ✓ | ✓ | ✓ |
| Localização | ✓ | ✓ | ✓ | ✓ | ✓ |
| Galeria | ✓ | ✓ | ✓ | ✓ | ✓ |

**What to check**:
- All text is translated (no hardcoded strings)
- Translations are grammatically correct
- UI doesn't break with longer text (German tends to be longer)
- Special characters display correctly (ç, ñ, ü, é, à)
- Navigation works in all languages
- Forms validate properly in all languages

**Dependencies**: Task 6.1 complete

---

#### 6.3 Test Responsive Behavior

**Description**: Ensure language switcher works on mobile

**Test Cases**:
1. Language switcher visible on mobile
2. Dropdown positioning correct on small screens
3. Touch interaction works smoothly
4. Flag emojis render correctly on all devices

**Dependencies**: Task 6.2 complete

---

#### 6.4 Performance Testing

**Description**: Verify translations don't impact load time significantly

**Metrics to check**:
- Initial page load time (should be similar to before)
- Language switch speed (should be instant)
- Translation file size (each ~5-10 KB per language)
- Total bundle size increase (should be ~22 KB for react-i18next)

**Tools**:
- Chrome DevTools Network tab
- Lighthouse performance audit
- React DevTools Profiler

**Dependencies**: Task 6.3 complete

---

### Phase 7: Documentation & Deployment (Est: 1 hour)

#### 7.1 Update README with i18n Information

**Description**: Document how to add/edit translations

**Add section to README.md**:
```markdown
## 🌍 Multi-Language Support

This website supports 5 languages:
- 🇵🇹 Português (Portuguese) - Default
- 🇬🇧 English
- 🇩🇪 Deutsch (German)
- 🇪🇸 Español (Spanish)
- 🇫🇷 Français (French)

### How Translations Work

Translations are managed using [react-i18next](https://react.i18next.com/). Translation files are located in `public/locales/{language}/{namespace}.json`.

### Adding a New Translation

1. Locate the translation file in `public/locales/`
2. Find the appropriate namespace (e.g., `home.json`, `common.json`)
3. Add your translation key and value:
   ```json
   {
     "newKey": "Your translated text"
   }
   ```
4. Use in component:
   ```jsx
   const { t } = useTranslation('namespace');
   <p>{t('newKey')}</p>
   ```

### Adding a New Language

1. Create folder: `public/locales/{lang-code}/`
2. Copy all JSON files from `pt/` folder
3. Translate all strings
4. Add language to `src/i18n.js` supportedLngs array
5. Add to LanguageSwitcher component

### Editing Existing Translations

Translations can be edited directly in JSON files in `public/locales/`. Changes will be reflected immediately after page refresh (no rebuild needed).

### Language Detection

The website automatically detects the user's browser language. Users can manually change language using the globe icon in the navigation bar. The selected language is saved to localStorage.
```

**Dependencies**: All previous tasks complete

---

#### 7.2 Add Translation File to .gitignore (Optional)

**Description**: If using a TMS (Translation Management System), ignore auto-generated files

**File to modify**: `.gitignore`

**Add** (only if using automated translation updates):
```
# Translation files (if managed externally)
# public/locales/*/auto-generated.json
```

**Note**: For this project, commit all translation files to Git for version control.

**Dependencies**: None

---

## Testing Strategy

### Automated Testing

**Unit Tests** (Jest + React Testing Library):
```jsx
// Test translation rendering
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

test('renders translated navigation', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <NavBar />
    </I18nextProvider>
  );

  expect(screen.getByText('Home')).toBeInTheDocument();
});
```

**Integration Tests**:
- Language switcher changes language
- localStorage persists language selection
- Translations load correctly on route change

### Manual Testing Checklist

**Functionality**:
- [ ] All pages translate correctly
- [ ] Language switcher works on all pages
- [ ] Browser language detection works
- [ ] localStorage persistence works
- [ ] Fallback language works for unsupported languages
- [ ] Forms validate in all languages
- [ ] Navigation labels update correctly

**Visual**:
- [ ] No layout breaks with longer text (German)
- [ ] Flag emojis render correctly
- [ ] Dropdown positioning correct on mobile
- [ ] No text overflow issues
- [ ] Proper text alignment (RTL not needed for these languages)

**Performance**:
- [ ] Page load time similar to before
- [ ] Language switching is instant
- [ ] No console errors or warnings
- [ ] Translation files load efficiently

**Accessibility**:
- [ ] Language switcher keyboard accessible
- [ ] Proper `lang` attribute on HTML element
- [ ] Screen readers announce language changes
- [ ] ARIA labels work in all languages

---

## Success Criteria

### Functional Requirements ✅

- [x] 5 languages supported (PT, EN, DE, ES, FR)
- [x] Automatic browser language detection
- [x] Manual language selection via switcher
- [x] Language preference persists in localStorage
- [x] All user-facing text is translatable
- [x] SEO meta tags translated
- [x] Forms work in all languages
- [x] Navigation updates with language

### Technical Requirements ✅

- [x] Translation files organized by namespace
- [x] Dynamic translation loading (i18next-http-backend)
- [x] React hooks integration (useTranslation)
- [x] TypeScript support (if migrated later)
- [x] No hardcoded strings in components
- [x] Proper fallback handling

### User Experience Requirements ✅

- [x] Seamless language switching (no page reload)
- [x] Intuitive language switcher UI
- [x] Visual feedback for current language
- [x] Mobile-friendly language selector
- [x] Fast language detection on first visit
- [x] Consistent translations across pages

### Performance Requirements ✅

- [x] Bundle size increase < 30KB
- [x] Translation files < 15KB each
- [x] Language switching < 100ms
- [x] No impact on Lighthouse score
- [x] Lazy loading of translations

---

## Maintenance & Future Enhancements

### Regular Maintenance

**Quarterly Review**:
1. Review translation quality with native speakers
2. Update terminology based on user feedback
3. Add missing translations for new features
4. Check for outdated or incorrect translations

**New Content Workflow**:
1. Write new feature in Portuguese (master language)
2. Add translation keys to `pt/` files
3. Translate to other languages
4. Test in all languages before deployment

### Future Enhancements

**Phase 8 (Optional)**:
1. **Translation Management System (TMS)**: Integrate with Lokalise, Phrase, or Crowdin for easier translation management
2. **Automatic Translation**: Use Google Translate API for draft translations
3. **Translation Coverage Report**: Script to detect missing translations
4. **User-Contributed Translations**: Allow users to suggest translation improvements
5. **More Languages**: Add Italian, Dutch, Russian, Chinese based on visitor analytics
6. **RTL Support**: Add Arabic/Hebrew if targeting those markets
7. **Locale-Specific Formatting**: Date/time/currency formatting per locale
8. **Content Variants**: Different content for different regions (not just translation)

---

## Resources & Documentation

### Official Documentation
- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)
- [i18next-http-backend](https://github.com/i18next/i18next-http-backend)

### Translation Resources
- [DeepL Translator](https://www.deepl.com/translator) - High-quality automatic translation
- [Google Translate](https://translate.google.com/) - Quick translations
- [Linguee](https://www.linguee.com/) - Context-based translations
- [CLDR Language Data](https://cldr.unicode.org/) - Date/number formatting standards

### Best Practices
- [W3C Internationalization](https://www.w3.org/International/)
- [MDN Web Docs: Localization](https://developer.mozilla.org/en-US/docs/Mozilla/Localization)
- [Phrase I18n Blog](https://phrase.com/blog/)

---

## Migration Checklist

### Pre-Implementation
- [ ] Backup current codebase (Git commit)
- [ ] Review all existing Portuguese content
- [ ] Note current bundle size
- [ ] Test site on target devices

### Phase 0: Setup
- [ ] Install react-i18next packages
- [ ] Create i18n.js configuration
- [ ] Initialize i18n in main.jsx
- [ ] Create folder structure for translations

### Phase 1-2: Translations
- [ ] Create common.json for all languages
- [ ] Create home.json for all languages
- [ ] Create page-specific translations (quartos, atividades, etc.)
- [ ] Review translations with native speakers

### Phase 3: UI Implementation
- [ ] Build LanguageSwitcher component
- [ ] Add to NavBar
- [ ] Style for desktop and mobile
- [ ] Test accessibility

### Phase 4: Component Updates
- [ ] Update NavBar with translations
- [ ] Update Footer with translations
- [ ] Update HomePage with translations
- [ ] Update all other pages
- [ ] Update ContactForm with translations

### Phase 5: SEO
- [ ] Create usePageMeta hook
- [ ] Add meta translations to all pages
- [ ] Implement Helmet on all pages
- [ ] Verify meta tags in all languages

### Phase 6: Testing
- [ ] Test language detection
- [ ] Test all pages in all languages
- [ ] Test responsive behavior
- [ ] Performance testing
- [ ] Accessibility audit

### Phase 7: Documentation
- [ ] Update README.md
- [ ] Document translation workflow
- [ ] Create translation guidelines

---

## Timeline Estimate

| Phase | Tasks | Estimated Time |
|-------|-------|----------------|
| **Phase 1** | Setup & Configuration | 1-2 hours |
| **Phase 2** | Create Translations | 3-4 hours |
| **Phase 3** | Language Switcher | 2-3 hours |
| **Phase 4** | Update Components | 4-6 hours |
| **Phase 5** | SEO & Metadata | 1-2 hours |
| **Phase 6** | Testing | 2-3 hours |
| **Phase 7** | Documentation | 1 hour |

**Total Estimated Time**: **14-21 hours** (2-3 days of focused work)

**Contingency**: Add 20% buffer = **17-25 hours**

---

## Summary

This plan adds professional multi-language support to Monte da Estrada using **react-i18next**, the industry-standard i18n solution for React applications. The implementation enables visitors to view the entire website in their preferred language (Portuguese, English, German, Spanish, or French) with automatic browser detection and persistent preferences.

**Key Features**:
- 🌍 **5 Languages**: PT (default), EN, DE, ES, FR
- 🤖 **Auto-Detection**: Detects browser language automatically
- 💾 **Persistence**: Saves user preference to localStorage
- 🎨 **UI Integration**: Clean language switcher in navigation
- 📱 **Mobile-Friendly**: Responsive design for all devices
- ⚡ **Performance**: Lazy loading, only 22 KB bundle increase
- ♿ **Accessible**: Full keyboard navigation and ARIA support
- 🔍 **SEO-Optimized**: Translated meta tags for all languages

**Technology Stack**:
- **react-i18next** (9.8K+ stars, 6.3M+ weekly downloads)
- **i18next-browser-languagedetector** (automatic language detection)
- **i18next-http-backend** (dynamic translation loading)
- Translation files organized by namespace (common, home, quartos, etc.)

The result will be a **globally accessible website** that welcomes international visitors in their native language, improving user experience and expanding your potential audience across Europe and beyond.

---

**This plan is ready for implementation!**

To begin:
1. Review plan with stakeholders
2. Commit current codebase to Git
3. Start with Phase 1: Setup & Configuration
4. Follow phases sequentially
5. Test thoroughly in all languages before deployment

**Estimated completion**: 2-3 days of focused development

---

*Generated: 2026-01-20*
*Plan Version: 1.0*
*Status: Ready for Implementation*
