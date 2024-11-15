'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'
import DashboardLayout from '@/components/DashboardLayout'
import { EnhancedDashboard } from '@/components/EnhancedDashboard'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()

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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null // Router will redirect to login page
  }

  return (
    <DashboardLayout user={user}>
      <EnhancedDashboard />
      <div className="mt-4">
        <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
      </div>
    </DashboardLayout>
  )
}