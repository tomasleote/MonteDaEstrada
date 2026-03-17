# CMS Content Management Guide

## Overview

Monte da Estrada uses a **hybrid CMS architecture** that combines the best of two approaches:

- **Text Content**: Managed through Decap CMS (formerly Netlify CMS), stored in JSON files
- **Images**: Performance-optimized through barrel files, with references in JSON for CMS context

This guide explains how to access and edit content through the CMS admin panel.

## Accessing the CMS

### Live Admin Panel
When the website is deployed to Netlify:
1. Visit: `https://montedasestrada.pt/admin` (or your live domain + `/admin`)
2. Click "Login with Netlify"
3. Authenticate using your Netlify Identity credentials

### Local Development
When running locally:
1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:5173/admin`
3. Authentication is disabled in development for easier testing

## Collections Overview

The CMS manages 7 main content collections:

### 1. **Site Settings** (`site-settings.json`)
Global website configuration including:
- Site logo and alt text
- Partner logos (for footer or partnership section)
- Favicon
- Default meta image for social sharing

**How to Edit:**
1. In CMS admin, find "Settings" collection
2. Click "Site Settings"
3. Update logo paths and descriptions
4. Publish changes (auto-commits to Git)

### 2. **Home Page** (`home.json`)
Main landing page content:
- Hero section with title, subtitle, and image
- Welcome section with property description
- Highlight cards (4 key features)
- Practical information (check-in/out times, policies, amenities)
- Feature image gallery

**How to Edit:**
1. Navigate to "Collections" → "Home"
2. Edit hero section image and text
3. Modify welcome description paragraphs
4. Update highlights with new features
5. Edit practical information
6. Add feature images in `featureImages` array

### 3. **Quartos (Rooms)** (`quartos.json`)
Accommodation details:
- Room descriptions and capacities
- Room features and amenities
- Room images
- Pricing information by season
- Facility list

**How to Edit:**
1. Navigate to "Collections" → "Quartos"
2. Update room descriptions, features, and images
3. Modify pricing information and policies
4. Add new room types if needed
5. Update facility list as amenities change

### 4. **Atividades (Activities)** (`atividades.json`)
Activities and experiences available:
- 6 activity categories (Beaches, Hiking, Culture, Gastronomy, Nature, Sports)
- Activity descriptions and highlights
- On-property amenities
- Related images

**How to Edit:**
1. Navigate to "Collections" → "Atividades"
2. Update activity descriptions and highlights
3. Modify amenities list
4. Add new activity categories or update existing ones

### 5. **Redondezas (Surrounding Areas)** (`redondezas.json`)
Regional information:
- Region overview and highlights
- Beach details (distance, features)
- Town information (attractions, distances)
- Restaurant recommendations
- Regional festivals and events
- Tourist attractions

**How to Edit:**
1. Navigate to "Collections" → "Redondezas"
2. Update region description
3. Add/edit beach information
4. Modify town attractions
5. Update restaurant list (specialties)
6. Add seasonal events
7. Update attraction list

### 6. **Localização (Location)** (`localizacao.json`)
Directions and accessibility:
- Full address and coordinates
- Directions from Lisboa, Faro, Porto
- Public transport options
- Parking information
- Distance to key locations
- Useful tips

**How to Edit:**
1. Navigate to "Collections" → "Localização"
2. Update address and coordinates if changed
3. Modify driving directions as needed
4. Update public transport information
5. Add/remove helpful tips
6. Maintain distance information

### 7. **Galeria (Gallery)** (`galeria.json`)
Photo gallery organization:
- Hero image for gallery page
- 5 categories: Exterior, Rooms, Common Areas, Landscape
- Images and captions for each category

**How to Edit:**
1. Navigate to "Collections" → "Galeria"
2. Update category descriptions
3. Modify image alt text and captions
4. Note: Image paths reference actual files in the barrel files

## Image Management

### Understanding the Hybrid Approach

**Why we use barrel files for images:**
- Better performance (tree-shaking, code splitting)
- Optimized bundling by Vite
- Type-safe image imports in React components
- Faster page loads

**How it works:**
1. Images are stored in `/src/assets/images/[category]/`
2. Each category folder has an `index.js` barrel file that exports all images
3. JSON files contain image paths for CMS reference
4. React components import images directly from barrel files

### Image Categories

- **home/** - Homepage images (13 total)
- **quartos/** - Room images (19 total)
- **galeria/** - Gallery display images (5 total)
- **atividades/** - Activity/festival images (12 total)
- **redondezas/** - Regional attraction images (39 total)
- **exterior/** - Amenity and exterior images (13 total)
- **logos/** - Logo assets (4 total)

### Image Fields in CMS

Some collections have image fields that display in the CMS editor. These fields:
- Allow you to see which image is currently assigned
- Provide descriptions and alt text for SEO
- Help you track which images are used where

**Note:** These are reference fields, not upload fields. The actual image management happens in the code through barrel files.

### Adding New Images

If you need to add new images to the website:

1. **Add the image file** to the appropriate category folder:
   ```
   src/assets/images/[category]/[descriptive-name].jpg
   ```

2. **Update the barrel file** (`src/assets/images/[category]/index.js`):
   - Import the new image at the top
   - Add it to the export object with metadata (alt text, title)
   - Follow naming conventions from existing exports

3. **Update the JSON file** if the image should be visible in CMS:
   - Add the path: `/src/assets/images/[category]/[filename].jpg`
   - Include alt text (10-150 characters)
   - Update the CMS

4. **Request a redeploy** if deployed to production

Example:
```javascript
// In src/assets/images/home/index.js
import homeNewImage from './home-new-image.jpg';

