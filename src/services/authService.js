import { supabase } from './supabaseClient'

const redirectTo = `${window.location.origin}/dashboard`

export async function signInWithProvider(provider) {
  if (!supabase) throw new Error('Supabase is not configured.')

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo },
  })

  if (error) throw error
}

export async function signInWithMagicLink(email) {
  if (!supabase) throw new Error('Supabase is not configured.')

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo },
  })

  if (error) throw error
}

export async function signOut() {
  if (!supabase) return
  await supabase.auth.signOut()
}
