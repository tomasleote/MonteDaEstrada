# UX/UI Audit — Homepage Architecture
## Monte da Estrada · Boutique Collection
**Date:** 2026-02-22
**Author:** Senior UX Architect (AI)
**Phase:** Pre-implementation — Homepage design direction

---

## 1. Benchmark Audit Findings

### 1.1 Casa de São Lourenço — casadesaolourenco.pt
**Aesthetic:** Dark, mountain-moody. Deep charcoal backgrounds, stone and wool textures, warm amber typography.
**Verdict:** Superb editorial execution but deliberately dark — wrong palette for us. Study it for copywriting and section structure, not aesthetics.

**Full Page IA (top → bottom):**
1. **Full-viewport hero** — mountain landscape photo (dark), property logo centred, no hero copy
2. **Dual editorial text sections** (dark bg, cream text) — each section is image LEFT + text RIGHT:
   - Section A: `"UM PANORAMA ELEVADO DE CONFORTO."` (H4 uppercase) → body: *"A Casa de São Lourenço é um boutique hotel de 5 estrelas no Parque Natural da Serra da Estrela. Um alojamento sustentável que honra o património cultural e natural da montanha, convidando a viver a sua beleza intemporal. Este não é apenas um lugar para ficar: é um lugar para cuidar."* → CTA: "Sustentabilidade"
   - Section B: `"Um ícone da Serra da Estrela. Desde 1940."` (heritage story) → *"Foi uma das primeiras Pousadas de Portugal... 70 anos depois renasce como o primeiro Hotel de 5 estrelas na Serra da Estrela."* → CTA: "O Hotel"
3. **Rooms section** — `"QUARTOS E SUITES"` uppercase label. Room photography grid. Prose description. CTA: "Saiba mais"
4. **Restaurant section (FATIGA)** — Brand name as headline. Yellow/autumn imagery. Bold editorial copy: *"Sabores que contam histórias."*
5. **SPA E WELLNESS** — Dual-image layout (pool + ofurô). Quote format: *"Mais do que um spa, um santuário de bem-estar."* CTA: "SPA"
6. **Footer** — Award logos bar (Burel, industry certifications) then contact info

**What works — extract for Monte da Estrada:**
- Section labels in UPPERCASE on a coloured band signal each section without visual noise
- Heritage/origin story as a distinct section builds emotional depth (we can adapt: *"A casa existia antes de ser hotel"*)
- Image + text pairing where image is always ≥50% of the section width — text never competes with photography
- CTAs are single underlined text links ("O Hotel", "Saiba mais") — no heavy buttons except the booking CTA in the header
- No horizontal scroll, no carousels — every section is vertical and linear

**What to avoid:**
- Dark palette (wrong for our cream Boutique Collection identity)
- Spa/Restaurant prominence (Monte da Estrada has neither)

---

### 1.2 Memmo Alfama — memmohotels.com/alfama
**Aesthetic:** Light cream background, warm neutral photography, urban Lisbon character. More accessible than CSL.
**Verdict:** Weaker aesthetically (promotional clutter), but provides THE strongest structural lesson: the editorial manifesto approach.

**Full Page IA (top → bottom):**
1. **Full-viewport hero** — Alfama neighbourhood streetscape photography
2. **Three-paragraph editorial manifesto** (cream bg, no images) — Three separate H4-sized paragraphs, each a complete thought:
   - *"This hidden treasure in the heart of Lisbon's most picturesque neighbourhoods has mastered the art of local integration, offering a truly authentic Lisbon experience with unmatched views of Alfama and Tagus River."*
   - *"Steps away from the city's Cathedral and the São Jorge Castle, the hotel was considered one of the 48 new best urban hotels of the world."*
   - *"Authentic and contemporary, memmo Alfama and its 42 rooms offer that special feeling of being at a Portuguese home..."*
