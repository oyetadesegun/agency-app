// lib/mock-data.ts


import { prisma } from "../prisma/client"
import { Service, Agent, Commission, ClientLink } from "./types"

export const getServicesFromDB = async (): Promise<Service[]> => {
  try {
    // Try to get from database first
    const services = await prisma.service.findMany();
    
    return services.map(service => ({
      ...service,
      formFields: service.formFields ? JSON.parse(service.formFields as string) : []
    })) as Service[];
  } catch (error) {
    console.error("Database error, using mock data:", error);
    // Fall back to mock data
    return mockServices;
  }
};
export const mockServices: Service[] = [
  {
    id: "service_1",
    name: "CAC Business Registration",
    description: "Register your business with the Corporate Affairs Commission",
    category: "Business",
    commissionAmount: 5000,
    formFields: [
      { id: "field_1", label: "Business Name", type: "text", required: true },
      { id: "field_2", label: "Business Type", type: "select", required: true },
      { id: "field_3", label: "Owner Name", type: "text", required: true },
    ],
  },
  {
    id: "service_2",
    name: "TIN Application",
    description: "Apply for Tax Identification Number",
    category: "Tax",
    commissionAmount: 3000,
    formFields: [
      { id: "field_1", label: "Full Name", type: "text", required: true },
      { id: "field_2", label: "Date of Birth", type: "date", required: true },
      { id: "field_3", label: "Address", type: "text", required: true },
    ],
  },
  {
    id: "service_3",
    name: "CAC Company Registration",
    description: "Register your Company with the Corporate Affairs Commission",
    category: "Company",
    commissionAmount: 45000,
    formFields: [
      { id: "field_1", label: "Company Name", type: "text", required: true },
      { id: "field_2", label: "Company Type", type: "select", required: true },
      { id: "field_3", label: "Owner Name", type: "text", required: true },
      { id: "field_4", label: "Office Address", type: "text", required: true },
    ],
  },
]

export const mockAgents: Agent[] = [
  {
    id: "agent_1",
    name: "John Doe",
    email: "johnwellstaff@gmail.com",
    phone: "+2348012345678",
  },
  {
    id: "agent_2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+2348098765432",
  },
]

export const mockCommissions: Commission[] = [
  {
    id: "commission_1",
    agentId: "agent_1",
    serviceId: "service_1",
    amount: 5000,
    status: "PAID",
    paymentReference: "ref_12345",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "commission_2",
    agentId: "agent_1",
    serviceId: "service_2",
    amount: 3000,
    status: "PAID",
    paymentReference: "ref_67890",
    createdAt: new Date("2024-02-01"),
  },
]

export const mockClientLinks: ClientLink[] = [
  {
    id: "link_1",
    agentId: "agent_1",
    serviceId: "service_1",
    link: "https://example.com/forms/link_1",
    status: "USED",
    createdAt: new Date("2024-02-01"),
    usedAt: new Date("2024-02-02"),
  },
  {
    id: "link_2",
    agentId: "agent_1",
    serviceId: "service_2",
    link: "https://example.com/forms/link_2",
    status: "ACTIVE",
    createdAt: new Date("2024-02-05"),
    usedAt: null,
  },
]