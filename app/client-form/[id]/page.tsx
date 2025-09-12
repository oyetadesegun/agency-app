// app/client-form/[id]/page.tsx
import { prisma } from "@/prisma/client"

interface PageProps {
  params: { id: string }
}

export default async function ClientFormPage({ params }: PageProps) {
  const form = await prisma.clientForm.findUnique({
    where: { id: params.id },
  })

  if (!form) return <div>Form not found</div>
  if (!form.isVerified) return <div>Please verify your OTP first.</div>

  return (
    <div>
      <h1>Fill your form for service {form.serviceId}</h1>
      {/* Render your dynamic form fields here */}
    </div>
  )
}
