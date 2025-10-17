"use client";

import { useState } from "react";
import { mockProducts } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/product-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("new");

  const newArrivals = mockProducts.slice(0, 4);
  const bestSellers = mockProducts.filter((p) => p.rating >= 4.7).slice(0, 4);
  const onSale = mockProducts.filter((p) => p.salePrice).slice(0, 4);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Featured Collection
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
            <TabsTrigger value="new">New Arrivals</TabsTrigger>
            <TabsTrigger value="best">Best Sellers</TabsTrigger>
            <TabsTrigger value="sale">On Sale</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="best" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sale" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {onSale.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
