import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function scrapeBusinessData(url: string) {
  const supabase = createClientComponentClient()

  try {
    const { data, error } = await supabase.functions.invoke('scrape-business-data', {
      body: JSON.stringify({ url }),
    })

    if (error) throw error

    return data
  } catch (error) {
    console.error('Error scraping business data:', error)
    throw error
  }
}