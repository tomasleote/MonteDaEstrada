# CMS Audit Report - Decap CMS Configuration Analysis

**Date:** February 15, 2026
**Project:** Monte da Estrada - Touril Integration Phase 2
**Scope:** Current CMS schema, image fields, content gaps, optimization opportunities
**Status:** Complete audit of public/admin/config.yml

---

## Executive Summary

This audit analyzes the current Decap CMS configuration for the Monte da Estrada website to prepare for strategic integration of 97 scraped images. The CMS uses a file-based approach with JSON data files and git-gateway backend. While the foundation is solid, several critical gaps must be addressed before Phase 3 implementation:

**Key Findings:**
- ✅ **Strengths**: Well-structured collections, existing image field support in key areas, Portuguese localization
- ⚠️ **Critical Gaps**: Missing alt text fields (accessibility blocker), no hero images for 4 of 6 pages, no global settings for logos
- 🔧 **Optimization Needed**: Enhance image galleries with alt text, add destination image arrays, create site settings collection

**Readiness for Phase 3:** CONDITIONAL - Requires config.yml updates before image migration can proceed

---

## 1. Collections Overview

### Summary Table
| Collection | Fields | Image Fields | Records | File Location | Status |
|-----------|--------|--------------|---------|---------------|--------|
| home | 4 sections | 1 (hero only) | 1 (single file) | src/data/home.json | Active, needs enhancement |
| quartos | 4 sections | 1 (room images array) | 1 (single file) | src/data/quartos.json | Active, needs alt text |
| atividades | 3 sections | 0 | 1 (single file) | src/data/atividades.json | Active, missing images |
| redondezas | 6 sections | 0 | 1 (single file) | src/data/redondezas.json | Active, missing images |
| localizacao | 6 sections | 0 | 1 (single file) | src/data/localizacao.json | Active, missing images |
| galeria | 4 sections | 3 (hero + category arrays) | 1 (single file) | src/data/galeria.json | Active, has structure |
| **site_settings** | **N/A** | **N/A** | **N/A** | **Missing** | **NEEDS CREATION** |

**Total Collections:** 6 active, 1 missing (site_settings for global logos/branding)

---

## 2. Detailed Collection Catalog

### 2.1 Home Collection

**Configuration:**
```yaml
name: "home"
label: "Página Inicial"
file: "monte-da-estrada/src/data/home.json"
```

**Path:** Single file collection (not folder-based)
**Total Sections:** 4 (hero, welcome, highlights, information)
**Image Fields:** 1

**Image Field Analysis:**
| Field Path | Type | Widget | Required | Alt Text Support | Current Use |
|-----------|------|--------|----------|------------------|-------------|
| hero.image | image | image | No* | ❌ NO | Hero background |

**Field Structure:**
1. **Hero Section** (object)
   - title (string)
   - subtitle (string)
   - image (image) - **No alt text field**

2. **Welcome Section** (object)
   - title (string)
   - paragraphs (list of text)
   - **Missing**: Welcome image field

3. **Highlights** (list)
   - title, description, icon
   - **Missing**: Feature images

4. **Information** (object)
   - Check-in/check-out, policies, included items
   - **Missing**: CTA section image

**Content Population Status:**
- Existing records: 1 (home.json file)
- Hero image: Present (but no alt text)
- Welcome/feature images: Not configured
- Estimated completion: 25% (only hero image configured)

**Critical Gaps:**
- ❌ No alt text field for hero image
- ❌ Missing welcomeImage field
- ❌ Missing featureImages array (for 3-4 feature highlights)
- ❌ Missing ctaImage field (for booking CTA section)

---

### 2.2 Quartos Collection

**Configuration:**
```yaml
name: "quartos"
label: "Quartos"
file: "monte-da-estrada/src/data/quartos.json"
```

**Path:** Single file collection
**Total Sections:** 4 (intro, rooms array, pricing, facilities)
**Image Fields:** 1 (room images array, but limited structure)

**Image Field Analysis:**
| Field Path | Type | Widget | Required | Alt Text Support | Current Use |
|-----------|------|--------|----------|------------------|-------------|
| rooms[].images[] | list of images | image | No | ❌ NO | Room galleries |

**Field Structure:**
1. **Page Header**
   - title (string)
   - description (text)
   - **Missing**: Hero image field

2. **Rooms Array** (list)
   - name (string): Room name
   - capacity (string)
   - features (list): Room amenities
   - images (list): **Simple image list - NO alt text structure**

3. **Pricing Section** (object)
   - Seasons, policies
   - **No images needed**

4. **Facilities** (list)
   - Facility names
   - **No images needed**

**Content Population Status:**
- Existing records: 1 (quartos.json)
- Room images: Field exists but likely empty
- Alt text: Not possible with current schema
- Estimated completion: 10% (structure exists, data missing)

