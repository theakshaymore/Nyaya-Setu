export function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-3xl rounded-3xl px-5 py-4 text-sm leading-7 shadow-sm ${
          isUser
            ? 'bg-ink text-white'
            : 'border border-slate-200 bg-white text-slate-800'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}
