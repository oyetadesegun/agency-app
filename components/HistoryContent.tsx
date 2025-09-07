// app/agent-portal/components/HistoryContent.tsx
"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, CheckCircle, Clock } from "lucide-react"
import { mockCommissions, mockServices } from "@/lib/mock-data"

interface HistoryContentProps {
  agentId: string
}

export default function HistoryContent({ agentId }: HistoryContentProps) {
  const agentCommissions = mockCommissions.filter(c => c.agentId === agentId)
  const totalPaid = agentCommissions
    .filter(c => c.status === "PAID")
    .reduce((sum, c) => sum + c.amount, 0)

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Payment History</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-300">Total Paid</p>
          <p className="text-lg font-bold text-green-600">₦{totalPaid.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid gap-4">
        {agentCommissions.map((commission) => {
          const service = mockServices.find(s => s.id === commission.serviceId)

          return (
            <Card key={commission.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      {service?.name}
                    </CardTitle>
                    <CardDescription>
                      {commission.createdAt.toLocaleDateString()} • Ref: {commission.paymentReference}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        commission.status === "PAID"
                          ? "default"
                          : commission.status === "PENDING"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {commission.status === "PAID" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {commission.status === "PENDING" && <Clock className="w-3 h-3 mr-1" />}
                      {commission.status}
                    </Badge>
                    <p className="text-lg font-bold mt-1">₦{commission.amount.toLocaleString()}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </>
  )
}