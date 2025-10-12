"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5-7 business days. Express shipping (2-3 days) and overnight options are available at checkout.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes! We ship to over 50 countries worldwide. International shipping times vary by location, typically 7-14 business days.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order ships, you'll receive a tracking number via email. You can also track your order from your account dashboard.",
      },
    ],
  },
  {
    category: "Custom Orders",
    questions: [
      {
        q: "How long does a custom order take?",
        a: "Custom orders typically take 4-6 weeks from design approval to completion. Rush orders may be available for an additional fee.",
      },
      {
        q: "Can I make changes to my custom order?",
        a: "Changes can be made during the design consultation phase. Once production begins, major changes may not be possible.",
      },
      {
        q: "What measurements do I need to provide?",
        a: "We'll guide you through taking accurate measurements during your consultation. We also offer virtual fitting sessions.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "Ready-made items can be returned within 30 days of delivery for a full refund. Items must be unworn with tags attached.",
      },
      {
        q: "Can I return a custom-made item?",
        a: "Custom-made items are final sale. However, we offer complimentary alterations within 60 days of delivery.",
      },
      {
        q: "How do I initiate a return?",
        a: "Contact our customer service team or initiate a return from your account dashboard. We'll provide a prepaid return label.",
      },
    ],
  },
  {
    category: "Payment & Pricing",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, Zelle, CashApp, and bank transfers for international customers.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes! Payment plans are available for custom orders over $1,000. Contact us to discuss options.",
      },
      {
        q: "Are prices shown in my local currency?",
        a: "Yes, you can switch between USD, NGN, GBP, EUR, and CAD using the currency selector in the header.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-muted-foreground mb-8">Find answers to common questions</p>

              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-8">
              {filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="font-serif text-2xl font-semibold mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${categoryIndex}-${index}`} className="border rounded-lg px-6">
                        <AccordionTrigger className="text-left hover:no-underline">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No questions found matching your search.</p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}

            <div className="mt-16 p-8 bg-secondary/30 rounded-lg text-center">
              <h3 className="font-serif text-2xl font-semibold mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">Our team is here to help</p>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
