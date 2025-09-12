// components/ServiceForm.tsx
"use client"

import { TextField, Text, Button, Spinner, Callout, TextArea } from "@radix-ui/themes"
import React, { useState } from "react"
import dynamic from "next/dynamic"
import "easymde/dist/easymde.min.css"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Info, ArrowBigLeft } from "lucide-react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { createServiceSchema } from "@/app/validationSchema"
import { z } from "zod"
import ErrorMessage from "@/components/ErrorMessage"

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
})

type ServiceFormData = z.infer<typeof createServiceSchema>

interface ServiceFormProps {
  initialValues?: Partial<ServiceFormData>
  serviceId?: string
  mode: "create" | "edit"
}

const ServiceForm = ({ initialValues, serviceId, mode }: ServiceFormProps) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<ServiceFormData>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: initialValues,
  })

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const onSubmit = async (data: ServiceFormData) => {
    try {
      setIsLoading(true)

      if (mode === "create") {
        await axios.post("/api/services", data)
        router.push("/service")
      } else if (mode === "edit" && serviceId) {
        await axios.put(`/api/services/${serviceId}`, data)
        router.push("/service")
      }
    } catch (err) {
      setError(`An unexpected error occured: ${err}`)
      setIsLoading(false)
    }
  }

  return (
    <div>
      {error && (
        <Callout.Root>
          <Callout.Icon>
            <Info />
          </Callout.Icon>
          <Callout.Text>
            Unexpected Error : {error}
          </Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-10 max-w-xl">
        <div className="flex gap-5">
          <Link href="/service">
            <ArrowBigLeft />
          </Link>
          <Text className="text-lg font-semibold">
            {mode === "create" ? "New Service" : "Edit Service"}
          </Text>
        </div>

        <div className="mt-5 flex flex-col space-y-4">
          {/* Title + Amount */}
          <div className="flex gap-3">
            <TextField.Root
              size="2"
              placeholder="Title"
              className="flex-1"
              {...register("title")}
            />
            <TextField.Root
              size="2"
              placeholder="Amount"
              type="number"
              className="w-32"
              {...register("amount", { valueAsNumber: true })}
            />
          </div>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <ErrorMessage>{errors.amount?.message}</ErrorMessage>

          <TextArea
            size="2"
            placeholder="Short Description"
            className="flex-1"
            {...register("shortDesc")}
          />

          {/* Markdown editor */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>

        {isLoading ? (
          <Button disabled variant="solid">
            <Spinner loading />{" "}
            {mode === "create" ? "Submitting a new Service" : "Updating Service"}
          </Button>
        ) : (
          <Button type="submit" className="mt-5 w-full">
            {mode === "create" ? "Submit A New Service" : "Update Service"}
          </Button>
        )}
      </form>
    </div>
  )
}

export default ServiceForm
