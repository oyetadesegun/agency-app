"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const [agentId, setAgentId] = useState("")
  const [name, setName] = useState("")
  const router = useRouter()

  const handleRegister = () => {
    if (!agentId || !name) return alert("Fill all fields")

    // Mock register success
    router.push(`/agent/${agentId}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Register Agent</CardTitle>
          <CardDescription className="text-center">Create a new agent account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
            </div>
            <div>
              <Label htmlFor="agentId">Agent ID</Label>
              <Input
                id="agentId"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                placeholder="Choose an Agent ID"
              />
            </div>
            <Button className="w-full" onClick={handleRegister}>
              Register
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
