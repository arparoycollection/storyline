export default function SeriesCard({ series, onClick }) {
  return (
    <div className="series-card" onClick={onClick}>
      <div className="series-card-poster">
        {series.poster ? (
          <img src={series.poster} alt={series.title} loading="lazy" />
        ) : (
          <div className="series-card-poster-placeholder">No image</div>
        )}
        {series.quality && (
          <div className="quality-badge">{series.quality.split(' ')[0]}</div>
        )}
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
