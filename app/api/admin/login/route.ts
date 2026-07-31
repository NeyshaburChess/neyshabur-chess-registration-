import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
 
 
export async function POST(
  request: Request
) {
 
  try {
 
    const body = await request.json();
 
 
    const {
      username,
      password
    } = body;
 
 
    if (!username || !password) {
 
      return NextResponse.json(
        {
          error: "اطلاعات ناقص است"
        },
        {
          status: 400
        }
      );
 
    }
 
 
 
    const admin = await prisma.admin.findUnique({
 
      where: {
        username
      }
 
    });
 
 
 
    if (!admin) {
 
      return NextResponse.json(
        {
          error: "نام کاربری یا رمز اشتباه است"
        },
        {
          status: 401
        }
      );
 
    }
 
 
 
    const validPassword =
      await bcrypt.compare(
        password,
        admin.password
      );
 
 
 
    if (!validPassword) {
 
      return NextResponse.json(
        {
          error: "نام کاربری یا رمز اشتباه است"
        },
        {
          status:401
        }
      );
 
    }
 
 
 
    const cookieStore = await cookies();
 
 
    cookieStore.set(
      "chess_admin_session",
      admin.id,
      {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"lax",
        maxAge:60 * 60 * 24,
        path:"/"
      }
    );
 
 
 
    return NextResponse.json({
 
      success:true
 
    });
 
 
 
  } catch(error) {
 
 
    console.error(error);
 
 
    return NextResponse.json(
      {
        error:"خطای سرور"
      },
      {
        status:500
      }
    );
 
  }
 
}
 