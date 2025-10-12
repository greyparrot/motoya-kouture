"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { mockTestimonials } from "@/lib/mock-data"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonials = mockTestimonials.filter((t) => t.featured)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  if (testimonials.length === 0) return null

  const current = testimonials[currentIndex]

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12">What Our Clients Say</h2>

        <div className="max-w-4xl mx-auto relative">
          <div className="text-center animate-fade-in" key={currentIndex}>
            {current.customerPhoto && (
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src={current.customerPhoto || "/placeholder.svg"}
                  alt={current.customerName}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex justify-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < current.rating ? "text-accent text-2xl" : "text-muted text-2xl"}>
                  ★
                </span>
              ))}
            </div>

            <blockquote className="text-lg md:text-xl text-muted-foreground italic mb-6 leading-relaxed">
              "{current.testimonial}"
            </blockquote>

            <p className="font-semibold">{current.customerName}</p>
            <p className="text-sm text-muted-foreground">{current.eventType}</p>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full bg-transparent">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={next} className="rounded-full bg-transparent">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-accent" : "w-2 bg-muted"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
