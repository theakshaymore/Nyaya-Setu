import { useState } from 'react'
import toast from 'react-hot-toast'

import { useApi } from '../../hooks/useApi.js'
import { ScenarioFlow } from './ScenarioFlow.jsx'

const scenarioCards = [
  {
    title: 'Police Encounter',
    description: 'Detention, questioning, arrest procedure, and immediate rights.'
  },
  {
    title: 'Landlord Dispute',
    description: 'Eviction pressure, deposits, lockout threats, and repair issues.'
  },
  {
    title: 'Workplace / Salary Issue',
    description: 'Unpaid wages, wrongful deductions, and employment pressure.'
  },
  {
    title: 'Consumer Complaint',
    description: 'Defective products, refunds, delay, and unfair service practices.'
  }
]

function createIntroMessage(title) {
  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: `You selected ${title}. Ask what happened, what your immediate concern is, or what step you want to take next.`
  }
}

export function RightsModule() {
  const { api, getErrorMessage } = useApi()
  const [activeScenario, setActiveScenario] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function handleSend(message) {
    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: message
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setIsLoading(true)

    try {
      const history = nextMessages.slice(0, -1).map((entry) => ({
        role: entry.role,
        content: entry.content
      }))

      const response = await api.post('/api/rights', {
        scenario: activeScenario,
        message,
        history
      })

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response.data.reply
        }
      ])
    } catch (error) {
      toast.error(getErrorMessage(error))
      setMessages(messages)
    } finally {
      setIsLoading(false)
    }
  }

  if (activeScenario) {
    return (
      <ScenarioFlow
        scenario={activeScenario}
        messages={messages}
        isLoading={isLoading}
        onBack={() => {
          setActiveScenario('')
          setMessages([])
        }}
        onSend={handleSend}
      />
    )
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {scenarioCards.map((scenario) => (
        <button
          key={scenario.title}
          type="button"
          className="panel p-6 text-left transition hover:-translate-y-1 hover:border-surface-raised/60"
          onClick={() => {
            setActiveScenario(scenario.title)
            setMessages([createIntroMessage(scenario.title)])
            toast.success(`Opened ${scenario.title}.`)
          }}
        >
          <p className="eyebrow">Scenario</p>
          <p className="mt-3 text-[28px] font-semibold leading-[1.1] text-text-primary">
            {scenario.title}
          </p>
          <p className="mt-3 text-sm leading-7 text-text-secondary">
            {scenario.description}
          </p>
        </button>
      ))}
    </div>
  )
}
