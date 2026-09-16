import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { useStore } from '../context/useStore'
import { readStorage } from '../utils/storage'
import AuthLayout from '../components/AuthLayout'
import PasswordField from '../components/PasswordField'
export default function Login() {
  const [show, setShow] = useState(false)
  const [forgot, setForgot] = useState(false)
  const { signIn, notify } = useStore()
  const navigate = useNavigate()
  function submit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = data.get('email').trim().toLowerCase()
    const account = readStorage('abhusan-profile', null)
    signIn(
      {
        email,
        name:
          account?.email === email && typeof account.name === 'string'
            ? account.name
            : email.split('@')[0],
      },
      data.get('remember') === 'on',
    )
    notify('Welcome to your Abhusan demo account')
    navigate('/products')
  }
  return (
    <AuthLayout>
      <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
      <h1>Welcome back.</h1>
      <p>There's something beautiful waiting for you.</p>
      <form className="premium-form" onSubmit={submit}>
        <label>
          Email address
          <input
            className="form-control"
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
        </label>
        <PasswordField show={show} onToggle={() => setShow(!show)} />
        <div className="form-options">
          <label className="checkbox-label">
            <input type="checkbox" name="remember" /> Remember me
          </label>
          <button type="button" className="text-link" onClick={() => setForgot(!forgot)}>
            Forgot Password?
          </button>
        </div>
        {forgot && (
          <p className="form-success" role="status">
            This demo does not save or verify passwords. Enter any password of at least 8 characters
            to explore a demo account. No reset email is sent.
          </p>
        )}
        <button type="submit" className="button">
          Login <FiArrowRight />
        </button>
      </form>
      <p className="auth-switch">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      <div className="demo-note">
        Demo access only. Any valid email and an 8-character password can be used. Passwords are
        never saved or verified. This does not authenticate your identity.
      </div>
    </AuthLayout>
  )
}
