"use client"

import type React from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Lock, CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateOrderNumber } from "@/lib/utils"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { formatPrice } = useCurrency()
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const shipping = total > 200 ? 0 : 25
  const tax = total * 0.08
  const finalTotal = total + shipping + tax

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)

    // Mock payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderNumber = generateOrderNumber()
    clearCart()

    toast({
      title: "Order placed successfully!",
      description: `Your order #${orderNumber} has been confirmed.`,
    })

    router.push(`/checkout/success?order=${orderNumber}`)
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8">Checkout</h1>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Shipping Information */}
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <h2 className="font-serif text-2xl font-semibold mb-6">Shipping Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" required />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" required />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" required />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="address1">Address Line 1 *</Label>
                        <Input id="address1" required />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="address2">Address Line 2</Label>
                        <Input id="address2" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State / Province *</Label>
                        <Input id="state" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code *</Label>
                        <Input id="postalCode" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Select required>
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="GB">United Kingdom</SelectItem>
                            <SelectItem value="NG">Nigeria</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <h2 className="font-serif text-2xl font-semibold mb-6">Shipping Method</h2>
                    <RadioGroup defaultValue="standard">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg mb-3">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="cursor-pointer">
                            <div className="font-medium">Standard Shipping (5-7 days)</div>
                            <div className="text-sm text-muted-foreground">Delivery in 5-7 business days</div>
                          </Label>
                        </div>
                        <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg mb-3">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="cursor-pointer">
                            <div className="font-medium">Express Shipping (2-3 days)</div>
                            <div className="text-sm text-muted-foreground">Delivery in 2-3 business days</div>
                          </Label>
                        </div>
                        <span className="font-medium">{formatPrice(25)}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="overnight" id="overnight" />
                          <Label htmlFor="overnight" className="cursor-pointer">
                            <div className="font-medium">Overnight Shipping (1 day)</div>
                            <div className="text-sm text-muted-foreground">Next business day delivery</div>
                          </Label>
                        </div>
                        <span className="font-medium">{formatPrice(50)}</span>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <h2 className="font-serif text-2xl font-semibold mb-6">Payment Method</h2>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="cursor-pointer flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Credit / Debit Card
                          </Label>
                        </div>

                        {paymentMethod === "card" && (
                          <div className="ml-7 space-y-4 p-4 bg-muted/30 rounded-lg">
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number *</Label>
                              <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry Date *</Label>
                                <Input id="expiry" placeholder="MM/YY" required />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvv">CVV *</Label>
                                <Input id="cvv" placeholder="123" required />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                          <RadioGroupItem value="zelle" id="zelle" />
                          <Label htmlFor="zelle" className="cursor-pointer">
                            Zelle
                          </Label>
                        </div>

                        {paymentMethod === "zelle" && (
                          <div className="ml-7 p-4 bg-muted/30 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-2">
                              Send payment to: <strong>payments@motoyakouture.com</strong>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Please include your order number in the payment note.
                            </p>
                          </div>
                        )}

                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                          <RadioGroupItem value="cashapp" id="cashapp" />
                          <Label htmlFor="cashapp" className="cursor-pointer">
                            CashApp
                          </Label>
                        </div>

                        {paymentMethod === "cashapp" && (
                          <div className="ml-7 p-4 bg-muted/30 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-2">
                              Send payment to: <strong>$MotoyaKouture</strong>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Please include your order number in the payment note.
                            </p>
                          </div>
                        )}

                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank" className="cursor-pointer">
                            Bank Transfer
                          </Label>
                        </div>

                        {paymentMethod === "bank" && (
                          <div className="ml-7 p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground space-y-1">
                            <p>
                              <strong>Bank:</strong> First National Bank
                            </p>
                            <p>
                              <strong>Account Name:</strong> Motoya Kouture LLC
                            </p>
                            <p>
                              <strong>Account Number:</strong> 1234567890
                            </p>
                            <p>
                              <strong>Routing Number:</strong> 987654321
                            </p>
                          </div>
                        )}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      I agree to the{" "}
                      <a href="/policies/terms" className="text-accent hover:underline">
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a href="/policies/privacy" className="text-accent hover:underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-card p-6 rounded-lg border border-border sticky top-24">
                    <h2 className="font-serif text-2xl font-semibold mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.size} • Qty: {item.quantity}
                            </p>
                            <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 py-4 border-t border-border">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-medium">{formatPrice(tax)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-lg font-semibold pt-4 border-t border-border mb-6">
                      <span>Total</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                      <Lock className="h-4 w-4 mr-2" />
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground mt-4">
                      Your payment information is secure and encrypted
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
