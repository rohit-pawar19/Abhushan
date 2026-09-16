import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingBag, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { useStore } from '../context/useStore'
import { money } from '../data/catalog'
import CartItem from '../components/CartItem'
export default function Cart() {
  const { items, cartCount, cartTotal, clearCart } = useStore()
  const [checkout, setCheckout] = useState(false)
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">BEAUTIFUL CHOICES, ALL YOURS</span>
        <h1>Your jewellery box</h1>
        <p>A little closer to something special.</p>
      </div>
      <section className="container-wide cart-section">
        {!items.length ? (
          <div className="empty-state">
            <FiShoppingBag />
            <h2>Your jewellery box is waiting to be filled.</h2>
            <p>Find the piece that speaks to you.</p>
            <Link className="button" to="/products">
              Explore Jewellery <FiArrowRight />
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div>
              <div className="cart-list-heading">
                <span>
                  {cartCount} {cartCount === 1 ? 'piece' : 'pieces'} in your box
                </span>
                <button className="text-link" onClick={clearCart}>
                  Clear cart
                </button>
              </div>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <Link to="/products" className="text-link continue-shopping">
                <FiArrowLeft /> Continue exploring
              </Link>
            </div>
            <aside className="order-summary">
              <h2>Order Summary</h2>
              <dl>
                <div>
                  <dt>Items</dt>
                  <dd>{cartCount}</dd>
                </div>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{money(cartTotal)}</dd>
                </div>
                <div>
                  <dt>Delivery</dt>
                  <dd>
                    Free <small>(demo)</small>
                  </dd>
                </div>
                <div className="summary-total">
                  <dt>Total</dt>
                  <dd>{money(cartTotal)}</dd>
                </div>
              </dl>
              <button className="button" onClick={() => setCheckout(true)}>
                Proceed to Checkout <FiArrowRight />
              </button>
              {checkout && (
                <div className="checkout-message" role="status">
                  <strong>Your selection is ready.</strong>
                  <p>
                    This is a demo store. No order has been placed and no payment will be collected.
                    Your jewellery box has been saved.
                  </p>
                </div>
              )}
              <p className="small-muted">Demo checkout · No payment required</p>
            </aside>
          </div>
        )}
      </section>
    </>
  )
}
