import { FiEye, FiEyeOff } from 'react-icons/fi'
export default function PasswordField({
  label = 'Password',
  name = 'password',
  show,
  onToggle,
  autoComplete = 'current-password',
}) {
  return (
    <label>
      {label}
      <span className="password-field">
        <input
          className="form-control"
          type={show ? 'text' : 'password'}
          name={name}
          minLength={8}
          required
          autoComplete={autoComplete}
          placeholder="At least 8 characters"
        />
        <button
          type="button"
          aria-label={show ? 'Hide passwords' : 'Show passwords'}
          aria-pressed={show}
          onClick={onToggle}
        >
          {show ? <FiEyeOff /> : <FiEye />}
        </button>
      </span>
    </label>
  )
}
