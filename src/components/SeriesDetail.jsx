export default function SeriesDetail({ series, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          {series.poster ? (
            <img src={series.poster} alt={series.title} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-dim)' }}>
              No image available
            </div>
          )}
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <h2 className="modal-title">{series.title}</h2>

          <div className="info-grid">
            {series.releaseDate && (
              <div className="info-item">
                <span className="info-label">Release Date</span>
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

          {series.gallery.length > 0 && (
            <>
              <h3 className="section-title">Screenshots</h3>
              <div className="gallery">
                {series.gallery.map((img, i) => (
                  <img key={i} src={img} alt={`Screenshot ${i + 1}`} loading="lazy" />
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
                    📥 {i === 0 ? 'Google Drive' : link.includes('mega') ? 'Mega' : `Mirror ${i}`}
                  </a>
                ))}
              </div>
            </>
          )}

          {series.categories.length > 0 && (
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {series.categories.map(cat => (
                <span key={cat} className="cast-tag" style={{ fontSize: '0.75rem' }}>#{cat}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