export const homeImages = {
  // ... existing exports
  newImage: {
    src: homeNewImage,
    alt: 'Description of the new image (10-150 chars)',
    title: 'Display Title'
  }
};
```

## Content Workflow

### Publishing Changes

1. **Make edits** in the CMS admin panel
2. **Click "Publish"** (or "Save" in draft mode)
3. **Automatic Git commit** - The CMS automatically commits your changes
4. **Deployment** - On Netlify, changes auto-deploy when Git detects new commits

### Rollback (if needed)

If you need to revert changes:
1. Go to the GitHub repository
2. View commit history
3. Revert the problematic commit
4. Netlify will automatically redeploy with the previous version

### Scheduling (Not supported in basic setup)

The current CMS setup doesn't support scheduled publishing. If you need this:
- Edit content offline in JSON files
- Create a Git branch for planned changes
- Merge when you're ready to publish

## Content Guidelines

### Text Content Standards

- **Descriptions**: Keep them concise and engaging (2-3 sentences typically)
- **Lists**: Use bullet points for features and highlights
- **Prices**: Always note that prices vary by season
- **Distances**: Include both kilometers and driving time when available
- **Portuguese language**: Maintain consistent terminology (e.g., "Alentejo litoral", "turismo rural")

### Alt Text Requirements

All images must have descriptive alt text:
- **Minimum**: 10 characters
- **Maximum**: 150 characters
- **Best practice**: Describe what you see, not "image of..." or generic descriptions
- **Example**: "Quarto duplo com cama de casal e vista para o campo" (not "Image of a room")

### Image Naming

When adding new images, follow this pattern:
```
[category]-[description]-[number].jpg

Examples:
home-hero-monte-exterior.jpg
quartos-room-01.jpg
atividades-festival-sudoeste-01.jpg
redondezas-zambujeira-beach.jpg
```

## Troubleshooting

### I can't log in to the CMS

- **Check URL**: Make sure you're using the correct domain with `/admin` at the end
- **Check Netlify Identity**: In Netlify dashboard → Settings → Identity, ensure Netlify Identity is enabled
- **Invite yourself**: If you're a new user, the site owner may need to invite you via Netlify Identity

### Changes aren't showing up on the website

- **Check Git**: Visit the GitHub repository and verify your commit appears
- **Check Netlify**: Go to Netlify dashboard → Deploys and check if the latest deployment succeeded
- **Clear cache**: Your browser may have cached the old version - do a hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)
- **Wait for deployment**: Netlify builds take 1-2 minutes; check the deploy log for errors

### An image field shows the wrong image

- The CMS might be showing a cached reference
- **Solution**: Refresh the CMS page (Cmd+R or Ctrl+R) and verify the image path in the JSON file

### I accidentally deleted content

- **Don't panic!** Check the GitHub repository history
- Go to GitHub → history of the JSON file that was modified
- Click "Revert this commit" on the problematic commit
- This will create a new commit that restores the previous state

## Advanced: Editing JSON Directly

If you prefer working directly with JSON files:

1. Navigate to the GitHub repository
2. Find the JSON file in `/src/data/[filename].json`
3. Click the edit icon (pencil)
4. Make changes directly in the browser
5. Click "Commit changes" at the bottom

This bypasses the CMS interface but has the same result.

## Support & Questions

For technical questions or issues:
1. Check the [IMAGE-ARCHITECTURE.md](IMAGE-ARCHITECTURE.md) for image management details
2. Review the [IMAGE-MANIFEST.md](IMAGE-MANIFEST.md) for a complete image inventory
3. Contact the development team if something isn't working as expected

---

**Last Updated**: February 2026
**CMS Version**: Decap CMS (formerly Netlify CMS)
**Deployment**: Netlify with automatic Git integration
