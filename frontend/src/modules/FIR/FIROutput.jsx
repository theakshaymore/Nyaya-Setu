export function FIROutput({ draft, detectedSections, onCopy }) {
  if (!draft && !detectedSections) {
    return (
      <section className="panel p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-gold">
          Draft Preview
        </p>
        <p className="mt-3 font-display text-3xl text-ink">Your FIR will appear here</p>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          Generate a draft or detect suggested IPC sections to bring the result into view automatically.
        </p>
      </section>
    )
  }

  return (
    <div className="space-y-5">
      {detectedSections ? (
        <section className="panel border-gold/40 bg-white p-6 md:p-8">
          <div className="mb-3">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">
              Suggested Sections
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Quick preview before full draft generation.
            </p>
          </div>
          <div className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {detectedSections}
          </div>
        </section>
      ) : null}

      {draft ? (
        <section className="panel overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gold">
                FIR Draft
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Review carefully before submission.
              </p>
            </div>
            <button type="button" className="secondary-button" onClick={onCopy}>
              Copy to clipboard
            </button>
          </div>

          <div className="bg-white px-6 py-6">
            <div className="rounded-2xl border border-slate-200 bg-paper px-5 py-6">
              <pre className="whitespace-pre-wrap font-body text-sm leading-8 text-slate-800">
                {draft}
              </pre>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
