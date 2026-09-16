import { useEffect, useRef, useState } from 'react'
import { FiX, FiShoppingBag } from 'react-icons/fi'
import { useStore } from '../context/useStore'
import { money } from '../data/catalog'
export default function CollectionModal({ collection, onClose }) {
  const dialog = useRef(null)
  const returnFocus = useRef(document.activeElement)
  const [added, setAdded] = useState(false)
  const { addToCart } = useStore()
  useEffect(() => {
    const currentDialog = dialog.current
    const previous = returnFocus.current
    const overflow = document.body.style.overflow
    currentDialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      currentDialog.close()
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [])
  return (
    <dialog
      ref={dialog}
      className="collection-modal"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose()
      }}
      aria-labelledby="collection-title"
    >
      <div className="modal-layout">
        <img className="modal-image" src={collection.image} alt={collection.productName} />
        <div className="modal-copy">
          <button
            className="icon-button modal-close"
            aria-label="Close collection"
            onClick={onClose}
          >
            <FiX />
          </button>
          <span className="eyebrow">THE {collection.name.toUpperCase()} COLLECTION</span>
          <h2 id="collection-title">{collection.productName}</h2>
          <p>
            {collection.description} An expressive piece inspired by the beauty of Indian
            celebrations.
          </p>
          <span className="modal-price">{money(collection.price)}</span>
          <p className="small-muted">Featured piece · Demo catalogue pricing</p>
          <button
            className="button"
            onClick={() => {
              addToCart(collection)
              setAdded(true)
            }}
          >
            <FiShoppingBag /> Add to Cart
          </button>
          <p className="modal-footnote" role="status">
            {added
              ? 'Added to your jewellery box.'
              : 'A beautiful addition to your jewellery story.'}
          </p>
        </div>
      </div>
    </dialog>
  )
}
