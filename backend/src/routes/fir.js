import { Router } from 'express'

import { FIR_SYSTEM_PROMPT } from '../prompts/firPrompt.js'
import { callLLM } from '../services/llmService.js'

export const firRouter = Router()

function buildFirFacts({ name, date, location, description, accused, state }) {
  return `
Complainant name: ${name}
Date of incident: ${date}
Location of incident: ${location}
State or region: ${state || 'Not provided'}
Accused details: ${accused || 'Not provided'}
Incident description: ${description}
`.trim()
}

firRouter.post('/', async (req, res, next) => {
  try {
    const { name, date, location, description, accused, state, detectSectionsOnly } =
      req.body ?? {}

    if (!name || !date || !location || !description) {
      return res.status(400).json({
        error: 'Name, date, location, and description are required'
      })
    }

    const facts = buildFirFacts({
      name: String(name).trim(),
      date: String(date).trim(),
      location: String(location).trim(),
      description: String(description).trim(),
      accused: typeof accused === 'string' ? accused.trim() : '',
      state: typeof state === 'string' ? state.trim() : ''
    })

    if (detectSectionsOnly) {
      const sections = await callLLM(
        `${FIR_SYSTEM_PROMPT}

For this request, only return a short section titled "RELEVANT IPC SECTIONS" with bullet points.
Do not draft the rest of the FIR.
If details are insufficient, say so clearly.`,
        facts
      )

      return res.status(200).json({ sections })
    }

    const draft = await callLLM(FIR_SYSTEM_PROMPT, facts)

    return res.status(200).json({ draft })
  } catch (error) {
    return next(error)
  }
})
