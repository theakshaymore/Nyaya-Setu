import axios from 'axios'

import { env } from '../config/env.js'
import { HttpError } from '../utils/httpError.js'

const OLLAMA_UNAVAILABLE_MESSAGE =
  'Local model is currently unavailable. Please try again later.'

export async function pingOllama() {
  try {
    await axios.get(`${env.ollamaBaseUrl}/api/tags`, {
      timeout: 3000
    })

    return true
  } catch (_error) {
    throw new HttpError(503, OLLAMA_UNAVAILABLE_MESSAGE)
  }
}

export async function callOllama(systemPrompt, userMessage, history = []) {
  await pingOllama()

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history,
    { role: 'user', content: userMessage }
  ]

  try {
    const response = await axios.post(
      `${env.ollamaBaseUrl}/api/chat`,
      {
        model: env.ollamaModel,
        messages,
        stream: false
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 120000
      }
    )

    const content = response.data?.message?.content

    if (!content) {
      throw new HttpError(502, 'Ollama returned an empty response')
    }

    return content
  } catch (error) {
    if (error instanceof HttpError) {
      throw error
    }

    if (!error.response) {
      throw new HttpError(503, OLLAMA_UNAVAILABLE_MESSAGE)
    }

    const message =
      error.response?.data?.error || error.response?.data?.message || 'Failed to get response from Ollama'

    throw new HttpError(error.response?.status || 502, message)
  }
}
