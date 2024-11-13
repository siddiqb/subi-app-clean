import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { UrlInputWrapper } from '@/components/UrlInputWrapper'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to SUBI</CardTitle>
          <CardDescription>Start analyzing a business or log in to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <UrlInputWrapper />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/login" className="w-full mr-2">
            <button className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
              Login
            </button>
          </Link>
          <Link href="/register" className="w-full ml-2">
            <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">
              Register
            </button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}