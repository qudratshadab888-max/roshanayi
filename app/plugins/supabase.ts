import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const supabasePublishableKey = config.public.supabasePublishableKey

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error('Missing Supabase configuration. Set NUXT_PUBLIC_SUPABASE_URL and NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.')
  }

  const supabase = createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      autoRefreshToken: import.meta.client,
      detectSessionInUrl: import.meta.client,
      persistSession: import.meta.client
    }
  })

  return {
    provide: {
      supabase
    }
  }
})

declare module '#app' {
  interface NuxtApp {
    $supabase: SupabaseClient
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $supabase: SupabaseClient
  }
}
