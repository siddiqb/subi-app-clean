'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { scrapeBusinessData } from '@/lib/scrapingbee-client'

export default function ManualEntryPage() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const data = await scrapeBusinessData(url, 'mock-profile-id')
      console.log('Scraped data:', data)
      toast({
        title: 'Success',
        description: 'Business data extracted successfully!',
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Error',
        description: 'Failed to extract business data. Please try again or enter the information manually.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manual Entry / URL Scraping</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="url">Business URL (optional)</Label>
          <Input
            id="url"
            type="url"
            placeholder="https://www.example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Extracting...' : 'Extract Data'}
        </Button>
      </form>
      {/* Add form fields for manual entry here */}
    </div>
  )
}