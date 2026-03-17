import { vi } from 'vitest'

/**
 * HeyNow Mock Infrastructure
 * 
 * This mock observes the document for the injection of the HeyNow script tag.
 * When the script is injected, it simulates the widget's behavior by finding
 * the container div (#HomePageWidget or #InlinePageWidget) and injecting
 * mock HTML that represents the calendar and inputs, allowing RTL to test interactions.
 */

// We can expose a mock render function so tests can force or delay rendering
export const mockHeyNowRender = vi.fn((containerId) => {
  const container = document.getElementById(containerId)
  if (!container) return

  // Inject a simplified version of the HeyNow DOM structure
  container.innerHTML = `
    <div class="heynow-mock-wrapper">
      <div class="inputs-row">
        <!-- Check-in / Check-out proxy -->
        <input type="text" id="checkin-mock" placeholder="Check-In" data-testid="checkin-input" />
        <input type="text" id="checkout-mock" placeholder="Check-Out" data-testid="checkout-input" />
        
        <!-- Search button proxy -->
        <button id="search-mock" data-testid="search-button">Procurar</button>
      </div>
      
      <!-- The calendar portal that HeyNow renders absolutely -->
      <div class="daterangepicker" data-testid="calendar-popup" style="display: none; position: absolute;">
        <div class="calendar-months">
          Mock Calendar UI
        </div>
      </div>
    </div>
  `

  // Simulate simple interaction logic
  const checkin = document.getElementById('checkin-mock')
  const checkout = document.getElementById('checkout-mock')
  const calendar = container.querySelector('.daterangepicker')

  const openCalendar = () => {
    if (calendar) calendar.style.display = 'block'
  }

  if (checkin) checkin.addEventListener('click', openCalendar)
  if (checkout) checkout.addEventListener('click', openCalendar)
})

// MutationObserver to watch for script tag injection
let observer = null

export function setupHeyNowScriptMock() {
  if (observer) observer.disconnect()

  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // If a script tag with the HeyNow src is added to the head
        if (node.tagName === 'SCRIPT' && node.src.includes('HomePageWidget/index.js')) {
          // Determine which widget container is in the DOM
          if (document.getElementById('HomePageWidget')) {
             mockHeyNowRender('HomePageWidget')
          } else if (document.getElementById('InlinePageWidget')) {
             mockHeyNowRender('InlinePageWidget')
          }
        }
      })
    })
  })

  observer.observe(document.body, { childList: true })
}

export function teardownHeyNowScriptMock() {
  if (observer) {
    observer.disconnect()
    observer = null
  }
  mockHeyNowRender.mockClear()
}
