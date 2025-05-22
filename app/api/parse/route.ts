import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { GoogleGenAI } from "@google/genai";
import pdfParse from "pdf-parse";

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
  } = await supabase.storage
    .from("pdf-uploads")
    .getPublicUrl("Assignment_ Full Stack Developer.pdf");

  console.log(publicUrl);

  const { data, error } = await supabase.storage
    .from("pdf-uploads")
    .download("42cce4cb-c6ff-47ca-9298-b0f8be173824-1stCase2Study.pdf");

  if (error || !data) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch PDF from Supabase" },
      { status: 500 }
    );
  }

  const arrayBuffer = await data.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // try using diff parse lib
  const parsedData = await pdfParse(buffer);
  const parsedText = parsedData.text;

  if (!parsedText) {
    throw new Error("failed ni hora");
  }

  return NextResponse.json({ parsedText: parsedText });
}