**Critical Gaps:**
- ❌ No hero image field for page
- ❌ Room images field lacks alt text support (accessibility violation)
- ❌ Should differentiate between heroImage (1 primary) and galleryImages (3-4 additional)
- ❌ No common areas image section

**Recommended Schema Update:**
```yaml
# Instead of simple list:
- label: "Imagens"
  name: "images"
  widget: "list"
  field: { label: "Caminho da Imagem", name: "image", widget: "image" }

# Should be structured object list:
- label: "Imagem Principal"
  name: "heroImage"
  widget: "image"
  required: true
- label: "Galeria de Imagens"
  name: "galleryImages"
  widget: "list"
  fields:
    - { label: "Imagem", name: "image", widget: "image", required: true }
    - { label: "Texto Alternativo", name: "alt", widget: "string", required: true }
    - { label: "Legenda", name: "caption", widget: "string", required: false }
```

---

### 2.3 Atividades Collection

**Configuration:**
```yaml
name: "atividades"
label: "Atividades"
file: "monte-da-estrada/src/data/atividades.json"
```

**Path:** Single file collection
**Total Sections:** 3 (intro, activities array, amenities)
**Image Fields:** 0 ❌

**Image Field Analysis:**
| Field Path | Type | Current Configuration | Issue |
|-----------|------|----------------------|-------|
| (hero) | N/A | Does not exist | Missing page hero |
| activities[] | N/A | No image fields | Activities need visuals |

**Field Structure:**
1. **Page Header**
   - title (string)
   - description (text)
   - **Missing**: Hero image

2. **Activities Array** (list)
   - category (string)
   - title (string)
   - description (text)
   - highlights (list of strings)
   - icon (string): Emoji only
   - **Missing**: Activity images (hero + gallery)

3. **Amenities Section** (object)
   - Title, items
   - **Missing**: Amenity images

**Content Population Status:**
- Existing records: 1 (atividades.json)
- Image fields: None configured
- Estimated completion: 0% (no image support)

**Critical Gaps:**
- ❌ No hero image for page
- ❌ Activities array completely lacks image fields
- ❌ Cannot showcase festivals, outdoor activities, cycling with photos
- ❌ Relying on emoji icons instead of real photography

**Recommended Addition:**
```yaml
fields:
  - label: "Hero Section"
    name: "hero"
    widget: "object"
    fields:
      - { label: "Imagem", name: "image", widget: "image", required: true }
      - { label: "Texto Alternativo", name: "alt", widget: "string", required: true }

  - label: "Atividades"
    name: "activities"
    widget: "list"
    fields:
      # ... existing fields ...
      - label: "Imagem Principal"
        name: "heroImage"
        widget: "image"
      - label: "Texto Alternativo"
        name: "heroImageAlt"
        widget: "string"
      - label: "Galeria"
        name: "images"
        widget: "list"
        fields:
          - { label: "Imagem", name: "image", widget: "image" }
          - { label: "Alt", name: "alt", widget: "string" }
```

---

### 2.4 Redondezas Collection

**Configuration:**
```yaml
name: "redondezas"
label: "A Região"
file: "monte-da-estrada/src/data/redondezas.json"
```

**Path:** Single file collection
**Total Sections:** 6 (intro, region overview, beaches, towns, restaurants, festivals, attractions)
**Image Fields:** 0 ❌

**Image Field Analysis:**
| Section | Items | Current Image Support | Gap |
|---------|-------|----------------------|-----|
| Region overview | 1 | None | Missing hero |
| Beaches | 7-8 destinations | None | Missing all destination images |
| Towns | 8-10 destinations | None | Missing all destination images |
| Restaurants | 5-6 | None | Optional (not critical) |
| Festivals | 3-4 events | None | Missing event images |
| Attractions | List | None | Optional |

**Field Structure:**
1. **Page Header**
   - title, description
   - **Missing**: Hero image

2. **Region Section** (object)
   - title, description, highlights
   - **Missing**: Region overview images

3. **Beaches Section** (object)
   - Title + items array
   - Items: name, distance, description, features
   - **Missing**: Beach images (primary + gallery per beach)

4. **Towns Section** (object)
   - Title + items array
   - Items: name, distance, description, attractions
   - **Missing**: Town images (primary + gallery per town)

5. **Restaurants, Festivals, Attractions**
   - Similar structure, all missing images

**Content Population Status:**
- Existing records: 1 (redondezas.json)
- Image support: None
- Estimated completion: 0% (no image infrastructure)

**Critical Gaps:**
- ❌ This page should showcase 35 destination images but has zero image field support
- ❌ Beaches and towns are text-only (huge UX gap for tourism site)
- ❌ Cannot differentiate destinations without visuals
- ❌ Missing structured approach to multiple images per destination

