// app/admin/client-forms/page.tsx
import { prisma } from "@/prisma/client"
import Link from "next/link"
import { format } from "date-fns"

export default async function ClientFormsPage() {
  // Fetch all client forms from DB
  const forms = await prisma.clientForm.findMany({
    orderBy: { createdAt: "desc" },
    include: { service: true }, // include service info
  })

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">All Client Forms</h1>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">Email</th>
            <th className="border px-3 py-2 text-left">Service</th>
            <th className="border px-3 py-2 text-left">OTP</th>
            <th className="border px-3 py-2 text-left">Verified</th>
            <th className="border px-3 py-2 text-left">Created At</th>
            <th className="border px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {forms.map((form) => (
            <tr key={form.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{form.email}</td>
              <td className="border px-3 py-2">{form.service.title}</td>
              <td className="border px-3 py-2">{form.otp}</td>
              <td className="border px-3 py-2">
                {form.isVerified ? format(form.verifiedAt!, "dd MMM yyyy, HH:mm") : "❌ Not Verified"}
              </td>
              <td className="border px-3 py-2">{format(form.createdAt, "dd MMM yyyy, HH:mm")}</td>
              <td className="border px-3 py-2">
                <Link
                  href={`/client-form/${form.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {forms.length === 0 && <p className="mt-5 text-gray-600">No client forms found.</p>}
    </div>
  )
}
