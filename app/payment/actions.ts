"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/prisma/client"

const paymentSchema = z.object({
  reference: z.string().min(1, "Reference is required"),
  serviceId: z.string().min(1, "Service ID is required"),
  agentId: z.string().min(1, "Agent ID is required"),
})

export async function processPayment(
  reference: string,
  serviceId: string,
  agentId: string
) {
  try {
    // ✅ Validate input
    const validatedData = paymentSchema.parse({ reference, serviceId, agentId })

    // ✅ Verify payment with Paystack
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

    // ✅ Fetch service from DB
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    })

    if (!service) {
      return { success: false, error: "Service not found" }
    }

    // ✅ Verify amount
    if (verificationData.data.amount !== service.amount * 100) {
      return { success: false, error: "Payment amount mismatch" }
    }

    // ✅ Generate client link
    const clientLink = `${process.env.APP_URL}/client/form/${crypto.randomUUID()}`

    // TODO: Persist payment record in DB
    // await prisma.payment.create({ ... })

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
