import { NavLink } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext.jsx'

const items = [
  {
    to: '/app',
    label: 'Legal Chat',
    sublabel: 'Ask grounded Indian law questions',
    icon: '*'
  },
  {
    to: '/app/fir',
    label: 'FIR Draft',
    sublabel: 'Structured police complaint drafting',
    icon: '*'
  },
  {
    to: '/app/bail',
    label: 'Bail Checker',
    sublabel: 'CrPC guidance at a glance',
    icon: '*'
  },
  {
    to: '/app/doc',
    label: 'Doc Simplifier',
    sublabel: 'Plain-language clause summaries',
    icon: '*'
  },
  {
    to: '/app/rights',
    label: 'Know Your Rights',
    sublabel: 'Scenario-based next steps',
    icon: '*'
  }
]

export function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="flex w-full flex-col border-r border-border-subtle px-4 py-5 text-text-primary surface-soft md:sticky md:top-0 md:min-h-screen md:max-w-[280px] md:px-5 md:py-6">
      <div>
        <p className="text-[26px] font-semibold leading-none text-text-primary">NyayaSetu</p>
        <p className="mt-2 text-xs text-text-secondary">
          Structured legal assistance for teams and decision-makers
        </p>
      </div>

      <nav className="mt-6 flex gap-3 overflow-x-auto pb-2 md:mt-10 md:block md:space-y-3 md:overflow-visible md:pb-0">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `min-w-[220px] shrink-0 rounded-[12px] border px-4 py-4 transition md:block md:min-w-0 ${
                isActive
                  ? 'border-surface-raised surface-strong'
                  : 'border-border-subtle bg-transparent hover:border-surface-raised hover:surface-soft'
              }`
            }
          >
            <div className="flex items-start gap-3">
              <span className="pt-1 text-surface-raised">{item.icon}</span>
              <div>
                <p className="text-sm font-medium text-text-primary">{item.label}</p>
                <p className="mt-1 text-xs text-text-secondary">{item.sublabel}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 rounded-[12px] border border-border-subtle p-4 surface-strong md:mt-auto">
        <p className="eyebrow">Signed in</p>
        <p className="mt-2 break-all text-sm text-text-primary">{user?.email}</p>
        <button type="button" className="secondary-button mt-4 w-full" onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  )
}
