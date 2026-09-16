import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import ProductGrid from '../components/ProductGrid'
import SortDropdown from '../components/SortDropdown'
import { products } from '../data/catalog'
export default function Products() {
  const [params] = useSearchParams()
  const [category, setCategory] = useState('All Jewellery')
  const [sort, setSort] = useState('featured')
  const [search, setSearch] = useState('')
  const filtered = products.filter(
    (p) =>
      (category === 'All Jewellery' || p.category === category) &&
      `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase()),
  )
  if (sort === 'low') filtered.sort((a, b) => a.price - b.price)
  if (sort === 'high') filtered.sort((a, b) => b.price - a.price)
  if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name))
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">A PIECE FOR EVERY PART OF YOU</span>
        <h1>Find your forever favourites.</h1>
        <p>Explore the details that make you feel extraordinary.</p>
      </div>
      <section className="container-wide catalog-section">
        <div className="catalog-toolbar">
          <div className="category-tabs" aria-label="Filter by category">
            {['All Jewellery', ...new Set(products.map((p) => p.category))].map((c) => (
              <button
                key={c}
                aria-pressed={category === c}
                className={category === c ? 'active' : ''}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
        <div className="catalog-search">
          <p>{filtered.length} beautiful pieces</p>
          <label>
            <FiSearch />
            <span className="visually-hidden">Search jewellery</span>
            <input
              autoFocus={params.has('search')}
              type="search"
              placeholder="Find something beautiful…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
        {filtered.length ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="empty-state">
            <h2>No pieces found</h2>
            <p>Try another name or explore all our jewellery.</p>
            <button
              className="button"
              onClick={() => {
                setSearch('')
                setCategory('All Jewellery')
              }}
            >
              Show all jewellery
            </button>
          </div>
        )}
        <p className="catalog-note">
          A thoughtfully imagined demo collection. Prices are illustrative; materials and
          specifications are not verified.
        </p>
      </section>
    </>
  )
}
