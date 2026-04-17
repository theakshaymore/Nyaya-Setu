import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import { LoadingDots } from '../../components/shared/LoadingDots.jsx'
import { useApi } from '../../hooks/useApi.js'
import { ChatInput } from './ChatInput.jsx'
import { MessageBubble } from './MessageBubble.jsx'

export function ChatModule() {
  const { api, getErrorMessage } = useApi()
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      content:
        'Ask me about Indian law, legal procedure, or rights-based scenarios, and I will keep the answer structured and grounded.'
    }
  ])
  const [isSending, setIsSending] = useState(false)

  async function handleSend(message) {
    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: message
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setIsSending(true)

    try {
      const history = nextMessages.slice(0, -1).map((entry) => ({
        role: entry.role,
        content: entry.content
      }))

      const response = await api.post('/api/chat', {
        message,
        history
      })

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response.data.reply
        }
      ])
    } catch (error) {
      toast.error(getErrorMessage(error))
      setMessages(messages)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="module-shell flex h-[calc(100dvh-11rem)] flex-col md:h-[calc(100dvh-9rem)]">
      <div className="flex-1 space-y-4 overflow-y-auto px-3 py-4 md:px-8 md:py-6">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <MessageBubble message={message} />
          </motion.div>
        ))}

        {isSending ? (
          <div className="flex justify-start">
            <div className="rounded-[12px] border border-border-subtle bg-[rgba(255,255,255,0.78)] px-5 py-4 text-sm text-text-secondary">
              <LoadingDots />
            </div>
          </div>
        ) : null}
      </div>

      <ChatInput onSend={handleSend} isSending={isSending} />
    </div>
  )
}
