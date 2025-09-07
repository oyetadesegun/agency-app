import { TextField } from '@radix-ui/themes'
import React from 'react'

const NewUser = () => {
  return (
    <div>
        <div className='flex gap-3 mt-5' >
        <TextField.Root size='2' placeholder='username'/>
        <TextField.Root size='2' placeholder='First Name'/>
        <TextField.Root size='2' placeholder='Surame'/>
        </div>
        <div className='flex gap-3 mt-5' >
        <TextField.Root size='2' placeholder='Phone'/>
        <TextField.Root size='2' placeholder='Email'/>
        </div>
                <div className='flex gap-3 mt-5' >
        <TextField.Root size='2' placeholder='Password'/>
        <TextField.Root size='2' placeholder='Confirm Password'/>
        </div>
            </div>
  )
}

export default NewUser