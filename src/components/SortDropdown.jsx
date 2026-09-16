export default function SortDropdown({ value, onChange }) {
  return (
    <label className="sort-label">
      <span className="visually-hidden">Sort products</span>
      <select className="form-select" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="featured">Sort By: Featured</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
        <option value="name">Name: A–Z</option>
      </select>
    </label>
  )
}
