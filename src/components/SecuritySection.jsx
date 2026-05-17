import { motion } from 'framer-motion'
import { KeyRound, ShieldCheck } from 'lucide-react'

export default function SecuritySection() {
  return (
    <section id="security" className="relative overflow-hidden py-24">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-72 -translate-y-1/2 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-lime-400/10 blur-3xl" />
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Security Architecture</p>
          <h2 className="mt-4 font-display text-4xl font-black text-white sm:text-5xl">
            Frontend to secure backend, with clean boundaries
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Supabase handles identity, row-level security protects records, and serverless APIs keep
            high-value keys away from client bundles.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel mx-auto mt-14 grid max-w-4xl gap-4 rounded-[2rem] p-6 sm:grid-cols-2"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-6">
            <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-cyan-200">
              <ShieldCheck size={25} />
            </div>
            <h3 className="text-xl font-black text-white">Protected traffic layer</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              User sessions, transcript history, and link records stay isolated behind authenticated
              access patterns.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-6">
            <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-cyan-200">
              <KeyRound size={25} />
            </div>
            <h3 className="text-xl font-black text-white">Server-side API bridge</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Production transcript requests route through a Vercel API function so privileged tokens
              stay out of the interface.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
