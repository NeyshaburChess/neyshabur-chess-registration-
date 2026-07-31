import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supbase";
 
export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase();
 
    const formData = await req.formData();
 
    const file = formData.get("file") as File | null;
 
    if (!file) {
      return NextResponse.json(
        { error: "فایلی انتخاب نشده است." },
        { status: 400 }
      );
    }
 
    const fileExt = file.name.split(".").pop();
 
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
 
    const arrayBuffer = await file.arrayBuffer();
 
    const { error } = await supabase.storage
      .from("receipts")
      .upload(fileName, Buffer.from(arrayBuffer), {
        contentType: file.type,
        upsert: false,
      });
 
    if (error) {
      console.error(error);
 
      return NextResponse.json(
        {
          error: "خطا در آپلود فایل",
        },
        {
          status: 500,
        }
      );
    }
 
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("receipts")
      .getPublicUrl(fileName);
 
    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (error) {
    console.error(error);
 
    return NextResponse.json(
      {
        error: "خطای سرور",
      },
      {
        status: 500,
      }
    );
  }
}
 