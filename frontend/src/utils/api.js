import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

let authToken = ''
let unauthorizedHandler = null

export const api = axios.create({
  baseURL,
  withCredentials: false
})

export function setApiToken(token) {
  authToken = token || ''
}

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler
}

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && unauthorizedHandler) {
      unauthorizedHandler()
    }

    return Promise.reject(error)
  }
)
