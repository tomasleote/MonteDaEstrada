# Phase 2 Execution Prompt: CMS Data Modeling & Image Integration
## Monte da Estrada - Touril Luxury Aesthetic Implementation

**Document ID:** PHASE-2-EXEC-2026-02-15
**Status:** Ready for Execution
**Target Executor:** Claude Code / AI Development Agent
**Execution Timeline:** 5-7 working days
**Complexity Level:** Medium-High (Strategic CMS work + Image mapping)

---

## EXECUTIVE BRIEF

You are tasked with executing Phase 2 of the Touril luxury aesthetic integration for the Monte da Estrada website project. Phase 1 (COMPLETED) provided:

- **design-system.md**: Complete Touril design language specifications
- **design-tokens-mapping.md**: SCSS token migration strategy with implementation details

**Phase 2 Deliverables** (THIS TASK):
1. **cms-audit-report.md** - Complete analysis of Decap CMS configuration, gaps, and optimization opportunities
2. **image-mapping-table.md** - Strategic placement of all 97 scraped images across pages and components
3. **Updated config.yml** - New/modified image field configurations in Decap CMS
4. **migration-checklist.md** - Step-by-step data population plan with success criteria

**Success Criteria:**
- 100% of 97 images strategically mapped to specific pages/components
- CMS schema optimized for image management and bulk operations
- Clear, executable migration path with no orphaned images
- All deliverables follow existing project documentation standards
- Ready for Phase 3 (component styling updates) handoff

---

## CRITICAL CONTEXT FROM PHASE 1

### Design System Key Findings
From `design-system.md`, the Touril aesthetic includes:

**Typography:**
- Font: Open Sans (light weight 300 for headings, 400 for body)
- Letter-spacing: **1px across ALL text** (critical detail)
- H1: 32px, weight 300, line-height 1.4
- H2: 28px, weight 300, line-height 1.4
- Body: 14px, weight 400, line-height 1.71
- H3-H6: Not used (only two-level hierarchy)

**Colors:**
- Primary accent: #FBAB18 (warm gold)
- Background: #F8F8F8 (warm off-white)
- Text: #0A0203 (almost black)
- Footer: #0A0203 dark with #FFFFFF text

**Visual Style:**
- Border radius: 0px (sharp, architectural lines)
- Shadows: None (flat, minimal elevation)
- Spacing: 50px section padding (top/bottom), 25px margins
- Images: Full-width, object-fit cover, no borders, sharp corners

### Image Inventory (97 Total)
From `image-scrape-manifest.json`:

| Category | Count | Purpose | Context |
|----------|-------|---------|---------|
| home | 13 | Homepage hero + property views | Traditional Alentejo rural property |
| quartos | 19 | Rooms + common areas | 8 rooms + shared spaces |
| exterior | 9 | Amenities | Pool, garden, BBQ areas |
| redondezas | 35 | Regional destinations | Beaches, towns, landmarks |
| atividades | 9 | Activities + festivities | Garden, cycling, local events |
| galeria | 3 | Page heroes | Info, access, pricing pages |
| logos | 4 | Branding assets | ADL, LEADER EU, Monte branding |
| **TOTAL** | **97** | | Ready for strategic placement |

### Current Project Structure
- React website with 6 main pages: HomePage, QuartosPage, GaleriaPage, AtividadesPage, RedondezasPage, LocalizacaoPage
- Using Decap CMS for content management
- SCSS modules with design tokens system
- Mobile-first responsive architecture
- Components organized by feature with dedicated .module.scss files

---

## PART 1: CMS AUDIT (DELIVERABLE 1)

### Objective
Analyze the current Decap CMS configuration (`public/admin/config.yml`) to understand data structure, identify gaps, and plan optimization for image integration.

### Scope
Audit these specific areas:

#### 1.1 Collections Inventory
For each collection in `config.yml`, document:

1. **Collection Metadata**
   - Name and slug
   - File path (format: folder structure)
   - Markdown file format
   - Field count
   - Current status (active/incomplete)

2. **Field Structure**
   - Field name, type (string, text, image, select, etc.)
   - Required vs optional status
   - Default values
   - Widget configuration (if custom)
   - Relationship to other fields

3. **Image Field Analysis**
   - Field name and type
   - Image folder path configuration
   - Allowed file extensions
   - Naming conventions
   - Alt text/caption field configuration
   - Current image count per field

4. **Content Population Status**
   - Existing records count
   - Fields with content vs empty
   - Incomplete sections
   - Orphaned images or broken references

#### 1.2 Specific Collections to Audit

**Required Analysis:**

1. **Pages Collection** (if exists)
   - HomePage, QuartosPage, GaleriaPage, AtividadesPage, RedondezasPage, LocalizacaoPage
   - Hero image fields
   - Body content structure
   - Gallery/image array fields

2. **Rooms/Quartos Collection**
   - Room name and description
   - Room images field (count: should support multiple)
   - Amenities list
   - Pricing information

3. **Activities/Atividades Collection**
   - Activity title and description
   - Activity images
   - Related festivals/events

4. **Destinations/Redondezas Collection**
   - Destination name and description
   - Multiple images per destination
   - Location information
   - Points of interest

5. **Gallery/Media Collection**
   - Image metadata structure
   - Category/tag system
   - Alt text fields
   - Usage location field (which page)

6. **Settings Collection**
   - Site-wide branding (logo, favicon)
   - Global images (headers, footers)
   - Social media configuration

#### 1.3 Content Gap Analysis

Identify:
- Pages with missing hero images
- Collections with no data populated
- Image fields that are empty or uninitialized
- Missing alt text fields in CMS schema
- Collections that need new image fields
- Inconsistent image naming patterns

#### 1.4 Current CMS Limitations & Opportunities

Document:
- Image upload folder structure
- Batch operation capabilities
- Media library organization
- Filtering/search limitations
- Bulk edit possibilities
- Image optimization settings

### Deliverable Format: cms-audit-report.md

**Location:** `/c/Users/leotm/Desktop/Projetos/Programming/MonteDaEstrada/cms-audit-report.md`

**Structure:**

```markdown
# CMS Audit Report - Decap CMS Configuration Analysis

**Date:** [Today]
**Project:** Monte da Estrada
**Scope:** Current CMS schema, image fields, content gaps, optimization opportunities
**Status:** Complete audit of public/admin/config.yml

---

## 1. Collections Overview

### Summary Table
| Collection | Fields | Image Fields | Records | Status |
|-----------|--------|--------------|---------|--------|
| [name] | [count] | [count] | [count] | active/inactive |

### Detailed Collection Catalog

#### 1.1 Pages Collection
- **Path:** [markdown location]
- **Total Fields:** [X]
- **Image Fields:** [list with names and types]
  - Hero image: [field name, type, folder path]
  - Body images: [field name, type, array support?]
- **Current Records:** [count]
- **Content Status:** [% complete, gaps]
- **Special Configuration:** [custom widgets, relationships, etc.]

[Repeat for each collection]

---

## 2. Image Field Deep Dive

### Current Image Field Summary
| Collection | Field Name | Type | Folder Path | Current Count |
|-----------|-----------|------|-------------|---------------|
| [collection] | [field] | image/array | [path] | [X] |

### Media Folder Structure
```
public/
├── content/
│   ├── pages/
│   ├── quartos/
│   └── ...
└── admin/
    └── config.yml
