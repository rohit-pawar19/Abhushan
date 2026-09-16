import { Link } from 'react-router-dom'
export default function Terms() {
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">A NOTE ON THIS EXPERIENCE</span>
        <h1>Terms & Privacy</h1>
      </div>
      <article className="legal-page container-wide">
        <h2>A demonstration store</h2>
        <p>
          Abhusan is a frontend jewellery shopping demonstration. Catalogue prices and contact
          details are illustrative. No purchases, payments, deliveries, or real customer accounts
          are created.
        </p>
        <h2>What stays in your browser</h2>
        <p>
          Your jewellery box is saved locally. Signing up saves your name and email; login can
          remember your demo profile locally or for the current session. Passwords and phone numbers
          are not saved. Contact form messages are not sent or saved.
        </p>
        <h2>Your choices</h2>
        <p>
          Sign out to remove the current session. Clear your cart from the jewellery box. To remove
          the saved demo profile and all site data, clear this site's storage in your browser
          settings.
        </p>
        <h2>Product information</h2>
        <p>
          Product names and descriptions are illustrative. Jewellery materials, stone types,
          certifications, availability, and product specifications have not been verified. Images
          are provided as part of this project.
        </p>
        <Link className="button" to="/products">
          Explore the collection
        </Link>
      </article>
    </>
  )
}
