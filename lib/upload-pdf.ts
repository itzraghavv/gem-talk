import axios from "axios";
import { createClient } from "@/lib/supabase/client";

export const uploadPdf = async (file: File) => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("User not authenticated");
  }

  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post("/api/upload", formData, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
