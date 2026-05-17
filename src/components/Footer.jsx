import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="page-shell flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-cyan-200">
            <Sparkles size={18} />
          </span>
          <div>
            <p className="font-display font-bold text-white">VYRALINK AI</p>
            <p className="text-sm text-muted-foreground">Intelligent traffic infrastructure.</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Built for Vercel, Supabase, and creator velocity.</p>
      </div>
    </footer>
  )
}