```

**Current Image Organization:** [Describe how images are organized]

**Issues Identified:**
- [Issue 1 with impact and severity]
- [Issue 2]
- [Issue 3]

---

## 3. Content Gap Analysis

### Missing Hero Images
| Page | Status | Impact |
|------|--------|--------|
| HomePage | [missing/incomplete] | [High/Medium/Low] |
| [Other pages] | | |

### Empty Image Arrays
| Collection | Field | Records Affected | Priority |
|-----------|-------|------------------|----------|
| [collection] | [field] | [X records] | [High/Medium/Low] |

### Alt Text Gaps
- Current alt text coverage: [X%]
- Missing alt text fields in schema: [list]
- Recommendation: [specific actions]

### Collection-Specific Gaps
[Document gaps per collection with recommendations]

---

## 4. Schema Optimization Opportunities

### Recommended Field Additions
1. **Alt Text Fields** (if not present)
   - Add to every image field for accessibility

2. **Image Caption Fields**
   - For gallery/detailed image display

3. **Image Priority/Featured Flag**
   - For hero image selection from multiple options

4. **Image Category Tag**
   - For organizational and filtering purposes

5. **Image Metadata**
   - Photographer/credit information
   - Usage rights/licensing
   - Image date/season captured

### Recommended Collection Enhancements
[List specific collections that need new fields with justification]

---

## 5. CMS Capabilities Assessment

### Batch Operations Support
- Can bulk upload images: [yes/no]
- Can bulk edit metadata: [yes/no]
- Media library features: [list available]

### Image Optimization in CMS
- Automatic resizing: [yes/no/settings]
- Format optimization: [supported formats]
- CDN integration: [configured/not configured]

### Integration Points
- Frontend access to images: [describe]
- Image URL patterns: [/path/to/images/[name] or similar]
- Fallback image strategy: [described or missing]

---

## 6. Audit Findings & Recommendations

### Critical Issues (Block Phase 3)
1. [Issue that must be resolved]
2. [Issue that must be resolved]

### High Priority Issues (Should resolve before migration)
1. [Issue with impact]
2. [Issue with impact]

### Medium Priority Issues (Nice to have improvements)
1. [Improvement]
2. [Improvement]

### Low Priority Issues (Future consideration)
1. [Future enhancement]

---

## 7. Phase 2 Readiness Assessment

**CMS Schema Ready for Image Migration:** [Yes/No with conditions]

**Prerequisite Actions Required:**
- [ ] Action 1 - [Description and owner]
- [ ] Action 2
- [ ] Action 3

**Blockers Identified:** [None/List any blockers]

**Risk Assessment:**
- Risk of image upload failures: [Low/Medium/High]
- Risk of broken image links: [Low/Medium/High]
- Risk of missing metadata: [Low/Medium/High]

---

## 8. Appendix

### A. Full config.yml Structure
[Include sections relevant to image fields]

### B. Image Folder Structure (Current State)
```
[Actual directory structure]
```

### C. Sample Record Analysis
[Show structure of 1-2 sample records to demonstrate current state]

---

**Document End**
*Next: Image Mapping Table*
```

**Validation Checklist for Deliverable:**
- [ ] All collections in config.yml documented with structure
- [ ] Every image field identified and counted
- [ ] Content gaps clearly identified with impact assessment
- [ ] Recommendations are specific and actionable
- [ ] CMS limitations vs opportunities clearly stated
- [ ] Ready for Phase 3 component updates identified
- [ ] Document follows markdown formatting standards

---

## PART 2: IMAGE MAPPING TABLE (DELIVERABLE 2)

### Objective
Create a comprehensive strategic mapping of all 97 scraped images to specific pages, sections, and components. This becomes the blueprint for data population.

### Strategic Principles

**Principle 1: Purpose-First Placement**
- Each image should serve a specific purpose in the UX
- Hero images: Set tone, high-impact visual
- Content images: Support narrative, break text
- Gallery images: Showcase options, inspire action

**Principle 2: Responsive Optimization**
- Consider mobile, tablet, desktop display patterns
- Account for aspect ratio constraints per component
- Multiple images support variety (avoid repetition)

**Principle 3: Touril Aesthetic Alignment**
- Images should showcase luxury, simplicity, elegance
- Avoid cluttered sections
- Emphasize whitespace and breathing room
- Sharp corners (0px radius), no overlays unless subtle
- Natural lighting and property quality prioritized

**Principle 4: CMS Efficiency**
- Minimize orphaned images
- Reuse images across pages if contextually appropriate
- Tag images for bulk operations
- Organize by page/section for easy maintenance

### Mapping Structure

#### 2.1 HomePage Mapping

**Hero Section**
- Current requirement: 1-2 hero images (carousel optional)
- Available pool: home-hero-monte-exterior + select from home-property-view-0X
- Recommended images:
  - Primary hero: home-hero-monte-exterior (sets tone)
  - Carousel alt: home-property-view-01, home-property-view-02, home-property-view-03
- CMS field: heroImages (array type, alt text required)
- Display pattern: Full-width, 1:1 or 16:9 aspect ratio
- Purpose: First impression, property overview

**Welcome Section**
- Current requirement: 1 supporting image (below text)
- Available pool: home-property-view-04 through home-property-view-12
- Recommended images: home-property-view-05 (most inviting)
- CMS field: welcomeImage
- Display pattern: Full-width, 4:3 aspect ratio
- Purpose: Reinforce luxury feel

**About/Features Section**
- Current requirement: 3-4 supporting images (grid layout)
- Available pool: home-property-view-06, 07, 08, 09, 10, 11, 12
- Recommended selection:
  - Outdoor/garden: home-property-view-06, 07
  - Interior/common areas: home-property-view-10, 11
  - Detail shot: home-property-view-12
- CMS field: featureImages (array type)
- Display pattern: 3 columns desktop, 2 tablet, 1 mobile
- Purpose: Showcase amenities and spaces

**Booking CTA Section**
- Current requirement: 1 accent/supporting image (beside CTA button)
- Available pool: home-property-view-04, 08, 09
- Recommended image: home-property-view-04 (elegant interior)
- CMS field: ctaImage
- Display pattern: 50/50 split with text, 1:1 aspect ratio
- Purpose: Psychological push to booking

#### 2.2 QuartosPage Mapping

**Hero Section**
- Current requirement: 1 hero image
- Available image: quartos-hero-rooms-overview
- CMS field: heroImage
- Display pattern: Full-width, 16:9 aspect ratio
- Purpose: Set room category tone

**Room Detail Cards** (8 rooms, multiple images each)
- Layout: Grid of room cards (2-3 columns responsive)
- Per card structure:
  ```
  Room Name (H2)
  Hero Image: 1 primary room image
  Amenities List
  Image Gallery: 3-4 additional room images
  Booking Link
  ```

- Image Allocation:
  | Room # | Hero Image | Gallery Images (3-4) | Total |
  |--------|-----------|----------------------|-------|
  | Room 1 | quartos-room-01 | quartos-room-02, -03, -04 | 4 |
  | Room 2 | quartos-room-05 | quartos-room-06, -07, -08 | 4 |
  | Room 3 | quartos-room-09 | quartos-room-10, -11 | 3 |
  | Room 4 | quartos-room-12 | quartos-room-13, -14 | 3 |
  | Common | quartos-common-01 | quartos-common-02, -03, -04 | 4 |

- CMS field structure:
  ```
  Collection: Quartos
  Fields:
    - roomName (string)
    - roomDescription (text)
    - heroImage (image)
    - galleryImages (array of images)
    - amenities (text with markdown)
    - isAvailable (boolean)
    - pricePerNight (number)
  ```

- Display pattern: Hero image 100% width, gallery 3-column grid
- Purpose: Entice bookings, showcase room quality

#### 2.3 GaleriaPage Mapping

**Purpose:** Showcase property across multiple galleries/moments

**Hero Section**
- Current requirement: 1 hero image
- Available image: galeria-hero-informacoes (or similar)
- CMS field: heroImage
- Purpose: Page introduction

**Gallery Sections** (Multiple themed galleries)

Option A: Single large photo gallery (Recommended for Touril aesthetic)
```
Gallery Grid: 6-12 high-quality property images
Selected from:
- Home property views: home-property-view-01 through -12
- Room detail shots: quartos-room-01, -05, -09, -12 (hero shots)
- Exterior: All 9 exterior amenity images
- Common areas: quartos-common-area-01 through -04
```

