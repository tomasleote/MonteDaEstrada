#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

console.log('🔧 Starting SCSS migration to modern @use syntax...\n');

// Find all .scss files in src directory
const scssPattern = path.join(__dirname, '../monte-da-estrada/src/**/*.scss');
const scssFiles = glob.sync(scssPattern, {
  ignore: ['**/node_modules/**', '**/dist/**']
});

console.log(`Found ${scssFiles.length} SCSS files to migrate\n`);

let migratedCount = 0;

scssFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  const originalContent = content;

  // Skip if already using @use for styles
  if (content.includes("@use '@/styles' as *;") || content.includes('@use "./variables"')) {
    console.log(`⏭️  Skipped (already migrated): ${path.relative(process.cwd(), file)}`);
    return;
  }

  // Replace @import '@/styles/variables' and @import '@/styles/mixins' with single @use
  if (content.includes("@import '@/styles/variables'") || content.includes("@import '@/styles/mixins'")) {
    // Remove both imports
    content = content.replace(/@import\s+['"]@\/styles\/variables['"]\s*;\s*/g, '');
    content = content.replace(/@import\s+['"]@\/styles\/mixins['"]\s*;\s*/g, '');

    // Add single @use statement after first comment block
    const lines = content.split('\n');
    let insertIndex = 0;

    // Find end of comment block
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('//') || lines[i].trim().startsWith('/*') || lines[i].trim() === '') {
        insertIndex = i + 1;
      } else {
        break;
      }
    }

    // Insert @use statement
    lines.splice(insertIndex, 0, "@use '@/styles' as *;", '');
    content = lines.join('\n');

    // Clean up multiple empty lines
    content = content.replace(/\n\n\n+/g, '\n\n');

    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    migratedCount++;
    console.log(`✅ Migrated: ${path.relative(process.cwd(), file)}`);
  }
});

console.log(`\n✨ Migration complete! Updated ${migratedCount} files.`);
console.log('\n📋 Next steps:');
console.log('1. Run: cd monte-da-estrada && npm run dev');
console.log('2. Verify no SCSS errors in console');
console.log('3. Test all pages visually');
