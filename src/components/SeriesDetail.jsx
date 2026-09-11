export default function SeriesDetail({ series, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-split">
          {/* Gallery pane */}
          <div className="modal-gallery">
            {series.poster ? (
              <img src={series.poster} alt={series.title} className="modal-poster" />
            ) : (
              <div className="modal-no-image">No image available</div>
            )}
            {series.gallery.length > 0 && (
              <div className="modal-gallery-grid">
                {series.gallery.map((img, i) => (
                  <img key={i} src={img} alt={`Screenshot ${i + 1}`} loading="lazy" />
                ))}
              </div>
            )}
          </div>

          {/* Data pane */}
          <div className="modal-data">
            <div className="modal-data-inner">
              {series.categories.length > 0 && (
                <div className="modal-categories">
                  {series.categories.slice(0, 3).map(cat => (
                    <span key={cat} className="modal-category-tag">{cat}</span>
                  ))}
                </div>
              )}

              <h2 className="modal-title">{series.title}</h2>

              <div className="info-grid">
                {series.releaseDate && (
                  <div className="info-item">
                    <span className="info-label">Release</span>
                    <span className="info-value">{series.releaseDate}</span>
                  </div>
                )}
                {series.language && (
                  <div className="info-item">
                    <span className="info-label">Language</span>
                    <span className="info-value">{series.language}</span>
                  </div>
                )}
                {series.quality && (
                  <div className="info-item">
                    <span className="info-label">Quality</span>
                    <span className="info-value">{series.quality}</span>
                  </div>
                )}
                {series.format && (
                  <div className="info-item">
                    <span className="info-label">Format</span>
                    <span className="info-value">{series.format}</span>
                  </div>
                )}
                {series.episodes_count && (
                  <div className="info-item">
                    <span className="info-label">Episodes</span>
                    <span className="info-value">{series.episodes_count}</span>
                  </div>
                )}
                {series.published && (
                  <div className="info-item">
                    <span className="info-label">Posted</span>
                    <span className="info-value">{series.published}</span>
                  </div>
                )}
              </div>

              {series.storyline && (
                <>
                  <h3 className="section-title">Storyline</h3>
                  <p className="storyline-text">{series.storyline}</p>
                </>
              )}

              {series.cast.length > 0 && (
                <>
                  <h3 className="section-title">Cast</h3>
                  <div className="cast-list">
                    {series.cast.map((member, i) => (
                      <span key={i} className="cast-tag">{member}</span>
                    ))}
                  </div>
                </>
              )}

              {series.episodeDetails.length > 0 && (
                <>
                  <h3 className="section-title">Episodes</h3>
                  <div className="episodes-list">
                    {series.episodeDetails.map((ep, i) => (
                      <div key={i} className="episode-item">
                        <span className="episode-label">{ep.label}</span>
                        {ep.desc}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {series.downloadLinks.length > 0 && (
                <>
                  <h3 className="section-title">Download</h3>
                  <div className="download-links">
                    {series.downloadLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`download-btn ${i > 0 ? 'secondary' : ''}`}
                      >
                        {i === 0 ? 'Google Drive' : link.includes('mega') ? 'Mega' : `Mirror ${i}`}
                      </a>
                    ))}
                  </div>
                </>
              )}

              {series.categories.length > 0 && (
                <div className="modal-tags">
                  {series.categories.map(cat => (
                    <span key={cat} className="cast-tag">#{cat}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
