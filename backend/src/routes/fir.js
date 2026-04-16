import { Router } from 'express'

export const firRouter = Router()

firRouter.post('/', async (_req, res) => {
  return res.status(501).json({ error: 'Not implemented yet' })
})
