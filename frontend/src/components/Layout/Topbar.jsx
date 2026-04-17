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
    <div className="panel mb-6 flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
      <div>
        <p className="eyebrow">Implementation-focused workspace</p>
        <p className="mt-2 text-[28px] font-semibold leading-[1.1] text-text-primary">
          {titles[location.pathname] || 'NyayaSetu'}
        </p>
        <p className="mt-2 max-w-2xl text-sm text-text-secondary">
          Clear workflows for legal drafting, rights guidance, and structured analysis.
        </p>
      </div>
      <DisclaimerBadge />
    </div>
  )
}
