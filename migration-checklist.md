# Image Migration Checklist & Data Population Plan
## Phase 2 - Monte da Estrada CMS Integration

**Date:** February 15, 2026
**Timeline:** 5-7 working days for complete data population
**Status:** Ready for execution
**Dependencies:** cms-audit-report.md, image-mapping-table.md, updated config.yml

---

## Executive Summary

This checklist provides a step-by-step guide for populating all 96 images into Decap CMS according to the strategic mapping defined in `image-mapping-table.md`. Each phase includes validation checkpoints, success criteria, and rollback procedures.

**Total Images to Migrate:** 96
**Total CMS Records to Create/Update:** 20-25
**Estimated Time:** 5-7 working days (8-10 hours)
**Team Required:** 1-2 content editors

---

## Pre-Migration Validation

**Complete these steps BEFORE starting data entry:**

### Step 1: Verify CMS Configuration
- [ ] Navigate to `/admin` on the dev site
- [ ] Confirm Decap CMS loads without errors
- [ ] Verify all 7 collections appear in sidebar:
  - [ ] Página Inicial
  - [ ] Quartos
  - [ ] Atividades
  - [ ] A Região (Redondezas)
  - [ ] Localização
  - [ ] Galeria
  - [ ] Configurações do Site (NEW collection)
- [ ] Test creating a draft record in any collection
- [ ] Verify Git Gateway authentication works

**Blocker Check:** If any collection is missing or CMS doesn't load, STOP and resolve config.yml issues before proceeding.

---

### Step 2: Verify Image Inventory
- [ ] Count images in `src/assets/images/home/`: Should be 13
- [ ] Count images in `src/assets/images/quartos/`: Should be 19
- [ ] Count images in `src/assets/images/exterior/`: Should be 10
- [ ] Count images in `src/assets/images/redondezas/`: Should be 36
- [ ] Count images in `src/assets/images/atividades/`: Should be 11
- [ ] Count images in `src/assets/images/galeria/`: Should be 3
- [ ] Count images in `src/assets/images/logos/`: Should be 4
- [ ] **Total verified: 96 images** ✅

**Blocker Check:** If any images are missing, download from source or use placeholders before proceeding.

---

### Step 3: Pre-Optimize All Images

**Before uploading, optimize images to prevent performance issues:**

```bash
# Navigate to images directory
cd monte-da-estrada/src/assets/images

# Optimize all JPG images (requires ImageMagick)
# Hero images (2400px width max)
find . -name "*-hero-*" -type f -exec convert {} -quality 80 -resize 2400x -strip {} \;

# Gallery/content images (1600px width max)
find . -name "*.jpg" -not -name "*-hero-*" -type f -exec convert {} -quality 75 -resize 1600x -strip {} \;

# Logos (keep original size but strip metadata)
cd logos
find . -name "*.jpg" -o -name "*.png" -type f -exec convert {} -strip {} \;
```

**Manual Alternative (if ImageMagick not available):**
1. Use online tool like TinyPNG or Squoosh.app
2. Target file size: <500KB for heroes, <300KB for others
3. Maintain original aspect ratios

**Validation:**
- [ ] All images are under target file sizes
- [ ] Visual quality still acceptable (no visible compression artifacts)
- [ ] File names unchanged (important for mapping table accuracy)

---

### Step 4: Prepare Alt Text Catalog

**Reference `image-mapping-table.md` for all alt texts. Create quick reference file:**

Create `alt-text-catalog.txt` with format:
```
home-hero-monte-exterior.jpg | Vista exterior do Monte da Estrada ao pôr do sol, mostrando a arquitetura tradicional alentejana
home-property-view-01.jpg | Vista da propriedade Monte da Estrada
home-property-view-02.jpg | Jardim e área exterior do Monte
...
```

**Tool:** Use a text editor or spreadsheet to have all alt texts ready for copy-paste during data entry.

- [ ] Alt text catalog prepared with all 96 entries
- [ ] Each alt text is 10-150 characters
- [ ] All alt texts in Portuguese
- [ ] No "Imagem de..." prefixes

---

### Step 5: Test Upload Cycle

**Test with 1 image before bulk migration:**

1. [ ] Open "Página Inicial" collection in CMS
2. [ ] Locate "Hero Section" > "Imagem de Fundo" field
3. [ ] Click upload and select `home-hero-monte-exterior.jpg`
4. [ ] Verify image uploads successfully
5. [ ] Enter alt text in "Texto Alternativo da Imagem" field
6. [ ] Save as draft
7. [ ] Navigate to dev site and verify image displays
8. [ ] Check browser console for errors
9. [ ] Delete test record (cleanup)

**Success Criteria:**
- Image uploads without errors
- Image displays on frontend
- Alt text field accepts input
- No console errors

**If test fails:** Investigate media_folder path, file permissions, or CMS configuration before proceeding.

---

## Migration Execution

### Phase 1: Global Settings (Day 1 - 30 minutes)

**Priority:** Critical (affects all pages)

#### Step 1.1: Create Site Settings Record

1. [ ] Open "Configurações do Site" collection
2. [ ] Click "Configurações Globais"
3. [ ] Upload **Site Logo**:
   - Image: `logos/logo-monte-estrada-text.jpg`
   - Alt: "Monte da Estrada - Turismo Rural"
