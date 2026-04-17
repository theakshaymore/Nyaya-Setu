import { ChatInput } from '../Chat/ChatInput.jsx'
import { MessageBubble } from '../Chat/MessageBubble.jsx'

export function ScenarioFlow({
  scenario,
  messages,
  isLoading,
  onBack,
  onSend
}) {
  return (
    <div className="module-shell flex flex-col">
      <div className="border-b border-slate-200 bg-white/70 px-5 py-4">
        <button type="button" className="secondary-button" onClick={onBack}>
          Back to scenarios
        </button>
        <p className="mt-4 font-display text-3xl text-ink">{scenario}</p>
        <p className="mt-1 text-sm text-slate-500">
          Ask follow-ups and get structured next-step guidance.
        </p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 md:px-8">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading ? (
          <div className="text-sm text-slate-500">Preparing guidance...</div>
        ) : null}
      </div>

      <ChatInput onSend={onSend} isSending={isLoading} />
    </div>
  )
}
