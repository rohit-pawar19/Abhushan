import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi'
import '../styles/forms.css'
export default function Contact() {
  const [params] = useSearchParams()
  const [sent, setSent] = useState(false)
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">WE'D LOVE TO HEAR FROM YOU</span>
        <h1>A conversation, with a little sparkle.</h1>
        <p>Finding a gift or choosing your next favourite? Let's talk.</p>
      </div>
      <section className="container-wide contact-layout">
        <aside className="contact-info">
          <span className="eyebrow">LET'S CONNECT</span>
          <h2>
            Here for your
            <br />
            beautiful moments.
          </h2>
          <p>
            Our contact information below is illustrative. This demo form does not send messages.
          </p>
          {[
            [FiMail, 'Email', 'hello@abhusan.example'],
            [FiPhone, 'Phone', '+91 XXXXX XXXXX'],
            [FiMapPin, 'Location', 'India · Store address coming soon'],
            [FiClock, 'Business hours', 'Mon–Sat, 10 am–7 pm IST (demo)'],
          ].map(([Icon, title, text]) => (
            <div className="contact-detail" key={title}>
              <Icon />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </aside>
        <form
          className="premium-form contact-form"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
          onChange={() => setSent(false)}
        >
          <h2>Send us a note</h2>
          <p>Tell us what you have in mind.</p>
          <div className="form-grid">
            <label>
              Full name
              <input
                className="form-control"
                name="name"
                required
                minLength={2}
                autoComplete="name"
                placeholder="Your name"
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
                pattern="[+]?[0-9 ]{10,16}"
                title="Enter 10–16 digits, with optional leading + and spaces"
                autoComplete="tel"
                placeholder="+91"
              />
            </label>
            <label>
              Subject
              <select
                className="form-select"
                name="subject"
                required
                defaultValue={params.get('subject') || ''}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option>Product enquiry</option>
                <option>Jewellery care</option>
                <option>Delivery and returns</option>
                <option>General enquiry</option>
              </select>
            </label>
            <label className="full-width">
              Your message
              <textarea
                className="form-control"
                name="message"
                rows={5}
                minLength={10}
                required
                placeholder="A little about how we can help…"
              />
            </label>
          </div>
          <button className="button" type="submit">
            Send Message <FiArrowRight />
          </button>
          {sent && (
            <div className="form-success" role="status">
              Your message passed validation. This is a demo form, so nothing was sent.
            </div>
          )}
          <p className="small-muted">Demo contact details · No messages are transmitted</p>
        </form>
      </section>
    </>
  )
}
