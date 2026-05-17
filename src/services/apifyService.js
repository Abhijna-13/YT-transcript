const APIFY_ACTOR = import.meta.env.VITE_APIFY_ACTOR || 'scraper-mind~youtube-transcript-scraper'
const LOCAL_TOKEN = import.meta.env.VITE_APIFY_TOKEN

function normalizeTranscript(items) {
  if (!Array.isArray(items)) return ''

  return items
    .flatMap((item) => {
      if (typeof item === 'string') return item
      if (typeof item?.transcript === 'string') return item.transcript
      if (Array.isArray(item?.transcript)) return item.transcript.map((line) => line?.text || line).filter(Boolean)
      if (Array.isArray(item?.captions)) return item.captions.map((line) => line?.text || line).filter(Boolean)
      if (Array.isArray(item?.subtitles)) return item.subtitles.map((line) => line?.text || line).filter(Boolean)
      if (typeof item?.text === 'string') return item.text
      return []
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function extractViaProxy(youtubeUrl) {
  const response = await fetch('/api/transcript', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ youtubeUrl }),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(readableError(message) || 'Transcript extraction failed. Check your Apify environment variables.')
  }

  return response.json()
}

function readableError(message) {
  try {
    const parsed = JSON.parse(message)
    return parsed?.error?.message || parsed?.message || message
  } catch {
    return message
  }
}

async function extractViaBrowserToken(youtubeUrl) {
  if (!LOCAL_TOKEN) {
    throw new Error('Add APIFY_TOKEN in Vercel or VITE_APIFY_TOKEN locally to enable transcript extraction.')
  }

  const input = {
    videoUrl: youtubeUrl,
    language: 'en',
    startUrls: [{ url: youtubeUrl }],
  }
  const runResponse = await fetch(
    `https://api.apify.com/v2/acts/${encodeURIComponent(APIFY_ACTOR)}/runs?token=${LOCAL_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    },
  )

  if (!runResponse.ok) throw new Error('Unable to start Apify transcript actor.')

  const run = await runResponse.json()
  const runId = run?.data?.id
  const datasetId = run?.data?.defaultDatasetId

  for (let attempt = 0; attempt < 18; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 2200))
    const statusResponse = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${LOCAL_TOKEN}`)
    const status = await statusResponse.json()
    if (status?.data?.status === 'SUCCEEDED') break
    if (['FAILED', 'ABORTED', 'TIMED-OUT'].includes(status?.data?.status)) {
      throw new Error('Apify actor did not complete successfully.')
    }
  }

  const itemsResponse = await fetch(
    `https://api.apify.com/v2/datasets/${datasetId}/items?clean=true&token=${LOCAL_TOKEN}`,
  )
  const items = await itemsResponse.json()
  const transcript = normalizeTranscript(items)

  if (!transcript) throw new Error('No transcript was returned for this video.')

  return { transcript, raw: items }
}

export async function extractTranscript(youtubeUrl) {
  if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(youtubeUrl)) {
    throw new Error('Paste a valid YouTube URL.')
  }

  try {
    return await extractViaProxy(youtubeUrl)
  } catch (error) {
    if (!LOCAL_TOKEN) {
      throw new Error(
        error.message ||
          'Local API route is unavailable. Restart Vite after adding VITE_APIFY_TOKEN, or deploy with APIFY_TOKEN on Vercel.',
      )
    }
    return extractViaBrowserToken(youtubeUrl)
  }
}
