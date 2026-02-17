# Header Component

A three-tier modular header component matching the Herdade do Touril parent site design. The header is fully responsive, accessible, and provides language selection, branding, and main navigation.

## Features

### Tier 1: Utility Bar (Language Selector)
- Light gray background (#f5f5f5)
- Height: 40px
- Language selector with EN/PT options
- Active language highlighted in brand gold color (#FBAB18)
- Fully responsive

### Tier 2: Branding Bar
- Solid black background (#000000)
- Height: 100px (80px on tablet, 70px on mobile)
- Left side: Optional circular logo + brand name
- Right side: "RESERVAS" button in brand gold
- Subtle shadow on scroll
- Responsive logo and text sizing

### Tier 3: Navigation Bar
- White background (#FFFFFF)
- Height: 52px (48px on tablet, 44px on mobile)
- Navigation items with uppercase text
- Active state background highlight in brand gold
- Horizontal scroll on mobile if needed

## Usage

```jsx
import Header from '@/components/Header';

const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Quartos', path: '/quartos' },
  { label: 'Atividades', path: '/atividades' },
  { label: 'Localização', path: '/localizacao' },
  { label: 'Galeria', path: '/galeria' },
];

function App() {
  const [language, setLanguage] = useState('PT');

  const handleReservasClick = () => {
    // Handle reservas button click
    window.open('https://reservas.example.com');
  };

  return (
    <Header
      logo="/path/to/logo.jpg"
      brandName="Monte da Estrada"
      navigationItems={navItems}
      sticky={true}
      onReservasClick={handleReservasClick}
      currentLanguage={language}
      onLanguageChange={setLanguage}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | string | `null` | URL to the circular logo image |
| `brandName` | string | **required** | Property/brand name displayed in header |
| `navigationItems` | array | `[]` | Array of navigation items with `label` and `path` |
| `sticky` | boolean | `true` | Enable sticky positioning on scroll |
| `onReservasClick` | function | `null` | Callback when RESERVAS button is clicked |
| `currentLanguage` | 'EN' \| 'PT' | `'PT'` | Currently selected language |
| `onLanguageChange` | function | `null` | Callback when language is changed |

## Navigation Item Structure

Each navigation item should have:

```javascript
{
  label: 'Display Text',    // e.g., 'Quartos'
  path: '/route-path'       // e.g., '/quartos'
}
```

## Styling

The component uses SCSS Modules for style isolation and imports design tokens from the global variables:

- **Colors**: Brand primary (#0A0203), accent (#FBAB18), neutrals
- **Typography**: Open Sans for header text
- **Spacing**: 8px-based spacing scale
- **Breakpoints**: Mobile (480px), Tablet (768px), Desktop (1024px)

## Accessibility

The Header component is fully accessible with:

- Semantic HTML (`<header>`, `<nav>`, `<button>`)
- ARIA labels on all buttons and links
- Proper role attributes (`banner`, `navigation`, `menubar`, `menuitem`)
- Focus-visible states for keyboard navigation
- Active state indication with `aria-current="page"`
- Touch-friendly button sizing (44px+ minimum)

## Responsive Design

### Tablet (≤ 768px)
- Branding bar height: 80px
- Brand name font size: 18px
- Logo size: 45x45px
- RESERVAS button: 12x24px padding
- Navigation font size: 12px

### Mobile (≤ 480px)
- Utility bar height: 36px
- Language button font size: 12px
- Branding bar height: 70px
- Brand name font size: 16px
- Logo size: 40x40px
- Navigation font size: 11px
- Navigation scrolls horizontally if needed

## Browser Support

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest (iOS 13+)
- Mobile browsers: Latest

## Future Enhancements

- Mobile hamburger menu option
- Dropdown menus for nested navigation
- Search functionality
- Login/account menu
- Multi-language content support

## Testing

Comprehensive tests are included in `__tests__/Header.test.jsx` covering:
- Rendering of all three tiers
- Language selection interaction
- Navigation link activation
- Button callbacks
- Accessibility features
- Edge cases and error handling

## Related Files

- `Header.jsx` - Main component logic
- `Header.module.scss` - Component styles
- `__tests__/Header.test.jsx` - Test suite
- `@/styles/_variables.scss` - Design tokens
- `@/styles/_mixins.scss` - Reusable style mixins
