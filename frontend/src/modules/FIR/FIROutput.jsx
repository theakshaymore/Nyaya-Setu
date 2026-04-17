export function FIROutput({ draft, detectedSections, onCopy }) {
  if (!draft && !detectedSections) {
    return (
      <section className="panel p-6 md:p-8">
        <p className="eyebrow">
          Draft Preview
        </p>
        <p className="mt-3 text-[28px] font-semibold leading-[1.1] text-text-primary">Your FIR will appear here</p>
        <p className="mt-3 text-sm leading-7 text-text-secondary">
          Generate a draft or detect suggested IPC sections to bring the result into view automatically.
        </p>
      </section>
    )
  }

  return (
    <div className="space-y-5">
      {detectedSections ? (
        <section className="panel border-gold/40 p-6 md:p-8">
          <div className="mb-3">
            <p className="eyebrow">
              Suggested Sections
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Quick preview before full draft generation.
            </p>
          </div>
          <div className="whitespace-pre-wrap text-sm leading-7 text-text-primary">
            {detectedSections}
          </div>
        </section>
      ) : null}

      {draft ? (
        <section className="panel overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-border-subtle px-6 py-4 surface-soft md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow">
                FIR Draft
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                Review carefully before submission.
              </p>
            </div>
            <button type="button" className="secondary-button" onClick={onCopy}>
              Copy to clipboard
            </button>
          </div>

          <div className="px-6 py-6">
            <div className="rounded-2xl border border-border-subtle px-5 py-6 surface-soft">
              <pre className="whitespace-pre-wrap font-body text-sm leading-8 text-text-primary">
                {draft}
              </pre>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
