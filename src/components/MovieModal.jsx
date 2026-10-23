import { useEffect, useRef, useState } from 'react'
import { Check, Play, Plus, X } from 'lucide-react'
import SmartImage from './SmartImage.jsx'
export default function MovieModal({ movie, autoPlay, inList, onToggle, onClose }) {
  const [playing, setPlaying] = useState(autoPlay)
  const [videoError, setVideoError] = useState(false)
  const closeRef = useRef(null)
  const dialog = useRef(null)
  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const key = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      const f = dialog.current.querySelectorAll('button, video[controls]')
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = ''; prev?.focus?.() }
  }, [onClose])
  return (
    <div className="backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="m-title" ref={dialog}>
        <button ref={closeRef} className="round modal-x" aria-label="Close details" onClick={onClose}><X size={20} /></button>
        <div className="modal-media">
          {playing && !videoError
            ? <video src={movie.trailer} controls autoPlay playsInline onError={() => setVideoError(true)} />
            : <><SmartImage srcs={[movie.backdrop, movie.poster]} alt={movie.title} eager /><div className="hero-shade" /></>}
          {videoError && <p className="video-err">The demo clip couldn’t load. Check your connection and try again.</p>}
          <div className="modal-actions">
            <h2 id="m-title">{movie.title}</h2>
            <div>
              <button className="btn white" onClick={() => { setVideoError(false); setPlaying(true) }}><Play size={20} fill="currentColor" /> {playing ? 'Restart demo' : 'Play demo'}</button>
              <button className="btn grey" aria-pressed={inList} onClick={() => onToggle(movie.id)}>{inList ? <Check size={20} /> : <Plus size={20} />} {inList ? 'In My List' : 'My List'}</button>
            </div>
          </div>
        </div>
        <div className="modal-body">
          <div>
            <p className="hero-meta"><span className="match">{Math.round(movie.rating * 10)}% match</span> {movie.year} <span className="tag">{movie.type === 'tv' ? 'Series' : 'Film'}</span> <span className="tag">★ {movie.rating.toFixed(1)}</span></p>
            <p>{movie.description}</p>
            <p className="note">Playback is a demo clip, not the actual title.</p>
          </div>
          <dl>
            <dt>Cast</dt><dd>{movie.cast.join(', ')}</dd>
            <dt>Genres</dt><dd>{movie.genres.join(', ')}</dd>
          </dl>
        </div>
      </div>
    </div>
  )
}
