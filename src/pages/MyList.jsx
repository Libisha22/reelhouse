import MovieCard from '../components/MovieCard.jsx'
export default function MyList({ movies, myList, onOpen, onPlay, onBrowse }) {
  const saved = movies.filter((m) => myList.has(m.id))
  return (
    <main className="page">
      <h1 className="page-title">My List</h1>
      {saved.length === 0
        ? <div className="empty"><h2>Your list is empty</h2><p>Tap the + on any title to save it here. Your list stays on this device.</p><button className="btn white" onClick={onBrowse}>Browse titles</button></div>
        : <div className="grid">{saved.map((m) => <MovieCard key={m.id} grid movie={m} inList onOpen={onOpen} onPlay={onPlay} onToggle={myList.toggle} />)}</div>}
    </main>
  )
}
