export const DEFAULT_TRANSCRIPT_ACTOR = 'johnvc~YoutubeTranscripts'

export function normalizeTranscript(items) {
  if (!Array.isArray(items)) return ''

  return items
    .flatMap((item) => {
      if (typeof item === 'string') return item
      if (typeof item?.transcript === 'string') return item.transcript
      if (Array.isArray(item?.transcript)) return item.transcript.map((line) => line?.text || line).filter(Boolean)
      if (Array.isArray(item?.captions)) return item.captions.map((line) => line?.text || line).filter(Boolean)
      if (Array.isArray(item?.subtitles)) return item.subtitles.map((line) => line?.text || line).filter(Boolean)
      if (Array.isArray(item?.data)) return item.data.map((line) => line?.text || line).filter(Boolean)
      if (typeof item?.text === 'string') return item.text
      return []
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function validateYoutubeUrl(youtubeUrl) {
  return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(youtubeUrl || '')
}

function getReadableApifyError(message) {
  try {
    const parsed = JSON.parse(message)
    return parsed?.error?.message || parsed?.message || message
  } catch {
    return message
  }
}

export async function runTranscriptExtraction({ actorId = DEFAULT_TRANSCRIPT_ACTOR, token, youtubeUrl }) {
  if (!token) {
    return {
      body: 'Missing APIFY_TOKEN. For local testing add VITE_APIFY_TOKEN to .env, or use APIFY_TOKEN on Vercel.',
      status: 500,
    }
  }

  if (!validateYoutubeUrl(youtubeUrl)) {
    return { body: 'Paste a valid YouTube URL.', status: 400 }
  }

  const input = {
    youtube_url: youtubeUrl,
    languages: ['en'],
    output_formats: ['text'],
  }

  try {
    const apifyResponse = await fetch(
      `https://api.apify.com/v2/acts/${encodeURIComponent(actorId)}/run-sync-get-dataset-items?token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      },
    )

    if (!apifyResponse.ok) {
      const message = await apifyResponse.text()
      return {
        body:
          getReadableApifyError(message) ||
          'Unable to run the Apify transcript actor. Check your token and actor id.',
        status: apifyResponse.status,
      }
    }

    const items = await apifyResponse.json()
    const transcript = normalizeTranscript(items)

    if (!transcript) {
      return {
        body: 'No transcript was returned. Try a YouTube video with captions, or verify this actor supports the video.',
        status: 404,
      }
    }

    return { body: { transcript, raw: items }, status: 200 }
  } catch (error) {
    return { body: error.message || 'Transcript extraction failed.', status: 500 }
  }
}