4. [ ] Add **Partner Logo 1**:
   - Name: "ADL - Agência de Desenvolvimento Local"
   - Image: `logos/logo-adl-partner.jpg`
   - Alt: "ADL - Agência de Desenvolvimento Local"
   - URL: (leave empty unless known)
5. [ ] Add **Partner Logo 2**:
   - Name: "LEADER - Financiamento UE"
   - Image: `logos/logo-leader-eu-funding-banner.jpg`
   - Alt: "LEADER - Financiamento da União Europeia"
   - URL: (leave empty)
6. [ ] Add **Partner Logo 3**:
   - Name: "Turismo Rural"
   - Image: `logos/logo-turismo-rural-badge.jpg`
   - Alt: "Turismo Rural Certificado"
   - URL: (leave empty)
7. [ ] Leave Favicon and Meta Image empty (optional fields)
8. [ ] Click "Publish" (or "Save" depending on workflow)

**Validation:**
- [ ] Site logo displays in header/footer
- [ ] All 3 partner logos visible in footer
- [ ] No broken image links

---

### Phase 2: HomePage (Day 1 - 1 hour)

**Priority:** High (primary landing page)

#### Step 2.1: Update Hero Section

1. [ ] Open "Página Inicial" collection
2. [ ] Click "Conteúdo da Home"
3. [ ] Scroll to "Hero Section"
4. [ ] Upload Hero Image:
   - Image: `home/home-hero-monte-exterior.jpg`
   - Alt: "Vista exterior do Monte da Estrada ao pôr do sol, mostrando a arquitetura tradicional alentejana"
5. [ ] Verify title and subtitle are filled
6. [ ] Save draft

**Validation:**
- [ ] Hero image displays full-width on homepage
- [ ] Image loads on mobile devices
- [ ] Text overlay is readable over image

---

#### Step 2.2: Add Welcome Image

1. [ ] Scroll to "Secção de Boas-vindas"
2. [ ] Upload Welcome Image:
   - Image: `home/home-property-view-05.jpg`
   - Alt: "Interior do Monte mostrando área de estar confortável com mobiliário tradicional"
3. [ ] Verify welcome text paragraphs are present
4. [ ] Save draft

**Validation:**
- [ ] Welcome image displays beside or below text (responsive)
- [ ] Image aspect ratio preserved

---

#### Step 2.3: Add Feature Images

1. [ ] Scroll to "Imagens de Destaques" (new field)
2. [ ] Add Image 1:
   - Image: `home/home-property-view-06.jpg`
   - Alt: "Jardim exterior do Monte com árvores centenárias e espaço verde"
3. [ ] Add Image 2:
   - Image: `home/home-property-view-10.jpg`
   - Alt: "Sala comum com lareira tradicional e decoração rústica"
4. [ ] Add Image 3:
   - Image: `home/home-property-view-12.jpg`
   - Alt: "Detalhe de artesanato tradicional e mobiliário alentejano"
5. [ ] Save draft

**Validation:**
- [ ] 3 images display in grid layout (3 cols desktop, 1-2 mobile)
- [ ] All images same height (1:1 aspect ratio)

---

#### Step 2.4: Add CTA Image

1. [ ] Scroll to "Imagem do CTA de Reserva"
2. [ ] Upload CTA Image:
   - Image: `home/home-property-view-04.jpg`
   - Alt: "Quarto confortável com cama de casal, roupa de cama branca e ambiente acolhedor"
3. [ ] Verify CTA text/button is configured
4. [ ] **Publish** HomePage
5. [ ] Navigate to live site and verify all 5 images display

**Final HomePage Validation:**
- [ ] Hero image: 1 ✓
- [ ] Welcome image: 1 ✓
- [ ] Feature images: 3 ✓
- [ ] CTA image: 1 ✓
- [ ] Total: 5 images on HomePage ✓
- [ ] All responsive (test mobile view)
- [ ] No broken links

---

### Phase 3: QuartosPage (Day 2 - 2 hours)

**Priority:** High (booking driver)

#### Step 3.1: Update Page Hero

1. [ ] Open "Quartos" collection
2. [ ] Click "Conteúdo de Quartos"
3. [ ] Scroll to "Hero Section" (new field)
4. [ ] Upload Hero Image:
   - Image: `quartos/quartos-hero-rooms-overview.jpg`
   - Alt: "Visão geral dos quartos do Monte da Estrada, mostrando conforto e tradição"
5. [ ] Enter Title: "Os Nossos Quartos" (or existing title)
6. [ ] Save draft

---

#### Step 3.2: Create Room 1

1. [ ] Scroll to "Quartos" array
2. [ ] Add new room or edit existing
3. [ ] Enter Room Name: "Quarto Dália" (or appropriate flower name)
4. [ ] Enter Capacity: "2 pessoas"
5. [ ] Upload **Hero Image**:
   - Image: `quartos/quartos-room-01.jpg`
   - Alt: "Quarto Dália com cama de casal, móveis tradicionais e janela com luz natural"
6. [ ] Add **Gallery Image 1**:
   - Image: `quartos/quartos-room-02.jpg`
   - Alt: "Detalhe da cama e têxteis do Quarto Dália"
