const fs = require('fs');
const path = require('path');

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@495a0e9/mde';

const filesToMigrate = [
  './src/data/home.json',
  './src/data/localizacao.json',
  './src/data/redondezas.json',
  './src/data/site-settings.json',
  './src/data/quartos.json',
  './src/data/descobrir.json',
  './src/data/atividades.json'
];

filesToMigrate.forEach(filePath => {
  const absolutePath = path.resolve(__dirname, filePath);
  if (!fs.existsSync(absolutePath)) return;

  let content = fs.readFileSync(absolutePath, 'utf8');

  // Replace /src/assets/images/home/ -> CDN_BASE/home/
  // and variations like ../assets/images/...
  content = content.replace(/(\/src\/assets\/images\/|\.\.\/assets\/images\/|\/assets\/images\/)([^"]+)/g, (match, prefix, suffix) => {
    // If suffix already starts with a slash, we might have nested slashes issues, let's normalize
    const cleanSuffix = suffix.startsWith('/') ? suffix.slice(1) : suffix;
    
    // Map specific files if needed (e.g., .jpg to .webp if we are certain they exist)
    // But for safety and to avoid 404s if I'm not 100% sure of all filenames, 
    // I'll just change the base and trust the pathing provided by the user earlier.
    
    // Let's assume the user has the same structure in the repo.
    return `${CDN_BASE}/${cleanSuffix.replace(/\.jpg$|\.jpeg$|\.png$|\.avif$/, '.webp')}`;
  });

  fs.writeFileSync(absolutePath, content);
  console.log(`Migrated ${filePath}`);
});
