import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendRegistrationMail } from "@/lib/mail";
 
 
export async function POST(
  request: Request
) {
 
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
      receiptUrl
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
          error: "اطلاعات ناقص است"
        },
        {
          status:400
        }
      );
 
    }
 
 
 
    const registration =
      await prisma.registration.create({
 
        data: {
 
          fullName,
 
          fideId: fideId || null,
 
          phone,
 
          email: email || null,
 
          city: city || null,
 
 
          tournamentName,
 
 
          amount: Number(amount),
 
 
          receiptUrl,
 
 
        }
 
      });
 
 
 
    await sendRegistrationMail({
 
      name: fullName,
 
      fideId: fideId || "",
 
      tournament: tournamentName,
 
    });
 
 
 
    return NextResponse.json({
 
      success:true,
 
      id:registration.id
 
    });
 
 
 
  } catch(error) {
 
 
    console.error(error);
 
 
    return NextResponse.json(
 
      {
        error:"خطا در ثبت نام"
      },
 
      {
        status:500
      }
 
    );
 
  }
 
}
 