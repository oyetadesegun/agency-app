import { createServiceSchema as serviceSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, {params}: {params:{id: string}}){
    try {
        const body = await request.json()
        const validated = serviceSchema.parse(body)
        const updatedService =await prisma.service.update({
            where:{id: params.id},
            data: validated
        })
        return NextResponse.json(updatedService)
    } catch (error) {
        return  NextResponse.json(error, {status: 401})
    }
}