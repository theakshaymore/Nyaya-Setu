import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import { useApi } from '../../hooks/useApi.js'
import { FIROutput } from './FIROutput.jsx'

const initialForm = {
  name: '',
  date: '',
  location: '',
  state: '',
  accused: '',
  description: ''
}

export function FIRModule() {
  const { api, getErrorMessage } = useApi()
  const outputRef = useRef(null)
  const [form, setForm] = useState(initialForm)
  const [draft, setDraft] = useState('')
  const [detectedSections, setDetectedSections] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDetecting, setIsDetecting] = useState(false)

  function updateField(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value
    }))
  }

  useEffect(() => {
    if ((draft || detectedSections) && outputRef.current) {
      outputRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [draft, detectedSections])

  async function handleDetectSections() {
    setIsDetecting(true)

    try {
      const response = await api.post('/api/fir', {
        ...form,
        detectSectionsOnly: true
      })

      setDetectedSections(response.data.sections)
      toast.success('Suggested IPC sections generated.')
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsDetecting(false)
    }
  }

  async function handleGenerateDraft(event) {
    event.preventDefault()
    setIsGenerating(true)

    try {
      const response = await api.post('/api/fir', form)
      setDraft(response.data.draft)
      toast.success('FIR draft generated.')
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsGenerating(false)
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(draft)
      toast.success('Draft copied to clipboard.')
    } catch (_error) {
      toast.error('Could not copy the draft.')
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.92fr)]">
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleGenerateDraft}
        className="panel self-start p-6 md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">Complainant Name</label>
            <input
              className="field"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="Full legal name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">Date of Incident</label>
            <input
              type="date"
              className="field"
              value={form.date}
              onChange={(event) => updateField('date', event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">Location</label>
            <input
              className="field"
              value={form.location}
              onChange={(event) => updateField('location', event.target.value)}
              placeholder="Police station area / city / locality"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">State</label>
            <input
              className="field"
              value={form.state}
              onChange={(event) => updateField('state', event.target.value)}
              placeholder="Optional"
            />
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">Accused Details</label>
            <textarea
              className="field min-h-[148px] resize-none"
              value={form.accused}
              onChange={(event) => updateField('accused', event.target.value)}
              placeholder="Names, identifying details, relationship, if known"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">
              Incident Description
            </label>
            <textarea
              className="field min-h-[148px] resize-none"
              value={form.description}
              onChange={(event) => updateField('description', event.target.value)}
              placeholder="Describe what happened in chronological order"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 md:flex-row">
          <button
            type="button"
            className="secondary-button"
            onClick={handleDetectSections}
            disabled={isDetecting}
          >
            {isDetecting ? 'Detecting...' : 'Detect IPC Sections'}
          </button>
          <button type="submit" className="primary-button" disabled={isGenerating}>
            {isGenerating ? 'Generating Draft...' : 'Generate FIR Draft'}
          </button>
        </div>
      </motion.form>

      <div ref={outputRef} className="self-start xl:sticky xl:top-6">
        <FIROutput
          draft={draft}
          detectedSections={detectedSections}
          onCopy={handleCopy}
        />
      </div>
    </div>
  )
}
