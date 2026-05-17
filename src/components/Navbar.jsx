import { motion } from 'framer-motion'
import { Github, LogIn, Moon, Sparkles, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { signInWithProvider, signOut } from '../services/authService'
import { isSupabaseConfigured } from '../services/supabaseClient'
import { useAppStore } from '../store/useAppStore'
import { Button } from './ui/button'

const navItems = [
  ['Features', '#features'],
  ['Demo', '#demo'],
  ['Security', '#security'],
  ['Dashboard', '#dashboard-preview'],
]

export default function Navbar() {
  const session = useAppStore((state) => state.session)
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)

  const handleGithub = async () => {
    try {
      await signInWithProvider('github')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 top-4 z-50 px-4"
    >
      <nav className="glass-panel mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full px-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-cyan-300 text-slate-950 shadow-glow">
            <Sparkles size={19} />
          </span>
          <span className="font-display text-sm font-bold tracking-[0.24em] text-white sm:text-base">
            VYRALINK
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-white/8 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            aria-label="Toggle theme"
            variant="ghost"
            className="h-10 w-10 p-0"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          {session ? (
            <>
              <Button asChild variant="secondary" className="hidden sm:inline-flex">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" onClick={signOut}>
                Sign out
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              onClick={handleGithub}
              disabled={!isSupabaseConfigured}
              title={isSupabaseConfigured ? 'Sign in with GitHub' : 'Add Supabase env vars'}
            >
              <Github size={17} />
              <span className="hidden sm:inline">GitHub</span>
              <LogIn className="sm:hidden" size={17} />
            </Button>
          )}
        </div>
      </nav>
    </motion.header>
  )
}
