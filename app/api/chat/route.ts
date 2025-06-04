import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { GoogleGenAI } from "@google/genai";
import pdfParse from "pdf-parse";
import prisma from "@/prisma";

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

  await prisma.user.upsert({
    where: { id: user.id },
    update: {},
    create: {
      id: user.id,
      email: user.email!,
      name: user.user_metadata?.name || null,
    },
  });

  const { filePath, question, sessionId } = await req.json();
  const path = `${user.id}-${filePath}`;

  let session;

  if (sessionId) {
    session = await prisma.chatSession.findUnique({
      where: {
        id: sessionId,
      },
    });
  } else {
    session = await prisma.chatSession.create({
      data: {
        userId: user.id,
      },
    });
  }

  if (!session)
    return NextResponse.json({
      error: "Failed to create Session",
    });

  await prisma.chatMessage.create({
    data: {
      sessionId: session?.id,
      sender: "user",
      content: question,
    },
  });

  const existingData = await prisma.pdfData.findFirst({
    where: {
      fileName: filePath,
      userId: user.id,
    },
  });

  let parsedText: string;

  if (existingData) {
    parsedText = existingData.parsedData;
  } else {
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
    parsedText = parsedData.text;

    await prisma.pdfData.upsert({
      where: {
        userId_fileName: {
          userId: user.id,
          fileName: filePath,
        },
      },
      update: {
        parsedData: parsedText,
      },
      create: {
        userId: user.id,
        fileName: filePath,
        parsedData: parsedText,
      },
    });
  }

  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        parts: [
          {
            text: `You are a helpful assistant. The user has uploaded a PDF document. Below is the content of that document:
              ${parsedText}
             Now, the user wants to have a conversation about this document. You can help by answering questions, summarizing, explaining, or discussing the content in any way that makes sense.

             The user's message is:
              "${question}"

             Respond helpfully and naturally based on the content above.
            `,
          },
        ],
      },
    ],
  });

  const response = await result.text;

  if (!response)
    return NextResponse.json({
      error: "Failed to generate response",
    });

  await prisma.chatMessage.create({
    data: {
      sessionId: session?.id,
      sender: "ai",
      content: response,
    },
  });

  return NextResponse.json({
    response: {
      id: `ai-${Date.now()}`,
      text: response,
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
  });
}
