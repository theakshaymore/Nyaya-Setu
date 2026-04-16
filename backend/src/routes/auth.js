import { Router } from 'express'

import { authMiddleware, getBearerToken } from '../middleware/authMiddleware.js'
import { assertSupabaseConfigured, supabase } from '../supabaseClient.js'

export const authRouter = Router()

authRouter.post('/login', async (req, res, next) => {
  try {
    assertSupabaseConfigured()

    const { email, password } = req.body ?? {}

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'Email and password are required' })
    }

    const {
      data: { session, user },
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return res.status(401).json({ error: error.message })
    }

    if (!session?.access_token || !user) {
      return res.status(500).json({ error: 'Unable to create user session' })
    }

    return res.status(200).json({
      token: session.access_token,
      user: {
        id: user.id,
        email: user.email
      }
    })
  } catch (error) {
    return next(error)
  }
})

authRouter.post('/logout', authMiddleware, async (req, res, next) => {
  try {
    assertSupabaseConfigured()

    const token = req.accessToken || getBearerToken(req.headers.authorization)

    const { error } = await supabase.auth.admin.signOut(token)

    if (error) {
      return res.status(401).json({ error: error.message })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    return next(error)
  }
})

authRouter.get('/me', authMiddleware, async (req, res) => {
  return res.status(200).json({
    id: req.user.id,
    email: req.user.email
  })
})
