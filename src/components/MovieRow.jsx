import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MovieCard from './MovieCard.jsx'
export default function MovieRow({ title, movies, myList, onOpen, onPlay, progressMap }) {
  const track = useRef(null)
  if (!movies.length) return null
  const scroll = (d) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.85, behavior: 'smooth' })
  return (
    <section className="row" aria-label={title}>
      <h2>{title}</h2>
      <div className="row-wrap">
        <button className="arrow left" aria-label={`Scroll ${title} left`} onClick={() => scroll(-1)}><ChevronLeft size={32} /></button>
        <div className="track" ref={track}>
          {movies.map((m) => <MovieCard key={m.id} movie={m} inList={myList.has(m.id)} onOpen={onOpen} onPlay={onPlay} onToggle={myList.toggle} progress={progressMap?.[m.id]} />)}
        </div>
        <button className="arrow right" aria-label={`Scroll ${title} right`} onClick={() => scroll(1)}><ChevronRight size={32} /></button>
      </div>
    </section>
  )
}
