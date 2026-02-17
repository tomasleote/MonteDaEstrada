# Header Component Design Specifications

Comprehensive design specifications for the Monte da Estrada three-tier header component matching Herdade do Touril parent site.

## Color Palette

All colors referenced from the Touril parent site design system:

| Element | Color | Hex Value | RGB Value | Usage |
|---------|-------|-----------|-----------|-------|
| Primary Black | Deep Black | #0A0203 | rgb(10, 2, 3) | Header backgrounds, text |
| Accent Gold | Brand Yellow | #FBAB18 | rgb(251, 171, 24) | Active states, buttons |
| Light Gray | Utility Bar BG | #f5f5f5 | rgb(245, 245, 245) | Tier 1 background |
| Secondary Gray | Text Color | #777777 | rgb(119, 119, 119) | Inactive language link |
| White | Navigation BG | #FFFFFF | rgb(255, 255, 255) | Tier 3 background |

## Typography

All text uses "Open Sans" font family with specific sizes and weights:

| Element | Font Family | Size | Weight | Text Transform | Letter Spacing |
|---------|------------|------|--------|-----------------|-----------------|
| Language Button | Open Sans | 14px | 700 | None | Normal |
| Brand Name | Open Sans | 24px | 700 | None | 0.5px |
| RESERVAS Button | Open Sans | 14px | 700 | Uppercase | 0.5px |
| Nav Items | Open Sans | 14px | 700 | Uppercase | 0.5px |

## Three-Tier Layout

### Tier 1: Utility Bar (Language Selector)

