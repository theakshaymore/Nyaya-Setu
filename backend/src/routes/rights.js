import { Router } from 'express'

import { RIGHTS_SYSTEM_PROMPT } from '../prompts/rightsPrompt.js'
import { callLLM } from '../services/llmService.js'

export const rightsRouter = Router()

const allowedScenarios = [
  'Police Encounter',
  'Landlord Dispute',
  'Workplace / Salary Issue',
  'Consumer Complaint'
]

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

rightsRouter.post('/', async (req, res, next) => {
  try {
    const { scenario, message, history } = req.body ?? {}

    if (!scenario || !allowedScenarios.includes(scenario)) {
      return res.status(400).json({ error: 'A valid scenario is required' })
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const systemPrompt = `${RIGHTS_SYSTEM_PROMPT}

The active scenario for this conversation is: ${scenario}.
Always tailor the answer to this scenario unless the user explicitly changes it.`

    const reply = await callLLM(
      systemPrompt,
      message.trim(),
      normalizeHistory(history)
    )

    return res.status(200).json({ reply })
  } catch (error) {
    return next(error)
  }
})