**Recommended Schema (Critical):**
```yaml
fields:
  - label: "Hero Section"
    name: "hero"
    widget: "object"
    fields:
      - { label: "Imagem", name: "image", widget: "image", required: true }
      - { label: "Alt", name: "alt", widget: "string", required: true }

  - label: "Praias"
    name: "beaches"
    widget: "object"
    fields:
      - { label: "Título", name: "title", widget: "string" }
      - label: "Itens"
        name: "items"
        widget: "list"
        fields:
          - { label: "Nome", name: "name", widget: "string" }
          - { label: "Distância", name: "distance", widget: "string" }
          - { label: "Descrição", name: "description", widget: "text" }
          # NEW: Image support
          - label: "Imagem Principal"
            name: "primaryImage"
            widget: "image"
            required: true
          - label: "Alt da Imagem Principal"
            name: "primaryImageAlt"
            widget: "string"
            required: true
          - label: "Galeria"
            name: "images"
            widget: "list"
            fields:
              - { label: "Imagem", name: "image", widget: "image" }
              - { label: "Alt", name: "alt", widget: "string" }
          # ... existing fields ...
```

---

### 2.5 Localização Collection

**Configuration:**
```yaml
name: "localizacao"
label: "Localização"
file: "monte-da-estrada/src/data/localizacao.json"
```

**Path:** Single file collection
**Total Sections:** 6 (intro, address with GPS, directions, transport, parking, distances, tips)
**Image Fields:** 0 (maps handled by component, not CMS)

**Image Field Analysis:**
| Section | Image Need | Priority | Current Support |
|---------|-----------|----------|-----------------|
| Hero | Page introduction | Medium | None |
| Context images | Show surrounding area | Low-Medium | None |
| Map | Interactive map (component) | N/A | Component-based |

**Field Structure:**
1. **Page Header**
   - title, description
   - **Missing**: Hero image

2. **Address** (object with GPS coordinates)
   - No images needed (map component)

3. **Directions, Transport, Parking, Distances, Tips**
   - Informational sections
   - **Optional**: Context images (2-3 showing nearby areas)

**Content Population Status:**
- Existing records: 1 (localizacao.json)
- Image needs: Low (primarily informational)
- Estimated completion: N/A (content exists, images optional)

**Gaps (Non-Critical):**
- ⚠️ Missing hero image (lower priority)
- ⚠️ Missing context images to show nearby areas (optional enhancement)

**Recommended Addition (Optional):**
```yaml
fields:
  - label: "Hero Section"
    name: "hero"
    widget: "object"
    fields:
      - { label: "Imagem", name: "image", widget: "image" }
      - { label: "Alt", name: "alt", widget: "string" }

  - label: "Imagens de Contexto"
    name: "contextImages"
    widget: "list"
    max: 3
    fields:
      - { label: "Imagem", name: "image", widget: "image" }
      - { label: "Alt", name: "alt", widget: "string" }
      - { label: "Legenda", name: "caption", widget: "string" }
```

---

### 2.6 Galeria Collection

**Configuration:**
```yaml
name: "galeria"
label: "Galeria"
file: "monte-da-estrada/src/data/galeria.json"
```

**Path:** Single file collection
**Total Sections:** 4 (hero, intro, categories array, photography info)
**Image Fields:** 3 (hero + category images with good structure)

**Image Field Analysis:**
| Field Path | Type | Alt Text Support | Thumbnail Support | Current Quality |
|-----------|------|------------------|-------------------|-----------------|
| hero.image | image | ❌ NO | No | Basic |
| categories[].images[] | list of objects | ✅ YES | ✅ YES | **GOOD** |

**Field Structure:**
1. **Hero Section** (object)
   - image (image): **No alt text**
   - title, subtitle

2. **Page Header**
   - title, description

3. **Categories Array** (list) - **BEST CONFIGURED COLLECTION**
   - id, name, description
   - images (list):
     - src (image): Full-size image
     - thumbnail (image): Thumbnail version
     - alt (string): ✅ Alt text present
     - caption (string): Optional caption

4. **Photography Info** (object)
   - title, description, credits

**Content Population Status:**
- Existing records: 1 (galeria.json)
- Image structure: ✅ Best in class (has alt text and captions)
- Estimated completion: 50% (structure good, data pending)

**Gaps:**
- ⚠️ Hero image missing alt text field
- ✅ Category images have proper alt text structure (good!)

**This is the model to replicate** for other collections!

---

## 3. Image Field Deep Dive

### Current Image Field Summary
| Collection | Field Path | Type | Alt Text | Folder Path | Current Count |
|-----------|-----------|------|----------|-------------|---------------|
| home | hero.image | single | ❌ | /public/images | 0-1 |
| quartos | rooms[].images[] | simple list | ❌ | /public/images | 0 |
| atividades | N/A | N/A | N/A | N/A | 0 |
| redondezas | N/A | N/A | N/A | N/A | 0 |
| localizacao | N/A | N/A | N/A | N/A | 0 |
| galeria | hero.image | single | ❌ | /public/images | 0-1 |
| galeria | categories[].images[] | structured | ✅ | /public/images | 0 |

