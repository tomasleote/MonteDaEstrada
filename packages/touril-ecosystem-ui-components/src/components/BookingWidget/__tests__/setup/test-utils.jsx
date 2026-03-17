import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

/**
 * Custom render function for tests that require Router or Helmet contexts.
 * Many components like BookingModal or NavBar contain Links that will throw
 * if rendered outside a Router.
 */
function customRender(ui, options = {}) {
  return render(ui, {
    // Wrap component in standard providers used in the app
    wrapper: ({ children }) => (
      <HelmetProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </HelmetProvider>
    ),
    ...options,
  })
}

// Re-export everything from RTL
export * from '@testing-library/react'

// Override render method
export { customRender as render }
