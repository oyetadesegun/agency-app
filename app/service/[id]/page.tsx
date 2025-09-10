import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import { Card, Flex, Heading, Text, Badge, Box, Button } from '@radix-ui/themes'
import { Calendar, Clock, DollarSign, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Markdown from 'react-markdown'


interface Props {
  params: { id: string }
}

const ServiceDetailPage = async ({ params: { id } }: Props) => {
  const service = await prisma.service.findUnique({
    where: { id }
  })

  if (!service) notFound()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Back Button */}
      <Flex align="center" gap="4" mb="6">
        <Link href="/service">
          <Button variant="soft" size="2">
            <ArrowLeft size={16} />
            Back to Services
          </Button>
        </Link>
        <Heading size="7" weight="bold">
          Service Details
        </Heading>
      </Flex>

      {/* Main Content */}
      <Card>
        <Flex direction="column" gap="6" p="6">
          {/* Title and Status */}
          <Flex justify="between" align="start">
            <Heading size="6" weight="bold" className="flex-1">
              {service.title}
            </Heading>
            <Badge color="green" variant="soft" size="2">
              Active
            </Badge>
          </Flex>

          {/* Short Description */}
          {service.shortDesc && (
            <Text size="4" color="gray" className="italic">
              {service.shortDesc}
            </Text>
          )}

          {/* Price and Metadata */}
          <Flex gap="6" wrap="wrap">
            <Flex align="center" gap="2">
              <DollarSign size={18} className="text-green-600" />
              <Text size="4" weight="bold">
                {formatCurrency(service.amount)}
              </Text>
            </Flex>

            <Flex align="center" gap="2">
              <Calendar size={18} className="text-blue-600" />
              <Text size="3" color="gray">
                Created: {formatDate(service.createdAt)}
              </Text>
            </Flex>

            <Flex align="center" gap="2">
              <Clock size={18} className="text-purple-600" />
              <Text size="3" color="gray">
                Updated: {formatDate(service.updatedAt)}
              </Text>
            </Flex>
          </Flex>

          {/* Description Section */}
          <Box>
            <Heading size="4" mb="3" weight="medium">
              Description
            </Heading>
            <Card variant="surface" className="p-4">
            
                {/* className="prose max-w-none" */}
                {service.description}
       
            </Card>
          </Box>

          {/* Action Buttons */}
          <Flex gap="3" justify="end" pt="4">
             <Link href={`/service/${service.id}/edit`}>
              <Button variant="solid" size="3">
                Edit Service
              </Button>
            </Link>
            <Button variant="soft" color="red" size="3">
               <Link href={`/service/${service.id}/delete`}>
              Delete Service
               </Link>
            </Button>
          </Flex>
        </Flex>
      </Card>

      {/* Additional Information Section */}
      <Card className="mt-6">
        <Flex direction="column" gap="4" p="6">
          <Heading size="4" weight="medium">
            Additional Information
          </Heading>
          <Flex gap="6" wrap="wrap">
            <Box>
              <Text size="2" color="gray" weight="bold">
                Service ID
              </Text>
              <Text size="2" className="font-mono">
                {service.id}
              </Text>
            </Box>
            <Box>
              <Text size="2" color="gray" weight="bold">
                Created
              </Text>
              <Text size="2">{formatDate(service.createdAt)}</Text>
            </Box>
            <Box>
              <Text size="2" color="gray" weight="bold">
                Last Updated
              </Text>
              <Text size="2">{formatDate(service.updatedAt)}</Text>
            </Box>
          </Flex>
        </Flex>
      </Card>
    </div>
  )
}

export default ServiceDetailPage