"use client"

import { useState } from "react"
import type { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Minus, Plus, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { useCurrency } from "@/contexts/currency-context"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { formatPrice } = useCurrency()
  const { addItem } = useCart()
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist()
  const { toast } = useToast()
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0].url,
      price: product.salePrice || product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
    })
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast({ title: "Removed from wishlist" })
    } else {
      addToWishlist(product.id)
      toast({ title: "Added to wishlist" })
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({ title: "Link copied to clipboard" })
    }
  }

  return (
    <div className="space-y-6">
      {/* Title & Price */}
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">{product.name}</h1>
        <div className="flex items-center gap-4 mb-4">
          {product.salePrice ? (
            <>
              <span className="text-3xl font-bold">{formatPrice(product.salePrice)}</span>
              <span className="text-xl text-muted-foreground line-through">{formatPrice(product.price)}</span>
              <Badge variant="destructive">
                {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
              </Badge>
            </>
          ) : (
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? "text-accent text-lg" : "text-muted text-lg"}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Short Description */}
      <p className="text-muted-foreground leading-relaxed">{product.shortDescription}</p>

      {/* Size Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Size</label>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {product.sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedSize === "Custom" && (
          <p className="text-sm text-muted-foreground mt-2">
            Custom measurements required.{" "}
            <Link href="/custom-order" className="text-accent hover:underline">
              Request custom order
            </Link>
          </p>
        )}
      </div>

      {/* Color Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Color</label>
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 rounded-md border-2 transition-all ${
                selectedColor === color ? "border-accent bg-accent/10" : "border-border hover:border-muted-foreground"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Delivery Info */}
      {product.productionTimeline && (
        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
          <Truck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Estimated Delivery</p>
            <p className="text-sm text-muted-foreground">{product.productionTimeline}</p>
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              disabled={quantity >= product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {product.stock <= product.lowStockThreshold && (
            <span className="text-sm text-destructive">Only {product.stock} left in stock</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={product.stock === 0}>
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="lg" onClick={handleWishlistToggle}>
            <Heart className={`h-4 w-4 mr-2 ${inWishlist ? "fill-current" : ""}`} />
            {inWishlist ? "In Wishlist" : "Add to Wishlist"}
          </Button>
          <Button variant="outline" size="lg" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <Shield className="h-6 w-6 mx-auto mb-2 text-accent" />
          <p className="text-xs font-medium">Secure Checkout</p>
        </div>
        <div className="text-center">
          <Truck className="h-6 w-6 mx-auto mb-2 text-accent" />
          <p className="text-xs font-medium">Free Shipping</p>
        </div>
        <div className="text-center">
          <RotateCcw className="h-6 w-6 mx-auto mb-2 text-accent" />
          <p className="text-xs font-medium">30-Day Returns</p>
        </div>
      </div>

      {/* SKU & Category */}
      <div className="text-sm text-muted-foreground space-y-1 pt-4 border-t border-border">
        <p>
          <span className="font-medium">SKU:</span> {product.sku}
        </p>
        <p>
          <span className="font-medium">Category:</span> {product.category.join(", ")}
        </p>
        {product.fabric && (
          <p>
            <span className="font-medium">Fabric:</span> {product.fabric}
          </p>
        )}
      </div>
    </div>
  )
}
