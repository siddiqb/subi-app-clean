import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { ScrapedData } from '@/types'

export interface UrlInputProps {
  onDataScraped: (data: ScrapedData) => void
}

export function UrlInput({ onDataScraped }: UrlInputProps) {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to scrape data')
      }

      onDataScraped(data.data)
      toast({
        title: 'Success',
        description: 'Successfully scraped business data',
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to scrape business data. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter business listing URL"
        required
        className="flex-grow"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Scraping...' : 'Scrape'}
      </Button>
    </form>
  )
}