**Alt Text Coverage:** 14% (only galeria categories have it)
**Total Image Fields:** 3 basic, 1 well-structured (galeria categories)

### Media Folder Structure

**Current Configuration:**
```yaml
media_folder: "monte-da-estrada/public/images"
public_folder: "/images"
```

**Actual Image Organization** (in project):
```
monte-da-estrada/src/assets/images/
├── home/
│   ├── home-hero-monte-exterior.jpg
│   ├── home-property-view-01.jpg through -12.jpg
├── quartos/
│   ├── quartos-hero-rooms-overview.jpg
│   ├── quartos-room-01.jpg through -14.jpg
│   ├── quartos-common-area-01.jpg through -04.jpg
├── exterior/
│   ├── exterior-hero-amenities.jpg
│   ├── exterior-amenity-01.jpg through -09.jpg
├── redondezas/
│   ├── redondezas-hero-region.jpg
│   ├── redondezas-[destination]-*.jpg (35 images)
├── atividades/
│   ├── atividades-hero-activities.jpg
│   ├── atividades-hero-festivities.jpg
│   ├── atividades-[event]-*.jpg (9 images)
├── galeria/
│   ├── galeria-hero-informacoes.jpg
│   ├── galeria-hero-acessos.jpg
│   ├── galeria-hero-precos.jpg
└── logos/
    ├── logo-adl-partner.jpg
    ├── logo-leader-eu-funding-banner.jpg
    ├── logo-monte-estrada-text.jpg
    ├── logo-turismo-rural-badge.jpg
```

**Total Images Present:** 96 images ✅ (all downloaded and organized)

**CRITICAL ISSUE: Path Mismatch**
- CMS Config: `media_folder: "monte-da-estrada/public/images"`
- Actual Images: `monte-da-estrada/src/assets/images/`
- **This will cause broken image links when CMS tries to load images!**

**Recommendation:** Update config.yml:
```yaml
media_folder: "monte-da-estrada/src/assets/images"
public_folder: "/src/assets/images"
```

OR copy images to `public/images/` during build (requires build script update)

---

## 4. Content Gap Analysis

### Missing Hero Images
| Page | Current Status | Impact | Priority |
|------|---------------|--------|----------|
| HomePage | ✅ Has hero image field (no alt) | Low | P2 (add alt text) |
| QuartosPage | ❌ No hero field | High | **P0 (CRITICAL)** |
| AtividadesPage | ❌ No hero field | High | **P0 (CRITICAL)** |
| RedondezasPage | ❌ No hero field | High | **P0 (CRITICAL)** |
| LocalizacaoPage | ❌ No hero field | Medium | P1 |
| GaleriaPage | ✅ Has hero image field (no alt) | Low | P2 (add alt text) |

**Summary:** 4 of 6 pages missing hero images = 67% gap

### Empty Image Arrays
| Collection | Field | Expected Images | Current Support | Priority |
|-----------|-------|----------------|-----------------|----------|
| home | featureImages | 3-4 | ❌ Field missing | **P0** |
| home | welcomeImage | 1 | ❌ Field missing | P1 |
| home | ctaImage | 1 | ❌ Field missing | P1 |
| quartos | rooms[].heroImage | 8 rooms | ❌ Field missing | **P0** |
| quartos | rooms[].galleryImages | 3-4 per room | Partial (no alt) | **P0** |
| quartos | commonAreas | 4 images | ❌ Section missing | P1 |
| atividades | activities[].heroImage | 3 | ❌ Field missing | **P0** |
| atividades | activities[].images | 2-4 per activity | ❌ Field missing | **P0** |
| redondezas | beaches[].primaryImage | 7-8 | ❌ Field missing | **P0** |
| redondezas | beaches[].images | 1-4 per beach | ❌ Field missing | **P0** |
| redondezas | towns[].primaryImage | 8-10 | ❌ Field missing | **P0** |
| redondezas | towns[].images | 1-4 per town | ❌ Field missing | **P0** |
| localizacao | contextImages | 2-3 | ❌ Field missing | P2 |
| galeria | categories[].images | 28 | ✅ Supported | P1 (populate) |

**Critical Impact:** Cannot integrate 90+ of the 96 downloaded images due to missing CMS fields

### Alt Text Gaps

**Current Coverage Analysis:**
- Total image fields: 3 single + 1 array = 4 unique fields
- Image fields with alt text: 1 (galeria categories only)
- **Alt text coverage: 25%**

**WCAG 2.1 AA Compliance:** ❌ FAILING
**Accessibility Risk:** HIGH - Non-decorative images without alt text violate accessibility standards

