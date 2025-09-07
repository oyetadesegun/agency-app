// app/agent/[id]/page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ServicesContent from "@/components/ServicesContent"
import LinksContent from "@/components/LinkContent"
import HistoryContent from "@/components/HistoryContent"
import { AgentHeader } from "@/components/agent-portal/AgentHeader"
import { getAgentByID } from "@/zbin/actions/agents.actions"

export default async function AgentPortal({ params }: { params: { id: string } }) {
  // ✅ fetch real agent by dynamic route param
  const selectedAgent = await getAgentByID(params.id)

  if (!selectedAgent) {
    return <div className="p-6 text-center">Agent not found</div>
  }

  // ❌ remove mockCommissions, replace with real commissions later
  const agentCommissions: any[] = [] 
  const totalPaid = agentCommissions
    .filter((c) => c.status === "PAID")
    .reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AgentHeader agentName={selectedAgent.name} totalCommissions={totalPaid} />

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services">Available Services</TabsTrigger>
            <TabsTrigger value="links">My Client Links</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <ServicesContent agent={selectedAgent} />
          </TabsContent>

          <TabsContent value="links">
            <LinksContent agentId={selectedAgent.id} />
          </TabsContent>

          <TabsContent value="history">
            <HistoryContent agentId={selectedAgent.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
