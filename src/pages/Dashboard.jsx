import { Link } from 'react-router-dom'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import { ArrowLeft, Copy, FileText, Link2, LogOut, Plus, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { signOut } from '../services/authService'
import { useAppStore } from '../store/useAppStore'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

const data = [
  { name: '1', value: 320 },
  { name: '2', value: 410 },
  { name: '3', value: 780 },
  { name: '4', value: 690 },
  { name: '5', value: 990 },
  { name: '6', value: 1210 },
]

const smartLinks = [
  ['Launch reel traffic', 'vyra.link/reel-ai', '8.4K'],
  ['Transcript lead magnet', 'vyra.link/transcript-os', '3.1K'],
  ['Creator referral mesh', 'vyra.link/ref-vault', '12.9K'],
]

export default function Dashboard() {
  const user = useAppStore((state) => state.user)
  const transcriptHistory = useAppStore((state) => state.transcriptHistory)

  const copyLink = async (link) => {
    await navigator.clipboard.writeText(`https://${link}`)
    toast.success('Smart link copied')
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="glass-panel mb-6 flex flex-col justify-between gap-4 rounded-3xl p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="h-10 w-10 p-0">
              <Link to="/">
                <ArrowLeft size={18} />
              </Link>
            </Button>
            <div>
              <p className="text-sm text-muted-foreground">Protected Dashboard</p>
              <h1 className="font-display text-2xl font-black text-white">Welcome, {user?.email || 'creator'}</h1>
            </div>
          </div>
          <Button variant="secondary" onClick={signOut}>
            <LogOut size={17} />
            Sign out
          </Button>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ['Total clicks', '128.4K', Link2],
            ['Active links', '312', Plus],
            ['Transcripts', transcriptHistory.length || 24, FileText],
            ['Referral lift', '18.7%', Share2],
          ].map(([label, value, Icon]) => (
            <Card key={label} className="rounded-3xl">
              <Icon className="text-cyan-200" size={22} />
              <p className="mt-5 text-3xl font-black text-white">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </Card>
          ))}
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="rounded-3xl p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Engagement</p>
                <h2 className="text-2xl font-black text-white">Traffic pulse</h2>
              </div>
              <span className="rounded-full bg-lime-300/15 px-3 py-1 text-xs font-bold text-lime-100">
                Optimized
              </span>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="dash" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#67e8f9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#67e8f9" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ background: '#090d1d', border: '1px solid rgba(255,255,255,.12)', borderRadius: 16 }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#67e8f9" fill="url(#dash)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="rounded-3xl p-6">
            <h2 className="text-2xl font-black text-white">Smart links</h2>
            <div className="mt-5 space-y-3">
              {smartLinks.map(([name, link, clicks]) => (
                <div key={link} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-white">{name}</p>
                      <p className="mt-1 text-sm text-cyan-100">{link}</p>
                    </div>
                    <Button variant="ghost" className="h-9 w-9 p-0" onClick={() => copyLink(link)}>
                      <Copy size={16} />
                    </Button>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{clicks} clicks</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </main>
  )
}
