import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
 
 
export async function POST(
  request: Request
) {
 
  try {
 
    const body = await request.json();
 
    const username =
      body.username?.trim();
 
    const password =
      body.password?.trim();
 
 
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
 
 
    console.log("LOGIN USER:", username);
 
 
    const admin =
      await prisma.admin.findUnique({
 
        where: {
          username: username
        }
 
      });
 
 
    console.log(
      "ADMIN FOUND:",
      admin
        ? admin.username
        : "NULL"
    );
 
 
    if (!admin) {
 
      return NextResponse.json(
        {
          error:
          "نام کاربری یا رمز اشتباه است"
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
 
 
    console.log(
      "PASSWORD CHECK:",
      validPassword
    );
 
 
 
    if (!validPassword) {
 
      return NextResponse.json(
        {
          error:
          "نام کاربری یا رمز اشتباه است"
        },
        {
          status: 401
        }
      );
 
    }
 
 
 
    const cookieStore =
      await cookies();
 
 
    cookieStore.set(
      "chess_admin_session",
      admin.id,
      {
 
        httpOnly: true,
 
        secure:
          process.env.NODE_ENV === "production",
 
        sameSite: "lax",
 
        maxAge:
          60 * 60 * 24,
 
        path: "/"
 
      }
    );
 
 
 
    return NextResponse.json(
      {
        success: true
      }
    );
 
 
 
  } catch (error) {
 
 
    console.error(
      "LOGIN ERROR:",
      error
    );
 
 
    return NextResponse.json(
      {
        error:
        "خطای سرور"
      },
      {
        status: 500
      }
    );
 
  }
 
}
 