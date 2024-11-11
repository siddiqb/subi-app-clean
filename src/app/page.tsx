import UrlInput from '@/components/UrlInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-background">
      <Card className="w-full max-w-md mx-auto bg-card text-card-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-primary">SUBI Calculator</CardTitle>
          <CardDescription className="text-muted-foreground">Business acquisition analysis tool</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <UrlInput />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Button variant="outline" className="w-full border-input bg-background hover:bg-accent hover:text-accent-foreground" asChild>
            <Link href="/dashboard">Manual Entry</Link>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" asChild className="border-input bg-background hover:bg-accent hover:text-accent-foreground">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/register">Register</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}