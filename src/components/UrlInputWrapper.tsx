'use client'

import { UrlInput } from '@/components/UrlInput'

export function UrlInputWrapper() {
  const handleDataScraped = (data: any) => {
    console.log(data)
    // Handle the scraped data here
  }

  return <UrlInput onDataScraped={handleDataScraped} />
}