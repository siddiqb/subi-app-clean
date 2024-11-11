import { z } from 'zod';

// Define the environment variable schema
const envSchema = z.object({
  SCRAPINGBEE_API_KEY: z.string().min(1).default(''),
});

// Validate environment variables
const env = envSchema.parse({
  SCRAPINGBEE_API_KEY: process.env.NEXT_PUBLIC_SCRAPINGBEE_API_KEY || '',
});

if (!env.SCRAPINGBEE_API_KEY) {
  console.warn('SCRAPINGBEE_API_KEY is not set. API calls will fail.');
}

// ... rest of the file remains the same

// Define the response schema for scraped data
const scrapedDataSchema = z.object({
  businessName: z.string().optional(),
  annualRevenue: z.number().positive().optional(),
  employeeCount: z.number().int().positive().optional(),
  yearFounded: z.number().int().positive().optional(),
  industry: z.string().optional(),
});

type ScrapedData = z.infer<typeof scrapedDataSchema>;

/**
 * Scrapes business data from a given URL using the ScrapingBee API.
 * 
 * @param url - The URL of the business website to scrape
 * @returns A promise that resolves to the scraped business data
 * @throws Will throw an error if the API request fails or if the response doesn't match the expected schema
 */
export async function scrapeBusinessData(url: string): Promise<ScrapedData> {
  const apiUrl = `https://app.scrapingbee.com/api/v1/?api_key=${env.SCRAPINGBEE_API_KEY}&url=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`ScrapingBee API request failed: ${response.statusText}`);
    }

    const rawData = await response.json();

    // Validate and parse the scraped data
    const validatedData = scrapedDataSchema.parse(rawData);

    return validatedData;
  } catch (error) {
    console.error('Error scraping business data:', error);
    throw new Error('Failed to scrape business data. Please try again or enter the information manually.');
  }
}