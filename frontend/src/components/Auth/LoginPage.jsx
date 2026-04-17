import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useAuth } from '../../context/AuthContext.jsx'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthLoading } = useAuth()
  const [form, setForm] = useState({
    email: 'akshaymoretest@gmail.com',
    password: 'monica'
  })
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      await login(form.email, form.password)
      navigate('/app', { replace: true })
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Sign in failed.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel w-full max-w-md px-6 py-8 md:px-8"
      >
        <p className="eyebrow">Member sign in</p>
        <p className="mt-3 text-[34px] font-semibold leading-[1.02] text-text-primary">
          Continue to your legal workspace
        </p>
        <p className="mt-3 text-sm leading-7 text-text-secondary">
          Sign in to access legal chat, FIR drafting, bail analysis, document simplification, and rights guidance.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="field"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  email: event.target.value
                }))
              }
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary" htmlFor="password">
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
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="primary-button w-full" disabled={isAuthLoading}>
            {isAuthLoading ? 'Signing in...' : 'Sign in'}
          </button>

          <button
            type="button"
            className="secondary-button w-full"
            onClick={() => navigate('/')}
          >
            Back to home
          </button>

          {error ? (
            <p className="rounded-[8px] border border-state-error bg-state-error-surface px-3 py-2 text-sm text-state-error">
              {error}
            </p>
          ) : null}
        </form>
      </motion.div>
    </div>
  )
}
