// Core Types for Motoya Kouture

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  shortDescription: string
  price: number
  salePrice?: number
  sku: string
  category: string[]
  tags: string[]
  images: ProductImage[]
  variants: ProductVariant[]
  fabric?: string
  colors: string[]
  sizes: string[]
  stock: number
  lowStockThreshold: number
  status: "draft" | "published" | "archived"
  featured: boolean
  rating: number
  reviewCount: number
  customizable: boolean
  productionTimeline?: string
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

export interface ProductVariant {
  id: string
  sku: string
  size?: string
  color?: string
  priceOverride?: number
  stock: number
  image?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  productCount: number
  visible: boolean
  order: number
}

export interface CartItem {
  id: string
  productId: string
  variantId?: string
  name: string
  image: string
  price: number
  quantity: number
  size?: string
  color?: string
  customMeasurements?: Record<string, string>
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerEmail: string
  customerName: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  currency: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: string
  shippingAddress: Address
  billingAddress: Address
  trackingNumber?: string
  carrier?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  variantId?: string
  image: string
  sku: string
  quantity: number
  price: number
  total: number
  size?: string
  color?: string
}

export type OrderStatus = "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded"

export interface Address {
  id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault?: boolean
}

export interface CustomOrder {
  id: string
  customerId?: string
  customerName: string
  email: string
  phone: string
  whatsapp?: string
  eventType: string
  eventDate: string
  dateNeeded: string
  category: string
  fabricPreference: string[]
  colorPreference: string
  styleInspiration: string
  measurements?: Record<string, string>
  measurementFiles?: string[]
  inspirationImages?: string[]
  pinterestLink?: string
  instagramReference?: string
  budgetRange: string
  additionalNotes?: string
  status: CustomOrderStatus
  assignedDesigner?: string
  createdAt: string
  updatedAt: string
}

export type CustomOrderStatus = "new" | "in-progress" | "awaiting-feedback" | "completed" | "cancelled"

export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  whatsapp?: string
  orderCount: number
  totalSpent: number
  addresses: Address[]
  measurements: MeasurementSet[]
  tags: string[]
  createdAt: string
  lastOrderDate?: string
}

export interface MeasurementSet {
  id: string
  name: string
  measurements: Record<string, string>
  createdAt: string
}

export interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed" | "free-shipping"
  value: number
  minPurchase?: number
  maxDiscount?: number
  usageLimit?: number
  usageCount: number
  perCustomerLimit?: number
  startDate: string
  endDate: string
  applicableCategories?: string[]
  applicableProducts?: string[]
  excludeSale: boolean
  status: "active" | "inactive" | "scheduled"
}

export interface Testimonial {
  id: string
  customerName: string
  customerPhoto?: string
  category: string
  eventType?: string
  rating: number
  testimonial: string
  productPhoto?: string
  date: string
  approved: boolean
  featured: boolean
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  image?: string
  twoFactorEnabled: boolean
  lastLogin?: string
  status: "active" | "inactive"
}

export type UserRole = "superadmin" | "product-manager" | "order-manager" | "support" | "marketing" | "finance"

export type Currency = "USD" | "NGN" | "GBP" | "EUR" | "CAD"

export interface CurrencyRate {
  currency: Currency
  rate: number
  symbol: string
}
