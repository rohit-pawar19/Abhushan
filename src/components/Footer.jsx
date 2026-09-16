import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiArrowUpRight } from 'react-icons/fi'
import { Brand } from './Navbar'
import { useStore } from '../context/useStore'
export default function Footer() {
  const { notify } = useStore()
  return (
    <footer className="site-footer">
      <div className="container-wide footer-grid">
        <div className="footer-brand">
          <Link to="/">
            <Brand />
          </Link>
          <p>
            Indian at heart. Timeless by design.
            <br />
            Jewellery to celebrate every shade of you.
          </p>
          <div className="socials">
            <button
              aria-label="Instagram (coming soon)"
              onClick={() => notify('Our Instagram page is coming soon.')}
            >
              <FiInstagram />
            </button>
            <button
              aria-label="Facebook (coming soon)"
              onClick={() => notify('Our Facebook page is coming soon.')}
            >
              <FiFacebook />
            </button>
          </div>
        </div>
        <div>
          <h3>Explore Abhusan</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Our Jewellery</Link>
          <Link to="/about">Our Story</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div>
          <h3>Here to Help</h3>
          <Link to="/contact?subject=Jewellery%20care">Jewellery Care</Link>
          <Link to="/contact?subject=Delivery%20and%20returns">Delivery & Returns</Link>
          <Link to="/login">My Account</Link>
          <Link to="/cart">Your Jewellery Box</Link>
        </div>
        <div className="footer-note">
          <span className="eyebrow">LET'S STAY CONNECTED</span>
          <h3>
            A little sparkle.
            <br />A personal touch.
          </h3>
          <p>Let us help you find your special piece.</p>
          <Link to="/contact" className="footer-contact">
            Get in touch <FiArrowUpRight />
          </Link>
        </div>
      </div>
      <div className="container-wide footer-bottom">
        <span>© {new Date().getFullYear()} Abhusan. All rights reserved.</span>
        <span>Thoughtfully chosen. Beautifully yours.</span>
        <Link to="/terms">Terms & Privacy</Link>
      </div>
    </footer>
  )
}
