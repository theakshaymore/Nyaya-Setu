import { useLocation } from 'react-router-dom'

import { DisclaimerBadge } from '../shared/DisclaimerBadge.jsx'

const titles = {
  '/': 'Legal Chat',
  '/fir': 'FIR Draft',
  '/bail': 'Bail Checker',
  '/doc': 'Doc Simplifier',
  '/rights': 'Know Your Rights',
  '/admin': 'Admin Panel'
}

export function Topbar() {
  const location = useLocation()

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white/80 px-6 py-5 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-display text-3xl text-ink">
          {titles[location.pathname] || 'NyayaSetu'}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Calm, structured legal guidance for Indian law workflows.
        </p>
      </div>
      <DisclaimerBadge />
    </div>
  )
}