Option B: Themed sub-galleries
```
1. "The Property" - 12 images
   - home-property-view-01 through -12

2. "Our Rooms" - 4 hero room images + 4 detail shots
   - quartos-room-01, -05, -09, -12 (heroes)
   - Plus 4 additional from gallery pool

3. "Amenities & Spaces" - 9 exterior images
   - All exterior-amenity-01 through -09

4. "Moments" - 6-8 lifestyle/seasonal images
   - Mix of property, activities, regional views
```

**Recommended Approach:** Option A for Touril minimalism (single, powerful gallery)

CMS structure:
```
Collection: Gallery
Fields:
  - title (string)
  - description (text)
  - heroImage (image)
  - galleryImages (array of images, required)
  - category (select: property/rooms/amenities/all)
  - featured (boolean)
  - displayOrder (number)
```

Display pattern: Masonry or grid layout, 3-4 columns responsive

#### 2.4 AtividadesPage Mapping

**Hero Section**
- Images: atividades-hero-activities OR atividades-hero-festivities
- Display: Full-width hero
- Purpose: Set activity tone

**Activity Cards** (2-3 main activities)

Option A: Pre-defined activities with images
```
1. Garden & Outdoor Activities
   - Hero: exterior-amenity-01 (garden/outdoor)
   - Supporting: exterior-amenity-02, -03
   - Count: 3-4 images

2. Cycling & Exploration
   - Hero: exterior-amenity-06 (bicycles)
   - Supporting: redondezas-*(beach/scenic views)
   - Count: 3-4 images

3. Local Festivities & Events
   - Hero: atividades-hero-festivities
   - Gallery: All atividades-festival-* and atividades-festa-*
   - Count: 9 images (all available)
```

Option B: Modular activity blocks (More flexible)
```
Each activity block contains:
- Activity name (string)
- Description (text)
- Hero image (image)
- Related images (array, 2-4 images)
- Link/CTA (button to booking)
```

**Recommended Approach:** Option A for clarity (3 defined activities with purpose-driven images)

CMS structure:
```
Collection: Activities
Fields:
  - activityName (string)
  - description (text)
  - heroImage (image)
  - relatedImages (array of 2-4 images)
  - category (select: outdoor/festivities/cycling/dining)
  - season (select: year-round/seasonal)
  - featured (boolean)
```

#### 2.5 RedondezasPage Mapping

**Purpose:** Showcase regional destinations

**Hero Section**
- Image: redondezas-hero-region
- Display: Full-width
- Purpose: Set regional tone

**Destination Cards** (8-12 destinations)

Image allocation:
```
Destination | Primary Image | Secondary Images | Total |
Zambujeira do Mar | redondezas-zambujeira-night | redondezas-zambujeira-beach, -sea, -rocks, -square | 5 |
São Teotónio | redondezas-sao-teotonio-01 | redondezas-sao-teotonio-02, -entrada-da-barca | 3 |
Almograve | redondezas-almograve-beach | [single image] | 1 |
Cabo Sardão | redondezas-cabo-sardao-cliffs | redondezas-cabo-sardao-lighthouse | 2 |
Carvalhal | redondezas-carvalhal-beach | [single image] | 1 |
Odemira | redondezas-odemira-01 | redondezas-odemira-02, -03, -parque-aguas-odemira | 4 |
Milfontes | redondezas-milfontes-01 | redondezas-milfontes-02, -parque-aguas-01, -02 | 4 |
Porto Covo | redondezas-porto-covo-01 | redondezas-porto-covo-02, -03 | 3 |
Sines | redondezas-sines-01 | redondezas-sines-02, -ilha-pessegueiro | 3 |
Odeceixe | redondezas-odeceixe-01 | redondezas-odeceixe-02, -03 | 3 |
Aljezur | redondezas-aljezur-01 | redondezas-aljezur-02, -03 | 3 |
Arrifana | redondezas-arrifana-beach | [single image] | 1 |
```

CMS structure:
```
Collection: Destinations
Fields:
  - destinationName (string, required)
  - description (text)
  - primaryImage (image, required)
  - secondaryImages (array of 1-4 images)
  - distance (string: e.g., "15 km north")
  - highlights (array of strings)
  - coordinates (string: for future map integration)
  - featured (boolean)
  - displayOrder (number)
```

Display pattern: Card grid, 2-3 columns responsive, with image carousel per card

#### 2.6 LocalizacaoPage Mapping

**Purpose:** Show location and access information

**Hero Section**
- Image: galeria-hero-acessos (access/location themed)
- Display: Full-width
- Purpose: Set page tone

**Location Information Section**
- Map display (interactive map component)
- No images required for map itself, but supporting context images helpful

**Supporting Context Images**
```
Purpose: Show surrounding area, nearby attractions, access points
- Select 2-3 images from redondezas pool
- Recommended: Regional overview, nearby beaches, main towns
- Display: Image gallery or split-screen with text
```

CMS structure:
```
Collection: Location
Fields:
  - heroImage (image)
  - mapCenter (coordinates)
  - mapZoom (number)
  - contextImages (array of 2-3 images)
  - address (text)
  - accessDirections (text with markdown)
  - nearbyAttractions (array of objects: name, distance, description)
```

#### 2.7 Footer/Global Mapping

**Logo & Branding**
```
Images to use:
- logo-monte-estrada-text: Site header/footer logo
- logo-adl-partner: Partner badge (footer)
- logo-leader-eu-funding-banner: EU funding banner (footer)
- logo-turismo-rural-badge: Rural tourism certification (footer)
```

CMS structure:
```
Collection: SiteSettings
Fields:
  - siteLogo (image)
  - partnerLogos (array of logos)
  - footerImages (array)
```

---

### Deliverable Format: image-mapping-table.md

**Location:** `/c/Users/leotm/Desktop/Projetos/Programming/MonteDaEstrada/image-mapping-table.md`

**Structure:**

