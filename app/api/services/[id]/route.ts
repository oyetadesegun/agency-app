import { createServiceSchema as serviceSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { params } = context;
    const { id } = await params;

    const body = await request.json();

    // Validate request body
    const validation = serviceSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    // Update service in DB
    const updatedService = await prisma.service.update({
      where: { id },
      data: validation.data,
    });

    return NextResponse.json(updatedService, { status: 200 });
  } catch (error) {
    console.error("Update service error:", error);

    return NextResponse.json(
      { error: "Failed to update service", details: error },
      { status: 400 }
    );
  }
}
