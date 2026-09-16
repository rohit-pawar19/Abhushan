import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { money } from '../data/catalog'
import { useStore } from '../context/useStore'
export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useStore()
  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-item-details">
        <span className="eyebrow">{item.category}</span>
        <h2>{item.name}</h2>
        <p>{money(item.price)}</p>
        <div className="quantity-control">
          <button
            aria-label={`Decrease ${item.name} quantity`}
            disabled={item.quantity === 1}
            onClick={() => decreaseQuantity(item.id)}
          >
            <FiMinus />
          </button>
          <span aria-label="Quantity">{item.quantity}</span>
          <button
            aria-label={`Increase ${item.name} quantity`}
            disabled={item.quantity >= 99}
            onClick={() => increaseQuantity(item.id)}
          >
            <FiPlus />
          </button>
        </div>
      </div>
      <div className="cart-item-end">
        <strong>{money(item.price * item.quantity)}</strong>
        <button aria-label={`Remove ${item.name}`} onClick={() => removeFromCart(item.id)}>
          <FiTrash2 /> Remove
        </button>
      </div>
    </article>
  )
}
