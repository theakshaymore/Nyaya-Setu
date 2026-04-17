import { Router } from 'express'

import { BAIL_SYSTEM_PROMPT } from '../prompts/bailPrompt.js'
import { callLLM } from '../services/llmService.js'

export const bailRouter = Router()

bailRouter.post('/', async (req, res, next) => {
  try {
    const { section, state } = req.body ?? {}

    if (!section || typeof section !== 'string' || !section.trim()) {
      return res.status(400).json({ error: 'IPC section or offense is required' })
    }

    const userMessage = `
IPC section or offense: ${section.trim()}
State: ${typeof state === 'string' && state.trim() ? state.trim() : 'Not provided'}
`.trim()

    const analysis = await callLLM(BAIL_SYSTEM_PROMPT, userMessage)

    return res.status(200).json({ analysis })
  } catch (error) {
    return next(error)
  }
})
