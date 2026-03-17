# QuartosPage Editorial Rebuild Design

**Date:** February 23, 2026
**Status:** Design Approved
**Scope:** Visual alignment & brand consistency audit — align room listing page to Boutique Collection editorial standard
**Reference:** Matches ContactoPage rebuild pattern (Feb 22)

---

## Executive Summary

The QuartosPage will be rebuilt to match the Boutique Collection editorial standard established by ContactoPage, DescobrirPage, and HomePage. The interaction pattern (expand-in-place room cards via RoomCardGallery) will be retained, but the visual/typographic treatment will be completely refreshed to match brand guidelines.

**Key Changes:**
- Editorial hero (55vh, cream-tinted gradient)
- Light-weight H2 headings (font-weight: 300, not 500)
- 80px section padding rhythm (matching ContactoPage)
- RoomCardGallery restyled to Boutique Collection standards
- New S3 Booking Section with HeyTravel widget placeholder
- Portuguese brand voice (sophisticated, curatorial, direct)

---

## Architecture

### Three-Section Structure

```
S1 — Editorial Hero (55vh)
     ├── Background image + gradient overlay
     ├── H1: "Os Nossos Quartos" (cream text)
     └── Subtitle (cream text, warm tone)

S2 — Room Cards Section (Cream background, 80px padding)
     ├── SectionEyebrow: "Quartos"
     ├── H2 heading (font-weight: 300, editorial restraint)
     ├── RoomCardGallery (rethemed)
     │   ├── Collapsed card state (off-white, clean typography)
     │   └── Expanded card state (gallery + description)
     └── Motion animations (fade-up, stagger)

S3 — Booking Section (Sand background, 80px padding)
     ├── SectionEyebrow: "Reservas"
     ├── H2 heading (font-weight: 300)
     ├── Intro text (warm, inviting)
     └── HeyTravel widget placeholder (480px min height)
```

---

## Typography Standards

### Heading Styles

| Element | Font | Weight | Size | Letter-spacing | Color |
|---------|------|--------|------|-----------------|-------|
| **H1 (Hero)** | Basis Grotesque | 300 | clamp(H3, 5vw, H1) | 1px | Cream #F5F3F0 |
| **H2 (Section)** | Basis Grotesque | 300 | clamp(H4, 3vw, H2) | 1px | Deep Brown #3D3B38 |
| **Room Title** | Basis Grotesque | 400 | 24px (H4) | 0.75px | Deep Brown #3D3B38 |
| **Room Subtitle** | Inter | 400 | 16px | 0.5px | Deep Brown #3D3B38 |
| **Body Large** | Inter | 400 | 18px | 0.5px | Deep Brown #3D3B38 |
| **Label/UI** | Inter | 500 | 14px | 0.75px | Deep Brown #3D3B38 |

**Critical Rule:** H2 headings use **font-weight: 300** (not 500 from @include h2 mixin). This is editorial restraint and matches ContactoPage exactly.

---

## Spacing & Layout

### Section Padding (80px rhythm)

```scss
Desktop:   80px top / 80px bottom
Tablet:    64px top / 64px bottom
Mobile:    48px top / 48px bottom
```

### Container & Card Spacing

- Container max-width: $container-max-width (from variables)
- Container padding: $container-padding (24-32px horizontal)
- Card padding: 24px (spacing-l)
- Gap between elements: $spacing-xxl (48px) or $spacing-xxxl (64px)
- Column gap in grids: 96px (spacing-xxxl × 2) — generous whitespace

---

## Color Palette

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| **Hero Background** | Deep Brown | #3D3B38 | Gradient base |
| **Hero Overlay** | Cream + Deep Brown | rgba | Gradient: transparent → dark |
| **Hero Text** | Cream | #F5F3F0 | H1, subtitle on image |
| **S2 Background** | Cream | #F5F3F0 | Section background |
| **S2 Text** | Deep Brown | #3D3B38 | Headings, body copy |
| **Card Background** | Off-white | #FAFAF8 | Room cards |
| **S3 Background** | Sand | $color-sand | Booking section |
| **CTA/Accents** | Clay | #B8925F | Eyebrows, buttons, focus states |
| **Borders** | Warm Gray | #DDD9D5 | Dividers, optional structure |

---

