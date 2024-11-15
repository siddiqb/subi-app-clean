// 1. Import necessary dependencies and types
import { NextApiRequest, NextApiResponse } from 'next'
import { ScrapingBeeClient } from 'scrapingbee'
import * as cheerio from 'cheerio'
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'
import { ScrapedData } from '@/types'

// 2. Initialize ScrapingBee client
const client = new ScrapingBeeClient(process.env.SCRAPINGBEE_API_KEY || '')

// 3. Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// 4. Helper function to safely extract text from HTML
const safeExtract = ($: cheerio.CheerioAPI, selector: string): string => {
  try {
    return $(selector).first().text().trim() || 'N/A'
  } catch (error) {
    console.error(`Error extracting ${selector}:`, error)
    return 'N/A'
  }
}

// 5. Helper function to clean price strings
const cleanPrice = (text: string): string => {
  const match = text.match(/\$[\d,]+/)
  return match ? match[0].replace(/[,$]/g, '') : '0'
}

// 6. Main API handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const { url, render_js = false } = req.body

    // 7. Check for authentication
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    const profile_id = session?.user?.id || null

    if (sessionError) {
      console.error('Session error:', sessionError)
    }

    // 8. Scrape the URL using ScrapingBee
    const response = await client.get({
      url: url,
      params: { render_js }
    })

    // 9. Convert response to text
    const responseText = Buffer.isBuffer(response.data) 
      ? response.data.toString('utf-8')
      : typeof response.data === 'string' 
        ? response.data 
        : JSON.stringify(response.data)

    // 10. Parse HTML with cheerio
    const $ = cheerio.load(responseText)
    
    // 11. Extract data from HTML
    const scrapedData: ScrapedData = {
      business_name: safeExtract($, 'h1'),
      asking_price: cleanPrice(safeExtract($, '.price strong')),
      annual_revenue: cleanPrice(safeExtract($, '#revenue strong')),
      cash_flow: cleanPrice(safeExtract($, '#profit strong')),
      location: safeExtract($, '#address'),
      description: safeExtract($, '.listing-paragraph'),
      broker: safeExtract($, '.broker-details h4'),
      year_established: safeExtract($, 'dt:contains("Years established") + dd')
    }

    // 12. Store scraped data with or without profile_id
    const { data, error: insertError } = await supabase
      .from('scraped_data')
      .insert([{
        id: uuidv4(),
        profile_id: profile_id,
        ...scrapedData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()

    if (insertError) {
      console.error('Error storing scraped data:', insertError)
      // Log the error but continue to return the scraped data to the user
    } else {
      console.log('Successfully stored scraped data:', data)
    }

    // 13. Send successful response
    res.status(200).json({
      success: true,
      data: scrapedData,
      authenticated: !!profile_id
    })

  } catch (error) {
    // 14. Handle and log any errors
    console.error('Scraping error:', error)
    res.status(500).json({ 
      message: 'Internal Server Error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}