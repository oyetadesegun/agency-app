// app/actions/agents.actions.ts
import { prisma } from "@/prisma/client";

export async function getAgents() {
  return await prisma.agent.findMany();
}

export async function getAgentByID(agentId: string) {
  return await prisma.agent.findUnique({
    where: { id: agentId },
  });
}
