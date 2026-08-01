import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
 
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
 
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];
 
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        {
          error: "فقط فایل JPG، PNG یا PDF مجاز است.",
        },
        { status: 400 }
      );
    }
 
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          error: "حجم فایل نباید بیشتر از ۵ مگابایت باشد.",
        },
        { status: 400 }
      );
    }
 
    const ext = file.name.split(".").pop();
 
    const filename = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${ext}`;
 
    const buffer = Buffer.from(await file.arrayBuffer());
 
    const { error } = await supabase.storage
      .from("receipts")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });
 
    if (error) {
      console.error("SUPABASE UPLOAD ERROR:", error);
 
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }
 
    const { data } = supabase.storage
      .from("receipts")
      .getPublicUrl(filename);
 
    return NextResponse.json({
      success: true,
      url: data.publicUrl,
    });
 
  } catch (error: any) {
    console.error("UPLOAD ERROR:", error);
 
    return NextResponse.json(
      {
        error: error.message || "خطای ناشناخته",
      },
      { status: 500 }
    );
  }
}
 