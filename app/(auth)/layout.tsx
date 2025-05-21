import { Toaster } from "@/components/ui/sonner";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <span className="font-bold text-4xl text-primary">GemTalk</span>
          </a>
          <h1 className="text-3xl font-semibold text-white mt-4">{title}</h1>
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
