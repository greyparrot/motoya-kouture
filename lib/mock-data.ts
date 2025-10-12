// Mock Data Generator for Development

import type { Product, Category, Testimonial, Order } from "@/types"

// Mock Products
export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "elegant-bridal-gown",
    name: "Elegant Bridal Gown",
    description:
      "A stunning bridal gown crafted from premium satin with intricate lace detailing. Features a sweetheart neckline and cathedral train. Perfect for your special day.",
    shortDescription: "Premium satin bridal gown with lace detailing",
    price: 2500,
    salePrice: undefined,
    sku: "BRD-001",
    category: ["bridal"],
    tags: ["wedding", "luxury", "custom"],
    images: [
      {
        id: "1",
        url: "/elegant-white-bridal-wedding-dress.jpg",
        alt: "Elegant Bridal Gown Front View",
        isPrimary: true,
        order: 1,
      },
      {
        id: "2",
        url: "/bridal-dress-back-view-lace.jpg",
        alt: "Elegant Bridal Gown Back View",
        isPrimary: false,
        order: 2,
      },
    ],
    variants: [
      { id: "v1", sku: "BRD-001-S", size: "S", stock: 2 },
      { id: "v2", sku: "BRD-001-M", size: "M", stock: 3 },
      { id: "v3", sku: "BRD-001-L", size: "L", stock: 1 },
      { id: "v4", sku: "BRD-001-CUSTOM", size: "Custom", stock: 999 },
    ],
    fabric: "Satin",
    colors: ["White", "Ivory"],
    sizes: ["S", "M", "L", "Custom"],
    stock: 6,
    lowStockThreshold: 2,
    status: "published",
    featured: true,
    rating: 4.9,
    reviewCount: 24,
    customizable: true,
    productionTimeline: "4-6 weeks for custom orders",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "2",
    slug: "glamorous-prom-dress",
    name: "Glamorous Prom Dress",
    description:
      "Make a statement at prom with this glamorous sequined gown. Features a fitted bodice and flowing chiffon skirt.",
    shortDescription: "Sequined prom gown with chiffon skirt",
    price: 850,
    salePrice: 750,
    sku: "PRM-001",
    category: ["prom"],
    tags: ["prom", "sequins", "glamorous"],
    images: [
      {
        id: "3",
        url: "/placeholder-i372w.png",
        alt: "Glamorous Prom Dress",
        isPrimary: true,
        order: 1,
      },
    ],
    variants: [
      { id: "v5", sku: "PRM-001-XS", size: "XS", stock: 2 },
      { id: "v6", sku: "PRM-001-S", size: "S", stock: 4 },
      { id: "v7", sku: "PRM-001-M", size: "M", stock: 3 },
    ],
    fabric: "Chiffon",
    colors: ["Red", "Navy", "Emerald"],
    sizes: ["XS", "S", "M", "L"],
    stock: 9,
    lowStockThreshold: 3,
    status: "published",
    featured: true,
    rating: 4.7,
    reviewCount: 18,
    customizable: false,
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "3",
    slug: "traditional-aso-ebi",
    name: "Traditional Aso Ebi",
    description:
      "Authentic Nigerian Aso Ebi with beautiful ankara print. Perfect for traditional ceremonies and celebrations.",
    shortDescription: "Authentic ankara print Aso Ebi",
    price: 450,
    sku: "ASO-001",
    category: ["traditional"],
    tags: ["traditional", "ankara", "nigerian"],
    images: [
      {
        id: "4",
        url: "/traditional-african-ankara-dress-colorful.jpg",
        alt: "Traditional Aso Ebi",
        isPrimary: true,
        order: 1,
      },
    ],
    variants: [
      { id: "v8", sku: "ASO-001-M", size: "M", stock: 5 },
      { id: "v9", sku: "ASO-001-L", size: "L", stock: 4 },
    ],
    fabric: "Ankara",
    colors: ["Multi-color"],
    sizes: ["S", "M", "L", "XL"],
    stock: 9,
    lowStockThreshold: 2,
    status: "published",
    featured: false,
    rating: 4.8,
    reviewCount: 12,
    customizable: true,
    productionTimeline: "2-3 weeks",
    createdAt: "2025-01-03T00:00:00Z",
    updatedAt: "2025-01-08T00:00:00Z",
  },
  {
    id: "4",
    slug: "luxury-silk-bathrobe",
    name: "Luxury Silk Bathrobe",
    description: "Indulge in comfort with our premium silk bathrobe. Perfect for bridal parties or personal luxury.",
    shortDescription: "Premium silk bathrobe",
    price: 180,
    sku: "BTH-001",
    category: ["bathrobes"],
    tags: ["silk", "luxury", "comfort"],
    images: [
      {
        id: "5",
        url: "/luxury-silk-bathrobe-white.jpg",
        alt: "Luxury Silk Bathrobe",
        isPrimary: true,
        order: 1,
      },
    ],
    variants: [{ id: "v10", sku: "BTH-001-OS", size: "One Size", stock: 15 }],
    fabric: "Silk",
    colors: ["White", "Blush", "Champagne"],
    sizes: ["One Size"],
    stock: 15,
    lowStockThreshold: 5,
    status: "published",
    featured: false,
    rating: 4.6,
    reviewCount: 8,
    customizable: false,
    createdAt: "2025-01-02T00:00:00Z",
    updatedAt: "2025-01-09T00:00:00Z",
  },
]