7. [ ] Add **Gallery Image 2**:
   - Image: `quartos/quartos-room-03.jpg`
   - Alt: "Casa de banho privativa do Quarto Dália"
8. [ ] Add **Gallery Image 3**:
   - Image: `quartos/quartos-room-04.jpg`
   - Alt: "Vista da janela e área de estar do Quarto Dália"
9. [ ] Fill in Features list (WiFi, heating, bathroom, etc.)
10. [ ] Save draft

**Repeat Step 3.2 for Rooms 2-4** using image sets:
- Room 2: quartos-room-05 (hero) + 06, 07, 08 (gallery)
- Room 3: quartos-room-09 (hero) + 10, 11, 12 (gallery)
- Room 4: quartos-room-13 (hero) + 14 (gallery) - Note: Only 2 images for Room 4

---

#### Step 3.3: Add Common Areas

1. [ ] Scroll to "Áreas Comuns" (new section)
2. [ ] Enter Title: "Áreas Comuns"
3. [ ] Enter Description: "Espaços partilhados com lareira, sala de estar e cozinha equipada"
4. [ ] Upload **Hero Image**:
   - Image: `quartos/quartos-common-area-01.jpg`
   - Alt: "Sala comum com lareira tradicional e poltronas confortáveis"
5. [ ] Add **Gallery Image 1**:
   - Image: `quartos/quartos-common-area-02.jpg`
   - Alt: "Área de refeições com mesa grande e decoração rústica"
6. [ ] Add **Gallery Image 2**:
   - Image: `quartos/quartos-common-area-03.jpg`
   - Alt: "Cozinha partilhada com equipamentos tradicionais"
7. [ ] Add **Gallery Image 3**:
   - Image: `quartos/quartos-common-area-04.jpg`
   - Alt: "Detalhes de decoração nas áreas comuns"
8. [ ] **Publish** QuartosPage
9. [ ] Verify on live site: 1 hero + 4 rooms with galleries + 1 common area section

**Final QuartosPage Validation:**
- [ ] Hero image: 1 ✓
- [ ] Room 1 images: 4 ✓
- [ ] Room 2 images: 4 ✓
- [ ] Room 3 images: 4 ✓
- [ ] Room 4 images: 2 ✓
- [ ] Common areas: 4 ✓
- [ ] Total: 19 images ✓
- [ ] All room galleries functional (carousel/slider)
- [ ] Mobile responsive

---

### Phase 4: GaleriaPage (Day 3 - 2 hours)

**Priority:** Medium-High (comprehensive showcase)

#### Step 4.1: Update Page Hero

1. [ ] Open "Galeria" collection
2. [ ] Click "Conteúdo da Galeria"
3. [ ] Navigate to "Hero Section"
4. [ ] Upload Hero Image:
   - Image: `galeria/galeria-hero-informacoes.jpg`
   - Alt: "Imagem de introdução à galeria do Monte da Estrada"
5. [ ] Verify title and subtitle
6. [ ] Save draft

---

#### Step 4.2: Create Main Gallery Category

1. [ ] Scroll to "Categorias" array
2. [ ] Create new category or edit existing
3. [ ] Enter ID: "all" or "property"
4. [ ] Enter Name: "Galeria Completa" or "A Propriedade"
5. [ ] Enter Description: "Imagens do Monte da Estrada - propriedade, quartos e comodidades"

**Now add 27 gallery images** (this is the most time-consuming section):

**Images 1-12: Property Views**
6. [ ] Add Image: `home/home-property-view-01.jpg`, Alt: "Vista da propriedade Monte da Estrada"
7. [ ] Add Image: `home/home-property-view-02.jpg`, Alt: "Jardim e área exterior"
8. [ ] Add Image: `home/home-property-view-03.jpg`, Alt: "Vista panorâmica da propriedade"
... (Continue for all 12 property views)

**Images 13-16: Room Showcases**
- [ ] Add: `quartos/quartos-room-01.jpg`, Alt: "Quarto com decoração tradicional"
- [ ] Add: `quartos/quartos-room-05.jpg`, Alt: "Quarto com cama queen e luz natural"
- [ ] Add: `quartos/quartos-room-09.jpg`, Alt: "Quarto com móveis rústicos alentejanos"
- [ ] Add: `quartos/quartos-room-13.jpg`, Alt: "Quarto acolhedor com janela ampla"

**Images 17-25: Amenities (9 exterior images)**
- [ ] Add: `exterior/exterior-amenity-01.jpg`, Alt: "Jardim exterior com zona de estar"
- [ ] Add: `exterior/exterior-amenity-02.jpg`, Alt: "Área de refeições ao ar livre"
... (Continue for all 9 amenities)

**Images 26-27: Common Areas**
- [ ] Add: `quartos/quartos-common-area-01.jpg`, Alt: "Sala comum com lareira"
- [ ] Add: `quartos/quartos-common-area-02.jpg`, Alt: "Área de refeições partilhada"

8. [ ] **Publish** GaleriaPage
9. [ ] Verify gallery displays in grid/masonry layout
10. [ ] Test lightbox (click image to enlarge)
11. [ ] Verify lazy loading works (scroll to load images)

