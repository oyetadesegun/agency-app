// components/ServicesContent.tsx (Server Component)

// import {getServices} from "@/zbin/actions/services.actions";
import { ServiceCard } from "@/app/service/service-component/ServiceCard";
import { Agent, Service } from "@/lib/types";
import { prisma } from "@/prisma/client";

interface ServicesContentProps {
  agent: Agent;
}

export default async function ServicesContent() {
  // Fetch services directly from server action
  const rawServices = await prisma.service.findMany();
  const services: Service[] = rawServices.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    category: s.category!,
    amount: s.amount,
    //  formFields: (s.formFields as unknown as FormField[]) ?? [],
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  }));
  if (services.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 text-center">
          <p className="font-medium">No services available</p>
          <p className="text-sm mt-2">Please check back later</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6 py-3 px-5">
        <h2 className="text-xl font-semibold">Choose a Service</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Pay commission to generate client link
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 px-5">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            href={`/payment?serviceId=${service.id}`}
            // href={`/agent/${agent.id}/payment?serviceId=${service.id}`}

          />
        ))}

      </div>
    </>
  );
}
