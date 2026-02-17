# Image Architecture & Management

## Overview

Monte da Estrada uses a **hybrid image management system** that combines barrel files (for performance) with JSON references (for CMS flexibility).

```
┌─────────────────────────────────────┐
│   Decap CMS (Content Editor)        │
│   JSON Files for text content       │
└──────────────┬──────────────────────┘
               │ References to images
               ▼
┌─────────────────────────────────────┐
│   JSON Data Files                   │
│   (home.json, quartos.json, etc)    │
│   Contains image paths for context  │
└──────────────┬──────────────────────┘
               │ Points to files in
               ▼
┌─────────────────────────────────────┐
│   Barrel Files (index.js)           │
│   Actual image imports in code      │
└──────────────┬──────────────────────┘
               │ Imports from
               ▼
┌─────────────────────────────────────┐
│   Image Files (.jpg)                │
│   /src/assets/images/[category]/    │
│   105 optimized images              │
└─────────────────────────────────────┘
```

## Why Barrel Files?

Barrel files (the `index.js` in each image category folder) are a best practice for image management in React because they provide:

### 1. **Performance Optimization**
- Vite can tree-shake unused images
- Better code splitting and lazy loading
- Smaller initial bundle size
- Images are only loaded when imported

### 2. **Type Safety & Developer Experience**
- IDE autocomplete when importing images
- Reduces runtime errors
- Clear exports make it obvious what images are available
- Centralized metadata (alt text, titles)

### 3. **Metadata Management**
- Each image includes structured metadata
- Alt text for accessibility
- Titles for tooltips and display
- Categories for organization
- Easy to refactor and rename

### 4. **Build Optimization**
- Vite optimizes images based on usage patterns
- Potential for responsive image generation (srcsets)
- Cache busting handled automatically
- File hashing for production builds

### 5. **Decoupling**
- Images can be updated independently from JSON
- Easy to add new images without touching CMS
- React components aren't tightly coupled to JSON paths

## Directory Structure

```
src/assets/images/
├── home/                          # 13 images
│   ├── home-hero-monte-exterior.jpg
│   ├── home-property-view-01.jpg
│   ├── ...
│   └── index.js                   # Barrel file
├── quartos/                       # 19 images
│   ├── quartos-hero-rooms-overview.jpg
│   ├── quartos-room-01.jpg
│   ├── ...
│   └── index.js
├── galeria/                       # 5 images
│   ├── galeria-hero-acessos.jpg
│   ├── DSC_0946.jpg
│   ├── ...
│   └── index.js
├── atividades/                    # 12 images
│   ├── atividades-hero-activities.jpg
│   ├── atividades-festival-sudoeste-01.jpg
│   ├── ...
│   └── index.js
├── redondezas/                    # 39 images
│   ├── redondezas-hero-region.jpg
│   ├── redondezas-aljezur-01.jpg
│   ├── ...
│   └── index.js
├── exterior/                      # 13 images
│   ├── exterior-hero-amenities.jpg
│   ├── exterior-amenity-01.jpg
│   ├── ...
│   └── index.js
└── logos/                         # 4 images (no barrel file)
    ├── logo-monte-estrada-text.jpg
    ├── logo-adl-partner.jpg
    ├── ...
    └── (not exported via barrel)

Total: 105 images
```

## Barrel File Structure

### Example: Home Images Barrel File
```javascript
/**
 * Home page image exports
 * Centralized image imports for the HomePage component
 */

import homeHeroMonteExterior from './home-hero-monte-exterior.jpg';
import homePropertyView01 from './home-property-view-01.jpg';
// ... more imports

export const homeImages = {
  hero: {
    src: homeHeroMonteExterior,
    alt: 'Descriptive alt text for accessibility',
    title: 'Display title for UI'
  },
  gallery: [
    {
      src: homePropertyView01,
      alt: 'Alt text for first image',
      title: 'Gallery Image 1'
    },
    // ... more images
  ]
};

export default homeImages;
```

