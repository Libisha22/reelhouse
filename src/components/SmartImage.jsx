import { useState } from 'react'
// Tries each src in order, then falls back to an inline gradient placeholder showing the title.
export default function SmartImage({ srcs, alt, className, eager = false }) {
  const list = srcs.filter(Boolean)
  const [i, setI] = useState(0)
  if (i >= list.length) {
    return <div className={`${className || ''} img-fallback`} role="img" aria-label={alt}><span>{alt}</span></div>
  }
  return <img className={className} src={list[i]} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setI(i + 1)} />
}
