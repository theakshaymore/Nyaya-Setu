import { useState } from 'react'

export function ChatInput({ onSend, isSending }) {
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!message.trim() || isSending) {
      return
    }

    onSend(message.trim())
    setMessage('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 border-t border-border-subtle bg-[rgba(255,255,255,0.72)] px-3 py-3 backdrop-blur md:px-4"
      style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="field min-h-[72px] resize-none md:min-h-[84px]"
          placeholder="Ask a question about Indian law..."
        />
        <button type="submit" className="primary-button w-full md:min-w-36 md:w-auto" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  )
}
