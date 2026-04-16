import { Router } from 'express'

export const bailRouter = Router()

bailRouter.post('/', async (_req, res) => {
  return res.status(501).json({ error: 'Not implemented yet' })
})
