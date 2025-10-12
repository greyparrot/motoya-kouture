"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { mockCategories } from "@/lib/mock-data"
import { useCurrency } from "@/contexts/currency-context"

interface ProductFiltersProps {
  filters: {
    category?: string
    minPrice?: number
    maxPrice?: number
    fabric?: string[]
    size?: string[]
    color?: string[]
    inStock?: boolean
  }
  onFilterChange: (filters: any) => void
}

const fabrics = ["Satin", "Chiffon", "Lace", "Tulle", "Silk", "Velvet", "Ankara"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "Custom"]
const colors = ["White", "Black", "Red", "Navy", "Emerald", "Blush", "Gold"]

export function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  const { formatPrice, convertPrice } = useCurrency()
  const maxPriceValue = 3000

  const handleCategoryChange = (categorySlug: string) => {
    onFilterChange({ category: filters.category === categorySlug ? undefined : categorySlug })
  }

  const handleFabricChange = (fabric: string, checked: boolean) => {
    const newFabrics = checked
      ? [...(filters.fabric || []), fabric]
      : (filters.fabric || []).filter((f) => f !== fabric)
    onFilterChange({ fabric: newFabrics })
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked ? [...(filters.size || []), size] : (filters.size || []).filter((s) => s !== size)
    onFilterChange({ size: newSizes })
  }

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked ? [...(filters.color || []), color] : (filters.color || []).filter((c) => c !== color)
    onFilterChange({ color: newColors })
  }

  const handlePriceChange = (value: number[]) => {
    onFilterChange({ minPrice: value[0], maxPrice: value[1] })
  }

  const clearFilters = () => {
    onFilterChange({
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      fabric: [],
      size: [],
      color: [],
      inStock: false,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Category</Label>
        <div className="space-y-2">
          {mockCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.category === category.slug}
                onCheckedChange={() => handleCategoryChange(category.slug)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Price Range</Label>
        <div className="px-2">
          <Slider
            min={0}
            max={maxPriceValue}
            step={50}
            value={[filters.minPrice || 0, filters.maxPrice || maxPriceValue]}
            onValueChange={handlePriceChange}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatPrice(filters.minPrice || 0)}</span>
            <span>{formatPrice(filters.maxPrice || maxPriceValue)}</span>
          </div>
        </div>
      </div>

      {/* Fabric */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Fabric</Label>
        <div className="space-y-2">
          {fabrics.map((fabric) => (
            <div key={fabric} className="flex items-center space-x-2">
              <Checkbox
                id={`fabric-${fabric}`}
                checked={filters.fabric?.includes(fabric)}
                onCheckedChange={(checked) => handleFabricChange(fabric, checked as boolean)}
              />
              <label
                htmlFor={`fabric-${fabric}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {fabric}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Size</Label>
        <div className="space-y-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={filters.size?.includes(size)}
                onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
              />
              <label
                htmlFor={`size-${size}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Color</Label>
        <div className="space-y-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={filters.color?.includes(color)}
                onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
              />
              <label
                htmlFor={`color-${color}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Availability</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={filters.inStock}
            onCheckedChange={(checked) => onFilterChange({ inStock: checked })}
          />
          <label
            htmlFor="in-stock"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            In Stock Only
          </label>
        </div>
      </div>
    </div>
  )
}
