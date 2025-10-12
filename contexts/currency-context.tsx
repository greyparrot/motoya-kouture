"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Currency, CurrencyRate } from "@/types"
import { mockCurrencyRates } from "@/lib/mock-data"

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  convertPrice: (price: number) => number
  formatPrice: (price: number) => string
  rates: Record<Currency, CurrencyRate>
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD")

  // Load currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem("motoya-currency") as Currency
    if (savedCurrency && mockCurrencyRates[savedCurrency]) {
      setCurrencyState(savedCurrency)
    }
  }, [])

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem("motoya-currency", newCurrency)
  }

  const convertPrice = (price: number): number => {
    const rate = mockCurrencyRates[currency].rate
    return Math.round(price * rate)
  }

  const formatPrice = (price: number): string => {
    const converted = convertPrice(price)
    const symbol = mockCurrencyRates[currency].symbol
    return `${symbol}${converted.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`
  }

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        formatPrice,
        rates: mockCurrencyRates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider")
  }
  return context
}
