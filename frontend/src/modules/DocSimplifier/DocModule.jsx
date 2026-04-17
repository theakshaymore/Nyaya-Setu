import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import { useApi } from '../../hooks/useApi.js'

export function DocModule() {
  const { api, getErrorMessage } = useApi()
  const [documentText, setDocumentText] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await api.post('/api/doc', { documentText })
      setAnalysis(response.data.analysis)
      toast.success('Document simplified.')
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="panel p-6 md:p-8"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold">
              Doc Simplifier
            </p>
            <p className="mt-3 font-display text-3xl text-ink">
              Turn dense clauses into plain language
            </p>
          </div>
          <button type="submit" className="primary-button" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Simplify Document'}
          </button>
        </div>

        <textarea
          className="field mt-6 min-h-[320px] resize-y"
          value={documentText}
          onChange={(event) => setDocumentText(event.target.value)}
          placeholder="Paste the rental agreement, contract, notice, or other legal text here..."
        />
      </motion.form>

      <section className="panel overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">
            Clause Analysis
          </p>
        </div>
        <div className="px-6 py-6">
          {analysis ? (
            <pre className="whitespace-pre-wrap font-body text-sm leading-8 text-slate-800">
              {analysis}
            </pre>
          ) : (
            <p className="text-sm leading-7 text-slate-500">
              Your plain-language summary, red flags, and overall assessment will appear here.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
