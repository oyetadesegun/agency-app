// app/api/client-forms/verify/route.ts
import { prisma } from "@/prisma/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { clientFormId, otp } = await req.json()

  const clientForm = await prisma.clientForm.findUnique({ where: { id: clientFormId } })

  if (!clientForm) return NextResponse.json({ error: "Form not found" }, { status: 404 })
  if (clientForm.isVerified) return NextResponse.json({ error: "Already verified" }, { status: 400 })
  if (clientForm.otp !== otp) return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })

  const updated = await prisma.clientForm.update({
    where: { id: clientFormId },
    data: { isVerified: true, verifiedAt: new Date() },
  })

  return NextResponse.json({ message: "OTP verified", clientForm: updated })
}
