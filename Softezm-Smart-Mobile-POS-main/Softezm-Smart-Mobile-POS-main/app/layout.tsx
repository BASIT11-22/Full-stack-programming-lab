'use client';

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useStore } from '@/lib/store'
import { useStoreHydration } from '@/hooks/use-store-hydration'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { Toaster } from 'sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, adminSettings, initialize } = useStore();
  const isHydrated = useStoreHydration();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (isHydrated) {
      setTheme(adminSettings.theme);
      initialize();
    }
  }, [isHydrated]); // Only run once on hydration

  useEffect(() => {
    if (isHydrated) {
      if (!currentUser && pathname !== '/login') {
        router.push('/login');
      } else if (currentUser && pathname === '/login') {
        if (currentUser.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      }
    }
  }, [isHydrated, currentUser, pathname, router]);

  const isLoginPage = pathname === '/login';

  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''} suppressHydrationWarning>
      <body className="font-sans antialiased overflow-hidden transition-colors duration-300">
        {!isHydrated || (!currentUser && !isLoginPage) ? (
          <div className="min-h-screen bg-background flex items-center justify-center">
             <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : isLoginPage ? (
          <main className="min-h-screen">
            {children}
          </main>
        ) : (
          <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Navbar />
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        )}
        <Toaster position="top-right" richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
