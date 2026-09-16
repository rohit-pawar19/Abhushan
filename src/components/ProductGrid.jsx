import ProductCard from './ProductCard'
export default function ProductGrid({ products, featured }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} featured={featured} />
      ))}
    </div>
  )
}