// Generate more products
for (let i = 5; i <= 20; i++) {
  const categories = ["bridal", "prom", "traditional", "suits", "bathrobes"]
  const category = categories[Math.floor(Math.random() * categories.length)]

  mockProducts.push({
    id: String(i),
    slug: `product-${i}`,
    name: `${category.charAt(0).toUpperCase() + category.slice(1)} Product ${i}`,
    description: `Beautiful ${category} piece crafted with attention to detail and premium materials.`,
    shortDescription: `Premium ${category} piece`,
    price: Math.floor(Math.random() * 2000) + 300,
    salePrice: Math.random() > 0.7 ? Math.floor(Math.random() * 1500) + 250 : undefined,
    sku: `${category.substring(0, 3).toUpperCase()}-${String(i).padStart(3, "0")}`,
    category: [category],
    tags: [category, "premium"],
    images: [
      {
        id: String(i * 10),
        url: `/placeholder.svg?height=800&width=600&query=${category}+dress+elegant`,
        alt: `${category} Product ${i}`,
        isPrimary: true,
        order: 1,
      },
    ],
    variants: [
      {
        id: `v${i}1`,
        sku: `${category.substring(0, 3).toUpperCase()}-${String(i).padStart(3, "0")}-M`,
        size: "M",
        stock: Math.floor(Math.random() * 10),
      },
    ],
    fabric: ["Satin", "Chiffon", "Lace", "Silk"][Math.floor(Math.random() * 4)],
    colors: ["White", "Black", "Red", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    stock: Math.floor(Math.random() * 20),
    lowStockThreshold: 3,
    status: "published",
    featured: Math.random() > 0.8,
    rating: 4 + Math.random(),
    reviewCount: Math.floor(Math.random() * 30),
    customizable: Math.random() > 0.5,
    productionTimeline: "2-4 weeks",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-10T00:00:00Z",
  })
}

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Bridal Dresses",
    slug: "bridal",
    description: "Exquisite bridal gowns for your special day",
    image: "/bridal-wedding-dress.jpg",
    productCount: 45,
    visible: true,
    order: 1,
  },
  {
    id: "2",
    name: "Prom Dresses",
    slug: "prom",
    description: "Glamorous dresses for prom night",
    image: "/prom-dress-glamorous.jpg",
    productCount: 32,
    visible: true,
    order: 2,
  },
  {
    id: "3",
    name: "Traditional / Aso Ebi",
    slug: "traditional",
    description: "Authentic traditional wear",
    image: "/traditional-african-dress.jpg",
    productCount: 28,
    visible: true,
    order: 3,
  },
  {
    id: "4",
    name: "Suits",
    slug: "suits",
    description: "Tailored suits for every occasion",
    image: "/tailored-suit-elegant.jpg",
    productCount: 18,
    visible: true,
    order: 4,
  },
  {
    id: "5",
    name: "Bathrobes",
    slug: "bathrobes",
    description: "Luxury bathrobes and loungewear",
    image: "/luxury-bathrobe-silk.jpg",
    productCount: 12,
    visible: true,
    order: 5,
  },
]

// Mock Testimonials
export const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    customerName: "Sarah Johnson",
    customerPhoto: "/smiling-woman-portrait.png",
    category: "bridal",
    eventType: "Wedding",
    rating: 5,
    testimonial:
      "Motoya Kouture made my dream wedding dress a reality. The attention to detail and craftsmanship is unmatched. I felt like a princess on my special day!",
    productPhoto: "/bride-wedding-dress.jpg",
    date: "2024-12-15",
    approved: true,
    featured: true,
  },
  {
    id: "2",
    customerName: "Emily Chen",
    customerPhoto: "/asian-woman-portrait.png",
    category: "prom",
    eventType: "Prom",
    rating: 5,
    testimonial:
      "I received so many compliments at prom! The dress fit perfectly and the quality exceeded my expectations. Thank you Motoya Kouture!",
    date: "2024-11-20",
    approved: true,
    featured: true,
  },
  {
    id: "3",
    customerName: "Amara Okafor",
    customerPhoto: "/african-woman-portrait.png",
    category: "traditional",
    eventType: "Traditional Ceremony",
    rating: 5,
    testimonial:
      "The Aso Ebi was absolutely stunning! Perfect for our traditional ceremony. The fabric quality and design were exceptional.",
    date: "2024-10-30",
    approved: true,
    featured: false,
  },
]

