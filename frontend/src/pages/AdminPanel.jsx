import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useApi } from '../hooks/useApi.js'

const adminKey = import.meta.env.VITE_ADMIN_KEY || ''

export function AdminPanel() {
  const { api, getErrorMessage } = useApi()
  const [isAllowed, setIsAllowed] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [config, setConfig] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const key = params.get('key')

    if (!key || key !== adminKey) {
      setIsAllowed(false)
      setIsLoading(false)
      window.location.replace('/')
      return
    }

    async function loadStatus() {
      try {
        const response = await api.get('/api/admin/status', {
          headers: {
            'x-admin-key': key
          }
        })

        setConfig(response.data)
      } catch (error) {
        toast.error(getErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    }

    loadStatus()
  }, [api, getErrorMessage])

  async function handleToggle() {
    const key = new URLSearchParams(window.location.search).get('key')

    if (!config || !key) {
      return
    }

    setIsUpdating(true)

    try {
      const response = await api.post(
        '/api/admin/toggle',
        {
          use_local_llm: !config.use_local_llm
        },
        {
          headers: {
            'x-admin-key': key
          }
        }
      )

      setConfig(response.data.config)
      toast.success('LLM mode updated.')
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsUpdating(false)
    }
  }

  if (!isAllowed) {
    return null
  }

  return (
    <div className="module-shell p-8">
      <div className="max-w-xl space-y-6">
        <div>
          <p className="font-display text-3xl text-ink">Hidden Admin Control</p>
          <p className="mt-2 text-sm text-slate-500">
            Switch between Groq cloud inference and your local Ollama deployment.
          </p>
        </div>

        {isLoading ? (
          <p className="text-sm text-slate-500">Loading current status...</p>
        ) : (
          <div className="panel p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Use Local LLM
                </p>
                <p className="mt-2 text-lg font-medium text-ink">
                  {config?.use_local_llm ? 'Enabled' : 'Disabled'}
                </p>
              </div>

              <button
                type="button"
                className={`relative h-12 w-24 rounded-full transition ${
                  config?.use_local_llm ? 'bg-gold' : 'bg-slate-300'
                }`}
                onClick={handleToggle}
                disabled={isUpdating}
              >
                <span
                  className={`absolute top-1 h-10 w-10 rounded-full bg-white shadow transition ${
                    config?.use_local_llm
                      ? 'translate-x-[3rem]'
                      : 'translate-x-0'
                  }`}
                  style={{ left: '0.25rem' }}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
