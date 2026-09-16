import { Link } from 'react-router-dom'
import { FiArrowRight, FiHeart, FiFeather, FiSun } from 'react-icons/fi'
import { collections } from '../data/catalog'
export default function About() {
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">THE SOUL OF ABHUSAN</span>
        <h1>
          Crafted in Tradition.
          <br />
          <em>Designed for Today.</em>
        </h1>
        <p>Our roots inspire us. Your stories give us meaning.</p>
      </div>
      <section className="story-section container-wide">
        <div className="story-image">
          <img
            src={collections[0].image}
            alt="Ornate Indian necklace worn with a traditional saree"
          />
        </div>
        <div className="story-copy">
          <span className="eyebrow">OUR STORY</span>
          <h2>
            Some things are
            <br />
            always close to heart.
          </h2>
          <p>
            The soft chime of a payal. A favourite pair of earrings borrowed from a mother. The
            bangle that makes an ordinary day feel special. In India, jewellery has always been more
            than an accessory.
          </p>
          <p>
            Abhusan is inspired by these connections. We bring traditional silhouettes and modern
            sensibilities together in a collection for celebrations, everyday expression, and
            everything in between.
          </p>
          <p>Our intention is simple: to help you find jewellery that feels like a part of you.</p>
        </div>
      </section>
      <section className="philosophy-section">
        <div className="container-wide">
          <span className="eyebrow">OUR PHILOSOPHY</span>
          <h2>Heritage is something we carry forward.</h2>
          <p>
            We believe a beautiful design can honour where we come from while making space for who
            we are. Our collection embraces the richness of Indian ornamentation with an eye for
            balance, wearability, and lasting appeal.
          </p>
        </div>
      </section>
      <section className="container-wide section-space">
        <div className="section-title">
          <div>
            <span className="eyebrow">WHY ABHUSAN</span>
            <h2>Thoughtfulness in every detail.</h2>
          </div>
        </div>
        <div className="about-values">
          {[
            [
              FiFeather,
              'Craftsmanship',
              'We are drawn to intricate patterns, considered proportions, and the small details that make each design feel special.',
            ],
            [
              FiSun,
              'Modern elegance',
              'Expressive statement pieces sit alongside quieter silhouettes, so you can find your own way to wear tradition.',
            ],
            [
              FiHeart,
              'Quality & trust',
              'Our approach is grounded in thoughtful selection and honest communication. This demo catalogue makes no material or certification guarantees.',
            ],
          ].map(([Icon, title, text]) => (
            <article key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="center-action">
          <Link className="button" to="/products">
            Find your piece <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  )
}
