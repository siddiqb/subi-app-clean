'use client'

import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { scrapeBusinessData } from '@/lib/scraper'

interface UrlInputProps {
  onDataScraped: (data: any) => void
}

export function UrlInput({ onDataScraped }: UrlInputProps) {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate URL
      new URL(url)

      // Scrape the business data
      const data = await scrapeBusinessData(url)
      onDataScraped(data)

      toast({
        title: 'Data scraped successfully',
        description: 'The business data has been retrieved.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred while scraping the data.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="url"
        placeholder="Enter business listing URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Scraping...' : 'Scrape'}
      </Button>
    </form>
  )
}