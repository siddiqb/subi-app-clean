import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UrlInput } from '@/components/UrlInput'
import { BusinessDataForm } from '@/components/BusinessDataForm'
import { ScrapedData } from '@/types'

export function EnhancedDashboard() {
  const [businessData, setBusinessData] = useState<ScrapedData | null>(null)

  const handleDataScraped = (data: ScrapedData) => {
    setBusinessData(data)
  }

  const handleFormSubmit = (data: ScrapedData) => {
    console.log('Form submitted:', data)
    // Handle form submission logic here
  }

  return (
    <Tabs defaultValue="scrape" className="w-full">
      <TabsList>
        <TabsTrigger value="scrape">Scrape Business Data</TabsTrigger>
        <TabsTrigger value="manual">Manual Entry</TabsTrigger>
      </TabsList>
      <TabsContent value="scrape">
        <Card>
          <CardHeader>
            <CardTitle>Scrape Business Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <UrlInput onDataScraped={handleDataScraped} />
            {businessData && (
              <BusinessDataForm onSubmit={handleFormSubmit} initialData={businessData} />
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="manual">
        <Card>
          <CardHeader>
            <CardTitle>Manual Data Entry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <BusinessDataForm onSubmit={handleFormSubmit} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}