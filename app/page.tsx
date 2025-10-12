import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { CategoryGrid } from "@/components/home/category-grid"
import { FeaturedProducts } from "@/components/home/featured-products"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { TestimonialsSlider } from "@/components/home/testimonials-slider"
import { InstagramFeed } from "@/components/home/instagram-feed"
import { NewsletterSignup } from "@/components/home/newsletter-signup"

export default function HomePage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen">
        <HeroCarousel />
        <CategoryGrid />
        <FeaturedProducts />
        <WhyChooseUs />
        <TestimonialsSlider />
        <InstagramFeed />
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  )
}
