import { useCallback, useEffect, useState } from 'react'
const KEY = 'reelhouse:my-list'
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] } }
export default function useMyList() {
  const [ids, setIds] = useState(load)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(ids)) } catch { /* storage unavailable */ } }, [ids])
  const toggle = useCallback((id) => setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])), [])
  return { ids, toggle, has: (id) => ids.includes(id) }
}
