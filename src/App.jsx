import { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import MovieModal from './components/MovieModal.jsx'
import MovieCard from './components/MovieCard.jsx'
import Home from './pages/Home.jsx'
import MyList from './pages/MyList.jsx'
import Login from './pages/Login.jsx'
import useMyList from './hooks/useMyList.js'
import { movies } from './data/movies.js'

export default function App() {
  const [view, setView] = useState('home')
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(null) // { movie, autoPlay }
  const [loading, setLoading] = useState(true)
  const [signedIn, setSignedIn] = useState(false)
  const myList = useMyList()
  useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t) }, [])
  const open = useCallback((movie) => setSel({ movie, autoPlay: false }), [])
  const play = useCallback((movie) => setSel({ movie, autoPlay: true }), [])
  const close = useCallback(() => setSel(null), [])
  const signOut = () => {
    setSignedIn(false)
    setView('home')
    setQuery('')
    setSel(null)
  }
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? movies.filter((m) => m.title.toLowerCase().includes(q) || m.genres.some((g) => g.toLowerCase().includes(q))) : null
  }, [query])
  const changeView = (v) => { setQuery(''); setView(v); window.scrollTo({ top: 0 }) }

  if (!loading && !signedIn) return <Login onLogin={() => setSignedIn(true)} />

  let content
  if (loading) content = <div className="loading" role="status" aria-label="Loading"><div className="spinner" /></div>
  else if (results) content = (
    <main className="page">
      <h1 className="page-title">Results for “{query}”</h1>
      {results.length === 0
        ? <div className="empty"><h2>No titles match “{query}”</h2><p>Check the spelling or try a genre such as Action or Comedy.</p><button className="btn white" onClick={() => setQuery('')}>Clear search</button></div>
        : <div className="grid">{results.map((m) => <MovieCard key={m.id} grid movie={m} inList={myList.has(m.id)} onOpen={open} onPlay={play} onToggle={myList.toggle} />)}</div>}
    </main>
  )
  else if (view === 'list') content = <MyList movies={movies} myList={myList} onOpen={open} onPlay={play} onBrowse={() => changeView('home')} />
  else content = <Home view={view} movies={movies} myList={myList} onOpen={open} onPlay={play} />

  return (
    <>
      <Navbar view={view} onView={changeView} query={query} onQuery={setQuery} onSignOut={signOut} />
      {content}
      <Footer />
      {sel && <MovieModal key={sel.movie.id} movie={sel.movie} autoPlay={sel.autoPlay} inList={myList.has(sel.movie.id)} onToggle={myList.toggle} onClose={close} />}
    </>
  )
}
