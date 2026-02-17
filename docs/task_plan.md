# Task Plan — Monte da Estrada + Touril Collection
**Created:** 2026-02-17
**Status:** Active
**Deadline (Phase 1):** 2026-02-20 (Thursday)

---

## Strategic Context (from Meeting 2026-02-17)

- **Ecosystem:** Papa-léguas + Monte da Estrada → same look/feel, same PMS (HeyTravel), touril color palette which can be found on docs\design-system.md and docs\design-tokens-mapping.md
- **Touril:** Stays on WordPress for now, served as the visual DNA reference
- **Long-term:** Institutional group hub site (like Hotéis Heritage model) — NOT in scope now
- **Booking engine:** HeyTravel (be.heytravel.net) — NOT HeyBooking
- **Cross-property links:** Deferred — full ecosystem later
- **Component reuse:** All components must be built for reuse between Monte da Estrada and Papa-léguas

---

## Phase 1 — Immediate Fixes to Monte da Estrada
**Deadline: 2026-02-20 | Status: 🔴 Not Started**

These are the direct action items from the meeting. Must be done before the trip.

### Tasks:

- [ ] **1.1** Update email → `geral@montedaestrada.com` (in `site-settings.json` and `home.json` / localizacao.json)
- [ ] **1.2** Remove fixed phone; keep only mobile with `+351` prefix (e.g. `+351 XXX XXX XXX`)
- [ ] **1.3** Add WhatsApp button with phone number to header top bar, on the right side (replicate Papa-léguas pattern)
- [ ] **1.4** Change footer copyright → `"Touril Agrotourismo Limitada"`
- [ ] **1.6** Update all contact info across JSON data files

**Files to modify:**
- `monte-da-estrada/src/data/site-settings.json`
- `monte-da-estrada/src/data/localizacao.json`
- `monte-da-estrada/src/data/home.json`
- `monte-da-estrada/src/components/Header/Header.jsx` + `Header.module.scss`
- `monte-da-estrada/src/components/Footer/Footer.jsx` + `Footer.module.scss`
- `monte-da-estrada/src/App.jsx` (contact info props)

---

## Phase 2 — Replicate Touril Header & Footer
**Deadline: After Feb 20 | Status: 🔴 Not Started**

Build new Header and Footer components that are **visually identical** to herdadedotouril.com, adapted for Monte da Estrada content.

### Touril Header Structure (confirmed from audit):
```
[TOP BAR]  Black bg | Logo (image + "Herdade do Touril" text + tagline) | Language switcher (EN|PT) | RESERVAS button (orange/yellow)
[NAV BAR]  White bg | Navigation links uppercase | Active state highlighted
```

### Touril Footer Structure (confirmed from audit):
```
[LEFT]    Nav links: Início, Quartos, Reservar, Galeria, Atividades, Redondezas, Localização, Contactos
[CENTER]  Address block: name, street, city, GPS coords, RNET number, T: fixed, M: mobile, email
[BOTTOM]  Social icons: Facebook, Instagram + legal links (Livro Reclamações, CNIACC)
[LAST]    Copyright: © Touril Agrotourismo Limitada [year]
```

### Tasks:

- [ ] **2.1** Refactor `Header.jsx` → two-tier layout (TopBar + NavBar)
  - TopBar: black bg, logo left, language switcher + RESERVAR button right
  - NavBar: white bg, nav links uppercase, active highlight
  - WhatsApp icon + phone in TopBar
- [ ] **2.2** Update `Header.module.scss` → match Touril colors/spacing/fonts
- [ ] **2.3** Refactor `Footer.jsx` → three-column Touril layout
  - Column 1: Nav links
  - Column 2: Address + contact info
  - Column 3: Social + legal
- [ ] **2.4** Update `Footer.module.scss` → match Touril dark footer style
- [ ] **2.5** Extract Touril colors into `_variables.scss` (see findings.md for DNA)
- [ ] **2.6** Make RESERVAR button configurable via props (different URL per property)
- [ ] **2.7** Make nav items configurable via props (different pages per property)
- [ ] **2.8** Test responsiveness (mobile hamburger must work)
- [ ] **2.9** Update Header tests in `__tests__/Header.test.jsx`

**Design DNA to apply (from findings.md):**
- Colors: `#000000` (header bg), `#ffffff` (nav bg), `#f0a500` (accent/reservas), `#333` (text)
- Font: uppercase nav labels, Touril uses system sans-serif
- Logo: site name + circular icon + tagline

---

## Phase 3 — Shared Component Library
**Deadline: Before Papa-léguas migration | Status: 🔴 Not Started**

Refactor current components so they are **property-agnostic** and reusable for Papa-léguas.

