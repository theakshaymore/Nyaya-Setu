import { Router } from 'express'

import { CHAT_SYSTEM_PROMPT } from '../prompts/chatPrompt.js'
import { callLLM } from '../services/llmService.js'

export const chatRouter = Router()

function normalizeHistory(history = []) {
  if (!Array.isArray(history)) {
    return []
  }

  return history
    .filter(
      (entry) =>
        entry &&
        typeof entry.content === 'string' &&
        ['user', 'assistant'].includes(entry.role)
    )
    .map((entry) => ({
      role: entry.role,
      content: entry.content.trim()
    }))
    .filter((entry) => entry.content.length > 0)
    .slice(-12)
}

chatRouter.post('/', async (req, res, next) => {
  try {
    const { message, history } = req.body ?? {}

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // TODO: streaming
    const reply = await callLLM(
      CHAT_SYSTEM_PROMPT,
      message.trim(),
      normalizeHistory(history)
    )

    return res.status(200).json({ reply })
  } catch (error) {
    return next(error)
  }
})
