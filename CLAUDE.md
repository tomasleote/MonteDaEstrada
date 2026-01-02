### 🔄 Project Awareness & Context
- **Always read `PLANNING.md`** at the start of a new conversation to understand the project's architecture, goals, style, and constraints.
- **Check `TASK.md`** before starting a new task. If the task isn't listed, add it with a brief description and today's date.
- **Use consistent naming conventions, file structure, and architecture patterns** as described in `PLANNING.md`.
- **This is a React website project** - all code should follow React best practices and modern JavaScript/ES6+ standards.

### 🧱 Code Structure & Modularity
- **Never create a file longer than 500 lines of code.** If a file approaches this limit, refactor by splitting it into smaller components or utility files.
- **Organize code into clearly separated modules**, grouped by feature or responsibility.
  For React components this looks like:
    - `ComponentName/ComponentName.jsx` - Main component logic and JSX
    - `ComponentName/ComponentName.module.scss` - Component-specific styles (SCSS modules)
    - `ComponentName/index.js` - Export barrel file for clean imports
- **Use clear, consistent imports** (prefer named imports and absolute paths with alias `@/` for src folder).
- **Component structure:**
  ```
  src/
  ├── components/        # Reusable UI components
  ├── pages/            # Page-level components (one per route)
  ├── assets/           # Images, fonts, static files
  ├── styles/           # Global styles and SCSS utilities
  │   ├── global.scss   # Global variables, mixins, resets
  │   ├── _variables.scss  # Color palette, typography, spacing
  │   └── _mixins.scss  # Reusable SCSS mixins
  ├── utils/            # Helper functions and utilities
  └── hooks/            # Custom React hooks
  ```

### 🎨 Styling Rules (CRITICAL)
- **NEVER use Tailwind CSS** - This project uses SCSS exclusively.
- **ALL styling must use SCSS** with CSS Modules pattern (`.module.scss` files).
- **ALWAYS import and use variables from `global.scss`** for:
  - Colors (primary, secondary, accent, text, background, borders)
  - Typography (font families, sizes, weights, line heights)
  - Spacing (margins, paddings, gaps)
  - Breakpoints (mobile, tablet, desktop)
  - Border radius, shadows, transitions
- **Global SCSS structure:**
  ```scss
  // _variables.scss - All reusable design tokens
  $color-primary: #your-color;
  $font-family-primary: 'YourFont', sans-serif;
  $spacing-unit: 8px;
  $breakpoint-mobile: 768px;

  // _mixins.scss - Reusable style patterns
  @mixin flex-center { display: flex; justify-content: center; align-items: center; }
  @mixin responsive($breakpoint) { @media (max-width: $breakpoint) { @content; } }
  ```
- **Every component must:**
  - Import global variables: `@import '@/styles/variables';`
  - Use CSS Modules for scoped styles
  - Follow BEM naming if needed within modules
  - Be fully responsive (mobile-first approach)

### 🧪 Testing & Reliability
- **Always create Jest/React Testing Library tests for new components** (especially page components and complex UI).
- **After updating any component logic**, check whether existing tests need to be updated. If so, do it.
- **Tests should live in a `__tests__` folder** within each component directory or in a root `/tests` folder mirroring the src structure.
  - Include at least:
    - 1 test for expected rendering
    - 1 test for user interactions (if applicable)
    - 1 test for edge cases (empty states, loading states)

### ✅ Task Completion
- **Mark completed tasks in `TASK.md`** immediately after finishing them.
- Add new sub-tasks or TODOs discovered during development to `TASK.md` under a "Discovered During Work" section.

### 📎 Style & Conventions
- **Use React** with functional components and hooks (no class components).
- **Use JavaScript ES6+** with modern syntax (arrow functions, destructuring, spread operators, async/await).
- **Follow Airbnb React/JavaScript style guide** principles.
- **Use PropTypes or TypeScript** for component prop validation (prefer PropTypes for this project unless TypeScript is requested).
- **File naming conventions:**
  - Components: PascalCase (e.g., `HomePage.jsx`, `NavBar.jsx`)
  - SCSS modules: PascalCase with `.module.scss` (e.g., `HomePage.module.scss`)
  - Utilities/hooks: camelCase (e.g., `useScrollPosition.js`, `formatDate.js`)
  - Assets: kebab-case (e.g., `hero-image.jpg`, `logo-icon.svg`)
- **Write JSDoc comments for complex functions and custom hooks:**
  ```javascript
  /**
   * Custom hook to handle form validation
   * @param {Object} initialValues - Initial form values
   * @param {Function} validationSchema - Validation function
   * @returns {Object} Form state and handlers
   */
  export const useFormValidation = (initialValues, validationSchema) => {
    // Implementation
  }
  ```

### 📚 Documentation & Explainability
- **Update `README.md`** when new features are added, dependencies change, or setup steps are modified.
- **Comment non-obvious code** and ensure everything is understandable to a mid-level React developer.
- When writing complex logic, **add inline `// Reason:` comments** explaining the why, not just the what.
- **Document component props** clearly using PropTypes with descriptions.

### 🧠 AI Behavior Rules
- **Never assume missing context. Ask questions if uncertain.**
- **Never hallucinate libraries or packages** – only use known, verified npm packages.
- **Always confirm file paths and component names** exist before referencing them in code or imports.
- **Never delete or overwrite existing code** unless explicitly instructed to or if part of a task from `TASK.md`.
- **Always use global SCSS variables** - never hardcode colors, fonts, or spacing values directly in component styles.

### 🌐 Website-Specific Rules
- **This is a guest house website** - prioritize clean, elegant design with focus on imagery and readability.
- **Content is king** - ensure all text is easily readable, images are optimized and beautiful.
- **Performance matters** - optimize images, lazy load where appropriate, minimize bundle size.
- **Mobile-first** - design for mobile devices first, then enhance for larger screens.
- **Accessibility** - use semantic HTML, proper alt texts, ARIA labels where needed, keyboard navigation support.
- **SEO-friendly** - use proper heading hierarchy, meta tags, semantic structure.
