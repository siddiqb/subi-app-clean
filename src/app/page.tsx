'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

// Ensure proper error handling for Supabase initialization
const getSupabaseClient = () => {
  try {
    return createClientComponentClient()
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error)
    return null
  }
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [url, setUrl] = useState('')
  const supabase = getSupabaseClient()

  useEffect(() => {
    const getUser = async () => {
      if (!supabase) return
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    getUser()
  }, [supabase])

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return
    // TODO: Implement URL processing
    console.log('URL submitted:', url)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">SUBI Calculator</CardTitle>
          <CardDescription className="text-center">Business acquisition analysis tool</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleUrlSubmit} className="space-y-2">
            <Input
              type="url"
              placeholder="Enter business URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
            />
            <Button type="submit" className="w-full">
              Analyze URL
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>
          <Link href="/dashboard" className="w-full block">
            <Button variant="outline" className="w-full">
              Manual Entry
            </Button>
          </Link>
        </CardContent>
        <CardFooter className="flex justify-center space-x-2">
          {user ? (
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </CardFooter>
      </Card>
    </main>
  )
}