import Image from "next/image"
import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

const instagramPosts = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  image: `/instagram-post-${i + 1}.jpg`,
  link: "https://instagram.com/motoyakouture",
}))

export function InstagramFeed() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Follow Our Journey</h2>
          <p className="text-muted-foreground mb-6">@motoyakouture</p>
          <Button variant="outline" asChild>
            <a href="https://instagram.com/motoyakouture" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-4 w-4 mr-2" />
              Follow on Instagram
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-lg group"
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt="Instagram post"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Instagram className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