```markdown
# Image Mapping & Strategic Placement Table
## Monte da Estrada - 97 Image Integration Plan

**Date:** [Today]
**Project:** Monte da Estrada Touril Integration
**Phase:** Phase 2 - CMS Data Modeling
**Status:** Complete strategic placement of all 97 images

---

## Strategic Placement Overview

### Image Allocation by Page
| Page | Hero Images | Content Images | Gallery Images | Total |
|------|-----------|-----------------|-----------------|-------|
| HomePage | 1 | 4 | 0 | 5 |
| QuartosPage | 1 | 0 | 18 | 19 |
| GaleriaPage | 1 | 0 | 28 | 29 |
| AtividadesPage | 1 | 0 | 9 | 10 |
| RedondezasPage | 1 | 12 | 24 | 37 |
| LocalizacaoPage | 1 | 3 | 0 | 4 |
| GlobalFooter | 0 | 0 | 4 | 4 |
| Unused/Reserve | 0 | 0 | 0 | 0 |
| **TOTAL** | **6** | **19** | **72** | **97** |

---

## Detailed Placement by Page

### 1. HomePage

**Purpose:** Welcome, property overview, booking inspiration

**Section 1: Hero**
| Component | Image | Source | Aspect Ratio | Alt Text | CMS Field |
|-----------|-------|--------|--------------|----------|-----------|
| Hero Banner | home-hero-monte-exterior | home/img219902566.JPG | 16:9 | Monte da Estrada exterior | heroImage |

**Optional: Carousel Secondary Heroes** (if component supports)
- Image 2: home-property-view-01 | Alt: "Monte da Estrada property courtyard"
- Image 3: home-property-view-02 | Alt: "Monte da Estrada garden area"

**Section 2: Welcome/About**
| Component | Image | Purpose | Aspect Ratio | Display | CMS Field |
|-----------|-------|---------|--------------|---------|-----------|
| Welcome support image | home-property-view-05 | Accompany welcome text, show elegance | 4:3 | Right of text block | welcomeImage |

**Section 3: Features Grid** (Luxe amenities showcase)
| Position | Image | Subject | Aspect Ratio | Grid Layout | CMS Field |
|----------|-------|---------|--------------|-------------|-----------|
| Feature 1 | home-property-view-06 | Exterior/grounds | 1:1 | 3-col desktop, 2-col tablet | featureImages[0] |
| Feature 2 | home-property-view-10 | Interior common area | 1:1 | 3-col desktop, 2-col tablet | featureImages[1] |
| Feature 3 | home-property-view-12 | Detail/luxury | 1:1 | 3-col desktop, 2-col tablet | featureImages[2] |

**Section 4: Booking CTA**
| Component | Image | Purpose | Aspect Ratio | Display | CMS Field |
|-----------|-------|---------|--------------|---------|-----------|
| CTA companion | home-property-view-04 | Entice booking action, show room comfort | 1:1 | 50% width beside CTA button | ctaImage |

**Unused from home category:** home-property-view-03, -07, -08, -09, -11
**Status:** 5 of 13 home images used on homepage. Remaining reserved for gallery.

---

### 2. QuartosPage

**Purpose:** Room showcase and booking

**Section 1: Hero**
| Component | Image | Purpose | Aspect Ratio | CMS Field |
|-----------|-------|---------|--------------|-----------|
| Page hero | quartos-hero-rooms-overview | Set rooms tone | 16:9 | heroImage |

**Section 2-5: Room Cards** (4 room types displayed, 2 images per room in 8-room property)

**Room 1: [Room Name/Flower]**
| Component | Image | Position | Alt Text | CMS Path |
|-----------|-------|----------|----------|-----------|
| Card hero | quartos-room-01 | Top of card, full-width | "[Room Name] main view" | rooms[0].heroImage |
| Gallery 1 | quartos-room-02 | Gallery slide 1 | "[Room Name] detail view" | rooms[0].galleryImages[0] |
| Gallery 2 | quartos-room-03 | Gallery slide 2 | "[Room Name] amenities" | rooms[0].galleryImages[1] |
| Gallery 3 | quartos-room-04 | Gallery slide 3 | "[Room Name] detail" | rooms[0].galleryImages[2] |

[Repeat for rooms 2-4 with images as per inventory allocation in section 2.2]

**Section 6: Common Areas Showcase**
| Component | Image | Location | Alt Text | CMS Field |
|-----------|-------|----------|----------|-----------|
| Common hero | quartos-common-area-01 | Top of section | "Common area fireplace" | commonAreasHero |
| Common 1 | quartos-common-area-02 | Grid position 1 | "Lounge area" | commonAreasGallery[0] |
| Common 2 | quartos-common-area-03 | Grid position 2 | "Dining area" | commonAreasGallery[1] |
| Common 3 | quartos-common-area-04 | Grid position 3 | "Kitchen area" | commonAreasGallery[2] |

**Room Image Distribution:** All 19 quartos images used (100% allocation)

---

### 3. GaleriaPage

**Purpose:** Comprehensive visual showcase of property, rooms, amenities

**Recommended Structure:** Single unified gallery with 28 curated images (Touril minimalist aesthetic)

**Section 1: Hero**
| Component | Image | Purpose | Aspect Ratio | CMS Field |
|-----------|-------|---------|--------------|-----------|
| Page hero | galeria-hero-informacoes | Page introduction | 16:9 | heroImage |

**Section 2: Main Gallery Grid** (28 images, 4 columns desktop, 2 mobile)

**Curated Selection:**

| Position | Image | Category | Visual Purpose | Alt Text |
|----------|-------|----------|-----------------|----------|
| 1-12 | home-property-view-01 through -12 | Property/Exterior | Show property beauty across seasons/angles | "Property view [angle/area]" |
| 13-16 | quartos-room-01, -05, -09, -12 | Room Showcase | Best room representations | "Guest room overview" |
| 17-22 | exterior-amenity-01 through -06 | Amenities | Pool, garden, BBQ, outdoor | "Amenity: [pool/garden/etc]" |
| 23-28 | Curated from exterior-amenity-07 through -09 and home-property-view-03, -07, -08 | Lifestyle/Detail | Show luxury details, moments | "Detail shot: [description]" |

**Display Configuration:**
- Layout: Responsive grid (4 col desktop, 3 tablet, 2 mobile)
- Aspect ratio: Mixed (accept variable heights for natural layout)
- Lightbox: Enable for full-size viewing
- Image optimizations: Lazy load, responsive srcset

**CMS Structure:**
```
Collection: Gallery
galleryImages: [array of 28 image objects]
  Each image:
  - image: [image reference]
  - alt: [descriptive alt text]
  - caption: [optional short caption]
  - category: [property/rooms/amenities/lifestyle]
