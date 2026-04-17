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
      navigate('/', { replace: true })
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Sign in failed.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel grid w-full max-w-5xl overflow-hidden lg:grid-cols-[1.1fr_0.9fr]"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="panel border-b-0 border-r-0 px-6 py-8 md:px-8 lg:border-r lg:border-border-subtle"
        >
          <p className="eyebrow">Secure legal workspace</p>
          <p className="mt-3 text-[40px] font-semibold leading-[1.02] text-text-primary">
            Understand Indian legal issues faster and act with more clarity
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-text-secondary">
            NyayaSetu is an Indian legal assistant workspace. Ask law questions, draft FIRs,
            check bail position, simplify legal documents, and explore rights-based next steps
            from one dashboard.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="panel px-4 py-4"
            >
              <p className="eyebrow">Draft</p>
              <p className="mt-2 text-sm text-text-secondary">Generate formal FIR drafts from incident facts.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="panel px-4 py-4"
            >
              <p className="eyebrow">Assess</p>
              <p className="mt-2 text-sm text-text-secondary">Check bail position and simplify legal documents quickly.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 }}
              className="panel px-4 py-4"
            >
              <p className="eyebrow">Act</p>
              <p className="mt-2 text-sm text-text-secondary">Get rights-focused next steps for practical scenarios.</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="panel border-b-0 px-6 py-8 md:px-8"
        >
          <p className="eyebrow">Secure access</p>
          <p className="mt-3 text-[32px] font-semibold leading-[1.05] text-text-primary">
            Sign in to continue
          </p>
          <p className="mt-3 text-sm leading-7 text-text-secondary">
            Use your Supabase email and password to enter the workspace and continue from the dashboard.
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
              <label
                className="text-sm font-medium text-text-secondary"
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
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="primary-button w-full" disabled={isAuthLoading}>
              {isAuthLoading ? 'Signing in...' : 'Sign in'}
            </button>

            {error ? (
              <p className="rounded-[8px] border border-state-error bg-state-error-surface px-3 py-2 text-sm text-state-error">
                {error}
              </p>
            ) : null}
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}
