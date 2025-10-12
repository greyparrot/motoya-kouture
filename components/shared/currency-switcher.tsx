"use client"

import { useCurrency } from "@/contexts/currency-context"
import type { Currency } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CurrencySwitcher() {
  const { currency, setCurrency, rates } = useCurrency()

  return (
    <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
      <SelectTrigger className="w-[100px] h-9 text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(rates).map(([code, { symbol }]) => (
          <SelectItem key={code} value={code}>
            {code} ({symbol})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
