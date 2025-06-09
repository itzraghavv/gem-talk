import prisma from "@/prisma";

export async function GET() {
  const sessions = await prisma.chatSession.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      messages: true,
    },
  });

  console.log(sessions);

  return Response.json(sessions);
}
