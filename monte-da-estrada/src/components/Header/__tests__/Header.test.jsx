import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../Header';

/**
 * Test suite for Header component
 * Tests three-tier header functionality:
 * - Language selector (Tier 1)
 * - Branding section (Tier 2)
 * - Navigation (Tier 3)
 */

const mockNavigationItems = [
  { label: 'Início', path: '/' },
  { label: 'Quartos', path: '/quartos' },
  { label: 'Atividades', path: '/atividades' },
  { label: 'Localização', path: '/localizacao' },
];

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Header Component', () => {
  // ==================================
  // RENDERING TESTS
  // ==================================

  describe('Tier 1: Utility Bar (Language Selector)', () => {
    it('should render language selector with EN and PT options', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      expect(screen.getByRole('button', { name: /switch to english/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /mudar para português/i })).toBeInTheDocument();
    });

    it('should render separator between language options', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      const separator = screen.getByText('|');
      expect(separator).toBeInTheDocument();
    });

    it('should show PT as active by default', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
          currentLanguage="PT"
        />
      );

      const ptButton = screen.getByRole('button', { name: /mudar para português/i });
      expect(ptButton).toHaveClass('active');
    });

    it('should show EN as active when currentLanguage is EN', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
          currentLanguage="EN"
        />
      );

      const enButton = screen.getByRole('button', { name: /switch to english/i });
      expect(enButton).toHaveClass('active');
    });
  });

  describe('Tier 2: Branding Bar', () => {
    it('should render brand name', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      expect(screen.getByText('Monte da Estrada')).toBeInTheDocument();
    });

    it('should render logo image when provided', () => {
      const logoUrl = '/path/to/logo.jpg';
      renderWithRouter(
        <Header
          logo={logoUrl}
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      const logo = screen.getByAltText('Monte da Estrada');
      expect(logo).toHaveAttribute('src', logoUrl);
    });

    it('should not render logo image when not provided', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      expect(screen.queryByAltText('Monte da Estrada')).not.toBeInTheDocument();
    });

    it('should render RESERVAS button', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      expect(screen.getByRole('button', { name: /fazer reserva/i })).toBeInTheDocument();
    });

    it('should have branding section as a link to home', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toHaveAttribute('href', '/');
    });
  });

  describe('Tier 3: Navigation Bar', () => {
    it('should render all navigation items', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      mockNavigationItems.forEach((item) => {
        expect(screen.getByRole('link', { name: item.label })).toBeInTheDocument();
      });
    });

    it('should render navigation with correct paths', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      mockNavigationItems.forEach((item) => {
        const link = screen.getByRole('link', { name: item.label });
        expect(link).toHaveAttribute('href', item.path);
      });
    });

    it('should have navigation role', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      const nav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
    });
  });

  // ==================================
  // INTERACTION TESTS
  // ==================================

  describe('User Interactions', () => {
    it('should call onLanguageChange when language button is clicked', () => {
      const onLanguageChange = jest.fn();
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
          onLanguageChange={onLanguageChange}
        />
      );

      const enButton = screen.getByRole('button', { name: /switch to english/i });
      fireEvent.click(enButton);

      expect(onLanguageChange).toHaveBeenCalledWith('EN');
    });

    it('should call onReservasClick when RESERVAS button is clicked', () => {
      const onReservasClick = jest.fn();
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
          onReservasClick={onReservasClick}
        />
      );

      const reservasButton = screen.getByRole('button', { name: /fazer reserva/i });
      fireEvent.click(reservasButton);

      expect(onReservasClick).toHaveBeenCalled();
    });

    it('should switch language when both EN and PT buttons are clicked', () => {
      const onLanguageChange = jest.fn();
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
          onLanguageChange={onLanguageChange}
        />
      );

      const enButton = screen.getByRole('button', { name: /switch to english/i });
      const ptButton = screen.getByRole('button', { name: /mudar para português/i });

      fireEvent.click(enButton);
      fireEvent.click(ptButton);

      expect(onLanguageChange).toHaveBeenCalledTimes(2);
      expect(onLanguageChange).toHaveBeenNthCalledWith(1, 'EN');
      expect(onLanguageChange).toHaveBeenNthCalledWith(2, 'PT');
    });
  });

  // ==================================
  // EDGE CASES & ACCESSIBILITY
  // ==================================

  describe('Edge Cases', () => {
    it('should render with empty navigation items', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={[]}
        />
      );

      expect(screen.getByText('Monte da Estrada')).toBeInTheDocument();
    });

    it('should handle undefined onLanguageChange callback gracefully', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
          onLanguageChange={undefined}
        />
      );

      const enButton = screen.getByRole('button', { name: /switch to english/i });
      expect(() => fireEvent.click(enButton)).not.toThrow();
    });

    it('should handle undefined onReservasClick callback gracefully', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
          onReservasClick={undefined}
        />
      );

      const reservasButton = screen.getByRole('button', { name: /fazer reserva/i });
      expect(() => fireEvent.click(reservasButton)).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading role on header', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('should have proper aria labels on language buttons', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      const enButton = screen.getByRole('button', { name: /switch to english/i });
      const ptButton = screen.getByRole('button', { name: /mudar para português/i });

      expect(enButton).toHaveAttribute('aria-label', 'Switch to English');
      expect(ptButton).toHaveAttribute('aria-label', 'Mudar para Português');
    });

    it('should have aria-label on home link', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toHaveAttribute('aria-label', 'Home');
    });

    it('should have aria-label on RESERVAS button', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      const reservasButton = screen.getByRole('button', { name: /fazer reserva/i });
      expect(reservasButton).toHaveAttribute('aria-label', 'Fazer Reserva');
    });

    it('should have menu role on navigation list', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      const navList = screen.getByRole('menubar');
      expect(navList).toBeInTheDocument();
    });

    it('should set aria-current on active navigation link', () => {
      renderWithRouter(
        <Header
          brandName="Monte da Estrada"
          navigationItems={mockNavigationItems}
        />
      );

      // The home link should be active on the home page (path '/')
      const homeLink = screen.getByRole('link', { name: 'Início' });
      expect(homeLink).toHaveAttribute('aria-current', 'page');
    });
  });
});
