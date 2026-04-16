import { Router } from 'express'

export const docRouter = Router()

docRouter.post('/', async (_req, res) => {
  return res.status(501).json({ error: 'Not implemented yet' })
})
