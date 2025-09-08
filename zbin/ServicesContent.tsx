// // app/agent-portal/components/ServicesContent.tsx
// import { ServiceCard } from "@/app/service/service-component/ServiceCard"
// import { Agent } from "@/lib/types"
// import { prisma } from "@/prisma/client"

// interface ServicesContentProps {
//   agent: Agent
// }

// export default async function ServicesContent({ agent }: ServicesContentProps) {
//   const services = await  prisma.service.findMany() // ✅ works fine in Server Component

//   return (
//     <>
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-semibold">Choose a Service</h2>
//         <p className="text-sm text-gray-600 dark:text-gray-300">
//           Pay commission to generate client link
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         {services.map((service) => (

//             <ServiceCard key={service.id} service={service} href={`/agent/payment?serviceId=${service.id}&agentId=${agent.id}`}
//  />

//         ))}
//       </div>
//     </>
//   )
// }
