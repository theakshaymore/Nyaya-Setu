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
      className="border-t border-slate-200 bg-paper/90 px-4 py-4 backdrop-blur"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="field min-h-[84px] resize-none"
          placeholder="Ask a question about Indian law..."
        />
        <button type="submit" className="primary-button md:min-w-36" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  )
}