## Visual Style Rules

### Border & Shadow
- **border-radius:** 0px everywhere (geometric precision)
- **box-shadow:** None (elevation through whitespace)
- **borders:** 1px solid $color-warm-gray (when needed for structure)

### Images & Photography
- No color overlays on room images
- Object-fit: cover, object-position: center
- Hover state: brightness +5%, opacity transitions (not scale)

### Interactive Elements
- **Buttons:** Clay background, deep brown text, 300ms transition
- **Links:** Deep brown text, clay underline on hover
- **Focus states:** 2px clay outline or border-color change
- **Disabled states:** Medium gray color, desaturated

---

## RoomCardGallery Restyling

### Collapsed Card State

**Container:**
- Background: Off-white #FAFAF8
- border-radius: 0px
- No shadow
- Padding: 0 (image full-width)

**Image Wrapper:**
- width: 100%
- height: 320px (portrait aspect ratio)
- object-fit: cover
- Hover: brightness(1.05), opacity transitions

**Content Section:**
- Padding: 24px
- Background: Off-white (continuous from card)

**Title (H3/H4):**
- Basis Grotesque, 24px, 400 weight
- letter-spacing: 0.75px
- Color: Deep Brown
- margin-bottom: 8px

**Subtitle (Body):**
- Inter, 16px, 400 weight
- letter-spacing: 0.5px
- Color: Deep Brown
- line-height: 1.6
- margin-bottom: 16px

**CTA Button:**
- Text: "Descobrir o quarto"
- Background: Clay #B8925F
- Text Color: Deep Brown #3D3B38
- Font: Inter 14px, 500 weight
- letter-spacing: 0.75px
- Padding: 12px 24px (standard button sizing)
- Hover: opacity 85% + subtle scale (1.02)
- Border-radius: 0px

---

### Expanded Card State

**Layout:** Continues from collapsed card, expands downward with smooth 400ms animation

**Gallery Section:**
- Grid layout: 2 columns (tablet), 1 column (mobile)
- Image aspect ratios: Maintain natural proportions
- gap: 16px between images

**Description Sections:**
- Organized by category (Suite/Conforto/Amenities/Included)
- H3 headings for categories
- body copy for details
- Lists: Clean, no bullet points (numeric or descriptive)

**Amenity List Formatting:**
- ❌ "Wi-Fi de alta velocidade, Ar condicionado..."
- ✅ Organized by category, editorial tone: "Conforto total: clima controlado, internet de fibra..."

**CTA Button (Reserve):**
- Text: "O seu quarto espera" (brand voice, not "Book Now")
- Behavior: Opens HeyTravel widget or external booking (future integration)

---

## S3 Booking Section

### Purpose
Intermediate section between room showcase and booking platform. Placeholder for future HeyTravel integration.

### Layout
- Background: Sand color ($color-sand)
- Padding: 80px top/bottom (matching S2 rhythm)

### Header
- SectionEyebrow: "Reservas" (clay color)
- H2: "O seu quarto espera."
  - font-weight: 300, 1px letter-spacing
  - Color: Deep Brown
- Subtitle: "Reserve agora e descubra onde vai acordar."
  - Inter 18px, letter-spacing: 0.5px
  - Color: Deep Brown

### HeyTravel Widget Placeholder
- Container: 480px minimum height (matching ContactoPage map section)
- Background: Off-white #FAFAF8
- Border: 1px solid $color-warm-gray
- Text: "Widget HeyTravel será integrado aqui"
  - Centered, Inter 16px
  - Placeholder styling only (remove when widget is integrated)
- Padding: 64px (vertical centering)

---

## Copy & Voice

### Brand Voice Principles
- Sophisticated, editorial, direct
- Warm, genuine, human
- No marketing jargon ("amazing," "incredible," "premium amenities")
- Portuguese from Portugal (não Brasil)

### Room Descriptions

**Header:**
```
Suite Deluxe
Vista panorâmica sobre o Alentejo.
```

**Opening Paragraph (Editorial Tone):**
```
Luxo e natureza em perfeita harmonia.
A Suite Deluxe é o nosso espaço mais exclusivo,
onde cada detalhe foi pensado para proporcionar uma experiência inesquecível.
```

