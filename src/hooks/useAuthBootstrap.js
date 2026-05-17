import { useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAppStore } from '../store/useAppStore'

export function useAuthBootstrap() {
  const setAuth = useAppStore((state) => state.setAuth)
  const clearAuth = useAppStore((state) => state.clearAuth)
  const theme = useAppStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  useEffect(() => {
    if (!supabase) {
      clearAuth()
      return undefined
    }

    supabase.auth.getSession().then(({ data }) => {
      setAuth({ session: data.session, user: data.session?.user || null })
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth({ session, user: session?.user || null })
    })

    return () => subscription.unsubscribe()
  }, [clearAuth, setAuth])
}
