import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const supabasePublishableKey = config.public.supabasePublishableKey

  const supabase: SupabaseClient | null = supabaseUrl && supabasePublishableKey
    ? createClient(supabaseUrl, supabasePublishableKey, {
        auth: {
          autoRefreshToken: import.meta.client,
          detectSessionInUrl: import.meta.client,
          persistSession: import.meta.client
        }
      })
    : null

  return {
    provide: {
      supabase
    }
  }
})

declare module '#app' {
  interface NuxtApp {
    $supabase: SupabaseClient | null
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $supabase: SupabaseClient | null
  }
}
