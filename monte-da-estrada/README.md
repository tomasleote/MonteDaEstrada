# Monte da Estrada - Website

A modern, responsive website for Monte da Estrada, a rural guest house (turismo rural) in the Alentejo region of Portugal.

## 📋 Project Overview

This is a React-based website featuring a comprehensive design system built with SCSS modules. The site showcases the property, provides essential information to potential guests, and includes all necessary features for a professional tourism website.

## ✨ Features

- **9 Complete Pages**: Home, Facilities, Amenities, Information, Access, Region, Activities, Festivities, and Prices
- **Responsive Design**: Mobile-first approach, fully responsive on all devices
- **SCSS Design System**: Comprehensive global variables and mixins for consistent styling
- **Modern React**: Uses React 18 with functional components and hooks
- **React Router v6**: Client-side routing with all pages configured
- **Reusable Components**: NavBar, Hero, Footer, ImageGallery, ContactForm, and layout components
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML and ARIA labels
- **Performance**: Lazy loading, optimized images, code splitting ready

## 🛠️ Tech Stack

- **React** 18.3.x - UI library
- **Vite** 7.x - Build tool and dev server
- **React Router DOM** 6.x - Client-side routing
- **SCSS** - Styling with CSS Modules
- **React Hook Form** 7.x - Form state management
- **PropTypes** - Runtime type checking
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

## 📦 Installation

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

### Setup

1. **Clone the repository** (or navigate to the project folder):
   ```bash
   cd monte-da-estrada
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm test` - Run tests with Vitest

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── NavBar/         # Navigation bar with mobile menu
│   ├── Hero/           # Hero section with background image
│   ├── Footer/         # Footer with contact info
│   ├── Button/         # Reusable button component
│   ├── Container/      # Max-width container wrapper
│   ├── Section/        # Full-width section wrapper
│   ├── Grid/           # Responsive grid layout
│   ├── Card/           # Card component with hover effects
│   ├── ImageGallery/   # Photo gallery with lightbox modal
│   └── ContactForm/    # Contact form with validation
├── pages/              # Page-level components (to be implemented)
├── assets/             # Images, fonts, static files
│   ├── images/
│   └── fonts/
├── styles/             # Global SCSS files
│   ├── global.scss     # Global styles and resets
│   ├── _variables.scss # Design tokens (colors, typography, spacing)
│   └── _mixins.scss    # Reusable SCSS patterns
├── utils/              # Helper functions
├── hooks/              # Custom React hooks
├── context/            # React Context providers
├── data/               # Static content (JSON files)
├── App.jsx             # Main app component with routes
└── main.jsx            # App entry point
```

## 🎨 Design System

### Color Palette

- **Primary**: Warm earth tones (#8B6F47) - Alentejo countryside
- **Secondary**: Golden sand (#D4A574)
- **Accent**: Blue for CTAs (#116dff)
- **Text**: Dark gray (#2C2C2C) on light backgrounds
- **Background**: White primary, light beige secondary

### Typography

- **Font Family**: Arial, Helvetica, sans-serif
- **Font Sizes**: xs (12px) to 4xl (48px)
- **Font Weights**: Light (300) to Bold (700)
- **Line Heights**: Tight (1.2) to Loose (2)

### Spacing

- **Base Unit**: 8px
- **Scale**: xs (4px), sm (8px), md (16px), lg (24px), xl (32px), 2xl (48px), 3xl (64px), 4xl (80px)

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: >= 1024px

## 🧩 Component Usage

### NavBar

```jsx
import NavBar from '@/components/NavBar';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Preços', path: '/precos' },
];

<NavBar navItems={navItems} logo="/logo.png" />
```

### Hero

```jsx
import Hero from '@/components/Hero';

<Hero
  backgroundImage="/images/hero.jpg"
  title="Monte da Estrada"
  subtitle="Turismo Rural no Alentejo"
  ctaText="Ver Preços"
  ctaLink="/precos"
/>
```

### Footer

```jsx
import Footer from '@/components/Footer';

const contactInfo = {
  phone: '283 647 535',
  email: 'contact@example.com',
  address: 'Zambujeira do Mar, Alentejo',
};

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Contacto', path: '/precos' },
];

