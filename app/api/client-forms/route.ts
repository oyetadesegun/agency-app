// app/api/client-forms/route.ts
import { prisma } from "@/prisma/client";
import { generateOTP } from "@/utils/otpGenerate";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { serviceId, email } = await req.json();

    const otp = generateOTP();

    // Create form in DB
    const clientForm = await prisma.clientForm.create({
      data: { serviceId, email, otp },
    });

    // Send OTP to client email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Your Service" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP for Service Form",
      text: `Your OTP: ${otp}`,
    });

    return NextResponse.json({
      message: "OTP sent",
      clientFormId: clientForm.id,
    });
  } catch (err) {
    return NextResponse.json({ error: err}, { status: 400 });
  }
}
