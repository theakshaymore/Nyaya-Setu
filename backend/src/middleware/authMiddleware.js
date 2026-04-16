import { assertSupabaseConfigured, supabase } from '../supabaseClient.js'

export function getBearerToken(authorizationHeader = '') {
  if (!authorizationHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authorizationHeader.slice('Bearer '.length).trim()
  return token || null
}

export async function authMiddleware(req, res, next) {
  try {
    const token = getBearerToken(req.headers.authorization)

    if (!token) {
      return res.status(401).json({ error: 'Authorization token is required' })
    }

    assertSupabaseConfigured()

    const {
      data: { user },
      error
    } = await supabase.auth.getUser(token)

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    req.user = {
      id: user.id,
      email: user.email
    }
    req.accessToken = token

    return next()
  } catch (error) {
    return next(error)
  }
}
