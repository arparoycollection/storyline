export default function CurtainNav({ open, onClose, onNavigate, categories, totalCount }) {
  return (
    <div className={`curtain-nav ${open ? 'open' : ''}`}>
      <div className="curtain-nav-inner">
        <div className="curtain-nav-header">
          <div className="curtain-nav-brand">
            <span className="curtain-nav-brand-mark">M</span>
            <span className="curtain-nav-brand-text">Storyline</span>
          </div>
          <button className="curtain-nav-close" onClick={onClose} aria-label="Close menu">
            <span></span>
            <span></span>
          </button>
        </div>

        <nav className="curtain-nav-links">
          <button className="curtain-nav-item" onClick={() => onNavigate('home')}>
            <span className="curtain-nav-item-index">01</span>
            <span className="curtain-nav-item-label">Home</span>
          </button>
          <button className="curtain-nav-item" onClick={() => onNavigate('catalog')}>
            <span className="curtain-nav-item-index">02</span>
            <span className="curtain-nav-item-label">Catalog</span>
          </button>
          <button className="curtain-nav-item" onClick={() => onNavigate('categories')}>
            <span className="curtain-nav-item-index">03</span>
            <span className="curtain-nav-item-label">Categories</span>
          </button>
          <button className="curtain-nav-item" onClick={() => onNavigate('about')}>
            <span className="curtain-nav-item-index">04</span>
            <span className="curtain-nav-item-label">About</span>
          </button>
        </nav>

        <div className="curtain-nav-categories">
          <div className="curtain-nav-label">Quick Filters</div>
          <div className="curtain-nav-category-list">
            {categories.slice(1, 9).map(cat => (
              <button
                key={cat}
                className="curtain-nav-category"
                onClick={() => onNavigate('filter', cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="curtain-nav-footer">
          <div className="curtain-nav-footer-stat">
            <span className="curtain-nav-footer-num">{totalCount}</span>
            <span className="curtain-nav-footer-lbl">Series Archived</span>
          </div>
          <div className="curtain-nav-footer-text">An archive of Indian web series</div>
        </div>
      </div>
    </div>
  )
}
