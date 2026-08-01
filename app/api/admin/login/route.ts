import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
 
export async function POST(request: Request) {
  try {
    const body = await request.json();
 
    const username = body.username?.trim();
    const password = body.password;
 
    if (!username || !password) {
      return NextResponse.json(
        {
          error: "اطلاعات ناقص است",
        },
        {
          status: 400,
        }
      );
    }
 
    const admin = await prisma.admin.findUnique({
      where: {
        username,
      },
    });
 
    console.log("LOGIN USERNAME:", username);
    console.log("ADMIN FOUND:", admin);
 
    if (!admin) {
      return NextResponse.json(
        {
          error: "ADMIN_NOT_FOUND",
        },
        {
          status: 401,
        }
      );
    }
 
    const passwordCorrect = await bcrypt.compare(
      password,
      admin.password
    );
 
    console.log("PASSWORD CHECK:", passwordCorrect);
 
    if (!passwordCorrect) {
      return NextResponse.json(
        {
          error: "PASSWORD_WRONG",
        },
        {
          status: 401,
        }
      );
    }
 
    const cookieStore = await cookies();
 
    cookieStore.set(
      "chess_admin_session",
      admin.id,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      }
    );
 
    return NextResponse.json({
      success: true,
    });
 
  } catch (error) {
    console.error("LOGIN ERROR:", error);
 
    return NextResponse.json(
      {
        error: "SERVER_ERROR",
      },
      {
        status: 500,
      }
    );
  }
}
 