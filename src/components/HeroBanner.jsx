import { Info, Play } from 'lucide-react'
import SmartImage from './SmartImage.jsx'
export default function HeroBanner({ movie, onPlay, onInfo }) {
  if (!movie) return null
  return (
    <section className="hero" aria-label="Featured title">
      <SmartImage className="hero-img" srcs={[movie.backdrop, movie.poster]} alt={movie.title} eager />
      <div className="hero-shade" />
      <div className="hero-body">
        <p className="hero-meta"><span className="match">{Math.round(movie.rating * 10)}% match</span> {movie.year} &nbsp;|&nbsp; {movie.genres.join(', ')}</p>
        <h1>{movie.title}</h1>
        <p className="hero-desc">{movie.description}</p>
        <div className="hero-actions">
          <button className="btn white" onClick={() => onPlay(movie)}><Play size={22} fill="currentColor" /> Play</button>
          <button className="btn grey" onClick={() => onInfo(movie)}><Info size={22} /> More info</button>
        </div>
      </div>
    </section>
  )
}
