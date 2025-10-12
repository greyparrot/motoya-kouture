"use client"

import { Package, Heart, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { mockOrders } from "@/lib/mock-data"

export default function AccountDashboard() {
  // Mock user data
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    memberSince: "January 2024",
  }

  const recentOrders = mockOrders.slice(0, 3)
  const stats = [
    { label: "Total Orders", value: "12", icon: Package, href: "/account/orders" },
    { label: "Wishlist Items", value: "8", icon: Heart, href: "/account/wishlist" },
    { label: "Saved Addresses", value: "2", icon: MapPin, href: "/account/addresses" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Welcome back, {user.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Email: {user.email}</p>
            <p>Member since: {user.memberSince}</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-serif font-semibold">{stat.value}</p>
                    </div>
                    <Icon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-serif text-xl">Recent Orders</CardTitle>
          <Button variant="ghost" asChild>
            <Link href="/account/orders">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-medium">Order #{order.orderNumber}</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold mb-2">${order.total.toFixed(2)}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/account/orders/${order.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto py-4 bg-transparent" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 bg-transparent" asChild>
              <Link href="/custom-order">Request Custom Order</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
