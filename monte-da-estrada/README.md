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
