import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { DEFAULT_TRANSCRIPT_ACTOR, runTranscriptExtraction } from './api/transcriptCore.js'

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let raw = ''
    request.on('data', (chunk) => {
      raw += chunk
    })
    request.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {})
      } catch (error) {
        reject(error)
      }
    })
  })
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const transcriptApiPlugin = {
    name: 'local-transcript-api',
    configureServer(server) {
      server.middlewares.use('/api/transcript', async (request, response) => {
        if (request.method !== 'POST') {
          response.statusCode = 405
          response.setHeader('Allow', 'POST')
          response.end('Method not allowed')
          return
        }

        try {
          const body = await readJsonBody(request)
          const result = await runTranscriptExtraction({
            actorId: env.APIFY_YOUTUBE_TRANSCRIPT_ACTOR || DEFAULT_TRANSCRIPT_ACTOR,
            token: env.APIFY_TOKEN || env.VITE_APIFY_TOKEN,
            youtubeUrl: body.youtubeUrl,
          })

          response.statusCode = result.status
          if (typeof result.body === 'string') {
            response.end(result.body)
            return
          }

          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify(result.body))
        } catch (error) {
          response.statusCode = 500
          response.end(error.message || 'Local transcript proxy failed.')
        }
      })
    },
  }

  return {
    plugins: [react(), transcriptApiPlugin],
    server: {
      host: '0.0.0.0',
    },
    build: {
      cssCodeSplit: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion'],
            supabase: ['@supabase/supabase-js'],
            charts: ['recharts'],
          },
        },
      },
    },
  }
})
