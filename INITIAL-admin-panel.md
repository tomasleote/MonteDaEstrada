## FEATURE:

Build a **production-ready Admin Panel** for Monte da Estrada website that allows non-technical users to edit website content (text, images, links) and have those changes persist across all devices and browsers.

### Current Problem:
The existing admin panel uses localStorage, which only saves changes locally in the browser. When the website is accessed from a different device or browser, the changes are not visible. This makes it unusable for a production website.

### Core Requirements:

1. **Backend Content Management**:
   - Content must be stored on a server/backend (NOT localStorage)
   - Changes should be saved to files or a database
   - When website loads, it should fetch content from the server
   - Changes must persist across all devices and sessions

2. **Admin Authentication**:
   - Secure login system (username/password)
   - Protected admin routes (only authenticated users can access)
   - Session management with JWT or similar
   - Logout functionality

3. **Content Editing Capabilities**:
   - Edit ALL text content on all 9 pages
   - Upload and replace images
   - Edit hyperlinks and contact information
   - Edit pricing tables
   - WYSIWYG editor for formatted text (headings, paragraphs, lists)

4. **Technical Architecture Options** (Research & Recommend):

   **Option A: Static Site with JSON + Backend API**
   - Store content in JSON files
   - Build a simple Node.js/Express API to read/write JSON files
   - React app fetches content from API on load
   - Admin panel makes API calls to update JSON files
   - Requires: Backend server (Node.js, Express, file system access)

   **Option B: Headless CMS Integration**
   - Integrate with a headless CMS (Strapi, Sanity, Contentful, etc.)
   - Content stored in CMS database
   - React app fetches content via CMS API
   - Built-in admin interface from CMS
   - Requires: CMS hosting (many have free tiers)

   **Option C: Git-based CMS (Netlify CMS / Decap CMS)**
   - Content stored as markdown/JSON in Git repository
   - Admin panel commits changes directly to Git
   - Website rebuilds automatically on changes
   - Works great with static hosting (Netlify, Vercel)
   - Requires: Git repository, static hosting with build hooks

   **Option D: Firebase/Supabase Backend**
   - Content stored in Firebase Realtime Database or Supabase
   - Built-in authentication
   - Real-time content updates
   - Admin panel reads/writes to database
   - Requires: Firebase/Supabase project (free tier available)

5. **Deployment Considerations**:
   - Solution must work on shared hosting OR static hosting platforms
   - Consider cost (free or minimal cost preferred)
   - Consider maintenance complexity
   - Consider your dad's technical ability to host/maintain

6. **Content Structure**:
   The website has 9 pages with the following editable content:
   - **Home**: Hero image, title, subtitle, property highlights (3-4 items)
   - **Instalações**: Room descriptions, capacity, photo galleries
   - **Comodidades**: List of amenities with descriptions
   - **Informações**: Check-in/out times, house rules, policies
   - **Acessos**: GPS coordinates, directions text, map settings
   - **A Região**: Local attractions descriptions, external links
   - **Atividades**: Activity descriptions and images
   - **Festividades**: Event listings with dates and descriptions
   - **Preços**: Pricing tables, seasonal rates, contact form settings

7. **User Experience Requirements**:
   - Simple, intuitive admin interface (your dad should be able to use it)
   - Clear labels for what each field controls
   - Preview changes before publishing (optional but nice)
   - Confirmation before saving/publishing
   - Image upload with drag-and-drop
   - Responsive admin panel (works on tablet/mobile)

## EXAMPLES:

Reference the existing admin panel structure in:
- `monte-da-estrada/src/pages/AdminPanel/` - Current localStorage implementation
- `monte-da-estrada/src/context/ContentContext.jsx` - Current content management approach

**These files show the UI patterns and content structure but need to be completely rebuilt with a proper backend.**

## DOCUMENTATION:

### Research Areas:
1. **Backend Options for Small Websites**:
   - Node.js + Express for simple REST API
   - Serverless functions (Netlify Functions, Vercel Serverless)
   - Firebase/Supabase documentation

