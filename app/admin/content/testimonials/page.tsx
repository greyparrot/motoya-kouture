"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Star } from "lucide-react"
import { mockTestimonials } from "@/lib/mock-data"

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(mockTestimonials)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-foreground mb-2">Testimonials</h1>
          <p className="text-muted-foreground">Manage customer testimonials and reviews</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="relative w-24 h-24 flex-shrink-0 bg-accent rounded-lg overflow-hidden">
                  <Image
                    src={testimonial.customerPhoto || "/placeholder.svg"}
                    alt={testimonial.customerName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{testimonial.customerName}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{testimonial.eventType}</span>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <Badge variant="secondary">{testimonial.category}</Badge>
                        {testimonial.featured && <Badge>Featured</Badge>}
                        {testimonial.approved ? (
                          <Badge variant="default">Approved</Badge>
                        ) : (
                          <Badge variant="secondary">Pending</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{testimonial.testimonial}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Featured:</span>
                      <Switch checked={testimonial.featured} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Approved:</span>
                      <Switch checked={testimonial.approved} />
                    </div>
                    <span className="text-muted-foreground">{new Date(testimonial.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
