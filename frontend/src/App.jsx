import { useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { LoginPage } from './components/Auth/LoginPage.jsx'
import { ProtectedRoute } from './components/Auth/ProtectedRoute.jsx'
import { Sidebar } from './components/Layout/Sidebar.jsx'
import { Topbar } from './components/Layout/Topbar.jsx'
import { BailModule } from './modules/Bail/BailModule.jsx'
import { ChatModule } from './modules/Chat/ChatModule.jsx'
import { DocModule } from './modules/DocSimplifier/DocModule.jsx'
import { FIRModule } from './modules/FIR/FIRModule.jsx'
import { RightsModule } from './modules/Rights/RightsModule.jsx'
import { AdminPanel } from './pages/AdminPanel.jsx'

function PlaceholderModule({ title }) {
  return (
    <div className="module-shell flex items-center justify-center p-10">
      <div className="max-w-lg text-center">
        <p className="section-title">{title}</p>
        <p className="mt-3 text-sm leading-7 text-text-secondary">
          This module shell is ready for the next build step.
        </p>
      </div>
    </div>
  )
}

function AppLayout({ theme, onToggleTheme }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[280px_minmax(0,1fr)]">
      <Sidebar />
      <main className="min-w-0 p-3 md:p-6">
        <Topbar
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('nyayasetu-theme') || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('nyayasetu-theme', theme)
  }, [theme])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout
              theme={theme}
              onToggleTheme={() =>
                setTheme((current) => (current === 'light' ? 'dark' : 'light'))
              }
            />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<ChatModule />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/fir" element={<FIRModule />} />
        <Route path="/bail" element={<BailModule />} />
        <Route path="/doc" element={<DocModule />} />
        <Route path="/rights" element={<RightsModule />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
