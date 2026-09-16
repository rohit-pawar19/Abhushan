import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiPause, FiPlay } from 'react-icons/fi'
import { slides } from '../data/catalog'

export default function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)
  useEffect(() => {
    if (paused || hovering || focused) return
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), 6500)
    return () => clearInterval(timer)
  }, [paused, hovering, focused])
  const change = (delta) => setActive((i) => (i + delta + slides.length) % slides.length)

  return (
    <div className="campaign-section">
      <section
        className="hero"
        aria-label="Featured jewellery"
        aria-roledescription="carousel"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false)
        }}
      >
        <h1 className="visually-hidden">Abhusan — Timeless Indian Jewellery</h1>
        <div
          className="hero-stage"
          style={{ aspectRatio: `${slides[active].width} / ${slides[active].height}` }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.image}
              className={`hero-slide slide-${i} ${active === i ? 'is-active' : ''}`}
              aria-hidden={active !== i}
              inert={active !== i}
              role="group"
              aria-label={`Slide ${i + 1} of ${slides.length}`}
            >
              <img
                src={slide.image}
                alt={slide.label}
                width={slide.width}
                height={slide.height}
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
              {/* Percentage coordinates cover only the button printed in each original image. */}
              <Link to="/products" className="hero-explore">
                Explore All <FiArrowRight />
              </Link>
            </div>
          ))}
        </div>
        <div className="carousel-controls">
          <div className="slide-indicators">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={active === i ? 'true' : undefined}
                className={active === i ? 'active' : ''}
                onClick={() => setActive(i)}
              />
            ))}
            <span>0{active + 1} / 03</span>
          </div>
          <div className="carousel-arrows">
            <button
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              onClick={() => setPaused(!paused)}
            >
              {paused ? <FiPlay /> : <FiPause />}
            </button>
            <button aria-label="Previous slide" onClick={() => change(-1)}>
              <FiArrowLeft />
            </button>
            <button aria-label="Next slide" onClick={() => change(1)}>
              <FiArrowRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
