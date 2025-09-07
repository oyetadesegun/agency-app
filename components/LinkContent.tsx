// app/agent-portal/components/LinksContent.tsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LinkIcon, Copy } from "lucide-react"
import { mockClientLinks, mockServices } from "@/lib/mock-data"

interface LinksContentProps {
  agentId: string
}

export default function LinksContent({ agentId }: LinksContentProps) {
  const agentLinks = mockClientLinks.filter(link => link.agentId === agentId)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">My Client Links</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Manage your generated client links</p>
      </div>

      <div className="grid gap-4">
        {agentLinks.map((clientLink) => {
          const service = mockServices.find(s => s.id === clientLink.serviceId)
          
          return (
            <Card key={clientLink.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{service?.name}</CardTitle>
                    <CardDescription>
                      Created: {clientLink.createdAt.toLocaleDateString()}
                      {clientLink.usedAt && ` • Used: ${clientLink.usedAt.toLocaleDateString()}`}
                    </CardDescription>
                  </div>
                  <Badge variant={clientLink.status === "used" ? "secondary" : "default"}>
                    {clientLink.status === "used" ? "Used" : "Active"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Input value={clientLink.link} readOnly className="text-xs" />
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(clientLink.link)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}