import { Check, ChevronDown, Play, Plus } from 'lucide-react'
import SmartImage from './SmartImage.jsx'
export default function MovieCard({ movie, inList, onOpen, onPlay, onToggle, progress, grid }) {
  const stop = (fn) => (e) => { e.stopPropagation(); fn() }
  return (
    <article className={`card ${grid ? 'in-grid' : ''}`} tabIndex={0} role="button" aria-label={`${movie.title}, ${movie.year}. Open details`}
      onClick={() => onOpen(movie)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget && (e.preventDefault(), onOpen(movie))}>
      <SmartImage srcs={[movie.poster]} alt={movie.title} />
      {progress != null && <div className="progress" aria-label={`${progress}% watched`}><i style={{ width: `${progress}%` }} /></div>}
      <div className="card-over">
        <div className="card-btns">
          <button className="round fill" aria-label={`Play ${movie.title}`} onClick={stop(() => onPlay(movie))}><Play size={16} fill="currentColor" /></button>
          <button className="round" aria-label={inList ? `Remove ${movie.title} from My List` : `Add ${movie.title} to My List`} onClick={stop(() => onToggle(movie.id))}>{inList ? <Check size={16} /> : <Plus size={16} />}</button>
          <button className="round end" aria-label={`More info about ${movie.title}`} onClick={stop(() => onOpen(movie))}><ChevronDown size={16} /></button>
        </div>
        <h3>{movie.title}</h3>
        <p className="card-meta"><span className="match">{movie.rating.toFixed(1)}</span> {movie.year} {movie.genres[0] && `· ${movie.genres[0]}`}</p>
      </div>
    </article>
  )
}
