"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, Truck, MapPin, CreditCard, Download } from "lucide-react"
import { mockOrders } from "@/lib/mock-data"

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const order = mockOrders.find((o) => o.id === id)

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Order not found</p>
        <Button asChild>
          <Link href="/account/orders">Back to Orders</Link>
        </Button>
      </div>
    )
  }

  const statusSteps = [
    { label: "Order Placed", status: "pending", completed: true },
    {
      label: "Processing",
      status: "processing",
      completed: ["processing", "shipped", "delivered"].includes(order.status),
    },
    { label: "Shipped", status: "shipped", completed: ["shipped", "delivered"].includes(order.status) },
    { label: "Delivered", status: "delivered", completed: order.status === "delivered" },
  ]

  return (
    <div className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/account/orders">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Link>
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-foreground mb-2">Order #{order.orderNumber}</h2>
          <p className="text-sm text-muted-foreground">
            Placed on{" "}
            {new Date(order.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            order.status === "delivered"
              ? "bg-green-100 text-green-800"
              : order.status === "shipped"
                ? "bg-blue-100 text-blue-800"
                : order.status === "processing"
                  ? "bg-yellow-100 text-yellow-800"
                  : order.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
          }`}
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      {/* Order Status Timeline */}
      {order.status !== "cancelled" && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-xl">Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
              <div
                className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
                style={{
                  width: `${((statusSteps.filter((s) => s.completed).length - 1) / (statusSteps.length - 1)) * 100}%`,
                }}
              />
              <div className="relative flex justify-between">
                {statusSteps.map((step, index) => (
                  <div key={step.status} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        step.completed
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-background border-border text-muted-foreground"
                      }`}
                    >
                      {step.completed ? "✓" : index + 1}
                    </div>
                    <p
                      className={`mt-2 text-xs text-center max-w-20 ${
                        step.completed ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {order.trackingNumber && (
              <div className="mt-6 p-4 bg-accent rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium mb-1">Tracking Number</p>
                    <p className="font-mono text-sm">{order.trackingNumber}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Truck className="h-4 w-4 mr-2" />
                    Track Package
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0 bg-accent rounded-lg overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium mb-1">{item.name}</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {item.size && <p>Size: {item.size}</p>}
                    {item.color && <p>Color: {item.color}</p>}
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">each</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-xl flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
              <p>{order.shippingAddress.country}</p>
              {order.shippingAddress.phone && <p className="mt-2">Phone: {order.shippingAddress.phone}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-xl flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <p className="font-medium capitalize">{order.paymentMethod.replace("-", " ")}</p>
              {order.paymentMethod === "card" && <p className="text-muted-foreground">•••• •••• •••• 4242</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>${order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" className="flex-1 bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Download Invoice
        </Button>
        {order.status === "delivered" && (
          <Button variant="outline" className="flex-1 bg-transparent">
            <Package className="h-4 w-4 mr-2" />
            Return Items
          </Button>
        )}
        <Button variant="outline" className="flex-1 bg-transparent" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}
