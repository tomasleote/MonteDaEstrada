# Findings — Touril Collection Site Audit
**Last Updated:** 2026-02-17

---

## 1. Touril Parent Site DNA (herdadedotouril.com)

### 1.1 Visual Design System

**Colors (extracted from screenshot + CSS inspection):**
```scss
$color-header-bg:     #000000;   // Top bar / header background
$color-nav-bg:        #ffffff;   // Navigation bar background
$color-accent:        #f0a500;   // Reservas button, active nav highlight (orange/yellow)
$color-text-dark:     #1a1a1a;   // Body text, nav links
$color-text-light:    #ffffff;   // Text on dark backgrounds
$color-footer-bg:     #1a1a1a;   // Dark footer background (estimated from structure)
$color-footer-text:   #cccccc;   // Footer text
$color-border:        #e0e0e0;   // Subtle borders
```

**Typography (observed):**
- Navigation: uppercase, bold, sans-serif
- Headings: serif-style (likely Georgia or similar for main headlines)
- Body: sans-serif, comfortable line-height
- Logo text: bold, "Herdade do Touril" + tagline "ALENTEJO QUE SABE A MAR"
- Nav items are ALL CAPS

**Spacing:**
- Header is two-tier (TopBar ~40px + NavBar ~60px)
- Generous padding in nav items
- Full-width slideshow (100vw)

### 1.2 Header Structure (Two-Tier)

```
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO img]  Herdade do Touril    ALENTEJO QUE SABE A MAR      [EN|PT]  [RESERVAS btn] │  ← TopBar (black)
├─────────────────────────────────────────────────────────────────┤
│  HERDADE DO TOURIL | QUARTOS | RESTAURANTE | VISITA VIRTUAL | ROTA VICENTINA | PERCURSOS BTT | MEDIA | LOCALIZAÇÃO | CONTACTOS │  ← NavBar (white)
└─────────────────────────────────────────────────────────────────┘
```

**RESERVAS button:** Orange/yellow pill shape, positioned top-right
**Language switcher:** Top-right corner, text links `EN | PT`
**Active nav item:** Has yellow/orange left border or highlight

### 1.3 Navigation Items (Touril)
- Herdade do Touril (home)
- Quartos
- Restaurante
- Visita Virtual
- Rota Vicentina
- Percursos BTT
- Media
- Localização
- Contactos
- Reservas (external link to booking engine)

**Booking URL (Touril):** `https://www.secure-hotel-booking.com/smart/Herdade-do-Touril/2X9F/pt/`

### 1.4 Footer Structure

```
┌──────────────────────────────────────────────────────────┐
│  [Nav Links]           │  [Address + Contact Info]        │
│  Herdade do Touril     │  Morada:                        │
│  Quartos               │  Herdade do Touril               │
│  Reservar              │  7630-734 Zambujeira do Mar      │
│  Visita Virtual        │  Portugal                        │
│  Restaurante           │  GPS: 37°33'47.88"N /            │
│  Rota Vicentina        │       8°46'43.76"W               │
│  Cycling               │  RNET n.: 441                    │
│  Media                 │  T: +351 283950080               │
│  Localização           │  M: +351 937811627               │
│                        │  reservas@touril.pt              │
├──────────────────────────────────────────────────────────┤
│  [Facebook] [YouTube] [Instagram] [Tripadvisor]          │
│  Livro de Reclamações | CNIACC                           │
│  © Herdade do Touril 2020                                │
└──────────────────────────────────────────────────────────┘
```

### 1.5 Homepage Sections (Touril)
1. **Header** (fixed, two-tier)
2. **Slideshow** — Full-width, multiple slides, prev/next arrows, text overlay with heading + description
3. **Welcome section** — "Bem-vindo ao Sudoeste Alentejano." — h1, paragraphs with bold keywords
4. **Image gallery grid** — "A Herdade em Imagens" — 3 image cards with category labels (Partes Comuns, Detalhes, Costa Vicentina)
5. **Awards section** — "Prémios e Certificações" — partner logos/badges
6. **Restaurant CTA card** — Card with "Restaurante Touril & Celso", description, booking link
7. **Contact form** — Full form with name, surname, email, phone, country, subject, message, reCAPTCHA
8. **Location section** — "Como chegar" with GPS coords and embedded map (tabbed: Localização | Distâncias Aeroportos)
9. **Weather widget** — External iframe widget
10. **Footer**

---

## 2. Papa-léguas Site Audit (montedopapaleguas.pt)

### 2.1 Header
```
┌──────────────────────────────────────────────────────────┐
│  MONTE DO PAPA LÉGUAS (h1 text logo)                     │
│  [Nav: Início | Quartos | Atividades | Redondezas | Localização | Galeria]  [RESERVAR btn]  │
│                                    [+351 960 432 223] [WhatsApp icon]      │
└──────────────────────────────────────────────────────────┘
```

**Key difference from Monte da Estrada current:** Has `RESERVAR` button + WhatsApp phone in header

### 2.2 Booking Engine (Papa-léguas)
```
URL: https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?checkIn=today&occupation=[{"room":1,"adults":2,"children":0}]&complex=1563&lang=pt-PT&
```
**Engine:** HeyTravel (be.heytravel.net) — this is what was called "E-Travel" in the meeting

