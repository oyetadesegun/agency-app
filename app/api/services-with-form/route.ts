import { NextResponse } from "next/server"
import { prisma } from "@/prisma/client"

export async function POST(req: Request) {
  try {
    const { title, shortDesc, description, amount, fields } = await req.json()

    const service = await prisma.service.create({
      data: {
        title,
        shortDesc,
        description,
        amount,
        fields: { create: fields }, // create ServiceFormFields
      },
    })

    return NextResponse.json(service)
  } catch (err) {
    return NextResponse.json({ error: err}, { status: 400 })
  }
}