**Final GaleriaPage Validation:**
- [ ] Hero image: 1 ✓
- [ ] Gallery images: 27 ✓
- [ ] Total: 28 images ✓
- [ ] Grid layout responsive (4 cols → 3 → 2 → 1)
- [ ] Lightbox functional
- [ ] No broken images

---

### Phase 5: AtividadesPage (Day 4 - 1.5 hours)

**Priority:** Medium (activity promotion)

#### Step 5.1: Update Page Hero

1. [ ] Open "Atividades" collection
2. [ ] Navigate to "Hero Section"
3. [ ] Upload Hero Image:
   - Image: `atividades/atividades-hero-activities.jpg`
   - Alt: "Introdução às atividades disponíveis no Monte da Estrada e região"
4. [ ] Save draft

---

#### Step 5.2: Create Activity 1 - Garden & Outdoor

1. [ ] Scroll to "Atividades" array
2. [ ] Add new activity
3. [ ] Enter Title: "Jardim e Espaços Exteriores"
4. [ ] Enter Category: "outdoor"
5. [ ] Enter Description: "Desfrute do nosso jardim com áreas de estar, piscina e churrasco."
6. [ ] Upload **Hero Image**:
   - Image: `exterior/exterior-amenity-01.jpg`
   - Alt: "Jardim do Monte com zona de estar exterior"
7. [ ] Add **Gallery Image 1**:
   - Image: `exterior/exterior-amenity-02.jpg`
   - Alt: "Mesa de refeições ao ar livre"
8. [ ] Add **Gallery Image 2**:
   - Image: `exterior/exterior-amenity-03.jpg`
   - Alt: "Piscina e área de lazer"
9. [ ] Save draft

---

#### Step 5.3: Create Activity 2 - Cycling

1. [ ] Add new activity
2. [ ] Enter Title: "Passeios de Bicicleta e Exploração Regional"
3. [ ] Enter Category: "cycling"
4. [ ] Enter Description: "Bicicletas disponíveis para explorar a região e praias próximas."
5. [ ] Upload **Hero Image**:
   - Image: `exterior/exterior-amenity-06.jpg`
   - Alt: "Bicicletas disponíveis para passeios pela região"
6. [ ] Add **Gallery Image 1**:
   - Image: `redondezas/redondezas-zambujeira-beach.jpg`
   - Alt: "Praia da Zambujeira do Mar, destino de passeio"
7. [ ] Add **Gallery Image 2**:
   - Image: `redondezas/redondezas-porto-covo-01.jpg`
   - Alt: "Vila de Porto Covo, destino de ciclismo"
8. [ ] Save draft

---

#### Step 5.4: Create Activity 3 - Festivities

1. [ ] Add new activity
2. [ ] Enter Title: "Festividades e Eventos Locais"
3. [ ] Enter Category: "festivities"
4. [ ] Enter Description: "Descubra festas tradicionais e festivais da região, incluindo o MEO Sudoeste."
5. [ ] Upload **Hero Image**:
   - Image: `atividades/atividades-hero-festivities.jpg`
   - Alt: "Festividades tradicionais da região"
6. [ ] Add **Gallery Images** (9 festival images):
   - [ ] `atividades/atividades-faceco-fair-01.jpg` - "Feira FACECO em São Teotónio"
   - [ ] `atividades/atividades-faceco-fair-02.jpg` - "Exposições na Feira FACECO"
   - [ ] `atividades/atividades-festa-mastros-01.jpg` - "Festa dos Mastros - tradição local"
   - [ ] `atividades/atividades-festa-mastros-02.jpg` - "Procissão da Festa dos Mastros"
   - [ ] `atividades/atividades-festa-mastros-03.jpg` - "Comunidade na Festa dos Mastros"
   - [ ] `atividades/atividades-festival-sudoeste-01.jpg` - "Festival MEO Sudoeste na Zambujeira"
   - [ ] `atividades/atividades-festival-sudoeste-02.jpg` - "Concerto no Festival MEO Sudoeste"
   - [ ] `atividades/atividades-festival-meo-sudoeste.jpg` - "Palco principal do MEO Sudoeste"
   - [ ] `atividades/atividades-festival-meo.jpg` - "Multidão no Festival MEO Sudoeste"
7. [ ] **Publish** AtividadesPage
8. [ ] Verify all 3 activity cards display with images

**Final AtividadesPage Validation:**
- [ ] Hero image: 1 ✓
- [ ] Activity 1 images: 3 ✓
- [ ] Activity 2 images: 3 ✓
- [ ] Activity 3 images: 10 (1 hero + 9 gallery) ✓
- [ ] Total from atividades category: 11 ✓
- [ ] Cross-category images: 4 (from exterior, redondezas)
- [ ] Activity carousels functional
- [ ] Responsive layout

---

### Phase 6: RedondezasPage (Day 5-6 - 3 hours)

**Priority:** High (regional showcase, 26 images total)

**Note:** This is the largest single migration (12 destinations with varying image counts)

#### Step 6.1: Update Page Hero

1. [ ] Open "A Região" collection
2. [ ] Navigate to "Hero Section"
3. [ ] Upload Hero Image:
   - Image: `redondezas/redondezas-hero-region.jpg`
   - Alt: "Panorama da costa alentejana e região envolvente"
