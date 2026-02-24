# Discovery Map — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a brand-styled `DiscoveryMap` component in the shared library that renders an interactive "Insider's Guide" map on the Descobrir page with curated pins and rich popups.

**Architecture:** `DiscoveryMap` lives in `packages/touril-ecosystem-ui-components`, imports `maplibre-gl` directly (same approach as the installed `mapcn` wrapper), uses SCSS Modules for section layout and popup styling with Tailwind permitted inside the map canvas. Location data is props-first via a JSON file in the app.

**Tech Stack:** MapLibre GL JS v5, React portals (popup content), SCSS Modules, PropTypes, mapcn reference implementation at `apps/monte-da-estrada/src/components/ui/map.jsx`

---

## Task 1: Extend Tailwind content paths to cover shared lib

The shared library's JSX files are not scanned by Tailwind today. Any Tailwind classes in the new `DiscoveryMap` component will be purged in production builds unless we add the shared package path.

**Files:**
- Modify: `apps/monte-da-estrada/tailwind.config.js`

**Step 1: Open and edit the file**

Replace the `content` array so it also scans the shared package:

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/touril-ecosystem-ui-components/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Step 2: Verify the dev server still starts**

```bash
cd apps/monte-da-estrada && npm run dev
```

Expected: Server starts, no Tailwind or Vite errors in the terminal.

**Step 3: Commit**

```bash
git add apps/monte-da-estrada/tailwind.config.js
git commit -m "build: extend Tailwind content scan to shared UI package"
```

---

## Task 2: Create the location data file

All map pins for Monte da Estrada. This file is property-specific and stays in the app, not the shared lib.

**Files:**
- Create: `apps/monte-da-estrada/src/data/map-locations.js`

**Step 1: Create the file**

