"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { ProductTabs } from "@/components/product/product-tabs"
import { ProductCard } from "@/components/product/product-card"
import { mockProducts } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { use } from "react"

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = mockProducts.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  // Get related products (same category)
  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && p.category.some((cat) => product.category.includes(cat)))
    .slice(0, 4)

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="text-sm text-muted-foreground mb-6">
            <span>Home</span> <span className="mx-2">/</span>
            <span>Shop</span> <span className="mx-2">/</span>
            <span className="capitalize">{product.category[0]}</span> <span className="mx-2">/</span>
            <span>{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <ProductGallery images={product.images} productName={product.name} />
            <ProductInfo product={product} />
          </div>

          {/* Product Tabs */}
          <ProductTabs product={product} />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="font-serif text-3xl font-semibold mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