3. **Deals carousel** ❌ — 4 promotional cards. This degrades premium perception. Do not replicate.
4. **Territory/Neighbourhood section** — Centred brand icon, italic tagline (*"The authentic Lisbon you will never forget"*), bold intro + 2 prose paragraphs about Alfama, then a full-width editorial image, then 2-up feature cards (The Neighbourhood + Tailored Hotel Packages)
5. **"Unforgettable Memories" hub** — H2 section title, then 5-tab horizontal navigation (The Terrace · Memmo Gift · Explore · Press · Reviews). Active tab reveals a large feature card + 3-column card grid
6. **Reviews carousel** — Quote + guest name + city of origin. Understated and effective.
7. **#memmoalfama UGC section** — Instagram hashtag with empty grid placeholder
8. **Footer**

**What works — extract for Monte da Estrada:**
- **The three-paragraph manifesto** is the single most transferable pattern. Pure text, no images, three distinct sentences that build a picture. Copied straight to our Editorial Anchor section.
- **Territory section with icon + italic tagline** — translates directly to our "O Território" section with the Alentejo/Atlantic positioning
- **Reviews carousel** — Real guest names + origin city creates trust without feeling commercial. We adapt this after we have reviews.
- **Tab navigation within a section** — Useful for condensing multiple topics (activities, surroundings, gallery preview) without creating separate sections

**What to avoid:**
- Deals/promotions carousel — a hotel, not a flash sale
- Cramped footer with every possible link

---

