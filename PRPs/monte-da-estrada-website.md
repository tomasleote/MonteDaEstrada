# Implementation Plan: Monte da Estrada Website

## Overview
Build a complete React-based website for Monte da Estrada, a rural guest house (turismo rural) in the Alentejo region of Portugal. The website will showcase the property, provide essential information to potential guests, and feature a comprehensive SCSS-based design system inspired by Monte do Papa Léguas.

## Requirements Summary
- **9-page React website** with responsive design
- **SCSS-only styling** (NO Tailwind CSS) using CSS Modules pattern
- **Mobile-first approach** with full responsive support
- **Content extracted** from existing Monte da Estrada website
- **Design inspiration** from Monte do Papa Léguas layout and UX patterns
- **Performance optimized** (lazy loading, code splitting, WebP images)
- **SEO and accessibility** compliant (ARIA labels, semantic HTML, meta tags)
- **Admin panel** (Phase 2 - implemented LAST after core website)

## Research Findings

### Best Practices (React 2025/2026)
- **Functional components with hooks** are the standard (no class components)
- **Custom hooks** for reusable logic and separation of concerns
- **React.memo, useMemo, useCallback** for performance optimization
- **React Hook Form** for efficient form handling
- **React Router v6** with new Routes/Route API and useNavigate hook
- **Code splitting** with React.lazy and Suspense
- **Container/Presentational** component pattern for separation
- **Context API** for state management without prop drilling

