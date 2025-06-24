import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { Dashboard } from "@/components/dashboard";

interface Props {
  params: Promise<{ username: string }>;
}

export default async function DashboardPage({ params }: Props) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const storedUsername = await user.user_metadata?.username;
  const { username } = await params;
   console.log(username)

  if (username !== storedUsername) {
    redirect(`/dashboard/${storedUsername}`);
  }

  return (
    <div className="flex flex-col h-screen max-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      <Dashboard />
    </div>
  );
}
