import { ScrapedData } from './scrapingbee-client';

// 1. Initialize a cache to store scraped data
const cache = new Map<string, { data: ScrapedData; timestamp: number }>();

// 2. Set cache expiration time (in milliseconds)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

// 3. Set rate limit (requests per minute)
const RATE_LIMIT = 5;
const rateLimitMap = new Map<string, number[]>();

// 4. Function to check and update rate limit
export function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const userRequests = rateLimitMap.get(userId) || [];
  
  // 5. Remove requests older than 1 minute
  const recentRequests = userRequests.filter(time => now - time < 60000);
  
  // 6. Check if user has exceeded rate limit
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  // 7. Add current request time and update the map
  recentRequests.push(now);
  rateLimitMap.set(userId, recentRequests);
  return true;
}

// 8. Function to get cached data or indicate if a fresh scrape is needed
export function getCachedData(url: string): ScrapedData | null {
  const cachedItem = cache.get(url);
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_EXPIRATION) {
    return cachedItem.data;
  }
  return null;
}

// 9. Function to cache scraped data
export function cacheData(url: string, data: ScrapedData): void {
  cache.set(url, { data, timestamp: Date.now() });
}

// 10. Function to clear expired cache entries
export function clearExpiredCache(): void {
  const now = Date.now();
  for (const [url, { timestamp }] of cache.entries()) {
    if (now - timestamp > CACHE_EXPIRATION) {
      cache.delete(url);
    }
  }
}

// 11. Schedule cache cleanup every hour
setInterval(clearExpiredCache, 60 * 60 * 1000);