```
┌─────────────────────────────────────────────────────────────┐
│                                              EN | PT         │
└─────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Background**: Light gray (#f5f5f5)
- **Height**: 40px
- **Border**: 1px solid #EAEAEA (bottom border)
- **Alignment**: Right-aligned
- **Padding**: 0 24px

**Language Links:**
- **Font**: Open Sans, 14px, Bold 700
- **Color (Inactive)**: rgb(119, 119, 119)
- **Color (Active)**: rgb(251, 171, 24)
- **Hover State**: Color changes to gold
- **Separator**: Light gray text "|"
- **Padding**: 0 4px per button

---

### Tier 2: Branding Bar

```
┌──────────────────────────────────────────────────────────────┐
│  [LOGO] Monte da Estrada                        [RESERVAS]   │
│  60x60px  24px, Bold                             Pill Button  │
│                                                               │
│  Height: 100px                                               │
│  Black Background #000000                                     │
└──────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Background**: Solid black (#000000)
- **Height**: 100px
- **Padding**: 0 24px
- **Box Shadow**: Applied on scroll (0 4px 12px rgba(26, 26, 26, 0.12))

**Logo Section (Left Side):**
- **Logo Size**: 60x60px (circular, object-fit: contain)
- **Logo Margin**: 24px from left edge
- **Brand Name Font**: Open Sans, 24px, Bold 700
- **Brand Name Color**: White (#FFFFFF)
- **Brand Name Spacing**: Gap of 16px from logo
- **Link Hover State**: Opacity 0.85

**RESERVAS Button (Right Side):**
- **Background**: rgb(251, 171, 24)
- **Color**: Black text rgb(10, 2, 3)
- **Font**: Open Sans, 14px, Bold 700
- **Text Transform**: UPPERCASE
- **Padding**: 15px 30px
- **Border Radius**: 25px (pill shape)
- **Letter Spacing**: 0.5px
- **Hover State**:
  - Background: #ffb928 (lighter gold)
  - Transform: translateY(-2px)
  - Box Shadow: 0 4px 12px rgba(251, 171, 24, 0.3)
- **Active State**:
  - Transform: translateY(0)

---

### Tier 3: Navigation Bar

```
┌──────────────────────────────────────────────────────────────┐
│  INÍCIO  QUARTOS  ATIVIDADES  REDONDEZAS  LOCALIZAÇÃO  GALERIA │
│  14px,   14px,   14px        14px        14px          14px   │
│  Bold    Bold    Bold        Bold        Bold          Bold   │
│                                                                │
│  Height: 52px                                                  │
│  White Background #FFFFFF                                      │
│  1px Bottom Border #EAEAEA                                     │
└──────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Background**: White (#FFFFFF)
- **Height**: 52px
- **Border**: 1px solid #EAEAEA (bottom border)
- **Padding**: 0 (container handles padding)

**Navigation Links:**
- **Font**: Open Sans, 14px, Bold 700
- **Text Transform**: UPPERCASE
- **Color**: rgb(10, 2, 3)
- **Letter Spacing**: 0.5px
- **Padding**: 0 16px (left/right)
- **Height**: 52px (full height, vertically centered)
- **Gap Between Items**: 0 (no gap, continuous)
- **Hover State**:
  - Background: rgba(251, 171, 24, 0.1) (10% gold)
  - Smooth transition
- **Active State**:
  - Background: rgb(251, 171, 24) (full gold)
  - Color: rgb(10, 2, 3)
  - Font Weight: Bold 700

---

## Responsive Breakpoints

### Desktop (1024px and up)

All three tiers maintain full design specifications:

```
Tier 1: 40px
Tier 2: 100px
Tier 3: 52px
━━━━━━━━━━
Total: 192px
```

---

### Tablet (768px - 1023px)

Reduced sizes while maintaining proportions:

```
Tier 1: 40px (unchanged)
Tier 2: 80px (reduced from 100px)
        - Logo: 45x45px (from 60x60px)
        - Brand Name: 18px (from 24px)
        - RESERVAS: 12px font, 12x24px padding

Tier 3: 48px (reduced from 52px)
        - Nav Font: 12px (from 14px)
        - Nav Padding: 0 12px (from 0 16px)

━━━━━━━━━━
Total: 168px
```

---

### Mobile (≤480px)

Compact layout optimized for small screens:

```
Tier 1: 36px (reduced from 40px)
        - Lang Font: 12px (from 14px)

Tier 2: 70px (reduced from 100px)
        - Logo: 40x40px (from 60x60px)
        - Brand Name: 16px (from 24px)
        - RESERVAS: 11px font, 10x20px padding
        - Gap between logo and name: 8px (reduced)

Tier 3: 44px (reduced from 52px)
        - Nav Font: 11px (from 14px)
        - Nav Padding: 0 8px (from 0 16px)
        - Horizontal scroll if necessary

━━━━━━━━━━
Total: 150px
```

---

## Sticky Behavior

**When `sticky={true}` (default):**
- Header position: sticky
- Top: 0
- Z-Index: 1020
- On scroll (scrollY > 50px):
  - Apply shadow to Tier 2 only
  - Shadow: 0 4px 12px rgba(26, 26, 26, 0.12)

**When `sticky={false}`:**
- Header position: relative
- No scroll effects applied
- Z-Index: 1020

---

## Interactive States

### Language Buttons

**Default State:**
- Color: rgb(119, 119, 119)
- Background: Transparent

**Hover State:**
- Color: rgb(251, 171, 24)
- Transition: 150ms ease-out

**Active State:**
- Color: rgb(251, 171, 24)
- Font Weight: Bold 700

**Focus Visible State:**
- Outline: 2px solid rgb(251, 171, 24)
- Outline Offset: 2px

---

### RESERVAS Button

**Default State:**
- Background: rgb(251, 171, 24)
- Color: rgb(10, 2, 3)
- Transform: none

**Hover State:**
- Background: #ffb928
- Transform: translateY(-2px)
- Box Shadow: 0 4px 12px rgba(251, 171, 24, 0.3)
- Transition: all 300ms ease-out

**Active State:**
- Transform: translateY(0)
- Transition completes

**Focus Visible State:**
- Outline: 2px solid white
- Outline Offset: 2px

**Disabled State (if applicable):**
- Opacity: 0.5
- Cursor: not-allowed
- Transform: none

---

### Navigation Links

**Default State:**
- Color: rgb(10, 2, 3)
- Background: White
- Height: 52px

**Hover State:**
- Background: rgba(251, 171, 24, 0.1)
- Transition: 150ms ease-out

**Active State:**
- Background: rgb(251, 171, 24)
- Color: rgb(10, 2, 3)
- Font Weight: Bold 700
- Position: relative

**Focus Visible State:**
- Outline: 2px solid rgb(251, 171, 24)
- Outline Offset: -2px (inset)

---

## Spacing Reference

**8px-based spacing scale:**

| Token | Size | Usage |
|-------|------|-------|
| xs | 4px | Minimal spacing |
| s | 8px | Tight spacing |
| m | 16px | Standard spacing |
| l | 24px | Container padding |
| xl | 32px | Section gaps |

---

## Transitions & Animations

**Timing Values:**
- Quick: 150ms
- Normal: 300ms
- Slow: 500ms

**Easing Functions:**
- Fast: cubic-bezier(0.4, 0, 1, 1)
- Normal: cubic-bezier(0.4, 0, 0.6, 1)
- Slow: cubic-bezier(0.4, 0, 0.2, 1)

**Applied Transitions:**
- Language buttons: color 150ms ease-out
- Branding section: opacity 150ms ease-out
- Navigation links: background 150ms ease-out
- RESERVAS button: all 300ms ease-out
- Header shadow: box-shadow 300ms ease-in-out

---

## Accessibility Requirements

**WCAG 2.1 AA Compliance:**

1. **Color Contrast:**
   - Text on light backgrounds: 7:1+ ratio
   - Text on dark backgrounds: 7:1+ ratio
   - Gold on black: 9.5:1 ratio

2. **Touch Targets:**
   - Minimum 44x44px for interactive elements
   - All buttons meet or exceed this standard

3. **Keyboard Navigation:**
   - All interactive elements accessible via Tab
   - Focus indicators visible and 2px wide
   - No focus traps

4. **Screen Readers:**
   - Proper semantic HTML (header, nav, button)
   - ARIA labels on all buttons
   - ARIA current="page" on active link
   - ARIA labels for navigation regions

5. **Motion:**
   - Respects prefers-reduced-motion
   - Animations disabled when requested

---

## Font Loading Strategy

**Font: Open Sans**

```css
font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Fallback Chain:**
1. Open Sans (hosted)
2. System fonts (Apple, Android, Windows)
3. Generic sans-serif as ultimate fallback

---

## Z-Index Stacking

| Layer | Z-Index | Element |
|-------|---------|---------|
| Base | 0 | Page content |
| Sticky | 1020 | Header (sticky) |
| Fixed | 1030 | Fixed elements |
| Modal | 1050 | Modal overlays |

---

## Performance Considerations

1. **CSS Modules**: All styles scoped to prevent conflicts
2. **Will-change**: Not applied (minimal animation)
3. **GPU Acceleration**: Hardware acceleration for transforms
4. **Lazy Loading**: Header renders immediately (not lazy)
5. **Image Optimization**: Logo should be SVG or compressed PNG
6. **Bundle Size**: Lightweight component, ~5KB minified

---

## Browser-Specific Notes

### iOS Safari
- 16px minimum font size prevents zoom
- `-webkit-overflow-scrolling: touch` for momentum scroll
- Safe area insets handled automatically

### Android Chrome
- `touch-action: manipulation` disables double-tap zoom
- `-webkit-font-smoothing` for consistent rendering

### Firefox
- Standard CSS support
- `-moz-osx-font-smoothing` for text rendering

### Internet Explorer 11
- Not supported (modern browsers only)

---

## Testing Checklist

- [ ] All three tiers render correctly
- [ ] Language switching changes active state
- [ ] Navigation links highlight on active route
- [ ] RESERVAS button callback fires
- [ ] Sticky positioning works on scroll
- [ ] Responsive design works on tablet (768px)
- [ ] Responsive design works on mobile (480px)
- [ ] Keyboard navigation works (Tab through all elements)
- [ ] Focus indicators visible on all interactive elements
- [ ] Color contrast meets WCAG AA standards
- [ ] Logo loads and displays correctly
- [ ] No layout shifts on scroll
- [ ] Touch targets are 44px+ on mobile
- [ ] All ARIA labels present and correct
