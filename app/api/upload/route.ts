import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
 
export const runtime = "nodejs";
 
export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase();
 
    const formData = await req.formData();
 
    const file = formData.get("file");
 
    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "فایلی ارسال نشده است.",
        },
        {
          status: 400,
        }
      );
    }
 
 
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];
 
 
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "فقط فایل JPG، PNG و PDF مجاز است.",
        },
        {
          status: 400,
        }
      );
    }
 
 
    const maxSize = 5 * 1024 * 1024;
 
 
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error:
            "حجم فایل بیشتر از ۵ مگابایت است.",
        },
        {
          status: 400,
        }
      );
    }
 
 
    const extension =
      file.name.split(".").pop() || "file";
 
 
    const fileName =
      `${Date.now()}-${crypto.randomUUID()}.${extension}`;
 
 
    const buffer =
      Buffer.from(await file.arrayBuffer());
 
 
    const { error: uploadError } =
      await supabase.storage
        .from("receipts")
        .upload(
          fileName,
          buffer,
          {
            contentType: file.type,
            upsert: false,
          }
        );
 
 
    if (uploadError) {
 
      console.error(
        "SUPABASE UPLOAD ERROR:",
        uploadError
      );
 
      return NextResponse.json(
        {
          success: false,
          error: uploadError.message,
        },
        {
          status: 500,
        }
      );
    }
 
 
    const {
      data: publicData,
    } =
      supabase.storage
        .from("receipts")
        .getPublicUrl(fileName);
 
 
    return NextResponse.json(
      {
        success: true,
        url: publicData.publicUrl,
      }
    );
 
 
  } catch (error: any) {
 
    console.error(
      "UPLOAD ERROR:",
      error
    );
 
 
    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "خطای داخلی سرور",
      },
      {
        status: 500,
      }
    );
  }
}
 