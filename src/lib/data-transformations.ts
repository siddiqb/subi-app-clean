import { ScrapedData } from './scrapingbee-client'

// 1. Define the structure for form data
export interface FormData {
  businessName: string
  askingPrice: number
  annualRevenue: number
  cashFlow: number
  location: string
  description: string
  broker: string
  yearEstablished: number
}

// 2. Function to transform scraped data to form data
export function transformScrapedToFormData(scrapedData: ScrapedData): FormData {
  return {
    businessName: scrapedData.businessName || '',
    askingPrice: parseCurrency(scrapedData.askingPrice),
    annualRevenue: parseCurrency(scrapedData.annualRevenue),
    cashFlow: parseCurrency(scrapedData.cashFlow),
    location: scrapedData.location || '',
    description: scrapedData.description || '',
    broker: scrapedData.broker || '',
    yearEstablished: parseInt(scrapedData.yearEstablished || '0', 10)
  }
}

// 3. Function to transform form data to scraped data format
export function transformFormToScrapedData(formData: FormData): ScrapedData {
  return {
    businessName: formData.businessName,
    askingPrice: formatCurrency(formData.askingPrice),
    annualRevenue: formatCurrency(formData.annualRevenue),
    cashFlow: formatCurrency(formData.cashFlow),
    location: formData.location,
    description: formData.description,
    broker: formData.broker,
    yearEstablished: formData.yearEstablished.toString()
  }
}

// 4. Function to sanitize and validate input
export function sanitizeInput(input: string): string {
  // 5. Handle non-string inputs
  if (typeof input !== 'string') {
    return String(input);
  }
  // Remove any potentially harmful characters or scripts
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/[&<>"']/g, function(m) {
                return {
                  '&': '&amp;',
                  '<': '&lt;',
                  '>': '&gt;',
                  '"': '&quot;',
                  "'": '&#039;'
                }[m] || m;
              });
}

// 6. Function to format currency values
export function formatCurrency(value: number): string {
  // Handle NaN or invalid inputs
  if (isNaN(value) || !isFinite(value)) {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

// 7. Function to parse currency strings to numbers
export function parseCurrency(value: string | number | undefined): number {
  // Handle undefined or null values
  if (value === undefined || value === null) {
    return 0;
  }
  
  // If it's already a number, return it
  if (typeof value === 'number') {
    return value;
  }
  
  // Convert to string if it's not already
  const stringValue = String(value);
  
  // Remove non-numeric characters (except for decimal point and minus sign)
  const numericString = stringValue.replace(/[^0-9.-]+/g, '');
  
  // Parse the cleaned string to a float
  const parsedValue = parseFloat(numericString);
  
  // Return 0 if parsing results in NaN
  return isNaN(parsedValue) ? 0 : parsedValue;
}