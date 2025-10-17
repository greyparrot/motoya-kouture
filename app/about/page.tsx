import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center">
          <Image
            src="/about-hero-designer-studio.jpg"
            alt="Motoya Kouture Studio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-semibold mb-4">
              Our Story
            </h1>
            <p className="text-xl">Crafting elegance since 2015</p>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg mx-auto">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Motoya Kouture was born from a passion for creating timeless,
                elegant pieces that celebrate life's most precious moments.
                Founded by master designer Motoya Chen, our atelier has become
                synonymous with exceptional craftsmanship and personalized
                service.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-6">
                Every garment we create tells a story. From the initial
                consultation to the final fitting, we work closely with each
                client to bring their vision to life. Our commitment to quality
                means we source only the finest fabrics from around the world
                and employ traditional couture techniques passed down through
                generations.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-6">
                Whether you're preparing for your wedding day, prom night, or a
                special cultural celebration, Motoya Kouture is dedicated to
                making you feel extraordinary. We believe that true luxury lies
                in the perfect fit, exquisite details, and the confidence that
                comes from wearing something made just for you.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-semibold text-accent mb-2">
                  10+
                </div>
                <p className="text-muted-foreground">Years of Excellence</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-semibold text-accent mb-2">
                  5000+
                </div>
                <p className="text-muted-foreground">Happy Clients</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-semibold text-accent mb-2">
                  50+
                </div>
                <p className="text-muted-foreground">Countries Served</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-semibold text-accent mb-2">
                  10000+
                </div>
                <p className="text-muted-foreground">Designs Created</p>
              </div>
            </div>
          </div>
        </section>

        {/* Behind the Scenes */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
              Behind the Scenes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Image
                    src={`/behind-scenes-${i}.jpg`}
                    alt={`Behind the scenes ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Ready to Create Your Dream Piece?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life with our bespoke design services
            </p>
            <Button size="lg" asChild>
              <Link href="/custom-order">Start Custom Order</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
