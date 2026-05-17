import { Github, Mail, Send } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { signInWithMagicLink, signInWithProvider } from '../services/authService'
import { isSupabaseConfigured } from '../services/supabaseClient'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'

export default function AuthPanel() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleProvider = async (provider) => {
    try {
      await signInWithProvider(provider)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleMagic = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      await signInWithMagicLink(email)
      toast.success('Magic link sent')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-shell py-24">
      <Card className="grid gap-8 rounded-[2rem] p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-fuchsia-200">Authentication</p>
          <h2 className="mt-4 font-display text-4xl font-black text-white">
            Login into your protected growth cockpit
          </h2>
          <p className="mt-5 leading-8 text-muted-foreground">
            Google, GitHub, and passwordless email auth are powered by Supabase. Sessions persist
            automatically and unlock the protected dashboard route.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
          {!isSupabaseConfigured && (
            <div className="mb-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">
              Add Supabase variables in `.env` or Vercel to activate authentication.
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              disabled={!isSupabaseConfigured}
              onClick={() => handleProvider('google')}
            >
              <Mail size={18} />
              Google Login
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={!isSupabaseConfigured}
              onClick={() => handleProvider('github')}
            >
              <Github size={18} />
              GitHub Login
            </Button>
          </div>

          <form onSubmit={handleMagic} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="creator@vyralink.ai"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Button disabled={!isSupabaseConfigured || loading || !email} className="shrink-0">
              <Send size={17} />
              Magic Link
            </Button>
          </form>
        </div>
      </Card>
    </section>
  )
}