### Metadata Fields

Each image object should include:

- **src** (required): Imported image variable
- **alt** (required): 10-150 character description for accessibility and SEO
- **title** (required): Display name for UI elements
- **category** (optional): For organizing related images
- **amenityType** (optional): For amenity images (pool, garden, etc)
- **location** (optional): For location-specific images
- **distance** (optional): For regional attractions

## Relationship: JSON vs Barrel Files

### How They Work Together

**JSON Files** (`src/data/*.json`):
- Contain page content and text
- Have optional image path references
- Used by Decap CMS for content editing
- Example: `"image": "/src/assets/images/home/home-hero-monte-exterior.jpg"`

**Barrel Files** (`src/assets/images/*/index.js`):
- Contain the actual image imports
- Used by React components
- Example: `import { homeImages } from '@/assets/images/home'`

### Data Flow

```
JSON File (CMS editable)
└─> Contains image path reference
    └─> For CMS context and documentation
        └─> Not directly used by React

Barrel File (Code managed)
└─> Imports actual image file
    └─> Exports with metadata
        └─> Used by React components
            └─> Rendered in browser
```

### Why Dual References?

1. **CMS Context**: Content editors can see which images should be used where
2. **Flexibility**: Images can be changed in code without CMS knowing
3. **Performance**: Components use barrel imports (optimized)
4. **Documentation**: JSON serves as content reference

## Adding New Images

### Step-by-Step Process

#### 1. Add the Image File
```bash
# Copy or move image to appropriate category folder
# File should be optimized: ~2-3MB max, JPEG preferred

src/assets/images/home/home-new-image.jpg
```

#### 2. Update Barrel File
```javascript
// src/assets/images/home/index.js

import homeNewImage from './home-new-image.jpg';

export const homeImages = {
  // ... existing exports
  newImage: {
    src: homeNewImage,
    alt: 'Descriptive text of the new image',
    title: 'New Image Display Name'
  }
};
```

#### 3. Update JSON File (Optional)
```json
// src/data/home.json
{
  "featureImages": [
    {
      "src": "/src/assets/images/home/home-new-image.jpg",
      "alt": "Descriptive text matching barrel file",
      "title": "New Image Display Name"
    }
  ]
}
```

#### 4. Use in React Component
```javascript
import { homeImages } from '@/assets/images/home';

export function HomePage() {
  return (
    <img
      src={homeImages.newImage.src}
      alt={homeImages.newImage.alt}
      title={homeImages.newImage.title}
    />
  );
}
```

## Image Naming Conventions

### Pattern
```
[category]-[description]-[number].jpg
```

### Examples
```
home-hero-monte-exterior.jpg          # Hero/hero images
home-property-view-01.jpg             # Numbered series
quartos-hero-rooms-overview.jpg       # Category hero
quartos-room-01.jpg                   # Category items
quartos-common-area-01.jpg            # Subcategory items
atividades-festival-sudoeste-01.jpg   # Specific events
redondezas-zambujeira-beach.jpg       # Named locations
exterior-amenity-01.jpg               # Amenity types
```

### Naming Rules
- Use kebab-case (hyphens, no spaces)
- Start with category name
- Be descriptive (not generic like "image-1.jpg")
- Use numbers for series (01, 02, not 1, 2 for consistency)
- Avoid special characters

## Image Optimization Guidelines

### File Size Requirements
- Hero images: 2-3 MB max (typically 1920x1080 to 2400x1600px)
- Gallery images: 2-2.5 MB max (typically 1200x800 to 1600x1200px)
- Logos: < 500 KB (vector preferred, PNG for transparency)

### Optimization Checklist
1. **Compress JPEG to 80-85% quality**
   - Use ImageMagick: `convert input.jpg -quality 85 output.jpg`
   - Or online tools like TinyJPG

