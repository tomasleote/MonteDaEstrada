import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import MapLibreGL from 'maplibre-gl';
// Reason: maplibre-gl CSS must be imported for proper map rendering.
// Vite deduplicates identical CSS imports, so this is safe even if the app also imports it.
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './DiscoveryMap.module.scss';

// ── Constants ────────────────────────────────────────────────────────────────

const STYLE_URL = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const DEFAULT_CENTER = [-8.778352, 37.588126]; // Centroid of the Monte da Estrada region
const DEFAULT_ZOOM = 11;

const FILTERS = [
  { value: 'all',          label: 'Todos' },
  { value: 'collection',   label: 'A Nossa Coleção' },
  { value: 'gastronomia',  label: 'Gastronomia' },
  { value: 'beach',        label: 'Praias' },
  { value: 'curated',      label: 'Descobrir' },
];

// Maps category key → CSS module class name for the inner dot element
const DOT_CLASS = {
  collection:   'dotCollection',
  gastronomia:  'dotGastronomia',
  beach:        'dotBeach',
  curated:      'dotCurated',
};

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Creates the HTMLElement passed to MapLibre Marker as its custom element.
 * Reason: outer wrapper (markerWrapper) is the element MapLibre controls via
 * `transform: translate(...)`. An inner dot div carries all visual styles and
 * hover effects, keeping them isolated from MapLibre's positioning transforms.
 */
function createMarkerEl(category) {
  const wrapper = document.createElement('div');
  wrapper.className = styles.markerWrapper;

  const dot = document.createElement('div');
  dot.className = styles[DOT_CLASS[category]] || styles.dotCurated;

  wrapper.appendChild(dot);
  return wrapper;
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
        <div className={styles.popupCtaGroup}>
          {location.url && (
            <a
              href={location.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.popupCta}
            >
              Visitar →
            </a>
          )}
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

    // Navigation control: zoom in/out buttons (compass hidden — not needed for regional map)
    map.addControl(new MapLibreGL.NavigationControl({ showCompass: false }), 'top-right');
    // Fullscreen control
    map.addControl(new MapLibreGL.FullscreenControl(), 'top-right');

    // Close all popups when clicking on the map (outside a marker)
    map.on('click', () => {
      popupsRef.current.forEach((p) => {
        if (p.isOpen()) p.remove();
      });
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
        //offset:       14,
        closeButton:  false,
        closeOnClick: false,
        maxWidth:     'none',
      }).setDOMContent(popupContainer);

      // 2. Marker: custom branded dot element
      const el = createMarkerEl(location.category);
      const marker = new MapLibreGL.Marker({ element: el })
        .setLngLat(location.coordinates)
        .addTo(map);

      // 3. Click handler: always show popup with location details
      // stopPropagation prevents the map's click handler from immediately closing it
      el.addEventListener('click', (e) => {
        e.stopPropagation();
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
      category:    PropTypes.oneOf(['collection', 'gastronomia', 'beach', 'curated']).isRequired,
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
