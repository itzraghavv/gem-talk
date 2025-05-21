import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { GoogleGenAI } from "@google/genai";
import { Arapey } from "next/font/google";

export async function POST(req: NextRequest) {
  const api_key = process.env.GOOGLE_GEMINI!;

  const ai = new GoogleGenAI({ apiKey: api_key });

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated");
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("pdf-uploads")
    .getPublicUrl("Assignment_ Full Stack Developer.pdf");

  console.log(publicUrl);

  const { data, error } = await supabase.storage
    .from("pdf-uploads")
    .download("Assignment_ Full Stack Developer.pdf");

  if (error || !data) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch PDF from Supabase" },
      { status: 500 }
    );
  }

  const arrayBuffer = await data.arrayBuffer();
  console.log(arrayBuffer);

  return NextResponse.json({ fileUrl: publicUrl });
}
