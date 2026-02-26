// ==================================
// Boutique Collection — Shared UI Library
// ==================================
// Components and utilities shared across all properties.

// ============================================
// COMPONENTS
// ============================================

export { default as Header } from './components/Header';
export { default as HeaderModern } from './components/HeaderModern';
export { default as Footer } from './components/Footer';
export { default as footerDefaultConfig } from './components/Footer/defaultConfig';
export { default as CollectionSwitcher } from './components/CollectionSwitcher';
export { default as Button } from './components/Button';
export { default as RoomCard } from './components/RoomCard';
export { default as RoomExpandedCard } from './components/RoomExpandedCard';
export { default as RoomCardGallery } from './components/RoomCardGallery';

// ============================================
// HOMEPAGE EDITORIAL COMPONENTS
// ============================================

export { default as SectionEyebrow } from './components/SectionEyebrow';
export { default as ImmersiveHero } from './components/ImmersiveHero';
export { default as EditorialAnchor } from './components/EditorialAnchor';
export { default as EditorialSplitSection } from './components/EditorialSplitSection';
export { default as RoomGrid } from './components/RoomGrid';
export { default as FullBleedImage } from './components/FullBleedImage';
export { default as ActivityHighlights } from './components/ActivityHighlights';
export { default as BookingSection } from './components/BookingSection';
export { default as GalleryPreview } from './components/GalleryPreview';

// ============================================
// DISCOVERY ECOSYSTEM COMPONENTS (Phase A)
// ============================================

// PageHero: canonical internal-page hero. DiscoveryHero is a backwards-compatible alias.
export { default as PageHero, default as DiscoveryHero } from './components/PageHero';
export { default as ExperienceCard } from './components/ExperienceCard';
export { default as EditorialPullQuote } from './components/EditorialPullQuote';

// ============================================
// DISCOVERY ECOSYSTEM COMPONENTS (Phase B)
// ============================================

export { default as CategoryNav } from './components/CategoryNav';
export { default as BeachCard } from './components/BeachCard';

// ============================================
// DISCOVERY ECOSYSTEM COMPONENTS (Phase C)
// ============================================

export { default as FullBleedQuote } from './components/FullBleedQuote';
export { default as AttractionPinCard } from './components/AttractionPinCard';
export { default as DistanceFilterBar } from './components/DistanceFilterBar';

// ============================================
// DISCOVERY ECOSYSTEM COMPONENTS (Phase E)
// ============================================

export { default as AmenityStrip } from './components/AmenityStrip';

// ============================================
// MAP COMPONENT
// ============================================

export { default as DiscoveryMap } from './components/DiscoveryMap';

// ============================================
// CONSTANTS
// ============================================

export { duration, ease, stagger, distance, viewport, variants } from './constants/motion';
