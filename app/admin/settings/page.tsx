"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your store settings and preferences</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl">Store Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input id="storeName" defaultValue="Motoya Kouture" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeEmail">Store Email</Label>
                <Input id="storeEmail" type="email" defaultValue="info@motoyakouture.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storePhone">Store Phone</Label>
                <Input id="storePhone" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeAddress">Store Address</Label>
                <Textarea id="storeAddress" defaultValue="123 Fashion Ave, New York, NY 10001" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl">Currency Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Multi-Currency</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow customers to view prices in different currencies
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Supported Currencies</Label>
                <div className="flex flex-wrap gap-2">
                  {["USD", "NGN", "GBP", "EUR", "CAD"].map((currency) => (
                    <div key={currency} className="flex items-center gap-2 px-3 py-2 border border-border rounded-md">
                      <Switch defaultChecked />
                      <span className="text-sm font-medium">{currency}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl">Shipping Zones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">United States</h4>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label>Standard Shipping</Label>
                      <Input type="number" defaultValue="25" placeholder="0.00" />
                    </div>
                    <div>
                      <Label>Express Shipping</Label>
                      <Input type="number" defaultValue="50" placeholder="0.00" />
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">International</h4>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label>Standard Shipping</Label>
                      <Input type="number" defaultValue="75" placeholder="0.00" />
                    </div>
                    <div>
                      <Label>Express Shipping</Label>
                      <Input type="number" defaultValue="150" placeholder="0.00" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Credit/Debit Card", enabled: true },
                { name: "Zelle", enabled: true },
                { name: "CashApp", enabled: true },
                { name: "Bank Transfer", enabled: true },
              ].map((method) => (
                <div
                  key={method.name}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-muted-foreground">Accept payments via {method.name}</p>
                  </div>
                  <Switch defaultChecked={method.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl">Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "New Order", description: "Receive email when a new order is placed" },
                { name: "Low Stock Alert", description: "Get notified when product stock is low" },
                { name: "Custom Order Request", description: "Receive email for new custom order requests" },
                { name: "Customer Messages", description: "Get notified of new customer messages" },
              ].map((notification) => (
                <div key={notification.name} className="flex items-center justify-between">
                  <div>
                    <Label>{notification.name}</Label>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
