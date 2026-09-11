import { useState, useMemo, useEffect, useRef } from 'react'
import seriesData from './data/series.json'
import SeriesCard from './components/SeriesCard.jsx'
import SeriesDetail from './components/SeriesDetail.jsx'
import CurtainNav from './components/CurtainNav.jsx'

export default function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedSeries, setSelectedSeries] = useState(null)
  const [navOpen, setNavOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  const gridRef = useRef(null)
  const filtersRef = useRef(null)
  const footerRef = useRef(null)

  // Collect all categories sorted by frequency
  const categories = useMemo(() => {
    const counts = {}
    seriesData.forEach(s => {
      s.categories.forEach(c => {
        counts[c] = (counts[c] || 0) + 1
      })
    })
    return ['All', ...Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name)
      .slice(0, 30)]
  }, [])

  const categoryCount = useMemo(() => {
    const counts = {}
    seriesData.forEach(s => {
      s.categories.forEach(c => {
        counts[c] = (counts[c] || 0) + 1
      })
    })
    return Object.keys(counts).length
  }, [])

  const filtered = useMemo(() => {
    let result = seriesData
    if (activeCategory !== 'All') {
      result = result.filter(s => s.categories.includes(activeCategory))
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.cast.some(c => c.toLowerCase().includes(q)) ||
        s.storyline.toLowerCase().includes(q)
      )
    }
    return result
  }, [search, activeCategory])

  // Close modal on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        if (navOpen) setNavOpen(false)
        else if (selectedSeries) setSelectedSeries(null)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedSeries, navOpen])

  // Lock scroll when modal or nav open
  useEffect(() => {
    document.body.style.overflow = (selectedSeries || navOpen) ? 'hidden' : ''
  }, [selectedSeries, navOpen])

  // Scroll progress + scroll-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
      setShowTop(scrollTop > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [filtered.length])

  // Scroll reveal observer — adds .reveal-visible when elements enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

    const elements = document.querySelectorAll('.reveal:not(.reveal-visible)')
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [filtered, search])

  // Curtain nav navigation handler
  const handleNavigate = (target, category) => {
    setNavOpen(false)
    setTimeout(() => {
      if (target === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (target === 'catalog') {
        gridRef.current?.scrollIntoView({ behavior: 'smooth' })
      } else if (target === 'categories') {
        filtersRef.current?.scrollIntoView({ behavior: 'smooth' })
      } else if (target === 'about') {
        footerRef.current?.scrollIntoView({ behavior: 'smooth' })
      } else if (target === 'filter') {
        setActiveCategory(category)
        setSearch('')
        gridRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <nav className="navbar">
        <div className="navbar-logo">
          <div className="navbar-logo-mark">
            <span></span><span></span><span></span>
          </div>
          <span className="navbar-logo-text">Storyline</span>
        </div>

        <div className="search-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search series, cast, or storyline..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="navbar-right">
          <div className="navbar-stats"><span>{seriesData.length}</span> Series</div>
          <button className="nav-trigger" onClick={() => setNavOpen(true)} aria-label="Open menu">
            <span></span><span></span>
          </button>
        </div>
      </nav>

      <CurtainNav
        open={navOpen}
        onClose={() => setNavOpen(false)}
        onNavigate={handleNavigate}
        categories={categories}
        totalCount={seriesData.length}
      />

      <section className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">Indian Web Series Archive</div>
          <h1 className="hero-title">Storyline<em>.</em></h1>
          <p className="hero-subtitle">
            A curated catalog of {seriesData.length} series — storylines, cast details,
            and episode guides, archived with precision.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">{seriesData.length}</span>
              <span className="hero-stat-lbl">Series</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">{categoryCount}</span>
              <span className="hero-stat-lbl">Categories</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">∞</span>
              <span className="hero-stat-lbl">Stories</span>
            </div>
          </div>
          <div className="hero-scroll">
            <span className="hero-scroll-text">Scroll to explore</span>
            <div className="hero-scroll-line"></div>
          </div>
        </div>
      </section>

      <div className="glass-rule reveal">
        <div className="glass-rule-line"></div>
      </div>

      <div ref={filtersRef} className="filters-section">
        <div className="filters-label">Filter by Category</div>
        <div className="filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div ref={gridRef}>
        {filtered.length === 0 ? (
          <div className="no-results">
            <h3>No series found</h3>
            <p>Try a different search or filter</p>
          </div>
        ) : (
          <div className="series-grid">
            {filtered.map(series => (
              <SeriesCard
                key={series.id}
                series={series}
                onClick={() => setSelectedSeries(series)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedSeries && (
        <SeriesDetail
          series={selectedSeries}
          onClose={() => setSelectedSeries(null)}
        />
      )}

      <footer ref={footerRef} className="footer">
        <span className="footer-mark"><span></span><span></span><span></span></span>
        Storyline — Web Series Archive · Content extracted from blog archive
      </footer>

      <button
        className={`scroll-top ${showTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  )
}
