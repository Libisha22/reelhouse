import { useMemo } from 'react'
import HeroBanner from '../components/HeroBanner.jsx'
import MovieRow from '../components/MovieRow.jsx'
import { continueWatching } from '../data/movies.js'
const by = (arr, f) => arr.filter(f)
export default function Home({ view, movies, myList, onOpen, onPlay }) {
  const pool = useMemo(() => view === 'tv' ? by(movies, (m) => m.type === 'tv') : view === 'movies' ? by(movies, (m) => m.type === 'movie') : movies, [view, movies])
  const hero = useMemo(() => [...pool].sort((a, b) => b.popularity - a.popularity)[0], [pool])
  const rows = useMemo(() => {
    const sorted = (f) => [...pool].sort(f)
    const cw = continueWatching.map((c) => ({ ...movies.find((m) => m.id === c.id), progress: c.progress })).filter((m) => m.id && pool.some((p) => p.id === m.id))
    const list = [
      ['Trending Now', sorted((a, b) => b.popularity - a.popularity).slice(0, 10)],
      ['Continue Watching', cw],
      ['Popular Movies', by(pool, (m) => m.year >= 2014)],
      ['Top Rated', sorted((a, b) => b.rating - a.rating).slice(0, 10)],
      ['Action Movies', by(pool, (m) => m.genres.includes('Action'))],
      ['Comedy Movies', by(pool, (m) => m.genres.includes('Comedy'))],
      ['Sci-Fi & Fantasy', by(pool, (m) => m.genres.includes('Sci-Fi & Fantasy'))],
      ['My List', by(movies, (m) => myList.has(m.id)).filter((m) => pool.some((p) => p.id === m.id))],
    ]
    if (view === 'new') list.splice(0, 4, ['New & Popular', sorted((a, b) => b.year - a.year || b.popularity - a.popularity).slice(0, 10)], ['Trending Now', sorted((a, b) => b.popularity - a.popularity).slice(0, 10)])
    return list
  }, [pool, movies, myList, view])
  const pm = Object.fromEntries(continueWatching.map((c) => [c.id, c.progress]))
  return (
    <>
      <HeroBanner movie={hero} onPlay={onPlay} onInfo={onOpen} />
      <div className="rows">{rows.map(([t, items]) => <MovieRow key={t} title={t} movies={items} myList={myList} onOpen={onOpen} onPlay={onPlay} progressMap={t === 'Continue Watching' ? pm : null} />)}</div>
    </>
  )
}
