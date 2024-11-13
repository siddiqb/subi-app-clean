'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'
import DashboardLayout from '@/components/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()

  // Business data state
  const [businessName, setBusinessName] = useState('')
  const [askingPrice, setAskingPrice] = useState('')
  const [annualRevenue, setAnnualRevenue] = useState('')
  const [annualProfit, setAnnualProfit] = useState('')

  // Calculated metrics state
  const [calculatedMetrics, setCalculatedMetrics] = useState({
    revenueMultiple: 0,
    profitMultiple: 0,
  })

  // Fetch user data on component mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
      if (!user) {
        router.push('/login')
      }
    }
    getUser()
  }, [supabase, router])

  // Calculate metrics whenever relevant inputs change
  const calculateMetrics = useCallback(() => {
    const price = parseFloat(askingPrice)
    const revenue = parseFloat(annualRevenue)
    const profit = parseFloat(annualProfit)

    if (!isNaN(price) && !isNaN(revenue) && !isNaN(profit)) {
      setCalculatedMetrics({
        revenueMultiple: price / revenue,
        profitMultiple: price / profit,
      })
    }
  }, [askingPrice, annualRevenue, annualProfit])

  useEffect(() => {
    calculateMetrics()
  }, [calculateMetrics])

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    switch (name) {
      case 'businessName':
        setBusinessName(value)
        break
      case 'askingPrice':
        setAskingPrice(value)
        break
      case 'annualRevenue':
        setAnnualRevenue(value)
        break
      case 'annualProfit':
        setAnnualProfit(value)
        break
    }
  }

  // Handle sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate inputs
    if (!businessName || !askingPrice || !annualRevenue || !annualProfit) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before analyzing.",
        variant: "destructive",
      })
      return
    }

    // Parse numeric values
    const price = parseFloat(askingPrice)
    const revenue = parseFloat(annualRevenue)
    const profit = parseFloat(annualProfit)

    if (isNaN(price) || isNaN(revenue) || isNaN(profit)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for all financial fields.",
        variant: "destructive",
      })
      return
    }

    // Metrics are already calculated in real-time, so we just need to display them
    toast({
      title: "Analysis Results",
      description: `Revenue Multiple: ${calculatedMetrics.revenueMultiple.toFixed(2)}x\nProfit Multiple: ${calculatedMetrics.profitMultiple.toFixed(2)}x`,
      action: <ToastAction altText="View Details">View Details</ToastAction>,
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null // Router will redirect to login page
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Business Analysis</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              name="businessName"
              value={businessName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="askingPrice">Asking Price ($)</Label>
            <Input
              id="askingPrice"
              name="askingPrice"
              type="number"
              value={askingPrice}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annualRevenue">Annual Revenue ($)</Label>
            <Input
              id="annualRevenue"
              name="annualRevenue"
              type="number"
              value={annualRevenue}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annualProfit">Annual Profit ($)</Label>
            <Input
              id="annualProfit"
              name="annualProfit"
              type="number"
              value={annualProfit}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <p>Revenue Multiple: {calculatedMetrics.revenueMultiple.toFixed(2)}x</p>
            <p>Profit Multiple: {calculatedMetrics.profitMultiple.toFixed(2)}x</p>
          </div>
          <Button type="submit">Analyze Business</Button>
        </form>
        <div className="mt-4">
          <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
        </div>
      </div>
    </DashboardLayout>
  )
}