import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { useStore } from '../context/useStore'
import AuthLayout from '../components/AuthLayout'
import PasswordField from '../components/PasswordField'
export default function Signup() {
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const { signIn, notify } = useStore()
  const navigate = useNavigate()
  function submit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (data.get('password') !== data.get('confirmPassword')) {
      setError('Your passwords do not match. Please try again.')
      return
    }
    if (data.get('name').trim().length < 2) {
      setError('Please enter your full name.')
      return
    }
    const account = { name: data.get('name').trim(), email: data.get('email').trim().toLowerCase() }
    try {
      localStorage.setItem('abhusan-profile', JSON.stringify(account))
    } catch {
      /* Demo access can continue without persistence. */
    }
    signIn(account, true)
    notify('Your demo account is ready. Welcome to Abhusan.')
    navigate('/products')
  }
  return (
    <AuthLayout>
      <span className="eyebrow">MAKE A LITTLE ROOM FOR BEAUTIFUL</span>
      <h1>Begin your story.</h1>
      <p>Create your own corner of Abhusan.</p>
      <form className="premium-form" onSubmit={submit} onChange={() => setError('')}>
        <div className="form-grid">
          <label className="full-width">
            Full name
            <input
              className="form-control"
              name="name"
              required
              minLength={2}
              autoComplete="name"
              placeholder="Your full name"
            />
          </label>
          <label>
            Email address
            <input
              className="form-control"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>
          <label>
            Phone number
            <input
              className="form-control"
              type="tel"
              name="phone"
              required
              autoComplete="tel"
              pattern="[+]?[0-9 ]{10,16}"
              title="Enter 10–16 digits, with optional leading + and spaces"
              placeholder="+91"
            />
          </label>
          <PasswordField show={show} onToggle={() => setShow(!show)} autoComplete="new-password" />
          <PasswordField
            label="Confirm password"
            name="confirmPassword"
            show={show}
            onToggle={() => setShow(!show)}
            autoComplete="new-password"
          />
        </div>
        <label className="checkbox-label terms-check">
          <input type="checkbox" name="terms" required />{' '}
          <span>
            I accept the <Link to="/terms">Terms & Privacy</Link>.
          </span>
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="button">
          Create Account <FiArrowRight />
        </button>
      </form>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <div className="demo-note">
        Frontend demo only. We save your name and email in this browser, never your password or
        phone number. No secure account is created.
      </div>
    </AuthLayout>
  )
}