```

**Total images allocated:** 28 (1 hero + 27 gallery)

---

### 4. AtividadesPage

**Purpose:** Showcase activities, festivities, local events

**Section 1: Hero**
| Component | Image | Purpose | Aspect Ratio | CMS Field |
|-----------|-------|---------|--------------|-----------|
| Page hero | atividades-hero-activities | Activities introduction | 16:9 | heroImage |

**Section 2: Activity Cards** (3 main activities)

**Activity 1: Garden & Outdoor Spaces**
| Component | Image | Purpose | Alt Text | CMS Field |
|-----------|-------|---------|----------|-----------|
| Hero | exterior-amenity-01 | Activity showcase | "Garden area" | activities[0].heroImage |
| Support 1 | exterior-amenity-02 | Additional context | "Outdoor seating" | activities[0].images[0] |
| Support 2 | exterior-amenity-03 | Additional context | "Outdoor activities" | activities[0].images[1] |

**Activity 2: Cycling & Exploration**
| Component | Image | Purpose | Alt Text | CMS Field |
|-----------|-------|---------|----------|-----------|
| Hero | exterior-amenity-06 | Bicycles/cycling | "Bicycles provided" | activities[1].heroImage |
| Support 1 | redondezas-zambujeira-beach | Regional destination | "Local beach destination" | activities[1].images[0] |
| Support 2 | redondezas-porto-covo-01 | Regional destination | "Coastal town" | activities[1].images[1] |

**Activity 3: Local Festivities & Events**
| Component | Image | Purpose | Alt Text | CMS Field |
|-----------|-------|---------|----------|-----------|
| Hero | atividades-hero-festivities | Festivities intro | "Local celebrations" | activities[2].heroImage |
| Gallery 1-7 | All atividades-festival-* and atividades-festa-mastros | Event showcase | "Festival/event: [name]" | activities[2].images[0-7] |

**Total images allocated:** 10 (1 hero + 9 activity-related)

---

### 5. RedondezasPage

**Purpose:** Regional destination showcase and exploration

**Section 1: Hero**
| Component | Image | Purpose | Aspect Ratio | CMS Field |
|-----------|-------|---------|--------------|-----------|
| Page hero | redondezas-hero-region | Region introduction | 16:9 | heroImage |

**Section 2: Destination Cards** (12 destinations with images)

**Destination: Zambujeira do Mar** (5 images)
| Component | Image | Position | Alt Text | CMS Path |
|-----------|-------|----------|----------|-----------|
| Card hero | redondezas-zambujeira-night | Top, 16:9 | "Zambujeira beach sunset" | destinations[0].primaryImage |
| Gallery 1 | redondezas-zambujeira-beach | Carousel/gallery | "Zambujeira sandy beach" | destinations[0].images[0] |
| Gallery 2 | redondezas-zambujeira-sea | Carousel/gallery | "Zambujeira sea view" | destinations[0].images[1] |
| Gallery 3 | redondezas-zambujeira-rocks | Carousel/gallery | "Zambujeira rock formations" | destinations[0].images[2] |
| Gallery 4 | redondezas-zambujeira-square | Carousel/gallery | "Zambujeira town square" | destinations[0].images[3] |

[Repeat for remaining 11 destinations per allocation table in section 2.5]

**Display Configuration:**
- Card layout: 2 columns desktop, 1 tablet/mobile
- Per-card image: Hero + 1-4 gallery images in carousel
- Image dimensions: Hero 16:9, gallery flexible

**Total images allocated:** 37 (1 hero + 36 destination-related)

---

### 6. LocalizacaoPage

**Purpose:** Location information, map, access details

**Section 1: Hero**
| Component | Image | Purpose | Aspect Ratio | CMS Field |
|-----------|-------|---------|--------------|-----------|
| Page hero | galeria-hero-acessos | Location/access intro | 16:9 | heroImage |

**Section 2: Map Area** (Interactive map - no images in map itself, but contextual images helpful)

**Section 3: Surrounding Area Context Images** (2-3 images)
| Component | Image | Purpose | Alt Text | CMS Field |
|-----------|-------|---------|----------|-----------|
| Context 1 | redondezas-odemira-01 | Nearby town | "Nearby Odemira town" | contextImages[0] |
| Context 2 | redondezas-milfontes-01 | Nearby town/coast | "Milfontes coastal town" | contextImages[1] |
| Context 3 | redondezas-sao-teotonio-01 | Regional attraction | "São Teotonio area" | contextImages[2] |

**Display:** Image gallery or split-screen layout below map

**Total images allocated:** 4 (1 hero + 3 contextual)

---

### 7. Global Elements

**Footer Logos & Branding**

| Component | Image | Purpose | Size | CMS Field |
|-----------|-------|---------|------|-----------|
| Site Logo | logo-monte-estrada-text | Header/footer branding | [specify dimensions] | siteLogo |
| Partner 1 | logo-adl-partner | Partner badge | [specify dimensions] | partnerLogos[0] |
| Partner 2 | logo-leader-eu-funding-banner | EU funding badge | [specify dimensions] | partnerLogos[1] |
| Partner 3 | logo-turismo-rural-badge | Certification badge | [specify dimensions] | partnerLogos[2] |

**Total images allocated:** 4 (all logos)

---

## Image Usage Summary

### By Category
| Source Category | Total Available | Total Allocated | % Utilization | Status |
|-----------------|-----------------|-----------------|---------------|--------|
| home | 13 | 5 | 38% | 8 images reserved for gallery |
| quartos | 19 | 19 | 100% | All used on QuartosPage |
| exterior | 9 | 6 | 67% | 3 images available for gallery |
| redondezas | 35 | 37 | 106% | **Overallocated - see note below** |
| atividades | 9 | 9 | 100% | All used on AtividadesPage |
| galeria | 3 | 2 | 67% | 1 image available for reuse |
| logos | 4 | 4 | 100% | All used globally |
| **TOTAL** | **97** | **97** | **100%** | Complete allocation |

**Note on Redondezas:** Some destination images appear multiple times in mapping (primary + gallery). This is intentional - primary image is featured on card hero, gallery images are additional carousel/grid images for that destination.

### By Page
| Page | Images | Purpose | Key Allocation |
|------|--------|---------|-----------------|
| HomePage | 5 | Welcome, inspire booking | Property showcase |
| QuartosPage | 19 | Room showcase | Individual room galleries |
| GaleriaPage | 28 | Comprehensive showcase | Property + rooms + amenities |
| AtividadesPage | 10 | Activity showcase | Local experiences |
| RedondezasPage | 37 | Regional exploration | Multiple destinations |
| LocalizacaoPage | 4 | Location context | Map + nearby areas |
| Global | 4 | Branding | Logos/badges |

---

## CMS Field Requirements

### Image Field Specifications

**Standard Image Field**
```yaml
- name: image_field_name
  label: "Display Label"
  widget: image
  required: true
  media_folder: /src/assets/images/[category]/
  public_folder: /images/[category]/
  allow_multiple: false
  formats: [jpg, jpeg, png, webp]
```

**Image Array Field** (for galleries)
```yaml
- name: gallery_field_name
  label: "Gallery Images"
  widget: list
  required: false
  fields:
    - name: image
      label: Image
      widget: image
      required: true
      media_folder: /src/assets/images/[category]/
      public_folder: /images/[category]/
    - name: alt
      label: Alt Text
      widget: string
      required: true
    - name: caption
      label: Caption (optional)
      widget: string
      required: false
```

**Destination Card Object** (for redondezas)
```yaml
- name: destinations
  label: Destinations
  widget: list
  fields:
    - name: destinationName
      label: Name
      widget: string
      required: true
    - name: primaryImage
      label: Hero Image
      widget: image
      required: true
    - name: images
      label: Additional Images
      widget: list
      fields:
        - name: image
          label: Image
          widget: image
          required: true
        - name: alt
          label: Alt Text
          widget: string
          required: true
    - name: highlights
      label: Highlights
      widget: list
      fields:
        - name: highlight
          label: Highlight
          widget: string
```

---

## Implementation Notes

### Image Optimization Strategy
1. **Format:** All JPG images, optimize for web (70-80% quality)
2. **Responsive sizes:** Provide 2x versions for retina displays
3. **Lazy loading:** Enable on gallery/secondary images
4. **Alt text:** Descriptive, 100-125 characters, no "image of" prefix

### Duplicate/Reuse Strategy
- **Intentional reuse:** Destination images appear in both "gallery" and "destination card" sections
- **Cross-page reuse:** Home property images may appear in gallery
- **No true orphaned images:** All 97 images have assigned purpose

### Progressive Enhancement
- Phase 2A: Implement mapping with primary/hero images
- Phase 2B: Add gallery/secondary images
- Phase 2C: Optimize and lazy-load all images

---

## Validation Checklist

- [ ] All 97 images assigned to specific page/component
- [ ] No images marked as "unused" or "reserve"
- [ ] Every image has descriptive alt text (required for accessibility)
- [ ] CMS field configuration specified for each section
- [ ] Aspect ratio considerations documented
- [ ] Mobile-first responsive display patterns defined
- [ ] Image optimization strategy documented
- [ ] Ready for config.yml update

---

**Document End**
*Next: Updated config.yml and migration checklist*
```

**Validation Checklist for Deliverable:**
- [ ] All 97 images strategically placed with purpose explained
- [ ] Clear CMS field paths for each image
- [ ] Alt text defined for accessibility
- [ ] Responsive display patterns documented (mobile, tablet, desktop)
- [ ] Image optimization approach defined
- [ ] Zero orphaned images (all 97 utilized)
- [ ] Feasible for Phase 3 component implementation
- [ ] Ready for frontend developer execution

---

## PART 3: UPDATED CONFIG.YML (DELIVERABLE 3)

### Objective
Modify the existing `public/admin/config.yml` to add/enhance image field configurations that support the 97-image integration while maintaining Decap CMS best practices.

### Scope of Changes

#### 3.1 Collections to Update
Based on image mapping:
- **pages** collection: Add/enhance hero image fields
- **quartos** collection: Add room image galleries
- **activities** collection: New or enhanced activity image fields
- **destinations** collection: Add multi-image destination cards
- **site_settings** collection: Add logos and global branding images

#### 3.2 New Fields to Add

**For Quartos Collection:**
```yaml
- name: galleryImages
  label: "Room Photos"
  widget: list
  allow_add: true
  allow_delete: true
  collapsed: false
  fields:
    - name: image
      label: Image
      widget: image
    - name: alt
      label: Alt Text
      widget: string
```

