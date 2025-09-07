// app/agent-portal/payment/actions.ts
"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { getServicesFromDB, mockServices } from "@/lib/mock-data"
import { Service } from "@/lib/types"
import getServices from "@/zbin/actions/services.actions"

// Add input validation schema
const paymentSchema = z.object({
  reference: z.string().min(1, "Reference is required"),
  serviceId: z.string().min(1, "Service ID is required"),
  agentId: z.string().min(1, "Agent ID is required")
})

export async function processPayment(
  reference: string, 
  serviceId: string, 
  agentId: string
) {
  try {
    // Validate input
    const validatedData = paymentSchema.parse({ reference, serviceId, agentId })
    
    // Verify payment with Paystack
    const verificationResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${validatedData.reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    )

    if (!verificationResponse.ok) {
      throw new Error("Paystack API request failed")
    }

    const verificationData = await verificationResponse.json()

    if (!verificationData.status || verificationData.data.status !== "success") {
      return { success: false, error: "Payment verification failed" }
    }

    // Get services - use DB if available, otherwise fallback to mock data
    let services: Service[];
    try {
      services = await getServices;
    } catch (dbError) {
      console.warn("Database error, using mock data:", dbError);
      services = mockServices;
    }

    // Verify amount matches expected service commission
    const service = services.find(s => s.id === serviceId)
    if (service && verificationData.data.amount !== service.commissionAmount * 100) { // Paystack uses kobo
      return { success: false, error: "Payment amount mismatch" }
    }

    // Create client link with expiration
    const clientLink = `${process.env.APP_URL}/client/form/${crypto.randomUUID()}`
    
    // In a real implementation, store in database
    // await storePaymentRecord({
    //   reference: validatedData.reference,
    //   amount: verificationData.data.amount / 100,
    //   serviceId: validatedData.serviceId,
    //   agentId: validatedData.agentId,
    //   clientLink,
    //   status: "completed",
    //   expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    // })

    revalidatePath("/agent")
    return { success: true, clientLink }
  } catch (error) {
    console.error("Payment processing error:", error)
    
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid input data" }
    }
    
    return { success: false, error: "Failed to process payment" }
  }
}