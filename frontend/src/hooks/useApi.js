import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { api, setApiToken, setUnauthorizedHandler } from '../utils/api.js'
import { useAuth } from '../context/AuthContext.jsx'

function getErrorMessage(error) {
  if (error.response?.data?.error) {
    return error.response.data.error
  }

  if (error.code === 'ERR_NETWORK') {
    return 'Could not connect to server. Check your connection.'
  }

  return 'Something went wrong. Please try again.'
}

export function useApi() {
  const { token, logout } = useAuth()

  useEffect(() => {
    setApiToken(token)
  }, [token])

  useEffect(() => {
    setUnauthorizedHandler(() => {
      toast.error('Your session has expired. Please sign in again.')
      logout()
    })

    return () => {
      setUnauthorizedHandler(null)
    }
  }, [logout])

  return {
    api,
    getErrorMessage
  }
}
