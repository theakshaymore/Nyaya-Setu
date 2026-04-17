import { Router } from 'express'

import { DOC_SYSTEM_PROMPT } from '../prompts/docPrompt.js'
import { callLLM } from '../services/llmService.js'

export const docRouter = Router()

docRouter.post('/', async (req, res, next) => {
  try {
    const { documentText } = req.body ?? {}

    if (
      !documentText ||
      typeof documentText !== 'string' ||
      !documentText.trim()
    ) {
      return res.status(400).json({ error: 'Document text is required' })
    }

    const analysis = await callLLM(DOC_SYSTEM_PROMPT, documentText.trim())

    return res.status(200).json({ analysis })
  } catch (error) {
    return next(error)
  }
})