```js
// apps/monte-da-estrada/src/data/map-locations.js
// Location data for the DiscoveryMap on the Descobrir page.
// Coordinates: [longitude, latitude] — WGS84.
// NOTE: coordinates marked (approx) should be verified against Google Maps.

const mapLocations = [
  // ── A Nossa Coleção ──────────────────────────────────────────────────────
  {
    id: 'monte-da-estrada',
    category: 'collection',
    type: 'Alojamento',
    name: 'Monte da Estrada',
    description: 'A nossa casa. Ponto de partida para tudo o que fica aqui perto.',
    coordinates: [-8.6124, 37.7302], // approx — verify
    distance: null,
    imageSrc: null,
    imageAlt: 'Monte da Estrada',
    url: null,
    mapUrl: null,
  },
  {
    id: 'monte-papa-leguas',
    category: 'collection',
    type: 'Alojamento',
    name: 'Monte do Papa-Léguas',
    description: 'A nossa segunda casa. Arquitetura e paisagem na Costa Vicentina.',
    coordinates: [-8.6200, 37.7150], // approx — verify
    distance: null,
    imageSrc: null,
    imageAlt: 'Monte do Papa-Léguas',
    url: null,
    mapUrl: null,
  },
  {
    id: 'herdade-touril',
    category: 'collection',
    type: 'Eco-Resort',
    name: 'Herdade do Touril',
    description: 'Bem-estar, piscina e massagens. A poucos minutos do monte.',
    coordinates: [-8.6901, 37.7022], // approx — verify
    distance: '6 km',
    imageSrc: null,
    imageAlt: 'Herdade do Touril',
    url: null,
    mapUrl: 'https://maps.app.goo.gl/touril',
  },

  // ── Os Nossos Sítios ─────────────────────────────────────────────────────
  {
    id: 'bar-da-praia-almograve',
    category: 'owner',
    type: 'Bar',
    name: 'Bar da Praia Almograve',
    description: 'O nosso bar na praia. Petiscos, bebidas e pôr do sol sobre o Atlântico.',
    coordinates: [-8.6536, 37.6344], // approx — verify
    distance: '14 km',
    imageSrc: null,
    imageAlt: 'Bar da Praia Almograve',
    url: null,
    mapUrl: 'https://maps.app.goo.gl/bar-almograve',
  },
  {
    id: 'tasca-do-celso',
    category: 'owner',
    type: 'Restaurante',
    name: 'Tasca do Celso',
    description: 'Cozinha alentejana de fundo. O sítio onde os locais comem.',
    coordinates: [-8.6832, 37.7074], // São Teotório approx — verify
    distance: '4 km',
    imageSrc: null,
    imageAlt: 'Tasca do Celso',
    url: null,
    mapUrl: null,
  },
  {
    id: 'manjedoura',
    category: 'owner',
    type: 'Restaurante',
    name: 'Manjedoura',
    description: 'Mesa com produto local e simplicidade. Um favorito da região.',
    coordinates: [-8.6750, 37.7100], // approx — verify
    distance: '5 km',
    imageSrc: null,
    imageAlt: 'Manjedoura',
    url: null,
    mapUrl: null,
  },

  // ── Descobrir ────────────────────────────────────────────────────────────
  {
    id: 'zambujeira-do-mar',
    category: 'curated',
    type: 'Praia',
    name: 'Zambujeira do Mar',
    description: 'Praia selvagem encaixada em falésias de xisto. O Atlântico puro.',
    coordinates: [-8.7882, 37.5251],
    distance: '8 km',
    imageSrc: '/images/beaches/zambujeira.jpg',
    imageAlt: 'Zambujeira do Mar com falésias e mar azul-turquesa',
    url: null,
    mapUrl: 'https://maps.app.goo.gl/kofHZjwBekjVqEzt5',
  },
  {
    id: 'carvalhal',
    category: 'curated',
    type: 'Praia',
    name: 'Praia do Carvalhal',
    description: 'Extensa e ventosa, favorita dos surfistas e dos que querem praia sem multidão.',
    coordinates: [-8.7537, 37.6095], // approx
    distance: '12 km',
    imageSrc: '/images/beaches/carvalhal.jpg',
    imageAlt: 'Praia do Carvalhal com ondas e dunas ao fundo',
    url: null,
    mapUrl: 'https://maps.app.goo.gl/TaXwnk9cj364cnbZ9',
  },
  {
    id: 'almograve',
    category: 'curated',
    type: 'Praia',
    name: 'Praia de Almograve',
    description: 'Praia selvagem com acesso fácil e águas cristalinas.',
    coordinates: [-8.6536, 37.6344],
    distance: '12 km',
    imageSrc: '/images/beaches/almograve.jpg',
    imageAlt: 'Praia de Almograve com areias douradas',
    url: null,
    mapUrl: 'https://maps.app.goo.gl/4BgVJrALGAAXTBan9',
  },
  {
    id: 'sao-teotonio',
    category: 'curated',
    type: 'Vila',
    name: 'São Teotório',
    description: 'A vila mais próxima. Mercado semanal às sextas, padaria e mercearia local.',
    coordinates: [-8.6832, 37.7074],
    distance: '4 km',
    imageSrc: null,
    imageAlt: 'Centro histórico de São Teotório',
    url: null,
    mapUrl: 'https://maps.app.goo.gl/iMovexEHDXCXJufq6',
  },
  {
    id: 'odemira',
    category: 'curated',
    type: 'Cidade',
    name: 'Odemira',
    description: 'Cidade ribeirinha com mercado, restaurantes e serviços. À beira do Rio Mira.',
    coordinates: [-8.6468, 37.5967], // approx
    distance: '15 km',
    imageSrc: null,
    imageAlt: 'Odemira com o Rio Mira',
    url: null,
    mapUrl: 'https://maps.app.goo.gl/HMtR85LHRHm3exHh8',
  },
  {
    id: 'vila-nova-milfontes',
    category: 'curated',
    type: 'Cidade Costeira',
    name: 'Vila Nova de Milfontes',
    description: 'Encantadora cidade costeira à beira do rio Mira, com praias e vida local.',
    coordinates: [-8.7878, 37.7256],
    distance: '23 km',
    imageSrc: null,
    imageAlt: 'Vila Nova de Milfontes com vista para o rio',
    url: null,
    mapUrl: 'https://maps.app.goo.gl/S11uGwRvEXhhUan59',
  },
  {
    id: 'odeceixe',
    category: 'curated',
    type: 'Praia',
    name: 'Praia de Odeceixe',
    description: 'Onde o rio encontra o mar. Protegida do vento, ideal para famílias.',
    coordinates: [-8.7703, 37.4344],
    distance: '30 km',
    imageSrc: '/images/beaches/odeceixe.jpg',
    imageAlt: 'Praia de Odeceixe com estuário do rio Seixe',
    url: null,
    mapUrl: 'https://maps.app.goo.gl/ggdNmsjs6CQXuFJW8',
  },
];

export default mapLocations;
```

**Step 2: Commit**

