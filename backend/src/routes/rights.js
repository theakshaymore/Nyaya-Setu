import { Router } from 'express'

export const rightsRouter = Router()

rightsRouter.post('/', async (_req, res) => {
  return res.status(501).json({ error: 'Not implemented yet' })
})