// Mock Currency Rates
export const mockCurrencyRates = {
  USD: { rate: 1, symbol: "$" },
  NGN: { rate: 1650, symbol: "₦" },
  GBP: { rate: 0.79, symbol: "£" },
  EUR: { rate: 0.92, symbol: "€" },
  CAD: { rate: 1.36, symbol: "C$" },
}

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "MK-2025-001",
    date: "2025-01-10T10:30:00Z",
    status: "delivered",
    customer: {
      id: "1",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
    items: [
      {
        id: "1",
        productId: "1",
        name: "Elegant Bridal Gown",
        image: "/elegant-white-bridal-wedding-dress.jpg",
        price: 2500,
        quantity: 1,
        size: "Custom",
        color: "Ivory",
      },
    ],
    subtotal: 2500,
    shipping: 50,
    tax: 200,
    discount: 0,
    total: 2750,
    shippingAddress: {
      name: "Jane Doe",
      street: "123 Fashion Ave",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
    },
    paymentMethod: "card",
    trackingNumber: "TRK123456789",
  },
  {
    id: "2",
    orderNumber: "MK-2025-002",
    date: "2025-01-09T14:20:00Z",
    status: "shipped",
    customer: {
      id: "2",
      name: "Emily Chen",
      email: "emily.chen@example.com",
      phone: "+1 (555) 987-6543",
    },
    items: [
      {
        id: "2",
        productId: "2",
        name: "Glamorous Prom Dress",
        image: "/placeholder-i372w.png",
        price: 750,
        quantity: 1,
        size: "M",
        color: "Red",
      },
    ],
    subtotal: 750,
    shipping: 25,
    tax: 60,
    discount: 100,
    total: 735,
    shippingAddress: {
      name: "Emily Chen",
      street: "456 Style Street",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
      phone: "+1 (555) 987-6543",
    },
    paymentMethod: "zelle",
    trackingNumber: "TRK987654321",
  },
  {
    id: "3",
    orderNumber: "MK-2025-003",
    date: "2025-01-08T09:15:00Z",
    status: "processing",
    customer: {
      id: "3",
      name: "Amara Okafor",
      email: "amara.okafor@example.com",
      phone: "+234 801 234 5678",
    },
    items: [
      {
        id: "3",
        productId: "3",
        name: "Traditional Aso Ebi",
        image: "/traditional-african-ankara-dress-colorful.jpg",
        price: 450,
        quantity: 2,
        size: "L",
        color: "Multi-color",
      },
    ],
    subtotal: 900,
    shipping: 75,
    tax: 72,
    discount: 0,
    total: 1047,
    shippingAddress: {
      name: "Amara Okafor",
      street: "789 Heritage Road",
      city: "Lagos",
      state: "Lagos",
      zip: "100001",
      country: "Nigeria",
      phone: "+234 801 234 5678",
    },
    paymentMethod: "bank-transfer",
    trackingNumber: null,
  },
]

// Helper function to get products with filters
export function getFilteredProducts(filters: {
  category?: string
  minPrice?: number
  maxPrice?: number
  fabric?: string[]
  size?: string[]
  color?: string[]
  inStock?: boolean
  search?: string
  sort?: string
  page?: number
  limit?: number
}) {
  let filtered = [...mockProducts]

  // Apply filters
  if (filters.category) {
    filtered = filtered.filter((p) => p.category.includes(filters.category!))
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice!)
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice!)
  }

  if (filters.fabric && filters.fabric.length > 0) {
    filtered = filtered.filter((p) => p.fabric && filters.fabric!.includes(p.fabric))
  }

  if (filters.inStock) {
    filtered = filtered.filter((p) => p.stock > 0)
  }

  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search),
    )
  }

  // Apply sorting
  if (filters.sort) {
    switch (filters.sort) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name_asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
    }
  }

  // Pagination
  const page = filters.page || 1
  const limit = filters.limit || 16
  const start = (page - 1) * limit
  const end = start + limit

  return {
    products: filtered.slice(start, end),
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit),
  }
}