```bash
git add apps/monte-da-estrada/src/data/map-locations.js
git commit -m "data: add map-locations.js with discovery map pins for Monte da Estrada"
```

---

## Task 3: Create the DiscoveryMap SCSS module

Section wrapper, filter pills, custom markers, and rich popup — all brand-compliant. No Tailwind in this file (SCSS only, consistent with the rest of the shared lib).

**Files:**
- Create: `packages/touril-ecosystem-ui-components/src/components/DiscoveryMap/DiscoveryMap.module.scss`

**Step 1: Create the file**

```scss
// DiscoveryMap.module.scss
// Section wrapper, filter pills, marker dots and rich popup for the Discovery Map.
// Brand: cream bg, deep brown text, clay accent. 0px border-radius everywhere.

@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

// ── Section wrapper ──────────────────────────────────────────────────────────

.section {
  background: $color-cream;
  padding: $space-section 0;
}

// ── Eyebrow + Heading ────────────────────────────────────────────────────────

.header {
  max-width: $container-max-width;
  margin: 0 auto $spacing-l;
  padding: 0 $container-padding;
}

.eyebrow {
  display: block;
  font-family: $font-body;
  font-size: $font-size-body-small;
  font-weight: $font-weight-medium;
  letter-spacing: $letter-spacing-headline;
  text-transform: uppercase;
  color: $color-clay;
  margin-bottom: $spacing-m;
}

.heading {
  font-family: $font-display;
  font-size: $font-size-h2;
  font-weight: $font-weight-regular;
  letter-spacing: $letter-spacing-headline;
  color: $color-deep-brown;
  margin: 0;
  line-height: $line-height-tight;

  @include responsive($breakpoint-tablet) {
    font-size: $font-size-h3;
  }
}

// ── Filter pills ─────────────────────────────────────────────────────────────

.filters {
  max-width: $container-max-width;
  margin: 0 auto $spacing-l;
  padding: 0 $container-padding;
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-s;
}

.filterPill {
  font-family: $font-body;
  font-size: $font-size-body-small;
  font-weight: $font-weight-medium;
  letter-spacing: $letter-spacing-subheading;
  color: $color-deep-brown;
  background: transparent;
  border: 1px solid $color-warm-gray;
  padding: $spacing-s $spacing-m;
  cursor: pointer;
  border-radius: 0; // brand rule — no radius
  transition:
    background $transition-duration-quick ease,
    border-color $transition-duration-quick ease,
    color $transition-duration-quick ease;

  &:hover {
    border-color: $color-deep-brown;
  }
}

.filterPillActive {
  background: $color-clay;
  border-color: $color-clay;
  color: $color-cream;

  &:hover {
    opacity: $opacity-hover;
  }
}

// ── Map canvas container ──────────────────────────────────────────────────────
// Height is set via inline style from parent for portability.

.mapCanvas {
  max-width: $container-max-width;
  margin: 0 auto;
  display: block;
}

// ── Custom marker dots ────────────────────────────────────────────────────────
// These classes are applied to the MapLibre Marker's custom DOM element.
// All markers: circular with white halo border for contrast over the basemap.

%markerBase {
  position: relative;
  cursor: pointer;
  border-radius: 50%; // structural — circular dot, not decorative
  border: 2px solid #fff;
  transition: transform $transition-duration-quick ease;

  &:hover {
    transform: scale(1.3);
    z-index: 10;
  }
}

// Clay dot — Our Collection (most prominent)
.markerCollection {
  @extend %markerBase;
  width: 14px;
  height: 14px;
  background: $color-clay;
  box-shadow: 0 0 0 1.5px rgba(184, 146, 95, 0.5);
}

// Deep brown dot — Owner's spots
.markerOwner {
  @extend %markerBase;
  width: 12px;
  height: 12px;
  background: $color-deep-brown;
  box-shadow: 0 0 0 1px rgba(61, 59, 56, 0.3);
}

// Warm-gray ring with deep-brown fill — Curated spots (subtle)
.markerCurated {
  @extend %markerBase;
  width: 10px;
  height: 10px;
  background: $color-deep-brown;
  border-color: $color-warm-gray;
  border-width: 2.5px;
}

// ── Rich popup ────────────────────────────────────────────────────────────────
// Rendered via React portal into MapLibre Popup's DOM container.
// MapLibre popup chrome (background, tip, shadow) is already reset in index.css.

.popup {
  width: 260px;
  background: $color-cream;
  border: 1px solid $color-warm-gray;
  border-radius: 0; // brand rule
  overflow: hidden;
}

.popupImage {
  width: 100%;
  height: 130px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.popupBody {
  padding: $spacing-m;
}

.popupMeta {
  display: flex;
  align-items: center;
  gap: $spacing-s;
  margin-bottom: $spacing-s;
}

.popupType {
  font-family: $font-body;
  font-size: 11px;
  font-weight: $font-weight-medium;
  letter-spacing: $letter-spacing-headline;
  text-transform: uppercase;
  color: $color-clay;
  line-height: 1;
}

.popupDistance {
  font-family: $font-body;
  font-size: 11px;
  color: $color-deep-brown;
  background: $color-warm-gray;
  padding: 2px 6px;
  white-space: nowrap;
  line-height: 1.4;
}

.popupName {
  font-family: $font-display;
  font-size: 16px;
  font-weight: $font-weight-regular;
  letter-spacing: $letter-spacing-subheading;
  color: $color-deep-brown;
  margin: 0 0 $spacing-s;
  line-height: $line-height-base;
}

.popupDescription {
  font-family: $font-body;
  font-size: 13px;
  line-height: 1.55;
  color: $color-deep-brown;
  margin: 0 0 $spacing-m;
  // Clamp to 2 lines
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.popupCta {
  display: inline-block;
  font-family: $font-body;
  font-size: 12px;
  font-weight: $font-weight-medium;
  letter-spacing: $letter-spacing-subheading;
  color: $color-clay;
  text-decoration: none;
  transition: text-decoration $transition-duration-quick ease;

  &:hover {
    text-decoration: underline;
  }
}
```

