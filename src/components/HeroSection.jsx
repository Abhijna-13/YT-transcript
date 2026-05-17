import { motion } from 'framer-motion'
import { ArrowRight, Play, Radio, Share2, TrendingUp, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const counters = [
  ['Live clicks', '128.4K', TrendingUp],
  ['Routes generated', '9,812', Share2],
  ['Transcript jobs', '3,407', Radio],
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-12 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-0 top-44 h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
      </div>

      <div className="page-shell grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/8 px-4 py-2 text-sm font-semibold text-cyan-100">
            <Zap size={16} />
            Creator growth OS for intelligent traffic
          </div>
          <h1 className="font-display text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Turn Links Into <span className="gradient-text">Intelligent Traffic</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            AI-powered smart routing, transcript extraction, referral systems & virtual deployment
            ecosystem.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="group">
              <Link to="/dashboard">
                Launch App
                <ArrowRight className="transition group-hover:translate-x-1" size={18} />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <a href="#demo">
                <Play size={18} />
                Watch Demo
              </a>
            </Button>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {counters.map(([label, value, Icon], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 * index }}
                className="glass-panel rounded-2xl p-4"
              >
                <Icon className="mb-4 text-cyan-200" size={20} />
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative min-h-[35rem]"
        >
          <div className="neon-border glass-panel absolute inset-x-0 top-10 rounded-[2rem] p-4 sm:p-6">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Traffic Brain</p>
                  <h2 className="font-display text-2xl font-bold text-white">Routing Command</h2>
                </div>
                <span className="rounded-full bg-lime-300/15 px-3 py-1 text-xs font-bold text-lime-200">
                  LIVE
                </span>
              </div>
              <div className="grid gap-3">
                {['YouTube Short', 'TikTok Spark', 'Instagram Bio', 'Creator Site'].map((item, index) => (
                  <motion.div
                    key={item}
                    animate={{ x: [0, index % 2 ? -5 : 5, 0] }}
                    transition={{ duration: 4 + index, repeat: Infinity }}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                  >
                    <span className="font-semibold text-white">{item}</span>
                    <span className="text-sm text-cyan-100">+{38 + index * 17}%</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="glass-panel absolute right-0 top-0 w-56 rounded-2xl p-4 shadow-glow-pink"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-fuchsia-100">Referral Lift</p>
            <p className="mt-2 text-4xl font-black text-white">42%</p>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-fuchsia-300 to-cyan-200" />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="glass-panel absolute bottom-10 left-0 w-64 rounded-2xl p-4"
          >
            <p className="text-sm font-semibold text-white">Transcript extracted</p>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
              Hook detected, CTA mapped, smart link sequence generated for multi-platform traffic.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
