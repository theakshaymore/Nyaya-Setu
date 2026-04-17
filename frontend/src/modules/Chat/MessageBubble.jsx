export function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-3xl rounded-[12px] px-4 py-4 text-sm leading-7 shadow-sm md:px-5 ${
          isUser
            ? 'border border-surface-raised bg-surface-raised text-white'
            : 'border border-border-subtle bg-[rgba(255,255,255,0.62)] text-text-primary'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}