---

## Task 4: Create the DiscoveryMap JSX component

The main component. Uses `maplibre-gl` directly (same MapLibre version mapcn wraps). Manages map init, markers, popup portals, and category filter state.

**Files:**
- Create: `packages/touril-ecosystem-ui-components/src/components/DiscoveryMap/DiscoveryMap.jsx`

**Step 1: Create the file**

```jsx
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  createPortal,
} from 'react';
import PropTypes from 'prop-types';
import MapLibreGL from 'maplibre-gl';
// Reason: maplibre-gl CSS is already imported by the app's src/components/ui/map.jsx.
// If that file is not present in your app (e.g. Papa-Léguas), add the import below:
// import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './DiscoveryMap.module.scss';

// ── Constants ────────────────────────────────────────────────────────────────

const STYLE_URL = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const DEFAULT_CENTER = [-8.68, 37.65]; // Centroid of the Monte da Estrada region
const DEFAULT_ZOOM = 9;

const FILTERS = [
  { value: 'all',        label: 'Todos' },
  { value: 'collection', label: 'A Nossa Coleção' },
  { value: 'owner',      label: 'Os Nossos Sítios' },
  { value: 'curated',    label: 'Descobrir' },
];

// Maps category key → CSS module class name for the marker dot
const MARKER_CLASS = {
  collection: 'markerCollection',
  owner:      'markerOwner',
  curated:    'markerCurated',
};

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Creates the HTMLElement passed to MapLibre Marker as its custom element.
 * Returns a styled div based on the location's category.
 */
function createMarkerEl(category) {
  const el = document.createElement('div');
  el.className = styles[MARKER_CLASS[category]] || styles.markerCurated;
  return el;
}

// ── PopupPortal ──────────────────────────────────────────────────────────────

/**
 * Renders brand-styled popup content into a MapLibre Popup's DOM container
 * via React createPortal. The container is a plain <div> owned by MapLibre;
 * React renders into it without touching the rest of the DOM tree.
 *
 * @param {Object} props
 * @param {HTMLElement} props.container - The DOM node to portal into
 * @param {Object}      props.location  - Location data object
 */
function PopupPortal({ container, location }) {
  return createPortal(
    <div className={styles.popup}>
      {location.imageSrc && (
        <div className={styles.popupImage}>
          <img src={location.imageSrc} alt={location.imageAlt || location.name} />
        </div>
      )}
      <div className={styles.popupBody}>
        <div className={styles.popupMeta}>
          <span className={styles.popupType}>{location.type}</span>
          {location.distance && (
            <span className={styles.popupDistance}>{location.distance}</span>
          )}
        </div>
        <h3 className={styles.popupName}>{location.name}</h3>
        <p className={styles.popupDescription}>{location.description}</p>
        {location.mapUrl && (
          <a
            href={location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.popupCta}
          >
            Ver no Mapa →
          </a>
        )}
      </div>
    </div>,
    container
  );
}

PopupPortal.propTypes = {
  container: PropTypes.instanceOf(Element).isRequired,
  location: PropTypes.object.isRequired,
};

// ── DiscoveryMap ─────────────────────────────────────────────────────────────

/**
 * DiscoveryMap — Interactive "Insider's Guide" map section.
 *
 * Renders a full section (eyebrow, heading, category filter, map) with
 * brand-styled custom markers and rich popup cards. Built on MapLibre GL
 * directly, styled with SCSS Modules.
 *
 * @param {Object}   props
 * @param {Array}    props.locations - Array of location objects (see data schema in design doc)
 * @param {number[]} props.center    - [lng, lat] initial map center
 * @param {number}   props.zoom      - Initial zoom level
 * @param {string}   props.height    - CSS height of the map canvas (e.g. '520px')
 */
function DiscoveryMap({
  locations = [],
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  height = '520px',
}) {
  const containerRef = useRef(null);
  const mapRef        = useRef(null);
  const markersRef    = useRef([]);
  const popupsRef     = useRef([]);

  const [activeFilter,  setActiveFilter]  = useState('all');
  const [isMapLoaded,   setIsMapLoaded]   = useState(false);
  // Reason: popupPortals stores { container, location } pairs so React can
  // portal popup content into MapLibre-owned DOM nodes after markers are placed.
  const [popupPortals,  setPopupPortals]  = useState([]);

  // Derive visible locations from the active filter
  const visibleLocations = useMemo(() => {
    if (activeFilter === 'all') return locations;
    return locations.filter((loc) => loc.category === activeFilter);
  }, [locations, activeFilter]);

  // ── Map initialisation (runs once) ──────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    const map = new MapLibreGL.Map({
      container: containerRef.current,
      style:     STYLE_URL,
      center,
      zoom,
      renderWorldCopies: false,
      attributionControl: { compact: true },
    });

    map.on('load', () => setIsMapLoaded(true));
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current  = null;
      setIsMapLoaded(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Markers & popup portals (re-runs when filter changes) ────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded) return;

    // Tear down existing markers and popups before re-rendering
    markersRef.current.forEach((m) => m.remove());
    popupsRef.current.forEach((p) => p.remove());
    markersRef.current = [];
    popupsRef.current  = [];

    const portals = [];

    visibleLocations.forEach((location) => {
      // 1. Popup: create a container div; MapLibre owns it, React portals into it
      const popupContainer = document.createElement('div');
      const popup = new MapLibreGL.Popup({
        offset:       14,
        closeButton:  false,
        closeOnClick: false,
        maxWidth:     'none',
      }).setDOMContent(popupContainer);

      // 2. Marker: custom branded dot element
      const el = createMarkerEl(location.category);
      const marker = new MapLibreGL.Marker({ element: el })
        .setLngLat(location.coordinates)
        .addTo(map);

      // 3. Click handler: close all other open popups, toggle this one
      el.addEventListener('click', () => {
        popupsRef.current.forEach((p) => {
          if (p !== popup && p.isOpen()) p.remove();
        });
        if (popup.isOpen()) {
          popup.remove();
        } else {
          popup.setLngLat(location.coordinates).addTo(map);
        }
      });

      markersRef.current.push(marker);
      popupsRef.current.push(popup);
      portals.push({ container: popupContainer, location });
    });

    setPopupPortals(portals);

    // Cleanup: remove markers/popups when effect re-runs or component unmounts
    return () => {
      markersRef.current.forEach((m) => m.remove());
      popupsRef.current.forEach((p) => p.remove());
      markersRef.current = [];
      popupsRef.current  = [];
    };
  }, [isMapLoaded, visibleLocations]);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className={styles.section}>

      {/* Eyebrow + Heading */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>O Guia do Território</span>
        <h2 className={styles.heading}>Tudo o que fica perto.</h2>
      </div>

      {/* Category filter pills */}
      <div
        className={styles.filters}
        role="group"
        aria-label="Filtrar pontos de interesse"
      >
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={`${styles.filterPill} ${
              activeFilter === f.value ? styles.filterPillActive : ''
            }`}
            onClick={() => setActiveFilter(f.value)}
            aria-pressed={activeFilter === f.value}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Map canvas — height controlled via inline style for portability */}
      <div
        ref={containerRef}
        className={styles.mapCanvas}
        style={{ height }}
        role="application"
        aria-label="Mapa interativo dos pontos de interesse"
      />

      {/* React portals — render popup content into MapLibre-owned containers */}
      {popupPortals.map(({ container, location }) => (
        <PopupPortal
          key={location.id}
          container={container}
          location={location}
        />
      ))}

    </div>
  );
}

DiscoveryMap.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id:          PropTypes.string.isRequired,
      category:    PropTypes.oneOf(['collection', 'owner', 'curated']).isRequired,
      type:        PropTypes.string.isRequired,
      name:        PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      distance:    PropTypes.string,
      imageSrc:    PropTypes.string,
      imageAlt:    PropTypes.string,
      url:         PropTypes.string,
      mapUrl:      PropTypes.string,
    })
  ).isRequired,
  center: PropTypes.arrayOf(PropTypes.number),
  zoom:   PropTypes.number,
  height: PropTypes.string,
};

export default DiscoveryMap;
```