### 1.3 São Lourenço do Barrocal — barrocal.pt ★ CLOSEST REFERENCE
**Aesthetic:** Warm cream (#f0ede8-ish), terracotta and clay accents, natural stone, warm agricultural photography. Leading Hotels of the World. This is our north star.
**Verdict:** Direct analogue — same region (Alentejo), rural estate scale, same whitespace philosophy, same light palette. Study every section.

**Full Page IA (top → bottom):**
1. **Full-viewport aerial/drone hero** — overhead shot of the estate showing the compound within the landscape. Overlay text at bottom: *"Há uma sensação de lugar aqui"* (There is a feeling of place here). Animated scroll indicator: "Deslizar" (Scroll)
2. **Editorial anchor block** (cream bg, centred) — Eyebrow: "Herdade" (small caps). H2: *"São Lourenço do Barrocal, Hotel & Monte Alentejano"*. Prose: *"No Alentejo, o monte e a paisagem são a nossa casa."*. Contact: `reservations@barrocal.pt · +351 266 247 140`. CTA: "acerca da herdade" (text link)
3. **Property image carousel** — Eyebrow: "Hotel". Horizontal carousel of 3 images (anniversary photo, farm room, casas) with photographer credit ("Ash James")
4. **Two-column accommodation split** — Left: "Quartos" + *"Durma aconchegado pela serenidade da paisagem e, de manhã, abra a janela para a vista deslumbrante de Monsaraz."* + "Ver quartos". Right: "Casas" + *"Experiencie a calma intemporal e o sentimento aconchegante das nossas casas, cujas paredes caiadas testemunham o ritmo da vida rural."* + "Ver casas"
5. **Inline booking widget** — H2: *"Marque a sua estadia no São Lourenço do Barrocal"*. Date picker + adults + children + rate code + "Ver disponibilidade" button
6. **Two-column editorial split** — Left: image (beekeepers in garden) + "Trabalhar no Barrocal" + prose + CTA. Right: food photo (photographer credit: Jorge Vieira) + "Restaurantes" + *"Comida inspirada no Alentejo, feita com ingredientes de qualidade oriundos da herdade..."* + CTA
7. **Full-bleed animal photography** — Horse in golden field (photographer credit: Hannah Dace). Condé Nast Traveler 2025 Reader's Choice Award badge overlaid. No text, just the image.
8. **Single featured event** — Two-column: left is event text (heading + excerpt), right is event photo. Seasonal, timely content.
9. **Footer** — Property info left, "Reservar" CTA, contact + social + newsletter, partner logos (Querido, LHW, The Leading Hotels, Virtuoso), link columns (Contactos, Loja, Trabalhe connosco, area guides), legal

**Why it works:**
- The aerial hero immediately shows the scale and isolation of the property — communicates "remote" and "intentional" before a word is read
- *"Há uma sensação de lugar aqui"* — six words that capture the entire brand promise. Our hero needs equivalent economy
- Photographer credits on every image signal that photography was commissioned, not stock — critical for premium credibility
- Inline booking widget is non-intrusive — it's one section among nine, not a persistent modal
- Full-bleed animal photo is a pure emotional beat — no CTA, no text. The Condé Nast badge is placed here not in the hero, which is elegant restraint
- Newsletter + social in footer = long-term engagement channel built in from day one
- "Herdade" eyebrow before the property name roots it in the Alentejo tradition before the guest reads anything else

---

## 2. Synthesized Patterns — Why Premium Hospitality Sites Work

| Pattern | Why it works | Our adaptation |
|---------|-------------|----------------|
| 100vh immersive hero | Creates an immediate emotional state before any rational evaluation | Full exterior/landscape shot |
| Eyebrow labels (small caps) | Create information hierarchy without visual noise | "A Casa", "Quartos", "O Território" |
| One-sentence positioning | Forces editorial clarity; guests remember one thing | "O interior do Alentejo. A 18km do Atlântico." |
| Prose copywriting | Signals intelligence and curatorial taste | Replaced bullet-point amenity lists |
| Full-bleed photography breaks | Provides emotional rhythm; prevents reading fatigue | Between "Rooms" and "Territory" sections |
| Inline booking widget | Reduces friction; no redirect required | After Territory section |
| Territory/neighborhood section | Expands the value proposition beyond the property walls | Rota Vicentina, Zambujeira, São Teotónio |
| Photographer credits | Micro-signal of attention to craft and authenticity | On hero and full-bleed images |
| Restrained CTAs | Premium brands don't shout; they invite | Text links only; one primary clay button per section max |

---

## 3. Monte da Estrada — Context Constraints

Before proposing the page structure, these constraints shape every decision:
- **No spa.** No spa teaser section.
- **No restaurant.** The territory itself is the food story (local markets, fishing villages, coastal restaurants 20min away).
- **6 rooms only.** This is intimacy. The copy and design should lean into smallness as a luxury, not apologize for it.
- **Content in Portuguese.** Authentic, literary Portuguese. Not translated English.
- **Wild Luxury positioning.** The primary emotional promise is: trail run in the morning, cold rosé at sunset, stars you can't see in Lisbon.

---

## 4. Proposed Homepage Structure — `EstradaHomePage.jsx`

### Section Sequence

```
┌──────────────────────────────────────────────────────────┐
│  [S1] IMMERSIVE HERO                                      │
│  100vh · Exterior/landscape photography                   │
│  One line: "Uma casa no interior do Alentejo."            │
│  Scroll indicator (arrow + "Descobrir")                   │
└──────────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────────┐
│  [S2] EDITORIAL ANCHOR                                    │
│  Property name (serif, large)                             │
│  2–3 sentences of prose positioning                       │
│  Email · Phone (small, subtle)                            │
│  CTA: "Sobre a casa" (text link)                          │
└──────────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────────┐
│  [S3] A CASA — Editorial Split Section                    │
│  Eyebrow: "A Casa"                                        │
│  Image LEFT · Text RIGHT                                  │
│  Heading: "Arquitectura de monte, revisitada."            │
│  2 prose paragraphs about the property architecture       │
│  CTA: "Conhecer a casa"                                   │
└──────────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────────┐
│  [S4] QUARTOS — Room Grid                                 │
│  Eyebrow: "Quartos"                                       │
│  Heading: "Seis quartos. Cada um, o seu."                 │
│  Sub-line: "Cada quarto tem a sua luz e a sua vista."     │
│  2-column grid → 3 cards each row (RoomCard components)   │
│  CTA: "Ver todos os quartos"                              │
└──────────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────────┐
│  [S5] FULL-BLEED LANDSCAPE BREAK                          │
│  100vw · Landscape/aerial photography                     │
│  Optional caption: "Costa Vicentina, 18km."              │
│  No text, no CTA. Just the landscape.                     │
└──────────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────────┐
│  [S6] O TERRITÓRIO — Editorial Split Section              │
│  Eyebrow: "O Território"                                  │
│  Image RIGHT · Text LEFT                                  │
│  Heading: "Entre o Alentejo e o Atlântico."               │
│  Prose: Rota Vicentina, Zambujeira, São Teotónio          │
│  CTA: "Explorar as redondezas"                            │
└──────────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────────┐
│  [S7] ATIVIDADES — Activity Highlights                    │
│  Eyebrow: "Atividades"                                    │
│  Heading: "Aqui não há agenda. A não ser a sua."          │
│  3-column editorial cards (icon + title + distance)       │
│  Hiking · Praia · Birdwatching · Ciclismo · Gastronomia  │
│  CTA: "Ver todas as atividades"                           │
└──────────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────────┐
│  [S8] BOOKING SECTION                                     │
│  Eyebrow: "Reservas"                                      │
│  Heading: "Marque a sua estadia."                         │
│  SimpleBooking widget embed                               │
│  Alternative: WhatsApp + email contact as fallback        │
└──────────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────────┐
│  [S9] GALERIA PREVIEW                                     │
│  Eyebrow: "Galeria"                                       │
│  Masonry 3-image preview (asymmetric grid)                │
│  CTA: "Ver galeria completa"                              │
└──────────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────────┐
│  [FOOTER]                                                 │
│  (Already implemented in shared library)                  │
└──────────────────────────────────────────────────────────┘
```

---

## 5. Proposed Copy (Portuguese, Editorial Register)

### S1 — Hero
```
Uma casa no interior do Alentejo.
```
*(Single line. Nothing more.)*

### S2 — Editorial Anchor
```
Monte da Estrada

Seis quartos, uma casa, um monte.
A 18 quilómetros do Atlântico e a anos-luz do ruído.

reservas@montedaestrada.com · +351 XXX XXX XXX
```

### S3 — A Casa
```
Arquitectura de monte, revisitada.

A casa existia antes de ser hotel. Os muros de cal
e o pavimento antigo mantêm-se — não por falta de
alternativa, mas por escolha.

Não tentamos impressionar. Tentamos que fique.
```

### S4 — Quartos
```
Seis quartos. Cada um, o seu.

Não há dois iguais. A luz da manhã entra diferente
em cada divisão. Escolha pelo que quer acordar a ver.
```

### S6 — O Território
```
Entre o Alentejo e o Atlântico.

A Rota Vicentina passa a minutos. Zambujeira do Mar
fica a 18 quilómetros. O Alentejo interior está à porta.

Isto não é isolamento. É uma posição.
```

### S7 — Atividades
```
Aqui não há agenda. A não ser a sua.
```

### S8 — Reservas
```
Marque a sua estadia.
```

---

## 6. Shared Library Components — What to Build

These components should live in `packages/touril-ecosystem-ui-components/` because they will be reused by Papa-Léguas with minimal configuration changes.

| Component | Path | Props | Description |
|-----------|------|-------|-------------|
| `ImmersiveHero` | `components/ImmersiveHero/` | `imageSrc`, `headline`, `scrollLabel`, `ctaHref`, `photographerCredit` | Full-viewport hero with scroll indicator and fade-up animation |
| `EditorialAnchor` | `components/EditorialAnchor/` | `propertyName`, `tagline`, `body`, `email`, `phone`, `ctaLabel`, `ctaHref` | Mission statement section — centered, serif heading, prose body |
| `EditorialSplitSection` | `components/EditorialSplitSection/` | `eyebrow`, `heading`, `body`, `imageSrc`, `imagePosition ('left'\|'right')`, `ctaLabel`, `ctaHref`, `photographerCredit` | Core reusable section: image + text split at 50/50 |
| `FullBleedImage` | `components/FullBleedImage/` | `imageSrc`, `alt`, `caption`, `photographerCredit` | Full-width photography break with optional caption |
| `RoomGrid` | `components/RoomGrid/` | `eyebrow`, `heading`, `subHeading`, `rooms[]`, `ctaLabel`, `ctaHref` | Grid wrapper for `RoomCard` components (already built) |
| `ActivityHighlights` | `components/ActivityHighlights/` | `eyebrow`, `heading`, `items[]`, `ctaLabel`, `ctaHref` | 3-column editorial activity cards with icon, title, distance |
| `BookingSection` | `components/BookingSection/` | `eyebrow`, `heading`, `propertyId`, `fallbackEmail`, `fallbackPhone` | SimpleBooking widget wrapper + contact fallback |
| `GalleryPreview` | `components/GalleryPreview/` | `eyebrow`, `images[]`, `ctaLabel`, `ctaHref` | Asymmetric 3-image masonry preview |
| `SectionEyebrow` | `components/SectionEyebrow/` | `label`, `align ('left'\|'center')` | Reusable small-caps eyebrow label (used inside all sections) |

### Components Already in Library (need restyle only)
- `RoomCard` — exists, needs: 0px radius, new palette ✅ Phase 1 done
- `HeaderModern` — exists ✅ Phase 0 done
- `Footer` — exists ✅ Phase 0 done
- `Button` — exists ✅ Phase 0 done
- `CollectionSwitcher` — exists ✅ Phase 0 done

---

## 7. Animation Notes (Framer Motion)

Using the motion constants already defined in `src/constants/motion.js`:

| Section | Animation | Variant |
|---------|-----------|---------|
| Hero headline | Fade up on load, 600ms | `fadeUp` |
| Hero image | Subtle parallax on scroll (y: 0–30px) | Custom |
| EditorialAnchor | Fade up as it enters viewport | `fadeUp` + `staggerContainer` |
| EditorialSplitSection | Image: fade in · Text: fade up (staggered 150ms) | `fadeIn` + `fadeUp` |
| RoomCard grid | Staggered fade-up (each card 80ms delay) | `staggerContainer` + `fadeUp` |
| FullBleedImage | Fade in on scroll entry | `fadeIn` |
| ActivityHighlights | Staggered fade-up per card | `staggerContainer` |
| BookingSection | Simple fade-in | `fadeIn` |
| GalleryPreview | Staggered scale-in | `scaleIn` |

All animations respect `prefers-reduced-motion` via the `useReducedMotion()` hook.

---

## 8. File Structure for Implementation

```
apps/monte-da-estrada/src/
├── pages/
│   └── HomePage/
│       ├── HomePage.jsx          ← Page component (orchestrates sections)
│       ├── HomePage.module.scss  ← Page-level spacing overrides only
│       └── index.js
│
packages/touril-ecosystem-ui-components/src/
├── components/
│   ├── ImmersiveHero/
│   │   ├── ImmersiveHero.jsx
│   │   ├── ImmersiveHero.module.scss
│   │   └── index.js
│   ├── EditorialAnchor/
│   │   ├── EditorialAnchor.jsx
│   │   ├── EditorialAnchor.module.scss
│   │   └── index.js
│   ├── EditorialSplitSection/
│   │   ├── EditorialSplitSection.jsx
│   │   ├── EditorialSplitSection.module.scss
│   │   └── index.js
│   ├── FullBleedImage/
│   │   ├── FullBleedImage.jsx
│   │   ├── FullBleedImage.module.scss
│   │   └── index.js
│   ├── RoomGrid/
│   │   ├── RoomGrid.jsx
│   │   ├── RoomGrid.module.scss
│   │   └── index.js
│   ├── ActivityHighlights/
│   │   ├── ActivityHighlights.jsx
│   │   ├── ActivityHighlights.module.scss
│   │   └── index.js
│   ├── BookingSection/
│   │   ├── BookingSection.jsx
│   │   ├── BookingSection.module.scss
│   │   └── index.js
│   └── GalleryPreview/
│       ├── GalleryPreview.jsx
│       ├── GalleryPreview.module.scss
│       └── index.js
```

---

## 9. Implementation Priority

| Priority | Component | Depends on |
|----------|-----------|------------|
| P0 | `ImmersiveHero` | — |
| P0 | `EditorialAnchor` | `SectionEyebrow` |
| P0 | `EditorialSplitSection` | `SectionEyebrow`, `Button` |
| P0 | `RoomGrid` | `RoomCard` (existing) |
| P1 | `FullBleedImage` | — |
| P1 | `ActivityHighlights` | `SectionEyebrow` |
| P1 | `BookingSection` | SimpleBooking property ID |
| P2 | `GalleryPreview` | Image assets |

**Recommended build order:** ImmersiveHero → EditorialAnchor → EditorialSplitSection → RoomGrid → FullBleedImage → ActivityHighlights → BookingSection → GalleryPreview → wire up in HomePage.jsx

---

*Document prepared post-audit of: barrocal.pt, memmohotels.com/alfama, casadesaolourenco.pt*
*Next step: Implement shared library components, then assemble EstradaHomePage.jsx*