4. [ ] Save draft

---

#### Step 6.2: Populate Beaches (Under "Praias" section)

**Destination 1: Zambujeira do Mar**
1. [ ] Navigate to "Praias" > "Itens" array
2. [ ] Add or edit beach item
3. [ ] Enter Name: "Zambujeira do Mar"
4. [ ] Enter Distance: "5 km"
5. [ ] Enter Description: "Praia famosa com festivais de verão e beleza natural"
6. [ ] Upload **Primary Image**:
   - Image: `redondezas/redondezas-zambujeira-night.jpg`
   - Alt: "Praia da Zambujeira do Mar ao pôr do sol"
7. [ ] Add **Gallery Images**:
   - [ ] `redondezas/redondezas-zambujeira-beach.jpg` - "Praia da Zambujeira com areia branca"
   - [ ] `redondezas/redondezas-zambujeira-sea.jpg` - "Mar azul na Zambujeira do Mar"
   - [ ] `redondezas/redondezas-zambujeira-rocks.jpg` - "Formações rochosas na Zambujeira"
   - [ ] `redondezas/redondezas-zambujeira-square.jpg` - "Largo da vila da Zambujeira"
8. [ ] Save draft

**Destination 2: Almograve**
- [ ] Name: "Almograve"
- [ ] Distance: "10 km"
- [ ] Primary Image: `redondezas/redondezas-almograve-beach.jpg`, Alt: "Praia de Almograve"
- [ ] Gallery: (None - single image destination)

**Destination 3: Cabo Sardão**
- [ ] Name: "Cabo Sardão"
- [ ] Distance: "8 km"
- [ ] Primary: `redondezas/redondezas-cabo-sardao-cliffs.jpg`, Alt: "Falésias do Cabo Sardão"
- [ ] Gallery:
  - [ ] `redondezas/redondezas-cabo-sardao-lighthouse.jpg` - "Farol do Cabo Sardão"

**Destination 4: Carvalhal**
- [ ] Name: "Carvalhal"
- [ ] Distance: "15 km"
- [ ] Primary: `redondezas/redondezas-carvalhal-beach.jpg`, Alt: "Praia do Carvalhal"
- [ ] Gallery: (None)

---

#### Step 6.3: Populate Towns (Under "Vilas e Cidades" section)

**Destination 5: São Teotónio**
1. [ ] Navigate to "Vilas e Cidades" > "Itens"
2. [ ] Add town item
3. [ ] Name: "São Teotónio"
4. [ ] Distance: "3 km"
5. [ ] Description: "Vila tradicional alentejana com comércio local e feira FACECO"
6. [ ] Primary: `redondezas/redondezas-sao-teotonio-01.jpg`, Alt: "Vila de São Teotónio"
7. [ ] Gallery:
   - [ ] `redondezas/redondezas-sao-teotonio-02.jpg` - "Ruas de São Teotónio"
   - [ ] `redondezas/redondezas-entrada-da-barca.jpg` - "Praia da Entrada da Barca perto de São Teotónio"

**Destination 6: Odemira**
- [ ] Primary: `redondezas/redondezas-odemira-01.jpg`, Alt: "Vila de Odemira"
- [ ] Gallery:
  - [ ] `redondezas/redondezas-odemira-02.jpg` - "Centro histórico de Odemira"
  - [ ] `redondezas/redondezas-odemira-03.jpg` - "Vista panorâmica de Odemira"

**Destination 7: Milfontes**
- [ ] Primary: `redondezas/redondezas-milfontes-01.jpg`, Alt: "Vila Nova de Milfontes"
- [ ] Gallery:
  - [ ] `redondezas/redondezas-milfontes-02.jpg` - "Praia de Milfontes"
  - [ ] `redondezas/redondezas-parque-aguas-01.jpg` - "Parque das Águas em Milfontes"

**Destination 8: Porto Covo**
- [ ] Primary: `redondezas/redondezas-porto-covo-01.jpg`
- [ ] Gallery: porto-covo-02, porto-covo-03

**Destination 9: Sines**
- [ ] Primary: `redondezas/redondezas-sines-01.jpg`
- [ ] Gallery: `redondezas/redondezas-ilha-pessegueiro.jpg`

**Destination 10: Odeceixe**
- [ ] Primary: `redondezas/redondezas-odeceixe-01.jpg`
- [ ] Gallery: odeceixe-02, odeceixe-03

**Destination 11: Aljezur**
- [ ] Primary: `redondezas/redondezas-aljezur-01.jpg`
- [ ] Gallery: aljezur-02, aljezur-03

**Destination 12: Arrifana**
- [ ] Primary: `redondezas/redondezas-arrifana-beach.jpg`, Alt: "Praia da Arrifana"
- [ ] Gallery: (None)

9. [ ] **Publish** RedondezasPage
10. [ ] Verify all 12 destination cards display
11. [ ] Test image carousels on cards with multiple images
12. [ ] Check mobile responsiveness (1-column stack)

