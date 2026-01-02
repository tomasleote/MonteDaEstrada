# Examples Folder - Monte da Estrada

This folder contains **example React components and SCSS patterns** to guide the implementation of the Monte da Estrada website. These examples demonstrate best practices for component structure, styling patterns, and code organization.

## 📁 Folder Structure

```
examples/
├── components/           # Reusable React components
│   ├── NavBar/          # Navigation bar with responsive menu
│   ├── Hero/            # Hero section with background image
│   ├── ImageGallery/    # (To be created) Photo gallery
│   ├── ContactForm/     # (To be created) Contact form
│   └── Footer/          # (To be created) Footer component
├── styles/              # Global SCSS files and patterns
│   ├── _variables.scss  # Design tokens (colors, typography, spacing)
│   ├── _mixins.scss     # Reusable SCSS mixins
│   └── global.scss      # Global styles and resets
├── pages/               # Page-level component examples
│   └── HomePage.jsx     # (To be created) Homepage example
└── README.md            # This file
```

## 🎨 SCSS Architecture

### Design Tokens (`_variables.scss`)

This file contains **ALL reusable design values** extracted from the Monte do Papa Léguas design:

- **Colors**: Primary (earth tones), secondary (golden sand), accent (blue), text, backgrounds
- **Typography**: Font families, sizes (xs to 4xl), weights, line heights
- **Spacing**: Consistent 8px-based spacing system (xs to 4xl)
- **Breakpoints**: Mobile-first responsive breakpoints
- **Borders & Radius**: Border widths and radius values
- **Shadows**: Box shadow variations (sm, md, lg, xl)
- **Transitions**: Animation durations and easing functions
- **Z-index**: Layering system for overlays, modals, etc.

### Mixins (`_mixins.scss`)

Reusable SCSS patterns to maintain consistency:

**Layout Mixins**:
- `@mixin flex-center` - Center content with flexbox
- `@mixin container` - Max-width container with padding
- `@mixin grid($columns, $gap)` - CSS Grid layout

**Responsive Mixins**:
- `@mixin mobile` - Mobile-specific styles (< 768px)
- `@mixin tablet` - Tablet-specific styles (768px - 1024px)
- `@mixin desktop` - Desktop-specific styles (>= 1024px)
- `@mixin responsive($breakpoint)` - Custom breakpoint

**Typography Mixins**:
- `@mixin h1`, `@mixin h2`, `@mixin h3` - Heading styles
- `@mixin text-body` - Body text styles
- `@mixin text-truncate` - Single-line truncation

**Button Mixins**:
- `@mixin button-primary` - Primary CTA button
- `@mixin button-secondary` - Secondary button
- `@mixin button-outline` - Outline button

**Form Mixins**:
- `@mixin input-base` - Input field base styles

**Image Mixins**:
- `@mixin image-cover` - Cover background image
- `@mixin image-overlay` - Image with dark overlay

**Animation Mixins**:
- `@mixin fade-in` - Fade in animation
- `@mixin slide-in-up` - Slide up animation

### Global Styles (`global.scss`)

- **CSS Reset**: Modern reset based on Josh Comeau's methodology
- **Base Styles**: Typography, links, lists, images, forms
- **Utility Classes**: Container, text alignment, spacing utilities
- **Accessibility**: Reduced motion preferences, screen reader utilities
- **Print Styles**: Optimized styles for printing

## 🧩 Component Examples

### 1. NavBar Component

**Purpose**: Responsive navigation bar with mobile hamburger menu

**Features**:
- Fixed/sticky header on scroll
- Mobile hamburger menu with slide-in animation
- Active page highlighting
- Smooth transitions
- Accessibility features (ARIA labels, keyboard navigation)

**File Structure**:
```
NavBar/
├── NavBar.jsx            # Component logic
├── NavBar.module.scss    # Component styles (CSS Modules)
└── index.js              # Barrel export
```

**Key Patterns**:
- Uses `useState` for menu open/close state
- Uses `useEffect` for scroll detection
- Uses `useLocation` to highlight active page
- Prevents body scroll when mobile menu is open
- Imports global SCSS variables: `@import '@/styles/variables';`

**Usage Example**:
```jsx
import NavBar from '@/components/NavBar';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Instalações', path: '/instalacoes' },
  { label: 'Preços', path: '/precos' },
];

<NavBar logo="/logo.png" navItems={navItems} />
```

### 2. Hero Component

**Purpose**: Full-screen hero section with background image and CTA

