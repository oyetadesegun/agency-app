// components/agent-portal/AgentHeader.tsx
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AgentHeaderProps {
  agentName: string
  totalCommissions: number
}

export function AgentHeader({ agentName, totalCommissions }: AgentHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agent Portal</h1>
            <p className="text-gray-600 dark:text-gray-300">Welcome back, {agentName}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Commissions Paid</p>
              <p className="text-lg font-bold text-green-600">₦{totalCommissions.toLocaleString()}</p>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}