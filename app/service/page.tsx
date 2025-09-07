import ServicesContent from '@/components/ServicesContent'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const ServicePage = () => {
  return (
    <div>
      <ServicesContent/>
        <Button><Link href='/service/new'>Add New Service</Link></Button>
    </div>
  )
}

export default ServicePage