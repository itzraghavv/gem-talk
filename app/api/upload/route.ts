import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const supabaseServer = await createClient();

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated");
  }

  const userId = user.id;

  if (!file || file.type !== "application/pdf") {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  const fileName = `${userId}-${file.name}`;

  const { data, error } = await supabaseServer.storage
    .from("pdf-uploads")
    .upload(fileName, file.stream(), {
      contentType: file.type,
      duplex: "half",
    });

  if (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }

  const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pdfs/${fileName}`;

  try {
    
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json({ url: fileUrl, path: data?.path });
}
