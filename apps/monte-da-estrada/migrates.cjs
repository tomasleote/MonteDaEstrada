const fs = require('fs');

const descobrirPath = './src/data/descobrir.js';
let descobrir = fs.readFileSync(descobrirPath, 'utf8');

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/descobrir';

// Map specific old paths to new CDN paths
const mappings = {
  "'/images/experiences/piquenique.jpg'": `'${CDN_BASE}/pequeniqueai.webp'`,
  "'/images/experiences/vinhos.jpg'": `'${CDN_BASE}/vinhosai.webp'`,
  "'/images/experiences/rotaVicentinaAI.jpg'": `'${CDN_BASE}/rotavicentinaai.webp'`,
  "'/images/experiences/ebike-trilhos.jpg'": `'${CDN_BASE}/btt.webp'`,
  "'/images/experiences/sunset-chaser.jpg'": `'${CDN_BASE}/jipetourai.webp'`,
  "'/images/experiences/massagens.jpg'": `'${CDN_BASE}/massagemai.webp'`,

  "'/images/beaches/zambujeira.jpg'": `'${CDN_BASE}/zambujeirapraia.webp'`,
  "'/images/beaches/carvalhal.jpg'": `'${CDN_BASE}/carvalhal.webp'`,
  "'/images/beaches/alteirinhos.jpg'": `'${CDN_BASE}/alteirinhos.webp'`,
  "'/images/beaches/almograve.jpg'": `'${CDN_BASE}/almograve.webp'`,
  "'/images/beaches/odeceixe.jpg'": `'${CDN_BASE}/odeceixe.webp'`,
  "'/images/beaches/tonel.jpg'": `'${CDN_BASE}/tonel.webp'`,
  "new URL('../assets/images/descobrir/malhao.jpg', import.meta.url).href": `'${CDN_BASE}/malhao.webp'`,
  "new URL('../assets/images/descobrir/aivados.jpg', import.meta.url).href": `'${CDN_BASE}/aivados.webp'`,

  "'/images/attractions/sao-teotonio.jpg'": `'${CDN_BASE}/costavicentina.webp'`,
  "'/images/attractions/zambujeira.jpg'": `'${CDN_BASE}/zambujeirapraia.webp'`,
  "'/images/attractions/odemira.jpg'": `'${CDN_BASE}/costavicentina.webp'`,
  "'/images/attractions/aljezur.jpg'": `'${CDN_BASE}/papaleguas.webp'`,
  "'/images/attractions/vila-nova.jpg'": `'${CDN_BASE}/papaleguas.webp'`,
  "'/images/attractions/almograve.jpg'": `'${CDN_BASE}/almograve.webp'`,

  "'touril.avif'": `'${CDN_BASE}/parceiros/touril.webp'`,
  "'bardapraia.avif'": `'${CDN_BASE}/parceiros/bardapraia%20(1).webp'`,
  "'manjedoura.avif'": `'${CDN_BASE}/parceiros/manjedoura%20(1).webp'`,
  "'celso.avif'": `'${CDN_BASE}/parceiros/celso%20(1).webp'`,
  "'rota_vicentina.avif'": `'${CDN_BASE}/parceiros/rota_vicentina.webp'`,
  "'casas_brancas.avif'": `'${CDN_BASE}/parceiros/casas_brancas.webp'`,
  "'visitAlentejo.avif'": `'${CDN_BASE}/parceiros/visitalentejo.webp'`,
};

for (const [key, value] of Object.entries(mappings)) {
  descobrir = descobrir.split(key).join(value);
}

fs.writeFileSync(descobrirPath, descobrir);

// Galeria.json
const galeriaPath = './src/data/galeria.json';
let galeria = JSON.parse(fs.readFileSync(galeriaPath, 'utf8'));

const HOME_CDN = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/home';
const QUARTOS_CDN = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/quartos';

galeria.hero.image = `${HOME_CDN}/home-property-view-01.webp`;

// exteriors
const extImgs = galeria.categories.find(c => c.id === 'exteriores').images;
extImgs[0].src = `${HOME_CDN}/home-property-view-01.webp`;
extImgs[1].src = `${HOME_CDN}/home-property-view-05.webp`;
extImgs[2].src = `${HOME_CDN}/home-property-view-08.webp`;
extImgs[3].src = `${QUARTOS_CDN}/exterior-1.jpeg`;

// quartos
const quartoImgs = galeria.categories.find(c => c.id === 'quartos').images;
quartoImgs[0].src = `${QUARTOS_CDN}/quarto-1.webp`;
quartoImgs[1].src = `${QUARTOS_CDN}/quarto-2.webp`;
quartoImgs[2].src = `${QUARTOS_CDN}/quarto-3.webp`;
quartoImgs[3].src = `${QUARTOS_CDN}/quarto-wc.webp`;

// areas-comuns
const areasImgs = galeria.categories.find(c => c.id === 'areas-comuns').images;
areasImgs[0].src = `${QUARTOS_CDN}/quarto-2.webp`;
areasImgs[1].src = `${QUARTOS_CDN}/quarto-3.webp`;
areasImgs[2].src = `${QUARTOS_CDN}/exterior-1.jpeg`;
areasImgs[3].src = `${HOME_CDN}/home-property-view-05.webp`;

// paisagem
const paisagemImgs = galeria.categories.find(c => c.id === 'paisagem').images;
paisagemImgs[0].src = `${HOME_CDN}/home-property-view-05.webp`;
paisagemImgs[1].src = `${HOME_CDN}/home-property-view-08.webp`;
paisagemImgs[2].src = `${QUARTOS_CDN}/exterior-1.jpeg`;
paisagemImgs[3].src = `${HOME_CDN}/home-property-view-01.webp`;

fs.writeFileSync(galeriaPath, JSON.stringify(galeria, null, 2));

console.log('Done migrating images in descobrir.js and galeria.json');
