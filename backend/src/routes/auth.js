import { Router } from 'express'

export const authRouter = Router()

authRouter.post('/login', async (_req, res) => {
  return res.status(501).json({ error: 'Not implemented yet' })
})

authRouter.post('/logout', async (_req, res) => {
  return res.status(501).json({ error: 'Not implemented yet' })
})

authRouter.get('/me', async (_req, res) => {
  return res.status(501).json({ error: 'Not implemented yet' })
})
