import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
 
export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
 
    console.log("LOGIN TRY:", username, password);
 
    const admin = await prisma.admin.findUnique({
      where: {
        username: username
      }
    });
 
    console.log("ADMIN FROM DB:", admin);
 
    if (!admin) {
      return NextResponse.json({
        step: "admin_not_found",
        username
      }, {
        status: 401
      });
    }
 
 
    const check = await bcrypt.compare(
      password,
      admin.password
    );
 
    console.log("PASSWORD CHECK:", check);
 
 
    return NextResponse.json({
      step: "success",
      username: admin.username,
      passwordMatch: check,
      hash: admin.password
    });
 
 
  } catch (error) {
 
    console.error(error);
 
    return NextResponse.json({
      error: "server error",
      detail: String(error)
    },{
      status:500
    });
 
  }
}
 