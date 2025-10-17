import Image from "next/image";
import Link from "next/link";
import { mockCategories } from "@/lib/mock-data";

export function CategoryGrid() {
  const featured = mockCategories.slice(0, 5);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large featured categories */}
          <Link
            href={`/shop?category=${featured[0].slug}`}
            className="relative h-[400px] md:col-span-2 lg:row-span-2 overflow-hidden rounded-lg group"
          >
            <Image
              src={featured[0].image || "/placeholder.svg"}
              alt={featured[0].name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="text-3xl font-semibold mb-2">
                {featured[0].name}
              </h3>
              <p className="text-white/90">
                {featured[0].productCount} Products
              </p>
            </div>
          </Link>

          {/* Smaller categories */}
          {featured.slice(1).map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="relative h-[190px] overflow-hidden rounded-lg group"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-white/90">
                  {category.productCount} Products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
