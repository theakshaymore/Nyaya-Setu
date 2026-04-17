import { Router } from 'express'

import { adminMiddleware } from '../middleware/adminMiddleware.js'
import {
  getOrCreateLlmConfig,
  updateUseLocalLlm
} from '../services/llmConfigService.js'

export const adminRouter = Router()

adminRouter.use(adminMiddleware)

adminRouter.get('/status', async (_req, res, next) => {
  try {
    const config = await getOrCreateLlmConfig()

    return res.status(200).json(config)
  } catch (error) {
    return next(error)
  }
})

adminRouter.post('/toggle', async (req, res, next) => {
  try {
    const { use_local_llm: useLocalLlm } = req.body ?? {}

    if (typeof useLocalLlm !== 'boolean') {
      return res
        .status(400)
        .json({ error: 'use_local_llm must be a boolean' })
    }

    const config = await updateUseLocalLlm(useLocalLlm)

    return res.status(200).json({
      success: true,
      config
    })
  } catch (error) {
    return next(error)
  }
})
