import { NavLink } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext.jsx'

const items = [
  {
    to: '/',
    label: 'Legal Chat',
    sublabel: 'Ask grounded Indian law questions',
    icon: '*'
  },
  {
    to: '/fir',
    label: 'FIR Draft',
    sublabel: 'Structured police complaint drafting',
    icon: '*'
  },
  {
    to: '/bail',
    label: 'Bail Checker',
    sublabel: 'CrPC guidance at a glance',
    icon: '*'
  },
  {
    to: '/doc',
    label: 'Doc Simplifier',
    sublabel: 'Plain-language clause summaries',
    icon: '*'
  },
  {
    to: '/rights',
    label: 'Know Your Rights',
    sublabel: 'Scenario-based next steps',
    icon: '*'
  }
]

export function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="flex w-full flex-col bg-sidebar px-4 py-5 text-white md:sticky md:top-0 md:min-h-screen md:max-w-[280px] md:px-6 md:py-8">
      <div>
        <p className="font-display text-3xl text-gold">NyayaSetu</p>
        <p className="mt-2 text-xs uppercase tracking-[0.26em] text-slate-400">
          Bridge to Justice
        </p>
      </div>

      <nav className="mt-6 flex gap-3 overflow-x-auto pb-2 md:mt-10 md:block md:space-y-3 md:overflow-visible md:pb-0">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `min-w-[220px] shrink-0 rounded-2xl border-l-4 px-4 py-4 transition md:block md:min-w-0 ${
                isActive
                  ? 'border-gold bg-white/8'
                  : 'border-transparent hover:border-gold/70 hover:bg-white/5'
              }`
            }
          >
            <div className="flex items-start gap-3">
              <span className="pt-1 text-gold">{item.icon}</span>
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="mt-1 text-xs text-slate-400">{item.sublabel}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:mt-auto">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Signed in</p>
        <p className="mt-2 break-all text-sm text-white">{user?.email}</p>
        <button type="button" className="secondary-button mt-4 w-full" onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  )
}
