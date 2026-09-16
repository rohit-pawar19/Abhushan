import { FiArrowUpRight } from 'react-icons/fi'
export default function CollectionCard({ collection, onSelect }) {
  return (
    <button className="collection-card" onClick={() => onSelect(collection)}>
      <div className="collection-image">
        <img src={collection.image} alt={`${collection.name} collection`} loading="lazy" />
      </div>
      <div className="collection-caption">
        <h3>{collection.name}</h3>
        <FiArrowUpRight />
      </div>
      <p>{collection.description}</p>
    </button>
  )
}
