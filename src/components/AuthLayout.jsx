import { collections } from '../data/catalog'
import '../styles/forms.css'
export default function AuthLayout({ children }) {
  return (
    <section className="auth-layout container-wide">
      <div className="auth-art">
        <img
          src={collections[0].image}
          alt="Traditional Indian jewellery with rich gold and jewel tones"
        />
        <div>
          <span className="eyebrow">A LITTLE TRADITION. A LITTLE YOU.</span>
          <h2>
            Your story.
            <br />
            <em>Your sparkle.</em>
          </h2>
          <p>Beautiful pieces. Meaningful moments.</p>
        </div>
      </div>
      <div className="auth-form-wrap">{children}</div>
    </section>
  )
}
