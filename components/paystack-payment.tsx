// components/paystack-payment.tsx
"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"

declare global {
  interface Window {
    PaystackPop: any
  }
}

interface PaystackPaymentProps {
  email: string
  amount: number
  serviceId: string
  agentId: string
  onSuccess: (reference: string) => void
  onError: (error: string) => void
  children: React.ReactNode
}

export function PaystackPayment({
  email,
  amount,
  serviceId,
  agentId,
  onSuccess,
  onError,
  children,
}: PaystackPaymentProps) {
  useEffect(() => {
    // Inject Paystack script only once
    if (!document.querySelector("script[src='https://js.paystack.co/v1/inline.js']")) {
      const script = document.createElement("script")
      script.src = "https://js.paystack.co/v1/inline.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  const handlePayment = () => {
    if (!window.PaystackPop) {
      onError("Paystack script not loaded")
      return
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
      email,
      amount: amount * 100, // Convert to kobo
      ref: `ref_${Date.now()}_${serviceId}_${agentId}`,
      metadata: { serviceId, agentId },
      callback: (response: any) => {
        onSuccess(response.reference)
      },
      onClose: () => {
        onError("Payment closed without completion")
      },
    })

    handler.openIframe()
  }

  return (
    <Button onClick={handlePayment} className="flex-1">
      <CreditCard className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
}
