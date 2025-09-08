// app/agent-portal/payment/page.tsx
"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, CheckCircle, AlertCircle, Copy, Loader2, ArrowLeft } from "lucide-react"
import { PaystackPayment } from "@/components/paystack-payment"
import { processPayment } from "./actions"
import { mockServices, mockAgents } from "@/lib/mock-data"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const serviceId = searchParams.get("serviceId")
  const agentId = searchParams.get("agentId")
  
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [generatedLink, setGeneratedLink] = useState<string | null>(null)

  if (!serviceId || !agentId) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-600">Invalid parameters</CardTitle>
            <CardDescription>Missing service or agent information</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push(`/`)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Portal
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const service = mockServices.find(s => s.id === serviceId)
  const agent = mockAgents.find(a => a.id === agentId)

  if (!service || !agent) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-600">Not found</CardTitle>
            <CardDescription>Service or agent not found</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Portal
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handlePaymentSuccess = async (reference: string) => {
    setPaymentStatus("processing")
    setPaymentError(null)
    
    try {
      const result = await processPayment(reference, serviceId, agentId)
      
      if (result.success) {
        setGeneratedLink(result.clientLink!)
        setPaymentStatus("success")
      } else {
        setPaymentError(result.error || "Payment verification failed")
        setPaymentStatus("error")
      }
    } catch (error) {
      setPaymentError("Failed to process payment")
      setPaymentStatus("error")
    }
  }

  const handlePaymentError = (error: string) => {
    setPaymentError(error)
    setPaymentStatus("error")
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  if (paymentStatus === "success" && generatedLink) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-green-600">Payment Successful!</CardTitle>
            <CardDescription>Your client link has been generated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <Label className="text-sm text-green-800 dark:text-green-200 mb-2">Client Link:</Label>
              <div className="flex items-center gap-2">
                <Input 
                  value={generatedLink} 
                  readOnly 
                  className="text-xs truncate" 
                />
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => copyToClipboard(generatedLink)}
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <p>• This link can only be used once</p>
              <p>• Share it with your client to fill the form</p>
              <p>• Link expires in 30 days if unused</p>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => router.push("/agent")}
              >
                Return to Portal
              </Button>
              <Button 
                className="flex-1"
                onClick={() => {
                  setPaymentStatus("idle")
                  setGeneratedLink(null)
                }}
              >
                Generate Another Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Details
          </CardTitle>
          <CardDescription>Complete payment to generate client link</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentStatus === "error" && paymentError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{paymentError}</AlertDescription>
            </Alert>
          )}
          
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold">{service.title}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
            <p className="text-lg font-bold text-primary mt-2">
              ₦{service.amount}
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={agent.email} readOnly />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue={agent.phone} readOnly />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
              disabled={paymentStatus === "processing"}
            >
              Cancel
            </Button>
            <PaystackPayment
              email={agent.email}
              amount={service.amount}
              serviceId={serviceId}
              agentId={agentId}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              // disabled={paymentStatus === "processing"}
            >
              {paymentStatus === "processing" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Pay with Paystack"
              )}
            </PaystackPayment>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}