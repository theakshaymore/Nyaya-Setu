export function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-gold [animation-delay:-0.3s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gold [animation-delay:-0.15s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gold" />
    </span>
  )
}
