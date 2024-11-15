import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrapedData } from '@/types'

interface BusinessDataFormProps {
  onSubmit: (data: ScrapedData) => void
  initialData?: ScrapedData
}

export function BusinessDataForm({ onSubmit, initialData }: BusinessDataFormProps) {
  const [formData, setFormData] = React.useState<ScrapedData>(
    initialData || {
      business_name: '',
      asking_price: '',
      annual_revenue: '',
      cash_flow: '',
      location: '',
      description: '',
      broker: '',
      year_established: '',
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="business_name"
        value={formData.business_name}
        onChange={handleChange}
        placeholder="Business Name"
        required
      />
      <Input
        name="asking_price"
        value={formData.asking_price}
        onChange={handleChange}
        placeholder="Asking Price"
        required
      />
      <Input
        name="annual_revenue"
        value={formData.annual_revenue}
        onChange={handleChange}
        placeholder="Annual Revenue"
        required
      />
      <Input
        name="cash_flow"
        value={formData.cash_flow}
        onChange={handleChange}
        placeholder="Cash Flow"
        required
      />
      <Input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />
      <Textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <Input
        name="broker"
        value={formData.broker}
        onChange={handleChange}
        placeholder="Broker"
        required
      />
      <Input
        name="year_established"
        value={formData.year_established}
        onChange={handleChange}
        placeholder="Year Established"
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}