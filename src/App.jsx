import { useState, useMemo, useEffect } from 'react'
import seriesData from './data/series.json'
import SeriesCard from './components/SeriesCard.jsx'
import SeriesDetail from './components/SeriesDetail.jsx'

export default function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedSeries, setSelectedSeries] = useState(null)

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
    const handler = (e) => { if (e.key === 'Escape') setSelectedSeries(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedSeries ? 'hidden' : ''
  }, [selectedSeries])

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <div className="navbar-logo-icon">🎬</div>
          <span>Storyline</span>
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
        <div className="navbar-stats">{seriesData.length} series</div>
      </nav>

      <section className="hero">
        <h1>Web Series Catalog</h1>
        <p>Discover {seriesData.length}+ Indian web series with storylines, cast details, and episode guides.</p>
      </section>

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

      {filtered.length === 0 ? (
        <div className="no-results">
          <h3>No series found</h3>
          <p>Try a different search or filter.</p>
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

      {selectedSeries && (
        <SeriesDetail
          series={selectedSeries}
          onClose={() => setSelectedSeries(null)}
        />
      )}

      <footer className="footer">
        Storyline — Web Series Catalog · Content extracted from blog archive
      </footer>
    </>
  )
}
