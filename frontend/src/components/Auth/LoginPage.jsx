import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useAuth } from '../../context/AuthContext.jsx'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthLoading } = useAuth()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      await login(form.email, form.password)
      navigate('/', { replace: true })
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Sign in failed.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel w-full max-w-md overflow-hidden"
      >
        <div className="bg-parchment p-8">
          <p className="font-display text-4xl text-ink">NyayaSetu</p>
          <p className="mt-1 text-sm text-slate-600">Bridge to Justice</p>
          <p className="mt-2 text-xs uppercase tracking-[0.28em] text-gold">
            न्याय सेतु
          </p>
        </div>

        <form className="space-y-5 p-8" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="field"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="field"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  password: event.target.value
                }))
              }
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="primary-button w-full" disabled={isAuthLoading}>
            {isAuthLoading ? 'Signing in...' : 'Sign in'}
          </button>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        </form>
      </motion.div>
    </div>
  )
}
