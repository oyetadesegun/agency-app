import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const UserPage = () => {
  return (
    <div>
        <Button><Link href='/user/new'>Register New User</Link></Button>
    </div>
  )
}

export default UserPage