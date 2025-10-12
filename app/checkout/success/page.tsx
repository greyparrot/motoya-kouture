"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, Mail } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order") || "MK00000000"

  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="font-serif text-4xl font-semibold mb-4">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          <div className="bg-card p-6 rounded-lg border border-border mb-8">
            <p className="text-sm text-muted-foreground mb-2">Order Number</p>
            <p className="text-2xl font-semibold mb-4">{orderNumber}</p>
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your email address with order details and tracking information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-muted/30 rounded-lg">
              <Package className="h-8 w-8 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold mb-2">Track Your Order</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You can track your order status from your account dashboard
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/account/orders">View Orders</Link>
              </Button>
            </div>

            <div className="p-6 bg-muted/30 rounded-lg">
              <Mail className="h-8 w-8 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold mb-2">Order Updates</h3>
              <p className="text-sm text-muted-foreground mb-4">We'll send you email updates about your order status</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Button size="lg" asChild className="w-full md:w-auto">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <br />
            <Button size="lg" variant="outline" asChild className="w-full md:w-auto bg-transparent">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </>
  )
}