**For Destinations Collection:**
```yaml
- name: images
  label: "Destination Photos"
  widget: list
  allow_add: true
  collapsed: false
  fields:
    - name: image
      label: Image
      widget: image
    - name: alt
      label: Alt Text
      widget: string
    - name: caption
      label: Caption
      widget: string
      required: false
```

### Deliverable Format: Updated config.yml

**Location:** `/c/Users/leotm/Desktop/Projetos/Programming/MonteDaEstrada/public/admin/config.yml` (modified)

**Approach:**
1. Read existing config.yml
2. Identify collections relevant to image mapping
3. Add/enhance image field configurations
4. Maintain existing collection structure
5. Add comments explaining new fields
6. Test syntax validity

**Key sections to update:**

```yaml
# Example section - adjust based on actual config.yml structure

collections:
  # Pages collection
  - name: pages
    label: Pages
    folder: content/pages
    create: false
    fields:
      # ... existing fields ...
      - name: heroImage
        label: Hero Image
        widget: image
        required: true
        media_folder: /src/assets/images/pages
        public_folder: /images/pages
        allow_multiple: false
      - name: heroImageAlt
        label: Hero Image Alt Text
        widget: string
        required: true

  # Quartos collection
  - name: quartos
    label: Rooms
    folder: content/quartos
    create: true
    fields:
      # ... existing fields ...
      - name: heroImage
        label: Room Main Photo
        widget: image
        required: true
      - name: galleryImages
        label: Additional Room Photos
        widget: list
        fields:
          - name: image
            label: Image
            widget: image
            required: true
          - name: alt
            label: Description
            widget: string
            required: true

  # Destinations collection (New or Enhanced)
  - name: destinations
    label: Destinations
    folder: content/destinations
    create: true
    fields:
      - name: name
        label: Destination Name
        widget: string
        required: true
      - name: primaryImage
        label: Featured Image
        widget: image
        required: true
      - name: images
        label: Gallery Images
        widget: list
        fields:
          - name: image
            label: Image
            widget: image
            required: true
          - name: alt
            label: Alt Text
            widget: string
            required: true
```

**Validation:**
- [ ] All YAML syntax is valid
- [ ] New collections match image mapping structure
- [ ] Image folders configured correctly
- [ ] Required fields marked appropriately
- [ ] Alt text fields present for accessibility
- [ ] Media folder paths consistent

---

## PART 4: MIGRATION CHECKLIST (DELIVERABLE 4)

### Objective
Create executable, step-by-step data population plan with success criteria and rollback procedures.

### Deliverable Format: migration-checklist.md

**Location:** `/c/Users/leotm/Desktop/Projetos/Programming/MonteDaEstrada/migration-checklist.md`

**Structure:**

```markdown
# Image Migration Checklist & Data Population Plan
## Phase 2 Data Integration Roadmap

**Date:** [Today]
**Timeline:** 3-5 working days for data population
**Owner:** [Person responsible]
**Status:** Ready for Phase 3 transition

---

## Pre-Migration Validation

### CMS Configuration Ready
- [ ] config.yml updated with all new image fields
- [ ] Media folder structure created
- [ ] Image field validation rules set
- [ ] Alt text requirements enabled
- [ ] Decap CMS deployed and accessible
- [ ] User permissions configured for content editors

### Images Ready for Upload
- [ ] All 97 images verified present in inventory
- [ ] File names match image-mapping-table.md
- [ ] Images optimized for web (70-80% quality)
- [ ] Retina versions (2x) prepared if needed
- [ ] Image dimensions verified for expected aspect ratios
- [ ] No corrupted files (run integrity check)

### Documentation Ready
- [ ] image-mapping-table.md finalized with CMS paths
- [ ] Alt text catalog prepared (from deliverable 2)
- [ ] Content brief for each page prepared
- [ ] Team trained on data entry procedures

### Success Criteria Defined
- [ ] All 97 images successfully uploaded
- [ ] Zero orphaned/unused images
- [ ] 100% alt text coverage
- [ ] All image links functional in frontend
- [ ] Homepage renders correctly with images
- [ ] Gallery pages load without broken images
- [ ] Mobile responsive images display correctly
- [ ] No duplicate uploads (clean media library)

---

## Phase 1: Foundation Setup (Day 1)

### Step 1.1: Create Media Folder Structure
```bash
mkdir -p src/assets/images/{home,quartos,exterior,redondezas,atividades,galeria,logos}
mkdir -p public/images/{home,quartos,exterior,redondezas,atividades,galeria,logos}
```
- [ ] All directories created successfully
- [ ] Folder names match config.yml media_folder paths exactly
- [ ] Permissions set to allow uploads

### Step 1.2: Verify Image Inventory
- [ ] Count home category images: should be 13
- [ ] Count quartos category images: should be 19
- [ ] Count exterior category images: should be 9
- [ ] Count redondezas category images: should be 35
- [ ] Count atividades category images: should be 9
- [ ] Count galeria category images: should be 3
- [ ] Count logos category images: should be 4
- [ ] **Total verified: 97 images**

### Step 1.3: Verify Image Files
- [ ] No corrupted files (open random images visually)
- [ ] File names match manifest exactly
- [ ] No special characters causing path issues on Windows
- [ ] All images in JPG/PNG format (verify extensions)
- [ ] File sizes reasonable (not excessively large)
- [ ] Image dimensions appropriate for web display

### Step 1.4: Deploy Updated config.yml
- [ ] Backup current config.yml to `config.yml.backup-[date]`
- [ ] Deploy new config.yml with image field additions
- [ ] Verify Decap CMS reads new configuration
- [ ] Test opening a collection to confirm fields appear
- [ ] Verify image widget loads correctly
- [ ] Confirm media folder paths are accessible

**Completion Sign-Off:**
- [ ] All folders created
- [ ] All images inventory verified
- [ ] config.yml deployed and functional

---

## Phase 2: Data Population - HomePage (Day 1-2)

### Step 2.1: Upload Hero Image
- [ ] Open HomePage in Decap CMS
- [ ] Locate heroImage field
- [ ] Upload: home-hero-monte-exterior
- [ ] Enter alt text: "Monte da Estrada exterior view"
- [ ] Publish draft and verify image appears
- [ ] Save and move to next

**Success:** Hero image visible on homepage

### Step 2.2: Upload Welcome Section Image
- [ ] Open heroImage → welcomeImage field
- [ ] Upload: home-property-view-05
- [ ] Alt text: "Monte da Estrada welcome space"
- [ ] Verify in frontend

### Step 2.3: Upload Feature Grid Images
- [ ] Locate featureImages array field
- [ ] Add Image 1: home-property-view-06, alt: "Property exterior gardens"
- [ ] Add Image 2: home-property-view-10, alt: "Property interior common area"
- [ ] Add Image 3: home-property-view-12, alt: "Property luxury detail"
- [ ] Verify 3-column grid on desktop

### Step 2.4: Upload CTA Image
- [ ] Locate ctaImage field
- [ ] Upload: home-property-view-04
- [ ] Alt text: "Comfortable guest room inviting booking"
- [ ] Verify layout with CTA button

**Completion:** HomePage fully populated with 5 images
- [ ] All images visible and correctly positioned
- [ ] Alt text displaying in inspector (for testing)
- [ ] Responsive display verified on mobile/tablet

---

## Phase 3: Data Population - QuartosPage (Day 2)

### Step 3.1: Create Quarto Records

**For each of 4 room types:**

#### Room 1
- [ ] Create new Quarto record
- [ ] Enter room name (from existing content or sample: "Dalia Room")
- [ ] Add heroImage: quartos-room-01
- [ ] Add to galleryImages:
  - [ ] quartos-room-02, alt: "Quarto detail view 1"
  - [ ] quartos-room-03, alt: "Quarto amenities"
  - [ ] quartos-room-04, alt: "Quarto detail view 2"
- [ ] Publish and verify in frontend

**Repeat Steps for Rooms 2, 3, 4** (using images per mapping table)

### Step 3.2: Create Common Areas Section
- [ ] Create commonAreas record or section
- [ ] Hero image: quartos-common-area-01
- [ ] Gallery images 1-3:
  - [ ] quartos-common-area-02
  - [ ] quartos-common-area-03
  - [ ] quartos-common-area-04
- [ ] Verify in frontend with proper carousel/grid layout

**Completion:** QuartosPage fully populated
- [ ] 4 room cards with hero + 3-image galleries each (12 images)
- [ ] Common areas section with hero + 3 gallery images (4 images)
- [ ] Total: 19 images used, 0 unused from quartos category
- [ ] All rendering correctly on mobile/desktop

---

## Phase 4: Data Population - GaleriaPage (Day 3)

### Step 4.1: Upload Gallery Hero
- [ ] Locate GaleriaPage in CMS
- [ ] Upload heroImage: galeria-hero-informacoes
- [ ] Alt text: "Gallery introduction"

### Step 4.2: Populate Main Gallery
- [ ] Create galleryImages array with 28 images
- [ ] Images 1-12: home-property-view-01 through -12 with descriptive alt texts
- [ ] Images 13-16: quartos-room-01, -05, -09, -12 with alt texts
- [ ] Images 17-22: exterior-amenity-01 through -06 with alt texts
- [ ] Images 23-28: exterior-amenity-07, -09, + home-property-view-03, -07, -08, -11 with alt texts

- [ ] Verify masonry/grid layout displays correctly
- [ ] Test lightbox functionality (click image enlargement)
- [ ] Verify lazy loading on scroll
- [ ] Test responsive grid (4 cols desktop, 2 mobile)

**Completion:** GaleriaPage fully populated
- [ ] 28 gallery images uploaded
- [ ] All alt texts present and descriptive
- [ ] Gallery displays and is interactive
- [ ] Mobile responsive verified

---

## Phase 5: Data Population - AtividadesPage (Day 3)

### Step 5.1: Activity 1 - Garden & Outdoor
- [ ] Create activity record: "Garden & Outdoor Spaces"
- [ ] Hero: exterior-amenity-01
- [ ] Gallery images:
  - [ ] exterior-amenity-02
  - [ ] exterior-amenity-03
- [ ] Add description linking to amenities
- [ ] Publish and verify

### Step 5.2: Activity 2 - Cycling & Exploration
- [ ] Create activity record: "Cycling & Exploration"
- [ ] Hero: exterior-amenity-06
- [ ] Gallery images:
  - [ ] redondezas-zambujeira-beach
  - [ ] redondezas-porto-covo-01
- [ ] Add description with regional references
- [ ] Publish and verify

### Step 5.3: Activity 3 - Local Festivities
- [ ] Create activity record: "Local Festivities & Events"
- [ ] Hero: atividades-hero-festivities
- [ ] Gallery images (all 7 festival images):
  - [ ] atividades-faceco-fair-01, -02
  - [ ] atividades-festa-mastros-01, -02, -03
  - [ ] atividades-festival-sudoeste-01, -02
- [ ] Add descriptions of festivals (dates, significance)
- [ ] Publish and verify

**Completion:** AtividadesPage fully populated
- [ ] 3 activities with hero + supporting images
- [ ] All festival images included
- [ ] Total: 10 images used
- [ ] All rendering correctly with proper carousel

---

## Phase 6: Data Population - RedondezasPage (Day 4)

### Step 6.1: Create Destination Records

**Template for each destination:** (Repeat 12 times)

```
Name: [Destination Name]
Distance: [X km from property]
Primary Image: [main destination image]
Gallery Images:
  - [image 1, alt text]
  - [image 2, alt text]
  - [image 3, alt text] (if available)
