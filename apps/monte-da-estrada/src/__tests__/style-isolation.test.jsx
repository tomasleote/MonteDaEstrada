/**
 * Style Isolation Tests
 * Verifies that SCSS Modules prevent CSS leakage into parent site
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

describe.skip('SCSS Modules Style Isolation', () => {
  describe('Header Component', () => {
    it('should use scoped CSS classes (CSS Modules)', () => {
      const { container } = render(
        <BrowserRouter>
          <Header
            brandName="Monte da Estrada"
            navigationItems={[
              { label: 'Início', path: '/' },
              { label: 'Quartos', path: '/quartos' }
            ]}
          />
        </BrowserRouter>
      );

      const header = container.querySelector('header');
      expect(header).toBeTruthy();

      // Check that class names are scoped (contain hash)
      const className = header.className;
      expect(className).toMatch(/Header_/); // Should have module prefix
      expect(className).toMatch(/_[a-zA-Z0-9]{5,}/); // Should have hash suffix
    });

    it('should not pollute global namespace', () => {
      const beforeClasses = document.body.className;

      render(
        <BrowserRouter>
          <Header
            brandName="Monte da Estrada"
            navigationItems={[
              { label: 'Início', path: '/' }
            ]}
          />
        </BrowserRouter>
      );

      const afterClasses = document.body.className;

      // Body class should remain unchanged
      expect(beforeClasses).toBe(afterClasses);
    });

    it('should not create global class names', () => {
      const { container } = render(
        <BrowserRouter>
          <Header
            brandName="Monte da Estrada"
            navigationItems={[
              { label: 'Início', path: '/' }
            ]}
          />
        </BrowserRouter>
      );

      // Find all elements with class names
      const allElements = container.querySelectorAll('[class]');

      allElements.forEach(element => {
        const classes = element.className.split(' ');
        classes.forEach(className => {
          // Every class should either be scoped or a utility class
          const isScoped = className.includes('_'); // CSS Module scoping
          const isUtility = className.startsWith('util-') || className.startsWith('skip-to');
          const isEmpty = className.trim() === '';

          expect(isScoped || isUtility || isEmpty).toBe(true);
        });
      });
    });
  });

  describe('Footer Component', () => {
    it('should use scoped CSS classes (CSS Modules)', () => {
      const { container } = render(
        <BrowserRouter>
          <Footer
            contactInfo={{
              phone: '123456789',
              email: 'test@example.com',
              address: 'Test Address'
            }}
            quickLinks={[
              { label: 'Home', path: '/' }
            ]}
          />
        </BrowserRouter>
      );

      const footer = container.querySelector('footer');
      expect(footer).toBeTruthy();

      // Check that class names are scoped (contain hash)
      const className = footer.className;
      expect(className).toMatch(/Footer_/); // Should have module prefix
      expect(className).toMatch(/_[a-zA-Z0-9]{5,}/); // Should have hash suffix
    });
  });

  describe('CSS Specificity', () => {
    it('should not override parent site styles', () => {
      // Create a mock parent site element with styles
      const parentElement = document.createElement('div');
      parentElement.className = 'parent-site-header';
      parentElement.style.backgroundColor = 'red';
      document.body.appendChild(parentElement);

      const initialBgColor = window.getComputedStyle(parentElement).backgroundColor;

      // Render Header component
      render(
        <BrowserRouter>
          <Header
            brandName="Monte da Estrada"
            navigationItems={[
              { label: 'Início', path: '/' }
            ]}
          />
        </BrowserRouter>
      );

      // Parent element styles should remain unchanged
      const finalBgColor = window.getComputedStyle(parentElement).backgroundColor;
      expect(finalBgColor).toBe(initialBgColor);

      // Cleanup
      document.body.removeChild(parentElement);
    });
  });

  describe('Style Encapsulation', () => {
    it('should have isolated styles for navigation links', () => {
      const { container } = render(
        <BrowserRouter>
          <Header
            brandName="Monte da Estrada"
            navigationItems={[
              { label: 'Início', path: '/' },
              { label: 'Quartos', path: '/quartos' }
            ]}
          />
        </BrowserRouter>
      );

      const navLinks = container.querySelectorAll('a');

      navLinks.forEach(link => {
        const classes = link.className.split(' ').filter(c => c.trim() !== '');

        // Every class should be scoped
        classes.forEach(className => {
          expect(className).toMatch(/_/); // Has scoping separator
        });
      });
    });

    it('should have isolated styles for buttons', () => {
      const { container } = render(
        <BrowserRouter>
          <Header
            brandName="Monte da Estrada"
            navigationItems={[]}
            onReservasClick={() => {}}
          />
        </BrowserRouter>
      );

      const buttons = container.querySelectorAll('button');

      buttons.forEach(button => {
        const classes = button.className.split(' ').filter(c => c.trim() !== '');

        // Every class should be scoped
        classes.forEach(className => {
          expect(className).toMatch(/_/); // Has scoping separator
        });
      });
    });
  });

  describe('No Global CSS Leaks', () => {
    it('should not define global CSS selectors', () => {
      // Check that no global .header class exists in stylesheets
      const stylesheets = Array.from(document.styleSheets);

      let hasGlobalHeaderClass = false;

      stylesheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules || []);
          rules.forEach(rule => {
            if (rule.selectorText) {
              // Check for unscoped .header selector (bad)
              if (rule.selectorText.match(/^\.header\b/) ||
                  rule.selectorText.match(/^\.nav\b/) ||
                  rule.selectorText.match(/^\.footer\b/)) {
                hasGlobalHeaderClass = true;
              }
            }
          });
        } catch (e) {
          // Cross-origin stylesheets can't be accessed
          // This is fine, we only care about our own styles
        }
      });

      expect(hasGlobalHeaderClass).toBe(false);
    });
  });
});

describe.skip('Safe Parent Site Integration', () => {
  it('should be safe to mount alongside other components', () => {
    // Create mock parent site component
    const parentDiv = document.createElement('div');
    parentDiv.className = 'parent-component';
    document.body.appendChild(parentDiv);

    // Render Monte da Estrada components
    const { container: header } = render(
      <BrowserRouter>
        <Header
          brandName="Monte da Estrada"
          navigationItems={[
            { label: 'Início', path: '/' }
          ]}
        />
      </BrowserRouter>
    );

    const { container: footer } = render(
      <BrowserRouter>
        <Footer
          contactInfo={{
            phone: '123456789',
            email: 'test@example.com',
            address: 'Test Address'
          }}
          quickLinks={[]}
        />
      </BrowserRouter>
    );

    // Verify parent component still exists and is unchanged
    expect(document.body.contains(parentDiv)).toBe(true);
    expect(parentDiv.className).toBe('parent-component');

    // Cleanup
    document.body.removeChild(parentDiv);
  });

  it('should not interfere with parent site class names', () => {
    // Create elements with similar class names as Monte da Estrada
    const testDiv = document.createElement('div');
    testDiv.className = 'header navigation button';
    document.body.appendChild(testDiv);

    const initialClassName = testDiv.className;

    // Render Header
    render(
      <BrowserRouter>
        <Header
          brandName="Monte da Estrada"
          navigationItems={[
            { label: 'Início', path: '/' }
          ]}
        />
      </BrowserRouter>
    );

    // Class names should remain unchanged
    expect(testDiv.className).toBe(initialClassName);

    // Cleanup
    document.body.removeChild(testDiv);
  });
});
