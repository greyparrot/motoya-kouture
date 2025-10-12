"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface HeroSlide {
  id: string
  image: string
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
}

const slides: HeroSlide[] = [
  {
    id: "1",
    image: "/hero-bridal-elegant.jpg",
    title: "Exquisite Bridal Couture",
    subtitle: "Handcrafted gowns for your perfect day",
    ctaText: "Explore Bridal",
    ctaLink: "/shop?category=bridal",
  },
  {
    id: "2",
    image: "/hero-prom-glamorous.jpg",
    title: "Glamorous Prom Collection",
    subtitle: "Make a statement at your special night",
    ctaText: "Shop Prom",
    ctaLink: "/shop?category=prom",
  },
  {
    id: "3",
    image: "/hero-custom-design.jpg",
    title: "Bespoke Design Services",
    subtitle: "Your vision, our craftsmanship",
    ctaText: "Start Custom Order",
    ctaLink: "/custom-order",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden" onMouseEnter={() => setIsAutoPlaying(false)}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            index === currentSlide ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl animate-fade-in">
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold mb-4">{slide.title}</h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">{slide.subtitle}</p>
              <Button size="lg" asChild className="bg-white text-foreground hover:bg-white/90">
                <Link href={slide.ctaLink}>{slide.ctaText}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
