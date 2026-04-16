import { Router } from 'express'

export const adminRouter = Router()

adminRouter.get('/status', async (_req, res) => {
  return res.status(501).json({ error: 'Not implemented yet' })
})

adminRouter.post('/toggle', async (_req, res) => {
  return res.status(501).json({ error: 'Not implemented yet' })
})
