import './globals.css'
import { Inter } from 'next/font/google'
import { getUser } from '@/app/auth/actions'
import Navigation from '@/components/Navigation'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Smart Bookmark Manager',
  description: 'Save and organize your favorite websites with real-time sync',
}

export default async function RootLayout({ children }) {
  const user = await getUser()
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation user={user} />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}