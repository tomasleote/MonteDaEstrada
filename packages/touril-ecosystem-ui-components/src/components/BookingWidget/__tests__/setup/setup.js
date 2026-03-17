import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Mock IntersectionObserver for jsdom (fixes Framer Motion crashes)
class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IntersectionObserver

// Cleans up the DOM after each test
afterEach(() => {
  cleanup()
  // Clean up any globally injected scripts/links manually as well
  document.head.innerHTML = ''
})