2. **Headless CMS Options**:
   - Strapi: https://strapi.io/
   - Sanity: https://www.sanity.io/
   - Decap CMS (formerly Netlify CMS): https://decapcms.org/
   - Contentful: https://www.contentful.com/

3. **Authentication Solutions**:
   - JWT authentication patterns
   - Firebase Authentication
   - Simple session-based auth with Express

4. **File Storage Solutions**:
   - Cloudinary for image hosting
   - AWS S3 for file storage
   - Netlify Large Media
   - Firebase Storage

5. **Deployment Platforms**:
   - Netlify: https://www.netlify.com/
   - Vercel: https://vercel.com/
   - Shared hosting with Node.js support
   - Firebase Hosting

## OTHER CONSIDERATIONS:

### Critical Research Questions:
1. **What is the simplest, most cost-effective solution?**
   - Consider your dad's technical ability
   - Consider ongoing maintenance requirements
   - Consider hosting costs

2. **What hosting environment will be used?**
   - Shared hosting (cPanel)?
   - Static hosting (Netlify/Vercel)?
   - VPS with full control?
   - This determines which backend option is feasible

3. **Who will maintain the backend?**
   - If it's just your dad, simpler is better
   - If you'll maintain it, more complex solutions are okay

4. **How often will content change?**
   - Frequent changes → headless CMS might be better
   - Rare changes → simple JSON + API might suffice

### Recommended Research Focus:
Based on typical guest house website needs, the plan should research and compare:

1. **Decap CMS (Git-based)** - Likely the best fit because:
   - Works with static hosting (no backend server needed)
   - Content stored in Git (version control built-in)
   - Free and open source
   - Works with Netlify/Vercel for free hosting
   - Changes trigger automatic rebuilds

2. **Firebase Backend** - Good alternative because:
   - No server maintenance
   - Built-in authentication
   - Generous free tier
   - Real-time updates
   - Easy image storage

3. **Simple Node.js API** - If you have server access:
   - Full control
   - Store content as JSON files
   - Simple authentication
   - Can host on shared hosting with Node.js support

### Implementation Phases:
The plan should break down implementation into:

**Phase 1: Backend Setup**
- Choose and set up backend solution
- Create content storage structure
- Set up authentication system
- Create API endpoints (if applicable)

**Phase 2: Content Migration**
- Extract all current hardcoded content
- Structure content into JSON/database format
- Create content schema/types

**Phase 3: Frontend Integration**
- Update pages to fetch content from backend
- Add loading states
- Handle errors gracefully
- Update ContentContext to use backend instead of localStorage

**Phase 4: Admin Panel Rebuild**
- Rebuild admin authentication
- Create content editing forms
- Add image upload functionality
- Add WYSIWYG text editor
- Add save/publish functionality

**Phase 5: Testing & Deployment**
- Test content editing workflow
- Test across devices
- Set up production deployment
- Create user documentation for your dad

### Success Criteria:
- ✅ Admin can log in securely from any device
- ✅ Admin can edit all text content on all pages
- ✅ Admin can upload and replace images
- ✅ Changes persist across all devices and browsers
- ✅ Website updates immediately (or with a rebuild) after changes
- ✅ No programming knowledge required to make content changes
- ✅ Works on production hosting environment
- ✅ Minimal to zero ongoing costs
- ✅ Simple enough for your dad to maintain

### Potential Gotchas:
- **CORS issues** when API is on different domain
- **Image file sizes** - need compression/optimization before upload
- **Authentication security** - must be properly secured for production
- **Content validation** - prevent admin from breaking the site with invalid content
- **Backup strategy** - need way to recover if admin makes mistakes
- **Build time** - if using static site generator, rebuilds take time
- **Rate limits** - some free tier services have API rate limits

### Budget Constraints:
- Prefer free solutions (Firebase free tier, Netlify/Vercel free tier, Decap CMS)
- If costs required, should be minimal (<$10/month)
- Consider what's included in existing hosting if applicable

---

**Note to planning agent**: Please thoroughly research the three recommended options (Decap CMS, Firebase, Node.js API) and provide a clear recommendation based on ease of use, cost, and suitability for a small guest house website. The plan should be detailed enough that implementation can follow step-by-step without additional architecture decisions.
