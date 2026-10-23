import { useEffect, useRef, useState } from 'react'
import { Bell, ChevronDown, Menu, X } from 'lucide-react'
import SearchBar from './SearchBar.jsx'
export const NAV = [['home', 'Home'], ['tv', 'TV Shows'], ['movies', 'Movies'], ['new', 'New & Popular'], ['list', 'My List']]
const PROFILE = ['Manage profiles', 'Account', 'Help centre', 'Sign out (demo)']
export default function Navbar({ view, onView, query, onQuery, onSignOut }) {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [drop, setDrop] = useState(null) // 'profile' | 'bell' | null
  const box = useRef(null)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    const f = (e) => box.current && !box.current.contains(e.target) && setDrop(null)
    document.addEventListener('mousedown', f)
    return () => document.removeEventListener('mousedown', f)
  }, [])
  const go = (v) => { onView(v); setMenu(false) }
  return (
    <header className={`nav ${scrolled || menu ? 'solid' : ''}`}>
      <button className="icon-btn burger" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      <button className="logo" onClick={() => go('home')} aria-label="ZFLIX home">ZFLIX</button>
      <nav className={`links ${menu ? 'open' : ''}`} aria-label="Primary">
        {NAV.map(([k, label]) => (
          <button key={k} className={view === k && !query ? 'active' : ''} aria-current={view === k ? 'page' : undefined} onClick={() => go(k)}>{label}</button>
        ))}
      </nav>
      <div className="tools" ref={box}>
        <SearchBar query={query} onChange={onQuery} />
        <div className="dd">
          <button className="icon-btn" aria-label="Notifications" aria-expanded={drop === 'bell'} onClick={() => setDrop(drop === 'bell' ? null : 'bell')}><Bell size={20} /></button>
          {drop === 'bell' && <div className="menu" role="menu"><p className="menu-note">New this week: Dune joined the catalogue (demo notification).</p></div>}
        </div>
        <div className="dd">
          <button className="profile" aria-label="Profile menu" aria-expanded={drop === 'profile'} onClick={() => setDrop(drop === 'profile' ? null : 'profile')}>
            <span className="avatar">L</span><ChevronDown size={16} className={drop === 'profile' ? 'flip' : ''} />
          </button>
          {drop === 'profile' && <div className="menu" role="menu">{PROFILE.map((p) => <button key={p} role="menuitem" onClick={() => { setDrop(null); if (p === 'Sign out (demo)') onSignOut() }}>{p}</button>)}<p className="menu-note">Demo menu: no accounts are connected.</p></div>}
        </div>
      </div>
    </header>
  )
}
