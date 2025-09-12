"use client"

import React, { useState } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import axios from "axios"

type FieldType = "text" | "number" | "email" | "textarea"

interface ServiceFormData {
  title: string
  shortDesc: string
  description: string
  amount: number
  fields: { label: string; type: FieldType; required: boolean }[]
}

export default function AdminServiceForm() {
  const { register, control, handleSubmit } = useForm<ServiceFormData>({
    defaultValues: { fields: [{ label: "", type: "text", required: true }] },
  })

  const { fields, append, remove } = useFieldArray({ control, name: "fields" })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: ServiceFormData) => {
    try {
      setLoading(true)
      await axios.post("/api/services-with-form", data)
      alert("Service created successfully!")
    } catch (err) {
      console.error(err)
      alert("Failed to create service")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Create Service + Client Form</h1>

      <input {...register("title")} placeholder="Title" className="border p-2 w-full" />
      <input {...register("shortDesc")} placeholder="Short Description" className="border p-2 w-full" />
      <textarea {...register("description")} placeholder="Description" className="border p-2 w-full" />
      <input type="number" {...register("amount", { valueAsNumber: true })} placeholder="Amount" className="border p-2 w-full" />

      <div>
        <h2 className="font-semibold mt-3">Form Fields</h2>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              {...register(`fields.${index}.label` as const)}
              placeholder="Label"
              className="border p-2 flex-1"
            />
            <select {...register(`fields.${index}.type` as const)} className="border p-2">
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
              <option value="textarea">Textarea</option>
            </select>
            <input type="checkbox" {...register(`fields.${index}.required` as const)} />
            <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => append({ label: "", type: "text", required: true })} className="text-blue-600">
          Add Field
        </button>
      </div>

      <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
        {loading ? "Creating..." : "Create Service"}
      </button>
    </form>
  )
}
