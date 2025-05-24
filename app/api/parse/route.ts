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

  const { filePath } = await req.json();
  console.log(filePath);
  const path = `${user.id}-${filePath}`;

  const {
    data: { publicUrl },
  } = await supabase.storage.from("pdf-uploads").getPublicUrl(path);

  console.log(publicUrl);

  const { data, error } = await supabase.storage
    .from("pdf-uploads")
    .download(path);

  if (error || !data) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch PDF from Supabase" },
      { status: 500 }
    );
  }

  const arrayBuffer = await data.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const parsedData = await pdfParse(buffer);

  if (!parsedData) {
    throw new Error("Failed to parse PDF");
  }

  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Analyzize this pdf ${parsedData.text}`,
  });

  const response = await result.text;

  return NextResponse.json({ About_PDF: response });
}
