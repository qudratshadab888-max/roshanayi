import { createClient } from '@supabase/supabase-js'

export const useServerSupabase = () => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const supabasePublishableKey = config.public.supabasePublishableKey

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error('Missing Supabase configuration. Set NUXT_PUBLIC_SUPABASE_URL and NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.')
  }

  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false
    }
  })
}
