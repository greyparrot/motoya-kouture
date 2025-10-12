"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types"
import { useCurrency } from "@/contexts/currency-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { formatPrice } = useCurrency()
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist()
  const { addItem: addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)

  const inWishlist = isInWishlist(product.id)
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0]
  const secondaryImage = product.images[1] || primaryImage

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      productId: product.id,
      name: product.name,
      image: primaryImage.url,
      price: product.salePrice || product.price,
      quantity: 1,
      size: product.sizes[0],
    })
  }

  return (
    <div
      className="group relative animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4">
          <Image
            src={primaryImage.url || "/placeholder.svg"}
            alt={primaryImage.alt}
            fill
            className={cn(
              "object-cover transition-opacity duration-500",
              isHovered && secondaryImage !== primaryImage ? "opacity-0" : "opacity-100",
            )}
          />
          {secondaryImage !== primaryImage && (
            <Image
              src={secondaryImage.url || "/placeholder.svg"}
              alt={secondaryImage.alt}
              fill
              className="object-cover transition-opacity duration-500"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
            {product.salePrice && (
              <Badge variant="destructive">
                {Math.round(((product.price - product.salePrice) / product.price) * 100)}% Off
              </Badge>
            )}
            {product.stock <= product.lowStockThreshold && product.stock > 0 && (
              <Badge variant="secondary">Low Stock</Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full"
              onClick={handleWishlistToggle}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
            </Button>
            <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full" aria-label="Quick view" asChild>
              <Link href={`/product/${product.slug}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Add to Cart Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button className="w-full" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="font-semibold">{formatPrice(product.salePrice)}</span>
                <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="font-semibold">{formatPrice(product.price)}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={cn("text-xs", i < Math.floor(product.rating) ? "text-accent" : "text-muted")}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
