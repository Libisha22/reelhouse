import { useState } from 'react'

const DEMO_EMAIL = 'demo@zflix.com'
const DEMO_PASSWORD = 'zflix123'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const fillDemoCredentials = () => {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
    setError('')
  }

  const submit = (event) => {
    event.preventDefault()
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('Those details don’t match the demo account. Try the credentials below.')
      return
    }
    onLogin()
  }

  return (
    <main className="login-page">
      <div className="login-glow" aria-hidden="true" />
      <header className="login-header">
        <span className="logo" aria-label="ZFLIX">ZFLIX</span>
      </header>
      <section className="login-card" aria-labelledby="login-title">
        <h1 id="login-title">Welcome back</h1>
        <p className="login-intro">Sign in to explore movies and series on ZFLIX.</p>
        <form className="login-form" onSubmit={submit}>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            autoComplete="username"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => { setEmail(event.target.value); setError('') }}
            required
          />
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => { setPassword(event.target.value); setError('') }}
            required
          />
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="login-submit" type="submit">Sign in</button>
        </form>
        <aside className="demo-credentials" aria-label="Demo account credentials">
          <div>
            <h2>Demo account</h2>
            <p><span>Email</span><code>{DEMO_EMAIL}</code></p>
            <p><span>Password</span><code>{DEMO_PASSWORD}</code></p>
          </div>
          <button type="button" onClick={fillDemoCredentials}>Use demo credentials</button>
        </aside>
        <p className="login-note">Demo only: sign-in is checked in your browser and does not create an account.</p>
      </section>
    </main>
  )
}