Description: [Brief description of destination]
Highlights: [List of 3-4 key attractions]
```

#### Destination 1: Zambujeira do Mar
- [ ] Create record with name, distance
- [ ] Primary: redondezas-zambujeira-night
- [ ] Gallery:
  - [ ] redondezas-zambujeira-beach
  - [ ] redondezas-zambujeira-sea
  - [ ] redondezas-zambujeira-rocks
  - [ ] redondezas-zambujeira-square
- [ ] Publish and verify card displays correctly

**Repeat for destinations 2-12** (per mapping table section 2.5):
- [ ] São Teotonio (3 images)
- [ ] Almograve (1 image)
- [ ] Cabo Sardão (2 images)
- [ ] Carvalhal (1 image)
- [ ] Odemira (3 images)
- [ ] Milfontes (3 images)
- [ ] Porto Covo (3 images)
- [ ] Sines (2 images)
- [ ] Odeceixe (3 images)
- [ ] Aljezur (3 images)
- [ ] Arrifana (1 image)

### Step 6.2: Verify Total Image Usage
- [ ] Count: 35 destination primary images
- [ ] Count gallery images: 36 additional images
- [ ] **Total for page: 37 images used**
- [ ] Verify 0 images orphaned in redondezas category

### Step 6.3: Test Page Rendering
- [ ] Hero loads
- [ ] Destination cards display in grid (2 cols desktop, 1 mobile)
- [ ] Image carousels work per destination
- [ ] Responsive layout verified

**Completion:** RedondezasPage fully populated
- [ ] 12 destinations with complete image galleries
- [ ] 37 images total used
- [ ] All carousel and grid functionality working
- [ ] Mobile-responsive verified

---

## Phase 7: Data Population - LocalizacaoPage (Day 4)

### Step 7.1: Upload Page Hero
- [ ] Upload heroImage: galeria-hero-acessos
- [ ] Alt text: "Location and access information"

### Step 7.2: Map Setup (Existing component - verify)
- [ ] Confirm map component present
- [ ] Verify map API key configured
- [ ] Test map displays with center point on property

### Step 7.3: Context Images
- [ ] Upload contextImage1: redondezas-odemira-01, alt: "Nearby Odemira town"
- [ ] Upload contextImage2: redondezas-milfontes-01, alt: "Milfontes coastal area"
- [ ] Upload contextImage3: redondezas-sao-teotonio-01, alt: "São Teotonio region"

### Step 7.4: Verify Page
- [ ] Hero displays
- [ ] Map renders and is interactive
- [ ] Context images display in gallery section
- [ ] All information accessible on mobile

**Completion:** LocalizacaoPage fully populated
- [ ] 4 images used (1 hero + 3 context)
- [ ] Map functional
- [ ] Page renders correctly

---

## Phase 8: Global Assets Setup (Day 5)

### Step 8.1: Upload Logos
- [ ] Upload siteLogo: logo-monte-estrada-text
- [ ] Upload partnerLogo1: logo-adl-partner
- [ ] Upload partnerLogo2: logo-leader-eu-funding-banner
- [ ] Upload partnerLogo3: logo-turismo-rural-badge

### Step 8.2: Configure Footer
- [ ] Set site logo in header/footer configuration
- [ ] Set partner logos in footer
- [ ] Verify logos display correctly in header and footer
- [ ] Check responsive scaling on mobile

**Completion:** Global assets deployed
- [ ] 4 logos configured
- [ ] Header and footer branding correct
- [ ] All responsive

---

## Final Validation (Day 5)

### Completeness Check
- [ ] HomePage: 5 images loaded and rendering
- [ ] QuartosPage: 19 images loaded (4 rooms + common areas)
- [ ] GaleriaPage: 28 images in gallery
- [ ] AtividadesPage: 10 images (3 activities)
- [ ] RedondezasPage: 37 images (12 destinations)
- [ ] LocalizacaoPage: 4 images (hero + context)
- [ ] Global: 4 logos in header/footer
- [ ] **Grand Total: 97 images**

### Functionality Check
- [ ] All images load without 404 errors
- [ ] Image URLs resolve correctly
- [ ] Alt text present on all images (inspect in browser)
- [ ] Responsive images display correctly at different breakpoints
- [ ] Carousels/galleries animate smoothly
- [ ] Lightbox opens and cycles through images
- [ ] No console errors related to images

### Accessibility Check
- [ ] Alt text is descriptive (not "image123" style)
- [ ] Alt text doesn't repeat caption (when caption present)
- [ ] Image contrast meets WCAG AA standards
- [ ] Focus states visible on interactive image galleries
- [ ] Keyboard navigation works in galleries

### Performance Check
- [ ] Lighthouse performance score ≥ 85
- [ ] Images load with lazy loading (defer off-screen images)
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] No layout shift from image loading

### Content Review Check
- [ ] Images match content descriptions
- [ ] Image placement makes sense contextually
- [ ] No duplicate images on same page (unless intentional)
- [ ] No missing images (all 97 accounted for)
- [ ] Image quality consistent across pages

---

## Success Criteria Met
- [ ] All 97 images integrated successfully
- [ ] Zero broken image links
- [ ] 100% alt text coverage
- [ ] Pages render without errors
- [ ] Mobile-responsive verified
- [ ] Performance acceptable
- [ ] Accessibility compliant
- [ ] Ready for Phase 3 (component styling)

---

## Rollback Procedures

### If Critical Issue Discovered

**Immediate Actions:**
1. Do not make new changes to config.yml
2. Stop uploading images to CMS
3. Document the specific issue
4. Notify project lead

**Partial Rollback (Specific Page):**
```bash
# Remove images from problematic page
# Restore config.yml to previous version
git checkout public/admin/config.yml.backup-[date]

