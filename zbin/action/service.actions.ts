'use server'
import { prisma } from "@/prisma/client"
import { z } from "zod"

const createServiceSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(5, "Description is too short"),
  amount: z.number().positive().min(500, "Amount is too little"),
})

export async function CreateService(data: unknown) {
  try {
    // validate input
    const parsed = createServiceSchema.parse(data)

    // check if service already exists by title
    const existing = await prisma.service.findUnique({
      where: { title: parsed.title },
    })
    if (existing) {
      return { error: "Service with this title already exists!" }
    }

    const service = await prisma.service.create({
      data: {
        title: parsed.title,
        description: parsed.description,
        amount: parsed.amount,
      },
      select: {
        id: true,
        title: true,
        description: true,
        amount: true,
        category: true,
      },
    })

    return { success: true, service }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors }
    }
    console.error("CreateService Error:", error)
    return { error: "Something went wrong" }
  }
}

