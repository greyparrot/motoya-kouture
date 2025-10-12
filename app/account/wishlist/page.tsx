"use client"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, X } from "lucide-react"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { formatPrice } = useCurrency()

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-foreground mb-2">My Wishlist</h2>
        <p className="text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
            <Button asChild>
              <Link href="/shop">Discover Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="group relative overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={() => removeFromWishlist(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <Link href={`/product/${item.slug}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-accent">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>

              <CardContent className="p-4 space-y-3">
                <Link href={`/product/${item.slug}`}>
                  <h3 className="font-medium hover:text-primary transition-colors duration-200">{item.name}</h3>
                </Link>

                <div className="flex items-center justify-between">
                  <p className="font-semibold">{formatPrice(item.price)}</p>
                  {item.inStock ? (
                    <span className="text-xs text-green-600">In Stock</span>
                  ) : (
                    <span className="text-xs text-red-600">Out of Stock</span>
                  )}
                </div>

                <Button className="w-full" onClick={() => handleAddToCart(item)} disabled={!item.inStock}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