**Missing Alt Text Fields:**
1. home.hero.image - Hero images need alt text for screen readers
2. quartos.rooms[].images[] - Room images need descriptive alt text
3. All new image fields must include alt text from the start

**Recommendation:** Make alt text REQUIRED for all image fields (except decorative backgrounds)

### Collection-Specific Gaps

**HomePage:**
- Missing: welcomeImage, featureImages[], ctaImage
- Missing: Alt text for hero
- Impact: Can only show 1 of 13 home images (8% utilization)

**QuartosPage:**
- Missing: Hero image
- Missing: Separate heroImage and galleryImages structure per room
- Missing: Common areas section with images
- Missing: Alt text for all room images
- Impact: Cannot showcase 19 room images properly

**AtividadesPage:**
- Missing: ENTIRE image infrastructure
- Impact: Cannot show any of 11 activity/festival images
- **This is the most critical gap**

**RedondezasPage:**
- Missing: ENTIRE image infrastructure for destinations
- Impact: Cannot show any of 35 destination images
- **This is the second most critical gap** (tourism site needs destination photos!)

**LocalizacaoPage:**
- Missing: Hero and context images (optional, lower priority)

**GaleriaPage:**
- Structure exists and is good
- Missing: Alt text for hero
- Missing: Actual image data population

---

## 5. Schema Optimization Opportunities

### Recommended Field Additions

#### Priority 0 (BLOCKING - Must have before Phase 3)

1. **Alt Text Fields for Existing Images**
   - Add alt text to: home.hero, galeria.hero
   - Make required for accessibility compliance

2. **Hero Images for All Pages**
   ```yaml
   # Add to: quartos, atividades, redondezas, localizacao
   - label: "Hero Section"
     name: "hero"
     widget: "object"
     fields:
       - { label: "Imagem", name: "image", widget: "image", required: true }
       - { label: "Texto Alternativo", name: "alt", widget: "string", required: true }
       - { label: "Título", name: "title", widget: "string" }
       - { label: "Subtítulo", name: "subtitle", widget: "string" }
   ```

3. **Structured Room Images (Quartos)**
   ```yaml
   # Replace simple images[] list with:
   - label: "Imagem Principal do Quarto"
     name: "heroImage"
     widget: "image"
     required: true
   - label: "Alt da Imagem Principal"
     name: "heroImageAlt"
     widget: "string"
     required: true
   - label: "Galeria do Quarto"
     name: "galleryImages"
     widget: "list"
     max: 4
     fields:
       - { label: "Imagem", name: "image", widget: "image", required: true }
       - { label: "Alt", name: "alt", widget: "string", required: true }
   ```

4. **Activity Image Fields**
   ```yaml
   # Add to activities[] items:
   - label: "Imagem da Atividade"
     name: "heroImage"
     widget: "image"
   - label: "Alt da Imagem"
     name: "heroImageAlt"
     widget: "string"
   - label: "Galeria de Imagens"
     name: "images"
     widget: "list"
     max: 4
     fields:
       - { label: "Imagem", name: "image", widget: "image" }
       - { label: "Alt", name: "alt", widget: "string" }
   ```

5. **Destination Image Fields (Redondezas)**
   ```yaml
   # Add to beaches[].items[] and towns[].items[]:
   - label: "Imagem Principal"
     name: "primaryImage"
     widget: "image"
     required: true
   - label: "Alt da Imagem Principal"
     name: "primaryImageAlt"
     widget: "string"
     required: true
   - label: "Galeria de Imagens"
     name: "images"
     widget: "list"
     max: 4
     fields:
       - { label: "Imagem", name: "image", widget: "image" }
       - { label: "Alt", name: "alt", widget: "string" }
   ```

#### Priority 1 (High Priority - Needed for complete implementation)

6. **HomePage Enhancement Fields**
   ```yaml
   # Add to home collection:
   - label: "Imagem de Boas-vindas"
     name: "welcomeImage"
     widget: "image"
   - label: "Alt da Imagem de Boas-vindas"
     name: "welcomeImageAlt"
     widget: "string"

   - label: "Imagens de Destaques"
     name: "featureImages"
     widget: "list"
     min: 3
     max: 4
     fields:
       - { label: "Imagem", name: "image", widget: "image" }
       - { label: "Alt", name: "alt", widget: "string" }

   - label: "Imagem do CTA de Reserva"
     name: "ctaImage"
     widget: "image"
   - label: "Alt da Imagem do CTA"
     name: "ctaImageAlt"
     widget: "string"
   ```

