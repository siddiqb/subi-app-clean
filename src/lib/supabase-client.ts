import { createClient } from '@supabase/supabase-js'

// 1. Define the type for our Supabase client
type SupabaseClient = ReturnType<typeof createClient>

// 2. Declare variables to hold our singleton instances
let serverSupabaseClient: SupabaseClient | null = null
let clientSupabaseClient: SupabaseClient | null = null

// 3. Function to get or create the server-side Supabase client instance
export function getServerSupabaseClient(): SupabaseClient {
  if (typeof window !== 'undefined') {
    throw new Error('getServerSupabaseClient should only be called server-side')
  }

  if (!serverSupabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing server-side Supabase environment variables')
    }

    serverSupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }

  return serverSupabaseClient
}

// 4. Function to get or create the client-side Supabase client instance
export function getClientSupabaseClient(): SupabaseClient {
  if (typeof window === 'undefined') {
    throw new Error('getClientSupabaseClient should only be called client-side')
  }

  if (!clientSupabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing client-side Supabase environment variables')
    }

    clientSupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }

  return clientSupabaseClient
}

// 5. Export a default Supabase client for backwards compatibility
// This should be used carefully and preferably replaced with the specific client functions above
export const supabase = typeof window === 'undefined' 
  ? getServerSupabaseClient() 
  : getClientSupabaseClient()