<Footer contactInfo={contactInfo} quickLinks={quickLinks} />
```

### Button

```jsx
import Button from '@/components/Button';

<Button variant="primary" size="large" onClick={handleClick}>
  Click Me
</Button>

// As a link
<Button variant="outline" href="/precos">
  Ver Preços
</Button>
```

### ImageGallery

```jsx
import ImageGallery from '@/components/ImageGallery';

const images = [
  { src: '/images/room1.jpg', alt: 'Room 1', caption: 'Deluxe Room' },
  { src: '/images/room2.jpg', alt: 'Room 2' },
];

<ImageGallery images={images} columns={3} />
```

### ContactForm

```jsx
import ContactForm from '@/components/ContactForm';

const handleSubmit = async (data) => {
  // Handle form submission
  console.log(data);
};

<ContactForm onSubmit={handleSubmit} />
```

## 🎯 Routing

All routes are configured in `src/App.jsx`:

- `/` - Home page
- `/instalacoes` - Facilities
- `/comodidades` - Amenities
- `/informacoes` - Information
- `/acessos` - Access/Location
- `/regiao` - The Region
- `/atividades` - Activities
- `/festividades` - Festivities
- `/precos` - Prices & Contact

## 🔧 Configuration

### Path Aliases

The project uses `@/` as an alias for the `src/` directory:

```javascript
// Instead of:
import Component from '../../components/Component';