**Amenity Organization (Editorial, not listing):**
```
Espaço & Luz
- Suite espaçosa (35 m²) com sala de estar integrada
- Terraço privado panorâmico com mobiliário premium
- Vista 360° sobre a paisagem alentejana

Conforto & Repouso
- 1 cama King Size (200cm x 200cm)
- Roupa de cama egípcia 100% algodão (400 fios)
- Casa de banho completa com banheira e chuveiro
```

---

## Motion & Interaction

### Animation Timings
- **Hero content fade-up:** 300ms ease-in-out
- **Card stagger entrance:** 0.1s delay between children
- **Expand animation:** 400ms ease-in-out (smooth, deliberate)
- **Scroll-to-expanded:** Native behavior (already implemented)
- **Section fade-in:** 300ms on whileInView

### Easing
- All transitions: ease-in-out (balanced, natural)
- No bounce or elastic easing (editorial restraint)

### Hover States
- Card images: brightness +5%, opacity transitions (not scale)
- Buttons: opacity 85% + scale(1.02)
- Links: Clay color change + underline

---

## Files to Modify

1. **QuartosPage.jsx** — Restructure with S1/S2/S3 sections, proper markup
2. **QuartosPage.module.scss** — All section styles, heading styles, card restyling
3. **RoomCardGallery.module.scss** (in shared lib) — Retheme to Boutique standards
4. **RoomCard.module.scss** (in shared lib) — Update card styling
5. **RoomExpandedCard.module.scss** (in shared lib) — Update expanded state styling

---

## Testing & QA Checklist

- [ ] Typography: H2 headings are 300 weight (not 500), 1px letter-spacing
- [ ] Spacing: 80px section padding on desktop
- [ ] Colors: No hardcoded colors, all from variables
- [ ] border-radius: 0px everywhere
- [ ] Shadows: None (or none visible)
- [ ] Letter-spacing: Headlines 1px, subheadings 0.75px, body 0.5px
- [ ] Copy tone: No marketing jargon, Portuguese editorial voice
- [ ] Motion: 300-400ms timings, ease-in-out easing
- [ ] Responsiveness: 375px → 1920px works correctly
- [ ] Accessibility: Color contrast 4.5:1+, focus states visible
- [ ] Components: RoomCardGallery expand/collapse works smoothly
- [ ] HeyTravel placeholder: Clean, ready for integration

---

## Implementation Roadmap

**Phase 1: Restructure QuartosPage.jsx**
- Remove old Section/Container wrappers
- Create S1 Hero, S2 RoomCards, S3 Booking sections
- Import shared components (SectionEyebrow)
- Add SEO metadata

**Phase 2: Style S1 Hero & S2 Section**
- QuartosPage.module.scss: Hero styles, container, heading styles
- Match ContactoPage hero pattern exactly
- Test responsive breakpoints

**Phase 3: Retheme RoomCardGallery Components**
- RoomCard.module.scss: Off-white background, geometric precision
- RoomExpandedCard.module.scss: Editorial description layout
- RoomCardGallery.module.scss: Grid and container styles
- Ensure 0px border-radius, no shadows

**Phase 4: Style S3 Booking Section**
- Container with sand background
- HeyTravel placeholder with clean styling
- Match section padding rhythm

**Phase 5: Copy Review & Motion**
- Audit all room descriptions for editorial tone
- Confirm motion timings (300-400ms)
- Test scroll-reveal animations

**Phase 6: Testing & QA**
- Visual design audit against brand brief
- Responsive testing (375px → 1920px)
- Accessibility check (WCAG AA)
- Cross-browser testing

---

## Future Integrations

**HeyTravel Widget:**
- Placeholder container is ready in S3
- When widget is integrated, replace placeholder div with actual component
- Maintain 480px+ height, same padding/spacing rules
- No color conflicts: widget must work on sand background

---

## References

- **Boutique Collection Brand Brief:** docs/plans/2026-02-22-boutique-collection-brand-identity-brief.md
- **ContactoPage Rebuild:** Completed Feb 22, 2026 — reference pattern
- **HomePage Editorial Structure:** Reference for RoomGrid usage
- **DescobrirPage:** Reference for section rhythm and motion patterns

---

**Status:** Ready for Implementation
**Next Step:** Invoke writing-plans skill to create detailed task breakdown
