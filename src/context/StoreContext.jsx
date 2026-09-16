import { useEffect, useRef, useState } from 'react'
import { StoreContext } from './useStore'
import { readStorage } from '../utils/storage'
import { catalog } from '../data/catalog'

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = readStorage('abhusan-cart', [])
    return Array.isArray(saved)
      ? saved
          .filter(
            (x) =>
              catalog.some((p) => p.id === x?.id) && Number.isInteger(x.quantity) && x.quantity > 0,
          )
          .map((x) => ({ id: x.id, quantity: Math.min(x.quantity, 99) }))
      : []
  })
  const [user, setUser] = useState(() => {
    const saved =
      readStorage('abhusan-user', null) || readStorage('abhusan-user', null, 'sessionStorage')
    return saved && typeof saved.name === 'string' && typeof saved.email === 'string' ? saved : null
  })
  const [notice, setNotice] = useState('')
  const timer = useRef()
  function notify(message) {
    setNotice(message)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setNotice(''), 3500)
  }
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    try {
      localStorage.setItem('abhusan-cart', JSON.stringify(cart))
    } catch {
      const pending = setTimeout(
        () =>
          setNotice('Your browser cannot save this cart. Keep this tab open to retain your items.'),
        0,
      )
      return () => clearTimeout(pending)
    }
  }, [cart])
  const items = cart.map((item) => ({
    ...catalog.find((p) => p.id === item.id),
    quantity: item.quantity,
  }))
  function addToCart(product) {
    setCart((previous) => {
      const found = previous.find((x) => x.id === product.id)
      return found
        ? previous.map((x) =>
            x.id === product.id ? { ...x, quantity: Math.min(x.quantity + 1, 99) } : x,
          )
        : [...previous, { id: product.id, quantity: 1 }]
    })
    notify('Added to your jewellery box')
  }
  function changeQuantity(id, amount) {
    setCart((previous) =>
      previous.map((x) =>
        x.id === id ? { ...x, quantity: Math.max(1, Math.min(99, x.quantity + amount)) } : x,
      ),
    )
  }
  function signIn(account, remember) {
    const minimal = { name: account.name, email: account.email }
    setUser(minimal)
    try {
      localStorage.removeItem('abhusan-user')
      sessionStorage.removeItem('abhusan-user')
      ;(remember ? localStorage : sessionStorage).setItem('abhusan-user', JSON.stringify(minimal))
    } catch {
      notify('Signed in for this visit; browser storage is unavailable.')
    }
  }
  function signOut() {
    setUser(null)
    try {
      localStorage.removeItem('abhusan-user')
      sessionStorage.removeItem('abhusan-user')
    } catch {
      /* State still signs out when storage is unavailable. */
    }
    notify('You have been signed out')
  }
  return (
    <StoreContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart: (id) => setCart((c) => c.filter((x) => x.id !== id)),
        increaseQuantity: (id) => changeQuantity(id, 1),
        decreaseQuantity: (id) => changeQuantity(id, -1),
        clearCart: () => setCart([]),
        cartCount: items.reduce((n, x) => n + x.quantity, 0),
        cartTotal: items.reduce((n, x) => n + x.price * x.quantity, 0),
        user,
        signIn,
        signOut,
        notify,
      }}
    >
      {children}
      <div className={`store-toast ${notice ? 'visible' : ''}`} role="status">
        {notice && (
          <>
            <span>✓</span> {notice}
          </>
        )}
      </div>
    </StoreContext.Provider>
  )
}
