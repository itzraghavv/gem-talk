"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "login" | "register";

export const useAuth = (mode: AuthMode) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const auth = async (email: string, password: string, username?: string) => {
    setLoading(true);
    setError(null);

    let result;
    if (mode === "register") {
      result = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });
    } else {
      result = await supabase.auth.signInWithPassword({ email, password });
    }

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
    }

    return result;
  };

  return { auth, loading, error };
};
