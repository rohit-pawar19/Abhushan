import { useState } from 'react'
import logo from '../assets/images/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { FiArrowRight, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi'
import { useStore } from '../context/useStore'

export function Brand() {
  return (
    <span className="brand">
      <img className="brand-logo" src={logo} alt="Abhusan jewellery" width="1254" height="1254" />
    </span>
  )
}
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cartCount, user, signOut } = useStore()
  return (
    <>
      <div className="announcement">
        Rooted in tradition. Made for your forever.{' '}
        <span>
          Discover the collection <FiArrowRight />
        </span>
      </div>
      <header className="site-header">
        <div className="nav-shell">
          <Link to="/" aria-label="Abhusan home" onClick={() => setOpen(false)}>
            <Brand />
          </Link>
          <nav aria-label="Main navigation" className={open ? 'main-nav open' : 'main-nav'}>
            {[
              ['/', 'Home'],
              ['/products', 'Products'],
              ['/about', 'About'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
            <div className="mobile-account">
              <NavLink to="/cart" onClick={() => setOpen(false)}>
                Cart ({cartCount})
              </NavLink>
              <NavLink to="/login" onClick={() => setOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/signup" onClick={() => setOpen(false)}>
                Sign Up
              </NavLink>
            </div>
          </nav>
          <div className="nav-actions">
            <Link to="/products?search=true" aria-label="Search jewellery" className="icon-button">
              <FiSearch />
            </Link>
            <span className="nav-separator" />
            {user ? (
              <button className="account-button" onClick={signOut} title="Sign out">
                <FiUser />
                <span>Sign out</span>
              </button>
            ) : (
              <>
                <Link to="/login" className="account-button">
                  <FiUser />
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="signup-link">
                  Sign Up
                </Link>
              </>
            )}
            <Link
              to="/cart"
              aria-label={`Cart (${cartCount})`}
              className="icon-button cart-link"
              onClick={() => setOpen(false)}
            >
              <FiShoppingBag />
              <span className="cart-count">{cartCount}</span>
            </Link>
            <button
              className="icon-button menu-toggle"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
