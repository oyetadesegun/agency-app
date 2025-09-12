// prisma/test/seed.ts

import { prisma } from "../client";

async function main() {
  console.log("Seeding database...");

  const service1 = await prisma.service.create({
    data: {
      title: "Website Design",
      shortDesc: "Design a professional website",
      description: "Full website design with responsive layout and custom features.",
      amount: 50000,
      category: "Design",
    },
  });

  const service2 = await prisma.service.create({
    data: {
      title: "Social Media Management",
      shortDesc: "Manage social media accounts",
      description: "Full social media management including content creation, scheduling, and reporting.",
      amount: 30000,
      category: "Marketing",
    },
  });

  console.log("Services created:", service1.id, service2.id);

  const clientForm1 = await prisma.clientForm.create({
    data: {
      serviceId: service1.id,
      email: "client1@example.com",
      otp: "123456",
      isVerified: false,
    },
  });

  const clientForm2 = await prisma.clientForm.create({
    data: {
      serviceId: service2.id,
      email: "client2@example.com",
      otp: "654321",
      isVerified: true,
    },
  });

  console.log("ClientForms created:", clientForm1.id, clientForm2.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
