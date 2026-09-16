import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'
window.scrollTo = vi.fn()
window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}))
// jsdom has no native dialog top layer. Browser focus trapping remains a manual check.
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute('open', '')
}
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute('open')
}
