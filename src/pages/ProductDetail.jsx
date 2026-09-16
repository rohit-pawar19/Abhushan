import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi'
import { products, money } from '../data/catalog'
import { useStore } from '../context/useStore'
import ProductGrid from '../components/ProductGrid'
import '../styles/product-detail.css'

export default function ProductDetail() {
  const { productId } = useParams()
  const product = products.find((item) => item.id === productId)
  const { addToCart } = useStore()
  if (!product)
    return (
      <section className="empty-state">
        <h1>We couldn't find that piece.</h1>
        <p>Explore the collection to find your next favourite.</p>
        <Link to="/products" className="button">
          Back to Products
        </Link>
      </section>
    )
  const related = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  )
  return (
    <div className="container-wide product-detail-page">
      <nav className="product-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span aria-current="page">{product.name}</span>
      </nav>
      <article className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-copy">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-price">{money(product.price)}</p>
          <p>{product.description}</p>
          <button className="button" onClick={() => addToCart(product)}>
            <FiShoppingBag /> Add to Cart
          </button>
          <Link to="/cart" className="text-link">
            View your jewellery box
          </Link>
          <div className="product-detail-notes">
            <h2>The details</h2>
            <dl>
              <div>
                <dt>Collection</dt>
                <dd>{product.category}</dd>
              </div>
              <div>
                <dt>Product reference</dt>
                <dd>ABH-{product.id.toUpperCase()}</dd>
              </div>
            </dl>
            <p>
              Illustrative catalogue price. Materials, stone types, sizes, and availability have not
              been verified for this demo.
            </p>
          </div>
          <details>
            <summary>Jewellery care</summary>
            <p>
              Keep your pieces in a dry, separate pouch. Avoid direct contact with perfume and harsh
              cleaners. Ask for material-specific care guidance before cleaning.
            </p>
            <Link to="/contact?subject=Jewellery%20care" className="text-link">
              Ask about jewellery care
            </Link>
          </details>
          <details>
            <summary>Delivery & returns</summary>
            <p>
              This is a demonstration store. No orders are placed, payments collected, or deliveries
              arranged.
            </p>
          </details>
        </div>
      </article>
      <Link to="/products" className="text-link">
        <FiArrowLeft /> Back to all jewellery
      </Link>
      {related.length > 0 && (
        <section className="related-products">
          <span className="eyebrow">CONTINUE YOUR STORY</span>
          <h2>You may also love</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}
