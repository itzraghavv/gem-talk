import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="font-bold text-4xl text-primary">GemTalk</span>
          </Link>
        </div>
        <div className="bg-accent p-8 rounded-xl shadow-2xl border border-[#7E69AB]/50">
          {children}
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
