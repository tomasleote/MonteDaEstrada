# Task: Migrate Shared Components & Design System to Monorepo Package

---

## ✅ PROGRESS LOG (Update as steps complete)

### Completed Steps

#### Step 1 — Read All Required Files ✅
**Status:** Complete
All 13 required files read and analyzed.

**Key findings from Step 1:**
- Header is already styled with correct Touril values (gold #FBAB18, dark bg #0A0203)
- Header uses Open Sans font directly in component — this is the source of truth for fonts
- Current `apps/monte-da-estrada/src/styles/_variables.scss` uses Playfair Display/Lato fonts (outdated), but Header component correctly uses Open Sans
- Footer uses CSS module variables and has a clean grid layout
- Shared package `@touril-ecosystem/ui-components` has empty `src/index.js` (comments only)

#### Step 2 — Migrate & Update SCSS Design System ✅
**Status:** Complete
**Date:** 2026-02-17

**Files created in `packages/touril-ecosystem-ui-components/src/styles/`:**
- `_variables.scss` — Full Touril-aligned token set (Open Sans, gold accent #FBAB18, dark bg #0A0203, letter-spacing 1px, line-height 1.4 for headings, 1.71 for body)
- `_mixins.scss` — All existing utility mixins + new Touril-specific mixins (`touril-text`, `touril-h1`, `touril-h2`, `touril-body`, `touril-button-primary`, `touril-card`, `touril-section`, `touril-image`, `touril-fixed-header`)
- `global.scss` — CSS reset + base styles + 1px letter-spacing applied globally to body, headings, paragraphs, links, list items, form inputs

**Critical design decisions:**
- Trusted working Header styling over doc values where they differ
- `$font-family-primary` = `'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` (not Playfair Display)
- `$line-height-tight` = `1.4` (Touril standard, was 1.2 in old app vars)
- `$transition-normal` = `0.3s` (Touril standard, was 0.4s)
- All spacing, color, z-index, breakpoint tokens preserved for backwards compatibility

#### Step 3 — Migrate Header Component ✅
**Status:** Complete
**Date:** 2026-02-17

**Files created in `packages/touril-ecosystem-ui-components/src/components/Header/`:**
- `Header.jsx` — Copied exactly as-is (no logic changes)
- `Header.module.scss` — Copied with SCSS `@use` paths updated:
  - `@use '@/styles/variables' as *` → `@use '../../styles/variables' as *`
  - `@use '@/styles/mixins' as *` → `@use '../../styles/mixins' as *`
- `index.js` — Copied exactly as-is (`export { default } from './Header'`)

**Peer dependencies noted for consumers:**
- `react-router-dom` (uses `<Link>` and `useLocation`)
- `@fortawesome/react-fontawesome` + `@fortawesome/free-brands-svg-icons` (faWhatsapp icon)
- `prop-types`

---

### Remaining Steps

#### Step 4 — Migrate Footer Component ⏳ NEXT
Copy `apps/monte-da-estrada/src/components/Footer/` → `packages/touril-ecosystem-ui-components/src/components/Footer/`
- Update `@use` paths in `Footer.module.scss` same as Header (relative paths to shared styles)
- Keep Footer.jsx and index.js unchanged

#### Step 5 — Update Shared Package Exports ⏳
Update `packages/touril-ecosystem-ui-components/src/index.js`:
```js
export { default as Header } from './components/Header';
export { default as Footer } from './components/Footer';
```

#### Step 6 — Update monte-da-estrada App ⏳
1. Delete `apps/monte-da-estrada/src/components/Header/` folder
2. Delete `apps/monte-da-estrada/src/components/Footer/` folder
3. Update `apps/monte-da-estrada/src/App.jsx` imports to: `import { Header, Footer } from '@touril-ecosystem/ui-components'`
4. Add `"@touril-ecosystem/ui-components": "*"` to `apps/monte-da-estrada/package.json` dependencies
5. Update `apps/monte-da-estrada/src/styles/_variables.scss` and `_mixins.scss` to `@use` the shared package styles (or keep as-is if they already work)
6. Run `npm run dev` inside `apps/monte-da-estrada/` to verify no errors

---



## Context

This project is a **monorepo** called `touril-ecosystem` that hosts multiple websites sharing a common component library. The structure is:

```
MonteDaEstrada/                                   ← monorepo root
├── apps/
│   ├── monte-da-estrada/                         ← main website (React + Vite)
│   └── papa-leguas/                              ← future website (empty placeholder)
├── packages/
│   └── touril-ecosystem-ui-components/           ← SHARED LIBRARY (target of this task)
│       └── src/
│           ├── components/                       ← shared components go here
│           ├── styles/                           ← shared SCSS design tokens go here
│           └── index.js                         ← barrel export
├── docs/
│   ├── design-system.md                         ← Touril visual audit (READ THIS)
│   └── design-tokens-mapping.md                 ← Token migration guide (READ THIS)
└── .gitignore
```

The shared library package name is `@touril-ecosystem/ui-components` (see `packages/touril-ecosystem-ui-components/package.json`).

---

## Your Task

Migrate the **Header** and **Footer** components from the Monte da Estrada app into the shared library, and migrate and update the **global SCSS design system** (variables + mixins) into the shared library's styles folder — following the Touril design system documented in `docs/design-system.md` and `docs/design-tokens-mapping.md`.

---

## Step 1 — Read These Files First

Before touching any code, read all of these:

1. `docs/design-system.md` — visual audit of https://herdadedotouril.com/ (typography, colors, spacing, component patterns)
2. `docs/design-tokens-mapping.md` — maps current SCSS tokens to Touril values, specifies which to keep/change/add
3. `apps/monte-da-estrada/src/components/Header/Header.jsx`
4. `apps/monte-da-estrada/src/components/Header/Header.module.scss`
5. `apps/monte-da-estrada/src/components/Header/index.js`
6. `apps/monte-da-estrada/src/components/Footer/Footer.jsx`
7. `apps/monte-da-estrada/src/components/Footer/Footer.module.scss`
8. `apps/monte-da-estrada/src/components/Footer/index.js`
9. `apps/monte-da-estrada/src/styles/_variables.scss`
10. `apps/monte-da-estrada/src/styles/_mixins.scss`
11. `apps/monte-da-estrada/src/styles/global.scss`
12. `packages/touril-ecosystem-ui-components/package.json`
13. `packages/touril-ecosystem-ui-components/src/index.js`

---

## Step 2 — Migrate & Update SCSS Design System

**Target:** `packages/touril-ecosystem-ui-components/src/styles/`

Create these files in the shared styles folder, updated to reflect Touril design tokens (from `docs/design-tokens-mapping.md`):

### `_variables.scss`
Apply all token updates from `docs/design-tokens-mapping.md`. Key changes:
- **Colors:** Primary `#FBAB18` (Touril gold), bg-dark `#0A0203`, text-primary `#0A0203`, bg-primary `#F8F8F8`
- **Typography:** `'Open Sans', sans-serif` for all fonts; add `$letter-spacing-touril: 1px`
- **Line height tight:** `1.4` (was 1.2)
- **Border radius:** Add `$border-radius-sharp: 0px` for Touril sharp aesthetic
- **Shadows:** Preserve existing tokens but add `$shadow-none: none`
- **Spacing:** Add `$spacing-section-touril: 50px`
- Keep ALL existing variable names for backward compatibility — only update values where the mapping doc says to

### `_mixins.scss`
Copy existing mixins, then add the new Touril-specific mixins from section 7 of `docs/design-tokens-mapping.md`:
- `touril-text`, `touril-h1`, `touril-h2`, `touril-body`
- `touril-button-primary`
- `touril-card`
- `touril-section`
- `touril-image`

### `global.scss`
Copy the existing global.scss, updating it to `@use` the new shared styles paths and apply Touril base styles (letter-spacing on body, font-family, etc.)

---

## Step 3 — Migrate Header Component

**Source:** `apps/monte-da-estrada/src/components/Header/`
**Target:** `packages/touril-ecosystem-ui-components/src/components/Header/`

Copy the three files (Header.jsx, Header.module.scss, index.js) to the shared package, with these adjustments:

- Update SCSS `@use` imports to point to `../../styles/variables` and `../../styles/mixins` (relative paths within the package)
- The component itself (JSX + props) should remain **unchanged** — it's already well-structured with props for brandName, navigationItems, phone, onReservasClick, etc.
- Ensure it has NO hard dependency on react-router-dom's `<Link>` if possible (or document that as a peer dependency requirement) — if it uses Link, that's fine, just note it

---

## Step 4 — Migrate Footer Component

**Source:** `apps/monte-da-estrada/src/components/Footer/`
**Target:** `packages/touril-ecosystem-ui-components/src/components/Footer/`

Same approach as Header:
- Copy the three files
- Update SCSS `@use` import paths to use `../../styles/variables` and `../../styles/mixins`
- Keep component logic unchanged

---

## Step 5 — Update Shared Package Exports

**File:** `packages/touril-ecosystem-ui-components/src/index.js`

Export both components:
```js
export { default as Header } from './components/Header';
export { default as Footer } from './components/Footer';
```

---

## Step 6 — Update `monte-da-estrada` App to Import from Shared Package

After migrating:

1. **Delete** the original component folders from `apps/monte-da-estrada/src/components/Header/` and `apps/monte-da-estrada/src/components/Footer/`
2. **Update** `apps/monte-da-estrada/src/App.jsx` to import from the shared package:
   ```js
   import { Header, Footer } from '@touril-ecosystem/ui-components';
   ```
3. **Update** `apps/monte-da-estrada/package.json` to add the shared package as a workspace dependency:
   ```json
   "@touril-ecosystem/ui-components": "*"
   ```
4. **Update** `apps/monte-da-estrada/src/styles/_variables.scss` and `_mixins.scss` to simply re-export or `@use` the shared package styles, so the app's local styles stay in sync

---

## Constraints & Rules

- **SCSS only** — no Tailwind, no inline styles, no CSS-in-JS
- **CSS Modules** (`.module.scss`) for component-scoped styles
- **Variables from `_variables.scss`** — never hardcode colors, fonts, or spacing values
- **Functional React components + hooks** only — no class components
- **PropTypes** for all component props
- **Mobile-first responsive design**
- **Do NOT break the existing Header props interface** — the component in `apps/monte-da-estrada/src/App.jsx` passes: `brandName`, `navigationItems`, `sticky`, `onReservasClick`, `currentLanguage`, `onLanguageChange`, `phone`
- After this task, `npm run dev` inside `apps/monte-da-estrada/` must still work

---

## Key Design Tokens (Summary from Audit)

From `docs/design-system.md` (audit of https://herdadedotouril.com/):

| Token | Value | Notes |
|-------|-------|-------|
| Primary accent | `#FBAB18` | Touril gold |
| Background dark | `#0A0203` | Header/footer bg |
| Text primary | `#0A0203` | Almost black |
| Background light | `#F8F8F8` | Warm off-white |
| Font family | `'Open Sans', sans-serif` | All text |
| Letter spacing | `1px` | Applied globally |
| H1 size | `2rem (32px)` | Weight 300 |
| H2 size | `1.75rem (28px)` | Weight 300 or 700 |
| Body size | `0.875rem (14px)` | Weight 400 |
| Line height (headings) | `1.4` | |
| Border radius | `0px` | Sharp aesthetic |
| Shadows | `none` | Flat design |
| Section padding | `50px` top/bottom | |

---

## Verification

When done, verify:
1. `packages/touril-ecosystem-ui-components/src/components/` contains `Header/` and `Footer/`
2. `packages/touril-ecosystem-ui-components/src/styles/` contains `_variables.scss`, `_mixins.scss`, `global.scss`
3. `packages/touril-ecosystem-ui-components/src/index.js` exports both components
4. `apps/monte-da-estrada/src/App.jsx` imports from `@touril-ecosystem/ui-components`
5. The original `Header/` and `Footer/` folders are removed from `apps/monte-da-estrada/src/components/`
6. Run `cd apps/monte-da-estrada && npm run dev` — site must start with no errors