**Final RedondezasPage Validation:**
- [ ] Hero image: 1 ✓
- [ ] 12 destinations with primary images: 12 ✓
- [ ] Gallery images distributed: 13 ✓
- [ ] Total redondezas images on page: 26 ✓
- [ ] All destination cards render correctly
- [ ] Carousels functional
- [ ] Responsive layout

---

### Phase 7: LocalizacaoPage (Day 6 - 30 minutes)

**Priority:** Low-Medium (informational page)

#### Step 7.1: Update Page Hero

1. [ ] Open "Localização" collection
2. [ ] Navigate to "Hero Section"
3. [ ] Upload Hero Image:
   - Image: `galeria/galeria-hero-acessos.jpg`
   - Alt: "Localização e acessos ao Monte da Estrada"
4. [ ] Save draft

---

#### Step 7.2: Add Context Images

1. [ ] Scroll to "Imagens de Contexto" (new field)
2. [ ] Add Image 1:
   - Image: `redondezas/redondezas-odemira-01.jpg`
   - Alt: "Vila de Odemira, a 15 km do Monte"
   - Caption: "Odemira - 15 km"
3. [ ] Add Image 2:
   - Image: `redondezas/redondezas-milfontes-01.jpg`
   - Alt: "Milfontes, destino costeiro próximo"
   - Caption: "Vila Nova de Milfontes - 25 km"
4. [ ] Verify address and GPS coordinates are filled
5. [ ] **Publish** LocalizacaoPage
6. [ ] Verify map displays correctly
7. [ ] Verify context images display below map

**Final LocalizacaoPage Validation:**
- [ ] Hero image: 1 ✓
- [ ] Context images: 2 ✓
- [ ] Total: 3 images (1 from galeria, 2 from redondezas cross-use) ✓
- [ ] Map component functional
- [ ] Responsive layout

---

## Post-Migration Validation

### Final Image Count Verification

**Count by Page:**
- [ ] HomePage: 5 images ✓
- [ ] QuartosPage: 19 images ✓
- [ ] GaleriaPage: 28 images ✓
- [ ] AtividadesPage: 11 images (from atividades category) ✓
- [ ] RedondezasPage: 26 images ✓
- [ ] LocalizacaoPage: 3 images ✓
- [ ] Global Settings: 4 logos ✓
- [ ] **Grand Total Unique Images: 96** ✓

**Count by Source Category:**
- [ ] home: 13 images (5 on HomePage, 8 reused in Galeria) ✓
- [ ] quartos: 19 images (15 on Quartos, 4 reused in Galeria) ✓
- [ ] exterior: 10 images (9 in Galeria, 4 cross-used in Atividades) ✓
- [ ] redondezas: 36 images (26 on Redondezas, 2 in Atividades, 2 in Localização) ✓
- [ ] atividades: 11 images (all on AtividadesPage) ✓
- [ ] galeria: 3 images (2 used as heroes on Galeria/Localização) ✓
- [ ] logos: 4 images (all in Global Settings) ✓

---

### Functionality Check

**Test on Dev Site:**
- [ ] All hero images load without 404 errors
- [ ] All gallery carousels/sliders functional
- [ ] Lightbox opens and cycles through gallery images
- [ ] Alt text present on all images (inspect in browser DevTools)
- [ ] Responsive images display correctly:
  - [ ] Desktop (1920px width)
  - [ ] Tablet (768px width)
  - [ ] Mobile (375px width)
- [ ] No console errors related to images
- [ ] No layout shift when images load (CLS check)

---

### Accessibility Check

**WCAG 2.1 AA Compliance:**
- [ ] All images have alt text (inspect with browser)
- [ ] Alt text is descriptive (not "image123" style)
- [ ] Alt text doesn't repeat caption (when caption present)
- [ ] Alt text length is 10-150 characters
- [ ] Images with text overlays have sufficient contrast (hero sections)
- [ ] Focus states visible on gallery images (keyboard navigation)
- [ ] Screen reader announces alt text correctly (test with NVDA/JAWS)

**Tools:**
- Use browser DevTools > Elements to inspect `<img>` tags and verify alt attributes
- Use axe DevTools extension for automated accessibility scan
- Use Lighthouse audit for accessibility score (target: 100)

---

### Performance Check

**Lighthouse Audit (Desktop & Mobile):**
- [ ] Performance score ≥ 85
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] All images lazy-loaded except above-fold heroes
- [ ] Image file sizes appropriate:
  - [ ] Hero images: <500KB each
  - [ ] Gallery images: <300KB each
  - [ ] Total page weight with images: <5MB

**If performance issues found:**
1. Further optimize slow-loading images (re-compress to 70% quality)
2. Implement responsive srcset (multiple image sizes)
3. Ensure lazy loading enabled for off-screen images
4. Consider CDN for image delivery (future enhancement)

---

### Content Review Check

**Visual QA:**
- [ ] Images match content descriptions (correct context)
- [ ] Image placement makes sense (hero = impactful, gallery = variety)
- [ ] No duplicate images on same page (unless intentional reuse)
- [ ] No missing images (all 96 accounted for, zero "image not found" placeholders)
- [ ] Image quality consistent across pages (no visibly pixelated images)
- [ ] All destination names match images (e.g., Zambujeira images labeled correctly)

