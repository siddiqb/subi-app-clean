import { createClient } from '@supabase/supabase-js'
import { ScrapedData } from './scrapingbee-client'

// 1. Ensure environment variables are properly typed
declare global {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  }
}

// 2. Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// 3. Create Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// 4. Function to store scraped data
export async function storeScrapedData(userId: string, url: string, data: ScrapedData) {
  try {
    const { data: insertedData, error } = await supabase
      .from('scraped_data')
      .insert([
        {
          user_id: userId,
          url: url,
          ...data,
          scraped_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) throw error

    return insertedData
  } catch (error) {
    console.error('Error storing scraped data:', error)
    throw error
  }
}

// 5. Function to retrieve scraped data for a user
export async function getScrapedDataForUser(userId: string) {
  try {
    const { data, error } = await supabase
      .from('scraped_data')
      .select('*')
      .eq('user_id', userId)
      .order('scraped_at', { ascending: false })

    if (error) throw error

    return data
  } catch (error) {
    console.error('Error retrieving scraped data:', error)
    throw error
  }
}

// 6. Function to retrieve specific scraped data by URL
export async function getScrapedDataByUrl(userId: string, url: string) {
  try {
    const { data, error } = await supabase
      .from('scraped_data')
      .select('*')
      .eq('user_id', userId)
      .eq('url', url)
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error('Error retrieving scraped data by URL:', error)
    throw error
  }
}