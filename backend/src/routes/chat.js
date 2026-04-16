import { Router } from 'express'

export const chatRouter = Router()

chatRouter.post('/', async (_req, res) => {
  // TODO: streaming
  return res.status(501).json({ error: 'Not implemented yet' })
})
