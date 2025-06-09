import { createClient } from "@/lib/supabase/server";
import prisma from "@/prisma";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json(
      {
        error: "User is not authenticated",
      },
      { status: 401 }
    );
  }

  const sessions = await prisma.chatSession.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      messages: {
        take: 1,
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return Response.json(sessions);
}