# Redeploy and test
```

**Full Rollback (All Pages):**
```bash
# Restore entire config.yml from backup
git checkout HEAD -- public/admin/config.yml

# Or revert commit
git revert [commit-hash]

# Delete all uploaded images
rm -rf src/assets/images/*
```

### If Image Quality Issue Discovered
- [ ] Replace problematic image file
- [ ] Update alt text if needed
- [ ] Refresh CMS media cache
- [ ] Verify on frontend

### If CMS Field Configuration Issue Discovered
- [ ] Update config.yml with corrected field definition
- [ ] Redeploy to Decap CMS
- [ ] Re-enter data (if needed)
- [ ] Verify frontend rendering

---

## Known Limitations & Workarounds

### Limitation 1: Image Ordering in Arrays
**Issue:** CMS may not preserve image order in galleries
**Workaround:** Use explicit `displayOrder` field in array items
```yaml
- name: galleryImages
  widget: list
  fields:
    - name: displayOrder
      label: Order
      widget: number
      default: 0
```

### Limitation 2: Image Size Optimization
**Issue:** Decap CMS doesn't auto-optimize images
**Workaround:** Pre-optimize images before upload (ImageMagick):
```bash
convert input.jpg -quality 80 -resize 2400x output.jpg
```

### Limitation 3: Bulk Upload
**Issue:** Decap CMS single-file upload only
**Workaround:** Write script to batch-upload images programmatically

### Limitation 4: Image Reuse Across Collections
**Issue:** Same image in multiple locations requires separate upload
**Workaround:** Document intentional duplicates and manage separately

---

## Post-Migration Tasks (Phase 3)

Once all images are populated and validated:

1. **Update Component Styling**
   - [ ] Apply Touril design tokens to image containers
   - [ ] Implement image aspect ratio controls
   - [ ] Add image border/shadow treatments (0px radius, no shadows per Touril)

2. **Optimize Image Delivery**
   - [ ] Set up Next.js Image component or similar
   - [ ] Configure responsive images (srcset)
   - [ ] Enable lazy loading for off-screen images
   - [ ] Test Lighthouse scores

3. **SEO Integration**
   - [ ] Add structured data (schema.org) for images
   - [ ] Update sitemaps to include image URLs
   - [ ] Configure image indexing in robots.txt

4. **Analytics Setup**
   - [ ] Track image views/interactions
   - [ ] Monitor broken image reports
   - [ ] Track image performance metrics

---

## Sign-Off

**Prepared by:** [Name/Role]
**Date:** [Date]
**Reviewed by:** [Name/Role]
**Approved for execution:** [Date]

**Migration Ownership:**
- Data Entry Lead: [Person]
- QA/Validation Lead: [Person]
- Frontend Integration Lead: [Person]

---

**Document End**
*Phase 2 Ready for Execution*
```

**Validation Checklist for Deliverable:**
- [ ] Step-by-step instructions clear and executable
- [ ] Success criteria defined for each phase
- [ ] All 97 images accounted for in steps
- [ ] Rollback procedures documented
- [ ] Timeline realistic (5-7 days)
- [ ] Integration ready for Phase 3
- [ ] Team ownership defined
- [ ] Post-migration tasks identified

---

## EXECUTION GUIDELINES

### Mode of Operation
Execute this prompt in **implementation mode** with these characteristics:

1. **Autonomous Decision-Making**
   - Make reasonable decisions when specifications are ambiguous
   - Choose the path that aligns with Touril luxury aesthetic
   - Prioritize accessibility and performance
   - When choices exist, document decision rationale

2. **Strategic Flexibility**
   - If image category seems underutilized, rebalance strategically
   - If a page can support more images, map additional ones
   - Ensure zero orphaned images before finalizing
   - Adjust aspect ratios based on component realities

3. **Quality Standards**
   - All deliverables must match documentation quality of Phase 1
   - Markdown formatting consistent with existing documents
   - Tables well-structured and readable
   - Code examples tested/valid syntax

4. **Validation Rigor**
   - Every image mapping must be traceable to CMS field
   - Every CMS field must correspond to UI component
   - Every UI component must support responsive display
   - Every recommendation must be implementable

### Deliverable Naming & Organization
- All deliverables saved in project root directory
- Markdown format (.md) for all documentation
- Clear section numbering and hierarchy
- Table of contents at start of each document
- Appendices for supporting details

### Integration Points
- Phase 2 deliverables enable Phase 3 (component styling)
- CMS configuration becomes system of record for image data
- Image mapping guides frontend developer on layout requirements
- Migration checklist becomes project task list

### Risk Mitigation
- Document blockers clearly (won't proceed without resolution)
- Identify prerequisites before execution
- Create rollback procedures for all major changes
- Test CMS configuration before full deployment
- Validate image uploads before frontend integration

---

## SUCCESS METRICS

Upon completion of Phase 2, the project should have:

1. **Complete CMS Audit**
   - Full understanding of current state
   - Clear gap analysis
   - Actionable recommendations for optimization

2. **Strategic Image Mapping**
   - All 97 images assigned to purpose
   - Clear CMS field paths documented
   - Zero orphaned or unused images
   - Responsive display patterns defined

3. **CMS Configuration Ready**
   - Updated config.yml with image field enhancements
   - Validated syntax and structure
   - Ready for immediate deployment

4. **Executable Migration Plan**
   - Step-by-step data population instructions
   - Clear success criteria per phase
   - Rollback procedures defined
   - Timeline realistic and achievable

---

## FINAL NOTES

This prompt is designed for autonomous execution by an experienced AI development agent. It provides:

- Sufficient context to understand project goals and constraints
- Detailed specifications for each deliverable
- Clear validation criteria for quality assurance
- Examples and templates to accelerate work
- Strategic guidance balanced with flexibility
- Integration readiness for Phase 3

The executor should feel empowered to make reasonable decisions, ask clarifying questions when ambiguity exists, and prioritize shipping high-quality deliverables that move the project forward.

**Phase 2 is the bridge between design vision (Phase 1) and implementation reality (Phase 3)**. Execute with both strategic thinking and practical pragmatism.

---

**END OF PHASE 2 EXECUTION PROMPT**

Version: 1.0
Created: February 15, 2026
Status: Ready for execution
