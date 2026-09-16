import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { money } from '../data/catalog'
import { useStore } from '../context/useStore'
export default function ProductCard({ product, featured = false }) {
  const { addToCart } = useStore()
  return (
    <article className="product-card">
      <div className="product-image">
        <Link
          to={`/products/${product.id}`}
          className="product-image-link"
          aria-label={`View ${product.name}`}
        >
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        {featured && <span className="product-badge">THE CURATED EDIT</span>}
        <button
          className="quick-add"
          aria-label={`Add ${product.name} to cart`}
          onClick={() => addToCart(product)}
        >
          <FiPlus />
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product-bottom">
          <span>{money(product.price)}</span>
          <button onClick={() => addToCart(product)}>
            Add to Cart <FiPlus />
          </button>
        </div>
      </div>
    </article>
  )
}
