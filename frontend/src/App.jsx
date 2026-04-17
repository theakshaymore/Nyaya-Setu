import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { LoginPage } from './components/Auth/LoginPage.jsx'
import { ProtectedRoute } from './components/Auth/ProtectedRoute.jsx'
import { Sidebar } from './components/Layout/Sidebar.jsx'
import { Topbar } from './components/Layout/Topbar.jsx'
import { ChatModule } from './modules/Chat/ChatModule.jsx'
import { AdminPanel } from './pages/AdminPanel.jsx'

function PlaceholderModule({ title }) {
  return (
    <div className="module-shell flex items-center justify-center p-10">
      <div className="max-w-lg text-center">
        <p className="font-display text-3xl text-ink">{title}</p>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          This module shell is ready for the next build step.
        </p>
      </div>
    </div>
  )
}

function AppLayout() {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[280px_1fr]">
      <Sidebar />
      <main className="p-4 md:p-6">
        <Topbar />
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<ChatModule />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/fir" element={<PlaceholderModule title="FIR Draft" />} />
        <Route path="/bail" element={<PlaceholderModule title="Bail Checker" />} />
        <Route path="/doc" element={<PlaceholderModule title="Doc Simplifier" />} />
        <Route
          path="/rights"
          element={<PlaceholderModule title="Know Your Rights" />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