---

## Task 5: Create the barrel export file

**Files:**
- Create: `packages/touril-ecosystem-ui-components/src/components/DiscoveryMap/index.js`

**Step 1: Create the file**

```js
export { default } from './DiscoveryMap';
```

**Step 2: Commit tasks 3-5 together**

```bash
git add packages/touril-ecosystem-ui-components/src/components/DiscoveryMap/
git commit -m "feat(shared): add DiscoveryMap component with brand markers and rich popups"
```

---

## Task 6: Register DiscoveryMap in the shared lib index

**Files:**
- Modify: `packages/touril-ecosystem-ui-components/src/index.js`

**Step 1: Add the export**

Open `packages/touril-ecosystem-ui-components/src/index.js`.
Add the following line in a new section after the existing Discovery Ecosystem exports (after Phase E / AmenityStrip):

```js
// ============================================
// MAP COMPONENT
// ============================================

export { default as DiscoveryMap } from './components/DiscoveryMap';
```

**Step 2: Commit**

```bash
git add packages/touril-ecosystem-ui-components/src/index.js
git commit -m "feat(shared): export DiscoveryMap from shared UI library"
```

---

## Task 7: Add mapSection styles to DescobrirPage.module.scss

**Files:**
- Modify: `apps/monte-da-estrada/src/pages/DescobrirPage/DescobrirPage.module.scss`

