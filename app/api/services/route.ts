import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createServiceSchema } from "../../validationSchema";

// POST: Create a new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = createServiceSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    // Check if already existing
    const existing = await prisma.service.findUnique({
      where: { title: body.title },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Service with this title already exists!" },
        { status: 409 }
      );
    }

    const service = await prisma.service.create({
      data: {
        title: body.title,
        shortDesc: body.shortDesc,
        description: body.description,
        amount: body.amount,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("POST /services error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET: Fetch all services
export async function GET() {
  try {
    const services = await prisma.service.findMany();
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("GET /services error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
