import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendRegistrationMail } from "@/lib/mail";
 
export async function POST(request: Request) {
  try {
    const body = await request.json();
 
    const {
      fullName,
      fideId,
      phone,
      email,
      city,
      tournamentName,
      amount,
      receiptUrl,
    } = body;
 
    if (
      !fullName ||
      !phone ||
      !tournamentName ||
      !amount ||
      !receiptUrl
    ) {
      return NextResponse.json(
        {
          error: "لطفاً تمام اطلاعات ضروری را وارد کنید.",
        },
        {
          status: 400,
        }
      );
    }
 
    const registration = await prisma.registration.create({
      data: {
        fullName,
        fideId: fideId || null,
        phone,
        email: email || null,
        city: city || null,
        tournamentName,
        amount: Number(amount),
        receiptUrl,
      },
    });
 
    // اگر ارسال ایمیل خطا داد، ثبت نام حذف نشود
    try {
      await sendRegistrationMail({
        name: fullName,
        fideId: fideId || "-",
        tournament: tournamentName,
      });
    } catch (mailError) {
      console.error("MAIL ERROR:", mailError);
    }
 
    return NextResponse.json({
      success: true,
      id: registration.id,
    });
  } catch (error: any) {
    console.error("REGISTER ERROR:", error);
 
    return NextResponse.json(
      {
        error: error?.message || "خطا در ثبت نام",
      },
      {
        status: 500,
      }
    );
  }
}
 