'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface BusinessData {
  businessName?: string
  annualRevenue?: number
  employeeCount?: number
  yearFounded?: number
  industry?: string
}

export default function BusinessDataForm({ initialData }: { initialData: BusinessData }) {
  const [formData, setFormData] = useState(initialData)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the data to your state management solution or backend
    console.log('Submitting data:', formData)
    // Navigate to the dashboard
    router.push('/dashboard')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Data</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              name="businessName"
              value={formData.businessName || ''}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annualRevenue">Annual Revenue</Label>
            <Input
              id="annualRevenue"
              name="annualRevenue"
              type="number"
              value={formData.annualRevenue || ''}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employeeCount">Employee Count</Label>
            <Input
              id="employeeCount"
              name="employeeCount"
              type="number"
              value={formData.employeeCount || ''}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearFounded">Year Founded</Label>
            <Input
              id="yearFounded"
              name="yearFounded"
              type="number"
              value={formData.yearFounded || ''}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              name="industry"
              value={formData.industry || ''}
              onChange={handleChange}
            />
          </div>
          <Button type="submit">Proceed to Dashboard</Button>
        </form>
      </CardContent>
    </Card>
  )
}