export default function SeriesCard({ series, onClick }) {
  return (
    <div className="series-card reveal" onClick={onClick}>
      <div className="series-card-poster">
        {series.poster ? (
          <img src={series.poster} alt={series.title} loading="lazy" />
        ) : (
          <div className="series-card-poster-placeholder">
            <span>No Image</span>
          </div>
        )}
        {series.quality && (
          <div className="quality-badge">{series.quality.split(' ')[0]}</div>
        )}
        <div className="series-card-overlay">
          <span className="series-card-view">View Details</span>
        </div>
      </div>
      <div className="series-card-body">
        <div className="series-card-title">{series.title}</div>
        <div className="series-card-meta">
          {series.releaseDate && <span>{series.releaseDate}</span>}
          {series.language && <span>{series.language}</span>}
        </div>
      </div>
    </div>
  )
}
