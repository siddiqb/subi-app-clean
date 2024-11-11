'use client'

import { useState } from 'react'
import { z } from 'zod'
import { scrapeBusinessData } from '@/lib/scrapingbee-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

// Define the URL schema for validation
const urlSchema = z.string().url()

export default function UrlInput() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate the URL
      urlSchema.parse(url)

      // Scrape the business data
      const scrapedData = await scrapeBusinessData(url)

      // TODO: Handle the scraped data (e.g., update form fields, store in state, etc.)
      console.log('Scraped data:', scrapedData)

      toast({
        title: 'Success',
        description: 'Business data scraped successfully!',
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Invalid URL',
          description: 'Please enter a valid URL.',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Error',
          description: 'Failed to scrape business data. Please try again or enter the information manually.',
          variant: 'destructive',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url">Business Website URL</Label>
        <Input
          id="url"
          type="url"
          placeholder="https://www.example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Scraping...' : 'Scrape Business Data'}
      </Button>
    </form>
  )
}