### Target Structure:
```
monte-da-estrada/src/components/shared/
├── Header/
│   ├── Header.jsx          ← configurable: logo, navItems, reservasUrl, phone, languages
│   ├── Header.module.scss
│   └── index.js
├── Footer/
│   ├── Footer.jsx          ← configurable: navLinks, address, social, copyright
│   ├── Footer.module.scss
│   └── index.js
├── Slideshow/
│   ├── Slideshow.jsx       ← configurable: slides[], autoplay, interval
│   ├── Slideshow.module.scss
│   └── index.js
├── RoomCard/
│   ├── RoomCard.jsx        ← configurable: image, name, description, link
│   ├── RoomCard.module.scss
│   └── index.js
├── Button/
│   ├── Button.jsx          ← configurable: variant, size, href/onClick
│   ├── Button.module.scss
│   └── index.js
├── ImageGallery/
│   ├── ImageGallery.jsx    ← configurable: images[], columns, lightbox
│   ├── ImageGallery.module.scss
│   └── index.js
├── Card/
│   ├── Card.jsx
│   ├── Card.module.scss
│   └── index.js
├── ContactForm/
│   ├── ContactForm.jsx     ← configurable: email target
│   ├── ContactForm.module.scss
│   └── index.js
└── Map/
    ├── Map.jsx             ← configurable: coordinates, zoom, label
    ├── Map.module.scss
    └── index.js
```

### Tasks:
- [ ] **3.1** Create `src/components/shared/` directory
- [ ] **3.2** Move Header (Phase 2 version) → `shared/Header/`
- [ ] **3.3** Move Footer (Phase 2 version) → `shared/Footer/`
- [ ] **3.4** Move Slideshow → `shared/Slideshow/` (ensure fully prop-driven)
- [ ] **3.5** Move RoomCard → `shared/RoomCard/`
- [ ] **3.6** Move Button → `shared/Button/`
- [ ] **3.7** Move ImageGallery → `shared/ImageGallery/`
- [ ] **3.8** Move Card → `shared/Card/`
- [ ] **3.9** Move ContactForm → `shared/ContactForm/`
- [ ] **3.10** Move Map → `shared/Map/`
- [ ] **3.11** Update all imports in pages to use `@/components/shared/`
- [ ] **3.12** Create `src/components/shared/index.js` barrel export
- [ ] **3.13** Document each component (PropTypes + JSDoc)
- [ ] **3.14** Run all existing tests; fix any broken imports

### Key principle for all shared components:
> **No hardcoded content.** All text, images, URLs, colors must come from props or CSS variables. The component itself is brand-agnostic.

---

## Phase 4 — Audit Papa-léguas (Wix → React Migration Prep)
**Deadline: Before Papa-léguas migration start | Status: 🔴 Not Started**

Use Playwright to fully audit montedopapaleguas.pt and document all pages, components, and content needed for migration.

### Pages to audit:
- [ ] **4.1** Início (Home) — slideshow, welcome text, gallery
- [ ] **4.2** Quartos — room cards, descriptions, pricing
- [ ] **4.3** Atividades — activity cards
- [ ] **4.4** Redondezas — nearby places
- [ ] **4.5** Localização/Contactos — map, address, contact form
- [ ] **4.6** Galeria — image gallery

### For each page, document:
- Content (text, images)
- Component types needed
- Images to download/optimize
- Special features (booking widget URL, WhatsApp link, etc.)

### Key findings already captured (see findings.md):
- Booking URL: `https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?...&complex=1563&lang=pt-PT`
- Phone: `+351 960 432 223`
- Email: `geral@montedopapaleguas.pt`
- Address: Alpenduradas, 7630-732 Zambujeira do Mar | RNAL: 91737/AL
- Social: Instagram + Facebook

### Component mapping (Wix → React shared library):
| Wix Element | React Shared Component |
|---|---|
| Slideshow with text overlay | `shared/Slideshow` |
| Room cards | `shared/RoomCard` |
| Gallery grid | `shared/ImageGallery` |
| RESERVAR button | `shared/Header` (configurable) |
| WhatsApp button | `shared/Header` (configurable) |
| Footer address block | `shared/Footer` (configurable) |
| Contact form | `shared/ContactForm` |
| Map | `shared/Map` |

---

## Key Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-17 | Booking engine = HeyTravel (be.heytravel.net) | Confirmed from Papa-léguas live site |
| 2026-02-17 | Cross-property links deferred | First: finish Monte da Estrada |
| 2026-02-17 | Papa-léguas migrates to React | Integration with HeyTravel + consistency |
| 2026-02-17 | Touril stays on WordPress | Different tech, not in current scope |
| 2026-02-17 | Copyright → "Touril Agrotourismo Limitada" | Group branding, meeting decision |
| 2026-02-17 | Both budget sites: same design, different primary color | Visual family, not clones |
| 2026-02-17 | Touril colors as base for budget sites | Ease future rebrand |

---

## Open Questions / Blockers

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | What is the HeyTravel booking URL for Monte da Estrada? | Owner/client | ❓ Open |
| 2 | What is Monte da Estrada's mobile phone number? | Owner/client | ❓ Open |
| 3 | What primary color differentiates Monte da Estrada from Papa-léguas? | Design decision | ❓ Open |
| 4 | Does Monte da Estrada need Livro de Reclamações link in footer? | Owner/client | ❓ Open |
| 5 | Language switcher: PT/EN only, or also ES/DE/FR like Touril? | Owner/client | ❓ Open |
