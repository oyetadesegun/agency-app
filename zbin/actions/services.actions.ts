import { prisma } from "@/prisma/client";

export  async function getServices(){
    const result = await prisma.service.findMany()

    return result
}
export async function getServicesById(serviceId: string){
    const agent = await prisma.service.findUnique({
        id: serviceId
    })
    return agent
}