**Content Accuracy:**
- [ ] Alt texts are in Portuguese and grammatically correct
- [ ] Destination descriptions match images shown
- [ ] Room names correspond to actual rooms (if known)
- [ ] Festival/event images correctly labeled

---

## Success Criteria Met

**Final Sign-Off Checklist:**
- [ ] All 96 images integrated successfully
- [ ] Zero broken image links (no 404s)
- [ ] 100% alt text coverage (all images have descriptive alt text)
- [ ] All pages render without errors (no console errors)
- [ ] Mobile-responsive verified on 3 devices (phone, tablet, desktop)
- [ ] Performance acceptable (Lighthouse ≥85 on mobile)
- [ ] Accessibility compliant (WCAG 2.1 AA, Lighthouse accessibility 100)
- [ ] Ready for Phase 3 (component styling updates with Touril tokens)

**Approval:**
- [ ] Content Editor: Approved images and alt texts
- [ ] Frontend Developer: Confirmed images integrate with components
- [ ] QA Tester: Verified functionality and responsiveness
- [ ] Project Lead: Final sign-off for Phase 3 transition

---

## Rollback Procedures

### If Critical Issue Discovered

**Immediate Actions:**
1. Do NOT make new changes to CMS content
2. Stop uploading images
3. Document the specific issue:
   - Which page/collection?
   - Which image(s) affected?
   - Error message or screenshot?
4. Notify project lead immediately

---

### Partial Rollback (Specific Page)

**Scenario:** Images on one page (e.g., QuartosPage) causing issues

**Steps:**
1. [ ] Navigate to problematic collection in CMS
2. [ ] Click "Edit" on the record
3. [ ] Remove/replace problematic images:
   - Delete image field entry
   - OR upload different image as temporary fix
4. [ ] Save and publish
5. [ ] Verify issue resolved on dev site
6. [ ] Investigate root cause before re-uploading

**Common Issues & Fixes:**
- **Image too large (slow load):** Re-optimize to <500KB and re-upload
- **Wrong aspect ratio (layout break):** Crop/resize image to match expected ratio
- **Broken path (404):** Verify file name exactly matches manifest (case-sensitive)
- **Alt text missing (accessibility fail):** Edit record and add alt text

---

### Full Rollback (All Pages)

**Scenario:** Config.yml change caused widespread breakage

**WARNING:** This discards all image population work. Use only as last resort.

**Steps:**
1. [ ] Restore previous config.yml from backup:
   ```bash
   cd monte-da-estrada/public/admin
   cp config.yml.backup-[date] config.yml
   ```
2. [ ] Commit and push to trigger CMS reload:
   ```bash
   git add config.yml
   git commit -m "Rollback config.yml to previous version"
   git push
   ```
3. [ ] Wait 2-3 minutes for Netlify rebuild
4. [ ] Test CMS access at `/admin`
5. [ ] If CMS loads correctly, previous state is restored
6. [ ] All image uploads since backup are lost - must re-do

**Prevention:** Always backup config.yml before major changes:
```bash
cp config.yml config.yml.backup-$(date +%Y%m%d)
```

---

### Image Quality Issue Fix

**Scenario:** Uploaded image has visible compression artifacts or wrong dimensions

**Steps:**
1. [ ] Locate original image in `src/assets/images/[category]/`
2. [ ] Re-optimize with better settings:
   ```bash
   convert original.jpg -quality 85 -resize 2000x -strip optimized.jpg
   ```
3. [ ] Navigate to CMS record with problematic image
4. [ ] Delete current image
5. [ ] Upload re-optimized version
6. [ ] Save and publish
7. [ ] Verify on dev site (hard refresh: Ctrl+Shift+R)

---

### CMS Field Configuration Issue

**Scenario:** New image field not appearing in CMS or throwing errors

**Steps:**
1. [ ] Check config.yml syntax (use YAML validator)
2. [ ] Verify field name matches exactly (case-sensitive, no typos)
3. [ ] Ensure proper indentation (YAML is whitespace-sensitive)
4. [ ] Check if field marked `required: true` but content doesn't exist (change to `required: false`)
5. [ ] Redeploy CMS:
   ```bash
   # Trigger rebuild by updating config.yml (add comment)
   git add public/admin/config.yml
   git commit -m "Fix CMS field configuration"
   git push
   ```
6. [ ] Wait for Netlify rebuild (check deploy logs)
7. [ ] Test field in CMS admin panel

---

## Known Limitations & Workarounds

### Limitation 1: No Bulk Upload in Decap CMS

**Issue:** Must upload 96 images one-by-one (time-consuming)

**Workaround:**
- Allocate 5-7 full working days for systematic data entry
- Use two content editors in parallel for different collections
- Prepare all alt texts in advance to speed up process
- Use copy-paste for repetitive field values

**Future Improvement:**
- Write custom script to generate JSON files directly (advanced)
- Request bulk upload feature from Decap CMS community

---

### Limitation 2: Image Order in Arrays Not Guaranteed

**Issue:** CMS may not preserve image order in galleries without explicit ordering

**Workaround (if needed):**
Add `displayOrder` field to gallery images:
```yaml
- label: "Gallery Images"
  widget: "list"
  fields:
    - { label: "Display Order", name: "order", widget: "number", default: 1 }
    - { label: "Image", name: "image", widget: "image" }
    - { label: "Alt", name: "alt", widget: "string" }
```