**Step 1: Open the file and append at the bottom**

Read the file first, then append this block:

```scss
// ── S3.5 — Discovery Map ────────────────────────────────────────────────────
// The DiscoveryMap component renders its own section wrapper internally.
// This outer wrapper provides page-level containment only.

.mapSection {
  // No additional styles needed — DiscoveryMap handles its own section padding.
  // Reserved for future overrides if needed.
}
```

---

## Task 8: Integrate DiscoveryMap into DescobrirPage

This is the page-level wiring: import the component and data, add the section, and update the sticky nav.

**Files:**
- Modify: `apps/monte-da-estrada/src/pages/DescobrirPage/DescobrirPage.jsx`

**Step 1: Add imports**

After the existing `@touril-ecosystem/ui-components` import block, add:

```js
import { DiscoveryMap } from '@touril-ecosystem/ui-components';
import mapLocations from '@/data/map-locations';
```

**Step 2: Update NAV_ITEMS**

Replace:
```js
const NAV_ITEMS = [
  { id: 'experiencias', label: 'Experiências' },
  { id: 'praias',       label: 'Praias' },
  { id: 'redondezas',   label: 'Redondezas' },
];
```

With:
```js
const NAV_ITEMS = [
  { id: 'experiencias', label: 'Experiências' },
  { id: 'mapa',         label: 'Mapa' },
  { id: 'praias',       label: 'Praias' },
  { id: 'redondezas',   label: 'Redondezas' },
];
```

**Step 3: Insert the map section**

Locate the comment `{/* S4 — Experiências */}` in the JSX. Insert immediately before it:

```jsx
{/* S3.5 — Discovery Map ─────────────────────────────────────── */}
{/* Interactive Insider's Guide — Our Collection + Owner's Spots + Curated */}
<section id="mapa" className={styles.mapSection}>
  <DiscoveryMap locations={mapLocations} />
</section>
```

**Step 4: Commit**

