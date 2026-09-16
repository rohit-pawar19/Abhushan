import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { StoreProvider } from './context/StoreContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Terms from './pages/Terms'
import './App.css'
import './styles/shop.css'
export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ScrollToTop />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/terms" element={<Terms />} />
            <Route
              path="*"
              element={
                <div className="empty-state">
                  <span className="eyebrow">404</span>
                  <h1>This little gem is missing.</h1>
                  <p>Let's find your way back to something beautiful.</p>
                  <Link to="/" className="button">
                    Back to Home
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </StoreProvider>
    </BrowserRouter>
  )
}