Sources:
- [React Design Patterns and Best Practices for 2025](https://www.telerik.com/blogs/react-design-patterns-best-practices)
- [React Stack Patterns](https://www.patterns.dev/react/react-2026/)
- [33 React JS Best Practices For 2026](https://technostacks.com/blog/react-best-practices/)

### React Router v6 Setup
- Install: `npm install react-router-dom@6`
- Wrap root component in `<BrowserRouter>`
- Use `Routes` and `Route` components with element prop
- Navigation with `Link` component and `useNavigate` hook
- Nested routes with `Outlet` component
- Simplified routing (no more `exact` prop needed)

Sources:
- [How to Setup React Router v6? | Tutorial 2025](https://www.guvi.in/blog/how-to-setup-react-router-v6-tutorial/)
- [React Router Official Documentation](https://reactrouter.com/)
- [Ultimate React Router v6 Guide](https://blog.webdevsimplified.com/2022-07/react-router/)

### Vite + React + SCSS Modules Setup
- Vite has **built-in SCSS support** - no special plugins needed
- Install SCSS preprocessor: `npm add -D sass-embedded` or `npm add -D sass`
- CSS Modules: use `.module.scss` extension
- Import in components: `import styles from './Component.module.scss'`
- Path aliases configured in `vite.config.js` for `@/` → `src/`

Sources:
- [How to setup SASS in Vite Environment](https://dev.to/godwin_nj/how-to-work-with-sass-in-vite-environment-and-brief-notes-on-important-sass-functionalities-k2)
- [Setting up Vite with React, Sass and TypeScript](https://harbiola.hashnode.dev/setting-up-vite-with-react-sass-and-typescript)
- [Vite Features Guide](https://vite.dev/guide/features)

### Reference Design Analysis (Monte do Papa Léguas)
- **Layout**: Grid-based mesh layout with flexbox components
- **Navigation**: Hierarchical menu with dropdown support, responsive mobile menu
- **Transitions**: 0.4s fade, 0.6s slide animations with cubic-bezier easing
- **Typography**: Arial/Helvetica system fonts, responsive sizing
- **Spacing**: 24px horizontal padding standard
- **Colors**: CSS custom properties for theming flexibility
- **Accessibility**: ARIA attributes, keyboard navigation, focus management
- **Performance**: Lazy loading, blur animations on images, view transitions

### Content Source (Monte da Estrada)
- **Property**: Traditional "monte alentejano" converted to rural tourism
- **Location**: Alentejo region, Zambujeira do Mar area
- **Contact**: 283 647 535 / 960 254 072
- **Email**: montedaestradazambujeiradomar@gmail.com
- **Content**: Property description, accommodations, amenities, regional info, activities
- **Media**: Multiple property photos available on existing site

## Implementation Tasks

### Phase 0: Project Setup & Foundation (Days 1-2)

#### Task 1: Initialize Vite + React Project
- **Description**: Create new Vite project with React template
- **Commands**:
  ```bash
  npm create vite@latest monte-da-estrada -- --template react
  cd monte-da-estrada
  npm install
  ```
- **Dependencies**: None
- **Estimated effort**: 15 minutes

#### Task 2: Install Core Dependencies
- **Description**: Install all required packages for the project
- **Packages to install**:
  ```bash
  npm install react-router-dom@6
  npm install react-hook-form
  npm install prop-types
  npm add -D sass-embedded
  npm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom
  ```
- **Optional packages** (decide later):
  - `react-image-gallery` for photo galleries
  - `react-leaflet` and `leaflet` for maps
- **Dependencies**: Task 1
- **Estimated effort**: 10 minutes

#### Task 3: Configure Vite with Path Aliases
- **Description**: Set up `@/` alias to point to `src/` directory
- **Files to modify**:
  - `vite.config.js` - Add resolve.alias configuration
  - `jsconfig.json` (create) - Add paths for IDE autocomplete
- **Configuration**:
  ```javascript
  // vite.config.js
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import path from 'path'

  export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  })
  ```
- **Dependencies**: Task 1
- **Estimated effort**: 15 minutes

#### Task 4: Set Up Project Folder Structure
- **Description**: Create organized folder structure following React best practices
- **Folders to create**:
  ```
  src/
  ├── components/        # Reusable UI components
  ├── pages/            # Page-level components (one per route)
  ├── assets/           # Images, fonts, static files
  │   ├── images/
  │   └── fonts/
  ├── styles/           # Global SCSS files
  │   ├── global.scss
  │   ├── _variables.scss
  │   ├── _mixins.scss
  │   └── _reset.scss
  ├── utils/            # Helper functions
  ├── hooks/            # Custom React hooks
  ├── context/          # React Context providers
  └── data/             # Static content (JSON files)
  ```
- **Dependencies**: Task 1
- **Estimated effort**: 10 minutes

#### Task 5: Create Global SCSS System
- **Description**: Set up comprehensive global SCSS with variables and mixins
- **Files to create**:
  - `src/styles/_variables.scss` - Copy from examples, customize colors for Monte da Estrada
  - `src/styles/_mixins.scss` - Copy from examples
  - `src/styles/_reset.scss` - Modern CSS reset
  - `src/styles/global.scss` - Import all, add base styles
- **Color palette customization**:
  - Primary: Warm earth tones (#8B6F47)
  - Secondary: Golden sand (#D4A574)
  - Accent: Blue for CTAs (#116dff)
- **Dependencies**: Task 4
- **Estimated effort**: 1 hour
- **Reference**: `examples/styles/` folder

#### Task 6: Configure React Router
- **Description**: Set up basic routing structure for all 9 pages
- **Files to modify**:
  - `src/main.jsx` - Wrap App in BrowserRouter
  - `src/App.jsx` - Define Routes and Route components
- **Routes to create**:
  - `/` - Home
  - `/instalacoes` - Facilities
  - `/comodidades` - Amenities
  - `/informacoes` - Information
  - `/acessos` - Access
  - `/regiao` - The Region
  - `/atividades` - Activities
  - `/festividades` - Festivities
  - `/precos` - Prices
- **Dependencies**: Task 2
- **Estimated effort**: 45 minutes

### Phase 1: Core UI Components (Days 3-5)

#### Task 7: Build NavBar Component
- **Description**: Create responsive navigation bar with mobile hamburger menu
- **Features**:
  - Fixed/sticky header on scroll
  - Mobile hamburger menu with slide-in animation
  - Active page highlighting using useLocation
  - Dropdown support (if needed)
  - Accessibility (ARIA labels, keyboard navigation)
- **Files to create**:
  - `src/components/NavBar/NavBar.jsx`
  - `src/components/NavBar/NavBar.module.scss`
  - `src/components/NavBar/index.js`
- **Dependencies**: Task 5, Task 6
- **Estimated effort**: 3 hours
- **Reference**: `examples/components/NavBar/`

#### Task 8: Build Hero Component
- **Description**: Create full-screen hero section with background image
- **Features**:
  - Background image with overlay
  - Parallax effect on desktop (optional)
  - Animated entrance (fade in + slide up)
  - Optional CTA button
  - Scroll indicator with bounce animation
  - Configurable height, overlay opacity, alignment
- **Files to create**:
  - `src/components/Hero/Hero.jsx`
  - `src/components/Hero/Hero.module.scss`
  - `src/components/Hero/index.js`
- **Dependencies**: Task 5
- **Estimated effort**: 2.5 hours
- **Reference**: `examples/components/Hero/`

#### Task 9: Build Footer Component
- **Description**: Create footer with contact info, social links, copyright
- **Features**:
  - Contact information (phone, email)
  - Quick links to main pages
  - Copyright notice
  - Optional: Social media icons
  - Dark background with light text
- **Files to create**:
  - `src/components/Footer/Footer.jsx`
  - `src/components/Footer/Footer.module.scss`
  - `src/components/Footer/index.js`
- **Dependencies**: Task 5
- **Estimated effort**: 2 hours

#### Task 10: Build ImageGallery Component
- **Description**: Create photo gallery with grid layout and lightbox modal
- **Options**:
  - **Option A**: Use `react-image-gallery` library (faster)
  - **Option B**: Build custom gallery with modal (more control)
- **Features**:
  - Grid layout (responsive: 1 col mobile, 2-3 cols tablet, 3-4 cols desktop)
  - Click to open lightbox/modal with full-size image
  - Navigation arrows in lightbox
  - Close on ESC key or overlay click
  - Lazy loading images
- **Files to create**:
  - `src/components/ImageGallery/ImageGallery.jsx`
  - `src/components/ImageGallery/ImageGallery.module.scss`
  - `src/components/ImageGallery/index.js`
- **Dependencies**: Task 5
- **Estimated effort**: 3.5 hours (custom) or 1.5 hours (library)

#### Task 11: Build ContactForm Component
- **Description**: Create contact form with validation using React Hook Form
- **Fields**:
  - Name (required)
  - Email (required, email validation)
  - Phone (optional)
  - Message (required, textarea)
  - Submit button
- **Features**:
  - Client-side validation with error messages
  - Success/error state after submission
  - Accessible form labels and ARIA attributes
  - Loading state during submission
- **Backend options** (decide later):
  - EmailJS (free tier)
  - Netlify Forms
  - Custom backend API
- **Files to create**:
  - `src/components/ContactForm/ContactForm.jsx`
  - `src/components/ContactForm/ContactForm.module.scss`
  - `src/components/ContactForm/index.js`
- **Dependencies**: Task 2 (react-hook-form), Task 5
- **Estimated effort**: 3 hours

#### Task 12: Build Section/Container Components
- **Description**: Create reusable layout components for page sections
- **Components**:
  - **Container**: Max-width wrapper with padding (uses container mixin)
  - **Section**: Full-width section with optional background color
  - **Grid**: Responsive grid layout wrapper
  - **Card**: Card component with shadow and hover effect
- **Files to create**:
  - `src/components/Container/Container.jsx` + `.module.scss`
  - `src/components/Section/Section.jsx` + `.module.scss`
  - `src/components/Grid/Grid.jsx` + `.module.scss`
  - `src/components/Card/Card.jsx` + `.module.scss`
- **Dependencies**: Task 5
- **Estimated effort**: 2 hours

#### Task 13: Build Button Component
- **Description**: Create reusable button component with variants
- **Variants**:
  - Primary (accent color)
  - Secondary (secondary color)
  - Outline (transparent with border)
- **Props**: variant, size, disabled, onClick, href (for Link)
- **Files to create**:
  - `src/components/Button/Button.jsx`
  - `src/components/Button/Button.module.scss`
  - `src/components/Button/index.js`
- **Dependencies**: Task 5
- **Estimated effort**: 1.5 hours

### Phase 2: Page Implementation (Days 6-12)

#### Task 14: Extract Content from Monte da Estrada Website
- **Description**: Manually extract all text content and image URLs from existing site
- **Content to extract**:
  - Welcome text and property description
  - Accommodation details (room types, capacity, features)
  - Amenities list
  - Practical information (check-in/out, rules, policies)
  - Location/access information (GPS, directions)
  - Regional attractions and activities
  - Festival/event information
  - Pricing tables
  - All image URLs
- **Format**: Create JSON files in `src/data/` for each page
  - `src/data/home.json`
  - `src/data/facilities.json`
  - `src/data/amenities.json`
  - `src/data/information.json`
  - `src/data/access.json`
  - `src/data/region.json`
  - `src/data/activities.json`
  - `src/data/festivities.json`
  - `src/data/pricing.json`
- **Dependencies**: None (can be done in parallel)
- **Estimated effort**: 3 hours

#### Task 15: Optimize and Prepare Images
- **Description**: Download, optimize, and organize all property images
- **Steps**:
  1. Download high-res images from existing site
  2. Convert to WebP format (with JPG fallbacks)
  3. Create responsive sizes (thumbnail, medium, large)
  4. Organize in `src/assets/images/` by category
- **Categories**:
  - `hero/` - Hero/banner images
  - `facilities/` - Room and accommodation photos
  - `property/` - Exterior and common areas
  - `region/` - Local area photos
- **Tools**: ImageMagick, Squoosh.app, or similar
- **Dependencies**: Task 14
- **Estimated effort**: 2 hours

#### Task 16: Build Home Page
- **Description**: Implement homepage with hero, highlights, and quick links
- **Layout**:
  - Hero section (full-screen with welcome message)
  - Property overview (2-3 paragraphs)
  - Key features grid (3-4 highlight cards)
  - Quick links to main sections (Facilities, Prices, Contact)
  - Photo gallery preview (6-8 images)
- **Components used**: Hero, Container, Section, Grid, Card, Button
- **Files to create**:
  - `src/pages/HomePage/HomePage.jsx`
  - `src/pages/HomePage/HomePage.module.scss`
  - `src/pages/HomePage/index.js`
- **Dependencies**: Tasks 7-13, Task 14, Task 15
- **Estimated effort**: 4 hours

#### Task 17: Build Facilities Page (Instalações)
- **Description**: Showcase accommodation types and room details
- **Layout**:
  - Page header with title
  - Room types sections (each with description + photo gallery)
  - Capacity information
  - Features list per room
  - Interior/exterior photo galleries
- **Components used**: Container, Section, ImageGallery, Grid
- **Files to create**:
  - `src/pages/FacilitiesPage/FacilitiesPage.jsx`
  - `src/pages/FacilitiesPage/FacilitiesPage.module.scss`
  - `src/pages/FacilitiesPage/index.js`
- **Dependencies**: Tasks 7-13, Task 14, Task 15
- **Estimated effort**: 3.5 hours

#### Task 18: Build Amenities Page (Comodidades)
- **Description**: Display guest conveniences and services
- **Layout**:
  - Page header
  - Amenities grid with icons (WiFi, parking, kitchen, pool, etc.)
  - Detailed descriptions for each amenity
  - Photo gallery of amenities
- **Components used**: Container, Section, Grid, Card, ImageGallery
- **Files to create**:
  - `src/pages/AmenitiesPage/AmenitiesPage.jsx`
  - `src/pages/AmenitiesPage/AmenitiesPage.module.scss`
  - `src/pages/AmenitiesPage/index.js`
- **Dependencies**: Tasks 7-13, Task 14, Task 15
- **Estimated effort**: 3 hours

#### Task 19: Build Information Page (Informações)
- **Description**: Provide practical information for guests
- **Layout**:
  - Page header
  - Check-in/out times
  - House rules
  - Policies (cancellation, pets, smoking)
  - What's included
  - FAQ section (optional)
- **Components used**: Container, Section, Card
- **Files to create**:
  - `src/pages/InformationPage/InformationPage.jsx`
  - `src/pages/InformationPage/InformationPage.module.scss`
  - `src/pages/InformationPage/index.js`
- **Dependencies**: Tasks 7-13, Task 14
- **Estimated effort**: 2.5 hours

#### Task 20: Build Access Page (Acessos)
- **Description**: Show location, directions, and interactive map
- **Layout**:
  - Page header
  - GPS coordinates
  - Driving directions from major cities (Lisbon, Faro, etc.)
  - Public transport options
  - Interactive map (Leaflet or Google Maps)
  - Parking information
- **Components used**: Container, Section
- **New component**: MapComponent (decide: Leaflet or Google Maps)
- **Map integration**:
  - **Option A**: React Leaflet (free, open-source)
  - **Option B**: Google Maps (requires API key)
  - Install: `npm install react-leaflet leaflet` (if using Leaflet)
- **Files to create**:
  - `src/pages/AccessPage/AccessPage.jsx`
  - `src/pages/AccessPage/AccessPage.module.scss`
  - `src/pages/AccessPage/index.js`
  - `src/components/Map/Map.jsx` + `.module.scss`
- **Dependencies**: Tasks 7-13, Task 14
- **Estimated effort**: 4 hours

#### Task 21: Build Region Page (A Região)
- **Description**: Showcase local area attractions and points of interest
- **Layout**:
  - Page header
  - Regional overview description
  - Nearby beaches (Zambujeira do Mar, etc.)
  - Towns and villages
  - Restaurants and cafes
  - Cultural sites
  - Photo gallery of region
- **Components used**: Container, Section, Grid, Card, ImageGallery
- **Files to create**:
  - `src/pages/RegionPage/RegionPage.jsx`
  - `src/pages/RegionPage/RegionPage.module.scss`
  - `src/pages/RegionPage/index.js`
- **Dependencies**: Tasks 7-13, Task 14, Task 15
- **Estimated effort**: 3.5 hours

#### Task 22: Build Activities Page (Atividades)
- **Description**: Display available activities and experiences
- **Layout**:
  - Page header
  - Activity categories (hiking, biking, beach, cultural, etc.)
  - Each activity with description and photos
  - Booking information (if applicable)
- **Components used**: Container, Section, Grid, Card, ImageGallery
- **Files to create**:
  - `src/pages/ActivitiesPage/ActivitiesPage.jsx`
  - `src/pages/ActivitiesPage/ActivitiesPage.module.scss`
  - `src/pages/ActivitiesPage/index.js`
- **Dependencies**: Tasks 7-13, Task 14, Task 15
- **Estimated effort**: 3 hours

#### Task 23: Build Festivities Page (Festividades)
- **Description**: Showcase local festivals and seasonal events
- **Layout**:
  - Page header
  - Event calendar or list
  - Each festival with dates, description, photos
  - Seasonal events
- **Components used**: Container, Section, Card, ImageGallery
- **Files to create**:
  - `src/pages/FestivitiesPage/FestivitiesPage.jsx`
  - `src/pages/FestivitiesPage/FestivitiesPage.module.scss`
  - `src/pages/FestivitiesPage/index.js`
- **Dependencies**: Tasks 7-13, Task 14, Task 15
- **Estimated effort**: 2.5 hours

#### Task 24: Build Prices Page (Preços)
- **Description**: Display pricing, booking information, and contact form
- **Layout**:
  - Page header
  - Pricing tables (high/low season)
  - Minimum stay requirements
  - Special offers (if any)
  - Contact form for booking inquiries
  - Contact information (phone, email)
- **Components used**: Container, Section, ContactForm, Card
- **Files to create**:
  - `src/pages/PricesPage/PricesPage.jsx`
  - `src/pages/PricesPage/PricesPage.module.scss`
  - `src/pages/PricesPage/index.js`
- **Dependencies**: Tasks 7-13, Task 14
- **Estimated effort**: 3.5 hours

### Phase 3: Enhancements & Optimization (Days 13-15)

#### Task 25: Implement Lazy Loading for Images
- **Description**: Add lazy loading to all images for better performance
- **Implementation**:
  - Use native `loading="lazy"` attribute on `<img>` tags
  - Add blur-up effect (optional): low-res placeholder while loading
  - Implement intersection observer for gallery images (if needed)
- **Files to modify**: All page components and ImageGallery
- **Dependencies**: Tasks 16-24
- **Estimated effort**: 2 hours

#### Task 26: Implement Code Splitting with React.lazy
- **Description**: Lazy load page components for faster initial load
- **Implementation**:
  ```javascript
  const HomePage = React.lazy(() => import('./pages/HomePage'));
  // Repeat for all pages

  // In Routes, wrap with Suspense
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      ...
    </Routes>
  </Suspense>
  ```
- **New component**: LoadingSpinner for Suspense fallback
- **Files to modify**: `src/App.jsx`
- **Files to create**: `src/components/LoadingSpinner/`
- **Dependencies**: Task 6, Tasks 16-24
- **Estimated effort**: 1.5 hours

#### Task 27: Add Smooth Scrolling and Page Transitions
- **Description**: Implement smooth scrolling and subtle page transitions
- **Implementation**:
  - Add `scroll-behavior: smooth` to global CSS
  - Implement fade-in animation on page mount
  - Add scroll-to-top on route change
  - Optional: scroll restoration for back button
- **Files to modify**: `src/styles/global.scss`, all page components
- **New hook**: `useScrollToTop` custom hook
- **Dependencies**: Tasks 16-24
- **Estimated effort**: 2 hours

#### Task 28: Implement SEO Meta Tags
- **Description**: Add proper SEO meta tags to all pages
- **Implementation**:
  - Install react-helmet-async: `npm install react-helmet-async`
  - Create SEO component for meta tags
  - Add page-specific titles, descriptions, og:tags
  - Add structured data (JSON-LD) for local business
- **Files to create**:
  - `src/components/SEO/SEO.jsx`
  - `src/utils/seo-config.js` - Meta tag configuration per page
- **Files to modify**: All page components
- **Dependencies**: Tasks 16-24
- **Estimated effort**: 2.5 hours

#### Task 29: Accessibility Audit and Improvements
- **Description**: Ensure website meets WCAG 2.1 AA standards
- **Checklist**:
  - Semantic HTML (nav, header, main, section, footer)
  - ARIA labels on interactive elements
  - Keyboard navigation (tab order, focus styles)
  - Alt text on all images
  - Form labels and error announcements
  - Color contrast ratios (text/background)
  - Skip to main content link
  - Focus-visible styles (not just focus)
- **Tools**: axe DevTools, Lighthouse
- **Files to modify**: All components and pages as needed
- **Dependencies**: Tasks 7-13, Tasks 16-24
- **Estimated effort**: 3 hours

#### Task 30: Performance Optimization
- **Description**: Optimize bundle size and runtime performance
- **Actions**:
  - Analyze bundle with `npm run build` and check sizes
  - Optimize images (WebP format, responsive sizes)
  - Minimize re-renders with React.memo on components
  - Use useMemo for expensive calculations
  - Use useCallback for event handlers passed to children
  - Remove unused dependencies
  - Enable gzip compression (Vite does this by default)
- **Target**: Lighthouse performance score >90
- **Files to modify**: Components as needed
- **Dependencies**: All previous tasks
- **Estimated effort**: 3 hours

### Phase 4: Testing & Documentation (Days 16-17)

#### Task 31: Write Component Tests
- **Description**: Create unit tests for main components
- **Components to test**:
  - NavBar (rendering, mobile menu toggle, active link)
  - Hero (rendering with props, CTA click)
  - ContactForm (validation, submission, error states)
  - ImageGallery (rendering, modal open/close)
  - Button (rendering variants, click events)
- **Test files** (create in each component's `__tests__/` folder):
  - `NavBar.test.js`
  - `Hero.test.js`
  - `ContactForm.test.js`
  - `ImageGallery.test.js`
  - `Button.test.js`
- **Testing approach**:
  - Use React Testing Library
  - Test user interactions (click, form input)
  - Test accessibility (screen reader text)
  - Mock external dependencies (router, hooks)
- **Dependencies**: Tasks 7-13
- **Estimated effort**: 4 hours

#### Task 32: Write Integration Tests for Pages
- **Description**: Create integration tests for critical pages
- **Pages to test**:
  - HomePage (rendering all sections)
  - PricesPage (form submission flow)
- **Test approach**:
  - Test full page rendering
  - Test component integration
  - Test navigation between pages
- **Dependencies**: Tasks 16-24
- **Estimated effort**: 2.5 hours

#### Task 33: Browser Compatibility Testing
- **Description**: Test website on different browsers and devices
- **Browsers to test**:
  - Chrome (desktop + mobile)
  - Firefox (desktop)
  - Safari (desktop + iOS)
  - Edge (desktop)
- **Devices**:
  - Desktop (1920x1080, 1366x768)
  - Tablet (768x1024)
  - Mobile (375x667, 414x896)
- **Issues to check**:
  - Layout responsiveness
  - SCSS compatibility
  - JavaScript functionality
  - Image loading
- **Dependencies**: Tasks 16-24
- **Estimated effort**: 2 hours

#### Task 34: Create README Documentation
- **Description**: Write comprehensive README with setup and deployment instructions
- **Sections to include**:
  - Project overview
  - Features list
  - Tech stack
  - Prerequisites
  - Installation instructions
  - Development commands (`npm run dev`, `npm run build`)
  - Environment variables (if any)
  - Deployment instructions (Netlify, Vercel, etc.)
  - Project structure
  - Available scripts
  - Contributing guidelines (optional)
  - License
- **File to create/update**: `README.md`
- **Dependencies**: All previous tasks
- **Estimated effort**: 1.5 hours

#### Task 35: Create PLANNING.md Documentation
- **Description**: Document architecture, patterns, and conventions
- **Sections to include**:
  - Project architecture overview
  - Component patterns used
  - SCSS organization and naming conventions
  - State management approach
  - Routing structure
  - Custom hooks documentation
  - Coding standards
  - Design system documentation
- **File to create**: `PLANNING.md`
- **Dependencies**: All previous tasks
- **Estimated effort**: 1.5 hours

### Phase 5: Deployment (Day 18)

#### Task 36: Prepare for Production Build
- **Description**: Optimize and prepare project for deployment
- **Steps**:
  1. Update environment variables (if needed)
  2. Test production build locally: `npm run build && npm run preview`
  3. Check bundle sizes and optimize if needed
  4. Verify all images are optimized
  5. Test all pages in production mode
  6. Run Lighthouse audit (aim for >90 all categories)
- **Dependencies**: All previous tasks
- **Estimated effort**: 2 hours

#### Task 37: Deploy to Hosting Platform
- **Description**: Deploy website to hosting service
- **Recommended platforms**:
  - **Netlify** (easiest, free tier, automatic deployments)
  - **Vercel** (great for React, free tier)
  - **GitHub Pages** (free, but requires extra setup)
- **Steps for Netlify**:
  1. Create account at netlify.com
  2. Connect GitHub repository
  3. Configure build settings (build command: `npm run build`, publish dir: `dist`)
  4. Deploy
  5. Configure custom domain (if available)
- **Files to create**: `netlify.toml` (optional config)
- **Dependencies**: Task 36
- **Estimated effort**: 1 hour

#### Task 38: Configure Custom Domain (Optional)
- **Description**: Set up custom domain for the website
- **Steps**:
  1. Purchase domain or use existing
  2. Update DNS records to point to hosting platform
  3. Configure SSL certificate (usually automatic)
  4. Test domain resolution
- **Dependencies**: Task 37
- **Estimated effort**: 30 minutes (+ DNS propagation time)

## Phase 6: Admin Panel (IMPLEMENT LAST - After Core Website)

**Note**: This phase should ONLY be started after the core website (Phases 0-5) is fully complete, tested, and deployed.

#### Task 39: Design Admin Authentication System
- **Description**: Plan and implement secure admin login
- **Approach options**:
  - **Option A**: JWT-based authentication with backend
  - **Option B**: Simple password protection with session storage
  - **Option C**: Use authentication service (Firebase Auth, Auth0)
- **Security considerations**:
  - Hidden admin route (e.g., `/admin-secreto-montedaestrada`)
  - Password hashing
  - Session timeout
  - CSRF protection
- **Dependencies**: Phase 5 complete
- **Estimated effort**: 4 hours

#### Task 40: Create Admin Panel UI
- **Description**: Build admin interface for content management
- **Pages**:
  - Login page
  - Dashboard (list of editable pages)
  - Content editor (per page)
- **Components**:
  - AdminNavBar
  - ContentEditorForm
  - ImageUploader
- **Dependencies**: Task 39
- **Estimated effort**: 5 hours

#### Task 41: Implement WYSIWYG Editor
- **Description**: Add rich text editor for content editing
- **Library options**:
  - **react-quill** (popular, easy to use)
  - **TinyMCE React** (feature-rich)
  - **Draft.js** (flexible, more complex)
- **Install**: `npm install react-quill`
- **Dependencies**: Task 40
- **Estimated effort**: 3 hours

#### Task 42: Implement Image Upload System
- **Description**: Allow admins to upload and replace images
- **Approach**:
  - Frontend: File upload component
  - Backend: Storage service (Cloudinary, AWS S3, or custom)
- **Features**:
  - Drag-and-drop upload
  - Image preview
  - Progress indicator
  - Image optimization on upload
- **Dependencies**: Task 40
- **Estimated effort**: 4 hours

#### Task 43: Implement Content Storage
- **Description**: Store editable content in database or JSON files
- **Approach options**:
  - **Option A**: Firebase Firestore (easy, real-time)
  - **Option B**: JSON files with backend API
  - **Option C**: Headless CMS (Strapi, Contentful)
- **Data structure**: Organize by page ID and content blocks
- **Dependencies**: Task 40
- **Estimated effort**: 3 hours

#### Task 44: Test Admin Functionality
- **Description**: Thoroughly test admin panel
- **Test cases**:
  - Login/logout flow
  - Content editing and saving
  - Image upload and replacement
  - Data persistence
  - Error handling
  - Security (unauthorized access prevention)
- **Dependencies**: Tasks 39-43
- **Estimated effort**: 2 hours

## Codebase Integration Points

### Files to Create (Core Website)
- **Config files**:
  - `vite.config.js` - Vite configuration with path aliases
  - `jsconfig.json` - IDE autocomplete for path aliases
  - `netlify.toml` - Netlify deployment config (optional)

- **Styles** (in `src/styles/`):
  - `global.scss` - Global styles and imports
  - `_variables.scss` - Design tokens (colors, typography, spacing)
  - `_mixins.scss` - Reusable SCSS patterns
  - `_reset.scss` - Modern CSS reset

- **Components** (in `src/components/`):
  - `NavBar/` - Navigation bar
  - `Hero/` - Hero section
  - `Footer/` - Footer
  - `ImageGallery/` - Photo gallery
  - `ContactForm/` - Contact form
  - `Button/` - Button component
  - `Container/` - Layout container
  - `Section/` - Page section wrapper
  - `Grid/` - Grid layout
  - `Card/` - Card component
  - `Map/` - Interactive map
  - `SEO/` - SEO meta tags
  - `LoadingSpinner/` - Loading indicator

- **Pages** (in `src/pages/`):
  - `HomePage/` - Home page
  - `FacilitiesPage/` - Facilities page
  - `AmenitiesPage/` - Amenities page
  - `InformationPage/` - Information page
  - `AccessPage/` - Access page
  - `RegionPage/` - Region page
  - `ActivitiesPage/` - Activities page
  - `FestivitiesPage/` - Festivities page
  - `PricesPage/` - Prices page

- **Data** (in `src/data/`):
  - JSON files for each page's content

- **Hooks** (in `src/hooks/`):
  - `useScrollToTop.js` - Scroll to top on route change

- **Utils** (in `src/utils/`):
  - `seo-config.js` - SEO meta tag configurations

### Files to Modify
- `src/main.jsx` - Wrap App in BrowserRouter and HelmetProvider
- `src/App.jsx` - Define all routes
- `src/index.css` - Import global SCSS (or remove if using global.scss)

### Existing Patterns to Follow
Based on the examples folder:
- **Component structure**: Component folder with JSX, SCSS module, and index.js
- **SCSS imports**: Always import variables and mixins at top of component SCSS
- **PropTypes**: Define PropTypes with JSDoc descriptions
- **CSS Modules**: Use `.module.scss` extension and import as `styles`
- **Mobile-first**: Base styles for mobile, enhance for desktop with mixins
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Naming conventions**: PascalCase for components, camelCase for utilities

## Technical Design

### Architecture Overview
```
┌─────────────────────────────────────────────────────────┐
│                     React Application                    │
│                                                          │
│  ┌────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │   Router   │───▶│    Pages    │───▶│ Components  │  │
│  │  (v6)      │    │             │    │             │  │
│  └────────────┘    └─────────────┘    └─────────────┘  │
│                           │                    │         │
│                           ▼                    ▼         │
│                    ┌─────────────┐    ┌─────────────┐  │
│                    │    Data     │    │    Hooks    │  │
│                    │   (JSON)    │    │   (Custom)  │  │
│                    └─────────────┘    └─────────────┘  │
│                                                          │
│                    ┌─────────────┐                      │
│                    │    SCSS     │                      │
│                    │   Modules   │                      │
│                    └─────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

### Component Hierarchy
```
App
├── NavBar
│   └── Link (React Router)
├── Routes
│   ├── HomePage
│   │   ├── Hero
│   │   ├── Container
│   │   ├── Section
│   │   ├── Grid
│   │   │   └── Card (multiple)
│   │   ├── ImageGallery
│   │   └── Button
│   ├── FacilitiesPage
│   │   ├── Container
│   │   ├── Section
│   │   └── ImageGallery
│   ├── ... (other pages)
│   └── PricesPage
│       ├── Container
│       ├── Section
│       └── ContactForm
└── Footer
```

### Data Flow
1. **Static content**: Stored in JSON files in `src/data/`
2. **Pages**: Import and consume JSON data
3. **Components**: Receive data as props from pages
4. **Forms**: Managed by React Hook Form, submitted to backend/service
5. **Images**: Stored in `src/assets/images/`, imported and used via URLs
6. **Routing**: React Router manages navigation, URL changes update displayed page

### SCSS Architecture
```
styles/
├── _variables.scss    → Design tokens (imported by all)
├── _mixins.scss       → Reusable patterns (imported by all)
├── _reset.scss        → CSS reset (imported by global)
└── global.scss        → Global styles + imports

components/
└── Component/
    └── Component.module.scss  → Component-specific styles
        ├── @import '@/styles/variables'
        ├── @import '@/styles/mixins'
        └── .componentClass { ... }
```

### State Management
- **Local state**: `useState` for component-specific state (menu open/close, form inputs)
- **Form state**: React Hook Form for ContactForm
- **Router state**: React Router for active page, navigation
- **No global state management needed** for Phase 1 (simple website)
- **Phase 2 (Admin)**: May use Context API or Redux if needed

## Dependencies and Libraries

### Core Dependencies
- `react` (^18.3.x) - UI library
- `react-dom` (^18.3.x) - React DOM renderer
- `react-router-dom` (^6.x) - Routing

### Form & Validation
- `react-hook-form` (^7.x) - Form state management
- `prop-types` (^15.x) - Runtime prop validation

### Styling
- `sass` or `sass-embedded` (^1.x) - SCSS preprocessor

### SEO
- `react-helmet-async` (^2.x) - Manage document head (meta tags)

### Optional (Decide during implementation)
- `react-image-gallery` (^1.x) - Photo gallery component
- `react-leaflet` + `leaflet` (^4.x) - Interactive maps
- `react-quill` (^2.x) - WYSIWYG editor (Phase 2)

### Development Dependencies
- `@vitejs/plugin-react` (^4.x) - Vite React plugin
- `vite` (^5.x) - Build tool
- `@testing-library/react` (^14.x) - React testing utilities
- `@testing-library/jest-dom` (^6.x) - DOM matchers
- `@testing-library/user-event` (^14.x) - User interaction simulation
- `vitest` (^1.x) - Test runner
- `jsdom` (^24.x) - DOM implementation for tests

## Testing Strategy

### Unit Tests
- **Components to test**:
  - NavBar: Rendering, mobile menu toggle, active link highlighting
  - Hero: Rendering with different props, CTA button functionality
  - ContactForm: Validation rules, error messages, successful submission
  - ImageGallery: Rendering images, modal open/close, navigation
  - Button: Rendering variants, click events, disabled state

### Integration Tests
- **Page tests**:
  - HomePage: All sections render correctly
  - PricesPage: Form submission flow
  - Navigation: Link clicks navigate correctly

### End-to-End Testing (Optional)
- Use Cypress or Playwright for critical user flows
- Test: Homepage → Facilities → Prices → Contact form submission

### Accessibility Testing
- Lighthouse accessibility audit (target: >90)
- axe DevTools for WCAG compliance
- Manual keyboard navigation testing
- Screen reader testing (NVDA, VoiceOver)

### Performance Testing
- Lighthouse performance audit (target: >90)
- Bundle size analysis
- Image optimization verification
- Mobile network throttling tests

### Browser Compatibility Testing
- Desktop: Chrome, Firefox, Safari, Edge
- Mobile: Chrome (Android), Safari (iOS)
- Test responsive breakpoints: 375px, 768px, 1024px, 1920px

## Success Criteria

### Functional Requirements
- [x] All 9 pages implemented with proper content
- [x] Fully responsive design (mobile, tablet, desktop)
- [x] Working navigation with active page highlighting
- [x] Contact form with validation and submission
- [x] Image galleries with modal/lightbox view
- [x] Interactive map on Access page
- [x] Smooth page transitions and scrolling

### Design & UX
- [x] Global SCSS variables used consistently (no hardcoded values)
- [x] Design inspired by Monte do Papa Léguas
- [x] Color palette reflects Alentejo countryside
- [x] Clean, elegant, image-focused layout
- [x] Mobile-first responsive design

### Performance
- [x] Lighthouse performance score >90
- [x] Page load time <3 seconds
- [x] Images optimized (WebP format)
- [x] Code splitting implemented
- [x] Lazy loading for images

### Accessibility
- [x] Lighthouse accessibility score >90
- [x] WCAG 2.1 AA compliance
- [x] Semantic HTML structure
- [x] ARIA labels on interactive elements
- [x] Keyboard navigation support
- [x] Sufficient color contrast

### SEO
- [x] Meta tags on all pages (title, description, og:tags)
- [x] Semantic heading hierarchy (h1, h2, h3)
- [x] Alt text on all images
- [x] Structured data for local business

### Code Quality
- [x] Component structure follows best practices
- [x] SCSS modules for all components
- [x] PropTypes for all components
- [x] Custom hooks for reusable logic
- [x] Unit tests for main components
- [x] Code is documented and maintainable

### Deployment
- [x] Production build optimized
- [x] Website deployed to hosting platform
- [x] Cross-browser compatible
- [x] README with setup instructions
- [x] PLANNING.md with architecture documentation

### Phase 2 (Admin Panel - LAST)
- [ ] Secure admin authentication
- [ ] Content editor for all pages
- [ ] Image upload and management
- [ ] WYSIWYG text editor
- [ ] Data persistence (database or JSON)
- [ ] Admin functionality tested

## Notes and Considerations

### Content Extraction
- The existing Monte da Estrada website has limited detailed content available
- Will need to work with property owners to gather complete information for all pages
- May need to translate some content to Portuguese if currently in other language
- Ensure all Portuguese text uses proper UTF-8 encoding for special characters (ã, ç, á, é, etc.)

### Image Optimization
- Convert images to WebP format with JPG fallbacks for older browsers
- Create multiple sizes for responsive images (use `srcset` attribute)
- Target: <500KB per image, <2MB total per page
- Use tools: Squoosh.app, ImageMagick, or sharp (Node.js)

### Form Backend
- ContactForm needs a backend to send emails
- **Recommended**: EmailJS (free tier, 200 emails/month, no backend needed)
- **Alternative**: Netlify Forms (if using Netlify hosting)
- **Alternative**: Custom backend with Nodemailer + Express

### Map Integration
- **Recommend React Leaflet**: Free, no API key, open-source
- Google Maps requires API key and may incur costs
- Leaflet is lighter weight and sufficient for showing location

### Performance Considerations
- Vite builds are already optimized by default
- Use dynamic imports for pages: `React.lazy(() => import('./pages/Page'))`
- Compress images before adding to project
- Consider using a CDN for images if many high-res photos

### Accessibility Priorities
- All images MUST have descriptive alt text
- Form inputs MUST have associated labels
- Navigation MUST be keyboard accessible
- Focus styles MUST be visible (use `:focus-visible`)
- Color contrast MUST meet WCAG AA standards (4.5:1 for text)

### Browser Support
- Modern browsers (last 2 versions): Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari 12+, Chrome Android 90+
- No IE11 support (React 18 doesn't support it)

### Deployment Options
- **Netlify**: Easiest, free tier, continuous deployment from Git
- **Vercel**: Great DX, free tier, optimized for React
- **GitHub Pages**: Free, but requires extra config for React Router (use HashRouter or 404.html trick)

### Potential Challenges
- **SCSS Modules Import**: If path alias `@/` doesn't work in SCSS, use relative paths or configure Vite
- **React Router on Static Hosts**: May need to configure redirects for client-side routing
- **Font Loading**: Ensure fonts load quickly to avoid FOUT (Flash of Unstyled Text)
- **Image Paths**: Use proper import or public folder for images
- **Portuguese Characters**: Ensure UTF-8 encoding throughout

### Future Enhancements (Post-Launch)
- Multi-language support (English, Portuguese)
- Online booking integration (Booking.com API, custom system)
- Newsletter signup form
- Guest testimonials/reviews section
- Blog for property updates and regional guides
- Photo gallery with album categories
- Weather widget for the region
- Instagram feed integration

### Admin Panel Considerations (Phase 2)
- **Security is critical**: Use proper authentication, HTTPS only
- **Hide admin route**: Use obscure URL path
- **Limit permissions**: Only allow editing specific content, not code
- **Backup content**: Implement backup system before allowing edits
- **Version control**: Track content changes with timestamps
- **Testing**: Thoroughly test to prevent data loss

---

*This plan is ready for execution with `/execute-plan PRPs/monte-da-estrada-website.md`*