Then sort by `order` in frontend code:
```javascript
const sortedImages = galleryImages.sort((a, b) => a.order - b.order);
```

---

### Limitation 3: No Auto-Optimization

**Issue:** Decap CMS doesn't auto-resize or compress images

**Workaround:**
- **Pre-upload optimization:** Mandatory (covered in Pre-Migration Step 3)
- **Build-time optimization:** Implement in Phase 3 using build tools
- **Future:** Consider Netlify Large Media for automatic transformations

---

### Limitation 4: Cross-Collection Image Reuse Requires Duplication

**Issue:** Same image used on HomePage and GaleriaPage requires separate uploads in each collection

**Workaround:**
- Accept duplication as necessary (CMS limitation)
- Use consistent file names to track duplicates
- Document intentional reuse in image-mapping-table.md

**Note:** This doesn't duplicate the actual file (images stored once in git), only the reference in JSON data.

---

## Post-Migration Tasks (Phase 3 Prep)

Once all images are populated and validated:

### Step 1: Update Component Styling (Phase 3)

**Tasks for Frontend Developer:**
- [ ] Apply Touril design tokens to image containers
  - Set border-radius: 0px on all image wrappers
  - Remove box-shadow from image cards
  - Implement sharp, architectural aesthetic
- [ ] Implement responsive image srcset:
  ```jsx
  <img
    src={image.src}
    srcSet={`
      ${image.src}?w=600 600w,
      ${image.src}?w=1200 1200w,
      ${image.src}?w=2400 2400w
    `}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    alt={image.alt}
    loading="lazy"
  />
  ```
- [ ] Enable lazy loading on all off-screen images
- [ ] Implement lightbox for gallery images
- [ ] Test all image displays on multiple devices

---

### Step 2: SEO Integration

**Tasks:**
- [ ] Add structured data (schema.org ImageObject) for images:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": "https://montedaestrada.com/images/home-hero.jpg",
    "description": "Vista exterior do Monte da Estrada",
    "name": "Monte da Estrada Hero Image"
  }
  ```
- [ ] Update sitemaps to include image URLs
- [ ] Configure robots.txt for image indexing
- [ ] Add Open Graph image tags for social sharing:
  ```html
  <meta property="og:image" content="/images/home-hero.jpg" />
  <meta property="og:image:alt" content="Vista exterior do Monte da Estrada" />
  ```

---

### Step 3: Analytics Setup

**Tasks:**
- [ ] Track image views/interactions in Google Analytics
- [ ] Monitor broken image reports (404s)
- [ ] Track image performance metrics (load times)
- [ ] Set up alerts for image-related errors

---

### Step 4: Content Maintenance Plan

**Ongoing Tasks:**
- [ ] Schedule quarterly image reviews (update seasonal images)
- [ ] Monitor alt text quality (improve as needed)
- [ ] Add new images when property/amenities updated
- [ ] Archive old/unused images to keep media library clean

---

## Timeline Summary

| Day | Phase | Tasks | Duration | Owner |
|-----|-------|-------|----------|-------|
| 1 | Pre-Migration | Verify CMS, optimize images, test upload | 2-3 hours | Content Editor + Dev |
| 1 | Global Settings | Upload logos (4 images) | 30 min | Content Editor |
| 1 | HomePage | Upload hero, welcome, features, CTA (5 images) | 1 hour | Content Editor |
| 2 | QuartosPage | Upload hero, 4 rooms, common areas (19 images) | 2 hours | Content Editor |
| 3 | GaleriaPage | Upload hero + 27 gallery images (28 images) | 2 hours | Content Editor |
| 4 | AtividadesPage | Upload hero + 3 activity sections (11 images) | 1.5 hours | Content Editor |
| 5-6 | RedondezasPage | Upload hero + 12 destinations (26 images) | 3 hours | Content Editor |
| 6 | LocalizacaoPage | Upload hero + 2 context images (3 images) | 30 min | Content Editor |
| 7 | Post-Migration | QA, performance testing, final validation | 2-3 hours | QA Tester + Dev |

**Total Effort:** 12-15 hours of active work spread over 5-7 calendar days

---

## Support & Escalation

**If you encounter issues during migration:**

1. **Technical Issues (CMS errors, upload failures):**
   - Contact: Frontend Developer
   - Escalate to: DevOps if backend/hosting issue

2. **Content Issues (alt text quality, image selection):**
   - Contact: Content Lead
   - Escalate to: Project Manager

3. **Blocking Issues (config.yml errors, widespread breakage):**
   - Contact: Project Lead immediately
   - Do NOT proceed with migration until resolved

**Documentation References:**
- CMS Audit Report: `cms-audit-report.md`
- Image Mapping Table: `image-mapping-table.md`
- Config.yml Location: `public/admin/config.yml`
- Image Inventory: `src/assets/images/` folders

---

**Document End**

**Status:** Ready for execution
**Next Phase:** Phase 3 - Component Styling & Touril Design Token Application

**Document Author:** Claude Code AI Agent
**Version:** 1.0
**Last Updated:** February 15, 2026
