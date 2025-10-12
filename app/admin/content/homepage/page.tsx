"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, Upload } from "lucide-react"

export default function HomepageContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-foreground mb-2">Homepage Content</h1>
          <p className="text-muted-foreground">Manage homepage sections and content</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heroTitle">Main Title</Label>
            <Input id="heroTitle" defaultValue="Exquisite Custom Fashion" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroSubtitle">Subtitle</Label>
            <Input id="heroSubtitle" defaultValue="Handcrafted elegance for your special moments" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroButton">Button Text</Label>
            <Input id="heroButton" defaultValue="Shop Collection" />
          </div>
          <div className="space-y-2">
            <Label>Hero Images</Label>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <button
                  key={i}
                  className="aspect-video border-2 border-dashed border-border rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">Featured Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="featuredTitle">Section Title</Label>
            <Input id="featuredTitle" defaultValue="Featured Collection" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="featuredDescription">Description</Label>
            <Textarea id="featuredDescription" defaultValue="Discover our handpicked selection of exquisite pieces" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showFeatured">Show Section</Label>
            <Switch id="showFeatured" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">Why Choose Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whyTitle">Section Title</Label>
            <Input id="whyTitle" defaultValue="Why Choose Motoya Kouture" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showWhy">Show Section</Label>
            <Switch id="showWhy" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">Testimonials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="testimonialsTitle">Section Title</Label>
            <Input id="testimonialsTitle" defaultValue="What Our Clients Say" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showTestimonials">Show Section</Label>
            <Switch id="showTestimonials" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
