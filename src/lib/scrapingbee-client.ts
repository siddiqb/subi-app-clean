import { z } from 'zod';

// Mock data
const mockData = {
  "Name": "Medical Spa Offering Noninvasive Health/Beauty Cosmetic Procedures",
  "Location": "Monmouth County, NJ",
  "Price": "$600,000",
  "Revenue": "$400,000",
  "CashFlow": "$169,000",
  "Description": "This medical spa specializes in noninvasive health and beauty procedures...",
  "Broker": "Empire Business Management",
  "YearEstablished": "2018"
};

// Define the response schema for scraped data
const scrapedDataSchema = z.object({
  businessName: z.string().optional(),
  askingPrice: z.string().optional(),
  annualRevenue: z.string().optional(),
  cashFlow: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  broker: z.string().optional(),
  yearEstablished: z.string().optional(),
});

export type ScrapedData = z.infer<typeof scrapedDataSchema>;

export async function scrapeBusinessData(url: string, profileId: string): Promise<ScrapedData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Use mock data instead of making an actual API call
  const rawData = mockData;

  // Transform the raw data to match our schema
  const transformedData = {
    businessName: rawData.Name || '',
    askingPrice: rawData.Price || '',
    annualRevenue: rawData.Revenue || '',
    cashFlow: rawData.CashFlow || '',
    location: rawData.Location || '',
    description: rawData.Description || '',
    broker: rawData.Broker || '',
    yearEstablished: rawData.YearEstablished || ''
  };

  // Validate and parse the scraped data
  const validatedData = scrapedDataSchema.parse(transformedData);
  console.log('Validated data:', validatedData);

  return validatedData;
}