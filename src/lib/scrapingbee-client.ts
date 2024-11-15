// 1. Import necessary dependencies
import axios from 'axios'
import { ScrapedData } from '@/types'

// 2. Define the scrapeBusinessData function
export async function scrapeBusinessData(
  url: string
): Promise<ScrapedData> {
  try {
    // 3. Create the request payload
    const payload = {
      url: url,
    }

    // 4. Make the API request to our own API route
    const response = await axios.post('/api/scrape', payload)

    // 5. Check the response status
    if (response.status !== 200) {
      throw new Error(`Scraping API returned status ${response.status}`)
    }

    // 6. Process the response data and extract relevant information
    const scrapedData: ScrapedData = response.data.data

    // 7. Return the scraped data
    return scrapedData
  } catch (error) {
    // 8. Handle and log any errors
    console.error('Error scraping business data:', error)
    throw new Error('Failed to scrape business data. Please try again later.')
  }
}
