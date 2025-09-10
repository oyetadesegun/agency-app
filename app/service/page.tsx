import { AgentHeader } from '@/app/agent/AgentHeader'
import ServicesContent from '@/app/service/service-component/ServicesContent'

import React from 'react'

const ServicePage = () => {
  return (
    <div>
      <AgentHeader agentName={''} totalCommissions={0}/>
      <ServicesContent/>
    </div>
  )
}

export default ServicePage