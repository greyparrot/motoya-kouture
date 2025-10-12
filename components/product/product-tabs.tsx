"use client"

import type { Product } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"

interface ProductTabsProps {
  product: Product
}

const mockReviews = [
  {
    id: "1",
    author: "Sarah M.",
    rating: 5,
    date: "2025-01-05",
    comment: "Absolutely stunning! The quality exceeded my expectations. Perfect fit and beautiful craftsmanship.",
    verified: true,
  },
  {
    id: "2",
    author: "Emily R.",
    rating: 5,
    date: "2024-12-28",
    comment: "I wore this to my prom and received so many compliments. The fabric is luxurious and the fit is perfect.",
    verified: true,
  },
  {
    id: "3",
    author: "Jessica L.",
    rating: 4,
    date: "2024-12-15",
    comment: "Beautiful dress, slightly longer than expected but easy to alter. Overall very happy with my purchase.",
    verified: true,
  },
]

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full max-w-2xl grid-cols-4">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="size-guide">Size Guide</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
        <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-8 prose prose-lg max-w-none">
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        {product.fabric && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Fabric Details</h3>
            <p className="text-muted-foreground">
              Premium {product.fabric} fabric with exceptional quality and comfort.
            </p>
          </div>
        )}
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Care Instructions</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Dry clean only</li>
            <li>Do not bleach</li>
            <li>Iron on low heat if needed</li>
            <li>Store in a cool, dry place</li>
          </ul>
        </div>
      </TabsContent>

      <TabsContent value="size-guide" className="mt-8">
        <h3 className="font-semibold text-lg mb-4">Size Chart</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Size</th>
                <th className="text-left py-3 px-4">Bust (inches)</th>
                <th className="text-left py-3 px-4">Waist (inches)</th>
                <th className="text-left py-3 px-4">Hips (inches)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 px-4">XS</td>
                <td className="py-3 px-4">32-33</td>
                <td className="py-3 px-4">24-25</td>
                <td className="py-3 px-4">34-35</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">S</td>
                <td className="py-3 px-4">34-35</td>
                <td className="py-3 px-4">26-27</td>
                <td className="py-3 px-4">36-37</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">M</td>
                <td className="py-3 px-4">36-37</td>
                <td className="py-3 px-4">28-29</td>
                <td className="py-3 px-4">38-39</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">L</td>
                <td className="py-3 px-4">38-40</td>
                <td className="py-3 px-4">30-32</td>
                <td className="py-3 px-4">40-42</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">XL</td>
                <td className="py-3 px-4">41-43</td>
                <td className="py-3 px-4">33-35</td>
                <td className="py-3 px-4">43-45</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Need a custom size? We offer bespoke tailoring services.{" "}
          <a href="/custom-order" className="text-accent hover:underline">
            Request a custom order
          </a>
        </p>
      </TabsContent>

      <TabsContent value="shipping" className="mt-8 space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Shipping Options</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <strong>Standard Shipping (5-7 days):</strong> Free on orders over $200
            </li>
            <li>
              <strong>Express Shipping (2-3 days):</strong> $25
            </li>
            <li>
              <strong>Overnight Shipping (1 day):</strong> $50
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">International Shipping</h3>
          <p className="text-muted-foreground">
            We ship to over 50 countries worldwide. International shipping times vary by location (7-14 business days).
            Customs fees may apply.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Returns</h3>
          <p className="text-muted-foreground">
            30-day return policy on ready-made items. Custom orders are final sale but include complimentary alterations
            within 60 days.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-8 space-y-6">
        <div className="flex items-center gap-8 pb-6 border-b border-border">
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">{product.rating.toFixed(1)}</div>
            <div className="flex mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">{product.reviewCount} reviews</div>
          </div>
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = Math.floor(Math.random() * product.reviewCount)
              const percentage = (count / product.reviewCount) * 100
              return (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-sm w-12">{stars} star</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-6">
          {mockReviews.map((review) => (
            <div key={review.id} className="pb-6 border-b border-border last:border-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{review.author}</span>
                    {review.verified && (
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">Verified Purchase</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < review.rating ? "fill-accent text-accent" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