7. **Common Areas Section (Quartos)**
   ```yaml
   # Add to quartos collection:
   - label: "Áreas Comuns"
     name: "commonAreas"
     widget: "object"
     fields:
       - { label: "Título", name: "title", widget: "string" }
       - { label: "Descrição", name: "description", widget: "text" }
       - label: "Imagem Principal"
         name: "heroImage"
         widget: "image"
       - label: "Alt"
         name: "heroImageAlt"
         widget: "string"
       - label: "Galeria"
         name: "galleryImages"
         widget: "list"
         max: 3
         fields:
           - { label: "Imagem", name: "image", widget: "image" }
           - { label: "Alt", name: "alt", widget: "string" }
   ```

#### Priority 2 (Nice to Have - Enhances UX)

8. **Image Category/Tag Field**
   ```yaml
   # Add to all image objects:
   - label: "Categoria"
     name: "category"
     widget: "select"
     options: ["property", "rooms", "amenities", "destinations", "activities"]
     required: false
   ```

9. **Image Metadata (Optional)**
   ```yaml
   # Add to gallery images:
   - { label: "Fotógrafo", name: "photographer", widget: "string", required: false }
   - { label: "Data", name: "date", widget: "datetime", required: false }
   ```

10. **Featured/Priority Flag**
    ```yaml
    # Add to gallery images:
    - { label: "Imagem Destacada", name: "featured", widget: "boolean", default: false }
    ```

### Recommended Collection Creation

**NEW: Site Settings Collection**

Currently missing global settings for logos and branding.

```yaml
- name: "site_settings"
  label: "Configurações do Site"
  files:
    - label: "Configurações Globais"
      name: "settings"
      file: "monte-da-estrada/src/data/site-settings.json"
      fields:
        - label: "Logotipo do Site"
          name: "siteLogo"
          widget: "image"
          required: true
        - label: "Alt do Logotipo"
          name: "siteLogoAlt"
          widget: "string"
          required: true

        - label: "Logotipos de Parceiros"
          name: "partnerLogos"
          widget: "list"
          fields:
            - { label: "Nome do Parceiro", name: "name", widget: "string" }
            - { label: "Logotipo", name: "logo", widget: "image" }
            - { label: "Alt", name: "alt", widget: "string" }
            - { label: "URL (opcional)", name: "url", widget: "string", required: false }

        - label: "Imagens do Rodapé"
          name: "footerImages"
          widget: "list"
          max: 4
          fields:
            - { label: "Imagem", name: "image", widget: "image" }
            - { label: "Alt", name: "alt", widget: "string" }

        - label: "Favicon"
          name: "favicon"
          widget: "image"
          required: false

        - label: "Meta Imagem (partilha social)"
          name: "metaImage"
          widget: "image"
          required: false
```

**Rationale:** Logos (4 images) currently have no CMS home. They're downloaded but cannot be managed via CMS.

---

## 6. CMS Capabilities Assessment

### Batch Operations Support
- **Can bulk upload images:** ❌ NO - Decap CMS requires one-by-one uploads
- **Can bulk edit metadata:** ❌ NO - Must edit each record individually
- **Media library features:**
  - Browse uploaded images: ✅ YES
  - Search/filter: ⚠️ Limited (basic search only)
  - Delete images: ✅ YES
  - Replace images: ✅ YES (by re-uploading)

**Implication:** Data population will be manual and time-consuming (3-5 days estimated)

### Image Optimization in CMS
- **Automatic resizing:** ❌ NO - Decap CMS does not auto-optimize
- **Format optimization:** ❌ NO - Uploads original format as-is
- **Supported formats:** JPG, PNG, GIF, SVG, WEBP
- **CDN integration:** ❌ Not configured (images served directly from repo)

**Recommendation:**
1. Pre-optimize all images before upload (ImageMagick or similar)
   ```bash
   # Example optimization command:
   convert input.jpg -quality 80 -resize 2400x output.jpg
   ```
2. Consider implementing build-time optimization (e.g., next/image or similar)
3. Consider Netlify Large Media for automatic image transformation

### Integration Points

**Frontend Access to Images:**
- Images stored in: `src/assets/images/` (actual) or `public/images/` (configured)
- React components import images via:
  ```javascript
  import heroImage from '@/assets/images/home/home-hero-monte-exterior.jpg';
  // OR
  <img src="/images/home/home-hero-monte-exterior.jpg" alt={data.hero.alt} />
  ```

**Image URL Patterns:**
- CMS public URL: `/images/[category]/[filename]`
- Actual location: `/src/assets/images/[category]/[filename]`
- **Mismatch risk:** HIGH (see Section 3 path issue)

**Fallback Image Strategy:**
- ❌ Not configured
- **Recommendation:** Add default placeholder images for:
  - Missing hero images: `/images/defaults/hero-placeholder.jpg`
  - Missing room images: `/images/defaults/room-placeholder.jpg`
  - Missing destination images: `/images/defaults/destination-placeholder.jpg`

---

## 7. Audit Findings & Recommendations

### Critical Issues (Block Phase 3)

