import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor } from './setup/test-utils'
import InlineBookingWidget from '../InlineBookingWidget'
import { setupHeyNowScriptMock, teardownHeyNowScriptMock, mockHeyNowRender } from './setup/__mocks__/heynow.mock'

// Categories 3 and 8: Inline Widget Rendering & DOM Stability

describe('InlineBookingWidget Rendering and DOM Stability', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    setupHeyNowScriptMock()
    document.head.innerHTML = ''
    document.body.innerHTML = ''
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    teardownHeyNowScriptMock()
  })

  it('renders the loading state immediately', () => {
    render(<InlineBookingWidget />)
    
    // Loading indicator
    expect(screen.getByText('A carregar disponibilidade...')).toBeInTheDocument()
    
    // The wrapper should hit the DOM right away
    expect(document.getElementById('HomePageWidget')).toBeInTheDocument()
    
    // But the script won't have initialized the mock until async lifecycle resolves
    expect(mockHeyNowRender).not.toHaveBeenCalled()
  })

  it('injects the script, renders mock UI, and hides loading state', async () => {
    // We use real timers here because the 10ms initialization timeout and MutationObservers
    // don't always resolve cleanly under Vitest's fake timer loop.
    vi.useRealTimers()
    
    render(<InlineBookingWidget />)

    // Wait for the mock to observe the script being appended to body
    // Real timers allow standard setTimeout and MutationObserver microtasks to fire naturally
    await waitFor(() => {
      expect(mockHeyNowRender).toHaveBeenCalledWith('HomePageWidget')
    }, { timeout: 2000 })

    // Assert the mocked widget input elements are rendered
    const checkinInput = screen.getByTestId('checkin-input')
    expect(checkinInput).toBeInTheDocument()
    
    // Test the interaction: clicking the date inputs should trigger the calendar
    const calendar = screen.getByTestId('calendar-popup')
    expect(calendar).toHaveStyle({ display: 'none' }) // Initially hidden
    
    // Simulate interaction
    checkinInput.click()
    
    // Ensure the calendar interacted
    expect(calendar).toHaveStyle({ display: 'block' })

    // The loading skeleton text should be destroyed
    await waitFor(() => {
      expect(screen.queryByText('A carregar disponibilidade...')).not.toBeInTheDocument()
    })
  })
  
  it('shows failsafe fallback if widget does not load within 3 seconds', async () => {
    // Disable the mock so the checkInterval never succeeds (simulating network failure)
    teardownHeyNowScriptMock()
    
    render(<InlineBookingWidget />)
    
    vi.advanceTimersByTime(3100) // Advance past 3s failsafe timeout

    await waitFor(() => {
      expect(screen.getByText('Não foi possível carregar o motor de reservas.')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /Verificar disponibilidade/i })).toBeInTheDocument()
    })
  })

  it('keeps its script tag on unmount for singleton reuse', async () => {
    const { unmount } = render(<InlineBookingWidget />)

    vi.advanceTimersByTime(250)

    await waitFor(() => {
      expect(mockHeyNowRender).toHaveBeenCalledWith('HomePageWidget')
    })

    const scriptInDOM = document.body.querySelectorAll('script[src*="HomePageWidget"]').length
    expect(scriptInDOM).toBe(1)
    
    // Trigger React unmount
    unmount()
    
    // The component MUST NOT remove the script so it can be reused across pages
    const remainingScriptCount = document.body.querySelectorAll('script[src*="HomePageWidget"]').length
    expect(remainingScriptCount).toBe(1)
  })
})
