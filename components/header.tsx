import Link from "next/link";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-8 lg:px-16">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl text-primary">GemChat</span>
        </Link>
        <nav className="flex items-center space-x-3">
          <Link href={"/login"}>
            <Button variant="outline">Login</Button>
          </Link>
          <Link href={"/register"}>
            <Button>Register</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
