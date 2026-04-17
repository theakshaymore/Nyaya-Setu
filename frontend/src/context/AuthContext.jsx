import { createContext, useContext, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { api, setApiToken } from '../utils/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  async function login(email, password) {
    setIsAuthLoading(true)

    try {
      const response = await api.post('/api/auth/login', { email, password })

      setToken(response.data.token)
      setApiToken(response.data.token)
      setUser(response.data.user)
      toast.success('Signed in successfully.')

      return response.data.user
    } catch (error) {
      const message =
        error.response?.data?.error ||
        'Could not connect to server. Check your connection.'

      toast.error(message)
      throw error
    } finally {
      setIsAuthLoading(false)
    }
  }

  async function logout() {
    try {
      if (token) {
        await api.post('/api/auth/logout')
      }
    } catch (_error) {
      // Best-effort logout to avoid trapping the user in an expired session.
    } finally {
      setToken('')
      setUser(null)
      setApiToken('')
    }
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isAuthLoading,
      login,
      logout
    }),
    [token, user, isAuthLoading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