#### Issue 1: Media Folder Path Mismatch ❌ BLOCKER
**Problem:** config.yml specifies `media_folder: "monte-da-estrada/public/images"` but images are actually in `monte-da-estrada/src/assets/images/`

**Impact:** All image uploads and references will fail or create broken links

**Resolution Required:**
- **Option A:** Update config.yml to match actual location:
  ```yaml
  media_folder: "monte-da-estrada/src/assets/images"
  public_folder: "/src/assets/images"
  ```
- **Option B:** Move images to `public/images/` and update all references
- **Recommendation:** Option A (keep images in src/assets for better build optimization)

**Owner:** DevOps/Frontend Lead
**Deadline:** Before any CMS data entry begins

---

#### Issue 2: Missing Image Fields for 90% of Images ❌ BLOCKER
**Problem:** Can only configure 6-10 of 96 images with current schema (94% gap)

**Impact:** Cannot proceed with image migration

**Resolution Required:**
- Add hero image fields to 4 pages (quartos, atividades, redondezas, localizacao)
- Add image arrays to activities collection
- Add image arrays to redondezas destinations (beaches, towns)
- Add structured image fields to quartos rooms
- Add feature/welcome/CTA images to home

**Owner:** CMS Architect
**Deadline:** Before migration checklist execution

---

#### Issue 3: Zero Alt Text Coverage for Accessibility ❌ BLOCKER
**Problem:** 75% of image fields lack alt text support (WCAG violation)

**Impact:**
- Legal/compliance risk for accessibility
- Poor SEO (search engines need alt text)
- Excludes screen reader users

**Resolution Required:**
- Add alt text fields to ALL existing image fields
- Make alt text REQUIRED (not optional)
- Update galeria hero to include alt text

**Owner:** CMS Architect + Content Editor
**Deadline:** Immediate (before any image upload)

---

### High Priority Issues (Should resolve before migration)

#### Issue 4: No Global Settings Collection
**Problem:** 4 logos have no CMS management interface

**Impact:** Logos must be hardcoded or manually placed in repo

**Resolution:** Create site_settings collection (see Section 5)

**Owner:** CMS Architect
**Timeline:** Phase 2 (before Phase 3 implementation)

---

#### Issue 5: Simple Image Lists Instead of Structured Objects
**Problem:** quartos.rooms[].images[] is a simple list, not structured with alt text

**Impact:** Cannot add alt text to room images without schema change

**Resolution:** Migrate to structured list with image + alt fields (see Section 2.2)

**Owner:** CMS Architect
**Timeline:** Phase 2 (before data population)

---

### Medium Priority Issues (Nice to have improvements)

#### Issue 6: No Image Category/Tagging System
**Problem:** Cannot filter or organize images by type/purpose

**Impact:** Harder to find/reuse images in large media library

**Resolution:** Add optional category field to image objects

**Owner:** CMS Architect
**Timeline:** Phase 3 or later

---

#### Issue 7: No Image Optimization or CDN
**Problem:** Images uploaded at full size, no automatic optimization

**Impact:** Slower page load times, higher bandwidth costs

**Resolution:**
1. Pre-optimize images before upload (immediate)
2. Implement build-time optimization (Phase 3)
3. Configure Netlify Large Media (future enhancement)

**Owner:** Frontend + DevOps
**Timeline:** Phase 3 (optimization), Phase 4 (CDN)

---

### Low Priority Issues (Future consideration)

#### Issue 8: No Bulk Upload/Edit Capabilities
**Problem:** Must upload 96 images one by one

**Impact:** Time-consuming data entry (3-5 days estimated)

**Resolution:** No built-in solution in Decap CMS, consider:
- Direct JSON file editing for bulk operations
- Custom upload script (advanced)

**Owner:** Content Editor
**Timeline:** Accept limitation for now, automate in future if needed

---

## 8. Phase 2 Readiness Assessment

### CMS Schema Ready for Image Migration: ❌ NO (Conditional)

**Prerequisite Actions Required:**

- [ ] **CRITICAL**: Update config.yml media_folder path to match actual image location (`src/assets/images/`)
- [ ] **CRITICAL**: Add alt text fields to all existing image fields (home.hero, galeria.hero, quartos.rooms[].images)
- [ ] **CRITICAL**: Add hero image fields to 4 pages: quartos, atividades, redondezas, localizacao
- [ ] **CRITICAL**: Add image array fields to atividades collection (activities[].heroImage + images[])
- [ ] **CRITICAL**: Add image array fields to redondezas destinations (beaches[], towns[] with primaryImage + images[])
- [ ] **HIGH**: Create site_settings collection for logos
- [ ] **HIGH**: Restructure quartos room images from simple list to structured objects
- [ ] **HIGH**: Add welcomeImage, featureImages, ctaImage to home collection
- [ ] **MEDIUM**: Pre-optimize all 96 images for web (70-80% quality, 2400px max width)
- [ ] **MEDIUM**: Test image upload/display cycle with 1 sample image per collection

