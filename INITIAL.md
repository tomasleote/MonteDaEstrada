## FEATURE:

Build a complete React website for **Monte da Estrada**, a rural guest house in the Alentejo region of Portugal. The website should showcase the property, provide essential information to potential guests, and allow for content management.

### Core Requirements:

1. **Multi-page React Website** with the following pages (based on Monte do Papa Léguas template):
   - **Home** - Hero section with stunning imagery, property overview, quick links
   - **Instalações** (Facilities) - Accommodation details, room descriptions, photo galleries
   - **Comodidades** (Amenities) - Guest conveniences, services offered
   - **Informações** (Information) - General property information, house rules, check-in/out details
   - **Acessos** (Access) - Directions, transportation options, location map
   - **A Região** (The Region) - Local area attractions, points of interest
   - **Atividades** (Activities) - Available activities and experiences
   - **Festividades** (Festivities) - Local events and celebrations
   - **Preços** (Prices) - Accommodation pricing, booking information, contact form

2. **Styling with SCSS**:
   - **NO Tailwind CSS** - Use SCSS modules exclusively
   - Create comprehensive `global.scss` with ALL reusable variables:
     - Color palette (primary, secondary, accent, text colors, backgrounds)
     - Typography system (font families, sizes, weights, line heights)
     - Spacing system (consistent margins, paddings, gaps)
     - Responsive breakpoints (mobile, tablet, desktop)
     - Shadows, border radius, transitions
   - All components must import and use global variables
   - CSS Modules pattern (`.module.scss`) for component-specific styles
   - Mobile-first responsive design

3. **Design Inspiration**:
   - Follow the layout, structure, and UX patterns from: https://www.montedopapaleguas.pt/
   - Adapt color scheme for Monte da Estrada (different from Papa Léguas)
   - Maintain clean, elegant, image-focused design
   - Smooth transitions and animations (0.2-0.6s cubic-bezier)
   - Grid-based layout with flexbox components
   - Sticky navigation header

4. **Content Source**:
   - Extract all content from existing website: https://www.montedaestrada.com/
   - Property name: **Monte da Estrada**
   - Location: Alentejo, Portugal (Zambujeira do Mar area)
   - Contact: 283 647 535 / 960 254 072
   - Email: montedaestradazambujeiradomar@gmail.com
   - Property type: Traditional "monte alentejano" (rural farm converted to tourism)

5. **Key Features**:
   - Responsive navigation with dropdown menus (mobile hamburger menu)
   - Image galleries with lightbox/modal viewing
   - Contact form with validation
   - Interactive map for location/access page
   - Smooth scrolling and page transitions
   - SEO optimization (meta tags, semantic HTML)
   - Accessibility features (ARIA labels, keyboard navigation)
   - Performance optimization (image lazy loading, code splitting)

6. **Admin Panel** (Phase 2 - to be implemented LAST):
   - Hidden admin access route (e.g., `/admin-secreto`)
   - Authentication for admin users
   - CMS functionality to edit:
     - Page text content
     - Images (upload new, replace existing)
     - Pricing information
   - Content stored in JSON files or simple database
   - WYSIWYG editor for text formatting

### Technical Stack:
- **React** (functional components with hooks)
- **React Router** for navigation
- **SCSS** with CSS Modules (NO Tailwind)
- **PropTypes** for prop validation
- **React Testing Library + Jest** for testing
- **Create React App** or **Vite** as build tool
- **Optional**: React Hook Form for form handling
- **Optional**: React Image Gallery or similar for photo galleries
- **Optional**: Leaflet or Google Maps for interactive map

## EXAMPLES:

In the `examples/` folder, you will find:

- `examples/components/` - React component structure examples with SCSS modules
  - `NavBar/` - Navigation component with responsive menu, dropdown states
  - `Hero/` - Hero section with background image, overlay text
  - `ImageGallery/` - Photo gallery component with modal/lightbox
  - `ContactForm/` - Form component with validation
  - `Footer/` - Footer component with contact info and social links

- `examples/styles/` - SCSS organization and patterns
  - `global.scss` - Example of global variables and resets
  - `_variables.scss` - Design tokens (colors, typography, spacing)
  - `_mixins.scss` - Reusable SCSS mixins (flex-center, responsive breakpoints)
  - Component examples showing proper variable usage

- `examples/pages/` - Page-level component examples
  - `HomePage.jsx` - Example homepage structure
  - Layout patterns following Papa Léguas design

**Important**: These are examples to inspire structure and patterns. Adapt them for Monte da Estrada's specific needs and design.

