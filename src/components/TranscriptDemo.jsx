import { AnimatePresence, motion } from 'framer-motion'
import { Clipboard, Loader2, PlayCircle, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { extractTranscript } from '../services/apifyService'
import { supabase } from '../services/supabaseClient'
import { useAppStore } from '../store/useAppStore'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Skeleton } from './ui/skeleton'

export default function TranscriptDemo() {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [transcript, setTranscript] = useState('')
  const user = useAppStore((state) => state.user)
  const addTranscript = useAppStore((state) => state.addTranscript)

  const handleExtract = async (event) => {
    event.preventDefault()
    setLoading(true)
    setTranscript('')

    try {
      const result = await extractTranscript(youtubeUrl)
      setTranscript(result.transcript)

      if (supabase && user) {
        const { data, error } = await supabase
          .from('transcripts')
          .insert({
            user_id: user.id,
            youtube_url: youtubeUrl,
            transcript: result.transcript,
          })
          .select()
          .single()

        if (error) throw error
        addTranscript(data)
      }

      toast.success('Transcript extracted')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(transcript)
    toast.success('Transcript copied')
  }

  return (
    <section id="demo" className="page-shell py-24">
      <div className="grid items-center gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-fuchsia-200">Live Demo</p>
          <h2 className="mt-4 font-display text-4xl font-black text-white sm:text-5xl">
            Paste YouTube. Pull the signal.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            VYRALINK runs transcript extraction, saves history to Supabase, and turns the content
            into reusable growth intelligence.
          </p>
        </div>

        <Card className="rounded-[2rem] p-4 sm:p-6">
          <form onSubmit={handleExtract} className="flex flex-col gap-3 sm:flex-row">
            <Input
              aria-label="YouTube URL"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(event) => setYoutubeUrl(event.target.value)}
            />
            <Button type="submit" disabled={loading || !youtubeUrl} className="shrink-0">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <PlayCircle size={18} />}
              Extract Transcript
            </Button>
          </form>

          <div className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Sparkles className="text-cyan-200" size={17} />
                Transcript Console
              </div>
              {transcript && (
                <Button variant="ghost" className="h-9 px-3" onClick={handleCopy}>
                  <Clipboard size={16} />
                  Copy
                </Button>
              )}
            </div>

            <div className="min-h-72 p-5">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <Skeleton className="h-5 w-11/12" />
                    <Skeleton className="h-5 w-10/12" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-8/12" />
                    <Skeleton className="h-28 w-full" />
                  </motion.div>
                ) : transcript ? (
                  <motion.p
                    key="transcript"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="max-h-80 overflow-auto pr-2 text-sm leading-7 text-slate-200"
                  >
                    {transcript}
                  </motion.p>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid min-h-60 place-items-center text-center"
                  >
                    <div>
                      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white/8 text-cyan-200">
                        <PlayCircle size={26} />
                      </div>
                      <p className="font-semibold text-white">Ready for transcript extraction</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Add your API keys to activate the live Apify workflow.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
