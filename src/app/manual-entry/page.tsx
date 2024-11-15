'use client'

import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { scrapeBusinessData } from '@/lib/scrapingbee-client'

export default function ManualEntryPage() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const data = await scrapeBusinessData(url, false) // Changed 'mock-profile-id' to false
      console.log('Scraped data:', data)
      toast({
        title: 'Success',
        description: 'Data scraped successfully',
      })
    } catch (error) {
      console.error('Error scraping data:', error)
      toast({
        title: 'Error',
        description: 'Failed to scrape data',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manual Entry</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="url"
          placeholder="Enter business listing URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Scraping...' : 'Scrape Data'}
        </Button>
      </form>
    </div>
  )
}