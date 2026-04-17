import { useLocation } from 'react-router-dom'

import { DisclaimerBadge } from '../shared/DisclaimerBadge.jsx'

const titles = {
  '/app': 'Legal Chat',
  '/app/fir': 'FIR Draft',
  '/app/bail': 'Bail Checker',
  '/app/doc': 'Doc Simplifier',
  '/app/rights': 'Know Your Rights',
  '/admin': 'Admin Panel'
}

export function Topbar({ theme, onToggleTheme }) {
  const location = useLocation()
  const isLight = theme === 'light'

  return (
    <div className="panel mb-4 flex flex-col gap-4 px-4 py-4 md:mb-6 md:flex-row md:items-center md:justify-between md:px-6">
      <div>
        <p className="eyebrow">Implementation-focused workspace</p>
        <p className="mt-2 text-[28px] font-semibold leading-[1.1] text-text-primary">
          {titles[location.pathname] || 'NyayaSetu'}
        </p>
        <p className="mt-2 max-w-2xl text-sm text-text-secondary">
          Clear workflows for legal drafting, rights guidance, and structured analysis.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3 md:ml-auto">
        <DisclaimerBadge />
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <span className="text-base" aria-hidden="true">
            {isLight ? '☾' : '☼'}
          </span>
        </button>
      </div>
    </div>
  )
}
