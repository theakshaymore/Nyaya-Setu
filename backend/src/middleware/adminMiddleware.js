import { env } from '../config/env.js'

export function adminMiddleware(req, res, next) {
  const adminKey = req.headers['x-admin-key']

  if (!adminKey) {
    return res.status(401).json({ error: 'Admin key is required' })
  }

  if (!env.adminSecretKey) {
    return res.status(500).json({ error: 'Admin secret key is not configured' })
  }

  if (adminKey !== env.adminSecretKey) {
    return res.status(403).json({ error: 'Invalid admin key' })
  }

  return next()
}
