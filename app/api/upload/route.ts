import { NextResponse } from "next/server";
import { supabase } from "@/lib/supbase";
 
 
export async function POST(
  request: Request
) {
 
  try {
 
    const formData = await request.formData();
 
 
    const file = formData.get("file") as File;
 
 
    if (!file) {
      return NextResponse.json(
        {
          error: "File not found"
        },
        {
          status: 400
        }
      );
    }
 
 
    const bytes = await file.arrayBuffer();
 
    const buffer = Buffer.from(bytes);
 
 
    const fileName =
      `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
 
 
    const { error } = await supabase.storage
      .from("receipts")
      .upload(
        fileName,
        buffer,
        {
          contentType: file.type,
        }
      );
 
 
    if (error) {
 
      return NextResponse.json(
        {
          error: error.message
        },
        {
          status: 500
        }
      );
 
    }
 
 
    const {
      data
    } = supabase.storage
      .from("receipts")
      .getPublicUrl(fileName);
 
 
 
    return NextResponse.json({
 
      url: data.publicUrl
 
    });
 
 
  } catch (error) {
 
 
    return NextResponse.json(
      {
        error: "Upload failed"
      },
      {
        status: 500
      }
    );
 
  }
 
}
 