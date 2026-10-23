import { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
export default function SearchBar({ query, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => { if (open) ref.current?.focus() }, [open])
  const show = open || query
  return (
    <div className={`search ${show ? 'open' : ''}`} role="search">
      <button className="icon-btn" aria-label="Search titles" onClick={() => setOpen((o) => !o)}><Search size={20} /></button>
      <input ref={ref} type="search" value={query} placeholder="Search titles" aria-label="Search titles"
        onChange={(e) => onChange(e.target.value)} onBlur={() => !query && setOpen(false)}
        onKeyDown={(e) => e.key === 'Escape' && (onChange(''), setOpen(false))} />
      {query && <button className="icon-btn clear" aria-label="Clear search" onClick={() => { onChange(''); ref.current?.focus() }}><X size={16} /></button>}
    </div>
  )
}
