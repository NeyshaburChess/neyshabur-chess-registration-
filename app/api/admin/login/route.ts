import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
 
 
export async function POST(request: Request) {
 
  try {
 
    const {
      username,
      password
    } = await request.json();
 
 
    if (!username || !password) {
      return NextResponse.json(
        {
          error: "اطلاعات ناقص است"
        },
        {
          status:400
        }
      );
    }
 
 
    const admin = await prisma.admin.findUnique({
      where:{
        username: username.trim()
      }
    });
 
 
    if (!admin) {
 
      return NextResponse.json(
        {
          error:"ADMIN_NOT_FOUND"
        },
        {
          status:401
        }
      );
 
    }
 
 
    const passwordCorrect =
      await bcrypt.compare(
        password,
        admin.password
      );
 
 
    if (!passwordCorrect) {
 
      return NextResponse.json(
        {
          error:"PASSWORD_WRONG"
        },
        {
          status:401
        }
      );
 
    }
 
 
 
    const cookieStore = await cookies();
 
 
    cookieStore.set(
      "chess_admin_session",
      String(admin.id),
      {
        httpOnly:true,
        secure:true,
        sameSite:"lax",
        maxAge:60 * 60 * 24 * 7,
        path:"/"
      }
    );
 
 
    return NextResponse.json({
      success:true
    });
 
 
  } catch(error) {
 
 
    console.error(
      "LOGIN ERROR:",
      error
    );
 
 
    return NextResponse.json(
      {
        error:"SERVER_ERROR"
      },
      {
        status:500
      }
    );
 
  }
 
}
 