// Use:
import Component from '@/components/Component';
```

### SCSS Imports

All component SCSS files should import global variables and mixins:

```scss
@import '@/styles/variables';
@import '@/styles/mixins';
```

## 📝 Next Steps

### Content

1. Extract content from the existing website (https://www.montedaestrada.com/)
2. Create JSON files in `src/data/` for each page
3. Optimize and organize images in `src/assets/images/`

### Page Implementation

1. Build individual page components in `src/pages/`
2. Replace placeholder components in `App.jsx`
3. Integrate content from data files

### Enhancements

1. Implement lazy loading for images
2. Add code splitting with React.lazy
3. Implement SEO meta tags with react-helmet-async
4. Add smooth scrolling and page transitions
5. Performance optimization
6. Testing (unit and integration tests)

### Deployment

1. Build for production: `npm run build`
2. Deploy to Netlify, Vercel, or similar platform
3. Configure custom domain (optional)

## 🤝 Contributing

This is a private project for Monte da Estrada. For any questions or changes, please contact the project maintainer.

## 📄 License

© 2026 Monte da Estrada. All rights reserved.

## 📞 Contact

- **Phone**: 283 647 535 / 960 254 072
- **Email**: montedaestradazambujeiradomar@gmail.com
- **Location**: Zambujeira do Mar, Alentejo, Portugal

---

Built with ❤️ using React, Vite, and SCSS

## 🌍 Multi-Language Support (i18n)

This website supports 5 languages, enabling visitors from different countries to view content in their preferred language.

### Supported Languages

- 🇵🇹 **Português** (Portuguese) - Default language
- 🇬🇧 **English** - International visitors
- 🇩🇪 **Deutsch** (German) - German-speaking visitors
- 🇪🇸 **Español** (Spanish) - Spanish-speaking visitors
- 🇫🇷 **Français** (French) - French-speaking visitors

### How it Works

The website uses **react-i18next** for internationalization:

1. **Automatic Language Detection**: Detects the user's browser language on first visit
2. **Manual Selection**: Users can switch languages using the globe icon in the navigation bar
3. **Persistent Preferences**: Selected language is saved to localStorage
4. **Fallback**: Defaults to Portuguese if the browser language is not supported

### Translation File Structure

Translation files are located in `public/locales/` organized by language and namespace:

```
public/locales/
├── pt/           # Portuguese translations
│   ├── common.json       # Shared UI elements (nav, footer, buttons, forms)
│   ├── home.json         # Homepage content
│   ├── quartos.json      # Rooms page
│   ├── atividades.json   # Activities page
│   ├── redondezas.json   # Surroundings page
│   ├── localizacao.json  # Location page
│   └── galeria.json      # Gallery page
├── en/           # English translations (same structure)
├── de/           # German translations (same structure)
├── es/           # Spanish translations (same structure)
└── fr/           # French translations (same structure)
```

### Adding or Editing Translations

#### Editing Existing Translations

1. Navigate to `public/locales/{language}/{namespace}.json`
2. Find the key you want to translate
3. Update the value
4. Save the file
5. Refresh the browser (no rebuild needed)

**Example** - Editing the Portuguese home page title:

```json
// public/locales/pt/home.json
{
  "hero": {
    "title": "Monte da Estrada",  // Edit this value
    "subtitle": "Turismo Rural no Alentejo"
  }
}
```

#### Adding New Translation Keys

1. Add the key to the Portuguese file first (master language):

```json
// public/locales/pt/common.json
{
  "buttons": {
    "newButton": "Novo Botão"
  }
}
```

2. Translate to all other languages (en, de, es, fr)

3. Use in your component:

```jsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation('common');
  
  return <button>{t('buttons.newButton')}</button>;
};
```

### Adding a New Language

To add support for a new language (e.g., Italian):

1. Create a new folder in `public/locales/`:
   ```bash
   mkdir public/locales/it
   ```

2. Copy all JSON files from the `pt/` folder:
   ```bash
   cp public/locales/pt/*.json public/locales/it/
   ```

3. Translate all content in the Italian files

4. Add the language to `src/i18n.js`:
   ```javascript
   supportedLngs: ['pt', 'en', 'de', 'es', 'fr', 'it'],
   ```

5. Add the language option to `src/components/LanguageSwitcher/LanguageSwitcher.jsx`:
   ```javascript
   const LANGUAGES = [
     // ... existing languages
     { code: 'it', name: 'Italiano', flag: '🇮🇹' },
   ];
   ```

### Using Translations in Components

#### Basic Usage

```jsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation('namespace');
  
  return (
    <div>
      <h1>{t('key.title')}</h1>
      <p>{t('key.description')}</p>
    </div>
  );
};
```

#### With Arrays

```jsx
const { t } = useTranslation('home');

// Translation file:
// { "items": ["Item 1", "Item 2", "Item 3"] }

const items = t('items', { returnObjects: true });
items.map((item, index) => <li key={index}>{item}</li>);
```

#### SEO Metadata

Use the `usePageMeta` hook for translated meta tags:

```jsx
import { Helmet } from 'react-helmet-async';
import usePageMeta from '@/hooks/usePageMeta';

const MyPage = () => {
  const { title, description, keywords, lang } = usePageMeta('namespace');
  
  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
      
      {/* Page content */}
    </>
  );
};
```

### Translation Namespaces

Namespaces help organize translations by page or feature:

- **common**: Shared UI elements (navigation, footer, buttons, forms, language selector)
- **home**: Homepage content
- **quartos**: Rooms page content
- **atividades**: Activities page content
- **redondezas**: Surroundings page content
- **localizacao**: Location page content
- **galeria**: Gallery page content

### Best Practices

1. **Always use translation keys** - Never hardcode text in components
2. **Keep keys organized** - Use nested objects for logical grouping
3. **Be consistent** - Use the same key structure across all languages
4. **Translate everything** - Including button labels, placeholders, error messages
5. **Test all languages** - Verify translations display correctly in each language
6. **Watch for text overflow** - German text tends to be longer; ensure UI doesn't break
7. **Update all languages together** - When adding a new key, translate it immediately

### Troubleshooting

**Translations not showing?**
- Check the browser console for i18next errors
- Verify the translation file exists in `public/locales/{lang}/{namespace}.json`
- Ensure the key path is correct (e.g., `t('footer.contact')`)
- Clear localStorage and refresh to reset language detection

**Language not persisting?**
- Check browser localStorage for `i18nextLng` key
- Ensure cookies are enabled
- Try selecting the language again

**Missing translations appear as keys?**
- Add the missing key to the translation file
- Check the namespace name matches the `useTranslation()` parameter
- Verify JSON syntax is correct (no trailing commas)

### i18n Package Information

- **i18next**: ^25.8.0 - Core i18n framework
- **react-i18next**: ^15.3.0 - React bindings with hooks
- **i18next-browser-languagedetector**: ^8.0.2 - Automatic language detection
- **i18next-http-backend**: ^3.0.2 - Dynamic translation file loading

### Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [Translation Best Practices](https://www.i18next.com/principles/best-practices)