**Estimated Effort:** 6-8 hours for config.yml updates + testing

**Blockers Identified:**

1. ❌ **Path mismatch** - Must resolve before any upload
2. ❌ **Missing accessibility support** - Alt text fields required for WCAG compliance
3. ❌ **Incomplete schema** - 90% of images cannot be configured with current structure

**Risk Assessment:**

| Risk | Level | Mitigation |
|------|-------|------------|
| Image upload failures due to path mismatch | 🔴 HIGH | Update config.yml media_folder immediately |
| Broken image links in production | 🔴 HIGH | Test upload cycle before bulk migration |
| Accessibility violations (missing alt text) | 🔴 HIGH | Make alt text required in all image fields |
| Time overrun on manual data entry | 🟡 MEDIUM | Allocate 5 full days for migration, use checklist |
| Image quality/performance issues | 🟡 MEDIUM | Pre-optimize all images, test on mobile |
| Incomplete destination showcase | 🟡 MEDIUM | Prioritize redondezas schema update |

**Go/No-Go Decision:**

- **Current Status:** 🔴 NO-GO
- **After Prerequisite Actions:** 🟢 GO
- **Timeline:** 1-2 days to resolve blockers, then ready for migration

---

## 9. Appendix

### A. Full config.yml Structure (Relevant Sections)

**Backend & Media Configuration:**
```yaml
backend:
  name: git-gateway
  branch: main

publish_mode: simple
media_folder: "monte-da-estrada/public/images"  # ⚠️ NEEDS UPDATE
public_folder: "/images"
locale: "pt"
```

**Image-Related Collections:**
- home: 1 image field (hero, no alt)
- quartos: 1 image array (rooms[].images, no alt)
- atividades: 0 image fields ❌
- redondezas: 0 image fields ❌
- localizacao: 0 image fields ❌
- galeria: 2 image fields (hero no alt, categories[] with alt ✅)

### B. Image Folder Structure (Current State)

```
monte-da-estrada/
├── public/
│   ├── images/          # ⚠️ CMS configured path (EMPTY or minimal)
│   └── admin/
│       └── config.yml
└── src/
    └── assets/
        └── images/      # ✅ ACTUAL image location (96 images)
            ├── home/ (13 images)
            ├── quartos/ (19 images)
            ├── exterior/ (10 images)
            ├── redondezas/ (36 images)
            ├── atividades/ (11 images)
            ├── galeria/ (3 images)
            └── logos/ (4 images)
```

**Total Images:** 96
**Images in CMS:** 0 (schema incomplete)
**Utilization Rate:** 0%

### C. Sample Record Analysis

**Example: home.json (Current Structure)**
```json
{
  "hero": {
    "title": "Monte da Estrada",
    "subtitle": "Turismo Rural no Alentejo",
    "image": "/images/home/home-hero-monte-exterior.jpg"
    // ❌ MISSING: "alt": "Vista exterior do Monte da Estrada"
  },
  "welcome": {
    "title": "Bem-vindo ao Monte",
    "paragraphs": ["..."]
    // ❌ MISSING: "image" and "imageAlt" fields
  }
  // ❌ MISSING: featureImages[], ctaImage
}
```

**Proposed Structure After Schema Update:**
```json
{
  "hero": {
    "title": "Monte da Estrada",
    "subtitle": "Turismo Rural no Alentejo",
    "image": "/images/home/home-hero-monte-exterior.jpg",
    "alt": "Vista exterior do Monte da Estrada ao pôr do sol"  // ✅ NEW
  },
  "welcome": {
    "title": "Bem-vindo ao Monte",
    "paragraphs": ["..."],
    "image": "/images/home/home-property-view-05.jpg",  // ✅ NEW
    "imageAlt": "Interior acolhedor das áreas comuns"  // ✅ NEW
  },
  "featureImages": [  // ✅ NEW
    {
      "image": "/images/home/home-property-view-06.jpg",
      "alt": "Jardim exterior com árvores"
    },
    {
      "image": "/images/home/home-property-view-10.jpg",
      "alt": "Sala comum com lareira"
    },
    {
      "image": "/images/home/home-property-view-12.jpg",
      "alt": "Detalhes de decoração tradicional"
    }
  ],
  "ctaImage": {  // ✅ NEW
    "image": "/images/home/home-property-view-04.jpg",
    "alt": "Quarto confortável com cama de casal"
  }
}
```

---

**Document End**

**Next Steps:**
1. Review and approve critical issue resolutions
2. Update config.yml with enhanced schema (Deliverable 3)
3. Create image-mapping-table.md (Deliverable 2)
4. Create migration-checklist.md (Deliverable 4)

**Document Author:** Claude Code AI Agent
**Review Status:** Ready for stakeholder review
**Last Updated:** February 15, 2026
