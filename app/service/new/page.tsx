'use client'
import { TextField, Text, Button, Spinner,Callout } from '@radix-ui/themes'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Info, ArrowBigLeft} from 'lucide-react';
import Link from 'next/link'
import {zodResolver} from '@hookform/resolvers/zod'
import { createServiceSchema } from '@/app/validationSchema'
import {z} from 'zod'
import ErrorMessage from '@/components/ErrorMessage'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})
type ServiceForm = z.infer<typeof createServiceSchema>
// interface ServiceForm {
//   title: string
//   description: string
//   amount: number
// }

const NewService = () => {
  const { register, control, handleSubmit, formState: {errors}} = useForm<ServiceForm>({resolver:zodResolver(createServiceSchema)})
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const onSubmit = async (data: ServiceForm) => {
    try {
      setIsLoading(true)
      throw new Error()
      await axios.post('/api/services', data)
      router.push('/service')
      setIsLoading(false)
    } catch (error) {
    setError(`An unexpected error occured: ${error}`)
      alert('Failed to create service ❌')
    }
  }

  return (
    <div>
{error && <Callout.Root>
	<Callout.Icon>
		<Info />
	</Callout.Icon>
	<Callout.Text>
		`Unexpected Error : ${error}`
	</Callout.Text>
</Callout.Root>}
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-5 py-10 max-w-xl"
    > <div className='flex gap-5'>
<Link href="/service">
      <ArrowBigLeft/>
</Link>
      <Text className="text-lg font-semibold">Submit New Service</Text>
    </div>

      <div className="mt-5 flex flex-col space-y-4">
        {/* Title + Amount */}
        <div className="flex gap-3">
          <TextField.Root 
            size="2"
            placeholder="Title"
            className="flex-1"
            {...register('title', { required: true })}
          />
          <TextField.Root
            size="2"
            placeholder="Amount"
            type="number"
            className="w-32"
            {...register('amount', { valueAsNumber: true, required: true })}
          />
       
        </div>
        <TextField.Root>
           <ErrorMessage>{errors.title?.message}</ErrorMessage></TextField.Root>
         <TextField.Root> <Text color="red" as='p'>{errors.amount?.message}</Text> </TextField.Root>
        {/* Markdown editor */}
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
         <ErrorMessage>{errors.description?.message}</ErrorMessage>
      </div>
{
isLoading? <Button disabled variant="solid"> <Spinner loading/>Submitting a new Service</Button>
    :
  <Button type="submit" className="mt-5 w-full"> Submit A New Service</Button>
   }
      
    </form>
      </div>
  )
}

export default NewService
