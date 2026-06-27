import { createClient } from '@supabase/supabase-js'

export const useServerSupabase = () => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.supabaseUrl || config.public.supabaseUrl
  const supabaseKey = config.supabaseServerKey || config.public.supabasePublishableKey

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase configuration. Set NUXT_PUBLIC_SUPABASE_URL and NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.')
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false
    }
  })
}
