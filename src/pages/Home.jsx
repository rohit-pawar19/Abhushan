import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiGift, FiHeart, FiFeather, FiSun } from 'react-icons/fi'
import HeroCarousel from '../components/HeroCarousel'
import SectionTitle from '../components/SectionTitle'
import CollectionCard from '../components/CollectionCard'
import CollectionModal from '../components/CollectionModal'
import ProductGrid from '../components/ProductGrid'
import { collections, products } from '../data/catalog'
export default function Home() {
  const [selected, setSelected] = useState(null)
  return (
    <>
      <HeroCarousel />
      <section className="brand-thought">
        <div className="ornament">
          <span />✧<span />
        </div>
        <p>
          Every ornament tells a story. <em>Every detail carries a legacy.</em>
        </p>
        <span className="eyebrow">FIND A PIECE OF YOUR STORY AT ABHUSAN</span>
      </section>
      <section className="section-space collections-section container-wide">
        <SectionTitle
          eyebrow="A WORLD OF BEAUTIFUL POSSIBILITIES"
          title="Our Collections"
          description="Rooted in heritage. Reimagined for you."
        />
        <div className="collection-grid">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} onSelect={setSelected} />
          ))}
        </div>
        <div className="center-action">
          <Link to="/products" className="button button-outline">
            Explore All <FiArrowRight />
          </Link>
        </div>
      </section>
      <section className="curated-section section-space">
        <div className="container-wide">
          <SectionTitle
            eyebrow="THE PIECES YOU'LL REACH FOR, ALWAYS"
            title="A little love. A little luxury."
            description="Meet the beautiful details that make an outfit your own."
          >
            <Link className="text-link" to="/products">
              View all jewellery <FiArrowRight />
            </Link>
          </SectionTitle>
          <ProductGrid products={products.slice(0, 4)} featured />
        </div>
      </section>
      <section className="story-section container-wide">
        <div className="story-image">
          <img
            src={collections[0].image}
            alt="Traditional Indian necklace with colourful stones and pearl details"
            loading="lazy"
          />
        </div>
        <div className="story-copy">
          <span className="eyebrow">THE SOUL OF ABHUSAN</span>
          <h2>
            Crafted in tradition.
            <br />
            <em>Designed for today.</em>
          </h2>
          <div className="little-line" />
          <p>
            From the intricate motifs we grew up admiring to the effortless pieces we wear today,
            our love for jewellery is a story of connection.
          </p>
          <p>
            Abhusan brings that story to life. Thoughtful designs that honour our roots and
            celebrate who we are becoming.
          </p>
          <Link to="/about" className="text-link">
            Discover our story <FiArrowRight />
          </Link>
        </div>
      </section>
      <section className="values-strip container-wide">
        {[
          [FiFeather, 'Thoughtful craftsmanship', 'Beauty in the smallest details'],
          [FiSun, 'Timeless by design', 'Beyond seasons and trends'],
          [FiGift, 'Made for meaningful moments', 'A gift. A memory. A little joy.'],
          [FiHeart, 'Indian at heart', 'A celebration of our heritage'],
        ].map(([Icon, title, text]) => (
          <div key={title}>
            <Icon />
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </section>
      {selected && <CollectionModal collection={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
