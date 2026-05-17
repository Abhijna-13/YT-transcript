import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useAuthBootstrap } from './hooks/useAuthBootstrap'
import { useAppStore } from './store/useAppStore'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function RouteFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-background text-foreground">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
    </div>
  )
}

function ProtectedRoute({ children }) {
  const session = useAppStore((state) => state.session)
  const authReady = useAppStore((state) => state.authReady)

  if (!authReady) return <RouteFallback />
  if (!session) return <Navigate to="/" replace />

  return children
}

export default function App() {
  useAuthBootstrap()

  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Toaster richColors theme="dark" position="top-right" />
    </BrowserRouter>
  )
}
