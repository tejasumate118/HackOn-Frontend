import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CodeVenture - Gamified Coding Platform",
  description: "Learn coding through interactive challenges and exercises",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <div
            className="fixed inset-0 -z-10 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-N6XnPmEE91hpJDKBnpakSNQSaXHc6k.png')] bg-cover bg-center bg-no-repeat opacity-60"
            style={{
              backgroundBlendMode: "overlay",
            }}
          />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}



import './globals.css'