```bash
git add apps/monte-da-estrada/src/pages/DescobrirPage/DescobrirPage.jsx
git add apps/monte-da-estrada/src/pages/DescobrirPage/DescobrirPage.module.scss
git commit -m "feat(descobrir): integrate DiscoveryMap into Descobrir page after O Território"
```

---

## Task 9: Verify maplibre-gl CSS loading

The shared `DiscoveryMap` does NOT import `maplibre-gl/dist/maplibre-gl.css` to avoid duplication with `src/components/ui/map.jsx`. Verify the CSS is loaded before DiscoveryMap renders.

**Step 1: Check that map.jsx is imported somewhere in the app bundle**

Search for any existing import of `@/components/ui/map`:

```bash
grep -r "components/ui/map" apps/monte-da-estrada/src/
```

**Step 2: If no results — add the CSS import to DiscoveryMap.jsx**

Open `packages/touril-ecosystem-ui-components/src/components/DiscoveryMap/DiscoveryMap.jsx` and uncomment the CSS import line at the top:

```js
import 'maplibre-gl/dist/maplibre-gl.css';
```

Vite deduplicates identical CSS imports, so this is safe even if the app also imports it elsewhere.

**Step 3: Commit if changed**

```bash
git add packages/touril-ecosystem-ui-components/src/components/DiscoveryMap/DiscoveryMap.jsx
git commit -m "fix(map): ensure maplibre-gl CSS is imported when mapcn map.jsx is absent"
```

---

## Task 10: Manual QA in dev browser

```bash
cd apps/monte-da-estrada && npm run dev
```

Open `http://localhost:5173/descobrir` and verify:

- [ ] Map renders between "O Território" and "Experiências" sections
- [ ] "Mapa" appears in the sticky CategoryNav and scrolls to the section
- [ ] All 4 filter pills render; active pill shows Clay background
- [ ] Clicking "A Nossa Coleção" shows only collection pins (clay dots)
- [ ] Clicking "Os Nossos Sítios" shows only owner pins (dark dots)
- [ ] Clicking "Descobrir" shows only curated pins (outlined dots)
- [ ] Clicking "Todos" restores all pins
- [ ] Clicking a pin opens the rich popup with brand styling
- [ ] Clicking a second pin closes the first popup and opens the new one
- [ ] Popup shows: type (clay caps), name (display font), description (2-line clamp), "Ver no Mapa" link (for locations with mapUrl)
- [ ] Popup has cream background, warm-gray border, no arrow, no shadow
- [ ] Map canvas height is ~520px desktop, feels generous
- [ ] No console errors
- [ ] Page layout is not broken on mobile (380px)

---

## Task 11: Verify coordinates and update approximates

Several coordinates in `map-locations.js` are marked `// approx — verify`.
Cross-check against the real locations using Google Maps or the existing `mapUrl` values.

**Files to update:**
- `apps/monte-da-estrada/src/data/map-locations.js`

Key pins to verify:
- `monte-da-estrada` — the actual property
- `monte-papa-leguas` — second property
- `herdade-touril` — eco-resort
- `bar-da-praia-almograve` — should be right at Almograve beach
- `tasca-do-celso` — restaurant in São Teotório
- `manjedoura` — restaurant location unknown

**Step 1: For each approx coordinate, open Google Maps, find the real location, copy coordinates**

Format: right-click on map → "What's here?" → shows lat,lng — remember MapLibre uses `[lng, lat]` order.

**Step 2: Update the coordinates in map-locations.js**

**Step 3: Commit**

```bash
git add apps/monte-da-estrada/src/data/map-locations.js
git commit -m "data: fix approximate map-locations coordinates after verification"
```

---

## Task 12: (Optional) Add maplibre-gl as peer dep in shared package.json

Documents the dependency requirement for future maintainers and Papa-Léguas setup.

**Files:**
- Modify: `packages/touril-ecosystem-ui-components/package.json`

**Step 1: Add peerDependencies**

```json
{
  "name": "@touril-ecosystem/ui-components",
  "private": true,
  "version": "0.1.0",
  "description": "Shared React component library for the Touril Ecosystem",
  "main": "src/index.js",
  "peerDependencies": {
    "maplibre-gl": ">=4.0.0",
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "scripts": {
    "build": "echo 'No build step yet — components are consumed directly via workspace'"
  }
}
```

**Step 2: Commit**

```bash
git add packages/touril-ecosystem-ui-components/package.json
git commit -m "chore(shared): document maplibre-gl as peer dependency for DiscoveryMap"
```
