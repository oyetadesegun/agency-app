import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createServiceSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createServiceSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })
    // check if already existing
    const existing = await prisma.service.findUnique({
        where: {
            title: body.title
        }
    })
    if (existing)
        return { error: "Service with this title already exists!" }
    const service = await prisma.service.create({
        data: {
            title: body.title,
            description: body.description,
            amount: body.amount
        }
    })
    return NextResponse.json(service, { status: 201 })
}

export async function GET() {
    const services = await prisma.service.findMany();
    return NextResponse.json(services, { status: 201 })
}
