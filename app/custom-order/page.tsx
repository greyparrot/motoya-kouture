"use client";

import Link from "next/link";

import type React from "react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CustomOrderPage() {
  const [eventDate, setEventDate] = useState<Date>();
  const [dateNeeded, setDateNeeded] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Custom order request submitted!",
      description: "We'll contact you within 24 hours to discuss your design.",
    });

    setIsSubmitting(false);
    router.push("/");
  };

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-semibold mb-4">
                Custom Order Request
              </h1>
              <p className="text-lg text-muted-foreground">
                Let's create something extraordinary together. Share your vision
                with us.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-2xl font-semibold mb-6">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input id="whatsapp" type="tel" />
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-2xl font-semibold mb-6">Event Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type *</Label>
                    <Select required>
                      <SelectTrigger id="eventType">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="prom">Prom</SelectItem>
                        <SelectItem value="traditional">
                          Traditional Ceremony
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Event Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !eventDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {eventDate ? format(eventDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={eventDate}
                          onSelect={setEventDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Date Needed By *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateNeeded && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateNeeded
                            ? format(dateNeeded, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateNeeded}
                          onSelect={setDateNeeded}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-sm text-muted-foreground">
                      Minimum 6 weeks from today recommended
                    </p>
                  </div>
                </div>
              </div>

              {/* Design Preferences */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-2xl font-semibold mb-6">
                  Design Preferences
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bridal">Bridal</SelectItem>
                        <SelectItem value="prom">Prom</SelectItem>
                        <SelectItem value="traditional">Traditional</SelectItem>
                        <SelectItem value="suit">Suit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fabricPreference">Fabric Preference</Label>
                    <Input
                      id="fabricPreference"
                      placeholder="e.g., Satin, Lace, Chiffon"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="colorPreference">Color Preference</Label>
                    <Input
                      id="colorPreference"
                      placeholder="e.g., Ivory, Blush, Navy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="styleInspiration">Style Inspiration</Label>
                    <Textarea
                      id="styleInspiration"
                      rows={4}
                      placeholder="Describe your vision, preferred style, any specific details you'd like..."
                    />
                  </div>
                </div>
              </div>

              {/* Inspiration & References */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-2xl font-semibold mb-6">
                  Inspiration & References
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="images">Upload Inspiration Images</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG up to 5MB (max 5 images)
                      </p>
                      <Input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pinterest">Pinterest Board Link</Label>
                    <Input
                      id="pinterest"
                      type="url"
                      placeholder="https://pinterest.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram Reference</Label>
                    <Input
                      id="instagram"
                      placeholder="@username or post link"
                    />
                  </div>
                </div>
              </div>

              {/* Budget & Additional Notes */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-2xl font-semibold mb-6">
                  Budget & Additional Information
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range *</Label>
                    <Select required>
                      <SelectTrigger id="budget">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="1000-2000">
                          $1,000 - $2,000
                        </SelectItem>
                        <SelectItem value="2000-5000">
                          $2,000 - $5,000
                        </SelectItem>
                        <SelectItem value="5000+">$5,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      rows={4}
                      placeholder="Any special requests, concerns, or additional information..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit & Chat with Designer"}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  asChild
                >
                  <Link href="/shop">Browse Ready-Made</Link>
                </Button>
              </div>

              <p className="text-sm text-center text-muted-foreground">
                By submitting this form, you agree to be contacted by our design
                team via email, phone, or WhatsApp.
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
