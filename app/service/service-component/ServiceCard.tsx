"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EditIcon, ShoppingCart, Trash2 } from "lucide-react"
// import { Service } from "@/lib/types"
import Link from "next/link"
import { Service } from "@prisma/client"

interface ServiceCardProps {
  service: Service
  href: string // 👈 replace callback with href
}

export function ServiceCard({ service, href }: ServiceCardProps) {
  return (
    <Card key={service.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{service.category}</Badge>
          <Badge variant="default">₦{service.amount}</Badge>
        </div>
        <div className="flex items-center justify-between">
        <CardTitle>{service.title}</CardTitle>
        <div className="flex gap-3">
          <Link href={`/service/${service.id}/edit`}><EditIcon/></Link>
          <Link href={`/service/${service.id}/delete`}><Trash2 color="red"/></Link>
        </div>
        </div>
        <CardDescription>{service.shortDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            {/* <span className="text-gray-600 dark:text-gray-300">Form Fields:</span> */}
            {/* <span className="font-medium">{service.formFields!.length} fields</span> */}
          </div>
          <Button asChild className="w-full">
            <Link href={href}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Select & Pay Commission
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
