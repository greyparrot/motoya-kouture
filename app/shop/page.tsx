"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { ProductCard } from "@/components/product/product-card"
import { ProductFilters } from "@/components/product/product-filters"
import { useState, useEffect } from "react"
import { getFilteredProducts } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useSearchParams } from "next/navigation"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || undefined,
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    fabric: [] as string[],
    size: [] as string[],
    color: [] as string[],
    inStock: false,
    search: "",
    sort: "featured",
    page: 1,
    limit: 16,
  })

  const [result, setResult] = useState(getFilteredProducts(filters))
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    setResult(getFilteredProducts(filters))
  }, [filters])

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
  }

  const handleSortChange = (sort: string) => {
    setFilters((prev) => ({ ...prev, sort }))
  }

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="text-sm text-muted-foreground mb-6">
            <span>Home</span> <span className="mx-2">/</span> <span>Shop</span>
            {filters.category && (
              <>
                <span className="mx-2">/</span>
                <span className="capitalize">{filters.category}</span>
              </>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="font-serif text-3xl font-semibold mb-2">
                    {filters.category
                      ? filters.category.charAt(0).toUpperCase() + filters.category.slice(1)
                      : "All Products"}
                  </h1>
                  <p className="text-sm text-muted-foreground">{result.total} products found</p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort Dropdown */}
                  <Select value={filters.sort} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price_asc">Price: Low to High</SelectItem>
                      <SelectItem value="price_desc">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="rating">Best Rating</SelectItem>
                      <SelectItem value="name_asc">Name: A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products Grid */}
              {result.products.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {result.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {result.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(result.page - 1)}
                        disabled={result.page === 1}
                      >
                        Previous
                      </Button>
                      {Array.from({ length: result.totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={page === result.page ? "default" : "outline"}
                          onClick={() => handlePageChange(page)}
                          className="w-10"
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(result.page + 1)}
                        disabled={result.page === result.totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-lg text-muted-foreground mb-4">No products found matching your criteria</p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        ...filters,
                        category: undefined,
                        fabric: [],
                        size: [],
                        color: [],
                        minPrice: undefined,
                        maxPrice: undefined,
                      })
                    }
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
