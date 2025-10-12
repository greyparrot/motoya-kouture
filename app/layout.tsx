import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Inter, Cinzel } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { CurrencyProvider } from "@/contexts/currency-context"
import { WishlistProvider } from "@/contexts/wishlist-context"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Motoya Kouture - Luxury Custom Fashion",
  description:
    "Exquisite custom bridal gowns, prom dresses, and traditional wear. Crafted with precision and elegance for your special moments.",
  keywords: "luxury fashion, custom dresses, bridal gowns, prom dresses, traditional wear, bespoke fashion",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${cinzel.variable}`}>
      <body className="font-sans antialiased">
        <CurrencyProvider>
          <WishlistProvider>
            <CartProvider>{children}</CartProvider>
          </WishlistProvider>
        </CurrencyProvider>
      </body>
    </html>
  )
}
