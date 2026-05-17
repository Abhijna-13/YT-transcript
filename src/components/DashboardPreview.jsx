import { motion } from 'framer-motion'
import { BarChart, Bar, ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts'
import { Activity, Link2, MousePointerClick, Repeat2 } from 'lucide-react'
import { Card } from './ui/card'

const areaData = [
  { name: 'Mon', value: 420 },
  { name: 'Tue', value: 640 },
  { name: 'Wed', value: 510 },
  { name: 'Thu', value: 980 },
  { name: 'Fri', value: 1320 },
  { name: 'Sat', value: 1120 },
  { name: 'Sun', value: 1680 },
]

const bars = [
  { name: 'YT', value: 72 },
  { name: 'IG', value: 88 },
  { name: 'TT', value: 64 },
  { name: 'Web', value: 91 },
]

const stats = [
  ['Total Clicks', '128.4K', MousePointerClick],
  ['Active Links', '312', Link2],
  ['Transcript Count', '1,927', Activity],
  ['Referral Conversions', '18.7%', Repeat2],
]

export default function DashboardPreview() {
  return (
    <section id="dashboard-preview" className="page-shell py-24">
      <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-lime-200">Dashboard</p>
          <h2 className="mt-4 font-display text-4xl font-black text-white sm:text-5xl">
            Analytics that feel alive
          </h2>
        </div>
        <p className="max-w-xl text-muted-foreground">
          A protected command surface for links, referrals, transcripts, and platform engagement.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map(([label, value, Icon], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="rounded-3xl">
              <Icon className="text-cyan-200" size={22} />
              <p className="mt-5 text-3xl font-black text-white">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Card className="rounded-3xl p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Engagement Graph</p>
              <h3 className="text-xl font-bold text-white">Weekly traffic velocity</h3>
            </div>
            <span className="rounded-full bg-cyan-300/15 px-3 py-1 text-xs font-bold text-cyan-100">
              +31.8%
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="traffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#67e8f9" stopOpacity={0.75} />
                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{ background: '#090d1d', border: '1px solid rgba(255,255,255,.12)', borderRadius: 16 }}
                />
                <Area type="monotone" dataKey="value" stroke="#67e8f9" fill="url(#traffic)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-3xl p-6">
          <p className="text-sm text-muted-foreground">Platform Mix</p>
          <h3 className="mb-6 text-xl font-bold text-white">Redirect quality</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars}>
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ background: '#090d1d', border: '1px solid rgba(255,255,255,.12)', borderRadius: 16 }}
                />
                <Bar dataKey="value" fill="#d9f99d" radius={[12, 12, 6, 6]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  )
}
