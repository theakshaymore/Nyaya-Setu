import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import { useApi } from '../../hooks/useApi.js'

const states = [
  'Andhra Pradesh',
  'Delhi',
  'Gujarat',
  'Karnataka',
  'Maharashtra',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal'
]

export function BailModule() {
  const { api, getErrorMessage } = useApi()
  const [section, setSection] = useState('')
  const [state, setState] = useState('Maharashtra')
  const [analysis, setAnalysis] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await api.post('/api/bail', { section, state })
      setAnalysis(response.data.analysis)
      toast.success('Bail analysis ready.')
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(340px,1fr)]">
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="panel self-start p-6 md:p-8"
      >
        <p className="eyebrow">
          Bail Checker
        </p>
        <p className="mt-3 text-[28px] font-semibold leading-[1.1] text-text-primary">
          Quick bail guidance for an IPC section
        </p>

        <div className="mt-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">
              IPC section or offense description
            </label>
            <input
              className="field"
              value={section}
              onChange={(event) => setSection(event.target.value)}
              placeholder="Example: IPC 420 or cheating"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">State</label>
            <select
              className="field"
              value={state}
              onChange={(event) => setState(event.target.value)}
            >
              {states.map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="primary-button mt-6" disabled={isLoading}>
          {isLoading ? 'Checking...' : 'Check Bail Position'}
        </button>
      </motion.form>

      <section className="panel self-start overflow-hidden">
        <div className="border-b border-border-subtle px-6 py-4 surface-soft">
          <p className="eyebrow">
            Structured Output
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Bailable status, court path, documents, and likely timing.
          </p>
        </div>
        <div className="px-6 py-6">
          {analysis ? (
            <pre className="whitespace-pre-wrap font-body text-sm leading-8 text-text-primary">
              {analysis}
            </pre>
          ) : (
            <p className="text-sm leading-7 text-text-secondary">
              Submit an IPC section to see a structured bail analysis here.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
