"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MeasurementsPage() {
  const [unit, setUnit] = useState<"inches" | "cm">("inches")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-foreground mb-2">My Measurements</h2>
        <p className="text-muted-foreground">Save your measurements for custom orders</p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Measurement Guide</p>
              <p>
                For the most accurate measurements, we recommend having someone help you. Wear fitted clothing and stand
                naturally. All measurements should be taken at the fullest part of each area.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Select value={unit} onValueChange={(value: "inches" | "cm") => setUnit(value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inches">Inches</SelectItem>
            <SelectItem value="cm">Centimeters</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="women" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="women">Women's Measurements</TabsTrigger>
          <TabsTrigger value="men">Men's Measurements</TabsTrigger>
        </TabsList>

        <TabsContent value="women" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl">Upper Body</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bust">Bust ({unit})</Label>
                  <Input id="bust" type="number" placeholder="34" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Waist ({unit})</Label>
                  <Input id="waist" type="number" placeholder="26" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hips">Hips ({unit})</Label>
                  <Input id="hips" type="number" placeholder="36" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shoulder">Shoulder Width ({unit})</Label>
                  <Input id="shoulder" type="number" placeholder="15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arm-length">Arm Length ({unit})</Label>
                  <Input id="arm-length" type="number" placeholder="23" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="upper-arm">Upper Arm ({unit})</Label>
                  <Input id="upper-arm" type="number" placeholder="11" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl">Lower Body & Length</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dress-length">Dress Length ({unit})</Label>
                  <Input id="dress-length" type="number" placeholder="60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hollow-to-floor">Hollow to Floor ({unit})</Label>
                  <Input id="hollow-to-floor" type="number" placeholder="58" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height ({unit})</Label>
                  <Input id="height" type="number" placeholder="65" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inseam">Inseam ({unit})</Label>
                  <Input id="inseam" type="number" placeholder="30" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="men" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl">Upper Body</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chest">Chest ({unit})</Label>
                  <Input id="chest" type="number" placeholder="40" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist-men">Waist ({unit})</Label>
                  <Input id="waist-men" type="number" placeholder="32" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shoulder-men">Shoulder Width ({unit})</Label>
                  <Input id="shoulder-men" type="number" placeholder="18" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sleeve">Sleeve Length ({unit})</Label>
                  <Input id="sleeve" type="number" placeholder="25" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neck">Neck ({unit})</Label>
                  <Input id="neck" type="number" placeholder="15.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bicep">Bicep ({unit})</Label>
                  <Input id="bicep" type="number" placeholder="13" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl">Lower Body & Length</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jacket-length">Jacket Length ({unit})</Label>
                  <Input id="jacket-length" type="number" placeholder="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inseam-men">Inseam ({unit})</Label>
                  <Input id="inseam-men" type="number" placeholder="32" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height-men">Height ({unit})</Label>
                  <Input id="height-men" type="number" placeholder="70" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outseam">Outseam ({unit})</Label>
                  <Input id="outseam" type="number" placeholder="42" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button size="lg">
          <Save className="h-4 w-4 mr-2" />
          Save Measurements
        </Button>
      </div>
    </div>
  )
}
