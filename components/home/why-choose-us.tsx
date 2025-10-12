import { Truck, Sparkles, Award, HeadphonesIcon } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Global Shipping",
    description: "Worldwide delivery to your doorstep",
  },
  {
    icon: Sparkles,
    title: "Custom Made",
    description: "Bespoke designs tailored to you",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Finest fabrics and craftsmanship",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Always here to assist you",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12">Why Choose Motoya Kouture</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <feature.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
