import { createClient } from '@supabase/supabase-js'
import { env } from './config/env.js'

const hasSupabaseConfig =
  Boolean(env.supabaseUrl) && Boolean(env.supabaseServiceKey)

export const supabase = hasSupabaseConfig
  ? createClient(env.supabaseUrl, env.supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  : null

export function assertSupabaseConfigured() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Check backend environment variables.')
  }
}
