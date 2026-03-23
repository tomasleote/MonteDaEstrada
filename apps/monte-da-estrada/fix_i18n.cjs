const fs = require('fs');

try {
  let yaml = fs.readFileSync('public/admin/config.yml', 'utf8');

  // Replace block-level i18n: "duplicate" with i18n: true
  // In Decap CMS v3, object and list widgets must use a boolean for i18n.
  yaml = yaml.replace(/(\s+i18n:\s*)"duplicate"/g, '$1true');
  
  fs.writeFileSync('public/admin/config.yml', yaml);
  console.log('Successfully fixed list/object i18n properties to boolean');
} catch (e) {
  console.error("Error modifying file:", e);
}
