import { motion } from 'framer-motion'
import {
  BarChart3,
  Bot,
  Cloud,
  Database,
  EyeOff,
  FileText,
  Link2,
  Network,
  Share2,
} from 'lucide-react'
import { Card } from './ui/card'

const features = [
  ['Smart Link Engine', 'Generate intelligent redirect links.', Link2, 'from-cyan-300/30'],
  ['Referral Routing System', 'Custom referral & shareable ecosystem.', Share2, 'from-fuchsia-300/30'],
  ['Supabase Secure Backend', 'Authentication, database, storage, edge functions.', Database, 'from-lime-300/30'],
  ['Hidden Secret Architecture', '.env-based secure system with protected API keys.', EyeOff, 'from-sky-300/30'],
  ['Apify Transcript Extractor', 'Paste YouTube URL and fetch transcript automatically.', FileText, 'from-rose-300/30'],
  ['Virtual Deployment Hub', 'Deploy frontend/backend instantly.', Cloud, 'from-violet-300/30'],
  ['AI Traffic Layer', 'Natural engagement routing system.', Bot, 'from-emerald-300/30'],
  ['Multi Platform Redirects', 'Supports YouTube, Instagram, TikTok, websites.', Network, 'from-orange-300/30'],
  ['Analytics Dashboard', 'Track clicks, shares, redirects, referrals.', BarChart3, 'from-indigo-300/30'],
]

export default function FeaturesSection() {
  return (
    <section id="features" className="page-shell py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Feature Matrix</p>
        <h2 className="mt-4 font-display text-4xl font-black text-white sm:text-5xl">
          A complete virtual traffic ecosystem
        </h2>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map(([title, description, Icon, glow], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.04 }}
            whileHover={{ y: -8, scale: 1.015 }}
          >
            <Card className="group relative h-full overflow-hidden rounded-3xl">
              <div className={`absolute -right-16 -top-16 h-36 w-36 rounded-full bg-gradient-to-br ${glow} to-transparent blur-2xl transition group-hover:scale-125`} />
              <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/10 text-cyan-100">
                <Icon size={22} />
              </div>
              <h3 className="relative mt-6 text-xl font-black text-white">{title}</h3>
              <p className="relative mt-3 leading-7 text-muted-foreground">{description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
