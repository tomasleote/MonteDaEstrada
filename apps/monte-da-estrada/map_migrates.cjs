const fs = require('fs');

const mapPath = './src/data/map-locations.js';
let data = fs.readFileSync(mapPath, 'utf8');

const CDN_MAP = {
  'papaleguas.jpg': 'papaleguas.webp',
  'HerdadedoTouril.jpg': 'parceiros/touril.webp',
  'bardapraia.png': 'parceiros/bardapraia.webp',
  'celso.jpg': 'parceiros/celso.webp',
  'manjedoura.jpg': 'parceiros/manjedoura.webp',
  'carvalhal.png': 'carvalhal.webp',
  'almograve.jpg': 'almograve.webp',
  'alteirinhos.png': 'alteirinhos.webp',
  'tonel.jpg': 'tonel.webp',
  'malhao.jpg': 'malhao.webp',
  'aivados.jpg': 'aivados.webp',
  'zambujeira.jpg': 'zambujeirapraia.webp',
  'saoteotonio.jpeg': 'costavicentina.webp',
  'Odemira.jpg': 'costavicentina.webp',
  'vilaNova.png': 'papaleguas.webp',
  'odeceixe.jpg': 'odeceixe.webp'
};

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/descobrir';

data = data.replace(/new URL\('\.\.\/assets\/images\/(.*?\/(.*?))', import\.meta\.url\)\.href/g, (match, path, filename) => {
  if (CDN_MAP[filename]) {
    return `'${CDN_BASE}/${CDN_MAP[filename]}'`;
  }
  return `'${CDN_BASE}/costavicentina.webp'`;
});

fs.writeFileSync(mapPath, data);
console.log('Done migrating map-locations.js');
