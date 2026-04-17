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
    <div className="module-shell flex h-[calc(100dvh-11rem)] flex-col md:h-[calc(100dvh-9rem)]">
      <div className="border-b border-border-subtle bg-[rgba(255,255,255,0.62)] px-4 py-4 md:px-5">
        <button type="button" className="secondary-button" onClick={onBack}>
          Back to scenarios
        </button>
        <p className="mt-4 text-[28px] font-semibold text-text-primary">{scenario}</p>
        <p className="mt-1 text-sm text-text-secondary">
          Ask follow-ups and get structured next-step guidance.
        </p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-3 py-4 md:px-8 md:py-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading ? (
          <div className="text-sm text-text-secondary">Preparing guidance...</div>
        ) : null}
      </div>

      <ChatInput onSend={onSend} isSending={isLoading} />
    </div>
  )
}
