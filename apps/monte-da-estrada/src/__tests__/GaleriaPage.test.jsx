// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import GaleriaPage from '../pages/GaleriaPage/GaleriaPage';

// Mock @/motion — ScrollReveal/StaggerChildren use IntersectionObserver not available in jsdom
// Use importOriginal to preserve variant presets (heroTitle, heroSubtitle, etc.) used by Hero
vi.mock('@/motion', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    ScrollReveal: ({ children }) => children,
    StaggerChildren: ({ children }) => children,
  };
});

// Mock CategoryNav — it uses IntersectionObserver not available in jsdom
vi.mock('@touril-ecosystem/ui-components', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    CategoryNav: ({ items }) => (
      <nav data-testid="category-nav">
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`}>{item.label}</a>
        ))}
      </nav>
    ),
  };
});

afterEach(cleanup);

const renderPage = () =>
  render(
    <HelmetProvider>
      <BrowserRouter>
        <GaleriaPage />
      </BrowserRouter>
    </HelmetProvider>
  );

describe('GaleriaPage', () => {
  it('renders both editorial sections', () => {
    renderPage();
    expect(screen.getByText('O Espaço')).toBeTruthy();
    expect(screen.getByText('O Território')).toBeTruthy();
  });

  it('renders the CategoryNav with correct labels', () => {
    renderPage();
    expect(screen.getByText('O Monte')).toBeTruthy();
    expect(screen.getByText('A Região')).toBeTruthy();
  });

  it('each section has a masonry grid with images', () => {
    renderPage();
    const images = document.querySelectorAll('img[loading="lazy"]');
    expect(images.length).toBeGreaterThan(5);
  });
});