## DOCUMENTATION:

### React & Tooling:
- React Documentation: https://react.dev/
- React Router: https://reactrouter.com/
- SCSS Documentation: https://sass-lang.com/documentation/
- CSS Modules: https://github.com/css-modules/css-modules
- Vite: https://vitejs.dev/ (or Create React App: https://create-react-app.dev/)

### Design System Reference:
- Extracted from Monte do Papa Léguas: https://www.montedopapaleguas.pt/
- Color system: CSS custom properties for theming
- Typography: Arial/Helvetica family with responsive sizing
- Layout: Grid mesh with flexbox components
- Transitions: 0.2s ease for interactions, 0.6s for page changes
- Spacing: 24px horizontal padding standard, 12px list item spacing

### Additional Libraries:
- React Image Gallery: https://www.npmjs.com/package/react-image-gallery
- React Hook Form: https://react-hook-form.com/
- Leaflet React: https://react-leaflet.js.org/

## OTHER CONSIDERATIONS:

### Phase 1 - Core Website (Priority):
1. Set up React project structure with proper folder organization
2. Create comprehensive `global.scss` with all design tokens from Papa Léguas template
3. Build reusable UI components (NavBar, Footer, Hero, ImageGallery, ContactForm)
4. Implement all 9 pages with content from Monte da Estrada website
5. Ensure full responsive design (mobile, tablet, desktop)
6. Add smooth animations and transitions
7. Optimize images and performance
8. SEO optimization and accessibility
9. Testing for main components and pages

### Phase 2 - Admin Panel (LAST - Lower Priority):
10. Design admin authentication system
11. Create admin panel UI for content management
12. Implement WYSIWYG editor for text content
13. Add image upload and management system
14. Store content in JSON files or lightweight database
15. Test admin functionality thoroughly

### Design Notes:
- **Color Palette**: Choose warm, earthy tones reflecting Alentejo countryside (different from Papa Léguas blue tones)
- **Typography**: Clean, readable fonts - consider Portuguese language special characters (ã, ç, á, etc.)
- **Imagery**: High-quality photos of the property, landscapes, local region
- **User Flow**: Easy navigation, clear call-to-actions (contact, booking)
- **Performance**: Target <3s page load, optimized images (WebP format if possible)

### Content Structure Notes:
- **Home**: Hero image, welcome text, property highlights (3-4 key features), quick links to main pages
- **Instalações**: Room types, accommodation capacity, interior/exterior photos, amenities per room
- **Comodidades**: WiFi, parking, kitchen access, outdoor spaces, pool (if available)
- **Informações**: Check-in/out times, house rules, policies, what's included
- **Acessos**: GPS coordinates, driving directions from major cities, public transport options, map
- **A Região**: Nearby beaches, towns, restaurants, cultural sites
- **Atividades**: Hiking, biking, birdwatching, beach activities, local experiences
- **Festividades**: Local festivals, seasonal events
- **Preços**: Rate tables (high/low season), minimum stay requirements, contact form, booking info

### Potential Gotchas:
- **SCSS Modules Import**: Ensure webpack/Vite is configured to handle SCSS modules (usually works out of box)
- **Image Optimization**: Use appropriate image formats and sizes for web (responsive images with srcset)
- **Font Loading**: Use web-safe fonts or properly load Google Fonts to avoid FOUT
- **React Router**: Configure proper basename if deploying to subdirectory
- **Form Submission**: Decide on backend for contact form (EmailJS, Netlify Forms, or custom backend)
- **Map Integration**: Leaflet is free, Google Maps requires API key
- **Browser Support**: Test on Safari, Chrome, Firefox, Edge (mobile and desktop)
- **Portuguese Language**: Ensure UTF-8 encoding for special characters
- **Admin Security**: For Phase 2, implement proper authentication (JWT, sessions) - don't expose admin route publicly

### Success Criteria:
- ✅ All 9 pages implemented with proper content
- ✅ Fully responsive (mobile-first design)
- ✅ Global SCSS variables used consistently (no hardcoded colors/spacing)
- ✅ Smooth navigation and transitions
- ✅ Contact form functional
- ✅ Image galleries working with modal view
- ✅ Interactive map on Access page
- ✅ SEO meta tags on all pages
- ✅ Accessibility score >90 (Lighthouse)
- ✅ Performance score >90 (Lighthouse)
- ✅ Unit tests for main components
- ✅ Cross-browser compatible
- ✅ Production build optimized and deployable
- ✅ README with setup and deployment instructions
- 🔲 Admin panel (Phase 2 - implement after core website is complete)
