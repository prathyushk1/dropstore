import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate required environment variables
if (!supabaseUrl || !supabaseKey) {
  if (typeof window === 'undefined') {
    // Server-side: log error
    console.error('❌ Missing Supabase environment variables!')
    console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
    console.error('Current values:', { supabaseUrl: supabaseUrl || 'NOT SET', supabaseKey: supabaseKey ? 'SET' : 'NOT SET' })
  } else {
    // Client-side: log warning
    console.warn('⚠️ Supabase environment variables not configured')
  }
}

// Client for general use (browser and server)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
)

// Admin client with service role key (server-side only)
export const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  serviceRoleKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
