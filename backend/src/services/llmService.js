import { callGroq } from './groqService.js'
import { getUseLocalLlm } from './llmConfigService.js'
import { callOllama } from './ollamaService.js'

export async function callLLM(systemPrompt, userMessage, history = []) {
  const useLocalLlm = await getUseLocalLlm()

  if (useLocalLlm) {
    return callOllama(systemPrompt, userMessage, history)
  }

  return callGroq(systemPrompt, userMessage, history)
}
