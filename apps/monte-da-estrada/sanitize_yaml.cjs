const fs = require('fs');

try {
  let yaml = fs.readFileSync('public/admin/config.yml', 'utf8');

  // Decap CMS v3 rejects `i18n: "duplicate"` and `i18n: true` on fields array definitions
  // (e.g., inside lists) that don't belong to the root or specially configured sections.
  // We'll strip these out where they are not allowed.
  
  yaml = yaml.replace(/, i18n: "duplicate"/g, '');
  yaml = yaml.replace(/, i18n: true/g, '');
  
  fs.writeFileSync('public/admin/config.yml', yaml);
  console.log('Successfully sanitized config.yml');
} catch (e) {
  console.error("Error modifying file:", e);
}
