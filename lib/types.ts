// lib/types.ts
export interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}

// export interface Service {
//   id: string;
//   title: string;
//   shortDesc: string;
//   description: string;
//   category: string;
//   amount: number;
//   // formFields: FormField[];
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Commission {
  id: string;
  agentId: string;
  serviceId: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  paymentReference?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ClientLink {
  id: string;
  agentId: string;
  serviceId: string;
  link: string;
  status: 'ACTIVE' | 'USED' | 'EXPIRED';
  createdAt?: Date;
  usedAt?: Date | null;
  updatedAt?: Date;
}