### 2.3 Navigation (Papa-léguas)
- Início
- Quartos
- Atividades
- Redondezas
- Localização
- Galeria

**Matches Monte da Estrada pages exactly** ✅

### 2.4 Footer (Papa-léguas)
- Address: Monte do Papa léguas, Alpenduradas, 7630-732 Zambujeira do Mar
- RNAL: 91737/AL
- Email: geral@montedopapaleguas.pt
- Phone: +351 960 432 223
- Social: Instagram + Facebook
- Payments: MasterCard accepted
- Legal: Livro de Reclamações, CNIACC

### 2.5 Homepage Slideshow (Papa-léguas)
- Full-screen images with text overlay
- Shows: "MONTE DO PAPA LÉGUAS", "ZAMBUJEIRA DO MAR", "CASA DE CAMPO", "Hotel Studio Rooms"
- 33 total slides (image counter visible: "1/33")
- Navigation arrows (prev/next buttons)
- → This confirms the `shared/Slideshow` component needs to support large image counts

### 2.6 Homepage Welcome Text (Papa-léguas)
Rich paragraph text about the property - similar structure to Touril welcome section.

### 2.7 Pages to migrate:
| Page | Has content? | Priority |
|------|-------------|---------|
| Início (Home) | ✅ Confirmed | High |
| Quartos | ✅ Confirmed | High |
| Atividades | ✅ Confirmed | Medium |
| Redondezas | ✅ Confirmed | Medium |
| Localização/Contactos | ✅ Confirmed | High |
| Galeria | ✅ Confirmed | Medium |

---

## 3. Monte da Estrada Current State

### 3.1 Existing Components
| Component | Location | Status | Shareable? |
|-----------|----------|--------|------------|
| NavBar | `components/NavBar/` | Functional, needs redesign | After redesign |
| Header | `components/Header/` | New component (separate from NavBar) | After redesign |
| Footer | `components/Footer/` | Functional, needs redesign | After redesign |
| Button | `components/Button/` | ✅ Good | ✅ Yes |
| Card | `components/Card/` | ✅ Good | ✅ Yes |
| Slideshow | `components/Slideshow/` | ✅ Exists | ✅ Yes |
| ImageGallery | `components/ImageGallery/` | ✅ Good | ✅ Yes |
| ContactForm | `components/ContactForm/` | ✅ Good | ✅ Yes |
| Map | `components/Map/` | ✅ Good | ✅ Yes |
| Container | `components/Container/` | ✅ Good | ✅ Yes |
| Section | `components/Section/` | ✅ Good | ✅ Yes |
| Grid | `components/Grid/` | ✅ Good | ✅ Yes |
| ResponsiveImage | `components/ResponsiveImage/` | ✅ Good | ✅ Yes |
| Lightbox | `components/Lightbox/` | ✅ Good | ✅ Yes |
| LoadingSpinner | `components/LoadingSpinner/` | ✅ Good | ✅ Yes |
| SEO | `components/SEO/` | ✅ Good | ✅ Yes |

### 3.2 Existing Pages
- HomePage ✅
- QuartosPage ✅
- AtividadesPage ✅
- RedondezasPage ✅
- LocalizacaoPage ✅
- GaleriaPage ✅
- Admin pages (Login, Dashboard, ContentEditor, ImageManager, Settings) ✅

### 3.3 Existing Data Files
- `src/data/home.json`
- `src/data/quartos.json`
- `src/data/atividades.json`
- `src/data/redondezas.json`
- `src/data/galeria.json`
- `src/data/localizacao.json`
- `src/data/site-settings.json`

### 3.4 What needs updating (Phase 1):
- Email: currently unknown → needs → `geral@montedaestrada.com`
- Phone: needs to be mobile only with `+351` prefix
- Copyright: → `Touril Agrotourismo Limitada`

### 3.5 Style system
- Uses SCSS modules ✅
- Has `src/styles/_variables.scss` ✅
- Has `src/styles/_mixins.scss` ✅
- Has `src/styles/global.scss` ✅
- **Action needed:** Add Touril DNA colors to `_variables.scss`

---

## 4. Component Differences to Address

### Header: Current vs Touril-style
| Feature | Current Monte da Estrada | Target (Touril-style) |
|---------|--------------------------|----------------------|
| Structure | Single tier | Two-tier (TopBar + NavBar) |
| Logo | Text or image | Image + text + tagline |
| Background | TBD | TopBar: black, NavBar: white |
| RESERVAR button | ❌ Missing | ✅ Orange pill, top-right |
| Language switcher | ❌ Missing | ✅ EN/PT text links |
| WhatsApp | ❌ Missing | ✅ Icon + phone number |
| Active state | Partial | Yellow/orange highlight |

### Footer: Current vs Touril-style
| Feature | Current Monte da Estrada | Target (Touril-style) |
|---------|--------------------------|----------------------|
| Columns | 3 (Contact, Nav, About) | 2 (Nav links, Address+Contact) |
| Social icons | ❌ Missing | ✅ FB + Instagram (at minimum) |
| Legal links | ❌ Missing | ✅ Livro Reclamações + CNIACC |
| Copyright | "Monte da Estrada" | "Touril Agrotourismo Limitada" |
| Background | TBD | Dark (#1a1a1a) |
