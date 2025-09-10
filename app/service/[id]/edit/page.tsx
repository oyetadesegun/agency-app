// app/service/[id]/edit/page.tsx
import { prisma } from "@/prisma/client"
import ServiceForm from "@/components/ServiceForm"

interface EditServicePageProps {
  params: { id: string }
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
  })

  if (!service) return <div>Service not found</div>

  return (
    <ServiceForm
      mode="edit"
      serviceId={service.id}
      initialValues={{
        title: service.title,
        amount: service.amount,
        description: service.description,
        shortDesc: service.shortDesc ?? "",
      }}
    />
  )
}
