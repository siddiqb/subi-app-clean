'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClientComponentClient()

  const [businessName, setBusinessName] = useState('')
  const [askingPrice, setAskingPrice] = useState('')
  const [annualRevenue, setAnnualRevenue] = useState('')
  const [annualProfit, setAnnualProfit] = useState('')
  const [cashFlow, setCashFlow] = useState('')
  const [bankLoanInterestRate, setBankLoanInterestRate] = useState('')
  const [bankLoanTerm, setBankLoanTerm] = useState('')
  const [buyerEquityPercentage, setBuyerEquityPercentage] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      } else {
        router.push('/login')
      }
    }
    getUser()
  }, [supabase, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Perform calculations
    const price = parseFloat(askingPrice)
    const revenue = parseFloat(annualRevenue)
    const profit = parseFloat(annualProfit)
    const cf = parseFloat(cashFlow)
    const interestRate = parseFloat(bankLoanInterestRate) / 100
    const term = parseFloat(bankLoanTerm)
    const equityPercentage = parseFloat(buyerEquityPercentage) / 100

    if (isNaN(price) || isNaN(revenue) || isNaN(profit) || isNaN(cf) || isNaN(interestRate) || isNaN(term) || isNaN(equityPercentage)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for all fields.",
        variant: "destructive",
      })
      return
    }

    const revenueMultiple = price / revenue
    const profitMultiple = price / profit
    const cashFlowMultiple = price / cf
    const downPayment = price * equityPercentage
    const loanAmount = price - downPayment
    const monthlyPayment = (loanAmount * (interestRate / 12) * Math.pow(1 + interestRate / 12, term * 12)) / (Math.pow(1 + interestRate / 12, term * 12) - 1)
    const annualDebtService = monthlyPayment * 12
    const debtServiceCoverageRatio = cf / annualDebtService

    toast({
      title: "Analysis Results",
      description: `
        Revenue Multiple: ${revenueMultiple.toFixed(2)}x
        Profit Multiple: ${profitMultiple.toFixed(2)}x
        Cash Flow Multiple: ${cashFlowMultiple.toFixed(2)}x
        Down Payment: $${downPayment.toFixed(2)}
        Monthly Loan Payment: $${monthlyPayment.toFixed(2)}
        Debt Service Coverage Ratio: ${debtServiceCoverageRatio.toFixed(2)}
      `,
    })
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Business Analysis Calculator</CardTitle>
          <CardDescription>Enter the details of the business youre considering</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="askingPrice">Asking Price ($)</Label>
              <Input
                id="askingPrice"
                type="number"
                value={askingPrice}
                onChange={(e) => setAskingPrice(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualRevenue">Annual Revenue ($)</Label>
              <Input
                id="annualRevenue"
                type="number"
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualProfit">Annual Profit ($)</Label>
              <Input
                id="annualProfit"
                type="number"
                value={annualProfit}
                onChange={(e) => setAnnualProfit(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cashFlow">Annual Cash Flow ($)</Label>
              <Input
                id="cashFlow"
                type="number"
                value={cashFlow}
                onChange={(e) => setCashFlow(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankLoanInterestRate">Bank Loan Interest Rate (%)</Label>
              <Input
                id="bankLoanInterestRate"
                type="number"
                value={bankLoanInterestRate}
                onChange={(e) => setBankLoanInterestRate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankLoanTerm">Bank Loan Term (years)</Label>
              <Input
                id="bankLoanTerm"
                type="number"
                value={bankLoanTerm}
                onChange={(e) => setBankLoanTerm(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buyerEquityPercentage">Buyers Equity Percentage (%)</Label>
              <Input
                id="buyerEquityPercentage"
                type="number"
                value={buyerEquityPercentage}
                onChange={(e) => setBuyerEquityPercentage(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Analyze Business</Button>
          </form>
          <div className="mt-4">
            <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}