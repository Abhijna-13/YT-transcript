import { DEFAULT_TRANSCRIPT_ACTOR, runTranscriptExtraction } from './transcriptCore.js'

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).send('Method not allowed')
  }

  const token = process.env.APIFY_TOKEN || process.env.VITE_APIFY_TOKEN
  const actorId = process.env.APIFY_YOUTUBE_TRANSCRIPT_ACTOR || DEFAULT_TRANSCRIPT_ACTOR
  const body = typeof request.body === 'string' ? JSON.parse(request.body || '{}') : request.body || {}
  const result = await runTranscriptExtraction({ actorId, token, youtubeUrl: body.youtubeUrl })

  if (typeof result.body === 'string') return response.status(result.status).send(result.body)
  return response.status(result.status).json(result.body)
}