2. **Ensure appropriate dimensions**
   - Hero: 2400px wide (for 2x DPI screens)
   - Gallery: 1200px wide (for standard screens)
   - Don't upscale; downscale if too large

3. **Verify format**
   - Photographs: JPEG
   - Graphics with transparency: PNG
   - Icons: SVG preferred (not currently used)

4. **Remove metadata**
   - Strip EXIF data to reduce file size
   - Use: `exiftool -all= input.jpg`

### Performance Tips
- Update `IMAGE-MANIFEST.md` with new image info
- Test locally: `npm run build` and check bundle size
- Monitor Netlify deploy logs for image warnings

## Refactoring & Updates

### Renaming Images
1. **Update barrel file**:
   - Change import name
   - Update export name and key
   - Update alt text if needed

2. **Update component imports**:
   - Components automatically get new names via barrel
   - No change needed if using same barrel structure

3. **Update JSON reference** (if CMS uses it):
   - Change path to new filename
   - Update alt text if changed

### Replacing Images
1. Delete old image file
2. Add new image file with new name
3. Update barrel file (old entry removed, new entry added)
4. Update all references in components
5. Update JSON if needed

### Adding Image Categories
1. Create new folder: `src/assets/images/[category]/`
2. Create `index.js` barrel file with pattern from existing categories
3. Add images to folder
4. Create JSON data file in `src/data/[category].json`
5. Update CMS config if new page/collection needed

## Image Delivery & Caching

### Local Development
- Images served directly from disk
- Hot reload works for image changes
- No caching to worry about

### Production (Netlify)
- Images included in build output
- Vite handles file hashing for cache busting
- CDN caches unchanged files indefinitely
- Changed images get new filenames automatically

### Browser Caching
- Images cached indefinitely (Vite handles versioning)
- No manual cache busting needed
- Optimal for performance

## Accessibility Considerations

### Alt Text Best Practices
- **Descriptive**: Explain what's in the image
- **Not generic**: Avoid "image", "photo", or "picture"
- **Concise**: 10-150 characters ideal
- **Specific**: Include relevant details
- **Language**: Portuguese for Portuguese content

**Good Examples**:
- "Quarto duplo com cama de casal e vista para o campo"
- "Exterior do Monte da Estrada com paisagem alentejana ao fundo"
- "Piscina de água salgada rodeada de zona de relaxamento"

**Bad Examples**:
- "Imagem de um quarto"
- "Photo"
- "Room"

### Screen Reader Optimization
- Always include alt text
- Don't use title attribute for duplicate info
- Use semantic HTML with images
- Consider ARIA labels for complex layouts

## Migration Path: Future Enhancements

### If full CMS image management is desired:
1. Configure Netlify Media Library in CMS config
2. Update components to read images from JSON (instead of barrel imports)
3. Remove barrel file structure (optional)
4. Implement image transformation pipeline (optional)

**Trade-offs**:
- Lose performance benefits of tree-shaking
- Gain easier image uploads via CMS
- Require media optimization pipeline

Current setup is recommended for maintaining performance.

## Troubleshooting

### Image not showing up
1. **Check barrel file**: Is it imported and exported correctly?
2. **Check path**: Does image file exist at the path?
3. **Check component**: Is component using correct import?
4. **Clear cache**: `npm run build && npm run preview`

### Image looks pixelated
1. **Check dimensions**: Is source image large enough?
2. **Check format**: Should be JPEG for photos, PNG for graphics
3. **Check quality**: Try re-optimizing source file

### Bundle size too large
1. **Check file sizes**: Are images optimized to spec?
2. **Check barrel exports**: Are unused images being imported?
3. **Consider lazy loading**: Implement with Intersection Observer

---

**Last Updated**: February 2026
**Total Images**: 105
**Categories**: 7 (home, quartos, galeria, atividades, redondezas, exterior, logos)
**Total Size**: ~90 MB (all images combined)
**Optimized for**: Vite + React + Netlify deployment
