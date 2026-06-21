import type { SupabaseClient } from '@supabase/supabase-js'

export const useSupabase = (): SupabaseClient => {
  const { $supabase } = useNuxtApp()

  if (!$supabase) {
    throw new Error('Supabase is unavailable. Configure NUXT_PUBLIC_SUPABASE_URL and NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY before using database features.')
  }

  return $supabase
}