**Features**:
- Background image with overlay
- Parallax effect on desktop
- Centered or aligned content
- Animated entrance (fade in + slide up)
- Optional CTA button
- Scroll indicator with bounce animation

**File Structure**:
```
Hero/
├── Hero.jsx              # Component logic
├── Hero.module.scss      # Component styles
└── index.js              # Barrel export
```

**Key Patterns**:
- Inline styles for dynamic background image
- Configurable overlay opacity
- Animation delays for staggered entrance
- Responsive font sizes
- Uses global button mixin for CTA

**Usage Example**:
```jsx
import Hero from '@/components/Hero';

<Hero
  backgroundImage="/images/hero-alentejo.jpg"
  title="Monte da Estrada"
  subtitle="Turismo Rural no Alentejo"
  ctaText="Reservar Agora"
  ctaLink="/precos"
  height="100vh"
  overlay={0.4}
  align="center"
/>
```

## 🎯 Key Principles

### 1. **Always Import Global Variables**

Every component SCSS file MUST start with:
```scss
@import '@/styles/variables';
@import '@/styles/mixins';
```

### 2. **Never Hardcode Design Values**

❌ **BAD**:
```scss
.button {
  background-color: #116dff;  // Hardcoded!
  padding: 16px 32px;         // Hardcoded!
}
```

✅ **GOOD**:
```scss
.button {
  background-color: $color-accent;
  padding: $spacing-md $spacing-xl;
}
```

### 3. **Use CSS Modules for Component Styles**

- File naming: `ComponentName.module.scss`
- Import in JSX: `import styles from './ComponentName.module.scss'`
- Apply classes: `className={styles.className}`
- Scoped by default, prevents style conflicts

### 4. **Mobile-First Responsive Design**

Write base styles for mobile, then enhance for larger screens:

```scss
.title {
  font-size: $font-size-xl;  // Mobile default

  @include desktop {
    font-size: $font-size-3xl;  // Larger on desktop
  }
}
```

### 5. **Component File Organization**

Each component should have its own folder:
```
ComponentName/
├── ComponentName.jsx         # Component logic
├── ComponentName.module.scss # Styles
├── index.js                  # Export barrel
└── __tests__/                # Tests (optional)
    └── ComponentName.test.js
```

### 6. **PropTypes for Documentation**

Always define PropTypes with descriptions:
```jsx
ComponentName.propTypes = {
  /** Description of what this prop does */
  propName: PropTypes.string.isRequired,
};
```

### 7. **Accessibility First**

- Use semantic HTML (`<nav>`, `<header>`, `<section>`, `<button>`)
- Add ARIA labels (`aria-label`, `aria-expanded`, `aria-current`)
- Include focus styles (`:focus-visible`)
- Support keyboard navigation

## 🔗 How to Use These Examples

1. **Study the structure** - Understand component organization and file naming
2. **Copy patterns, not code** - Use these as inspiration, adapt for your needs
3. **Follow SCSS conventions** - Always import global variables, use mixins
4. **Maintain consistency** - Use the same spacing, colors, transitions throughout
5. **Test responsively** - Check components on mobile, tablet, and desktop

## 📝 Next Steps for Implementation

When building the Monte da Estrada website:

1. **Set up project** with React + SCSS support (Vite or Create React App)
2. **Copy `styles/` folder** to your `src/` directory
3. **Configure path alias** (`@/` → `src/`) in your build tool
4. **Create components** following the structure shown here
5. **Build pages** by composing components together
6. **Extract content** from https://www.montedaestrada.com/
7. **Adapt colors** to Monte da Estrada branding (update `_variables.scss`)

## 🎨 Design System Decisions

Based on Monte do Papa Léguas analysis:

- **Transitions**: 0.2s for interactions, 0.6s for page changes
- **Spacing**: 24px horizontal padding, 8px base unit
- **Shadows**: Subtle shadows (0 1px 3-4px with low opacity)
- **Border Radius**: 8-12px for cards, full radius for buttons
- **Color Approach**: CSS variables for easy theming
- **Typography**: Arial/Helvetica for readability
- **Animations**: Cubic-bezier easing for smooth, professional feel

## 🚀 Performance Tips

- Lazy load images with `loading="lazy"`
- Use WebP format for images (with fallbacks)
- Code split routes with React.lazy()
- Minimize bundle size - only import what you need
- Use CSS Modules to eliminate unused styles

---

**Remember**: These examples are templates to inspire your implementation. Adapt them to fit Monte da Estrada's specific content, branding, and requirements!
