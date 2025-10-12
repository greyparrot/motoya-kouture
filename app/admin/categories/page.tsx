"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, GripVertical } from "lucide-react"
import { mockCategories } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)

  const handleEdit = (category: any) => {
    setEditingCategory(category)
    setIsDialogOpen(true)
  }

  const handleAddNew = () => {
    setEditingCategory(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-foreground mb-2">Categories</h1>
          <p className="text-muted-foreground">Manage product categories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input id="categoryName" placeholder="Bridal Dresses" defaultValue={editingCategory?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" placeholder="bridal" defaultValue={editingCategory?.slug} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Category description"
                  defaultValue={editingCategory?.description}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" placeholder="/images/category.jpg" defaultValue={editingCategory?.image} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="visible">Visible</Label>
                <Switch id="visible" defaultChecked={editingCategory?.visible ?? true} />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Save Category
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {categories.map((category) => (
              <div key={category.id} className="p-6 flex items-center gap-4 hover:bg-accent/50 transition-colors">
                <button className="cursor-grab hover:text-primary">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </button>
                <div className="relative w-16 h-16 flex-shrink-0 bg-accent rounded-lg overflow-hidden">
                  <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{category.name}</h3>
                    {!category.visible && <Badge variant="secondary">Hidden</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{category.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {category.productCount} products • Slug: {category.slug}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
