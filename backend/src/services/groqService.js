import axios from 'axios'

import { env } from '../config/env.js'
import { HttpError } from '../utils/httpError.js'

export async function callGroq(systemPrompt, userMessage, history = []) {
  if (!env.groqApiKey) {
    throw new HttpError(500, 'Groq API key is not configured')
  }

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history,
    { role: 'user', content: userMessage }
  ]

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: env.groqModel,
        messages,
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${env.groqApiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    )

    const content = response.data?.choices?.[0]?.message?.content

    if (!content) {
      throw new HttpError(502, 'Groq returned an empty response')
    }

    return content
  } catch (error) {
    if (error instanceof HttpError) {
      throw error
    }

    const message =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      'Failed to get response from Groq'

    throw new HttpError(error.response?.status || 502, message)
  }
}
