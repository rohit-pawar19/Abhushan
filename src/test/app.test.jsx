import { StrictMode } from 'react'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, within, cleanup, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import App from '../App'
import { products, collections, slides, money } from '../data/catalog'

let consoleError
function open(path = '/') {
  window.history.replaceState({}, '', path)
  return render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
const main = () => within(screen.getByRole('main'))
beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => {
  cleanup()
  vi.useRealTimers()
  expect(consoleError).not.toHaveBeenCalled()
  consoleError.mockRestore()
})

describe('Shopping journey', () => {
  it('adds the exact product, recalculates quantities, persists a remount and removes it', async () => {
    const user = userEvent.setup()
    let app = open('/products')
    await user.click(screen.getByRole('button', { name: 'Add Gulabi Drop Earrings to cart' }))
    expect(screen.getAllByRole('link', { name: 'Cart (1)' }).length).toBeGreaterThan(0)
    await user.click(screen.getAllByRole('link', { name: 'Cart (1)' }).at(-1))
    expect(main().getByRole('heading', { name: 'Gulabi Drop Earrings' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Increase Gulabi Drop Earrings quantity' }))
    expect(document.querySelector('.summary-total')).toHaveTextContent(money(25998))
    expect(JSON.parse(localStorage.getItem('abhusan-cart'))).toEqual([{ id: 'p1', quantity: 2 }])
    app.unmount()
    app = open('/cart')
    expect(document.querySelector('.summary-total')).toHaveTextContent(money(25998))
    await user.click(screen.getByRole('button', { name: 'Decrease Gulabi Drop Earrings quantity' }))
    expect(document.querySelector('.summary-total')).toHaveTextContent(money(12999))
    expect(
      screen.getByRole('button', { name: 'Decrease Gulabi Drop Earrings quantity' }),
    ).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Proceed to Checkout' }))
    expect(screen.getByText(/No order has been placed/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Remove Gulabi Drop Earrings' }))
    expect(screen.getByText('Your jewellery box is waiting to be filled.')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('abhusan-cart'))).toEqual([])
  })

  it('adds a collection item from its modal and displays feedback inside it', async () => {
    const user = userEvent.setup()
    open()
    await user.click(screen.getByRole('button', { name: /Necklaces A little grandeur/ }))
    const dialog = screen.getByRole('dialog')
    expect(
      within(dialog).getByRole('heading', { name: 'Rajwada Heritage Necklace' }),
    ).toBeInTheDocument()
    await user.click(within(dialog).getByRole('button', { name: 'Add to Cart' }))
    expect(within(dialog).getByRole('status')).toHaveTextContent('Added to your jewellery box.')
    expect(JSON.parse(localStorage.getItem('abhusan-cart'))).toEqual([{ id: 'c1', quantity: 1 }])
    await user.click(within(dialog).getByRole('button', { name: 'Close collection' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(screen.getAllByRole('link', { name: 'Cart (1)' }).at(-1))
    expect(screen.getByRole('heading', { name: 'Rajwada Heritage Necklace' })).toBeInTheDocument()
  })

  it('closes the collection on the native cancel event and clears a multi-item cart', async () => {
    const user = userEvent.setup()
    open()
    await user.click(screen.getByRole('button', { name: /Necklaces A little grandeur/ }))
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: true }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Add Gulabi Drop Earrings to cart' }))
    await user.click(screen.getByRole('button', { name: 'Add Meher Heritage Necklace to cart' }))
    await user.click(screen.getAllByRole('link', { name: 'Cart (2)' }).at(-1))
    expect(document.querySelector('.summary-total')).toHaveTextContent(money(47998))
    await user.click(screen.getByRole('button', { name: 'Clear cart' }))
    expect(screen.getByText('Your jewellery box is waiting to be filled.')).toBeInTheDocument()
  })

  it('recovers from malformed saved cart data and rejects unknown products', () => {
    localStorage.setItem(
      'abhusan-cart',
      JSON.stringify([{ id: 'missing', quantity: 1 }, { id: 'p1', quantity: -2 }, null]),
    )
    const app = open('/cart')
    expect(screen.getByText('Your jewellery box is waiting to be filled.')).toBeInTheDocument()
    app.unmount()
    localStorage.setItem('abhusan-cart', '{bad json')
    open('/cart')
    expect(screen.getByText('Your jewellery box is waiting to be filled.')).toBeInTheDocument()
  })
})

describe('Catalogue and navigation', () => {
  it('sorts prices in both directions and combines search with category filtering', async () => {
    const user = userEvent.setup()
    open('/products')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Sort products' }), 'low')
    expect(screen.getAllByRole('article')[0]).toHaveTextContent('Noor Floral Ring')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Sort products' }), 'high')
    expect(screen.getAllByRole('article')[0]).toHaveTextContent('Panna Royal Necklace')
    await user.click(screen.getByRole('button', { name: 'Rings', exact: true }))
    expect(screen.getAllByRole('article')).toHaveLength(2)
    await user.type(screen.getByRole('searchbox'), 'Neelam')
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getAllByRole('article')[0]).toHaveTextContent('Neelam Solitaire Ring')
    await user.clear(screen.getByRole('searchbox'))
    await user.type(screen.getByRole('searchbox'), 'not-a-product')
    expect(screen.getByText('No pieces found')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Show all jewellery' }))
    expect(screen.getAllByRole('article')).toHaveLength(9)
  })

  it('renders every requested route and the fallback page', () => {
    for (const [path, title] of [
      ['/', 'Abhusan — Timeless Indian Jewellery'],
      ['/products', 'Find your forever favourites.'],
      ['/cart', 'Your jewellery box'],
      ['/about', 'Crafted in Tradition.'],
      ['/contact', 'A conversation, with a little sparkle.'],
      ['/login', 'Welcome back.'],
      ['/signup', 'Begin your story.'],
      ['/terms', 'Terms & Privacy'],
      ['/unknown', 'This little gem is missing.'],
    ]) {
      const app = open(path)
      expect(main().getByRole('heading', { level: 1 }).textContent).toContain(title)
      expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
      app.unmount()
    }
  })

  it('opens the mobile menu and closes it when a route is chosen', async () => {
    const user = userEvent.setup()
    open()
    const toggle = screen.getByRole('button', { name: 'Open navigation' })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.click(within(screen.getByRole('navigation')).getByRole('link', { name: 'Products' }))
    expect(screen.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(main().getByRole('heading', { level: 1 })).toHaveTextContent(
      'Find your forever favourites.',
    )
  })

  it('uses the existing asset files for every product, collection, and slide', () => {
    for (const item of [...products, ...collections, ...slides]) {
      expect(item.image).toMatch(/^\/src\/assets\//)
      expect(existsSync(resolve(process.cwd(), decodeURIComponent(item.image.slice(1))))).toBe(true)
    }
  })
})

describe('Carousel', () => {
  it('autoplays while hovered or focused, and supports explicit pause and resume', () => {
    vi.useFakeTimers()
    open()
    const current = () => screen.getByRole('button', { name: 'Go to slide 1' })
    expect(current()).toHaveAttribute('aria-current', 'true')
    act(() => vi.advanceTimersByTime(6500))
    expect(screen.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
      'aria-current',
      'true',
    )
    fireEvent.mouseEnter(screen.getByRole('region', { name: 'Featured jewellery' }))
    fireEvent.focus(screen.getByRole('button', { name: 'Next slide' }))
    act(() => vi.advanceTimersByTime(6500))
    expect(screen.getByRole('button', { name: 'Go to slide 3' })).toHaveAttribute(
      'aria-current',
      'true',
    )
    fireEvent.mouseLeave(screen.getByRole('region', { name: 'Featured jewellery' }))
    fireEvent.click(screen.getByRole('button', { name: 'Pause slideshow' }))
    act(() => vi.advanceTimersByTime(6500))
    expect(screen.getByRole('button', { name: 'Go to slide 3' })).toHaveAttribute(
      'aria-current',
      'true',
    )
    fireEvent.click(screen.getByRole('button', { name: 'Play slideshow' }))
    act(() => vi.advanceTimersByTime(6500))
    expect(screen.getByRole('button', { name: 'Go to slide 1' })).toHaveAttribute(
      'aria-current',
      'true',
    )
  })

  it('supports previous/next, slide indicators and the real Explore All link', async () => {
    const user = userEvent.setup()
    open()
    await user.click(screen.getByRole('button', { name: 'Next slide' }))
    expect(screen.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
      'aria-current',
      'true',
    )
    await user.click(screen.getByRole('button', { name: 'Previous slide' }))
    expect(screen.getByRole('button', { name: 'Go to slide 1' })).toHaveAttribute(
      'aria-current',
      'true',
    )
    await user.click(screen.getByRole('button', { name: 'Go to slide 3' }))
    await user.click(
      within(screen.getByRole('region', { name: 'Featured jewellery' })).getByRole('link', {
        name: 'Explore All',
      }),
    )
    expect(main().getByRole('heading', { level: 1 })).toHaveTextContent(
      'Find your forever favourites.',
    )
  })
})

describe('Demo account and contact forms', () => {
  it('validates signup, rejects mismatched passwords and only persists name and email', async () => {
    const user = userEvent.setup()
    open('/signup')
    const form = document.querySelector('form')
    expect(form.checkValidity()).toBe(false)
    await user.type(screen.getByLabelText('Full name'), 'Asha Sharma')
    await user.type(screen.getByLabelText('Email address'), 'asha@example.com')
    await user.type(screen.getByLabelText('Phone number'), '9876543210')
    await user.type(screen.getByLabelText('Password', { exact: true }), 'testsecret123')
    await user.type(screen.getByLabelText('Confirm password'), 'different123')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Create Account' }))
    expect(screen.getByRole('alert')).toHaveTextContent('passwords do not match')
    await user.clear(screen.getByLabelText('Confirm password'))
    await user.type(screen.getByLabelText('Confirm password'), 'testsecret123')
    await user.click(screen.getByRole('button', { name: 'Create Account' }))
    expect(main().getByRole('heading', { level: 1 })).toHaveTextContent(
      'Find your forever favourites.',
    )
    expect(JSON.parse(localStorage.getItem('abhusan-profile'))).toEqual({
      name: 'Asha Sharma',
      email: 'asha@example.com',
    })
    expect(JSON.stringify(localStorage)).not.toContain('testsecret123')
    expect(JSON.stringify(localStorage)).not.toContain('9876543210')
  })

  it('validates login, toggles passwords, explains reset and persists only a session when not remembered', async () => {
    const user = userEvent.setup()
    open('/login')
    const email = screen.getByLabelText('Email address')
    expect(document.querySelector('form').checkValidity()).toBe(false)
    await user.type(email, 'invalid')
    expect(email.validity.typeMismatch).toBe(true)
    await user.clear(email)
    await user.type(email, 'asha@example.com')
    const password = screen.getByLabelText('Password')
    expect(password).toHaveAttribute('minlength', '8')
    await user.type(password, 'testsecret123')
    await user.click(screen.getByRole('button', { name: 'Show passwords' }))
    expect(password).toHaveAttribute('type', 'text')
    await user.click(screen.getByRole('button', { name: 'Hide passwords' }))
    expect(password).toHaveAttribute('type', 'password')
    await user.click(screen.getByRole('button', { name: 'Forgot Password?' }))
    expect(screen.getByText(/No reset email is sent/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Login', exact: true }))
    expect(localStorage.getItem('abhusan-user')).toBeNull()
    expect(JSON.parse(sessionStorage.getItem('abhusan-user')).email).toBe('asha@example.com')
    await user.click(screen.getByRole('button', { name: 'Sign out' }))
    expect(sessionStorage.getItem('abhusan-user')).toBeNull()
  })

  it('remembers a demo login across remounts', async () => {
    const user = userEvent.setup()
    const app = open('/login')
    await user.type(screen.getByLabelText('Email address'), 'asha@example.com')
    await user.type(screen.getByLabelText('Password'), 'testsecret123')
    await user.click(screen.getByRole('checkbox', { name: 'Remember me' }))
    await user.click(screen.getByRole('button', { name: 'Login', exact: true }))
    app.unmount()
    open('/products')
    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument()
    expect(JSON.stringify(localStorage)).not.toContain('testsecret123')
  })

  it('validates contact fields and clearly confirms that the message was not sent', async () => {
    const user = userEvent.setup()
    open('/contact?subject=Jewellery%20care')
    expect(screen.getByLabelText('Subject')).toHaveValue('Jewellery care')
    expect(document.querySelector('form').checkValidity()).toBe(false)
    await user.type(screen.getByLabelText('Full name'), 'Asha Sharma')
    await user.type(screen.getByLabelText('Email address'), 'asha@example.com')
    await user.type(screen.getByLabelText('Phone number'), '9876543210')
    await user.type(screen.getByLabelText('Your message'), 'How should I care for my jewellery?')
    await user.click(screen.getByRole('button', { name: 'Send Message' }))
    expect(screen.getByText(/nothing was sent/)).toBeInTheDocument()
  })
})

describe('Individual product pages', () => {
  it('opens product photography and titles as links, then adds the exact detail-page product', async () => {
    const user = userEvent.setup()
    open('/products')
    expect(
      screen.getByRole('link', { name: 'Neelam Solitaire Ring', exact: true }),
    ).toHaveAttribute('href', '/products/p3')
    await user.click(screen.getByRole('link', { name: 'View Neelam Solitaire Ring' }))
    expect(main().getByRole('heading', { level: 1 })).toHaveTextContent('Neelam Solitaire Ring')
    expect(document.title).toBe('Abhusan | Neelam Solitaire Ring')
    expect(screen.getByText(products[2].description)).toBeInTheDocument()
    await user.click(
      within(document.querySelector('.product-detail')).getByRole('button', {
        name: 'Add to Cart',
      }),
    )
    expect(JSON.parse(localStorage.getItem('abhusan-cart'))).toEqual([{ id: 'p3', quantity: 1 }])
    await user.click(screen.getByRole('link', { name: 'View your jewellery box' }))
    expect(main().getByRole('heading', { name: 'Neelam Solitaire Ring' })).toBeInTheDocument()
  })

  it('supports a direct URL for all nine products', () => {
    for (const product of products) {
      const app = open('/products/' + product.id)
      expect(main().getByRole('heading', { level: 1 })).toHaveTextContent(product.name)
      expect(
        within(document.querySelector('.product-detail-image')).getByRole('img'),
      ).toHaveAttribute('src', product.image)
      app.unmount()
    }
  })

  it('handles an unknown product with a working link back to the catalogue', async () => {
    const user = userEvent.setup()
    open('/products/missing')
    expect(main().getByRole('heading', { level: 1 })).toHaveTextContent(
      "We couldn't find that piece.",
    )
    await user.click(screen.getByRole('link', { name: 'Back to Products' }))
    expect(main().getByRole('heading', { level: 1 })).toHaveTextContent(
      'Find your forever favourites.',
    )
  })

  it('uses the supplied logo and retains a real Explore All link on every slide', async () => {
    const user = userEvent.setup()
    open()
    expect(screen.getAllByRole('img', { name: 'Abhusan jewellery' })).toHaveLength(2)
    for (let i = 0; i < slides.length; i++) {
      await user.click(screen.getByRole('button', { name: 'Go to slide ' + (i + 1) }))
      const slide = screen.getByRole('group', { name: 'Slide ' + (i + 1) + ' of 3' })
      expect(within(slide).getByRole('img')).toHaveAttribute('src', slides[i].image)
      expect(within(slide).getByRole('link', { name: 'Explore All' })).toHaveAttribute(
        'href',
        '/products',
      )
    }
  })
})
